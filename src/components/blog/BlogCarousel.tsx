"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PostCard } from "./PostCard";
import type { Post } from "@/lib/data/types";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { cn } from "@/lib/utils";

interface BlogCarouselProps {
  posts: Post[];
  locale: Locale;
  dict: Dictionary;
}

export function BlogCarousel({ posts, locale, dict }: BlogCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const update = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    update();
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const scrollByCards = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const gap = 24;
    const amount = card ? card.clientWidth + gap : el.clientWidth * 0.85;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  const arrowBtn =
    "flex size-10 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-soft transition-all hover:border-warm/50 hover:text-warm disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-border disabled:hover:text-foreground";

  return (
    <div className="mt-8">
      <div className="mb-4 hidden justify-end gap-2 sm:flex">
        <button
          type="button"
          aria-label={dict.slides.prev}
          onClick={() => scrollByCards(-1)}
          disabled={!canPrev}
          className={arrowBtn}
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          type="button"
          aria-label={dict.slides.next}
          onClick={() => scrollByCards(1)}
          disabled={!canNext}
          className={arrowBtn}
        >
          <ChevronRight className="size-5" />
        </button>
      </div>

      <div
        ref={scrollerRef}
        className={cn(
          "flex flex-col gap-6",
          // Carousel only from sm up; on mobile it's a stacked list.
          "sm:flex-row sm:snap-x sm:snap-mandatory sm:overflow-x-auto sm:pb-3",
          "sm:[-ms-overflow-style:none] sm:[scrollbar-width:none] sm:[&::-webkit-scrollbar]:hidden",
        )}
      >
        {posts.map((post) => (
          <div
            key={post.slug}
            data-card
            className="w-full sm:w-[46%] sm:shrink-0 sm:snap-start lg:w-[31.5%]"
          >
            <PostCard post={post} locale={locale} dict={dict} />
          </div>
        ))}
      </div>
    </div>
  );
}
