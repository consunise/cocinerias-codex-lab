# Estado actual verificado

Auditoría realizada: 21 de agosto de 2026  
Rama: `main`  
Commit: `045dd1fc3add89ee6094d7fe72704e0bc27ab924`  
Mensaje: `correcciones version 0.9.2`

Este documento describe el estado comprobado del repositorio en ese commit. No convierte automáticamente lo implementado en una decisión de producto.

Actualizaciones posteriores, consolidadas al 27 de agosto de 2026: footer terracota; filtros AND y reordenados; Rapa Nui como territorio especial; header editorial antes del directorio; navbar contextual con CTA invitacional; nueva jerarquía de filas; taxonomía alimentaria separada de comodidades; autocomplete por nombre; ficha editorial sobre el `dialog` vigente; fotografías de header a 2880 px; insignias SVG Top 1/2/3; y una selección secundaria de tres destacados por atributo. El resto del documento conserva el baseline auditado.

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
- El estado vacío y el buscador funcionan sobre el dataset en memoria; seleccionar una sugerencia filtra por ID exacto y la escritura libre mantiene coincidencia parcial.

### Preview de cocinería

- Fotografía como fondo de `restaurant-main`, con gradiente diagonal más oscuro abajo a la izquierda y más transparente arriba a la derecha.
- Hover/foco con realce de fotografía y línea terracota izquierda de 4 px sin layout shift.
- Ubicación sobre el nombre; horario debajo sin ubicación repetida. Ubicación, nombre, metadata, comodidades, tipo de comida y precio se alinean a la izquierda dentro de sus áreas, y el bloque fluye desde arriba sin centrar verticalmente el título.
- Divisores verticales en `restaurant-meta`.
- Tipos de comida con SVG y tratamientos hover.
- Rango de precio con peso regular.
- Comodidades referenciales bajo la metadata, sin fondo, borde, outline, caja ni padding propio. Tipografía, iconos de 24 px, stroke de 1.5 px y hover comparten el sistema de Tipo de comida; el color claro contextual mantiene contraste sobre la fotografía y el único `gap` icono–texto es de `0.25rem`.
- El área de comodidades conserva su lugar con o sin ítems. En las filas vacías, `No informado` ocupa el ancho disponible y queda alineado a la izquierda, sin caja.
- `restaurant-main` usa `padding-block` simétrico: 24 px en el viewport desktop comprobado y 16 px en 320 px.
- Acción `Ver ficha` apilada verticalmente, pero el símbolo actual es `→`, no flecha hacia abajo.

### Modal

- `dialog` nativo con cierre, fondo, scroll interno y navegación circular anterior/siguiente.
- La navegación usa el conjunto actualmente filtrado.
- Hero de ancho completo con imagen local y overlay. La copia sigue el orden insignia Top N, cuando corresponde; localidad y región; nombre; nombre alternativo. Las 100 imágenes `regional-fallback` muestran `Imagen de referencia territorial` y Mata Rangi, única imagen `direct`, no muestra esa advertencia.
- El Top 1/2/3 de las fichas se deriva de `data-restaurant-id` y `data-editorial-rank` en los tres slides destacados del carrusel.
- Inmediatamente bajo el hero, una retícula editorial reúne Sobre esta cocinería, Platos destacados y Tipo de comida.
- La información práctica usa dos columnas en desktop: Ubicación y mapa a la izquierda; Horario, Comodidades y Rango de precio a la derecha. A 720 px o menos se apila con Ubicación primero.
- Después aparecen Reseñas en Google, Información y contacto y Sobre los datos. Menú se omite porque ninguno de los 101 registros contiene un campo estructurado de menú, carta, URL o PDF.
- Las 101 descripciones proceden del campo `description`; 53 registros con `specialties` muestran sus valores exactos y los otros 48 muestran `No informado`.
- Preferencias alimentarias, comodidades, horarios y precios demo se identifican como información referencial dentro de la ficha.
- Dos registros tienen coordenadas válidas (`Cocinería El Yugo` y `Cocinería Flor Marina`) y generan un preview OpenStreetMap diferido con atribución. Los 99 restantes muestran que la vista previa no está disponible.
- Tres registros conservan enlaces cartográficos almacenados: dos a Waze y uno a OpenStreetMap; el label refleja el proveedor real aunque el campo fuente se llame `googleMaps`.
- No existe integración autorizada de Google Places ni contenido de reseñas en el dataset. La sección de reseñas muestra el bloqueo explícito y no renderiza reseñas ficticias.
- Información y contacto renderiza solo campos existentes y URLs válidas: teléfono, WhatsApp, email, Instagram, Facebook y web; servicios, pagos, año de fundación y otras redes se agrupan solo cuando existen.
- Aunque 10 registros tienen `owner`, la ficha no publica responsables: el esquema no expresa de forma estructurada pertinencia pública ni trazabilidad específica suficiente para justificar su exposición.
- Estado, confianza, ID, clasificación, notas, fecha, fuente principal y fuentes adicionales quedan agrupados al final bajo Sobre los datos.
- Abrir o navegar a otra ficha reinicia el scroll interno; cierre visible, Escape y devolución de foco se conservan.

### Carrusel editorial

- Primer bloque editorial inmediatamente después del navbar y antes del directorio.
- Cuatro slides de fondo a pantalla completa dentro de `Acerca de esta guía`.
- Slide 1: contenido introductorio con empanadas de pino.
- Top 1: Restaurante Pily.
- Top 2: Mata Rangi.
- Top 3: Cocinería Bellavista.
- Cada destacado incluye ubicación, descripción, platos, tres etiquetas y enlace de referencia.
- Top 1/2/3 usan tres variantes numéricas de una misma insignia SVG editorial propia, con número visible, `currentColor` y geometría común; la ficha reutiliza la misma función y la configuración DOM del carrusel.
- Autoplay cada 6 segundos, indicadores clickeables, teclado y pausa por hover/foco.
- Autoplay desactivado con `prefers-reduced-motion` o pestaña no visible.
- No hay botones anterior/siguiente.
- El carrusel no tiene marco perimetral; conserva outline solo como estado de foco accesible.
- La caja editorial alterna `--terracotta`, `--paper`, `--terracotta`, `--paper`; imagen, texto y tema cambian en el mismo slide.
- Los cuatro dots usan círculos visibles de 16 × 16 px dentro de targets de 44 × 44 px, con activo por relleno y anillo, foco visible y sin fondo rectangular en el wrapper.
- Los cuatro assets activos miden 2880 px de ancho y fueron reducidos desde originales mayores sin upscaling: empanada de Guanaqueros, costanera de Puerto Saavedra, panorama de Arica y panorama de Valparaíso. Las tres imágenes asociadas al Top 3 se rotulan como territoriales, no como fotografías de los locales.

### Destacados de la guía

- Sección editorial secundaria inmediatamente después del header, sin alterar los cuatro slides ni crear puestos Top 4–6.
- Tres casos sin superposición con el Top 3: Na Que Ver Cocinería Chilena (`Cocina chilena de mercado`), Restaurant Tradiciones Cocinería Morelia (`Productos de huerta`) y Cocinería Puelpún (`Trayectoria histórica`).
- Cada entrada incluye ubicación, descripción factual, razón editorial, fuente externa y CTA que aplica la búsqueda exacta en el directorio.
- Las fichas correspondientes muestran `Destacado de la guía · [atributo]`, claramente separado de `Selección de la guía · Top N`.

### Footer

- Fondo `--terracotta`, texto claro y sin línea superior.
- Tres columnas iguales de marca, contacto e información con un único gap en desktop; se apilan en mobile.
- Iconos sociales inline SVG en `--paper`, sin fondo propio y con enlaces todavía provisionales.
- La fecha visible dice `Datos verificados el 12.08.2026`.

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
- En el controlador con scrollbar vertical no superpuesto, un viewport nominal de 320 px deja 305 px de área útil mientras `body { min-width: 320px; }` conserva 320 px y expone 15 px de desplazamiento horizontal. Ningún bloque nuevo excede esos 320 px; el comportamiento procede del mínimo global existente y queda por resolver o aceptar en QA.

## Discrepancias relevantes

| Tema | Intención documentada | Implementación actual | Clasificación |
|---|---|---|---|
| Ver ficha | Flecha debajo del texto y orientada hacia abajo | Texto y símbolo apilados, pero usa `→` | `APROBADO PERO NO IMPLEMENTADO` |
| Fuente de datos | `directorio_cocinerias_chile.md` es fuente principal | Está ignorado y no existe en el repositorio público | `PENDIENTE` crítico para regeneración |
| Iconos sociales | SVG propios permitidos; iconos visibles | PNG de Flaticon permanecen, pero la interfaz usa SVG inline | Documentación/asset histórico parcialmente obsoleto |
| Atribución Flaticon | `ATTRIBUTION.md` afirma que la atribución es visible en footer | No existe atribución Flaticon visible y los PNG no se usan | `POR VALIDAR` |
| Datos | Producción debe usar información verificable | Precio, horarios, preferencias alimentarias y comodidades tienen prototipos activos | `PENDIENTE` antes de producción |
| Assets históricos del carrusel | Carrusel vigente con cuatro fotografías de 2880 px | `empanadas-de-pino.jpg` y tres imágenes `zona-*` quedan sin uso y están documentadas como históricas | Mantenibles, pero revisar si deben conservarse |
| Viewport nominal de 320 px con scrollbar clásico | No debe existir overflow horizontal | `body { min-width: 320px; }` produce 15 px de scroll cuando la barra vertical reduce el área útil a 305 px | `POR VALIDAR`; no fue introducido por esta ronda |

## Vacíos comprobados

- No hay `README.md`; las reglas operativas y la documentación canónica viven actualmente en `AGENTS.md` y `docs/`.
- No existe despliegue o hosting documentado.
- No hay flujo real para el CTA ni URLs sociales.
- No hay pruebas automatizadas, linter ni validación HTML/CSS configurada.
- No consta todavía una metodología formal completa para mantener y reevaluar el Top 3 y los destacados por atributo, aunque los seis casos vigentes tienen fuentes y criterio documentados.
- No existe integración autorizada para reseñas de Google; ninguna de las 101 fichas puede mostrarlas todavía.
- Solo 2 de 101 registros permiten construir un preview cartográfico sin geocodificar ni inventar coordenadas.
