/**
 * Pesquisa cursos — fase 1: EV roteiro + SENAC gratuitos + Gov SC EAD
 *
 * Gera bot/drafts/courses/*.pending.json (nunca escreve courses.json direto).
 * Uso: npm run bot:research-courses
 */
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
import { loadExistingCourseIds, sleep } from "./lib/course-utils.mjs";
import { researchEvRoadmap } from "./researchers/ev-roadmap.mjs";
import { researchSenacGratuitos } from "./researchers/senac-gratuitos.mjs";
import { researchScGovEad } from "./researchers/sc-gov-ead.mjs";

const ROOT = process.cwd();
const REPORTS_DIR = join(ROOT, "bot/reports");
const DRAFTS_DIR = join(ROOT, "bot/drafts/courses");

const PHASE1 = ["ev-bradesco-trilhas", "senac-sc-gratuitos", "sc-gov-ead"];

const today = new Date().toISOString().slice(0, 10);
const runId = process.env.GITHUB_RUN_ID ?? "local";

async function main() {
  await mkdir(REPORTS_DIR, { recursive: true });
  await mkdir(DRAFTS_DIR, { recursive: true });

  const existingIds = await loadExistingCourseIds();
  const results = [];

  results.push(
    await researchEvRoadmap({
      today,
      botRunId: runId,
      existingIds,
    }),
  );
  await sleep(1100);

  results.push(
    await researchSenacGratuitos({
      today,
      botRunId: runId,
      existingIds,
      maxDrafts: Number(process.env.BOT_COURSES_MAX_DRAFTS ?? 5),
    }),
  );
  await sleep(1100);

  results.push(
    await researchScGovEad({
      today,
      botRunId: runId,
      existingIds,
    }),
  );

  const draftsGenerated = results.reduce((n, r) => {
    if (r.action === "draft_created" || r.action === "drafts_created") {
      return n + (r.draftsCreated ?? 1);
    }
    return n;
  }, 0);

  const byConfidence = { high: 0, medium: 0, low: 0 };
  for (const r of results) {
    if (r.confidence) byConfidence[r.confidence] += 1;
    for (const item of r.items ?? []) {
      if (item.confidence) byConfidence[item.confidence] += 1;
    }
  }

  const report = {
    date: today,
    botRunId: runId,
    phase: 1,
    sources: PHASE1,
    draftsGenerated,
    byConfidence,
    results,
  };

  const reportPath = join(REPORTS_DIR, `research-courses-${today}.json`);
  await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`);

  console.log("=== Bot pesquisa cursos (fase 1) ===");
  for (const r of results) {
    console.log(`\n[${r.sourceId}] ${r.action}`);
    console.log(`  ${r.notes ?? ""}`);
    if (r.items?.length) {
      for (const item of r.items.slice(0, 8)) {
        console.log(`  - ${item.draftId ?? item.title}: ${item.action}`);
      }
      if (r.items.length > 8) {
        console.log(`  … +${r.items.length - 8} itens`);
      }
    }
  }
  console.log("\nRascunhos gerados:", draftsGenerated);
  console.log("Relatório:", reportPath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
