// Cross-validates our OSM bus-stop snapshot against the official municipal
// source: Prefeitura de Florianópolis — GeoPortal, layer `pontos_onibus`
// (CC BY 4.0). Produces a coverage report (no data is shipped from here).
//
// Usage: node scripts/validate-bus-stops.mjs
// Official source: https://geofloripa.pmf.sc.gov.br/geoserver/Geoportal/ows

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname } from "node:path";

const WFS =
  "https://geofloripa.pmf.sc.gov.br/geoserver/Geoportal/ows" +
  "?service=WFS&version=2.0.0&request=GetFeature" +
  "&typeNames=Geoportal:pontos_onibus&outputFormat=application/json" +
  "&srsName=EPSG:4326";

const OSM_FILE = "public/data/bus-stops.geojson";
const REPORT = "docs/validacao-paradas.md";
const MATCH_M = 35; // a stop is "the same" if within this distance (meters)

function haversine(aLat, aLng, bLat, bLng) {
  const R = 6371000;
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(bLat - aLat);
  const dLng = toRad(bLng - aLng);
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(aLat)) * Math.cos(toRad(bLat)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(s), Math.sqrt(1 - s));
}

// Coarse grid index (~0.003° ≈ 300 m cells) for fast nearest-neighbour lookups.
const CELL = 0.003;
const key = (lat, lng) => `${Math.floor(lat / CELL)}:${Math.floor(lng / CELL)}`;

function buildIndex(points) {
  const grid = new Map();
  for (const p of points) {
    const k = key(p.lat, p.lng);
    if (!grid.has(k)) grid.set(k, []);
    grid.get(k).push(p);
  }
  return grid;
}

function nearest(grid, lat, lng) {
  const ci = Math.floor(lat / CELL);
  const cj = Math.floor(lng / CELL);
  let best = Infinity;
  for (let di = -1; di <= 1; di++) {
    for (let dj = -1; dj <= 1; dj++) {
      const cell = grid.get(`${ci + di}:${cj + dj}`);
      if (!cell) continue;
      for (const p of cell) {
        const d = haversine(lat, lng, p.lat, p.lng);
        if (d < best) best = d;
      }
    }
  }
  return best;
}

const toPoints = (geo) =>
  geo.features.map((f) => ({
    lat: f.geometry.coordinates[1],
    lng: f.geometry.coordinates[0],
    props: f.properties ?? {},
  }));

function stats(values) {
  if (values.length === 0) return { median: 0, p90: 0 };
  const s = [...values].sort((a, b) => a - b);
  const at = (q) => s[Math.min(s.length - 1, Math.floor(q * s.length))];
  return { median: at(0.5), p90: at(0.9) };
}

console.log("Baixando camada oficial (GeoPortal)…");
const res = await fetch(WFS, {
  headers: { "User-Agent": "imigrantes-floripa/0.1 (data validation)" },
});
if (!res.ok) throw new Error(`WFS HTTP ${res.status}`);
const official = toPoints(await res.json());

const osm = toPoints(JSON.parse(await readFile(OSM_FILE, "utf8")));

const officialGrid = buildIndex(official);
const osmGrid = buildIndex(osm);

// OSM stops with no official stop nearby → possibly extra / misplaced / stale.
let osmMatched = 0;
const osmMatchDists = [];
const osmOrphans = [];
for (const p of osm) {
  const d = nearest(officialGrid, p.lat, p.lng);
  if (d <= MATCH_M) {
    osmMatched++;
    osmMatchDists.push(d);
  } else {
    osmOrphans.push({ ...p, d });
  }
}

// Official stops with no OSM stop nearby → coverage gaps in our snapshot.
let officialCovered = 0;
const gaps = [];
for (const p of official) {
  const d = nearest(osmGrid, p.lat, p.lng);
  if (d <= MATCH_M) officialCovered++;
  else gaps.push({ ...p, d });
}

const ms = stats(osmMatchDists);
const pct = (n, total) => `${((100 * n) / total).toFixed(1)}%`;

const sampleGaps = gaps
  .slice(0, 15)
  .map(
    (g) =>
      `| ${g.props.logradouro ?? "—"} | ${g.props.regiao ?? "—"} | ${g.props.tipo_parada ?? "—"} | ${g.lat.toFixed(5)}, ${g.lng.toFixed(5)} |`,
  )
  .join("\n");

const report = `# Validação de paradas de ônibus — OSM × GeoPortal oficial

> Gerado por \`scripts/validate-bus-stops.mjs\` em ${new Date().toISOString().slice(0, 10)}.
> Fonte oficial: **Prefeitura de Florianópolis — GeoPortal**, camada \`pontos_onibus\` (CC BY 4.0).
> Snapshot em uso: \`${OSM_FILE}\` (OpenStreetMap, ODbL).
> Critério de correspondência: parada considerada "a mesma" quando há outra a até **${MATCH_M} m**.

## Totais

| Fonte | Paradas |
|---|---|
| GeoPortal oficial (\`pontos_onibus\`) | **${official.length}** |
| Nosso snapshot (OSM) | **${osm.length}** |
| Diferença | ${official.length - osm.length} |

## Qualidade do nosso snapshot (OSM → oficial)

- Paradas do OSM com correspondente oficial (≤ ${MATCH_M} m): **${osmMatched}** (${pct(osmMatched, osm.length)})
- Paradas do OSM **sem** correspondente oficial: **${osmOrphans.length}** (${pct(osmOrphans.length, osm.length)})
- Distância mediana ao oficial mais próximo (correspondências): **${ms.median.toFixed(1)} m** · p90: **${ms.p90.toFixed(1)} m**

## Cobertura (oficial → OSM)

- Paradas oficiais cobertas pelo nosso snapshot (≤ ${MATCH_M} m): **${officialCovered}** (${pct(officialCovered, official.length)})
- Paradas oficiais **ausentes** no nosso snapshot: **${gaps.length}** (${pct(gaps.length, official.length)})

### Amostra de paradas oficiais ausentes (15 primeiras)

| Logradouro | Região | Tipo | Coordenadas |
|---|---|---|---|
${sampleGaps}

## Leitura rápida

- ${officialCovered / official.length >= 0.85 ? "Boa cobertura" : "Cobertura parcial"}: o snapshot OSM cobre ${pct(officialCovered, official.length)} das paradas oficiais.
- O oficial tem ${official.length - osm.length > 0 ? `${official.length - osm.length} paradas a mais` : "menos paradas"} e inclui \`logradouro\`, \`regiao\` e \`tipo_parada\` — atributos que o OSM nem sempre traz.
`;

await mkdir(dirname(REPORT), { recursive: true });
await writeFile(REPORT, report);

console.log("\n==== RESUMO ====");
console.log(`Oficial: ${official.length} | OSM: ${osm.length}`);
console.log(
  `OSM com correspondente oficial: ${osmMatched} (${pct(osmMatched, osm.length)})`,
);
console.log(
  `Oficiais cobertas pelo OSM: ${officialCovered} (${pct(officialCovered, official.length)})`,
);
console.log(`Oficiais ausentes no snapshot: ${gaps.length}`);
console.log(`Mediana de distância (match): ${ms.median.toFixed(1)} m`);
console.log(`\nRelatório salvo em ${REPORT}`);
