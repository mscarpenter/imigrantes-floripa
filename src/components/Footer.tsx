import Link from "next/link";
import { Compass } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

interface FooterProps {
  dict: Dictionary;
  locale: Locale;
}

export function Footer({ dict, locale }: FooterProps) {
  const links = [
    { href: `/${locale}/portal`, label: dict.nav.home },
    { href: `/${locale}/orientacao`, label: dict.nav.trail },
    { href: `/${locale}/novidades`, label: dict.nav.news },
    { href: `/${locale}/blog`, label: dict.nav.blog },
    { href: `/${locale}/contatos`, label: dict.nav.contacts },
    { href: `/${locale}/sobre`, label: dict.nav.about },
    { href: `/${locale}/faq`, label: dict.nav.faq },
  ];

  return (
    <footer className="mt-16 border-t bg-muted/30">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <Compass className="size-5 text-primary" aria-hidden />
              <span>{dict.site.name}</span>
            </div>
            <p className="text-xs text-muted-foreground">
              {dict.site.brandSubtitle}
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              {dict.site.tagline}
            </p>
          </div>

          <nav className="flex flex-col gap-2 text-sm" aria-label={dict.site.name}>
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-10 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>{dict.footer.madeWith}</p>
        </div>
      </div>
    </footer>
  );
}
