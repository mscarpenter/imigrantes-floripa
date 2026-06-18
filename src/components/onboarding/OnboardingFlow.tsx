"use client";

import { useRouter } from "next/navigation";
import { BookOpen, Compass } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { WelcomeOptionCard } from "@/components/welcome/WelcomeOptionCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Step = "firstTime" | "hub";

interface OnboardingFlowProps {
  locale: Locale;
  dict: Dictionary;
  initialStep?: Step;
  /** After cadastro + intro — copy for new users. */
  isNewUser?: boolean;
}

export function OnboardingFlow({
  locale,
  dict,
  initialStep = "firstTime",
  isNewUser = false,
}: OnboardingFlowProps) {
  const router = useRouter();
  const t = dict.onboarding;

  const portalHref = `/${locale}/portal`;
  const guideHref = `/${locale}/apresentacao`;
  const cadastroHref = `/${locale}/cadastro`;

  if (initialStep === "firstTime") {
    const entry = t.entry;
    const ft = t.firstTime;
    return (
      <div className="mx-auto w-full max-w-lg">
        <div className="text-center">
          <span className="text-sm font-semibold tracking-wide text-primary uppercase">
            {entry.eyebrow}
          </span>
          <h1 className="mt-5 text-3xl font-bold tracking-tight text-balance md:text-4xl">
            {entry.title}
          </h1>
          <p className="mt-1 text-sm font-medium text-primary">
            {t.hub.brandSubtitle}
          </p>
          <p className="mx-auto mt-3 max-w-md text-pretty leading-relaxed text-muted-foreground">
            {entry.subtitle}
          </p>
        </div>

        <div className="mt-10 rounded-3xl border border-border/60 bg-card/60 p-6 shadow-soft">
          <div className="text-center">
            <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              {ft.eyebrow}
            </span>
            <h2 className="mt-2 text-lg font-semibold tracking-tight text-balance">
              {ft.title}
            </h2>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {ft.subtitle}
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button
              type="button"
              size="lg"
              className="h-12 rounded-full bg-warm px-8 text-base font-semibold text-warm-foreground hover:bg-warm/90"
              onClick={() => router.push(cadastroHref)}
            >
              {ft.yes}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="h-12 rounded-full px-8 text-base font-semibold"
              onClick={() => router.push(`/${locale}?hub=1`)}
            >
              {ft.no}
            </Button>
          </div>

          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => router.push(portalHref)}
              className="text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              {ft.skip}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const hub = t.hub;
  const hubTitle = isNewUser ? hub.newUserTitle : hub.returningTitle;
  const hubSubtitle = isNewUser ? hub.newUserSubtitle : hub.returningSubtitle;

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="text-center">
        {isNewUser ? (
          <>
            <h1 className="text-3xl font-bold tracking-tight text-balance md:text-4xl">
              {hubTitle}
            </h1>
            <span className="mt-4 inline-block text-sm font-semibold tracking-wide text-primary uppercase">
              {hub.eyebrow}
            </span>
            <p className="mx-auto mt-3 max-w-md text-pretty leading-relaxed text-muted-foreground">
              {hubSubtitle}
            </p>
          </>
        ) : (
          <>
            <span className="text-sm font-semibold tracking-wide text-primary uppercase">
              {hub.eyebrow}
            </span>
            <h1 className="mt-5 text-3xl font-bold tracking-tight text-balance md:text-4xl">
              {hubTitle}
            </h1>
            <p className="mt-1 text-sm font-medium text-primary">
              {hub.brandSubtitle}
            </p>
            <p className="mx-auto mt-3 max-w-md text-pretty leading-relaxed text-muted-foreground">
              {hubSubtitle}
            </p>
          </>
        )}
      </div>

      <div className={cn("mt-10 grid gap-4", "sm:grid-cols-2")}>
        <WelcomeOptionCard
          href={guideHref}
          icon={<BookOpen className="size-5" aria-hidden />}
          title={t.guide.title}
          description={t.guide.description}
        />
        <WelcomeOptionCard
          href={portalHref}
          icon={<Compass className="size-5" aria-hidden />}
          title={t.portal.title}
          description={t.portal.description}
        />
      </div>
    </div>
  );
}
