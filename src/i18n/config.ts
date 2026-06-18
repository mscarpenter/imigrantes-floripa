export const locales = ["pt", "es", "fr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "pt";

/** Locales with full editorial content in static data (modules, contacts, etc.). */
export const contentLocales = ["pt", "es"] as const;
export type ContentLocale = (typeof contentLocales)[number];

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export const localeLabels: Record<Locale, string> = {
  pt: "Português",
  es: "Español",
  fr: "Français",
  en: "English",
};
