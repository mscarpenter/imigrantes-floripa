// Snapshots schools (early childhood → fundamental → médio) and higher-ed
// institutions (universidades públicas e privadas) in Florianópolis, tagged by
// network (municipal / estadual / federal / privada) and level.
//
// Sources (free, no API key):
//   1. Prefeitura de Florianópolis — GeoPortal (GeoServer WFS) — CC BY 4.0.
//      Mostly municipal schools, with `bairro`/`regiao`. Layers auto-discovered.
//   2. OpenStreetMap via Overpass (amenity=school/kindergarten/college/
//      university) — ODbL. Covers estadual/federal/privada + universidades.
//   3. (optional) INEP — Censo Escolar microdata CSV, for the authoritative,
//      complete municipal list. Pass --inep <caminho-do-csv>.
//      Download: https://www.gov.br/inep/.../censo-escolar (microdados).
//      Filtered to Florianópolis (município IBGE 4205407).
//
// Usage:
//   node scripts/fetch-schools.mjs                       # GeoPortal + OSM
//   node scripts/fetch-schools.mjs --no-osm              # GeoPortal only
//   node scripts/fetch-schools.mjs --osm-only            # OSM only
//   node scripts/fetch-schools.mjs --inep microdados.csv # + INEP (autoritativo)
//
// Output: public/data/schools.geojson + summary by network and level.
// Snapshot for research — review before promoting into src/lib/data/.

import { writeFile, mkdir, readFile } from "node:fs/promises";
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

const OUT = "public/data/schools.geojson";
const DEDUP_M = 70;
const FLORIPA_IBGE = "4205407";

const argv = process.argv.slice(2);
const args = new Set(argv);
const inepIdx = argv.indexOf("--inep");
const inepPath = inepIdx >= 0 ? argv[inepIdx + 1] : null;
const useGeoportal = !args.has("--osm-only");
const useOsm = !args.has("--no-osm");

const SCHOOL_LAYER_RE =
  /escola|ensino|educa|creche|\bnei\b|col[eé]gio|universidad|faculdad|campus|instituto.?federal|cmei|ceim/;

// Network: municipal / estadual / federal / privada / desconhecida.
function classifyNetwork(text) {
  const t = stripAccents(text);
  if (/\budesc\b|estadual|\beeb\b|e\.?e\.?b|secretaria.?de.?estado|rede.?estadual/.test(t))
    return "estadual";
  if (/\bifsc\b|\bufsc\b|instituto.?federal|federal|colegio.?de.?aplicacao|rede.?federal/.test(t))
    return "federal";
  if (/municipal|\bebm\b|\bedm\b|\bnei\b|\bcmei\b|\bceim\b|prefeitura|rede.?municipal/.test(t))
    return "municipal";
  if (/privad|particular|colegio\b|catolic|adventist|salesian|bom.?jesus|sesi|senai|senac/.test(t))
    return "privada";
  return "desconhecida";
}

// Level: infantil / fundamental / medio / superior / basica (mixed).
function classifyLevel(text) {
  const t = stripAccents(text);
  if (/universidad|faculdad|campus|\bies\b|ensino.?superior|\bufsc\b|\budesc\b|estacio|unisul|unicesusc|cesusc/.test(t))
    return "superior";
  if (/creche|\bnei\b|infantil|\bcmei\b|\bceim\b|kindergarten|pre.?escola/.test(t))
    return "infantil";
  if (/ensino.?medio|\bmedio\b|tecnico/.test(t)) return "medio";
  if (/fundamental|\bebm\b/.test(t)) return "fundamental";
  if (/educacao.?basica|\beeb\b|escola.?basica/.test(t)) return "basica";
  return "escola";
}

const records = [];

// 1) GeoPortal --------------------------------------------------------------
if (useGeoportal) {
  try {
    const layers = matchLayers(await listGeoportalLayers(), SCHOOL_LAYER_RE);
    if (layers.length === 0) {
      console.warn("GeoPortal: nenhuma camada de educação encontrada por palavra-chave.");
    }
    for (const layer of layers) {
      console.log(`GeoPortal: baixando camada "${layer.name}" (${layer.title || "sem título"})…`);
      const geo = await fetchGeoportalLayer(layer.name);
      for (const f of geo.features ?? []) {
        const coords = centroid(f.geometry);
        if (!coords) continue;
        const p = f.properties ?? {};
        const name =
          pickProp(p, ["nome", "nm_escola", "escola", "denominacao", "descricao", "unidade"]) ??
          layer.title ??
          "Escola";
        const rede = pickProp(p, ["rede", "dependencia", "esfera", "mantenedor", "administracao"]);
        const nivel = pickProp(p, ["nivel", "etapa", "modalidade", "ensino"]);
        records.push({
          name,
          network: classifyNetwork(`${name} ${rede ?? ""}`),
          level: classifyLevel(`${name} ${nivel ?? ""}`),
          bairro: pickProp(p, ["bairro", "nm_bairro"]),
          regiao: pickProp(p, ["regiao", "distrito", "regional"]),
          address: pickProp(p, ["endereco", "logradouro", "ds_endereco"]),
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

// 2) OpenStreetMap (Overpass) -----------------------------------------------
if (useOsm) {
  try {
    console.log("OSM: consultando Overpass (escolas e universidades em Florianópolis)…");
    const query = `
      [out:json][timeout:120];
      area["name"="Florianópolis"]["admin_level"="8"]->.a;
      (
        node["amenity"~"^(school|kindergarten|college|university)$"](area.a);
        way["amenity"~"^(school|kindergarten|college|university)$"](area.a);
        relation["amenity"~"^(school|kindergarten|college|university)$"](area.a);
      );
      out center tags;`;
    const data = await overpass(query);
    for (const el of data.elements ?? []) {
      const pt = overpassPoint(el);
      if (!pt) continue;
      const tags = el.tags ?? {};
      const name = tags.name ?? tags["name:pt"] ?? "Escola";
      const operatorType = tags["operator:type"] ?? ""; // public/private/government
      const hint = `${name} ${tags.operator ?? ""} ${operatorType}`;
      let network = classifyNetwork(hint);
      if (network === "desconhecida" && /private/.test(operatorType)) network = "privada";
      let level = classifyLevel(`${name} ${tags.amenity ?? ""}`);
      if (tags.amenity === "kindergarten") level = "infantil";
      if (tags.amenity === "university" || tags.amenity === "college") level = "superior";
      records.push({
        name,
        network,
        level,
        bairro: tags["addr:suburb"] ?? tags["addr:neighbourhood"] ?? null,
        regiao: null,
        address:
          [tags["addr:street"], tags["addr:housenumber"]].filter(Boolean).join(", ") || null,
        lng: round6(pt[0]),
        lat: round6(pt[1]),
        source: "OpenStreetMap",
      });
    }
  } catch (err) {
    console.warn(`OSM/Overpass indisponível: ${err.message}`);
  }
}

// 3) INEP — Censo Escolar microdata (optional, authoritative) ----------------
if (inepPath) {
  try {
    console.log(`INEP: lendo microdados de ${inepPath}…`);
    const raw = await readFile(inepPath, "latin1"); // INEP CSVs are ISO-8859-1
    const lines = raw.split(/\r?\n/).filter(Boolean);
    const sep = lines[0].includes(";") ? ";" : ",";
    const header = lines[0].split(sep).map((h) => stripAccents(h.replace(/"/g, "")));
    const col = (re) => header.findIndex((h) => re.test(h));
    const iMun = col(/co_municipio/);
    const iName = col(/no_entidade|no_escola/);
    const iDep = col(/tp_dependencia/); // 1 fed, 2 est, 3 mun, 4 priv
    const iLat = col(/latitude/);
    const iLng = col(/longitude/);
    const depMap = { "1": "federal", "2": "estadual", "3": "municipal", "4": "privada" };
    let used = 0;
    for (const line of lines.slice(1)) {
      const cells = line.split(sep).map((c) => c.replace(/^"|"$/g, ""));
      if (cells[iMun] !== FLORIPA_IBGE) continue;
      const name = cells[iName];
      if (!name) continue;
      const lat = Number(String(cells[iLat]).replace(",", "."));
      const lng = Number(String(cells[iLng]).replace(",", "."));
      records.push({
        name,
        network: depMap[cells[iDep]] ?? classifyNetwork(name),
        level: classifyLevel(name),
        bairro: null,
        regiao: null,
        address: null,
        lng: Number.isFinite(lng) ? round6(lng) : null,
        lat: Number.isFinite(lat) ? round6(lat) : null,
        source: "INEP Censo Escolar",
      });
      used++;
    }
    console.log(`INEP: ${used} estabelecimentos em Florianópolis.`);
  } catch (err) {
    console.warn(`INEP indisponível (${err.message}). Continuando sem essa fonte.`);
  }
}

if (records.length === 0) {
  console.error("Nenhum dado coletado. Verifique a conexão e tente novamente.");
  process.exit(1);
}

// Dedup by proximity (INEP > GeoPortal > OSM). Records without coords are kept.
const rank = { "INEP Censo Escolar": 0, "GeoPortal PMF": 1, OpenStreetMap: 2 };
records.sort((a, b) => (rank[a.source] ?? 9) - (rank[b.source] ?? 9));
const kept = [];
for (const r of records) {
  if (r.lat == null || r.lng == null) {
    kept.push(r);
    continue;
  }
  const dup = kept.find(
    (k) => k.lat != null && haversine(k.lat, k.lng, r.lat, r.lng) <= DEDUP_M,
  );
  if (!dup) kept.push(r);
}

const features = kept.map((r) => ({
  type: "Feature",
  geometry: r.lat != null ? { type: "Point", coordinates: [r.lng, r.lat] } : null,
  properties: {
    name: r.name,
    network: r.network,
    level: r.level,
    bairro: r.bairro,
    regiao: r.regiao,
    address: r.address,
    source: r.source,
  },
}));

const geojson = {
  type: "FeatureCollection",
  metadata: {
    description: "Escolas e universidades de Florianópolis (snapshot para pesquisa)",
    sources: [
      "Prefeitura de Florianópolis — GeoPortal (CC BY 4.0)",
      "© OpenStreetMap contributors (ODbL)",
      ...(inepPath ? ["INEP — Censo Escolar (microdados)"] : []),
    ],
    generatedAt: new Date().toISOString().slice(0, 10),
    count: features.length,
  },
  features,
};

await mkdir(dirname(OUT), { recursive: true });
await writeFile(OUT, JSON.stringify(geojson, null, 2));

const byNetwork = {};
const byLevel = {};
for (const f of features) {
  byNetwork[f.properties.network] = (byNetwork[f.properties.network] ?? 0) + 1;
  byLevel[f.properties.level] = (byLevel[f.properties.level] ?? 0) + 1;
}

console.log(`\nGravadas ${features.length} escolas/IES em ${OUT}`);
console.log("\nPor rede:");
for (const [k, n] of Object.entries(byNetwork).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${k.padEnd(13)} ${n}`);
}
console.log("\nPor nível:");
for (const [k, n] of Object.entries(byLevel).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${k.padEnd(13)} ${n}`);
}
