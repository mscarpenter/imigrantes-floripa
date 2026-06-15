"use client";

import { useEffect, useRef, useState } from "react";
import { ModuleCard } from "@/components/ModuleCard";
import { Reveal } from "@/components/motion/Reveal";
import type { Module } from "@/lib/data/types";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

const STORAGE_KEY = "imigrantes:visited-modules";

interface ModuleScrollGridProps {
  modules: Module[];
  locale: Locale;
  dict: Dictionary;
  /** Tailwind classes for the grid wrapper. */
  gridClassName: string;
  /** When true, cards follow the theme tokens (home grid). */
  plain?: boolean;
  /** When true, read/show visited state from localStorage. */
  trackVisited?: boolean;
}

export function ModuleScrollGrid({
  modules,
  locale,
  dict,
  gridClassName,
  plain = false,
  trackVisited = false,
}: ModuleScrollGridProps) {
  const [visited, setVisited] = useState<Set<string>>(new Set());
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const itemRefs = useRef<Map<string, HTMLElement>>(new Map());

  useEffect(() => {
    if (!trackVisited) return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setVisited(new Set(JSON.parse(raw) as string[]));
    } catch {}
  }, [trackVisited]);

  // Scroll-driven highlight: the card closest to the viewport center becomes
  // "active". Only on single-column layouts (mobile), where it reads clearly.
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    let raf = 0;

    const compute = () => {
      raf = 0;
      if (!mq.matches) {
        setActiveSlug((prev) => (prev === null ? prev : null));
        return;
      }
      const centerY = window.innerHeight / 2;
      let best: string | null = null;
      let bestDist = Infinity;
      itemRefs.current.forEach((el, slug) => {
        const r = el.getBoundingClientRect();
        const c = r.top + r.height / 2;
        const d = Math.abs(c - centerY);
        if (d < bestDist) {
          bestDist = d;
          best = slug;
        }
      });
      setActiveSlug(best);
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    mq.addEventListener("change", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      mq.removeEventListener("change", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [modules]);

  return (
    <div className={gridClassName}>
      {modules.map((module, i) => (
        <Reveal key={module.slug} delay={Math.min(i * 60, 360)}>
          <div
            ref={(el) => {
              if (el) itemRefs.current.set(module.slug, el);
              else itemRefs.current.delete(module.slug);
            }}
          >
            <ModuleCard
              module={module}
              locale={locale}
              dict={dict}
              plain={plain}
              visited={trackVisited && visited.has(module.slug)}
              active={activeSlug === module.slug}
            />
          </div>
        </Reveal>
      ))}
    </div>
  );
}
