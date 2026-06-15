# Backlog — Identidade visual (sair do monocromático)

**Status:** em decisão — usuário avaliando. Amostras geradas e salvas; serão levadas ao Figma para compartilhar.

**Contexto:** o monocromático roxo foi útil para prototipar, mas dá ar clínico/protótipo (branco puro `#ffffff` + roxo único `#6e5594` em tudo). Objetivo: criar identidade autêntica de Floripa, com mais calor.

**Leaning do usuário (jun/2026):** gostou **muito da A (Ilha)**, gostou também da **B (roxo evoluído)**, e achou a **D (Açoriano)** bem legal. Ainda vai decidir.

---

## Achados técnicos (facilitam a troca)

- Tokens de cor ficam em `src/app/globals.css` → `:root` e `.dark`.
- **Já existe** mapa de cor por categoria em `src/lib/data/colors.ts` (`colorClasses`: blue, rose, orange…), mas está **desligado**: `colorsFor()` sempre retorna `monochrome` (roxo). Religar é barato → habilita a "opção C" (cor por categoria) sobre qualquer base.
- `--font-heading` hoje = `--font-sans` (título = corpo). Trocar a display dá identidade rápida.

## As 2 alavancas de maior impacto

1. **Base/papel:** sair do branco puro para off-white quente (areia/papel) — mata o ar clínico e valoriza foto.
2. **Estratégia de acento:** um acento forte (editorial) vs multicor por categoria (vibrante, ajuda navegação).

---

## Amostras geradas (mock: paleta + home com module cards)

Arquivos em `docs/design/identidade/`:

### A — Ilha (mar + areia) · `identidade-A-ilha.png`
Base areia, teal petróleo nos ícones, coral/terracota no CTA. A que mais "fala Floripa"; resolve o incômodo do branco e aquece sem terracota-em-tudo.

| Papel | Areia | Primária (teal) | Acento (coral) | Tinta | Cinza quente |
|---|---|---|---|---|---|
| `#FAF6EF` | `#FAF6EF` | `#1F6F7A` | `#E07A53` | `#211D2B` | `#E6E0D6` |

Tipografia testada: **Fraunces** (display) + **Inter** (corpo).

### B — Evoluir o roxo · `identidade-B-roxo.png`
Mantém o roxo da marca (reconhecimento) + fundo papel quente + acento âmbar/laranja. Menor risco/esforço.

| Papel | Primária (roxo) | Acento (âmbar) | Tinta | Lilás-cinza |
|---|---|---|---|---|
| `#FBF8F4` | `#6E5594` | `#E0934F` | `#211D2B` | `#E7E1EC` |

### D — Açoriano (azulejo) · `identidade-D-acoriano.png`
Cobalto + terracota + faixa de azulejo. Personalidade cultural mais forte. **Usar o padrão com parcimônia** (faixas finas, não em tudo) pra não pesar/datar.

| Cal | Primária (cobalto) | Acento (terracota) | Tinta (índigo) | Azul-cinza |
|---|---|---|---|---|
| `#FCFBF8` | `#2A4D9B` | `#C56A3F` | `#1B2440` | `#DDE3EE` |

---

## Cruzamentos possíveis (quando retomar)

- **Ilha + faixa de azulejo (D)** como assinatura sutil → autenticidade + caráter.
- **Qualquer base + cor por categoria (C)** religando `colorClasses` → vibração e wayfinding (transporte=azul, saúde=verde, trabalho=âmbar…).

## Pontos a definir antes de implementar

- [ ] Direção final (A / B / D / cruzamento)
- [ ] Acento único vs cor por categoria
- [ ] Display de título (Fraunces? outra?) e licença/carregamento
- [ ] Tratamento de foto (natural vs duotone na cor da marca) — relevante p/ blog
- [ ] Contraste/acessibilidade (AA) em base quente + acentos
- [ ] Dark mode equivalente para a paleta escolhida

## Próximo passo sugerido

Ao decidir: gerar a proposta de **tokens `:root`/`.dark`** + amostra final, depois aplicar em `globals.css` (e religar `colors.ts` se for cor por categoria).
