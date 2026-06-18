import Link from "next/link";
import { ArrowUpRight, Globe, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import {
  EV_BRADESCO_POST_SLUG,
  type EvBradescoHighlight,
} from "@/lib/data/ev-bradesco-guide";
import { cn } from "@/lib/utils";

interface EvBradescoHighlightCardProps {
  highlight: EvBradescoHighlight;
  dict: Dictionary;
  locale: Locale;
}

/** Card rotativo editorial — Escola Virtual Bradesco (jun/2026). */
export function EvBradescoHighlightCard({
  highlight,
  dict,
  locale,
}: EvBradescoHighlightCardProps) {
  const t = dict.novidades;
  const blogHref = `/${locale}/blog/${EV_BRADESCO_POST_SLUG}`;

  return (
    <Card
      className={cn(
        "group/card relative flex flex-col gap-4 rounded-2xl border-warm/40 bg-gradient-to-br from-warm/[0.06] to-card p-5 shadow-soft ring-0 sm:p-6",
        "transition-all duration-300 ease-out hover:-translate-y-1 hover:border-warm/50 hover:shadow-soft-lg",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge className="h-6 gap-1 rounded-full bg-warm px-2.5 text-warm-foreground hover:bg-warm">
            <Star className="size-3.5 fill-current" aria-hidden />
            {t.featuredLabel}
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
          className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-warm/15 text-warm"
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
            "rounded-full bg-warm text-warm-foreground hover:bg-warm/90",
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
