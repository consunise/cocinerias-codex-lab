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
  const INITIAL_RESULT_LIMIT = 10;
  const restaurants = sourceRestaurants.map((restaurant, index) => ({
    ...restaurant,
    displayPriceCategory: PRICE_PROTOTYPE.enabled
      ? PRICE_PROTOTYPE.assignBand(restaurant, index)
      : restaurant.priceCategory,
    priceIsSimulated: PRICE_PROTOTYPE.enabled,
  }));

  // PLACEHOLDERS DE REDES: reemplazar por las URLs reales cuando estén disponibles.
  const SOCIAL_LINKS = {
    whatsapp: "", // Ejemplo futuro: https://wa.me/569XXXXXXXX
    instagram: "", // Ejemplo futuro: https://www.instagram.com/USUARIO
  };

  const elements = {
    directory: document.querySelector(".directory"),
    searchForm: document.querySelector("#search-form"),
    searchInput: document.querySelector("#search-input"),
    searchClear: document.querySelector("#search-clear"),
    regionFilter: document.querySelector("#region-filter"),
    foodFilters: document.querySelector("#food-filters"),
    priceFilters: document.querySelector("#price-filters"),
    resetFilters: document.querySelector("#reset-filters"),
    resultsCount: document.querySelector("#results-count"),
    activeSummary: document.querySelector("#active-summary"),
    restaurantList: document.querySelector("#restaurant-list"),
    loadMore: document.querySelector("#load-more"),
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
    listExpanded: false,
  };

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
      "Comida chilena": '<path d="M5 10h14v2a7 7 0 0 1-14 0v-2Z"></path><path d="M8 7.5c0-1 1-1.4 1-2.5M12 7.5c0-1 1-1.4 1-2.5M16 7.5c0-1 1-1.4 1-2.5"></path>',
      "Cocina casera": '<path d="M5 10h14v7H5zM3.5 12h1.5M19 12h1.5M8 8h8M10 6h4"></path>',
      Pescados: '<path d="M4 12c3-4 7-5 11-2l3-3v10l-3-3c-4 3-8 2-11-2Z"></path><circle class="icon-fill" cx="12.5" cy="11" r=".8"></circle>',
      Mariscos: '<path d="M8 11c-2-2-3-1-4 0M16 11c2-2 3-1 4 0M8 15c-2 2-3 2-4 1M16 15c2 2 3 2 4 1M9 9c0-2 1-3 3-3s3 1 3 3v6c0 2-1 3-3 3s-3-1-3-3V9Z"></path><path d="M9 12h6M10 6 8 4M14 6l2-2"></path>',
      "Cocina marina": '<path d="M3 10c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 2-2M3 15c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 2-2"></path>',
      Mapuche: '<circle cx="12" cy="12" r="3.5"></circle><path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l3 3M16 16l3 3M19 5l-3 3M8 16l-3 3"></path>',
      Carnes: '<path d="M7 6c4-3 10 0 11 4 1 4-3 8-8 8-4 0-6-3-5-6 .4-1.3 1.5-2 2-3 .4-.8-.4-1.8 0-3Z"></path><circle cx="10" cy="12" r="2"></circle>',
      Jugos: '<path d="M7 8h10l-1 12H8L7 8ZM9 4h7l-3 4"></path>',
      Sándwiches: '<path d="M5 10c0-3 3-5 7-5s7 2 7 5H5ZM5 14h14v3H5zM6 10l2 4 4-4 4 4 2-4"></path>',
      "Al paso": '<path d="M6 7h12l-1 14H7L6 7ZM9 7V5a3 3 0 0 1 6 0v2"></path>',
      Chilota: '<path d="M4 15c4-1 4-6 8-6s4 5 8 6M6 18h12M9 9V5h6v4"></path>',
      Patagónica: '<path d="m3 19 6-10 3 5 3-8 6 13H3Z"></path>',
      Magallánica: '<path d="m3 19 6-10 3 5 3-8 6 13H3Z"></path><path d="M5 5h4M7 3v4"></path>',
      Campesina: '<path d="M4 19h16M5 16c4-4 10-4 14 0M12 16V5M12 8c-3 0-4-1-5-3 3 0 4 1 5 3ZM12 11c3 0 4-1 5-3-3 0-4 1-5 3Z"></path>',
      Pastas: '<path d="M4 12h16a8 8 0 0 1-16 0ZM8 9c0-2 1-2 1-4M12 9c0-2 1-2 1-4M16 9c0-2 1-2 1-4"></path>',
      "Opciones vegetales": '<path d="M19 4C11 4 6 8 6 14c0 3 2 5 5 5 6 0 8-7 8-15Z"></path><path d="M5 20c2-5 5-8 10-11"></path>',
      "Sin clasificación culinaria": '<circle cx="12" cy="12" r="7"></circle><path d="M8.5 12h7"></path>',
    };
    return `<svg class="food-icon" viewBox="0 0 24 24" aria-hidden="true">${iconPaths[category] ?? iconPaths["Sin clasificación culinaria"]}</svg>`;
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
            <span class="option-label">${escapeHTML(value)}</span>
            <span class="option-count">${counts.get(value)}</span>
          </button>
        `,
      )
      .join("");
  }

  function initialiseFilters() {
    const regions = [...new Set(restaurants.map((item) => item.region).filter(Boolean))].sort(
      (a, b) => a.localeCompare(b, "es"),
    );
    elements.regionFilter.insertAdjacentHTML(
      "beforeend",
      regions
        .map((region) => `<option value="${escapeHTML(region)}">${escapeHTML(region)}</option>`)
        .join(""),
    );

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

  function hasAnyActiveState() {
    return Boolean(state.query || getActiveFilterCount());
  }

  function applyFilters({ resetExpansion = true } = {}) {
    if (resetExpansion) state.listExpanded = false;
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

  function restaurantRow(restaurant) {
    const isActive = restaurant.status === "Activa";

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
              <span class="restaurant-location">${escapeHTML(formatLocation(restaurant, true))}</span>
              <span class="restaurant-meta">
                <span class="status-label ${isActive ? "is-active" : ""}">${escapeHTML(restaurant.status)}</span>
                <span class="id-label">${escapeHTML(restaurant.id)}</span>
              </span>
            </span>
          </span>
          <span class="restaurant-cuisine">${foodCategoryList(restaurant.foodCategories)}</span>
          <span class="restaurant-price">
            <span>${escapeHTML(formatPrice(restaurant.displayPriceCategory))}</span>
            ${restaurant.priceIsSimulated ? "<small>Dato simulado</small>" : ""}
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
    const listedRestaurants = state.listExpanded
      ? state.visibleRestaurants
      : state.visibleRestaurants.slice(0, INITIAL_RESULT_LIMIT);

    elements.restaurantList.innerHTML = listedRestaurants.map(restaurantRow).join("");
    elements.restaurantList.hidden = visibleCount === 0;
    elements.emptyState.hidden = visibleCount !== 0;
    elements.loadMore.hidden = visibleCount <= INITIAL_RESULT_LIMIT;
    elements.loadMore.textContent = state.listExpanded
      ? "Ver menos"
      : "Ver más cocinerías";
    elements.loadMore.setAttribute("aria-expanded", String(state.listExpanded));

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
    elements.directory.dataset.state = visibleCount
      ? isSearching
        ? "searching"
        : isFiltered
          ? "filtered"
          : "default"
      : "empty";
  }

  function setPressedState(button, isPressed) {
    button.setAttribute("aria-pressed", String(isPressed));
  }

  function handleFilterOption(button) {
    const group = button.dataset.filterGroup;
    const value = button.dataset.filterValue;
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
    elements.regionFilter.value = "";
    document.querySelectorAll(".filter-option[aria-pressed='true']").forEach((button) => {
      setPressedState(button, false);
    });

    if (includeSearch) {
      state.query = "";
      elements.searchInput.value = "";
    }
    applyFilters();
  }

  function toggleListExpansion() {
    const isCollapsing = state.listExpanded;
    state.listExpanded = !state.listExpanded;
    renderDirectory();

    if (!isCollapsing) return;
    requestAnimationFrame(() => {
      elements.loadMore.focus({ preventScroll: true });
      const headerHeight = document.querySelector(".site-header")?.offsetHeight ?? 0;
      const toolbarTop =
        document.querySelector(".results-toolbar").getBoundingClientRect().top + window.scrollY;
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({
        top: Math.max(0, toolbarTop - headerHeight - 16),
        behavior: reducedMotion ? "auto" : "smooth",
      });
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

  function buildModalContent(restaurant) {
    const primarySource = safeUrl(restaurant.primarySource);
    const website = safeUrl(restaurant.website);
    const map = safeUrl(restaurant.googleMaps);
    const addressParts = [restaurant.address, restaurant.venue].filter(Boolean);
    const socialDetails = [restaurant.instagram, restaurant.facebook, restaurant.otherNetworks].filter(Boolean);
    const currentPrice = restaurant.priceIsSimulated
      ? `${escapeHTML(restaurant.displayPriceCategory)}<br><small>Dato simulado para prototipo</small>`
      : escapeHTML(restaurant.priceRange ?? restaurant.displayPriceCategory ?? "No informado");
    const statusClass = restaurant.status === "Activa" ? "" : "is-unconfirmed";

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
          ${factBlock("Horario", escapeHTML(restaurant.hours ?? "No informado"))}
          ${factBlock("Precio", currentPrice)}
          ${factBlock("Servicios", escapeHTML(restaurant.services ?? "No informado"))}
          ${factBlock("Contacto", contactContent(restaurant))}
          ${factBlock("Métodos de pago", escapeHTML(restaurant.paymentMethods ?? "No informado"))}
          ${factBlock("Accesibilidad", escapeHTML(restaurant.accessibility ?? "No informado"))}
          ${website ? factBlock("Sitio web", `<a href="${escapeHTML(website)}" target="_blank" rel="noopener noreferrer">Visitar sitio ↗</a>`) : ""}
          ${map ? factBlock("Mapa", `<a href="${escapeHTML(map)}" target="_blank" rel="noopener noreferrer">Ver ubicación ↗</a>`) : ""}
          ${restaurant.founded ? factBlock("Año de fundación", escapeHTML(restaurant.founded)) : ""}
          ${restaurant.owner ? factBlock("Responsable", escapeHTML(restaurant.owner)) : ""}
          ${socialDetails.length ? factBlock("Redes", escapeHTML(socialDetails.join(" · "))) : ""}
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
    elements.regionFilter.addEventListener("change", (event) => {
      state.region = event.target.value;
      applyFilters();
    });
    elements.filtersPanel.addEventListener("click", (event) => {
      const option = event.target.closest(".filter-option");
      if (option) handleFilterOption(option);
    });
    elements.resetFilters.addEventListener("click", () => resetFilterControls());
    elements.emptyReset.addEventListener("click", () => {
      resetFilterControls({ includeSearch: true });
      elements.searchInput.focus();
    });
    elements.restaurantList.addEventListener("click", (event) => {
      const button = event.target.closest("[data-restaurant-id]");
      if (button) openModal(button.dataset.restaurantId, button);
    });
    elements.loadMore.addEventListener("click", toggleListExpansion);

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
      if (window.innerWidth > 720 && state.filtersOpen) closeFilters({ returnFocus: false });
    });
  }

  function initialise() {
    initialiseSocialLinks();
    if (!restaurants.length) {
      elements.resultsCount.textContent = "No fue posible cargar el directorio.";
      elements.emptyState.hidden = false;
      return;
    }
    initialiseFilters();
    bindEvents();
    applyFilters();
  }

  initialise();
})();
