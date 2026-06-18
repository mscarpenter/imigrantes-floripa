"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import {
  GOOGLE_FORM_ACTION,
  GOOGLE_FORM_CONSENT_VALUE,
  GOOGLE_FORM_FIELDS,
  GOOGLE_FORM_LANGUAGE_OPTIONS,
  GOOGLE_FORM_NATIONALITY_OTHER,
  GOOGLE_FORM_OTHER_OPTION_VALUE,
  GOOGLE_FORM_URL,
} from "@/lib/welcome-config";
import { NationalitySelect } from "@/components/NationalitySelect";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type FormStrings = Dictionary["welcome"]["form"];

type Status = "idle" | "sending" | "success" | "error";

const OTHER = "__other__";

export function WelcomeForm({
  strings,
  locale,
  continueHref,
}: {
  strings: FormStrings;
  locale: Locale;
  /** After submit — intro tutorial or hub. */
  continueHref?: string;
}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [language, setLanguage] = useState("");
  const [otherLang, setOtherLang] = useState("");
  const [nationality, setNationality] = useState("");
  const [otherNationality, setOtherNationality] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (
      firstName.trim().length === 0 ||
      lastName.trim().length === 0 ||
      phone.trim().length === 0
    ) {
      setError(strings.errorRequired);
      return;
    }
    if (!language || (language === OTHER && !otherLang.trim())) {
      setError(strings.errorLanguage);
      return;
    }
    if (
      !nationality ||
      (nationality === GOOGLE_FORM_NATIONALITY_OTHER &&
        !otherNationality.trim())
    ) {
      setError(strings.errorNationality);
      return;
    }
    if (!consent) {
      setError(strings.errorConsent);
      return;
    }

    setStatus("sending");
    try {
      const body = new URLSearchParams();
      body.append(GOOGLE_FORM_FIELDS.firstName, firstName.trim());
      body.append(GOOGLE_FORM_FIELDS.lastName, lastName.trim());
      if (email.trim()) body.append(GOOGLE_FORM_FIELDS.email, email.trim());
      body.append(GOOGLE_FORM_FIELDS.phone, phone.trim());
      body.append(GOOGLE_FORM_FIELDS.consent, GOOGLE_FORM_CONSENT_VALUE);

      if (language === OTHER) {
        body.append(
          GOOGLE_FORM_FIELDS.language,
          GOOGLE_FORM_OTHER_OPTION_VALUE,
        );
        body.append(
          `${GOOGLE_FORM_FIELDS.language}.other_option_response`,
          otherLang.trim(),
        );
      } else {
        body.append(GOOGLE_FORM_FIELDS.language, language);
      }

      const nationalityValue =
        nationality === GOOGLE_FORM_NATIONALITY_OTHER
          ? otherNationality.trim()
          : nationality;
      if (nationality === GOOGLE_FORM_NATIONALITY_OTHER) {
        body.append(GOOGLE_FORM_FIELDS.nationality, GOOGLE_FORM_NATIONALITY_OTHER);
        body.append(
          `${GOOGLE_FORM_FIELDS.nationality}.other_option_response`,
          nationalityValue,
        );
      } else {
        body.append(GOOGLE_FORM_FIELDS.nationality, nationalityValue);
      }

      await fetch(GOOGLE_FORM_ACTION, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });

      setStatus("success");
    } catch {
      setStatus("error");
      setError(strings.errorSend);
    }
  }

  if (status === "success") {
    return (
      <div className="mt-5 flex flex-col items-center gap-4 rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center">
        <CheckCircle2 className="size-10 text-primary" aria-hidden />
        <div>
          <h3 className="text-lg font-semibold tracking-tight">
            {strings.successTitle}
          </h3>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
            {strings.successText}
          </p>
        </div>
        {continueHref && (
          <Link
            href={continueHref}
            className="inline-flex h-11 items-center gap-2 rounded-full bg-warm px-6 text-sm font-semibold text-warm-foreground hover:bg-warm/90"
          >
            {strings.continue}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-5 space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="welcome-first-name">{strings.firstName}</Label>
          <Input
            id="welcome-first-name"
            name="firstName"
            autoComplete="given-name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder={strings.firstNamePlaceholder}
            className="h-11"
            required
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="welcome-last-name">{strings.lastName}</Label>
          <Input
            id="welcome-last-name"
            name="lastName"
            autoComplete="family-name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder={strings.lastNamePlaceholder}
            className="h-11"
            required
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="welcome-email">{strings.email}</Label>
          <Input
            id="welcome-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={strings.emailPlaceholder}
            className="h-11"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="welcome-phone">{strings.phone}</Label>
          <Input
            id="welcome-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={strings.phonePlaceholder}
            className="h-11"
            required
          />
        </div>
      </div>
      <p className="text-xs text-muted-foreground">{strings.contactHint}</p>

      <div className="space-y-1.5 min-w-0">
        <Label htmlFor="welcome-nationality">{strings.nationality}</Label>
        <NationalitySelect
          id="welcome-nationality"
          locale={locale}
          value={nationality}
          onChange={setNationality}
          placeholder={strings.nationalityPlaceholder}
          searchPlaceholder={strings.nationalitySearch}
          closeLabel={strings.nationalityClose}
          required
        />
        {nationality === GOOGLE_FORM_NATIONALITY_OTHER && (
          <Input
            value={otherNationality}
            onChange={(e) => setOtherNationality(e.target.value)}
            placeholder={strings.nationalityOtherPlaceholder}
            className="h-11"
            autoFocus
          />
        )}
      </div>

      <div className="space-y-2">
        <Label>{strings.language}</Label>
        <div className="flex flex-wrap gap-2">
          {GOOGLE_FORM_LANGUAGE_OPTIONS.map((value) => {
            const active = language === value;
            return (
              <button
                key={value}
                type="button"
                onClick={() => setLanguage(active ? "" : value)}
                aria-pressed={active}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all active:scale-95",
                  active
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {strings.languageOptions[value]}
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => setLanguage(language === OTHER ? "" : OTHER)}
            aria-pressed={language === OTHER}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all active:scale-95",
              language === OTHER
                ? "border-primary bg-primary/10 text-primary"
                : "border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            {strings.languageOther}
          </button>
        </div>
        {language === OTHER && (
          <Input
            value={otherLang}
            onChange={(e) => setOtherLang(e.target.value)}
            placeholder={strings.languageOtherPlaceholder}
            className="h-11"
            autoFocus
          />
        )}
      </div>

      <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-border/60 bg-muted/30 p-3.5 text-sm leading-relaxed">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 size-4 shrink-0 accent-primary"
        />
        <span>{strings.consentLabel}</span>
      </label>

      {error && (
        <p className="text-sm font-medium text-destructive" role="alert">
          {error}
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={status === "sending"}
        className="h-11 w-full px-5 text-base font-semibold sm:w-auto"
      >
        {status === "sending" ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden />
            {strings.sending}
          </>
        ) : (
          <>
            {strings.submit}
            <ArrowRight className="size-4" aria-hidden />
          </>
        )}
      </Button>

      <p className="text-center text-xs text-muted-foreground sm:text-left">
        <a
          href={GOOGLE_FORM_URL}
          target="_blank"
          rel="noreferrer"
          className="underline-offset-4 hover:text-foreground hover:underline"
        >
          {strings.cta}
        </a>
      </p>
    </form>
  );
}
