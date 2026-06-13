// Snapshots Florianópolis bus stops from the official municipal source:
// Prefeitura de Florianópolis — GeoPortal (GeoServer WFS), layer `pontos_onibus`.
// Data: CC BY 4.0 — must credit "Prefeitura de Florianópolis — GeoPortal".
// Usage: node scripts/fetch-bus-stops.mjs  (re-run periodically to refresh)

import { writeFile, mkdir } from "node:fs/promises";
import { dirname } from "node:path";

const OUT = "public/data/bus-stops.geojson";

const OWS = "https://geofloripa.pmf.sc.gov.br/geoserver/Geoportal/ows";
const layerUrl = (layer) =>
  `${OWS}?service=WFS&version=2.0.0&request=GetFeature` +
  `&typeNames=Geoportal:${layer}&outputFormat=application/json&srsName=EPSG:4326`;

async function fetchLayer(layer) {
  const res = await fetch(layerUrl(layer), {
    headers: { "User-Agent": "imigrantes-floripa/0.1 (bus stops snapshot)" },
  });
  if (!res.ok) throw new Error(`GeoPortal WFS ${layer} HTTP ${res.status}`);
  return res.json();
}

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

// Coarse grid index (~0.0008° ≈ 80 m cells) for fast proximity lookups.
const CELL = 0.0008;
const SHELTER_M = 25; // a stop is "sheltered" if an abrigo sits within this range

const isPoint = (f) =>
  f.geometry?.type === "Point" &&
  Number.isFinite(f.geometry.coordinates?.[0]) &&
  Number.isFinite(f.geometry.coordinates?.[1]);

const [stops, shelters] = await Promise.all([
  fetchLayer("pontos_onibus"),
  fetchLayer("abrigos_onibus"),
]);

// Index shelters so each stop can check if it has one nearby.
const shelterGrid = new Map();
for (const f of shelters.features) {
  if (!isPoint(f)) continue;
  const [lng, lat] = f.geometry.coordinates;
  const k = `${Math.floor(lat / CELL)}:${Math.floor(lng / CELL)}`;
  if (!shelterGrid.has(k)) shelterGrid.set(k, []);
  shelterGrid.get(k).push([lat, lng]);
}

function hasShelterNear(lat, lng) {
  const ci = Math.floor(lat / CELL);
  const cj = Math.floor(lng / CELL);
  for (let di = -1; di <= 1; di++) {
    for (let dj = -1; dj <= 1; dj++) {
      const cell = shelterGrid.get(`${ci + di}:${cj + dj}`);
      if (!cell) continue;
      for (const [slat, slng] of cell) {
        if (haversine(lat, lng, slat, slng) <= SHELTER_M) return true;
      }
    }
  }
  return false;
}

const features = stops.features.filter(isPoint).map((f) => {
  const [lng, lat] = f.geometry.coordinates;
  const p = f.properties ?? {};
  return {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [Number(lng.toFixed(6)), Number(lat.toFixed(6))],
    },
    properties: {
      name: p.logradouro ?? null,
      regiao: p.regiao ?? null,
      tipo: hasShelterNear(lat, lng) ? "abrigo" : "placa",
    },
  };
});

const geojson = {
  type: "FeatureCollection",
  metadata: {
    source: "Prefeitura de Florianópolis — GeoPortal (pontos_onibus)",
    license: "CC BY 4.0",
    generatedAt: new Date().toISOString().slice(0, 10),
    count: features.length,
  },
  features,
};

await mkdir(dirname(OUT), { recursive: true });
await writeFile(OUT, JSON.stringify(geojson));

const abrigos = features.filter((f) => f.properties.tipo === "abrigo").length;
console.log(
  `Wrote ${features.length} bus stops to ${OUT} (${abrigos} abrigos, ${features.length - abrigos} placas)`,
);
