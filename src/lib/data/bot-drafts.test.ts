import { describe, expect, it } from "vitest";
import { readdir, readFile } from "node:fs/promises";
import { join, relative } from "node:path";
import { contacts } from "./contacts";
import {
  contactPatchFileSchema,
  courseDraftFileSchema,
} from "./course-schema";

const ROOT = process.cwd();
const DRAFTS = join(ROOT, "bot/drafts");
const contactIds = new Set(contacts.map((c) => c.id));

async function collectPending(): Promise<string[]> {
  const files: string[] = [];

  async function walk(dir: string) {
    let entries;
    try {
      entries = await readdir(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) await walk(full);
      else if (entry.name.endsWith(".pending.json")) files.push(full);
    }
  }

  await walk(DRAFTS);
  return files;
}

describe("bot drafts (*.pending.json)", () => {
  it("are valid against the schema", async () => {
    const pending = await collectPending();
    if (pending.length === 0) return;

    const errors: string[] = [];

    for (const file of pending) {
      const rel = relative(ROOT, file);
      const raw = JSON.parse(await readFile(file, "utf8"));
      const isContact = rel.includes("/contacts/");

      if (isContact) {
        const parsed = contactPatchFileSchema.safeParse(raw);
        if (!parsed.success) {
          errors.push(`${rel}: ${parsed.error.message}`);
          continue;
        }
        if (!contactIds.has(parsed.data.meta.contactId)) {
          errors.push(`${rel}: unknown contactId "${parsed.data.meta.contactId}"`);
        }
      } else {
        const parsed = courseDraftFileSchema.safeParse(raw);
        if (!parsed.success) {
          errors.push(`${rel}: ${parsed.error.message}`);
          continue;
        }
        if (!parsed.data.course.translations.es) {
          errors.push(`${rel}: course draft missing es translation`);
        }
      }
    }

    expect(errors, errors.join("\n")).toEqual([]);
  });
});
