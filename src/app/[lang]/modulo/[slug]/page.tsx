import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import {
  getAllModules,
  getModuleBySlug,
  getContactsByIds,
} from "@/lib/data/queries";
import { Icon } from "@/components/Icon";
import { ContactCard } from "@/components/ContactCard";
import { TopicCard } from "@/components/TopicCard";
import { MarkdownContent } from "@/components/MarkdownContent";
import { TableOfContents } from "@/components/article/TableOfContents";
import { ReadingProgress } from "@/components/article/ReadingProgress";
import { extractHeadings } from "@/lib/markdown/toc";
import { colorsFor } from "@/lib/data/colors";
import { cn } from "@/lib/utils";

export async function generateStaticParams() {
  const modules = getAllModules();
  return modules.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/modulo/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};
  const mod = getModuleBySlug(slug);
  if (!mod) return {};
  const t = mod.translations[lang];
  return { title: t.title, description: t.summary };
}

export default async function ModulePage({
  params,
}: PageProps<"/[lang]/modulo/[slug]">) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();

  const mod = getModuleBySlug(slug);
  if (!mod) notFound();

  const dict = await getDictionary(lang);
  const t = mod.translations[lang];
  const colors = colorsFor(mod.color);
  const allModules = getAllModules();
  const currentIndex = allModules.findIndex((m) => m.slug === mod.slug);
  const previousModule = currentIndex > 0 ? allModules[currentIndex - 1] : null;
  const nextModule =
    currentIndex < allModules.length - 1 ? allModules[currentIndex + 1] : null;
  const relatedContacts = getContactsByIds(mod.contactIds);
  const topics = [...(mod.topics ?? [])].sort((a, b) => a.order - b.order);
  const hasTopics = topics.length > 0;
  const headings = extractHeadings(t.body);

  return (
    <article>
      <ReadingProgress />
      {/* Rich colored header */}
      <header className={cn("border-b", colors.softBg)}>
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
          <Link
            href={`/${lang}/orientacao`}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            {dict.nav.trail}
          </Link>

          <div className="mt-6 flex items-center gap-3">
            <div
              className={cn(
                "flex size-14 items-center justify-center rounded-2xl border bg-background shadow-sm",
                colors.iconText,
              )}
            >
              <Icon name={mod.icon} className="size-7" />
            </div>
            <div>
              <p
                className={cn(
                  "text-xs font-semibold uppercase tracking-wide",
                  colors.stepText,
                )}
              >
                {dict.trail.step} {mod.order}
              </p>
              <h1 className="mt-0.5 text-3xl font-bold tracking-tight md:text-4xl">
                {t.title}
              </h1>
            </div>
          </div>

          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            {t.summary}
          </p>

          {topics.length > 1 && (
            <nav
              aria-label={dict.trail.topicsInModule}
              className="mt-6 flex flex-wrap gap-2"
            >
              {topics.map((topic) => (
                <Link
                  key={topic.slug}
                  href={`/${lang}/modulo/${mod.slug}/${topic.slug}#conteudo`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
                >
                  <span className="text-[10px] opacity-70">{topic.order}</span>
                  <span>{topic.translations[lang].title}</span>
                </Link>
              ))}
            </nav>
          )}
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-14">
          <main className="min-w-0">
            {headings.length > 0 && (
              <TableOfContents
                headings={headings}
                label={dict.trail.onThisPage}
                variant="mobile"
              />
            )}

            <MarkdownContent body={t.body} color={mod.color} />

        {hasTopics && (
          <section className="mt-12">
            <h2 className="flex items-center gap-3 text-xl font-bold tracking-tight">
              <span
                aria-hidden
                className={cn(
                  "inline-block h-5 w-1 shrink-0 rounded-full",
                  colors.solidBg,
                )}
              />
              {dict.trail.topicsInModule}
            </h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {topics.map((topic) => (
                <TopicCard
                  key={topic.slug}
                  topic={topic}
                  moduleSlug={mod.slug}
                  moduleColor={mod.color}
                  locale={lang}
                />
              ))}
            </div>
          </section>
        )}

        {relatedContacts.length > 0 && (
          <section className="mt-14">
            <h2 className="flex items-center gap-3 text-xl font-bold tracking-tight">
              <span
                aria-hidden
                className={cn(
                  "inline-block h-5 w-1 shrink-0 rounded-full",
                  colors.solidBg,
                )}
              />
              {dict.trail.relatedContacts}
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {relatedContacts.map((contact) => (
                <ContactCard
                  key={contact.id}
                  contact={contact}
                  locale={lang}
                  dict={dict}
                />
              ))}
            </div>
          </section>
        )}

        {/* Prev/next module navigation as cards */}
        <nav className="mt-14 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {previousModule ? (
            <Link
              href={`/${lang}/modulo/${previousModule.slug}`}
              className="group flex items-center gap-3 rounded-2xl border border-border/60 bg-card p-4 shadow-soft transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-soft-lg active:translate-y-0 active:scale-[0.98]"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {dict.trail.previousTopic}
                </span>
                <span className="mt-0.5 block truncate font-semibold leading-tight">
                  {previousModule.translations[lang].title}
                </span>
              </span>
            </Link>
          ) : (
            <span className="hidden sm:block" />
          )}
          {nextModule && (
            <Link
              href={`/${lang}/modulo/${nextModule.slug}`}
              className="group flex items-center justify-end gap-3 rounded-2xl border border-border/60 bg-card p-4 text-right shadow-soft transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-soft-lg active:translate-y-0 active:scale-[0.98] sm:col-start-2"
            >
              <span className="min-w-0">
                <span className="block text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {dict.trail.nextTopic}
                </span>
                <span className="mt-0.5 block truncate font-semibold leading-tight">
                  {nextModule.translations[lang].title}
                </span>
              </span>
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          )}
        </nav>
          </main>

          <aside className="hidden lg:block">
            {headings.length > 0 && (
              <TableOfContents
                headings={headings}
                label={dict.trail.onThisPage}
                variant="desktop"
              />
            )}
          </aside>
        </div>
      </div>
    </article>
  );
}
