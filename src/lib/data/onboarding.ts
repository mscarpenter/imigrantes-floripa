import type { Locale } from "@/i18n/config";

export interface OnboardingTranslation {
  /** Small category tag shown over the banner. */
  tag: string;
  title: string;
  /** Accessible intro about what the user finds in this area. */
  intro: string;
  /** Per-card call to action label. */
  cta: string;
}

export interface OnboardingCard {
  id: string;
  icon: string;
  /** Path WITHOUT the locale prefix (e.g. "/contatos"). */
  path: string;
  /** Banner illustration in /public (same for both locales, no text). */
  image: string;
  translations: Record<Locale, OnboardingTranslation>;
}

/**
 * Cards editoriais de onboarding do carrossel da home.
 * Objetivo: orientar quem chega sobre o que o portal oferece e levar a cada área.
 */
export const onboardingCards: OnboardingCard[] = [
  {
    id: "documentos",
    icon: "FileText",
    path: "/modulo/documentos-essenciais",
    image: "/illustrations/documentos.png",
    translations: {
      pt: {
        tag: "Documentos",
        title: "O passo a passo de toda a documentação",
        intro:
          "CPF, CRNM e Carteira de Trabalho na ordem certa: o que tirar primeiro, onde ir e quanto custa.",
        cta: "Ver documentos",
      },
      es: {
        tag: "Documentos",
        title: "El paso a paso de toda la documentación",
        intro:
          "CPF, CRNM y Libreta de Trabajo en el orden correcto: qué sacar primero, dónde ir y cuánto cuesta.",
        cta: "Ver documentos",
      },
    },
  },
  {
    id: "saude",
    icon: "HeartPulse",
    path: "/modulo/saude-sus",
    image: "/illustrations/saude.png",
    translations: {
      pt: {
        tag: "Saúde",
        title: "Atendimento médico, inclusive 24h por telefone",
        intro:
          "Como usar o SUS, tirar o Cartão e falar com o Alô Saúde Floripa sem sair de casa.",
        cta: "Ver saúde",
      },
      es: {
        tag: "Salud",
        title: "Atención médica, incluso 24h por teléfono",
        intro:
          "Cómo usar el SUS, sacar la Tarjeta y hablar con Alô Saúde Floripa sin salir de casa.",
        cta: "Ver salud",
      },
    },
  },
  {
    id: "transporte",
    icon: "Bus",
    path: "/modulo/transporte-publico",
    image: "/illustrations/transporte.png",
    translations: {
      pt: {
        tag: "Transporte",
        title: "Circule pela cidade pagando menos",
        intro:
          "Cartão de ônibus, tarifa social e os aplicativos que ajudam no dia a dia.",
        cta: "Ver transporte",
      },
      es: {
        tag: "Transporte",
        title: "Movete por la ciudad pagando menos",
        intro:
          "Tarjeta de colectivo, tarifa social y las apps que ayudan en el día a día.",
        cta: "Ver transporte",
      },
    },
  },
  {
    id: "assistencia",
    icon: "HandHeart",
    path: "/modulo/assistencia-social",
    image: "/illustrations/assistencia.png",
    translations: {
      pt: {
        tag: "Assistência social",
        title: "Apoio quando você mais precisa",
        intro:
          "CRAS, CadÚnico e ONGs que acolhem migrantes e refugiados em Florianópolis.",
        cta: "Ver assistência",
      },
      es: {
        tag: "Asistencia social",
        title: "Apoyo cuando más lo necesitás",
        intro:
          "CRAS, CadÚnico y ONGs que acogen a migrantes y refugiados en Florianópolis.",
        cta: "Ver asistencia",
      },
    },
  },
  {
    id: "contatos",
    icon: "PhoneCall",
    path: "/contatos",
    image: "/illustrations/contatos.png",
    translations: {
      pt: {
        tag: "Contatos",
        title: "Telefones e endereços essenciais num só lugar",
        intro:
          "Serviços públicos, emergências e organizações de apoio, com horários atualizados.",
        cta: "Ver contatos",
      },
      es: {
        tag: "Contactos",
        title: "Teléfonos y direcciones esenciales en un solo lugar",
        intro:
          "Servicios públicos, emergencias y organizaciones de apoyo, con horarios actualizados.",
        cta: "Ver contactos",
      },
    },
  },
  {
    id: "mapa",
    icon: "MapPin",
    path: "/mapa",
    image: "/illustrations/mapa.png",
    translations: {
      pt: {
        tag: "Mapa",
        title: "Veja no mapa onde fica cada serviço",
        intro:
          "Localize postos, hospitais e pontos de ônibus e descubra como chegar.",
        cta: "Abrir mapa",
      },
      es: {
        tag: "Mapa",
        title: "Mirá en el mapa dónde queda cada servicio",
        intro:
          "Ubicá postos, hospitales y paradas de colectivo y descubrí cómo llegar.",
        cta: "Abrir mapa",
      },
    },
  },
];
