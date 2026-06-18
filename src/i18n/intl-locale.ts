import type { Locale } from "./config";

const intlLocales: Record<Locale, string> = {
  pt: "pt-BR",
  es: "es-ES",
  fr: "fr-FR",
  en: "en-US",
};

export function intlLocaleFor(locale: Locale): string {
  return intlLocales[locale];
}

export function formatDate(
  locale: Locale,
  date: Date | string,
  options?: Intl.DateTimeFormatOptions,
): string {
  const value = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat(intlLocaleFor(locale), {
    day: "2-digit",
    month: "long",
    year: "numeric",
    ...options,
  }).format(value);
}
