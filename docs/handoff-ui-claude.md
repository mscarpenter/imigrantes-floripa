# Handoff UI — Portal Imigrantes Floripa

Documento de contexto para implementação de **novas telas** em paralelo (ex.: Claude + Cursor no mesmo repositório local).

**Figma (fonte de verdade do design):**  
[Ajustes — Portal Imigrantes (FigJam)](https://www.figma.com/board/v6zp26CFVopsAUUyw5tIVx/Ajustes---Portal-Imigrantes?node-id=0-1)

**Produção:** https://imigrantes-floripa.vercel.app  
**Dev:** `npm run dev` → http://localhost:3000 (redireciona para `/pt`)

---

## 1. O que este agente deve fazer

Implementar **front-end** das telas desenhadas no FigJam, preparando a UI para receber dados que virão do bot de cursos (ainda sem scrape completo).

**Prioridade visual (FigJam):**

| Seção FigJam | Objetivo | Rota sugerida |
|--------------|----------|---------------|
| **QR Code — Apresentação** | Fluxo pós-QR: boas-vindas → hub → apresentação ou portal | Evoluir `/[lang]` e hub de onboarding |
| **Tela de Onboarding** | “O que deseja acessar?” — Guia de apps vs HIP-APP (portal) | `/[lang]` ou componente hub |
| **Apresentação** | Slides do guia de apps | `/[lang]/apresentacao` (**já existe**) |
| **to-do → Novidades** | Página de cursos gratuitos + destaques rotativos | **`/[lang]/novidades`** ou **`/[lang]/cursos`** (criar) |
| **to-do → Menu** | Menu flutuante: notícias, histórico, perfil | Componente; histórico/perfil = **“Em breve”** |
| **Tela cadastro novidade** | Form “acompanhe o desenvolvimento” | Evoluir `/[lang]` (`WelcomeForm`) |

**Não implementar neste handoff (outro agente / depois):**

- Scrape do bot (`scripts/bot/research-courses.mjs` — stub)
- Merge automático em `courses.json`
- Backend, auth, PII além do formulário já existente
- “Salvar curso”, “agenda Google”, checklist trilha — marcar **Em breve** na UI

---

## 2. Coordenação em paralelo (dois agents, um repo)

| Área | Agent Cursor (bot/dados) | Agent UI (Claude) |
|------|--------------------------|-------------------|
| `bot/` | ✅ edita | ❌ não editar |
| `src/lib/data/courses.json` | só via promote humano | pode ler; **não popular** sem PR |
| `src/app/`, `src/components/` | evitar | ✅ principal |
| `src/i18n/dictionaries/*.json` | strings de bot se necessário | ✅ toda UI nova |
| `.github/workflows/` | ✅ | ❌ |

**Git:** use branch dedicada (`feat/ui-novidades`, `feat/qr-hub`). Evite editar os mesmos arquivos ao mesmo tempo (`Header.tsx`, `pt.json`).

**Antes de commitar:** `npm run lint` + `npm test` + `npm run build`.

---

## 3. Stack e convenções

- **Next.js 16** App Router, **React 19**, **TypeScript** estrito
- **Tailwind CSS v4** + **shadcn/ui** (Base UI) — componentes em `src/components/ui/`
- **Sem backend** — dados estáticos em `src/lib/data/`
- **Ícones:** `lucide-react` e `@/components/Icon` (Phosphor names)
- **Motion:** `Reveal` em `@/components/motion/Reveal`
- **Markdown:** `react-markdown` + `remark-gfm` (módulos/blog)

### i18n — 4 idiomas na UI

| | Locales | Onde |
|---|---------|------|
| **UI** | `pt`, `es`, `fr`, `en` | `src/i18n/dictionaries/{pt,es,fr,en}.json` |
| **Conteúdo editorial** | `pt`, `es` (+ fallback PT para fr/en) | `src/lib/data/*` |

**Regra:** toda string nova de interface → **4 JSONs** com as **mesmas chaves**. Teste: `npm test` (`dictionaries.parity.test.ts`).

Padrão de página:

```tsx
// src/app/[lang]/minha-rota/page.tsx
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default async function Page({ params }: PageProps<"/[lang]/minha-rota">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  // ...
}
```

Conteúdo com fallback:

```tsx
import { resolveTranslation } from "@/i18n/resolve-translation";
const { value: t, isFallback } = resolveTranslation(item.translations, lang);
// isFallback → mostrar ContentFallbackNotice se necessário
```

---

## 4. Identidade visual (código atual)

Paleta **“Açoriano”** em `src/app/globals.css`:

| Token | Uso |
|-------|-----|
| `--primary` `#2a4d9b` | Links, nav ativa, CTAs secundários |
| `--warm` `#c56a3f` | Ação principal, FAB boas-vindas |
| `--background` `#fbf8f4` | Papel quente |
| `--foreground` `#1b2440` | Texto |
| `shadow-soft`, `rounded-2xl` / `rounded-3xl` | Cards estilo portal |

**Fontes:** Inter (sans), Sora (display/headings), Roboto Slab.

**Referências visuais locais:** `docs/design/` (QR em `docs/design/qr-site.svg`, identidade, cards de contatos).

---

## 5. Rotas existentes (não recriar do zero)

```
/[lang]                    → Entrada QR: boas-vindas + “É sua primeira vez?”
/[lang]/cadastro           → Formulário nativo (nome, nacionalidade, idioma)
/[lang]/intro              → Tutorial pós-cadastro (4 passos de navegação)
/[lang]?hub=1              → Hub retorno (“Já conheço o portal”)
/[lang]?hub=1&new=1        → Hub pós-cadastro (copy para novo usuário)
/[lang]/portal             → Home editorial (carrossel onboarding + grade módulos)
/[lang]/guias              → Redirect → /apresentacao
/[lang]/orientacao         → Trilha guiada
/[lang]/modulo/[slug]      → Módulo + tópicos
/[lang]/contatos           → Lista de contatos (17 entradas)
/[lang]/mapa               → Mapa Leaflet + paradas ônibus
/[lang]/apresentacao       → Carrossel slides (public/apresentacao/*.png)
/[lang]/blog               → Artigos
/[lang]/faq, /sobre
```

**Header** (`src/components/Header.tsx`): Início → `/portal`, Orientação, Blog, Contatos, Sobre.  
**Novas rotas** precisam de link no Header ou hub de onboarding — combinar com design.

---

## 6. Fluxo QR → Apresentação (FigJam)

Sequência implementada em **“QR Code - Apresentação”** (Fases A–C):

```
QR code escaneado  →  /pt  (ou /[lang])
    ↓
“Seja bem-vindo!” + HIP Florianópolis + “É sua primeira vez?”
    ├── Sim  →  /[lang]/cadastro  (formulário nativo → Google Forms)
    │              ↓
    │           /[lang]/intro  (tutorial 4 passos: menu, nav, idioma, trilha)
    │              ↓
    │           /[lang]?hub=1&new=1  (hub novo usuário)
    └── Já conheço  →  /[lang]?hub=1  (hub retorno)
            ↓
Hub: Guia de aplicativos  →  /[lang]/apresentacao
     Portal HIP           →  /[lang]/portal  (menu FAB: novidades, guias, perfil)
```

**QR code:** deve apontar para **`https://imigrantes-floripa.vercel.app/pt`** (ou domínio equivalente).

**Google Forms — lista de países:** replique as opções de `src/lib/welcome-nationalities.ts` (`GOOGLE_FORM_NATIONALITIES`) no dropdown “País” do formulário Google. Os **valores enviados** são os nomes em português; a UI traduz via `Intl.DisplayNames`.

**Já implementado:**

- `src/app/[lang]/page.tsx` — entrada + onboarding hub
- `src/app/[lang]/cadastro/page.tsx` + `src/components/WelcomeForm.tsx`
- `src/app/[lang]/intro/page.tsx` + `src/components/onboarding/IntroTutorial.tsx`
- `src/components/onboarding/OnboardingFlow.tsx`
- `src/lib/welcome-nationalities.ts` — ~195 países + “Outro”
- `src/app/[lang]/apresentacao/page.tsx` + `SlidesCarousel`
- `src/app/[lang]/portal/page.tsx` — carrossel + módulos
- `src/components/PortalMenuFab.tsx` — menu flutuante no portal
- `src/components/WelcomeFab.tsx` — FAB “voltar às boas-vindas” no portal

**Pendente (fora das Fases A–C):**

- Página Novidades / Cursos
- Histórico e perfil completo no menu FAB (“Em breve”)
- Scrape bot → `courses.json`

---

## 7. Página Novidades / Cursos (principal entrega UI)

### Dados — prontos para consumir

```tsx
import { getPublishedCourses } from "@/lib/data/queries";
const courses = getPublishedCourses(); // hoje: [] — courses.json vazio
```

**Tipo `Course`** (`src/lib/data/types.ts`):

```ts
{
  id, slug, status: "published",
  categorySlug,  // ex. "educacao", "trabalho"
  format: "online" | "presencial" | "hibrido",
  isFree: boolean,
  url,            // link oficial de inscrição
  enrollmentDeadline?,  // ISO date
  tags: string[],
  translations: { pt?, es?, fr?, en? }  // pt+es obrigatórios quando publicado
}
```

**Queries:** `getPublishedCourses()`, `getCourseBySlug(slug)`.

### UI esperada (FigJam “Página novidade”)

- Título **Novidades**
- Bloco **Cursos gratuitos** (grid/lista de cards)
- Tags por área: `tecnologia`, `online`, `português`, etc.
- Card de **roteiro** (ex. Escola Virtual Bradesco) — destaque rotativo, não lista enorme
- Estados vazios elegantes enquanto `courses.json` está `[]`
- Ações futuras (desabilitadas): “Salvar curso”, “Adicionar à agenda” → badge **Em breve**

### Exemplo de card (mock até bot popular)

Use estrutura compatível com `bot/drafts/courses/ev-bradesco-trilhas-tecnologia.example.json` como referência de conteúdo.

### Rotas sugeridas

```
/[lang]/novidades          → lista + destaque rotativo
/[lang]/novidades/[slug]   → detalhe (opcional fase 1)
```

Adicionar `dict.nav.*` e entrada no Header quando a página existir.

---

## 8. Bot de cursos (contexto — não implementar scrape)

Outro agente cuida do pipeline. A UI só **consome** `courses.json`.

**Fontes acordadas (prioridade fase 1 do scrape):**

1. [Escola Virtual Bradesco](https://www.ev.org.br/) — **roteiro/trilhas tech** (slot rotativo)
2. [SENAC SC gratuitos](https://portal.sc.senac.br/cursos-gratuitos)
3. [Gov SC EAD](https://www.sc.gov.br/servicos/acessar-cursos-de-educacao-a-distancia)

**Fase 2 (campanhas):** Sebrae, Udemy, Coursera, EBAC, Santander, Fundação Itaú — ver `bot/config/trusted-sources.json`.

**Critérios do bot** (`bot/config/course-criteria.json`):

- **Online** → aceito (maioria)
- **Presencial** → só Grande Floripa
- **Gratuito** ou campanha ativa
- Rascunho → PR humano → `npm run bot:promote-course`

Documentação completa: `bot/courses/README.md`.

---

## 9. Componentes reutilizáveis

| Componente | Uso |
|------------|-----|
| `Card`, `Button`, `Badge`, `Input` | `src/components/ui/` |
| `ContactRow` | padrão de card expansível (contatos) |
| `ModuleScrollGrid` | grade de cards com ícone/cor |
| `TrilhaCarousel` | carrossel full-bleed portal |
| `SlidesCarousel` | apresentação de slides |
| `ContentFallbackNotice` | aviso quando conteúdo cai em PT |
| `Reveal` | animação entrada |

**Padrão de card de curso (criar):** `src/components/courses/CourseCard.tsx`

Props sugeridas: `course`, `locale`, `dict`, `featured?: boolean`.

---

## 10. Menu flutuante (FigJam — fase posterior)

Menu a partir de ícone (canto inferior):

- Ver notícias recentes → `/novidades`
- Meu histórico → **Em breve**
- Perfil → **Em breve**

Pode ser extensão do `WelcomeFab` ou novo `PortalMenuFab`. Não bloquear entrega da página Novidades.

---

## 11. Checklist por tela

### Hub pós-QR / onboarding
- [ ] Fluxo “primeira vez?” (Sim / Já conheço)
- [ ] Dois CTAs: Apresentação + Portal
- [ ] i18n 4 línguas
- [ ] Mobile-first (FigJam enfatiza responsivo)

### Novidades / Cursos
- [ ] Rota + metadata + nav
- [ ] Lista vazia + lista com mock (1–2 cards hardcoded dev-only ou from example JSON)
- [ ] Tags: online, área, gratuito
- [ ] Link externo `course.url` (nova aba, `rel="noopener"`)
- [ ] Slot “destaque rotativo” (EV roteiro placeholder)
- [ ] `npm test` + `npm run build`

### Apresentação
- [ ] Já funciona — só ajustes visuais se o FigJam pedir
- [ ] Slides em `public/apresentacao/`

---

## 12. Comandos úteis

```bash
npm run dev          # desenvolvimento
npm run build        # verificar SSR/static
npm run test         # i18n parity + integridade
npm run lint
npx shadcn@latest add badge   # se precisar componente novo
```

---

## 13. Arquivos para ler primeiro

1. `src/app/[lang]/page.tsx` — boas-vindas
2. `src/app/[lang]/portal/page.tsx` — portal
3. `src/app/[lang]/apresentacao/page.tsx` — slides
4. `src/components/home/TrilhaCarousel.tsx` — padrão carrossel
5. `src/lib/data/types.ts` — `Course`
6. `src/lib/data/queries.ts` — `getPublishedCourses`
7. `src/i18n/dictionaries/pt.json` — chaves existentes (`welcome`, `slides`, `home`, `nav`)
8. `bot/drafts/courses/ev-bradesco-trilhas-tecnologia.example.json` — exemplo roteiro EV

---

## 14. Perguntas já decididas (não reabrir)

- Site **estático**, sem login
- Cursos entram só após **revisão humana**
- EV Bradesco = **1 publicação roteiro**, não catálogo inteiro
- UI de cursos pode ir live **antes** do bot popular `courses.json` (estado vazio OK)
- Paralelismo entre agents é **bem-vindo** — respeitar tabela da seção 2

---

_Atualizado: jun/2026 — alinhado ao FigJam “Ajustes - Portal Imigrantes” e pipeline bot em `bot/`._
