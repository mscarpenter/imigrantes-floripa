import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { OnboardingFlow } from "@/components/onboarding/OnboardingFlow";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.onboarding.firstTime.title,
    description: dict.onboarding.firstTime.subtitle,
  };
}

export default async function OnboardingEntryPage({
  params,
  searchParams,
}: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const sp = await searchParams;
  const showHub = sp.hub === "1";
  const isNewUser = sp.new === "1";

  return (
    <div className="relative isolate min-h-[calc(100dvh-8rem)] overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-primary/8 via-background to-background"
      />

      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 md:py-16">
        <div className="relative mx-auto mb-10 aspect-[21/9] max-w-3xl overflow-hidden rounded-3xl border border-border/50 shadow-soft">
          <Image
            src="/illustrations/floripa-hero.png"
            alt=""
            fill
            sizes="(min-width: 768px) 48rem, 100vw"
            className="object-cover"
            priority
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent"
          />
        </div>

        <OnboardingFlow
          locale={lang}
          dict={dict}
          initialStep={showHub ? "hub" : "firstTime"}
          isNewUser={isNewUser}
        />
      </div>
    </div>
  );
}
