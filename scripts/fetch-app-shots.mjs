/**
 * Busca ícone + screenshots OFICIAIS dos apps na iTunes Search API da Apple
 * (gratuita, sem chave). Usado para compor o guia "Aplicativos essenciais".
 *
 * Os arquivos vão para docs/referencias/app-shots/ (pasta ignorada no git).
 * Depois de revisar no preview.html, as telas escolhidas são otimizadas e
 * movidas manualmente para public/app-shots/ para entrar no post.
 *
 * Uso: node scripts/fetch-app-shots.mjs
 */
import fs from "node:fs/promises";
import path from "node:path";

const OUT_DIR = "docs/referencias/app-shots";
const COUNTRY = "BR";
const SHOTS_PER_APP = 3;

/** Lista de apps do guia. `term` é o que buscamos na App Store brasileira. */
// Apps disponíveis na App Store iOS (BR). Quando soubermos o ID exato,
// preferimos `id` (lookup) a `term` (search) — mais confiável.
// Não estão aqui (sem app iOS confiável; pegar screenshots no Google Play
// manualmente): SI.GO, Alô Saúde Floripa, Emprega Brasil/SINE.
const APPS = [
  { slug: "floripa-no-ponto", id: 1659716692 }, // Floripa no Ponto 2.0
  { slug: "uber", term: "Uber" },
  { slug: "99", term: "99 corridas e entregas" },
  { slug: "conecte-sus", term: "Conecte SUS" }, // → "Meu SUS Digital"
  { slug: "govbr", term: "gov.br" },
  { slug: "ctps-digital", id: 1295257499 }, // Carteira de Trabalho Digital
  { slug: "clique-cidadania", term: "Clique Cidadania" },
  { slug: "deepl", term: "DeepL Tradutor" },
  { slug: "duolingo", term: "Duolingo" },
  { slug: "tandem", term: "Tandem aprender idiomas" },
  { slug: "nubank", term: "Nubank" },
  { slug: "inter", term: "Banco Inter" },
  { slug: "c6", term: "C6 Bank" },
  { slug: "ifood", term: "iFood" },
  { slug: "rappi", term: "Rappi" },
  { slug: "quintoandar", term: "QuintoAndar" },
  { slug: "zap-imoveis", term: "Zap Imóveis" },
  { slug: "olx", term: "OLX" },
];

async function search(term) {
  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(
    term,
  )}&country=${COUNTRY}&entity=software&limit=5`;
  const res = await fetch(url, {
    headers: { "User-Agent": "imigrantes-floripa-guide" },
  });
  if (!res.ok) throw new Error(`search "${term}" -> HTTP ${res.status}`);
  const json = await res.json();
  return json.results ?? [];
}

/** Busca direta por ID da App Store (mais confiável quando soubermos o ID). */
async function lookup(id) {
  const url = `https://itunes.apple.com/lookup?id=${id}&country=${COUNTRY}`;
  const res = await fetch(url, {
    headers: { "User-Agent": "imigrantes-floripa-guide" },
  });
  if (!res.ok) throw new Error(`lookup ${id} -> HTTP ${res.status}`);
  const json = await res.json();
  return json.results ?? [];
}

async function download(url, file) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`download ${url} -> HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await fs.writeFile(file, buf);
}

function ext(url) {
  const m = url.split("?")[0].match(/\.(png|jpg|jpeg|webp)$/i);
  return m ? m[1].toLowerCase() : "png";
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  const manifest = [];

  for (const app of APPS) {
    process.stdout.write(`• ${app.slug} (${app.id ? `id ${app.id}` : `"${app.term}"`}) ... `);
    try {
      const results = app.id ? await lookup(app.id) : await search(app.term);
      if (results.length === 0) {
        console.log("sem resultados");
        manifest.push({ ...app, error: "no results" });
        continue;
      }
      // Heurística simples: primeiro resultado (ranking da Apple). O preview
      // mostra o nome encontrado para revisão humana.
      const best = results[0];
      const appDir = path.join(OUT_DIR, app.slug);
      await fs.mkdir(appDir, { recursive: true });

      const entry = {
        slug: app.slug,
        term: app.term,
        matchedName: best.trackName,
        seller: best.sellerName,
        trackId: best.trackId,
        url: best.trackViewUrl,
        candidates: results.map((r) => r.trackName),
        icon: null,
        shots: [],
      };

      if (best.artworkUrl512 || best.artworkUrl100) {
        const iconUrl = best.artworkUrl512 || best.artworkUrl100;
        const iconFile = path.join(appDir, `icon.${ext(iconUrl)}`);
        await download(iconUrl, iconFile);
        entry.icon = path.relative(OUT_DIR, iconFile);
      }

      const rawShots =
        best.screenshotUrls && best.screenshotUrls.length > 0
          ? best.screenshotUrls
          : (best.ipadScreenshotUrls ?? []);
      const shots = rawShots.slice(0, SHOTS_PER_APP);
      let i = 1;
      for (const shotUrl of shots) {
        const shotFile = path.join(appDir, `shot-${i}.${ext(shotUrl)}`);
        await download(shotUrl, shotFile);
        entry.shots.push(path.relative(OUT_DIR, shotFile));
        i++;
      }

      manifest.push(entry);
      console.log(`ok — "${best.trackName}" (${entry.shots.length} telas)`);
    } catch (err) {
      console.log(`ERRO: ${err.message}`);
      manifest.push({ ...app, error: err.message });
    }
  }

  await fs.writeFile(
    path.join(OUT_DIR, "manifest.json"),
    JSON.stringify(manifest, null, 2),
  );

  // Preview HTML para conferência humana.
  const cards = manifest
    .map((m) => {
      if (m.error) {
        return `<div class="card err"><h3>${m.slug}</h3><p>busca: "${m.term}"</p><p class="bad">ERRO: ${m.error}</p></div>`;
      }
      const shots = m.shots
        .map((s) => `<img class="shot" src="${m.slug}/${path.basename(s)}" />`)
        .join("");
      const cands = (m.candidates || []).join(" · ");
      return `<div class="card">
        <div class="head">
          ${m.icon ? `<img class="icon" src="${m.slug}/${path.basename(m.icon)}" />` : ""}
          <div>
            <h3>${m.slug}</h3>
            <p><b>${m.matchedName}</b><br/><span class="muted">${m.seller || ""}</span></p>
            <p class="muted">busca: "${m.term}"</p>
            <p class="muted">outros candidatos: ${cands}</p>
            <a href="${m.url}" target="_blank">abrir na App Store</a>
          </div>
        </div>
        <div class="shots">${shots}</div>
      </div>`;
    })
    .join("\n");

  const html = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>Preview — screenshots dos apps</title>
<style>
  body{font-family:system-ui,sans-serif;margin:0;padding:24px;background:#f5f1f8;color:#1b2440}
  h1{font-size:1.4rem}
  .card{background:#fff;border:1px solid #dde3ee;border-radius:16px;padding:16px;margin:16px 0;box-shadow:0 1px 3px rgba(0,0,0,.05)}
  .card.err{border-color:#e0b4b4;background:#fff6f6}
  .head{display:flex;gap:14px;align-items:flex-start}
  .icon{width:64px;height:64px;border-radius:16px;border:1px solid #dde3ee}
  .shots{display:flex;gap:10px;overflow-x:auto;margin-top:14px}
  .shot{height:360px;border-radius:12px;border:1px solid #dde3ee}
  h3{margin:0 0 4px;color:#2a4d9b;text-transform:uppercase;letter-spacing:.04em;font-size:.85rem}
  p{margin:2px 0}
  .muted{color:#5b6478;font-size:.85rem}
  .bad{color:#b02a2a;font-weight:600}
  a{color:#2a4d9b}
</style></head><body>
<h1>Screenshots dos apps — conferência</h1>
<p class="muted">Confirme se o app encontrado (em negrito) é o correto. Escolha quais telas usar e me diga. Fonte: iTunes Search API (App Store BR).</p>
${cards}
</body></html>`;

  await fs.writeFile(path.join(OUT_DIR, "preview.html"), html);

  console.log(`\nPronto. Manifesto e preview em ${OUT_DIR}/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
