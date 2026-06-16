// Busca apps na Google Play Store e baixa screenshots/ícones.
// Uso pontual para complementar telas que faltam no guia de apps do blog
// (SI.GO, Alô Saúde Floripa, Emprega Brasil/SINE), que não têm app iOS confiável.
//
//   node scripts/fetch-play-shots.mjs
//
// Saída em docs/referencias/play-shots/<slug>/ (gitignored) + preview.html.

import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import mod from "google-play-scraper";

const gplay = mod.default ?? mod;

const OUT = "docs/referencias/play-shots";

// Cada item: termos de busca em ordem de preferência.
const QUERIES = [
  { slug: "sigo", label: "SI.GO (passagem avulsa)", terms: ["SI.GO Florianópolis", "SIGO Florianópolis", "SIGO passagem"] },
  { slug: "alo-saude-floripa", label: "Alô Saúde Floripa", terms: ["Alô Saúde Floripa", "Alo Saude Floripa", "Alô Saúde Florianópolis"] },
  { slug: "emprega-brasil", label: "Emprega Brasil / SINE", terms: ["Emprega Brasil", "SINE Fácil", "Carteira de Trabalho Digital SINE"] },
];

async function searchFirstHits(terms) {
  for (const term of terms) {
    try {
      const res = await gplay.search({ term, num: 5, country: "br", lang: "pt-br" });
      if (res && res.length) return { term, res };
    } catch (e) {
      console.error(`  ! erro buscando "${term}": ${e.message}`);
    }
  }
  return { term: terms[0], res: [] };
}

async function download(url, dest) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  const buf = Buffer.from(await r.arrayBuffer());
  await writeFile(dest, buf);
  return buf.length;
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const report = [];

  for (const q of QUERIES) {
    console.log(`\n=== ${q.label} ===`);
    const { term, res } = await searchFirstHits(q.terms);
    if (!res.length) {
      console.log(`  (sem resultados para ${q.terms.join(" | ")})`);
      report.push({ ...q, term, candidates: [] });
      continue;
    }

    const candidates = res.map((a) => ({
      title: a.title,
      appId: a.appId,
      developer: a.developer,
      url: a.url,
      score: a.scoreText,
    }));
    candidates.forEach((c, i) =>
      console.log(`  [${i}] ${c.title} — ${c.developer} (${c.appId})`)
    );

    // Detalhe completo do 1º candidato (tem screenshots).
    const best = res[0];
    let detail = null;
    try {
      detail = await gplay.app({ appId: best.appId, country: "br", lang: "pt-br" });
    } catch (e) {
      console.error(`  ! erro detalhando ${best.appId}: ${e.message}`);
    }

    const dir = join(OUT, q.slug);
    await mkdir(dir, { recursive: true });
    const shots = (detail && detail.screenshots) || [];
    const saved = [];

    if (detail?.icon) {
      try {
        await download(detail.icon, join(dir, "icon.png"));
        saved.push("icon.png");
      } catch (e) {
        console.error(`  ! ícone: ${e.message}`);
      }
    }
    for (let i = 0; i < Math.min(shots.length, 6); i++) {
      const name = `shot-${String(i + 1).padStart(2, "0")}.png`;
      try {
        await download(shots[i], join(dir, name));
        saved.push(name);
      } catch (e) {
        console.error(`  ! ${name}: ${e.message}`);
      }
    }
    console.log(`  -> ${best.title} (${best.appId}): ${saved.length} arquivos`);
    report.push({ ...q, term, picked: best.appId, title: detail?.title ?? best.title, candidates, saved });
  }

  // preview.html para conferência humana
  let html = `<!doctype html><meta charset="utf-8"><title>Play Store — telas candidatas</title>`;
  html += `<style>body{font-family:system-ui;margin:24px;background:#faf7f2}h2{margin-top:32px}img{height:300px;border:1px solid #ddd;border-radius:8px;margin:6px;vertical-align:top}.cand{font-size:13px;color:#444}</style>`;
  for (const r of report) {
    html += `<h2>${r.label}</h2>`;
    html += `<div class="cand">Busca: "${r.term}" · escolhido: <b>${r.picked ?? "—"}</b> (${r.title ?? ""})</div>`;
    html += `<div class="cand">Candidatos: ${r.candidates.map((c) => `${c.title} [${c.appId}]`).join(" · ") || "nenhum"}</div>`;
    for (const f of r.saved ?? []) {
      html += `<img src="${r.slug}/${f}" alt="${f}">`;
    }
  }
  await writeFile(join(OUT, "preview.html"), html);
  console.log(`\nPreview: ${join(OUT, "preview.html")}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
