# Índice de fuentes y evidencia

Última actualización: 21 de agosto de 2026.

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

## Criterio de uso

- Estado implementado: repositorio en un commit identificado.
- Intención: decisiones y especificación consolidadas desde el hand-off.
- Producto OpenAI: documentación oficial vigente, con nueva consulta cuando la interfaz o los límites puedan haber cambiado.
- Datos gastronómicos: fuentes del establecimiento y organismos públicos primero; registrar fecha y nivel de certeza.

## Limitaciones de la auditoría

- No se accedió al archivo fuente privado `directorio_cocinerias_chile.md`.
- No se verificaron nuevamente en la web los 101 establecimientos ni todas sus fuentes; se auditó la estructura y procedencia declarada del dataset.
- No se realizó una inspección visual interactiva completa de todos los viewports del sitio.
- No se modificó ni publicó el repositorio remoto.
