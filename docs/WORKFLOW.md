# Workflow ChatGPT → Codex → repositorio

## Ciclo recomendado

1. **Revisar estado.** Consultar `CURRENT_STATE.md`, decisiones y backlog; inspeccionar el código afectado.
2. **Definir el cambio.** Separar objetivo, alcance, restricciones, criterio observable y datos requeridos.
3. **Preparar la instrucción.** Indicar a Codex qué leer, qué modificar, qué preservar y cómo verificar.
4. **Inspeccionar antes de editar.** Codex revisa `git status`, archivos relevantes, patrones existentes y posibles contradicciones.
5. **Implementar incrementalmente.** Cambiar solo lo necesario, reutilizar tokens y evitar reconstrucciones.
6. **Validar.** Ejecutar comprobaciones técnicas y revisión manual aplicable; corregir regresiones causadas por la ronda.
7. **Revisar resultado.** Comparar con criterios de aceptación y comprobar que no se alteró lo no solicitado.
8. **Actualizar conocimiento.** Solo si cambió una decisión, estado, fuente o pendiente relevante.
9. **Cerrar y sincronizar.** Hacer commit cuando corresponda y sustituir en el ChatGPT Project solo los documentos modificados.

## Clasificar el trabajo

| Tipo | Ejemplo | Documentación habitual |
|---|---|---|
| Cambio visual | Ajustar espaciado sin cambiar criterio | Ninguna, salvo `CHANGELOG.md` si es relevante |
| Cambio funcional | Nueva lógica de filtro | `CURRENT_STATE.md`, `CHANGELOG.md`; decisión si altera comportamiento aprobado |
| Corrección | Reparar flecha o overflow según decisión existente | `CURRENT_STATE.md`, `BACKLOG.md`, `CHANGELOG.md` |
| Nueva decisión | Cambiar fondo del footer | `DECISIONS.md`, `PRODUCT_UX_SPEC.md`, backlog y luego estado |
| Decisión reemplazada | Sustituir paginación por otro patrón | Marcar reemplazo en `DECISIONS.md` y actualizar especificación |
| Nueva fuente | Verificar horario o imagen | `SOURCES.md`, dato/manifest y atribución aplicable |
| Implementar una decisión existente | Aplicar la flecha hacia abajo | Estado, backlog y changelog; no crear otra decisión |
| Deuda o idea | Posible validación automatizada | `BACKLOG.md` como hipótesis; no `AGENTS.md` |

## Instrucción base para una nueva sesión de Codex

```md
Este proyecto viene de una sesión anterior. Antes de modificar:

1. Lee `AGENTS.md` y los documentos canónicos aplicables de `docs/`.
2. Inspecciona `git status` y el código actual; úsalo como evidencia de lo implementado.
3. Conserva todo lo existente que no contradiga explícitamente esta tarea.
4. No reconstruyas la landing, no migres el stack y no agregues dependencias sin autorización.

Objetivo:
[resultado buscado]

Cambios solicitados:
1. [cambio observable]

Restricciones:
- [qué preservar]
- [datos o fuentes permitidos]

Criterios de aceptación:
- [resultado comprobable]

Validación:
- Ejecuta las comprobaciones reales indicadas en `docs/TECHNICAL_ARCHITECTURE.md`.
- Revisa consola, responsive, teclado y regresiones relevantes.

Entrega final:
- resume archivos cambiados;
- indica comprobaciones ejecutadas y resultados;
- lista pendientes o limitaciones reales;
- actualiza documentación solo si cambió una decisión, estado, fuente o pendiente.
```

Para continuar dentro de la misma sesión, sustituir el primer párrafo por: “Continúa sobre la implementación existente y conserva las decisiones ya aplicadas salvo contradicción explícita de esta ronda”.

## Cuándo cambiar de sesión de Codex

Conviene cerrar la ronda, revisar, corregir regresiones y hacer commit antes de abrir otra sesión cuando:

- Codex empieza a revertir decisiones;
- mezcla instrucciones viejas y nuevas;
- duplica CSS o componentes;
- pierde coherencia con el repositorio;
- necesita recordatorios reiterados;
- termina una etapa importante.

En la nueva sesión, entregar solo el nuevo objetivo y pedir inspección del repositorio. No reconstruir todo el historial en el prompt.

## Mantenimiento documental

### Nueva decisión

Actualizar `DECISIONS.md`; reflejarla en la especificación correspondiente y crear o ajustar un backlog si aún no se implementa.

### Decisión reemplazada

Marcarla como `REEMPLAZADO`, indicar qué la sustituye y eliminarla de las secciones vigentes. No borrar el antecedente si explica un conflicto importante.

### Estado actual

Actualizar `CURRENT_STATE.md` después de comprobar el código y registrar commit/fecha. No anticipar implementaciones.

### Pendientes

Mantener `BACKLOG.md`; cerrar un ítem solo cuando sus criterios sean observables.

### Fuentes

Actualizar `SOURCES.md` para fuentes generales y los manifests/atribuciones para datos o assets concretos. Registrar fecha de consulta.

### Changelog

Registrar comportamiento implementado relevante, no ideas, solicitudes ni promesas.

### AGENTS.md

Actualizar únicamente por:

- regla estable que debe aplicarse siempre;
- ruta recurrente que Codex no encuentra;
- error repetido que la instrucción puede prevenir;
- comando real de validación incorporado al repositorio.

No actualizar por un color puntual, una tarea aislada, un backlog o el resultado de cada ronda.

## Evitar contradicciones

- Una sola fuente principal por concepto.
- No copiar secciones completas entre `AGENTS.md`, Project Instructions y docs.
- Revisar enlaces relativos al renombrar archivos.
- Registrar diferencias código ↔ intención en `CURRENT_STATE.md` y `DECISIONS.md`.
- Tras cada commit documental, sustituir solo las fuentes modificadas en el ChatGPT Project.
- Revisar trimestralmente o al cerrar una etapa qué entradas quedaron obsoletas; marcarlas, no mezclarlas con especificación activa.

