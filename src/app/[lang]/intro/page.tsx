import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { IntroTutorial } from "@/components/onboarding/IntroTutorial";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/intro">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return { title: dict.intro.title, description: dict.intro.subtitle };
}

export default async function IntroPage({
  params,
}: PageProps<"/[lang]/intro">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <div className="relative isolate min-h-[calc(100dvh-8rem)] overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-primary/8 via-background to-background"
      />

      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 md:py-16">
        <IntroTutorial locale={lang} dict={dict} />
      </div>
    </div>
  );
}
