import Link from "next/link";
import { ArrowUpRight, Globe, Languages, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import {
  MICROSOFT_LEARN_POST_SLUG,
  type MicrosoftLearnHighlight,
} from "@/lib/data/microsoft-learn-guide";
import { cn } from "@/lib/utils";

interface MicrosoftLearnHighlightCardProps {
  highlight: MicrosoftLearnHighlight;
  dict: Dictionary;
  locale: Locale;
}

/** Card editorial: Microsoft Learn (jun/2026). Destaque para quem não tem CPF. */
export function MicrosoftLearnHighlightCard({
  highlight,
  dict,
  locale,
}: MicrosoftLearnHighlightCardProps) {
  const t = dict.novidades;
  const blogHref = `/${locale}/blog/${MICROSOFT_LEARN_POST_SLUG}`;

  return (
    <Card
      className={cn(
        "group/card relative flex flex-col gap-4 rounded-2xl border-primary/25 bg-gradient-to-br from-primary/[0.06] to-card p-5 shadow-soft ring-0 sm:p-6",
        "transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary/35 hover:shadow-soft-lg",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge className="h-6 gap-1 rounded-full bg-primary px-2.5 text-primary-foreground hover:bg-primary">
            <ShieldCheck className="size-3.5" aria-hidden />
            {highlight.noCpfBadge}
          </Badge>
          <Badge variant="outline" className="h-6 gap-1 rounded-full">
            <Languages className="size-3.5" aria-hidden />
            {highlight.multilingualBadge}
          </Badge>
          <Badge variant="outline" className="h-6 gap-1 rounded-full">
            <Globe className="size-3.5" aria-hidden />
            {t.formatOnline}
          </Badge>
          <Badge variant="secondary" className="h-6 rounded-full">
            {t.freeLabel}
          </Badge>
        </div>
        <span
          className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary/15 text-primary"
          aria-hidden
        >
          <Globe className="size-6" />
        </span>
      </div>

      <div>
        <p className="text-xs font-medium text-muted-foreground">
          {highlight.subtitle}
        </p>
        <h2 className="mt-1 text-xl font-bold tracking-tight text-balance md:text-2xl">
          {highlight.title}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
          {highlight.body}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3 pt-1">
        <Link
          href={blogHref}
          className={cn(
            buttonVariants({ size: "sm" }),
            "rounded-full bg-primary text-primary-foreground hover:bg-primary/90",
          )}
        >
          {highlight.routesCta}
          <ArrowUpRight className="size-4" aria-hidden />
        </Link>
        <a
          href={highlight.enrollUrl}
          target="_blank"
          rel="noreferrer"
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "rounded-full",
          )}
        >
          {highlight.enrollCta}
          <ArrowUpRight className="size-4" aria-hidden />
        </a>
        <span className="text-xs text-muted-foreground">{t.externalHint}</span>
      </div>
    </Card>
  );
}
