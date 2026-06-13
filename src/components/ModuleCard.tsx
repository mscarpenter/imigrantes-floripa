import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Icon } from "./Icon";
import type { Module } from "@/lib/data/types";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { colorsFor } from "@/lib/data/colors";
import { cn } from "@/lib/utils";

interface ModuleCardProps {
  module: Module;
  locale: Locale;
  dict: Dictionary;
  /** When true, ignore the per-category color and follow the theme tokens. */
  plain?: boolean;
}

export function ModuleCard({
  module,
  locale,
  dict,
  plain = false,
}: ModuleCardProps) {
  const t = module.translations[locale];
  const colors = colorsFor(module.color);
  const iconChip = plain
    ? "bg-primary/10 text-primary"
    : cn(colors.iconBg, colors.iconText);
  const stepColor = plain ? "text-primary" : colors.stepText;
  const borderHover = plain ? "group-hover:border-primary/40" : colors.cardBorder;
  return (
    <Link
      href={`/${locale}/modulo/${module.slug}`}
      className="group block focus:outline-none"
    >
      <Card
        className={cn(
          "relative h-full overflow-hidden p-6 transition-all duration-300 ease-out",
          "group-hover:-translate-y-1 group-hover:shadow-lg group-focus-visible:ring-2 group-focus-visible:ring-ring",
          borderHover,
        )}
      >
        <ArrowUpRight
          className="absolute right-4 top-4 size-5 text-muted-foreground/40 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary group-hover:opacity-100"
          aria-hidden
        />
        <div className="flex items-start gap-4">
          <div
            className={cn(
              "rounded-2xl p-3 transition-transform duration-300 group-hover:scale-105",
              iconChip,
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
            <h3 className="mt-1 text-lg font-semibold leading-tight">
              {t.title}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">{t.summary}</p>
          </div>
        </div>
      </Card>
    </Link>
  );
}
