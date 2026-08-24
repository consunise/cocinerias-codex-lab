# Changelog del proyecto

Este archivo registra cambios implementados relevantes. No contiene solicitudes pendientes ni reconstruye detalles que no pueden comprobarse.

## Sin publicar

### 2026-08-24 — Footer terracota

- Implementado: fondo `--terracotta` sin línea superior, con texto, enlaces, iconos y estados interactivos ajustados para mantener contraste.
- Archivos: `styles.css` y documentación canónica asociada.
- Decisión relacionada: DEC-010.
- Validación ejecutada: sintaxis JavaScript, `git diff --check`, contraste calculado y revisión responsive del footer.

## Baseline documental — 2026-08-21

- Estado auditado en rama `main`, commit `045dd1fc3add89ee6094d7fe72704e0bc27ab924` (`correcciones version 0.9.2`).
- Se identificaron 101 registros, paginación de 10, cuatro filtros, modal navegable, carrusel editorial Top 3 y responsive en CSS.
- Se registraron discrepancias de footer, flecha de `Ver ficha`, fuente de datos ausente y prototipos activos.
- Esta entrada documenta el baseline; no implica modificación del sitio.

## Plantilla futura

```md
## YYYY-MM-DD — Título breve

- Implementado: [comportamiento observable].
- Archivos: `ruta`.
- Decisión relacionada: DEC-XXX, si aplica.
- Validación ejecutada: [comandos/revisión real].
- Pendientes: [solo si quedaron].
```
