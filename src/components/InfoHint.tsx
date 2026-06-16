"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface InfoHintProps {
  text: string;
  label: string;
  className?: string;
}

export function InfoHint({ text, label, className }: InfoHintProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: PointerEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div
      ref={ref}
      className={cn("relative shrink-0", className)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-label={label}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex size-5 items-center justify-center rounded-full transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <Image
          src="/icons/info.png"
          alt=""
          width={16}
          height={16}
          className="size-4"
        />
      </button>
      {open && (
        <div
          role="tooltip"
          className="absolute left-0 top-7 z-30 w-64 max-w-[calc(100vw-3rem)] rounded-xl border border-border bg-popover p-3 text-left text-sm font-normal leading-relaxed text-popover-foreground shadow-soft-lg"
        >
          {text}
        </div>
      )}
    </div>
  );
}
