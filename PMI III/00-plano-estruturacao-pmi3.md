# Plano de Estruturação de Produto, Engenharia de Requisitos e Priorização — PMI III (Ecossistema Imigrantes Floripa)

Este plano técnico consolida a arquitetura de produto, o modelo de negócios, a engenharia de requisitos e a matriz de esforço e priorização do ecossistema **Imigrantes Floripa**, desenvolvido em parceria institucional entre o **UNICESUSC** e a organização **Círculos de Hospitalidade**. A estrutura segue rigorosamente os referenciais metodológicos de `to-do.md`: `01-BMC.pdf`, `02-prioriazacao.pdf`, `03-transformando-BMC-em-requisitos.pdf`, `04-elicitacao-requisitos.pdf`, `05-doc-requisitos-de-software.pdf`, `06-revisão-requisitos-e-planejamento-scrum.pdf`, `Guia_Passo_a_Passo_N2_ADS31.pdf` e `Template RNF - ISO 25010.pdf`.

> [!IMPORTANT]
> **Decisões Arquiteturais e de Produto Consolidadas**:
> 1. **Parceria Institucional**: O projeto é conduzido exclusivamente pela parceria entre **UNICESUSC** e **Círculos de Hospitalidade**.
> 2. **Separação de Aplicações (Web vs. Mobile)**:
>    - **Portal Web (`imigrantes-floripa` — Nova Branch de Redesign)**: Canal de **Aquisição e Descoberta (Topo de Funil)**. Possui trilha de orientação em `/[locale]/orientacao` estruturada em formato **vertical contínuo indexável pelo Google** (SSR + JSON-LD), rota dedicada `/[locale]/blog` para estratégia de SEO/Keywords, vitrine de cursos gratuitos em `/[locale]/novidades`, contatos e mapa geolocalizado em `/[locale]/contatos` e `/[locale]/mapa`, e página institucional `/[locale]/sobre`.
>    - **Aplicativo Mobile (`App Imigrantes` — Android)**: Canal de **Retenção e Acompanhamento de Jornada**. Arquitetura **100% Firebase** (`Firebase Authentication` + `Cloud Firestore` com persistência nativa *Offline-First* + `Firebase Cloud Messaging - FCM`). Permite que o imigrante acesse seu checklist de documentos (*Meu Histórico*) mesmo sem conexão à internet dentro de órgãos públicos. Para análise demográfica da coleção `pesquisas` pela ONG e pela universidade, será implementado um script automatizado em Node.js/Python para exportação dos dados do Firestore em `CSV`/`JSON`.
> 3. **Design System Oficial (`HIP-Floripa`)**: Os blocos coloridos no FigJam são estritamente rascunhos estruturais de wireframe. Toda a interface Web e Mobile adotará os tokens oficiais extraídos do arquivo `HIP-Floripa`, com protagonismo da cor roxa institucional **`violet` (`#6E5594`)**.
> 4. **Fluxo de Construção no Figma**: A elaboração deste processo produzirá os documentos acadêmicos formais e entregará o **conteúdo estruturado e direcionamento técnico (briefing/payload)** para que o **Agente Especializado no Figma** construa os quadros visuais do BMC, da Matriz de Priorização, dos Diagramas e dos Protótipos diretamente no arquivo Figma.

---

## 0. Design System Oficial (`HIP-Floripa`)

Extraído via API do arquivo `HIP-Floripa` (`node-id=0:1` e `node-id=10:2`), descartando as cores provisórias de marcação do FigJam:

### 0.1. Tokens de Cor Oficiais

| Token (`HIP-Floripa`) | Papel no Ecossistema (Web & Mobile) | Hexadecimal | Diretriz de Aplicação |
| :--- | :--- | :--- | :--- |
| **`violet`** | **Brand Primary (Identidade Principal)** | `#6E5594` | Cor protagonista do projeto: cabeçalhos, navegação ativa, botões primários, destaques institucionais e Wordmark. |
| **`primary`** | **Functional Support (Serviços Práticos)** | `#2A4D9B` | Azul açoriano aplicado em seções práticas (documentação, transporte público, saúde e links de apoio). |
| **`warm`** | **Semantic Warning / Call-to-Action Crítico** | `#C56A3F` | Terracota aplicado em alertas de exigência de CPF, prazos legais, avisos financeiros/PIX e CTAs de atenção. |
| **`ink`** | **Text Primary (Tipografia Principal)** | `#1B2440` | Títulos, corpo de texto principal, rótulos de formulário e contraste escuro do Wordmark. |
| **`text-muted`** | **Text Secondary (Apoio e Bullets)** | `#5B6478` | Subtítulos, textos de apoio, listas de *bullets* em cards e metadados secundários. |
| **`paper`** | **Background Primary (Fundo Geral)** | `#FBF8F4` | Papel quente aplicado como fundo principal das páginas Web e telas Mobile. |
| **`card`** | **Surface / Card Background** | `#FFFFFF` | Superfície de cartões (`AppCard`, cards de cursos, containers de formulário). |
| **`secondary`** | **Surface Secondary (Slots e Containers)** | `#EAEEF6` | Fundo de *slots* de ícones (`icon-slot`), chips de filtro e agrupamentos secundários. |
| **`border`** | **Border / Divider Stroke** | `#DDE3EE` | Bordas sutis de cartões (`1px solid`), divisores de seção e contornos de campos de entrada. |

### 0.2. Tipografia e Geometria

* **Tipografia Padrão**: Família `Inter` (`400 Regular`, `600 SemiBold`, `700 Bold`).
  * **H1 / Display**: `36px` (`700`, `line-height: 43.6px`, `#6E5594` ou `#1B2440`).
  * **H2 / Seção**: `28px` (`700`, `line-height: 33.9px`, `#1B2440`).
  * **H3 / Card Title (`app-name`)**: `22px` (`600`, `line-height: 26.6px`, `#1B2440`).
  * **H4 / Componente**: `20px` (`700`, `line-height: 24.2px`, `#6E5594`).
  * **Subtítulo**: `18px` (`400`, `line-height: 21.8px`, `#5B6478`).
  * **Card Bullets (`bullets`)**: `17px` (`400`, `line-height: 28px`, `#5B6478`).
  * **Body**: `16px` (`400`, `line-height: 24px`, `#1B2440`).
  * **Caption / Token Label**: `12px` (`600`, `line-height: 14.5px`, `#1B2440`).
* **Raios de Borda (`border-radius`)**: `24px` (Cards principais), `18px` (`icon-slot`), `16px` (Ícones de apps e molduras de mídia), `12px` (Botões e *inputs*).

---

## Etapa 1: Consolidação de Ideia, Nicho, Problema, Proposta de Valor e Visão de Produto

### 1.1. Estrutura Base (Ideia, Nicho, Problema e Stakeholders)

1. **Ideia**: Ecossistema tecnológico composto por um **Portal Web** (focado em aquisição orgânica via SEO, triagem inicial e divulgação institucional) e um **Aplicativo Mobile Android** (focado no acompanhamento individualizado da jornada de documentação, locomoção, saúde, cursos gratuitos e empregabilidade), desenvolvido em parceria entre o **UNICESUSC** e a organização **Círculos de Hospitalidade**.
2. **Nicho e Personas**:
   * **Persona 1 — Imigrante Recém-Chegado**: Necessita de orientação primária em seu idioma (PT, ES, FR, EN) sobre documentos fundamentais (CPF, RNM), acesso ao SUS, transporte urbano e localização física de órgãos públicos e de acolhimento em Florianópolis.
   * **Persona 2 — Imigrante em Estabilização e Inserção Profissional**: Já possui conhecimento inicial sobre aplicativos `.gov.br`, mas enfrenta barreiras de letramento digital (gestão de senhas, e-mails, níveis de conta Prata/Ouro, CTPS Digital, Meu INSS), dificuldade na revalidação de diplomas estrangeiros e desconhecimento sobre cursos gratuitos (com e sem exigência de CPF) e vagas de emprego.
3. **Problema**:
   * Dispersão informacional e barreira linguística nos canais oficiais brasileiros.
   * Complexidade burocrática e operacional para gerenciar múltiplos portais e carteiras digitais governamentais (`.gov.br`).
   * Morosidade na revalidação de diplomas e dificuldade de acesso à qualificação profissional gratuita e recolocação no mercado de trabalho local.
4. **Stakeholders**:
   * **Círculos de Hospitalidade**: Parceiro social responsável pelo acolhimento presencial, apoio na revalidação de diplomas e validação prática das demandas da comunidade imigrante.
   * **UNICESUSC**: Instituição de ensino superior parceira por meio da curricularização da extensão universitária, promovendo impacto social direto na comunidade.
   * **Mateus Carpenter (Responsável Técnico e de Produto)**: Arquitetura, engenharia de requisitos, desenvolvimento full-stack/mobile e automação de rotinas do ecossistema.

### 1.2. Declaração Formal de Visão do Produto (Lean Inception)

> **Para** imigrantes recém-chegados ou residentes na Grande Florianópolis que enfrentam barreiras linguísticas, burocráticas e de letramento digital,
> **Cujo** desafio é regularizar sua documentação, operar aplicativos governamentais brasileiros e acessar cursos gratuitos e vagas de trabalho,
> **O** **Ecossistema Imigrantes Floripa (Portal Web + App Mobile)**
> **É uma** plataforma digital integrada de orientação cidadã, mapeamento geolocalizado de serviços e curadoria automatizada de capacitação e empregabilidade,
> **Que** atrai e orienta rapidamente o imigrante via Portal Web multilíngue otimizado para mecanismos de busca (SEO) e acompanha sua evolução individual via Aplicativo Mobile com checklist documental *offline-first*, alertas *push* de novas oportunidades (com e sem CPF) e coleta de dados comunitários,
> **Diferente de** portais governamentais fragmentados ou grupos informais sem verificação,
> **O nosso produto** oferece informação chancelada pela parceria UNICESUSC e Círculos de Hospitalidade, atualizada automaticamente por workflows de varredura e adaptada à jornada real do imigrante.

---

## Etapa 2: Consolidação do Business Model Canvas (BMC)

| Bloco do BMC | Conteúdo Consolidado para os Post-its do Figma | Escopo Tecnológico Relacionado |
| :--- | :--- | :--- |
| **1. Proposta de Valor** | - Acolhimento digital multilíngue (PT, ES, FR, EN) com informação verificada.<br>- Guias práticos de saúde, locomoção, documentação e uso de apps `.gov.br`.<br>- Curadoria automatizada de cursos gratuitos diferenciando opções **Sem CPF** (ex.: Microsoft Learn) e **Com CPF** (ex.: Fundação Bradesco, SENAC).<br>- Acompanhamento individual de progresso documental (*Meu Histórico* *offline-first* no App). | **Web**: Consulta aberta e indexável.<br>**App**: Persistência individual no Firestore e alertas ativos. |
| **2. Segmentos de Clientes** | - **Imigrantes Recém-Chegados**: Foco em documentação básica, saúde, transporte e localização.<br>- **Imigrantes em Busca de Capacitação e Emprego**: Foco em letramento digital, validação de diploma, cursos profissionalizantes e vagas.<br>- **Parceiros Institucionais (Círculos de Hospitalidade e UNICESUSC)**: Uso de dados demográficos para direcionar ações presenciais. | **Web & App**: Internacionalização (`i18n`) e filtros por perfil de necessidade. |
| **3. Canais** | - **Portal Web (`imigrantes-floripa`)**: Aquisição orgânica via Google Search (SEO), Blog (`/blog`), Sitemap e acesso imediato via navegador.<br>- **Aplicativo Mobile (Android)**: Acompanhamento contínuo da jornada no smartphone do imigrante.<br>- **Atendimento Presencial**: Oficinas e ações da ONG Círculos de Hospitalidade e UNICESUSC. | **Web**: Next.js (Vercel).<br>**App**: Aplicação Mobile Android integrada ao Firebase. |
| **4. Relacionamento com Clientes** | - **Portal Web**: Autoatendimento (*self-service*) rápido, transparente e sem barreira de login, apoiado por conteúdo educativo otimizado para SEO.<br>- **App Mobile**: Relacionamento personalizado mediante conta autenticada (*Meu Histórico*, salvamento da trilha, notificações *push* via FCM e *Formulário de Pesquisa/Sugestões*). | **Web**: Rotas estáticas/SSR.<br>**App**: Firebase Auth + Cloud Firestore + FCM. |
| **5. Fontes de Sustentabilidade** | - 100% gratuito para o usuário final (imigrante).<br>- Sustentado pela curricularização da extensão universitária (UNICESUSC) e horas de engenharia do responsável técnico (Mateus Carpenter).<br>- Potencial captação de editais públicos de impacto social e fomento filantrópico em conjunto com a ONG Círculos de Hospitalidade. | Operação arquitetada para custo zero nos limites do *Free Tier* (Vercel + Firebase Spark Plan + GitHub Actions). |
| **6. Recursos Principais** | - Base curada de guias (documentação, `.gov.br`, saúde, transporte) e contatos geolocalizados.<br>- Workflows automatizados no GitHub Actions (varredura de cursos, validação de links e futura rotina de vagas).<br>- Infraestrutura Cloud (Next.js, Firebase Auth/Firestore/FCM).<br>- Design System oficial `HIP-Floripa` (`#6E5594`). | Repositório Git, pipelines CI/CD e banco NoSQL Cloud Firestore. |
| **7. Atividades Principais** | - Desenvolvimento e manutenção evolutiva do Portal Web (nova branch) e do App Mobile.<br>- Execução periódica de bots de descoberta e verificação de oportunidades.<br>- Produção de conteúdo otimizado para SEO, branding, voz e personalidade.<br>- Coleta e exportação (`CSV`/`JSON`) de dados de pesquisa sobre imigrantes em Florianópolis. | Engenharia de Software (Sprints Scrum), curadoria de dados e automação. |
| **8. Parcerias Principais** | - **UNICESUSC**: Chancela acadêmica e extensão universitária.<br>- **Círculos de Hospitalidade**: Acolhimento social, revalidação de diplomas e validação de domínio.<br>- **Provedores de Cursos e Serviços Públicos**: SENAC, Fundação Bradesco, Microsoft Learn, SEBRAE, SINE, Prefeitura de Florianópolis e Polícia Federal. | Integração de catálogos públicos e encaminhamento institucional. |
| **9. Estrutura de Custos** | - **Cloud Computing & BaaS**: Hospedagem Web (Vercel) e backend Mobile (Firebase Auth, Firestore, FCM).<br>- **Automação (`JOBS`)**: Execução de *runners* no GitHub Actions para os bots de atualização.<br>- **Publicação e Domínio**: Registro de domínio web e taxa única de conta Google Play Console. | Monitoramento de cotas de leitura/escrita no Firestore e minutos de Actions. |

---

## Etapa 3: Matriz de Prioridade Integrada (Funcionalidades + Requisitos + Engenharia de Software)

| ID | Categoria / Escopo | Item de Backlog (Requisito ou Entregável de Engenharia) | RFs / RNFs Associados | MoSCoW | Quadrante 2x2 (Valor x Esforço) | Esforço (Fibonacci) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **E01** | **Engenharia de Requisitos (PMI III)** | Consolidação do BMC, Matriz de Priorização, Elicitação 5W1H e Documento ERS/SERS (`01` a `05` do `to-do.md`) | Todos os RFs e RNFs | **Must Have** | **Fazer Primeiro** | **3 pts** |
| **E02** | **Engenharia & Qualidade (PMI III)** | Revisão INVEST, Cenários BDD/Gherkin, RNFs ISO 25010 com ATAM e Planejamento Scrum (`06` e `08` do `to-do.md`) | RNF-001 a RNF-008 | **Must Have** | **Fazer Primeiro** | **5 pts** |
| **E03** | **Modelagem & Arquitetura (PMI III)** | Diagramas UML (Casos de Uso, Classes e Sequência), Modelagem NoSQL (Firestore) e Prototipação Navegável no Figma (`07` do `to-do.md`) | RF-W01..W05, RF-M01..M05 | **Must Have** | **Planejar com Cuidado** | **5 pts** |
| **F01** | **Automação / Backend** | Estabilização dos Bots de Cursos Gratuitos (Com/Sem CPF) e Validação de Contatos Oficiais | RF-B01, RNF-005 | **Must Have** | **Fazer Primeiro** | **2 pts** |
| **F02** | **Portal Web (Nova Branch)** | Redesign UI/UX com Design System Roxo (`#6E5594`) e Páginas Essenciais (`/portal`, `/novidades`, `/contatos`, `/mapa`, `/sobre`) | RF-W01, RF-W03, RF-W04, RF-W05 | **Must Have** | **Fazer Primeiro** | **5 pts** |
| **F03** | **Portal Web (Nova Branch)** | Trilha de Orientação Vertical Indexável pelo Google (`/orientacao`) com SSR e JSON-LD | RF-W02, RNF-001, RNF-003 | **Must Have** | **Fazer Primeiro** | **3 pts** |
| **F04** | **App Mobile (MVP Firebase)** | Autenticação (`Firebase Auth`) e Gestão de Perfil do Imigrante (`Cloud Firestore` + Security Rules) | RF-M01, RF-M02, RNF-002 | **Must Have** | **Planejar com Cuidado** | **5 pts** |
| **F05** | **App Mobile (MVP Firebase)** | Meu Histórico (Checklist Documental e Passos da Trilha) com Persistência Offline-First + Guias e Cursos no App | RF-M03, RF-M04, RNF-004 | **Must Have** | **Planejar com Cuidado** | **8 pts** |
| **F06** | **App Mobile & Dados** | Formulário de Pesquisa/Censo no App (`Cloud Firestore`) + Script de Exportação para `CSV`/`JSON` | RF-M05, RF-B02, RNF-007 | **Should Have** | **Fazer Primeiro / Ganhos Rápidos** | **3 pts** |
| **E04** | **Qualidade & Repositório** | Reestruturação da pasta `test/`, Organização de Scripts e Evidências de Testes (`Sprint 1` e `Sprint 2`) | RNF-005, RNF-008 | **Should Have** | **Fazer Primeiro** | **3 pts** |
| **F07** | **Portal Web (SEO & Conteúdo)** | Rota Dedicada `/[locale]/blog`, Sitemap, Estratégia de Keywords, Branding, Voz e Personalidade | RF-W06, RNF-001 | **Should Have** | **Planejar / Fazer Depois** | **5 pts** |
| **F08** | **App Mobile (Engajamento)** | Sistema de Notificações Push via `Firebase Cloud Messaging (FCM)` | RF-M06 | **Should Have** | **Planejar / Fazer Depois** | **5 pts** |
| **F09** | **Automação / App** | Rotina Automatizada (Bot) de Vagas de Emprego (`Trabalho`) | RF-B03, RF-M04 | **Could Have** | **Fazer se Sobrar Tempo** | **8 pts** |
| **F10** | **Subproduto Independente** | Aplicativo Educacional Gamificado de Tecnologia (Lógica, Hardware e Redes) | Fora do Escopo Imigrantes | **Won't Have** | **Postergar / Produto Separado** | **13+ pts** |
