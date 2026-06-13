import {
  FileText,
  Heartbeat,
  Bus,
  Briefcase,
  HandHeart,
  GraduationCap,
  House,
  Siren,
  Compass,
  PhoneCall,
  MapPin,
  type Icon as PhosphorIcon,
} from "@phosphor-icons/react/dist/ssr";

/**
 * Mapeamento dos nomes usados nos dados (mantidos por compatibilidade)
 * para os ícones Phosphor renderizados em estilo duotone — a identidade
 * visual do portal. As chaves alimentam `validIconNames` (testes de dados).
 */
const iconMap: Record<string, PhosphorIcon> = {
  FileText,
  HeartPulse: Heartbeat,
  Bus,
  Briefcase,
  HandHeart,
  GraduationCap,
  Home: House,
  Siren,
  Compass,
  PhoneCall,
  MapPin,
};

export const validIconNames = Object.keys(iconMap);

interface IconProps {
  name: string;
  className?: string;
}

export function Icon({ name, className }: IconProps) {
  const Component = iconMap[name] ?? Compass;
  return <Component weight="duotone" className={className} aria-hidden />;
}
