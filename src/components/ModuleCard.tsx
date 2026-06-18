import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Icon } from "./Icon";
import type { Module } from "@/lib/data/types";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { resolveTranslation } from "@/i18n/resolve-translation";
import { colorsFor } from "@/lib/data/colors";
import { cn } from "@/lib/utils";

interface ModuleCardProps {
  module: Module;
  locale: Locale;
  dict: Dictionary;
  /** When true, ignore the per-category color and follow the theme tokens. */
  plain?: boolean;
  /** When true, the user has already visited this module. */
  visited?: boolean;
  /** When true, the card is the scroll-focused one (mobile interactivity). */
  active?: boolean;
}

export function ModuleCard({
  module,
  locale,
  dict,
  plain = false,
  visited = false,
  active = false,
}: ModuleCardProps) {
  const { value: t } = resolveTranslation(module.translations, locale);
  const colors = colorsFor(module.color);
  const iconChip = plain
    ? "bg-primary/10 text-primary"
    : cn(colors.iconBg, colors.iconText);
  const stepColor = plain ? "text-primary" : colors.stepText;
  const borderHover = "group-hover:border-warm/50";
  return (
    <Link
      href={`/${locale}/modulo/${module.slug}`}
      className="group block focus:outline-none"
    >
      <Card
        className={cn(
          "relative h-full overflow-hidden rounded-2xl p-6 shadow-soft transition-all duration-300 ease-out",
          "group-hover:-translate-y-1 group-hover:shadow-soft-lg",
          "group-active:translate-y-0 group-active:scale-[0.98] group-active:shadow-soft",
          "group-focus-visible:ring-2 group-focus-visible:ring-ring",
          active
            ? "-translate-y-1 border-warm/70 shadow-soft-lg"
            : visited
              ? "ring-2 ring-warm/60"
              : borderHover,
        )}
      >
        <ArrowUpRight
          className={cn(
            "absolute right-4 top-4 size-5 text-muted-foreground/40 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-warm group-hover:opacity-100",
            active && "translate-x-0.5 -translate-y-0.5 text-warm opacity-100",
          )}
          aria-hidden
        />

        {visited && (
          <span className="absolute bottom-4 right-4 flex items-center gap-1 text-[11px] font-medium text-warm">
            <CheckCircle2 className="size-3.5" />
            {dict.common.visited}
          </span>
        )}

        <div className="flex items-start gap-4">
          <div
            className={cn(
              "rounded-2xl p-3 transition-all duration-300 group-hover:scale-105 group-hover:bg-warm/15 group-hover:text-warm",
              active
                ? "scale-105 bg-warm/15 text-warm"
                : visited
                  ? "bg-warm/10 text-warm"
                  : iconChip,
            )}
          >
            <Icon name={module.icon} className="size-7" />
          </div>
          <div className="flex-1">
            <p
              className={cn(
                "text-xs font-semibold uppercase tracking-wide",
                stepColor,
              )}
            >
              {dict.trail.step} {module.order}
            </p>
            <h3 className="mt-1 min-h-[2.8rem] text-lg font-semibold leading-tight">
              {t.title}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">{t.summary}</p>
          </div>
        </div>
      </Card>
    </Link>
  );
}
