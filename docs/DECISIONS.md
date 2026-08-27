# Registro de decisiones

Última consolidación: 26 de agosto de 2026.

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

Decisión: reducir el ancho de precio, ampliar tipo de comida, mantener precio en regular, usar una línea terracota gruesa a la izquierda de la fotografía en hover/foco y separar metadata con líneas verticales. En `restaurant-main`, mostrar ubicación arriba, nombre debajo y horario después, sin repetir ubicación. Todo el contenido textual e informativo de la fila —incluidos título, metadata, tipo de comida, precio y comodidades— comparte un eje izquierdo dentro de su área y conserva el flujo natural desde arriba.

Reemplaza: nombre centrado e información secundaria alineada a la derecha.

Pendiente relacionado: orientación de la flecha de `Ver ficha`; ver DEC-011.

### DEC-008 — Iconografía coherente con detalles preservados

Estado: `VIGENTE` / `IMPLEMENTADO`

Decisión: reutilizar SVG entre filtros y filas. Los fills de hover no deben borrar outlines ni detalles; la bandera conserva divisiones y estrella, con relleno solo en la zona inferior.

### DEC-009 — Carrusel editorial de cuatro slides

Estado: `VIGENTE` / `IMPLEMENTADO`

Decisión: ubicar el carrusel como header editorial inmediatamente después del navbar y antes del directorio. Mantener el slide introductorio y usar los otros tres para una selección Top 1, Top 2 y Top 3. Restaurante Pily ocupa Top 1. Carrusel automático, indicadores centrados, sin botones laterales y respetando reduced motion.

Tratamiento: alternar el fondo de la caja editorial `--terracotta`, `--paper`, `--terracotta`, `--paper` en los cuatro slides y adaptar en cada slide el contraste de todo su contenido. Los indicadores usan un círculo visible de 16 × 16 px dentro de un target transparente de 44 × 44 px; el activo combina relleno y anillo, y el wrapper no tiene fondo, borde, sombra ni apariencia de píldora.

Reemplaza: carrusel editorial por zonas norte, centro y sur, y su ubicación posterior al directorio.

Observación: Top 2 y Top 3 actuales son Mata Rangi y Cocinería Bellavista; las fuentes están enlazadas en `index.html`. Falta metodología editorial formal.

### DEC-010 — Fondo del footer

Estado: `VIGENTE` / `IMPLEMENTADO`

Decisión: usar `--terracotta` como fondo del footer, sin línea divisoria superior, conservando su estructura y comportamiento responsive.

Contraste: texto y enlaces claros sobre terracota; iconos sociales de WhatsApp e Instagram en `--paper`, sin fondo ni borde propios; hover en `--paper-deep` y foco visible en `--white`. Esta regla de iconos solo aplica al footer.

Confirmación: decisión aprobada explícitamente el 24 de agosto de 2026. Reemplaza la implementación con fondo `--paper` del commit `045dd1f`.

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

Decisión: servir imágenes localmente, registrar fuente/licencia y distinguir fotografía directa de referencia territorial.

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

Decisión: mantener el navbar sticky como una superficie de `--paper` parcialmente transparente con desenfoque ligero, superpuesta al header editorial para que la fotografía se perciba sutilmente detrás. Debe conservar contraste al pasar sobre fotografías y sobre contenido claro u oscuro.

CTA: el texto principal es `Sé parte de la guía`, con mayor jerarquía que los iconos sociales y estados hover, focus-visible y active. El destino continúa provisional hasta resolver COMMS-001.

Reemplaza: navbar completamente opaco y texto `Agrega tu cocinería`.

### DEC-018 — Autocomplete del buscador limitado a nombres

Estado: `VIGENTE` / `IMPLEMENTADO`

Decisión: mantener la búsqueda limitada al nombre principal o alternativo de la cocinería y mostrar hasta siete sugerencias progresivas. El matching ignora mayúsculas y tildes, prioriza nombres que comienzan con la consulta y luego los que la contienen.

Accesibilidad: usar patrón combobox/listbox con `aria-expanded`, opción activa y navegación por ArrowDown, ArrowUp, Enter y Escape. Seleccionar una sugerencia aplica el registro exacto, cierra el panel y desplaza al inicio de resultados; la escritura libre conserva el filtrado parcial existente.

### DEC-019 — Ficha editorial sobre el `dialog` existente

Estado: `VIGENTE` / `IMPLEMENTADO CON DATOS PARCIALES`

Decisión: evolucionar el modal nativo actual, sin crear páginas ni perder cierre, Escape, foco devuelto o navegación sobre el conjunto filtrado. La ficha se organiza como hero fotográfico, presentación, platos, Tipo de comida, Comodidades, información práctica, ubicación, reseñas externas, trazabilidad y navegación.

Trazabilidad: una imagen cuyo `imageKind` no sea `direct` se identifica visiblemente como referencia territorial. Descripciones y platos proceden solo de `description` y `specialties`; los prototipos conservan marcas referenciales. La insignia Top N se deriva de los atributos de los slides vigentes del carrusel, no de una segunda lista manual.

Mapas: solo se genera preview OpenStreetMap, diferido y atribuido, cuando el registro contiene coordenadas válidas. Sin coordenadas se muestra una indisponibilidad explícita; si existe un enlace cartográfico almacenado se conserva como salida externa.

Reseñas: no copiar, inventar ni scrapear Google Maps. Hasta disponer de Google Maps Platform u otra fuente autorizada con sus atribuciones, la sección se mantiene como pendiente visible y sin contenido de usuarios.

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
| Nombre de la cocinería centrado e información secundaria a la derecha | `REEMPLAZADO` | DEC-007, eje izquierdo común |
| Vegano, Vegetariano, Celíaco y alergias dentro de Comodidades | `REEMPLAZADO` | DEC-012, taxonomía separada y alergias eliminadas |
| Línea inferior de `results-area` | `REEMPLAZADO` | Sin línea inferior |
| Línea superior visible del footer | `REEMPLAZADO` | Sin línea superior |
| Navbar completamente opaco y CTA `Agrega tu cocinería` | `REEMPLAZADO` | DEC-017 |

## Cómo registrar una nueva decisión

1. Añadir un ID secuencial.
2. Indicar estado y si está implementada.
3. Describir la decisión observable y el motivo.
4. Enlazar el pendiente o fuente relevante.
5. Si reemplaza otra, mover la anterior a la tabla histórica o marcarla explícitamente.
6. Actualizar la especificación afectada y `CURRENT_STATE.md` solo después de implementar.
