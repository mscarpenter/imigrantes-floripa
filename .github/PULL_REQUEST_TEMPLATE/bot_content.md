## Conteúdo do bot — revisão humana obrigatória

> **Não fazer merge sem checklist completo.** O deploy na Vercel ocorre após merge na `main`.

### Origem

- [ ] Rascunho gerado pelo bot / GitHub Actions (run id: ___)
- [ ] Fonte oficial conferida (URL): ___
- [ ] Data da verificação: ___

### Cursos (`bot/drafts/courses/` → `courses.json`)

- [ ] Título, instituição e link de inscrição estão corretos
- [ ] Curso ainda está com inscrições abertas (ou prazo documentado)
- [ ] É gratuito (ou custo está claro no texto)
- [ ] Texto **PT** e **ES** revisados (obrigatórios)
- [ ] **FR** e **EN**: traduzidos ou confirmado fallback na UI (`npm test` — parity dos dicionários)
- [ ] `meta.confidence` conferida (`high` / `medium` / `low`)
- [ ] Rodei `npm run bot:promote-course -- <arquivo.pending.json>` **ou** editei `courses.json` manualmente com `verifiedAt`
- [ ] `npm run bot:validate` passou

### Contatos (`bot/drafts/contacts/` → `contacts.ts`)

- [ ] `contactId` existe em `src/lib/data/contacts.ts`
- [ ] Telefone / endereço / horário conferidos no site oficial
- [ ] Coordenadas (lat/lng) conferidas se alteradas
- [ ] Patch aplicado manualmente em `contacts.ts` (o bot só propõe; não auto-aplica)

### Qualidade

- [ ] `npm test`
- [ ] `npm run build`
- [ ] Nenhum dado pessoal ou segredo no diff

### Após merge

- [ ] Deploy na Vercel concluído
- [ ] Rascunho `.pending.json` removido ou renomeado para `.approved.json`
