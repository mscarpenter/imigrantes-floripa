import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  BookOpen,
  Compass,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Reveal } from "@/components/motion/Reveal";
import { WelcomeForm } from "@/components/WelcomeForm";
import { cn } from "@/lib/utils";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return { title: dict.welcome.title };
}

export default async function WelcomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const t = dict.welcome;

  const portalHref = `/${lang}/portal`;
  const guideHref = `/${lang}/apresentacao`;

  return (
    <div className="relative isolate overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-primary/10 via-background to-background"
      />

      <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 md:py-20">
        <Reveal className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3.5 py-1.5 text-sm font-medium text-primary">
            <Sparkles className="size-4" aria-hidden />
            {t.eyebrow}
          </span>
          <h1 className="mt-5 text-3xl font-bold tracking-tight text-balance md:text-4xl">
            {t.title}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-pretty leading-relaxed text-muted-foreground">
            {t.subtitle}
          </p>
        </Reveal>

        {/* Formulário de contato */}
        <Reveal delay={80}>
          <section className="mt-10 rounded-3xl border border-border/60 bg-card p-6 shadow-soft sm:p-8">
            <div className="flex items-start gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Mail className="size-5" aria-hidden />
              </span>
              <div>
                <h2 className="text-lg font-semibold tracking-tight">
                  {t.form.title}
                </h2>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {t.form.description}
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-start gap-2 rounded-2xl bg-muted/50 p-3.5 text-xs leading-relaxed text-muted-foreground">
              <ShieldCheck
                className="mt-0.5 size-4 shrink-0 text-primary"
                aria-hidden
              />
              <span>
                {t.form.consent} {t.form.unsubscribe}
              </span>
            </div>

            <WelcomeForm strings={t.form} />
          </section>
        </Reveal>

        {/* Opções de navegação */}
        <Reveal delay={140}>
          <section className="mt-10">
            <h2 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
              {t.options.title}
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <OptionCard
                href={guideHref}
                icon={<BookOpen className="size-5" aria-hidden />}
                title={t.options.guide.title}
                description={t.options.guide.description}
              />
              <OptionCard
                href={portalHref}
                icon={<Compass className="size-5" aria-hidden />}
                title={t.options.portal.title}
                description={t.options.portal.description}
              />
            </div>

            <div className="mt-6 text-center">
              <Link
                href={portalHref}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
              >
                {t.options.skip}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </section>
        </Reveal>
      </div>
    </div>
  );
}

function OptionCard({
  href,
  icon,
  title,
  description,
  className,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex flex-col gap-3 rounded-2xl border border-border/60 bg-card p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md active:scale-[0.99]",
        className,
      )}
    >
      <span className="flex size-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        {icon}
      </span>
      <div>
        <h3 className="flex items-center gap-1.5 font-semibold tracking-tight">
          {title}
          <ArrowRight
            className="size-4 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
            aria-hidden
          />
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </Link>
  );
}
