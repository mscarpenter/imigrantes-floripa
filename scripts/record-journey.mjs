// Records a TUTORIAL-style walkthrough of the running app. It walks EVERY main
// page, but on each one performs only that page's "signature" action (the most
// representative interaction), varying the kind of interaction instead of
// clicking everything. Scrolling is paced to reading speed (from how much text
// the page has) and a visible cursor shows each click.
//
// Importance map (one action per page):
//   home      → click the "começar a trilha" CTA            (primary nav)
//   trilha    → open the first module                       (module card)
//   módulo    → open the first topic                        (topic card)
//   tópico    → read                                        (content)
//   contatos  → filter by a category, then open one contact (filter + modal)
//   mapa      → click a map marker → popup                  (map)
//   blog      → open a post                                 (card)
//   post      → read                                        (content)
//   faq       → expand one question                         (accordion)
//   sobre     → read the institutional cards                (content)
//
// Video is built from viewport frames encoded with the SYSTEM ffmpeg (we don't
// use Playwright recordVideo, which needs a Playwright-only ffmpeg). External
// links (target=_blank) are intentionally never clicked.
//
// Requires: dev server running (npm run dev), system Chrome/Chromium, ffmpeg on
// PATH (without ffmpeg you still get the screenshots).
//
// Usage:
//   npm run dev
//   npm run journey
//   node scripts/record-journey.mjs --lang es --device desktop --headed
//   node scripts/record-journey.mjs --wpm 130 --max-read 30 --fps 15
//
// Flags: --base --lang --device --wpm --min-read --max-read --fps --format
//        --ffmpeg --keep-frames --headed --slowmo  (see README/comments above)
// Output: docs/journey/<timestamp-lang-device>/ → journey.<mp4|webm> + NN-*.png

import { mkdir, writeFile, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import { spawn } from "node:child_process";
import { join } from "node:path";
import { homedir } from "node:os";

// ---- args ------------------------------------------------------------------
const argv = process.argv.slice(2);
const flag = (name, def) => {
  const i = argv.indexOf(`--${name}`);
  return i >= 0 ? argv[i + 1] : def;
};
const has = (name) => argv.includes(`--${name}`);

const BASE = flag("base", "http://localhost:3000").replace(/\/$/, "");
const LANG = flag("lang", "pt");
const DEVICE = flag("device", "mobile");
const WPM = Number(flag("wpm", "150"));
const MIN_READ = Number(flag("min-read", "4"));
const MAX_READ = Number(flag("max-read", "32"));
const FPS = Number(flag("fps", "12"));
const FORMAT = flag("format", "mp4");
const KEEP_FRAMES = has("keep-frames");
const HEADED = has("headed");
const SLOWMO = Number(flag("slowmo", "40"));

const viewport =
  DEVICE === "desktop" ? { width: 1366, height: 820 } : { width: 390, height: 844 };
const deviceScaleFactor = DEVICE === "desktop" ? 1 : 2;
const isMobile = DEVICE !== "desktop";

const stamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
const OUT_DIR = join("docs", "journey", `${stamp}-${LANG}-${DEVICE}`);
const FRAMES_DIR = join(OUT_DIR, "frames");
const L = LANG;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ---- visible tutorial cursor (injected on every page) ----------------------
function installCursor() {
  if (window.__tutCursorReady) return;
  window.__tutCursorReady = true;
  const style = document.createElement("style");
  style.textContent = `
    #__tut_cursor{position:fixed;left:0;top:0;z-index:2147483647;pointer-events:none;
      width:24px;height:24px;margin:-12px 0 0 -12px;
      transition:transform .6s cubic-bezier(.22,.61,.36,1);will-change:transform;}
    #__tut_cursor i{position:absolute;inset:0;border-radius:50%;
      background:rgba(234,88,12,.35);border:2px solid rgba(234,88,12,.95);
      box-shadow:0 1px 8px rgba(0,0,0,.3);}
    #__tut_cursor.click i{animation:__tut_press .35s ease-out;}
    #__tut_cursor.click b{position:absolute;left:50%;top:50%;width:12px;height:12px;
      transform:translate(-50%,-50%);border-radius:50%;border:2px solid rgba(234,88,12,.9);
      animation:__tut_pulse .55s ease-out forwards;}
    @keyframes __tut_press{50%{transform:scale(.7)}100%{transform:scale(1)}}
    @keyframes __tut_pulse{to{width:54px;height:54px;opacity:0}}`;
  (document.head || document.documentElement).appendChild(style);
  const c = document.createElement("div");
  c.id = "__tut_cursor";
  c.innerHTML = "<i></i>";
  const place = () => (document.body || document.documentElement).appendChild(c);
  if (document.body) place();
  else document.addEventListener("DOMContentLoaded", place);
  let x = window.innerWidth / 2;
  let y = window.innerHeight * 0.72;
  c.style.transform = `translate(${x}px,${y}px)`;
  window.__cursorTo = (nx, ny) => {
    x = nx;
    y = ny;
    c.style.transform = `translate(${x}px,${y}px)`;
  };
  window.__cursorClick = () => {
    c.classList.remove("click");
    void c.offsetWidth;
    const b = document.createElement("b");
    c.appendChild(b);
    c.classList.add("click");
    setTimeout(() => b.remove(), 600);
  };
}

// ---- ffmpeg ----------------------------------------------------------------
function resolveFfmpeg() {
  const explicit = flag("ffmpeg", process.env.FFMPEG_PATH);
  const candidates = [
    explicit,
    "ffmpeg",
    join(homedir(), "bin", "ffmpeg"),
    "/usr/bin/ffmpeg",
    "/usr/local/bin/ffmpeg",
  ].filter(Boolean);
  for (const c of candidates) if (c === "ffmpeg" || existsSync(c)) return c;
  return null;
}

function encode(ffmpeg, outFile) {
  const vf = "scale=trunc(iw/2)*2:trunc(ih/2)*2";
  const common = ["-y", "-framerate", String(FPS), "-i", join(FRAMES_DIR, "f-%06d.png")];
  const codec =
    FORMAT === "webm"
      ? ["-c:v", "libvpx-vp9", "-b:v", "0", "-crf", "32", "-pix_fmt", "yuv420p"]
      : ["-c:v", "libx264", "-preset", "veryfast", "-crf", "23", "-pix_fmt", "yuv420p"];
  return new Promise((resolve, reject) => {
    const p = spawn(ffmpeg, [...common, "-vf", vf, ...codec, outFile], {
      stdio: ["ignore", "ignore", "pipe"],
    });
    let err = "";
    p.stderr.on("data", (d) => (err += d));
    p.on("error", reject);
    p.on("close", (code) =>
      code === 0 ? resolve() : reject(new Error(`ffmpeg saiu com ${code}: ${err.slice(-400)}`)),
    );
  });
}

async function launch(chromium) {
  const candidates = [
    { channel: "chrome" },
    { channel: "chromium" },
    { executablePath: "/usr/bin/google-chrome" },
    { executablePath: "/snap/bin/chromium" },
    { executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH },
    {},
  ].filter((c) => c.executablePath === undefined || c.executablePath);
  let lastErr;
  for (const opts of candidates) {
    try {
      return await chromium.launch({ headless: !HEADED, slowMo: SLOWMO, ...opts });
    } catch (err) {
      lastErr = err;
    }
  }
  throw new Error(
    `Não consegui abrir um navegador. Instale o Chrome ou rode "npx playwright install chromium".\nÚltimo erro: ${lastErr?.message}`,
  );
}

// ---- bootstrap -------------------------------------------------------------
let chromium;
try {
  ({ chromium } = await import("playwright-core"));
} catch {
  console.error('playwright-core não encontrado. Rode "npm install" primeiro.');
  process.exit(1);
}

const ffmpeg = resolveFfmpeg();
await mkdir(FRAMES_DIR, { recursive: true });

const browser = await launch(chromium);
const context = await browser.newContext({
  viewport,
  deviceScaleFactor,
  isMobile,
  hasTouch: isMobile,
  locale: LANG === "es" ? "es-AR" : "pt-BR",
  reducedMotion: "no-preference",
});
await context.addInitScript(installCursor);
const page = await context.newPage();
page.setDefaultTimeout(45000);
page.setDefaultNavigationTimeout(60000);

console.log(`Tutorial ${LANG}/${DEVICE} em ${BASE} → ${OUT_DIR}`);
if (!ffmpeg) console.warn("ffmpeg não encontrado — vou gerar só os screenshots (sem vídeo).");

// ---- frame capture ---------------------------------------------------------
let frameNo = 0;
const frameInterval = 1000 / FPS;
async function grabFrame() {
  if (!ffmpeg) return;
  const buf = await page.screenshot();
  await writeFile(join(FRAMES_DIR, `f-${String(++frameNo).padStart(6, "0")}.png`), buf);
}
async function grabFor(ms) {
  const end = Date.now() + ms;
  do {
    const t0 = Date.now();
    await grabFrame();
    const rest = frameInterval - (Date.now() - t0);
    if (rest > 0) await sleep(rest);
  } while (Date.now() < end);
}

// ---- cursor + interaction primitives --------------------------------------
async function glideTo(locator) {
  await locator.scrollIntoViewIfNeeded().catch(() => {});
  await sleep(150);
  const box = await locator.boundingBox();
  if (!box) return false;
  const cx = box.x + box.width / 2;
  const cy = box.y + box.height / 2;
  await page.evaluate(([x, y]) => window.__cursorTo?.(x, y), [cx, cy]);
  await grabFor(750); // cursor glides onto the target
  await page.evaluate(() => window.__cursorClick?.());
  await grabFor(400); // click pulse
  return true;
}

// Click that triggers navigation; falls back to a direct visit.
async function navClick(selector, expect) {
  const locator = page.locator(selector).first();
  try {
    await locator.waitFor({ state: "visible", timeout: 8000 });
    await glideTo(locator);
    await Promise.all([
      page.waitForURL((u) => u.pathname.includes(expect), { timeout: 30000 }),
      locator.click(),
    ]);
    await page.waitForLoadState("networkidle").catch(() => {});
    return true;
  } catch {
    console.warn(`    (clique falhou em "${selector}" — indo direto para ${expect})`);
    await page.goto(`${BASE}${expect}`, { waitUntil: "networkidle" });
    return false;
  }
}

// Click that stays on the same page (modal, accordion, filter, marker).
async function tapStay(locator) {
  try {
    await locator.waitFor({ state: "visible", timeout: 8000 });
    const moved = await glideTo(locator);
    await locator.click({ timeout: 8000 });
    return moved;
  } catch {
    return false;
  }
}

// ---- reading-paced scroll --------------------------------------------------
async function readPage() {
  await page.evaluate(() => window.scrollTo(0, 0));
  const { words, max } = await page.evaluate(() => {
    const root = document.querySelector("main, article") || document.body;
    const text = (root.innerText || "").trim();
    return {
      words: text ? text.split(/\s+/).length : 0,
      max: document.body.scrollHeight - window.innerHeight,
    };
  });
  const readSecs = Math.min(MAX_READ, Math.max(MIN_READ, (words / WPM) * 60));
  await grabFor(Math.min(2500, readSecs * 300)); // pause on the heading
  if (max > 8) {
    const scrollFrames = Math.max(1, Math.round(readSecs * FPS));
    for (let f = 1; f <= scrollFrames; f++) {
      await page.evaluate((yy) => window.scrollTo(0, yy), (max * f) / scrollFrames);
      await grabFrame();
      await sleep(frameInterval);
    }
    await grabFor(1200);
  } else {
    await grabFor(Math.round(readSecs * 1000));
  }
}

// ---- signature actions (one per page) -------------------------------------
const actions = {
  // Contatos: filter by a category chip (first real category, after "todos").
  async categoryFilter() {
    const labels = LANG === "es" ? ["Salud", "Educación"] : ["Saúde", "Educação"];
    let chip = null;
    for (const text of labels) {
      const c = page.getByRole("button", { name: text, exact: false }).first();
      if (await c.count()) {
        chip = c;
        break;
      }
    }
    if (!chip) chip = page.locator('button[class*="rounded-full"]').nth(2);
    await tapStay(chip);
    await grabFor(1500); // watch the list re-filter
  },

  // Contatos: open one contact card → modal, read it, then close.
  async contactModal() {
    const row = page.locator('button[class*="rounded-2xl"]').first();
    const opened = await tapStay(row);
    if (opened) {
      await page.locator('[role="dialog"]').first().waitFor({ timeout: 6000 }).catch(() => {});
      await grabFor(3000); // read the contact details
      await page.keyboard.press("Escape").catch(() => {});
      await grabFor(700);
    }
  },

  // Mapa: click the first marker/cluster and let the popup/zoom play out.
  async mapMarker() {
    await page.locator(".leaflet-container").first().waitFor({ timeout: 15000 }).catch(() => {});
    await grabFor(1500); // tiles settle
    const marker = page.locator(".leaflet-marker-icon, .marker-cluster").first();
    if (await marker.count()) {
      await tapStay(marker);
      await grabFor(2500); // popup opens / cluster expands
    } else {
      await grabFor(1500);
    }
  },

  // FAQ: expand the first question (native <details>).
  async faqToggle() {
    const summary = page.locator("summary").first();
    const opened = await tapStay(summary);
    if (opened) await grabFor(2500); // read the revealed answer
  },
};

// ---- the journey (declarative) ---------------------------------------------
const steps = [
  { op: "visit", path: `/${L}`, label: "home" },
  { op: "navClick", selector: `a[href$="/${L}/orientacao"]`, expect: `/${L}/orientacao`, label: "abre-trilha" },
  { op: "navClick", selector: `a[href$="/modulo/documentos-essenciais"]`, expect: `/modulo/documentos-essenciais`, label: "modulo-documentos" },
  { op: "navClick", selector: `a[href*="/modulo/documentos-essenciais/cpf"]`, expect: `/modulo/documentos-essenciais/cpf`, label: "topico-cpf" },
  { op: "visit", path: `/${L}/contatos`, label: "contatos" },
  { op: "act", run: "categoryFilter", label: "contatos-filtro" },
  { op: "act", run: "contactModal", label: "contatos-detalhe" },
  { op: "visit", path: `/${L}/mapa`, label: "mapa" },
  { op: "act", run: "mapMarker", label: "mapa-marcador" },
  { op: "visit", path: `/${L}/blog`, label: "blog" },
  { op: "navClick", selector: `a[href*="/${L}/blog/"]`, expect: `/${L}/blog/`, label: "blog-post" },
  { op: "visit", path: `/${L}/faq`, label: "faq" },
  { op: "act", run: "faqToggle", label: "faq-expandir" },
  { op: "visit", path: `/${L}/sobre`, label: "sobre" },
];

let ok = 0;
for (const [i, step] of steps.entries()) {
  const n = String(i + 1).padStart(2, "0");
  try {
    if (step.op === "visit") {
      await page.goto(`${BASE}${step.path}`, { waitUntil: "networkidle" });
      await sleep(400);
      await readPage();
    } else if (step.op === "navClick") {
      await navClick(step.selector, step.expect);
      await sleep(400);
      await readPage();
    } else if (step.op === "act") {
      await actions[step.run]();
    }
    await page.evaluate(() => window.scrollTo(0, 0)).catch(() => {});
    await page.screenshot({ path: join(OUT_DIR, `${n}-${step.label}.png`), fullPage: true });
    console.log(`  ✓ ${n} ${step.label} (${step.op})`);
    ok++;
  } catch (err) {
    console.warn(`  ✗ ${n} ${step.label} → ${err.message}`);
  }
}

await context.close();
await browser.close();

let videoPath = null;
if (ffmpeg && frameNo > 0) {
  videoPath = join(OUT_DIR, `journey.${FORMAT}`);
  console.log(`\nCodificando ${frameNo} frames (${(frameNo / FPS).toFixed(0)}s) → ${videoPath}`);
  try {
    await encode(ffmpeg, videoPath);
    if (!KEEP_FRAMES) await rm(FRAMES_DIR, { recursive: true, force: true });
  } catch (err) {
    console.warn(`Falha ao codificar vídeo: ${err.message}`);
    console.warn(`Frames mantidos em ${FRAMES_DIR}`);
    videoPath = null;
  }
} else if (!KEEP_FRAMES) {
  await rm(FRAMES_DIR, { recursive: true, force: true });
}

console.log(`\nConcluído: ${ok}/${steps.length} telas.`);
if (videoPath) console.log(`Vídeo:       ${videoPath}`);
console.log(`Screenshots: ${OUT_DIR}/NN-*.png`);
if (ok === 0) {
  console.error("\nNenhuma tela carregou — o dev server está rodando? (npm run dev)");
  process.exit(1);
}
