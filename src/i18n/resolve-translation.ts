import { defaultLocale, type Locale } from "./config";

export interface ResolvedTranslation<T> {
  value: T;
  isFallback: boolean;
}

/**
 * Returns the translation for `locale`, falling back to `defaultLocale` (pt)
 * when the requested locale is not available yet (progressive i18n rollout).
 */
export function resolveTranslation<T>(
  translations: Partial<Record<Locale, T>>,
  locale: Locale,
): ResolvedTranslation<T> {
  const requested = translations[locale];
  if (requested) {
    return { value: requested, isFallback: false };
  }

  const fallback = translations[defaultLocale];
  if (fallback) {
    return { value: fallback, isFallback: true };
  }

  const first = Object.values(translations)[0];
  if (!first) {
    throw new Error("No translations available");
  }
  return { value: first, isFallback: true };
}
