# Levantamento Completo — Imigrantes Floripa

**Repositório:** [mscarpenter/imigrantes-floripa](https://github.com/mscarpenter/imigrantes-floripa)
**Descrição:** Portal público e open-source para imigrantes em Florianópolis.
**Projeto de extensão:** CESUTech / Centro Universitário Cesusc (CESUSC) + Círculos de Hospitalidade.
**Deploy:** [imigrantes-floripa.vercel.app](https://imigrantes-floripa.vercel.app)
**Status:** MVP em desenvolvimento — conteúdo estático (sem banco de dados).

---

## Issue #7 — Falhas nos Jobs Automatizados

> **Título:** Bot: falhas recentes nos jobs automatizados
> **Aberta por:** `github-actions[bot]` em 10/09/2026
> **Origem:** Workflow `bot-monitor.yml` (roda diariamente às 06h BRT)

### Falhas reportadas (últimos 8 dias)

| Workflow | Run | Link |
|----------|-----|------|
| Bot — pesquisar cursos (#12) | 34376717083 | [Actions](https://github.com/mscarpenter/imigrantes-floripa/actions/runs/34376717083) |
| Bot — monitoria (#84) | 34357595848 | [Actions](https://github.com/mscarpenter/imigrantes-floripa/actions/runs/34357595848) |
| Bot — monitoria (#83) | 34231574407 | [Actions](https://github.com/mscarpenter/imigrantes-floripa/actions/runs/34231574407) |
| Bot — pesquisar e checar contatos (#12) | 34148601503 | [Actions](https://github.com/mscarpenter/imigrantes-floripa/actions/runs/34148601503) |
| Bot — monitoria (#82) | 34135318633 | [Actions](https://github.com/mscarpenter/imigrantes-floripa/actions/runs/34135318633) |
| Bot — monitoria (#81) | 34033823668 | [Actions](https://github.com/mscarpenter/imigrantes-floripa/actions/runs/34033823668) |
| Bot — monitoria (#80) | 33966107570 | [Actions](https://github.com/mscarpenter/imigrantes-floripa/actions/runs/33966107570) |
| Bot — monitoria (#79) | 33876929694 | [Actions](https://github.com/mscarpenter/imigrantes-floripa/actions/runs/33876929694) |
| Bot — monitoria (#78) | 33760525981 | [Actions](https://github.com/mscarpenter/imigrantes-floripa/actions/runs/33760525981) |

> [!WARNING]
> São 9 falhas consecutivas em 8 dias. Como o repo ficou parado 3 meses, é provável que:
> - Os scrapers do bot estejam quebrando por mudanças nos sites-alvo (SENAC, SC Gov EAD, EV Bradesco)
> - O workflow de monitoria (`bot-monitor.yml`) auto-reporta as falhas dos outros bots, criando um efeito cascata de issues
> - Pode haver secrets/tokens expirados no GitHub Actions

---

## Stack Tecnológica

| Camada | Tecnologia |
|--------|-----------|
| Framework | **Next.js 16.2.6** (App Router) |
| UI | **React 19.2.4** + **TypeScript** (strict) |
| Estilo | **Tailwind CSS v4** + **shadcn/ui** (Base UI) |
| Ícones | **Lucide** + **Phosphor Duotone** |
| Mapas | **Leaflet** + **React-Leaflet** + **MarkerCluster** |
| Markdown | **react-markdown** + **remark-gfm** |
| Validação | **Zod 4** |
| Testes | **Vitest 4** |
| Deploy | **Vercel** |
| PWA | Service Worker customizado (`public/sw.js`) |

---

## Estrutura de Diretórios

```
imigrantes-floripa/
├── .github/workflows/        # 5 workflows CI/CD + bot
├── bot/                       # Sistema de automação (drafts, config, reports)
├── docs/                      # Design, conteúdo editorial, handoff
├── public/                    # Assets estáticos, ícones PWA, GeoJSON
├── scripts/                   # 17+ scripts utilitários
│   ├── bot/                   #   Scrapers e promotores de cursos
│   └── lib/                   #   Utilitários compartilhados
├── src/
│   ├── app/                   # Rotas Next.js (App Router)
│   │   ├── [lang]/            #   14 páginas localizadas
│   │   ├── api/welcome/       #   Proxy para Google Forms
│   │   └── manifest.ts        #   PWA manifest
│   ├── components/            # ~40 componentes React
│   ├── i18n/                  # Config + 4 dicionários (pt, es, fr, en)
│   ├── lib/data/              # Camada de dados estáticos (~152KB modules.ts)
│   ├── proxy.ts               # Detecção de locale (substitui middleware)
│   └── test/                  # Helpers de teste
├── next.config.ts
├── vitest.config.ts
├── components.json            # shadcn/ui config
└── package.json
```

---

## Rotas da Aplicação (14 páginas)

| Rota | Descrição | Componente principal |
|------|-----------|---------------------|
| `/[lang]` | Landing page — QR code entry + onboarding | `OnboardingFlow` |
| `/[lang]/portal` | Home editorial — grid de módulos + carrossel | `ModuleScrollGrid`, `TrilhaCarousel` |
| `/[lang]/cadastro` | Formulário de boas-vindas | `WelcomeForm` |
| `/[lang]/intro` | Tutorial interativo de 4 passos | `IntroTutorial` |
| `/[lang]/onboarding` | Hub de onboarding dedicado | `OnboardingFlow` |
| `/[lang]/orientacao` | Trilha guiada — 8 módulos sequenciais | Módulos com tracking de progresso |
| `/[lang]/modulo/[slug]` | Visão geral de um módulo | `TopicCard` + contatos |
| `/[lang]/modulo/[slug]/[topic]` | Conteúdo detalhado de um tópico | `MarkdownContent`, `TableOfContents` |
| `/[lang]/contatos` | Diretório de serviços públicos | `ContactsBrowser` + `ContactRow` |
| `/[lang]/mapa` | Mapa interativo de contatos | `ContactsMap` + `MapCanvas` (Leaflet) |
| `/[lang]/novidades` | Cursos gratuitos + destaques editoriais | `CourseCard`, cards de destaque |
| `/[lang]/blog` | Blog com artigos | `BlogCarousel` + `PostCard` |
| `/[lang]/blog/[slug]` | Artigo individual | Markdown + diagramas SVG |
| `/[lang]/apresentacao` | Slides do guia de apps | `SlidesCarousel` |
| `/[lang]/faq` | Perguntas frequentes | Accordion |
| `/[lang]/sobre` | Sobre o projeto | `FeedbackDialog` |
| `api/welcome` | POST → Google Forms proxy | Server route |

> [!NOTE]
> `/[lang]/trilha` redireciona permanentemente para `/[lang]/orientacao` via `next.config.ts`.
> `/[lang]/guias` redireciona para `/[lang]/apresentacao`.

---

## Componentes (~40 componentes)

### Componentes de Layout/Navegação
- **`Header.tsx`** — Barra sticky com blur, logo, links ativos, `LanguageSwitcher`
- **`Footer.tsx`** — Rodapé global com créditos
- **`LanguageSwitcher.tsx`** — Toggle pt/es/fr/en com bandeiras
- **`PortalMenuFab.tsx`** — FAB flutuante com menu de links rápidos + badge de notificação
- **`CompassMark.tsx`** — SVG de bússola que gira no scroll

### Componentes de Conteúdo
- **`MarkdownContent.tsx`** — Renderer Markdown completo (headings com anchor, callouts, tabelas, diagramas)
- **`ModuleCard.tsx`** — Card de módulo com ícone, cor, checkmark de visitado
- **`ModuleScrollGrid.tsx`** — Grid animada de módulos
- **`TopicCard.tsx`** — Card de tópico dentro de um módulo
- **`ContactCard.tsx`** / **`ContactRow.tsx`** — Exibição de contatos (estático / interativo com modal)
- **`ContactsBrowser.tsx`** — Busca e filtros por categoria

### Componentes de Artigos/Blog
- **`ReadingProgress.tsx`** — Barra de progresso de leitura
- **`TableOfContents.tsx`** — TOC sticky/collapsível com IntersectionObserver
- **`BlogCarousel.tsx`** / **`PostCard.tsx`** — Carrossel e cards de posts
- **Diagramas SVG** — `SaudeQualPortaDiagram`, `TransportIntegracaoDiagram`, `TransportTerminaisDiagram`

### Componentes de Onboarding
- **`OnboardingFlow.tsx`** — Máquina de estados multi-step
- **`IntroTutorial.tsx`** — Tutorial de 4 passos
- **`WelcomeForm.tsx`** — Formulário multi-step → Google Forms
- **`WelcomeOptionCard.tsx`** — Cards de seleção no hub

### Componentes de Mapa
- **`ContactsMap.tsx`** — Layout com accordion de categorias, busca, geolocalização
- **`MapCanvas.tsx`** — Integração Leaflet com markers coloridos e clusters

### Componentes de Cursos
- **`CourseCard.tsx`** — Card de curso com badges (online/presencial), status de inscrição
- **`EvBradescoHighlight.tsx`** / **`MicrosoftLearnHighlight.tsx`** — Cards promocionais

### UI Primitivos (shadcn/ui)
- `badge`, `button`, `card`, `input`, `label`, `separator`

---

## Sistema de Internacionalização (i18n)

- **4 locales de UI:** `pt`, `es`, `fr`, `en` (default: `pt`)
- **2 locales de conteúdo editorial:** `pt`, `es` (fr e en fazem fallback para pt com aviso)
- **Dicionários:** `src/i18n/dictionaries/pt.json`, `es.json`, `fr.json`, `en.json`
- **Fallback progressivo:** `resolveTranslation()` retorna conteúdo pt + flag `isFallback` → `ContentFallbackNotice`
- **Teste de paridade:** Garante que todos os dicionários têm a mesma hierarquia de chaves
- **Roteamento:** `src/proxy.ts` detecta `Accept-Language` e redireciona para `/${locale}`

---

## Camada de Dados (100% estática)

### 8 Módulos Temáticos (27 tópicos)

| Módulo | Slug | Tópicos |
|--------|------|---------|
| Documentos Essenciais | `documentos-essenciais` | CPF, CRNM, CTPS digital |
| Saúde e SUS | `saude-sus` | Cartão SUS, Onde buscar atendimento, SAMU, Vacinação |
| Transporte Público | `transporte-publico` | Passe Rápido, Tarifa Social, Apps úteis |
| Trabalho e Renda | `trabalho-e-renda` | Direitos CLT, Vagas, Alternativas, Golpes |
| Assistência Social | `assistencia-social` | CRAS/CadÚnico, CREAS, ONGs, Círculos |
| Educação | `educacao` | Matrícula escolar, Português, Diplomas, Cursos |
| Moradia | `moradia` | Alugar, Alternativas, Emergência, Programas |
| Emergências | `emergencias` | Telefones, Violência, Xenofobia, Documentos perdidos |

### 8 Categorias com cores Tailwind
`documentos` (Azul), `saude` (Rosa), `transporte` (Laranja), `trabalho` (Esmeralda), `assistencia-social` (Violeta), `educacao` (Teal), `moradia` (Âmbar), `emergencias` (Vermelho)

### Contatos
Polícia Federal, Receita Federal, CRAS, UPAs, Círculos de Hospitalidade, Consórcio Fênix, etc. — com coordenadas geo, telefone, horários, traduções.

### Blog
7 artigos: guias de transporte, acesso ao SUS, apps essenciais, rotas de aprendizado tech.

### Cursos
Cursos publicados (NePLAc UFSC, SENAC SC) + drafts pendentes do bot.

---

## Sistema de Bot (Automação)

### Filosofia: Human-in-the-loop
O bot **nunca** escreve diretamente nos dados de produção. Ele gera:
- **Drafts** (`.pending.json`) em `bot/drafts/` para review humano
- **Reports** em `bot/reports/` com logs de execução
- **Pull Requests** automáticos para drafts de alta confiança
- **Issues** para alertas e problemas encontrados

### Pipeline de Cursos
1. Scrapers pesquisam fontes confiáveis (UFSC, IFSC, SENAC, EV Bradesco, SC Gov EAD)
2. Geram drafts com `meta.confidence` (high/medium/low)
3. Validação automática via Zod (`bot:validate`)
4. PRs automáticos para `high` / Issues para `medium`/`low`
5. Promoção manual: `npm run bot:promote-course`

### Config do Bot
- `bot/config/course-criteria.json` — Regras de avaliação de cursos
- `bot/config/trusted-sources.json` — Instituições whitelisted
- `bot/config/trusted-domains.json` — Domínios oficiais
- `bot/config/sc-gov-ead-seeds.json` — Seeds para cursos EAD do governo SC

### 5 GitHub Workflows

| Workflow | Trigger | O que faz |
|----------|---------|-----------|
| `ci.yml` | Push main / PRs | Lint + Testes |
| `bot-validate.yml` | PRs em `bot/**` | Valida drafts contra Zod |
| `bot-contacts-weekly.yml` | Seg 09h BRT | Pesquisa contatos + checa links |
| `bot-courses-weekly.yml` | Qua 09h BRT | Pesquisa cursos + cria PRs |
| `bot-monitor.yml` | Diário 06h BRT | Monitora falhas → abre issue (#7) |

---

## Testes (10 suítes Vitest)

| Teste | Descrição |
|-------|-----------|
| `dictionaries.parity.test.ts` | Paridade de chaves entre dicionários i18n |
| `trusted-domains.test.ts` | Validação de whitelist de domínios |
| `bot-drafts.test.ts` | Validação de `.pending.json` contra Zod |
| `bot-research-contacts.test.ts` | Teste live de pesquisa de contatos |
| `bot-research-courses.test.ts` | Teste live de pesquisa de cursos |
| `contact-links.test.ts` | Probe HTTP de URLs de contatos |
| `course-schema.test.ts` | Schema de cursos (campos, slugs, bilíngue) |
| `data-integrity.test.ts` | Integridade relacional (refs, categorias, cores, coords) |
| `novidades-alert.test.ts` | Lógica de alerta localStorage |
| `welcome-submit.test.ts` | Encoding de payload Google Forms |

---

## Scripts Utilitários (17+)

| Script | Finalidade |
|--------|-----------|
| `fetch-health-units.mjs` | GeoJSON de UBSs/UPAs via GeoPortal + OSM |
| `fetch-schools.mjs` | GeoJSON de escolas e universidades |
| `fetch-bus-stops.mjs` | Paradas de ônibus via WFS municipal |
| `validate-bus-stops.mjs` | Validação cruzada OSM vs GeoPortal |
| `build-terminais-map.mjs` | Mapa estático dos 6 terminais |
| `geocode-contacts.mjs` | Geocodificação via Nominatim |
| `gen-qr.py` | Gerador QR code em Python puro |
| `decode-qr.py` | Decodificador para testes |
| `fetch-app-shots.mjs` | Screenshots de apps via iTunes API |
| `fetch-play-shots.mjs` | Screenshots via Google Play |
| `fetch-store-links.mjs` | URLs verificadas das lojas |
| `record-journey.mjs` | Gravação de vídeo da jornada (Puppeteer + FFmpeg) |
| `export-portal-content.ts` | Dump de dados para Markdown |
| `export-google-form-nationalities.mjs` | Lista de países para Google Forms |
| `verify-google-form.mjs` | Validação de entry IDs do Forms |
| `bot/promote-course-draft.mjs` | Promoção de draft → produção |
| `bot/research-courses.mjs` | Orquestrador de scrapers |

---

## Design & Identidade

- **Identidade "Açoriano"**: primary `#2a4d9b`, warm `#c56a3f`, bg `#fbf8f4`, text `#1b2440`
- **Tipografia**: Inter (body), Sora (headings), Roboto Slab, Roboto
- **Docs de design**: `docs/design/` com QR codes, explorations de cor/tipografia, screenshots de cards
- **Handoff**: `docs/handoff-ui-claude.md` define protocolo de coordenação multi-agente

---

## Observações Gerais

1. **Projeto bem estruturado** — Separação clara entre dados, componentes, i18n, e automação
2. **Dados 100% estáticos** — Sem banco de dados, tudo em TypeScript tipado
3. **Bot sofisticado** — Pipeline de descoberta/validação/promoção de cursos com human-in-the-loop
4. **PWA** — Service worker, manifest, ícones mascaráveis
5. **4 idiomas** — PT/ES completos, FR/EN com fallback
6. **Mapas** — Leaflet com dados GeoJSON de saúde, educação, transporte
7. **User flow bem pensado** — QR Code → Onboarding → Tutorial → Portal → Trilha
8. **Issue #7 precisa de atenção** — 9 falhas consecutivas nos bots, provável causa: repo parado 3 meses causou drift nos scrapers vs sites-alvo
