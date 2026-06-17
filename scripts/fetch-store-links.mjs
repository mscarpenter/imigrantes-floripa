/**
 * Coleta os links OFICIAIS de cada app do guia "Aplicativos essenciais" nas
 * duas lojas: App Store (iTunes Search API, BR) e Google Play (busca + verificação
 * do pacote). Imprime um JSON pronto para colar em src/lib/data/apps.ts.
 *
 * Uso: node scripts/fetch-store-links.mjs
 */
const COUNTRY = "BR";

// `slug` = nome do arquivo em public/app-icons ou public/app-shots.
// `appStoreId` quando conhecido (lookup é mais confiável que search).
// `playId` quando conhecido (evita a busca, que é frágil).
const APPS = [
  { slug: "floripa-no-ponto", term: "Floripa no Ponto", appStoreId: 1659716692 },
  { slug: "uber", term: "Uber" },
  { slug: "99", term: "99 corridas e entregas" },
  { slug: "alo-saude", term: "Alô Saúde Floripa" },
  { slug: "conecte-sus", term: "Meu SUS Digital Conecte SUS" },
  { slug: "govbr", term: "gov.br" },
  { slug: "ctps-digital", term: "Carteira de Trabalho Digital", appStoreId: 1295257499 },
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

const UA =
  "Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36";

async function appStore(app) {
  const url = app.appStoreId
    ? `https://itunes.apple.com/lookup?id=${app.appStoreId}&country=${COUNTRY}`
    : `https://itunes.apple.com/search?term=${encodeURIComponent(
        app.term,
      )}&country=${COUNTRY}&entity=software&limit=3`;
  const res = await fetch(url, { headers: { "User-Agent": "imigrantes-floripa-guide" } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  const best = (json.results ?? [])[0];
  if (!best) return null;
  return {
    name: best.trackName,
    seller: best.sellerName,
    url: (best.trackViewUrl || "").split("?")[0],
  };
}

async function playStore(term) {
  const url = `https://play.google.com/store/search?q=${encodeURIComponent(
    term,
  )}&c=apps&hl=pt_BR&gl=BR`;
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const html = await res.text();
  const m = html.match(/\/store\/apps\/details\?id=([a-zA-Z0-9._]+)/);
  if (!m) return null;
  const pkg = m[1];
  return {
    package: pkg,
    url: `https://play.google.com/store/apps/details?id=${pkg}`,
  };
}

async function main() {
  const out = {};
  for (const app of APPS) {
    let ios = null;
    let android = null;
    try {
      ios = await appStore(app);
    } catch (err) {
      ios = { error: err.message };
    }
    try {
      android = await playStore(app.term);
    } catch (err) {
      android = { error: err.message };
    }
    out[app.slug] = { term: app.term, ios, android };
    const iosStr = ios?.url ? `iOS: ${ios.name} → ${ios.url}` : `iOS: ${ios?.error || "—"}`;
    const andStr = android?.url ? `Android: ${android.package}` : `Android: ${android?.error || "—"}`;
    console.log(`• ${app.slug}\n    ${iosStr}\n    ${andStr}`);
    await new Promise((r) => setTimeout(r, 300));
  }
  console.log("\n===JSON===");
  console.log(JSON.stringify(out, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
