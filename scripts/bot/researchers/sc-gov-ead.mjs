import { readFile } from "node:fs/promises";
import { join } from "node:path";
import {
  buildDraft,
  draftExists,
  esPlaceholderFromPt,
  probeOk,
  slugify,
  writeDraft,
} from "../lib/course-utils.mjs";

const SEEDS_PATH = join(process.cwd(), "bot/config/sc-gov-ead-seeds.json");
const HUB_DRAFT_ID = "sc-gov-ead-hub";

export async function researchScGovEad({ today, botRunId, existingIds }) {
  const config = JSON.parse(await readFile(SEEDS_PATH, "utf8"));
  const items = [];
  let created = 0;

  const hubUrl = config.hubUrl;
  const hubOk = await probeOk(hubUrl);

  if (
    hubOk &&
    !existingIds.has(HUB_DRAFT_ID) &&
    !(await draftExists(HUB_DRAFT_ID))
  ) {
    const ptSummary =
      "Portal oficial do Governo de Santa Catarina com orientações e links para cursos de educação a distância. Consulte requisitos e matrículas nos sites das instituições parceiras.";

    const draft = buildDraft({
      draftId: HUB_DRAFT_ID,
      sourceUrl: hubUrl,
      confidence: "high",
      outputKind: "roadmap",
      notes: "Hub EAD Gov SC — revisar links seed anualmente.",
      botRunId,
      createdAt: today,
      course: {
        id: HUB_DRAFT_ID,
        slug: HUB_DRAFT_ID,
        categorySlug: "educacao",
        format: "online",
        isFree: true,
        url: hubUrl,
        sourceUrl: hubUrl,
        tags: ["governo", "sc", "ead", "online", "gratuito"],
        translations: {
          pt: {
            title: "Cursos EAD — Governo de Santa Catarina",
            summary: ptSummary,
            institution: "Governo do Estado de Santa Catarina",
          },
          es: esPlaceholderFromPt(
            "Cursos EAD — Gobierno de Santa Catarina",
            ptSummary,
            "Gobierno del Estado de Santa Catarina",
          ),
        },
      },
    });

    const path = await writeDraft(draft);
    existingIds.add(HUB_DRAFT_ID);
    created += 1;
    items.push({ draftId: HUB_DRAFT_ID, action: "draft_created", draftPath: path });
  }

  for (const seed of config.seeds ?? []) {
    const draftId = slugify(`sc-gov-${seed.id}`);
    if (existingIds.has(draftId) || (await draftExists(draftId))) {
      items.push({ draftId, action: "skipped_existing", title: seed.title });
      continue;
    }

    const ok = await probeOk(seed.url);
    if (!ok) {
      items.push({
        draftId,
        action: "needs_manual_review",
        title: seed.title,
        notes: `Link inacessível: ${seed.url}`,
      });
      continue;
    }

    const ptSummary = `Recurso oficial de educação a distância vinculado ao ecossistema Gov SC. Verifique cursos abertos e requisitos em ${seed.url}.`;

    const draft = buildDraft({
      draftId,
      sourceUrl: seed.url,
      confidence: "medium",
      notes: "Seed curado em sc-gov-ead-seeds.json — confirmar gratuidade.",
      botRunId,
      createdAt: today,
      course: {
        id: draftId,
        slug: draftId,
        categorySlug: seed.categorySlug ?? "educacao",
        format: "online",
        isFree: true,
        url: seed.url,
        sourceUrl: hubUrl,
        tags: seed.tags ?? ["governo", "ead"],
        translations: {
          pt: {
            title: seed.title,
            summary: ptSummary,
            institution: "Governo de Santa Catarina / parceiros",
          },
          es: esPlaceholderFromPt(
            seed.title,
            ptSummary,
            "Gobierno de Santa Catarina / socios",
          ),
        },
      },
    });

    const path = await writeDraft(draft);
    existingIds.add(draftId);
    created += 1;
    items.push({
      draftId,
      action: "draft_created",
      confidence: "medium",
      title: seed.title,
      draftPath: path,
    });
  }

  return {
    sourceId: "sc-gov-ead",
    action: created > 0 ? "drafts_created" : "no_new_drafts",
    hubReachable: hubOk,
    draftsCreated: created,
    items,
    notes:
      created > 0
        ? `${created} rascunho(s) Gov SC EAD.`
        : "Hub/seeds já existem ou links inacessíveis.",
  };
}
