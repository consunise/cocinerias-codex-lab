# Changelog del proyecto

Este archivo registra cambios implementados relevantes. No contiene solicitudes pendientes ni reconstruye detalles que no pueden comprobarse.

## Sin publicar

### 2026-09-12 — Arquitectura de la ficha según referencia visual

- Reorganizado el renderizador existente: Sobre esta cocinería a ancho completo; franja Platos / Tipo de comida / Precio; mapa a la izquierda y dirección/información práctica a la derecha; reseñas; contacto diferenciado al final. Sobre los datos y sus fuentes quedan dentro de contacto.
- Preservados el `dialog`, hero, título y anti-huérfanas, selección editorial, advertencias de imagen/contenido/demo, mapa simulado, estados prácticos y reseñas pendientes. No se copian datos de la captura ni se modifica `data.js`.
- Evitada la repetición de menciones simples de Eventos/banquetería ya mostradas como `Sí`; se conserva íntegro el dato fuente y cualquier cláusula con incertidumbre.
- Adaptado el centro a lectura vertical hasta 980 px, resumen/contacto hasta 720 px y servicios hasta 520 px. Retiradas las clases experimentales del layout sustituido, sin refactorización global.
- Validado visualmente en desktop, tablet y mobile, con mediciones entre 320 y 1440 px sin overflow. Probadas fichas Top 1/2/3, Destacadas, normales y con datos ausentes; navegación filtrada circular, teclado, cierre, retorno de foco y scroll. Consola sin errores/advertencias; comprobaciones de sintaxis y `git diff --check` aprobadas.
- Actualizada DEC-019: la distribución anterior queda reemplazada; no se reactivan integraciones de mapas ni reseñas. Cachebusters CSS/JS: `20260912-1`. Home, footer, filtros, carrusel, taxonomías y paginación no se modifican.

### 2026-09-10 — Header reactivo y control siguiente

- Implementado: una búsqueda textual normalizada oculta por completo el header editorial, detiene su autoplay y mantiene navbar, filtros y directorio; al vaciar o resetear la consulta el header reaparece y el timer se reanuda. Los filtros aislados no cambian su visibilidad.
- Ajustado: Tipo de comida, Comodidades, Precio y Detalle usan proporciones flexibles según contenido en desktop y tablet, conservando la estructura mobile existente, la alineación izquierda y los límites de tres elementos.
- Unificado: Top y Destacada comparten el primer slot de `.about-rank` en los slides; en las filas, tanto `editorial-rank-icon` como el sol se sitúan antes del nombre mediante `.restaurant-name-mark` y conservan el tratamiento anti-huérfanas.
- Implementado: botón SVG `Siguiente slide` con target de 44 × 44 px, clic, Enter, Espacio y `focus-visible`; reutiliza el índice circular, indicadores y timer existentes y sustituye la especificación histórica sin botones anterior/siguiente.
- Validado: secuencia búsqueda/filtros/restauración, estado vacío, pausa del carrusel oculto, ciclo automático completo, vuelta manual último → primero, hover sin borde, teclado y responsive en 1440, 1180, 1100, 768, 520, 390 y 320 px sin overflow horizontal.
- Actualizado: cachebusters de CSS y JavaScript a `20260910-2`. No se modificaron datos, contenido editorial, selección Top/Destacadas, modal, footer, filtros, paginación ni taxonomías.

### 2026-09-10 — Distribución del home, interacción editorial y búsqueda ampliada

- Ajustado: la retícula del listado cede ancho de Precio y Detalle a Tipo de comida y Comodidades; mantiene alineación izquierda, límite visual de tres elementos y variantes responsive sin overflow.
- Ajustado: las insignias Top se anclan al borde izquierdo interno de la caja. Top 1/2/3 y Destacadas sustituyen el borde simulado de hover por una sombra exterior común, sin cambio geométrico y conservando `focus-visible`.
- Consolidado: el carrusel ya utilizaba índices modulares; se documenta y valida como circular en ambos sentidos, sin clones y con autoplay, pausa, indicadores, contenido e imagen sincronizados durante más de dos ciclos.
- Implementado: las dos últimas palabras de cada nombre presentado se unen solo en la salida HTML para evitar una palabra huérfana final, sin modificar nombres canónicos, IDs, filtros ni `data.js`.
- Implementado: la búsqueda usa un índice runtime único de identidad, ubicación, cocina, especialidades, descripción, servicios, categorías, comodidades y precio. Normaliza mayúsculas, tildes y espacios repetidos; el autocomplete existente prioriza nombres y admite después coincidencias por atributos.
- Validado: búsquedas gastronómicas, comodidad, precio, nombre y ubicación; combinaciones AND con Región, Tipo, Comodidades y Precio; contador, resumen, estado vacío, reset y paginación; responsive en 1440, 1180, 1100, 768, 520, 390 y 320 px. No se modifican datos, taxonomía, contenido práctico o comportamiento del modal, footer, selección editorial ni cantidad de resultados por página; el título del modal reutiliza únicamente el tratamiento anti-huérfanas común.
- Actualizado: cachebusters de CSS y JavaScript a `20260910-1`.

### 2026-09-04 — Nombres, señales editoriales y datos prácticos

- Implementado: los tres slides experimentales de Destacadas reutilizan el sol lineal junto al nombre; las filas Top 1/2/3 reutilizan `editorialRankIcon()` sin duplicar el ranking y anuncian el puesto en su nombre accesible.
- Ajustado: Tipo de comida, Comodidades y Precio alinean su contenido a la izquierda; las dos primeras columnas muestran como máximo tres elementos sin recortar los datos fuente.
- Implementado: `displayName` y `displayAlternateName` eliminan de forma no destructiva descriptores completos Restaurante/Restaurant en slides, autocomplete, listado, ficha y navegación; búsqueda, IDs, enlaces y dataset conservan los nombres canónicos.
- Implementado: la ficha agrupa Capacidad, Eventos y Catering con estados `Sí`, `No` y `No confirmado / sin datos`. Sin campos propios, solo se reconocen menciones inequívocas de `services`; Capacidad permanece no confirmada para los 101 registros.
- Ajustado: el título de la ficha reduce su escala base de `clamp(2.65rem, 6vw, 5.2rem)` a `clamp(2.35rem, 4.8vw, 4.35rem)`, con límites móviles más contenidos.
- Actualizado: cachebusters de CSS y JavaScript. No se modifica `data.js`, la fuente canónica, el número de slides, el mapa, la flecha de `Ver ficha` ni los demás experimentos.

### 2026-09-04 — Indicador editorial y equilibrio de filas

- Implementado: las tres Destacadas muestran un sol lineal pequeño junto al nombre del directorio, derivado de `[data-editorial-highlight]`; el SVG es visual y el nombre accesible del botón comunica su estado sin crear una lista paralela.
- Corregido: Comodidades deja visible el hover y foco transicional de la fila, conservando el tratamiento por ítem compartido con Tipo de comida para texto, fill y stroke.
- Ajustado: Tipo de comida, Comodidades y Precio se alinean a la derecha y usan anchos no idénticos; Comodidades recibe mayor proporción y los breakpoints móviles conservan su estructura sin compresión subpíxel.
- Actualizado: cachebusters de `styles.css` y `script.js` para cargar los cambios de esta ronda.
- Archivos: `index.html`, `styles.css`, `script.js` y documentación canónica asociada. No se modifican datos, carrusel, modal, mapa, cantidad de slides ni la flecha de `Ver ficha`.

### 2026-09-04 — Revalidación del footer terracota

- Consolidado: el footer usa el token existente `--terracotta`, declara explícitamente la ausencia de borde superior y conserva estructura, contenido y responsive.
- Ajustado: los iconos sociales acompañan el estado hover de sus enlaces con `--paper-deep`; texto, iconos y foco visible mantienen contraste sobre terracota.
- Documentado: `--paper` queda registrado como implementación reemplazada por DEC-010 y no permanece un conflicto ni pendiente de footer.
- Archivos: `styles.css` y documentación canónica asociada. `index.html`, JavaScript, datos y otras secciones no fueron modificados.

### 2026-08-29 — Slides interactivos y variante mobile de listado

- Implementado: los seis slides que representan cocinerías abren el `dialog` existente mediante su `data-restaurant-id`; el slide introductorio no es interactivo y los dots continúan limitados a cambiar de contenido.
- Implementado: control compacto `Ver ficha` por slide con Enter, Espacio, `focus-visible` y devolución de foco. La superficie editorial también abre la misma ficha; los enlaces de fuente conservan su acción propia.
- Implementado: si el slide apunta a una cocinería excluida por filtros, el modal incorpora temporalmente ese registro delante del conjunto filtrado sin limpiar ni modificar selecciones.
- Corregido: el hover de Comodidades se aplica por `.amenity-item`, no por el ancestro `.restaurant-button`; wrapper, texto e icono comparten transición, fill y stroke de Tipo de comida sin layout shift.
- PRUEBA UX/UI — POR VALIDAR: en 520 px o menos, foto a ancho completo, Tipo/Comodidades/Precio en una fila y `Ver ficha` debajo; a 340 px o menos, Tipo y Comodidades permanecen lado a lado, Precio ocupa una fila y la acción queda al final.
- PRUEBA UX/UI — POR VALIDAR: `results-toolbar` conserva una línea a 430 px y permite wrap controlado en anchos menores. Tipo y Comodidades mantienen grupos centrados con iconos y textos en ejes izquierdos comunes.
- Corregido: `body` usa `min-width: min(320px, 100%)`, eliminando el overflow de 15 px observado con scrollbar vertical clásica a 320 px nominales.
- No se modifican `DECISIONS.md` ni `PRODUCT_UX_SPEC.md`; la composición responsive, el carrusel de siete slides y la ficha experimental continúan `POR VALIDAR`.

### 2026-08-28 — Prueba UX/UI editorial de siete slides y ficha redistribuida

- Corregido: el hover de puntero ya no se aplica globalmente a todos los iconos por `.restaurant-button:hover`; cada `.food-type-item` y `.amenity-item` activa de forma independiente el mismo color, fill, stroke y transición sobre icono, texto o wrapper, sin layout shift. El realce global se conserva para `focus-visible` de la fila.
- EXPERIMENTO / POR VALIDAR: Tipo de comida y Comodidades usan el mismo ancho de retícula y centran el grupo completo manteniendo un eje izquierdo común dentro de cada grupo.
- EXPERIMENTO / POR VALIDAR: carrusel de siete slides —introducción, Top 1/2/3 y tres Destacadas existentes— generado desde la fuente editorial DOM vigente, sin presentar Destacadas como Top 4–6 ni duplicar su sección visual.
- EXPERIMENTO / POR VALIDAR: el resultado se ordena después de filtrar y antes de paginar como Top 1/2/3, Destacadas y resto; el dropdown de precio cambia solo su presentación a Alto, Moderado, Económico.
- EXPERIMENTO / POR VALIDAR: la ficha mantiene el `dialog` y prueba contenido principal a la izquierda, mapa SVG simulado como único contenido derecho, descripción sans serif identificada como demo, Platos destacados debajo del párrafo, Precio reubicado y Dirección · Localidad unificadas antes de Información práctica.
- Limitación conocida: las tres Destacadas reutilizan sus assets territoriales documentados de 960 px; no se inventaron ni reescalaron imágenes para la prueba y su suficiencia a alta densidad queda por validar.
- No se modifican `DECISIONS.md`, `PRODUCT_UX_SPEC.md`, `BACKLOG.md`, `data.js` ni las fuentes de establecimientos; todos los cambios de layout/editoriales de esta entrada continúan `POR VALIDAR`.

### 2026-08-28 — Corrección de hover y variante UX/UI experimental

- Corregido: Comodidades incorpora `.amenity-item:hover` a los selectores compartidos de color, fill y stroke; el wrapper completo activa el mismo tratamiento de Tipo de comida sin cambio geométrico.
- EXPERIMENTO / POR VALIDAR: `restaurant-main` centra verticalmente su copia; Tipo, Comodidades y Precio centran sus grupos y headings correspondientes.
- EXPERIMENTO / POR VALIDAR: entre 1179 y 521 px, Tipo, Comodidades, Precio y Detalle comparten una segunda fila; a 520 px o menos vuelve el apilamiento. El padding horizontal experimental es 8 px en las tres columnas informativas.
- BLOQUEADO / NO IMPLEMENTADO: el carrusel continúa con cuatro slides. El contenido histórico único y atribuido no alcanza para cuatro slides previos al Top 3 sin duplicar Mata Rangi; los assets `zona-*` no tienen atribución individual suficiente para activarlos.
- No se modifican `DECISIONS.md`, `PRODUCT_UX_SPEC.md`, datos, imágenes, JavaScript, filtros, modal, navbar ni footer. Las variantes pueden revertirse retirando los bloques CSS identificados como experimento.
- Validación ejecutada: sintaxis de `data.js`, `script.js` y scripts `.mjs`; `git diff --check`; hover de dos filas y ficha; nombre largo; centrado medido; filtros, autocomplete, paginación, sticky, modal, teclado del carrusel y autoplay; revisión en 1280, 1100, 980, 900, 820, 768, 720, 521, 520, 420, 375 y 320 px sin overflow ni mensajes de consola.

### 2026-08-27 — Prueba visual: columna independiente de Comodidades

- Implementado como prueba reversible: en desktop desde 1180 px, `restaurant-amenities` ocupa una columna propia entre Tipo de comida y Precio; `list-header` usa la misma retícula de cinco columnas.
- Implementado: a 1179 px o menos, el encabezado de columnas se oculta y Comodidades se apila a ancho completo sin alterar Tipo, Precio ni la acción; `No informado` permanece alineado a la izquierda.
- Distribución provisional: `minmax(300px, 1.8fr) minmax(150px, 0.82fr) minmax(152px, 0.66fr) minmax(90px, 0.34fr) 96px`. No se registra como decisión en `DECISIONS.md` hasta completar la revisión visual solicitada.
- Archivos: `index.html`, `styles.css`, `script.js`, `docs/CURRENT_STATE.md` y `docs/CHANGELOG.md`. No se modificaron datos, filtros, imágenes, ficha, paginación, navbar, carrusel ni footer.
- Validación ejecutada: sintaxis válida de `data.js`, `script.js` y todos los scripts `.mjs`; `git diff --check`; servidor estático; consola sin mensajes; mediciones y revisión visual en 1440, 1200, 1180, 1179, 980, 720, 420 y 320 px sin overflow horizontal. Hover medido sin desplazamiento de layout, foco visible y `list-header` sticky conservados.

### 2026-08-27 — Amenities editoriales, fotografía HD y destacados por atributo

- Implementado: `restaurant-main` usa `padding-block` simétrico; Comodidades elimina fondo, borde y padding de chip, reduce el `gap` icono–texto a `0.25rem` y conserva `No informado` alineado a la izquierda sin deformar la retícula. Este ajuste reemplaza el centrado y la caja clara registrados en la entrada anterior del mismo día.
- Implementado: los cuatro slides del header usan JPEG locales de 2880 px de ancho, optimizados desde originales mayores sin upscaling y con atribución de autor, licencia, resolución y fecha de consulta.
- Implementado: Top 1/2/3 comparte una familia de insignias SVG editoriales numeradas, reutilizada por el carrusel y las fichas sin presentarla como certificación externa.
- Implementado: sección secundaria `Destacados de la guía` con Na Que Ver Cocinería Chilena, Restaurant Tradiciones Cocinería Morelia y Cocinería Puelpún, cada una asociada a un atributo documentado, fuente y acceso al directorio; no amplía el ranking Top 3.
- Archivos: `index.html`, `styles.css`, `script.js`, cuatro assets del header, su atribución y documentación canónica asociada. `data.js` y dependencias no fueron modificados.
- Decisiones relacionadas: DEC-007, DEC-009, DEC-014 y DEC-020.

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
