import type { Locale } from "@/i18n/config";

export interface MicrosoftLearnHighlight {
  title: string;
  subtitle: string;
  body: string;
  routesCta: string;
  enrollCta: string;
  enrollUrl: string;
  noCpfBadge: string;
  multilingualBadge: string;
}

/** Slug do post no blog: guia completo das rotas Microsoft Learn. */
export const MICROSOFT_LEARN_POST_SLUG =
  "cursos-gratuitos-microsoft-learn-sem-cpf";

const HIGHLIGHT_BY_LOCALE: Record<
  Locale,
  Omit<MicrosoftLearnHighlight, "enrollUrl">
> = {
  pt: {
    title: "Aprenda tecnologia de graça, sem CPF",
    subtitle: "Microsoft Learn: centenas de roteiros, vários idiomas",
    body: "O Microsoft Learn oferece cursos gratuitos de inteligência artificial, programação, Excel, Power BI e GitHub. Basta uma conta Microsoft (e-mail), sem CPF. O conteúdo está disponível em português, espanhol, inglês, francês e mais de 60 idiomas. Montamos 5 rotas de acordo com o seu objetivo.",
    routesCta: "Ver as rotas",
    enrollCta: "Criar conta no Learn",
    noCpfBadge: "Sem CPF",
    multilingualBadge: "Multilíngue",
  },
  es: {
    title: "Aprende tecnología gratis, sin CPF",
    subtitle: "Microsoft Learn: cientos de rutas, varios idiomas",
    body: "Microsoft Learn ofrece cursos gratuitos de inteligencia artificial, programación, Excel, Power BI y GitHub. Solo necesitas una cuenta Microsoft (correo), sin CPF. El contenido está en español, portugués, inglés, francés y más de 60 idiomas. Preparamos 5 rutas según tu objetivo.",
    routesCta: "Ver las rutas",
    enrollCta: "Crear cuenta en Learn",
    noCpfBadge: "Sin CPF",
    multilingualBadge: "Multilingüe",
  },
  en: {
    title: "Learn tech for free, no CPF required",
    subtitle: "Microsoft Learn: hundreds of paths, many languages",
    body: "Microsoft Learn offers free courses on AI, programming, Excel, Power BI, and GitHub. You only need a Microsoft account (email), no Brazilian tax ID. Content is available in English, Portuguese, Spanish, French, and 60+ more languages. We mapped 5 learning routes by goal.",
    routesCta: "See the routes",
    enrollCta: "Create Learn account",
    noCpfBadge: "No CPF",
    multilingualBadge: "Multilingual",
  },
  fr: {
    title: "Apprenez la tech gratuitement, sans CPF",
    subtitle: "Microsoft Learn: centaines de parcours, plusieurs langues",
    body: "Microsoft Learn propose des cours gratuits sur l'IA, la programmation, Excel, Power BI et GitHub. Il suffit d'un compte Microsoft (e-mail), sans CPF. Contenu disponible en français, portugais, espagnol, anglais et plus de 60 langues. Nous avons préparé 5 parcours selon votre objectif.",
    routesCta: "Voir les parcours",
    enrollCta: "Créer un compte Learn",
    noCpfBadge: "Sans CPF",
    multilingualBadge: "Multilingue",
  },
};

export function getMicrosoftLearnHighlight(locale: Locale): MicrosoftLearnHighlight {
  const copy = HIGHLIGHT_BY_LOCALE[locale] ?? HIGHLIGHT_BY_LOCALE.pt;
  const localePrefix =
    locale === "es"
      ? "es-es"
      : locale === "fr"
        ? "fr-fr"
        : locale === "en"
          ? "en-us"
          : "pt-br";
  return {
    ...copy,
    enrollUrl: `https://learn.microsoft.com/${localePrefix}/`,
  };
}

const GUIDE_BODY_PT = `
O [Microsoft Learn](https://learn.microsoft.com/pt-br/) é a plataforma oficial de treinamento gratuito da Microsoft. Você estuda no seu ritmo, acompanha o progresso no perfil e pode escolher o idioma da interface e de boa parte do conteúdo: **português, espanhol, inglês, francês** e mais de 60 opções.

## Por que esta rota importa para imigrantes

Muitas plataformas brasileiras, incluindo a [Escola Virtual Bradesco]({{evBradescoHref}}), exigem **CPF** para criar conta. Se você ainda não tem esse documento, o Microsoft Learn é uma alternativa imediata: basta uma **conta Microsoft** (qualquer e-mail).

| | Microsoft Learn | Escola Virtual Bradesco |
| --- | --- | --- |
| Custo | Gratuito | Gratuito |
| Cadastro | Conta Microsoft (e-mail) | Conta EV (**exige CPF**) |
| Idiomas | 65+ locales | Português (Brasil) |
| Certificado | Troféus no perfil Learn; exames pagos à parte | Certificado gratuito na EV |

Quando tiver CPF, vale combinar as duas plataformas.

## Como trocar o idioma

1. Abra [learn.microsoft.com](https://learn.microsoft.com/pt-br/).
2. Role até o **rodapé** e clique no seletor de idioma.
3. Escolha **Português (Brasil)**, **Español**, **English** ou outro.
4. A URL muda (ex.: \`/es-es/\` para espanhol). Seu progresso no perfil Learn é o mesmo.

> Nem todo módulo está traduzido. Quando não houver versão no seu idioma, a interface continua traduzida e o conteúdo pode aparecer em inglês.

## Como se inscrever

1. Acesse [learn.microsoft.com](https://learn.microsoft.com/pt-br/) e clique em **Entrar**.
2. Entre com uma conta Microsoft pessoal (Outlook, Hotmail ou crie uma com qualquer e-mail).
3. Na primeira vez, configure o **perfil Learn** (campos fiscais são opcionais; **CPF não é pedido**).
4. Escolha uma rota abaixo, abra o roteiro e clique em **Iniciar** em cada módulo.

Fonte oficial sobre perfil: [Gerenciar perfil Learn](https://learn.microsoft.com/pt-br/training/support/learn-profile-manage).

## Rota A: IA e produtividade

**Para quem:** quer usar inteligência artificial no trabalho ou na busca de emprego, sem programar.

| Etapa | Roteiro | Carga | Link |
| --- | --- | --- | --- |
| 1 | Fluência de IA | 4 h 38 min | [learn.microsoft.com/.../ai-fluency](https://learn.microsoft.com/pt-br/training/paths/ai-fluency/) |
| 2 | Introdução ao Copilot no Microsoft 365 | 1 h 31 min | [learn.microsoft.com/.../get-started-with-microsoft-365-copilot](https://learn.microsoft.com/pt-br/training/paths/get-started-with-microsoft-365-copilot/) |
| 3 | Criar pedidos eficazes para Microsoft 365 Copilot | 2 h 10 min | [learn.microsoft.com/.../craft-effective-prompts-copilot-microsoft-365](https://learn.microsoft.com/pt-br/training/paths/craft-effective-prompts-copilot-microsoft-365/) |

A **Fluência de IA** inclui módulos sobre prompts, Copilot, IA responsável e um módulo de **produtividade e emprego**. Também existe em espanhol: [es-es/training/paths/ai-fluency](https://learn.microsoft.com/es-es/training/paths/ai-fluency/).

**Extensão:** módulo [Fundamentos da IA generativa](https://learn.microsoft.com/pt-br/training/modules/fundamentals-generative-ai/) (37 min).

## Rota B: Programação do zero

**Para quem:** nunca programou e quer aprender lógica e código.

A sequência **Introdução ao C#** tem seis partes (~33 h no total). Comece pela Parte 1; cada roteiro linka a próxima.

| Etapa | Roteiro | Carga | Link |
| --- | --- | --- | --- |
| 1 | Escreva seu primeiro código C# (Parte 1) | 4 h 37 min | [Parte 1](https://learn.microsoft.com/pt-br/training/paths/get-started-c-sharp-part-1/) |
| 2 | Apps de console C# (Parte 2) | 6 h 40 min | [Parte 2](https://learn.microsoft.com/pt-br/training/paths/get-started-c-sharp-part-2/) |
| 3 | C# Partes 3 a 6 | ~22 h | sequência no site |
| 4 | GitHub Copilot (parte 1) | 5 h 12 min | [path](https://learn.microsoft.com/pt-br/training/paths/copilot/) |
| 5 | GitHub Copilot (parte 2) | variável | [path](https://learn.microsoft.com/pt-br/training/paths/gh-copilot-2/) |

O GitHub Copilot ensina a programar com assistente de IA, competência transferível para editores como Cursor ou VS Code. Alguns módulos avançados podem exigir assinatura Copilot (há plano gratuito para perfis elegíveis).

## Rota C: Dados e relatórios

**Para quem:** quer trabalhar com planilhas, painéis e análise de dados.

| Etapa | Roteiro | Carga | Link |
| --- | --- | --- | --- |
| 1 | Introdução à análise de dados da Microsoft | 1 h 45 min | [path](https://learn.microsoft.com/pt-br/training/paths/data-analytics-microsoft/) |
| 2 | Preparar dados para análise com Power BI | intermediário | [path](https://learn.microsoft.com/pt-br/training/paths/prepare-data-power-bi/) |
| 3 | Hub Power BI (modelagem, visuais) | variável | [hub](https://learn.microsoft.com/pt-br/training/powerplatform/power-bi) |

## Rota D: Office e emprego

**Para quem:** precisa de Word, Excel, Outlook e Teams no mercado de trabalho.

| Etapa | Roteiro | Carga | Link |
| --- | --- | --- | --- |
| 1 | Credenciamento de Produtividade Microsoft 2026 | 1 h 3 min | [path](https://learn.microsoft.com/pt-br/training/paths/microsoft-productivity-accreditation-2025/) |
| 2 | Fluência de IA (módulo de emprego) | incluído na Rota A | [path](https://learn.microsoft.com/pt-br/training/paths/ai-fluency/) |

## Rota E: GitHub e colaboração

**Para quem:** quer entender controle de versão e trabalho em equipe com código.

| Etapa | Recurso | Link |
| --- | --- | --- |
| 1 | Hub GitHub Learn | [training/github](https://learn.microsoft.com/pt-br/training/github/) |
| 2 | GitHub Foundations (partes 1 e 2) | coleções no hub |
| 3 | Introdução ao Git e ao GitHub | módulos listados no hub |

## Limitações que vale saber

- **Certificações Microsoft** (AZ-900, PL-300, etc.) exigem exame **pago**; os roteiros Learn são preparatórios gratuitos.
- Nem todo conteúdo está traduzido; alguns módulos podem abrir em inglês.
- Laboratórios Azure gratuitos têm limites de tempo e uso.

## Depois do CPF

Quando regularizar documentos, veja também o guia da [Escola Virtual Bradesco]({{evBradescoHref}}): 61 cursos gratuitos com certificado em português, com forte reconhecimento no mercado brasileiro.
`.trim();

export function getMicrosoftLearnPostBody(locale: Locale = "pt"): string {
  const evBradescoHref = `/${locale}/blog/cursos-gratuitos-tecnologia-escola-virtual-bradesco`;
  return GUIDE_BODY_PT.replaceAll("{{evBradescoHref}}", evBradescoHref);
}

export function getMicrosoftLearnGuideMarkdown(locale: Locale): string | null {
  if (locale !== "pt") return null;
  return getMicrosoftLearnPostBody(locale);
}

export const microsoftLearnGuideTitle =
  "Cursos gratuitos no Microsoft Learn: por onde começar (sem CPF)";
