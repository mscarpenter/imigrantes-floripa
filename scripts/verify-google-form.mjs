/**
 * Verifica se os entry IDs do código batem com o Google Forms publicado.
 * Uso: npm run verify:google-form
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";

const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSffs_bcZ81VqTRcwTWDcWOB_XhGlj2kjdXOqsVlxLbTZ7Itqw/viewform";

const EXPECTED = {
  firstName: "366340186",
  lastName: "1618168832",
  email: "121275218",
  phone: "811564496",
  language: "154772705",
  nationality: "226794735",
  consent: "1869454645",
};

const configSrc = readFileSync(
  join(process.cwd(), "src/lib/welcome-config.ts"),
  "utf8",
);

for (const [field, id] of Object.entries(EXPECTED)) {
  if (!configSrc.includes(`entry.${id}`)) {
    console.error(`✗ welcome-config.ts: campo "${field}" não usa entry.${id}`);
    process.exit(1);
  }
}

const html = await fetch(FORM_URL, {
  headers: { "User-Agent": "Mozilla/5.0 (compatible; HIP-verify/1.0)" },
}).then((r) => r.text());

let failed = false;
for (const [field, id] of Object.entries(EXPECTED)) {
  if (!html.includes(id)) {
    console.error(`✗ Google Forms: entry.${id} (${field}) não encontrado no HTML`);
    failed = true;
  } else {
    console.log(`✓ ${field}: entry.${id}`);
  }
}

if (failed) {
  console.error("\nAtualize GOOGLE_FORM_FIELDS em src/lib/welcome-config.ts");
  process.exit(1);
}

console.log("\n✓ Formulário alinhado com o código.");
