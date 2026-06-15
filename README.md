# Imigrantes Floripa

Portal público e open-source para imigrantes que chegam ou se preparam para morar em Florianópolis. Trilha guiada com módulos práticos (documentos, saúde, transporte, trabalho, etc.) e diretório de contatos úteis. Disponível em português e espanhol.

**🌐 Acesse agora:** [imigrantes-floripa.vercel.app](https://imigrantes-floripa.vercel.app)

Projeto de extensão da **CESUTech** — *Conectando Gerações e Impulsionando o Futuro e o Protagonismo Digital* — vinculado ao Centro Universitário Cesusc (CESUSC), em Florianópolis.

> Status: **MVP em desenvolvimento.** O site público funciona com dados estáticos (conteúdo em `src/lib/data/`).

## Stack

- **Next.js 16** (App Router, Turbopack)
- **React 19** + **TypeScript**
- **Tailwind CSS v4** + **shadcn/ui** (Base UI)
- Conteúdo estático em `src/lib/data/` (sem banco de dados)
- i18n nativo do Next 16 (dictionaries em `src/i18n/dictionaries/`)

## Rodar localmente

Pré-requisitos: **Node.js 20.9+** e **npm**.

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000). A raiz redireciona para `/pt` (ou `/es`, dependendo do seu navegador).

## Estrutura

```
src/
├── app/[lang]/         # rotas localizadas (pt, es)
│   ├── page.tsx        # home
│   ├── trilha/         # lista de módulos
│   ├── modulo/[slug]/  # conteúdo de um módulo
│   ├── contatos/       # diretório de contatos
│   ├── mapa/           # mapa dos contatos
│   ├── blog/           # artigos
│   ├── faq/
│   └── sobre/
├── components/         # Header, Footer, LanguageSwitcher, cards
├── i18n/               # config + dictionaries pt/es
├── lib/
│   └── data/           # conteúdo estático (módulos, categorias, contatos)
└── proxy.ts            # detecção de locale + redirect (era middleware no Next 15)
```

## Contribuir

Aceitamos contribuições de conteúdo (textos, traduções, novos contatos) e código. Veja [CONTRIBUTING.md](./CONTRIBUTING.md).

Para reportar informações desatualizadas, abra uma issue no GitHub.

## Licença

[MIT](./LICENSE)
