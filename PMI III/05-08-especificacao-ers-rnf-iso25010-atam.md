# UNICESUSC — Curso Superior de Tecnologia em Análise e Desenvolvimento de Sistemas
## Documento de Especificação de Requisitos de Software (ERS / SERS) e Qualidade ISO/IEC 25010 (ATAM)

- **Disciplina**: Projeto Multidisciplinar Integrador III (PMI III)
- **Professor Orientador**: Prof. Sérgio Murilo Schütz
- **Projeto**: Ecossistema Imigrantes Floripa (Portal Web + Aplicativo Mobile Android)
- **Parceria Institucional**: UNICESUSC e Círculos de Hospitalidade
- **Responsável Técnico**: Mateus Carpenter
- **Data**: 04 de novembro de 2026

---

## Sumário

1. Introdução (Propósito, Escopo, Definições e Referências)
2. Abstração do Problema (Problema Raiz, Público Afetado, Impacto Atual e Solução Proposta)
3. Especificação de Requisitos Funcionais (Divididos por Plataforma)
4. Especificação Completa de Requisitos Não Funcionais — Norma ISO/IEC 25010 (8 Características)
5. Avaliação Arquitetural — Cenários ATAM (*Architecture Tradeoff Analysis Method*)
6. Catálogo Completo de User Stories (10 Histórias Priorizadas — Padrão INVEST + Gherkin BDD)
7. Glossário Técnico e de Domínio

---

## 1. Introdução

### 1.1. Propósito do Documento
Este Documento de Especificação de Requisitos de Software (ERS/SERS) formaliza os requisitos funcionais, os requisitos não funcionais fundamentados na norma internacional **ISO/IEC 25010**, os cenários de avaliação arquitetural **ATAM** e o Product Backlog em formato **User Stories + Gherkin (BDD)** do projeto **Ecossistema Imigrantes Floripa**, desenvolvido no âmbito do **UNICESUSC** em parceria com a organização **Círculos de Hospitalidade**.

### 1.2. Escopo do Projeto
O projeto **Imigrantes Floripa** visa democratizar o acesso à informação cidadã, serviços públicos, capacitação profissional gratuita e empregabilidade para imigrantes residentes na Grande Florianópolis. O escopo arquitetural compreende duas aplicações integradas:
1. **Portal Web (`imigrantes-floripa`)**: Aplicação web pública e multilíngue (`pt`, `es`, `fr`, `en`) em Next.js (App Router), voltada à aquisição orgânica via mecanismos de busca (SEO), composta pelas rotas `/portal`, `/orientacao` (trilha vertical indexável), `/novidades` (vitrine de cursos gratuitos), `/blog` (conteúdo otimizado por keywords), `/contatos`, `/mapa` e `/sobre`.
2. **Aplicativo Mobile (`App Imigrantes` — Android)**: Aplicação móvel autenticada baseada em arquitetura **100% Firebase** (`Firebase Authentication`, `Cloud Firestore` com persistência local *offline-first* e `Firebase Cloud Messaging - FCM`), focada no acompanhamento individualizado da jornada documental (*Meu Histórico*), consulta de guias de aplicativos governamentais (`.gov.br`), submissão de formulário de pesquisa demográfica e notificações *push* de novas oportunidades.

### 1.3. Definições, Acrônimos e Abreviaturas
- **ERS / SERS**: Especificação de Requisitos de Software (*Software Requirements Specification*).
- **BMC**: *Business Model Canvas* (Quadro de Modelo de Negócios).
- **RF / RNF**: Requisito Funcional / Requisito Não Funcional.
- **ISO/IEC 25010**: Padrão internacional que define o modelo de qualidade de produto de software em 8 características.
- **ATAM**: *Architecture Tradeoff Analysis Method* (Método de Análise de Compromissos Arquiteturais).
- **BDD / Gherkin**: *Behavior-Driven Development* / Linguagem estruturada (`Given`/`When`/`Then`) para especificação de cenários de teste.
- **INVEST**: Critérios de qualidade para User Stories (*Independent, Negotiable, Valuable, Estimable, Small, Testable*).
- **BaaS**: *Backend-as-a-Service* (representado no projeto pelo Google Firebase).
- **FCM**: *Firebase Cloud Messaging* (serviço de notificações *push*).
- **SSR / SSG**: *Server-Side Rendering* / *Static Site Generation* (estratégias de renderização do Next.js).
- **RNM / CRNM**: Registro Nacional Migratório / Carteira de Registro Nacional Migratório.
- **CTPS Digital**: Carteira de Trabalho e Previdência Social em formato digital.

### 1.4. Referências
- Business Model Canvas (BMC) e Matriz de Priorização do Projeto Imigrantes Floripa — Versão 1.0 (2026).
- Design System `HIP-Floripa` — Especificação Visual e Componentes (2026).
- ISO/IEC 25010:2011 — *Systems and software engineering — Systems and software Quality Requirements and Evaluation (SQuaRE)*.

---

## 2. Abstração do Problema

### 2.1. Problema Raiz
A fragmentação de informações oficiais em múltiplos portais governamentais brasileiros (redigidos em linguagem burocrática e exclusivamente em português), somada à complexidade operacional de plataformas digitais como `.gov.br`, CTPS Digital e Meu INSS, à morosidade na revalidação de diplomas estrangeiros e à falta de clareza sobre quais cursos gratuitos exigem ou dispensam CPF, impede que imigrantes em Florianópolis conquistem autonomia documental e inserção qualificada no mercado de trabalho.

### 2.2. Público Afetado
- **Imigrantes recém-chegados em Florianópolis**: Enfrentam desorientação imediata quanto a documentos básicos, atendimento no SUS, transporte público e localização de órgãos de apoio.
- **Imigrantes em busca de capacitação e transição profissional**: Sofrem com barreiras de letramento digital, dificuldade de validar escolaridade prévia e desconhecimento de trilhas gratuitas de estudo e trabalho.
- **Organizações de acolhimento (Círculos de Hospitalidade e extensão universitária UNICESUSC)**: Enfrentam alta demanda de dúvidas operacionais repetitivas no atendimento presencial e carência de dados estatísticos consolidados sobre a população atendida.

### 2.3. Impacto Atual
- Deslocamentos presenciais perdidos a órgãos públicos por falta de documentação exigida.
- Exclusão digital por perda de credenciais ou bloqueio de contas `.gov.br`.
- Ociosidade de vagas em cursos profissionalizantes gratuitos (como turmas de instituições parceiras) enquanto imigrantes permanecem no subemprego.
- Sobrecarga do atendimento presencial da ONG Círculos de Hospitalidade com triagens básicas que poderiam ser autoatendidas digitalmente.

### 2.4. Solução Proposta
Desenvolvimento de um ecossistema dividido em duas pontas:
1. Um **Portal Web** leve, multilíngue e otimizado para SEO, que atrai o imigrante a partir de pesquisas no Google e entrega orientação imediata, mapa de contatos e vitrine de cursos gratuitos.
2. Um **Aplicativo Mobile Android** autenticado via Firebase, onde o imigrante gerencia seu checklist de documentos (*Meu Histórico*) com funcionamento *offline-first*, consulta guias de uso dos aplicativos governamentais, responde à pesquisa comunitária (exportável em `CSV`/`JSON` para a ONG e universidade) e recebe alertas *push* sempre que os bots semanais do GitHub Actions promovem novos cursos ou vagas.

---

## 3. Especificação de Requisitos Funcionais (RF)

### 3.1. Módulo Portal Web (`imigrantes-floripa` — Next.js)
1. **RF-001 (Internacionalização e Design System)**: O sistema deve renderizar todas as páginas do Portal Web nos idiomas Português (`pt`), Espanhol (`es`), Francês (`fr`) e Inglês (`en`), aplicando os tokens visuais do Design System `HIP-Floripa` (cor primária `#6E5594`).
2. **RF-002 (Trilha de Orientação Contínua e Indexável)**: O sistema deve apresentar em `/[locale]/orientacao` os passos sequenciais de regularização documental, saúde, transporte e `.gov.br` em layout vertical contínuo renderizado no servidor (SSR) com metadados estruturados JSON-LD.
3. **RF-003 (Catálogo de Cursos com Filtro de CPF)**: O sistema deve exibir em `/[locale]/novidades` os cursos gratuitos em cards contendo título, instituição, idioma, modalidade, indicador visual de exigência de CPF (**Sem CPF** vs. **Com CPF**) e link externo verificado.
4. **RF-004 (Diretório de Contatos e Mapa Geolocalizado)**: O sistema deve listar em `/[locale]/contatos` e `/[locale]/mapa` os órgãos públicos, consulados e ONGs de Florianópolis com endereço, telefone, horário e marcador interativo em mapa geolocalizado.
5. **RF-005 (Página Institucional dos Parceiros)**: O sistema deve apresentar em `/[locale]/sobre` o descritivo oficial da parceria UNICESUSC e Círculos de Hospitalidade, acervo fotográfico e reprodutor de vídeo da matéria jornalística (Band/YouTube).
6. **RF-006 (Blog Dedicado e Sitemap SEO)**: O sistema deve prover a rota `/[locale]/blog` para publicação de artigos otimizados por palavras-chave, acompanhada de geração automática de `sitemap.xml` e `robots.txt`.

### 3.2. Módulo Aplicativo Mobile (`App Imigrantes` — Android + Firebase)
7. **RF-007 (Autenticação de Usuário)**: O Aplicativo Mobile deve permitir cadastro de conta, login com e-mail/senha e recuperação de senha por e-mail utilizando o serviço `Firebase Authentication`.
8. **RF-008 (Gerenciamento de Perfil)**: O Aplicativo Mobile deve permitir que o usuário autenticado visualize e edite seus dados pessoais (`Nome`, `Nascimento`, `Naturalidade`, `Telefone`, `E-mail`, `Endereço`, `Foto`) armazenados na coleção `usuarios/{uid}` do `Cloud Firestore`.
9. **RF-009 (Checklist Documental e Trilha Offline-First — Meu Histórico)**: O Aplicativo Mobile deve permitir ao usuário marcar e desmarcar documentos obtidos e passos concluídos da trilha de orientação, persistindo o estado no `Cloud Firestore` com suporte nativo a leitura e escrita sem conexão à internet (*Offline-First*).
10. **RF-010 (Guias Didáticos de Aplicativos Essenciais)**: O Aplicativo Mobile deve exibir cartões instrucionais (`AppCard`) detalhando a finalidade e operação de aplicativos públicos e cotidianos (`.gov.br`, CTPS Digital, Meu INSS, Conecte SUS, Alô Saúde, Floripa no Ponto).
11. **RF-011 (Formulário de Pesquisa e Sugestões)**: O Aplicativo Mobile deve disponibilizar formulário para envio de sugestões, dúvidas e dados demográficos, gravando cada submissão na coleção `pesquisas` do `Cloud Firestore`.
12. **RF-013 (Notificações Push de Oportunidades)**: O Aplicativo Mobile deve receber notificações *push* via `Firebase Cloud Messaging (FCM)` quando novos cursos ou oportunidades forem publicados.

### 3.3. Módulo Automação e Governança de Dados (Backend / Bots / CLI)
13. **RF-012 (Exportador Analítico CSV/JSON)**: O sistema deve dispor de um script administrativo (Node.js/Python) autenticado via Firebase Admin SDK que exporte todos os documentos da coleção `pesquisas` do `Cloud Firestore` para arquivos locais nos formatos `CSV` e `JSON`.
14. **RF-014 (Pipeline Semanal de Descoberta e Verificação)**: O sistema deve executar workflows semanais no GitHub Actions para varrer provedores de cursos gratuitos, validar URLs de contatos governamentais e submeter rascunhos (`.pending.json`) via Pull Request para aprovação humana.
15. **RF-015 (Rotina de Vagas de Emprego)**: O sistema deve permitir a agregação automatizada de vagas de trabalho voltadas a imigrantes na Grande Florianópolis para exibição na seção `Trabalho` do Aplicativo Mobile.

---

## 4. Especificação Completa de Requisitos Não Funcionais — Norma ISO/IEC 25010

A tabela abaixo preenche integralmente o modelo exigido em [Template RNF - ISO 25010.pdf](file:///home/mateus/imigrantes-floripa/PMI%20III/Template%20RNF%20-%20ISO%2025010.pdf), cobrindo **todas as 8 características** da norma com subcaracterística explícita, métrica quantitativa, tecnologia adotada e método de verificação:

| ID | Característica ISO 25010 | Subcaracterística | Especificação Técnica e Métrica Quantitativa ("Seu RNF") | Tecnologia / Biblioteca Explícita | Método de Verificação / Teste |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **RNF-001** | **1. Eficiência de Desempenho** | Comportamento em relação ao tempo e Capacidade | As páginas públicas do Portal Web devem atingir *Largest Contentful Paint* (LCP) $\le 2,5\text{s}$ e *Time to First Byte* (TTFB) $\le 600\text{ms}$ para P95 em rede 4G; no App Mobile, a leitura do *Meu Histórico* a partir do cache local deve responder em $\le 300\text{ms}$. | Next.js 16 (SSR/SSG), Vercel Edge CDN, `Cloud Firestore` Offline Persistence SDK | Auditoria automatizada via Google Lighthouse / Chrome DevTools e medição de trace no Android Profiler. |
| **RNF-002** | **2. Segurança** | Confidencialidade, Integridade e Responsabilização | Autenticação via tokens JWT emitidos pelo `Firebase Auth` (expiração de 1h com renovação automática); senhas tratadas exclusivamente via hash criptográfico gerenciado pelo Google Identity; regras `firestore.rules` bloqueando 100% das leituras/escritas em `usuarios/{uid}` quando `request.auth.uid != uid`. | `Firebase Authentication`, `Cloud Firestore Security Rules`, HTTPS/TLS 1.3 | Testes unitários de regras de segurança no Firebase Local Emulator Suite tentando acesso cruzado entre UIDs distintos. |
| **RNF-003** | **3. Usabilidade** | Acessibilidade, Curva de Aprendizagem e Operabilidade | Razão de contraste mínima de $4,5:1$ para texto normal e $3:1$ para texto grande (WCAG 2.1 Nível AA) utilizando `#1B2440` sobre `#FBF8F4`; novos usuários devem concluir o fluxo de cadastro e marcação do primeiro item da trilha no App em $\le 3\text{ minutos}$ sem assistência externa. | Design System `HIP-Floripa`, `Inter` Font, Validação de formulários em tempo real | Auditoria de acessibilidade via axe-core / Chrome DevTools e sessão de teste de usabilidade moderado em protótipo Figma/App. |
| **RNF-004** | **4. Confiabilidade** | Disponibilidade, Tolerância a Falhas e Recuperabilidade | Disponibilidade mensal (uptime) $\ge 99,5\%$ no Portal Web; no App Mobile, 100% das funcionalidades de consulta de guias e edição do *Meu Histórico* devem operar normalmente em modo *offline* (sem internet), sincronizando automaticamente as mutações pendentes em $\le 10\text{s}$ após reconexão. | Vercel Serverless Infrastructure, `Cloud Firestore` (`PersistenceEnabled = true`), GitHub Actions Monitor Bot | Teste funcional em emulador Android com interface de rede desativada (Modo Avião), seguido de reativação e inspeção no console Firestore. |
| **RNF-005** | **5. Manutenibilidade** | Modularidade, Testabilidade e Modificabilidade | Cobertura de testes unitários automatizados $\ge 70\%$ nos módulos utilitários de validação/bots (`src/lib/` e `scripts/bot/lib/`), zero erros de compilação TypeScript ou ESLint no CI, e desacoplamento permitindo adicionar um novo provedor de cursos alterando $\le 2\text{ arquivos}$. | TypeScript, Vitest, ESLint, GitHub Actions CI | Execução automatizada de `npm run lint` e `npm test` em cada push/Pull Request. |
| **RNF-006** | **6. Portabilidade** | Adaptabilidade, Instalabilidade e Substituibilidade | O Portal Web deve adaptar seu layout sem rolagem horizontal indevida em resoluções de `320px` a `1920px` nos navegadores Chrome, Firefox, Safari e Edge; o APK/AAB do App Mobile deve instalar e executar em dispositivos Android com API Level $\ge 26$ (Android 8.0+). | Tailwind CSS (Mobile-First Grid/Flexbox), Android SDK (API 26+) | Inspeção multi-viewport via Chrome DevTools Device Mode e execução em Android Virtual Device (AVD). |
| **RNF-007** | **7. Compatibilidade** | Coexistência e Interoperabilidade | Os dados de cursos ([courses.json](file:///home/mateus/imigrantes-floripa/src/lib/data/courses.json)) e contatos devem obedecer a um schema JSON padronizado consumível tanto pelo Next.js quanto pelo App Android; o script exportador da coleção `pesquisas` deve gerar arquivos `CSV` (UTF-8 com BOM, separador vírgula, RFC 4180) e `JSON` válidos. | JSON Schema, Firebase Admin SDK, Node.js `fs`/`csv` | Validação sintática do arquivo `courses.json` via teste automatizado e abertura direta do `CSV` exportado no LibreOffice Calc / Excel / Pandas. |
| **RNF-008** | **8. Adequação Funcional** | Completude, Correção e Pertinência Funcional | 100% dos requisitos funcionais classificados como *Must Have* devem estar implementados, rastreados a uma User Story e aprovados em todos os cenários Gherkin (feliz e alternativo) sem erros críticos abertos. | Suite de Testes Gherkin / UAT, Matriz de Rastreabilidade | Execução do roteiro de validação de aceite ao final das Sprints 1 e 2. |

---

## 5. Avaliação Arquitetural — Cenários ATAM (*Architecture Tradeoff Analysis Method*)

Conforme exigido na rubrica de Revisão de Requisitos ([06-revisão-requisitos-e-planejamento-scrum.pdf](file:///home/mateus/imigrantes-floripa/PMI%20III/06-revisão-requisitos-e-planejamento-scrum.pdf)), abaixo estão especificados 3 cenários reais ATAM vinculados aos RNFs mais críticos do projeto:

### Cenário ATAM 01 — Tolerância a Falhas de Rede / Operação Offline-First (Vinculado ao `RNF-004` e `RNF-001`)
1. **Estímulo**: Um imigrante abre o Aplicativo Mobile dentro do posto da Polícia Federal para consultar os documentos pendentes na sua trilha (*Meu Histórico*) e marcar o protocolo do RNM como concluído, mas o dispositivo perde totalmente o sinal de dados móveis (4G/Wi-Fi indisponível).
2. **Fonte**: Usuário autenticado do Aplicativo Mobile (`AT-02`) operando em smartphone Android.
3. **Ambiente**: Aplicativo em produção operando em modo desconectado (*Offline* / perda abrupta de conectividade).
4. **Resposta Arquitetural**: O SDK do `Cloud Firestore` intercepta a leitura e a escrita localmente através de sua camada nativa de persistência em disco (SQLite local do Firestore), renderiza a tela `Meu Histórico` sem exibir telas de erro bloqueantes, grava a marcação na fila local de mutações pendentes e sincroniza automaticamente a transação com a nuvem assim que o dispositivo recupera conectividade.
5. **Medida de Avaliação**: Tempo de renderização local da tela $\le 300\text{ms}$ durante o estado *offline*, zero perda de dados na fila local e sincronização automática concluída em $\le 10\text{s}$ após o restabelecimento da conexão.

### Cenário ATAM 02 — Isolamento de Dados Pessoais e Prevenção de Acesso Cruzado (Vinculado ao `RNF-002`)
1. **Estímulo**: Um cliente malicioso ou script externo tenta realizar uma chamada de leitura ou modificação direta via API REST/SDK do Firestore apontando para o documento `usuarios/{uid_de_outro_imigrante}` ou tenta ler a coleção administrativa `pesquisas` usando um token de usuário comum.
2. **Fonte**: Agente externo não autorizado ou usuário autenticado tentando escalar privilégios.
3. **Ambiente**: Banco de dados NoSQL `Cloud Firestore` em produção sob operação normal.
4. **Resposta Arquitetural**: O motor de avaliação de *Security Rules* do `Cloud Firestore` valida o token JWT do `Firebase Authentication` antes de acessar qualquer documento, verifica a condição `request.auth != null && request.auth.uid == userId` para a coleção `usuarios/{userId}` e permite apenas `create` (bloqueando `read`, `update` e `delete` por clientes comuns) na coleção `pesquisas`, rejeitando imediatamente a operação com código `PERMISSION_DENIED (403)`.
5. **Medida de Avaliação**: 100% das tentativas de leitura/escrita cruzada entre UIDs distintos ou leitura não administrativa da coleção `pesquisas` são bloqueadas em $\le 50\text{ms}$ nos testes automatizados de segurança.

### Cenário ATAM 03 — Desempenho de Entrega e Indexação Orgânica Sob Carga (Vinculado ao `RNF-001`)
1. **Estímulo**: 200 usuários simultâneos e crawlers de indexação (Googlebot) requisitam as páginas `/pt/orientacao` e `/es/novidades` do Portal Web após uma ação de divulgação presencial da parceria UNICESUSC e Círculos de Hospitalidade.
2. **Fonte**: Visitantes externos via navegadores móveis (`AT-01`) e robôs de busca.
3. **Ambiente**: Portal Web Next.js em produção na Vercel durante horário de pico.
4. **Resposta Arquitetural**: As páginas pré-renderizadas / cacheadas na Edge Network da Vercel servem o HTML completo com os passos da trilha e os cards de cursos (lidos de `courses.json` estático validado em build-time) sem exigir consultas lentas a banco de dados a cada requisição.
5. **Medida de Avaliação**: Tempo de resposta *Largest Contentful Paint* (LCP) $\le 2,5\text{s}$ para 95% das requisições (P95) e disponibilidade mantida em $100\%$ durante o pico.

---

## 6. Product Backlog Completo — 10 User Stories Priorizadas (INVEST + Fibonacci + Gherkin)

Atendendo à rubrica de excelência do Planejamento Scrum ([06-revisão-requisitos-e-planejamento-scrum.pdf](file:///home/mateus/imigrantes-floripa/PMI%20III/06-revisão-requisitos-e-planejamento-scrum.pdf) — *"Mínimo de 10 User Stories priorizadas via MoSCoW, com estimativas em pontos de história Fibonacci e critérios de aceite Gherkin"*):

| ID | Plataforma | User Story (`Como... Quero... Para que...`) | RF / RNF | MoSCoW | Pontos (Fibonacci) | Resumo dos Critérios de Aceite Gherkin (Feliz + Alternativo) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **US-001** | **Portal Web** | **Como** imigrante recém-chegado, **quero** ler a trilha de orientação vertical em meu idioma (`pt`, `es`, `fr`, `en`), **para que** eu compreenda como emitir meus documentos sem criar conta. | `RF-001`, `RF-002`, `RNF-001` | **Must Have** | **3** | **Feliz**: Carrega `/[locale]/orientacao` em scroll contínuo SSR com LCP $\le 2,5\text{s}$.<br>**Alternativo**: Troca de idioma preserva a rota e metadados JSON-LD. |
| **US-002** | **Web & App** | **Como** imigrante buscando qualificação, **quero** filtrar cursos gratuitos entre "Sem CPF" e "Com CPF", **para que** eu estude imediatamente mesmo sem documento brasileiro concluído. | `RF-003`, `RNF-003` | **Must Have** | **3** | **Feliz**: Filtro "Sem CPF" exibe cursos imediatos (ex.: MS Learn).<br>**Alternativo**: Cursos com `requiresCpf: true` exibem alerta visual `#C56A3F`. |
| **US-003** | **Web & App** | **Como** imigrante em Florianópolis, **quero** consultar contatos oficiais e visualizá-los no mapa geolocalizado, **para que** eu saiba onde ir presencialmente. | `RF-004`, `RNF-006` | **Must Have** | **2** | **Feliz**: Selecionar órgão destaca marcador no mapa e exibe endereço/telefone.<br>**Alternativo**: Sem rede para o mapa, a lista textual de endereços continua visível. |
| **US-004** | **Portal Web** | **Como** visitante ou parceiro, **quero** acessar a página institucional `/sobre` e a Home `/portal` com o novo Design System roxo (`#6E5594`), **para que** eu conheça a parceria UNICESUSC e Círculos de Hospitalidade. | `RF-001`, `RF-005`, `RNF-003` | **Must Have** | **5** | **Feliz**: Exibe carrossel na Home, história da parceria, fotos e vídeo da Band.<br>**Alternativo**: Layout adapta-se sem quebras de `320px` a `1920px`. |
| **US-005** | **App Mobile** | **Como** imigrante no App Android, **quero** criar minha conta e fazer login com e-mail e senha (`Firebase Auth`), **para que** meu histórico fique protegido. | `RF-007`, `RNF-002` | **Must Have** | **5** | **Feliz**: Cadastro válido autentica e redireciona ao painel principal.<br>**Alternativo**: Senha incorreta ou e-mail inválido bloqueia acesso e exibe erro claro. |
| **US-006** | **App Mobile** | **Como** imigrante autenticado no App, **quero** visualizar e editar meus dados pessoais e de contato na tela `Perfil`, **para que** meu cadastro reflita minha situação atual. | `RF-008`, `RNF-002` | **Must Have** | **3** | **Feliz**: Edição salva no documento `usuarios/{uid}` do Firestore.<br>**Alternativo**: Tentativa de leitura/escrita em UID alheio retorna `PERMISSION_DENIED`. |
| **US-007** | **App Mobile** | **Como** imigrante autenticado, **quero** marcar documentos obtidos e passos da trilha no `Meu Histórico` com suporte *offline*, **para que** eu consulte minha lista sem internet em órgãos públicos. | `RF-009`, `RNF-004` | **Must Have** | **8** | **Feliz**: Marcação atualiza UI em $\le 300\text{ms}$ e persiste no Firestore.<br>**Alternativo**: Em Modo Avião, lê e edita do cache local e sincroniza ao reconectar. |
| **US-008** | **App Mobile** | **Como** imigrante no App, **quero** consultar os cartões didáticos (`AppCard`) sobre aplicativos essenciais (`.gov.br`, CTPS, SUS, Transporte), **para que** eu aprenda a operá-los no dia a dia. | `RF-010`, `RNF-003` | **Must Have** | **3** | **Feliz**: Exibe cards com ícone, finalidade e bullets explicativos em 4 idiomas.<br>**Alternativo**: Links externos abrem a loja oficial ou guia correspondente. |
| **US-009** | **App & CLI** | **Como** imigrante e analista da parceria, **quero** enviar o `Formulário/Pesquisa` pelo App e exportar os dados em `CSV`/`JSON`, **para que** a ONG e a universidade mapeiem demandas reais. | `RF-011`, `RF-012`, `RNF-007` | **Should Have** | **3** | **Feliz**: Submissão grava em `pesquisas` e script exporta `CSV` UTF-8 válido.<br>**Alternativo**: Formulário vazio é barrado na validação local antes do envio. |
| **US-010** | **Portal Web** | **Como** visitante vindo de buscadores, **quero** ler artigos informativos na rota dedicada `/[locale]/blog`, **para que** eu encontre respostas detalhadas sobre vida e trabalho em Florianópolis. | `RF-006`, `RNF-001` | **Should Have** | **5** | **Feliz**: Rota `/blog` lista artigos com metadados SEO e `sitemap.xml` atualizado.<br>**Alternativo**: Artigo inexistente retorna página 404 amigável no idioma ativo. |
| **US-011** | **App Mobile** | **Como** usuário do App, **quero** receber notificações *push* (`FCM`) quando novos cursos gratuitos forem publicados, **para que** eu não perca prazos de inscrição. | `RF-013`, `RNF-004` | **Should Have** | **5** | **Feliz**: Disparo via FCM exibe notificação no Android e abre a tela `Cursos`.<br>**Alternativo**: Usuário que revoga permissão de notificação continua usando o App normalmente. |
| **US-012** | **Bots / CI** | **Como** administrador técnico, **quero** que o bot semanal descubra cursos, verifique links `.gov.br` e abra Pull Requests de rascunho, **para que** o catálogo mantenha-se íntegro automaticamente. | `RF-014`, `RNF-005` | **Must Have** | **2** | **Feliz**: Workflow gera `.pending.json` e abre PR sem quebrar o build.<br>**Alternativo**: Timeouts de rede governamentais são tratados como aviso transitório sem falso positivo. |

---

## 7. Glossário Técnico e de Domínio

- **Círculos de Hospitalidade**: Organização da sociedade civil parceira do projeto, atuante no acolhimento humanitário, integração cultural e apoio à revalidação de diplomas de imigrantes e refugiados na Grande Florianópolis.
- **Conta `.gov.br` (Níveis Bronze, Prata e Ouro)**: Identidade digital única do cidadão e do residente estrangeiro no Brasil para acesso a serviços públicos federais, estaduais e municipais.
- **Curadoria de Cursos Sem CPF**: Classificação aplicada pelo ecossistema Imigrantes Floripa para destacar plataformas internacionais ou abertas (como Microsoft Learn) que permitem estudo imediato antes da emissão do CPF brasileiro.
- **Persistência Offline-First**: Padrão arquitetural em que o aplicativo lê e grava primeiramente no armazenamento local criptografado/indexado do dispositivo (gerenciado pelo SDK do Cloud Firestore), garantindo funcionamento contínuo sem internet.

