# Registro de decisiones

Última consolidación: 4 de septiembre de 2026.

Este archivo conserva decisiones de producto, UX/UI, datos y operación. El código demuestra implementación; no reemplaza por sí solo una decisión explícita. Una instrucción directa más reciente puede reemplazar cualquier entrada.

## Decisiones vigentes

### DEC-001 — Evolución incremental sobre la implementación existente

Estado: `VIGENTE` / `IMPLEMENTADO COMO PRÁCTICA`

Decisión: inspeccionar el repositorio antes de editar, conservar lo que funciona y aplicar cambios focalizados. No reconstruir la landing ni migrar de stack por conveniencia.

Motivo: el producto acumula muchas rondas y una reconstrucción aumenta regresiones y pérdida de contexto.

### DEC-002 — HTML, CSS y JavaScript vanilla

Estado: `VIGENTE` / `IMPLEMENTADO`

Decisión: mantener el stack actual sin frameworks ni dependencias nuevas salvo autorización expresa y justificación.

### DEC-003 — Separar implementación, intención e historia

Estado: `VIGENTE`

Decisión: usar el repositorio para afirmar qué está implementado; `DECISIONS.md` y `PRODUCT_UX_SPEC.md` para la intención; prompts históricos solo como evidencia.

Motivo: evitar que una solicitud antigua vuelva a activarse por accidente.

### DEC-004 — Orden, apertura y lógica de filtros

Estado: `VIGENTE` / `IMPLEMENTADO`

Decisión: ordenar los grupos como Precio, Región, Tipo de comida y Comodidades. Precio se abre solo en la carga inicial; abrir otro grupo cierra el anterior y el reset deja todos cerrados.

Lógica: Tipo, Precio y Comodidades conservan multiselección toggle, pero combinan todas sus opciones mediante AND. Los distintos grupos también se intersectan mediante AND; una combinación imposible conserva sus filtros y muestra el estado vacío.

### DEC-005 — Regiones y territorio especial de Rapa Nui

Estado: `VIGENTE` / `IMPLEMENTADO`

Decisión: ordenar las 16 regiones de norte a sur, mostrar números romanos tradicionales y mantener `Todo Chile` separado. Incorporar `Isla de Pascua / Rapa Nui` después de Valparaíso como opción territorial especial asociada a `V — Valparaíso`, sin número romano propio ni cambio del total de 16 regiones.

Datos: la opción solo coincide con registros cuya ubicación identifique Rapa Nui, Isla de Pascua o Hanga Roa. Como el dataset actual no contiene ninguno, produce cero resultados sin inventar establecimientos.

Reemplaza: orden alfabético, presentación de Rapa Nui como región independiente y la decisión posterior de excluirlo por completo del filtro.

### DEC-006 — Paginación de 10 registros

Estado: `VIGENTE` / `IMPLEMENTADO`

Decisión: mostrar 10 cocinerías por página con Anterior, Siguiente y páginas numeradas.

Reemplaza: listado largo o carga progresiva mediante “ver más”.

### DEC-007 — Jerarquía y comportamiento de filas

Estado: `VIGENTE` / `IMPLEMENTADO`

Decisión: reducir el ancho de precio, dar espacio suficiente y no idéntico a Tipo de comida y Comodidades, mantener precio en regular, usar una línea terracota gruesa a la izquierda de la fotografía en hover/foco y separar metadata con líneas verticales. En `restaurant-main`, mostrar ubicación arriba, nombre debajo y horario después, sin repetir ubicación; esa copia conserva su eje izquierdo y el flujo natural desde arriba. `restaurant-cuisine`, `restaurant-amenities` y `restaurant-price` alinean sus grupos hacia el borde izquierdo de cada columna para formar un sistema común y evitar una curva visual según la longitud del contenido. La fila usa `padding-block` simétrico; el área de comodidades mantiene su posición aun sin ítems y muestra `No informado` alineado a la izquierda. Tipo de comida y Comodidades muestran como máximo sus tres primeros elementos en la fila, sin modificar los arreglos fuente ni añadir un contador oculto.

Tratamiento de comodidades: son categorías informativas sin fondo, borde, outline, píldora ni padding propio. Comparten geometría, tipografía y hover con Tipo de comida; un único `gap: 0.25rem` une icono y texto. El bloque deja visible el hover/foco del botón contenedor, igual que Tipo y Precio. Reemplaza el fondo `--paper`, el centrado y el eje derecho aprobados en iteraciones anteriores.

Reemplaza: nombre centrado e información secundaria alineada a la derecha.

Pendiente relacionado: orientación de la flecha de `Ver ficha`; ver DEC-011.

### DEC-008 — Iconografía coherente con detalles preservados

Estado: `VIGENTE` / `IMPLEMENTADO`

Decisión: reutilizar SVG entre filtros y filas. Los fills de hover no deben borrar outlines ni detalles; la bandera conserva divisiones y estrella, con relleno solo en la zona inferior. Las filas Top 1/2/3 reutilizan `editorialRankIcon()` junto al nombre y mantienen el número en el nombre accesible del botón, sin listas de ranking paralelas.

### DEC-009 — Carrusel editorial de cuatro slides

Estado: `VIGENTE` / `IMPLEMENTADO`

Decisión: ubicar el carrusel como header editorial inmediatamente después del navbar y antes del directorio. Mantener el slide introductorio y usar los otros tres para una selección Top 1, Top 2 y Top 3. Restaurante Pily ocupa Top 1. Carrusel automático, indicadores centrados, sin botones laterales y respetando reduced motion. Cada puesto utiliza una variante numérica de una misma insignia SVG editorial propia; el número distingue el puesto sin depender del color y la fuente Top 3 se reutiliza en las fichas.

Tratamiento: alternar el fondo de la caja editorial `--terracotta`, `--paper`, `--terracotta`, `--paper` en los cuatro slides y adaptar en cada slide el contraste de todo su contenido. Los indicadores usan un círculo visible de 16 × 16 px dentro de un target transparente de 44 × 44 px; el activo combina relleno y anillo, y el wrapper no tiene fondo, borde, sombra ni apariencia de píldora.

Calidad de imagen: los cuatro slides activos usan assets locales optimizados de 2880 px de ancho, obtenidos desde originales mayores y sin ampliación artificial. Cuando la fotografía es territorial, el caption y el `alt` no la atribuyen al establecimiento.

Reemplaza: carrusel editorial por zonas norte, centro y sur, y su ubicación posterior al directorio.

Observación: Top 2 y Top 3 actuales son Mata Rangi y Cocinería Bellavista; las fuentes están enlazadas en `index.html`. Falta metodología editorial formal.

### DEC-010 — Fondo del footer

Estado: `VIGENTE` / `IMPLEMENTADO Y REVALIDADO EL 04.09.2026`

Decisión: usar `--terracotta` como fondo del footer, sin línea divisoria superior, conservando su estructura y comportamiento responsive.

Contraste: texto y enlaces claros sobre terracota; iconos sociales de WhatsApp e Instagram en `--paper`, sin fondo ni borde propios; hover en `--paper-deep` y foco visible en `--white`. Esta regla de iconos solo aplica al footer.

Confirmación: decisión aprobada explícitamente el 24 de agosto de 2026 y confirmada nuevamente el 4 de septiembre de 2026. Reemplaza la implementación con fondo `--paper` del commit `045dd1f`.

Reemplaza para los iconos sociales del footer: el tratamiento anterior negro o `--terracotta-dark` sobre recuadros claros. No reemplaza ni modifica los iconos sociales del navbar.

### DEC-011 — Acción “Ver ficha” con flecha inferior

Estado: `VIGENTE` / `APROBADO PERO NO IMPLEMENTADO`

Decisión: texto y flecha centrados verticalmente, con flecha orientada hacia abajo y área clickeable completa.

Discrepancia: el código apila texto y símbolo, pero usa `→`.

### DEC-012 — Separación de preferencias alimentarias y comodidades

Estado: `VIGENTE` / `IMPLEMENTADO COMO DEMO`

Decisión: `Vegano`, `Vegetariano` y `Celíaco` pertenecen a Tipo de comida. `Comodidades` queda reservada para características físicas o de servicio del establecimiento: `Pet friendly`, `Estacionamiento` y `Accesibilidad`. `Alergias friendly` o adaptación frente a alergias se elimina de filtros y filas.

Restricción: las asignaciones actuales de estas seis opciones siguen siendo de demostración, se identifican como referenciales y no pueden presentarse como datos verificados.

Reemplaza: preferencias alimentarias y adaptación frente a alergias agrupadas bajo `Comodidades`.

### DEC-013 — Datos simulados explícitos y removibles

Estado: `VIGENTE` / `IMPLEMENTADO PARCIAL`

Decisión: precios, horarios y comodidades de maqueta deben centralizarse, marcarse como referenciales y poder desactivarse o reemplazarse antes de producción.

Pendiente: la ficha ya marca el precio como `Precio referencial de maqueta`; la fila todavía no lo identifica con el mismo nivel de claridad que horarios y comodidades.

### DEC-014 — Assets locales y trazables

Estado: `VIGENTE` / `IMPLEMENTADO`

Decisión: servir imágenes localmente, registrar fuente/licencia, dimensiones y fecha de consulta, y distinguir fotografía directa de referencia territorial. Para el header a ancho completo se descartan thumbnails y assets insuficientes; se optimiza para web sin upscaling ni pérdida visible de nitidez.

### DEC-015 — Documentación canónica en el repositorio

Estado: `VIGENTE` / `PROPUESTA PARA VERSIONAR`

Decisión: mantener el conocimiento compartido en `docs/`; cargar esos mismos archivos al ChatGPT Project. Reservar `AGENTS.md` para reglas operativas breves.

Motivo: evitar dos fuentes de verdad independientes.

### DEC-016 — Un solo `AGENTS.md` raíz

Estado: `VIGENTE` / `PROPUESTA PARA VERSIONAR`

Decisión: no crear instrucciones anidadas por ahora. El repositorio es plano y pequeño; las reglas de assets y scripts no requieren una cadena adicional.

Revisar solo si una subcarpeta adquiere un flujo, equipo o reglas realmente diferentes.

### DEC-017 — Navbar translúcido y CTA invitacional

Estado: `VIGENTE` / `IMPLEMENTADO`

Decisión: mantener el navbar sticky como una superficie de `--paper` parcialmente transparente con desenfoque ligero únicamente mientras se superpone al header editorial. Una vez que supera completamente `about-lead`, el navbar y el buscador pasan a `var(--paper)` opaco y sin desenfoque; al volver al header se restaura la superficie translúcida. El cambio se activa mediante observación del límite del header, no mediante polling continuo.

CTA: el texto principal es `Sé parte de la guía`, con mayor jerarquía que los iconos sociales y estados hover, focus-visible y active. El destino continúa provisional hasta resolver COMMS-001.

Reemplaza: navbar completamente opaco y texto `Agrega tu cocinería`.

### DEC-018 — Autocomplete del buscador limitado a nombres

Estado: `VIGENTE` / `IMPLEMENTADO`

Decisión: mantener la búsqueda limitada al nombre principal o alternativo de la cocinería y mostrar hasta siete sugerencias progresivas. El matching ignora mayúsculas y tildes, prioriza nombres que comienzan con la consulta y luego los que la contienen.

Accesibilidad: usar patrón combobox/listbox con `aria-expanded`, opción activa y navegación por ArrowDown, ArrowUp, Enter y Escape. Seleccionar una sugerencia aplica el registro exacto, cierra el panel y desplaza al inicio de resultados; la escritura libre conserva el filtrado parcial existente.

### DEC-019 — Ficha editorial sobre el `dialog` existente

Estado: `VIGENTE` / `IMPLEMENTADO CON DATOS PARCIALES`

Decisión: evolucionar el modal nativo actual, sin crear páginas ni perder cierre, Escape, foco devuelto o navegación sobre el conjunto filtrado. El hero conserva el orden insignia editorial, cuando corresponde; localidad y región; nombre. Su título usa una escala contenida de `clamp(2.35rem, 4.8vw, 4.35rem)`, con ajustes en mobile, para conservar jerarquía sin dominar nombres largos. Debajo se organizan una introducción editorial con descripción, platos y Tipo de comida; una retícula práctica con Ubicación, Horario, Comodidades y un grupo común de Capacidad, Eventos y Catering; Menú solo si hay un dato respaldado; Reseñas externas; Información y contacto; Sobre los datos; y navegación.

Trazabilidad: una imagen cuyo `imageKind` no sea `direct` se identifica visiblemente como referencia territorial. La presentación prioriza `description` y solo admite un fallback factual desde ubicación y cocina; los platos proceden exclusivamente de `specialties`. Los prototipos conservan marcas referenciales. La insignia Top N se deriva de los atributos de los slides vigentes del carrusel, no de una segunda lista manual.

Mapas: solo se genera preview OpenStreetMap, diferido y atribuido, cuando el registro contiene coordenadas válidas. Sin coordenadas se muestra una indisponibilidad explícita; si existe un enlace cartográfico almacenado se conserva como salida externa.

Reseñas: no copiar, inventar ni scrapear Google Maps. Hasta disponer de Google Maps Platform u otra fuente autorizada con sus atribuciones, la sección se mantiene como pendiente visible y sin contenido de usuarios.

Datos faltantes y privacidad: una descripción ausente solo puede sustituirse por una frase factual derivada de campos existentes o `No informado`. No se infieren platos, menús, capacidad ni servicios. Capacidad, Eventos y Catering distinguen `Sí`, `No` y `No confirmado / sin datos`; mientras no existan campos propios, solo las menciones inequívocas de `services` pueden producir `Sí` y una marca de incertidumbre conserva el estado no confirmado. El campo `owner` no se publica sin procedencia específica, pertinencia para el directorio y una razón pública documentada; los datos actuales no satisfacen ese criterio de forma estructurada.

### DEC-020 — Top 3 general y destacados por atributo

Estado: `VIGENTE` / `IMPLEMENTADO`

Decisión: conservar el header en cuatro slides —introducción y Top 1/2/3— y presentar inmediatamente después una sección editorial secundaria con exactamente tres establecimientos destacados por una cualidad concreta. Esta segunda selección no extiende el ranking, no usa puestos Top 4–6 y no representa premios ni certificaciones.

Selección vigente: Na Que Ver Cocinería Chilena (`Cocina chilena de mercado`), Restaurant Tradiciones Cocinería Morelia (`Productos de huerta`) y Cocinería Puelpún (`Trayectoria histórica`). No se superponen con el Top 3 y amplían la diversidad territorial. Cada entrada debe registrar hecho, inferencia editorial, fuente y fecha de consulta; sus CTA reutilizan el directorio y su ficha muestra una insignia textual distinta de las insignias numéricas.

Indicador: las tres Destacadas muestran un sol lineal pequeño junto al nombre en el directorio y en sus slides experimentales del header. El indicador se deriva de la misma fuente DOM `data-editorial-highlight`, no crea una lista paralela ni se aplica al Top 3; el SVG es decorativo donde el texto ya comunica `Destacada`, y el nombre accesible de la fila anuncia `destacada de la guía`.

Motivo de ubicación: añadir tres slides habría diluido el ritmo y la jerarquía del carrusel principal. La retícula secundaria mantiene relación inmediata con el header sin reconstruirlo ni convertir la página en un sistema genérico de cards.

### DEC-021 — Normalización no destructiva de nombres presentados

Estado: `VIGENTE` / `IMPLEMENTADO`

Decisión: conservar `name` y `alternateName` canónicos para identidad, búsqueda, IDs, referencias y pipeline, y derivar en runtime `displayName` y `displayAlternateName`. La transformación elimina únicamente tokens completos equivalentes a `Restaurante` o `Restaurant`, sin distinguir mayúsculas y limpiando espacios y conjunciones residuales. Se aplica a slides, autocomplete, listado, ficha, navegación y nombres accesibles; no modifica descripciones, categorías, fuentes ni `data.js`.

## Decisiones reemplazadas

| Decisión histórica | Estado | Reemplazada por |
|---|---|---|
| Mostrar `16 regiones en todo Chile` como una frase | `REEMPLAZADO` | `16 regiones` y `A lo largo y ancho de Chile` como resultados separados |
| Ordenar regiones alfabéticamente | `REEMPLAZADO` | DEC-005 |
| Presentar Rapa Nui como región numerada o 17.ª región | `REEMPLAZADO` | DEC-005, territorio especial asociado a Valparaíso |
| Excluir Rapa Nui/Isla de Pascua del filtro | `REEMPLAZADO` | DEC-005, reincorporación territorial confirmada el 24 de agosto de 2026 |
| Listado largo o carga “de 10 en 10” | `REEMPLAZADO` | DEC-006, paginación |
| Carrusel norte/centro/sur | `REEMPLAZADO` | DEC-009, Top 3 editorial |
| Todos los bloques editoriales del carrusel con fondo terracota | `REEMPLAZADO` | DEC-009, alternancia terracota/paper |
| Exigir iconos Flaticon en la interfaz | `REEMPLAZADO` | SVG propios permitidos y actualmente implementados |
| `Acerca de esta guía` como sección informativa convencional | `REEMPLAZADO` | Header editorial con fotografía de fondo y contenido superpuesto |
| Nombre de la cocinería centrado y metadata de la fotografía alineada a la derecha | `REEMPLAZADO` | DEC-007, copia de la fotografía con eje izquierdo |
| Tipo de comida, Comodidades y Precio centrados | `REEMPLAZADO` | DEC-007, anchos no idénticos y eje común por columna |
| Tipo de comida, Comodidades y Precio alineados al borde derecho | `REEMPLAZADO` | DEC-007, alineación izquierda vigente desde el 04.09.2026 |
| Vegano, Vegetariano, Celíaco y alergias dentro de Comodidades | `REEMPLAZADO` | DEC-012, taxonomía separada y alergias eliminadas |
| Línea inferior de `results-area` | `REEMPLAZADO` | Sin línea inferior |
| Fondo `--paper` en el footer | `REEMPLAZADO` | DEC-010, fondo `--terracotta` sin línea superior |
| Línea superior visible del footer | `REEMPLAZADO` | Sin línea superior |
| Navbar completamente opaco durante todo el recorrido y CTA `Agrega tu cocinería` | `REEMPLAZADO` | DEC-017, superficie contextual |

## Cómo registrar una nueva decisión

1. Añadir un ID secuencial.
2. Indicar estado y si está implementada.
3. Describir la decisión observable y el motivo.
4. Enlazar el pendiente o fuente relevante.
5. Si reemplaza otra, mover la anterior a la tabla histórica o marcarla explícitamente.
6. Actualizar la especificación afectada y `CURRENT_STATE.md` solo después de implementar.
