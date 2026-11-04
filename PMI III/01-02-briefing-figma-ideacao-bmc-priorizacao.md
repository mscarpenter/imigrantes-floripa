# Briefing Técnico e Conteúdo Consolidado para o Agente do Figma (Ideação, BMC e Matriz de Priorização)

- **Projeto**: Ecossistema Imigrantes Floripa (Portal Web + Aplicativo Mobile Android)
- **Parceria Institucional**: UNICESUSC e Círculos de Hospitalidade
- **Responsável Técnico e de Produto**: Mateus Carpenter
- **Arquivo Figma Alvo**: `Projeto Imigrantes` (`fileKey: v6zp26CFVopsAUUyw5tIVx`, Página `Projeto Imigrantes - PMI III`, `node-id: 212:1885`)
- **Design System de Referência**: `HIP-Floripa` (`fileKey: 33yIdWdxUK2uc13Zipx7Xi`, `node-id: 0:1`)

---

## 1. Diretrizes Visuais para o Agente Especializado do Figma

Ao construir ou atualizar os quadros de **Ideação**, **Business Model Canvas (BMC)** e **Matriz de Priorização** no Figma/FigJam, o agente deve substituir os rascunhos preliminares pelas informações refinadas deste documento e aplicar rigorosamente os tokens de cor do Design System `HIP-Floripa`:

| Token Semântico | Código Hex | Aplicação nos Quadros e Post-its do Figma |
| :--- | :--- | :--- |
| **`violet` (Brand Primary)** | `#6E5594` | Cabeçalhos principais dos quadros (BMC, Matriz de Priorização, Visão de Produto) e cards de escopo **Ecossistema / Institucional**. |
| **`primary` (Azul Açoriano)** | `#2A4D9B` | Post-its e cards referentes especificamente ao **Portal Web (`imigrantes-floripa`)**. |
| **`warm` (Terracota)** | `#C56A3F` | Post-its e cards referentes a **Alertas Críticos, Restrições, Custos ou Ações Urgentes (Must Have)**. |
| **`ink` ( Azul Escuro)** | `#1B2440` | Tipografia principal, títulos de colunas e contornos estruturais de alta hierarquia. |
| **`text-muted`** | `#5B6478` | Subtítulos, legendas explicativas e metadados de pontuação (RICE / Story Points). |
| **`paper` (Papel Quente)** | `#FBF8F4` | Fundo principal das seções (`SECTION` / `FRAME` container). |
| **`card` (Superfície)** | `#FFFFFF` | Fundo das células internas do BMC e quadrantes da Matriz. |
| **`secondary`** | `#EAEEF6` | Fundo de cabeçalhos secundários, tags de categoria e post-its de **Engenharia de Software / Automação (Bots)**. |
| **`border`** | `#DDE3EE` | Linhas divisórias de tabelas e bordas de containers (`1px` ou `2px`). |

---

## 2. Conteúdo Refinado — Seção `Ideação` e `Visão de Produto (Lean Inception)`

*(Instrução para o Agente Figma: Substituir os textos de rascunho da seção `Ideação` (`id: 215:2129`) pelos blocos estruturados e revisados abaixo).*

### 2.1. Os 4 Pilares Fundamentais da Ideação

#### Bloco 1: Ideia Central
- **Título**: Ecossistema Digital Imigrantes Floripa (Portal Web + App Mobile)
- **Texto Refinado**:
  Plataforma tecnológica integrada de acolhimento, orientação cidadã e empregabilidade para imigrantes na Grande Florianópolis, desenvolvida em parceria entre o **UNICESUSC** (extensão universitária) e a organização **Círculos de Hospitalidade**. Opera em arquitetura complementar:
  1. **Portal Web (`imigrantes-floripa`)**: Canal de aquisição orgânica (SEO, Blog, Sitemap), triagem rápida e divulgação institucional sem barreira de cadastro.
  2. **Aplicativo Mobile (`App Imigrantes` — Android)**: Assistente pessoal autenticado (`100% Firebase`) com acesso *offline-first* ao histórico documental, guias práticos, oportunidades de cursos/vagas e notificações *push*.

#### Bloco 2: Nicho e Personas
- **Título**: Segmentação do Público-Alvo (Imigrantes em Florianópolis)
- **Texto Refinado**:
  - **Persona 1 — Imigrante Recém-Chegado (Sobrevivência e Regularização)**: Busca orientação imediata em seu idioma nativo (PT, ES, FR, EN) para emissão de CPF e RNM, atendimento no SUS (Conecte SUS, Alô Saúde), uso do transporte coletivo (Floripa no Ponto) e localização física de órgãos públicos e ONGs.
  - **Persona 2 — Imigrante em Estabilização e Transição Laboral (Capacitação e Renda)**: Já possui conhecimento básico sobre aplicativos governamentais, mas enfrenta barreiras de letramento digital (gestão de contas `.gov.br` níveis Prata/Ouro, CTPS Digital, Meu INSS, organização de e-mails e senhas), morosidade na revalidação de diplomas e dificuldade para localizar cursos profissionalizantes gratuitos (com e sem exigência de CPF) e vagas de emprego.

#### Bloco 3: O Problema (Dores Validadas em Campo)
- **Título**: Barreiras Burocráticas, Linguísticas e de Empregabilidade
- **Texto Refinado**:
  1. **Dispersão e Complexidade Informacional**: Portais oficiais fragmentados, redigidos em português técnico/burocrático, levando à dependência de grupos informais de mensagens sujeitos à desinformação.
  2. **Fricção no Ecossistema Digital Brasileiro (`.gov.br`)**: Dificuldade técnica para administrar múltiplas credenciais, recuperar senhas e compreender requisitos de validação cadastral no `.gov.br`, CTPS Digital e Meu INSS.
  3. **Gargalo na Revalidação de Diplomas e Acesso a Cursos**: A validação de formação estrangeira é complexa (atuação direta do Círculos de Hospitalidade). Simultaneamente, o imigrante desconhece quais plataformas oferecem capacitação gratuita imediata **sem exigir CPF** (ex.: trilhas multilíngues do Microsoft Learn) e quais **exigem CPF** (ex.: Fundação Bradesco, SENAC).

#### Bloco 4: Proposta de Valor Única
- **Título**: Acolhimento Verificado, Automatizado e Orientado à Jornada
- **Texto Refinado**:
  Centralizar informações auditadas pela parceria **UNICESUSC** e **Círculos de Hospitalidade** em 4 idiomas, combinando um **Portal Web enxuto e indexável pelo Google** (para descoberta rápida) com um **Aplicativo Mobile Android Offline-First** que acompanha passo a passo a regularização documental do imigrante, filtra cursos gratuitos conforme seu estágio documental (Com/Sem CPF) e envia alertas ativos de novas oportunidades coletadas por robôs automatizados.

---

### 2.2. Template de Visão do Produto (Paulo Caroli — Lean Inception)

*(Instrução para o Agente Figma: Criar um Frame destacado ao lado dos 4 pilares na seção `Ideação` contendo a declaração formal abaixo).*

- **PARA**: Imigrantes recém-chegados ou residentes na Grande Florianópolis que enfrentam barreiras linguísticas, burocráticas e de letramento digital,
- **CUJO**: Desafio é regularizar sua documentação, operar aplicativos governamentais brasileiros (`.gov.br`) e acessar cursos gratuitos e vagas de trabalho sem cair em desinformação,
- **O**: **Ecossistema Imigrantes Floripa (Portal Web + App Mobile Android)**
- **É UMA**: Plataforma digital integrada de orientação cidadã, mapeamento geolocalizado de serviços e curadoria automatizada de capacitação e empregabilidade,
- **QUE**: Atrai e orienta rapidamente o imigrante via Portal Web multilíngue otimizado para buscas (SEO) e acompanha sua evolução individual via Aplicativo Mobile com checklist documental *offline-first*, alertas *push* de novas oportunidades (com e sem CPF) e censo comunitário,
- **DIFERENTE DE**: Portais governamentais fragmentados, buscas genéricas na internet ou grupos informais de WhatsApp sem curadoria,
- **O NOSSO PRODUTO**: Oferece informação verificada pela parceria UNICESUSC e Círculos de Hospitalidade, atualizada automaticamente por workflows de varredura e adaptada ao estágio documental de cada imigrante.

---

### 2.3. Matriz É / Não É / Faz / Não Faz

*(Instrução para o Agente Figma: Criar uma grade 2x2 abaixo da Visão do Produto na seção `Ideação`).*

| Quadrante | Itens Consolidados |
| :--- | :--- |
| **É** | 1. Um ecossistema tecnológico de extensão universitária em parceria entre UNICESUSC e Círculos de Hospitalidade.<br>2. Uma arquitetura dividida em Portal Web (aquisição orgânica/SEO e consulta rápida) e App Mobile Android (acompanhamento de jornada *offline-first*).<br>3. Um hub automatizado de cursos gratuitos (categorizados por exigência de CPF e idioma) e serviços geolocalizados. |
| **NÃO É** | 1. Um órgão governamental emissor de documentos oficiais (Polícia Federal, Receita Federal ou Ministério do Trabalho).<br>2. Uma plataforma própria de ensino a distância (LMS) hospedando videoaulas (o app educacional gamificado de tecnologia constitui outro produto independente).<br>3. Um substituto ao atendimento jurídico e presencial realizado pela ONG Círculos de Hospitalidade. |
| **FAZ** | 1. Orienta passo a passo sobre documentação, saúde, transporte e uso de aplicativos `.gov.br` em 4 idiomas (`pt`, `es`, `fr`, `en`).<br>2. Permite salvar o progresso individual na trilha de orientação e gerenciar o checklist de documentos (*Meu Histórico*) mesmo sem internet no App.<br>3. Executa bots semanais via GitHub Actions para descobrir cursos e validar contatos, notificando usuários via *Push* (FCM).<br>4. Coleta dados demográficos via formulário de pesquisa no Firestore com exportação `CSV`/`JSON` para análise acadêmica e social. |
| **NÃO FAZ** | 1. Não cobra taxas, assinaturas ou valores de intermediação dos imigrantes.<br>2. Não coleta nem armazena senhas bancárias ou credenciais governamentais (`.gov.br`) dos usuários.<br>3. Não sobrecarrega o Portal Web com gerenciamento de sessão complexa, preservando sua leveza e indexabilidade para SEO. |

---

## 3. Conteúdo Refinado — Seção `Business Model Canvas (BMC)`

*(Instrução para o Agente Figma: Na seção `BMC` (`id: 246:2566`), manter a estrutura clássica dos 9 blocos do Business Model Canvas e substituir/preencher os post-its internos com os itens refinados abaixo, utilizando legenda de cores por escopo: `#6E5594` para Ecossistema Geral, `#2A4D9B` para Portal Web e `#EAEEF6`/`#1B2440` para App Mobile e Automação).*

### Bloco 1: Segmentos de Clientes (`Pra quem?`)
- **[Post-it 1 — Persona Primária]**: **Imigrantes Recém-Chegados em Florianópolis** — Demandam orientação imediata em múltiplos idiomas sobre CPF, RNM, SUS, transporte coletivo e localização de serviços essenciais.
- **[Post-it 2 — Persona Secundária]**: **Imigrantes em Estabilização e Transição Profissional** — Já operam recursos básicos do `.gov.br`, mas necessitam de letramento digital avançado, revalidação de diploma, cursos gratuitos (Com/Sem CPF) e inserção no mercado de trabalho.
- **[Post-it 3 — Stakeholders Institucionais]**: **Círculos de Hospitalidade e UNICESUSC** — Utilizam o ecossistema para desafogar a triagem presencial repetitiva e obter indicadores demográficos reais da comunidade imigrante.

### Bloco 2: Proposta de Valor (`O quê?`)
- **[Post-it 1 — Institucional]**: **Extensão Universitária Aplicada** — Transformar conhecimento acadêmico e tecnológico em desenvolvimento humano, recepção digna e autonomia cidadã.
- **[Post-it 2 — Ecossistema]**: **Guias Práticos Multilíngues (`PT`, `ES`, `FR`, `EN`)** — Passo a passo claro sobre documentação, saúde, locomoção e administração de contas `.gov.br`, CTPS Digital e Meu INSS.
- **[Post-it 3 — Ecossistema]**: **Curadoria Inteligente de Capacitação** — Mapeamento automatizado de cursos gratuitos distinguindo trilhas **Sem CPF / Multilíngues** (ex.: Microsoft Learn) e **Com CPF** (ex.: Fundação Bradesco, SENAC).
- **[Post-it 4 — App Mobile]**: **Gestão Pessoal da Jornada (*Offline-First*)** — Checklist documental (*Meu Histórico*) e acompanhamento da trilha de orientação acessíveis mesmo sem internet dentro de órgãos públicos.

### Bloco 3: Canais (`Pra quem?`)
- **[Post-it 1 — Web]**: **Portal Web Responsivo (`imigrantes-floripa`)** — Topo de funil otimizado para mecanismos de busca (Google SEO), com páginas de consulta rápida (`/portal`, `/orientacao`, `/novidades`, `/blog`, `/contatos`, `/mapa`, `/sobre`).
- **[Post-it 2 — Mobile]**: **Aplicativo Mobile Android (`App Imigrantes`)** — Canal de retenção e uso cotidiano instalado no dispositivo móvel do imigrante.
- **[Post-it 3 — Presencial]**: **Ações de Extensão e Acolhimento Presencial** — Oficinas, apresentações e atendimentos conduzidos pelo UNICESUSC e pela ONG Círculos de Hospitalidade.

### Bloco 4: Relacionamento com Clientes (`Pra quem?`)
- **[Post-it 1 — Web (Aquisição)]**: **Autoatendimento (*Self-Service*) e Conteúdo SEO** — Navegação aberta sem barreira de login, trilha indexável pelo Google, Blog educativo (`/blog`), Sitemap e Keywords estratégicas.
- **[Post-it 2 — App Mobile (Retenção)]**: **Acompanhamento Personalizado Autenticado** — Conta individual (`Firebase Auth`), persistência de progresso (*Meu Histórico*) e alertas ativos de novas oportunidades via *Push Notifications* (`FCM`).
- **[Post-it 3 — Escuta Ativa]**: **Pesquisa Comunitária e Canal de Sugestões** — Formulário integrado para mapeamento contínuo das necessidades dos imigrantes em Florianópolis.

### Bloco 5: Fontes de Receita / Sustentabilidade (`Quanto?`)
- **[Post-it 1 — Gratuidade Social]**: **Acesso 100% Gratuito para Imigrantes** — Produto de impacto social sem cobrança de licenças, taxas ou mensalidades aos usuários finais.
- **[Post-it 2 — Capital Intelectual]**: **Curricularização da Extensão Universitária (UNICESUSC)** — Desenvolvimento técnico e gestão de produto conduzidos academicamente por Mateus Carpenter.
- **[Post-it 3 — Fomento Institucional]**: **Editais de Impacto Social e Parcerias Filantrópicas** — Captação institucional vinculada às ações da ONG Círculos de Hospitalidade e programas universitários.

### Bloco 6: Recursos Principais (`Como?`)
- **[Post-it 1 — Base de Dados]**: **Acervo Curado e Base Geolocalizada** — Guias práticos validados, catálogo de cursos gratuitos e mapeamento geográfico de órgãos públicos e ONGs em Florianópolis.
- **[Post-it 2 — Automação]**: **Pipelines de Descoberta e Monitoramento (GitHub Actions)** — Bots semanais de varredura de cursos, verificação de integridade de links (`.gov.br`) e auditoria automatizada.
- **[Post-it 3 — Arquitetura Tecnológica]**: **Stack Web (Next.js) + Stack Mobile (Android + 100% Firebase)** — Infraestrutura serverless/BaaS com `Firebase Auth`, `Cloud Firestore` (*Offline-First*) e `FCM`.
- **[Post-it 4 — Identidade Visual]**: **Design System `HIP-Floripa`** — Paleta oficial liderada pelo roxo institucional (`#6E5594`), tipografia `Inter` e componentes padronizados.

### Bloco 7: Atividades Principais (`Como?`)
- **[Post-it 1 — Engenharia de Software]**: **Desenvolvimento Web (Redesign em Nova Branch) e Mobile (MVP Android)** — Construção evolutiva guiada por Sprints Scrum e engenharia de requisitos.
- **[Post-it 2 — Operação de Bots]**: **Curadoria e Promoção de Oportunidades** — Execução dos workflows de coleta de cursos gratuitos, validação de contatos e futura rotina de vagas de emprego.
- **[Post-it 3 — Inteligência de Dados]**: **Pesquisa Demográfica e Exportação Analítica** — Coleta de respostas na coleção `pesquisas` do Firestore e exportação via script (`CSV`/`JSON`) para a ONG e universidade.
- **[Post-it 4 — Comunicação e SEO]**: **Desenvolvimento de Conteúdo, Branding, Voz e SEO** — Produção editorial para o Blog e otimização de indexabilidade orgânica.

### Bloco 8: Parcerias Principais (`Como?`)
- **[Post-it 1 — Parceiro Social]**: **Círculos de Hospitalidade** — Acolhimento direto, assessoria em revalidação de diplomas, validação das dores reais e coautoria institucional.
- **[Post-it 2 — Parceiro Acadêmico]**: **UNICESUSC** — Chancela universitária, orientação metodológica (PMI III) e articulação comunitária.
- **[Post-it 3 — Rede de Capacitação e Serviços]**: **Instituições Formadoras e Órgãos Públicos** — SENAC, Fundação Bradesco, Microsoft Learn, SEBRAE, SINE, Prefeitura de Florianópolis e Polícia Federal.

### Bloco 9: Estrutura de Custos (`Quanto?`)
- **[Post-it 1 — Cloud Computing & BaaS]**: **Hospedagem e Banco de Dados em Nuvem** — Operação dimensionada dentro das cotas gratuitas (*Free Tier*) da Vercel (Web) e do Firebase Spark Plan (`Auth`, `Firestore`, `FCM`).
- **[Post-it 2 — Automação (`JOBS`)]**: **Execução de Workflows CI/CD e Cron Jobs** — Consumo de minutos de *runners* no GitHub Actions para varredura semanal e testes automatizados.
- **[Post-it 3 — Distribuição]**: **Domínio Web e Publicação Mobile** — Manutenção de domínio institucional e taxa única de registro na Google Play Console.

---

## 4. Conteúdo Refinado — Seção `Priorização` (`node-id: 259:2417`)

*(Instrução para o Agente Figma: A seção `Priorização` (`id: 259:2417`) encontra-se vazia no board. O Agente deve construir dentro dela dois artefatos visuais lado a lado: **1. O Quadro Consolidado MoSCoW + Fibonacci + RICE** e **2. O Gráfico Visual de Quadrantes 2x2 (Valor x Esforço)**, contemplando tanto os pacotes de Engenharia de Requisitos/Modelagem quanto as funcionalidades do Portal Web, do App Mobile e dos Bots).*

### 4.1. Estrutura dos 4 Quadrantes para o Gráfico 2x2 no Figma (Valor x Esforço)

#### Quadrante Superior Esquerdo — FAZER PRIMEIRO (Alto Valor / Baixo a Médio Esforço — `Must Have` & `Should Have` Imediatos)
1. **[Card E01 | Engenharia — 3 pts | Must Have]**: Consolidação do BMC, Matriz de Priorização, Elicitação 5W1H e Especificação ERS/SERS (`01` a `05` do `to-do.md`).
2. **[Card E02 | Engenharia — 5 pts | Must Have]**: Revisão INVEST, Critérios Gherkin (BDD), RNFs ISO/IEC 25010 com Cenários ATAM e Planejamento Scrum (`06` e `08` do `to-do.md`).
3. **[Card F01 | Backend/Bots — 2 pts | Must Have]**: Estabilização dos Bots Semanais de Cursos Gratuitos (Com/Sem CPF) e Monitoramento de Contatos Oficiais.
4. **[Card F02 | Portal Web — 5 pts | Must Have]**: Redesign UI/UX na Nova Branch aplicando o Design System Roxo (`#6E5594`) nas rotas `/portal`, `/novidades`, `/contatos`, `/mapa` e `/sobre`.
5. **[Card F03 | Portal Web — 3 pts | Must Have]**: Trilha de Orientação Vertical Contínua Indexável pelo Google (`/orientacao`) com SSR e JSON-LD.
6. **[Card F06 | App & Dados — 3 pts | Should Have]**: Formulário de Pesquisa/Censo no App (`Cloud Firestore`) + Script Node.js/Python de Exportação para `CSV`/`JSON`.
7. **[Card E04 | Qualidade/Repo — 3 pts | Should Have]**: Organização de Scripts, Reestruturação da suíte `test/` e Registro de Evidências de Testes (`Sprint 1` e `Sprint 2`).

#### Quadrante Superior Direito — PLANEJAR COM CUIDADO (Alto Valor / Médio a Alto Esforço — `Must Have` & `Should Have` Estruturais)
1. **[Card E03 | Modelagem & UX — 5 pts | Must Have]**: Diagramas UML (Casos de Uso, Classes, Sequência), Modelagem NoSQL (`Firestore`) e Protótipo Navegável no Figma (`07` do `to-do.md`).
2. **[Card F04 | App Mobile — 5 pts | Must Have]**: Autenticação (`Firebase Auth`) e Gestão de Perfil do Imigrante (`Cloud Firestore` + Security Rules LGPD).
3. **[Card F05 | App Mobile — 8 pts | Must Have]**: *Meu Histórico* (Checklist Documental e Passos da Trilha) com Persistência *Offline-First* + Guias Práticos e Catálogo de Cursos no App.
4. **[Card F07 | Portal Web SEO — 5 pts | Should Have]**: Rota Dedicada `/[locale]/blog`, Sitemap, Estratégia de Keywords, Branding, Voz e Personalidade *(Importante, mas Não Urgente)*.
5. **[Card F08 | App Mobile — 5 pts | Should Have]**: Sistema de Notificações Push via `Firebase Cloud Messaging (FCM)` para Alertas de Novos Cursos e Oportunidades.

#### Quadrante Inferior Direito — REAVALIAR / SEGUNDA ONDA (Médio Valor / Alto Esforço — `Could Have`)
1. **[Card F09 | Automação & App — 8 pts | Could Have]**: Rotina Automatizada (Bot) de Varredura e Atualização de Vagas de Emprego (`Trabalho`).

#### Quadrante Inferior Esquerdo — DESACOPLAR / FORA DO ESCOPO ATUAL (Alto Esforço — `Won't Have neste Ciclo`)
1. **[Card F10 | Subproduto Independente — 13+ pts (Épico) | Won't Have]**: Aplicativo Educacional Gamificado de Tecnologia (Hardware, Redes e Lógica de Programação) — *Desenvolvido como produto separado*.

---

### 4.2. Tabela de Pontuação Técnica Completa (MoSCoW + Fibonacci + RICE)

| ID | Escopo | Entrega / Funcionalidade | Requisitos | MoSCoW | Fibonacci | RICE `(R x I x C) / E` | Ordem de Execução |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **E01** | Engenharia (PMI III) | BMC, Matriz, Elicitação 5W1H e ERS/SERS | Base Geral | **Must Have** | 3 pts | `(100 x 3 x 1.0) / 1.5 = 200` | Fase 1 (Documentação) |
| **E02** | Engenharia (PMI III) | INVEST, Gherkin, RNFs ISO 25010, ATAM e Scrum | RNF-001..008 | **Must Have** | 5 pts | `(100 x 3 x 1.0) / 2.0 = 150` | Fase 1 (Documentação) |
| **E03** | Modelagem & Figma | Diagramas UML, Schema Firestore e Protótipo | RF-W/M | **Must Have** | 5 pts | `(100 x 3 x 0.9) / 2.5 = 108` | Fase 1 (Modelagem) |
| **F01** | Backend / Bots | Bots de Cursos (Com/Sem CPF) e Contatos | RF-B01 | **Must Have** | 2 pts | `(100 x 3 x 1.0) / 1.0 = 300` | Concluído / Mantido |
| **F02** | Portal Web | Redesign Roxo (`#6E5594`) e Rotas Base | RF-W01, W03..05 | **Must Have** | 5 pts | `(100 x 3 x 1.0) / 2.0 = 150` | Sprint 1 (Web Branch) |
| **F03** | Portal Web | Trilha `/orientacao` Vertical Indexável (SSR) | RF-W02 | **Must Have** | 3 pts | `(95 x 3 x 1.0) / 1.5 = 190` | Sprint 1 (Web Branch) |
| **E04** | Qualidade & Testes | Organização de Scripts, `test/` e Evidências | RNF-005, 008 | **Should Have** | 3 pts | `(85 x 2 x 1.0) / 1.5 = 113` | Sprint 1 & Sprint 2 |
| **F04** | App Mobile (MVP) | `Firebase Auth`, Perfil e Security Rules | RF-M01, M02 | **Must Have** | 5 pts | `(80 x 3 x 0.9) / 2.5 = 86.4` | Sprint 1 / Sprint 2 (App) |
| **F05** | App Mobile (MVP) | *Meu Histórico* *Offline-First* + Guias e Cursos | RF-M03, M04 | **Must Have** | 8 pts | `(85 x 3 x 0.9) / 3.0 = 76.5` | Sprint 2 (App) |
| **F06** | App Mobile & Dados | Formulário Pesquisa (`Firestore`) + Export CSV | RF-M05, B02 | **Should Have** | 3 pts | `(75 x 2 x 1.0) / 1.5 = 100` | Sprint 2 (App & Script) |
| **F07** | Portal Web (SEO) | Rota `/blog`, Sitemap, Branding, Voz e SEO | RF-W06 | **Should Have** | 5 pts | `(120 x 2 x 0.8) / 3.0 = 64` | Pós-Núcleo (Planejado) |
| **F08** | App Mobile | Notificações Push via `FCM` | RF-M06 | **Should Have** | 5 pts | `(70 x 2 x 0.8) / 3.0 = 37.3` | Pós-Núcleo (Planejado) |
| **F09** | Backend & App | Bot de Atualização de Vagas de Emprego | RF-B03 | **Could Have** | 8 pts | `(70 x 2 x 0.7) / 4.0 = 24.5` | Evolução / Backlog Futuro |
| **F10** | Subproduto Tech | App Educacional Gamificado de Tecnologia | Independente | **Won't Have** | 13+ pts | `(60 x 2 x 0.6) / 8.0 = 9.0` | Produto Separado |

