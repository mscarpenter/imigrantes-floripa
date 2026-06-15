import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import {
  getAllPosts,
  getPostBySlug,
  getPostTranslation,
  readingMinutes,
} from "@/lib/data/queries";
import { Icon } from "@/components/Icon";
import { MarkdownContent } from "@/components/MarkdownContent";
import { TableOfContents } from "@/components/article/TableOfContents";
import { ReadingProgress } from "@/components/article/ReadingProgress";
import { extractHeadings } from "@/lib/markdown/toc";
import { colorsFor } from "@/lib/data/colors";
import { cn } from "@/lib/utils";

export async function generateStaticParams() {
  return getAllPosts()
    .filter((p) => !p.comingSoon)
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/blog/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};
  const post = getPostBySlug(slug);
  if (!post) return {};
  const { t } = getPostTranslation(post, lang);
  return { title: t.title, description: t.excerpt };
}

export default async function PostPage({
  params,
}: PageProps<"/[lang]/blog/[slug]">) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();

  const post = getPostBySlug(slug);
  if (!post || post.comingSoon) notFound();

  const dict = await getDictionary(lang);
  const { t, isFallback } = getPostTranslation(post, lang);
  const colors = colorsFor(post.color);
  const headings = extractHeadings(t.body);
  const minutes = readingMinutes(t.body);
  const date = new Intl.DateTimeFormat(lang === "es" ? "es-ES" : "pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(post.date));

  return (
    <article>
      <ReadingProgress />
      <header className={cn("border-b", colors.softBg)}>
        <div className="mx-auto max-w-4xl px-4 py-10 md:py-12">
          <Link
            href={`/${lang}/blog`}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            {dict.blog.backToBlog}
          </Link>

          <div className="mt-6 flex items-center gap-3">
            <div
              className={cn(
                "flex size-11 items-center justify-center rounded-xl border bg-background",
                colors.iconText,
              )}
            >
              <Icon name={post.icon} className="size-5" />
            </div>
            <span
              className={cn(
                "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide",
                colors.badge,
              )}
            >
              {t.tag}
            </span>
          </div>

          <h1 className="mt-5 text-3xl font-bold tracking-tight md:text-4xl">
            {t.title}
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
            {t.excerpt}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <span>{date}</span>
            <span aria-hidden>·</span>
            <span>
              {minutes} {dict.blog.readingTime}
            </span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4">
        <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-2xl border bg-muted shadow-soft">
          <Image
            src={post.cover}
            alt=""
            fill
            sizes="(min-width: 768px) 56rem, 100vw"
            className="object-cover"
            priority
          />
        </div>
      </div>

      <div
        id="conteudo"
        className="mx-auto max-w-4xl scroll-mt-24 px-4 py-10 md:py-14"
      >
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-14">
          <main className="min-w-0">
            {isFallback && (
              <div
                className={cn(
                  "mb-8 rounded-xl border p-4 text-sm leading-relaxed text-foreground/90",
                  colors.softBg,
                  colors.softBorder,
                )}
              >
                {dict.blog.availableInPt}
              </div>
            )}

            <TableOfContents
              headings={headings}
              label={dict.trail.onThisPage}
              variant="mobile"
            />

            <MarkdownContent body={t.body} color={post.color} />
          </main>

          <aside className="hidden lg:block">
            <TableOfContents
              headings={headings}
              label={dict.trail.onThisPage}
              variant="desktop"
            />
          </aside>
        </div>
      </div>
    </article>
  );
}
