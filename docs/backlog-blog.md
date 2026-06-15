# Backlog — Blog (Imigrantes Floripa)

**Status:** anotado — testar quando houver janela. Ideia levantada após os primeiros posts ficarem longos.

**Contexto:** os textos do blog (transporte, saúde) ficaram extensos. Falta apoio visual pra quebrar a leitura e destacar os pontos-chave, especialmente no mobile.

---

## Ideia: apoio visual nos posts longos

Usar imagens para evidenciar os **pontos altos** do texto e dar respiro à leitura. Variações a testar:

| # | Recurso | Onde | Notas |
|---|---------|------|-------|
| 1 | **Imagens entre o texto** | a cada seção/ponto-chave | Ilustra o conceito (ex.: TICEN, cartão Passe Rápido, UPA vs UBS). Quebra blocos longos |
| 2 | **Imagem de fundo** | atrás de blocos de destaque / callouts | Marcar trechos importantes com fundo leve + imagem sutil (cuidar de contraste/legibilidade) |
| 3 | **Bordas / molduras** | cards de destaque, citações | Reforço visual em "pulos do gato", avisos e blocos de dado-chave |

**Objetivo:** menos parede de texto, mais escaneabilidade (alinhado à skill de redação: foco mobile, parágrafos curtos).

---

## Pontos a definir no teste

- [ ] Fonte das imagens (geradas, banco livre, fotos reais da cidade?) e licença
- [ ] Sintaxe no Markdown dos posts (`posts.ts`) — imagem inline já funciona via `MarkdownContent`; avaliar componente custom para destaque/fundo/borda
- [ ] Performance: `next/image`, `sizes`, lazy loading (posts podem ter várias imagens)
- [ ] Acessibilidade: `alt` significativo; contraste em imagem de fundo
- [ ] Responsividade: comportamento das imagens de fundo/molduras no mobile
- [ ] Consistência visual com o tema do portal (cantos arredondados, sombras suaves)

---

## Próximo passo sugerido

Fazer um **protótipo num post** (ex.: o de transporte) com as 3 variações lado a lado pra decidir o padrão antes de aplicar nos demais.
