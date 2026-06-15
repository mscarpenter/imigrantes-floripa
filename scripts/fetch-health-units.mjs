// Snapshots Florianópolis public health units (Centros de Saúde / UBS, UPA,
// CAPS, policlínicas, hospitais, maternidades…) grouped by neighborhood.
//
// Sources (both free, no API key):
//   1. Prefeitura de Florianópolis — GeoPortal (GeoServer WFS) — CC BY 4.0.
//      Official, municipal, carries `regiao`/`bairro`. Layer names are
//      auto-discovered from GetCapabilities (they change over time).
//   2. OpenStreetMap via Overpass (amenity=hospital/clinic/doctors,
//      healthcare=*) — ODbL. Fills gaps for non-municipal units.
//
// Usage:
//   node scripts/fetch-health-units.mjs            # GeoPortal + OSM (merged)
//   node scripts/fetch-health-units.mjs --no-osm   # GeoPortal only
//   node scripts/fetch-health-units.mjs --osm-only # OSM only
//
// Output: public/data/health-units.geojson + a short summary by neighborhood.
// The result is a research snapshot — review it before promoting anything
// into src/lib/data/contacts.ts.

import { writeFile, mkdir } from "node:fs/promises";
import { dirname } from "node:path";
import {
  listGeoportalLayers,
  matchLayers,
  fetchGeoportalLayer,
  overpass,
  overpassPoint,
  pickProp,
  centroid,
  haversine,
  round6,
  stripAccents,
} from "./lib/geoportal.mjs";

const OUT = "public/data/health-units.geojson";
const DEDUP_M = 80; // treat two units within this distance as the same place

const args = new Set(process.argv.slice(2));
const useGeoportal = !args.has("--osm-only");
const useOsm = !args.has("--no-osm");

const HEALTH_LAYER_RE =
  /sa[uú]de|ubs|posto.?(de.?)?sa[uú]de|centro.?de.?sa[uú]de|\bcaps\b|\bupa\b|polic|hospital|maternidad|unidade.?sa/;

// Classifies a unit into a coarse type from its name/attributes.
function classifyType(text) {
  const t = stripAccents(text);
  if (/\bupa\b|pronto.?atend/.test(t)) return "upa";
  if (/\bcaps\b|psicossocial/.test(t)) return "caps";
  if (/maternidad/.test(t)) return "maternidade";
  if (/hospital/.test(t)) return "hospital";
  if (/polic[il]/.test(t)) return "policlinica";
  if (/\bsamu\b/.test(t)) return "samu";
  if (/centro.?de.?sa|posto.?de.?sa|\bubs\b|unidade.?bas|cs\b|esf|estrategia.?sau/.test(t))
    return "centro-saude";
  if (/farmacia/.test(t)) return "farmacia";
  return "saude";
}

const records = [];

// 1) GeoPortal (official municipal) ----------------------------------------
if (useGeoportal) {
  try {
    const layers = matchLayers(await listGeoportalLayers(), HEALTH_LAYER_RE);
    if (layers.length === 0) {
      console.warn("GeoPortal: nenhuma camada de saúde encontrada por palavra-chave.");
    }
    for (const layer of layers) {
      console.log(`GeoPortal: baixando camada "${layer.name}" (${layer.title || "sem título"})…`);
      const geo = await fetchGeoportalLayer(layer.name);
      for (const f of geo.features ?? []) {
        const coords = centroid(f.geometry);
        if (!coords) continue;
        const p = f.properties ?? {};
        const name =
          pickProp(p, ["nome", "nm_unidade", "unidade", "nome_fant", "estabelec", "descricao", "denominacao"]) ??
          layer.title ??
          "Unidade de saúde";
        records.push({
          name,
          type: classifyType(`${name} ${pickProp(p, ["tipo", "categoria", "classe"]) ?? ""}`),
          bairro: pickProp(p, ["bairro", "nm_bairro"]),
          regiao: pickProp(p, ["regiao", "distrito", "regional", "ds_regiao"]),
          address: pickProp(p, ["endereco", "logradouro", "ds_endereco", "ende"]),
          phone: pickProp(p, ["telefone", "fone", "contato"]),
          lng: round6(coords[0]),
          lat: round6(coords[1]),
          source: "GeoPortal PMF",
        });
      }
    }
  } catch (err) {
    console.warn(`GeoPortal indisponível: ${err.message}`);
  }
}

// 2) OpenStreetMap (Overpass) ------------------------------------------------
if (useOsm) {
  try {
    console.log("OSM: consultando Overpass (unidades de saúde em Florianópolis)…");
    const query = `
      [out:json][timeout:120];
      area["name"="Florianópolis"]["admin_level"="8"]->.a;
      (
        node["amenity"~"^(hospital|clinic|doctors)$"](area.a);
        way["amenity"~"^(hospital|clinic|doctors)$"](area.a);
        node["healthcare"](area.a);
        way["healthcare"](area.a);
      );
      out center tags;`;
    const data = await overpass(query);
    for (const el of data.elements ?? []) {
      const pt = overpassPoint(el);
      if (!pt) continue;
      const tags = el.tags ?? {};
      const name = tags.name ?? tags["name:pt"] ?? "Unidade de saúde";
      records.push({
        name,
        type: classifyType(`${name} ${tags.amenity ?? ""} ${tags.healthcare ?? ""}`),
        bairro: tags["addr:suburb"] ?? tags["addr:neighbourhood"] ?? null,
        regiao: null,
        address:
          [tags["addr:street"], tags["addr:housenumber"]].filter(Boolean).join(", ") || null,
        phone: tags.phone ?? tags["contact:phone"] ?? null,
        lng: round6(pt[0]),
        lat: round6(pt[1]),
        source: "OpenStreetMap",
      });
    }
  } catch (err) {
    console.warn(`OSM/Overpass indisponível: ${err.message}`);
  }
}

if (records.length === 0) {
  console.error("Nenhum dado coletado. Verifique a conexão e tente novamente.");
  process.exit(1);
}

// Dedup: prefer the official (GeoPortal) record when two are close together.
records.sort((a, b) => (a.source === "GeoPortal PMF" ? -1 : 1));
const kept = [];
for (const r of records) {
  const dup = kept.find(
    (k) => haversine(k.lat, k.lng, r.lat, r.lng) <= DEDUP_M,
  );
  if (!dup) kept.push(r);
}

const features = kept.map((r) => ({
  type: "Feature",
  geometry: { type: "Point", coordinates: [r.lng, r.lat] },
  properties: {
    name: r.name,
    type: r.type,
    bairro: r.bairro,
    regiao: r.regiao,
    address: r.address,
    phone: r.phone,
    source: r.source,
  },
}));

const geojson = {
  type: "FeatureCollection",
  metadata: {
    description: "Unidades de saúde de Florianópolis (snapshot para pesquisa)",
    sources: [
      "Prefeitura de Florianópolis — GeoPortal (CC BY 4.0)",
      "© OpenStreetMap contributors (ODbL)",
    ],
    generatedAt: new Date().toISOString().slice(0, 10),
    count: features.length,
  },
  features,
};

await mkdir(dirname(OUT), { recursive: true });
await writeFile(OUT, JSON.stringify(geojson, null, 2));

// Summary by neighborhood + by type.
const byType = {};
const byBairro = {};
for (const f of features) {
  const { type, bairro } = f.properties;
  byType[type] = (byType[type] ?? 0) + 1;
  const key = bairro ?? "(sem bairro)";
  byBairro[key] = (byBairro[key] ?? 0) + 1;
}

console.log(`\nGravadas ${features.length} unidades em ${OUT}`);
console.log("\nPor tipo:");
for (const [t, n] of Object.entries(byType).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${t.padEnd(14)} ${n}`);
}
console.log(`\nBairros distintos: ${Object.keys(byBairro).length}`);
