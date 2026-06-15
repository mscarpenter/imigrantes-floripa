import type { Contact } from "./types";

export const contacts: Contact[] = [
  {
    id: "policia-federal-floripa",
    categorySlug: "documentos",
    phone: "(48) 3281-6500",
    address:
      "Floripa Shopping (Loja 132) - Rod. SC-401, 3116, Saco Grande, Florianópolis - SC",
    lat: -27.554043,
    lng: -48.498529,
    website: "https://www.gov.br/pf/pt-br",
    hours: "Seg-Sex 10:00-17:00 (mediante agendamento)",
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
    address: "Rua Claudino Bento da Silva, 11 - Centro, Florianópolis - SC",
    lat: -27.594728,
    lng: -48.560605,
    website: "https://www.gov.br/receitafederal/pt-br",
    hours: "Seg-Sex 08:00-16:00 (mediante agendamento)",
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
    website: "https://www.pmf.sc.gov.br/entidades/semas/",
    hours: "Seg-Sex 08:00-18:00",
    translations: {
      pt: {
        name: "CRAS - Centros de Referência de Assistência Social",
        description:
          "Apoio social, Cadastro Único, Bolsa Família e orientação para famílias em situação de vulnerabilidade. Há 10 unidades em vários bairros. Procure a do seu território (lista no site da SEMAS); atendimento mediante agendamento.",
      },
      es: {
        name: "CRAS - Centros de Referencia de Asistencia Social",
        description:
          "Apoyo social, registro único (CadÚnico), Bolsa Família y orientación para familias en situación de vulnerabilidad. Hay 10 unidades en varios barrios. Busque la de su territorio (lista en el sitio de SEMAS); atención con cita previa.",
      },
    },
  },
  {
    id: "caritas-sc",
    categorySlug: "assistencia-social",
    phone: "(48) 3234-7033",
    email: "caritassc@caritas.org.br",
    address:
      "Casa de Direitos - Rua Antônio Mariano de Souza, 1135 - Ipiranga, São José - SC",
    lat: -27.564678,
    lng: -48.626107,
    website: "https://www.sc.caritas.org.br",
    hours: "Seg-Sex 13:30-18:00",
    translations: {
      pt: {
        name: "Cáritas Brasileira - Regional SC",
        description:
          "Atendimento a migrantes, refugiados e solicitantes de refúgio (parceira do ACNUR). Orientação sobre acesso a direitos e serviços públicos e encaminhamentos. Atendimento na Casa de Direitos, em São José.",
      },
      es: {
        name: "Cáritas Brasileña - Regional SC",
        description:
          "Atención a migrantes, refugiados y solicitantes de refugio (aliada del ACNUR). Orientación sobre acceso a derechos y servicios públicos y derivaciones. Atención en la Casa de Direitos, en São José.",
      },
    },
  },
  {
    id: "circulos-hospitalidade",
    categorySlug: "assistencia-social",
    whatsapp: "(48) 99638-0528",
    email: "contato@circulosdehospitalidade.org",
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
    id: "alo-saude-floripa",
    categorySlug: "saude",
    phone: "0800 333 3233",
    hours: "24 horas, todos os dias",
    translations: {
      pt: {
        name: "Alô Saúde Floripa (teleatendimento médico)",
        description:
          "Atendimento médico gratuito por telefone, 24h, pelo SUS. Triagem por enfermagem e teleconsulta médica por vídeo; receitas e atestados chegam por WhatsApp ou e-mail. Para moradores de Florianópolis com cadastro no SUS (pode ser feito na hora, durante a ligação).",
      },
      es: {
        name: "Alô Saúde Floripa (teleatención médica)",
        description:
          "Atención médica gratuita por teléfono, 24h, por el SUS. Triage por enfermería y teleconsulta médica por video; recetas y certificados llegan por WhatsApp o e-mail. Para residentes de Florianópolis con registro en el SUS (puede hacerse en el momento, durante la llamada).",
      },
    },
  },
  {
    id: "upa-sul",
    categorySlug: "saude",
    phone: "0800 000 4310",
    address:
      "MultiHospital - Av. Dep. Diomício Freitas, 3393 - Carianos, Florianópolis - SC",
    lat: -27.66495,
    lng: -48.544795,
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
    phone: "(48) 3112-1850",
    email: "cadastro@passerapido.com.br",
    address: "Av. Paulo Fontes, 701 - TICEN, Centro, Florianópolis - SC",
    lat: -27.59859,
    lng: -48.55382,
    website: "https://www.consorciofenix.com.br/passe-rapido",
    hours: "Seg-Sex 08:00-17:00 (venda de créditos no TICEN até 22h)",
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
    phone: "(48) 3664-0625",
    email: "florianopolis@sine.sc.gov.br",
    address:
      "Terminal Rita Maria (2º andar) - Av. Paulo Fontes, 1101, Centro, Florianópolis - SC",
    lat: -27.597167,
    lng: -48.558026,
    website: "https://www.gov.br/trabalho-e-emprego/pt-br",
    hours: "Seg-Sex 08:00-18:00",
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
    email: "neplac.ufsc@gmail.com",
    website: "https://neplac.paginas.ufsc.br",
    translations: {
      pt: {
        name: "NePLAc UFSC - Português como Língua de Acolhimento",
        description:
          "Cursos gratuitos de português para imigrantes e refugiados, pelo projeto Rodamundo do NePLAc/UFSC. Inscrições online por edital a cada semestre; aulas presenciais no campus Trindade.",
      },
      es: {
        name: "NePLAc UFSC - Portugués como Lengua de Acogida",
        description:
          "Cursos gratuitos de portugués para inmigrantes y refugiados, por el proyecto Rodamundo del NePLAc/UFSC. Inscripciones online por convocatoria cada semestre; clases presenciales en el campus Trindade.",
      },
    },
  },
  {
    id: "defensoria-publica-uniao",
    categorySlug: "emergencias",
    phone: "(48) 99937-0645",
    website: "https://www.dpu.def.br",
    hours: "Seg-Sex 09:00-17:00 (atendimento remoto)",
    translations: {
      pt: {
        name: "Defensoria Pública da União",
        description:
          "Assistência jurídica gratuita, inclusive para migrantes e solicitantes de refúgio. Atendimento remoto (sem posto físico em Floripa): agendamento pelo telefone/WhatsApp, pelo site (siage.dpu.def.br) ou pelo app DPU Cidadão.",
      },
      es: {
        name: "Defensoría Pública de la Unión",
        description:
          "Asistencia jurídica gratuita, también para migrantes y solicitantes de refugio. Atención remota (sin oficina física en Floripa): agendamiento por teléfono/WhatsApp, por el sitio (siage.dpu.def.br) o por la app DPU Cidadão.",
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
