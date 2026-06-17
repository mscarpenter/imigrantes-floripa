"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";

interface SlidesCarouselProps {
  slides: string[];
  prevLabel: string;
  nextLabel: string;
}

export function SlidesCarousel({
  slides,
  prevLabel,
  nextLabel,
}: SlidesCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [zoomed, setZoomed] = useState<string | null>(null);

  const total = slides.length;

  const scrollToIndex = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(index, track.children.length - 1));
    const child = track.children[clamped] as HTMLElement | undefined;
    child?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const { scrollLeft, clientWidth } = track;
      setCurrent(Math.round(scrollLeft / clientWidth));
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!zoomed) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoomed(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [zoomed]);

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth rounded-2xl border border-border/60 bg-muted/30 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((src, i) => (
          <div
            key={src}
            className="flex min-w-full snap-center items-center justify-center p-2 sm:p-4"
          >
            <button
              type="button"
              onClick={() => setZoomed(src)}
              className="group relative w-full overflow-hidden rounded-xl bg-card shadow-soft"
              aria-label={`${i + 1} / ${total}`}
            >
              <Image
                src={src}
                alt={`Slide ${i + 1}`}
                width={1600}
                height={1200}
                priority={i === 0}
                className="h-auto w-full object-contain"
                sizes="(min-width: 1024px) 960px, 100vw"
              />
              <span className="absolute right-3 bottom-3 flex items-center gap-1 rounded-full bg-foreground/70 px-2.5 py-1 text-xs font-medium text-background opacity-0 transition-opacity group-hover:opacity-100">
                <ZoomIn className="size-3.5" aria-hidden />
              </span>
            </button>
          </div>
        ))}
      </div>

      {/* Controles */}
      <div className="mt-4 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => scrollToIndex(current - 1)}
          disabled={current === 0}
          aria-label={prevLabel}
          className="flex size-10 items-center justify-center rounded-full border border-border/60 bg-card text-foreground shadow-soft transition-all hover:bg-muted active:scale-95 disabled:opacity-40"
        >
          <ChevronLeft className="size-5" aria-hidden />
        </button>

        <span className="min-w-16 text-center text-sm font-medium tabular-nums text-muted-foreground">
          {current + 1} / {total}
        </span>

        <button
          type="button"
          onClick={() => scrollToIndex(current + 1)}
          disabled={current >= total - 1}
          aria-label={nextLabel}
          className="flex size-10 items-center justify-center rounded-full border border-border/60 bg-card text-foreground shadow-soft transition-all hover:bg-muted active:scale-95 disabled:opacity-40"
        >
          <ChevronRight className="size-5" aria-hidden />
        </button>
      </div>

      {/* Dots */}
      <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5">
        {slides.map((src, i) => (
          <button
            key={`dot-${src}`}
            type="button"
            onClick={() => scrollToIndex(i)}
            aria-label={`${i + 1}`}
            className={cn(
              "h-1.5 rounded-full transition-all",
              i === current ? "w-5 bg-primary" : "w-1.5 bg-border hover:bg-muted-foreground/40",
            )}
          />
        ))}
      </div>

      {/* Zoom overlay */}
      {zoomed && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          onClick={() => setZoomed(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={() => setZoomed(null)}
            aria-label="Fechar"
            className="absolute top-4 right-4 flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <X className="size-5" aria-hidden />
          </button>
          <Image
            src={zoomed}
            alt=""
            width={2000}
            height={1500}
            className="max-h-[90vh] w-auto max-w-full rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
