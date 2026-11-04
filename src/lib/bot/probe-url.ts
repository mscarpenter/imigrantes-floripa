const UA =
  "Mozilla/5.0 (compatible; imigrantes-floripa-bot/1.0; +https://imigrantes-floripa.vercel.app)";

export type ProbeResult =
  | { status: "ok"; httpStatus: number }
  | { status: "blocked"; httpStatus: number }
  | { status: "dead"; error: string };

/**
 * Verifica se uma URL responde. Sites gov.br costumam bloquear HEAD (403) ou
 * rejeitar conexões de datacenters estrangeiros (GitHub Actions).
 * Usamos GET e tratamos bloqueios e falhas de conexão em domínio oficial gov.br como "blocked", não morto.
 */
export async function probeUrl(
  url: string,
  timeoutMs = 15_000,
): Promise<ProbeResult> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  let host = "";
  try {
    host = new URL(url).hostname;
  } catch {
    return { status: "dead", error: "Invalid URL" };
  }

  const isGov = host.endsWith(".gov.br");

  try {
    const res = await fetch(url, {
      method: "GET",
      redirect: "follow",
      signal: controller.signal,
      headers: { "User-Agent": UA, Accept: "text/html,application/xhtml+xml" },
    });

    if (res.status < 400) {
      return { status: "ok", httpStatus: res.status };
    }

    if (
      isGov &&
      (res.status === 401 ||
        res.status === 403 ||
        res.status === 429 ||
        res.status === 503)
    ) {
      return { status: "blocked", httpStatus: res.status };
    }

    return { status: "dead", error: `HTTP ${res.status}` };
  } catch (err) {
    if (isGov) {
      return { status: "blocked", httpStatus: 0 };
    }
    const message = err instanceof Error ? err.message : String(err);
    return { status: "dead", error: message };
  } finally {
    clearTimeout(timer);
  }
}

export function isReachable(probe: ProbeResult): boolean {
  return probe.status === "ok" || probe.status === "blocked";
}
