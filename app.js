const STORAGE_KEY = 'esi_respuestas_v1';

const SURVEY = [
  {
    title: 'Sexualidad',
    questions: [
      { key: 'novi', label: '¿Tenés o tuviste novi@?', type: 'radio', required: true, options: ['Sí, tengo', 'Sí, tuve', 'No'] },
      { key: 'vida_sexual', label: '¿Ya comenzaste tu vida sexual?', type: 'radio', required: true, options: ['Sí', 'No'] },
      { key: 'preservativo', label: 'Si respondiste “Sí”, ¿usás preservativo?', type: 'radio', requiredWhenVisible: true, visibleIf: { field: 'vida_sexual', value: 'Sí' }, options: ['Siempre', 'A veces', 'No'] },
      { key: 'otros_anticonceptivos', label: '¿Usás otros métodos anticonceptivos?', type: 'radio', requiredWhenVisible: true, visibleIf: { field: 'vida_sexual', value: 'Sí' }, options: ['Sí', 'No'] },
      { key: 'info_futuro', label: 'Si respondiste “No”, ¿te gustaría aprender más sobre cómo cuidarte en el futuro?', type: 'radio', requiredWhenVisible: true, visibleIf: { field: 'vida_sexual', value: 'No' }, options: ['Sí', 'No'] },
    ]
  },
  {
    title: 'Uso correcto de anticonceptivos',
    questions: [
      { key: 'preservativo_conoce', label: '¿Sabés usar correctamente el preservativo?', type: 'radio', required: true, options: ['Sí', 'Más o menos', 'No'] },
      { key: 'otros_metodos', label: '¿Conocés otros métodos anticonceptivos?', type: 'radio', required: true, options: ['Sí', 'No'] },
      { key: 'escuela_anti', label: '¿La escuela enseña suficiente sobre anticonceptivos?', type: 'radio', required: true, options: ['Sí', 'No', 'Más o menos'] },
    ]
  },
  {
    title: 'Bullying',
    questions: [
      { key: 'bullying', label: '¿Sentís que en tu curso hay discriminación o bullying?', type: 'radio', required: true, options: ['Sí', 'A veces', 'No'] },
      { key: 'motivo_bullying', label: '¿Por cuál motivo suele pasar más?', type: 'radio', required: true, options: ['Apariencia', 'Opiniones', 'Orientación sexual', 'Identidad de género', 'Otro'] },
    ]
  },
  {
    title: 'Diversidad y discriminación',
    questions: [
      { key: 'orientacion', label: '¿Cómo te identificás en tu orientación sexual?', type: 'radio', required: true, options: ['Heterosexual', 'Homosexual', 'Bisexual', 'Pansexual', 'Asexual', 'Otra'] },
      { key: 'abierto_sexualidad', label: '¿Te sentís abierto/a con tu sexualidad?', type: 'radio', requiredWhenVisible: true, visibleIf: { field: 'orientacion', valueNot: 'Heterosexual' }, options: ['Sí', 'No', 'Depende'] },
      { key: 'discriminado_sexualidad', label: '¿Te sentís discriminado/a por tu sexualidad?', type: 'radio', requiredWhenVisible: true, visibleIf: { field: 'orientacion', valueNot: 'Heterosexual' }, options: ['Sí', 'A veces', 'No'] },
      { key: 'identidad_genero', label: '¿Cómo te identificás en tu identidad de género?', type: 'radio', required: true, options: ['Cisgénero', 'Trans', 'No binario', 'Otro'] },
      { key: 'abierto_identidad', label: '¿Te sentís abierto/a con tu identidad de género?', type: 'radio', requiredWhenVisible: true, visibleIf: { field: 'identidad_genero', valueNot: 'Cisgénero' }, options: ['Sí', 'No', 'Depende'] },
      { key: 'discriminado_identidad', label: '¿Te sentís discriminado/a por tu identidad de género?', type: 'radio', requiredWhenVisible: true, visibleIf: { field: 'identidad_genero', valueNot: 'Cisgénero' }, options: ['Sí', 'A veces', 'No'] },
    ]
  },
  {
    title: 'Abuso de alcohol',
    questions: [
      { key: 'alcohol_vez', label: '¿Consumiste alguna vez una bebida alcohólica?', type: 'radio', required: true, options: ['Sí', 'No'] },
      { key: 'alcohol_frecuencia', label: '¿Con qué frecuencia consumís bebidas alcohólicas?', type: 'radio', required: true, options: ['Nunca', 'Rara vez', 'A veces', 'Frecuentemente'] },
    ]
  },
  {
    title: 'Abuso de sustancias ilícitas',
    questions: [
      { key: 'sustancias_vez', label: '¿Consumiste alguna vez sustancias ilícitas?', type: 'radio', required: true, options: ['Sí', 'No'] },
      { key: 'sustancias_frecuencia', label: '¿Con qué frecuencia consumís sustancias ilícitas?', type: 'radio', required: true, options: ['Nunca', 'Rara vez', 'A veces', 'Frecuentemente'] },
    ]
  },
  {
    title: 'Autopercepción corporal',
    questions: [
      { key: 'imagen_corporal', label: '¿Cómo te sentís con tu imagen corporal?', type: 'radio', required: true, options: ['Muy conforme', 'Conforme', 'Poco conforme'] },
      { key: 'redes_influyen', label: '¿Las redes sociales influyen en cómo te ves?', type: 'radio', required: true, options: ['Sí', 'A veces', 'No'] },
      { key: 'comparacion', label: '¿Te comparás seguido con otras personas?', type: 'radio', required: true, options: ['Sí', 'A veces', 'No'] },
      { key: 'hablo_mal', label: '¿Has hablado mal de alguien a sus espaldas?', type: 'select', required: true, options: ['Sí', 'No'] },
      { key: 'escucho_mal', label: '¿Has escuchado gente hablar mal de vos a tus espaldas?', type: 'select', required: true, options: ['Sí', 'No'] },
    ]
  },
  {
    title: 'Autoestima',
    questions: [
      { key: 'esi_suficiente', label: '¿Sentís que las jornadas de ESI son suficientes?', type: 'radio', required: true, options: ['Sí', 'No', 'Más o menos'] },
      { key: 'temas_esi', label: '¿Qué temas te gustaría ver en próximas jornadas de ESI?', type: 'checkbox', required: false, options: ['Sexualidad', 'Uso correcto de anticonceptivos', 'Bullying', 'Diversidad y discriminación', 'Abuso de alcohol', 'Abuso de sustancias ilícitas', 'Autopercepción corporal', 'Autoestima'] },
    ]
  },
];

const FIELD_ORDER = [
  'id', 'curso', 'started_at', 'submitted_at',
  'novi', 'vida_sexual', 'preservativo', 'otros_anticonceptivos', 'info_futuro',
  'preservativo_conoce', 'otros_metodos', 'escuela_anti',
  'bullying', 'motivo_bullying',
  'orientacion', 'abierto_sexualidad', 'discriminado_sexualidad',
  'identidad_genero', 'abierto_identidad', 'discriminado_identidad',
  'alcohol_vez', 'alcohol_frecuencia',
  'sustancias_vez', 'sustancias_frecuencia',
  'imagen_corporal', 'redes_influyen', 'comparacion', 'hablo_mal', 'escucho_mal',
  'esi_suficiente', 'temas_esi'
];

function getStored() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
  catch { return []; }
}

function saveStored(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function csvEscape(value) {
  const s = String(value ?? '');
  return '"' + s.replace(/"/g, '""') + '"';
}

function asText(value) {
  if (Array.isArray(value)) return value.filter(Boolean).join(' | ');
  return value ?? '';
}

function buildQuestion(sectionIndex, questionIndex, question) {
  const block = document.createElement('div');
  block.className = 'question';
  block.dataset.key = question.key;
  if (question.visibleIf) {
    block.dataset.visibleField = question.visibleIf.field;
    if (Object.prototype.hasOwnProperty.call(question.visibleIf, 'value')) block.dataset.visibleValue = question.visibleIf.value;
    if (Object.prototype.hasOwnProperty.call(question.visibleIf, 'valueNot')) block.dataset.visibleNot = question.visibleIf.valueNot;
    if (question.requiredWhenVisible) block.dataset.requiredWhenVisible = 'true';
  }

  const title = document.createElement('span');
  title.className = 'qtitle';
  title.textContent = question.label;
  block.appendChild(title);

  if (question.type === 'radio') {
    const options = document.createElement('div');
    options.className = 'options';
    question.options.forEach((option, idx) => {
      const id = `q_${sectionIndex}_${questionIndex}_${idx}`;
      const opt = document.createElement('div');
      opt.className = 'opt';
      const input = document.createElement('input');
      input.type = 'radio';
      input.name = question.key;
      input.id = id;
      input.value = option;
      input.required = !!question.required && !question.visibleIf;
      const label = document.createElement('label');
      label.setAttribute('for', id);
      label.textContent = option;
      opt.append(input, label);
      options.appendChild(opt);
    });
    block.appendChild(options);
  } else if (question.type === 'select') {
    const select = document.createElement('select');
    select.name = question.key;
    select.required = !!question.required;
    const empty = document.createElement('option');
    empty.value = '';
    empty.textContent = 'Elegí una opción';
    select.appendChild(empty);
    question.options.forEach(option => {
      const o = document.createElement('option');
      o.value = option;
      o.textContent = option;
      select.appendChild(o);
    });
    block.appendChild(select);
  } else if (question.type === 'checkbox') {
    const list = document.createElement('div');
    list.className = 'checkbox-list';
    question.options.forEach((option, idx) => {
      const id = `q_${sectionIndex}_${questionIndex}_${idx}`;
      const label = document.createElement('label');
      label.className = 'check';
      label.setAttribute('for', id);
      const input = document.createElement('input');
      input.type = 'checkbox';
      input.name = `${question.key}[]`;
      input.id = id;
      input.value = option;
      label.append(input, document.createTextNode(' ' + option));
      list.appendChild(label);
    });
    block.appendChild(list);
    const hint = document.createElement('div');
    hint.className = 'hint';
    hint.textContent = 'Podés marcar más de una opción.';
    block.appendChild(hint);
  }

  return block;
}

function buildSurveyMarkup() {
  const container = document.getElementById('survey-sections');
  if (!container) return;
  container.innerHTML = '';
  SURVEY.forEach((section, sIdx) => {
    const card = document.createElement('div');
    card.className = 'section-card';
    const h2 = document.createElement('h2');
    h2.className = 'section-title';
    h2.textContent = section.title;
    card.appendChild(h2);
    section.questions.forEach((question, qIdx) => {
      card.appendChild(buildQuestion(sIdx, qIdx, question));
    });
    container.appendChild(card);
  });
}

function collectAnswers(form) {
  const answers = {};
  form.querySelectorAll('input, select, textarea').forEach(el => {
    if (!el.name) return;
    if (el.name.endsWith('[]')) return;
    if (el.type === 'radio') {
      if (el.checked) answers[el.name] = el.value;
      return;
    }
    if (el.type === 'checkbox') {
      if (!answers[el.name]) answers[el.name] = [];
      if (el.checked) answers[el.name].push(el.value);
      return;
    }
    answers[el.name] = el.value;
  });
  return answers;
}

function updateConditionalFields(form) {
  const answers = collectAnswers(form);
  form.querySelectorAll('[data-visible-field]').forEach(block => {
    const field = block.dataset.visibleField;
    const current = answers[field] ?? '';
    let show = true;
    if (block.dataset.visibleValue) show = current === block.dataset.visibleValue;
    if (block.dataset.visibleNot) show = current !== '' && current !== block.dataset.visibleNot;
    block.classList.toggle('hidden', !show);

    block.querySelectorAll('input, select, textarea').forEach(el => {
      if (!el.name) return;
      const required = show && block.dataset.requiredWhenVisible === 'true';
      if (el.type === 'radio' || el.tagName === 'SELECT') el.required = required;
      if (!show) {
        if (el.type === 'radio' || el.type === 'checkbox') el.checked = false;
        if (el.tagName === 'SELECT') el.value = '';
      }
    });
  });
}

function initSurvey() {
  const form = document.getElementById('survey-form');
  if (!form) return;
  const startedAtInput = document.getElementById('started_at');
  startedAtInput.value = new Date().toISOString();

  buildSurveyMarkup();
  updateConditionalFields(form);
  form.addEventListener('change', () => updateConditionalFields(form));
  form.addEventListener('input', () => updateConditionalFields(form));

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const fd = new FormData(form);
    const record = {
      id: (window.crypto && crypto.randomUUID) ? crypto.randomUUID() : `resp_${Date.now()}`,
      curso: fd.get('curso') || '',
      started_at: fd.get('started_at') || new Date().toISOString(),
      submitted_at: new Date().toISOString(),
      novi: fd.get('novi') || '',
      vida_sexual: fd.get('vida_sexual') || '',
      preservativo: fd.get('preservativo') || '',
      otros_anticonceptivos: fd.get('otros_anticonceptivos') || '',
      info_futuro: fd.get('info_futuro') || '',
      preservativo_conoce: fd.get('preservativo_conoce') || '',
      otros_metodos: fd.get('otros_metodos') || '',
      escuela_anti: fd.get('escuela_anti') || '',
      bullying: fd.get('bullying') || '',
      motivo_bullying: fd.get('motivo_bullying') || '',
      orientacion: fd.get('orientacion') || '',
      abierto_sexualidad: fd.get('abierto_sexualidad') || '',
      discriminado_sexualidad: fd.get('discriminado_sexualidad') || '',
      identidad_genero: fd.get('identidad_genero') || '',
      abierto_identidad: fd.get('abierto_identidad') || '',
      discriminado_identidad: fd.get('discriminado_identidad') || '',
      alcohol_vez: fd.get('alcohol_vez') || '',
      alcohol_frecuencia: fd.get('alcohol_frecuencia') || '',
      sustancias_vez: fd.get('sustancias_vez') || '',
      sustancias_frecuencia: fd.get('sustancias_frecuencia') || '',
      imagen_corporal: fd.get('imagen_corporal') || '',
      redes_influyen: fd.get('redes_influyen') || '',
      comparacion: fd.get('comparacion') || '',
      hablo_mal: fd.get('hablo_mal') || '',
      escucha_mal: fd.get('escucha_mal') || '',
      esi_suficiente: fd.get('esi_suficiente') || '',
      temas_esi: fd.getAll('temas_esi[]').join(' | '),
    };

    const items = getStored();
    items.push(record);
    saveStored(items);

    const msg = document.getElementById('saved-message');
    if (msg) msg.classList.remove('hidden');
    form.reset();
    startedAtInput.value = new Date().toISOString();
    updateConditionalFields(form);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function buildCharts(rows) {
  const questions = {
    esi_suficiente: '¿Sentís que las jornadas de ESI son suficientes?',
    alcohol_vez: '¿Consumiste alguna vez una bebida alcohólica?',
    sustancias_vez: '¿Consumiste alguna vez sustancias ilícitas?',
    imagen_corporal: '¿Cómo te sentís con tu imagen corporal?',
    redes_influyen: '¿Las redes sociales influyen en cómo te ves?',
    comparacion: '¿Te comparás seguido con otras personas?'
  };
  const container = document.getElementById('charts');
  if (!container) return;
  container.innerHTML = '';

  Object.entries(questions).forEach(([key, label]) => {
    const counts = new Map();
    rows.forEach(row => {
      const value = row[key];
      if (!value) return;
      counts.set(value, (counts.get(value) || 0) + 1);
    });
    const ordered = [...counts.entries()].sort((a, b) => b[1] - a[1]);
    const card = document.createElement('div');
    card.className = 'chart';
    const h3 = document.createElement('h3');
    h3.textContent = label;
    card.appendChild(h3);
    if (!ordered.length) {
      const note = document.createElement('div');
      note.className = 'notice';
      note.textContent = 'Aún no hay datos para mostrar.';
      card.appendChild(note);
    } else {
      const max = Math.max(...ordered.map(([, c]) => c));
      const wrap = document.createElement('div');
      wrap.className = 'bar-wrap';
      ordered.forEach(([opt, count]) => {
        const row = document.createElement('div');
        row.className = 'bar-row';
        const labelBox = document.createElement('div');
        labelBox.className = 'bar-label';
        labelBox.textContent = opt;
        const track = document.createElement('div');
        track.className = 'bar-track';
        const fill = document.createElement('div');
        fill.className = 'bar-fill';
        fill.style.width = `${Math.max(4, Math.round((count / max) * 100))}%`;
        track.appendChild(fill);
        const num = document.createElement('div');
        num.className = 'bar-num';
        num.textContent = count;
        row.append(labelBox, track, num);
        wrap.appendChild(row);
      });
      card.appendChild(wrap);
    }
    container.appendChild(card);
  });
}

function buildTable(rows) {
  const wrap = document.getElementById('table-wrap');
  const table = document.getElementById('responses-table');
  if (!wrap || !table) return;
  table.innerHTML = '';

  const head = document.createElement('thead');
  const tr = document.createElement('tr');
  FIELD_ORDER.forEach(key => {
    const th = document.createElement('th');
    th.textContent = key;
    tr.appendChild(th);
  });
  head.appendChild(tr);
  table.appendChild(head);

  const body = document.createElement('tbody');
  [...rows].slice().reverse().forEach(row => {
    const trb = document.createElement('tr');
    FIELD_ORDER.forEach(key => {
      const td = document.createElement('td');
      const val = row[key];
      if (key === 'submitted_at' && val) td.textContent = new Date(val).toLocaleString('es-AR');
      else td.textContent = asText(val);
      trb.appendChild(td);
    });
    body.appendChild(trb);
  });
  table.appendChild(body);
  wrap.classList.toggle('hidden', rows.length === 0);
}

function initAdmin() {
  const root = document.getElementById('admin-root');
  if (!root) return;
  const rows = getStored();
  const total = document.getElementById('total-count');
  const lastDate = document.getElementById('last-date');
  if (total) total.textContent = rows.length;
  if (lastDate) lastDate.textContent = rows.length ? new Date(rows[rows.length - 1].submitted_at).toLocaleString('es-AR') : '—';
  buildCharts(rows);
  buildTable(rows);

  const clearBtn = document.getElementById('clear-data');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (confirm('¿Borrar todas las respuestas guardadas en este navegador?')) {
        localStorage.removeItem(STORAGE_KEY);
        initAdmin();
      }
    });
  }

  const exportBtn = document.getElementById('export-csv');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      const allRows = getStored();
      const csvRows = [FIELD_ORDER.map(csvEscape).join(',')];
      allRows.forEach(row => {
        csvRows.push(FIELD_ORDER.map(key => csvEscape(asText(row[key]))).join(','));
      });
      const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'respuestas_esi.csv';
      a.click();
      URL.revokeObjectURL(url);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initSurvey();
  initAdmin();
});
