# Changelog del proyecto

Este archivo registra cambios implementados relevantes. No contiene solicitudes pendientes ni reconstruye detalles que no pueden comprobarse.

## Sin publicar

### 2026-08-27 — Navbar contextual y ficha práctica editorial

- Implementado: navbar y buscador translúcidos únicamente sobre `about-lead`; un `IntersectionObserver` aplica `var(--paper)` opaco y elimina el blur después del header, con restauración al volver arriba.
- Implementado: estado sin comodidades centrado; etiquetas existentes compactadas a `padding: 0.08rem 0.25rem` y `gap: 0.45rem`, manteniendo exactamente la tipografía e iconografía de Tipo de comida.
- Implementado: el `dialog` vigente conserva su comportamiento y adopta hero con ubicación sobre nombre, introducción editorial, retícula práctica de Ubicación frente a Horario/Comodidades/Precio, reseñas pendientes compactas, Información y contacto y Sobre los datos.
- Implementado: preview OpenStreetMap solo para coordenadas válidas; Menú se omite por ausencia total de campos respaldados; contactos se limitan a campos existentes y URLs sanitizadas; `owner` no se expone sin criterio público estructurado.
- Archivos: `index.html`, `styles.css`, `script.js` y documentación canónica asociada. `data.js`, assets y dependencias no fueron modificados.
- Decisiones relacionadas: DEC-017 y DEC-019.
- Validación ejecutada: sintaxis JavaScript, `git diff --check`, servidor estático, navbar en los cuatro slides y después del header, filas con/sin comodidades, fichas Top 1/2/3, mapas con/sin coordenadas, platos con/sin datos, contactos, reviews pendientes, navegación, Escape, foco y revisión en 1440, 980, 720, 420 y 320 px sin overflow ni errores de consola.

### 2026-08-25 — Taxonomía alimentaria y autocomplete por nombre

- Implementado: todo el contenido de `restaurant-main` comparte alineación izquierda, incluida la jerarquía ubicación → nombre, sin cambiar la retícula de columnas.
- Implementado: cajas editoriales con alternancia `--terracotta`/`--paper` en los cuatro slides y dots individuales sin fondo rectangular en el wrapper.
- Implementado: `Vegano`, `Vegetariano` y `Celíaco` pasan a Tipo de comida como datos referenciales; Comodidades queda en `Pet friendly`, `Estacionamiento` y `Accesibilidad`; se elimina `Alergias friendly` de filtros y filas.
- Implementado: autocomplete por nombre con hasta siete sugerencias, prioridad de coincidencias iniciales, normalización de mayúsculas/tildes, selección exacta y teclado combobox/listbox.
- Implementado: footer desktop con tres columnas iguales y un único gap; apilamiento mobile conservado.
- Archivos: `index.html`, `styles.css`, `script.js` y documentación canónica asociada. `data.js`, assets y dependencias no fueron modificados.
- Decisiones relacionadas: DEC-007, DEC-009, DEC-012 y DEC-018.
- Validación ejecutada: sintaxis JavaScript, `git diff --check`, filtros AND y estado vacío, autocomplete por mouse/teclado, carrusel/autoplay, modal, foco visible, contraste y revisión en 1440, 768 y 390 px sin overflow ni errores de consola.

### 2026-08-24 — Navbar editorial y refinamiento de previews

- Implementado: CTA `Sé parte de la guía` con mayor jerarquía y estados hover, focus-visible y active; navbar sticky parcialmente transparente sobre el header con blur ligero.
- Implementado: información secundaria de las filas alineada a la derecha, nombre centrado en flujo superior, gradiente diagonal sobre fotografías y comodidades sin borde con el lenguaje tipográfico de Tipo de comida.
- Implementado: carrusel editorial sin marco perimetral y filtros abiertos con el mismo tratamiento visual del hover.
- Archivos: `index.html`, `styles.css` y documentación canónica asociada. JavaScript, datos y assets no fueron modificados en esta ronda.
- Decisión relacionada: DEC-017.
- Validación ejecutada: sintaxis JavaScript, `git diff --check`, contraste calculado, interacción de puntero y teclado, filtros, paginación, apertura del modal, autoplay y `prefers-reduced-motion`; revisión visual en 1440, 980, 720, 420, 390 y 320 px.

### 2026-08-24 — Filtros AND y reorganización editorial

- Implementado: intersección AND dentro de Tipo de comida, Precio y Comodidades, además de AND entre grupos; precio primero y abierto solo en la carga inicial.
- Implementado: `about-lead` como header inmediatamente después del navbar; ubicación sobre nombre centrado en las filas; chips de comodidades en `--paper` con terracota.
- Implementado: `Isla de Pascua / Rapa Nui` como territorio especial asociado a `V — Valparaíso`, sin numeración propia ni cambio de `16 regiones`; el dataset actual produce cero resultados.
- Implementado: iconos de WhatsApp e Instagram del footer en `--paper` y sin fondo propio; navbar sin cambios.
- Archivos: `index.html`, `styles.css`, `script.js` y documentación canónica asociada. `data.js` no fue modificado.
- Decisiones relacionadas: DEC-004, DEC-005, DEC-007, DEC-009 y DEC-010.
- Validación ejecutada: sintaxis JavaScript, `git diff --check`, contraste `5.23:1`, revisión interactiva en 1440, 980, 720, 420, 390 y 320 px y emulación runtime de `prefers-reduced-motion: reduce`.

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
