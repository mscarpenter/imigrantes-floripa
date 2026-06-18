import type { Locale } from "@/i18n/config";

export interface EvBradescoHighlight {
  title: string;
  subtitle: string;
  body: string;
  routesCta: string;
  enrollCta: string;
  enrollUrl: string;
}

/** Slug do post no blog — guia completo das rotas EV Bradesco. */
export const EV_BRADESCO_POST_SLUG =
  "cursos-gratuitos-tecnologia-escola-virtual-bradesco";

/** Card rotativo — copy aprovada jun/2026 */
export const evBradescoHighlight: EvBradescoHighlight = {
  title: "Aprenda IA de graça, com certificado",
  subtitle: "Escola Virtual Bradesco, 61 cursos online",
  body: "A Escola Virtual da Fundação Bradesco oferece cursos gratuitos de inteligência artificial, programação, Excel e mais. Para quem quer começar pelo tema mais pedido no mercado hoje, a Rota A parte do FluêncIA (prompts e Copilot) e chega até GitHub e Azure, tudo sem custo. Montamos 5 rotas de acordo com o seu objetivo.",
  routesCta: "Ver as rotas",
  enrollCta: "Criar conta na EV",
  enrollUrl: "https://www.ev.org.br/",
};

const GUIDE_BODY_PT = `
A Escola Virtual da Fundação Bradesco ([ev.org.br](https://www.ev.org.br/)) oferece cursos online, gratuitos e com certificado nas áreas de tecnologia, inteligência artificial, programação, Excel e mais. O cadastro não tem custo e não exige escolaridade mínima. O certificado também é gratuito.

No catálogo atual há **61 cursos** organizados em **9 trilhas** e **5 áreas** de tecnologia. Para não se perder diante de tantas opções, montamos rotas sugeridas de acordo com o seu objetivo.

## Atenção: você precisa de CPF para se cadastrar

A Escola Virtual exige CPF para criar uma conta. Imigrantes sem CPF ainda não conseguem acessar a plataforma. O FAQ oficial informa que a expansão para estrangeiros está sendo estudada.

Se você ainda não tem CPF, regularize esse documento primeiro. Veja como no [módulo Documentos do HIP]({{docsModuleHref}}). Quem já tem CPF, seja por CRNM, CIE ou outro processo, acessa normalmente.

## Como escolher sua rota

Abaixo estão **5 rotas** pensadas para perfis diferentes. Você não precisa seguir a ordem à risca, mas a sequência ajuda, especialmente nas rotas de programação e dados, onde cada curso usa o que você aprendeu no anterior.

## Rota A: IA e ferramentas inteligentes

**Para quem:** quer entender e usar inteligência artificial no trabalho, sem precisar saber programar.

O ponto de partida é o **FluêncIA em Inteligência Artificial** ([verificar: carga horária — confirmar em ev.org.br/cursos/fluencia](https://www.ev.org.br/cursos/fluencia)). O curso é uma parceria com a Microsoft e cobre desde os fundamentos da IA generativa até como escrever bons prompts com Copilot e criar agentes no Copilot Studio.

| Etapa | Curso | Carga | Link |
| --- | --- | --- | --- |
| 1 | FluêncIA em Inteligência Artificial | [verificar] | [ev.org.br/cursos/fluencia](https://www.ev.org.br/cursos/fluencia) |
| 2 | Ética na Era da IA | 2h | [ev.org.br/cursos/etica_IA](https://www.ev.org.br/cursos/etica_IA) |
| 3 | IA para seu novo emprego | 2h | [ev.org.br/cursos/iaempregos](https://www.ev.org.br/cursos/iaempregos) |
| 4 | Soluções de IA no GitHub | 6h | [ev.org.br/cursos/github](https://www.ev.org.br/cursos/github) |
| 5 | AI-900: Fundamentos de IA no Azure | 16h | [ev.org.br/cursos/AI900Azure](https://www.ev.org.br/cursos/AI900Azure) |

O curso de GitHub (etapa 4) ensina a usar o Copilot dentro de um ambiente de desenvolvimento. É útil mesmo para quem não programa: mostra como ferramentas de IA funcionam em contextos de trabalho técnico.

A etapa 5 (AI-900) é opcional. É um preparatório para uma certificação Microsoft, mais técnico que os anteriores.

**Extensões por perfil:**

- **Educador** → IA para Educadores (4h): [ev.org.br/cursos/iaeduc](https://www.ev.org.br/cursos/iaeduc)
- **Estudante** → IA para Estudantes (4h): [ev.org.br/cursos/iaestudantes](https://www.ev.org.br/cursos/iaestudantes)
- **ONG ou grupo comunitário** → Trilha IA para Terceiro Setor (10h, 4 cursos): [trilha na EV](https://www.ev.org.br/trilhas-de-conhecimento/inteligencia-artificial-para-organizacoes-do-terceiro-setor)
- **Pequeno negócio** → IA para PMEs (4h): [ev.org.br/cursos/pmes](https://www.ev.org.br/cursos/pmes)

## Rota B: Programação do zero

**Para quem:** nunca programou e quer aprender a criar coisas com tecnologia.

Essa rota começa com lógica visual (Scratch) antes de partir para código de verdade. A sequência é importante: pular etapas torna o Python muito mais difícil.

| Etapa | Curso | Carga | Link |
| --- | --- | --- | --- |
| 1 | Fundamentos de TI: Hardware e Software | 7h | [ev.org.br](https://www.ev.org.br/cursos/fundamentos-de-ti-hardware-e-software) |
| 2 | Introdução ao Scratch | 6h | [ev.org.br](https://www.ev.org.br/cursos/introducao-ao-scratch-linguagem-de-programacao-na-computacao-criativa) |
| 3 | Scratch, extensões e computação física | 6h | [ev.org.br](https://www.ev.org.br/cursos/scratch-suas-extensoes-e-computacao-fisica) |
| 4 | Linguagem de Programação Python: Básico | [verificar: 18h ou 20h?] | [ev.org.br](https://www.ev.org.br/cursos/linguagem-de-programacao-python-basico) |
| 5 | Crie um site simples com HTML, CSS e JavaScript | 4h | [ev.org.br](https://www.ev.org.br/cursos/crie-um-site-simples-usando-html-css-e-javascript) |
| 6 | Soluções de IA no GitHub | 6h | [ev.org.br/cursos/github](https://www.ev.org.br/cursos/github) |

Scratch é uma linguagem de blocos usada mundialmente para ensinar lógica de programação. Parece simples, e é. Essa simplicidade é o ponto: você aprende a pensar como programador antes de lidar com sintaxe.

O Python (etapa 4) usa o ambiente PyCharm. O curso cobre lógica, variáveis, funções e estruturas básicas. Não é rápido, mas é a base para praticamente tudo em tecnologia hoje.

## Rota C: Dados e decisão

**Para quem:** quer trabalhar com análise de dados, relatórios ou vagas em administração e finanças.

| Etapa | Curso | Carga | Link |
| --- | --- | --- | --- |
| 1 | Excel na Prática | 16h | [ev.org.br](https://www.ev.org.br/cursos/excel-na-pratica) |
| 2 | Excel 2016: Intermediário | 20h | [trilha Excel 2016](https://www.ev.org.br/trilhas-de-conhecimento/excel-2016-do-basico-ao-avancado) |
| 3 | Excel 2016: Avançado | 30h | [trilha Excel 2016](https://www.ev.org.br/trilhas-de-conhecimento/excel-2016-do-basico-ao-avancado) |
| 4 | Introdução à Análise de Dados com Power BI | [verificar: 5h ou 12h?] | [ev.org.br](https://www.ev.org.br/cursos/introducao-a-analise-de-dados-microsoft-power-bi) |
| 5 | Análise de Dados no Power BI | 4h | [ev.org.br](https://www.ev.org.br/cursos/analise-de-dados-no-power-bi) |
| 6 | Administrando Banco de Dados | 15h | [ev.org.br](https://www.ev.org.br/cursos/administrando-banco-de-dados) |

As etapas 1 a 3 formam a trilha completa do Excel, que vai de tabelas básicas a macros e tabelas dinâmicas. Se você já usa Excel no trabalho, pode começar diretamente na etapa 2.

O Power BI (etapas 4 e 5) é a ferramenta da Microsoft para criar painéis e gráficos interativos. É muito pedida em vagas de analista e de gestão.

A etapa 6 (banco de dados) é opcional e mais técnica. Cobre SQL e modelagem de dados.

> **Atenção:** o catálogo mencionava uma trilha Power BI com 5 cursos. No levantamento atual aparecem 2 cursos ativos. [verificar no site se os demais módulos voltaram ao catálogo]

## Rota D: Produtividade Office para emprego

**Para quem:** precisa de Word, Excel e PowerPoint para trabalhar em escritório, atendimento ou administração.

Há três opções dependendo do tempo disponível:

- **Opção rápida — trilha Office na Prática (aprox. 48h):** Word, Excel e PowerPoint com foco em uso no mercado de trabalho. Três cursos de 16h cada. [ev.org.br/trilhas-de-conhecimento/office-na-pratica](https://www.ev.org.br/trilhas-de-conhecimento/office-na-pratica)
- **Opção colaboração remota — trilha Office 365 (aprox. 5h):** Outlook, OneDrive, OneNote, Planner e Teams. Cursos de 1h cada. O certificado emitido é de participação, não de avaliação formal. [ev.org.br/trilhas-de-conhecimento/office-365](https://www.ev.org.br/trilhas-de-conhecimento/office-365)
- **Opção completa — Pacote Office 2016 (aprox. 110h):** Oito cursos cobrindo Word, Excel e PowerPoint do básico ao avançado. [ev.org.br/trilhas-de-conhecimento/pacote-office-2016](https://www.ev.org.br/trilhas-de-conhecimento/pacote-office-2016)

Vale combinar qualquer dessas opções com **Comunicação Empresarial (12h)** e **Como Conseguir um Novo Emprego (10h)**.

> **Observação:** os cursos do Pacote Office 2016 mostram a interface da versão 2016. Os conceitos valem para versões mais recentes, mas a tela pode parecer diferente do Office que você usa no trabalho.

## Rota E: Empregabilidade (complementar a qualquer rota)

Esses cursos não ensinam tecnologia, mas ajudam a entrar no mercado de trabalho brasileiro. Funcionam bem combinados com qualquer uma das rotas anteriores.

| Curso | Carga | Link |
| --- | --- | --- |
| Desenvolvimento Profissional | 8h | área Desenvolvimento Pessoal e Profissional na EV |
| Como Conseguir um Novo Emprego | 10h | área Desenvolvimento Pessoal e Profissional na EV |
| IA para seu novo emprego | 2h | [ev.org.br/cursos/iaempregos](https://www.ev.org.br/cursos/iaempregos) |
| Postura e Imagem Profissional | 8h | área Desenvolvimento Pessoal e Profissional na EV |
| Atendimento ao Público | 10h | área Desenvolvimento Pessoal e Profissional na EV |
| Organização Pessoal | 10h | área Desenvolvimento Pessoal e Profissional na EV |

A trilha **Aprimoramento Profissional** (48h, 5 cursos) reúne a maioria desses temas em sequência curada. [ev.org.br/trilhas-de-conhecimento/aprimoramento-profissional](https://www.ev.org.br/trilhas-de-conhecimento/aprimoramento-profissional)

## Como se matricular

1. Acesse [ev.org.br](https://www.ev.org.br/) e clique em **Cadastrar**.
2. Preencha nome completo, CPF, data de nascimento e e-mail. Crie uma senha.
3. Confirme o cadastro pelo link que chega no seu e-mail.
4. Escolha uma rota acima, clique no curso e depois em **Quero me matricular**.
5. Estude no seu ritmo. Ao concluir e passar na avaliação final (nota mínima de 70%), baixe o certificado gratuito no seu painel.

**Prazo:** depois de se matricular, você tem **60 dias** para concluir o curso. Se o prazo vencer, é possível se rematricular no mesmo curso, se ele ainda estiver no catálogo.

**Idioma:** todos os cursos estão em português. Não há versão em espanhol na plataforma.

**Aplicativo:** a Escola Virtual não tem app. O acesso é pelo site ev.org.br, que funciona no celular.
`.trim();

export function getEvBradescoPostBody(locale: Locale = "pt"): string {
  const docsModuleHref = `/${locale}/modulo/documentos-essenciais`;
  return GUIDE_BODY_PT.replaceAll("{{docsModuleHref}}", docsModuleHref);
}

export function getEvBradescoGuideMarkdown(locale: Locale): string | null {
  if (locale !== "pt") return null;
  return getEvBradescoPostBody(locale);
}

export const evBradescoGuideTitle =
  "Cursos gratuitos de tecnologia na Escola Virtual Bradesco: por onde começar";
