import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Mail, ShieldCheck, Sparkles } from "lucide-react";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { WelcomeForm } from "@/components/WelcomeForm";
import { Card } from "@/components/ui/card";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/cadastro">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return { title: dict.welcome.form.title, description: dict.welcome.subtitle };
}

export default async function CadastroPage({
  params,
}: PageProps<"/[lang]/cadastro">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const t = dict.welcome;
  const introHref = `/${lang}/intro`;

  return (
    <div className="relative isolate overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-primary/10 via-background to-background"
      />

      <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 md:py-16">
        <header className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3.5 py-1.5 text-sm font-medium text-primary">
            <Sparkles className="size-4" aria-hidden />
            {t.eyebrow}
          </span>
          <h1 className="mt-5 text-3xl font-bold tracking-tight text-balance md:text-4xl">
            {t.title}
          </h1>
          <p className="mt-1 text-sm font-medium text-primary">
            {dict.site.brandSubtitle}
          </p>
          <p className="mx-auto mt-4 max-w-xl text-pretty leading-relaxed text-muted-foreground">
            {t.subtitle}
          </p>
        </header>

        <Card className="mt-10 min-w-0 gap-0 overflow-hidden rounded-3xl border-border/60 p-6 shadow-soft ring-0 sm:p-8">
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

          <WelcomeForm
            strings={t.form}
            locale={lang}
            continueHref={introHref}
          />
        </Card>
      </div>
    </div>
  );
}
