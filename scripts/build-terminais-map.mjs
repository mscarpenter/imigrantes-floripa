// Gera um mapa estático dos 6 terminais de integração de Florianópolis
// usando tiles do OpenStreetMap (dado aberto). Sem chave de API.
//
// Uso: node scripts/build-terminais-map.mjs
// Saída: public/maps/terminais-floripa.png  (+ atribuição obrigatória do OSM)
//
// Crédito obrigatório ao publicar: "© OpenStreetMap contributors".

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const TILE = 256;
const OUT_DIR = path.resolve("public/maps");
const OUT_FILE = path.join(OUT_DIR, "terminais-floripa.png");
const UA =
  "imigrantes-floripa/1.0 (mapa estático didático; contato via repositório)";

// Posições aproximadas dos terminais (lat, lon). Conferir com voluntário.
const TERMINALS = [
  { id: "TICAN", name: "Canasvieiras (Norte)", lat: -27.4307, lon: -48.4635 },
  { id: "TISAN", name: "Santo Antônio (Noroeste)", lat: -27.5078, lon: -48.5235 },
  { id: "TITRI", name: "Trindade (UFSC)", lat: -27.5856, lon: -48.5205 },
  { id: "TICEN", name: "Centro (hub principal)", lat: -27.5949, lon: -48.556 },
  { id: "TILAG", name: "Lagoa da Conceição (Leste)", lat: -27.6022, lon: -48.467 },
  { id: "TIRIO", name: "Rio Tavares (Sul)", lat: -27.671, lon: -48.4945 },
];

const MAX_W = 1100;
const MAX_H = 1450;
const PAD = 0.018; // graus de margem ao redor dos pontos

function lonToTileX(lon, z) {
  return ((lon + 180) / 360) * 2 ** z;
}
function latToTileY(lat, z) {
  const r = (lat * Math.PI) / 180;
  return ((1 - Math.log(Math.tan(r) + 1 / Math.cos(r)) / Math.PI) / 2) * 2 ** z;
}

function bbox() {
  const lats = TERMINALS.map((t) => t.lat);
  const lons = TERMINALS.map((t) => t.lon);
  return {
    minLat: Math.min(...lats) - PAD,
    maxLat: Math.max(...lats) + PAD,
    minLon: Math.min(...lons) - PAD,
    maxLon: Math.max(...lons) + PAD,
  };
}

function pickZoom(b) {
  for (let z = 14; z >= 9; z--) {
    const w = (lonToTileX(b.maxLon, z) - lonToTileX(b.minLon, z)) * TILE;
    const h = (latToTileY(b.minLat, z) - latToTileY(b.maxLat, z)) * TILE;
    if (w <= MAX_W && h <= MAX_H) return z;
  }
  return 11;
}

async function fetchTile(z, x, y) {
  const sub = ["a", "b", "c"][(x + y) % 3];
  const url = `https://${sub}.tile.openstreetmap.org/${z}/${x}/${y}.png`;
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`tile ${z}/${x}/${y} -> ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

async function main() {
  const b = bbox();
  const z = pickZoom(b);
  console.log("zoom escolhido:", z);

  const x0f = lonToTileX(b.minLon, z);
  const x1f = lonToTileX(b.maxLon, z);
  const y0f = latToTileY(b.maxLat, z); // topo (lat maior)
  const y1f = latToTileY(b.minLat, z); // base (lat menor)

  const tx0 = Math.floor(x0f);
  const tx1 = Math.floor(x1f);
  const ty0 = Math.floor(y0f);
  const ty1 = Math.floor(y1f);

  const cols = tx1 - tx0 + 1;
  const rows = ty1 - ty0 + 1;
  const fullW = cols * TILE;
  const fullH = rows * TILE;
  console.log(`baixando ${cols * rows} tiles (${cols}x${rows})...`);

  const composites = [];
  for (let ix = 0; ix < cols; ix++) {
    for (let iy = 0; iy < rows; iy++) {
      const buf = await fetchTile(z, tx0 + ix, ty0 + iy);
      composites.push({ input: buf, left: ix * TILE, top: iy * TILE });
      await new Promise((r) => setTimeout(r, 120)); // educado com o servidor
    }
  }

  const stitched = await sharp({
    create: {
      width: fullW,
      height: fullH,
      channels: 3,
      background: { r: 233, g: 231, b: 225 },
    },
  })
    .composite(composites)
    .png()
    .toBuffer();

  // Recorte para a bbox exata
  const cropLeft = Math.round((x0f - tx0) * TILE);
  const cropTop = Math.round((y0f - ty0) * TILE);
  const cropW = Math.round((x1f - x0f) * TILE);
  const cropH = Math.round((y1f - y0f) * TILE);

  const baseW = cropW;
  const baseH = cropH;

  // Posição em pixels de cada terminal dentro do recorte
  const toPx = (lat, lon) => ({
    x: (lonToTileX(lon, z) - tx0) * TILE - cropLeft,
    y: (latToTileY(lat, z) - ty0) * TILE - cropTop,
  });

  // Overlay SVG: pinos + rótulos + atribuição
  const esc = (s) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const pins = TERMINALS.map((t) => {
    const p = toPx(t.lat, t.lon);
    const labelW = 64;
    // rótulo à esquerda se estiver perto da borda direita
    const right = p.x + 14 + labelW > baseW;
    const lx = right ? p.x - 14 - labelW : p.x + 14;
    return `
      <g>
        <g transform="translate(${p.x - 13},${p.y - 34})">
          <path d="M13 0C6 0 .5 5.5.5 12.5.5 22 13 34 13 34s12.5-12 12.5-21.5C25.5 5.5 20 0 13 0z" fill="#c56a3f" stroke="#ffffff" stroke-width="2"/>
          <circle cx="13" cy="12.5" r="5" fill="#ffffff"/>
        </g>
        <rect x="${lx}" y="${p.y - 26}" width="${labelW}" height="22" rx="6" fill="#1b2440" opacity="0.92"/>
        <text x="${lx + labelW / 2}" y="${p.y - 11}" font-size="13" font-weight="700" fill="#ffffff" text-anchor="middle" font-family="ui-sans-serif, system-ui, sans-serif">${esc(t.id)}</text>
      </g>`;
  }).join("");

  const attr = `
    <rect x="${baseW - 232}" y="${baseH - 24}" width="232" height="20" fill="#ffffff" opacity="0.82"/>
    <text x="${baseW - 6}" y="${baseH - 10}" font-size="11" fill="#333" text-anchor="end" font-family="ui-sans-serif, system-ui, sans-serif">© OpenStreetMap contributors</text>`;

  const overlay = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${baseW}" height="${baseH}">${pins}${attr}</svg>`,
  );

  await mkdir(OUT_DIR, { recursive: true });
  await sharp(stitched)
    .extract({ left: cropLeft, top: cropTop, width: cropW, height: cropH })
    .composite([{ input: overlay, left: 0, top: 0 }])
    .png()
    .toFile(OUT_FILE);

  console.log(`OK -> ${OUT_FILE} (${baseW}x${baseH})`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
