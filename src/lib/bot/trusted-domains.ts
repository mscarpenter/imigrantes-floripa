import config from "../../../bot/config/trusted-domains.json";

export interface ScoredUrl {
  url: string;
  score: number;
  label: string;
}

function hostOf(url: string): string | null {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

export function trustScore(url: string): ScoredUrl {
  const host = hostOf(url);
  if (!host) return { url, score: 0, label: "invalid" };

  if (config.blockedHosts.some((b) => host === b || host.endsWith(`.${b}`))) {
    return { url, score: 0, label: "blocked-host" };
  }

  for (const d of config.domains) {
    if (host === d.host || host.endsWith(`.${d.host}`)) {
      return { url, score: d.score, label: d.host };
    }
  }

  let best = { score: 0, label: "other" };
  for (const s of config.suffixes) {
    if (host.endsWith(s.pattern.replace(/^\./, "")) || host.includes(s.pattern)) {
      if (s.score > best.score) best = { score: s.score, label: s.label };
    }
  }

  return { url, score: best.score, label: best.label };
}

export function pickBestTrustedUrl(urls: string[], minScore = 70): ScoredUrl | null {
  const ranked = urls
    .map(trustScore)
    .filter((u) => u.score >= minScore)
    .sort((a, b) => b.score - a.score);
  return ranked[0] ?? null;
}

export function searchQueriesForContact(
  contactId: string,
  defaultQuery: string,
): string[] {
  const extra =
    (config.searchQueries as Record<string, string[] | undefined>)[contactId] ??
    [];
  return [...new Set([defaultQuery, ...extra])];
}
