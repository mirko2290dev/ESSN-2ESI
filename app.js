import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB9V6o6_j2Fr28Km0ejK46fDg7EMS8B8JA",
  authDomain: "essn-61020.firebaseapp.com",
  projectId: "essn-61020",
  storageBucket: "essn-61020.firebasestorage.app",
  messagingSenderId: "309432873519",
  appId: "1:309432873519:web:f9d7b0e8360c24b6338cda"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const COLLECTION_NAME = "respuestas";

const REPORT_FIELDS = [
  { key: "novi", label: "¿Tenés o tuviste novi@?" },
  { key: "vida_sexual", label: "¿Ya comenzaste tu vida sexual?" },
  { key: "preservativo_conoce", label: "¿Sabés usar correctamente el preservativo?" },
  { key: "otros_metodos", label: "¿Conocés otros métodos anticonceptivos?" },
  { key: "escuela_anti", label: "¿La escuela enseña suficiente sobre anticonceptivos?" },
  { key: "bullying", label: "¿Sentís que en tu curso hay discriminación o bullying?" },
  { key: "orientacion", label: "¿Cómo te identificás en tu orientación sexual?" },
  { key: "identidad_genero", label: "¿Cómo te identificás en tu identidad de género?" },
  { key: "alcohol_vez", label: "¿Consumiste alguna vez una bebida alcohólica?" },
  { key: "sustancias_vez", label: "¿Consumiste alguna vez sustancias ilícitas?" },
  { key: "imagen_corporal", label: "¿Cómo te sentís con tu imagen corporal?" },
  { key: "redes_influyen", label: "¿Las redes sociales influyen en cómo te ves?" },
  { key: "comparacion", label: "¿Te comparás seguido con otras personas?" },
  { key: "esi_suficiente", label: "¿Sentís que las jornadas de ESI son suficientes?" }
];

const FIELD_ORDER = [
  "id", "curso", "started_at", "submitted_at",
  "novi", "vida_sexual", "preservativo", "otros_anticonceptivos", "info_futuro",
  "preservativo_conoce", "otros_metodos", "escuela_anti",
  "bullying", "motivo_bullying",
  "orientacion", "abierto_sexualidad", "discriminado_sexualidad",
  "identidad_genero", "abierto_identidad", "discriminado_identidad",
  "alcohol_vez", "alcohol_frecuencia",
  "sustancias_vez", "sustancias_frecuencia",
  "imagen_corporal", "redes_influyen", "comparacion", "hablo_mal", "escucho_mal",
  "esi_suficiente", "temas_esi"
];

let chartInstances = [];

function asText(value) {
  if (Array.isArray(value)) return value.filter(Boolean).join(" | ");
  return value ?? "";
}

function csvEscape(value) {
  return `"${String(value ?? "").replace(/"/g, '""')}"`;
}

function countField(rows, key) {
  const counts = {};
  rows.forEach(row => {
    const value = row[key];
    if (!value) return;
    counts[value] = (counts[value] || 0) + 1;
  });
  return counts;
}

function getRowsByCourse(rows) {
  const map = new Map();
  rows.forEach(row => {
    const course = row.curso || "Sin curso";
    if (!map.has(course)) map.set(course, []);
    map.get(course).push(row);
  });
  return map;
}

function destroyCharts() {
  chartInstances.forEach(chart => chart.destroy());
  chartInstances = [];
}

function createChartCard(titleText, counts, parent) {
  const card = document.createElement("div");
  card.className = "chart-box";

  const h4 = document.createElement("h4");
  h4.textContent = titleText;
  card.appendChild(h4);

  const text = document.createElement("div");
  text.className = "report-text";

  const lines = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([opt, n]) => `${opt}: ${n}`);

  text.textContent = lines.length ? lines.join("\n") : "Sin datos todavía.";
  card.appendChild(text);

  const canvas = document.createElement("canvas");
  card.appendChild(canvas);

  parent.appendChild(card);

  const labels = Object.keys(counts);
  const data = Object.values(counts);

  if (labels.length) {
    const chart = new Chart(canvas, {
      type: "bar",
      data: {
        labels,
        datasets: [{
          label: "Votos",
          data
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        }
      }
    });
    chartInstances.push(chart);
  }
}

function renderSummaryText(rows, target) {
  const parts = REPORT_FIELDS.map(field => {
    const counts = countField(rows, field.key);
    const text = Object.entries(counts)
      .map(([opt, n]) => `${opt} = ${n}`)
      .join(", ");
    return `${field.label}: ${text || "sin respuestas"}`;
  });

  target.innerHTML = `
    <h3>Resumen global</h3>
    <div class="report-text">${parts.join("\n\n")}</div>
  `;
}

function renderGlobalResults(rows) {
  const total = document.getElementById("total-count");
  const lastDate = document.getElementById("last-date");
  const courseCount = document.getElementById("course-count");
  const summary = document.getElementById("summary-global");
  const charts = document.getElementById("charts-global");

  if (total) total.textContent = rows.length;
  if (lastDate) {
    lastDate.textContent = rows.length
      ? new Date(rows[rows.length - 1].submitted_at).toLocaleString("es-AR")
      : "—";
  }

  const courseSet = new Set(rows.map(r => r.curso).filter(Boolean));
  if (courseCount) courseCount.textContent = courseSet.size;

  if (summary) renderSummaryText(rows, summary);

  if (charts) {
    charts.innerHTML = "";
    REPORT_FIELDS.forEach(field => {
      const counts = countField(rows, field.key);
      createChartCard(field.label, counts, charts);
    });
  }
}

function renderByCourse(rows) {
  const container = document.getElementById("by-course");
  if (!container) return;

  container.innerHTML = "";

  const grouped = getRowsByCourse(rows);
  const order = ["1°", "2°", "3°", "4°", "5°", "6°"];

  [...grouped.entries()]
    .sort((a, b) => (order.indexOf(a[0]) === -1 ? 99 : order.indexOf(a[0])) - (order.indexOf(b[0]) === -1 ? 99 : order.indexOf(b[0])))
    .forEach(([course, courseRows]) => {
      const section = document.createElement("div");
      section.className = "section-card";

      const title = document.createElement("h2");
      title.className = "section-title";
      title.textContent = `Resultados por curso: ${course}`;
      section.appendChild(title);

      const text = document.createElement("div");
      text.className = "report-text";
      text.textContent = REPORT_FIELDS.map(field => {
        const counts = countField(courseRows, field.key);
        const value = Object.entries(counts)
          .map(([opt, n]) => `${opt} = ${n}`)
          .join(", ");
        return `${field.label}: ${value || "sin respuestas"}`;
      }).join("\n\n");
      section.appendChild(text);

      const grid = document.createElement("div");
      grid.className = "chart-grid";

      REPORT_FIELDS.forEach(field => {
        const counts = countField(courseRows, field.key);
        createChartCard(field.label, counts, grid);
      });

      section.appendChild(grid);
      container.appendChild(section);
    });
}

async function loadResponsesAndRender() {
  const q = query(collection(db, COLLECTION_NAME), orderBy("submitted_at", "asc"));
  const snap = await getDocs(q);
  const rows = snap.docs.map(doc => doc.data());

  destroyCharts();
  renderGlobalResults(rows);
  renderByCourse(rows);

  const exportBtn = document.getElementById("export-csv");
  if (exportBtn) {
    exportBtn.onclick = () => {
      const lines = [FIELD_ORDER.map(csvEscape).join(",")];
      rows.forEach(row => {
        lines.push(FIELD_ORDER.map(key => csvEscape(asText(row[key]))).join(","));
      });

      const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "respuestas_esi.csv";
      a.click();
      URL.revokeObjectURL(url);
    };
  }
}

document.getElementById("refresh-results")?.addEventListener("click", async () => {
  await loadResponsesAndRender();
});

document.addEventListener("DOMContentLoaded", async () => {
  try {
    await loadResponsesAndRender();
  } catch (error) {
    console.error(error);
    alert("No se pudieron cargar las respuestas. Revisá Firestore y las reglas.");
  }
});
