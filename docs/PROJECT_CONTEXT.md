# Contexto del proyecto

Última consolidación: 21 de agosto de 2026

## Qué es Cocinerías de Chile

Cocinerías de Chile es una guía/directorio web para descubrir establecimientos vinculados con cocina chilena local, casera y territorial. Busca reunir cocinerías de distintas regiones y presentar información útil para comparar alternativas antes de visitarlas.

No debe sentirse como un agregador comercial masivo ni como una landing turística genérica. La propuesta combina exploración práctica con una identidad editorial ligada a cocinerías, mercados, caletas, cocina tradicional y territorio.

## Problema y propuesta de valor

La información sobre cocinerías suele estar dispersa, incompleta o mezclada con restaurantes que no necesariamente corresponden a la categoría. El proyecto pretende:

- reunir establecimientos con evidencia trazable;
- permitir búsqueda y filtros comprensibles;
- mostrar información práctica y su grado de certeza;
- facilitar descubrimiento regional;
- distinguir datos verificados de prototipos o inferencias;
- ofrecer una base escalable para futuras fichas y mecanismos de incorporación.

## Audiencia

Audiencia principal:

- personas que buscan cocina chilena auténtica;
- turistas nacionales y extranjeros interesados en gastronomía local;
- personas que recorren regiones, mercados o caletas;
- usuarios interesados en preparaciones tradicionales y experiencias vinculadas al territorio.

Audiencia secundaria:

- propietarios o administradores que quieran solicitar aparecer en la guía.

## Alcance actual

El producto actual es una aplicación estática de una sola página con:

- buscador por nombre;
- filtros por región, tipo de comida, rango de precio y comodidades;
- listado paginado;
- previews de establecimientos;
- modal navegable con información ampliada;
- carrusel editorial de cuatro slides;
- footer de información y contacto;
- adaptación responsive.

El detalle comprobado vive en [CURRENT_STATE.md](CURRENT_STATE.md) y la intención vigente en [PRODUCT_UX_SPEC.md](PRODUCT_UX_SPEC.md).

## Fuera de alcance de esta consolidación

- rediseñar o reimplementar la landing;
- migrar a un framework;
- crear backend, CMS o autenticación;
- alterar datos o assets de producción;
- decidir un flujo definitivo para el CTA de incorporación;
- presentar la maqueta como un directorio listo para producción.

## Definición operativa de “cocinería”

Un establecimiento puede incorporarse cuando:

- se autodenomina cocinería;
- una fuente confiable lo reconoce como tal;
- pertenece a un mercado, caleta u otro contexto donde la denominación tenga uso verificable;
- encaja razonablemente en la categoría y la inferencia se declara como tal.

No toda oferta de comida chilena es automáticamente una cocinería. La incertidumbre debe registrarse mediante estado, confianza, notas y fuentes.

## Estados de conocimiento

Usa estas categorías cuando mejoren la trazabilidad:

- `HECHO`: respaldado por evidencia.
- `DECISIÓN`: elección vigente aprobada.
- `PREFERENCIA`: criterio de la usuaria que guía propuestas.
- `HIPÓTESIS`: idea por comprobar.
- `PENDIENTE`: trabajo aún no resuelto.
- `REEMPLAZADO`: decisión histórica que ya no rige.
- `NO CONFIRMADO`: dato sin evidencia suficiente.
- `IMPLEMENTADO`: visible en el código auditado.
- `APROBADO PERO NO IMPLEMENTADO`: intención vigente no demostrada en el código.
- `POR VALIDAR`: contradicción o punto que requiere decisión explícita.

## Jerarquía de fuentes de verdad

1. Instrucción directa y más reciente de la usuaria.
2. Repositorio actual, para afirmaciones sobre implementación.
3. [DECISIONS.md](DECISIONS.md) y [PRODUCT_UX_SPEC.md](PRODUCT_UX_SPEC.md), para intención vigente.
4. [CURRENT_STATE.md](CURRENT_STATE.md), [BACKLOG.md](BACKLOG.md) y documentación técnica.
5. Hand-off del 21 de agosto de 2026.
6. Prompts históricos y archivos de iteraciones anteriores.

Una discrepancia entre intención e implementación no se resuelve en silencio. Se registra y solo se implementa dentro de una tarea autorizada.

## Principios permanentes

- Continuar sobre el código existente.
- Preservar lo que funciona y evitar regresiones.
- Mantener documentación compacta y con una fuente principal por concepto.
- No inventar datos de establecimientos reales.
- Separar claramente datos verificados, inferidos y simulados.
- Priorizar simplicidad, accesibilidad, responsive y facilidad de mantenimiento.
- Verificar en la web todo dato actual o claim externo antes de publicarlo.

