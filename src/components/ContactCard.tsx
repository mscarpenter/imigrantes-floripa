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
} from "lucide-react";
import type { Contact } from "@/lib/data/types";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { getCategoryBySlug } from "@/lib/data/queries";
import { colorsFor } from "@/lib/data/colors";
import { Icon } from "./Icon";
import { cn } from "@/lib/utils";

interface ContactCardProps {
  contact: Contact;
  locale: Locale;
  dict: Dictionary;
}

export function ContactCard({ contact, locale, dict }: ContactCardProps) {
  const t = contact.translations[locale];
  const category = getCategoryBySlug(contact.categorySlug);
  const categoryName = category?.translations[locale].name;
  const colors = colorsFor(category?.color);

  const hasDetails = Boolean(
    contact.phone ||
      contact.whatsapp ||
      contact.email ||
      contact.address ||
      contact.website ||
      contact.hours,
  );

  return (
    <Card className="relative overflow-hidden p-0">
      <span
        aria-hidden
        className={cn("absolute inset-y-0 left-0 w-1", colors.pillActive)}
      />

      <div className="p-5 pl-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold leading-tight">{t.name}</h3>
          {categoryName && (
            <span
              className={cn(
                "inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium",
                colors.badge,
              )}
            >
              {category && <Icon name={category.icon} className="size-3" />}
              {categoryName}
            </span>
          )}
        </div>
        <p className="mt-2 text-sm text-muted-foreground">{t.description}</p>

        {hasDetails && (
          <>
            <div className="my-4 border-t border-dashed" />
            <dl className="space-y-2.5 text-sm">
              {contact.phone && (
                <Row icon={<Phone className="size-3.5" />} label={dict.contacts.phone}>
                  <a
                    href={`tel:${contact.phone.replace(/\D/g, "")}`}
                    className="hover:underline"
                  >
                    {contact.phone}
                  </a>
                </Row>
              )}
              {contact.whatsapp && (
                <Row
                  icon={<MessageCircle className="size-3.5" />}
                  label={dict.contacts.whatsapp}
                >
                  <a
                    href={`https://wa.me/${contact.whatsapp.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline"
                  >
                    {contact.whatsapp}
                  </a>
                </Row>
              )}
              {contact.email && (
                <Row icon={<Mail className="size-3.5" />} label={dict.contacts.email}>
                  <a href={`mailto:${contact.email}`} className="hover:underline">
                    {contact.email}
                  </a>
                </Row>
              )}
              {contact.address && (
                <Row
                  icon={<MapPin className="size-3.5" />}
                  label={dict.contacts.address}
                >
                  <span>{contact.address}</span>
                </Row>
              )}
              {contact.website && (
                <Row icon={<Globe className="size-3.5" />} label={dict.contacts.website}>
                  <a
                    href={contact.website}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline break-all"
                  >
                    {contact.website.replace(/^https?:\/\//, "")}
                  </a>
                </Row>
              )}
              {contact.hours && (
                <Row icon={<Clock className="size-3.5" />} label={dict.contacts.hours}>
                  <span>{contact.hours}</span>
                </Row>
              )}
            </dl>
          </>
        )}

        {contact.lat != null && contact.lng != null && (
          <Link
            href={`/${locale}/mapa?contato=${contact.id}`}
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
          >
            <MapIcon className="size-4" />
            {dict.map.viewOnMap}
          </Link>
        )}
      </div>
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
        className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border bg-muted/50 text-muted-foreground"
      >
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <dt className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </dt>
        <dd className="text-foreground leading-snug break-words">{children}</dd>
      </div>
    </div>
  );
}
