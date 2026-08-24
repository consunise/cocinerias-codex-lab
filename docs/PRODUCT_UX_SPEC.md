# Especificación vigente de producto y UX/UI

Última consolidación: 21 de agosto de 2026.  
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

- Debe ser sticky, opaco y coherente con la cuadrícula del directorio.
- El buscador usa `Buscar por nombre de cocinería...` y se alinea con `results-area`.
- Instagram y WhatsApp deben ser reconocibles, visibles y de peso equivalente; SVG propios están permitidos.
- No usar emojis ni Unicode como iconos sociales.
- El CTA principal se ubica al extremo derecho y tiene mayor jerarquía que redes.
- Texto implementado actual: `Agrega tu cocinería`.
- `PENDIENTE`: definir destino y flujo posterior al clic.
- `PENDIENTE`: configurar URLs reales de Instagram y WhatsApp.

## Results toolbar

- Mostrar `16 regiones`.
- Mostrar `A lo largo y ancho de Chile` como dato independiente.
- Mantener familia, tamaño, peso y line-height coherentes para textos descriptivos.
- `active-summary` aparece debajo de `results-meta`.

## Filtros

Filtros vigentes:

- Región.
- Tipo de comida.
- Rango de precio.
- Comodidades, como nombre provisional para servicios, infraestructura y necesidades alimentarias.

Comportamiento:

- Solo un desplegable abierto a la vez.
- Abrir uno cierra los demás sin perder selección.
- Tipo, precio y comodidades permiten selección múltiple tipo toggle.
- Región permite una selección; volver a pulsarla la desmarca.
- Reset limpia todos los filtros, cierra desplegables y vuelve al inicio del directorio.
- Mantener `focus-visible`, targets suficientes y adaptación mobile.
- Las opciones internas no usan la línea lateral terracota del control principal.
- El hover del control principal usa línea terracota sin layout shift y con separación suficiente respecto del texto.

### Regiones

- Orden geográfico norte-sur.
- Números romanos tradicionales como etiqueta, sin que determinen el orden.
- `Todo Chile` como opción separada.
- No incorporar Rapa Nui/Isla de Pascua como región o filtro independiente sin nueva instrucción.
- Tras cambiar o desmarcar región, desplazar al inicio de resultados respetando el navbar sticky.

### Tipo de comida e iconografía

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
- Opciones veganas.
- Opciones vegetarianas.
- Opciones para celíacos.
- Adaptación frente a alergias alimentarias.

Los datos actuales son de demostración. No deben presentarse como atributos reales.

## Listado y previews

### Encabezado

- `list-header` permanece sticky en desktop y no tapa contenido.
- Al quedar junto al navbar, su borde superior desaparece para evitar doble línea.
- La línea inferior de `results-area` permanece eliminada.

### Columnas

- Precio relativamente angosto.
- Tipo de comida recibe el espacio liberado.
- `Rango de precio` y sus valores usan peso regular, equivalente al resto.

### `restaurant-main`

- Márgenes contenidos y alineación con la cuadrícula.
- Fotografía legible, sin oscurecimiento excesivo.
- Hover/foco con línea terracota a la izquierda de la imagen, más gruesa que filtros y paginación, sin layout shift.
- Nombre, horario y ubicación legibles.
- Horario y ubicación comparten línea en desktop cuando haya espacio.
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
- Presenta datos con estado, confianza, fuente y fecha cuando existan.
- Los datos no disponibles se muestran como no informados; los prototipos se señalan como referenciales.

## Acerca de esta guía / carrusel

Dirección vigente:

- Header editorial de ancho completo con fotografía de fondo tipo `cover`.
- Caja de contenido superpuesta con fondo terracota.
- Cuatro slides sincronizados: imagen, texto e indicador cambian como una unidad.
- Indicadores circulares centrados.
- Autoplay sin botones anterior/siguiente.
- Pausa por hover/foco y respeto de `prefers-reduced-motion`.
- Assets locales, alta resolución y atribución trazable.

Contenido:

1. Mantener el slide introductorio actual.
2. Top 1: Restaurante Pily, Puerto Saavedra.
3. Top 2: selección editorial documentada.
4. Top 3: selección editorial documentada.

Cada destacado debe incluir insignia editorial, nombre, ubicación, descripción breve, platos documentados, tres labels editoriales y fuente. Las etiquetas no son premios ni certificaciones.

El estado actual selecciona Mata Rangi y Cocinería Bellavista como Top 2 y Top 3. Cualquier cambio exige investigación actual y actualización de fuentes.

## Footer

Decisión vigente confirmada el 24 de agosto de 2026:

- fondo `--terracotta`, reemplazando `--paper`;
- sin línea superior;
- contacto alineado a la izquierda;
- contacto e información alineados horizontalmente en desktop y apilados en mobile;
- texto y enlaces claros con contraste suficiente sobre terracota;
- iconos sociales en `--terracotta-dark` sobre recuadros `--white`;
- hover en `--paper-deep` y foco visible en `--white`;
- `footer-brand-text` con menor protagonismo;
- reducir el vacío entre directorio y `Acerca de esta guía`.

## Contenido, datos e imágenes

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
