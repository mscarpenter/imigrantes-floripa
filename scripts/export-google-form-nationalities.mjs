/**
 * Gera docs/conteudo/lista-paises-google-forms.txt a partir do código-fonte.
 * Uso: npm run export:form-paises
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const srcPath = join(root, "src/lib/welcome-nationalities.ts");
const outPath = join(root, "docs/conteudo/lista-paises-google-forms.txt");

const src = readFileSync(srcPath, "utf8");
const block = src.match(
  /export const GOOGLE_FORM_NATIONALITIES = \[([\s\S]*?)\] as const/,
);
if (!block) {
  console.error("Não encontrei GOOGLE_FORM_NATIONALITIES em", srcPath);
  process.exit(1);
}

const items = [...block[1].matchAll(/"([^"]+)"/g)].map((m) => m[1]);

const lines = [
  "# Lista de países — Google Forms (cadastro HIP)",
  "# Copie UMA linha por opção no dropdown \"País / Nacionalidade\".",
  "# Os textos devem ser IDÊNTICOS (inclui acentos). \"Outro\" deve ser a última opção.",
  "# Fonte: src/lib/welcome-nationalities.ts",
  `# Total: ${items.length} opções`,
  "#",
  "# Formulário:",
  "# https://docs.google.com/forms/d/e/1FAIpQLSffs_bcZ81VqTRcwTWDcWOB_XhGlj2kjdXOqsVlxLbTZ7Itqw/viewform",
  "# Campo Google: entry.226794735",
  "#",
  "# No Google Forms: pergunta tipo \"Lista suspensa\", ative \"Outro\" para texto livre.",
  "",
  ...items,
  "",
];

writeFileSync(outPath, lines.join("\n"));
console.log(`✓ ${items.length} países → ${outPath}`);
