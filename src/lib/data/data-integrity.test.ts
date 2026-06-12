import { describe, expect, it } from "vitest";
import { modules } from "./modules";
import { contacts } from "./contacts";
import { categories } from "./categories";
import { moduleColors } from "./colors";
import { validIconNames } from "@/components/Icon";
import { locales } from "@/i18n/config";

const contactIds = new Set(contacts.map((c) => c.id));
const categorySlugs = new Set(categories.map((c) => c.slug));
const validColors = new Set<string>(moduleColors);
const validIcons = new Set(validIconNames);

describe("static data integrity", () => {
  it("references only existing contactIds from modules and topics", () => {
    const missing: string[] = [];

    for (const mod of modules) {
      for (const id of mod.contactIds) {
        if (!contactIds.has(id)) {
          missing.push(`module:${mod.slug} → contactId:${id}`);
        }
      }

      for (const topic of mod.topics ?? []) {
        for (const id of topic.contactIds) {
          if (!contactIds.has(id)) {
            missing.push(
              `module:${mod.slug}/topic:${topic.slug} → contactId:${id}`,
            );
          }
        }
      }
    }

    expect(missing, "unknown contactIds in modules/topics").toEqual([]);
  });

  it("uses valid categorySlug for every contact", () => {
    const invalid = contacts
      .filter((c) => !categorySlugs.has(c.categorySlug))
      .map((c) => `${c.id} → categorySlug:${c.categorySlug}`);

    expect(invalid, "contacts with unknown categorySlug").toEqual([]);
  });

  it("uses valid colors and icons for modules and categories", () => {
    const invalid: string[] = [];

    for (const mod of modules) {
      if (!validColors.has(mod.color)) {
        invalid.push(`module:${mod.slug} → color:${mod.color}`);
      }
      if (!validIcons.has(mod.icon)) {
        invalid.push(`module:${mod.slug} → icon:${mod.icon}`);
      }
    }

    for (const category of categories) {
      if (!validColors.has(category.color)) {
        invalid.push(`category:${category.slug} → color:${category.color}`);
      }
      if (!validIcons.has(category.icon)) {
        invalid.push(`category:${category.slug} → icon:${category.icon}`);
      }
    }

    expect(invalid, "invalid color or icon references").toEqual([]);
  });

  it("has pt and es translations for all modules, topics and contacts", () => {
    const missing: string[] = [];

    for (const mod of modules) {
      for (const locale of locales) {
        if (!mod.translations[locale]) {
          missing.push(`module:${mod.slug} → locale:${locale}`);
        }
      }

      for (const topic of mod.topics ?? []) {
        for (const locale of locales) {
          if (!topic.translations[locale]) {
            missing.push(
              `module:${mod.slug}/topic:${topic.slug} → locale:${locale}`,
            );
          }
        }
      }
    }

    for (const contact of contacts) {
      for (const locale of locales) {
        if (!contact.translations[locale]) {
          missing.push(`contact:${contact.id} → locale:${locale}`);
        }
      }
    }

    for (const category of categories) {
      for (const locale of locales) {
        if (!category.translations[locale]) {
          missing.push(`category:${category.slug} → locale:${locale}`);
        }
      }
    }

    expect(missing, "missing locale translations in static data").toEqual([]);
  });
});
