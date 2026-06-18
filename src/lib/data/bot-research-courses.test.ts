/**
 * Pesquisa de cursos fase 1 (rede necessária).
 * Gera *.pending.json em bot/drafts/courses/
 *
 *   npm run bot:research-courses
 */
import { describe, it, expect } from "vitest";
import { execSync } from "node:child_process";
import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import { courseDraftFileSchema } from "@/lib/data/course-schema";

const runResearch = process.env.BOT_RESEARCH_COURSES === "1";

describe.skipIf(!runResearch)("bot research courses (live, phase 1)", () => {
  it(
    "runs research script and validates generated drafts",
    async () => {
      execSync("node scripts/bot/research-courses.mjs", {
        cwd: process.cwd(),
        stdio: "pipe",
        env: { ...process.env, BOT_COURSES_MAX_DRAFTS: "3" },
      });

      const dir = join(process.cwd(), "bot/drafts/courses");
      const files = (await readdir(dir)).filter((f) =>
        f.endsWith(".pending.json"),
      );

      expect(files.length).toBeGreaterThan(0);

      const errors: string[] = [];
      for (const file of files) {
        const raw = JSON.parse(
          await readFile(join(dir, file), "utf8"),
        );
        const parsed = courseDraftFileSchema.safeParse(raw);
        if (!parsed.success) {
          errors.push(`${file}: ${parsed.error.message}`);
        }
      }

      expect(errors, errors.join("\n")).toEqual([]);
    },
    120_000,
  );
});
