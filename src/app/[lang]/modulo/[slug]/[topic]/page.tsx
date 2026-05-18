import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import {
  getAllModules,
  getTopicBySlug,
  getContactsByIds,
} from "@/lib/data/queries";
import { Icon } from "@/components/Icon";
import { ContactCard } from "@/components/ContactCard";
import { MarkdownContent } from "@/components/MarkdownContent";
import { colorsFor } from "@/lib/data/colors";
import { cn } from "@/lib/utils";

export async function generateStaticParams() {
  const modules = getAllModules();
  return modules.flatMap((m) =>
    (m.topics ?? []).map((t) => ({ slug: m.slug, topic: t.slug })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/modulo/[slug]/[topic]">): Promise<Metadata> {
  const { lang, slug, topic: topicSlug } = await params;
  if (!isLocale(lang)) return {};
  const found = getTopicBySlug(slug, topicSlug);
  if (!found) return {};
  const t = found.topic.translations[lang];
  return { title: t.title, description: t.summary };
}

export default async function TopicPage({
  params,
}: PageProps<"/[lang]/modulo/[slug]/[topic]">) {
  const { lang, slug, topic: topicSlug } = await params;
  if (!isLocale(lang)) notFound();

  const found = getTopicBySlug(slug, topicSlug);
  if (!found) notFound();

  const { module, topic } = found;
  const dict = await getDictionary(lang);
  const t = topic.translations[lang];
  const moduleT = module.translations[lang];
  const colors = colorsFor(module.color);
  const topics = [...(module.topics ?? [])].sort((a, b) => a.order - b.order);
  const currentIndex = topics.findIndex((x) => x.slug === topic.slug);
  const previousTopic = currentIndex > 0 ? topics[currentIndex - 1] : null;
  const nextTopic =
    currentIndex < topics.length - 1 ? topics[currentIndex + 1] : null;
  const relatedContacts = getContactsByIds(topic.contactIds);

  return (
    <article>
      {/* Rich colored header */}
      <header className={cn("border-b", colors.softBg)}>
        <div className="mx-auto max-w-3xl px-4 py-10 md:py-12">
          <Link
            href={`/${lang}/modulo/${module.slug}`}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            {moduleT.title}
          </Link>

          <div className="mt-6 flex items-center gap-3">
            <div
              className={cn(
                "flex size-11 items-center justify-center rounded-xl border bg-background",
                colors.iconText,
              )}
            >
              <Icon name={module.icon} className="size-5" />
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide">
              <span className={colors.stepText}>
                {dict.trail.topic} {topic.order} {dict.trail.topicOf}{" "}
                {topics.length}
              </span>
              <span className="text-muted-foreground/40">·</span>
              <span className="text-muted-foreground">{moduleT.title}</span>
            </div>
          </div>

          <h1 className="mt-5 text-3xl font-bold tracking-tight md:text-4xl">
            {t.title}
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
            {t.summary}
          </p>

          {/* Topic chips at the bottom of header */}
          {topics.length > 1 && (
            <nav
              aria-label="Topics in this module"
              className="mt-6 flex flex-wrap gap-2"
            >
              {topics.map((other) => {
                const isCurrent = other.slug === topic.slug;
                return (
                  <Link
                    key={other.slug}
                    href={`/${lang}/modulo/${module.slug}/${other.slug}`}
                    aria-current={isCurrent ? "page" : undefined}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                      isCurrent
                        ? colors.pillActive
                        : "border-border bg-background text-muted-foreground hover:border-foreground/40 hover:text-foreground",
                    )}
                  >
                    <span className="text-[10px] opacity-70">{other.order}</span>
                    <span>{other.translations[lang].title}</span>
                  </Link>
                );
              })}
            </nav>
          )}
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4 py-10 md:py-14">
        <MarkdownContent body={t.body} color={module.color} />

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
              {dict.trail.relatedTopicContacts}
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

        {/* Prev/next topic navigation as cards */}
        <nav className="mt-14 grid gap-3 sm:grid-cols-2">
          {previousTopic ? (
            <Link
              href={`/${lang}/modulo/${module.slug}/${previousTopic.slug}`}
              className="group flex flex-col rounded-xl border bg-card p-4 transition-colors hover:border-foreground/40"
            >
              <span className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                <ArrowLeft className="size-3" />
                {dict.trail.previousTopic}
              </span>
              <span className="mt-1.5 font-semibold leading-tight">
                {previousTopic.translations[lang].title}
              </span>
            </Link>
          ) : (
            <span className="hidden sm:block" />
          )}
          {nextTopic && (
            <Link
              href={`/${lang}/modulo/${module.slug}/${nextTopic.slug}`}
              className="group flex flex-col items-end rounded-xl border bg-card p-4 text-right transition-colors hover:border-foreground/40 sm:col-start-2"
            >
              <span className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {dict.trail.nextTopic}
                <ArrowRight className="size-3" />
              </span>
              <span className="mt-1.5 font-semibold leading-tight">
                {nextTopic.translations[lang].title}
              </span>
            </Link>
          )}
        </nav>
      </div>
    </article>
  );
}
