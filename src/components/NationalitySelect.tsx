"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { Check, ChevronDown, Search, X } from "lucide-react";
import type { Locale } from "@/i18n/config";
import {
  GOOGLE_FORM_NATIONALITIES,
  GOOGLE_FORM_NATIONALITY_OTHER,
} from "@/lib/welcome-config";
import { getNationalityLabel } from "@/lib/nationality-labels";
import { cn } from "@/lib/utils";

interface NationalitySelectProps {
  id?: string;
  locale: Locale;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  searchPlaceholder: string;
  closeLabel: string;
  required?: boolean;
}

export function NationalitySelect({
  id: idProp,
  locale,
  value,
  onChange,
  placeholder,
  searchPlaceholder,
  closeLabel,
  required,
}: NationalitySelectProps) {
  const autoId = useId();
  const id = idProp ?? autoId;
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const options = useMemo(() => {
    const q = query.trim().toLowerCase();
    return GOOGLE_FORM_NATIONALITIES.filter((code) => {
      const label = getNationalityLabel(locale, code).toLowerCase();
      return !q || label.includes(q) || code.toLowerCase().includes(q);
    });
  }, [locale, query]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => searchRef.current?.focus(), 50);
    return () => {
      document.body.style.overflow = prev;
      window.clearTimeout(t);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const displayLabel = value
    ? getNationalityLabel(locale, value)
    : placeholder;

  function select(next: string) {
    onChange(next);
    setOpen(false);
    setQuery("");
  }

  return (
    <>
      <button
        type="button"
        id={id}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-required={required}
        onClick={() => setOpen(true)}
        className={cn(
          "flex h-11 w-full min-w-0 items-center justify-between gap-2 rounded-xl border border-input bg-background px-3 py-2 text-left text-sm",
          "shadow-xs transition-colors outline-none",
          "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
          !value && "text-muted-foreground",
        )}
      >
        <span className="min-w-0 truncate">{displayLabel}</span>
        <ChevronDown className="size-4 shrink-0 opacity-50" aria-hidden />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-background/80 p-0 backdrop-blur-sm sm:items-center sm:p-4"
          role="presentation"
          onClick={() => setOpen(false)}
        >
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${id}-title`}
            className={cn(
              "flex max-h-[min(85dvh,32rem)] w-full max-w-lg min-w-0 flex-col overflow-hidden",
              "rounded-t-3xl border border-border bg-background shadow-soft sm:rounded-3xl",
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 border-b border-border/60 px-4 py-3">
              <p
                id={`${id}-title`}
                className="text-sm font-semibold tracking-tight"
              >
                {placeholder}
              </p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex size-9 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label={closeLabel}
              >
                <X className="size-4" aria-hidden />
              </button>
            </div>

            <div className="border-b border-border/60 px-4 py-3">
              <div className="relative">
                <Search
                  className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden
                />
                <input
                  ref={searchRef}
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={searchPlaceholder}
                  className={cn(
                    "flex h-10 w-full min-w-0 rounded-xl border border-input bg-background py-2 pr-3 pl-9 text-sm",
                    "outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
                  )}
                />
              </div>
            </div>

            <ul
              role="listbox"
              aria-labelledby={`${id}-title`}
              className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-2 py-2"
            >
              {options.length === 0 ? (
                <li className="px-3 py-6 text-center text-sm text-muted-foreground">
                  —
                </li>
              ) : (
                options.map((code) => {
                  const label = getNationalityLabel(locale, code);
                  const selected = value === code;
                  return (
                    <li key={code} role="presentation">
                      <button
                        type="button"
                        role="option"
                        aria-selected={selected}
                        onClick={() => select(code)}
                        className={cn(
                          "flex w-full min-w-0 items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-left text-sm transition-colors",
                          selected
                            ? "bg-primary/10 font-medium text-primary"
                            : "hover:bg-muted",
                        )}
                      >
                        <span className="min-w-0 truncate">{label}</span>
                        {selected && (
                          <Check className="size-4 shrink-0" aria-hidden />
                        )}
                      </button>
                    </li>
                  );
                })
              )}
              <li role="presentation" className="mt-1 border-t border-border/60 pt-1">
                <button
                  type="button"
                  role="option"
                  aria-selected={value === GOOGLE_FORM_NATIONALITY_OTHER}
                  onClick={() => select(GOOGLE_FORM_NATIONALITY_OTHER)}
                  className={cn(
                    "flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-left text-sm transition-colors",
                    value === GOOGLE_FORM_NATIONALITY_OTHER
                      ? "bg-primary/10 font-medium text-primary"
                      : "hover:bg-muted",
                  )}
                >
                  <span>{getNationalityLabel(locale, GOOGLE_FORM_NATIONALITY_OTHER)}</span>
                  {value === GOOGLE_FORM_NATIONALITY_OTHER && (
                    <Check className="size-4 shrink-0" aria-hidden />
                  )}
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
