"use client";

import Link from "next/link";
import { Dialog } from "@base-ui/react/dialog";
import { X } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { CompassMark } from "@/components/CompassMark";
import { cn } from "@/lib/utils";

type FabStrings = Dictionary["fab"];

export function WelcomeFab({
  locale,
  strings,
}: {
  locale: Locale;
  strings: FabStrings;
}) {
  return (
    <Dialog.Root>
      <Dialog.Trigger
        aria-label={strings.label}
        className="fixed bottom-5 right-5 z-40 flex size-14 items-center justify-center rounded-full bg-warm text-warm-foreground shadow-soft-lg transition-all hover:scale-105 hover:bg-warm/90 active:scale-95 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-warm/40 sm:bottom-7 sm:right-7"
      >
        <CompassMark className="size-7" />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-foreground/50 backdrop-blur-sm transition-opacity duration-200 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
        <Dialog.Popup
          className={cn(
            "fixed z-50 bg-card shadow-soft-lg transition-all duration-300",
            "inset-x-0 bottom-0 rounded-t-3xl border-t border-border px-6 pb-8 pt-5",
            "max-sm:data-[starting-style]:translate-y-full max-sm:data-[ending-style]:translate-y-full",
            "sm:inset-x-auto sm:bottom-auto sm:left-1/2 sm:top-1/2",
            "sm:w-[calc(100vw-2rem)] sm:max-w-md sm:-translate-x-1/2 sm:-translate-y-1/2",
            "sm:rounded-3xl sm:border sm:p-8",
            "sm:data-[starting-style]:scale-95 sm:data-[ending-style]:scale-95",
            "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
          )}
        >
          <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-border sm:hidden" />

          <Dialog.Close
            aria-label={strings.dismiss}
            className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:right-5 sm:top-5"
          >
            <X className="size-5" />
          </Dialog.Close>

          <div className="flex flex-col items-center gap-4 pt-2 text-center">
            <span className="flex size-14 items-center justify-center rounded-full bg-warm/15 text-warm">
              <CompassMark className="size-8" />
            </span>
            <Dialog.Title className="text-lg font-semibold leading-snug tracking-tight text-balance">
              {strings.message}
            </Dialog.Title>

            <div className="mt-2 flex w-full flex-col gap-2 sm:flex-row-reverse">
              <Link
                href={`/${locale}`}
                className="inline-flex flex-1 items-center justify-center rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.98]"
              >
                {strings.confirm}
              </Link>
              <Dialog.Close className="inline-flex flex-1 items-center justify-center rounded-xl border border-border bg-background px-5 py-3 font-medium text-muted-foreground transition-all hover:bg-muted hover:text-foreground active:scale-[0.98]">
                {strings.dismiss}
              </Dialog.Close>
            </div>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
