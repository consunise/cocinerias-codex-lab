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
  const restaurants = sourceRestaurants.map((restaurant, index) => {
    const usesPlaceholderHours = HOURS_PLACEHOLDER_PROTOTYPE.enabled && !restaurant.hours;
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
    resultsArea: document.querySelector(".results-area"),
    listHeader: document.querySelector(".list-header"),
    searchForm: document.querySelector("#search-form"),
    searchInput: document.querySelector("#search-input"),
    searchClear: document.querySelector("#search-clear"),
    regionFilters: document.querySelector("#region-filters"),
    regionFilterToggle: document.querySelector("#region-filter-toggle"),
    regionFilterCount: document.querySelector("#region-filter-count"),
    foodFilters: document.querySelector("#food-filters"),
    priceFilters: document.querySelector("#price-filters"),
    foodFilterToggle: document.querySelector("#food-filter-toggle"),
    priceFilterToggle: document.querySelector("#price-filter-toggle"),
    foodFilterCount: document.querySelector("#food-filter-count"),
    priceFilterCount: document.querySelector("#price-filter-count"),
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
    aboutCarouselPrev: document.querySelector("#about-carousel-prev"),
    aboutCarouselNext: document.querySelector("#about-carousel-next"),
    aboutCarouselIndicators: document.querySelector("#about-carousel-indicators"),
    aboutCarouselStatus: document.querySelector("#about-carousel-status"),
  };

  const state = {
    query: "",
    region: "",
    foods: new Set(),
    prices: new Set(),
    visibleRestaurants: [...restaurants],
    modalId: null,
    lastFocused: null,
    filtersOpen: false,
    currentPage: 1,
    carouselIndex: 0,
  };
  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  let carouselAutoplayTimer = 0;

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
    "Sin clasificación culinaria",
  ];
  const priceOrder = PRICE_PROTOTYPE.enabled
    ? [...PRICE_PROTOTYPE.bands]
    : ["Económico", "Precio medio", "No informado"];
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
      "Sin clasificación culinaria": '<circle class="icon-fillable" cx="12" cy="12" r="7"></circle><path class="icon-detail" d="M8.5 12h7"></path>',
    };
    const iconClasses = ["food-icon"];
    if (category === "Comida chilena") iconClasses.push("chile-flag");
    if (["Pescados", "Mariscos", "Opciones vegetales"].includes(category)) {
      iconClasses.push("preserve-hover-outline");
    }
    return `<svg class="${iconClasses.join(" ")}" viewBox="0 0 24 24" aria-hidden="true">${iconPaths[category] ?? iconPaths["Sin clasificación culinaria"]}</svg>`;
  }

  function foodCategoryList(categories) {
    return `
      <ul class="food-type-list" aria-label="Tipos de comida">
        ${categories
          .map(
            (category) => `
              <li class="food-type-item">
                ${foodIcon(category)}
                <span>${escapeHTML(category)}</span>
              </li>
            `,
          )
          .join("")}
      </ul>
    `;
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
    container.innerHTML = values
      .filter((value) => counts.has(value))
      .map(
        (value) => `
          <button
            class="filter-option"
            type="button"
            data-filter-group="${group}"
            data-filter-value="${escapeHTML(value)}"
            aria-pressed="false"
          >
            <span class="option-label${includeFoodIcon ? " option-label--food" : ""}">
              ${includeFoodIcon ? foodIcon(value) : ""}
              <span>${escapeHTML(value)}</span>
            </span>
            <span class="option-count">${counts.get(value)}</span>
          </button>
        `,
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
    const regions = [...orderedRegions, ...unconfiguredRegions];
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
          ({ code, value }) => `
            <button
              class="filter-option"
              type="button"
              data-filter-group="region"
              data-filter-value="${escapeHTML(value)}"
              aria-pressed="false"
            >
              <span class="option-label"><span class="region-code">${escapeHTML(code)} —</span> ${escapeHTML(value)}</span>
              <span class="option-count">${regionCounts.get(value) ?? 0}</span>
            </button>
          `,
        )
        .join("")}
    `;

    renderFilterOptions(
      elements.foodFilters,
      foodOrder,
      countBy(restaurants, (item) => item.foodCategories),
      "foods",
    );
    renderFilterOptions(
      elements.priceFilters,
      priceOrder,
      countBy(restaurants, (item) => item.displayPriceCategory),
      "prices",
    );
  }

  function getActiveFilterCount() {
    return (state.region ? 1 : 0) + state.foods.size + state.prices.size;
  }

  function updateFilterDisclosureState() {
    [
      [elements.regionFilterToggle, elements.regionFilterCount, state.region ? 1 : 0],
      [elements.foodFilterToggle, elements.foodFilterCount, state.foods.size],
      [elements.priceFilterToggle, elements.priceFilterCount, state.prices.size],
    ].forEach(([toggle, countElement, count]) => {
      countElement.hidden = count === 0;
      countElement.textContent = count ? `· ${count}` : "";
      toggle.classList.toggle("has-active-filters", count > 0);
    });
  }

  function filterSections() {
    return [
      [elements.regionFilterToggle, elements.regionFilters],
      [elements.foodFilterToggle, elements.foodFilters],
      [elements.priceFilterToggle, elements.priceFilters],
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
      const matchesName = !normalizedQuery || searchableName.includes(normalizedQuery);
      const matchesRegion = !state.region || restaurant.region === state.region;
      const matchesFood =
        !state.foods.size ||
        restaurant.foodCategories.some((category) => state.foods.has(category));
      const matchesPrice =
        !state.prices.size || state.prices.has(restaurant.displayPriceCategory);

      return matchesName && matchesRegion && matchesFood && matchesPrice;
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
              <span class="restaurant-name">${escapeHTML(restaurant.name)}</span>
              <span class="restaurant-meta">
                <span class="restaurant-hours${hoursClass}" data-hours-source="${escapeHTML(restaurant.hoursSource ?? "unavailable")}">${escapeHTML(hours)}</span>
                <span class="restaurant-location">${escapeHTML(formatLocation(restaurant, true))}</span>
              </span>
            </span>
          </span>
          <span class="restaurant-cuisine">${foodCategoryList(restaurant.foodCategories)}</span>
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
    if (state.region) summary.push(state.region);
    if (state.foods.size) summary.push([...state.foods].join(", "));
    if (state.prices.size) summary.push([...state.prices].join(", "));
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

  function handleFilterOption(button) {
    const group = button.dataset.filterGroup;
    const value = button.dataset.filterValue;
    if (group === "region") {
      state.region = value;
      elements.regionFilters.querySelectorAll(".filter-option").forEach((regionButton) => {
        setPressedState(regionButton, regionButton === button);
      });
      applyFilters();
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
    document.querySelectorAll(".filter-option[aria-pressed='true']").forEach((button) => {
      setPressedState(button, false);
    });
    const allRegionsButton = elements.regionFilters.querySelector('[data-filter-value=""]');
    if (allRegionsButton) setPressedState(allRegionsButton, true);
    closeFilterSections();

    if (includeSearch) {
      state.query = "";
      elements.searchInput.value = "";
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

  function factBlock(label, content) {
    return `
      <div class="modal-fact">
        <span class="fact-label">${escapeHTML(label)}</span>
        <p>${content}</p>
      </div>
    `;
  }

  function contactContent(restaurant) {
    const details = [];
    if (restaurant.phone) {
      const phones = restaurant.phone.split(";").map((phone) => phone.trim());
      details.push(
        phones
          .map((phone) => {
            const tel = phone.replace(/[^+\d]/g, "");
            return `<a href="tel:${escapeHTML(tel)}">${escapeHTML(phone)}</a>`;
          })
          .join("<br>"),
      );
    }
    if (restaurant.whatsapp && restaurant.whatsapp !== restaurant.phone) {
      details.push(`WhatsApp: ${escapeHTML(restaurant.whatsapp)}`);
    }
    if (restaurant.email) {
      details.push(`<a href="mailto:${escapeHTML(restaurant.email)}">${escapeHTML(restaurant.email)}</a>`);
    }
    return details.length ? details.join("<br>") : "No informado";
  }

  function visitFeatureBlock(feature) {
    return `
      <div class="visit-feature ${feature.informed ? "is-informed" : ""}">
        <span class="fact-label">${escapeHTML(feature.label)}</span>
        <strong>${escapeHTML(feature.status)}</strong>
        ${feature.detail ? `<p>${escapeHTML(feature.detail)}</p>` : ""}
      </div>
    `;
  }

  function buildModalContent(restaurant) {
    const primarySource = safeUrl(restaurant.primarySource);
    const website = safeUrl(restaurant.website);
    const map = safeUrl(restaurant.googleMaps);
    const addressParts = [restaurant.address, restaurant.venue].filter(Boolean);
    const socialDetails = [restaurant.instagram, restaurant.facebook, restaurant.otherNetworks].filter(Boolean);
    const currentPrice = restaurant.priceIsSimulated
      ? escapeHTML(restaurant.displayPriceCategory)
      : escapeHTML(restaurant.priceRange ?? restaurant.displayPriceCategory ?? "No informado");
    const statusClass = restaurant.status === "Activa" ? "" : "is-unconfirmed";
    const hoursContent = restaurant.displayHours
      ? `${escapeHTML(restaurant.displayHours)}${restaurant.hoursIsPlaceholder ? '<span class="placeholder-data-note">Horario referencial de maqueta</span>' : ""}`
      : "No informado";

    return `
      <div class="modal-topline">
        <span class="modal-status ${statusClass}">${escapeHTML(restaurant.status)}</span>
        <span class="modal-confidence">Confianza ${escapeHTML(restaurant.confidence?.toLowerCase() ?? "no informada")}</span>
        <span class="modal-confidence">${escapeHTML(restaurant.id)}</span>
      </div>

      <h2 id="modal-title">${escapeHTML(restaurant.name)}</h2>
      ${restaurant.alternateName ? `<p class="modal-alternate">También registrado como ${escapeHTML(restaurant.alternateName)}</p>` : ""}

      <div class="modal-location">
        <p><span class="fact-label">Ubicación</span>${escapeHTML(formatLocation(restaurant))}</p>
        <p><span class="fact-label">Dirección / recinto</span>${escapeHTML(addressParts.join(" · ") || "No informado")}</p>
      </div>

      <p class="modal-description" id="modal-description">${escapeHTML(restaurant.description ?? "Descripción no informada.")}</p>

      <section class="modal-section" aria-labelledby="modal-food-title">
        <h3 id="modal-food-title">La cocina</h3>
        <div class="modal-food-grid">
          <p><span class="fact-label">Tipo de cocina</span>${escapeHTML(restaurant.cuisine ?? "No informado")}</p>
          <p><span class="fact-label">Especialidades</span>${escapeHTML(restaurant.specialties ?? "No informado")}</p>
        </div>
      </section>

      <section class="modal-section" aria-labelledby="modal-practical-title">
        <h3 id="modal-practical-title">Información práctica</h3>
        <div class="modal-facts">
          ${factBlock("Horario", hoursContent)}
          ${factBlock("Precio", currentPrice)}
          ${factBlock("Servicios", escapeHTML(restaurant.services ?? "No informado"))}
          ${factBlock("Contacto", contactContent(restaurant))}
          ${factBlock("Métodos de pago", escapeHTML(restaurant.paymentMethods ?? "No informado"))}
          ${website ? factBlock("Sitio web", `<a href="${escapeHTML(website)}" target="_blank" rel="noopener noreferrer">Visitar sitio ↗</a>`) : ""}
          ${map ? factBlock("Mapa", `<a href="${escapeHTML(map)}" target="_blank" rel="noopener noreferrer">Ver ubicación ↗</a>`) : ""}
          ${restaurant.founded ? factBlock("Año de fundación", escapeHTML(restaurant.founded)) : ""}
          ${restaurant.owner ? factBlock("Responsable", escapeHTML(restaurant.owner)) : ""}
          ${socialDetails.length ? factBlock("Redes", escapeHTML(socialDetails.join(" · "))) : ""}
        </div>
      </section>

      <section class="modal-section" aria-labelledby="modal-visit-title">
        <h3 id="modal-visit-title">Antes de ir</h3>
        <div class="visit-features">
          ${restaurant.visitFeatures.map(visitFeatureBlock).join("")}
        </div>
      </section>

      <section class="modal-section" aria-labelledby="modal-record-title">
        <h3 id="modal-record-title">Sobre este registro</h3>
        <p class="modal-note">
          <strong>${escapeHTML(restaurant.classification)}</strong><br>
          ${escapeHTML(restaurant.notes ?? "Sin observaciones adicionales.")}<br>
          Verificado el ${escapeHTML(formatDate(restaurant.verifiedAt))}.
        </p>
        ${primarySource ? `<a class="modal-source" href="${escapeHTML(primarySource)}" target="_blank" rel="noopener noreferrer">Consultar fuente principal ↗</a>` : ""}
      </section>
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
    elements.dialog.querySelector(".dialog-scroll").scrollTop = 0;
  }

  function openModal(id, trigger) {
    if (!state.visibleRestaurants.some((item) => item.id === id)) return;
    state.modalId = id;
    state.lastFocused = trigger ?? document.activeElement;
    renderModal();
    elements.dialog.showModal();
    document.body.classList.add("modal-open");
    requestAnimationFrame(() => elements.modalClose.focus());
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
      elements.aboutCarouselStatus.textContent = `Fotografía ${state.carouselIndex + 1} de ${total}`;
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
    elements.searchForm.addEventListener("submit", (event) => event.preventDefault());
    elements.searchInput.addEventListener("input", (event) => {
      state.query = event.target.value.trim();
      applyFilters();
    });
    elements.searchClear.addEventListener("click", () => {
      state.query = "";
      elements.searchInput.value = "";
      applyFilters();
      elements.searchInput.focus();
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

    elements.aboutCarouselPrev.addEventListener("click", () => navigateCarouselManually(-1));
    elements.aboutCarouselNext.addEventListener("click", () => navigateCarouselManually(1));
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
      if (event.key !== "Escape") return;
      if (elements.dialog.open) {
        event.preventDefault();
        closeModal();
      } else if (state.filtersOpen) {
        closeFilters();
      }
    });
    window.addEventListener("resize", () => {
      updateStickyOffsets();
      if (window.innerWidth > 720 && state.filtersOpen) closeFilters({ returnFocus: false });
    });
    window.addEventListener("scroll", requestListHeaderStickyUpdate, { passive: true });
  }

  function initialise() {
    initialiseSocialLinks();
    updateStickyOffsets();
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
