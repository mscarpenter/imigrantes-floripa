/**
 * Busca screenshot promocional (primeira tela) no Google Play para apps
 * sem screenshots na iTunes API (WhatsApp, Maps, etc.).
 *
 * Uso: node scripts/fetch-play-shots.mjs
 */
import fs from "node:fs/promises";
import path from "node:path";

const OUT_DIR = "docs/referencias/app-shots";

const APPS = [
  { slug: "whatsapp", package: "com.whatsapp" },
  { slug: "google-maps", package: "com.google.android.apps.maps" },
  { slug: "deepl", package: "com.deepl.mobiletranslator" },
  { slug: "sebrae", package: "br.com.sebrae.mobile" },
];

function shotScore(url) {
  const wm = url.match(/=w(\d+)/);
  const hm = url.match(/-h(\d+)/);
  const w = wm ? Number(wm[1]) : 0;
  const h = hm ? Number(hm[1]) : 0;
  if (!w || !h) return 0;
  // Cards promocionais da Play Store (paisagem, ~526×296).
  if (w >= 500 && h >= 250 && w > h) return w * h;
  // Screenshots de telefone (retrato).
  if (h > w && h >= 400) return w * h * 2;
  return 0;
}

async function fetchPlayShots(packageId) {
  const url = `https://play.google.com/store/apps/details?id=${packageId}&hl=pt_BR&gl=BR`;
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 Chrome/120.0.0.0 Mobile Safari/537.36",
    },
  });
  if (!res.ok) throw new Error(`Play Store HTTP ${res.status}`);
  const html = await res.text();
  const re = /https:\/\/play-lh\.googleusercontent\.com\/[^"\\]+/g;
  const urls = [...new Set(html.match(re) ?? [])];
  const ranked = urls
    .map((u) => ({ u, score: shotScore(u) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);
  if (ranked.length > 0) return ranked.map((x) => x.u);
  // fallback: maior altura declarada na URL
  return urls
    .map((u) => ({ u, h: Number((u.match(/-h(\d+)/) ?? [0, 0])[1]) }))
    .filter((x) => x.h >= 400)
    .sort((a, b) => b.h - a.h)
    .map((x) => x.u);
}

async function download(url, file) {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "imigrantes-floripa-guide",
      Referer: "https://play.google.com/",
    },
  });
  if (!res.ok) throw new Error(`download HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 8000) throw new Error(`download too small (${buf.length} bytes)`);
  await fs.writeFile(file, buf);
}

async function main() {
  for (const app of APPS) {
    process.stdout.write(`• ${app.slug} (${app.package}) ... `);
    try {
      const shots = await fetchPlayShots(app.package);
      if (shots.length === 0) {
        console.log("sem screenshots");
        continue;
      }
      const appDir = path.join(OUT_DIR, app.slug);
      await fs.mkdir(appDir, { recursive: true });
      const shotFile = path.join(appDir, "shot-1.png");
      await download(shots[0], shotFile);
      console.log(`ok (${shots.length} candidatas)`);
    } catch (err) {
      console.log(`ERRO: ${err.message}`);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
