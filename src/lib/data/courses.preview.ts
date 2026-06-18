import type { Course } from "./types";

/**
 * Conteúdo de exemplo para visualizar o layout da página Novidades enquanto
 * `courses.json` está vazio. NÃO é publicado: a página só usa estes itens em
 * ambiente de desenvolvimento e quando não há cursos reais publicados.
 *
 * Espelha a estrutura dos rascunhos em `bot/drafts/courses/*.json`. Quando o bot
 * promover cursos reais (via PR humano), `getPublishedCourses()` passa a ter
 * itens e estes exemplos deixam de aparecer.
 */
export const previewCourses: Course[] = [
  {
    id: "microsoft-learn-trilhas-tecnologia",
    slug: "microsoft-learn-trilhas-tecnologia",
    status: "published",
    categorySlug: "educacao",
    format: "online",
    isFree: true,
    url: "https://learn.microsoft.com/pt-br/training/browse/",
    sourceUrl: "https://learn.microsoft.com/pt-br/training/paths/ai-fluency/",
    verifiedAt: "2026-06-18",
    enrollmentStatus: "open",
    tags: [
      "trilha",
      "tecnologia",
      "gratuito",
      "online",
      "microsoft learn",
      "sem cpf",
      "multilíngue",
      "rotativo",
    ],
    translations: {
      pt: {
        title: "Roteiro: trilhas de tecnologia no Microsoft Learn (sem CPF)",
        summary:
          "Roteiros gratuitos oficiais da Microsoft. Cadastro com conta Microsoft (e-mail), sem CPF. Conteúdo em português, espanhol, inglês e mais de 60 idiomas. Trilhas em IA, programação, Power BI e GitHub.",
        institution: "Microsoft (Microsoft Learn, learn.microsoft.com)",
      },
      es: {
        title: "Ruta: trilhas de tecnología en Microsoft Learn (sin CPF)",
        summary:
          "Rutas gratuitas oficiales de Microsoft. Registro con cuenta Microsoft, sin CPF. Contenido multilingüe en IA, programación, Power BI y GitHub.",
        institution: "Microsoft (Microsoft Learn, learn.microsoft.com)",
      },
    },
  },
  {
    id: "ev-bradesco-trilhas-tecnologia",
    slug: "ev-bradesco-trilhas-tecnologia",
    status: "published",
    categorySlug: "educacao",
    format: "online",
    isFree: true,
    url: "https://www.ev.org.br/trilhas-de-conhecimento",
    sourceUrl: "https://www.ev.org.br/trilhas-de-conhecimento",
    verifiedAt: "2026-06-18",
    enrollmentStatus: "open",
    tags: ["trilha", "tecnologia", "gratuito", "online", "rotativo"],
    translations: {
      pt: {
        title: "Roteiro: trilhas de tecnologia na Escola Virtual Bradesco",
        summary:
          "Catálogo gratuito e 100% online da Fundação Bradesco, com trilhas em análise de dados, IA, programação, TI e mais. Ideal para quem busca qualificação digital com flexibilidade de horário — estude no seu ritmo e valide certificados no site oficial.",
        institution: "Fundação Bradesco — Escola Virtual (ev.org.br)",
      },
      es: {
        title: "Ruta: trilhas de tecnología en la Escuela Virtual Bradesco",
        summary:
          "Catálogo gratuito y 100% en línea de la Fundación Bradesco, con rutas en análisis de datos, IA, programación, TI y más. Ideal para quien busca formación digital flexible — estudia a tu ritmo y valida certificados en el sitio oficial.",
        institution: "Fundación Bradesco — Escuela Virtual (ev.org.br)",
      },
    },
  },
  {
    id: "plac-ufsc-portugues-imigrantes",
    slug: "plac-ufsc-portugues-imigrantes",
    status: "published",
    categorySlug: "educacao",
    format: "presencial",
    isFree: true,
    url: "https://plac.ufsc.br/",
    verifiedAt: "2026-06-17",
    enrollmentStatus: "coming_soon",
    tags: ["português", "migrantes", "ufsc", "gratuito"],
    translations: {
      pt: {
        title: "PLAc — Português para imigrantes e refugiados (UFSC)",
        summary:
          "Curso gratuito de português voltado a migrantes e refugiados. Foco em comunicação do dia a dia no Brasil.",
        institution: "UFSC — Programa de Línguas e Assimilação Cultural (PLAc)",
      },
      es: {
        title: "PLAc — Portugués para inmigrantes y refugiados (UFSC)",
        summary:
          "Curso gratuito de portugués para migrantes y refugiados. Enfoque en la comunicación cotidiana en Brasil.",
        institution: "UFSC — Programa de Línguas e Assimilação Cultural (PLAc)",
      },
    },
  },
  {
    id: "senac-sc-130206",
    slug: "senac-sc-130206",
    status: "published",
    categorySlug: "educacao",
    format: "presencial",
    isFree: true,
    url: "https://portal.sc.senac.br/curso/130206/palhoca/transformacao-digital-com-inteligencia-artificial",
    sourceUrl: "https://portal.sc.senac.br/cursos-gratuitos",
    verifiedAt: "2026-06-18",
    enrollmentStatus: "open",
    tags: ["senac", "gratuito", "presencial", "tecnologia"],
    translations: {
      pt: {
        title: "Transformação Digital com Inteligência Artificial",
        summary:
          "Aplique inteligência artificial para impulsionar a transformação digital em empresas e organizações. Para quem quer entender e integrar IA em processos de negócio, melhorando eficiência e inovação.",
        institution: "SENAC SC — Palhoça",
      },
      es: {
        title: "Transformación digital con inteligencia artificial",
        summary:
          "Aplica inteligencia artificial para impulsar la transformación digital en empresas y organizaciones. (Información completa en portugués en el sitio oficial.)",
        institution: "SENAC SC — Palhoça",
      },
    },
  },
];
