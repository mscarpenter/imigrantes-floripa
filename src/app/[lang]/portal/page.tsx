import Image from "next/image";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getAllModules } from "@/lib/data/queries";
import { onboardingCards } from "@/lib/data/onboarding";
import { resolveTranslation } from "@/i18n/resolve-translation";
import { ModuleScrollGrid } from "@/components/ModuleScrollGrid";
import { TrilhaCarousel } from "@/components/home/TrilhaCarousel";
import { AboutMoreDialog } from "@/components/home/AboutMoreDialog";
import { PortalMenuFab } from "@/components/PortalMenuFab";
import { Reveal } from "@/components/motion/Reveal";

export default async function PortalPage({
  params,
}: PageProps<"/[lang]/portal">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const modules = getAllModules();

  const cards = onboardingCards.map((card) => {
    const { value: c } = resolveTranslation(card.translations, lang);
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

  return (
    <div className="bg-background text-foreground">
      {/* ONBOARDING EDITORIAL — carrossel full-bleed (slide 1 = boas-vindas) */}
      <section className="bg-background pb-12 md:pb-16">
        <TrilhaCarousel
          intro={{
            eyebrow: dict.site.tagline,
            title: dict.home.heroTitle,
            subtitle: dict.home.heroSubtitle,
            image: "/illustrations/floripa-hero.png",
            label: dict.home.welcomeLabel,
          }}
          cards={cards}
          trailLabel={dict.home.ctaTrail}
          trailHref={`/${lang}/orientacao`}
          prevLabel={dict.slides.prev}
          nextLabel={dict.slides.next}
        />
      </section>

      {/* GRADE — todos os temas */}
      <section className="border-t bg-muted/30">
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
          <Reveal as="h2" className="text-3xl font-bold tracking-tight md:text-4xl">
            {dict.home.sectionModules}
          </Reveal>
          <ModuleScrollGrid
            modules={modules}
            locale={lang}
            dict={dict}
            plain
            gridClassName="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          />
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
            <div className="flex flex-col p-8 sm:p-10 md:p-12">
              <h2 className="text-2xl font-bold tracking-tight text-warm md:text-3xl">
                {dict.home.sectionAbout}
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                {dict.home.aboutBody}
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 md:mt-auto md:pt-8">
                <AboutMoreDialog
                  label={dict.home.aboutMoreLabel}
                  title={dict.home.aboutMoreTitle}
                  paragraphs={dict.home.aboutMoreBody}
                />
                <div className="flex items-center gap-5">
                  <a
                    href="https://unicesusc.edu.br/"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="UNICESUSC"
                    className="transition-opacity hover:opacity-70"
                  >
                    <Image
                      src="/logos/unicesusc-logo.png"
                      alt="UNICESUSC"
                      width={180}
                      height={180}
                      className="h-16 w-auto object-contain"
                    />
                  </a>
                  <a
                    href="https://circulosdehospitalidade.org/"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Círculos de Hospitalidade"
                    className="transition-opacity hover:opacity-70"
                  >
                    <Image
                      src="/logos/circulos-da-hospitalidade-logo.png"
                      alt="Círculos de Hospitalidade"
                      width={200}
                      height={110}
                      className="h-12 w-auto object-contain"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <PortalMenuFab locale={lang} strings={dict.portalMenu} />
    </div>
  );
}
