"use client";

import { useEffect, useState } from "react";
import { List } from "lucide-react";
import type { Heading } from "@/lib/markdown/toc";
import { cn } from "@/lib/utils";

interface TableOfContentsProps {
  headings: Heading[];
  /** Label for the "on this page" title (localized). */
  label: string;
  /** "desktop" = sticky aside; "mobile" = collapsible block. */
  variant: "desktop" | "mobile";
}

function useActiveHeading(headings: Heading[]) {
  const [activeId, setActiveId] = useState<string>(headings[0]?.id ?? "");

  useEffect(() => {
    if (headings.length === 0) return;
    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el != null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-96px 0px -65% 0px", threshold: [0, 1] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  return activeId;
}

export function TableOfContents({
  headings,
  label,
  variant,
}: TableOfContentsProps) {
  const activeId = useActiveHeading(headings);

  if (headings.length === 0) return null;

  if (variant === "mobile") {
    return (
      <details className="group mb-8 rounded-xl border bg-muted/30 lg:hidden">
        <summary className="flex cursor-pointer items-center gap-2 p-4 text-sm font-semibold [&::-webkit-details-marker]:hidden">
          <List className="size-4 text-primary" />
          {label}
        </summary>
        <ul className="space-y-1 px-4 pb-4">
          {headings.map((h) => (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                className="block py-1 text-sm text-muted-foreground hover:text-foreground"
              >
                {h.title}
              </a>
            </li>
          ))}
        </ul>
      </details>
    );
  }

  return (
    <nav aria-label={label} className="sticky top-24">
      <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        <List className="size-3.5" />
        {label}
      </p>
      <ul className="space-y-1 border-l">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={cn(
                "-ml-px block border-l py-1 pl-4 text-sm transition-colors",
                activeId === h.id
                  ? "border-primary font-medium text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {h.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
