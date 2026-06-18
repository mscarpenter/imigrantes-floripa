# Bot de cursos

Descobre cursos gratuitos ou relevantes para imigrantes, gera rascunhos e passa por revisão humana antes de publicar em `src/lib/data/courses.json`.

## Fluxo

```
fonte confiável (trusted-sources.json)
  → pesquisa / scrape (research-courses — em implementação)
  → bot/drafts/courses/<id>.pending.json
  → bot:validate (CI no PR)
  → revisão humana (template bot_content.md)
  → npm run bot:promote-course -- <arquivo.pending.json>
  → PR → merge → deploy Vercel
```

## Gatilhos

| Gatilho | Quando | O que faz |
|---------|--------|-----------|
| **Semanal (CI)** | workflow `bot-courses-weekly.yml` | Pesquisa fontes, gera rascunhos, notifica |
| **Manual** | `workflow_dispatch` ou edital avisado no time | Mesmo pipeline; pode acrescentar fonte/URL pontual |

## Confiança (`meta.confidence`)

| Nível | Significado | Automação |
|-------|-------------|-----------|
| `high` | Fonte oficial, dados claros (instituição, URL inscrição, gratuidade) | **Abre PR** com o `.pending.json` para revisão |
| `medium` | Provável curso válido, falta confirmar prazo ou detalhe | **Abre issue** — revisar antes de PR |
| `low` | Indício fraco ou fonte indireta | **Abre issue** — só humano promove |

Nunca faz merge automático em `courses.json`. PR automático = rascunho no repositório, não publicação.

## Idiomas (4)

| Camada | Obrigatório | Teste |
|--------|-------------|-------|
| UI do site | PT, ES, FR, EN | `dictionaries.parity.test.ts` |
| Rascunho / curso publicado | **PT + ES** | `course-schema` + `bot:validate` |
| FR + EN no curso | Recomendado; UI faz fallback para PT se ausente | Checklist no PR |

## Fontes

Edite `bot/config/trusted-sources.json`. Critérios de análise: `bot/config/course-criteria.json`.

### Tipos de fonte (`kind`)

| Kind | Exemplo | O que o bot produz |
|------|---------|-------------------|
| `institution` | NePLAc UFSC | Curso presencial em Floripa (high se edital claro) |
| `catalog_free` | Sebrae EAD, SENAC SC, Gov SC | Curso online gratuito pontual (não o catálogo inteiro) |
| `roadmap` | [Escola Virtual Bradesco](https://www.ev.org.br/) | **Uma** publicação “roteiro de trilhas” (tech, IA, programação…) — slot rotativo |
| `campaign_monitor` | Udemy, Coursera, EBAC, Santander | Destaques de campanha grátis; revisão semanal; confidence baixa/média |

### Escola Virtual (EV) — estratégia acordada

O [ev.org.br](https://www.ev.org.br/) tem centenas de cursos e trilhas (Análise de Dados, IA, Programação, TI…). **Não** listar tudo: publicar um **roteiro editorial** que aponta para as trilhas de tecnologia + link oficial. Esse item pode **rotacionar** no bloco de novidades da futura página `/cursos` (`rotationSlots.featured_online_roadmap`).

## Critérios de análise do bot

Resumo — detalhes em `course-criteria.json`:

### 1. Formato

| Formato | Regra |
|---------|--------|
| **Online** | Aceito (maioria). Pode ser Brasil ou internacional; preferir PT ou resumo bilíngue no portal. |
| **Presencial / híbrido** | **Só Grande Floripa** (Florianópolis, São José, Palhoça, etc.). Fora → rejeitar ou `low`. |

### 2. Custo

- Só entra se **gratuito** ou **campanha gratuita ativa** na semana da checagem.
- Udemy/Coursera/EBAC/Santander: tratar como **campanha** — no máximo `medium` até humano confirmar; costuma expirar.

### 3. Relevância para imigrantes

Prioridade alta: português, trabalho, tecnologia, empreendedorismo, integração.  
Sebrae finanças/marketing: OK se gratuito e útil para renda.  
Temas muito de nicho (ex. franquias) → ignorar salvo revisão manual.

### 4. Confiança → automação

| Nível | Quando | CI |
|-------|--------|-----|
| `high` | Gov, UFSC, EV roteiro, SENAC gratuito confirmado | Abre **PR** com rascunho |
| `medium` | Sebrae, Itaú, campanha Santander confirmada | **Issue** |
| `low` | Udemy/Coursera/EBAC, link genérico com UTM | **Issue**; máx. 3 sugestões/fonte |

### 5. Idiomas no rascunho

PT + ES obrigatórios; FR/EN recomendados (UI faz fallback).

## Comandos

```bash
npm run bot:validate              # valida *.pending.json no PR
npm run bot:research-courses      # pesquisa (quando BOT_RESEARCH_COURSES=1)
npm run bot:promote-course -- bot/drafts/courses/foo.pending.json
```

## Notificações por e-mail

O GitHub **não envia e-mail customizado** sem integração externa (SMTP, Resend, SendGrid). O caminho **gratuito e recomendado**:

### 1. Watch no repositório (e-mail grátis)

1. No GitHub: **Watch** → **Custom**
2. Marque **Issues** e **Pull requests**
3. Labels úteis: `bot`, `bot-courses`, `bot-contacts`

Quando o workflow abre issue ou PR, você recebe e-mail do GitHub com resumo e link.

### 2. O que o CI envia hoje

- **`high`** → PR com título `bot(courses): rascunho para revisão — <draftId>` + corpo com fonte, confiança e checklist
- **`medium` / `low`** → issue `Bot: revisar cursos (pesquisa semanal)` com lista de rascunhos
- Artefato `bot-courses-report` (relatório JSON + logs) — 30 dias no Actions

### 3. E-mail direto (opcional, futuro)

Se quiser inbox sem depender do GitHub: secret `BOT_NOTIFY_EMAIL` + API Resend/SendGrid no workflow. Não configurado por padrão (custo/zero-config).

## Estado atual

- [x] Schema Zod, `courses.json`, `promote-course`, `bot:validate`
- [x] Exemplo em `bot/drafts/courses/*.example.json`
- [x] Workflow semanal (issue/PR conforme confiança)
- [x] Script de descoberta fase 1 (`research-courses.mjs` + `researchers/`)
- [ ] Seeds Gov SC — revisar `bot/config/sc-gov-ead-seeds.json`
- [ ] Página `/cursos` no site (UI em andamento)
