# UNICESUSC — Análise e Desenvolvimento de Sistemas
## Atividade Prática: Elicitação e Especificação Inicial de Requisitos
### Transformando o Business Model Canvas em Requisitos de Software

---

## 1. Identificação e Controle do Documento

| Campo | Descrição |
| :--- | :--- |
| **Projeto / Produto** | Ecossistema Imigrantes Floripa (Portal Web + Aplicativo Mobile Android) |
| **Parceria Institucional** | UNICESUSC e Círculos de Hospitalidade |
| **Responsável Técnico** | Mateus Carpenter |
| **Professor Orientador** | Prof. Sérgio Murilo Schütz |
| **Disciplina** | Projeto Multidisciplinar Integrador III (PMI III) |
| **Data / Versão** | 04/11/2026 — Versão 1.0 |
| **Status** | Aprovado |

---

## 2. Visão Geral do Produto

### 2.1. Problema ou Oportunidade
Imigrantes recém-chegados ou residentes na Grande Florianópolis enfrentam severas barreiras linguísticas, burocráticas e de letramento digital para regularizar sua documentação no Brasil, administrar múltiplos aplicativos governamentais (`.gov.br`, CTPS Digital, Meu INSS, Conecte SUS), validar diplomas obtidos em seus países de origem e acessar cursos profissionalizantes gratuitos e vagas de emprego. Atualmente, as informações encontram-se dispersas em portais oficiais redigidos em português burocrático ou fragmentadas em grupos informais de mensagens sem verificação, sobrecarregando o atendimento presencial de organizações de acolhimento como o Círculos de Hospitalidade.

### 2.2. Objetivo do Sistema
Prover um ecossistema tecnológico integrado, desenvolvido em parceria entre o **UNICESUSC** e a organização **Círculos de Hospitalidade**, estruturado em duas aplicações complementares:
1. **Portal Web (`imigrantes-floripa`)**: Canal de aquisição orgânica (SEO, Blog dedicado e Sitemap), triagem inicial e consulta imediata a guias essenciais, contatos geolocalizados e vitrine de cursos gratuitos sem necessidade de login.
2. **Aplicativo Mobile (`App Imigrantes` — Android)**: Canal autenticado de retenção e assistência contínua à jornada do imigrante, oferecendo checklist documental *offline-first* (*Meu Histórico*), guias operacionais de aplicativos governamentais, alertas *push* de novas oportunidades e coleta estruturada de dados demográficos.

### 2.3. Público-Alvo
1. **Imigrantes Recém-Chegados em Florianópolis**: Usuários falantes de Espanhol, Francês, Inglês ou Português que necessitam de orientação imediata sobre emissão de CPF/RNM, saúde pública, transporte urbano e localização de serviços de acolhimento.
2. **Imigrantes em Fase de Estabilização e Transição Laboral**: Usuários que já possuem conhecimento básico sobre serviços `.gov.br`, mas buscam letramento digital, apoio para validação de diplomas, cursos profissionalizantes gratuitos (com e sem exigência de CPF) e inserção no mercado de trabalho.
3. **Agentes Institucionais (Círculos de Hospitalidade e UNICESUSC)**: Equipes de extensão e assistência social que utilizam o portal para triagem informacional e os dados da pesquisa demográfica para direcionar ações comunitárias.

### 2.4. Proposta de Valor
Centralizar informações auditadas pela parceria UNICESUSC e Círculos de Hospitalidade em 4 idiomas (`pt`, `es`, `fr`, `en`), combinando descoberta rápida via Portal Web indexável pelo Google com acompanhamento individualizado via Aplicativo Mobile *offline-first*, curadoria automatizada de cursos gratuitos classificados por exigência de CPF (**Sem CPF** vs. **Com CPF**) e notificações ativas de novas oportunidades.

### 2.5. Descrição Resumida da Solução
O sistema consiste em um Portal Web desenvolvido em Next.js (hospedado na Vercel) com rotas públicas otimizadas para SEO (`/portal`, `/orientacao`, `/novidades`, `/blog`, `/contatos`, `/mapa`, `/sobre`) e um Aplicativo Mobile Android apoiado em arquitetura **100% Firebase** (`Firebase Authentication`, `Cloud Firestore` com persistência local *offline-first* e `Firebase Cloud Messaging - FCM`). Ambas as aplicações são alimentadas por rotinas automatizadas no GitHub Actions que varrem semanalmente portais de instituições parceiras para descobrir cursos gratuitos e validar contatos oficiais, além de contar com um script administrativo de exportação (`CSV`/`JSON`) da coleção `pesquisas` do Firestore para análise estatística pela ONG e pela universidade.

---

## 3. Mapeamento BMC -> Sistema

Análise dos blocos-chave e complementares do Business Model Canvas e seu impacto direto na arquitetura de software:

| Bloco do BMC | Informação Identificada no BMC | Impacto Esperado no Sistema (Web vs. Mobile) |
| :--- | :--- | :--- |
| **Proposta de Valor** | Orientação multilíngue verificada, triagem de cursos gratuitos (Com/Sem CPF), guias de apps `.gov.br` e gestão individual da trilha documental (*Meu Histórico*). | **Web**: Renderização SSR de trilhas indexáveis (`/orientacao`) e vitrine filtrável de cursos (`/novidades`).<br>**App**: Persistência *offline-first* do checklist documental do usuário no `Cloud Firestore`. |
| **Segmentos de Clientes** | Imigrantes (recém-chegados e em busca de capacitação/emprego) em 4 idiomas; Círculos de Hospitalidade e UNICESUSC como consumidores de indicadores sociais. | **Web & App**: Internacionalização completa (`pt`, `es`, `fr`, `en`).<br>**App & Backend**: Tela de `Formulário/Pesquisa` gravando na coleção `pesquisas` e script exportador `CSV`/`JSON`. |
| **Canais** | Portal Web responsivo para aquisição orgânica (Google Search) e Aplicativo Mobile Android para acompanhamento recorrente da jornada. | **Web**: Arquitetura Next.js com geração de `sitemap.xml`, metadados OpenGraph/JSON-LD e rota `/blog`.<br>**App**: Aplicação Android autenticada com navegação dedicada (Perfil, Orientação, Cursos, Trabalho, Mapa, Pesquisa). |
| **Relacionamento com Clientes** | Autoatendimento sem fricção no Portal Web; acompanhamento personalizado, histórico salvo e notificações *push* no Aplicativo Mobile. | **Web**: Acesso público imediato sem exigência de credenciais.<br>**App**: Fluxo de Login/Cadastro (`Firebase Auth`) e integração com `Firebase Cloud Messaging (FCM)`. |
| **Atividades e Recursos Principais** | Curadoria automatizada de cursos gratuitos, verificação de links governamentais e mapeamento geolocalizado de Florianópolis. | **Backend / Automação**: Workflows em `.github/workflows/` executando scripts Node.js de varredura semanal, validação de status HTTP e promoção controlada via Pull Request. |

---

## 4. Elicitação de Requisitos — 5W1H

### 4.1. Bloco: Proposta de Valor

| 5W1H | Pergunta Orientadora | Resposta Técnica do Projeto |
| :--- | :--- | :--- |
| **What — O quê?** | Quais funcionalidades, serviços ou informações o sistema precisa oferecer? | Trilha de orientação passo a passo (documentação, saúde, transporte, `.gov.br`), catálogo de cursos gratuitos categorizados por exigência de CPF e idioma, mapa geolocalizado de contatos e checklist documental individual (*Meu Histórico*). |
| **Who — Quem?** | Quem utiliza, solicita, administra ou é afetado por essa função? | Imigrantes (consulta e acompanhamento de trilha), Agentes do Círculos de Hospitalidade/UNICESUSC (orientação) e Administrador Técnico (curadoria e promoção de dados). |
| **When — Quando?** | Em que momento, frequência ou condição a ação ocorre? | Consulta na Web sob demanda (24/7); uso do checklist no App durante deslocamentos a órgãos públicos (inclusive sem internet); atualização de cursos semanalmente (toda segunda-feira via cron job). |
| **Where — Onde?** | Em qual canal, plataforma, ambiente ou contexto o sistema será utilizado? | No navegador desktop/mobile via Portal Web (`imigrantes-floripa`) e no smartphone do usuário via Aplicativo Mobile Android. |
| **Why — Por quê?** | Qual problema, necessidade ou valor de negócio justifica essa função? | Eliminar a desinformação, reduzir a barreira linguística/burocrática e permitir que imigrantes mesmo ainda sem CPF iniciem capacitações profissionais imediatamente. |
| **How — Como?** | Como o processo deverá funcionar do ponto de vista do usuário/negócio? | Na Web, o usuário acessa guias e cursos abertos e indexados; no App, autentica-se via Firebase, marca documentos já obtidos no *Meu Histórico* (sincronizado com `Cloud Firestore` *offline-first*) e consulta cursos filtrados. |

### 4.2. Bloco: Segmentos de Clientes

| 5W1H | Pergunta Orientadora | Resposta Técnica do Projeto |
| :--- | :--- | :--- |
| **What — O quê?** | Quais funcionalidades, serviços ou informações o sistema precisa oferecer? | Seletor de idioma em 4 línguas (`pt`, `es`, `fr`, `en`), gestão de perfil cadastral do imigrante (`Nome`, `Nascimento`, `Naturalidade`, `Contato`), formulário de pesquisa demográfica e exportador de relatórios `CSV`/`JSON`. |
| **Who — Quem?** | Quem utiliza, solicita, administra ou é afetado por essa função? | Imigrantes lusófonos, hispanofalantes, francófonos e anglófonos residentes em Florianópolis; pesquisadores do UNICESUSC e equipe do Círculos de Hospitalidade. |
| **When — Quando?** | Em que momento, frequência ou condição a ação ocorre? | Seleção de idioma no primeiro acesso; preenchimento de perfil após cadastro no App; submissão voluntária do formulário de pesquisa e exportação periódica pelos parceiros. |
| **Where — Onde?** | Em qual canal, plataforma, ambiente ou contexto o sistema será utilizado? | Rotas internacionalizadas `/[locale]/...` no Portal Web, telas de `Perfil` e `Formulário/Pesquisa` no App Mobile, e script CLI administrativo para exportação. |
| **Why — Por quê?** | Qual problema, necessidade ou valor de negócio justifica essa função? | Adequar a comunicação à diversidade linguística dos imigrantes e gerar inteligência de dados reais sobre o cenário migratório em Florianópolis. |
| **How — Como?** | Como o processo deverá funcionar do ponto de vista do usuário/negócio? | Dicionários `i18n` traduzem toda a interface; o App grava perfil e pesquisas em coleções segregadas do Firestore (`usuarios` e `pesquisas`) protegidas por *Security Rules*, e o script exporta `pesquisas` para `CSV`/`JSON`. |

### 4.3. Bloco: Canais e Relacionamento

| 5W1H | Pergunta Orientadora | Resposta Técnica do Projeto |
| :--- | :--- | :--- |
| **What — O quê?** | Quais funcionalidades, serviços ou informações o sistema precisa oferecer? | No canal Web: páginas institucionais (`/sobre`), Blog otimizado para SEO (`/blog`), Sitemap e trilha em scroll contínuo (`/orientacao`). No canal App: autenticação (`Firebase Auth`) e notificações *push* (`FCM`). |
| **Who — Quem?** | Quem utiliza, solicita, administra ou é afetado por essa função? | Visitantes orgânicos oriundos de mecanismos de busca (Google) na Web e usuários recorrentes autenticados no Aplicativo Mobile. |
| **When — Quando?** | Em que momento, frequência ou condição a ação ocorre? | Indexação contínua pelos crawlers de busca na Web; disparo de notificações *push* sempre que novos cursos ou vagas forem promovidos no catálogo. |
| **Where — Onde?** | Em qual canal, plataforma, ambiente ou contexto o sistema será utilizado? | Infraestrutura Web (Next.js SSR/SSG na Vercel) e Infraestrutura Mobile (Android integrado ao Firebase). |
| **Why — Por quê?** | Qual problema, necessidade ou valor de negócio justifica essa função? | Separar a responsabilidade de atração (topo de funil leve na Web) da responsabilidade de retenção e acompanhamento contínuo (App Mobile). |
| **How — Como?** | Como o processo deverá funcionar do ponto de vista do usuário/negócio? | O imigrante descobre o projeto pesquisando dúvidas no Google (chegando ao `/blog` ou `/orientacao`) e é convidado via CTA a instalar o App Android para salvar seu progresso e receber alertas via FCM. |

---

## 5. Stakeholders e Atores do Sistema

| ID | Ator / Stakeholder | Papel no Sistema / Projeto | Principais Necessidades |
| :--- | :--- | :--- | :--- |
| **AT-01** | **Imigrante Visitante (Web)** | Usuário não autenticado do Portal Web | Acessar guias de documentação, contatos, mapa geolocalizado, cursos gratuitos e artigos do blog em seu idioma sem precisar criar conta. |
| **AT-02** | **Imigrante Cadastrado (App Mobile)** | Usuário autenticado do Aplicativo Android | Gerenciar seu perfil, salvar seu progresso na trilha documental (*Meu Histórico*) com acesso *offline*, enviar pesquisas/sugestões e receber notificações *push*. |
| **AT-03** | **Agente Institucional (Círculos de Hospitalidade / UNICESUSC)** | Stakeholder parceiro e analista social | Utilizar o Portal Web como apoio de triagem e analisar os dados exportados (`CSV`/`JSON`) das pesquisas submetidas pelos imigrantes. |
| **AT-04** | **Administrador Técnico / Curador** | Gestor técnico do ecossistema (Mateus Carpenter) | Revisar rascunhos de cursos gerados pelos bots via Pull Request, promover oportunidades aprovadas e executar a exportação de relatórios do Firestore. |
| **AT-05** | **Bot de Automação (GitHub Actions)** | Ator sistêmico automatizado | Executar semanalmente a descoberta de cursos gratuitos, validar a disponibilidade de URLs oficiais (`.gov.br`) e abrir Pull Requests/Issues de revisão. |

---

## 6. Requisitos Funcionais (RF)

| ID | Escopo | Nome do Requisito | Descrição do Requisito ("O sistema deve...") | Origem BMC | MoSCoW | Justificativa |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **RF-001** | **Portal Web** | Navegação Multilíngue e Identidade Visual | O sistema deve exibir o Portal Web em 4 idiomas (`pt`, `es`, `fr`, `en`) aplicando o Design System `HIP-Floripa` (`#6E5594`) e estruturando a navegação entre `/portal`, `/orientacao`, `/novidades`, `/blog`, `/contatos`, `/mapa` e `/sobre`. | Segmentos / Canais | **Must Have** | Garante acessibilidade linguística imediata e consolida a nova identidade visual da parceria. |
| **RF-002** | **Portal Web** | Trilha de Orientação Vertical Indexável | O sistema deve apresentar na rota `/[locale]/orientacao` os guias passo a passo de documentação, saúde, locomoção e `.gov.br` em layout vertical contínuo renderizado no servidor (SSR) com dados estruturados JSON-LD. | Proposta de Valor / Canais | **Must Have** | Permite indexação integral pelo Google e leitura fluida sem sobrecarga de cliques. |
| **RF-003** | **Web & App** | Vitrine de Cursos Gratuitos (Com e Sem CPF) | O sistema deve listar os cursos gratuitos em formato de cards (`/novidades` na Web e tela `Cursos` no App), destacando visualmente a exigência ou dispensa de CPF, o idioma e o link oficial de inscrição. | Proposta de Valor | **Must Have** | Atende diretamente à principal demanda identificada nas sessões presenciais com imigrantes. |
| **RF-004** | **Web & App** | Diretório de Contatos e Mapa Geolocalizado | O sistema deve exibir a lista categorizada de órgãos públicos, ONGs e serviços essenciais integrada a um mapa interativo geolocalizado da Grande Florianópolis (`/contatos` e `/mapa`). | Recursos / Proposta de Valor | **Must Have** | Essencial para orientar o deslocamento físico de imigrantes recém-chegados na cidade. |
| **RF-005** | **Portal Web** | Página Institucional da Parceria (`/sobre`) | O sistema deve exibir na rota `/[locale]/sobre` a descrição institucional da parceria entre UNICESUSC e Círculos de Hospitalidade, galeria de fotos das ações e vídeo incorporado da reportagem da Band (YouTube). | Parcerias Principais | **Must Have** | Confere transparência, credibilidade institucional e registro público da extensão universitária. |
| **RF-006** | **Portal Web** | Blog Otimizado para SEO e Sitemap (`/blog`) | O sistema deve disponibilizar uma rota dedicada `/[locale]/blog` com artigos informativos otimizados por palavras-chave e geração automatizada de `sitemap.xml`. | Relacionamento / Canais | **Should Have** | Importante para captação orgânica de longo prazo (topo de funil), planejado após o layout estrutural base. |
| **RF-007** | **App Mobile** | Cadastro, Login e Recuperação de Senha | O Aplicativo Mobile deve permitir que o imigrante crie uma conta (`Cadastre-se`), realize autenticação (`Acesso`) e solicite redefinição de senha (`Esqueceu a senha?`) via `Firebase Authentication`. | Relacionamento / Canais | **Must Have** | Pré-requisito técnico para persistir dados individuais do usuário com segurança no App. |
| **RF-008** | **App Mobile** | Gestão de Perfil do Imigrante | O Aplicativo Mobile deve permitir ao usuário autenticado visualizar e editar seus dados básicos (`Nome`, `Nascimento`, `Naturalidade`) e dados de contato (`Telefone`, `E-mail`, `Endereço`, `Foto`) no `Cloud Firestore`. | Segmentos / Relacionamento | **Must Have** | Viabiliza a personalização da conta conforme os wireframes da seção `App > Telas > Perfil`. |
| **RF-009** | **App Mobile** | Meu Histórico e Checklist Documental Offline-First | O Aplicativo Mobile deve permitir ao usuário marcar quais documentos já possui e salvar as etapas concluídas da Trilha de Orientação, garantindo leitura e atualização *offline* via persistência nativa do `Cloud Firestore`. | Proposta de Valor / Relacionamento | **Must Have** | Principal diferencial do App Mobile: assegura consulta ao checklist mesmo sem internet em órgãos públicos. |
| **RF-010** | **App Mobile** | Guias Práticos de Aplicativos (`.gov.br` e Serviços) | O Aplicativo Mobile deve exibir cartões didáticos (`AppCard`) orientando sobre o uso de aplicativos essenciais (`.gov.br`, CTPS Digital, Meu INSS, Conecte SUS, Alô Saúde, Floripa no Ponto). | Proposta de Valor / Recursos | **Must Have** | Mitiga a barreira de letramento digital no uso cotidiano dos serviços públicos brasileiros. |
| **RF-011** | **App Mobile** | Submissão de Formulário de Pesquisa e Sugestões | O Aplicativo Mobile deve permitir que o usuário envie dúvidas, sugestões e respostas ao censo demográfico na tela `Formulário/Pesquisa`, gravando os documentos na coleção `pesquisas` do `Cloud Firestore`. | Atividades / Relacionamento | **Should Have** | Coleta evidências empíricas sobre as necessidades dos imigrantes em Florianópolis. |
| **RF-012** | **Backend / CLI** | Exportação Analítica de Pesquisas (`CSV`/`JSON`) | O sistema deve fornecer um script administrativo que extraia os registros da coleção `pesquisas` do `Cloud Firestore` e gere arquivos estruturados em formato `CSV` e `JSON`. | Atividades / Parcerias | **Should Have** | Permite que o UNICESUSC e o Círculos de Hospitalidade analisem os dados do censo em planilhas externas. |
| **RF-013** | **App Mobile** | Notificações Push de Novas Oportunidades (`FCM`) | O Aplicativo Mobile deve receber notificações *push* via `Firebase Cloud Messaging (FCM)` alertando sobre novos cursos gratuitos ou oportunidades publicadas. | Relacionamento | **Should Have** | Promove retenção e engajamento recorrente do imigrante após a instalação do aplicativo. |
| **RF-014** | **Backend / Bots** | Descoberta Semanal de Cursos e Validação de Links | O sistema deve executar workflows no GitHub Actions para buscar novos cursos gratuitos, verificar a integridade de URLs oficiais e abrir Pull Requests com rascunhos `.pending.json` para aprovação. | Atividades / Recursos | **Must Have** | Mantém o catálogo sempre atualizado e livre de links quebrados sem exigir varredura manual. |
| **RF-015** | **Backend / App** | Rotina Automatizada de Vagas de Emprego (`Trabalho`) | O sistema deve coletar e exibir na aba `Trabalho` do Aplicativo Mobile oportunidades de emprego abertas na Grande Florianópolis. | Atividades / Proposta de Valor | **Could Have** | Expansão desejável do ecossistema, dependente de disponibilidade técnica de fontes abertas de vagas. |

---

## 7. Requisitos Não Funcionais (RNF) — Baseados na ISO/IEC 25010

| ID | Categoria (ISO 25010) | Requisito Mensurável e Verificável | Origem BMC | MoSCoW | Justificativa |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **RNF-001** | **Eficiência de Desempenho** | O Portal Web (Next.js na Vercel) deve apresentar *Largest Contentful Paint* (LCP) $\le 2,5\text{s}$ em 95% das requisições em rede 4G simulada (Lighthouse), e as consultas locais ao cache do `Cloud Firestore` no App Mobile devem responder em $\le 300\text{ms}$. | Canais / Proposta de Valor | **Must Have** | Garante carregamento ágil em dispositivos móveis de entrada e conexões móveis limitadas. |
| **RNF-002** | **Segurança** | A autenticação do App Mobile deve utilizar `Firebase Authentication` (JWT com expiração de 1h e *refresh token* seguro), e as *Security Rules* do `Cloud Firestore` devem restringir leitura e escrita em `usuarios/{uid}` exclusivamente quando `request.auth != null && request.auth.uid == uid`, atendendo à LGPD. | Relacionamento / Segmentos | **Must Have** | Protege os dados pessoais e o histórico documental de cada imigrante contra acesso não autorizado. |
| **RNF-003** | **Usabilidade** | As interfaces Web e Mobile devem cumprir nível AA da WCAG 2.1 com contraste mínimo de $4,5:1$ (texto `#1B2440` sobre fundo `#FBF8F4` ou `#FFFFFF`) e permitir que um novo usuário conclua seu cadastro no App em $\le 3\text{ minutos}$ sem auxílio externo. | Proposta de Valor / Segmentos | **Must Have** | Essencial para públicos com diferentes níveis de letramento digital e fluência no idioma. |
| **RNF-004** | **Confiabilidade** | O Portal Web deve manter disponibilidade mensal $\ge 99,5\%$, e o App Mobile deve manter a persistência *offline* nativa do SDK `Cloud Firestore` ativa por padrão, assegurando 100% de disponibilidade de leitura do *Meu Histórico* mesmo em ausência total de conexão (modo avião). | Proposta de Valor / Canais | **Must Have** | Imigrantes frequentemente ficam sem pacote de dados móveis ao aguardar atendimento em órgãos públicos. |
| **RNF-005** | **Manutenibilidade** | O código-fonte deve manter 100% de aprovação nos testes automatizados (Vitest) das regras de validação/bots e zero erros no linter estático (ESLint/TypeScript) antes de qualquer *merge* na branch principal via GitHub Actions. | Recursos / Atividades | **Must Have** | Previne regressões nas rotinas automatizadas e mantém a saúde técnica do repositório. |
| **RNF-006** | **Portabilidade** | O Portal Web deve renderizar sem quebra de layout em *viewports* de `320px` a `1920px` (Chrome, Firefox, Safari e Edge), e o Aplicativo Mobile deve ser compatível com Android 8.0 (API Level 26) ou superior. | Canais | **Must Have** | Abrange a totalidade de navegadores web e a ampla base de smartphones Android utilizada pelo público-alvo. |
| **RNF-007** | **Compatibilidade** | O catálogo de cursos e contatos deve respeitar um schema JSON único consumido tanto pelo Portal Web quanto pelo App Mobile, e o script de exportação do censo deve gerar arquivos `CSV` codificados em UTF-8 (RFC 4180) compatíveis com Excel e Google Sheets. | Recursos / Parcerias | **Should Have** | Evita duplicação de bases de dados e facilita a análise estatística pelos parceiros institucionais. |
| **RNF-008** | **Adequação Funcional** | 100% dos requisitos funcionais classificados como *Must Have* devem possuir cobertura de critérios de aceitação Gherkin (cenário de sucesso e cenário de falha) validados antes do fechamento das Sprints. | Proposta de Valor | **Must Have** | Assegura que o software entregue corresponde integralmente às necessidades mapeadas no BMC. |

---

## 8. User Stories e Critérios de Aceitação (INVEST + Gherkin BDD)

### US-001 — Consulta de Trilha de Orientação Multilíngue Indexável (Web)
| Campo | Especificação |
| :--- | :--- |
| **User Story** | **Como** imigrante recém-chegado em Florianópolis (`AT-01`), **quero** acessar a trilha de orientação passo a passo no meu idioma em uma página vertical contínua, **para que** eu saiba exatamente quais documentos emitir e como usar os serviços de saúde e transporte sem precisar criar uma conta. |
| **RF / RNF Relacionados** | `RF-001`, `RF-002`, `RNF-001`, `RNF-003` |
| **Prioridade MoSCoW** | **Must Have** |
| **Estimativa (Fibonacci)** | **3 pontos** |
| **Justificativa** | Porta de entrada orgânica do Portal Web via buscadores (SEO) e principal instrumento de orientação imediata. |
| **CA-01 (Cenário Feliz — Gherkin)** | **Given** que sou um visitante acessando `/es/orientacao` pelo navegador,<br>**When** a página termina de carregar,<br>**Then** visualizo todas as etapas da trilha de orientação traduzidas para o espanhol em layout vertical contínuo com contraste mínimo de $4,5:1$ e tempo de carregamento LCP $\le 2,5\text{s}$. |
| **CA-02 (Cenário Alternativo — Troca de Idioma e SEO)** | **Given** que estou visualizando a trilha em `/pt/orientacao`,<br>**When** seleciono o idioma Francês (`fr`) no cabeçalho,<br>**Then** a URL é atualizada para `/fr/orientacao` mantendo a estrutura semântica HTML e os metadados JSON-LD indexáveis pelo Google. |

### US-002 — Filtragem de Cursos Gratuitos por Exigência de CPF (Web & App)
| Campo | Especificação |
| :--- | :--- |
| **User Story** | **Como** imigrante em busca de qualificação profissional (`AT-01` / `AT-02`), **quero** visualizar os cursos gratuitos disponíveis filtrando aqueles que não exigem CPF daqueles que exigem CPF, **para que** eu possa iniciar minha capacitação imediatamente mesmo enquanto minha documentação brasileira está em trâmite. |
| **RF / RNF Relacionados** | `RF-003`, `RNF-014`, `RNF-003`, `RNF-007` |
| **Prioridade MoSCoW** | **Must Have** |
| **Estimativa (Fibonacci)** | **3 pontos** |
| **Justificativa** | Resolve o bloqueio prático validado nas oficinas presenciais, onde imigrantes sem CPF desistiam de procurar capacitação. |
| **CA-01 (Cenário Feliz — Gherkin)** | **Given** que acesso a vitrine de cursos gratuitos (`/novidades` na Web ou aba `Cursos` no App),<br>**When** seleciono o filtro "Não exige CPF",<br>**Then** o sistema exibe apenas os cards de cursos cuja matrícula independe de CPF (como Microsoft Learn), apresentando instituição, idioma e botão para a página oficial. |
| **CA-02 (Cenário Alternativo — Alerta de Exigência de CPF)** | **Given** que visualizo um card de curso oferecido pelo SENAC ou Fundação Bradesco,<br>**When** o curso possui a flag `requiresCpf: true`,<br>**Then** o card exibe um selo visual de aviso na cor semântica `warm` (`#C56A3F`) informando "Exige CPF para matrícula". |

### US-003 — Localização de Órgãos Públicos e ONGs no Mapa (Web & App)
| Campo | Especificação |
| :--- | :--- |
| **User Story** | **Como** imigrante residente em Florianópolis (`AT-01` / `AT-02`), **quero** consultar a lista de contatos de órgãos públicos e ONGs integrada ao mapa da cidade, **para que** eu localize o endereço físico, telefone e horário de atendimento mais próximo de mim. |
| **RF / RNF Relacionados** | `RF-004`, `RNF-006` |
| **Prioridade MoSCoW** | **Must Have** |
| **Estimativa (Fibonacci)** | **2 pontos** |
| **Justificativa** | Evita deslocamentos perdidos a órgãos públicos ou sedes de apoio como Polícia Federal e Círculos de Hospitalidade. |
| **CA-01 (Cenário Feliz — Gherkin)** | **Given** que estou na página `/pt/contatos` ou `/pt/mapa`,<br>**When** seleciono o contato "Círculos de Hospitalidade" ou "Polícia Federal",<br>**Then** o sistema exibe o endereço completo, telefone/link verificado e destaca o pino correspondente nas coordenadas geográficas do mapa de Florianópolis. |
| **CA-02 (Cenário Alternativo — Falha de Carregamento do Mapa)** | **Given** que minha conexão de rede está instável e o componente visual do mapa falha ao carregar os blocos gráficos,<br>**When** acesso a seção de contatos,<br>**Then** a listagem textual com endereços completos, telefones e links diretos permanece 100% visível e funcional. |

### US-004 — Autenticação e Gestão de Perfil no Aplicativo Mobile (App)
| Campo | Especificação |
| :--- | :--- |
| **User Story** | **Como** imigrante usuário do Aplicativo Mobile (`AT-02`), **quero** me cadastrar, fazer login com e-mail e senha e manter meus dados pessoais e de contato atualizados no meu perfil, **para que** meu progresso na plataforma fique salvo de forma privada e segura. |
| **RF / RNF Relacionados** | `RF-007`, `RF-008`, `RNF-002`, `RNF-003` |
| **Prioridade MoSCoW** | **Must Have** |
| **Estimativa (Fibonacci)** | **5 pontos** |
| **Justificativa** | Alicerce de autenticação (`Firebase Auth`) e persistência individual (`Cloud Firestore`) do Aplicativo Mobile. |
| **CA-01 (Cenário Feliz — Gherkin)** | **Given** que acesso a tela `Cadastre-se` no App Mobile e preencho Nome, E-mail válido e Senha ($\ge 6$ caracteres),<br>**When** aciono o botão "Cadastre-se!",<br>**Then** a conta é criada no `Firebase Authentication`, o documento inicial `usuarios/{uid}` é gravado no `Cloud Firestore` e sou direcionado à tela inicial autenticado. |
| **CA-02 (Cenário Alternativo — Credenciais Inválidas ou Acesso Não Autorizado)** | **Given** que estou na tela `Acesso` do App Mobile,<br>**When** insiro uma senha incorreta ou um e-mail não cadastrado,<br>**Then** o sistema não autentica a sessão, exibe mensagem clara de erro no idioma selecionado e as *Security Rules* do Firestore bloqueiam qualquer leitura/escrita em `usuarios/{uid}`. |

### US-005 — Gestão do Checklist Documental Offline-First — Meu Histórico (App)
| Campo | Especificação |
| :--- | :--- |
| **User Story** | **Como** imigrante autenticado no Aplicativo Mobile (`AT-02`), **quero** marcar os documentos que já emiti e os passos concluídos da minha trilha de orientação com funcionamento mesmo sem internet, **para que** eu acompanhe o que falta para minha regularização até mesmo dentro de órgãos públicos sem sinal de rede. |
| **RF / RNF Relacionados** | `RF-009`, `RF-010`, `RNF-001`, `RNF-004` |
| **Prioridade MoSCoW** | **Must Have** |
| **Estimativa (Fibonacci)** | **8 pontos** |
| **Justificativa** | Entrega o maior valor prático exclusivo do Aplicativo Mobile em relação ao Portal Web. |
| **CA-01 (Cenário Feliz Online — Gherkin)** | **Given** que estou autenticado na tela `Perfil` / `Meu Histórico` do App Mobile,<br>**When** marco o item "CPF Emitido" ou concluo um passo da Trilha de Orientação,<br>**Then** o estado é atualizado imediatamente na interface em $\le 300\text{ms}$ e sincronizado no documento `usuarios/{uid}` do `Cloud Firestore`. |
| **CA-02 (Cenário Alternativo Offline-First — Sem Conexão)** | **Given** que meu smartphone está sem conexão à internet (modo avião) dentro de um posto de atendimento,<br>**When** abro o App Mobile e consulto ou marco um item no `Meu Histórico`,<br>**Then** o cache *offline-first* do `Cloud Firestore` exibe todos os meus dados salvos sem erro e enfileira a alteração local para sincronização automática assim que a conexão for restabelecida. |

### US-006 — Pesquisa Demográfica no App e Exportação Analítica CSV/JSON (App & Backend)
| Campo | Especificação |
| :--- | :--- |
| **User Story** | **Como** imigrante no Aplicativo Mobile (`AT-02`) e agente parceiro (`AT-03` / `AT-04`), **quero** registrar respostas e sugestões no formulário de pesquisa do App e exportá-las em formato CSV/JSON, **para que** a UNICESUSC e o Círculos de Hospitalidade compreendam as necessidades reais da população imigrante em Florianópolis. |
| **RF / RNF Relacionados** | `RF-011`, `RF-012`, `RNF-002`, `RNF-007` |
| **Prioridade MoSCoW** | **Should Have** |
| **Estimativa (Fibonacci)** | **3 pontos** |
| **Justificativa** | Viabiliza a coleta científica e social de dados sem exigir infraestrutura adicional fora do Firebase. |
| **CA-01 (Cenário Feliz — Submissão e Exportação)** | **Given** que o usuário preenche a tela `Formulário/Pesquisa` e toca em "Enviar",<br>**When** os campos obrigatórios estão preenchidos,<br>**Then** o registro é gravado na coleção `pesquisas` do `Cloud Firestore` e, quando o administrador executa o script de exportação, um arquivo `CSV` e `JSON` válido (UTF-8) contendo os registros é gerado localmente. |
| **CA-02 (Cenário Alternativo — Submissão Incompleta)** | **Given** que o usuário está na tela `Formulário/Pesquisa`,<br>**When** tenta enviar o formulário com o campo de mensagem/respostas vazio,<br>**Then** o App exibe aviso de validação solicitando o preenchimento e impede a gravação de documento vazio no Firestore. |

---

## 9. Matriz de Rastreabilidade Completa

| Origem no BMC (Bloco) | Requisito Funcional (RF) | Requisito Não Funcional (RNF) | User Story Relacionada | Critérios de Aceitação | Prioridade MoSCoW | Escopo |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Segmentos / Canais | `RF-001`, `RF-002` | `RNF-001`, `RNF-003`, `RNF-006` | `US-001` | `CA-01`, `CA-02` | **Must Have** | Portal Web |
| Proposta de Valor / Atividades | `RF-003`, `RF-014` | `RNF-003`, `RNF-005`, `RNF-007` | `US-002` | `CA-01`, `CA-02` | **Must Have** | Web, App & Bots |
| Recursos / Proposta de Valor | `RF-004` | `RNF-006` | `US-003` | `CA-01`, `CA-02` | **Must Have** | Web & App |
| Parcerias Principais | `RF-005` | `RNF-001`, `RNF-006` | `US-001` (Institucional) | `CA-01` | **Must Have** | Portal Web |
| Relacionamento / Canais | `RF-007`, `RF-008` | `RNF-002`, `RNF-003` | `US-004` | `CA-01`, `CA-02` | **Must Have** | App Mobile |
| Proposta de Valor / Relacionamento | `RF-009`, `RF-010` | `RNF-001`, `RNF-004`, `RNF-008` | `US-005` | `CA-01`, `CA-02` | **Must Have** | App Mobile |
| Atividades / Parcerias | `RF-011`, `RF-012` | `RNF-002`, `RNF-007` | `US-006` | `CA-01`, `CA-02` | **Should Have** | App & Backend |
| Relacionamento / Canais | `RF-006` | `RNF-001` | Backlog SEO (`F07`) | Sitemap / Keywords | **Should Have** | Portal Web |
| Relacionamento | `RF-013` | `RNF-004` | Backlog Push (`F08`) | Recebimento FCM | **Should Have** | App Mobile |
| Atividades / Proposta de Valor | `RF-015` | `RNF-005` | Backlog Vagas (`F09`) | Atualização Vagas | **Could Have** | Backend & App |

---

## 10. Definição do Escopo Inicial — Especificação Inicial de Requisitos do Sistema

| Classificação MoSCoW | Requisitos / User Stories | Decisão de Escopo |
| :--- | :--- | :--- |
| **Must Have** | `RF-001`, `RF-002`, `RF-003`, `RF-004`, `RF-005`, `RF-007`, `RF-008`, `RF-009`, `RF-010`, `RF-014`<br>`RNF-001` a `RNF-006`, `RNF-008`<br>`US-001`, `US-002`, `US-003`, `US-004`, `US-005` | **Obrigatório no Núcleo do MVP**: Compõe as entregas centrais da Nova Branch do Portal Web e do MVP do Aplicativo Mobile Android em Firebase. |
| **Should Have** | `RF-006`, `RF-011`, `RF-012`, `RF-013`<br>`RNF-007`<br>`US-006`, `F07 (Blog/SEO)`, `F08 (Push FCM)` | **Planejado para a Sequência Imediata**: Formulário de pesquisa + exportador CSV/JSON entra junto ao MVP Mobile; Blog/SEO/Voz e Push Notifications entram logo após a consolidação estrutural. |
| **Could Have** | `RF-015` (`F09 — Bot de Vagas de Emprego`) | **Desejável / Evolução**: Será implementado caso haja capacidade disponível após a estabilização das entregas *Must* e *Should Have*. |
| **Won't Have** | `F10` (Aplicativo Educacional Gamificado de Tecnologia) | **Fora do Escopo desta Versão / Produto Independente**: Desacoplado para desenvolvimento em projeto próprio. |

---

## 11. Premissas, Restrições e Dúvidas em Aberto (Resolvidas)

| ID | Tipo | Descrição | Ação / Responsável |
| :--- | :--- | :--- | :--- |
| **PR-01** | **Restrição Arquitetural** | O ecossistema deve operar sem custos recorrentes de infraestrutura (utilizando *Free Tiers* da Vercel, GitHub Actions e Firebase Spark Plan). | Arquitetura 100% Serverless/BaaS definida por Mateus Carpenter. |
| **PR-02** | **Premissa de Conectividade** | O público-alvo imigrante frequentemente enfrenta falta de dados móveis ao visitar órgãos públicos presenciais. | Mitigada pela adoção do cache *Offline-First* nativo do `Cloud Firestore` no App Mobile (`RNF-004`). |
| **PR-03** | **Restrição Legal (LGPD)** | Dados pessoais e respostas de pesquisa dos imigrantes exigem isolamento de acesso e consentimento explícito. | Aplicação de *Firestore Security Rules* por `uid` (`RNF-002`) e anonimização nos relatórios estatísticos exportados. |
| **PR-04** | **Premissa Institucional** | Reunião de alinhamento final entre os núcleos do UNICESUSC e Círculos de Hospitalidade validará eventuais ajustes de conteúdo institucional. | O Portal Web é a entrega primária acordada com a ONG; evolução conduzida por Mateus Carpenter. |

---

## 12. Checklist de Qualidade da Entrega

- [x] Os três blocos obrigatórios do BMC (Proposta de Valor, Segmentos de Clientes e Canais) e os blocos complementares foram analisados.
- [x] O método 5W1H foi aplicado integralmente aos blocos-chave.
- [x] Os principais atores e stakeholders (`AT-01` a `AT-05`) foram identificados.
- [x] Os requisitos funcionais (`RF-001` a `RF-015`) possuem identificação sequencial e distinção clara entre Portal Web, App Mobile e Automação.
- [x] Existem 8 requisitos não funcionais mensuráveis (`RNF-001` a `RNF-008`) cobrindo todas as 8 características da norma ISO/IEC 25010.
- [x] Foram elaboradas as User Stories essenciais (`US-001` a `US-006`) aderentes ao padrão INVEST.
- [x] Cada User Story possui critérios de aceitação testáveis escritos em Gherkin (Given/When/Then) cobrindo cenário feliz e alternativo.
- [x] Todos os requisitos e histórias possuem classificação MoSCoW e estimativa Fibonacci justificadas.
- [x] A Matriz de Rastreabilidade conecta `BMC -> RF/RNF -> User Story -> Critério de Aceitação -> Escopo`.

