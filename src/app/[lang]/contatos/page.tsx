import { notFound } from "next/navigation";
import { HandHeart, ArrowRight } from "lucide-react";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getAllContacts, getAllCategories } from "@/lib/data/queries";
import { ContactsBrowser } from "@/components/ContactsBrowser";
import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

const CIRCULOS_CONTACT_URL = "https://circulosdehospitalidade.org/contato/";

export default async function ContactsPage({
  params,
}: PageProps<"/[lang]/contatos">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const contacts = getAllContacts();
  const categories = getAllCategories();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
      <Reveal>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          {dict.contacts.title}
        </h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          {dict.contacts.subtitle}
        </p>
      </Reveal>

      <Card className="relative mt-8 overflow-hidden border-primary/20 bg-primary/5 p-6 pl-8">
        <span
          aria-hidden
          className="absolute inset-y-0 left-0 w-1 bg-primary"
        />
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <HandHeart className="size-5" aria-hidden />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold">
              {dict.contacts.featuredTitle}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {dict.contacts.featuredBody}
            </p>
            <a
              href={CIRCULOS_CONTACT_URL}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ size: "sm" }), "mt-4")}
            >
              {dict.contacts.featuredCta}
              <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </Card>

      <div className="mt-8">
        <ContactsBrowser
          contacts={contacts}
          categories={categories}
          locale={lang}
          dict={dict}
        />
      </div>
    </div>
  );
}
