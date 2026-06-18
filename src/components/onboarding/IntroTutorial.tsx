"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Compass,
  Languages,
  LayoutGrid,
  Route,
} from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const STEP_KEYS = ["menu", "nav", "language", "trail"] as const;
type StepKey = (typeof STEP_KEYS)[number];

const STEP_ICONS: Record<StepKey, React.ReactNode> = {
  menu: <Compass className="size-6" aria-hidden />,
  nav: <LayoutGrid className="size-6" aria-hidden />,
  language: <Languages className="size-6" aria-hidden />,
  trail: <Route className="size-6" aria-hidden />,
};

interface IntroTutorialProps {
  locale: Locale;
  dict: Dictionary;
}

export function IntroTutorial({ locale, dict }: IntroTutorialProps) {
  const router = useRouter();
  const t = dict.intro;
  const [step, setStep] = useState(0);

  const total = STEP_KEYS.length;
  const key = STEP_KEYS[step];
  const content = t.steps[key];
  const isLast = step === total - 1;

  const hubHref = `/${locale}?hub=1&new=1`;

  function goToHub() {
    router.push(hubHref);
  }

  function handleNext() {
    if (isLast) goToHub();
    else setStep((s) => s + 1);
  }

  const stepLabel = t.stepLabel
    .replace("{current}", String(step + 1))
    .replace("{total}", String(total));

  return (
    <div className="mx-auto w-full max-w-lg">
      <div className="text-center">
        <h1 className="mt-5 text-3xl font-bold tracking-tight text-balance md:text-4xl">
          {t.title}
        </h1>
        <p className="mx-auto mt-3 max-w-md text-pretty leading-relaxed text-muted-foreground">
          {t.subtitle}
        </p>
      </div>

      <Card className="mt-10 gap-0 rounded-3xl border-border/60 p-6 shadow-soft ring-0 sm:p-8">
        <p className="text-center text-xs font-medium tracking-wide text-muted-foreground uppercase">
          {stepLabel}
        </p>

        <div className="mt-6 flex flex-col items-center text-center">
          <span className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            {STEP_ICONS[key]}
          </span>
          <h2 className="mt-4 text-xl font-semibold tracking-tight">
            {content.title}
          </h2>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
            {content.body}
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-1.5">
          {STEP_KEYS.map((_, i) => (
            <span
              key={STEP_KEYS[i]}
              aria-hidden
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === step ? "w-5 bg-primary" : "w-1.5 bg-border",
              )}
            />
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button
            type="button"
            variant="ghost"
            size="lg"
            className="h-11 rounded-full px-6 text-sm font-semibold"
            onClick={goToHub}
          >
            {t.skip}
          </Button>
          <Button
            type="button"
            size="lg"
            className="h-11 rounded-full bg-warm px-8 text-sm font-semibold text-warm-foreground hover:bg-warm/90"
            onClick={handleNext}
          >
            {isLast ? t.finish : t.next}
            <ArrowRight className="size-4" aria-hidden />
          </Button>
        </div>
      </Card>
    </div>
  );
}
