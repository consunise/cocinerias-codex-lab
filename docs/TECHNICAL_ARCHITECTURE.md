# Arquitectura técnica

Estado de referencia: rama `main`, commit `045dd1f`, auditado el 21 de agosto de 2026; actualización funcional consolidada el 27 de agosto de 2026.

## Stack comprobado

- HTML5 estático.
- CSS sin preprocesador.
- JavaScript vanilla en navegador.
- Scripts auxiliares Node.js ESM basados en módulos nativos y `fetch`.
- Sin framework, bundler, package manager, backend, base de datos ni CMS.

No se ha aprobado migrar de stack ni añadir dependencias.

## Árbol funcional actual

```text
/
├── index.html
├── styles.css
├── data.js
├── script.js
├── scripts/
│   ├── normalize-data.mjs
│   ├── curate-images.mjs
│   └── sync-images.mjs
├── assets/
│   ├── icons/social/
│   └── images/
│       ├── about/
│       └── cocinerias/
├── cambios/
├── one-shoot-prompt.md
└── # Convertidor universal de ideas y apuntes en prom.md
```

Los dos prompts de la raíz son idénticos por hash en el estado auditado. `cambios/` contiene solicitudes antiguas. Ninguno es una instrucción activa.

## Responsabilidades por archivo

| Archivo | Responsabilidad | Observaciones |
|---|---|---|
| `index.html` | Semántica, navbar, filtros, contenedores, carrusel, footer y shell del `dialog` | Los slides destacados exponen ID y rank como fuente del Top 3 en la ficha; carga CSS y JS con parámetros de caché |
| `styles.css` | Tokens, layout, estados visuales y media queries | Breakpoints comprobados: 980, 720 y 420 px |
| `data.js` | Asignación global `window.COCINERIAS` | Generado; no editar manualmente |
| `script.js` | Estado y render de UI | IIFE sin módulos ni dependencias |
| `normalize-data.mjs` | Markdown tabular → `data.js` | Exige exactamente 101 registros y el manifiesto de imágenes |
| `curate-images.mjs` | Busca, descarga, asigna y audita imágenes | Usa Wikimedia, escribe manifests/assets y elimina archivos antiguos concretos |
| `sync-images.mjs` | Flujo anterior por imagen regional | No corresponde al esquema final de 101 imágenes únicas; auditar antes de ejecutar |
| `assets/images/cocinerias/image-sources.json` | Procedencia y licencias de cada imagen | 101 entradas |
| `assets/images/cocinerias/image-audit.json` | Tamaños, hashes y resultado de auditoría | Generado el 14 de agosto de 2026 |
| Archivos `ATTRIBUTION.md` | Licencias y atribuciones | Deben acompañar cualquier cambio de assets |

## Flujo de ejecución en navegador

1. `index.html` carga `data.js` con `defer`.
2. `data.js` publica los registros en `window.COCINERIAS`.
3. `script.js` crea una vista enriquecida con nombres de presentación, precio, horario, preferencias alimentarias y comodidades de prototipo, estados prácticos conservadores para capacidad, eventos y catering, y un `searchText` normalizado por registro.
4. Se inicializan filtros, eventos, render del listado y carrusel.
5. Búsqueda, filtros y paginación operan enteramente en memoria. `applyFilters()` intersecta la consulta contra `searchText` con los cuatro grupos vigentes; una selección del autocomplete mantiene la vía exacta por ID.
6. Las filas y la ficha editorial del modal se construyen mediante templates HTML escapados con `escapeHTML`; las URLs pasan por `safeUrl`.
7. Al abrir una ficha, el modal deriva Top N desde los slides, reutiliza el mapa placeholder local identificado como demostración y reinicia su scroll interno. La lógica OpenStreetMap anterior no está activa.
8. Un `IntersectionObserver` observa `about-lead` y alterna `is-past-about` en el navbar cuando el borde inferior del header supera la altura sticky; el resize recalcula el límite y recrea el observer.

## Modelo de estado de interfaz

`script.js` mantiene:

- consulta de búsqueda, ID exacto seleccionado desde el autocomplete e índice de sugerencia activa;
- región seleccionada;
- conjuntos de tipos de comida, precios y comodidades;
- resultados visibles;
- página actual;
- modal activo y foco previo;
- estado del panel mobile;
- slide activo y temporizador de autoplay.

No existe persistencia en URL, almacenamiento local ni servidor.

## Ficha, mapas e integraciones externas

- El shell del `dialog`, el footer de navegación y los eventos de cierre permanecen estáticos en `index.html`; `script.js` sustituye únicamente el artículo de contenido al abrir o navegar.
- `buildModalContent()` organiza hero, introducción, `.modal-gastronomy-grid`, `.modal-practical-grid`, reseñas y contacto. La retícula central usa áreas `map / address / practical` para situar mapa a la izquierda y dirección/práctica a la derecha sin duplicar DOM; hasta 980 px sigue el orden DOM dirección → mapa → práctica. Sobre los datos queda dentro del bloque de contacto.
- `imageKind === "direct"` habilita presentación directa; cualquier otro valor activa la advertencia territorial. `imageLabel` se reutiliza como texto alternativo.
- La presentación actual conserva `DEMO_DESCRIPTION_PLACEHOLDER` con advertencia visible; `specialties` alimenta los platos sin inferencias. Los campos demo enriquecidos en runtime mantienen sus marcas.
- `introductionText()` y las descripciones fuente permanecen intactos, pero no se invocan en la variante demo visible. El dataset vigente contiene descripción en los 101 registros.
- El Top 3 no tiene una segunda lista en JavaScript: `editorialSelectionFor()` consulta `data-restaurant-id` y `data-editorial-rank` de los slides del carrusel.
- `verifiedCoordinates()` y `openStreetMapLinks()` conservan validación de coordenadas, embed diferido y atribución ODbL de la implementación anterior, actualmente inactiva. `mapPreviewPlaceholder()` renderiza el SVG local con aviso y `alt` explícitos, sin proveedor ni coordenadas reales.
- El dataset actual tiene 2 registros con coordenadas válidas, 3 enlaces cartográficos externos y 99 fichas sin preview posible.
- No existe campo estructurado de menú, carta o PDF en los 101 registros; la sección se omite en lugar de inferirla desde descripción, cocina o especialidades.
- `contactSectionContent()` renderiza teléfono, WhatsApp, email y URLs sanitizadas de Instagram, Facebook y web; `usefulInformationContent()` limita el bloque auxiliar a servicios, pagos, fundación y otras redes existentes. `derivePracticalServices()` prepara Capacidad, Eventos y Catering sin modificar `data.js`: prioriza futuros campos estructurados y, mientras no existan, solo reconoce menciones inequívocas en `services`. Ausencia produce `missing / Sin datos`; incertidumbre produce `unknown / No confirmado`; afirmación y negativa explícitas usan `yes / Sí` y `no / No`. Capacidad disponible usa `known` y conserva su valor. Una incertidumbre estructurada no se sustituye por una afirmación del texto libre. `owner` no se renderiza porque el esquema no codifica una decisión de pertinencia pública ni procedencia por campo.
- Para evitar duplicación visual, `usefulInformationContent()` omite solo cláusulas simples de Eventos, Catering o banquetería cuando el mismo servicio ya figura como `Sí` en los datos prácticos. No modifica `services` ni descarta las cláusulas calificadas o no confirmadas.
- No existe backend, API key, Place ID ni integración Google Maps Platform. La sección Reseñas en Google es un estado pendiente sin datos de usuarios; una futura integración no debe exponer claves en el repositorio estático.

## Datos

### Fuente y generación

`scripts/normalize-data.mjs` declara como entrada:

```text
directorio_cocinerias_chile.md
```

El archivo está en `.gitignore` y no forma parte del repositorio público. El normalizador no puede ejecutarse desde un clon limpio sin recuperar esa fuente privada. También requiere `assets/images/cocinerias/image-sources.json`.

El normalizador:

- lee 36 campos fuente;
- deriva `foodCategories` y `priceCategory`;
- vincula una imagen por ID;
- exige exactamente 101 filas;
- sobrescribe `data.js`.

### Esquema actual de un registro

Campos fuente principales:

```text
id, name, alternateName, classification, status, confidence,
region, province, commune, locality, address, venue,
latitude, longitude, phone, whatsapp, email, website,
instagram, facebook, otherNetworks, googleMaps, hours,
cuisine, specialties, description, services, priceRange,
paymentMethods, accessibility, founded, owner,
primarySource, additionalSources, verifiedAt, notes
```

Campos derivados en `data.js`:

```text
foodCategories, priceCategory, imagePath, imageKind, imageLabel
```

No existen campos fuente ni derivados para `capacity`, `events` o `catering`. La vista runtime añade `displayName`, `displayAlternateName`, `practicalServices` y `searchText`: los nombres canónicos permanecen disponibles e indexados junto a sus variantes presentadas; `practicalServices` sigue siendo una adaptación transitoria hasta ampliar la fuente y el normalizador. `displayNameHTML()` aplica el espacio no separable de las dos últimas palabras después de escapar HTML, únicamente al render.

Campos derivados solo en tiempo de ejecución:

```text
displayHours, hoursIsPlaceholder, hoursSource,
displayPriceCategory, priceIsSimulated,
displayFoodCategories, displayFoodPreferences,
foodPreferencesAreSimulated, foodPreferencesSource,
displayAmenities, amenitiesAreSimulated, amenitiesSource,
visitFeatures, practicalServices, displayName, displayAlternateName,
searchText
```

`searchText` normaliza case, diacríticos y espacios a partir de identidad, ubicación, `cuisine`, `specialties`, `description`, `services`, categorías culinarias, comodidades de presentación y precio fuente/presentado. No añade taxonomías ni valores: los precios y comodidades demo permanecen identificados como prototipo en sus campos de origen.

## Tokens y responsive

Los tokens comprobados se definen en `:root` de `styles.css`; entre ellos:

- colores `--paper`, `--paper-deep`, `--ink`, `--ink-soft`, `--line`, `--line-dark`, `--terracotta`, `--terracotta-dark`, `--sea`, `--white` y `--focus`;
- tipografías `--serif` y `--sans`;
- ancho `--max-width: 1440px`;
- columna de filtros `--filter-column: 245px`;
- líneas hover de 2 px y de restaurante de 4 px.

No agregues medidas o tokens a la documentación sin comprobarlos en el CSS.

## Comandos reales y validación

El repositorio no ofrece un comando oficial. Una previsualización local reproducible, verificada durante la auditoría, es:

```bash
python3 -m http.server 8000
```

Luego abre `http://localhost:8000/`.

Comprobaciones de sintaxis disponibles:

```bash
node --check data.js
node --check script.js
for file in scripts/*.mjs; do node --check "$file"; done
git diff --check
```

Para cambios de interfaz, valida manualmente:

- consola sin errores;
- búsqueda, limpieza y estado vacío;
- cada filtro, cierre de otros desplegables y scroll tras región;
- paginación y foco tras cambio de página;
- modal, cierre, foco devuelto y navegación;
- carrusel, indicadores, teclado, pausa y reduced motion;
- desktop, 980 px, 720 px, 420 px y ancho mínimo de 320 px;
- hover, focus, contraste, overflow y layout shift.

No existe test, lint o build que pueda declararse aprobado.

## Scripts con efectos materiales

### `normalize-data.mjs`

Solo ejecutar cuando exista la fuente canónica correcta y se pretenda regenerar `data.js`. Revisa el diff completo después.

### `curate-images.mjs`

Usa red, descarga archivos, reescribe `image-sources.json`, `image-audit.json` y `ATTRIBUTIONS.md`, copia imágenes y elimina nombres antiguos concretos. No ejecutarlo como verificación rutinaria.

### `sync-images.mjs`

Es evidencia de un flujo anterior basado en una imagen directa y respaldos regionales compartidos. El repositorio actual usa 101 imágenes únicas; no ejecutarlo hasta confirmar su propósito o retirarlo explícitamente.

## Despliegue

`NO CONFIRMADO`: no hay configuración de hosting, dominio, CI ni pipeline de despliegue versionado.
