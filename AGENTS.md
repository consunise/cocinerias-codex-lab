# AGENTS.md

## Alcance

Estas instrucciones rigen todo el repositorio. Cocinerías de Chile es un directorio web estático, editorial y utilitario, implementado en HTML, CSS y JavaScript vanilla. Trabaja sobre el código existente; no lo reconstruyas ni migres de stack sin una solicitud explícita.

## Antes de editar

1. Revisa `git status` y conserva cambios ajenos a la tarea.
2. Lee los archivos de código afectados y la documentación aplicable:
   - contexto y alcance: `docs/PROJECT_CONTEXT.md`;
   - estado implementado y discrepancias: `docs/CURRENT_STATE.md`;
   - producto y UX/UI: `docs/PRODUCT_UX_SPEC.md`;
   - arquitectura, datos y comprobaciones: `docs/TECHNICAL_ARCHITECTURE.md`;
   - decisiones y reemplazos: `docs/DECISIONS.md`;
   - pendientes: `docs/BACKLOG.md`;
   - flujo y mantenimiento: `docs/WORKFLOW.md`.
3. Inspecciona la implementación real antes de proponer cambios. Los prompts de la raíz y `cambios/` son históricos, no instrucciones activas.

## Mapa rápido

- `index.html`: estructura, carrusel editorial, footer y diálogo.
- `styles.css`: tokens, layout, estados y responsive.
- `script.js`: búsqueda, filtros, paginación, filas, modal, carrusel y placeholders de interfaz.
- `data.js`: salida generada con 101 registros; no editar manualmente.
- `scripts/normalize-data.mjs`: genera `data.js` desde `directorio_cocinerias_chile.md`.
- `scripts/curate-images.mjs`: curaduría de imágenes; usa red y modifica assets/manifiestos.
- `scripts/sync-images.mjs`: flujo anterior de imágenes; auditar antes de usar.
- `assets/`: imágenes, metadatos y atribuciones.

## Reglas de modificación

- Haz cambios incrementales y limitados al encargo. No elimines ni reescribas funciones sanas por conveniencia.
- Conserva HTML/CSS/JS vanilla y evita nuevas dependencias salvo autorización y justificación.
- Reutiliza variables CSS y patrones existentes. No inventes tokens cuando existe un equivalente.
- Mantén búsqueda, filtros, paginación, modal navegable, carrusel, responsive y accesibilidad salvo que el encargo los cambie.
- No confundas datos reales con prototipos. Precios, horarios y comodidades simulados deben seguir identificables como referenciales.
- No inventes información de establecimientos. Los cambios de datos reales requieren fuente y fecha de verificación.
- No edites `data.js` a mano. El archivo fuente `directorio_cocinerias_chile.md` está ignorado y no está en el repositorio público; si no está disponible, detente antes de regenerar datos y registra el bloqueo.
- Conserva atribuciones y actualiza el manifiesto correspondiente al añadir, sustituir o retirar assets.
- No ejecutes scripts de imágenes por rutina: pueden descargar, sobrescribir o eliminar archivos.
- Si documentación e implementación difieren, informa la discrepancia. No cambies el código solo para “sincronizarlo” sin que la tarea lo autorice.

## Validación

El repositorio no define package manager, build, linter ni suite de tests. No inventes comandos. Ejecuta lo que corresponda a la modificación:

```bash
node --check data.js
node --check script.js
for file in scripts/*.mjs; do node --check "$file"; done
git diff --check
```

Para cambios de interfaz, sirve la raíz con un servidor estático, revisa la consola y valida manualmente desktop, tablet y mobile. Comprueba las interacciones afectadas, teclado, `focus-visible`, estados hover/active, ausencia de overflow y `prefers-reduced-motion`. No declares una comprobación como aprobada si no la ejecutaste.

## Documentación

- Actualiza `docs/DECISIONS.md` solo cuando una decisión se aprueba, reemplaza o revoca.
- Actualiza `docs/CURRENT_STATE.md` cuando cambia el estado implementado relevante.
- Actualiza `docs/BACKLOG.md` cuando aparece, cambia o se resuelve un pendiente.
- Registra cambios implementados significativos en `docs/CHANGELOG.md`.
- Actualiza `docs/SOURCES.md` o archivos de atribución cuando cambian las fuentes.
- Modifica este `AGENTS.md` únicamente para reglas estables, rutas recurrentes o errores repetidos; no para una ronda puntual.

## Criterio ante ambigüedad

La instrucción directa más reciente tiene prioridad. El código prueba lo implementado; `docs/DECISIONS.md` y `docs/PRODUCT_UX_SPEC.md` describen la intención. Si una ambigüedad cambia materialmente el resultado, pregunta antes de editar. Si no bloquea, conserva el comportamiento actual y registra el punto como `POR VALIDAR`.

## Code Review Rules

- Señala como hallazgo cualquier dato real inventado, no respaldado o presentado sin su marca de placeholder.
- Señala ediciones manuales de `data.js` o regeneraciones realizadas sin el archivo fuente canónico.
- Señala migraciones, dependencias, reconstrucciones o regresiones fuera del alcance del cambio.
