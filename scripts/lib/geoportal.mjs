// Shared helpers for snapshotting open data about Florianópolis.
//
// Two sources are used by the fetch-* scripts:
//   1. Prefeitura de Florianópolis — GeoPortal (GeoServer WFS). Official,
//      municipal, includes `regiao`/`bairro`. License: CC BY 4.0.
//      Must credit "Prefeitura de Florianópolis — GeoPortal".
//   2. OpenStreetMap via Overpass API. Crowd-sourced, covers state/federal/
//      private establishments the municipal portal may omit. License: ODbL.
//      Must credit "© OpenStreetMap contributors".
//
// These helpers only fetch + normalize. Output is always reviewed by a human
// before any of it is promoted into src/lib/data/.

const UA = "imigrantes-floripa/0.1 (open data snapshot; +https://imigrantes-floripa.vercel.app)";

const GEOPORTAL_OWS = "https://geofloripa.pmf.sc.gov.br/geoserver/Geoportal/ows";

// A few public Overpass mirrors; we try them in order until one answers.
const OVERPASS_ENDPOINTS = [
  "https://overpass-api.de/api/interpreter",
  "https://overpass.kumi.systems/api/interpreter",
  "https://maps.mail.ru/osm/tools/overpass/api/interpreter",
];

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export function stripAccents(s) {
  return String(s ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

// Distance in meters between two WGS84 points.
export function haversine(aLat, aLng, bLat, bLng) {
  const R = 6371000;
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(bLat - aLat);
  const dLng = toRad(bLng - aLng);
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(aLat)) * Math.cos(toRad(bLat)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(s), Math.sqrt(1 - s));
}

// Picks the first present, non-empty property whose key (accent/case folded)
// matches one of the candidates. Candidates may be substrings.
export function pickProp(props, candidates) {
  if (!props) return null;
  const folded = Object.keys(props).map((k) => [k, stripAccents(k)]);
  for (const cand of candidates) {
    const c = stripAccents(cand);
    for (const [orig, key] of folded) {
      if (key === c || key.includes(c)) {
        const v = props[orig];
        if (v !== null && v !== undefined && String(v).trim() !== "") {
          return String(v).trim();
        }
      }
    }
  }
  return null;
}

// Rough centroid for any GeoJSON geometry (Point/Line/Polygon/Multi*).
export function centroid(geometry) {
  if (!geometry) return null;
  const acc = { lng: 0, lat: 0, n: 0 };
  const walk = (coords) => {
    if (typeof coords[0] === "number") {
      const [lng, lat] = coords;
      if (Number.isFinite(lng) && Number.isFinite(lat)) {
        acc.lng += lng;
        acc.lat += lat;
        acc.n += 1;
      }
      return;
    }
    for (const c of coords) walk(c);
  };
  if (geometry.type === "Point") return geometry.coordinates;
  if (Array.isArray(geometry.coordinates)) walk(geometry.coordinates);
  return acc.n ? [acc.lng / acc.n, acc.lat / acc.n] : null;
}

export const round6 = (n) => Number(Number(n).toFixed(6));

// ---------------------------------------------------------------------------
// GeoPortal (GeoServer WFS)
// ---------------------------------------------------------------------------

// Lists every published layer with its name/title/abstract/keywords so callers
// can match by topic without hard-coding layer names (which vary over time).
export async function listGeoportalLayers() {
  const url =
    `${GEOPORTAL_OWS}?service=WFS&version=2.0.0&request=GetCapabilities`;
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`GeoPortal GetCapabilities HTTP ${res.status}`);
  const xml = await res.text();

  const tag = (block, name) => {
    const m = block.match(
      new RegExp(`<(?:\\w+:)?${name}>([\\s\\S]*?)</(?:\\w+:)?${name}>`, "i"),
    );
    return m ? m[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim() : "";
  };

  const layers = [];
  const blocks = xml.match(
    /<(?:\w+:)?FeatureType\b[\s\S]*?<\/(?:\w+:)?FeatureType>/gi,
  );
  for (const block of blocks ?? []) {
    const name = tag(block, "Name");
    if (!name) continue;
    layers.push({
      name,
      title: tag(block, "Title"),
      abstract: tag(block, "Abstract"),
      keywords: tag(block, "Keywords"),
    });
  }
  return layers;
}

export function matchLayers(layers, regex) {
  return layers.filter((l) =>
    regex.test(stripAccents(`${l.name} ${l.title} ${l.abstract} ${l.keywords}`)),
  );
}

// Downloads a layer as GeoJSON in EPSG:4326.
export async function fetchGeoportalLayer(name) {
  const url =
    `${GEOPORTAL_OWS}?service=WFS&version=2.0.0&request=GetFeature` +
    `&typeNames=${encodeURIComponent(name)}` +
    `&outputFormat=application/json&srsName=EPSG:4326`;
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`GeoPortal GetFeature ${name} HTTP ${res.status}`);
  return res.json();
}

// ---------------------------------------------------------------------------
// OpenStreetMap (Overpass API)
// ---------------------------------------------------------------------------

// Runs an Overpass QL query against the first mirror that answers.
export async function overpass(query) {
  let lastErr;
  for (const endpoint of OVERPASS_ENDPOINTS) {
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "User-Agent": UA,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ data: query }),
      });
      if (!res.ok) throw new Error(`Overpass HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      lastErr = err;
      await sleep(1500);
    }
  }
  throw new Error(`All Overpass mirrors failed: ${lastErr?.message}`);
}

// Normalizes an Overpass element (node/way/relation w/ `out center`) to a point.
export function overpassPoint(el) {
  if (el.type === "node") return [el.lon, el.lat];
  if (el.center) return [el.center.lon, el.center.lat];
  return null;
}
