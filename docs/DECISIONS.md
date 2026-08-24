# Registro de decisiones

Última consolidación: 21 de agosto de 2026.

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

### DEC-004 — Filtros desplegables y selección controlada

Estado: `VIGENTE` / `IMPLEMENTADO`

Decisión: permitir un solo desplegable abierto; conservar selecciones al cambiar de grupo; usar toggle para opciones; cerrar desplegables al resetear.

### DEC-005 — Regiones en orden geográfico con números romanos

Estado: `VIGENTE` / `IMPLEMENTADO`

Decisión: ordenar norte-sur, mostrar números romanos tradicionales y mantener `Todo Chile` separado. No agregar Rapa Nui como región independiente.

Reemplaza: orden alfabético y la incorporación exploratoria de Rapa Nui.

### DEC-006 — Paginación de 10 registros

Estado: `VIGENTE` / `IMPLEMENTADO`

Decisión: mostrar 10 cocinerías por página con Anterior, Siguiente y páginas numeradas.

Reemplaza: listado largo o carga progresiva mediante “ver más”.

### DEC-007 — Jerarquía y comportamiento de filas

Estado: `VIGENTE` / `IMPLEMENTADO PARCIAL`

Decisión: reducir el ancho de precio, ampliar tipo de comida, mantener precio en regular, usar una línea terracota gruesa a la izquierda de la fotografía en hover/foco y separar metadata con líneas verticales.

Pendiente relacionado: orientación de la flecha de `Ver ficha`; ver DEC-011.

### DEC-008 — Iconografía coherente con detalles preservados

Estado: `VIGENTE` / `IMPLEMENTADO`

Decisión: reutilizar SVG entre filtros y filas. Los fills de hover no deben borrar outlines ni detalles; la bandera conserva divisiones y estrella, con relleno solo en la zona inferior.

### DEC-009 — Carrusel editorial de cuatro slides

Estado: `VIGENTE` / `IMPLEMENTADO`

Decisión: mantener el slide introductorio y usar los otros tres para una selección Top 1, Top 2 y Top 3. Restaurante Pily ocupa Top 1. Carrusel automático, indicadores centrados, sin botones laterales y respetando reduced motion.

Reemplaza: carrusel editorial por zonas norte, centro y sur.

Observación: Top 2 y Top 3 actuales son Mata Rangi y Cocinería Bellavista; las fuentes están enlazadas en `index.html`. Falta metodología editorial formal.

### DEC-010 — Fondo del footer

Estado: `POR VALIDAR` / discrepancia material

Última intención explícita del hand-off: fondo terracota, reemplazando `--paper`.

Estado del código: el commit `045dd1f` cambió deliberadamente el footer desde terracota a `--paper`.

Regla operativa: no presentar ambas opciones como vigentes ni cambiar el código automáticamente. Solicitar o recibir una decisión explícita en la próxima tarea que afecte el footer. Si la usuaria confirma terracota, registrar la confirmación aquí e implementar después; si confirma `--paper`, marcar la instrucción del hand-off como reemplazada.

### DEC-011 — Acción “Ver ficha” con flecha inferior

Estado: `VIGENTE` / `APROBADO PERO NO IMPLEMENTADO`

Decisión: texto y flecha centrados verticalmente, con flecha orientada hacia abajo y área clickeable completa.

Discrepancia: el código apila texto y símbolo, pero usa `→`.

### DEC-012 — Comodidades como filtro provisional

Estado: `VIGENTE PROVISIONAL` / `IMPLEMENTADO COMO DEMO`

Decisión: agrupar infraestructura, accesibilidad y opciones alimentarias bajo `Comodidades` mientras se valida el nombre definitivo.

Restricción: ninguna asignación demo puede presentarse como dato real.

### DEC-013 — Datos simulados explícitos y removibles

Estado: `VIGENTE` / `IMPLEMENTADO PARCIAL`

Decisión: precios, horarios y comodidades de maqueta deben centralizarse, marcarse como referenciales y poder desactivarse o reemplazarse antes de producción.

Pendiente: la marca de precio simulado no es visible en la fila/modal con el mismo nivel de claridad que horarios y comodidades.

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

## Decisiones reemplazadas

| Decisión histórica | Estado | Reemplazada por |
|---|---|---|
| Mostrar `16 regiones en todo Chile` como una frase | `REEMPLAZADO` | `16 regiones` y `A lo largo y ancho de Chile` como resultados separados |
| Ordenar regiones alfabéticamente | `REEMPLAZADO` | DEC-005 |
| Agregar Rapa Nui como región/filtro | `REEMPLAZADO` | DEC-005 |
| Listado largo o carga “de 10 en 10” | `REEMPLAZADO` | DEC-006, paginación |
| Carrusel norte/centro/sur | `REEMPLAZADO` | DEC-009, Top 3 editorial |
| Exigir iconos Flaticon en la interfaz | `REEMPLAZADO` | SVG propios permitidos y actualmente implementados |
| `Acerca de esta guía` como sección informativa convencional | `REEMPLAZADO` | Header editorial con fotografía de fondo y contenido superpuesto |
| Línea inferior de `results-area` | `REEMPLAZADO` | Sin línea inferior |
| Línea superior visible del footer | `REEMPLAZADO` | Sin línea superior |

## Cómo registrar una nueva decisión

1. Añadir un ID secuencial.
2. Indicar estado y si está implementada.
3. Describir la decisión observable y el motivo.
4. Enlazar el pendiente o fuente relevante.
5. Si reemplaza otra, mover la anterior a la tabla histórica o marcarla explícitamente.
6. Actualizar la especificación afectada y `CURRENT_STATE.md` solo después de implementar.

