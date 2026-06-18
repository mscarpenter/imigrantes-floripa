# Rota de ensino — Escola Virtual Fundação Bradesco (tecnologia)

> **Status:** levantamento para revisão editorial (jun/2026)  
> **Uso previsto:** página `/novidades`, destaque rotativo de cursos, copy PT (+ ES depois)  
> **Fonte dos dados:** [ev.org.br](https://www.ev.org.br/) — catálogo, trilhas e áreas de interesse (scraping em 18/06/2026)  
> **Dados brutos:** `bot/reports/ev-bradesco-research.json`, `ev-bradesco-catalog-full.json`, `ev-bradesco-areas.json`

---

## 1. Confirmação: o que já existe vs. o que falta

| Item | Status |
|------|--------|
| Strings de UI da página Novidades (`src/i18n/dictionaries/*.json`) | ✅ Existe (rótulos, empty states, formatos) |
| Página `/novidades` implementada | 🔄 Em andamento (Claude / UI) |
| `courses.json` publicado | ❌ Vazio — aguarda promoção de rascunhos do bot |
| **Rascunho editorial** (textos longos, rota narrativa, copy para imigrantes) | ❌ **Este documento é o primeiro rascunho estruturado** |
| Rascunho bot `ev-bradesco-trilhas-tecnologia.pending.json` | ✅ Metadados mínimos (roadmap), não é texto final |

**Para você escrever:** use as seções marcadas com `📝 NOTA EDITORIAL` ao final de cada bloco.

---

## 2. Sobre a Escola Virtual Bradesco (EV)

| Campo | Informação |
|-------|------------|
| Instituição | Fundação Bradesco — Escola Virtual |
| Site | https://www.ev.org.br/ |
| Custo | **100% gratuito** |
| Modalidade | **100% online**, no seu ritmo |
| Idioma | Português (Brasil) |
| Certificado | Gratuito após conclusão + avaliação (regra típica: ≥ 70% de aproveitamento; alguns cursos Office 365 usam quiz → certificado de participação) |
| Cadastro | Gratuito no site (conta EV) |
| Relevância para imigrantes | Qualificação digital gratuita, certificados reconhecidos no mercado brasileiro, foco em empregabilidade e produtividade |

### Áreas de interesse no site (8)

| Área | URL | Cursos no catálogo atual |
|------|-----|--------------------------|
| Análise de Dados | [/areas-de-interesse/analise-de-dados](https://www.ev.org.br/areas-de-interesse/analise-de-dados) | 3 |
| Inteligência Artificial | [/areas-de-interesse/inteligencia-artificial](https://www.ev.org.br/areas-de-interesse/inteligencia-artificial) | 13 |
| Programação | [/areas-de-interesse/programacao](https://www.ev.org.br/areas-de-interesse/programacao) | 2 |
| Tecnologia da Informação | [/areas-de-interesse/tecnologia-da-informacao](https://www.ev.org.br/areas-de-interesse/tecnologia-da-informacao) | 2 |
| Produtividade | [/areas-de-interesse/produtividade](https://www.ev.org.br/areas-de-interesse/produtividade) | 18 |
| Educação e Tecnologia | [/areas-de-interesse/educacao-e-tecnologia](https://www.ev.org.br/areas-de-interesse/educacao-e-tecnologia) | 5 |
| Negócios e Inovação | [/areas-de-interesse/negocios-e-inovacao](https://www.ev.org.br/areas-de-interesse/negocios-e-inovacao) | 6 |
| Desenvolvimento Pessoal e Profissional | [/areas-de-interesse/desenvolvimento-pessoal-e-profissional](https://www.ev.org.br/areas-de-interesse/desenvolvimento-pessoal-e-profissional) | 14 |

**Observação:** o catálogo público listava **61 cursos** no total (paginação em `/cursos`). Alguns cursos aparecem em mais de uma área; trilhas agrupam sequências recomendadas.

---

## 3. Trilhas de Conhecimento (9 trilhas)

Trilhas são **sequências curadas** pela EV — boas para montar um “plano de estudos” sem escolher curso a curso.

| Trilha | Duração | Cursos | Foco | URL |
|--------|---------|--------|------|-----|
| **Inteligência Artificial para Organizações do Terceiro Setor** | 10h | 4 | IA ética + prática para ONGs/comunidade | [trilha](https://www.ev.org.br/trilhas-de-conhecimento/inteligencia-artificial-para-organizacoes-do-terceiro-setor) |
| **Office na Prática** | 48h | 3 | Word, Excel, PowerPoint — mercado de trabalho | [trilha](https://www.ev.org.br/trilhas-de-conhecimento/office-na-pratica) |
| **Office 365** | 5h | 5 | Outlook, OneDrive, OneNote, Planner, Teams | [trilha](https://www.ev.org.br/trilhas-de-conhecimento/office-365) |
| **Excel 2016 (básico → avançado)** | 65h | 3 | Planilhas completas | [trilha](https://www.ev.org.br/trilhas-de-conhecimento/excel-2016-do-basico-ao-avancado) |
| **Pacote Office 2016** | 110h | 8 | Word + Excel + PowerPoint completos | [trilha](https://www.ev.org.br/trilhas-de-conhecimento/pacote-office-2016) |
| **Word 2016 (básico → avançado)** | 29h | 3 | Processador de textos | [trilha](https://www.ev.org.br/trilhas-de-conhecimento/word-2016-do-basico-ao-avancado) |
| **PowerPoint 2016 (básico → avançado)** | 16h | 2 | Apresentações | [trilha](https://www.ev.org.br/trilhas-de-conhecimento/powerpoint-2016-do-basico-ao-avancado) |
| **Aprimoramento Profissional** | 48h | 5 | Soft skills + empregabilidade | [trilha](https://www.ev.org.br/trilhas-de-conhecimento/aprimoramento-profissional) |
| **Inteligência Emocional** | 24h | 4 | Regulação emocional, resiliência, decisões | [trilha](https://www.ev.org.br/trilhas-de-conhecimento/inteligencia-emocional) |

### Cursos dentro das trilhas tech-relevantes

#### Trilha: IA para Terceiro Setor (4 cursos, ~10h)

1. **Ética na Era da IA** (2h) — viés algorítmico, responsabilidade, transparência  
   https://www.ev.org.br/cursos/etica_IA
2. **Comunicação e Mobilização com IA** (2h) — Copilot, “briefing perfeito”, prompts para campanhas  
   https://www.ev.org.br/cursos/comunicacao_IA
3. **IA na Prática: Dados bem Estruturados** (2h) — dados, decisão, ferramentas modernas  
   https://www.ev.org.br/cursos/IA_pratica
4. **Inteligência Artificial para ONGs** (4h) — Copilot, prompts prontos, teoria da mudança, monitoramento  
   https://www.ev.org.br/cursos/ONGS

#### Trilha: Office na Prática (3 cursos, ~48h)

1. Word na Prática (16h) — https://www.ev.org.br/cursos/word-na-pratica  
2. Excel na Prática (16h) — https://www.ev.org.br/cursos/excel-na-pratica  
3. PowerPoint na Prática (16h) — https://www.ev.org.br/cursos/powerpoint-na-pratica  

#### Trilha: Office 365 (5 cursos, ~5h)

Outlook, OneDrive, OneNote, Planner, Teams — 1h cada; certificado de **participação** (quiz, não avaliação formal).

#### Trilha: Excel 2016 (3 cursos, ~65h)

Básico (15h) → Intermediário (20h) → Avançado (30h) — tabelas dinâmicas, macros, solver, etc.

---

## 4. Rotas sugeridas (plano de ensino)

Estas rotas conectam cursos que **se complementam** e abrem caminhos. Ordem sugerida; o estudante pode adaptar.

### 🎯 Rota A — **IA e ferramentas inteligentes** (destaque para apresentação / interesse em “Cursor”)

**Para quem:** quer entrar no mundo da tecnologia por IA, produtividade com assistentes e futuro do trabalho digital.  
**Conexão com Cursor:** a EV não tem curso de Cursor, mas **FluêncIA** (prompts, Copilot) e **Soluções de IA no GitHub** (Copilot, Codespaces) ensinam a **trabalhar com IA no fluxo de desenvolvimento** — competências diretamente transferíveis para editores como Cursor, VS Code + Copilot, etc.

| Etapa | Curso | Carga | Por que nesta ordem |
|-------|-------|-------|---------------------|
| 1 | **FluêncIA em Inteligência Artificial** | 16h* | Porta de entrada oficial Microsoft; história da IA, conceitos, aplicações, **prompts com Copilot**, agentes com Copilot Studio |
| 2 | **Ética na Era da IA** | 2h | Uso responsável — importante para imigrantes e trabalho |
| 3 | **IA para seu novo emprego: Do currículo à entrevista** | 2h | Aplica IA na empregabilidade imediata |
| 4 | **Soluções de IA no GitHub** | 6h | GitHub Copilot, Codespaces, Actions — ponte para desenvolvimento assistido por IA |
| 5 | **AI-900 — Fundamentos de IA no Azure** | 16h | Aprofundamento; preparação para certificação Microsoft (opcional) |

\*No catálogo por área aparece 4h; na página do curso a descrição indica 16h e 8 módulos — **confirmar no site antes de publicar**.

**Módulos exclusivos do FluêncIA (segundo o site):**
- Módulos 1–6: fundamentos de IA generativa, aplicações, produtividade  
- **Módulo 7:** Como escrever bons prompts com Copilot  
- **Módulo 8:** Criando agentes com Copilot Studio para M365  

**Extensões da Rota A (perfil):**
- Educador → IA para Educadores (4h)  
- Estudante → IA para Estudantes (4h)  
- ONG / associação comunitária → trilha IA Terceiro Setor (10h)  
- Pequeno negócio → IA para PMEs (4h)  

📝 **NOTA EDITORIAL — Rota A:** _Escreva aqui um parágrafo curto para imigrantes em Floripa (tom acolhedor, menção à apresentação de hoje, link para ev.org.br)._

---

### 💻 Rota B — **Programação do zero**

**Para quem:** quer construir lógica e depois sites ou automações.

| Etapa | Curso | Carga | Por que nesta ordem |
|-------|-------|-------|---------------------|
| 1 | **Fundamentos de TI: Hardware e Software** | 7h | Vocabulário de computador, SO, segurança básica |
| 2 | **Introdução ao Scratch** (Computação Criativa) | 6h | Programação visual, lógica sem sintaxe — ideal para quem nunca programou |
| 3 | **Scratch, extensões e computação física** | 6h | Projetos práticos, extensões |
| 4 | **Linguagem de Programação Python — Básico** | 18–20h | Primeira linguagem textual; PyCharm; raciocínio lógico |
| 5 | **Crie um site simples com HTML, CSS e JavaScript** | 4h | Web front-end básico |
| 6 | **Soluções de IA no GitHub** | 6h | Colaboração, Git, Copilot — depois de ter base de código |

📝 **NOTA EDITORIAL — Rota B:** _Mensagem para quem quer “trabalhar com tecnologia” mas começa do absoluto zero._

---

### 📊 Rota C — **Dados e decisão**

**Para quem:** administração, finanças, relatórios, vagas de analista.

| Etapa | Curso | Carga | Por que nesta ordem |
|-------|-------|-------|---------------------|
| 1 | **Excel na Prática** ou Excel 2016 Básico | 16–15h | Planilhas no dia a dia |
| 2 | **Excel 2016 Intermediário → Avançado** | 20h + 30h | Análise, tabelas dinâmicas, macros (trilha Excel) |
| 3 | **Introdução à Análise de Dados — Power BI** | 5–12h | Papel do analista, dashboards |
| 4 | **Análise de Dados no Power BI** | 4h | Recursos avançados (P&R, influenciadores, árvore hierárquica) |
| 5 | **Administrando Banco de Dados** | 15h | SQL, modelos, carreira de DBA (opcional, mais técnico) |

**Nota:** a EV menciona uma **trilha Power BI de 5 cursos**; no catálogo atual só constam **2 cursos** (introdução + análise). Verificar se outros módulos voltaram ao catálogo.

📝 **NOTA EDITORIAL — Rota C:** _

---

### 🏢 Rota D — **Produtividade Office para emprego**

**Para quem:** qualificação rápida para escritório, administração, atendimento.

| Opção | Trilha / cursos | Carga total |
|-------|-----------------|-------------|
| **Rápida** | Office na Prática (Word + Excel + PowerPoint) | ~48h |
| **Colaboração remota** | Office 365 (Teams, Outlook, OneDrive…) | ~5h |
| **Completa** | Pacote Office 2016 (8 cursos) | ~110h |

**Combinar com:** Comunicação Empresarial (12h), Comunicação Escrita (12h), Como Conseguir um Novo Emprego (10h).

📝 **NOTA EDITORIAL — Rota D:** _

---

### 🌱 Rota E — **Empregabilidade + soft skills** (complementar a qualquer rota tech)

| Curso | Carga | Conteúdo-chave |
|-------|-------|----------------|
| Desenvolvimento Profissional | 8h | Autoconhecimento, networking, formações |
| Como Conseguir um Novo Emprego | 10h | Currículo, LinkedIn, entrevista |
| IA para seu novo emprego | 2h | IA aplicada à busca de vaga |
| Postura e Imagem Profissional | 8h | Convivência no trabalho |
| Atendimento ao Público | 10h | Técnicas de atendimento |
| Organização Pessoal | 10h | Tempo, rotina, planejamento |

**Trilha pronta:** Aprimoramento Profissional (48h) — reúne 5 desses temas.

📝 **NOTA EDITORIAL — Rota E:** _

---

## 5. Catálogo completo por área (tech)

### 5.1 Inteligência Artificial (13 itens)

| Curso | Carga | Resumo | URL |
|-------|-------|--------|-----|
| **FluêncIA em Inteligência Artificial** | 16h* | IA generativa, Microsoft, prompts Copilot, agentes; **curso inicial obrigatório** para outros de IA | [/cursos/fluencia](https://www.ev.org.br/cursos/fluencia) |
| AI-900 — Fundamentos de IA no Azure | 16h | Serviços Azure AI, certificação Microsoft | [/cursos/AI900Azure](https://www.ev.org.br/cursos/AI900Azure) |
| Soluções de IA no GitHub | 6h | Git, Copilot, Codespaces, Actions | [/cursos/github](https://www.ev.org.br/cursos/github) |
| IA para seu novo emprego | 2h | Currículo, LinkedIn, entrevista com IA | [/cursos/iaempregos](https://www.ev.org.br/cursos/iaempregos) |
| IA para Estudantes | 4h | Produtividade, pensamento crítico | [/cursos/iaestudantes](https://www.ev.org.br/cursos/iaestudantes) |
| IA para Educadores | 4h | IA na sala de aula | [/cursos/iaeduc](https://www.ev.org.br/cursos/iaeduc) |
| IA para ONGs | 4h | Copilot, prompts, teoria da mudança | [/cursos/ONGS](https://www.ev.org.br/cursos/ONGS) |
| IA para PMEs | 4h | Automação, custos, clientes | [/cursos/pmes](https://www.ev.org.br/cursos/pmes) |
| IA para Profissionais da Justiça | 2h | IA no contexto jurídico | [/cursos/justica](https://www.ev.org.br/cursos/justica) |
| IA para profissionais do Direito | 2h | Copilot, ética, cibersegurança | [/cursos/IA_Direito](https://www.ev.org.br/cursos/IA_Direito) |
| Comunicação e Mobilização com IA | 2h | Webinário; ONGs; prompts | [/cursos/comunicacao_IA](https://www.ev.org.br/cursos/comunicacao_IA) |
| IA na Prática: Dados Estruturados | 2h | Webinário; decisão baseada em dados | [/cursos/IA_pratica](https://www.ev.org.br/cursos/IA_pratica) |
| Ética na Era da IA | 2h | Webinário; viés, responsabilidade | [/cursos/etica_IA](https://www.ev.org.br/cursos/etica_IA) |

### 5.2 Programação (2 + Scratch em Educação)

| Curso | Carga | Resumo | URL |
|-------|-------|--------|-----|
| Linguagem de Programação Python — Básico | 18–20h | Lógica, PyCharm, console | [/cursos/linguagem-de-programacao-python-basico](https://www.ev.org.br/cursos/linguagem-de-programacao-python-basico) |
| Crie um site simples com HTML, CSS e JavaScript | 4h | Web básico, componentes de site | [/cursos/crie-um-site-simples-usando-html-css-e-javascript](https://www.ev.org.br/cursos/crie-um-site-simples-usando-html-css-e-javascript) |
| Introdução ao Scratch | 6h | *(área Educação e Tecnologia)* Blocos, animações, jogos | [/cursos/introducao-ao-scratch-linguagem-de-programacao-na-computacao-criativa](https://www.ev.org.br/cursos/introducao-ao-scratch-linguagem-de-programacao-na-computacao-criativa) |
| Scratch, extensões e computação física | 6h | Prototipagem, extensões | [/cursos/scratch-suas-extensoes-e-computacao-fisica](https://www.ev.org.br/cursos/scratch-suas-extensoes-e-computacao-fisica) |

### 5.3 Tecnologia da Informação (2)

| Curso | Carga | Resumo | URL |
|-------|-------|--------|-----|
| Fundamentos de TI: Hardware e Software | 7h | Componentes, SO, segurança | [/cursos/fundamentos-de-ti-hardware-e-software](https://www.ev.org.br/cursos/fundamentos-de-ti-hardware-e-software) |
| Cultura Digital | 6h | Redes sociais + noções Office | [/cursos/cultura-digital](https://www.ev.org.br/cursos/cultura-digital) |

### 5.4 Análise de Dados (3)

| Curso | Carga | Resumo | URL |
|-------|-------|--------|-----|
| Introdução à Análise de Dados — Power BI | 5–12h | Papel do analista, dashboards | [/cursos/introducao-a-analise-de-dados-microsoft-power-bi](https://www.ev.org.br/cursos/introducao-a-analise-de-dados-microsoft-power-bi) |
| Análise de Dados no Power BI | 4h | 5º curso da trilha Power BI; visuals avançados | [/cursos/analise-de-dados-no-power-bi](https://www.ev.org.br/cursos/analise-de-dados-no-power-bi) |
| Administrando Banco de Dados | 15h | SQL, DBA, modelos | [/cursos/administrando-banco-de-dados](https://www.ev.org.br/cursos/administrando-banco-de-dados) |

### 5.5 Produtividade (18 — principais)

Inclui trilhas Office na Prática, Pacote Office 2016, Excel/Word/PowerPoint 2016, Office 365 e cursos avulsos. Ver trilhas na seção 3.

### 5.6 Educação e Tecnologia (5)

Scratch (2 cursos), Design Thinking para Educadores (20h), Aprendizagem Criativa (6h), Educação Inclusiva (20h).

### 5.7 Negócios e Inovação (6)

Empreendedorismo e Inovação (20h), Gestão de Projetos (5–10h), Estratégia de Negócios (20h), Administração, Contabilidade, Análise de Balanços — úteis para quem quer empreender ou gestão.

---

## 6. Mapa de dependências (visão rápida)

```
                    ┌─────────────────────┐
                    │   Cultura Digital   │
                    │  Fundamentos de TI  │
                    └──────────┬──────────┘
                               │
         ┌─────────────────────┼─────────────────────┐
         ▼                     ▼                     ▼
   ┌───────────┐        ┌────────────┐       ┌──────────────┐
   │  Scratch  │───────►│   Python   │──────►│  HTML/CSS/JS │
   └───────────┘        └─────┬──────┘       └──────┬───────┘
                              │                      │
                              └──────────┬───────────┘
                                         ▼
                              ┌────────────────────┐
                              │ Soluções IA GitHub │
                              │  (Copilot, Git)    │
                              └────────────────────┘

   ┌──────────────┐     ┌─────────────┐     ┌──────────────┐
   │  FluêncIA    │────►│ Ética IA    │────►│ AI-900 Azure │
   │  (prompts)   │     │ IA emprego  │     │ (opcional)   │
   └──────────────┘     └─────────────┘     └──────────────┘

   ┌──────────────┐     ┌─────────────┐     ┌──────────────┐
   │ Excel básico │────►│ Excel avanç.│────►│  Power BI    │
   └──────────────┘     └─────────────┘     └──────────────┘
```

---

## 7. Sugestão de destaque para `/novidades` (rotativo)

| Slot | Item sugerido | Motivo |
|------|---------------|--------|
| **Featured roadmap** | Rota A (FluêncIA + GitHub IA) | Alinhado ao interesse da apresentação (tecnologia / ferramentas inteligentes) |
| Alternativa 1 | Trilha Office na Prática | Empregabilidade imediata, 48h, certificado |
| Alternativa 2 | Trilha IA Terceiro Setor | Comunidades, ONGs, integração social |
| Alternativa 3 | Rota B (Python + Web) | Quem quer “ser programador” |

📝 **NOTA EDITORIAL — destaque principal:** _Título + subtítulo + 2–3 frases para o card rotativo._

---

## 8. Como estudar (passo a passo para o portal)

1. Acesse https://www.ev.org.br/ e crie conta gratuita.  
2. Escolha uma **rota** (seção 4) ou uma **trilha** (seção 3).  
3. Matricule-se em cada curso; avance no seu ritmo.  
4. Complete atividades e avaliação final (quando houver).  
5. Baixe o certificado gratuito no painel da EV.  

**Limitações a mencionar honestamente:**
- Conteúdo em **português** (sem versão ES na EV).  
- Alguns cursos referem Office **2016** — conceitos valem, interface pode diferir do 365.  
- Catálogo pode mudar; validar links antes de publicar.  

📝 **NOTA EDITORIAL — bloco “Como começar” na página:** _

---

## 9. Proposta de copy curta (rascunho automático — revisar)

> **Título sugerido:** Cursos gratuitos de tecnologia — por onde começar  
>  
> A Escola Virtual da Fundação Bradesco oferece dezenas de cursos online e gratuitos, com certificado. Para quem chegou em Florianópolis e quer qualificação digital, montamos rotas sugeridas: comece por **FluêncIA** se o seu interesse é inteligência artificial e ferramentas como assistentes de código; escolha **Office na Prática** se precisa de Excel e Word para o mercado de trabalho; ou siga **Python + web** se quer programar. Tudo no seu ritmo, 100% online.  
>  
> [Ver rotas completas →](#4-rotas-sugeridas-plano-de-ensino) · [Cadastrar-se na EV →](https://www.ev.org.br/)

📝 **Revise tom, tradução ES e adaptação ao HIP.**

---

## 10. Checklist antes de publicar no portal

- [ ] Confirmar cargas horárias no site (FluêncIA, Power BI, Python)  
- [ ] Testar todos os links `ev.org.br`  
- [ ] Redigir versão ES (resumo das rotas — EV permanece PT)  
- [ ] Promover `ev-bradesco-trilhas-tecnologia.pending.json` após revisão  
- [ ] Alinhar com layout `/novidades` (Claude)  
- [ ] Decidir se lista todos os 61 cursos ou só rotas + destaques  

---

## 11. Referências internas do projeto

- Handoff UI: `docs/handoff-ui-claude.md`  
- Spec bot cursos: `bot/courses/README.md`  
- Rascunho bot: `bot/drafts/courses/ev-bradesco-trilhas-tecnologia.pending.json`  
- Relatório scrape: `bot/reports/research-courses-2026-06-18.json`

---

*Documento gerado para revisão humana. Não publicar automaticamente no site.*
