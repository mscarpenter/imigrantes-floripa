/**
 * Resolve o melhor screenshot padronizado (shot-1) por slug do app.
 * Fonte: docs/referencias/app-shots/ (App Store / Play Store).
 */
import fs from "node:fs";
import path from "node:path";

const REF_DIR = "docs/referencias/app-shots";
const PUBLIC_DIR = "public/app-shots";

const EXTENSIONS = [".png", ".jpg", ".jpeg", ".webp"];

export function resolveShotPath(slug) {
  const refDir = path.join(REF_DIR, slug);
  if (fs.existsSync(refDir)) {
    for (const ext of EXTENSIONS) {
      const shot1 = path.join(refDir, `shot-1${ext}`);
      if (fs.existsSync(shot1)) return shot1;
    }
    const files = fs
      .readdirSync(refDir)
      .filter((f) => f.startsWith("shot-") && EXTENSIONS.some((e) => f.endsWith(e)))
      .sort();
    if (files[0]) return path.join(refDir, files[0]);
  }
  for (const ext of EXTENSIONS) {
    const pub = path.join(PUBLIC_DIR, `${slug}${ext}`);
    if (fs.existsSync(pub)) return pub;
  }
  return null;
}

/** Mapeamento slide → fotos na ordem dos cards (nomes sem prefixo "foto / "). */
export const SLIDE_SHOTS = {
  "05 — Documentação (apps)": ["govbr", "ctps-digital", "meu-inss"],
  "06 — Saúde": ["alo-saude", "conecte-sus"],
  "08 — Transporte (apps)": ["floripa-no-ponto", "google-maps", "uber"],
  "09 — Comunicação": ["whatsapp", "deepl", "duolingo"],
  "10 — Trabalho": ["indeed", "linkedin", "infojobs"],
  "11 — Moradia": ["quintoandar", "zap-imoveis", "olx"],
  "12 — Bancos": ["nubank", "inter", "itau"],
  "13 — Alimentação": ["ifood", "rappi"],
  "14 — Educação": ["khan", "coursera", "duolingo"],
  "15 — Integração Social": ["clique-cidadania", "tandem"],
};

if (import.meta.url === `file://${process.argv[1]}`) {
  for (const [slide, slugs] of Object.entries(SLIDE_SHOTS)) {
    console.log(`\n${slide}`);
    for (const slug of slugs) {
      const p = resolveShotPath(slug);
      console.log(`  ${slug}: ${p ? "✓ " + p : "✗ FALTANDO"}`);
    }
  }
}
