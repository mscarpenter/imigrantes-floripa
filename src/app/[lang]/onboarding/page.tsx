import { redirect } from "next/navigation";
import { isLocale } from "@/i18n/config";

/** Compat: /onboarding redireciona para a entrada do QR (/[lang]). */
export default async function OnboardingRedirect({
  params,
  searchParams,
}: PageProps<"/[lang]/onboarding">) {
  const { lang } = await params;
  if (!isLocale(lang)) return null;

  const sp = await searchParams;
  const query = sp.hub === "1" ? "?hub=1" : "";
  redirect(`/${lang}${query}`);
}
