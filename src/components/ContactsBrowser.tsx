"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { ContactRow } from "./ContactRow";
import { Icon } from "./Icon";
import type { Contact, Category } from "@/lib/data/types";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { resolveTranslation } from "@/i18n/resolve-translation";
import { cn } from "@/lib/utils";

interface ContactsBrowserProps {
  contacts: Contact[];
  categories: Category[];
  locale: Locale;
  dict: Dictionary;
}

export function ContactsBrowser({
  contacts,
  categories,
  locale,
  dict,
}: ContactsBrowserProps) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [openedId, setOpenedId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const itemRefs = useRef<Map<string, HTMLElement>>(new Map());

  // Highlights: the scroll-focused row always glows (mobile only). The
  // last-opened contact stays highlighted on desktop, but NOT on mobile.
  const isHighlighted = (id: string) =>
    id === activeId || (!isMobile && id === openedId);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return contacts.filter((contact) => {
      if (activeCategory && contact.categorySlug !== activeCategory) {
        return false;
      }
      if (!q) return true;
      const t = resolveTranslation(contact.translations, locale).value;
      return (
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q)
      );
    });
  }, [contacts, query, activeCategory, locale]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Scroll-driven highlight: the row closest to the viewport center gets a warm
  // (terracota) border. Only on the single-column mobile layout.
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    let raf = 0;

    const compute = () => {
      raf = 0;
      if (!mq.matches) {
        setActiveId((prev) => (prev === null ? prev : null));
        return;
      }
      const centerY = window.innerHeight / 2;
      let best: string | null = null;
      let bestDist = Infinity;
      itemRefs.current.forEach((el, id) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight) return;
        const c = r.top + r.height / 2;
        const d = Math.abs(c - centerY);
        if (d < bestDist) {
          bestDist = d;
          best = id;
        }
      });
      setActiveId(best);
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
  }, [filtered]);

  return (
    <div>
      <Input
        placeholder={dict.contacts.searchPlaceholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="max-w-md"
      />

      <div className="relative mt-4">
        <div className="flex flex-nowrap gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <button
            type="button"
            onClick={() => setActiveCategory(null)}
            className={cn(
              "shrink-0 rounded-full border px-3 py-1 text-sm transition-colors",
              activeCategory === null
                ? "border-primary bg-primary text-primary-foreground hover:bg-primary/90"
                : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground",
            )}
          >
            {dict.contacts.filterAll}
          </button>
          {categories.map((category) => {
            const isActive = activeCategory === category.slug;
            return (
              <button
                key={category.slug}
                type="button"
                onClick={() => setActiveCategory(category.slug)}
                className={cn(
                  "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1 text-sm transition-colors",
                  isActive
                    ? "border-warm bg-warm text-warm-foreground hover:bg-warm/90"
                    : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground",
                )}
              >
                <Icon name={category.icon} className="size-3.5" />
                {resolveTranslation(category.translations, locale).value.name}
              </button>
            );
          })}
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-background to-transparent"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="mt-12 text-center text-muted-foreground">
          {dict.contacts.noResults}
        </p>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {filtered.map((contact) => (
            <div
              key={contact.id}
              ref={(el) => {
                if (el) itemRefs.current.set(contact.id, el);
                else itemRefs.current.delete(contact.id);
              }}
            >
              <ContactRow
                contact={contact}
                locale={locale}
                dict={dict}
                active={isHighlighted(contact.id)}
                onOpen={() => setOpenedId(contact.id)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
