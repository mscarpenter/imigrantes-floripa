"use client";

import Image from "next/image";
import { Dialog } from "@base-ui/react/dialog";
import { Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";

const UNICESUSC_URL = "https://unicesusc.edu.br/";
const CIRCULOS_URL = "https://circulosdehospitalidade.org/";

interface AboutMoreDialogProps {
  label: string;
  title: string;
  paragraphs: string[];
}

export function AboutMoreDialog({
  label,
  title,
  paragraphs,
}: AboutMoreDialogProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="group inline-flex items-center gap-1.5 rounded-full text-sm font-semibold text-primary transition-colors hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40">
        <Plus className="size-4 transition-transform group-hover:rotate-90" />
        {label}
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-foreground/50 backdrop-blur-sm transition-opacity duration-200 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
        <Dialog.Popup
          className={cn(
            "fixed z-50 overflow-y-auto bg-card shadow-soft-lg transition-all duration-300",
            // Mobile: bottom sheet
            "inset-x-0 bottom-0 max-h-[88dvh] rounded-t-3xl border-t border-border px-6 pb-10 pt-5",
            "max-sm:data-[starting-style]:translate-y-full max-sm:data-[ending-style]:translate-y-full",
            // Desktop: large centered modal
            "sm:inset-x-auto sm:bottom-auto sm:left-1/2 sm:top-1/2",
            "sm:max-h-[calc(100dvh-3rem)] sm:w-[calc(100vw-2rem)] sm:max-w-2xl sm:-translate-x-1/2 sm:-translate-y-1/2",
            "sm:rounded-3xl sm:border sm:p-10",
            "sm:data-[starting-style]:scale-95 sm:data-[ending-style]:scale-95",
            "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
          )}
        >
          <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-border sm:hidden" />

          <Dialog.Close className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:right-6 sm:top-6">
            <X className="size-5" />
          </Dialog.Close>

          <Dialog.Title className="pr-10 font-roboto text-2xl font-bold tracking-tight text-warm sm:text-3xl">
            {title}
          </Dialog.Title>

          <div className="mt-5 space-y-4 text-base leading-relaxed text-muted-foreground">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-5 border-t border-border/60 pt-6">
            <a
              href={UNICESUSC_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="UNICESUSC"
              className="transition-opacity hover:opacity-70"
            >
              <Image
                src="/logos/unicesusc-logo.png"
                alt="UNICESUSC"
                width={180}
                height={180}
                className="h-12 w-auto object-contain"
              />
            </a>
            <a
              href={CIRCULOS_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="Círculos de Hospitalidade"
              className="transition-opacity hover:opacity-70"
            >
              <Image
                src="/logos/circulos-da-hospitalidade-logo.png"
                alt="Círculos de Hospitalidade"
                width={200}
                height={110}
                className="h-10 w-auto object-contain"
              />
            </a>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
