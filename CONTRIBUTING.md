# Como contribuir

Obrigado pelo interesse em ajudar o Imigrantes Floripa.

## Conteúdo (sem precisar mexer em código)

Você pode ajudar mesmo sem ser desenvolvedor:

- **Corrigir ou atualizar informações**: abra uma issue descrevendo o que está errado ou desatualizado.
- **Traduzir conteúdo para espanhol**: os módulos estão em `src/lib/data/modules.ts` e as strings de interface em `src/i18n/dictionaries/`.
- **Sugerir novos módulos** ou **novos contatos** úteis.

Para tudo isso, basta abrir uma issue no GitHub.

## Código

1. Faça um fork do repositório.
2. Crie uma branch descritiva: `git checkout -b adiciona-modulo-saude-mental`.
3. Rode o projeto localmente seguindo o [README](./README.md).
4. Antes do PR, confira que `npm run build` passa sem erros.
5. Abra um Pull Request explicando o que mudou e por quê.

## Convenções

- TypeScript estrito, sem `any` desnecessário.
- Componentes em `src/components/`, dados em `src/lib/data/`.
- Conteúdo bilíngue: toda nova entrada precisa ter texto em **PT e ES**.
- Use shadcn/ui quando possível (já está configurado): `npx shadcn@latest add <componente>`.

## Onde está o quê

| Quero mexer em | Caminho |
| --- | --- |
| Texto de um módulo | `src/lib/data/modules.ts` |
| Adicionar contato | `src/lib/data/contacts.ts` |
| Texto da interface | `src/i18n/dictionaries/{pt,es}.json` |
| Layout / cores | `src/app/[lang]/layout.tsx`, `src/app/globals.css` |
