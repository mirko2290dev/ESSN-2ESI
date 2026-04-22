# Encuesta ESI para GitHub Pages

Esta versión fue adaptada para funcionar sin PHP.

## Qué hace
- Muestra toda la encuesta en una sola página.
- Guarda cada envío en `localStorage` del navegador.
- Incluye un panel de resultados con gráficos simples y tabla.
- Permite descargar un CSV con las respuestas.

## Importante
GitHub Pages no ejecuta `PHP` ni guarda archivos en el servidor desde el navegador. Por eso esta versión guarda los datos en el navegador donde se completa la encuesta.

## Subida a GitHub
1. Subí `index.html`, `admin.html`, `styles.css` y `app.js` a tu repositorio.
2. Activá GitHub Pages desde la rama principal.
3. Abrí `index.html` para responder la encuesta.
4. Abrí `admin.html` para ver/exportar resultados.

## Si necesitás guardar respuestas de muchas personas en un solo lugar
Necesitás conectar un servicio externo, como Google Sheets, Firebase o un backend propio.
