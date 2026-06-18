import {
  buildDraft,
  draftExists,
  esPlaceholderFromPt,
  fetchText,
  isFloripaLocality,
  slugify,
  stripHtml,
  writeDraft,
} from "../lib/course-utils.mjs";

const LIST_URL = "https://portal.sc.senac.br/cursos-gratuitos";
const BASE = "https://portal.sc.senac.br";

const RELEVANCE = [
  "português",
  "informática",
  "informatica",
  "gestão",
  "gestao",
  "administração",
  "administracao",
  "comunicação",
  "comunicacao",
  "turismo",
  "gastronomia",
  "comércio",
  "comercio",
  "vendas",
  "talento",
  "trabalho",
];

function parseCursosData(html) {
  const m = html.match(/window\.cursosData\s*=\s*(\[[\s\S]*?\]);/);
  if (!m) return [];
  return JSON.parse(m[1]);
}

function isGratuito(curso) {
  const turmas = curso.turmasLiberadasParaMatricula ?? [];
  return turmas.some((t) =>
    (t.recursosFinanceiros ?? []).some(
      (r) => r.tipoDeRecursoNome === "Gratuito" || r.nome === "PSG",
    ),
  );
}

function pickTurma(curso) {
  const turmas = curso.turmasLiberadasParaMatricula ?? [];
  const floripa = turmas.filter((t) => isFloripaLocality(t.localidade));
  if (floripa.length) return { turma: floripa[0], format: "presencial" };
  const online = turmas.filter(
    (t) =>
      t.formaDeExecucao &&
      !/^presencial$/i.test(t.formaDeExecucao) &&
      t.divulgacaoOnline,
  );
  if (online.length) return { turma: online[0], format: "online" };
  return null;
}

function courseUrl(curso, turma) {
  const locSlug = slugify(turma.localidade || "sc");
  const titleSlug = slugify(curso.titulo);
  return `${BASE}/curso/${curso.planoDoCursoId}/${locSlug}/${titleSlug}`;
}

function relevanceScore(curso, turma) {
  let score = 0;
  const blob = `${curso.titulo} ${curso.eixoTecnologico} ${curso.categoria}`.toLowerCase();
  for (const k of RELEVANCE) {
    if (blob.includes(k)) score += 2;
  }
  if (isFloripaLocality(turma?.localidade)) score += 5;
  if (curso.matriculasAbertas) score += 3;
  return score;
}

export async function researchSenacGratuitos({
  today,
  botRunId,
  existingIds,
  maxDrafts = 5,
}) {
  const html = await fetchText(LIST_URL);
  const all = parseCursosData(html);

  const candidates = [];
  for (const curso of all) {
    if (!curso.matriculasAbertas || !isGratuito(curso)) continue;
    const picked = pickTurma(curso);
    if (!picked) continue;
    const { turma, format } = picked;
    if (format === "presencial" && !isFloripaLocality(turma.localidade)) {
      continue;
    }
    candidates.push({ curso, turma, format, score: relevanceScore(curso, turma) });
  }

  candidates.sort((a, b) => b.score - a.score);

  const results = [];
  let created = 0;

  for (const { curso, turma, format } of candidates) {
    if (created >= maxDrafts) break;

    const draftId = `senac-sc-${curso.planoDoCursoId}`;
    if (existingIds.has(draftId) || (await draftExists(draftId))) {
      results.push({
        draftId,
        action: "skipped_existing",
        title: curso.titulo,
      });
      continue;
    }

    const url = courseUrl(curso, turma);
    const ptSummary =
      stripHtml(curso.objetivos).slice(0, 320) ||
      `Curso gratuito (PSG) do SENAC SC — ${turma.localidade}. Carga horária: ${curso.cargaHoraria ?? "?"}h.`;

    const institution = `SENAC SC — ${turma.localidade}`;

    const draft = buildDraft({
      draftId,
      sourceUrl: url,
      confidence: "high",
      notes: `Turma: ${turma.nomeUnidadeOperativa}. Revisar requisitos CadÚnico/renda.`,
      botRunId,
      createdAt: today,
      course: {
        id: draftId,
        slug: draftId,
        categorySlug: "educacao",
        format,
        isFree: true,
        url,
        sourceUrl: LIST_URL,
        tags: ["senac", "gratuito", format, slugify(curso.eixoTecnologico)],
        translations: {
          pt: {
            title: curso.titulo,
            summary: ptSummary,
            institution,
          },
          es: esPlaceholderFromPt(curso.titulo, ptSummary, institution),
        },
      },
    });

    const path = await writeDraft(draft);
    existingIds.add(draftId);
    created += 1;
    results.push({
      draftId,
      action: "draft_created",
      confidence: "high",
      title: curso.titulo,
      format,
      locality: turma.localidade,
      draftPath: path,
    });
  }

  return {
    sourceId: "senac-sc-gratuitos",
    action: created > 0 ? "drafts_created" : "no_new_drafts",
    totalListed: all.length,
    candidates: candidates.length,
    draftsCreated: created,
    items: results,
    notes:
      created > 0
        ? `${created} rascunho(s) SENAC (prioridade Floripa + relevância).`
        : "Nenhum curso novo elegível ou rascunhos já existem.",
  };
}
