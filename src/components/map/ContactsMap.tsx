"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowLeft, ChevronDown, ChevronUp, GripVertical, MapPin } from "lucide-react";
import type { Contact, Category } from "@/lib/data/types";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { Icon } from "@/components/Icon";
import { colorsFor } from "@/lib/data/colors";
import { cn } from "@/lib/utils";

const MapCanvas = dynamic(() => import("./MapCanvas"), {
  ssr: false,
  loading: () => (
    <div className="flex size-full items-center justify-center bg-muted/30">
      <span className="text-sm text-muted-foreground">…</span>
    </div>
  ),
});

/** Matches the `md` Tailwind breakpoint; below it the layout changes. */
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return isDesktop;
}

interface CategoryListProps {
  visibleCategories: Category[];
  byCategory: Map<string, Contact[]>;
  openCategory: string | null;
  onToggleCategory: (slug: string) => void;
  selectedId: string | null;
  onSelectContact: (contact: Contact) => void;
  locale: Locale;
  dict: Dictionary;
}

function CategoryList({
  visibleCategories,
  byCategory,
  openCategory,
  onToggleCategory,
  selectedId,
  onSelectContact,
  locale,
  dict,
}: CategoryListProps) {
  return (
    <>
      {visibleCategories.map((category) => {
        const isOpen = openCategory === category.slug;
        const colors = colorsFor(category.color);
        const list = byCategory.get(category.slug) ?? [];
        return (
          <div key={category.slug} className="mb-1">
            <button
              type="button"
              onClick={() => onToggleCategory(category.slug)}
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
                        onClick={() => onSelectContact(contact)}
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
    </>
  );
}

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

  const isDesktop = useIsDesktop();
  // Desktop overlay can be minimized.
  const [collapsed, setCollapsed] = useState(false);

  // Desktop drag state: until the user drags, the panel stays anchored
  // bottom-right via CSS; on first drag we switch to absolute left/top.
  const wrapRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const dragOffset = useRef<{ x: number; y: number } | null>(null);
  const [dragged, setDragged] = useState(false);
  const [panelPos, setPanelPos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const handlePointerDown = (e: React.PointerEvent) => {
    const panel = panelRef.current;
    const wrap = wrapRef.current;
    if (!panel || !wrap) return;
    const pRect = panel.getBoundingClientRect();
    const wRect = wrap.getBoundingClientRect();
    dragOffset.current = { x: e.clientX - pRect.left, y: e.clientY - pRect.top };
    if (!dragged) {
      setPanelPos({ x: pRect.left - wRect.left, y: pRect.top - wRect.top });
      setDragged(true);
    }
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const offset = dragOffset.current;
    const wrap = wrapRef.current;
    const panel = panelRef.current;
    if (!offset || !wrap || !panel) return;
    const bounds = wrap.getBoundingClientRect();
    const maxX = bounds.width - panel.offsetWidth;
    const maxY = bounds.height - panel.offsetHeight;
    const x = Math.min(Math.max(0, e.clientX - bounds.left - offset.x), maxX);
    const y = Math.min(Math.max(0, e.clientY - bounds.top - offset.y), maxY);
    setPanelPos({ x, y });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    dragOffset.current = null;
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

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

  const toggleCategory = (slug: string) =>
    setOpenCategory((cur) => (cur === slug ? null : slug));

  const handleSelect = (contact: Contact) => {
    setSelectedId(contact.id);
    // On mobile the list sits below the map, so bring the map into view.
    if (!isDesktop) {
      wrapRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div>
      <div
        ref={wrapRef}
        className={cn(
          "relative w-full overflow-hidden border",
          isDesktop
            ? "h-[82vh] min-h-[600px] rounded-xl"
            : "-mx-4 h-[88svh] border-x-0",
        )}
      >
        <MapCanvas
          contacts={contacts}
          selected={selected}
          locale={locale}
          dict={dict}
        />

        {/* Mobile: back to contacts, inside the map */}
        {!isDesktop && (
          <Link
            href={`/${locale}/contatos`}
            className="absolute left-3 top-3 z-[1000] inline-flex items-center gap-1.5 rounded-lg border border-border bg-background/95 px-3 py-2 text-xs font-medium shadow-md backdrop-blur transition-colors hover:bg-background"
          >
            <ArrowLeft className="size-4" />
            {dict.map.backToContacts}
          </Link>
        )}

        {/* Desktop: floating, draggable, minimizable category panel */}
        {isDesktop && (
          <div
            ref={panelRef}
            style={
              dragged
                ? {
                    left: panelPos.x,
                    top: panelPos.y,
                    maxHeight: `calc(100% - ${panelPos.y + 12}px)`,
                  }
                : undefined
            }
            className={cn(
              "absolute z-[1000] flex w-[18rem] max-w-[calc(100%-1.5rem)] flex-col overflow-hidden rounded-xl border bg-background/95 shadow-lg backdrop-blur",
              dragged ? "" : "bottom-3 right-3 max-h-[calc(100%-1.5rem)]",
            )}
          >
            <div className="flex items-start gap-1 border-b px-3 py-2">
              <div
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                className="flex flex-1 cursor-move touch-none select-none items-start gap-2 py-1"
              >
                <GripVertical className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                <div>
                  <p className="text-sm font-semibold">
                    {dict.map.sidebarTitle}
                  </p>
                  {!collapsed && (
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {dict.map.sidebarHint}
                    </p>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setCollapsed((v) => !v)}
                aria-label={
                  collapsed ? dict.map.expandList : dict.map.collapseList
                }
                className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {collapsed ? (
                  <ChevronDown className="size-4" />
                ) : (
                  <ChevronUp className="size-4" />
                )}
              </button>
            </div>

            <div
              className={cn(
                "min-h-0 flex-1 overflow-y-auto p-2",
                collapsed && "hidden",
              )}
            >
              <CategoryList
                visibleCategories={visibleCategories}
                byCategory={byCategory}
                openCategory={openCategory}
                onToggleCategory={toggleCategory}
                selectedId={selectedId}
                onSelectContact={handleSelect}
                locale={locale}
                dict={dict}
              />
            </div>
          </div>
        )}
      </div>

      {/* Mobile: category list below the map */}
      {!isDesktop && (
        <div className="mt-4 rounded-xl border">
          <div className="border-b px-4 py-3">
            <p className="text-sm font-semibold">{dict.map.sidebarTitle}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {dict.map.sidebarHint}
            </p>
          </div>
          <div className="p-2">
            <CategoryList
              visibleCategories={visibleCategories}
              byCategory={byCategory}
              openCategory={openCategory}
              onToggleCategory={toggleCategory}
              selectedId={selectedId}
              onSelectContact={handleSelect}
              locale={locale}
              dict={dict}
            />
          </div>
        </div>
      )}
    </div>
  );
}
