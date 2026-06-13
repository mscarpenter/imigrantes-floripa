import type { Contact } from "./types";

export const contacts: Contact[] = [
  {
    id: "policia-federal-floripa",
    categorySlug: "documentos",
    phone: "(48) 3281-6500",
    address: "Av. Gov. Gustavo Richard, 367 - Centro, Florianópolis - SC",
    website: "https://www.gov.br/pf/pt-br",
    hours: "Seg-Sex 08:00-17:00 (mediante agendamento)",
    translations: {
      pt: {
        name: "Polícia Federal - Delegacia de Migração",
        description:
          "Emissão de CRNM (Carteira de Registro Nacional Migratório) e regularização migratória.",
      },
      es: {
        name: "Policía Federal - Delegación de Migración",
        description:
          "Emisión de CRNM (Cédula de Registro Nacional Migratorio) y regularización migratoria.",
      },
    },
  },
  {
    id: "receita-federal-floripa",
    categorySlug: "documentos",
    phone: "146",
    address: "Rua Felipe Schmidt, 235 - Centro, Florianópolis - SC",
    website: "https://www.gov.br/receitafederal/pt-br",
    hours: "Seg-Sex 09:00-16:00",
    translations: {
      pt: {
        name: "Receita Federal - CPF",
        description:
          "Inscrição e regularização de CPF. Estrangeiros podem solicitar gratuitamente.",
      },
      es: {
        name: "Receita Federal - CPF",
        description:
          "Inscripción y regularización del CPF. Los extranjeros pueden solicitarlo gratis.",
      },
    },
  },
  {
    id: "cras-floripa",
    categorySlug: "assistencia-social",
    phone: "(48) 3251-6300",
    website: "https://www.pmf.sc.gov.br/entidades/semas/",
    hours: "Seg-Sex 08:00-17:00",
    translations: {
      pt: {
        name: "CRAS - Centros de Referência de Assistência Social",
        description:
          "Apoio social, cadastro único, Bolsa Família e orientação para famílias em situação de vulnerabilidade. Há unidades em vários bairros.",
      },
      es: {
        name: "CRAS - Centros de Referencia de Asistencia Social",
        description:
          "Apoyo social, registro único (CadÚnico), Bolsa Família y orientación para familias en situación de vulnerabilidad. Hay unidades en varios barrios.",
      },
    },
  },
  {
    id: "caritas-sc",
    categorySlug: "assistencia-social",
    phone: "(48) 3224-0566",
    email: "secretaria@caritas.org.br",
    address: "Rua Esteves Júnior, 447 - Centro, Florianópolis - SC",
    website: "https://caritas.org.br",
    translations: {
      pt: {
        name: "Cáritas Brasileira - Regional SC",
        description:
          "Atendimento a migrantes, refugiados e solicitantes de refúgio. Orientação jurídica, social e encaminhamentos.",
      },
      es: {
        name: "Cáritas Brasileña - Regional SC",
        description:
          "Atención a migrantes, refugiados y solicitantes de refugio. Orientación jurídica, social y derivaciones.",
      },
    },
  },
  {
    id: "circulos-hospitalidade",
    categorySlug: "assistencia-social",
    website: "https://circulosdehospitalidade.org/",
    translations: {
      pt: {
        name: "Círculos de Hospitalidade",
        description:
          "Rede de apoio e acolhimento para migrantes e famílias em Florianópolis. Parceira deste portal.",
      },
      es: {
        name: "Círculos de Hospitalidade",
        description:
          "Red de apoyo y acogida para migrantes y familias en Florianópolis. Aliada de este portal.",
      },
    },
  },
  {
    id: "sus-cartao",
    categorySlug: "saude",
    phone: "136",
    website: "https://www.gov.br/saude/pt-br",
    translations: {
      pt: {
        name: "Cartão SUS - Cadastro",
        description:
          "Cadastro do Cartão Nacional de Saúde feito gratuitamente em qualquer Unidade Básica de Saúde (UBS). Documento, comprovante de residência e foto são suficientes.",
      },
      es: {
        name: "Tarjeta SUS - Registro",
        description:
          "Registro de la Tarjeta Nacional de Salud realizado gratis en cualquier Unidad Básica de Salud (UBS). Documento, comprobante de residencia y foto son suficientes.",
      },
    },
  },
  {
    id: "upa-sul",
    categorySlug: "saude",
    phone: "(48) 3271-1500",
    address: "Rod. SC-405, 4150 - Rio Tavares, Florianópolis - SC",
    hours: "24 horas",
    translations: {
      pt: {
        name: "UPA Sul (Unidade de Pronto Atendimento)",
        description:
          "Atendimento de urgência e emergência 24h, gratuito pelo SUS.",
      },
      es: {
        name: "UPA Sur (Unidad de Atención Inmediata)",
        description:
          "Atención de urgencia y emergencia 24h, gratuita por el SUS.",
      },
    },
  },
  {
    id: "consorcio-fenix",
    categorySlug: "transporte",
    phone: "(48) 3271-7488",
    address: "Terminal de Integração do Centro (TICEN)",
    website: "https://www.consorciofenix.com.br/passe-rapido",
    hours: "Seg-Sex 06:00-20:00, Sáb 06:00-13:00",
    translations: {
      pt: {
        name: "Passe Rápido - Consórcio Fênix",
        description:
          "Emissão e recarga do cartão Passe Rápido para o transporte público de Florianópolis. Há também tarifa social para quem se qualifica.",
      },
      es: {
        name: "Passe Rápido - Consorcio Fênix",
        description:
          "Emisión y recarga de la tarjeta Passe Rápido para el transporte público de Florianópolis. También hay tarifa social para quien califica.",
      },
    },
  },
  {
    id: "sine-floripa",
    categorySlug: "trabalho",
    phone: "158",
    address: "Av. Mauro Ramos, 722 - Centro, Florianópolis - SC",
    website: "https://www.gov.br/trabalho-e-emprego/pt-br",
    hours: "Seg-Sex 08:00-17:00",
    translations: {
      pt: {
        name: "SINE - Sistema Nacional de Emprego",
        description:
          "Intermediação de vagas, encaminhamento para entrevistas e habilitação do seguro-desemprego.",
      },
      es: {
        name: "SINE - Sistema Nacional de Empleo",
        description:
          "Intermediación de vacantes, derivación a entrevistas y solicitud de seguro de desempleo.",
      },
    },
  },
  {
    id: "plac-ufsc",
    categorySlug: "educacao",
    email: "plac.ufsc@gmail.com",
    website: "https://plac.paginas.ufsc.br",
    translations: {
      pt: {
        name: "PLAc UFSC - Português como Língua de Acolhimento",
        description:
          "Cursos gratuitos de português para imigrantes e refugiados oferecidos pela UFSC.",
      },
      es: {
        name: "PLAc UFSC - Portugués como Lengua de Acogida",
        description:
          "Cursos gratuitos de portugués para inmigrantes y refugiados ofrecidos por la UFSC.",
      },
    },
  },
  {
    id: "defensoria-publica-uniao",
    categorySlug: "emergencias",
    phone: "(48) 3251-7400",
    address: "Rua Paschoal Apóstolo Pítsica, 4863 - Agronômica, Florianópolis - SC",
    website: "https://www.dpu.def.br",
    hours: "Seg-Sex 12:00-18:00",
    translations: {
      pt: {
        name: "Defensoria Pública da União",
        description:
          "Assistência jurídica gratuita, inclusive para migrantes e solicitantes de refúgio.",
      },
      es: {
        name: "Defensoría Pública de la Unión",
        description:
          "Asistencia jurídica gratuita, también para migrantes y solicitantes de refugio.",
      },
    },
  },
  {
    id: "samu-192",
    categorySlug: "emergencias",
    phone: "192",
    translations: {
      pt: {
        name: "SAMU - Emergência Médica",
        description: "Ambulância e emergência médica 24h. Ligação gratuita.",
      },
      es: {
        name: "SAMU - Emergencia Médica",
        description: "Ambulancia y emergencia médica 24h. Llamada gratuita.",
      },
    },
  },
  {
    id: "policia-militar-190",
    categorySlug: "emergencias",
    phone: "190",
    translations: {
      pt: {
        name: "Polícia Militar",
        description: "Emergência policial 24h. Ligação gratuita.",
      },
      es: {
        name: "Policía Militar",
        description: "Emergencia policial 24h. Llamada gratuita.",
      },
    },
  },
  {
    id: "bombeiros-193",
    categorySlug: "emergencias",
    phone: "193",
    translations: {
      pt: {
        name: "Corpo de Bombeiros",
        description: "Incêndios, resgates e emergências em geral. Ligação gratuita.",
      },
      es: {
        name: "Bomberos",
        description: "Incendios, rescates y emergencias en general. Llamada gratuita.",
      },
    },
  },
  {
    id: "disque-100",
    categorySlug: "emergencias",
    phone: "100",
    website: "https://www.gov.br/mdh/pt-br/disque100",
    translations: {
      pt: {
        name: "Disque 100 - Direitos Humanos",
        description:
          "Denúncias de violação de direitos humanos, incluindo xenofobia e discriminação contra imigrantes.",
      },
      es: {
        name: "Disque 100 - Derechos Humanos",
        description:
          "Denuncias de violación de derechos humanos, incluyendo xenofobia y discriminación contra inmigrantes.",
      },
    },
  },
];
