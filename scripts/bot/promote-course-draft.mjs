/**
 * Promove rascunho de curso aprovado → src/lib/data/courses.json
 * Uso: npm run bot:promote-course -- bot/drafts/courses/meu-curso.pending.json
 */
import { readFile, rename, writeFile } from "node:fs/promises";
import { basename, join } from "node:path";
import { z } from "zod";

const COURSES_PATH = join(process.cwd(), "src/lib/data/courses.json");

const courseTranslationSchema = z.object({
  title: z.string().min(3),
  summary: z.string().min(10),
  institution: z.string().min(2),
});

const courseDraftFileSchema = z.object({
  meta: z.object({
    draftId: z.string().min(2),
    createdAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    botRunId: z.string().optional(),
    sourceUrl: z.string().url(),
    confidence: z.enum(["low", "medium", "high"]).optional(),
    notes: z.string().optional(),
  }),
  course: z.object({
    id: z.string().min(2),
    slug: z.string().min(2),
    categorySlug: z.string().min(2),
    format: z.enum(["presencial", "online", "hibrido"]),
    isFree: z.boolean(),
    url: z.string().url(),
    sourceUrl: z.string().url().optional(),
    enrollmentDeadline: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .optional(),
    enrollmentStatus: z.enum(["open", "coming_soon"]).optional(),
    contactIds: z.array(z.string()).optional(),
    tags: z.array(z.string()).min(1),
    translations: z
      .object({
        pt: courseTranslationSchema,
        es: courseTranslationSchema,
        fr: courseTranslationSchema.optional(),
        en: courseTranslationSchema.optional(),
      })
      .refine((t) => Boolean(t.pt) && Boolean(t.es), "pt and es required"),
    botRunId: z.string().optional(),
    lastCheckedAt: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .optional(),
  }),
});

async function main() {
  const draftPath = process.argv[2];
  if (!draftPath) {
    console.error("Uso: npm run bot:promote-course -- <caminho.pending.json>");
    process.exit(1);
  }

  const raw = JSON.parse(await readFile(draftPath, "utf8"));
  const parsed = courseDraftFileSchema.safeParse(raw);
  if (!parsed.success) {
    console.error("Rascunho inválido:", parsed.error.flatten());
    process.exit(1);
  }

  const verifiedAt =
    process.argv[3] ?? new Date().toISOString().slice(0, 10);

  const enrollmentStatus = parsed.data.course.enrollmentStatus ?? "coming_soon";

  const entry = {
    ...parsed.data.course,
    status: "published",
    verifiedAt,
    enrollmentStatus,
    sourceUrl: parsed.data.course.sourceUrl ?? parsed.data.meta.sourceUrl,
    botRunId: parsed.data.meta.botRunId,
    lastCheckedAt: verifiedAt,
  };

  const existing = JSON.parse(await readFile(COURSES_PATH, "utf8"));
  if (existing.some((c) => c.id === entry.id || c.slug === entry.slug)) {
    console.error(`Curso com id "${entry.id}" ou slug "${entry.slug}" já existe.`);
    process.exit(1);
  }

  existing.push(entry);
  await writeFile(COURSES_PATH, `${JSON.stringify(existing, null, 2)}\n`);

  const approvedPath = draftPath.replace(/\.pending\.json$/, ".approved.json");
  await rename(draftPath, approvedPath);

  console.log(`✓ Curso "${entry.id}" publicado em courses.json`);
  console.log(`  Rascunho → ${basename(approvedPath)}`);
  console.log("  Abra PR com template bot_content.md antes do merge.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
