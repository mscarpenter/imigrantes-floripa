import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { Topic } from "@/lib/data/types";
import type { ModuleColor } from "@/lib/data/colors";
import type { Locale } from "@/i18n/config";
import { resolveTranslation } from "@/i18n/resolve-translation";
import { colorsFor } from "@/lib/data/colors";
import { cn } from "@/lib/utils";

interface TopicCardProps {
  topic: Topic;
  moduleSlug: string;
  moduleColor: ModuleColor;
  locale: Locale;
}

export function TopicCard({
  topic,
  moduleSlug,
  moduleColor,
  locale,
}: TopicCardProps) {
  const { value: t } = resolveTranslation(topic.translations, locale);
  const colors = colorsFor(moduleColor);
  return (
    <Link
      href={`/${locale}/modulo/${moduleSlug}/${topic.slug}#conteudo`}
      className="group block focus:outline-none"
    >
      <Card
        className={cn(
          "h-full rounded-2xl p-5 shadow-soft transition-all duration-300 ease-out",
          "group-hover:-translate-y-1 group-hover:shadow-soft-lg",
          "group-active:translate-y-0 group-active:scale-[0.98] group-active:shadow-soft",
          "group-focus-visible:ring-2 group-focus-visible:ring-ring",
          "group-hover:border-warm/50",
        )}
      >
        <div className="flex items-start gap-4">
          <span
            className={cn(
              "flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-colors duration-300 group-hover:bg-warm/15 group-hover:text-warm",
              colors.iconBg,
              colors.iconText,
            )}
          >
            {topic.order}
          </span>
          <div className="flex-1">
            <h3 className="font-semibold leading-tight">{t.title}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">{t.summary}</p>
          </div>
          <ArrowRight
            className="size-4 shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-warm"
            aria-hidden
          />
        </div>
      </Card>
    </Link>
  );
}
