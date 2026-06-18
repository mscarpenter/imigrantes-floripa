import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { PortalMenuFab } from "@/components/PortalMenuFab";

export async function PortalMenuFabSlot({ locale }: { locale: Locale }) {
  const dict = await getDictionary(locale);
  return <PortalMenuFab locale={locale} strings={dict.portalMenu} />;
}
