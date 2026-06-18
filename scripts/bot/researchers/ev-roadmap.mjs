import {
  buildDraft,
  draftExists,
  fetchText,
  loadExistingCourseIds,
  probeOk,
  stripHtml,
  writeDraft,
} from "../lib/course-utils.mjs";

const TRILHAS_URL = "https://www.ev.org.br/trilhas-de-conhecimento";
const DRAFT_ID = "ev-bradesco-trilhas-tecnologia";

const TECH_KEYWORDS = [
  "inteligência",
  "inteligencia",
  "artificial",
  "programação",
  "programacao",
  "excel",
  "office",
  "dados",
  "tecnologia",
  "informática",
  "informatica",
  "produtividade",
];

function parseTrilhas(html) {
  const trilhas = [];
  const cardRe =
    /<article class="m-card -trails[\s\S]*?<h3 class="m-card_title">([\s\S]*?)<\/h3>[\s\S]*?<p class="m-card_desc[^"]*"[^>]*>([\s\S]*?)<\/p>[\s\S]*?<a class="m-card_link" href="([^"]+)">/g;
  for (const m of html.matchAll(cardRe)) {
    trilhas.push({
      title: stripHtml(m[1]),
      summary: stripHtml(m[2]).slice(0, 280),
      path: m[3],
    });
  }
  return trilhas;
}

export async function researchEvRoadmap({ today, botRunId, existingIds }) {
  if (existingIds.has(DRAFT_ID) || (await draftExists(DRAFT_ID))) {
    return {
      sourceId: "ev-bradesco-trilhas",
      action: "skipped_existing",
      notes: "Rascunho ou curso EV já existe.",
    };
  }

  const ok = await probeOk(TRILHAS_URL);
  if (!ok) {
    return {
      sourceId: "ev-bradesco-trilhas",
      action: "needs_manual_review",
      notes: `URL inacessível: ${TRILHAS_URL}`,
    };
  }

  const html = await fetchText(TRILHAS_URL);
  const trilhas = parseTrilhas(html);
  const techTrilhas = trilhas.filter((t) =>
    TECH_KEYWORDS.some((k) => t.title.toLowerCase().includes(k)),
  );

  const trilhaList =
    techTrilhas.length > 0
      ? techTrilhas.map((t) => t.title).join(", ")
      : "Análise de Dados, IA, Programação, TI, Produtividade";

  const ptSummary = `Catálogo gratuito e 100% online da Fundação Bradesco (ev.org.br). Trilhas tech encontradas na última checagem: ${trilhaList}. Estude no seu ritmo e valide certificados no site oficial.`;

  const draft = buildDraft({
    draftId: DRAFT_ID,
    sourceUrl: TRILHAS_URL,
    confidence: "high",
    outputKind: "roadmap",
    notes:
      "Roteiro editorial (slot rotativo). Revisar trilhas antes de promover.",
    botRunId,
    createdAt: today,
    course: {
      id: DRAFT_ID,
      slug: DRAFT_ID,
      categorySlug: "educacao",
      format: "online",
      isFree: true,
      url: TRILHAS_URL,
      sourceUrl: TRILHAS_URL,
      tags: ["trilha", "tecnologia", "gratuito", "online", "rotativo"],
      translations: {
        pt: {
          title: "Roteiro: trilhas de tecnologia na Escola Virtual Bradesco",
          summary: ptSummary,
          institution: "Fundação Bradesco — Escola Virtual (ev.org.br)",
        },
        es: {
          title: "Ruta: trilhas de tecnología en la Escuela Virtual Bradesco",
          summary: `Catálogo gratuito y 100% en línea. Trilhas revisadas: ${trilhaList}. Estudia a tu ritmo en ev.org.br.`,
          institution: "Fundación Bradesco — Escuela Virtual (ev.org.br)",
        },
      },
    },
  });

  const path = await writeDraft(draft);
  return {
    sourceId: "ev-bradesco-trilhas",
    action: "draft_created",
    draftId: DRAFT_ID,
    confidence: "high",
    trilhasFound: trilhas.length,
    techTrilhas: techTrilhas.length,
    draftPath: path,
    notes: "Rascunho high — roteiro EV tech.",
  };
}
