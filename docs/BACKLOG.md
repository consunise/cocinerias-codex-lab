# Backlog consolidado

Última revisión: 21 de agosto de 2026.

Este backlog registra pendientes, no autoriza su implementación. Las prioridades reflejan riesgo para continuidad o publicación.

## P0 — Antes de considerar producción

### DATA-001 — Recuperar la fuente canónica del dataset

Estado: `PENDIENTE`

Problema: `directorio_cocinerias_chile.md` está ignorado y ausente del repositorio público, pero `normalize-data.mjs` lo necesita y `data.js` declara provenir de él.

Criterio de cierre:

- definir una ubicación segura y accesible para el archivo canónico;
- documentar cómo materializarlo antes de regenerar;
- ejecutar el normalizador con 101 registros;
- revisar y versionar el diff de `data.js` sin publicar información privada indebida.

### DATA-002 — Retirar o reemplazar prototipos de precio, horario y comodidades

Estado: `PENDIENTE`

Problema: todos los precios de visualización y todas las comodidades son simulados; 74 horarios se inventan para la maqueta.

Criterio de cierre:

- disponer de datos verificados o desactivar cada prototipo;
- conservar marca de procedencia por campo;
- evitar que el usuario confunda una estimación con un hecho;
- actualizar fecha de verificación.

### DATA-003 — Auditar vigencia de los 101 establecimientos

Estado: `PENDIENTE`

Problema: 57 registros no figuran simplemente como `Activa` y todos tienen fecha de verificación 12 de agosto de 2026.

Criterio de cierre: verificar estado, fuentes principales, información práctica y confianza con metodología documentada.

### ASSET-001 — Reducir uso de fotografías territoriales como sustituto

Estado: `PENDIENTE`

Problema: 100 de 101 imágenes no corresponden directamente al establecimiento.

Criterio de cierre: reemplazar gradualmente con imágenes directas autorizadas o adoptar un tratamiento visual que impida interpretar el respaldo territorial como foto del local.

## P1 — Próxima consolidación de producto

### UX-002 — Corregir la flecha de “Ver ficha”

Estado: `APROBADO PERO NO IMPLEMENTADO`

Criterio de cierre: flecha hacia abajo, centrada bajo el texto, con hover/foco y área clickeable preservados.

### CONTENT-001 — Formalizar criterios del Top 3

Estado: `PENDIENTE`

Criterio de cierre:

- definir que es selección editorial y no ranking objetivo;
- registrar criterios y fecha;
- verificar Restaurante Pily, Mata Rangi y Cocinería Bellavista;
- respaldar platos, descripciones y labels sin claims absolutos.

### COMMS-001 — Definir enlaces sociales y CTA

Estado: `PENDIENTE`

Criterio de cierre: URLs reales de WhatsApp/Instagram y flujo autorizado para `Agrega tu cocinería`, con estados de error/éxito si corresponde.

### QA-001 — Ronda visual y accesible del baseline

Estado: `PENDIENTE`

Criterio de cierre: revisar desktop, 980, 720, 420 y 320 px; teclado, foco, contraste, modal, filtros, paginación, carrusel, consola, overflow y reduced motion.

### DOC-001 — Incorporar esta configuración al repositorio y al Project

Estado: `PENDIENTE DE INSTALACIÓN`

Criterio de cierre: versionar `AGENTS.md` y `docs/`; copiar Project Instructions; cargar las nueve fuentes canónicas al Project.

## P2 — Higiene y evolución

### REPO-001 — Resolver documentación histórica duplicada

Estado: `PENDIENTE`

Los dos prompts de la raíz son idénticos y `cambios/` contiene notas antiguas. Evaluar archivado, renombrado o eliminación en una tarea separada; no hacerlo como efecto lateral.

### ASSET-002 — Auditar assets sociales y atribución Flaticon

Estado: `POR VALIDAR`

Los PNG de Flaticon no se usan en la interfaz actual y su archivo afirma que existe atribución visible en el footer. Decidir si se retiran o vuelven a utilizar; cumplir la licencia aplicable.

### ASSET-003 — Decidir destino de imágenes `zona-*`

Estado: `PENDIENTE`

Los tres archivos siguen versionados y atribuidos, pero no forman parte del carrusel activo.

### TECH-001 — Evaluar validación automatizada mínima

Estado: `HIPÓTESIS`

Posible alcance futuro: validación HTML, lint básico o pruebas de interacciones críticas. No instalar herramientas sin decisión previa.

### TECH-002 — Documentar hosting

Estado: `NO CONFIRMADO`

Criterio de cierre: registrar plataforma, rama de despliegue, dominio, proceso de publicación y rollback cuando existan.

## Plantilla

```md
### ID — Título

Estado: PENDIENTE | EN CURSO | BLOQUEADO | RESUELTO | POR VALIDAR

Problema:

Dependencias:

Criterio de cierre:
```
