// Service worker do Imigrantes Floripa — instalável + suporte offline.
// Estratégias: network-first para navegação (com fallback offline) e
// stale-while-revalidate para assets estáticos. Sem dependências externas.

const VERSION = "v1";
const PRECACHE = `if-precache-${VERSION}`;
const RUNTIME = `if-runtime-${VERSION}`;

// Recursos garantidos no primeiro carregamento.
const PRECACHE_URLS = [
  "/manifest.webmanifest",
  "/icon-192.png",
  "/icon-512.png",
];

// Página exibida quando não há rede e o conteúdo não está em cache.
const OFFLINE_HTML = `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Sem conexão · Imigrantes Floripa</title>
<style>
  :root { color-scheme: light dark; }
  body {
    margin: 0; min-height: 100dvh; display: flex; align-items: center;
    justify-content: center; background: #fbf8f4; color: #1b2440;
    font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
    padding: 24px; text-align: center;
  }
  .card { max-width: 24rem; }
  .badge {
    width: 64px; height: 64px; border-radius: 18px; margin: 0 auto 20px;
    background: #2a4d9b; display: flex; align-items: center; justify-content: center;
  }
  h1 { font-size: 1.4rem; margin: 0 0 8px; }
  p { color: #5b6478; line-height: 1.5; margin: 0 0 20px; }
  button {
    border: 0; border-radius: 999px; padding: 10px 20px; font-size: 0.95rem;
    font-weight: 600; color: #fff; background: #2a4d9b; cursor: pointer;
  }
  @media (prefers-color-scheme: dark) {
    body { background: #0f1830; color: #eef1f8; }
    p { color: #aab4c8; }
  }
</style>
</head>
<body>
  <div class="card">
    <div class="badge">
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none"
        stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
      </svg>
    </div>
    <h1>Você está sem conexão</h1>
    <p>Esta página ainda não foi salva no seu aparelho. Reconecte à internet para continuar.<br /><br />
    <span style="opacity:.7">Estás sin conexión. Reconéctate a internet para continuar.</span></p>
    <button onclick="location.reload()">Tentar de novo</button>
  </div>
</body>
</html>`;

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(PRECACHE);
      await cache.addAll(
        PRECACHE_URLS.map((url) => new Request(url, { cache: "reload" })),
      );
      await self.skipWaiting();
    })(),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((key) => key !== PRECACHE && key !== RUNTIME)
          .map((key) => caches.delete(key)),
      );
      await self.clients.claim();
    })(),
  );
});

function isStaticAsset(url) {
  return (
    url.pathname.startsWith("/_next/static/") ||
    url.pathname.startsWith("/illustrations/") ||
    url.pathname.startsWith("/logos/") ||
    url.pathname.startsWith("/icons/") ||
    /\.(?:css|js|woff2?|ttf|otf|png|jpg|jpeg|webp|avif|svg|ico)$/.test(
      url.pathname,
    )
  );
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Navegação (abrir páginas): network-first, cache, depois offline.
  if (request.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          const fresh = await fetch(request);
          const cache = await caches.open(RUNTIME);
          cache.put(request, fresh.clone());
          return fresh;
        } catch {
          const cached = await caches.match(request);
          if (cached) return cached;
          return new Response(OFFLINE_HTML, {
            headers: { "Content-Type": "text/html; charset=utf-8" },
          });
        }
      })(),
    );
    return;
  }

  // Assets estáticos: stale-while-revalidate.
  if (isStaticAsset(url)) {
    event.respondWith(
      (async () => {
        const cached = await caches.match(request);
        const network = fetch(request)
          .then((response) => {
            if (response && response.ok) {
              caches.open(RUNTIME).then((cache) => cache.put(request, response.clone()));
            }
            return response;
          })
          .catch(() => cached);
        return cached || network;
      })(),
    );
  }
});
