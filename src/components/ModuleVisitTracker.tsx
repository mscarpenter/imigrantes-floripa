"use client";

import { useEffect } from "react";

const STORAGE_KEY = "imigrantes:visited-modules";

export function ModuleVisitTracker({ slug }: { slug: string }) {
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const slugs: string[] = raw ? JSON.parse(raw) : [];
      if (!slugs.includes(slug)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...slugs, slug]));
      }
    } catch {}
  }, [slug]);

  return null;
}
