import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
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
import { Separator } from "@/components/ui/separator";
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
  return {
    title: t.title,
    description: t.summary,
  };
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
    <article className="mx-auto max-w-3xl px-4 py-10 md:py-14">
      <Link
        href={`/${lang}/modulo/${module.slug}`}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" /> {moduleT.title}
      </Link>

      <div className="mt-6 flex items-center gap-3">
        <div className={cn("rounded-lg p-2.5", colors.iconBg, colors.iconText)}>
          <Icon name={module.icon} className="size-6" />
        </div>
        <p
          className={cn(
            "text-sm font-semibold uppercase tracking-wide",
            colors.stepText,
          )}
        >
          {dict.trail.topic} {topic.order} {dict.trail.topicOf} {topics.length}
        </p>
      </div>

      <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
        {t.title}
      </h1>
      <p className="mt-3 text-lg text-muted-foreground">{t.summary}</p>

      <Separator className="my-8" />

      <div className="prose prose-stone max-w-none dark:prose-invert prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h3:text-lg prose-a:text-primary">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{t.body}</ReactMarkdown>
      </div>

      {relatedContacts.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-semibold">
            {dict.trail.relatedTopicContacts}
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
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

      <nav className="mt-12 flex items-center justify-between gap-4 border-t pt-6 text-sm">
        {previousTopic ? (
          <Link
            href={`/${lang}/modulo/${module.slug}/${previousTopic.slug}`}
            className="group flex flex-1 items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
            <span className="truncate">
              {dict.trail.previousTopic}:{" "}
              {previousTopic.translations[lang].title}
            </span>
          </Link>
        ) : (
          <span className="flex-1" />
        )}
        {nextTopic && (
          <Link
            href={`/${lang}/modulo/${module.slug}/${nextTopic.slug}`}
            className="group flex flex-1 items-center justify-end gap-2 text-right text-muted-foreground hover:text-foreground"
          >
            <span className="truncate">
              {dict.trail.nextTopic}: {nextTopic.translations[lang].title}
            </span>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        )}
      </nav>
    </article>
  );
}
