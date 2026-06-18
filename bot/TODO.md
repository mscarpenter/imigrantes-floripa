# Bot — tarefas futuras

O bot de **contatos** (links + busca DuckDuckGo) está em uso. Melhorias ficam para depois.

## Contatos (melhorias — não bloqueiam)

- [ ] Refinar parser DuckDuckGo se o HTML mudar de novo
- [ ] `bot:verify-locations` mensal — Nominatim + diff de `lat`/`lng` → rascunhos
- [ ] Tarifas Consórcio Fênix semestrais — scrape + rascunho editorial (PT/ES/FR/EN)
- [ ] Action mensal `fetch-bus-stops.mjs` → PR se GeoJSON da PMF mudar

## Cursos (em definição — ver `bot/courses/README.md`)

- [x] Fontes iniciais em `trusted-sources.json` (EV roteiro, Sebrae, SENAC, Gov SC, campanhas)
- [x] Critérios em `course-criteria.json`
- [x] Handoff UI para agente paralelo: `docs/handoff-ui-claude.md`
- [x] Scrape **fase 1:** EV roteiro + SENAC SC + Gov SC EAD (`scripts/bot/research-courses.mjs`)
- [ ] Revisar seeds Gov SC (`sc-gov-ead-seeds.json` — 2 links falharam probe)
- [ ] Scrape fase 2: campanhas (Udemy, Coursera, EBAC…)
- [ ] Página `/novidades` ou `/cursos` (UI — agente Claude)

## i18n

- **UI** (`src/i18n/dictionaries/*.json`): 4 idiomas — teste `dictionaries.parity.test.ts`
- **Conteúdo editorial** (módulos, contatos): PT + ES obrigatórios; FR/EN com fallback na UI
- **Cursos** (`courses.json` / rascunhos): PT + ES obrigatórios; FR/EN recomendados
