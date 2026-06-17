"use client";

import { useState } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { CheckCircle2, Loader2, X } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries";
import {
  FEEDBACK_ENABLED,
  FEEDBACK_FORM_ACTION,
  FEEDBACK_FORM_FIELDS,
} from "@/lib/feedback-config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type FeedbackStrings = Dictionary["feedback"];
type Status = "idle" | "sending" | "success" | "error";

export function FeedbackDialog({
  strings,
  triggerClassName,
}: {
  strings: FeedbackStrings;
  triggerClassName?: string;
}) {
  const [suggestion, setSuggestion] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (suggestion.trim().length === 0) {
      setError(strings.errorRequired);
      return;
    }
    setStatus("sending");
    try {
      const body = new URLSearchParams();
      body.append(FEEDBACK_FORM_FIELDS.suggestion, suggestion.trim());
      if (name.trim()) body.append(FEEDBACK_FORM_FIELDS.name, name.trim());
      if (email.trim()) body.append(FEEDBACK_FORM_FIELDS.email, email.trim());

      await fetch(FEEDBACK_FORM_ACTION, {
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

  return (
    <Dialog.Root>
      <Dialog.Trigger
        className={cn(
          "font-medium text-foreground underline underline-offset-2 transition-colors hover:text-yellow-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500/40",
          triggerClassName,
        )}
      >
        {strings.trigger}
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-foreground/50 backdrop-blur-sm transition-opacity duration-200 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
        <Dialog.Popup
          className={cn(
            "fixed z-50 overflow-y-auto bg-card shadow-soft-lg transition-all duration-300",
            "inset-x-0 bottom-0 max-h-[88dvh] rounded-t-3xl border-t border-border px-6 pb-10 pt-5",
            "max-sm:data-[starting-style]:translate-y-full max-sm:data-[ending-style]:translate-y-full",
            "sm:inset-x-auto sm:bottom-auto sm:left-1/2 sm:top-1/2",
            "sm:max-h-[calc(100dvh-3rem)] sm:w-[calc(100vw-2rem)] sm:max-w-lg sm:-translate-x-1/2 sm:-translate-y-1/2",
            "sm:rounded-3xl sm:border sm:p-8",
            "sm:data-[starting-style]:scale-95 sm:data-[ending-style]:scale-95",
            "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
          )}
        >
          <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-border sm:hidden" />

          <Dialog.Close
            aria-label={strings.close}
            className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:right-6 sm:top-6"
          >
            <X className="size-5" />
          </Dialog.Close>

          {status === "success" ? (
            <div className="flex flex-col items-center gap-3 py-6 text-center">
              <CheckCircle2 className="size-10 text-primary" aria-hidden />
              <h3 className="text-lg font-semibold tracking-tight">
                {strings.successTitle}
              </h3>
              <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
                {strings.successText}
              </p>
            </div>
          ) : (
            <>
              <Dialog.Title className="pr-10 text-xl font-bold tracking-tight">
                {strings.title}
              </Dialog.Title>
              <Dialog.Description className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {strings.description}
              </Dialog.Description>

              {FEEDBACK_ENABLED ? (
                <form onSubmit={handleSubmit} className="mt-5 space-y-4" noValidate>
                  <div className="space-y-1.5">
                    <Label htmlFor="feedback-text">{strings.suggestion}</Label>
                    <textarea
                      id="feedback-text"
                      value={suggestion}
                      onChange={(e) => setSuggestion(e.target.value)}
                      placeholder={strings.suggestionPlaceholder}
                      rows={4}
                      className="w-full resize-y rounded-lg border border-input bg-transparent px-3 py-2 text-base outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="feedback-name">{strings.name}</Label>
                      <Input
                        id="feedback-name"
                        autoComplete="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={strings.namePlaceholder}
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="feedback-email">{strings.email}</Label>
                      <Input
                        id="feedback-email"
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={strings.emailPlaceholder}
                        className="h-11"
                      />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {strings.emailHint}
                  </p>

                  {error && (
                    <p
                      className="text-sm font-medium text-destructive"
                      role="alert"
                    >
                      {error}
                    </p>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    disabled={status === "sending"}
                    className="h-11 w-full px-5 text-base font-semibold"
                  >
                    {status === "sending" ? (
                      <>
                        <Loader2 className="size-4 animate-spin" aria-hidden />
                        {strings.sending}
                      </>
                    ) : (
                      strings.submit
                    )}
                  </Button>
                </form>
              ) : (
                <div className="mt-6 rounded-2xl bg-muted/50 p-4 text-center text-sm font-medium text-muted-foreground">
                  {strings.unavailable}
                </div>
              )}
            </>
          )}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
