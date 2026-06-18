/**
 * Busca web gratuita — sem Google Custom Search (sem API key, sem custo).
 *
 * 1. DuckDuckGo Instant Answer (JSON público)
 * 2. DuckDuckGo HTML lite (POST, parse de links uddg=)
 *
 * Respeite rate limit: ~1 req/s entre buscas.
 */
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

export function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

function parseDdgRedirectLinks(html: string): string[] {
  const urls: string[] = [];
  const re = /uddg=([^&"'<>]+)/g;
  for (const m of html.matchAll(re)) {
    try {
      urls.push(decodeURIComponent(m[1]));
    } catch {
      /* skip malformed */
    }
  }
  return [...new Set(urls)];
}

/** Links diretos em resultados HTML (formato atual do DDG lite). */
function parseDdgResultLinks(html: string): string[] {
  const urls: string[] = [];
  const re =
    /class="result__a"[^>]*href="(https?:\/\/[^"#]+)"/gi;
  for (const m of html.matchAll(re)) {
    try {
      urls.push(decodeURIComponent(m[1]));
    } catch {
      /* skip malformed */
    }
  }
  return [...new Set(urls)];
}

/** API JSON gratuita do DuckDuckGo (resultados limitados, sem chave). */
export async function searchInstant(query: string): Promise<string[]> {
  const url = new URL("https://api.duckduckgo.com/");
  url.searchParams.set("q", query);
  url.searchParams.set("format", "json");
  url.searchParams.set("no_redirect", "1");
  url.searchParams.set("no_html", "1");
  url.searchParams.set("skip_disambig", "1");

  const res = await fetch(url.toString(), {
    headers: { "User-Agent": UA, Accept: "application/json" },
  });
  if (!res.ok) return [];

  const data = (await res.json()) as {
    AbstractURL?: string;
    Results?: { FirstURL?: string }[];
    RelatedTopics?: { FirstURL?: string; Topics?: { FirstURL?: string }[] }[];
  };

  const urls: string[] = [];
  if (data.AbstractURL) urls.push(data.AbstractURL);
  for (const r of data.Results ?? []) {
    if (r.FirstURL) urls.push(r.FirstURL);
  }
  for (const topic of data.RelatedTopics ?? []) {
    if (topic.FirstURL) urls.push(topic.FirstURL);
    for (const sub of topic.Topics ?? []) {
      if (sub.FirstURL) urls.push(sub.FirstURL);
    }
  }
  return [...new Set(urls)];
}

/** HTML lite do DuckDuckGo — mais resultados, ainda gratuito. */
export async function searchHtml(query: string): Promise<string[]> {
  const body = new URLSearchParams({ q: query });
  const res = await fetch("https://html.duckduckgo.com/html/", {
    method: "POST",
    headers: {
      "User-Agent": UA,
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "text/html",
    },
    body,
  });
  if (!res.ok) return [];
  const html = await res.text();
  return [...new Set([...parseDdgRedirectLinks(html), ...parseDdgResultLinks(html)])];
}

/** Agrega buscas gratuitas e devolve URLs únicas. */
export async function searchWeb(query: string): Promise<string[]> {
  const instant = await searchInstant(query);
  await sleep(1100);
  const html = await searchHtml(query);
  return [...new Set([...instant, ...html])];
}
