"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Dialog } from "@base-ui/react/dialog";
import {
  BookOpen,
  ChevronRight,
  Clock,
  Newspaper,
  User,
  X,
} from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { Badge } from "@/components/ui/badge";
import { CompassMark } from "@/components/CompassMark";
import { cn } from "@/lib/utils";

type MenuStrings = Dictionary["portalMenu"];

const menuLinkClass =
  "group flex items-center gap-3 rounded-2xl border border-border/60 bg-background px-4 py-3.5 transition-all hover:border-warm/40 hover:bg-warm/[0.04]";

interface PortalMenuFabProps {
  locale: Locale;
  strings: MenuStrings;
}

export function PortalMenuFab({ locale, strings }: PortalMenuFabProps) {
  const [open, setOpen] = useState(false);
  const newsRef = useRef<HTMLAnchorElement>(null);
  const newsHref = `/${locale}/novidades`;
  const guidesHref = `/${locale}/guias`;
  const profileHref = `/${locale}/cadastro`;

  useEffect(() => {
    if (open) {
      const id = requestAnimationFrame(() => newsRef.current?.focus());
      return () => cancelAnimationFrame(id);
    }
  }, [open]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <div className="pointer-events-none fixed bottom-5 right-5 z-40 sm:bottom-7 sm:right-7">
        <div className="pointer-events-auto relative">
          {!open && (
            <span
              aria-hidden
              className={cn(
                "animate-fab-hint-rise absolute bottom-full left-1/2 mb-2 -translate-x-1/2",
                "whitespace-nowrap rounded-full bg-warm px-3 py-1 text-xs font-semibold text-warm-foreground shadow-soft",
              )}
            >
              {strings.newsAlert}
            </span>
          )}

          <Dialog.Trigger
            aria-label={strings.label}
            className={cn(
              "flex size-14 items-center justify-center rounded-full bg-warm text-warm-foreground shadow-soft-lg transition-all",
              "hover:scale-105 hover:bg-warm/90 active:scale-95",
              "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-warm/40",
              !open && "animate-fab-pulse",
            )}
          >
            <CompassMark spinOnScroll={!open} className="size-7" />
          </Dialog.Trigger>
        </div>
      </div>

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
            aria-label={strings.close}
            className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:right-5 sm:top-5"
          >
            <X className="size-5" />
          </Dialog.Close>

          <div className="pt-2">
            <Dialog.Title className="text-lg font-semibold tracking-tight">
              {strings.title}
            </Dialog.Title>

            <ul className="mt-5 space-y-2">
              <li>
                <Link
                  ref={newsRef}
                  href={newsHref}
                  className={cn(
                    menuLinkClass,
                    open &&
                      "-translate-y-0.5 border-warm/70 bg-warm/[0.08] shadow-soft-lg ring-2 ring-warm/50",
                  )}
                >
                  <span
                    className={cn(
                      "flex size-10 shrink-0 items-center justify-center rounded-xl transition-colors",
                      open
                        ? "bg-warm/15 text-warm"
                        : "bg-primary/10 text-primary",
                    )}
                  >
                    <Newspaper className="size-5" aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1 text-left">
                    <span className="block font-medium">{strings.news}</span>
                    {open && (
                      <span className="mt-0.5 block text-xs font-semibold text-warm">
                        {strings.newsAlert}
                      </span>
                    )}
                  </span>
                  <ChevronRight
                    className={cn(
                      "size-5 shrink-0 transition-transform group-hover:translate-x-0.5",
                      open
                        ? "translate-x-0.5 text-warm"
                        : "text-muted-foreground/50 group-hover:text-warm",
                    )}
                    aria-hidden
                  />
                </Link>
              </li>

              <li>
                <Link href={guidesHref} className={menuLinkClass}>
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <BookOpen className="size-5" aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1 text-left font-medium">
                    {strings.guides}
                  </span>
                  <ChevronRight
                    className="size-5 shrink-0 text-muted-foreground/50 transition-transform group-hover:translate-x-0.5 group-hover:text-warm"
                    aria-hidden
                  />
                </Link>
              </li>

              <li>
                <div
                  aria-disabled="true"
                  className="flex items-center gap-3 rounded-2xl border border-border/40 bg-muted/30 px-4 py-3.5 opacity-70"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                    <Clock className="size-5" aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1 text-left font-medium text-muted-foreground">
                    {strings.history}
                  </span>
                  <Badge variant="secondary" className="shrink-0 rounded-full">
                    {strings.soonBadge}
                  </Badge>
                </div>
              </li>

              <li>
                <Link href={profileHref} className={menuLinkClass}>
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <User className="size-5" aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1 text-left font-medium">
                    {strings.profile}
                  </span>
                  <ChevronRight
                    className="size-5 shrink-0 text-muted-foreground/50 transition-transform group-hover:translate-x-0.5 group-hover:text-warm"
                    aria-hidden
                  />
                </Link>
              </li>
            </ul>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
