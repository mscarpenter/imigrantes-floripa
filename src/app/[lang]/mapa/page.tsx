import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getAllContacts, getAllCategories } from "@/lib/data/queries";
import { ContactsMap } from "@/components/map/ContactsMap";

export default async function MapPage({
  params,
  searchParams,
}: PageProps<"/[lang]/mapa">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const { contato } = await searchParams;
  const dict = await getDictionary(lang);
  const contacts = getAllContacts();
  const categories = getAllCategories();
  const initialContactId = typeof contato === "string" ? contato : undefined;

  return (
    <div className="mx-auto max-w-6xl px-4 pb-10 pt-4 md:py-14">
      <Link
        href={`/${lang}/contatos`}
        className="hidden items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground md:inline-flex"
      >
        <ArrowLeft className="size-4" />
        {dict.map.backToContacts}
      </Link>

      <h1 className="hidden text-3xl font-bold tracking-tight md:mt-4 md:block md:text-4xl">
        {dict.map.title}
      </h1>
      <p className="hidden max-w-2xl text-muted-foreground md:mt-2 md:block">
        {dict.map.subtitle}
      </p>

      <div className="md:mt-8">
        <ContactsMap
          contacts={contacts}
          categories={categories}
          locale={lang}
          dict={dict}
          initialContactId={initialContactId}
        />
      </div>
    </div>
  );
}
