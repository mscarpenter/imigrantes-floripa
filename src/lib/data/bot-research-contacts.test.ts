/**
 * Pesquisa gratuita de contatos (DuckDuckGo + domínios confiáveis).
 * Gera relatório e rascunhos .pending.json — nunca altera contacts.ts direto.
 *
 * Uso local (com rede, ~1–2 min):
 *   npm run bot:research-contacts
 */
import { describe, it, expect } from "vitest";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { contacts } from "./contacts";
import { contactPatchFileSchema } from "./course-schema";
import { researchContact } from "@/lib/bot/research-contact";

const runResearch = process.env.BOT_RESEARCH === "1";

describe.skipIf(!runResearch)("bot research contacts (live, free search)", () => {
  it(
    "probes URLs, searches when needed, writes report + drafts",
    async () => {
      const today = new Date().toISOString().slice(0, 10);
      const withWebsite = contacts.filter((c) => c.website);
      const results = [];

      for (const contact of withWebsite) {
        const result = await researchContact(contact);
        results.push(result);

        if (result.draft) {
          const parsed = contactPatchFileSchema.safeParse(result.draft);
          expect(parsed.success, `${contact.id} draft invalid`).toBe(true);
          const out = join(
            process.cwd(),
            "bot/drafts/contacts",
            `${result.draft.meta.draftId}.pending.json`,
          );
          await writeFile(out, `${JSON.stringify(result.draft, null, 2)}\n`);
        }
      }

      await mkdir(join(process.cwd(), "bot/reports"), { recursive: true });
      const reportPath = join(
        process.cwd(),
        "bot/reports",
        `research-contacts-${today}.json`,
      );
      await writeFile(
        reportPath,
        `${JSON.stringify({ date: today, results }, null, 2)}\n`,
      );

      const summary = {
        ok: results.filter((r) => r.action === "ok").length,
        blocked_official: results.filter((r) => r.action === "blocked_official")
          .length,
        suggest_update: results.filter((r) => r.action === "suggest_update")
          .length,
        needs_manual_review: results.filter(
          (r) => r.action === "needs_manual_review",
        ).length,
      };

      console.log("Research summary:", summary);
      console.log("Report:", reportPath);

      expect(withWebsite.length).toBeGreaterThan(0);
    },
    180_000,
  );
});
