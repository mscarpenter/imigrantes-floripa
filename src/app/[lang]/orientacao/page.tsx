import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getAllModules } from "@/lib/data/queries";
import { ModuleScrollGrid } from "@/components/ModuleScrollGrid";
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
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          {dict.trail.title}
        </h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          {dict.trail.subtitle}
        </p>
      </Reveal>

      <ModuleScrollGrid
        modules={modules}
        locale={lang}
        dict={dict}
        trackVisited
        gridClassName="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
      />
    </div>
  );
}
