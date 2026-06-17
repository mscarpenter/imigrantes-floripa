import { notFound } from "next/navigation";
import { GraduationCap, AlertCircle } from "lucide-react";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/motion/Reveal";
import { FeedbackDialog } from "@/components/FeedbackDialog";

const UNICESUSC_URL = "https://unicesusc.edu.br/";
const CIRCULOS_URL = "https://circulosdehospitalidade.org/";

export default async function AboutPage({ params }: PageProps<"/[lang]/sobre">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:py-14">
      <Reveal>
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          {dict.about.title}
        </h1>

        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          {dict.about.intro}
        </p>
      </Reveal>

      {/* Card 1 — Laranja (terracota) */}
      <Card className="mt-10 gap-0 rounded-2xl border-warm/20 bg-warm/5 p-6 shadow-soft ring-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg sm:p-7">
        <div className="flex items-start gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-warm/15 text-warm">
            <GraduationCap className="size-6" aria-hidden />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold">{dict.about.academicTitle}</h2>
            <p className="mt-1 text-sm font-medium italic text-warm">
              {dict.about.academicLead}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {dict.about.academicBodyBeforeUnicesusc}
              <a href={UNICESUSC_URL} target="_blank" rel="noreferrer"
                className="font-medium text-foreground underline underline-offset-2 hover:text-warm">
                {dict.about.academicUnicesuscLabel}
              </a>
              {dict.about.academicBodyBeforeCirculos}
              <a href={CIRCULOS_URL} target="_blank" rel="noreferrer"
                className="font-medium text-foreground underline underline-offset-2 hover:text-warm">
                {dict.about.academicCirculosLabel}
              </a>
              {dict.about.academicBodyAfterCirculos}
            </p>
          </div>
        </div>
      </Card>

      {/* Card 2 — Amarelo (aviso + sugestão) */}
      <Card className="mt-4 gap-0 rounded-2xl border-yellow-300/60 bg-yellow-50/70 p-6 shadow-soft ring-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg dark:border-yellow-800/40 dark:bg-yellow-950/20 sm:p-7">
        <div className="flex items-start gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-yellow-100 text-yellow-700 dark:bg-yellow-950/40 dark:text-yellow-300">
            <AlertCircle className="size-6" aria-hidden />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold">
              {dict.about.disclaimerTitle}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {dict.about.disclaimerBeforeContact}
              <FeedbackDialog strings={dict.feedback} />
              {dict.about.disclaimerAfterContact}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
