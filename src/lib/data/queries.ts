import { modules } from "./modules";
import { contacts } from "./contacts";
import { categories } from "./categories";
import { posts } from "./posts";
import { courses } from "./courses";
import type {
  Module,
  Contact,
  Category,
  Topic,
  Post,
  PostTranslation,
  Course,
  CourseTranslation,
} from "./types";
import type { Locale } from "@/i18n/config";
import { resolveTranslation } from "@/i18n/resolve-translation";

export function getAllModules(): Module[] {
  return [...modules].sort((a, b) => a.order - b.order);
}

export function getModuleBySlug(slug: string): Module | undefined {
  return modules.find((m) => m.slug === slug);
}

export function getAllContacts(): Contact[] {
  return contacts;
}

export function getContactsByIds(ids: string[]): Contact[] {
  return ids
    .map((id) => contacts.find((c) => c.id === id))
    .filter((c): c is Contact => c !== undefined);
}

export function getContactsByCategory(categorySlug: string): Contact[] {
  return contacts.filter((c) => c.categorySlug === categorySlug);
}

export function getContactById(id: string): Contact | undefined {
  return contacts.find((c) => c.id === id);
}

/** Contacts that can be placed on the map (have geographic coordinates). */
export function getMappableContacts(): Contact[] {
  return contacts.filter(
    (c) => typeof c.lat === "number" && typeof c.lng === "number",
  );
}

export function getAllCategories(): Category[] {
  return [...categories].sort((a, b) => a.order - b.order);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getTopicsForModule(moduleSlug: string): Topic[] {
  const mod = getModuleBySlug(moduleSlug);
  if (!mod?.topics) return [];
  return [...mod.topics].sort((a, b) => a.order - b.order);
}

export function getTopicBySlug(
  moduleSlug: string,
  topicSlug: string,
): { module: Module; topic: Topic } | undefined {
  const mod = getModuleBySlug(moduleSlug);
  if (!mod?.topics) return undefined;
  const topic = mod.topics.find((t) => t.slug === topicSlug);
  if (!topic) return undefined;
  return { module: mod, topic };
}

/** Blog posts, most recent first. */
export function getAllPosts(): Post[] {
  return [...posts].sort((a, b) => {
    // Published posts first, "coming soon" teasers last.
    if (Boolean(a.comingSoon) !== Boolean(b.comingSoon)) {
      return a.comingSoon ? 1 : -1;
    }
    return b.date.localeCompare(a.date);
  });
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

/**
 * Returns the post translation for a locale. When the requested locale is
 * missing, falls back to the post's source locale and flags `isFallback`.
 */
export function getPostTranslation(
  post: Post,
  locale: Locale,
): { t: PostTranslation; isFallback: boolean } {
  const { value, isFallback } = resolveTranslation(post.translations, locale);
  return { t: value, isFallback };
}

/** Rough reading-time estimate in minutes (~200 words/min). */
export function readingMinutes(body: string): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/** Published courses only, soonest enrollment deadline first. */
export function getPublishedCourses(): Course[] {
  return courses
    .filter((c) => c.status === "published")
    .sort((a, b) => {
      if (a.enrollmentDeadline && b.enrollmentDeadline) {
        return a.enrollmentDeadline.localeCompare(b.enrollmentDeadline);
      }
      if (a.enrollmentDeadline) return -1;
      if (b.enrollmentDeadline) return 1;
      return a.translations.pt?.title.localeCompare(b.translations.pt?.title ?? "") ?? 0;
    });
}

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug && c.status === "published");
}

/**
 * Returns the course translation for a locale, falling back to the default
 * locale (pt) when the requested one isn't available yet.
 */
export function getCourseTranslation(
  course: Course,
  locale: Locale,
): { t: CourseTranslation; isFallback: boolean } {
  const { value, isFallback } = resolveTranslation(course.translations, locale);
  return { t: value, isFallback };
}
