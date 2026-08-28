# Índice de fuentes y evidencia

Última actualización: 27 de agosto de 2026.

## Fuentes internas auditadas

### Hand-off

- Archivo: `Handoff — Proyecto Cocinerías de Chile(1).md`.
- Fecha de corte declarada: 21 de agosto de 2026.
- Uso: visión, decisiones, evolución, reemplazos, pendientes y forma de trabajo.
- Límite: documento de migración; no prueba por sí solo que una función esté implementada.

### Repositorio

- URL: https://github.com/consunise/cocinerias-codex-lab
- Rama: `main`.
- Commit auditado: `045dd1fc3add89ee6094d7fe72704e0bc27ab924`.
- Fecha del commit: 21 de agosto de 2026, 21:25:36 UTC-4.
- Uso: estado implementado, árbol, stack, datos, assets, scripts e historial reciente.

Archivos principales inspeccionados:

- `index.html`, `styles.css`, `script.js`, `data.js`;
- `scripts/normalize-data.mjs`, `scripts/curate-images.mjs`, `scripts/sync-images.mjs`;
- manifests JSON y archivos de atribución de assets;
- prompts duplicados de la raíz y `cambios/`;
- historial Git disponible.

### Dataset

- Fuente declarada: `directorio_cocinerias_chile.md`.
- Estado: ausente del repositorio público e ignorado por `.gitignore`.
- Salida disponible: `data.js`, 101 registros, fecha de verificación declarada 12 de agosto de 2026.
- Fuentes por establecimiento: `primarySource` y `additionalSources` dentro de cada registro.
- Regla: `data.js` no reemplaza la necesidad de conservar la fuente canónica y la trazabilidad por campo.

### Imágenes

- `assets/images/cocinerias/image-sources.json`: 101 fuentes, uso, autor y licencia.
- `assets/images/cocinerias/image-audit.json`: hashes y auditoría de unicidad.
- `assets/images/cocinerias/ATTRIBUTIONS.md`: tabla legible de atribuciones.
- `assets/images/about/ATTRIBUTION.md`: fuentes del carrusel y assets históricos.
- `assets/icons/social/ATTRIBUTION.md`: procedencia de PNG de Flaticon; actualmente los PNG no se usan en la interfaz.

## Documentación oficial de OpenAI

Consulta: 21 de agosto de 2026.

### ChatGPT Projects

- [Projects in ChatGPT](https://help.openai.com/en/articles/10169521-projects-in-chatgpt)
- Verificado: archivos y fuentes, Project Instructions, precedencia sobre instrucciones globales, memoria de Projects, 25 archivos para Plus y máximo de 10 por carga.
- También verificado: Work no está disponible con project-only memory; los Projects compartidos usan project-only memory.

### ChatGPT Work y Codex

- [ChatGPT Work and Codex](https://help.openai.com/en/articles/20001275-chatgpt-work-and-codex)
- Verificado: Work puede iniciarse desde un Project usando su contexto; Work cloud sincroniza entre superficies; Codex sigue como vista separada y trabaja con carpetas/repositorios locales.

### AGENTS.md y configuración de Codex

- [Custom instructions with AGENTS.md](https://developers.openai.com/codex/agent-configuration/agents-md)
- Verificado: descubrimiento desde raíz hacia directorio de trabajo, un archivo por directorio, precedencia de `AGENTS.override.md`, prioridad de instrucciones más cercanas y límite combinado predeterminado de 32 KiB.

- [Codex customization](https://developers.openai.com/codex/customization/overview)
- Verificado: `AGENTS.md` debe mantenerse pequeño y contener reglas durables, rutas, comandos reales y expectativas del repositorio.

- [Codex best practices](https://developers.openai.com/codex/learn/best-practices)
- Verificado: `AGENTS.md` como guía práctica, posibilidad de enlazar documentación especializada y recomendación de no sobrecargarlo.

- [Review GitHub pull requests with Codex](https://developers.openai.com/codex/third-party/github)
- Verificado: reglas de revisión globales en el `AGENTS.md` raíz y reglas anidadas solo cuando una parte del árbol necesita criterios específicos.

## Mapas y reseñas externas

Consulta: 26 de agosto de 2026.

### Google Maps Platform

- [Place Details (New)](https://developers.google.com/maps/documentation/places/web-service/place-details)
- Verificado: la obtención de reseñas exige un Place ID, una API key y el field mask correspondiente; el campo de reseñas pertenece al nivel Enterprise + Atmosphere.
- [Policies and attributions for Places API](https://developers.google.com/maps/documentation/places/web-service/policies)
- Verificado: el contenido de reseñas exige atribución de autor y Google Maps, enlaces devueltos por la API cuando existan y cumplimiento de las reglas de presentación y orden. Estas fuentes respaldan el bloqueo de `INTEGRATION-001`; no se incorporó contenido de Google.

### OpenStreetMap

- [OpenStreetMap copyright and attribution guidelines](https://www.openstreetmap.org/copyright/attribution-guide)
- Verificado: el preview debe acreditar a los colaboradores de OpenStreetMap y enlazar la información de copyright/licencia ODbL. Se usa únicamente con coordenadas ya presentes en el dataset.

## Fotografías activas del header

Consulta: 27 de agosto de 2026. Los cuatro originales se obtuvieron desde Wikimedia Commons y se optimizaron localmente a 2880 px de ancho sin upscaling. La trazabilidad operativa completa también queda en `assets/images/about/ATTRIBUTION.md`.

| Uso | Fuente y autor | Original aprox. | Archivo local | Licencia |
|---|---|---:|---:|---|
| Intro, empanada chilena en Guanaqueros | [Empanada (48338430441).jpg](https://commons.wikimedia.org/wiki/File:Empanada_(48338430441).jpg), S. Rae | 4032 × 3024 | 2880 × 2160 | CC BY 2.0 |
| Top 1, referencia territorial de Puerto Saavedra | [Costanera de Puerto Saavedra.jpg](https://commons.wikimedia.org/wiki/File:Costanera_de_Puerto_Saavedra.jpg), Cris.tbl | 4032 × 3024 | 2880 × 2160 | CC BY 4.0 |
| Top 2, referencia territorial de Arica | [Arica - Chile - panoramio (1).jpg](https://commons.wikimedia.org/wiki/File:Arica_-_Chile_-_panoramio_(1).jpg), Pavel Špindler | 3872 × 2592 | 2880 × 1928 | CC BY 3.0 |
| Top 3, referencia territorial de Valparaíso | [Valparaiso panorámica.JPG](https://commons.wikimedia.org/wiki/File:Valparaiso_panor%C3%A1mica.JPG), Gustavo Buzai | 4608 × 3456 | 2880 × 2160 | CC BY-SA 4.0 |

HECHO: las páginas de Commons identifican autor, resolución original y licencia; los cuatro archivos locales fueron inspeccionados a resolución natural y no contienen watermark. Las fotografías de Puerto Saavedra, Arica y Valparaíso documentan territorio o contexto, no el interior ni la fachada de los establecimientos asociados.

## Destacados de la guía por atributo

Consulta: 27 de agosto de 2026. Estos casos son selecciones editoriales separadas del Top 3; la existencia, ubicación base e ID se contrastaron además con el dataset vigente sin modificar `data.js`.

### Na Que Ver Cocinería Chilena — Cocina chilena de mercado

- Fuente oficial: [Na Que Ver · Local](https://www.naquevercocineria.cl/local).
- HECHO: el sitio oficial presenta una cocinería chilena en Barrio Yungay y mantiene una carta vigente de preparaciones chilenas y alternativas vegetales.
- HECHO interno: el registro `CL-RM-001` declara inicio en 2017 y una propuesta de cocina casera y de mercado.
- SELECCIÓN EDITORIAL: `Cocina chilena de mercado` combina la oferta chilena visible en la carta oficial con la descripción de cocina casera y de mercado del registro; no constituye premio ni certificación.

### Restaurant Tradiciones Cocinería Morelia — Productos de huerta

- Fuente regional: [Viajeros por Chiloé · Restaurant Tradiciones Cocinería Morelia](https://www.viajerosporchiloe.cl/places/restaurant-tradiciones-cocineria-morelia/).
- HECHO: la ficha consultada ubica el establecimiento camino a Cucao y declara preparación de platos típicos con productos frescos de su propia huerta y productos de la zona.
- SELECCIÓN EDITORIAL: `Productos de huerta` se apoya directamente en esa descripción; no se deduce solo de una categoría gastronómica.

### Cocinería Puelpún — Trayectoria histórica

- Historia: [El Pingüino · 50 años de la cocinería Puelpún en Punta Arenas](https://elpinguino.com/noticias/158669/50-aos-de-la-cocinera-Puelpn-en-Punta-Arenas).
- Vigencia territorial: [Visit Magallanes · Gastronomía, página 2](https://visitmagallanes.com/categorias/gastronomia/page/2/index.html).
- HECHO: la crónica local documenta el inicio familiar en 1965 y continuidad por descendientes; el portal turístico regional mantiene una ficha de la cocinería frente al Muelle Arturo Prat.
- SELECCIÓN EDITORIAL: `Trayectoria histórica` describe esa continuidad documentada. No se presenta como declaratoria patrimonial ni certificación externa.

## Criterio de uso

- Estado implementado: repositorio en un commit identificado.
- Intención: decisiones y especificación consolidadas desde el hand-off.
- Producto OpenAI: documentación oficial vigente, con nueva consulta cuando la interfaz o los límites puedan haber cambiado.
- Datos gastronómicos: fuentes del establecimiento y organismos públicos primero; registrar fecha y nivel de certeza.

## Limitaciones de la auditoría

- No se accedió al archivo fuente privado `directorio_cocinerias_chile.md`.
- No se verificaron nuevamente en la web los 101 establecimientos ni todas sus fuentes; se auditó la estructura y procedencia declarada del dataset.
- No se consultaron ni copiaron reseñas de establecimientos; la revisión web se limitó a los requisitos oficiales de integración y atribución.
- La investigación de esta ronda se limitó a los tres destacados anteriores y a las cuatro fotografías del header; no revalida los restantes establecimientos ni las 101 imágenes del directorio.
- No se modificó ni publicó el repositorio remoto.
