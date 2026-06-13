import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronDown, HelpCircle, ArrowRight } from "lucide-react";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/motion/Reveal";

export default async function FaqPage({ params }: PageProps<"/[lang]/faq">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:py-14">
      <Reveal>
        <div className="flex items-center gap-3">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <HelpCircle className="size-5" aria-hidden />
          </span>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            {dict.faq.title}
          </h1>
        </div>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          {dict.faq.subtitle}
        </p>
      </Reveal>

      <div className="mt-8 flex flex-col gap-3">
        {dict.faq.items.map((item, i) => (
          <Reveal key={item.q} delay={Math.min(i * 50, 300)}>
            <details className="group rounded-xl border bg-card transition-colors hover:border-primary/40">
              <summary className="flex cursor-pointer items-center justify-between gap-4 p-5 font-medium [&::-webkit-details-marker]:hidden">
                <span>{item.q}</span>
                <ChevronDown
                  className="size-5 shrink-0 text-muted-foreground transition-transform duration-300 group-open:rotate-180"
                  aria-hidden
                />
              </summary>
              <div className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">
                {item.a}
              </div>
            </details>
          </Reveal>
        ))}
      </div>

      <Reveal delay={120}>
        <Card className="mt-10 flex flex-col items-start gap-4 bg-muted/40 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold">
              {dict.faq.stillNeedHelpTitle}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {dict.faq.stillNeedHelpBody}
            </p>
          </div>
          <Link
            href={`/${lang}/contatos`}
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {dict.faq.stillNeedHelpCta}
            <ArrowRight className="size-4" />
          </Link>
        </Card>
      </Reveal>
    </div>
  );
}
