// One-off helper: geocodes contact addresses via OpenStreetMap Nominatim.
// Usage: node scripts/geocode-contacts.mjs
// Respects Nominatim usage policy (1 req/s, descriptive User-Agent).
// Output is reviewed by a human before being written into contacts.ts.

const targets = [
  {
    id: "policia-federal-floripa",
    query: "Avenida Governador Gustavo Richard, 367, Centro, Florianópolis, SC, Brasil",
  },
  {
    id: "receita-federal-floripa",
    query: "Rua Felipe Schmidt, 235, Centro, Florianópolis, SC, Brasil",
  },
  {
    id: "caritas-sc",
    query: "Rua Esteves Júnior, 447, Centro, Florianópolis, SC, Brasil",
  },
  {
    id: "upa-sul",
    query: "Rodovia SC-405, 4150, Rio Tavares, Florianópolis, SC, Brasil",
  },
  {
    id: "consorcio-fenix",
    query: "Terminal de Integração do Centro TICEN, Florianópolis, SC, Brasil",
  },
  {
    id: "sine-floripa",
    query: "Avenida Mauro Ramos, 722, Centro, Florianópolis, SC, Brasil",
  },
  {
    id: "defensoria-publica-uniao",
    query: "Rua Paschoal Apóstolo Pítsica, 4863, Agronômica, Florianópolis, SC, Brasil",
  },
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function geocode(query) {
  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("q", query);
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("limit", "1");
  url.searchParams.set("countrycodes", "br");

  const res = await fetch(url, {
    headers: {
      "User-Agent": "imigrantes-floripa/0.1 (contact map geocoding, one-off script)",
      "Accept-Language": "pt-BR",
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for "${query}"`);
  const data = await res.json();
  return data[0] ?? null;
}

const results = [];
for (const target of targets) {
  try {
    const hit = await geocode(target.query);
    if (hit) {
      results.push({
        id: target.id,
        lat: Number(Number(hit.lat).toFixed(6)),
        lng: Number(Number(hit.lon).toFixed(6)),
        display_name: hit.display_name,
      });
    } else {
      results.push({ id: target.id, lat: null, lng: null, display_name: "NOT FOUND" });
    }
  } catch (err) {
    results.push({ id: target.id, lat: null, lng: null, display_name: `ERROR: ${err.message}` });
  }
  await sleep(1100);
}

console.log(JSON.stringify(results, null, 2));
