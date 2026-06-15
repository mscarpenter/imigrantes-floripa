import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { locales, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "../globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: {
      default: dict.site.name,
      template: `%s · ${dict.site.name}`,
    },
    description: dict.site.tagline,
  };
}

export default async function LangLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <html
      lang={lang}
      data-scroll-behavior="smooth"
      className={cn("font-sans", geist.variable)}
    >
      <body className="min-h-dvh flex flex-col bg-background text-foreground">
        <Header locale={lang} dict={dict} />
        <main className="flex-1">{children}</main>
        <Footer dict={dict} locale={lang} />
      </body>
    </html>
  );
}
