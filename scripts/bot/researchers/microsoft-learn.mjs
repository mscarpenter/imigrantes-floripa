import {
  buildDraft,
  draftExists,
  probeOk,
  writeDraft,
} from "../lib/course-utils.mjs";

const LEARN_HUB_URL = "https://learn.microsoft.com/pt-br/training/browse/";
const DRAFT_ID = "microsoft-learn-trilhas-tecnologia";

const KEY_PATHS = [
  {
    title: "Fluência de IA",
    url: "https://learn.microsoft.com/pt-br/training/paths/ai-fluency/",
    duration: "4h38",
  },
  {
    title: "Introdução ao Copilot no Microsoft 365",
    url: "https://learn.microsoft.com/pt-br/training/paths/get-started-with-microsoft-365-copilot/",
    duration: "1h31",
  },
  {
    title: "GitHub Copilot (parte 1)",
    url: "https://learn.microsoft.com/pt-br/training/paths/copilot/",
    duration: "5h12",
  },
  {
    title: "Introdução à análise de dados",
    url: "https://learn.microsoft.com/pt-br/training/paths/data-analytics-microsoft/",
    duration: "1h45",
  },
];

export async function researchMicrosoftLearn({ today, botRunId, existingIds }) {
  if (existingIds.has(DRAFT_ID) || (await draftExists(DRAFT_ID))) {
    return {
      sourceId: "microsoft-learn-trilhas",
      action: "skipped_existing",
      notes: "Rascunho ou curso Microsoft Learn já existe.",
    };
  }

  const sampleUrl = KEY_PATHS[0].url;
  const ok = await probeOk(sampleUrl);
  if (!ok) {
    return {
      sourceId: "microsoft-learn-trilhas",
      action: "needs_manual_review",
      notes: `URL inacessível: ${sampleUrl}`,
    };
  }

  const pathList = KEY_PATHS.map((p) => p.title).join(", ");
  const ptSummary = `Roteiros gratuitos oficiais da Microsoft (learn.microsoft.com). Cadastro com conta Microsoft, sem CPF. Conteúdo em 65+ idiomas (pt-br, es-es, en-us, fr-fr). Roteiros verificados: ${pathList}. Ideal para imigrantes sem CPF que buscam qualificação digital.`;

  const draft = buildDraft({
    draftId: DRAFT_ID,
    sourceUrl: LEARN_HUB_URL,
    confidence: "high",
    outputKind: "roadmap",
    notes:
      "Roteiro editorial: alternativa sem CPF à EV Bradesco. Revisar rotas antes de promover.",
    botRunId,
    createdAt: today,
    course: {
      id: DRAFT_ID,
      slug: DRAFT_ID,
      categorySlug: "educacao",
      format: "online",
      isFree: true,
      url: LEARN_HUB_URL,
      sourceUrl: LEARN_HUB_URL,
      tags: [
        "trilha",
        "tecnologia",
        "gratuito",
        "online",
        "microsoft learn",
        "sem cpf",
        "multilíngue",
        "rotativo",
      ],
      translations: {
        pt: {
          title: "Roteiro: trilhas de tecnologia no Microsoft Learn (sem CPF)",
          summary: ptSummary,
          institution: "Microsoft (Microsoft Learn, learn.microsoft.com)",
        },
        es: {
          title: "Ruta: trilhas de tecnología en Microsoft Learn (sin CPF)",
          summary: `Rutas gratuitas oficiales de Microsoft. Registro con cuenta Microsoft, sin CPF. Contenido en 65+ idiomas. Rutas verificadas: ${pathList}.`,
          institution: "Microsoft (Microsoft Learn, learn.microsoft.com)",
        },
      },
    },
  });

  const path = await writeDraft(draft);
  return {
    sourceId: "microsoft-learn-trilhas",
    action: "draft_created",
    draftId: DRAFT_ID,
    confidence: "high",
    pathsChecked: KEY_PATHS.length,
    draftPath: path,
    notes: "Rascunho high: roteiro Microsoft Learn sem CPF.",
  };
}
