import type { Locale } from "@/i18n/config";
import type { ModuleColor } from "./colors";

export interface ModuleTranslation {
  title: string;
  summary: string;
  /** When the module has topics, this is a short intro shown before the topic list. */
  body: string;
}

export interface TopicTranslation {
  title: string;
  summary: string;
  body: string;
}

export interface Topic {
  slug: string;
  order: number;
  contactIds: string[];
  translations: Partial<Record<Locale, TopicTranslation>>;
}

export interface Module {
  slug: string;
  order: number;
  icon: string;
  color: ModuleColor;
  contactIds: string[];
  translations: Partial<Record<Locale, ModuleTranslation>>;
  topics?: Topic[];
}

export interface CategoryTranslation {
  name: string;
}

export interface Category {
  slug: string;
  order: number;
  icon: string;
  color: ModuleColor;
  translations: Partial<Record<Locale, CategoryTranslation>>;
}

export interface PostTranslation {
  title: string;
  /** Short summary shown on cards and as meta description. */
  excerpt: string;
  /** Localized category label (e.g. "Mobilidade", "Saúde"). */
  tag: string;
  /** Article content in Markdown. Empty for upcoming ("coming soon") posts. */
  body: string;
}

export interface Post {
  slug: string;
  /** ISO date (YYYY-MM-DD) used for ordering and display. */
  date: string;
  color: ModuleColor;
  icon: string;
  /** Cover image path in /public. */
  cover: string;
  /** Locale the content was originally written in (used as fallback). */
  sourceLocale: Locale;
  /** When true, the post is a teaser ("Em breve"): no link, no detail page. */
  comingSoon?: boolean;
  /** When true, shows a "Destaque" badge on the card cover. */
  featured?: boolean;
  /** Content per locale. May be partial — missing locales fall back to source. */
  translations: Partial<Record<Locale, PostTranslation>>;
}

export interface ContactTranslation {
  name: string;
  description: string;
}

export interface Contact {
  id: string;
  categorySlug: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  address?: string;
  website?: string;
  hours?: string;
  /** Geographic coordinates (when the contact has a physical address). */
  lat?: number;
  lng?: number;
  translations: Partial<Record<Locale, ContactTranslation>>;
}

export type CourseFormat = "presencial" | "online" | "hibrido";

/** Whether official enrollment is open right now (human-verified). */
export type CourseEnrollmentStatus = "open" | "coming_soon";

/** Editorial lifecycle — only `published` appears on the site. */
export type CourseStatus =
  | "pending_review"
  | "published"
  | "archived";

export interface CourseTranslation {
  title: string;
  summary: string;
  institution: string;
}

export interface Course {
  id: string;
  slug: string;
  status: CourseStatus;
  categorySlug: string;
  format: CourseFormat;
  isFree: boolean;
  /** Official enrollment or info page. */
  url: string;
  /** Where the bot or editor verified the listing. */
  sourceUrl?: string;
  /** ISO date (YYYY-MM-DD) when a human confirmed the listing. */
  verifiedAt?: string;
  /** ISO date — last day to enroll, if known. */
  enrollmentDeadline?: string;
  /** Human-verified enrollment availability on the official site. */
  enrollmentStatus?: CourseEnrollmentStatus;
  contactIds?: string[];
  tags: string[];
  translations: Partial<Record<Locale, CourseTranslation>>;
  /** Bot run identifier (GitHub Actions run id, etc.). */
  botRunId?: string;
  /** ISO date — last automated freshness check. */
  lastCheckedAt?: string;
}

export interface CourseDraftMeta {
  draftId: string;
  createdAt: string;
  botRunId?: string;
  sourceUrl: string;
  confidence?: "low" | "medium" | "high";
  notes?: string;
}

export interface CourseDraftFile {
  meta: CourseDraftMeta;
  course: Omit<Course, "status"> & { status?: "pending_review" };
}

export interface ContactPatchMeta {
  draftId: string;
  contactId: string;
  sourceUrl: string;
  checkedAt: string;
  botRunId?: string;
}

export interface ContactPatchFile {
  meta: ContactPatchMeta;
  patch: Partial<
    Pick<Contact, "phone" | "whatsapp" | "email" | "address" | "website" | "hours" | "lat" | "lng">
  >;
  rationale: string;
}
