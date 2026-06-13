"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { ChevronDown, MapPin } from "lucide-react";
import type { Contact, Category } from "@/lib/data/types";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { Icon } from "@/components/Icon";
import { colorsFor } from "@/lib/data/colors";
import { cn } from "@/lib/utils";

const MapCanvas = dynamic(() => import("./MapCanvas"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[60vh] min-h-[420px] items-center justify-center rounded-xl border bg-muted/30 lg:h-[72vh]">
      <span className="text-sm text-muted-foreground">…</span>
    </div>
  ),
});

interface ContactsMapProps {
  contacts: Contact[];
  categories: Category[];
  locale: Locale;
  dict: Dictionary;
  initialContactId?: string;
}

export function ContactsMap({
  contacts,
  categories,
  locale,
  dict,
  initialContactId,
}: ContactsMapProps) {
  const initialContact = initialContactId
    ? (contacts.find((c) => c.id === initialContactId) ?? null)
    : null;

  const [selectedId, setSelectedId] = useState<string | null>(
    initialContact && initialContact.lat != null ? initialContact.id : null,
  );
  const [openCategory, setOpenCategory] = useState<string | null>(
    initialContact?.categorySlug ?? null,
  );

  const selected = useMemo(
    () => contacts.find((c) => c.id === selectedId) ?? null,
    [contacts, selectedId],
  );

  const byCategory = useMemo(() => {
    const map = new Map<string, Contact[]>();
    for (const contact of contacts) {
      const list = map.get(contact.categorySlug) ?? [];
      list.push(contact);
      map.set(contact.categorySlug, list);
    }
    return map;
  }, [contacts]);

  const visibleCategories = categories.filter((c) => byCategory.has(c.slug));

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_22rem]">
      <MapCanvas
        contacts={contacts}
        selected={selected}
        locale={locale}
        dict={dict}
      />

      <aside className="flex max-h-[72vh] flex-col rounded-xl border">
        <div className="border-b px-4 py-3">
          <p className="text-sm font-semibold">{dict.map.sidebarTitle}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {dict.map.sidebarHint}
          </p>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-2">
          {visibleCategories.map((category) => {
            const isOpen = openCategory === category.slug;
            const colors = colorsFor(category.color);
            const list = byCategory.get(category.slug) ?? [];
            return (
              <div key={category.slug} className="mb-1">
                <button
                  type="button"
                  onClick={() =>
                    setOpenCategory((cur) =>
                      cur === category.slug ? null : category.slug,
                    )
                  }
                  className={cn(
                    "flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted",
                    isOpen && "bg-muted",
                  )}
                >
                  <span className="inline-flex items-center gap-2">
                    <span
                      className={cn(
                        "inline-flex size-6 items-center justify-center rounded-md",
                        colors.badge,
                      )}
                    >
                      <Icon name={category.icon} className="size-3.5" />
                    </span>
                    {category.translations[locale].name}
                    <span className="text-xs text-muted-foreground">
                      ({list.length})
                    </span>
                  </span>
                  <ChevronDown
                    className={cn(
                      "size-4 text-muted-foreground transition-transform",
                      isOpen && "rotate-180",
                    )}
                  />
                </button>

                {isOpen && (
                  <ul className="mt-1 space-y-0.5 pl-2">
                    {list.map((contact) => {
                      const mappable = contact.lat != null;
                      const isSelected = contact.id === selectedId;
                      return (
                        <li key={contact.id}>
                          <button
                            type="button"
                            disabled={!mappable}
                            onClick={() => setSelectedId(contact.id)}
                            className={cn(
                              "flex w-full items-start gap-2 rounded-md px-3 py-1.5 text-left text-sm transition-colors",
                              mappable
                                ? "hover:bg-muted"
                                : "cursor-default text-muted-foreground",
                              isSelected && "bg-muted font-medium",
                            )}
                          >
                            {mappable && (
                              <MapPin className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />
                            )}
                            <span className="min-w-0 flex-1">
                              {contact.translations[locale].name}
                              {!mappable && (
                                <span className="block text-xs text-muted-foreground/70">
                                  {dict.map.noAddress}
                                </span>
                              )}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </aside>
    </div>
  );
}
