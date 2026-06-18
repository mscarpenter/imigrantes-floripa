"use client";

import Link from "next/link";
import { Dialog } from "@base-ui/react/dialog";
import {
  Phone,
  Mail,
  MapPin,
  Globe,
  Clock,
  MessageCircle,
  Map as MapIcon,
  ChevronRight,
  X,
} from "lucide-react";
import type { Contact } from "@/lib/data/types";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { getCategoryBySlug } from "@/lib/data/queries";
import { resolveTranslation } from "@/i18n/resolve-translation";
import { Icon } from "./Icon";
import { cn } from "@/lib/utils";

interface ContactRowProps {
  contact: Contact;
  locale: Locale;
  dict: Dictionary;
  active?: boolean;
  onOpen?: () => void;
}

export function ContactRow({
  contact,
  locale,
  dict,
  active = false,
  onOpen,
}: ContactRowProps) {
  const { value: t } = resolveTranslation(contact.translations, locale);
  const category = getCategoryBySlug(contact.categorySlug);
  const categoryName = category
    ? resolveTranslation(category.translations, locale).value.name
    : undefined;
  const hasMap = contact.lat != null && contact.lng != null;

  const hasDetails = Boolean(
    contact.phone ||
      contact.whatsapp ||
      contact.email ||
      contact.address ||
      contact.website ||
      contact.hours,
  );

  return (
    <Dialog.Root
      onOpenChange={(open) => {
        if (open) onOpen?.();
      }}
    >
      <Dialog.Trigger
        className={cn(
          "group flex w-full min-w-0 items-center gap-3 rounded-2xl border bg-card p-4 text-left shadow-soft transition-all duration-300 ease-out",
          "hover:-translate-y-0.5 hover:border-warm/50 hover:shadow-soft-lg",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warm/40",
          active
            ? "-translate-y-0.5 border-warm/70 shadow-soft-lg"
            : "border-border/60",
        )}
      >
        <span
          className={cn(
            "flex size-10 shrink-0 items-center justify-center rounded-xl transition-colors",
            active
              ? "bg-warm/15 text-warm"
              : "bg-primary/10 text-primary group-hover:bg-warm/15 group-hover:text-warm",
          )}
        >
          {category && <Icon name={category.icon} className="size-5" />}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate font-semibold leading-snug">
            {t.name}
          </span>
          {categoryName && (
            <span className="mt-0.5 block truncate text-xs text-muted-foreground">
              {categoryName}
            </span>
          )}
        </span>
        <ChevronRight
          className={cn(
            "size-5 shrink-0 transition-transform group-hover:translate-x-0.5",
            active ? "translate-x-0.5 text-warm" : "text-muted-foreground",
          )}
        />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm transition-opacity duration-200 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
        <Dialog.Popup
          className={cn(
            "fixed z-50 overflow-y-auto bg-card shadow-soft-lg transition-all duration-300",
            // Mobile: bottom sheet
            "inset-x-0 bottom-0 max-h-[85dvh] rounded-t-2xl border-t border-border px-5 pb-8 pt-4",
            "max-sm:data-[starting-style]:translate-y-full max-sm:data-[ending-style]:translate-y-full",
            // Desktop: centered modal
            "sm:inset-x-auto sm:bottom-auto sm:left-1/2 sm:top-1/2",
            "sm:max-h-[calc(100dvh-2rem)] sm:w-[calc(100vw-2rem)] sm:max-w-md sm:-translate-x-1/2 sm:-translate-y-1/2",
            "sm:rounded-2xl sm:border sm:p-6",
            "sm:data-[starting-style]:scale-95 sm:data-[ending-style]:scale-95",
            // Shared fade
            "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
          )}
        >
          {/* Drag handle - mobile only */}
          <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-border sm:hidden" />

          <Dialog.Close className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
            <X className="size-4" />
          </Dialog.Close>

          <Dialog.Title className="pr-8 text-lg font-bold leading-snug tracking-tight">
            {t.name}
          </Dialog.Title>

          {categoryName && (
            <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
              {category && <Icon name={category.icon} className="size-3" />}
              {categoryName}
            </span>
          )}

          {t.description && (
            <Dialog.Description className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {t.description}
            </Dialog.Description>
          )}

          {hasDetails && (
            <dl className="mt-5 space-y-3.5 border-t border-border/60 pt-5 text-sm">
              {contact.phone && (
                <DetailRow icon={<Phone className="size-4" />} label={dict.contacts.phone}>
                  <a
                    href={`tel:${contact.phone.replace(/\D/g, "")}`}
                    className="font-medium text-foreground transition-colors hover:text-[#6E5594]"
                  >
                    {contact.phone}
                  </a>
                </DetailRow>
              )}
              {contact.whatsapp && (
                <DetailRow
                  icon={<MessageCircle className="size-4" />}
                  label={dict.contacts.whatsapp}
                >
                  <a
                    href={`https://wa.me/${contact.whatsapp.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-foreground transition-colors hover:text-[#6E5594]"
                  >
                    {contact.whatsapp}
                  </a>
                </DetailRow>
              )}
              {contact.email && (
                <DetailRow icon={<Mail className="size-4" />} label={dict.contacts.email}>
                  <a
                    href={`mailto:${contact.email}`}
                    className="font-medium text-foreground transition-colors hover:text-[#6E5594] break-all"
                  >
                    {contact.email}
                  </a>
                </DetailRow>
              )}
              {contact.address && (
                <DetailRow icon={<MapPin className="size-4" />} label={dict.contacts.address}>
                  <span className="text-foreground">{contact.address}</span>
                </DetailRow>
              )}
              {contact.website && (
                <DetailRow icon={<Globe className="size-4" />} label={dict.contacts.website}>
                  <a
                    href={contact.website}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-foreground transition-colors hover:text-[#6E5594] break-all"
                  >
                    {contact.website.replace(/^https?:\/\//, "")}
                  </a>
                </DetailRow>
              )}
              {contact.hours && (
                <DetailRow icon={<Clock className="size-4" />} label={dict.contacts.hours}>
                  <span className="text-foreground">{contact.hours}</span>
                </DetailRow>
              )}
            </dl>
          )}

          {hasMap && (
            <Link
              href={`/${locale}/mapa?contato=${contact.id}`}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#6E5594] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#6E5594]/90"
            >
              <MapIcon className="size-4" />
              {dict.map.viewOnMap}
            </Link>
          )}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

interface DetailRowProps {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}

function DetailRow({ icon, label, children }: DetailRowProps) {
  return (
    <div className="flex items-start gap-3">
      <span
        aria-hidden
        className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground"
      >
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <dt className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </dt>
        <dd className="leading-snug break-words">{children}</dd>
      </div>
    </div>
  );
}
