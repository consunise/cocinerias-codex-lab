# Backlog consolidado

Última revisión: 27 de agosto de 2026.

Este backlog registra pendientes, no autoriza su implementación. Las prioridades reflejan riesgo para continuidad o publicación.

## P0 — Antes de considerar producción

### DATA-001 — Recuperar la fuente canónica del dataset

Estado: `PENDIENTE`

Problema: `directorio_cocinerias_chile.md` está ignorado y ausente del repositorio público, pero `normalize-data.mjs` lo necesita y `data.js` declara provenir de él.

Criterio de cierre:

- definir una ubicación segura y accesible para el archivo canónico;
- documentar cómo materializarlo antes de regenerar;
- ejecutar el normalizador con 101 registros;
- revisar y versionar el diff de `data.js` sin publicar información privada indebida.

### DATA-002 — Retirar o reemplazar prototipos de precio, horario y comodidades

Estado: `PENDIENTE`

Problema: todos los precios de visualización y todas las comodidades son simulados; 74 horarios se inventan para la maqueta.

Criterio de cierre:

- disponer de datos verificados o desactivar cada prototipo;
- conservar marca de procedencia por campo;
- evitar que el usuario confunda una estimación con un hecho;
- actualizar fecha de verificación.

### DATA-003 — Auditar vigencia de los 101 establecimientos

Estado: `PENDIENTE`

Problema: 57 registros no figuran simplemente como `Activa` y todos tienen fecha de verificación 12 de agosto de 2026.

Criterio de cierre: verificar estado, fuentes principales, información práctica y confianza con metodología documentada.

### ASSET-001 — Reducir uso de fotografías territoriales como sustituto

Estado: `PENDIENTE`

Problema: 100 de 101 imágenes no corresponden directamente al establecimiento. La ficha ya evita atribuirlas implícitamente al local mediante la advertencia `Imagen de referencia territorial`, pero no reemplaza el asset.

Criterio de cierre: reemplazar gradualmente con imágenes directas autorizadas o adoptar un tratamiento visual que impida interpretar el respaldo territorial como foto del local.

### DATA-004 — Verificar coordenadas y enlaces cartográficos

Estado: `PENDIENTE`

Problema: solo 2 de 101 registros tienen coordenadas válidas y solo 3 conservan un enlace cartográfico externo. Las otras 99 fichas no pueden mostrar un preview sin geocodificar o inventar información.

Criterio de cierre:

- verificar coordenadas o URL pública contra fuente legítima por establecimiento;
- registrar URL, fecha y procedencia por campo en la fuente canónica;
- regenerar `data.js` mediante `normalize-data.mjs`, nunca editarlo manualmente;
- comprobar enlace, marker y atribución antes de publicar.

## P1 — Próxima consolidación de producto

### UX-002 — Corregir la flecha de “Ver ficha”

Estado: `APROBADO PERO NO IMPLEMENTADO`

Criterio de cierre: flecha hacia abajo, centrada bajo el texto, con hover/foco y área clickeable preservados.

### CONTENT-001 — Formalizar criterios y mantenimiento de selecciones editoriales

Estado: `PENDIENTE`

Criterio de cierre:

- definir que es selección editorial y no ranking objetivo;
- distinguir formalmente Top 3 general de destacados por atributo;
- registrar criterios, evidencia mínima, caducidad y fecha de reevaluación;
- verificar Restaurante Pily, Mata Rangi y Cocinería Bellavista;
- reevaluar Na Que Ver Cocinería Chilena, Restaurant Tradiciones Cocinería Morelia y Cocinería Puelpún contra sus atributos documentados;
- respaldar platos, descripciones y labels sin claims absolutos.

### COMMS-001 — Definir enlaces sociales y CTA

Estado: `PENDIENTE`

Criterio de cierre: URLs reales de WhatsApp/Instagram y flujo autorizado para `Sé parte de la guía`, con estados de error/éxito si corresponde.

### INTEGRATION-001 — Incorporar reseñas externas autorizadas de Google

Estado: `BLOQUEADO POR INTEGRACIÓN Y DATOS`

Problema: el repositorio no contiene Place IDs, reseñas, backend seguro, credenciales ni una integración autorizada de Google Maps Platform. Ninguna de las 101 fichas puede mostrar reseñas verificables; copiar o scrapear Google Maps no es una alternativa válida.

Dependencias:

- aprobar Google Places API u otra fuente autorizada y su modelo de costos/operación;
- resolver credenciales fuera del repositorio estático y obtención de Place IDs;
- cumplir atribución a Google Maps, datos del autor, enlaces directos, orden y políticas vigentes;
- definir actualización, almacenamiento permitido, privacidad y estado de error.

Criterio de cierre: mostrar como máximo 2–3 reseñas legítimas por ficha, con atribución completa y enlace `Ver más reseñas en Google Maps`; conservar el estado pendiente cuando el establecimiento no tenga datos autorizados.

### DATA-005 — Incorporar menús verificables

Estado: `PENDIENTE DE DATOS`

Problema: ninguno de los 101 registros contiene un campo estructurado de menú, carta, precios, URL o PDF. La ficha omite la sección Menú para no inferir contenido desde categorías, descripción o especialidades.

Criterio de cierre: definir campos y procedencia por establecimiento en la fuente canónica; incorporar solo contenido o enlaces verificables; regenerar `data.js` mediante el normalizador y mostrar la sección únicamente cuando el registro tenga información respaldada.

### PRIVACY-001 — Definir criterio para publicar responsables

Estado: `PENDIENTE DE DECISIÓN Y TRAZABILIDAD`

Problema: 10 registros contienen `owner`, pero el esquema no distingue procedencia específica, pertinencia pública ni razón editorial para exponer un nombre personal. La ficha omite el campo de forma conservadora.

Criterio de cierre: definir finalidad pública y base editorial, registrar fuente por campo, revisar caso a caso y publicar únicamente responsables pertinentes y documentados; no trasladar nombres incidentales desde una fuente.

### QA-001 — Ronda visual y accesible del baseline

Estado: `PENDIENTE`

Criterio de cierre: revisar desktop, 980, 720, 420 y 320 px; teclado, foco, contraste, modal, filtros, paginación, carrusel, consola, overflow y reduced motion. El overflow de 15 px causado por el mínimo global en un viewport nominal de 320 px quedó corregido el 29.08.2026; la ronda integral independiente continúa pendiente.

### DOC-001 — Incorporar esta configuración al repositorio y al Project

Estado: `PENDIENTE DE INSTALACIÓN`

Criterio de cierre: versionar `AGENTS.md` y `docs/`; copiar Project Instructions; cargar las nueve fuentes canónicas al Project.

## P2 — Higiene y evolución

### REPO-001 — Resolver documentación histórica duplicada

Estado: `PENDIENTE`

Los dos prompts de la raíz son idénticos y `cambios/` contiene notas antiguas. Evaluar archivado, renombrado o eliminación en una tarea separada; no hacerlo como efecto lateral.

### ASSET-002 — Auditar assets sociales y atribución Flaticon

Estado: `POR VALIDAR`

Los PNG de Flaticon no se usan en la interfaz actual y su archivo afirma que existe atribución visible en el footer. Decidir si se retiran o vuelven a utilizar; cumplir la licencia aplicable.

### ASSET-003 — Decidir destino de imágenes históricas del carrusel

Estado: `PENDIENTE`

`empanadas-de-pino.jpg` y los tres archivos `zona-*` siguen versionados y atribuidos, pero no forman parte del carrusel activo desde la incorporación de los cuatro assets de 2880 px.

### TECH-001 — Evaluar validación automatizada mínima

Estado: `HIPÓTESIS`

Posible alcance futuro: validación HTML, lint básico o pruebas de interacciones críticas. No instalar herramientas sin decisión previa.

### TECH-002 — Documentar hosting

Estado: `NO CONFIRMADO`

Criterio de cierre: registrar plataforma, rama de despliegue, dominio, proceso de publicación y rollback cuando existan.

## Plantilla

```md
### ID — Título

Estado: PENDIENTE | EN CURSO | BLOQUEADO | RESUELTO | POR VALIDAR

Problema:

Dependencias:

Criterio de cierre:
```
