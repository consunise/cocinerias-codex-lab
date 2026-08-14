import { createHash } from "node:crypto";
import {
  copyFile,
  mkdir,
  access,
  readFile,
  readdir,
  rm,
  stat,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const imageDirectory = resolve(projectRoot, "assets/images/cocinerias");
const dataPath = resolve(projectRoot, "data.js");

const regionConfig = {
  Tarapacá: {
    key: "tarapaca",
    categories: ["Tarapacá Region", "Landscapes of Tarapacá Region", "Iquique"],
    searches: ["Tarapacá Chile landscape", "Pica Chile oasis", "Iquique architecture"],
  },
  Antofagasta: {
    key: "antofagasta",
    categories: ["Antofagasta Region", "Landscapes of Antofagasta Region", "San Pedro de Atacama"],
    searches: ["Antofagasta Chile landscape", "San Pedro de Atacama landscape", "Calama Chile architecture"],
  },
  Atacama: {
    key: "atacama",
    categories: ["Atacama Region", "Landscapes of Atacama Region", "Caldera, Chile"],
    searches: ["Atacama Chile landscape", "Caldera Chile coast", "Copiapó Chile architecture"],
  },
  Coquimbo: {
    key: "coquimbo",
    categories: ["Coquimbo Region", "Landscapes of Coquimbo Region", "Coquimbo, Chile"],
    searches: ["Coquimbo Chile landscape", "Ovalle Chile landscape", "Coquimbo Chile architecture"],
  },
  Valparaíso: {
    key: "valparaiso",
    categories: ["Valparaíso Region", "Architecture of Valparaíso", "Valparaíso, Chile"],
    searches: ["Valparaíso Chile architecture", "Valparaíso Chile landscape", "Quilpué Chile landscape"],
  },
  "Metropolitana de Santiago": {
    key: "metropolitana",
    categories: ["Santiago Metropolitan Region", "Architecture of Santiago, Chile", "Santiago, Chile"],
    searches: ["Santiago Chile architecture", "Santiago Chile landscape", "Metropolitan Region Chile landscape"],
  },
  "Libertador General Bernardo O'Higgins": {
    key: "ohiggins",
    target: 10,
    categories: [
      "O'Higgins Region",
      "Landscapes of O'Higgins Region",
      "Pichilemu",
      "Beaches of Pichilemu",
    ],
    searches: [
      "O'Higgins Chile landscape",
      "Pichilemu Chile landscape",
      "Rancagua Chile architecture",
      "Colchagua Chile landscape",
      "Cachapoal Chile landscape",
    ],
  },
  Maule: {
    key: "maule",
    categories: ["Maule Region", "Landscapes of Maule Region", "Constitución, Chile"],
    searches: ["Maule Chile landscape", "Constitución Chile coast", "Talca Chile architecture", "Curicó Chile landscape"],
  },
  Ñuble: {
    key: "nuble",
    categories: ["Ñuble Region", "Landscapes of Ñuble Region", "Chillán"],
    searches: ["Ñuble Chile landscape", "Chillán Chile architecture", "Ñuble Chile nature"],
  },
  Biobío: {
    key: "biobio",
    categories: ["Biobío Region", "Landscapes of Biobío Region", "Concepción, Chile"],
    searches: ["Biobío Chile landscape", "Concepción Chile architecture", "Lenga Chile coast", "Lota Chile landscape"],
  },
  "La Araucanía": {
    key: "araucania",
    categories: ["Araucanía Region", "Landscapes of La Araucanía Region", "Curarrehue"],
    searches: ["Araucanía Chile landscape", "Curarrehue Chile landscape", "Puerto Saavedra Chile landscape"],
  },
  "Los Ríos": {
    key: "los-rios",
    categories: ["Los Ríos Region", "Landscapes of Los Ríos Region", "Valdivia"],
    searches: ["Los Ríos Chile landscape", "Valdivia Chile architecture", "Mehuín Chile landscape"],
  },
  "Los Lagos": {
    key: "los-lagos",
    categories: ["Los Lagos Region", "Landscapes of Los Lagos Region", "Chiloé"],
    searches: ["Los Lagos Chile landscape", "Chiloé Chile architecture", "Puerto Montt architecture", "Dalcahue Chile architecture"],
  },
  "Aysén del General Carlos Ibáñez del Campo": {
    key: "aysen",
    categories: ["Aysén Region", "Landscapes of Aisén Region", "Carretera Austral"],
    searches: ["Aysén Chile landscape", "Puerto Cisnes Chile landscape", "Cerro Castillo Chile landscape"],
  },
  "Magallanes y de la Antártica Chilena": {
    key: "magallanes",
    categories: ["Magallanes and Chilean Antarctica Region", "Landscapes of Magallanes Region", "Punta Arenas"],
    searches: ["Magallanes Chile landscape", "Punta Arenas Chile architecture", "Patagonia Chile landscape"],
  },
};

const positiveTerms = /landscape|paisaje|panoram|view|vista|mount|cerro|volcan|desert|desierto|dune|beach|playa|coast|costa|river|rio|lake|lago|laguna|forest|bosque|valley|valle|waterfall|salto|sunset|atardecer|architecture|arquitectura|building|edificio|church|iglesia|station|estacion|house|casa|street|calle|port|puerto|caleta|plaza|monument|bridge|puente|market|mercado|palafito|cemetery|cementerio|lighthouse|faro|rock|roca|oasis|road|camino|historic|templo|catedral|museum|museo|glacier|glaciar|geyser|salar|bahia|bay|canal|island|isla|ruka|cabaña|cabana/i;
const excludedTerms = /logo|escudo|coat of arms|flag|bandera|mapa|\bmap\b|diagram|grafico|chart|poster|afiche|portrait|retrato|selfie|people|persona|personas|crowd|multitud|woman|women|mujer|mujeres|hombre|hombres|men\b|festival|fiesta|parade|desfile|protest|marcha|student|estudiante|school group|equipo|team\b|player|jugador|singer|cantante|procession|procesion|ceremonia|ceremony|inaugura|conference|conferencia|meeting|reunion|wedding|matrimonio|funeral|mayor|alcalde|president|presidente|candidate|candidato/i;

// Fuentes descartadas durante la revisión visual final. Se conserva la lista
// centralizada para que la selección sea reproducible en futuras sincronizaciones.
const visuallyRejectedSources = new Set([
  "https://commons.wikimedia.org/wiki/File:El_r%C3%ADo_%22tobillos%22,_Cerro_Negro_Quill%C3%B3n_Regi%C3%B3n_del_Bio_Bio.JPG",
  "https://commons.wikimedia.org/wiki/File:Tarde_en_la_Ventana_-_panoramio.jpg",
  "https://commons.wikimedia.org/wiki/File:Pichilemu_Portal_Banner.jpg",
  "https://commons.wikimedia.org/wiki/File:Mochi,_Giovanni_-_Antigua_laguna_del_parque_Cousi%C3%B1o_-MMBAV_fRF.jpg",
  "https://commons.wikimedia.org/wiki/File:Mochi,_Giovanni_-_Antigua_laguna_del_parque_Cousino_-ost_MMBAV_fRF02.jpg",
  "https://commons.wikimedia.org/wiki/File:Playa_de_Punta_Lapa,_Quell%C3%B3n,_Chilo%C3%A9._-_panoramio.jpg",
  "https://commons.wikimedia.org/wiki/File:Antorcha_panamericana_por_el_rio_valdivia.jpg",
  "https://commons.wikimedia.org/wiki/File:Plaza_Mu%C3%B1oz_Gamero_y_monumento_a_Magallanes_-_Punta_Arenas.jpg",
  "https://commons.wikimedia.org/wiki/File:Por_ahi_en_Boca_Itata_-_panoramio.jpg",
  "https://commons.wikimedia.org/wiki/File:Anochecer_en_borde_costero_Iquique..jpg",
  "https://commons.wikimedia.org/wiki/File:Costanera_en_Cavancha_-_panoramio.jpg",
  "https://commons.wikimedia.org/wiki/File:Valparaiso_Vrom_Vessel_-_panoramio.jpg",
  "https://commons.wikimedia.org/wiki/File:Mochi,_Giovanni_-_Antigua_laguna_del_parque_Cousino_-ost_MMBAV_fRF01.jpg",
  "https://commons.wikimedia.org/wiki/File:Regi%C3%B3n_Vit%C3%ADcola_del_Valle_Central.jpg",
  "https://commons.wikimedia.org/wiki/File:Good_Weekend_(175577489).jpeg",
  "https://commons.wikimedia.org/wiki/File:Carga_de_Granaderos_en_la_Batalla_de_Chorrillos_por_Mochi.jpg",
  "https://commons.wikimedia.org/wiki/File:Playa_pichilemu.jpg",
]);
const visualReviewCompleted = true;

const wait = (milliseconds) => new Promise((resolveWait) => setTimeout(resolveWait, milliseconds));

function cleanText(value) {
  return String(value ?? "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function readRestaurants(source) {
  const marker = "window.COCINERIAS = ";
  const start = source.indexOf(marker);
  if (start < 0) throw new Error("No se encontró window.COCINERIAS en data.js.");
  return JSON.parse(source.slice(start + marker.length).replace(/;\s*$/, ""));
}

async function fetchWithRetry(url, attempts = 3) {
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(url, {
        headers: { "User-Agent": "CocineriasChileDirectory/2.0 (local image curation)" },
        signal: AbortSignal.timeout(15_000),
      });
      if (response.ok) return response;
      if (![429, 500, 502, 503, 504].includes(response.status) || attempt === attempts) {
        throw new Error(`Solicitud fallida (${response.status}): ${url}`);
      }
    } catch (error) {
      if (attempt === attempts) throw error;
    }
    await wait(attempt * 2500);
  }
  throw new Error(`No se pudo consultar ${url}`);
}

function commonsApi(parameters) {
  const url = new URL("https://commons.wikimedia.org/w/api.php");
  url.search = new URLSearchParams({
    action: "query",
    prop: "imageinfo",
    iiprop: "url|size|mime|extmetadata",
    iiurlwidth: "640",
    format: "json",
    origin: "*",
    ...parameters,
  });
  return url;
}

function normalisePages(payload, origin) {
  return Object.values(payload.query?.pages ?? {}).map((page) => {
    const info = page.imageinfo?.[0] ?? {};
    const metadata = info.extmetadata ?? {};
    return {
      title: page.title,
      origin,
      width: info.width ?? 0,
      height: info.height ?? 0,
      mime: info.mime ?? "",
      downloadUrl: (info.thumburl ?? info.url)?.replace(/\?.*$/, ""),
      originalFile: info.url?.replace(/\?.*$/, ""),
      sourcePage: info.descriptionurl,
      author: cleanText(metadata.Artist?.value) || "No informado",
      license: cleanText(metadata.LicenseShortName?.value) || "No informada",
      licenseUrl: metadata.LicenseUrl?.value || null,
      description: cleanText(metadata.ImageDescription?.value),
    };
  });
}

async function getCategoryCandidates(category) {
  const response = await fetchWithRetry(
    commonsApi({
      generator: "categorymembers",
      gcmtitle: `Category:${category}`,
      gcmtype: "file",
      gcmnamespace: "6",
      gcmlimit: "100",
    }),
  );
  return normalisePages(await response.json(), `Category:${category}`);
}

async function getSearchCandidates(query) {
  const response = await fetchWithRetry(
    commonsApi({
      generator: "search",
      gsrsearch: `${query} filetype:bitmap`,
      gsrnamespace: "6",
      gsrlimit: "50",
    }),
  );
  return normalisePages(await response.json(), `Search:${query}`);
}

function candidateScore(candidate) {
  const title = candidate.title.replace(/^File:/, "");
  const text = `${title} ${candidate.description}`;
  let score = positiveTerms.test(text) ? 20 : 0;
  if (/landscape|paisaje|panoram|nature|naturaleza|mount|cerro|volcan|lake|lago|river|rio|coast|costa|beach|playa|forest|bosque/i.test(text)) score += 16;
  if (/architecture|arquitectura|building|edificio|church|iglesia|house|casa|bridge|puente|palafito/i.test(text)) score += 10;
  if (candidate.width >= 1600) score += 4;
  if (candidate.width > candidate.height) score += 6;
  return score;
}

function isUsableMetadata(candidate) {
  if (!candidate.downloadUrl || !candidate.sourcePage || !candidate.originalFile) return false;
  if (!/^image\/jpeg$/i.test(candidate.mime)) return false;
  if (candidate.width < 900 || candidate.height < 540) return false;
  if (excludedTerms.test(`${candidate.title} ${candidate.description}`)) return false;
  return !/non-commercial|no derivatives|copyrighted|fair use/i.test(candidate.license);
}

async function mapConcurrent(items, concurrency, task) {
  const results = new Array(items.length);
  let nextIndex = 0;
  async function worker() {
    while (nextIndex < items.length) {
      const index = nextIndex;
      nextIndex += 1;
      results[index] = await task(items[index], index);
    }
  }
  await Promise.all(Array.from({ length: concurrency }, worker));
  return results;
}

async function downloadCandidate(candidate, targetPath) {
  try {
    await access(targetPath);
    return targetPath;
  } catch {
    // El recurso aún no existe en la caché persistente de curaduría.
  }
  const commonsThumbnail = new URL("https://commons.wikimedia.org/w/thumb.php");
  commonsThumbnail.search = new URLSearchParams({
    f: candidate.title.replace(/^File:/, ""),
    width: "960",
  });
  let response;
  try {
    response = await fetchWithRetry(commonsThumbnail, 2);
  } catch (thumbnailError) {
    console.warn(`Ruta alternativa no disponible; se usa la miniatura directa de ${candidate.title}.`);
    response = await fetchWithRetry(candidate.downloadUrl, 2);
  }
  const bytes = Buffer.from(await response.arrayBuffer());
  if (bytes.length < 20_000) throw new Error(`Imagen demasiado pequeña: ${candidate.title}`);
  await writeFile(targetPath, bytes);
  await wait(1400);
  return targetPath;
}

async function sha256(filePath) {
  return createHash("sha256").update(await readFile(filePath)).digest("hex");
}

const restaurants = readRestaurants(await readFile(dataPath, "utf8"));
const tempRoot = resolve(tmpdir(), "cocinerias-curation-cache");
const allDownloaded = [];

try {
  await mkdir(tempRoot, { recursive: true });

  for (const [region, config] of Object.entries(regionConfig)) {
    const regionRestaurants = restaurants.filter((restaurant) => restaurant.region === region);
    const required = regionRestaurants.length;
    const target = config.target ?? Math.max(required * 2, required + 6);
    const regionTemp = resolve(tempRoot, config.key);
    const manifestPath = resolve(regionTemp, "candidates.json");
    await mkdir(regionTemp, { recursive: true });
    let candidates;

    try {
      candidates = JSON.parse(await readFile(manifestPath, "utf8"));
      if (candidates.length < target) candidates = null;
    } catch {
      candidates = null;
    }

    if (!candidates) {
      const candidateMap = new Map();
      const currentCandidates = () =>
        [...candidateMap.values()]
          .filter(isUsableMetadata)
          .sort((a, b) => candidateScore(b) - candidateScore(a));

      for (const category of config.categories) {
        try {
          const categoryCandidates = await getCategoryCandidates(category);
          for (const candidate of categoryCandidates) candidateMap.set(candidate.sourcePage, candidate);
        } catch (error) {
          console.warn(`Categoría omitida (${category}): ${error.message}`);
        }
        if (currentCandidates().length >= target) break;
        await wait(1600);
      }

      if (currentCandidates().length < target) {
        for (const search of config.searches) {
          try {
            const searchCandidates = await getSearchCandidates(search);
            for (const candidate of searchCandidates) candidateMap.set(candidate.sourcePage, candidate);
          } catch (error) {
            console.warn(`Búsqueda omitida (${search}): ${error.message}`);
          }
          if (currentCandidates().length >= target) break;
          await wait(1600);
        }
      }

      candidates = currentCandidates().slice(0, target);
      await writeFile(manifestPath, `${JSON.stringify(candidates, null, 2)}\n`, "utf8");
    }

    if (candidates.length < required) {
      throw new Error(`${region}: solo ${candidates.length} candidatos para ${required} restaurantes.`);
    }

    const downloaded = await mapConcurrent(candidates, 1, async (candidate, index) => {
      const targetPath = resolve(regionTemp, `${String(index + 1).padStart(3, "0")}.jpg`);
      try {
        await downloadCandidate(candidate, targetPath);
        return { ...candidate, region, tempPath: targetPath };
      } catch (error) {
        console.warn(`${region}: no se descargó ${candidate.title} (${error.message})`);
        return null;
      }
    });
    allDownloaded.push(...downloaded.filter(Boolean));
    console.log(`${region}: ${downloaded.filter(Boolean).length} candidatos descargados.`);
  }

  await mkdir(imageDirectory, { recursive: true });
  const assignments = [];
  const directSource = JSON.parse(
    await readFile(resolve(imageDirectory, "image-sources.json"), "utf8"),
  ).find((record) => record.restaurantIds?.includes("CL-AP-001") || record.restaurantId === "CL-AP-001");
  if (!directSource) throw new Error("No se encontró la fuente directa conservada de Mata Rangi.");

  const mataSourcePath = resolve(projectRoot, directSource.localPath);
  const mataTargetPath = resolve(imageDirectory, "cl-ap-001.jpg");
  if (mataSourcePath !== mataTargetPath) await copyFile(mataSourcePath, mataTargetPath);
  assignments.push({
    restaurantId: "CL-AP-001",
    restaurantName: restaurants.find((item) => item.id === "CL-AP-001")?.name,
    region: "Arica y Parinacota",
    usage: "direct",
    subject: "Mata Rangi",
    title: directSource.title,
    localPath: "assets/images/cocinerias/cl-ap-001.jpg",
    sourcePage: directSource.sourcePage,
    originalFile: directSource.originalFile,
    downloadUrl: directSource.originalFile,
    author: directSource.author,
    license: directSource.license,
    licenseUrl: directSource.licenseUrl,
    peopleAudit: { method: "revisión visual" },
  });

  const usedSourcePages = new Set([directSource.sourcePage]);
  for (const [region] of Object.entries(regionConfig)) {
    const regionRestaurants = restaurants.filter((restaurant) => restaurant.region === region);
    const cleanCandidates = allDownloaded
      .filter((candidate) => candidate.region === region)
      .filter((candidate) => !visuallyRejectedSources.has(candidate.sourcePage))
      .filter((candidate) => !usedSourcePages.has(candidate.sourcePage));

    if (cleanCandidates.length < regionRestaurants.length) {
      throw new Error(
        `${region}: solo ${cleanCandidates.length} imágenes aprobadas para ${regionRestaurants.length} restaurantes.`,
      );
    }

    for (const [index, restaurant] of regionRestaurants.entries()) {
      const candidate = cleanCandidates[index];
      usedSourcePages.add(candidate.sourcePage);
      const filename = `${restaurant.id.toLowerCase()}.jpg`;
      const targetPath = resolve(imageDirectory, filename);
      await copyFile(candidate.tempPath, targetPath);
      assignments.push({
        restaurantId: restaurant.id,
        restaurantName: restaurant.name,
        region,
        usage: "regional-fallback",
        subject: `${region} — imagen territorial; no corresponde necesariamente al establecimiento`,
        title: candidate.title,
        localPath: `assets/images/cocinerias/${filename}`,
        sourcePage: candidate.sourcePage,
        originalFile: candidate.originalFile,
        downloadUrl: candidate.downloadUrl,
        author: candidate.author,
        license: candidate.license,
        licenseUrl: candidate.licenseUrl,
        peopleAudit: { method: "revisión visual" },
      });
    }
  }

  assignments.sort((a, b) => a.restaurantId.localeCompare(b.restaurantId));
  const hashes = [];
  for (const assignment of assignments) {
    const absolutePath = resolve(projectRoot, assignment.localPath);
    hashes.push({
      restaurantId: assignment.restaurantId,
      localPath: assignment.localPath,
      bytes: (await stat(absolutePath)).size,
      sha256: await sha256(absolutePath),
      visualReview: assignment.peopleAudit.method,
    });
  }

  if (new Set(assignments.map((item) => item.localPath)).size !== restaurants.length) {
    throw new Error("Hay rutas de imagen repetidas en las asignaciones.");
  }
  if (new Set(assignments.map((item) => item.sourcePage)).size !== restaurants.length) {
    throw new Error("Hay fotografías fuente repetidas en las asignaciones.");
  }
  if (new Set(hashes.map((item) => item.sha256)).size !== restaurants.length) {
    throw new Error("Hay archivos de imagen con contenido duplicado.");
  }
  await writeFile(
    resolve(imageDirectory, "image-sources.json"),
    `${JSON.stringify(assignments, null, 2)}\n`,
    "utf8",
  );
  await writeFile(
    resolve(imageDirectory, "image-audit.json"),
    `${JSON.stringify({ generatedAt: new Date().toISOString(), total: hashes.length, uniquePaths: new Set(assignments.map((item) => item.localPath)).size, uniqueSources: new Set(assignments.map((item) => item.sourcePage)).size, uniqueHashes: new Set(hashes.map((item) => item.sha256)).size, visualReviewCompleted, files: hashes }, null, 2)}\n`,
    "utf8",
  );

  const rows = assignments
    .map(
      (record) =>
        `| ${record.restaurantId} · ${record.restaurantName.replaceAll("|", "\\|")} | ${record.usage === "direct" ? "Directa" : "Respaldo regional único"} | ${record.author.replaceAll("|", "\\|")} | ${record.license.replaceAll("|", "\\|")} | [Wikimedia Commons](${record.sourcePage}) | \`${record.localPath}\` |`,
    )
    .join("\n");
  await writeFile(
    resolve(imageDirectory, "ATTRIBUTIONS.md"),
    `# Fuentes y atribuciones de imágenes\n\nLas fotografías se almacenan localmente. Salvo Mata Rangi, cada imagen es un **respaldo regional único** y no debe atribuirse al establecimiento de la fila. La selección utiliza exclusiones por metadatos y una revisión visual del conjunto para evitar personas reconocibles.\n\n| Cocinería | Uso | Autor | Licencia | Fuente original | Archivo local |\n|---|---|---|---|---|---|\n${rows}\n`,
    "utf8",
  );

  const oldFiles = (await readdir(imageDirectory)).filter(
    (filename) => filename === "mata-rangi.jpg" || filename.startsWith("region-"),
  );
  for (const filename of oldFiles) await rm(resolve(imageDirectory, filename));

  console.log(`Biblioteca lista: ${assignments.length} imágenes únicas con revisión visual completada.`);
} finally {
  console.log(`Caché de curaduría conservada en ${tempRoot}`);
}
