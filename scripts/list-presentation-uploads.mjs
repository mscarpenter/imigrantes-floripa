#!/usr/bin/env node
/**
 * Lista nodeId + arquivo local para upload dos prints da apresentação.
 * Uso: node scripts/list-presentation-uploads.mjs
 */
import { resolveShotPath } from "./resolve-presentation-shot.mjs";

const UPLOADS = [
  ["130:17", "govbr"],
  ["130:18", "ctps-digital"],
  ["130:19", "meu-inss"],
  ["69:160", "alo-saude"],
  ["76:165", "conecte-sus"],
  ["130:46", "floripa-no-ponto"],
  ["130:47", "google-maps"],
  ["76:169", "uber"],
  ["130:63", "whatsapp"],
  ["130:64", "deepl"],
  ["130:65", "duolingo"],
  ["130:81", "indeed"],
  ["130:82", "linkedin"],
  ["130:83", "infojobs"],
  ["118:17", "quintoandar"],
  ["130:99", "zap-imoveis"],
  ["118:19", "olx"],
  ["130:115", "nubank"],
  ["130:116", "inter"],
  ["130:117", "itau"],
  ["77:92", "ifood"],
  ["77:93", "rappi"],
  ["130:144", "khan"],
  ["130:145", "coursera"],
  ["130:146", "duolingo"],
  ["69:162", "clique-cidadania"],
  ["77:126", "tandem"],
];

const MIME = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
};

const rows = [];
for (const [nodeId, slug] of UPLOADS) {
  const file = resolveShotPath(slug);
  if (!file) {
    console.error(`FALTANDO: ${slug}`);
    process.exitCode = 1;
    continue;
  }
  const ext = file.slice(file.lastIndexOf("."));
  rows.push({ nodeId, slug, file, mime: MIME[ext] || "image/png" });
}

console.log(JSON.stringify(rows, null, 2));
