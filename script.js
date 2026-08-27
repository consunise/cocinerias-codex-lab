(() => {
  "use strict";

  const sourceRestaurants = Array.isArray(window.COCINERIAS) ? window.COCINERIAS : [];

  // PROTOTIPO DE PRECIO: estos rangos son simulados y no provienen del Markdown.
  // Para retirarlos, desactiva `enabled` o reemplaza `assignBand` por datos reales.
  const PRICE_PROTOTYPE = Object.freeze({
    enabled: true,
    bands: ["Económico", "Moderado", "Alto"],
    assignBand: (_restaurant, index) => ["Económico", "Moderado", "Alto"][index % 3],
  });
  const PAGE_SIZE = 10;
  const CAROUSEL_AUTOPLAY_DELAY = 6000;
  const SEARCH_SUGGESTION_LIMIT = 7;
  const HOURS_PLACEHOLDER_VALUES = Object.freeze([
    "Lun–vie 12:00–16:30",
    "Mar–dom 12:30–18:00",
    "Lun–sáb 11:30–17:00",
    "Mié–dom 12:00–19:00",
    "Diario 12:00–18:00",
    "Sáb–dom 11:00–17:30",
  ]);

  // HORARIOS PLACEHOLDER PARA MAQUETA: no provienen de la fuente y deben
  // reemplazarse por horarios reales antes de publicar una versión de producción.
  const HOURS_PLACEHOLDER_PROTOTYPE = Object.freeze({
    enabled: true,
    source: "placeholder-visual-only",
    schedules: HOURS_PLACEHOLDER_VALUES,
    assignHours: (_restaurant, index) =>
      HOURS_PLACEHOLDER_VALUES[index % HOURS_PLACEHOLDER_VALUES.length],
  });

  // CARACTERÍSTICAS DE VISITA: estructura preparada para datos reales futuros.
  // Solo la accesibilidad se marca como informada cuando la fuente lo declara explícitamente.
  const VISIT_FEATURES = Object.freeze([
    { key: "parking", label: "Estacionamiento" },
    { key: "petFriendly", label: "Pet-friendly" },
    { key: "reducedMobility", label: "Acceso para movilidad reducida" },
  ]);

  // TAXONOMÍA DE DEMOSTRACIÓN: conserva las asignaciones referenciales de la
  // maqueta, separando preferencias alimentarias de comodidades físicas.
  const DEMO_TAXONOMY_PATTERNS = Object.freeze([
    Object.freeze(["parking", "accessibility"]),
    Object.freeze(["petFriendly", "vegetarian"]),
    Object.freeze(["vegan", "vegetarian"]),
    Object.freeze(["celiac"]),
    Object.freeze(["parking", "petFriendly"]),
    Object.freeze(["accessibility", "celiac"]),
    Object.freeze(["vegetarian"]),
  ]);

  const FOOD_PREFERENCE_DEMO_PROTOTYPE = Object.freeze({
    enabled: true,
    source: "placeholder-visual-only",
    options: Object.freeze([
      { key: "vegan", label: "Vegano" },
      { key: "vegetarian", label: "Vegetariano" },
      { key: "celiac", label: "Celíaco" },
    ]),
    assignPreferences(_restaurant, index) {
      const keys = DEMO_TAXONOMY_PATTERNS[index % DEMO_TAXONOMY_PATTERNS.length];
      return this.options.filter((option) => keys.includes(option.key));
    },
  });

  // COMODIDADES DE DEMOSTRACIÓN: ninguna de estas asignaciones proviene del
  // Markdown ni constituye información verificada del establecimiento.
  const AMENITY_DEMO_PROTOTYPE = Object.freeze({
    enabled: true,
    source: "placeholder-visual-only",
    options: Object.freeze([
      { key: "petFriendly", label: "Pet friendly" },
      { key: "parking", label: "Estacionamiento" },
      { key: "accessibility", label: "Accesibilidad" },
    ]),
    assignAmenities(_restaurant, index) {
      const keys = DEMO_TAXONOMY_PATTERNS[index % DEMO_TAXONOMY_PATTERNS.length];
      return this.options.filter((option) => keys.includes(option.key));
    },
  });

  const restaurants = sourceRestaurants.map((restaurant, index) => {
    const usesPlaceholderHours = HOURS_PLACEHOLDER_PROTOTYPE.enabled && !restaurant.hours;
    const displayAmenities = AMENITY_DEMO_PROTOTYPE.enabled
      ? AMENITY_DEMO_PROTOTYPE.assignAmenities(restaurant, index)
      : [];
    const displayFoodPreferences = FOOD_PREFERENCE_DEMO_PROTOTYPE.enabled
      ? FOOD_PREFERENCE_DEMO_PROTOTYPE.assignPreferences(restaurant, index)
      : [];
    const displayFoodCategories = [
      ...new Set([
        ...(restaurant.foodCategories ?? []),
        ...displayFoodPreferences.map(({ label }) => label),
      ]),
    ];
    return {
      ...restaurant,
      displayHours: usesPlaceholderHours
        ? HOURS_PLACEHOLDER_PROTOTYPE.assignHours(restaurant, index)
        : restaurant.hours,
      hoursIsPlaceholder: usesPlaceholderHours,
      hoursSource: usesPlaceholderHours
        ? HOURS_PLACEHOLDER_PROTOTYPE.source
        : restaurant.hours
          ? "directorio-source"
          : null,
      displayPriceCategory: PRICE_PROTOTYPE.enabled
        ? PRICE_PROTOTYPE.assignBand(restaurant, index)
        : restaurant.priceCategory,
      priceIsSimulated: PRICE_PROTOTYPE.enabled,
      displayFoodCategories,
      displayFoodPreferences,
      foodPreferencesAreSimulated: FOOD_PREFERENCE_DEMO_PROTOTYPE.enabled,
      foodPreferencesSource: FOOD_PREFERENCE_DEMO_PROTOTYPE.enabled
        ? FOOD_PREFERENCE_DEMO_PROTOTYPE.source
        : null,
      displayAmenities,
      amenitiesAreSimulated: AMENITY_DEMO_PROTOTYPE.enabled,
      amenitiesSource: AMENITY_DEMO_PROTOTYPE.enabled
        ? AMENITY_DEMO_PROTOTYPE.source
        : null,
      visitFeatures: deriveVisitFeatures(restaurant),
    };
  });

  // PLACEHOLDERS DE REDES: reemplazar por las URLs reales cuando estén disponibles.
  const SOCIAL_LINKS = {
    whatsapp: "", // Ejemplo futuro: https://wa.me/569XXXXXXXX
    instagram: "", // Ejemplo futuro: https://www.instagram.com/USUARIO
  };

  const elements = {
    directory: document.querySelector(".directory"),
    directoryHeading: document.querySelector(".directory-heading"),
    siteHeader: document.querySelector(".site-header"),
    aboutData: document.querySelector(".about-data"),
    resultsArea: document.querySelector(".results-area"),
    listHeader: document.querySelector(".list-header"),
    searchForm: document.querySelector("#search-form"),
    searchInput: document.querySelector("#search-input"),
    searchClear: document.querySelector("#search-clear"),
    searchSuggestions: document.querySelector("#search-suggestions"),
    regionFilters: document.querySelector("#region-filters"),
    regionFilterToggle: document.querySelector("#region-filter-toggle"),
    regionFilterCount: document.querySelector("#region-filter-count"),
    foodFilters: document.querySelector("#food-filters"),
    priceFilters: document.querySelector("#price-filters"),
    amenityFilters: document.querySelector("#amenity-filters"),
    foodFilterToggle: document.querySelector("#food-filter-toggle"),
    priceFilterToggle: document.querySelector("#price-filter-toggle"),
    amenityFilterToggle: document.querySelector("#amenity-filter-toggle"),
    foodFilterCount: document.querySelector("#food-filter-count"),
    priceFilterCount: document.querySelector("#price-filter-count"),
    amenityFilterCount: document.querySelector("#amenity-filter-count"),
    resetFilters: document.querySelector("#reset-filters"),
    resultsCount: document.querySelector("#results-count"),
    resultsToolbar: document.querySelector(".results-toolbar"),
    activeSummary: document.querySelector("#active-summary"),
    restaurantList: document.querySelector("#restaurant-list"),
    pagination: document.querySelector("#pagination"),
    paginationPages: document.querySelector("#pagination-pages"),
    paginationPrev: document.querySelector("#pagination-prev"),
    paginationNext: document.querySelector("#pagination-next"),
    paginationStatus: document.querySelector("#pagination-status"),
    emptyState: document.querySelector("#empty-state"),
    emptyReset: document.querySelector("#empty-reset"),
    filterToggle: document.querySelector("#filter-toggle"),
    filterToggleCount: document.querySelector("#filter-toggle-count"),
    filtersPanel: document.querySelector("#filters-panel"),
    filtersClose: document.querySelector("#filters-close"),
    filtersApply: document.querySelector("#filters-apply"),
    filtersBackdrop: document.querySelector("#filters-backdrop"),
    dialog: document.querySelector("#detail-dialog"),
    modalClose: document.querySelector("#modal-close"),
    modalContent: document.querySelector("#modal-content"),
    modalPosition: document.querySelector("#modal-position"),
    modalPrev: document.querySelector("#modal-prev"),
    modalNext: document.querySelector("#modal-next"),
    modalPrevName: document.querySelector("#modal-prev-name"),
    modalNextName: document.querySelector("#modal-next-name"),
    aboutCarousel: document.querySelector("#about-carousel"),
    aboutSlides: [...document.querySelectorAll(".about-slide")],
    aboutCarouselIndicators: document.querySelector("#about-carousel-indicators"),
    aboutCarouselStatus: document.querySelector("#about-carousel-status"),
  };

  const state = {
    query: "",
    selectedSearchId: null,
    searchActiveIndex: -1,
    region: "",
    foods: new Set(),
    prices: new Set(),
    amenities: new Set(),
    visibleRestaurants: [...restaurants],
    modalId: null,
    lastFocused: null,
    filtersOpen: false,
    currentPage: 1,
    carouselIndex: 0,
  };
  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  let carouselAutoplayTimer = 0;
  let aboutHeaderObserver = null;

  const foodOrder = [
    "Comida chilena",
    "Cocina casera",
    "Pescados",
    "Mariscos",
    "Cocina marina",
    "Mapuche",
    "Carnes",
    "Jugos",
    "Sándwiches",
    "Al paso",
    "Chilota",
    "Patagónica",
    "Magallánica",
    "Campesina",
    "Pastas",
    "Opciones vegetales",
    "Vegano",
    "Vegetariano",
    "Celíaco",
    "Sin clasificación culinaria",
  ];
  const priceOrder = PRICE_PROTOTYPE.enabled
    ? [...PRICE_PROTOTYPE.bands]
    : ["Económico", "Precio medio", "No informado"];
  const amenityOrder = AMENITY_DEMO_PROTOTYPE.options.map(({ label }) => label);
  const demoFoodPreferenceLabels = new Set(
    FOOD_PREFERENCE_DEMO_PROTOTYPE.options.map(({ label }) => label),
  );
  const RAPA_NUI_TERRITORY = Object.freeze({
    value: "__rapa_nui__",
    label: "Isla de Pascua / Rapa Nui",
    parentRegion: "Valparaíso",
    parentCode: "V",
  });
  // Orden geográfico norte-sur con la nomenclatura romana tradicional de las regiones.
  // `value` conserva exactamente el dato interno para no alterar la lógica de filtrado.
  const REGION_FILTER_ORDER = Object.freeze([
    { code: "XV", value: "Arica y Parinacota" },
    { code: "I", value: "Tarapacá" },
    { code: "II", value: "Antofagasta" },
    { code: "III", value: "Atacama" },
    { code: "IV", value: "Coquimbo" },
    { code: "V", value: "Valparaíso" },
    { code: "XIII", value: "Metropolitana de Santiago" },
    { code: "VI", value: "Libertador General Bernardo O'Higgins" },
    { code: "VII", value: "Maule" },
    { code: "XVI", value: "Ñuble" },
    { code: "VIII", value: "Biobío" },
    { code: "IX", value: "La Araucanía" },
    { code: "XIV", value: "Los Ríos" },
    { code: "X", value: "Los Lagos" },
    { code: "XI", value: "Aysén del General Carlos Ibáñez del Campo" },
    { code: "XII", value: "Magallanes y de la Antártica Chilena" },
  ]);
  function escapeHTML(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function normalize(value) {
    return String(value ?? "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();
  }

  function isRapaNuiRestaurant(restaurant) {
    const territorialEvidence = [
      restaurant.region,
      restaurant.province,
      restaurant.commune,
      restaurant.locality,
      restaurant.address,
      restaurant.venue,
    ]
      .map(normalize)
      .join(" ");
    const isRapaNuiTerritory = /rapa nui|isla de pascua|hanga roa/.test(territorialEvidence);
    const belongsToValparaiso =
      restaurant.region === RAPA_NUI_TERRITORY.parentRegion ||
      /rapa nui|isla de pascua/.test(normalize(restaurant.region));
    return isRapaNuiTerritory && belongsToValparaiso;
  }

  function matchesSelectedTerritory(restaurant) {
    if (!state.region) return true;
    if (state.region === RAPA_NUI_TERRITORY.value) return isRapaNuiRestaurant(restaurant);
    return restaurant.region === state.region;
  }

  function selectedTerritoryLabel() {
    return state.region === RAPA_NUI_TERRITORY.value
      ? RAPA_NUI_TERRITORY.label
      : state.region;
  }

  function includesEvery(selectedValues, availableValues) {
    return (
      selectedValues.size === 0 ||
      [...selectedValues].every((selectedValue) => availableValues.includes(selectedValue))
    );
  }

  function deriveVisitFeatures(restaurant) {
    const accessibilityEvidence = normalize(restaurant.accessibility);
    const hasAccessibilityNote = /acces|silla|movilidad/.test(accessibilityEvidence);
    const hasReducedMobilityAccess =
      /acceso para silla de ruedas/.test(accessibilityEvidence) &&
      !/no confirmad/.test(accessibilityEvidence);
    const futureValues = {
      parking: restaurant.parking ?? null,
      petFriendly: restaurant.petFriendly ?? null,
      reducedMobility: hasReducedMobilityAccess ? restaurant.accessibility : null,
    };

    return VISIT_FEATURES.map((feature) => {
      const value = futureValues[feature.key];
      const informed = value !== null && value !== undefined && value !== "";
      const booleanStatus =
        typeof value === "boolean"
          ? value
            ? "Sí, informado por la fuente"
            : "No, informado por la fuente"
          : null;
      return {
        ...feature,
        informed,
        status: booleanStatus ?? (informed ? "Informado por la fuente" : "No informado"),
        detail:
          (typeof value === "string" ? value : null) ||
          (feature.key === "reducedMobility" && hasAccessibilityNote
            ? restaurant.accessibility
            : null),
      };
    });
  }

  function safeUrl(value) {
    if (!value) return null;
    try {
      const url = new URL(value);
      return ["http:", "https:"].includes(url.protocol) ? url.href : null;
    } catch {
      return null;
    }
  }

  function formatLocation(restaurant, compact = false) {
    const localParts = [restaurant.locality, restaurant.commune].filter(
      (part, index, list) => part && list.indexOf(part) === index,
    );
    if (compact) {
      return [...localParts.slice(0, 1), restaurant.region].filter(Boolean).join(" · ");
    }
    return [...localParts, restaurant.region].filter(Boolean).join(", ") || "Ubicación no informada";
  }

  function formatPrice(category) {
    return category || "No informado";
  }

  function foodIcon(category) {
    const iconPaths = {
      "Comida chilena": '<path class="flag-lower" d="M3 12h18v6H3Z"></path><rect class="flag-outline" x="3" y="6" width="18" height="12" rx="1"></rect><path class="flag-divider" d="M3 12h18M10 6v6"></path><path class="flag-star" d="m6.5 6.9.5 1.29 1.4.08-1.09.88.34 1.4-1.15-.78-1.15.78.34-1.4-1.09-.88 1.4-.08Z"></path>',
      "Cocina casera": '<path class="icon-fillable" d="M5 10h14v7H5Z"></path><path class="icon-detail" d="M3.5 12H5M19 12h1.5M8 8h8M10 6h4"></path>',
      Pescados: '<path class="icon-fillable" d="M4 12c3-4 7-5 11-2l3-3v10l-3-3c-4 3-8 2-11-2Z"></path><circle class="icon-detail" cx="12.5" cy="11" r=".8"></circle>',
      Mariscos: '<path class="icon-fillable" d="M4 18c.7-6.2 3.8-11 8-11s7.3 4.8 8 11H4Z"></path><path class="icon-detail" d="M12 7v11M8.5 8.5 10 18M15.5 8.5 14 18M5.8 13h12.4"></path>',
      "Cocina marina": '<path class="icon-fillable" d="M3 9c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 2-2v7c-2 0-2 2-4 2s-2-2-4-2-2 2-4 2-2-2-4-2-2 2-4 2V9Z"></path><path class="icon-detail" d="M3 13c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 2-2"></path>',
      Mapuche: '<circle class="icon-fillable" cx="12" cy="12" r="3.5"></circle><path class="icon-detail" d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l3 3M16 16l3 3M19 5l-3 3M8 16l-3 3"></path>',
      Carnes: '<path class="icon-fillable" d="M7 6c4-3 10 0 11 4 1 4-3 8-8 8-4 0-6-3-5-6 .4-1.3 1.5-2 2-3 .4-.8-.4-1.8 0-3Z"></path><circle class="icon-detail" cx="10" cy="12" r="2"></circle>',
      Jugos: '<path class="icon-fillable" d="M7 8h10l-1 12H8L7 8Z"></path><path class="icon-detail" d="M9 4h7l-3 4"></path>',
      Sándwiches: '<path class="icon-fillable" d="M5 10c0-3 3-5 7-5s7 2 7 5H5ZM5 14h14v3H5Z"></path><path class="icon-detail" d="m6 10 2 4 4-4 4 4 2-4"></path>',
      "Al paso": '<path class="icon-fillable" d="M4.5 8h15L18 21H6L4.5 8Z"></path><path class="icon-detail" d="M8.5 8V6.5a3.5 3.5 0 0 1 7 0V8M8 12h8"></path>',
      Chilota: '<path class="icon-fillable" d="m5 11 7-6 7 6v8H5Z"></path><path class="icon-detail" d="M9 19v-5h6v5M8 9V6h3"></path>',
      Patagónica: '<path class="icon-fillable" d="m3 19 6-10 3 5 3-8 6 13H3Z"></path><path class="icon-detail" d="m7.5 11.5 1.5-2.5 3 5 3-8 2.1 4.6"></path>',
      Magallánica: '<path class="icon-fillable" d="m3 19 6-10 3 5 3-8 6 13H3Z"></path><path class="icon-detail" d="m7.5 11.5 1.5-2.5 3 5 3-8 2.1 4.6M5 5h4M7 3v4"></path>',
      Campesina: '<path class="icon-fillable" d="M12 18C6 18 5 12 5 6c6 0 12 1 12 7 0 3-2 5-5 5Z"></path><path class="icon-detail" d="M5 20c3-5 6-8 10-10"></path>',
      Pastas: '<path class="icon-fillable" d="M4 12h16a8 8 0 0 1-16 0Z"></path><path class="icon-detail" d="M8 9c0-2 1-2 1-4M12 9c0-2 1-2 1-4M16 9c0-2 1-2 1-4"></path>',
      "Opciones vegetales": '<path class="icon-fillable" d="M19 4C11 4 6 8 6 14c0 3 2 5 5 5 6 0 8-7 8-15Z"></path><path class="icon-detail" d="M5 20c2-5 5-8 10-11"></path>',
      Vegano: '<path class="icon-fillable" d="M18.8 4.3C11 4.6 6.5 8.6 6.5 14c0 3.2 2 5.3 5.2 5.3 5.1 0 7.1-6.8 7.1-15Z"></path><path class="icon-detail" d="M5.2 20.3c2.3-5 5.7-8.3 10.3-10.7"></path>',
      Vegetariano: '<path class="icon-fillable" d="M13 8c3-3 6-2 7-5 1 4-.5 7-4 8"></path><path class="icon-fillable" d="M11 9c4 0 6 3 6 6.5S14.6 21 11 21s-6-2-6-5.5S7 9 11 9Z"></path><path class="icon-detail" d="M12 9c0-2-1-3.5-3-4"></path>',
      Celíaco: '<path class="icon-detail" d="M12 21V6"></path><path class="icon-detail" d="M12 10C8 10 7 7 7 5c3 0 5 1.5 5 5Zm0 4c-4 0-5-3-5-5 3 0 5 1.5 5 5Zm0 4c-4 0-5-3-5-5 3 0 5 1.5 5 5Zm0-8c4 0 5-3 5-5-3 0-5 1.5-5 5Zm0 4c4 0 5-3 5-5-3 0-5 1.5-5 5Zm0 4c4 0 5-3 5-5-3 0-5 1.5-5 5ZM4 4l16 16"></path>',
      "Sin clasificación culinaria": '<circle class="icon-fillable" cx="12" cy="12" r="7"></circle><path class="icon-detail" d="M8.5 12h7"></path>',
    };
    const iconClasses = ["food-icon"];
    if (category === "Comida chilena") iconClasses.push("chile-flag");
    if (["Pescados", "Mariscos", "Opciones vegetales", "Vegano"].includes(category)) {
      iconClasses.push("preserve-hover-outline");
    }
    return `<svg class="${iconClasses.join(" ")}" viewBox="0 0 24 24" aria-hidden="true">${iconPaths[category] ?? iconPaths["Sin clasificación culinaria"]}</svg>`;
  }

  function amenityIcon(label) {
    const iconPaths = {
      "Pet friendly": '<path class="icon-fillable" d="M12 12.5c-2.6 0-5.3 2.2-5.3 4.7 0 1.8 1.4 2.8 3 2.8.8 0 1.5-.4 2.3-.4s1.5.4 2.3.4c1.6 0 3-1 3-2.8 0-2.5-2.7-4.7-5.3-4.7Z"></path><circle class="icon-detail" cx="6.4" cy="9.6" r="1.6"></circle><circle class="icon-detail" cx="10" cy="6.3" r="1.6"></circle><circle class="icon-detail" cx="14" cy="6.3" r="1.6"></circle><circle class="icon-detail" cx="17.6" cy="9.6" r="1.6"></circle>',
      Estacionamiento: '<rect class="icon-fillable" x="4" y="3" width="16" height="18" rx="2"></rect><path class="icon-detail" d="M9 17V7h4.2a3 3 0 0 1 0 6H9m0 0h4.2"></path>',
      Accesibilidad: '<circle class="icon-detail" cx="10" cy="4.5" r="1.7"></circle><path class="icon-fillable" d="M9 8h4l1 4h3"></path><path class="icon-detail" d="m10 8-1 6 4 1 2.5 4M8.5 12A5 5 0 1 0 14 18"></path>',
    };
    return `<svg class="food-icon amenity-icon" viewBox="0 0 24 24" aria-hidden="true">${iconPaths[label] ?? ""}</svg>`;
  }

  function foodCategoryList(restaurant) {
    return `
      <ul class="food-type-list" aria-label="Tipos de comida">
        ${restaurant.displayFoodCategories
          .map(
            (category) => {
              const isReferential = demoFoodPreferenceLabels.has(category);
              return `
              <li
                class="food-type-item${isReferential ? " is-referential" : ""}"
                ${isReferential ? `data-food-source="${escapeHTML(restaurant.foodPreferencesSource)}" title="${escapeHTML(category)} · dato de demostración"` : ""}
              >
                ${foodIcon(category)}
                <span class="food-type-label">
                  ${escapeHTML(category)}
                  ${isReferential ? '<small class="food-demo-note">Referencial</small>' : ""}
                </span>
              </li>
            `;
            },
          )
          .join("")}
      </ul>
    `;
  }

  function amenityList(restaurant) {
    if (!restaurant.displayAmenities.length) {
      return `
        <span class="restaurant-amenities is-empty" aria-label="Comodidades">
          <span class="amenity-empty">No informado</span>
        </span>
      `;
    }
    return `
      <span
        class="restaurant-amenities"
        data-amenities-source="${escapeHTML(restaurant.amenitiesSource)}"
        aria-label="Comodidades referenciales de maqueta; no verificadas"
      >
        ${restaurant.displayAmenities
          .map(
            ({ label }) => `
              <span class="amenity-item" title="${escapeHTML(label)} · dato de demostración">
                ${amenityIcon(label)}
                <span>${escapeHTML(label)}</span>
              </span>
            `,
          )
          .join("")}
        <span class="amenity-demo-note">Referencial</span>
      </span>
    `;
  }

  function matchingSearchSuggestions(query) {
    const normalizedQuery = normalize(query);
    if (!normalizedQuery) return [];

    return restaurants
      .map((restaurant) => {
        const normalizedName = normalize(restaurant.name);
        const normalizedAlternateName = normalize(restaurant.alternateName);
        let rank = 4;
        if (normalizedName.startsWith(normalizedQuery)) rank = 0;
        else if (normalizedAlternateName.startsWith(normalizedQuery)) rank = 1;
        else if (normalizedName.includes(normalizedQuery)) rank = 2;
        else if (normalizedAlternateName.includes(normalizedQuery)) rank = 3;
        return rank < 4 ? { restaurant, rank } : null;
      })
      .filter(Boolean)
      .sort(
        (first, second) =>
          first.rank - second.rank ||
          first.restaurant.name.localeCompare(second.restaurant.name, "es", {
            sensitivity: "base",
          }),
      )
      .slice(0, SEARCH_SUGGESTION_LIMIT)
      .map(({ restaurant }) => restaurant);
  }

  function closeSearchSuggestions() {
    state.searchActiveIndex = -1;
    elements.searchSuggestions.hidden = true;
    elements.searchSuggestions.innerHTML = "";
    elements.searchInput.setAttribute("aria-expanded", "false");
    elements.searchInput.removeAttribute("aria-activedescendant");
  }

  function renderSearchSuggestions() {
    const query = elements.searchInput.value.trim();
    if (!query) {
      closeSearchSuggestions();
      return;
    }

    const suggestions = matchingSearchSuggestions(query);
    state.searchActiveIndex = -1;
    elements.searchInput.removeAttribute("aria-activedescendant");
    elements.searchInput.setAttribute("aria-expanded", "true");
    elements.searchSuggestions.hidden = false;
    elements.searchSuggestions.innerHTML = suggestions.length
      ? suggestions
          .map(
            (restaurant, index) => `
              <div
                class="search-suggestion"
                id="search-suggestion-${index}"
                role="option"
                data-restaurant-id="${escapeHTML(restaurant.id)}"
                aria-selected="false"
              >${escapeHTML(restaurant.name)}</div>
            `,
          )
          .join("")
      : '<p class="search-suggestions-empty" role="status">Sin coincidencias por nombre.</p>';
  }

  function setSearchActiveIndex(nextIndex) {
    const options = [...elements.searchSuggestions.querySelectorAll('[role="option"]')];
    if (!options.length) return;
    state.searchActiveIndex = (nextIndex + options.length) % options.length;
    options.forEach((option, index) => {
      option.setAttribute("aria-selected", String(index === state.searchActiveIndex));
    });
    const activeOption = options[state.searchActiveIndex];
    elements.searchInput.setAttribute("aria-activedescendant", activeOption.id);
    activeOption.scrollIntoView({ block: "nearest" });
  }

  function selectSearchSuggestion(option) {
    const restaurant = restaurants.find(({ id }) => id === option?.dataset.restaurantId);
    if (!restaurant) return;
    state.selectedSearchId = restaurant.id;
    state.query = restaurant.name;
    elements.searchInput.value = restaurant.name;
    applyFilters();
    closeSearchSuggestions();
    elements.searchInput.focus({ preventScroll: true });
    scrollToResultsStart();
  }

  function handleSearchKeydown(event) {
    const isOpen = elements.searchInput.getAttribute("aria-expanded") === "true";
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (!isOpen) renderSearchSuggestions();
      const direction = event.key === "ArrowDown" ? 1 : -1;
      const startIndex = state.searchActiveIndex < 0 && direction < 0
        ? elements.searchSuggestions.querySelectorAll('[role="option"]').length
        : state.searchActiveIndex;
      setSearchActiveIndex(startIndex + direction);
      return;
    }
    if (event.key === "Enter" && isOpen && state.searchActiveIndex >= 0) {
      event.preventDefault();
      const activeOption = elements.searchSuggestions.querySelector(
        `#search-suggestion-${state.searchActiveIndex}`,
      );
      selectSearchSuggestion(activeOption);
      return;
    }
    if (event.key === "Escape" && isOpen) {
      event.preventDefault();
      closeSearchSuggestions();
    }
  }

  function initialiseSocialLinks() {
    document.querySelectorAll("[data-social]").forEach((link) => {
      const network = link.dataset.social;
      const configuredUrl = SOCIAL_LINKS[network];
      if (configuredUrl) {
        link.href = configuredUrl;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        return;
      }
      link.dataset.placeholder = "true";
      link.title = `Enlace de ${network} pendiente de configurar`;
    });
  }

  function countBy(items, accessor) {
    return items.reduce((counts, item) => {
      const values = accessor(item);
      for (const value of Array.isArray(values) ? values : [values]) {
        if (value) counts.set(value, (counts.get(value) ?? 0) + 1);
      }
      return counts;
    }, new Map());
  }

  function renderFilterOptions(container, values, counts, group) {
    const includeFoodIcon = group === "foods";
    const includeAmenityIcon = group === "amenities";
    const includeIcon = includeFoodIcon || includeAmenityIcon;
    container.innerHTML = values
      .filter((value) => counts.has(value))
      .map(
        (value) => {
          const isReferentialFood = includeFoodIcon && demoFoodPreferenceLabels.has(value);
          return `
          <button
            class="filter-option${isReferentialFood ? " is-referential" : ""}"
            type="button"
            data-filter-group="${group}"
            data-filter-value="${escapeHTML(value)}"
            ${isReferentialFood ? `data-filter-source="${FOOD_PREFERENCE_DEMO_PROTOTYPE.source}"` : ""}
            aria-pressed="false"
          >
            <span class="option-label${includeIcon ? " option-label--icon" : ""}">
              ${includeFoodIcon ? foodIcon(value) : includeAmenityIcon ? amenityIcon(value) : ""}
              <span>${escapeHTML(value)}</span>
            </span>
            <span class="option-count">${counts.get(value)}</span>
          </button>
        `;
        },
      )
      .join("");
  }

  function initialiseFilters() {
    const regionCounts = countBy(restaurants, (item) => [item.region]);
    const orderedRegions = REGION_FILTER_ORDER.filter(({ value }) => regionCounts.has(value));
    const configuredRegionNames = new Set(REGION_FILTER_ORDER.map(({ value }) => value));
    const unconfiguredRegions = [...regionCounts.keys()]
      .filter((region) => !configuredRegionNames.has(region))
      .sort((a, b) => a.localeCompare(b, "es"))
      .map((value) => ({ code: "—", value }));
    const rapaNuiCount = restaurants.filter(isRapaNuiRestaurant).length;
    const regions = [
      ...orderedRegions.flatMap((region) =>
        region.value === RAPA_NUI_TERRITORY.parentRegion
          ? [region, { ...RAPA_NUI_TERRITORY, isSpecial: true, count: rapaNuiCount }]
          : [region],
      ),
      ...unconfiguredRegions,
    ];
    elements.regionFilters.innerHTML = `
      <button
        class="filter-option"
        type="button"
        data-filter-group="region"
        data-filter-value=""
        aria-pressed="true"
      >
        <span class="option-label">Todo Chile</span>
        <span class="option-count" aria-label="${restaurants.length} cocinerías">${restaurants.length}</span>
      </button>
      ${regions
        .map(
          ({ code, value, label = value, isSpecial = false, count }) => `
            <button
              class="filter-option${isSpecial ? " filter-option--territory" : ""}"
              type="button"
              data-filter-group="region"
              data-filter-value="${escapeHTML(value)}"
              aria-pressed="false"
            >
              <span class="option-label">
                ${
                  isSpecial
                    ? `<span class="territory-name">${escapeHTML(label)}</span><small class="territory-association">Territorio especial · ${escapeHTML(RAPA_NUI_TERRITORY.parentCode)} — ${escapeHTML(RAPA_NUI_TERRITORY.parentRegion)}</small>`
                    : `<span class="region-code">${escapeHTML(code)} —</span> ${escapeHTML(label)}`
                }
              </span>
              <span class="option-count">${count ?? regionCounts.get(value) ?? 0}</span>
            </button>
          `,
        )
        .join("")}
    `;

    renderFilterOptions(
      elements.foodFilters,
      foodOrder,
      countBy(restaurants, (item) => item.displayFoodCategories),
      "foods",
    );
    renderFilterOptions(
      elements.priceFilters,
      priceOrder,
      countBy(restaurants, (item) => item.displayPriceCategory),
      "prices",
    );
    renderFilterOptions(
      elements.amenityFilters,
      amenityOrder,
      countBy(restaurants, (item) => item.displayAmenities.map(({ label }) => label)),
      "amenities",
    );
  }

  function getActiveFilterCount() {
    return (state.region ? 1 : 0) + state.foods.size + state.prices.size + state.amenities.size;
  }

  function updateFilterDisclosureState() {
    [
      [elements.regionFilterToggle, elements.regionFilterCount, state.region ? 1 : 0],
      [elements.foodFilterToggle, elements.foodFilterCount, state.foods.size],
      [elements.priceFilterToggle, elements.priceFilterCount, state.prices.size],
      [elements.amenityFilterToggle, elements.amenityFilterCount, state.amenities.size],
    ].forEach(([toggle, countElement, count]) => {
      countElement.hidden = count === 0;
      countElement.textContent = count ? `· ${count}` : "";
      toggle.classList.toggle("has-active-filters", count > 0);
    });
  }

  function filterSections() {
    return [
      [elements.priceFilterToggle, elements.priceFilters],
      [elements.regionFilterToggle, elements.regionFilters],
      [elements.foodFilterToggle, elements.foodFilters],
      [elements.amenityFilterToggle, elements.amenityFilters],
    ];
  }

  function setFilterSectionExpanded(toggle, panel, isExpanded) {
    toggle.setAttribute("aria-expanded", String(isExpanded));
    panel.hidden = !isExpanded;
  }

  function closeFilterSections(exceptToggle = null) {
    filterSections().forEach(([toggle, panel]) => {
      if (toggle !== exceptToggle) setFilterSectionExpanded(toggle, panel, false);
    });
  }

  function toggleFilterSection(toggle, panel) {
    const willExpand = toggle.getAttribute("aria-expanded") !== "true";
    closeFilterSections(willExpand ? toggle : null);
    setFilterSectionExpanded(toggle, panel, willExpand);
  }

  function hasAnyActiveState() {
    return Boolean(state.query || getActiveFilterCount());
  }

  function applyFilters({ resetPagination = true } = {}) {
    if (resetPagination) state.currentPage = 1;
    const normalizedQuery = normalize(state.query);

    state.visibleRestaurants = restaurants.filter((restaurant) => {
      const searchableName = normalize(`${restaurant.name} ${restaurant.alternateName ?? ""}`);
      const matchesName = state.selectedSearchId
        ? restaurant.id === state.selectedSearchId
        : !normalizedQuery || searchableName.includes(normalizedQuery);
      const matchesRegion = matchesSelectedTerritory(restaurant);
      const matchesFood = includesEvery(state.foods, restaurant.displayFoodCategories);
      const matchesPrice = includesEvery(state.prices, [restaurant.displayPriceCategory]);
      const matchesAmenity = includesEvery(
        state.amenities,
        restaurant.displayAmenities.map(({ label }) => label),
      );

      return matchesName && matchesRegion && matchesFood && matchesPrice && matchesAmenity;
    });

    renderDirectory();
  }

  function paginationItems(currentPage, totalPages) {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, index) => index + 1);

    const pages = new Set([1, totalPages, currentPage - 1, currentPage, currentPage + 1]);
    if (currentPage <= 3) [2, 3, 4].forEach((page) => pages.add(page));
    if (currentPage >= totalPages - 2) {
      [totalPages - 3, totalPages - 2, totalPages - 1].forEach((page) => pages.add(page));
    }

    const orderedPages = [...pages]
      .filter((page) => page >= 1 && page <= totalPages)
      .sort((a, b) => a - b);
    const items = [];
    orderedPages.forEach((page, index) => {
      if (index && page - orderedPages[index - 1] > 1) items.push("ellipsis");
      items.push(page);
    });
    return items;
  }

  function renderPagination(totalPages, visibleCount) {
    const shouldShow = totalPages > 1;
    elements.pagination.hidden = !shouldShow;
    if (!shouldShow) {
      elements.paginationPages.innerHTML = "";
      elements.paginationStatus.textContent = "";
      return;
    }

    elements.paginationPrev.disabled = state.currentPage === 1;
    elements.paginationNext.disabled = state.currentPage === totalPages;
    elements.paginationPrev.setAttribute(
      "aria-label",
      state.currentPage === 1 ? "No hay una página anterior" : `Ir a la página ${state.currentPage - 1}`,
    );
    elements.paginationNext.setAttribute(
      "aria-label",
      state.currentPage === totalPages
        ? "No hay una página siguiente"
        : `Ir a la página ${state.currentPage + 1}`,
    );
    elements.paginationPages.innerHTML = paginationItems(state.currentPage, totalPages)
      .map((item) => {
        if (item === "ellipsis") return '<span class="pagination-ellipsis" aria-hidden="true">…</span>';
        const current = item === state.currentPage;
        return `
          <button
            class="pagination-page"
            type="button"
            data-page="${item}"
            aria-label="Ir a la página ${item}"
            ${current ? 'aria-current="page"' : ""}
          >${item}</button>
        `;
      })
      .join("");
    const firstResult = (state.currentPage - 1) * PAGE_SIZE + 1;
    const lastResult = Math.min(state.currentPage * PAGE_SIZE, visibleCount);
    elements.paginationStatus.textContent = `Página ${state.currentPage} de ${totalPages} · resultados ${firstResult}–${lastResult}`;
  }

  function restaurantRow(restaurant) {
    const hours = restaurant.displayHours ?? "No informa horario";
    const hoursClass = restaurant.hoursIsPlaceholder
      ? " is-placeholder"
      : restaurant.displayHours
        ? ""
        : " is-uninformed";

    return `
      <article class="restaurant-row">
        <button
          class="restaurant-button"
          type="button"
          data-restaurant-id="${escapeHTML(restaurant.id)}"
          aria-label="Abrir ficha de ${escapeHTML(restaurant.name)}"
        >
          <span
            class="restaurant-main"
            data-image-kind="${escapeHTML(restaurant.imageKind)}"
            data-image-label="${escapeHTML(restaurant.imageLabel)}"
            style="--restaurant-image: url('${escapeHTML(restaurant.imagePath)}')"
          >
            <span class="restaurant-main-content">
              <span class="restaurant-heading">
                <span class="restaurant-location">${escapeHTML(formatLocation(restaurant, true))}</span>
                <span class="restaurant-name">${escapeHTML(restaurant.name)}</span>
              </span>
              <span class="restaurant-meta">
                <span class="restaurant-hours${hoursClass}" data-hours-source="${escapeHTML(restaurant.hoursSource ?? "unavailable")}">${escapeHTML(hours)}</span>
              </span>
              ${amenityList(restaurant)}
            </span>
          </span>
          <span class="restaurant-cuisine">${foodCategoryList(restaurant)}</span>
          <span class="restaurant-price">
            <span>${escapeHTML(formatPrice(restaurant.displayPriceCategory))}</span>
          </span>
          <span class="restaurant-action" aria-hidden="true">
            <span>Ver ficha</span>
            <span>→</span>
          </span>
        </button>
      </article>
    `;
  }

  function renderDirectory() {
    const visibleCount = state.visibleRestaurants.length;
    const activeFilterCount = getActiveFilterCount();
    const isFiltered = activeFilterCount > 0;
    const isSearching = Boolean(state.query);
    const totalPages = visibleCount ? Math.ceil(visibleCount / PAGE_SIZE) : 0;
    state.currentPage = totalPages ? Math.min(state.currentPage, totalPages) : 1;
    const pageStart = (state.currentPage - 1) * PAGE_SIZE;
    const listedRestaurants = state.visibleRestaurants.slice(pageStart, pageStart + PAGE_SIZE);

    elements.restaurantList.innerHTML = listedRestaurants.map(restaurantRow).join("");
    elements.restaurantList.hidden = visibleCount === 0;
    elements.emptyState.hidden = visibleCount !== 0;
    renderPagination(totalPages, visibleCount);

    elements.resultsCount.innerHTML = hasAnyActiveState()
      ? `<strong>${visibleCount}</strong> de ${restaurants.length} cocinerías`
      : `<strong>${restaurants.length}</strong> cocinerías`;

    const summary = [];
    if (isSearching) summary.push(`“${state.query}”`);
    if (state.region) summary.push(selectedTerritoryLabel());
    if (state.foods.size) summary.push([...state.foods].join(", "));
    if (state.prices.size) summary.push([...state.prices].join(", "));
    if (state.amenities.size) summary.push([...state.amenities].join(", "));
    elements.activeSummary.textContent = summary.join(" · ");
    elements.activeSummary.hidden = summary.length === 0;

    elements.searchClear.hidden = !isSearching;
    elements.resetFilters.disabled = !isFiltered;
    elements.filterToggleCount.textContent = activeFilterCount ? String(activeFilterCount) : "";
    updateFilterDisclosureState();
    elements.directory.dataset.state = visibleCount
      ? isSearching
        ? "searching"
        : isFiltered
          ? "filtered"
          : "default"
      : "empty";
    requestListHeaderStickyUpdate();
  }

  function setPressedState(button, isPressed) {
    button.setAttribute("aria-pressed", String(isPressed));
  }

  function syncRegionFilterButtons() {
    elements.regionFilters.querySelectorAll(".filter-option").forEach((regionButton) => {
      const value = regionButton.dataset.filterValue;
      const isPressed = value ? state.region === value : !state.region;
      setPressedState(regionButton, isPressed);
    });
  }

  function handleFilterOption(button) {
    const group = button.dataset.filterGroup;
    const value = button.dataset.filterValue;
    if (group === "region") {
      const deselectSelectedRegion = Boolean(value) && state.region === value;
      state.region = deselectSelectedRegion ? "" : value;
      syncRegionFilterButtons();
      applyFilters();
      if (state.filtersOpen) closeFilters({ returnFocus: false });
      scrollToResultsStart();
      return;
    }

    const selectedValues = state[group];
    if (!(selectedValues instanceof Set)) return;

    if (selectedValues.has(value)) {
      selectedValues.delete(value);
      setPressedState(button, false);
    } else {
      selectedValues.add(value);
      setPressedState(button, true);
    }
    applyFilters();
  }

  function resetFilterControls({ includeSearch = false } = {}) {
    state.region = "";
    state.foods.clear();
    state.prices.clear();
    state.amenities.clear();
    document.querySelectorAll(".filter-option[aria-pressed='true']").forEach((button) => {
      setPressedState(button, false);
    });
    syncRegionFilterButtons();
    closeFilterSections();

    if (includeSearch) {
      state.query = "";
      state.selectedSearchId = null;
      elements.searchInput.value = "";
      closeSearchSuggestions();
    }
    applyFilters();
  }

  function scrollToDirectoryStart() {
    requestAnimationFrame(() => {
      const headerHeight = elements.siteHeader?.offsetHeight ?? 0;
      const destination = elements.directoryHeading ?? elements.directory;
      const destinationTop = destination.getBoundingClientRect().top + window.scrollY;
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({
        top: Math.max(0, destinationTop - headerHeight - 16),
        behavior: reducedMotion ? "auto" : "smooth",
      });
    });
  }

  let listHeaderFrame = 0;

  function updateListHeaderStickyState() {
    listHeaderFrame = 0;
    if (!elements.listHeader || !elements.resultsArea) return;

    const headerHeight = elements.siteHeader?.offsetHeight ?? 0;
    const listHeaderRect = elements.listHeader.getBoundingClientRect();
    const resultsRect = elements.resultsArea.getBoundingClientRect();
    const isVisible = window.getComputedStyle(elements.listHeader).display !== "none";
    const isStuck =
      isVisible &&
      listHeaderRect.top <= headerHeight + 0.5 &&
      listHeaderRect.bottom > headerHeight &&
      resultsRect.bottom > listHeaderRect.bottom;

    elements.listHeader.classList.toggle("is-stuck", isStuck);
  }

  function requestListHeaderStickyUpdate() {
    if (listHeaderFrame) return;
    listHeaderFrame = window.requestAnimationFrame(updateListHeaderStickyState);
  }

  function updateStickyOffsets() {
    const headerHeight = elements.siteHeader?.offsetHeight ?? 0;
    document.documentElement.style.setProperty("--header-height", `${headerHeight}px`);
    requestListHeaderStickyUpdate();
  }

  function updateNavbarSurfaceState() {
    if (!elements.siteHeader || !elements.aboutData) return;
    const headerHeight = elements.siteHeader.offsetHeight;
    const isPastAbout = elements.aboutData.getBoundingClientRect().bottom <= headerHeight;
    elements.siteHeader.classList.toggle("is-past-about", isPastAbout);
  }

  function initialiseNavbarSurfaceObserver() {
    if (!elements.siteHeader || !elements.aboutData) return;
    aboutHeaderObserver?.disconnect();
    updateNavbarSurfaceState();
    const headerHeight = elements.siteHeader.offsetHeight;
    aboutHeaderObserver = new IntersectionObserver(updateNavbarSurfaceState, {
      rootMargin: `-${headerHeight}px 0px 0px 0px`,
      threshold: 0,
    });
    aboutHeaderObserver.observe(elements.aboutData);
  }

  function clearFiltersAndReturnToDirectory() {
    resetFilterControls();
    if (state.filtersOpen) closeFilters();
    scrollToDirectoryStart();
  }

  function scrollToResultsStart() {
    requestAnimationFrame(() => {
      const headerHeight = elements.siteHeader?.offsetHeight ?? 0;
      const destinationTop = elements.resultsToolbar.getBoundingClientRect().top + window.scrollY;
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({
        top: Math.max(0, destinationTop - headerHeight - 16),
        behavior: reducedMotion ? "auto" : "smooth",
      });
    });
  }

  function goToPage(page) {
    const totalPages = Math.ceil(state.visibleRestaurants.length / PAGE_SIZE);
    const nextPage = Math.min(Math.max(page, 1), totalPages);
    if (!totalPages || nextPage === state.currentPage) return;
    state.currentPage = nextPage;
    renderDirectory();
    requestAnimationFrame(() => {
      elements.resultsCount.focus({ preventScroll: true });
      scrollToResultsStart();
    });
  }

  function practicalItem(label, content, className = "") {
    return `
      <section class="modal-practical-item ${className}">
        <h4>${escapeHTML(label)}</h4>
        ${content}
      </section>
    `;
  }

  function contactItem(label, content) {
    return `
      <li>
        <span class="fact-label">${escapeHTML(label)}</span>
        <span>${content}</span>
      </li>
    `;
  }

  function profileUrl(value, baseUrl) {
    const directUrl = safeUrl(value);
    if (directUrl) return directUrl;
    const handle = String(value ?? "").trim().replace(/^@/, "");
    return /^[a-z0-9._]+$/i.test(handle) ? `${baseUrl}${encodeURIComponent(handle)}/` : null;
  }

  function contactSectionContent(restaurant) {
    const items = [];
    if (restaurant.phone) {
      const phoneLinks = restaurant.phone
        .split(";")
        .map((phone) => phone.trim())
        .filter(Boolean)
        .map((phone) => {
          const tel = phone.replace(/[^+\d]/g, "");
          return `<a href="tel:${escapeHTML(tel)}">${escapeHTML(phone)}</a>`;
        })
        .join("<br>");
      if (phoneLinks) items.push(contactItem("Teléfono", phoneLinks));
    }
    if (restaurant.whatsapp) {
      const whatsappDigits = restaurant.whatsapp.replace(/\D/g, "");
      const whatsappContent = whatsappDigits.length >= 8
        ? `<a href="https://wa.me/${escapeHTML(whatsappDigits)}" target="_blank" rel="noopener noreferrer">${escapeHTML(restaurant.whatsapp)} ↗</a>`
        : escapeHTML(restaurant.whatsapp);
      items.push(contactItem("WhatsApp", whatsappContent));
    }
    if (restaurant.email) {
      items.push(
        contactItem(
          "Email",
          `<a href="mailto:${escapeHTML(restaurant.email)}">${escapeHTML(restaurant.email)}</a>`,
        ),
      );
    }
    const instagramUrl = profileUrl(restaurant.instagram, "https://www.instagram.com/");
    if (instagramUrl) {
      items.push(
        contactItem(
          "Instagram",
          `<a href="${escapeHTML(instagramUrl)}" target="_blank" rel="noopener noreferrer">${escapeHTML(restaurant.instagram)} ↗</a>`,
        ),
      );
    }
    const facebookUrl = safeUrl(restaurant.facebook);
    if (facebookUrl) {
      items.push(
        contactItem(
          "Facebook",
          `<a href="${escapeHTML(facebookUrl)}" target="_blank" rel="noopener noreferrer">Visitar página ↗</a>`,
        ),
      );
    }
    const websiteUrl = safeUrl(restaurant.website);
    if (websiteUrl) {
      items.push(
        contactItem(
          "Sitio web",
          `<a href="${escapeHTML(websiteUrl)}" target="_blank" rel="noopener noreferrer">Visitar sitio ↗</a>`,
        ),
      );
    }
    if (!items.length) return '<p class="modal-empty modal-empty--centered">No informado</p>';
    return `<ul class="modal-contact-list">${items.join("")}</ul>`;
  }

  function usefulInformationContent(restaurant) {
    const items = [];
    if (restaurant.services) items.push(contactItem("Servicios", escapeHTML(restaurant.services)));
    if (restaurant.paymentMethods) {
      items.push(contactItem("Métodos de pago", escapeHTML(restaurant.paymentMethods)));
    }
    if (restaurant.founded) items.push(contactItem("Año de fundación", escapeHTML(restaurant.founded)));
    if (restaurant.otherNetworks) {
      items.push(contactItem("Plataformas informadas", escapeHTML(restaurant.otherNetworks)));
    }
    return items.length ? `<ul class="modal-contact-list">${items.join("")}</ul>` : "";
  }

  function introductionText(restaurant) {
    if (String(restaurant.description ?? "").trim()) return restaurant.description.trim();
    const location = formatLocation(restaurant);
    const cuisine = String(restaurant.cuisine ?? "").trim() ||
      (restaurant.foodCategories ?? [])
        .filter((category) => category !== "Sin clasificación culinaria")
        .join(", ");
    if (location !== "Ubicación no informada" && cuisine) {
      return `Cocinería ubicada en ${location}, con oferta registrada de ${cuisine}.`;
    }
    if (location !== "Ubicación no informada") return `Cocinería ubicada en ${location}.`;
    if (cuisine) return `Cocinería con oferta registrada de ${cuisine}.`;
    return "No informado";
  }

  function editorialSelectionFor(restaurantId) {
    const slide = elements.aboutSlides.find(
      (aboutSlide) => aboutSlide.dataset.restaurantId === restaurantId,
    );
    const rank = Number(slide?.dataset.editorialRank);
    return Number.isInteger(rank) && rank > 0 ? rank : null;
  }

  function specialtyList(value) {
    const specialties = String(value ?? "")
      .split(/[;,]/)
      .map((specialty) => specialty.trim())
      .filter(Boolean);
    if (!specialties.length) return '<p class="modal-empty">No informado</p>';
    return `
      <ul class="modal-specialty-list">
        ${specialties.map((specialty) => `<li>${escapeHTML(specialty)}</li>`).join("")}
      </ul>
    `;
  }

  function modalFoodList(restaurant) {
    if (!restaurant.displayFoodCategories.length) {
      return '<p class="modal-empty">No informado</p>';
    }
    return `
      <ul class="modal-attribute-list modal-food-list" aria-label="Tipos de comida">
        ${restaurant.displayFoodCategories
          .map((category) => {
            const isReferential = demoFoodPreferenceLabels.has(category);
            return `
              <li class="food-type-item modal-attribute-item">
                ${foodIcon(category)}
                <span class="food-type-label">
                  ${escapeHTML(category)}
                  ${isReferential ? '<small class="food-demo-note">Información referencial</small>' : ""}
                </span>
              </li>
            `;
          })
          .join("")}
      </ul>
    `;
  }

  function modalAmenityList(restaurant) {
    if (!restaurant.displayAmenities.length) {
      return '<p class="modal-empty modal-empty--centered">No informado</p>';
    }
    return `
      <ul
        class="modal-attribute-list modal-amenity-list"
        aria-label="Comodidades de demostración; no verificadas"
        data-amenities-source="${escapeHTML(restaurant.amenitiesSource)}"
      >
        ${restaurant.displayAmenities
          .map(
            ({ label }) => `
              <li class="amenity-item modal-attribute-item">
                ${amenityIcon(label)}
                <span class="food-type-label">
                  ${escapeHTML(label)}
                  <small class="food-demo-note">Información referencial</small>
                </span>
              </li>
            `,
          )
          .join("")}
      </ul>
    `;
  }

  function verifiedCoordinates(restaurant) {
    if (restaurant.latitude === null || restaurant.longitude === null) return null;
    const latitude = Number(restaurant.latitude);
    const longitude = Number(restaurant.longitude);
    if (
      !Number.isFinite(latitude) ||
      !Number.isFinite(longitude) ||
      latitude < -90 ||
      latitude > 90 ||
      longitude < -180 ||
      longitude > 180
    ) {
      return null;
    }
    return { latitude, longitude };
  }

  function openStreetMapLinks({ latitude, longitude }) {
    const latitudeDelta = 0.008;
    const longitudeDelta = 0.012;
    const embed = new URL("https://www.openstreetmap.org/export/embed.html");
    embed.searchParams.set(
      "bbox",
      [
        longitude - longitudeDelta,
        latitude - latitudeDelta,
        longitude + longitudeDelta,
        latitude + latitudeDelta,
      ].join(","),
    );
    embed.searchParams.set("layer", "mapnik");
    embed.searchParams.set("marker", `${latitude},${longitude}`);
    const external = new URL("https://www.openstreetmap.org/");
    external.searchParams.set("mlat", String(latitude));
    external.searchParams.set("mlon", String(longitude));
    external.hash = `map=16/${latitude}/${longitude}`;
    return { embed: embed.href, external: external.href };
  }

  function mapProviderLabel(url) {
    if (!url) return "Ver en el mapa";
    const hostname = new URL(url).hostname;
    if (hostname.includes("google")) return "Abrir en Google Maps";
    if (hostname.includes("waze")) return "Abrir en Waze";
    if (hostname.includes("openstreetmap")) return "Abrir en OpenStreetMap";
    return "Ver en el mapa";
  }

  function mapSectionContent(restaurant) {
    const coordinates = verifiedCoordinates(restaurant);
    const storedMapUrl = safeUrl(restaurant.googleMaps);
    const osmLinks = coordinates ? openStreetMapLinks(coordinates) : null;
    const externalUrl = storedMapUrl ?? osmLinks?.external ?? null;
    const addressParts = [restaurant.address, restaurant.venue].filter(Boolean);
    const locationText = formatLocation(restaurant);
    const preview = osmLinks
      ? `
          <div class="modal-map-preview">
            <iframe
              src="${escapeHTML(osmLinks.embed)}"
              title="Mapa de ubicación de ${escapeHTML(restaurant.name)}"
              loading="lazy"
            ></iframe>
            <p class="modal-map-attribution">
              Datos del mapa © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">colaboradores de OpenStreetMap</a> · ODbL
            </p>
          </div>
        `
      : `
          <div class="modal-map-unavailable" role="note">
            Mapa no disponible: este registro no tiene coordenadas verificadas.
          </div>
        `;
    return `
      ${preview}
      <div class="modal-location-summary">
        <p><span class="fact-label">Dirección / recinto</span>${escapeHTML(addressParts.join(" · ") || "No informado")}</p>
        <p><span class="fact-label">Localidad / región</span>${escapeHTML(locationText)}</p>
      </div>
      ${externalUrl ? `<a class="modal-external-link" href="${escapeHTML(externalUrl)}" target="_blank" rel="noopener noreferrer">${escapeHTML(mapProviderLabel(externalUrl))} ↗</a>` : '<p class="modal-empty">Enlace cartográfico no informado.</p>'}
    `;
  }

  function googleReviewsSection() {
    return `
      <section class="modal-section modal-reviews" aria-labelledby="modal-reviews-title" data-reviews-source="pending-authorized-integration">
        <h3 id="modal-reviews-title">Reseñas en Google</h3>
        <p class="modal-section-intro"><strong>Reseñas publicadas por usuarios en Google. Cocinerías de Chile no gestiona ni modifica estas opiniones.</strong></p>
        <div class="modal-pending" role="note">
          <strong>PENDIENTE</strong>
          <span>Requiere integración o fuente autorizada de Google Maps Platform.</span>
        </div>
      </section>
    `;
  }

  function additionalSourceLinks(value) {
    const urls = String(value ?? "")
      .split(";")
      .map((source) => safeUrl(source.trim()))
      .filter(Boolean);
    return urls
      .map(
        (url, index) =>
          `<a class="modal-source" href="${escapeHTML(url)}" target="_blank" rel="noopener noreferrer">Consultar fuente adicional ${index + 1} ↗</a>`,
      )
      .join("");
  }

  function buildModalContent(restaurant) {
    const primarySource = safeUrl(restaurant.primarySource);
    const currentPrice = restaurant.priceIsSimulated
      ? `${escapeHTML(restaurant.displayPriceCategory)}<span class="placeholder-data-note">Precio referencial de maqueta</span>`
      : escapeHTML(restaurant.priceRange ?? restaurant.displayPriceCategory ?? "No informado");
    const statusClass = restaurant.status === "Activa" ? "" : "is-unconfirmed";
    const hoursContent = restaurant.displayHours
      ? `${escapeHTML(restaurant.displayHours)}${restaurant.hoursIsPlaceholder ? '<span class="placeholder-data-note">Horario referencial de maqueta</span>' : ""}`
      : "No informado";
    const editorialRank = editorialSelectionFor(restaurant.id);
    const isTerritorialImage = restaurant.imageKind !== "direct";
    const imageDescription = restaurant.imageLabel ||
      (isTerritorialImage
        ? `Imagen territorial de ${restaurant.region}`
        : `Fotografía de ${restaurant.name}`);
    const usefulInformation = usefulInformationContent(restaurant);

    return `
      <header class="modal-hero${isTerritorialImage ? " is-territorial" : " is-direct"}">
        <img src="${escapeHTML(restaurant.imagePath)}" alt="${escapeHTML(imageDescription)}" decoding="async">
        <div class="modal-hero-overlay" aria-hidden="true"></div>
        <div class="modal-hero-copy">
          ${editorialRank ? `<p class="modal-editorial-badge">Selección de la guía · Top ${editorialRank}</p>` : ""}
          <p class="modal-hero-location">${escapeHTML(formatLocation(restaurant, true))}</p>
          <h2 id="modal-title">${escapeHTML(restaurant.name)}</h2>
          ${restaurant.alternateName ? `<p class="modal-alternate">También registrado como ${escapeHTML(restaurant.alternateName)}</p>` : ""}
        </div>
        ${isTerritorialImage ? '<p class="modal-image-context">Imagen de referencia territorial</p>' : ""}
      </header>

      <div class="modal-body">
        <div class="modal-section modal-section--intro modal-editorial-intro">
          <section class="modal-intro-copy" aria-labelledby="modal-about-title">
            <h3 id="modal-about-title">Sobre esta cocinería</h3>
            <p class="modal-description" id="modal-description">${escapeHTML(introductionText(restaurant))}</p>
          </section>
          <div class="modal-intro-details">
            <section class="modal-intro-block" aria-labelledby="modal-specialties-title">
              <h3 id="modal-specialties-title">Platos destacados</h3>
              ${specialtyList(restaurant.specialties)}
            </section>
            <section class="modal-intro-block" aria-labelledby="modal-food-title">
              <h3 id="modal-food-title">Tipo de comida</h3>
              ${modalFoodList(restaurant)}
            </section>
          </div>
        </div>

        <div class="modal-section modal-practical-grid">
          <section class="modal-practical-panel modal-location-panel" aria-labelledby="modal-map-title">
            <h3 id="modal-map-title">Ubicación</h3>
            ${mapSectionContent(restaurant)}
          </section>
          <section class="modal-practical-panel" aria-labelledby="modal-practical-title">
            <h3 id="modal-practical-title">Información práctica</h3>
            <div class="modal-practical-stack">
              ${practicalItem("Horario", `<p>${hoursContent}</p>`)}
              ${practicalItem(
                "Comodidades",
                `${modalAmenityList(restaurant)}${restaurant.accessibility ? `<p class="modal-field-note"><strong>Accesibilidad informada:</strong> ${escapeHTML(restaurant.accessibility)}</p>` : ""}`,
                "modal-practical-amenities",
              )}
              ${practicalItem("Rango de precio", `<p>${currentPrice}</p>`)}
            </div>
          </section>
        </div>

        ${googleReviewsSection()}

        <section class="modal-section modal-information" aria-labelledby="modal-information-title">
          <h3 id="modal-information-title">Información y contacto</h3>
          <div class="modal-info-grid">
            <div>
              <h4>Contacto</h4>
              ${contactSectionContent(restaurant)}
            </div>
            ${usefulInformation ? `
              <div>
                <h4>Para planificar la visita</h4>
                ${usefulInformation}
              </div>
            ` : ""}
          </div>
        </section>

        <section class="modal-section modal-record" aria-labelledby="modal-record-title">
          <h3 id="modal-record-title">Sobre los datos</h3>
          <div class="modal-topline">
            <span class="modal-status ${statusClass}">${escapeHTML(restaurant.status)}</span>
            <span class="modal-confidence">Confianza ${escapeHTML(restaurant.confidence?.toLowerCase() ?? "no informada")}</span>
            <span class="modal-confidence">${escapeHTML(restaurant.id)}</span>
          </div>
          <p class="modal-note">
            <strong>${escapeHTML(restaurant.classification)}</strong><br>
            ${escapeHTML(restaurant.notes ?? "No informado")}<br>
            Verificado el ${escapeHTML(formatDate(restaurant.verifiedAt))}.
          </p>
          <div class="modal-source-list">
            ${primarySource ? `<a class="modal-source" href="${escapeHTML(primarySource)}" target="_blank" rel="noopener noreferrer">Consultar fuente principal ↗</a>` : ""}
            ${additionalSourceLinks(restaurant.additionalSources)}
          </div>
        </section>
      </div>
    `;
  }

  function formatDate(dateString) {
    if (!dateString) return "fecha no informada";
    const [year, month, day] = dateString.split("-");
    return `${day}.${month}.${year}`;
  }

  function renderModal() {
    const index = state.visibleRestaurants.findIndex((item) => item.id === state.modalId);
    if (index < 0) return;

    const restaurant = state.visibleRestaurants[index];
    const total = state.visibleRestaurants.length;
    const previous = state.visibleRestaurants[(index - 1 + total) % total];
    const next = state.visibleRestaurants[(index + 1) % total];

    elements.modalContent.innerHTML = buildModalContent(restaurant);
    elements.modalPosition.textContent = `Ficha ${index + 1} de ${total}`;
    elements.modalPrevName.textContent = previous?.name ?? "";
    elements.modalNextName.textContent = next?.name ?? "";
    elements.modalPrev.disabled = total < 2;
    elements.modalNext.disabled = total < 2;
    elements.modalPrev.setAttribute(
      "aria-label",
      previous ? `Ver cocinería anterior: ${previous.name}` : "No hay cocinería anterior",
    );
    elements.modalNext.setAttribute(
      "aria-label",
      next ? `Ver cocinería siguiente: ${next.name}` : "No hay cocinería siguiente",
    );
    elements.dialog.querySelector(".dialog-scroll").scrollTo({ top: 0, behavior: "auto" });
  }

  function openModal(id, trigger) {
    if (!state.visibleRestaurants.some((item) => item.id === id)) return;
    state.modalId = id;
    state.lastFocused = trigger ?? document.activeElement;
    renderModal();
    elements.dialog.showModal();
    document.body.classList.add("modal-open");
    requestAnimationFrame(() => {
      elements.dialog.querySelector(".dialog-scroll").scrollTo({ top: 0, behavior: "auto" });
      elements.modalClose.focus();
    });
  }

  function closeModal() {
    if (elements.dialog.open) elements.dialog.close();
  }

  function finaliseModalClose() {
    document.body.classList.remove("modal-open");
    state.modalId = null;
    if (state.lastFocused && document.contains(state.lastFocused)) {
      state.lastFocused.focus();
    }
    state.lastFocused = null;
  }

  function navigateModal(direction) {
    const total = state.visibleRestaurants.length;
    if (total < 2) return;
    const currentIndex = state.visibleRestaurants.findIndex((item) => item.id === state.modalId);
    const nextIndex = (currentIndex + direction + total) % total;
    state.modalId = state.visibleRestaurants[nextIndex].id;
    renderModal();
    elements.modalClose.focus();
  }

  function setCarouselSlide(index, { announce = true } = {}) {
    const total = elements.aboutSlides.length;
    if (!total) return;
    state.carouselIndex = (index + total) % total;
    elements.aboutSlides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === state.carouselIndex;
      slide.classList.toggle("is-active", isActive);
      slide.setAttribute("aria-hidden", String(!isActive));
    });
    elements.aboutCarouselIndicators.querySelectorAll("[data-carousel-index]").forEach((indicator) => {
      const isActive = Number(indicator.dataset.carouselIndex) === state.carouselIndex;
      if (isActive) indicator.setAttribute("aria-current", "true");
      else indicator.removeAttribute("aria-current");
    });
    if (announce) {
      elements.aboutCarouselStatus.textContent = `Contenido ${state.carouselIndex + 1} de ${total}`;
    }
  }

  function navigateCarousel(direction, { announce = true } = {}) {
    setCarouselSlide(state.carouselIndex + direction, { announce });
  }

  function stopCarouselAutoplay() {
    if (!carouselAutoplayTimer) return;
    window.clearTimeout(carouselAutoplayTimer);
    carouselAutoplayTimer = 0;
  }

  function canAutoplayCarousel() {
    return (
      elements.aboutSlides.length > 1 &&
      !reducedMotionQuery.matches &&
      document.visibilityState === "visible" &&
      !elements.aboutCarousel.matches(":hover") &&
      !elements.aboutCarousel.contains(document.activeElement)
    );
  }

  function scheduleCarouselAutoplay() {
    stopCarouselAutoplay();
    if (!canAutoplayCarousel()) return;
    carouselAutoplayTimer = window.setTimeout(() => {
      carouselAutoplayTimer = 0;
      navigateCarousel(1, { announce: false });
      scheduleCarouselAutoplay();
    }, CAROUSEL_AUTOPLAY_DELAY);
  }

  function navigateCarouselManually(direction) {
    stopCarouselAutoplay();
    navigateCarousel(direction);
    scheduleCarouselAutoplay();
  }

  function selectCarouselSlideManually(index) {
    stopCarouselAutoplay();
    setCarouselSlide(index);
    scheduleCarouselAutoplay();
  }

  function openFilters() {
    if (state.filtersOpen) return;
    state.filtersOpen = true;
    elements.filterToggle.setAttribute("aria-expanded", "true");
    elements.filtersBackdrop.hidden = false;
    document.body.classList.add("filters-open");
    requestAnimationFrame(() => elements.filtersClose.focus());
  }

  function closeFilters({ returnFocus = true } = {}) {
    if (!state.filtersOpen) return;
    state.filtersOpen = false;
    elements.filterToggle.setAttribute("aria-expanded", "false");
    elements.filtersBackdrop.hidden = true;
    document.body.classList.remove("filters-open");
    if (returnFocus) elements.filterToggle.focus();
  }

  function bindEvents() {
    elements.searchForm.addEventListener("submit", (event) => {
      event.preventDefault();
      closeSearchSuggestions();
    });
    elements.searchInput.addEventListener("input", (event) => {
      state.selectedSearchId = null;
      state.query = event.target.value.trim();
      applyFilters();
      renderSearchSuggestions();
    });
    elements.searchInput.addEventListener("focus", () => {
      if (elements.searchInput.value.trim()) renderSearchSuggestions();
    });
    elements.searchInput.addEventListener("keydown", handleSearchKeydown);
    elements.searchClear.addEventListener("click", () => {
      state.query = "";
      state.selectedSearchId = null;
      elements.searchInput.value = "";
      applyFilters();
      closeSearchSuggestions();
      elements.searchInput.focus();
    });
    elements.searchSuggestions.addEventListener("pointerdown", (event) => {
      if (event.target.closest(".search-suggestion")) event.preventDefault();
    });
    elements.searchSuggestions.addEventListener("click", (event) => {
      const suggestion = event.target.closest(".search-suggestion");
      if (suggestion) selectSearchSuggestion(suggestion);
    });
    document.addEventListener("pointerdown", (event) => {
      if (!elements.searchForm.contains(event.target)) closeSearchSuggestions();
    });
    elements.regionFilterToggle.addEventListener("click", () => {
      toggleFilterSection(elements.regionFilterToggle, elements.regionFilters);
    });
    elements.foodFilterToggle.addEventListener("click", () => {
      toggleFilterSection(elements.foodFilterToggle, elements.foodFilters);
    });
    elements.priceFilterToggle.addEventListener("click", () => {
      toggleFilterSection(elements.priceFilterToggle, elements.priceFilters);
    });
    elements.amenityFilterToggle.addEventListener("click", () => {
      toggleFilterSection(elements.amenityFilterToggle, elements.amenityFilters);
    });
    elements.filtersPanel.addEventListener("click", (event) => {
      const option = event.target.closest(".filter-option");
      if (option) handleFilterOption(option);
    });
    elements.resetFilters.addEventListener("click", clearFiltersAndReturnToDirectory);
    elements.emptyReset.addEventListener("click", () => {
      resetFilterControls({ includeSearch: true });
      elements.searchInput.focus();
    });
    elements.restaurantList.addEventListener("click", (event) => {
      const button = event.target.closest("[data-restaurant-id]");
      if (button) openModal(button.dataset.restaurantId, button);
    });
    elements.pagination.addEventListener("click", (event) => {
      const pageButton = event.target.closest("[data-page]");
      if (pageButton) {
        goToPage(Number(pageButton.dataset.page));
        return;
      }
      if (event.target.closest("#pagination-prev")) goToPage(state.currentPage - 1);
      if (event.target.closest("#pagination-next")) goToPage(state.currentPage + 1);
    });

    elements.aboutCarouselIndicators.addEventListener("click", (event) => {
      const indicator = event.target.closest("[data-carousel-index]");
      if (indicator) selectCarouselSlideManually(Number(indicator.dataset.carouselIndex));
    });
    elements.aboutCarousel.addEventListener("mouseenter", stopCarouselAutoplay);
    elements.aboutCarousel.addEventListener("mouseleave", scheduleCarouselAutoplay);
    elements.aboutCarousel.addEventListener("focusin", stopCarouselAutoplay);
    elements.aboutCarousel.addEventListener("focusout", () => {
      window.requestAnimationFrame(scheduleCarouselAutoplay);
    });
    elements.aboutCarousel.addEventListener("keydown", (event) => {
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        navigateCarouselManually(-1);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        navigateCarouselManually(1);
      }
    });
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") scheduleCarouselAutoplay();
      else stopCarouselAutoplay();
    });
    reducedMotionQuery.addEventListener("change", () => {
      if (reducedMotionQuery.matches) stopCarouselAutoplay();
      else scheduleCarouselAutoplay();
    });

    elements.modalClose.addEventListener("click", closeModal);
    elements.modalPrev.addEventListener("click", () => navigateModal(-1));
    elements.modalNext.addEventListener("click", () => navigateModal(1));
    elements.dialog.addEventListener("cancel", (event) => {
      event.preventDefault();
      closeModal();
    });
    elements.dialog.addEventListener("close", finaliseModalClose);
    elements.dialog.addEventListener("click", (event) => {
      if (event.target === elements.dialog) closeModal();
    });
    elements.dialog.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft" && !event.altKey && !event.metaKey && !event.ctrlKey) {
        event.preventDefault();
        navigateModal(-1);
      }
      if (event.key === "ArrowRight" && !event.altKey && !event.metaKey && !event.ctrlKey) {
        event.preventDefault();
        navigateModal(1);
      }
    });

    elements.filterToggle.addEventListener("click", openFilters);
    elements.filtersClose.addEventListener("click", () => closeFilters());
    elements.filtersApply.addEventListener("click", () => closeFilters());
    elements.filtersBackdrop.addEventListener("click", () => closeFilters());
    document.addEventListener("keydown", (event) => {
      if (event.defaultPrevented || event.key !== "Escape") return;
      if (elements.dialog.open) {
        event.preventDefault();
        closeModal();
      } else if (state.filtersOpen) {
        closeFilters();
      }
    });
    window.addEventListener("resize", () => {
      updateStickyOffsets();
      initialiseNavbarSurfaceObserver();
      if (window.innerWidth > 720 && state.filtersOpen) closeFilters({ returnFocus: false });
    });
    window.addEventListener("scroll", requestListHeaderStickyUpdate, { passive: true });
  }

  function initialise() {
    initialiseSocialLinks();
    updateStickyOffsets();
    initialiseNavbarSurfaceObserver();
    if (!restaurants.length) {
      elements.resultsCount.textContent = "No fue posible cargar el directorio.";
      elements.emptyState.hidden = false;
      return;
    }
    initialiseFilters();
    bindEvents();
    applyFilters();
    setCarouselSlide(0, { announce: false });
    scheduleCarouselAutoplay();
  }

  initialise();
})();
