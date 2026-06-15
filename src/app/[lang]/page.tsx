import Image from "next/image";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getAllModules } from "@/lib/data/queries";
import { onboardingCards } from "@/lib/data/onboarding";
import { ModuleCard } from "@/components/ModuleCard";
import { TrilhaCarousel } from "@/components/home/TrilhaCarousel";
import { Reveal } from "@/components/motion/Reveal";

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const modules = getAllModules();
  const isEs = lang === "es";

  const cards = onboardingCards.map((card) => {
    const c = card.translations[lang];
    return {
      id: card.id,
      icon: card.icon,
      image: card.image,
      tag: c.tag,
      title: c.title,
      intro: c.intro,
      ctaLabel: c.cta,
      href: `/${lang}${card.path}`,
    };
  });

  const t = {
    prev: "Anterior",
    next: isEs ? "Siguiente" : "Próximo",
  };

  return (
    <div className="bg-background text-foreground">
      {/* ONBOARDING EDITORIAL — carrossel full-bleed (slide 1 = boas-vindas) */}
      <section className="bg-background pb-12 md:pb-16">
        <TrilhaCarousel
          intro={{
            eyebrow: dict.site.tagline,
            title: dict.home.heroTitle,
            subtitle: dict.home.heroSubtitle,
            label: isEs ? "Bienvenida" : "Boas-vindas",
          }}
          cards={cards}
          trailLabel={dict.home.ctaTrail}
          trailHref={`/${lang}/orientacao`}
          prevLabel={t.prev}
          nextLabel={t.next}
        />
      </section>

      {/* GRADE — todos os temas */}
      <section className="border-t bg-muted/30">
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
          <Reveal as="h2" className="text-2xl font-bold tracking-tight md:text-3xl">
            {dict.home.sectionModules}
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {modules.map((module, i) => (
              <Reveal key={module.slug} delay={Math.min(i * 60, 360)}>
                <ModuleCard module={module} locale={lang} dict={dict} plain />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SOBRE */}
      <section className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 md:py-24">
        <Reveal>
          <div className="overflow-hidden rounded-3xl border border-border/60 bg-card shadow-soft md:grid md:grid-cols-2 md:items-stretch">
            <div className="relative aspect-[16/10] w-full md:aspect-auto md:h-full md:min-h-[20rem]">
              <Image
                src="/illustrations/acolhimento.jpg"
                alt=""
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="p-8 sm:p-10 md:p-12">
              <h2 className="text-2xl font-bold tracking-tight">
                {dict.home.sectionAbout}
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                {dict.home.aboutBody}
              </p>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
