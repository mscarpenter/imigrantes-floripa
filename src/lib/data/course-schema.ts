import { z } from "zod";

const localeRecord = <T extends z.ZodType>(shape: T) =>
  z.object({
    pt: shape.optional(),
    es: shape.optional(),
    fr: shape.optional(),
    en: shape.optional(),
  });

export const courseTranslationSchema = z.object({
  title: z.string().min(3),
  summary: z.string().min(10),
  institution: z.string().min(2),
});

export const courseSchema = z.object({
  id: z
    .string()
    .min(2)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  slug: z
    .string()
    .min(2)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  status: z.enum(["pending_review", "published", "archived"]),
  categorySlug: z.string().min(2),
  format: z.enum(["presencial", "online", "hibrido"]),
  isFree: z.boolean(),
  url: z.string().url(),
  sourceUrl: z.string().url().optional(),
  verifiedAt: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
  enrollmentDeadline: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
  enrollmentStatus: z.enum(["open", "coming_soon"]).optional(),
  contactIds: z.array(z.string()).optional(),
  tags: z.array(z.string()).min(1),
  translations: localeRecord(courseTranslationSchema).refine(
    (t) => Boolean(t.pt) && Boolean(t.es),
    "courses require pt and es translations",
  ),
  botRunId: z.string().optional(),
  lastCheckedAt: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
});

export const courseDraftMetaSchema = z.object({
  draftId: z
    .string()
    .min(2)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  createdAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  botRunId: z.string().optional(),
  sourceUrl: z.string().url(),
  confidence: z.enum(["low", "medium", "high"]).optional(),
  notes: z.string().optional(),
});

export const courseDraftFileSchema = z.object({
  meta: courseDraftMetaSchema,
  course: courseSchema
    .omit({ status: true })
    .extend({
      status: z.literal("pending_review").optional(),
    })
    .transform((c) => ({
      ...c,
      status: "pending_review" as const,
    })),
});

export const contactPatchMetaSchema = z.object({
  draftId: z
    .string()
    .min(2)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  contactId: z.string().min(2),
  sourceUrl: z.string().url(),
  checkedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  botRunId: z.string().optional(),
});

export const contactPatchFileSchema = z.object({
  meta: contactPatchMetaSchema,
  patch: z
    .object({
      phone: z.string().optional(),
      whatsapp: z.string().optional(),
      email: z.string().email().optional(),
      address: z.string().optional(),
      website: z.string().url().optional(),
      hours: z.string().optional(),
      lat: z.number().optional(),
      lng: z.number().optional(),
    })
    .refine((p) => Object.keys(p).length > 0, "patch must change at least one field"),
  rationale: z.string().min(10),
});

export type CourseDraftFileInput = z.infer<typeof courseDraftFileSchema>;
export type ContactPatchFileInput = z.infer<typeof contactPatchFileSchema>;
