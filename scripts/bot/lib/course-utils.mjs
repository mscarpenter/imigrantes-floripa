import { readFile, writeFile, access } from "node:fs/promises";
import { join } from "node:path";

const ROOT = process.cwd();

export const UA =
  "Mozilla/5.0 (compatible; imigrantes-floripa-bot/1.0; +https://imigrantes-floripa.vercel.app)";

export function slugify(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function stripHtml(html) {
  return String(html ?? "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

export async function fetchText(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": UA, Accept: "text/html,application/json" },
    redirect: "follow",
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} for ${url}`);
  }
  return res.text();
}

export async function probeOk(url) {
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: { "User-Agent": UA },
      redirect: "follow",
    });
    return res.ok;
  } catch {
    return false;
  }
}

export function isFloripaLocality(text) {
  const t = String(text ?? "").toLowerCase();
  const keywords = [
    "florianópolis",
    "florianopolis",
    "são josé",
    "sao jose",
    "palhoça",
    "palhoca",
    "biguaçu",
    "biguacu",
    "santo amaro",
    "tijucas",
  ];
  return keywords.some((k) => t.includes(k));
}

export function esPlaceholderFromPt(ptTitle, ptSummary, institution) {
  return {
    title: ptTitle,
    summary:
      ptSummary.length > 10
        ? `${ptSummary.slice(0, 180)}… (Información en portugués en el sitio oficial.)`
        : "Curso gratuito en Santa Catarina. Consulte inscripciones en el sitio oficial.",
    institution,
  };
}

export async function loadExistingCourseIds() {
  const ids = new Set();
  try {
    const raw = JSON.parse(
      await readFile(join(ROOT, "src/lib/data/courses.json"), "utf8"),
    );
    for (const c of raw) ids.add(c.id);
  } catch {
    /* empty */
  }
  return ids;
}

export async function draftPath(draftId) {
  return join(ROOT, "bot/drafts/courses", `${draftId}.pending.json`);
}

export async function draftExists(draftId) {
  try {
    await access(await draftPath(draftId));
    return true;
  } catch {
    return false;
  }
}

export async function writeDraft(draft) {
  const out = await draftPath(draft.meta.draftId);
  await writeFile(out, `${JSON.stringify(draft, null, 2)}\n`);
  return out;
}

export function buildDraft({
  draftId,
  sourceUrl,
  confidence,
  outputKind,
  notes,
  course,
  botRunId,
  createdAt,
}) {
  return {
    meta: {
      draftId,
      createdAt,
      botRunId,
      sourceUrl,
      confidence,
      ...(outputKind ? { outputKind } : {}),
      ...(notes ? { notes } : {}),
    },
    course,
  };
}
