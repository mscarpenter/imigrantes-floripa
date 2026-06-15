import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getAllModules } from "@/lib/data/queries";
import { ModuleCard } from "@/components/ModuleCard";
import { Reveal } from "@/components/motion/Reveal";

export default async function GuidancePage({
  params,
}: PageProps<"/[lang]/orientacao">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const modules = getAllModules();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
      <Reveal>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          {dict.trail.title}
        </h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          {dict.trail.subtitle}
        </p>
      </Reveal>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {modules.map((module, i) => (
          <Reveal key={module.slug} delay={Math.min(i * 60, 360)}>
            <ModuleCard module={module} locale={lang} dict={dict} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
