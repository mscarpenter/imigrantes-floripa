import Link from "next/link";
import { Card } from "@/components/ui/card";
import {
  Phone,
  Mail,
  MapPin,
  Globe,
  Clock,
  MessageCircle,
  Map as MapIcon,
  ArrowRight,
} from "lucide-react";
import type { Contact } from "@/lib/data/types";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { getCategoryBySlug } from "@/lib/data/queries";
import { resolveTranslation } from "@/i18n/resolve-translation";
import { Icon } from "./Icon";
import { cn } from "@/lib/utils";

interface ContactCardProps {
  contact: Contact;
  locale: Locale;
  dict: Dictionary;
}

export function ContactCard({ contact, locale, dict }: ContactCardProps) {
  const { value: t } = resolveTranslation(contact.translations, locale);
  const category = getCategoryBySlug(contact.categorySlug);
  const categoryName = category
    ? resolveTranslation(category.translations, locale).value.name
    : undefined;

  const hasDetails = Boolean(
    contact.phone ||
      contact.whatsapp ||
      contact.email ||
      contact.address ||
      contact.website ||
      contact.hours,
  );

  const hasMap = contact.lat != null && contact.lng != null;

  return (
    <Card className="group flex h-full flex-col gap-0 rounded-2xl border border-border/60 p-0 shadow-soft ring-0 transition-shadow duration-300 hover:shadow-soft-lg">
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <p className="min-w-0 flex-1 text-base font-semibold leading-snug tracking-tight">
            {t.name}
          </p>
          {categoryName && (
            <span
              className={cn(
                "inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium",
                "bg-primary/10 text-primary",
              )}
            >
              {category && <Icon name={category.icon} className="size-3" />}
              {categoryName}
            </span>
          )}
        </div>

        <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
          {t.description}
        </p>

        {hasDetails && (
          <dl className="mt-5 space-y-3.5 border-t border-border/60 pt-5 text-sm">
            {contact.phone && (
              <Row icon={<Phone className="size-4" />} label={dict.contacts.phone}>
                <a
                  href={`tel:${contact.phone.replace(/\D/g, "")}`}
                  className="font-medium text-foreground transition-colors hover:text-[#6E5594]"
                >
                  {contact.phone}
                </a>
              </Row>
            )}
            {contact.whatsapp && (
              <Row
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
              </Row>
            )}
            {contact.email && (
              <Row icon={<Mail className="size-4" />} label={dict.contacts.email}>
                <a
                  href={`mailto:${contact.email}`}
                  className="font-medium text-foreground transition-colors hover:text-[#6E5594] break-all"
                >
                  {contact.email}
                </a>
              </Row>
            )}
            {contact.address && (
              <Row
                icon={<MapPin className="size-4" />}
                label={dict.contacts.address}
              >
                <span className="text-foreground">{contact.address}</span>
              </Row>
            )}
            {contact.website && (
              <Row icon={<Globe className="size-4" />} label={dict.contacts.website}>
                <a
                  href={contact.website}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-foreground transition-colors hover:text-[#6E5594] break-all"
                >
                  {contact.website.replace(/^https?:\/\//, "")}
                </a>
              </Row>
            )}
            {contact.hours && (
              <Row icon={<Clock className="size-4" />} label={dict.contacts.hours}>
                <span className="text-foreground">{contact.hours}</span>
              </Row>
            )}
          </dl>
        )}
      </div>

      {hasMap && (
        <Link
          href={`/${locale}/mapa?contato=${contact.id}`}
          className="group/map flex items-center gap-2.5 border-t border-border/60 bg-muted/40 px-5 py-3.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground sm:px-6"
        >
          <MapIcon className="size-4 text-[#6E5594]" />
          {dict.map.viewOnMap}
          <span className="ml-auto flex size-6 items-center justify-center rounded-full bg-background text-muted-foreground ring-1 ring-border/60 transition-all group-hover/map:bg-[#6E5594] group-hover/map:text-white group-hover/map:ring-[#6E5594]">
            <ArrowRight className="size-3.5 transition-transform group-hover/map:translate-x-px" />
          </span>
        </Link>
      )}
    </Card>
  );
}

interface RowProps {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}

function Row({ icon, label, children }: RowProps) {
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
