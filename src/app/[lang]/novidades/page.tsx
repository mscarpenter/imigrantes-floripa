import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getPublishedCourses } from "@/lib/data/queries";
import { previewCourses } from "@/lib/data/courses.preview";
import { evBradescoHighlight } from "@/lib/data/ev-bradesco-guide";
import { getMicrosoftLearnHighlight } from "@/lib/data/microsoft-learn-guide";
import { resolveTranslation } from "@/i18n/resolve-translation";
import { CourseCard } from "@/components/courses/CourseCard";
import { EvBradescoHighlightCard } from "@/components/novidades/EvBradescoHighlight";
import { MicrosoftLearnHighlightCard } from "@/components/novidades/MicrosoftLearnHighlight";
import { ContentFallbackNotice } from "@/components/ContentFallbackNotice";
import { PortalMenuFabSlot } from "@/components/PortalMenuFabSlot";
import type { Course } from "@/lib/data/types";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/novidades">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return { title: dict.novidades.title, description: dict.novidades.subtitle };
}

function isHighlight(course: Course): boolean {
  return course.tags.some((tag) => tag === "rotativo" || tag === "trilha");
}

export default async function NovidadesPage({
  params,
}: PageProps<"/[lang]/novidades">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const t = dict.novidades;
  const showEvHighlight = lang === "pt";
  const msLearnHighlight = getMicrosoftLearnHighlight(lang);

  const published = getPublishedCourses();
  const isPreview =
    published.length === 0 && process.env.NODE_ENV !== "production";
  const courses = published.length > 0 ? published : isPreview ? previewCourses : [];

  const featured = courses.find(isHighlight);
  const rest = courses.filter((course) => course !== featured);

  const hasFallback = courses.some(
    (course) => resolveTranslation(course.translations, lang).isFallback,
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
      <header>
        <h1 className="font-slab text-4xl font-bold tracking-tight text-primary md:text-5xl">
          {t.title}
        </h1>
        <p className="mt-2 max-w-2xl text-lg text-muted-foreground">
          {t.subtitle}
        </p>
      </header>

      <section className="mt-10 space-y-6" aria-labelledby="novidades-highlight">
        <h2
          id="novidades-highlight"
          className="text-sm font-semibold tracking-wide text-muted-foreground uppercase"
        >
          {t.highlightTitle}
        </h2>

        <MicrosoftLearnHighlightCard
          highlight={msLearnHighlight}
          dict={dict}
          locale={lang}
        />

        {showEvHighlight ? (
          <EvBradescoHighlightCard
            highlight={evBradescoHighlight}
            dict={dict}
            locale={lang}
          />
        ) : (
          <ContentFallbackNotice
            message={t.guideEvPtOnly}
            className="mb-0"
          />
        )}
      </section>

      {isPreview && (
        <ContentFallbackNotice
          message={t.previewNotice}
          className="mt-8 mb-0"
        />
      )}

      {hasFallback && (
        <ContentFallbackNotice
          message={t.fallbackNotice}
          className="mt-8 mb-0"
        />
      )}

      {courses.length > 0 ? (
        <div className="mt-12 space-y-12">
          {featured && !showEvHighlight && (
            <section aria-labelledby="novidades-highlight-course">
              <h2
                id="novidades-highlight-course"
                className="mb-4 text-sm font-semibold tracking-wide text-muted-foreground uppercase"
              >
                {t.highlightTitle}
              </h2>
              <CourseCard course={featured} locale={lang} dict={dict} featured />
            </section>
          )}

          <section aria-labelledby="novidades-courses">
              <h2
                id="novidades-courses"
                className="text-2xl font-bold tracking-tight md:text-3xl"
              >
                {t.freeCoursesTitle}
              </h2>
              <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {t.freeCoursesSubtitle}
              </p>

              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    locale={lang}
                    dict={dict}
                  />
                ))}
            </div>
          </section>
        </div>
      ) : (
        <section className="mt-12 rounded-2xl border border-dashed border-border/80 bg-muted/30 px-6 py-10 text-center">
          <h2 className="text-lg font-semibold tracking-tight">{t.emptyTitle}</h2>
          <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
            {t.emptyBody}
          </p>
        </section>
      )}
      <PortalMenuFabSlot locale={lang} />
    </div>
  );
}
