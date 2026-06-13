import { modules } from "./modules";
import { contacts } from "./contacts";
import { categories } from "./categories";
import type { Module, Contact, Category, Topic } from "./types";

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
