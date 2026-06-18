import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Download } from "lucide-react";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { SlidesCarousel } from "@/components/SlidesCarousel";
import { Reveal } from "@/components/motion/Reveal";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SLIDES_DIR = "apresentacao";
const GUIDE_PDF = "/guia-aplicativos-essenciais.pdf";
const IMAGE_RE = /\.(png|jpe?g|webp)$/i;

function getSlides(): string[] {
  try {
    const dir = path.join(process.cwd(), "public", SLIDES_DIR);
    return fs
      .readdirSync(dir)
      .filter((file) => IMAGE_RE.test(file))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
      .map((file) => `/${SLIDES_DIR}/${file}`);
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/apresentacao">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return { title: dict.slides.title };
}

export default async function PresentationPage({
  params,
}: PageProps<"/[lang]/apresentacao">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const t = dict.slides;
  const slides = getSlides();

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 md:py-14">
      <Reveal>
        <span className="text-sm font-semibold tracking-wide text-primary uppercase">
          {t.eyebrow}
        </span>
        <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
          {t.title}
        </h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">{t.subtitle}</p>
        <a
          href={GUIDE_PDF}
          download
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "mt-4 inline-flex gap-2",
          )}
        >
          <Download className="size-4" aria-hidden />
          {t.downloadPdf}
        </a>
      </Reveal>

      <div className="mt-8">
        {slides.length > 0 ? (
          <SlidesCarousel
            slides={slides}
            prevLabel={t.prev}
            nextLabel={t.next}
          />
        ) : (
          <div className="flex min-h-48 items-center justify-center rounded-2xl border border-dashed border-border bg-muted/30 p-8 text-center text-muted-foreground">
            {t.empty}
          </div>
        )}
      </div>

      <div className="mt-8">
        <Link
          href={`/${lang}`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
        >
          <ArrowLeft className="size-4" aria-hidden />
          {t.back}
        </Link>
      </div>
    </div>
  );
}
