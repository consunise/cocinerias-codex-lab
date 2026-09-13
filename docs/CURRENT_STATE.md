# Estado actual verificado

Auditoría realizada: 21 de agosto de 2026  
Rama: `main`  
Commit: `045dd1fc3add89ee6094d7fe72704e0bc27ab924`  
Mensaje: `correcciones version 0.9.2`

Este documento describe el estado comprobado del repositorio en ese commit. No convierte automáticamente lo implementado en una decisión de producto.

Actualizaciones posteriores, consolidadas al 10 de septiembre de 2026: footer terracota; filtros AND y reordenados; Rapa Nui como territorio especial; header editorial antes del directorio; navbar contextual con CTA invitacional; nueva jerarquía y distribución de filas; taxonomía alimentaria separada de comodidades; búsqueda integrada por nombre, ubicación y atributos; ficha editorial sobre el `dialog` vigente; fotografías de header a 2880 px; insignias SVG Top 1/2/3; selección secundaria de tres destacados por atributo; nombres de presentación sin el descriptor genérico Restaurante/Restaurant y sin palabra huérfana final; y estructura conservadora para Capacidad, Eventos y Catering. El resto del documento conserva el baseline auditado.

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
- Buscador con placeholder `Buscar por nombre de cocinería...` y autocomplete accesible limitado al nombre principal o alternativo.
- Hasta siete sugerencias sin distinción de mayúsculas ni tildes, ordenadas por coincidencia inicial antes de coincidencia contenida; navegación con flechas, Enter y Escape.
- Iconos inline SVG de WhatsApp e Instagram.
- CTA principal `Sé parte de la guía` enlazado temporalmente a `#contacto`.
- Enlaces sociales sin URL real; `script.js` los marca como placeholders.
- Navbar sticky superpuesto al header, con mezcla parcialmente transparente de `--paper`, blur ligero y bordes definidos mientras permanece sobre `about-lead`.
- Un `IntersectionObserver` aplica `is-past-about` cuando el navbar supera el header; en ese estado navbar y buscador usan `var(--paper)` completamente opaco y sin blur. El estado revierte al volver arriba.

### Directorio y filtros

- Filtros en orden: rango de precio, región, tipo de comida y `Comodidades`.
- Rango de precio comienza abierto; los demás grupos cerrados.
- Solo un grupo desplegable permanece abierto.
- Región única con opción `Todo Chile`; tipo, precio y comodidades admiten multiselección toggle con lógica AND dentro y entre grupos.
- Tipo de comida incorpora `Vegano`, `Vegetariano` y `Celíaco` como datos demo visibles; Comodidades contiene solo `Pet friendly`, `Estacionamiento` y `Accesibilidad`.
- `Alergias friendly` y adaptación frente a alergias no aparecen en filtros ni filas.
- Regiones ordenadas geográficamente de norte a sur y rotuladas con números romanos.
- `Isla de Pascua / Rapa Nui` aparece tras Valparaíso como territorio especial asociado a la V Región y actualmente produce cero resultados porque no hay registros correspondientes.
- Seleccionar o desmarcar región desplaza al inicio de resultados.
- Panel responsive lateral en mobile.
- `Limpiar filtros` restablece filtros, cierra desplegables y vuelve al inicio del directorio.

### Resultados

- `results-toolbar` muestra número de cocinerías, `16 regiones` y `A lo largo y ancho de Chile` por separado.
- El resumen activo aparece debajo de la metadata.
- `list-header` sticky en desktop; oculta su borde superior cuando queda pegado al navbar.
- Paginación de 10 registros con Anterior, Siguiente y páginas numeradas.
- El estado vacío y el buscador funcionan sobre el dataset enriquecido en memoria. La escritura libre consulta nombre canónico/presentado, nombre alternativo, ubicación, cocina, especialidades, descripción, servicios, categorías, comodidades y precio; seleccionar una sugerencia continúa filtrando por ID exacto. Consulta y filtros se intersectan sin limpiarse mutuamente.

### Preview de cocinería

- Fotografía como fondo de `restaurant-main`, con gradiente diagonal más oscuro abajo a la izquierda y más transparente arriba a la derecha.
- Hover/foco con realce de fotografía y línea terracota izquierda de 4 px sin layout shift.
- Ubicación sobre el nombre; horario debajo sin ubicación repetida. La copia sobre la fotografía se alinea a la izquierda; Tipo de comida, Comodidades y Precio alinean sus grupos al borde izquierdo de sus columnas.
- Las tres Destacadas definidas por `[data-editorial-highlight]` muestran un sol lineal pequeño antes del nombre. El SVG usa `currentColor`, no altera la selección editorial y el `aria-label` del botón comunica `destacada de la guía`.
- Top 1/2/3 reutiliza `editorialRankIcon()` antes del nombre y comparte con Destacadas el wrapper inicial `.restaurant-name-mark`. El número visible conserva el significado ordinal y el `aria-label` de la fila anuncia el puesto.
- Divisores verticales en `restaurant-meta`.
- Tipos de comida con SVG y tratamientos hover.
- Rango de precio con peso regular.
- Comodidades referenciales bajo la metadata, sin fondo, borde, outline, caja ni padding propio. Tipografía, iconos de 24 px, stroke de 1.5 px y hover comparten el sistema de Tipo de comida; el color claro contextual mantiene contraste sobre la fotografía y el único `gap` icono–texto es de `0.25rem`.
- El área de comodidades conserva su lugar con o sin ítems. En las filas vacías, `No informado` ocupa el ancho disponible y queda alineado a la izquierda, sin caja.
- Tipo de comida y Comodidades limitan su render de fila a los primeros tres elementos; los datos runtime y el dataset conservan todos sus valores.
- Las dos últimas palabras del nombre se mantienen juntas solo en la salida HTML; búsqueda, IDs y valores canónicos no reciben espacios no separables.
- `restaurant-main` usa `padding-block` simétrico: 24 px en el viewport desktop comprobado y 16 px en 320 px.
- Acción `Ver ficha` apilada verticalmente, pero el símbolo actual es `→`, no flecha hacia abajo.

EXPERIMENTO / POR VALIDAR (29 de agosto de 2026), ajustado el 10 de septiembre: desde 1180 px, Comodidades ocupa una columna independiente y la retícula usa `minmax(250px, 1.45fr) minmax(160px, 1fr) minmax(170px, 1.05fr) minmax(92px, 0.58fr) minmax(88px, 0.54fr)`; Tipo, Comodidades, Precio y Detalle distribuyen el espacio libre de acuerdo con su contenido sin forzar anchos idénticos. Entre 1179 y 521 px, la segunda fila usa `minmax(135px, 1fr) minmax(145px, 1.05fr) minmax(78px, 0.62fr) minmax(76px, 0.58fr)`. A 520 px o menos, la foto ocupa todo el ancho; Tipo, Comodidades y Precio permanecen en tres columnas —Precio con mínimo de 82 px— y `Ver ficha` pasa a una fila propia. A 340 px o menos, donde las etiquetas largas dejan de caber, Tipo y Comodidades conservan dos columnas, Precio pasa a una fila propia y la acción queda debajo. Esta variante responsive no reemplaza el resto de DEC-007.

Tipo de comida, Comodidades y Precio alinean sus grupos al borde izquierdo. Cada fila de Tipo o Comodidades reserva un slot iconográfico de 24 px y un `gap` de `0.25rem`; `No informado` sigue la misma alineación izquierda. Comodidades ya no cubre con `--paper` el hover/foco compartido de la fila. Solo la unidad `.food-type-item` o `.amenity-item` bajo el cursor cambia texto e icono; `focus-visible` de la fila activa el realce accesible común. El filtro de precio se presenta `Alto`, `Moderado`, `Económico`. Tras aplicar búsqueda y filtros AND, el conjunto se ordena Top 1/2/3, Destacadas y resto antes de paginar; las seis prioridades se derivan de la configuración editorial DOM vigente, no de listas nuevas.

### Modal

- `dialog` nativo con cierre, fondo, scroll interno y navegación circular anterior/siguiente.
- Desde el listado, la navegación usa el conjunto actualmente filtrado. Si una ficha se abre desde un slide y su cocinería no pertenece a ese conjunto, el modal usa temporalmente `[cocinería abierta + resultados filtrados]` sin alterar los filtros; con cero resultados queda una ficha única y navegación deshabilitada.
- Hero de ancho completo con imagen local y overlay. La copia sigue el orden insignia Top N, cuando corresponde; localidad y región; nombre; nombre alternativo. Las 100 imágenes `regional-fallback` muestran `Imagen de referencia territorial` y Mata Rangi, única imagen `direct`, no muestra esa advertencia.
- El Top 1/2/3 de las fichas se deriva de `data-restaurant-id` y `data-editorial-rank` en los tres slides destacados del carrusel.
- El nombre del hero usa `clamp(2.35rem, 4.8vw, 4.35rem)` en la regla base, `clamp(2rem, 5.2vw, 2.35rem)` hasta 720 px y `clamp(1.9rem, 8vw, 2rem)` hasta 420 px; mantiene la jerarquía principal sin ocupar una proporción excesiva con nombres largos.
- Layout implementado el 12.09.2026: franja independiente `Ficha X de N` / cierre; hero; Sobre esta cocinería a ancho completo; resumen de Platos destacados / Tipo de comida / Rango de precio en tres columnas; bloque central con mapa izquierdo y dirección e información práctica a la derecha; reseñas; información y contacto. Se retiró únicamente el markup/CSS de la distribución experimental reemplazada.
- La descripción conserva el párrafo sans serif `Contenido demo · no verificado`. El título, nombres normalizados, anti-huérfanas, insignias y lógica de datos no cambian. El resumen conserva listas completas de la ficha; el límite de tres elementos del listado del home sigue intacto.
- Capacidad, Eventos y Catering separan ausencia e incertidumbre desde la auditoría de recuperación del 12.09.2026. Capacidad muestra `Sin datos` en las 101 fichas; Eventos muestra un `Sí` y 100 `Sin datos`; Catering muestra un `Sí`, un `No confirmado` y 99 `Sin datos`. No hay negativas explícitas en el dataset actual; el estado `No` se comprobó con entradas aisladas de prueba, sin incorporarlas a datos ni al navegador.
- El mapa izquierdo conserva `assets/images/map-preview-placeholder.svg`, rotulado `Vista previa del mapa — demostración`; no usa coordenadas, proveedor cartográfico ni API. Hasta 980 px el bloque central se apila dirección → mapa → información práctica. Hasta 720 px también se apilan resumen gastronómico y contacto; hasta 520 px se apilan los tres servicios.
- Después aparecen Reseñas en Google e Información y contacto, con Sobre los datos integrado dentro de este último bloque. Menú se omite porque ninguno de los 101 registros contiene un campo estructurado de menú, carta, URL o PDF.
- El helper estable para descripciones factuales se conserva en el código para reversibilidad, pero la variante visible usa deliberadamente el mismo párrafo demo en las 101 fichas. Los 53 registros con `specialties` muestran sus valores exactos y los otros 48 muestran `No informado`.
- Preferencias alimentarias, comodidades, horarios y precios demo se identifican como información referencial dentro de la ficha.
- Dos registros siguen teniendo coordenadas válidas y tres conservan enlaces cartográficos almacenados. La lógica OpenStreetMap anterior permanece localizada y sin borrar para facilitar la reversión, pero no se invoca mientras está activa la prueba del mapa simulado.
- No existe integración autorizada de Google Places ni contenido de reseñas en el dataset. La sección de reseñas muestra el bloqueo explícito y no renderiza reseñas ficticias.
- Información y contacto renderiza solo campos existentes y URLs válidas: teléfono, WhatsApp, email, Instagram, Facebook y web; servicios, pagos, año de fundación y otras redes se agrupan solo cuando existen. Las menciones simples de Eventos o banquetería ya mostradas como `Sí` no se repiten en planificación; se conservan cláusulas como `banquetería no confirmada` y `Consumo en local no confirmado`.
- Aunque 10 registros tienen `owner`, la ficha no publica responsables: el esquema no expresa de forma estructurada pertinencia pública ni trazabilidad específica suficiente para justificar su exposición.
- Estado, confianza, ID, clasificación, notas, fecha, fuente principal y fuentes adicionales quedan agrupados al final bajo Sobre los datos.
- Abrir o navegar a otra ficha reinicia el scroll interno; cierre visible, Escape y devolución de foco se conservan.

### Carrusel editorial

- Primer bloque editorial inmediatamente después del navbar y antes del directorio.
- EXPERIMENTO / POR VALIDAR: siete slides de fondo a pantalla completa dentro de `Acerca de esta guía`.
- Slide 1: contenido introductorio con empanadas de pino.
- Top 1: Restaurante Pily.
- Top 2: Mata Rangi.
- Top 3: Cocinería Bellavista.
- Slides 5–7: Na Que Ver Cocinería Chilena (`Cocina chilena de mercado`), Tradiciones Cocinería Morelia (`Productos de huerta`) y Cocinería Puelpún (`Trayectoria histórica`), rotuladas `Destacada` sin numeración Top. Se generan en runtime desde la misma fuente DOM de Destacadas usada por fichas y orden editorial; un sol lineal decorativo ocupa el mismo primer slot estructural de `.about-rank` que las insignias Top, sin crear otra selección.
- Los Top 1/2/3 conservan platos y etiquetas editoriales. Los slides 5–7 reutilizan nombre, ubicación, descripción, atributo y primer enlace de fuente de la configuración de Destacadas, sin duplicar esa sección visual.
- Top 1/2/3 usan tres variantes numéricas de una misma insignia SVG editorial propia, con número visible, `currentColor` y geometría común; la insignia queda anclada al borde izquierdo interno de la caja y la ficha reutiliza la misma función y la configuración DOM del carrusel.
- Autoplay cada 6 segundos, navegación circular mediante módulo en ambos sentidos, indicadores clickeables, teclado y pausa por hover/foco. Una flecha SVG `Siguiente slide` de 44 × 44 px comparte el mismo índice y avanza también del último al primero. No usa clones ni fija una cantidad concreta en la navegación.
- Los seis slides de cocinerías se vinculan por `data-restaurant-id` a la ficha existente. La superficie editorial abre el `dialog` y un control compacto `Ver ficha` permite Enter, Espacio, foco visible y devolución de foco; el slide introductorio y los dots no abren fichas.
- Autoplay desactivado con `prefers-reduced-motion` o pestaña no visible.
- No hay botón Anterior; el botón Siguiente sustituye la especificación histórica sin controles laterales.
- El carrusel no tiene marco perimetral; conserva outline solo como estado de foco accesible.
- Las cajas Top y Destacadas usan una sombra exterior sutil en hover o `focus-within`; no añaden borde blanco/negro, no cambian grosor y no producen layout shift. El botón enfocado conserva un outline de 3 px.
- La caja editorial mantiene la alternancia terracota/paper en la secuencia de siete slides; imagen, texto y tema cambian en la misma unidad.
- Los siete dots usan círculos visibles de 16 × 16 px dentro de targets de 44 × 44 px, con activo por relleno y anillo, foco visible y sin fondo rectangular en el wrapper.
- Los primeros cuatro assets activos miden 2880 px de ancho. Los tres slides experimentales reutilizan las imágenes territoriales documentadas de cada registro, de 960 px de ancho; no se ampliaron ni sustituyeron. Su suficiencia visual a alta densidad continúa `POR VALIDAR`.

Mientras el buscador contiene texto normalizado, `.about-data` queda `hidden`, deja de ocupar espacio o recibir foco y detiene el autoplay; al vaciar la consulta reaparece y reanuda el timer. Los filtros por sí solos no ocultan el carrusel y el navbar adopta su superficie opaca mientras el header no está presente.

### Destacados de la guía

- La sección visual secundaria queda oculta durante el experimento para evitar duplicación; su DOM actúa como fuente única de los slides 5–7, insignias de ficha y orden posterior al Top 3.
- Tres casos sin superposición con el Top 3: Na Que Ver Cocinería Chilena (`Cocina chilena de mercado`), Restaurant Tradiciones Cocinería Morelia (`Productos de huerta`) y Cocinería Puelpún (`Trayectoria histórica`).
- La configuración conserva ubicación, descripción factual, razón editorial y fuentes externas; los slides reutilizan nombre, ubicación, descripción, atributo y primer enlace de fuente.
- Las fichas correspondientes muestran `Destacado de la guía · [atributo]`, claramente separado de `Selección de la guía · Top N`.

### Footer

- Fondo `--terracotta`, texto claro y sin línea superior.
- Tres columnas iguales de marca, contacto e información con un único gap en desktop; se apilan en mobile.
- Iconos sociales inline SVG en `--paper`, sin fondo propio y con enlaces todavía provisionales; en hover adoptan `--paper-deep` junto con el texto y el foco visible conserva outline `--white`.
- La fecha visible dice `Datos verificados el 12.08.2026`.
- Estado revalidado el 04.09.2026: no existe override a `--paper`, línea divisoria superior ni pendiente funcional abierto para el fondo del footer.

## Estado de datos y assets

- `data.js` contiene 101 IDs únicos y 41 campos por registro.
- Estado declarado: 44 `Activa`, 18 `Posiblemente activa`, 39 `Estado no confirmado`.
- Confianza: 98 `Alta`, 3 `Media`.
- Precio fuente: 93 `No informado`, 5 `Precio medio`, 3 `Económico`.
- Horarios ausentes en 74 registros.
- `script.js` sustituye visualmente todos los precios mediante tres bandas simuladas.
- `script.js` inventa horarios para los 74 registros sin horario y los identifica como referenciales.
- `script.js` deriva desde un patrón demo compartido preferencias alimentarias (`Vegano`, `Vegetariano`, `Celíaco`) y comodidades físicas (`Pet friendly`, `Estacionamiento`, `Accesibilidad`); ambas conservan fuente de placeholder y marca visible `Referencial`.
- El manifiesto de imágenes del directorio declara 101 rutas, fuentes y hashes únicos; solo Mata Rangi usa una imagen directa del establecimiento. El carrusel usa otros cuatro assets locales con atribución independiente.
- Las 100 imágenes restantes son referencias territoriales únicas y no deben atribuirse al local mostrado.
- Coordenadas verificables por estructura: 2 de 101; enlaces cartográficos existentes: 3 de 101.
- No hay campos de reseñas, Place IDs, credenciales ni integración Google Maps Platform en el repositorio.
- No hay campos estructurados de capacidad, eventos ni catering. `services` contiene una mención inequívoca de Eventos, una de banquetería y una de banquetería no confirmada; el resto se presenta como `Sin datos`.

## Comprobaciones ejecutadas en esta auditoría

- Sintaxis válida con `node --check` para `data.js`, `script.js` y los tres `.mjs`.
- `git diff --check` sin errores.
- Las 105 imágenes referenciadas por dataset y carrusel existen localmente.
- Servidor estático local respondió HTTP 200 para HTML, CSS, datos y script.

Actualización del 24 de agosto de 2026:

- Nueva ejecución de `node --check` para `data.js`, `script.js` y los tres `.mjs`, más `git diff --check`.
- Revisión interactiva con servidor estático en 1440, 980, 720, 420, 390 y 320 px.
- Casos comprobados: AND dentro y entre filtros, desmarcado inmediato, estado vacío, paginación, orden y reset de desplegables, Rapa Nui, carrusel, fila con nombre largo, chips referenciales, footer, sticky, modal, foco visible, consola y ausencia de scroll horizontal real.
- Contraste calculado entre `--paper` (`#f4efe5`) y `--terracotta` (`#a7442c`): `5.23:1`.
- `prefers-reduced-motion: reduce` se emuló en Chrome headless durante 7 segundos virtuales: el slide introductorio permaneció activo y el autoplay no avanzó.
- La ronda visual del navbar y previews se revisó en 1440, 980, 720, 420, 390 y 320 px: sin overflow horizontal; CTA, filtros por teclado, alineación de filas, fotografías variadas, sticky y estados de foco conservaron legibilidad. El CTA obtiene `5.89:1` por defecto, `9.39:1` en hover y `16.76:1` en active; el texto principal del navbar mantiene al menos `10.85:1` en el caso límite calculado de fotografía negra bajo la superficie translúcida.

Actualización del 25 de agosto de 2026:

- Revisión interactiva con servidor estático en 1440 × 1000, 768 × 1024 y 390 × 844 px, sin overflow horizontal.
- Comprobados los 15 resultados de `Vegano AND Vegetariano` en dos páginas; la combinación imposible con `Pet friendly` conservó filtros y mostró el estado vacío. `Vegetariano AND Pet friendly` devolvió 15 registros y todos contenían ambos atributos.
- Autocomplete comprobado con mayúsculas, tildes, límite de siete, estado sin coincidencias, clic exterior, selección con mouse y ArrowDown/Enter/Escape; la selección exacta actualizó resultados y cerró el listbox.
- Verificados los cuatro temas del carrusel, sincronización de imagen/texto/tema, autoplay al retirar foco, foco visible de los dots, nombre largo, modal con retorno de foco, retícula del footer y consola sin errores.
- Contrastes calculados: `--terracotta`/texto claro `5.89:1`, `--paper`/`--ink` `14.87:1` y `--paper`/`--terracotta-dark` `7.87:1`.

Actualización del 27 de agosto de 2026:

- Revisión interactiva con servidor estático en 1440 × 1000, 980 × 900, 720 × 900, 420 × 844 y 320 × 700 px, sin overflow horizontal en página, diálogo, mapa ni navegación inferior.
- Comprobados navbar translúcido sobre los cuatro slides, cambio reversible a `rgb(244, 239, 229)` opaco y sin blur tras `about-lead`, y el mismo comportamiento en mobile.
- Comprobadas filas con y sin comodidades: tipografía, color, icono de 24 px, stroke de 1.5 px y `gap` coinciden con Tipo de comida; el estado vacío obtuvo desviación horizontal medida de 0 px.
- Comprobadas fichas Top 1, Top 2 y Top 3; imagen territorial y directa; platos presentes y ausentes; mapa diferido con coordenadas y estado sin mapa; horarios, comodidades y precios referenciales; contacto, reviews pendientes, navegación filtrada, reinicio de scroll, Escape, foco visible y devolución de foco.
- El dataset tiene 101 descripciones, por lo que el fallback de descripción ausente quedó revisado en código pero no pudo ejercitarse con un registro real. La activación de una fila mediante Enter/Espacio queda pendiente de una revisión manual fuera del controlador de navegador; el control continúa siendo un `button` nativo habilitado.
- La continuación de la ronda comprobó en runtime `gap: 4px`, fondo transparente, borde `none`, padding `0`, estado vacío alineado a la izquierda y `padding-block` simétrico de 24 px en desktop y 16 px en 320 px. Los cuatro slides cargaron imágenes naturales de 2880 px; los sellos 1/2/3 se inyectaron en el header, el Top 1 se verificó en su ficha y el CTA de Puelpún aplicó búsqueda exacta y mostró su atributo no ordinal.

Actualización del 29 de agosto de 2026:

- Verificados los seis slides de cocinerías por ID: clic en la superficie y control compacto, Enter, Espacio, cierre y devolución de foco. El slide introductorio y los siete dots no abren fichas.
- Comprobada la apertura de Restaurante Pily con filtro Atacama activo: el filtro permaneció intacto, la ficha abrió como `1 de 6` y Siguiente navegó al primer resultado de Atacama.
- Hover comprobado sobre wrapper, icono y texto de Pet friendly, Estacionamiento y Accesibilidad, en varias filas y después de paginar; color e icono cambian sin alterar ancho ni alto.
- Revisión responsive medida en 1280, 980, 720, 430, 390, 375, 360 y 320 px. No hubo overflow horizontal; 430–360 px conservaron las tres columnas informativas y 320 px activó la excepción de dos columnas + Precio.
- El mínimo global cambió a `min-width: min(320px, 100%)`: elimina los 15 px de overflow cuando una scrollbar clásica reduce un viewport nominal de 320 px a 305 px útiles.

Actualización del 4 de septiembre de 2026:

- Verificados los tres soles exclusivamente en `CL-RM-001`, `CL-LL-010` y `CL-MG-001`, derivados de la fuente editorial DOM vigente; sus botones anuncian el estado de Destacada y los nombres largos conservan wrap natural.
- Comprobados hover y `focus-visible` de la fila: Comodidades comparte el fondo transicional con Tipo y Precio, mientras sus ítems mantienen el cambio coordinado de texto, fill y stroke.
- Revisada la retícula en 1440, 1180, 1179, 980, 768, 720, 520, 390 y 320 px. No hubo overflow horizontal ni superposición; a 390 px `Comida chilena` y `Estacionamiento` permanecieron en una línea y a 320 px se conservó la variante de dos columnas más Precio.
- En la ronda posterior se verificaron exactamente tres soles en los slides experimentales de Destacadas y tres `editorial-rank-icon` en las filas Top 1/2/3. El SVG queda subordinado al nombre y las etiquetas textuales o accesibles conservan el significado sin depender del color.
- Se comprobó la normalización de presentación en seis coincidencias por nombre o nombre alternativo: `Ckunza Tilar`, `Cafetería Nicolás`, `Pily`, `Cocinería Millacaman`, `Tradiciones Cocinería Morelia` y `Mata Rangi`. Los campos canónicos siguen intactos para matching e identidad.
- `La Favorita` conserva cinco categorías en la fuente y muestra tres en la fila. La taxonomía demo actual no produce más de dos comodidades, aunque el mismo límite de tres está aplicado al render.
- Las fichas verificadas cubrieron estados sin datos, Eventos `Sí`, Catering `Sí` y banquetería no confirmada. La revisión visual se realizó en 1440 × 1000, 768 × 1024, 390 × 844 y 320 × 700 px, sin overflow horizontal de página o diálogo.

Actualización del 10 de septiembre de 2026:

- Revisada la retícula en 1440, 1180, 1100, 768, 520, 390 y 320 px. Tipo y Comodidades ganan ancho útil; Precio y Detalle permanecen compactos, sin overflow de fila o página. La taxonomía demo vigente produce uno o dos amenities por registro, no tres, por lo que el tercer caso solo queda cubierto estructuralmente por el límite de render existente.
- Las insignias Top 1/2/3 se comprobaron alineadas al borde izquierdo interno de su caja en desktop, tablet y mobile. Top y Destacadas conservan borde computado de 0 px al activar hover, reciben la misma sombra exterior y mantienen dimensiones idénticas antes/después; `focus-visible` conserva outline de 3 px.
- El carrusel completó dos ciclos manuales y dos ciclos automáticos completos sobre sus siete slides, incluyendo ambos límites, indicadores, títulos e imágenes sincronizados. La pausa por hover conservó el índice y la salida del hover reanudó el autoplay. La rama `prefers-reduced-motion` se revisó en código; esta ronda no dispuso de emulación runtime del media feature.
- Comprobado un nombre de ocho palabras en 1180, 768, 390 y 320 px: la última línea conservó `Dorador Alcota` como unidad y no apareció una palabra huérfana; nombres de los slides reutilizan la misma transformación de salida.
- Consultas comprobadas: `comida chilena`, `mariscos`, `porotos`, `Estacionamiento`, `economico`, `Pily`, `Puerto Saavedra`, `MARISCOS`, `cocineria` y una variante con espacios repetidos. También se verificó `mariscos` combinado progresivamente con Arica y Parinacota, Pescados, Estacionamiento y Económico; contador, resumen, estado vacío, reset y paginación conservaron estado y lógica AND.

Actualización del 12 de septiembre de 2026 — arquitectura de la ficha:

- Referencia adjunta inspeccionada y contrastada visualmente con hero, resumen gastronómico, mapa/práctica, reseñas y contacto en el navegador local.
- Comprobadas fichas Top 1/2/3, Destacadas y normales; imagen directa/territorial; nombre más largo a 320 px; platos/contacto/dirección faltantes; Eventos `Sí`, Catering `Sí` y banquetería no confirmada. Se conservaron avisos y fuentes, sin inventar datos ni duplicar insignias.
- Navegación circular comprobada en los cuatro resultados de `mariscos` + Los Lagos, incluyendo 4 → 1 y 1 → 4; contador dinámico, apertura con Enter, Escape, cierre visible, foco devuelto y reinicio del scroll. Los resultados únicos mantienen navegación deshabilitada.
- Revisión visual en desktop 1440/1180 px, tablet 980/768/720 px y mobile 420/390/320 px; mediciones adicionales a 520 px. Sin overflow horizontal del diálogo o de la página en los nueve anchos. Se mantienen encabezado y navegación fuera del scroll; el fondo permanece bloqueado al abrir.
- Consola sin errores ni advertencias durante estas pruebas. No se añadió animación; reduced motion conserva su código previo, sin emulación runtime en esta ronda. La revisión integral independiente de QA-001 continúa pendiente.

## Discrepancias relevantes

| Tema | Intención documentada | Implementación actual | Clasificación |
|---|---|---|---|
| Ver ficha | Flecha debajo del texto y orientada hacia abajo | Texto y símbolo apilados, pero usa `→` | `APROBADO PERO NO IMPLEMENTADO` |
| Fuente de datos | `directorio_cocinerias_chile.md` es fuente principal | Está ignorado y no existe en el repositorio público | `PENDIENTE` crítico para regeneración |
| Iconos sociales | SVG propios permitidos; iconos visibles | PNG de Flaticon permanecen, pero la interfaz usa SVG inline | Documentación/asset histórico parcialmente obsoleto |
| Atribución Flaticon | `ATTRIBUTION.md` afirma que la atribución es visible en footer | No existe atribución Flaticon visible y los PNG no se usan | `POR VALIDAR` |
| Datos | Producción debe usar información verificable | Precio, horarios, preferencias alimentarias y comodidades tienen prototipos activos | `PENDIENTE` antes de producción |
| Assets históricos del carrusel | Carrusel vigente con cuatro fotografías de 2880 px | `empanadas-de-pino.jpg` y tres imágenes `zona-*` quedan sin uso y están documentadas como históricas | Mantenibles, pero revisar si deben conservarse |

## Vacíos comprobados

- No hay `README.md`; las reglas operativas y la documentación canónica viven actualmente en `AGENTS.md` y `docs/`.
- No existe despliegue o hosting documentado.
- No hay flujo real para el CTA ni URLs sociales.
- No hay pruebas automatizadas, linter ni validación HTML/CSS configurada.
- No consta todavía una metodología formal completa para mantener y reevaluar el Top 3 y los destacados por atributo, aunque los seis casos vigentes tienen fuentes y criterio documentados.
- No existe integración autorizada para reseñas de Google; ninguna de las 101 fichas puede mostrarlas todavía.
- Solo 2 de 101 registros permiten construir un preview cartográfico sin geocodificar ni inventar coordenadas.
