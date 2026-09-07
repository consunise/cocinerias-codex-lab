# Especificación vigente de producto y UX/UI

Última consolidación: 4 de septiembre de 2026.
Esta especificación deriva del hand-off y se contrasta con el repositorio auditado. Los conflictos se enlazan a [DECISIONS.md](DECISIONS.md).

## Dirección de producto

La página debe facilitar descubrir cocinerías chilenas con una interfaz editorial y utilitaria. Debe sentirse limpia, contemporánea, cálida, gastronómica y territorial, sin recurrir a clichés patrióticos o turísticos.

Evitar:

- apariencia de agregador genérico;
- estética “AI slop”;
- ornamentación excesiva;
- sombras innecesarias;
- iconografía inconexa;
- elementos de sistemas visuales distintos;
- claims o datos sin respaldo.

## Lenguaje visual comprobado

- Terracota como color estructural de identidad, líneas, iconos y estados.
- Fondo general `--paper` y variantes existentes en `styles.css`.
- Serif para identidad y títulos editoriales; sans serif para controles y datos.
- Bordes y líneas antes que sombras como sistema de separación.
- Reutilizar siempre tokens existentes antes de crear uno nuevo.
- Los valores exactos se documentan en [TECHNICAL_ARCHITECTURE.md](TECHNICAL_ARCHITECTURE.md) y viven en el CSS.

## Navbar

- Debe ser sticky y coherente con la cuadrícula del directorio.
- Mientras se superpone a `about-lead`, una superficie controlada de `--paper` parcialmente transparente y con desenfoque ligero permite percibir la fotografía sin perder contraste.
- Cuando el navbar supera completamente `about-lead`, tanto su superficie como el buscador pasan a `var(--paper)` opaco, sin desenfoque. El cambio usa una transición breve y debe revertirse al volver al header.
- El buscador usa `Buscar por nombre de cocinería...` y se alinea con `results-area`.
- Al escribir, despliega hasta siete sugerencias basadas exclusivamente en el nombre principal o alternativo: matching parcial sin distinción de mayúsculas ni tildes, primero coincidencias al inicio y después coincidencias contenidas.
- El autocomplete usa semántica combobox/listbox, se actualiza progresivamente, se cierra al vaciar, seleccionar, pulsar Escape o hacer clic fuera y permite ArrowDown, ArrowUp y Enter. Elegir una opción aplica el registro exacto y lleva al inicio de resultados; escribir sin elegir conserva el filtro parcial.
- Instagram y WhatsApp deben ser reconocibles, visibles y de peso equivalente; SVG propios están permitidos.
- No usar emojis ni Unicode como iconos sociales.
- El CTA principal se ubica al extremo derecho y tiene mayor jerarquía que redes.
- Texto vigente: `Sé parte de la guía`; su tratamiento terracota debe sentirse invitacional y conservar hover, foco visible y active.
- `PENDIENTE`: definir destino y flujo posterior al clic.
- `PENDIENTE`: configurar URLs reales de Instagram y WhatsApp.

## Results toolbar

- Mostrar `16 regiones`.
- Mostrar `A lo largo y ancho de Chile` como dato independiente.
- Mantener familia, tamaño, peso y line-height coherentes para textos descriptivos.
- `active-summary` aparece debajo de `results-meta`.

## Filtros

Filtros vigentes:

- Rango de precio.
- Región.
- Tipo de comida.
- Comodidades, para características físicas o de servicio del establecimiento.

Comportamiento:

- Rango de precio aparece abierto solo en la carga inicial; los otros grupos comienzan cerrados.
- Solo un desplegable abierto a la vez.
- Abrir uno cierra los demás sin perder selección.
- Tipo, precio y comodidades permiten selección múltiple tipo toggle.
- Las selecciones múltiples se combinan mediante AND dentro de cada grupo: el registro debe cumplir todas las opciones seleccionadas.
- Región, tipo, precio y comodidades también se combinan mediante AND entre grupos.
- Región permite una selección; volver a pulsarla la desmarca.
- Reset limpia todos los filtros, cierra desplegables sin reabrir precio y vuelve al inicio del directorio.
- Mantener `focus-visible`, targets suficientes y adaptación mobile.
- Las opciones internas no usan la línea lateral terracota del control principal.
- El hover del control principal usa línea terracota sin layout shift y con separación suficiente respecto del texto; mientras el grupo esté abierto, conserva exactamente ese mismo tratamiento aunque no tenga hover.

### Regiones

- Orden geográfico norte-sur.
- Números romanos tradicionales como etiqueta, sin que determinen el orden.
- `Todo Chile` como opción separada.
- `Isla de Pascua / Rapa Nui` aparece inmediatamente después de Valparaíso como territorio especial asociado a `V — Valparaíso`, sin número romano propio.
- La opción territorial no modifica el total oficial de `16 regiones` y filtra solo registros cuya ubicación identifique Rapa Nui, Isla de Pascua o Hanga Roa.
- El dataset actual no contiene registros asociados; seleccionar la opción muestra el estado vacío normal.
- Tras cambiar o desmarcar región, desplazar al inicio de resultados respetando el navbar sticky.

### Tipo de comida e iconografía

- Incluye `Vegano`, `Vegetariano` y `Celíaco` como opciones multiselección referenciales con la misma lógica AND, toggle, resumen y reset del resto del grupo.
- Las tres preferencias alimentarias actuales son datos de demostración y deben mantener una marca visible; no constituyen atributos verificados.
- Reutilizar los mismos SVG en filtros y filas.
- Mariscos usa una concha; comida al paso usa una bolsa ancha; comida chilena usa bandera chilena.
- Todos los iconos comparten outline, grosor y proporciones.
- En hover, rellenar solo las zonas adecuadas y conservar detalles internos terracota.
- Pescados, mariscos y opciones vegetales conservan el outline.
- La olla conserva líneas de tapa.
- La bandera mantiene estrella y divisiones; al hover, solo el rectángulo inferior toma terracota claro y el superior derecho permanece sin relleno.

### Comodidades

Conceptos previstos:

- Pet friendly.
- Estacionamiento.
- Accesibilidad.

Los datos actuales son de demostración. No deben presentarse como atributos reales.

`Vegano`, `Vegetariano` y `Celíaco` no se duplican aquí: pertenecen a Tipo de comida. `Alergias friendly` o adaptación frente a alergias no forma parte de la interfaz vigente.

En `restaurant-main`, las etiquetas informativas no usan fondo, borde, outline, caja ni padding propio. Texto e iconos comparten con Tipo de comida familia, tamaño, peso, line-height, geometría de 24 px, stroke de 1.5 px, alineación y tratamiento hover; sobre la fotografía adoptan conjuntamente el color claro contextual que asegura contraste. Un único `gap: 0.25rem` separa icono y texto. Conservan la marca visible `Referencial` y no se comportan como botones.

Cuando una fila no tiene comodidades, el área conserva su lugar en la retícula y `No informado` se alinea al borde izquierdo de su columna, sin caja ni fondo.

## Listado y previews

### Encabezado

- `list-header` permanece sticky en desktop y no tapa contenido.
- Al quedar junto al navbar, su borde superior desaparece para evitar doble línea.
- La línea inferior de `results-area` permanece eliminada.

### Columnas

- Precio relativamente angosto.
- Tipo de comida y Comodidades reciben espacio suficiente mediante anchos no idénticos; Comodidades puede ser ligeramente más amplia para evitar comprimir sus etiquetas.
- `Rango de precio` y sus valores usan peso regular, equivalente al resto.
- En desktop y tablet, los encabezados y grupos internos de Tipo de comida, Comodidades y Precio se alinean hacia el borde izquierdo de sus respectivas columnas.
- Tipo de comida y Comodidades muestran como máximo tres elementos por fila. El límite es de presentación: no recorta datos ni añade `+N`, tooltip o expansión.

### `restaurant-main`

- Márgenes contenidos y alineación con la cuadrícula.
- `padding-block` simétrico en todas las filas: el espacio superior e inferior no depende de que existan comodidades ni de la longitud del nombre.
- Fotografía legible, sin oscurecimiento excesivo.
- Capa diagonal más oscura en la esquina inferior izquierda y progresivamente más transparente hacia la esquina superior derecha.
- Hover/foco con línea terracota a la izquierda de la imagen, más gruesa que filtros y paginación, sin layout shift.
- Ubicación secundaria directamente encima del nombre.
- Nombre alineado a la izquierda y con la jerarquía serif existente.
- El bloque no centra verticalmente el nombre: ubicación, título y horario siguen su flujo natural desde la parte superior.
- Horario debajo del bloque ubicación–nombre, sin repetir la ubicación. Ubicación, nombre y metadata conservan un eje izquierdo dentro de la fotografía; Tipo de comida, Comodidades y Precio forman un sistema separado con alineación izquierda consistente dentro de cada columna.
- Los registros Top 1/2/3 muestran junto al nombre la misma `editorial-rank-icon` numérica del carrusel y la ficha. El SVG es decorativo y el nombre accesible de la fila comunica el puesto.
- Ni horario ni ubicación usan sombras de texto.
- Los datos de `restaurant-meta` se separan mediante divisores verticales cortos y discretos.
- Comodidades aparecen bajo la metadata con el mismo lenguaje de iconos y con marca referencial mientras sean simuladas.

### Ver ficha

- Texto y flecha se componen verticalmente.
- La flecha debe orientarse hacia abajo.
- Toda el área continúa siendo clickeable y conserva foco/hover.
- Estado actual: composición vertical implementada, símbolo incorrecto `→`; ver DEC-011.

## Paginación

- 10 cocinerías por página.
- Anterior y Siguiente comparten sistema visual.
- Hover/foco mediante línea lateral terracota; línea derecha en Anterior e izquierda en Siguiente.
- La línea del preview de restaurante puede ser más gruesa que las de controles.
- Tras cambiar de página, llevar al inicio de resultados y anunciar/focalizar el contador.

## Modal

- Se abre desde la fila completa.
- Permite cerrar y navegar anterior/siguiente dentro del conjunto filtrado.
- Debe devolver el foco al disparador cuando se cierra.
- Mantiene un único `dialog` con scroll interno; abrir una ficha o navegar a otra reinicia el scroll al comienzo.
- La cabecera es un hero fotográfico de ancho completo con overlay. Su orden es insignia Top N, cuando corresponde; ciudad o localidad con región; nombre protagonista; nombre alternativo, cuando existe. El nombre mantiene la jerarquía principal con `clamp(2.35rem, 4.8vw, 4.35rem)` y escalas móviles más contenidas para evitar una ocupación excesiva con títulos largos. Si `imageKind` no es `direct`, muestra `Imagen de referencia territorial`; el `alt` reutiliza `imageLabel`.
- Las fichas Top 1, Top 2 y Top 3 muestran `Selección de la guía · Top N`, derivada de la misma configuración DOM del carrusel y no de una segunda lista de nombres.
- Debajo del hero, un bloque editorial compacto reúne `Sobre esta cocinería`, `Platos destacados` y `Tipo de comida`.
- La sección práctica integra Horario, Comodidades y un grupo común de Capacidad, Eventos y Catering. Estos tres últimos distinguen `Sí`, `No` y `No confirmado / sin datos`; nunca convierten ausencia en `No`. En 720 px o menos el layout principal se apila y, a 520 px o menos, los tres datos del grupo se apilan internamente.
- Después se presenta `Menú` solo cuando exista un dato estructurado y respaldado; no se infiere desde `specialties`, `cuisine` o `description`. A continuación aparecen Reseñas en Google, Información y contacto, Sobre los datos y navegación.
- `Sobre esta cocinería` reutiliza `description`. Si falta, puede construir una frase factual únicamente con ubicación y tipo de comida disponibles; si tampoco bastan, muestra `No informado`.
- `Platos destacados` reproduce únicamente `specialties`, separando entradas explícitas por coma o punto y coma; no infiere platos desde categorías amplias. Si falta, muestra `No informado`.
- Tipo de comida y Comodidades reutilizan los SVG y el sistema visual del listado. Preferencias y comodidades demo conservan la marca `Información referencial`.
- La ubicación usa coordenadas validadas del registro. Con coordenadas, crea al abrir la ficha un iframe OpenStreetMap `loading="lazy"`, con `title` y atribución ODbL; sin coordenadas, muestra una indisponibilidad explícita. Un enlace cartográfico ya almacenado tiene prioridad para abrir la fuente externa.
- Reseñas en Google solo pueden mostrarse mediante una integración o fuente autorizada, con atribución y enlaces exigibles. Mientras no exista, la sección declara `PENDIENTE — requiere integración o fuente autorizada` y no incluye autores, puntuaciones ni textos ficticios.
- `Información y contacto` muestra únicamente teléfono, WhatsApp, email, perfiles sociales y sitio web que pasen la validación de URL, además de servicios, pagos, año de fundación u otras redes cuando existan. No publica `owner` sin una decisión de pertinencia pública y trazabilidad por campo.
- `Sobre los datos` presenta estado, confianza, ID, clasificación, notas, fecha y enlaces de fuentes disponibles.
- Los datos no disponibles se muestran como `No informado`; los prototipos se señalan como referenciales.

## Acerca de esta guía / carrusel

Dirección vigente:

- Es el primer bloque editorial después del navbar y antes del directorio, en desktop y mobile.
- Header editorial de ancho completo con fotografía de fondo tipo `cover`.
- La fotografía se integra directamente con la sección, sin marco perimetral visible; el outline de foco funcional se conserva.
- Caja de contenido superpuesta con secuencia de fondo `--terracotta`, `--paper`, `--terracotta`, `--paper`; cada slide adapta simultáneamente todos sus textos, labels y enlaces para conservar contraste.
- Cuatro slides sincronizados: imagen, texto e indicador cambian como una unidad.
- Indicadores circulares centrados e individuales: círculo visible de 16 × 16 px dentro de un botón transparente de 44 × 44 px. El activo se distingue por relleno y anillo, además del color; el wrapper no muestra fondo, borde, sombra ni padding con apariencia rectangular.
- Autoplay sin botones anterior/siguiente.
- Pausa por hover/foco y respeto de `prefers-reduced-motion`.
- Assets locales, alta resolución y atribución trazable.
- Las imágenes activas deben conservar nitidez a ancho completo: no se admiten thumbnails ni ampliación artificial. La selección vigente usa archivos de 2880 px de ancho, optimizados sin upscaling, con fuente, autor, licencia, dimensiones y fecha documentados.

Contenido:

1. Mantener el slide introductorio actual.
2. Top 1: Restaurante Pily, Puerto Saavedra.
3. Top 2: selección editorial documentada.
4. Top 3: selección editorial documentada.

Cada puesto debe incluir una insignia SVG de la familia editorial común, con número visible además del color, nombre, ubicación, descripción breve, platos documentados, tres labels editoriales y fuente. Las insignias y etiquetas no son premios ni certificaciones.

El estado actual selecciona Mata Rangi y Cocinería Bellavista como Top 2 y Top 3. Cualquier cambio exige investigación actual y actualización de fuentes.

Inmediatamente después del header se presenta una selección secundaria compacta de tres `Destacados de la guía` por atributos documentados. No prolonga el carrusel ni crea puestos Top 4–6. Cada caso muestra nombre, ubicación, atributo, descripción factual, motivo editorial, fuente y acceso al registro del directorio. El estado vigente selecciona Na Que Ver Cocinería Chilena por cocina chilena de mercado, Restaurant Tradiciones Cocinería Morelia por productos de huerta y Cocinería Puelpún por trayectoria histórica.

En las filas del directorio y en los slides experimentales que representan esas tres Destacadas, únicamente esos registros incorporan un sol lineal pequeño junto al nombre. Se genera desde la fuente editorial existente, no desde una lista adicional; el SVG usa `currentColor` y queda subordinado al título. En slides es decorativo porque `Destacada` ya aparece en texto; en la fila, el `aria-label` incluye `destacada de la guía`.

## Footer

Decisión vigente, confirmada nuevamente el 4 de septiembre de 2026:

- fondo `--terracotta`, reemplazando `--paper`;
- sin línea superior;
- contacto alineado a la izquierda;
- marca, contacto e información usan tres columnas iguales y un único gap en desktop; se apilan en mobile;
- texto y enlaces claros con contraste suficiente sobre terracota;
- iconos sociales de WhatsApp e Instagram en `--paper`, directamente sobre el fondo del footer y sin recuadro propio;
- la decisión de iconos del footer no modifica los iconos sociales del navbar;
- hover en `--paper-deep` y foco visible en `--white`;
- `footer-brand-text` con menor protagonismo;
- reducir el vacío entre directorio y `Acerca de esta guía`.

El fondo anterior `--paper` queda como antecedente reemplazado y no constituye una variante vigente.

## Contenido, datos e imágenes

- Los nombres canónicos permanecen intactos. Para presentación se eliminan únicamente descriptores genéricos completos equivalentes a `Restaurante` o `Restaurant`, de forma case-insensitive y sin afectar búsqueda, IDs, enlaces, descripciones ni categorías.
- No inventar horarios, platos, servicios, ubicaciones, rankings ni atributos para publicación.
- Si un prototipo requiere datos simulados, usar marcas estructuradas (`isPlaceholder`, `isEstimated`, `source: "placeholder"` o equivalente) y una indicación visible adecuada.
- Para datos reales, priorizar fuente del establecimiento, organismo público, red oficial, directorio/mapa, medio y guía especializada, en ese orden general.
- Registrar fecha de consulta y distinguir hecho, inferencia y no confirmado.
- Preferir fotografías locales, de buena resolución, sin personas cuando esa sea la directriz del conjunto y con licencia/atribución registradas.
- Una imagen territorial no puede presentarse como fotografía del establecimiento.

## Accesibilidad y responsive

Validar en cada cambio:

- navegación por teclado y retorno de foco;
- `aria-expanded`, `aria-pressed`, labels y anuncios live;
- `focus-visible` y contraste;
- targets clickeables;
- `alt` fiel al contenido y al tipo de imagen;
- contenido oculto correctamente;
- `prefers-reduced-motion`;
- desktop, tablet y mobile;
- ausencia de overflow, deformación de imágenes y controles fuera del viewport.

Los estados hover no pueden ser la única señal de una interacción importante.
