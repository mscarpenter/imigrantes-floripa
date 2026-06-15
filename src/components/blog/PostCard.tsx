import Link from "next/link";
import Image from "next/image";
import { Clock } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Post } from "@/lib/data/types";
import { getPostTranslation, readingMinutes } from "@/lib/data/queries";
import { colorsFor } from "@/lib/data/colors";
import { cn } from "@/lib/utils";

interface PostCardProps {
  post: Post;
  locale: Locale;
  dict: Dictionary;
}

export function PostCard({ post, locale, dict }: PostCardProps) {
  const { t } = getPostTranslation(post, locale);
  const colors = colorsFor(post.color);

  if (post.comingSoon) {
    return (
      <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-dashed border-border bg-card/60 shadow-soft">
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
          <Image
            src={post.cover}
            alt=""
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover opacity-60 saturate-[0.7]"
          />
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-warm px-2.5 py-1 text-xs font-semibold text-warm-foreground shadow-sm">
            <Clock className="size-3.5" />
            {dict.blog.comingSoon}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <span
            className={cn(
              "inline-flex w-fit items-center rounded-full px-2.5 py-0.5 text-xs font-semibold opacity-80",
              colors.badge,
            )}
          >
            {t.tag}
          </span>
          <h2 className="mt-3 text-lg font-bold leading-snug tracking-tight text-foreground/80">
            {t.title}
          </h2>
          <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
            {t.excerpt}
          </p>
          <div className="mt-4 text-xs font-medium text-warm">
            {dict.blog.comingSoon}
          </div>
        </div>
      </article>
    );
  }

  const minutes = readingMinutes(t.body);
  const date = new Intl.DateTimeFormat(locale === "es" ? "es-ES" : "pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(post.date));

  return (
    <Link href={`/${locale}/blog/${post.slug}`} className="group block h-full">
      <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-soft transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:border-warm/50 group-hover:shadow-soft-lg group-active:translate-y-0 group-active:scale-[0.98] group-focus-visible:ring-2 group-focus-visible:ring-ring">
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
          <Image
            src={post.cover}
            alt=""
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-1 flex-col p-5">
          <span
            className={cn(
              "inline-flex w-fit items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
              colors.badge,
            )}
          >
            {t.tag}
          </span>
          <h2 className="mt-3 text-lg font-bold leading-snug tracking-tight">
            {t.title}
          </h2>
          <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
            {t.excerpt}
          </p>
          <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
            <span>{date}</span>
            <span aria-hidden>·</span>
            <span>
              {minutes} {dict.blog.readingTime}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
