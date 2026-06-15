"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Compass,
} from "lucide-react";
import { Icon } from "@/components/Icon";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface CarouselCard {
  id: string;
  icon: string;
  /** Banner illustration path in /public. */
  image?: string;
  tag: string;
  title: string;
  intro: string;
  ctaLabel: string;
  href: string;
}

export interface CarouselIntro {
  eyebrow: string;
  title: string;
  subtitle: string;
  /** Accessible label for the welcome slide's dot. */
  label: string;
}

interface TrilhaCarouselProps {
  /** Welcome slide rendered as the first full-width banner. */
  intro?: CarouselIntro;
  cards: CarouselCard[];
  /** Bottom primary action (start the guided trail). */
  trailLabel: string;
  trailHref: string;
  prevLabel: string;
  nextLabel: string;
}

interface Slide {
  key: string;
  icon: string;
  image?: string;
  eyebrow: string;
  title: string;
  body: string;
  href?: string;
  cta?: string;
  label: string;
}

export function TrilhaCarousel({
  intro,
  cards,
  trailLabel,
  trailHref,
  prevLabel,
  nextLabel,
}: TrilhaCarouselProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [paused, setPaused] = useState(false);

  const slides: Slide[] = [
    ...(intro
      ? [
          {
            key: "intro",
            icon: "Compass",
            eyebrow: intro.eyebrow,
            title: intro.title,
            body: intro.subtitle,
            label: intro.label,
          } satisfies Slide,
        ]
      : []),
    ...cards.map(
      (c): Slide => ({
        key: c.id,
        icon: c.icon,
        image: c.image,
        eyebrow: c.tag,
        title: c.title,
        body: c.intro,
        href: c.href,
        cta: c.ctaLabel,
        label: c.tag,
      }),
    ),
  ];
  const slideCount = slides.length;

  const syncState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const items = Array.from(track.children) as HTMLElement[];
    if (items.length === 0) return;
    const base = items[0].offsetLeft;
    const scrollLeft = track.scrollLeft;

    let best = 0;
    let bestDist = Infinity;
    items.forEach((item, i) => {
      const dist = Math.abs(item.offsetLeft - base - scrollLeft);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });
    setActive(best);
    setAtStart(scrollLeft <= 2);
    setAtEnd(scrollLeft + track.clientWidth >= track.scrollWidth - 2);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(syncState);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    syncState();
    window.addEventListener("resize", syncState);
    return () => {
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", syncState);
      cancelAnimationFrame(frame);
    };
  }, [syncState]);

  const scrollToIndex = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const items = Array.from(track.children) as HTMLElement[];
    if (items.length === 0) return;
    const wrapped = ((index % items.length) + items.length) % items.length;
    const target = items[wrapped];
    if (!target) return;
    track.scrollTo({
      left: target.offsetLeft - items[0].offsetLeft,
      behavior: "smooth",
    });
  }, []);

  // Autoplay suave — pausa em hover/foco, aba oculta e reduced-motion.
  useEffect(() => {
    if (paused || slideCount <= 1) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const id = window.setInterval(() => {
      scrollToIndex(active + 1);
    }, 6500);
    return () => window.clearInterval(id);
  }, [active, paused, slideCount, scrollToIndex]);

  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () =>
      document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div className="relative">
        {/* Setas laterais — chevrons nas bordas (estilo UNICESUSC) */}
        <button
          type="button"
          onClick={() => scrollToIndex(active - 1)}
          disabled={atStart}
          aria-label={prevLabel}
          className="absolute left-1 top-1/2 z-10 flex -translate-y-1/2 items-center justify-center p-2 text-foreground/40 transition hover:text-foreground disabled:pointer-events-none disabled:opacity-0 sm:left-3 md:left-5"
        >
          <ChevronLeft className="size-8 md:size-10" strokeWidth={2.5} />
        </button>
        <button
          type="button"
          onClick={() => scrollToIndex(active + 1)}
          disabled={atEnd}
          aria-label={nextLabel}
          className="absolute right-1 top-1/2 z-10 flex -translate-y-1/2 items-center justify-center p-2 text-foreground/40 transition hover:text-foreground disabled:pointer-events-none disabled:opacity-0 sm:right-3 md:right-5"
        >
          <ChevronRight className="size-8 md:size-10" strokeWidth={2.5} />
        </button>

        <ul
          ref={trackRef}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {slides.map((slide, i) => {
            const isActive = active === i;
            return (
              <li key={slide.key} className="w-full shrink-0 snap-start">
                <div className="group/slide relative flex min-h-[300px] items-center overflow-hidden border-y bg-background text-foreground md:min-h-[380px]">
                  {/* decorativos com movimento sutil */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                  >
                    <div className="animate-float-slow absolute -right-24 -top-28 size-80 rounded-full bg-primary/5" />
                    <div className="animate-drift absolute -bottom-32 left-1/4 size-96 rounded-full bg-primary/[0.04]" />
                    {/* slide de boas-vindas (sem imagem) mantém o ícone gigante */}
                    {!slide.image && (
                      <Icon
                        name={slide.icon}
                        className={cn(
                          "absolute right-4 top-1/2 size-72 -translate-y-1/2 text-primary/[0.07] transition-transform duration-700 ease-out md:right-24",
                          isActive ? "scale-100" : "scale-90",
                        )}
                      />
                    )}
                  </div>

                  <div className="relative mx-auto grid w-full max-w-7xl items-center gap-8 px-12 py-12 sm:px-14 md:grid-cols-2 md:gap-12 md:px-20 lg:px-8">
                    <div
                      className="max-w-2xl transition-all duration-700 ease-out"
                      style={{
                        opacity: isActive ? 1 : 0.35,
                        transform: isActive
                          ? "translate3d(0,0,0)"
                          : "translate3d(0,14px,0)",
                      }}
                    >
                      <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary">
                        <Compass className="size-3.5" />
                        {slide.eyebrow}
                      </span>
                      <h2 className="mt-4 text-3xl font-bold leading-[1.1] tracking-tight text-foreground md:text-4xl lg:text-5xl">
                        {slide.title}
                      </h2>
                      <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                        {slide.body}
                      </p>
                      {slide.href && slide.cta && (
                        <Link
                          href={slide.href}
                          tabIndex={isActive ? 0 : -1}
                          className="group/cta mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md"
                        >
                          {slide.cta}
                          <ArrowRight className="size-4 transition-transform group-hover/cta:translate-x-1" />
                        </Link>
                      )}
                    </div>

                    {slide.image && (
                      <div
                        className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl border bg-muted/40 shadow-sm transition-all duration-700 ease-out"
                        style={{
                          opacity: isActive ? 1 : 0.35,
                          transform: isActive
                            ? "translate3d(0,0,0)"
                            : "translate3d(0,14px,0)",
                        }}
                      >
                        <Image
                          src={slide.image}
                          alt=""
                          fill
                          sizes="(min-width: 768px) 40vw, 100vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover/slide:scale-[1.03]"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-2">
        {slides.map((slide, i) => (
          <button
            key={slide.key}
            type="button"
            onClick={() => scrollToIndex(i)}
            aria-label={slide.label}
            aria-current={active === i}
            className={cn(
              "h-2 rounded-full transition-all",
              active === i
                ? "w-6 bg-primary"
                : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50",
            )}
          />
        ))}
      </div>

      {/* CTA principal */}
      <div className="flex justify-center pt-2">
        <Link
          href={trailHref}
          className={cn(
            buttonVariants({ size: "lg" }),
            "h-12 rounded-full px-8 text-base shadow-soft hover:bg-primary/90 hover:shadow-soft-lg",
          )}
        >
          <BookOpen className="size-5" />
          {trailLabel}
          <ArrowRight className="size-5" />
        </Link>
      </div>
    </div>
  );
}
