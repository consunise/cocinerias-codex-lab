# Estado actual verificado

Auditoría realizada: 21 de agosto de 2026  
Rama: `main`  
Commit: `045dd1fc3add89ee6094d7fe72704e0bc27ab924`  
Mensaje: `correcciones version 0.9.2`

Este documento describe el estado comprobado del repositorio en ese commit. No convierte automáticamente lo implementado en una decisión de producto.

Actualizaciones posteriores, consolidadas al 26 de agosto de 2026: footer terracota; filtros AND y reordenados; Rapa Nui como territorio especial; header editorial antes del directorio; navbar translúcido con CTA invitacional; nueva jerarquía de filas; taxonomía alimentaria separada de comodidades; autocomplete por nombre; ficha editorial sobre el `dialog` vigente. El resto del documento conserva el baseline auditado.

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
- Navbar sticky superpuesto al header, con mezcla parcialmente transparente de `--paper`, blur ligero y bordes definidos.

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
- Comodidades referenciales bajo la metadata, con fondo `--paper`, sin borde y con tipografía/color equivalentes a Tipo de comida.
- Acción `Ver ficha` apilada verticalmente, pero el símbolo actual es `→`, no flecha hacia abajo.

### Modal

- `dialog` nativo con cierre, fondo, scroll interno y navegación circular anterior/siguiente.
- La navegación usa el conjunto actualmente filtrado.
- Hero de ancho completo con imagen local, overlay, nombre, territorio y nombre alternativo; 100 imágenes `regional-fallback` muestran `Imagen de referencia territorial` y Mata Rangi, única imagen `direct`, no muestra esa advertencia.
- El Top 1/2/3 de las fichas se deriva de `data-restaurant-id` y `data-editorial-rank` en los tres slides destacados del carrusel.
- Secciones vigentes: Sobre esta cocinería, Platos destacados, Tipo de comida, Comodidades, Información práctica, Ubicación, Reseñas en Google e Información del registro.
- Las 101 descripciones proceden del campo `description`; 53 registros con `specialties` muestran sus valores exactos y los otros 48 muestran `No informado`.
- Preferencias alimentarias, comodidades, horarios y precios demo se identifican como información referencial dentro de la ficha.
- Dos registros tienen coordenadas válidas (`Cocinería El Yugo` y `Cocinería Flor Marina`) y generan un preview OpenStreetMap diferido con atribución. Los 99 restantes muestran que la vista previa no está disponible.
- Tres registros conservan enlaces cartográficos almacenados: dos a Waze y uno a OpenStreetMap; el label refleja el proveedor real aunque el campo fuente se llame `googleMaps`.
- No existe integración autorizada de Google Places ni contenido de reseñas en el dataset. La sección de reseñas muestra el bloqueo explícito y no renderiza reseñas ficticias.
- Estado, confianza, ID, clasificación, notas, fecha, fuente principal y fuentes adicionales quedan agrupados al final.
- Abrir o navegar a otra ficha reinicia el scroll interno; cierre visible, Escape y devolución de foco se conservan.

### Carrusel editorial

- Primer bloque editorial inmediatamente después del navbar y antes del directorio.
- Cuatro slides de fondo a pantalla completa dentro de `Acerca de esta guía`.
- Slide 1: contenido introductorio con empanadas de pino.
- Top 1: Restaurante Pily.
- Top 2: Mata Rangi.
- Top 3: Cocinería Bellavista.
- Cada destacado incluye ubicación, descripción, platos, tres etiquetas y enlace de referencia.
- Autoplay cada 6 segundos, indicadores clickeables, teclado y pausa por hover/foco.
- Autoplay desactivado con `prefers-reduced-motion` o pestaña no visible.
- No hay botones anterior/siguiente.
- El carrusel no tiene marco perimetral; conserva outline solo como estado de foco accesible.
- La caja editorial alterna `--terracotta`, `--paper`, `--terracotta`, `--paper`; imagen, texto y tema cambian en el mismo slide.
- Los cuatro dots usan círculos visibles de 16 × 16 px dentro de targets de 44 × 44 px, con activo por relleno y anillo, foco visible y sin fondo rectangular en el wrapper.

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
- El manifiesto de imágenes declara 101 rutas, fuentes y hashes únicos; solo Mata Rangi usa una imagen directa del establecimiento.
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

## Discrepancias relevantes

| Tema | Intención documentada | Implementación actual | Clasificación |
|---|---|---|---|
| Ver ficha | Flecha debajo del texto y orientada hacia abajo | Texto y símbolo apilados, pero usa `→` | `APROBADO PERO NO IMPLEMENTADO` |
| Fuente de datos | `directorio_cocinerias_chile.md` es fuente principal | Está ignorado y no existe en el repositorio público | `PENDIENTE` crítico para regeneración |
| Iconos sociales | SVG propios permitidos; iconos visibles | PNG de Flaticon permanecen, pero la interfaz usa SVG inline | Documentación/asset histórico parcialmente obsoleto |
| Atribución Flaticon | `ATTRIBUTION.md` afirma que la atribución es visible en footer | No existe atribución Flaticon visible y los PNG no se usan | `POR VALIDAR` |
| Datos | Producción debe usar información verificable | Precio, horarios, preferencias alimentarias y comodidades tienen prototipos activos | `PENDIENTE` antes de producción |
| Assets `zona-*` | Carrusel Top 3 vigente | Tres imágenes `zona-*` quedan sin uso y están documentadas como históricas | Mantenibles, pero revisar si deben conservarse |

## Vacíos comprobados

- No hay `README.md`; las reglas operativas y la documentación canónica viven actualmente en `AGENTS.md` y `docs/`.
- No existe despliegue o hosting documentado.
- No hay flujo real para el CTA ni URLs sociales.
- No hay pruebas automatizadas, linter ni validación HTML/CSS configurada.
- No consta una metodología formal para el Top 3.
- No existe integración autorizada para reseñas de Google; ninguna de las 101 fichas puede mostrarlas todavía.
- Solo 2 de 101 registros permiten construir un preview cartográfico sin geocodificar ni inventar coordenadas.
