/**
 * Exporta todo o conteúdo textual do portal para Markdown.
 * Uso: npx tsx scripts/export-portal-content.ts
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { modules } from "../src/lib/data/modules";
import { contacts } from "../src/lib/data/contacts";
import { categories } from "../src/lib/data/categories";
import { onboardingCards } from "../src/lib/data/onboarding";
import ptDict from "../src/i18n/dictionaries/pt.json";
import type { Contact, Module, Topic } from "../src/lib/data/types";
import type { Locale } from "../src/i18n/config";

const OUT_DIR = join(process.cwd(), "conteudo-portal");
const LOCALE: Locale = "pt";

function contactById(id: string): Contact | undefined {
  return contacts.find((c) => c.id === id);
}

function categoryName(slug: string): string {
  const cat = categories.find((c) => c.slug === slug);
  return cat?.translations[LOCALE].name ?? slug;
}

function formatContact(c: Contact): string {
  const t = c.translations[LOCALE];
  const lines = [
    `#### ${t.name}`,
    "",
    t.description,
    "",
  ];
  if (c.phone) lines.push(`- **Telefone:** ${c.phone}`);
  if (c.whatsapp) lines.push(`- **WhatsApp:** ${c.whatsapp}`);
  if (c.email) lines.push(`- **E-mail:** ${c.email}`);
  if (c.address) lines.push(`- **Endereço:** ${c.address}`);
  if (c.website) lines.push(`- **Site:** ${c.website}`);
  if (c.hours) lines.push(`- **Horário:** ${c.hours}`);
  if (c.lat != null && c.lng != null)
    lines.push(`- **Mapa:** lat ${c.lat}, lng ${c.lng}`);
  lines.push("");
  return lines.join("\n");
}

function formatContactsBlock(ids: string[]): string {
  if (ids.length === 0) return "";
  const blocks = ids
    .map((id) => contactById(id))
    .filter((c): c is Contact => c != null)
    .map(formatContact);
  if (blocks.length === 0) return "";
  return ["### Contatos relacionados", "", ...blocks].join("\n");
}

function formatTopic(topic: Topic, moduleSlug: string): string {
  const t = topic.translations[LOCALE];
  const lines = [
    `### ${topic.order}. ${t.title}`,
    "",
    `> **Resumo:** ${t.summary}`,
    "",
    `**URL no portal:** \`/pt/modulo/${moduleSlug}/${topic.slug}\``,
    "",
    t.body,
    "",
  ];
  const related = formatContactsBlock(topic.contactIds);
  if (related) lines.push(related);
  return lines.join("\n");
}

function formatModule(mod: Module): string {
  const t = mod.translations[LOCALE];
  const topics = [...(mod.topics ?? [])].sort((a, b) => a.order - b.order);
  const lines = [
    `## ${mod.order}. ${t.title}`,
    "",
    `**Slug:** \`${mod.slug}\`  `,
    `**URL no portal:** \`/pt/modulo/${mod.slug}\``,
    "",
    `> **Resumo:** ${t.summary}`,
    "",
  ];

  if (t.body.trim()) {
    lines.push("### Introdução do módulo", "", t.body, "");
  }

  if (topics.length > 0) {
    lines.push("---", "", `### Tópicos (${topics.length})`, "");
    for (const topic of topics) {
      lines.push(formatTopic(topic, mod.slug));
      lines.push("---", "");
    }
  }

  const moduleContacts = formatContactsBlock(mod.contactIds);
  if (moduleContacts) {
    lines.push("### Contatos do módulo", "", moduleContacts);
  }

  return lines.join("\n");
}

function formatAllContacts(): string {
  const byCategory = new Map<string, Contact[]>();
  for (const c of contacts) {
    const list = byCategory.get(c.categorySlug) ?? [];
    list.push(c);
    byCategory.set(c.categorySlug, list);
  }

  const sortedCats = [...categories].sort((a, b) => a.order - b.order);
  const lines = [
    "## Contatos úteis (lista completa)",
    "",
    `**URL no portal:** \`/pt/contatos\`  `,
    `**Total:** ${contacts.length} contatos`,
    "",
    ptDict.contacts.subtitle,
    "",
  ];

  if (ptDict.contacts.featuredTitle) {
    lines.push(
      "### Destaque",
      "",
      `**${ptDict.contacts.featuredTitle}**`,
      "",
      ptDict.contacts.featuredBody,
      "",
    );
  }

  for (const cat of sortedCats) {
    const list = byCategory.get(cat.slug);
    if (!list?.length) continue;
    lines.push(`### ${cat.translations[LOCALE].name}`, "");
    for (const c of list) {
      lines.push(formatContact(c));
    }
    lines.push("---", "");
  }

  return lines.join("\n");
}

function formatFaqAndPages(): string {
  const lines = [
    "## Páginas institucionais e FAQ",
    "",
    "### Home",
    "",
    `**Título:** ${ptDict.home.heroTitle}`,
    "",
    ptDict.home.heroSubtitle,
    "",
    `**CTA trilha:** ${ptDict.home.ctaTrail}`,
    "",
    `### ${ptDict.home.sectionAbout}`,
    "",
    ptDict.home.aboutBody,
    "",
    "---",
    "",
    `### ${ptDict.about.title}`,
    "",
    `**URL:** \`/pt/sobre\``,
    "",
    ptDict.about.intro,
    "",
    `#### ${ptDict.about.academicTitle}`,
    "",
    `${ptDict.about.academicBodyBeforeUnicesusc}${ptDict.about.academicUnicesuscLabel}${ptDict.about.academicBodyBeforeCirculos}${ptDict.about.academicCirculosLabel}${ptDict.about.academicBodyAfterCirculos}`,
    "",
    `#### ${ptDict.about.disclaimerTitle}`,
    "",
    `${ptDict.about.disclaimerBeforeContact}${ptDict.feedback.trigger}${ptDict.about.disclaimerAfterContact}`,
    "",
    "---",
    "",
    `### ${ptDict.faq.title}`,
    "",
    `**URL:** \`/pt/faq\``,
    "",
    ptDict.faq.subtitle,
    "",
  ];

  for (const item of ptDict.faq.items) {
    lines.push(`#### ${item.q}`, "", item.a, "");
  }

  lines.push(
    "---",
    "",
    "### Carrossel de onboarding (home)",
    "",
  );

  for (const card of onboardingCards) {
    const c = card.translations[LOCALE];
    lines.push(
      `#### ${c.tag}: ${c.title}`,
      "",
      c.intro,
      "",
      `**CTA:** ${c.cta} → \`${card.path}\``,
      "",
    );
  }

  return lines.join("\n");
}

function buildTableOfContents(sortedModules: Module[]): string {
  const lines = ["## Índice", ""];
  lines.push("1. [Páginas institucionais e FAQ](#páginas-institucionais-e-faq)");
  lines.push("2. [Módulos e tópicos](#módulos-e-tópicos)");
  for (const mod of sortedModules) {
    const t = mod.translations[LOCALE];
    const anchor = `${mod.order}-${mod.slug}`.toLowerCase();
    lines.push(`   - [${mod.order}. ${t.title}](#${mod.order}-${t.title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "")})`);
    const topics = [...(mod.topics ?? [])].sort((a, b) => a.order - b.order);
    for (const topic of topics) {
      lines.push(`     - ${topic.order}. ${topic.translations[LOCALE].title}`);
    }
  }
  lines.push("3. [Contatos úteis](#contatos-úteis-lista-completa)");
  lines.push("");
  return lines.join("\n");
}

function main() {
  const sortedModules = [...modules].sort((a, b) => a.order - b.order);
  const topicCount = sortedModules.reduce(
    (n, m) => n + (m.topics?.length ?? 0),
    0,
  );

  const header = [
    "# Imigrantes Floripa — Conteúdo completo do portal",
    "",
    `> Exportação em **português (PT)** gerada em ${new Date().toISOString().slice(0, 10)}.`,
    `> Fonte: \`src/lib/data/\` + dicionário \`pt.json\`.`,
    "",
    "| Métrica | Valor |",
    "| --- | --- |",
    `| Módulos | ${sortedModules.length} |`,
    `| Tópicos | ${topicCount} |`,
    `| Contatos | ${contacts.length} |`,
    `| Categorias de contato | ${categories.length} |`,
    "",
    "---",
    "",
  ].join("\n");

  const body = [
    buildTableOfContents(sortedModules),
    "---",
    "",
    formatFaqAndPages(),
    "---",
    "",
    "# Módulos e tópicos",
    "",
    ...sortedModules.map((m) => [formatModule(m), "---", ""].join("\n")),
    formatAllContacts(),
  ].join("\n");

  const full = header + body;

  mkdirSync(OUT_DIR, { recursive: true });
  const masterPath = join(OUT_DIR, "imigrantes-floripa-conteudo-completo-pt.md");
  writeFileSync(masterPath, full, "utf8");

  // Também um arquivo por módulo (mais fácil de revisar por área)
  const modulesDir = join(OUT_DIR, "por-modulo");
  mkdirSync(modulesDir, { recursive: true });

  for (const mod of sortedModules) {
    const t = mod.translations[LOCALE];
    const filename = `${String(mod.order).padStart(2, "0")}-${mod.slug}.md`;
    const modHeader = [
      `# ${t.title}`,
      "",
      `← [Voltar ao índice](../imigrantes-floripa-conteudo-completo-pt.md)`,
      "",
      "---",
      "",
    ].join("\n");
    writeFileSync(join(modulesDir, filename), modHeader + formatModule(mod), "utf8");
  }

  writeFileSync(
    join(OUT_DIR, "contatos-pt.md"),
    `# Contatos úteis\n\n← [Índice completo](./imigrantes-floripa-conteudo-completo-pt.md)\n\n---\n\n${formatAllContacts()}`,
    "utf8",
  );

  writeFileSync(
    join(OUT_DIR, "faq-e-paginas-pt.md"),
    `# FAQ e páginas institucionais\n\n← [Índice completo](./imigrantes-floripa-conteudo-completo-pt.md)\n\n---\n\n${formatFaqAndPages()}`,
    "utf8",
  );

  const lines = full.split("\n").length;
  console.log(`✓ ${masterPath}`);
  console.log(`  ${lines} linhas | ${sortedModules.length} módulos | ${topicCount} tópicos | ${contacts.length} contatos`);
  console.log(`✓ ${modulesDir}/ (${sortedModules.length} arquivos)`);
  console.log(`✓ contatos-pt.md`);
  console.log(`✓ faq-e-paginas-pt.md`);
}

main();
