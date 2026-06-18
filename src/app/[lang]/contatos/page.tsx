import { notFound } from "next/navigation";
import { HandHeart, ArrowRight } from "lucide-react";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getAllContacts, getAllCategories } from "@/lib/data/queries";
import { ContactsBrowser } from "@/components/ContactsBrowser";
import { PortalMenuFabSlot } from "@/components/PortalMenuFabSlot";
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
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          {dict.contacts.title}
        </h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          {dict.contacts.subtitle}
        </p>
      </Reveal>

      <Card className="mt-8 gap-0 rounded-2xl border-primary/20 bg-primary/5 p-6 shadow-soft ring-0 sm:p-7">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/15 text-primary">
            <HandHeart className="size-6" aria-hidden />
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
              className={cn(
                buttonVariants({ size: "sm" }),
                "mt-4 bg-primary text-primary-foreground hover:bg-primary/90",
              )}
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
      <PortalMenuFabSlot locale={lang} />
    </div>
  );
}
