import Link from "next/link";
import { notFound } from "next/navigation";
import { GraduationCap, AlertCircle } from "lucide-react";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const GITHUB_URL = "https://github.com/PR3Stoot/imigrantes-floripa";
const UNICESUSC_URL = "https://unicesusc.edu.br/";
const CIRCULOS_URL = "https://circulosdehospitalidade.org/";

function GithubMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.44 9.8 8.21 11.39.6.11.79-.26.79-.58v-2.17c-3.34.73-4.04-1.38-4.04-1.38-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.09 1.85 1.24 1.85 1.24 1.08 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.31-.54-1.53.12-3.19 0 0 1.01-.32 3.3 1.23a11.51 11.51 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.88.12 3.19.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.49 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.19.69.8.58A12 12 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

export default async function AboutPage({ params }: PageProps<"/[lang]/sobre">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:py-14">
      <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
        {dict.about.title}
      </h1>

      <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
        {dict.about.intro}
      </p>

      <Card className="relative mt-10 overflow-hidden p-6 pl-8">
        <span
          aria-hidden
          className="absolute inset-y-0 left-0 w-1 bg-teal-500"
        />
        <div className="flex items-start gap-4">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-teal-100 text-teal-700 dark:bg-teal-950/40 dark:text-teal-300">
            <GraduationCap className="size-5" aria-hidden />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold">{dict.about.academicTitle}</h2>
            <p className="mt-1 text-sm font-medium italic text-teal-700 dark:text-teal-300">
              {dict.about.academicLead}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {dict.about.academicBodyBeforeUnicesusc}
              <a
                href={UNICESUSC_URL}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-foreground underline underline-offset-2 hover:text-primary"
              >
                {dict.about.academicUnicesuscLabel}
              </a>
              {dict.about.academicBodyBeforeCirculos}
              <a
                href={CIRCULOS_URL}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-foreground underline underline-offset-2 hover:text-primary"
              >
                {dict.about.academicCirculosLabel}
              </a>
              {dict.about.academicBodyAfterCirculos}
            </p>
          </div>
        </div>
      </Card>

      <Card className="relative mt-4 overflow-hidden p-6 pl-8">
        <span
          aria-hidden
          className="absolute inset-y-0 left-0 w-1 bg-foreground"
        />
        <div className="flex items-start gap-4">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border bg-background">
            <GithubMark className="size-5" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold">
              {dict.about.openSourceTitle}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {dict.about.openSource}
            </p>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-foreground underline underline-offset-2 hover:text-primary"
            >
              <GithubMark className="size-3.5" />
              {dict.about.openSourceLink}
            </a>
          </div>
        </div>
      </Card>

      <Card
        className={cn(
          "relative mt-4 overflow-hidden border-amber-200 bg-amber-50/60 p-6 pl-8",
          "dark:border-amber-900 dark:bg-amber-950/20",
        )}
      >
        <span
          aria-hidden
          className="absolute inset-y-0 left-0 w-1 bg-amber-500"
        />
        <div className="flex items-start gap-4">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300">
            <AlertCircle className="size-5" aria-hidden />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold">
              {dict.about.disclaimerTitle}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {dict.about.disclaimerBeforeContact}
              <Link
                href={`/${lang}/contatos`}
                className="font-medium text-foreground underline underline-offset-2 hover:text-primary"
              >
                {dict.about.disclaimerContactLink}
              </Link>
              {dict.about.disclaimerAfterContact}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
