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
  translations: Record<Locale, TopicTranslation>;
}

export interface Module {
  slug: string;
  order: number;
  icon: string;
  color: ModuleColor;
  contactIds: string[];
  translations: Record<Locale, ModuleTranslation>;
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
  translations: Record<Locale, CategoryTranslation>;
}

export interface PostTranslation {
  title: string;
  /** Short summary shown on cards and as meta description. */
  excerpt: string;
  /** Localized category label (e.g. "Mobilidade", "Saúde"). */
  tag: string;
  /** Article content in Markdown. */
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
  translations: Record<Locale, ContactTranslation>;
}
