import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const sourcePath = resolve(projectRoot, "directorio_cocinerias_chile.md");
const outputPath = resolve(projectRoot, "data.js");
const imageSourcesPath = resolve(projectRoot, "assets/images/cocinerias/image-sources.json");

const fields = [
  "id",
  "name",
  "alternateName",
  "classification",
  "status",
  "confidence",
  "region",
  "province",
  "commune",
  "locality",
  "address",
  "venue",
  "latitude",
  "longitude",
  "phone",
  "whatsapp",
  "email",
  "website",
  "instagram",
  "facebook",
  "otherNetworks",
  "googleMaps",
  "hours",
  "cuisine",
  "specialties",
  "description",
  "services",
  "priceRange",
  "paymentMethods",
  "accessibility",
  "founded",
  "owner",
  "primarySource",
  "additionalSources",
  "verifiedAt",
  "notes",
];

const missingValues = new Set(["No encontrado", "No aplica", ""]);

function normaliseForMatching(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function deriveFoodCategories(entry) {
  const evidence = normaliseForMatching(
    `${entry.cuisine} ${entry.specialties}`,
  );
  const categories = [];

  if (/chilena|platos chilenos|preparaciones chilenas/.test(evidence)) {
    categories.push("Comida chilena");
  }
  if (/casera|colacion|platos tradicionales|platos caseros|cazuela|porotos|pastel de choclo/.test(evidence)) {
    categories.push("Cocina casera");
  }
  if (/pescad|congrio|merluza|salmon/.test(evidence)) {
    categories.push("Pescados");
  }
  if (/marisc|centolla|ostion|ceviche|paila marina/.test(evidence)) {
    categories.push("Mariscos");
  }
  if (/marina/.test(evidence) && !categories.includes("Pescados") && !categories.includes("Mariscos")) {
    categories.push("Cocina marina");
  }
  if (/mapuche/.test(evidence)) {
    categories.push("Mapuche");
  }
  if (/carne|costillar|lomo|pollo/.test(evidence)) {
    categories.push("Carnes");
  }
  if (/jugo/.test(evidence)) {
    categories.push("Jugos");
  }
  if (/sandwich|sanguche/.test(evidence)) {
    categories.push("Sándwiches");
  }
  if (/al paso|comida rapida/.test(evidence)) {
    categories.push("Al paso");
  }
  if (/chilota/.test(evidence)) {
    categories.push("Chilota");
  }
  if (/patagonica/.test(evidence)) {
    categories.push("Patagónica");
  }
  if (/magallanica/.test(evidence)) {
    categories.push("Magallánica");
  }
  if (/campesina|rural/.test(evidence)) {
    categories.push("Campesina");
  }
  if (/pasta|italiana/.test(evidence)) {
    categories.push("Pastas");
  }
  if (/vegetariana|vegana|falafel/.test(evidence)) {
    categories.push("Opciones vegetales");
  }

  return categories.length ? categories : ["Sin clasificación culinaria"];
}

function deriveImage(entry, imageSourcesById) {
  const image = imageSourcesById.get(entry.id);
  if (!image) throw new Error(`No existe una imagen curada para ${entry.id}.`);
  const isDirect = image.usage === "direct";
  return {
    imagePath: image.localPath,
    imageKind: isDirect ? "direct" : "regional-fallback",
    imageLabel: isDirect
      ? `Fotografía de ${entry.name}`
      : `Imagen territorial de ${entry.region}; no corresponde necesariamente al establecimiento`,
  };
}

function derivePriceCategory(value) {
  const evidence = normaliseForMatching(value);

  if (missingValues.has(value) || /precios publicados/.test(evidence)) {
    return "No informado";
  }
  if (/economico|barato/.test(evidence)) {
    return "Económico";
  }
  if (/medio|10\.000|9\.990|14\.990|15\.000|20\.000/.test(evidence)) {
    return "Precio medio";
  }

  return "No informado";
}

function cleanValue(value) {
  return missingValues.has(value) ? null : value;
}

const [markdown, imageSources] = await Promise.all([
  readFile(sourcePath, "utf8"),
  readFile(imageSourcesPath, "utf8").then(JSON.parse),
]);
const imageSourcesById = new Map(
  imageSources.map((image) => [image.restaurantId, image]),
);
const entries = markdown
  .split(/\r?\n/)
  .filter((line) => /^\| CL-[A-Z]{2}-\d{3} \|/.test(line))
  .map((line) => {
    const values = line
      .slice(1, -1)
      .split("|")
      .map((value) => value.trim());

    if (values.length !== fields.length) {
      throw new Error(
        `El registro ${values[0] ?? "desconocido"} tiene ${values.length} campos; se esperaban ${fields.length}.`,
      );
    }

    const rawEntry = Object.fromEntries(
      fields.map((field, index) => [field, values[index]]),
    );

    return {
      ...Object.fromEntries(
        Object.entries(rawEntry).map(([key, value]) => [key, cleanValue(value)]),
      ),
      foodCategories: deriveFoodCategories(rawEntry),
      priceCategory: derivePriceCategory(rawEntry.priceRange),
      ...deriveImage(rawEntry, imageSourcesById),
    };
  });

if (entries.length !== 101) {
  throw new Error(`Se extrajeron ${entries.length} registros; se esperaban 101.`);
}

const output = `/* Archivo generado desde directorio_cocinerias_chile.md. No editar a mano. */\nwindow.COCINERIAS = ${JSON.stringify(entries, null, 2)};\n`;

await writeFile(outputPath, output, "utf8");
console.log(`Normalizados ${entries.length} registros en ${outputPath}`);
