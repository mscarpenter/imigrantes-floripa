"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass } from "lucide-react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { cn } from "@/lib/utils";

interface HeaderProps {
  locale: Locale;
  dict: Dictionary;
}

export function Header({ locale, dict }: HeaderProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const home = `/${locale}`;
  const navLinks = [
    { href: home, label: dict.nav.home },
    { href: `/${locale}/orientacao`, label: dict.nav.guidance },
    { href: `/${locale}/blog`, label: dict.nav.blog },
    { href: `/${locale}/contatos`, label: dict.nav.contacts },
    { href: `/${locale}/sobre`, label: dict.nav.about },
  ];

  const isActive = (href: string) =>
    href === home ? pathname === home : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-30 border-b backdrop-blur-xl backdrop-saturate-150 transition-all duration-300",
        scrolled
          ? "border-border/70 bg-background/80 shadow-soft"
          : "border-transparent bg-background/60",
      )}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href={`/${locale}`}
          className="flex items-center gap-2 text-lg font-semibold tracking-tight transition-opacity hover:opacity-80"
        >
          <Compass className="size-5 text-primary" aria-hidden />
          <span>{dict.site.name}</span>
        </Link>

        <nav className="hidden items-center gap-1 text-sm md:flex">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-full px-3.5 py-1.5 font-medium transition-all active:scale-95",
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher current={locale} />
          <Link
            href={`/${locale}/entrar`}
            className="hidden text-sm font-medium transition-colors hover:text-primary sm:inline"
          >
            {dict.nav.signIn}
          </Link>
        </div>
      </div>

      <nav className="border-t border-border/60 md:hidden">
        <div className="mx-auto flex w-full max-w-7xl items-center gap-1 overflow-x-auto px-4 py-2 text-sm sm:px-6 lg:px-8">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "whitespace-nowrap rounded-full px-3 py-1 font-medium transition-all active:scale-95",
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
