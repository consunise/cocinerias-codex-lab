import { access, mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const imageDirectory = resolve(projectRoot, "assets/images/cocinerias");

const selections = [
  {
    key: "mata-rangi",
    filename: "mata-rangi.jpg",
    title: "File:Mata-Rangi restaurant (48338622606).jpg",
    subject: "Mata Rangi",
    usage: "direct",
    restaurantIds: ["CL-AP-001"],
  },
  {
    key: "tarapaca",
    filename: "region-tarapaca.jpg",
    title: "File:Oasis de Pica. I región..jpg",
    subject: "Región de Tarapacá — Oasis de Pica",
    usage: "regional-fallback",
  },
  {
    key: "antofagasta",
    filename: "region-antofagasta.jpg",
    title: "File:La Portada - Chile.jpg",
    subject: "Región de Antofagasta — La Portada",
    usage: "regional-fallback",
  },
  {
    key: "atacama",
    filename: "region-atacama.jpg",
    title: "File:Caldera.JPG",
    subject: "Región de Atacama — Puerto de Caldera",
    usage: "regional-fallback",
  },
  {
    key: "coquimbo",
    filename: "region-coquimbo.jpg",
    title: "File:Vista de la Ciudad y el Puerto de Coquimbo.jpg",
    subject: "Región de Coquimbo — ciudad y puerto",
    usage: "regional-fallback",
  },
  {
    key: "valparaiso",
    filename: "region-valparaiso.jpg",
    title: "File:Panorama of the city of Valparaíso.jpg",
    subject: "Región de Valparaíso — panorámica de la ciudad",
    usage: "regional-fallback",
  },
  {
    key: "metropolitana",
    filename: "region-metropolitana.jpg",
    title: "File:La Vega Central en Santiago.jpg",
    subject: "Región Metropolitana — La Vega Central",
    usage: "regional-fallback",
  },
  {
    key: "ohiggins",
    filename: "region-ohiggins.jpg",
    title: "File:Pichilemu beach.jpg",
    subject: "Región de O’Higgins — costa de Pichilemu",
    usage: "regional-fallback",
  },
  {
    key: "maule",
    filename: "region-maule.jpg",
    title: "File:Rocas constitución.JPG",
    subject: "Región del Maule — costa de Constitución",
    usage: "regional-fallback",
  },
  {
    key: "nuble",
    filename: "region-nuble.jpg",
    title: "File:Chillán - 2009 - 14 - Mercado de Chillán.jpg",
    subject: "Región de Ñuble — Mercado de Chillán",
    usage: "regional-fallback",
  },
  {
    key: "biobio",
    filename: "region-biobio.jpg",
    title: "File:Caleta lenga.jpg",
    subject: "Región del Biobío — Caleta Lenga",
    usage: "regional-fallback",
  },
  {
    key: "araucania",
    filename: "region-araucania.jpg",
    title: "File:Camino a Curarrehue.jpg",
    subject: "Región de La Araucanía — camino a Curarrehue",
    usage: "regional-fallback",
  },
  {
    key: "los-rios",
    filename: "region-los-rios.jpg",
    title: "File:Feria Fluvial de Valdivia 2024.jpg",
    subject: "Región de Los Ríos — Feria Fluvial de Valdivia",
    usage: "regional-fallback",
  },
  {
    key: "los-lagos",
    filename: "region-los-lagos.jpg",
    title: "File:Angelmó, Puerto Montt.jpg",
    subject: "Región de Los Lagos — Angelmó",
    usage: "regional-fallback",
  },
  {
    key: "aysen",
    filename: "region-aysen.jpg",
    title: "File:Carretera Austral - Cerro Castillo.jpg",
    subject: "Región de Aysén — Cerro Castillo y Carretera Austral",
    usage: "regional-fallback",
  },
  {
    key: "magallanes",
    filename: "region-magallanes.jpg",
    title: "File:00ß 2930. Punta Arenas - Chile.jpg",
    subject: "Región de Magallanes — mercado en Punta Arenas",
    usage: "regional-fallback",
  },
];

function plainText(value) {
  return String(value ?? "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

const wait = (milliseconds) =>
  new Promise((resolveWait) => setTimeout(resolveWait, milliseconds));

async function downloadWithRetry(url, attempts = 8) {
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    const response = await fetch(url, {
      headers: { "User-Agent": "CocineriasChileDirectory/1.0 (local asset sync)" },
    });
    if (response.ok) return response;
    if (response.status !== 429 || attempt === attempts) return response;
    await wait(attempt * 6000);
  }
  throw new Error("No fue posible completar la descarga.");
}

await mkdir(imageDirectory, { recursive: true });

const apiUrl = new URL("https://commons.wikimedia.org/w/api.php");
apiUrl.search = new URLSearchParams({
  action: "query",
  titles: selections.map((selection) => selection.title).join("|"),
  prop: "imageinfo",
  iiprop: "url|extmetadata",
    iiurlwidth: "1200",
  format: "json",
  origin: "*",
});

const metadataResponse = await fetch(apiUrl, {
  headers: { "User-Agent": "CocineriasChileDirectory/1.0 (local asset sync)" },
});
if (!metadataResponse.ok) {
  throw new Error(`Wikimedia Commons respondió ${metadataResponse.status}.`);
}

const metadata = await metadataResponse.json();
const pagesByTitle = new Map(
  Object.values(metadata.query?.pages ?? {}).map((page) => [page.title, page]),
);
const records = [];

for (const selection of selections) {
  const page = pagesByTitle.get(selection.title);
  const imageInfo = page?.imageinfo?.[0];
  if (!imageInfo?.thumburl && !imageInfo?.url) {
    throw new Error(`No se encontró una URL descargable para ${selection.title}.`);
  }

  const targetPath = resolve(imageDirectory, selection.filename);
  let alreadyDownloaded = true;
  try {
    await access(targetPath);
  } catch {
    alreadyDownloaded = false;
  }

  if (!alreadyDownloaded) {
    const downloadUrl = imageInfo.thumburl ?? imageInfo.url;
    const imageResponse = await downloadWithRetry(downloadUrl);
    if (!imageResponse.ok) {
      throw new Error(`No se pudo descargar ${selection.title}: ${imageResponse.status}.`);
    }
    await writeFile(targetPath, Buffer.from(await imageResponse.arrayBuffer()));
  }

  const extended = imageInfo.extmetadata ?? {};
  records.push({
    ...selection,
    localPath: `assets/images/cocinerias/${selection.filename}`,
    sourcePage: imageInfo.descriptionurl,
    originalFile: imageInfo.url,
    author: plainText(extended.Artist?.value) || "No informado",
    license: plainText(extended.LicenseShortName?.value) || "No informada",
    licenseUrl: extended.LicenseUrl?.value || null,
    description: plainText(extended.ImageDescription?.value) || selection.subject,
  });
  console.log(`${alreadyDownloaded ? "Conservada" : "Descargada"} ${selection.filename}`);
  if (!alreadyDownloaded) await wait(4000);
}

await writeFile(
  resolve(imageDirectory, "image-sources.json"),
  `${JSON.stringify(records, null, 2)}\n`,
  "utf8",
);

const attributionRows = records
  .map(
    (record) =>
      `| ${record.subject} | ${record.usage === "direct" ? "Directa" : "Respaldo regional"} | ${record.author.replaceAll("|", "\\|")} | ${record.license.replaceAll("|", "\\|")} | [Wikimedia Commons](${record.sourcePage}) | \`${record.localPath}\` |`,
  )
  .join("\n");

await writeFile(
  resolve(imageDirectory, "ATTRIBUTIONS.md"),
  `# Fuentes y atribuciones de imágenes\n\nLas fotografías se almacenan localmente. Una imagen marcada como **respaldo regional** representa el territorio y no debe atribuirse al establecimiento mostrado en la misma fila.\n\n| Sujeto | Uso | Autor | Licencia | Fuente original | Archivo local |\n|---|---|---|---|---|---|\n${attributionRows}\n`,
  "utf8",
);

console.log(`Biblioteca lista: ${records.length} imágenes.`);
