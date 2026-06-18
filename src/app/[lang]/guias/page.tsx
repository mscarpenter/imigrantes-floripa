import { redirect } from "next/navigation";
import { isLocale } from "@/i18n/config";

/**
 * Hub de guias — por enquanto redireciona ao guia de aplicativos.
 * Evoluir para listar vários guias quando houver mais conteúdo.
 */
export default async function GuiasPage({
  params,
}: PageProps<"/[lang]/guias">) {
  const { lang } = await params;
  if (!isLocale(lang)) return null;
  redirect(`/${lang}/apresentacao`);
}
