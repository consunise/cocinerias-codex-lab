# Estado actual verificado

Auditoría realizada: 21 de agosto de 2026  
Rama: `main`  
Commit: `045dd1fc3add89ee6094d7fe72704e0bc27ab924`  
Mensaje: `correcciones version 0.9.2`

Este documento describe el estado comprobado del repositorio en ese commit. No convierte automáticamente lo implementado en una decisión de producto.

Actualización posterior: el 24 de agosto de 2026 se implementó la decisión confirmada de usar fondo terracota en el footer; el resto del documento conserva el baseline auditado.

## Resumen técnico

| Aspecto | Estado comprobado |
|---|---|
| Stack | HTML, CSS y JavaScript vanilla |
| Framework | Ninguno |
| Package manager | No existe `package.json` ni equivalente |
| Build | No existe proceso de build |
| Tests | No existe suite automatizada |
| Lint/format | No existe configuración |
| Página | `index.html` carga `styles.css`, `data.js` y `script.js` |
| Datos | 101 registros en `window.COCINERIAS` |
| Cobertura | 16 regiones |
| Fuente declarada de datos | `directorio_cocinerias_chile.md`, ignorado por Git y ausente del repositorio público |
| Imágenes de filas | 101 archivos locales; 1 directa y 100 territoriales de respaldo |
| Última fecha del dataset | Todos los registros indican `verifiedAt: 2026-08-12` |

## Componentes implementados

### Navbar

- Branding `CC` y nombre del proyecto.
- Buscador con placeholder `Buscar por nombre de cocinería...`.
- Iconos inline SVG de WhatsApp e Instagram.
- CTA `Agrega tu cocinería` enlazado temporalmente a `#contacto`.
- Enlaces sociales sin URL real; `script.js` los marca como placeholders.
- Navbar sticky con fondo `--paper` y bordes definidos.

### Directorio y filtros

- Filtros por región, tipo de comida, rango de precio y `Comodidades`.
- Solo un grupo desplegable permanece abierto.
- Región única con opción `Todo Chile`; otros filtros admiten selección múltiple tipo toggle.
- Regiones ordenadas geográficamente de norte a sur y rotuladas con números romanos.
- Seleccionar o desmarcar región desplaza al inicio de resultados.
- Panel responsive lateral en mobile.
- `Limpiar filtros` restablece filtros, cierra desplegables y vuelve al inicio del directorio.

### Resultados

- `results-toolbar` muestra número de cocinerías, `16 regiones` y `A lo largo y ancho de Chile` por separado.
- El resumen activo aparece debajo de la metadata.
- `list-header` sticky en desktop; oculta su borde superior cuando queda pegado al navbar.
- Paginación de 10 registros con Anterior, Siguiente y páginas numeradas.
- El estado vacío y el buscador funcionan sobre el dataset en memoria.

### Preview de cocinería

- Fotografía como fondo de `restaurant-main`.
- Hover/foco con realce de fotografía y línea terracota izquierda de 4 px sin layout shift.
- Nombre, horario y ubicación; horario y ubicación comparten línea cuando hay espacio.
- Divisores verticales en `restaurant-meta`.
- Tipos de comida con SVG y tratamientos hover.
- Rango de precio con peso regular.
- Comodidades referenciales bajo la metadata.
- Acción `Ver ficha` apilada verticalmente, pero el símbolo actual es `→`, no flecha hacia abajo.

### Modal

- `dialog` nativo con cierre, fondo, scroll interno y navegación circular anterior/siguiente.
- La navegación usa el conjunto actualmente filtrado.
- Muestra ubicación, descripción, cocina, información práctica, atributos de visita, estado del registro y fuente principal.
- Incluye etiquetas para horarios referenciales y estado/confianza del registro.

### Carrusel editorial

- Cuatro slides de fondo a pantalla completa dentro de `Acerca de esta guía`.
- Slide 1: contenido introductorio con empanadas de pino.
- Top 1: Restaurante Pily.
- Top 2: Mata Rangi.
- Top 3: Cocinería Bellavista.
- Cada destacado incluye ubicación, descripción, platos, tres etiquetas y enlace de referencia.
- Autoplay cada 6 segundos, indicadores clickeables, teclado y pausa por hover/foco.
- Autoplay desactivado con `prefers-reduced-motion` o pestaña no visible.
- No hay botones anterior/siguiente.

### Footer

- Fondo `--terracotta`, texto claro y sin línea superior.
- Columnas de marca, contacto e información; se apilan en mobile.
- Iconos sociales inline SVG con tratamiento de alto contraste y enlaces todavía provisionales.
- La fecha visible dice `Datos verificados el 12.08.2026`.

## Estado de datos y assets

- `data.js` contiene 101 IDs únicos y 41 campos por registro.
- Estado declarado: 44 `Activa`, 18 `Posiblemente activa`, 39 `Estado no confirmado`.
- Confianza: 98 `Alta`, 3 `Media`.
- Precio fuente: 93 `No informado`, 5 `Precio medio`, 3 `Económico`.
- Horarios ausentes en 74 registros.
- `script.js` sustituye visualmente todos los precios mediante tres bandas simuladas.
- `script.js` inventa horarios para los 74 registros sin horario y los identifica como referenciales.
- `script.js` asigna comodidades simuladas a todos los registros y muestra una nota de demostración.
- El manifiesto de imágenes declara 101 rutas, fuentes y hashes únicos; solo Mata Rangi usa una imagen directa del establecimiento.
- Las 100 imágenes restantes son referencias territoriales únicas y no deben atribuirse al local mostrado.

## Comprobaciones ejecutadas en esta auditoría

- Sintaxis válida con `node --check` para `data.js`, `script.js` y los tres `.mjs`.
- `git diff --check` sin errores.
- Las 105 imágenes referenciadas por dataset y carrusel existen localmente.
- Servidor estático local respondió HTTP 200 para HTML, CSS, datos y script.

No se realizó una ronda visual interactiva completa en múltiples viewports durante esta auditoría. Queda como validación manual para el siguiente cambio de interfaz.

## Discrepancias relevantes

| Tema | Intención documentada | Implementación actual | Clasificación |
|---|---|---|---|
| Ver ficha | Flecha debajo del texto y orientada hacia abajo | Texto y símbolo apilados, pero usa `→` | `APROBADO PERO NO IMPLEMENTADO` |
| Fuente de datos | `directorio_cocinerias_chile.md` es fuente principal | Está ignorado y no existe en el repositorio público | `PENDIENTE` crítico para regeneración |
| Iconos sociales | SVG propios permitidos; iconos visibles | PNG de Flaticon permanecen, pero la interfaz usa SVG inline | Documentación/asset histórico parcialmente obsoleto |
| Atribución Flaticon | `ATTRIBUTION.md` afirma que la atribución es visible en footer | No existe atribución Flaticon visible y los PNG no se usan | `POR VALIDAR` |
| Datos | Producción debe usar información verificable | Precio, horarios y comodidades tienen prototipos activos | `PENDIENTE` antes de producción |
| Assets `zona-*` | Carrusel Top 3 vigente | Tres imágenes `zona-*` quedan sin uso y están documentadas como históricas | Mantenibles, pero revisar si deben conservarse |

## Vacíos comprobados

- No hay `README.md`, `AGENTS.md` ni documentación canónica en el repositorio auditado.
- No existe despliegue o hosting documentado.
- No hay flujo real para el CTA ni URLs sociales.
- No hay pruebas automatizadas, linter ni validación HTML/CSS configurada.
- No consta una metodología formal para el Top 3.
- No hay evidencia de una revisión responsive/manual posterior al commit 0.9.2.
