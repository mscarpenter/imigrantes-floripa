"use client";

import { usePathname, useRouter } from "next/navigation";
import { locales, localeLabels, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";
import { Flag } from "./Flag";

interface LanguageSwitcherProps {
  current: Locale;
}

export function LanguageSwitcher({ current }: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();

  function switchTo(target: Locale) {
    if (target === current) return;
    const segments = pathname.split("/");
    segments[1] = target;
    router.push(segments.join("/") || `/${target}`);
  }

  return (
    <div
      role="group"
      aria-label="Language"
      className="inline-flex items-center gap-0.5 rounded-full border bg-background p-0.5"
    >
      {locales.map((locale) => {
        const active = locale === current;
        return (
          <button
            key={locale}
            type="button"
            onClick={() => switchTo(locale)}
            aria-current={active ? "true" : undefined}
            aria-label={localeLabels[locale]}
            title={localeLabels[locale]}
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-1.5 py-1 text-xs font-semibold uppercase tracking-wide transition-colors sm:gap-1.5 sm:px-2",
              active
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            <Flag locale={locale} className="size-4 w-5 shrink-0" />
            <span className="hidden min-[420px]:inline">{locale}</span>
          </button>
        );
      })}
    </div>
  );
}
