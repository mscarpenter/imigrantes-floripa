import Link from "next/link";
import { Compass } from "lucide-react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

interface HeaderProps {
  locale: Locale;
  dict: Dictionary;
}

export function Header({ locale, dict }: HeaderProps) {
  const navLinks = [
    { href: `/${locale}`, label: dict.nav.home },
    { href: `/${locale}/trilha`, label: dict.nav.guidance },
    { href: `/${locale}/contatos`, label: dict.nav.contacts },
    { href: `/${locale}/sobre`, label: dict.nav.about },
  ];

  return (
    <header className="border-b bg-background/80 backdrop-blur sticky top-0 z-30">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href={`/${locale}`}
          className="flex items-center gap-2 font-semibold text-lg"
        >
          <Compass className="size-5 text-primary" aria-hidden />
          <span>{dict.site.name}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1 text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-1.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher current={locale} />
          <Link
            href={`/${locale}/entrar`}
            className="text-sm font-medium hover:underline hidden sm:inline"
          >
            {dict.nav.signIn}
          </Link>
        </div>
      </div>

      <nav className="md:hidden border-t">
        <div className="mx-auto flex w-full max-w-7xl items-center gap-1 overflow-x-auto px-4 py-2 text-sm sm:px-6 lg:px-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap rounded-md px-3 py-1 text-muted-foreground hover:text-foreground hover:bg-muted"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
