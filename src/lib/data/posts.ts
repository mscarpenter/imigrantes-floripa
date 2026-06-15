import type { Post } from "./types";

/**
 * Posts do blog. Conteúdo editorial e acolhedor, complementar aos módulos.
 *
 * Estratégia de idioma: PT-first. Quando uma tradução (ex.: `es`) não existe,
 * a aplicação faz fallback para `sourceLocale` e exibe um aviso discreto.
 */
export const posts: Post[] = [
  {
    slug: "como-se-locomover-em-florianopolis",
    date: "2026-06-12",
    color: "blue",
    icon: "Bus",
    cover: "/illustrations/transporte.png",
    sourceLocale: "pt",
    translations: {
      pt: {
        title: "Como se locomover em Florianópolis: guia para novos moradores",
        tag: "Mobilidade",
        excerpt:
          "Florianópolis é uma ilha, e isso muda tudo na hora de se deslocar. Entenda o sistema integrado de ônibus, o cartão Passe Rápido, os apps essenciais e a geografia da cidade para circular com autonomia.",
        body: `Chegar em uma cidade nova já é suficientemente intenso. Florianópolis ainda adiciona uma camada a mais: é uma ilha. Isso significa pontes, bairros com personalidades completamente diferentes e uma lógica de deslocamento que pode parecer estranha nos primeiros dias.

A boa notícia é que o sistema de transporte público funciona de forma integrada. Com um pouco de orientação, você consegue circular por toda a cidade pagando uma única passagem. Este guia explica como!

## 1. O sistema de ônibus: terminais, integração e cartão

### Como o sistema funciona

O transporte coletivo de Florianópolis é operado pelo **Consórcio Fênix** e organizado em torno de **6 terminais de integração**:

- **TICEN** (Terminal de Integração do Centro): hub principal, localizado na Av. Paulo Fontes.
- **TITRI** (Trindade): acesso à UFSC e região universitária.
- **TICAN** (Canasvieiras): Norte da Ilha.
- **TILAG** (Lagoa da Conceição): Leste da Ilha.
- **TIRIO** (Rio Tavares): Sul da Ilha.
- **TISAN** (Santo Antônio de Lisboa): Noroeste da Ilha.

A lógica é simples: as linhas **alimentadoras** saem dos bairros e chegam ao terminal mais próximo. De lá, você pega uma linha **troncal** que vai ao TICEN ou a outro terminal. Parece complicado no papel, mas na prática o aplicativo resolve, como veremos abaixo.

### A integração que vale ouro

Com o cartão Passe Rápido, você paga **uma única passagem** e pode trocar de ônibus quantas vezes precisar dentro de **3 horas**, sem limite de baldeações, desde que dentro do sistema convencional. Isso significa que ir do Centro ao Norte da Ilha, com uma troca em terminal, custa o mesmo que andar um quarteirão.

Guarde este detalhe: sem o cartão, essa integração não existe. Com dinheiro ou QR Code avulso, cada embarque é uma nova cobrança.

> **Atenção:** desde 5 de janeiro de 2026, o pagamento em dinheiro não é mais aceito dentro dos ônibus. Você ainda pode pagar em dinheiro nas bilheterias dos terminais de integração, mas a bordo só vale cartão ou QR Code/PIX.

### O cartão Passe Rápido: como tirar o seu

A **primeira via do cartão Cidadão é gratuita**. Para emitir, vá pessoalmente ao **Passe Rápido**, localizado ao lado do TICEN, na Av. Paulo Fontes, 701, Centro. O atendimento é de segunda a sexta, das **8h às 17h**.

Você também pode tirar o Cartão Cidadão em qualquer bilheteria dos terminais de integração.

**Documentos necessários:**

- Documento de identidade com foto (RG ou passaporte)
- CPF
- Comprovante de residência em Florianópolis

Para o imigrante que ainda não tem CPF brasileiro, esse documento é o primeiro passo, pois o cartão Cidadão exige CPF. Se você ainda está regularizando a documentação, use o **Cartão Turista** (R$ 5,00) como solução temporária enquanto resolve seus documentos.

### Tarifas (junho 2026)

| Forma de pagamento | Valor |
| ----- | ----- |
| Cartão Cidadão (Passe Rápido) | **R$ 6,20** |
| Cartão Turista / Vale-Transporte | **R$ 7,20** |
| Dinheiro ou PIX/QR Code avulso (bilheteria) | **R$ 7,70** |
| Linha Executiva (cartão/QR/PIX) | **R$ 20,00** |

Tarifas sujeitas a reajuste. Confirme o valor atual em consorciofenix.com.br.

### Tarifa social: você pode ter direito a gratuidade

Existe o **Cartão Passe Rápido Social**, voltado a moradores de Florianópolis cadastrados no **CadÚnico** com renda familiar de até **2 salários mínimos**.

Para solicitar, o atendimento **não é feito no Consórcio Fênix**, mas sim na **Secretaria Municipal de Assistência Social**, localizada no **box 77 do Mercado Público** de Florianópolis. Leve o número de NIS (cadastro no CadÚnico), documento de identidade e CPF.

### Como recarregar o cartão

Você pode recarregar de três formas:

- **Nas bilheterias dos terminais de integração** (sempre disponível)
- **Pelo aplicativo Floripa no Ponto** via PIX. O crédito cai em até 30 minutos e fica disponível nos ônibus e terminais.
- **Nos equipamentos de autoatendimento** nos terminais.

## 2. Apps para se virar no transporte

### Floripa no Ponto 2.0

É o aplicativo oficial do sistema. Nele você consulta horários em tempo real, rastreia onde o ônibus está, planeja sua rota e recarrega o cartão via PIX. É o primeiro app que qualquer morador de Floripa coloca no celular.

Disponível na App Store e Google Play, gratuito.

### SI.GO

Aplicativo da Prefeitura de Florianópolis para compra de passagem avulsa via PIX: gera um QR Code válido por 1 hora para uso nos ônibus e terminais. Útil antes de ter o cartão físico ou quando o saldo acaba na hora errada.

## 3. A bicicleta como alternativa real

Florianópolis tem **41,9 km de ciclovia por 100 mil habitantes**, um dos índices mais altos do Sul do Brasil. Se você mora ou trabalha em regiões planas, como o Centro, Trindade ou Itacorubi, a bike é uma opção concreta para o dia a dia.

### A Beira-Mar Norte

A Avenida Beira-Mar Norte é o principal eixo de mobilidade ativa da cidade. A ciclovia acompanha toda a orla entre o Centro e o bairro Agronômica, com boa sinalização e movimento constante de ciclistas. É plana, segura e, nos dias ensolarados, uma das formas mais agradáveis de chegar ao trabalho.

### Dica de segurança

Antes de sair pedalando, planeje a rota: algumas ruas do Centro e da área continental têm tráfego intenso sem ciclofaixa. O app **Google Maps** e o **Komoot** têm mapeamento de ciclovias e costumam ser mais confiáveis do que a sinalização de rua em trechos novos.

## 4. A geografia que você precisa entender

### Florianópolis é uma ilha, mas não é isolada

A cidade é dividida entre a **Ilha de Santa Catarina** e o **Continente** (bairros como Capoeiras, Coqueiros e Estreito, que fazem parte do município mas ficam em terra firme). As duas partes são conectadas por duas pontes: a **Ponte Colombo Salles** e a **Ponte Pedro Ivo Campos**, que ficam lado a lado no Centro.

### O trânsito nas pontes é o calcanhar de Aquiles da cidade

Nos **horários de pico, especialmente das 7h às 9h e das 17h às 19h**, as pontes travam. Quem mora no Continente e trabalha na Ilha (ou vice-versa) sente isso todo dia.

Se você precisar cruzar a ponte nesses horários, considere o **ônibus**. Os coletivos usam a mesma via, mas o volume de veículos particulares é o que causa o congestionamento. Em dias de sol forte no verão, o trânsito em direção às praias do Norte e Leste da Ilha pode emperrar de forma imprevisível.

### Bairros com boa acessibilidade sem carro

Se você ainda está escolhendo onde morar, saiba que alguns bairros têm vantagem clara para quem depende do transporte público:

- **Centro**: acesso direto ao TICEN, ponto de partida de qualquer linha da cidade.
- **Trindade**: próximo ao TITRI e à UFSC, com linhas frequentes.
- **Itacorubi**: bem servido de linhas para o Centro e Trindade.
- **Estreito (Continente)**: acesso rápido ao TICEN via ponte, com linhas frequentes.

Bairros mais distantes como Ingleses, Ribeirão da Ilha ou Campeche têm transporte público, mas com frequência menor e dependência maior de carro ou moto.

### Praias no verão: planeje com antecedência

Em dezembro, janeiro e fevereiro, Florianópolis recebe turistas de todo o Brasil e da Argentina. O trânsito para praias como Jurerê Internacional, Canasvieiras e Ingleses (Norte) e Joaquina e Campeche (Leste) pode dobrar o tempo de viagem de carro.

A alternativa mais tranquila é pegar o ônibus até o TICAN ou TILAG e a alimentadora até a praia. O trajeto é mais lento, porém previsível, e sem problemas de estacionamento.

## 5. Recursos para continuar se orientando

- **Site do Consórcio Fênix:** consorciofenix.com.br/horarios (consulta de linhas e horários).
- **App Floripa no Ponto 2.0**: rastreamento em tempo real e recarga.
- **SAC Fênix:** (48) 3025-6868 (seg a sex, 7h às 19h15).
- **Passe Rápido (atendimento presencial):** Av. Paulo Fontes, 701 (ao lado do TICEN), seg a sex, 8h às 17h.
- **Assistência Social (Passe Social):** Mercado Público, box 77.

> Este é um rascunho da comunidade, feito para ajudar quem está chegando. Encontrou algo desatualizado? Toda contribuição é bem-vinda. O portal é aberto.`,
      },
    },
  },
  {
    slug: "como-acessar-o-sus-em-florianopolis",
    date: "2026-06-10",
    color: "rose",
    icon: "HeartPulse",
    cover: "/illustrations/saude.png",
    sourceLocale: "pt",
    translations: {
      pt: {
        title: "Guia de Saúde: como acessar o SUS em Florianópolis",
        tag: "Saúde",
        excerpt:
          "Você tem direito à saúde pública no Brasil, independentemente da nacionalidade ou de ter documentos em mãos. Entenda a diferença entre UBS, UPA e hospital, o Alô Saúde, o SAMU e a vacinação gratuita.",
        body: `Você tem direito à saúde pública no Brasil, independentemente da nacionalidade, do status migratório ou de ter ou não documentos em mãos. Isso está garantido em lei. O que muda é como você acessa o sistema dependendo da sua situação.

Este guia explica o caminho mais direto para se cuidar em Florianópolis sem perder tempo na fila errada.

## Antes de sair de casa: ligue para o Alô Saúde Floripa

**0800 333 3233 (gratuito, 24 horas, 7 dias por semana)**

Antes de ir a qualquer unidade de saúde, ligue para o Alô Saúde. É o serviço mais subestimado e mais útil da cidade.

Uma equipe de enfermagem atende por telefone, videochamada ou chat, avalia os seus sintomas e te diz exatamente para onde ir, ou se você pode ser atendido ali mesmo, sem precisar sair. Em muitos casos, o enfermeiro já agenda a consulta na UBS do seu bairro ou faz o encaminhamento para uma UPA.

**Para imigrantes, o Alô Saúde tem três vantagens específicas:**

- Atende em **espanhol e inglês** via WhatsApp, útil para quem ainda está aprendendo português.
- Faz o seu **cadastro no SUS municipal durante a ligação**. Você não precisa chegar com tudo resolvido.
- Funciona de madrugada, em feriado, no final de semana, quando as UBSs estão fechadas e a dúvida aparece.

Além do telefone, o serviço tem app próprio (Alô Saúde Floripa, disponível para Android e iOS) e site em alosaudefloripa.com.br.

## Entendendo a rede: UBS, UPA e Hospital

A rede pública de saúde tem três portas. Cada uma existe para um tipo de necessidade. Ir à porta errada não significa que você não será atendido, mas pode significar horas de espera desnecessárias.

### UBS: Unidade Básica de Saúde

**Para:** consultas de rotina, acompanhamento, vacinas, exames simples.
**Horário:** segunda a sexta, horário comercial.

A UBS é a sua referência de saúde no dia a dia. É aqui que você se cadastra, tem um médico de família que te acompanha, faz exames preventivos, vacinas, pré-natal, controle de hipertensão e diabetes, e retira medicamentos gratuitos.

**Como se cadastrar:** vá pessoalmente à UBS mais próxima da sua casa e leve:

- Documento de identidade com foto (passaporte, CRNM ou protocolo migratório).
- CPF (se ainda não tiver, o Alô Saúde pode iniciar o cadastro por telefone).

**Se você não tem CPF ainda:** em casos de atendimento de rotina, o documento migratório (CRNM ou Protocolo Provisório de Refúgio) é aceito para o cadastro. Em emergências, nenhum documento é exigido por lei.

**Como encontrar a UBS do seu bairro:**

- App **Conecte SUS**: localiza a unidade mais próxima pelo GPS do celular.
- Ligando para **136** (gratuito): informe seu CEP e receba o endereço da UBS que atende sua área.

### UPA: Unidade de Pronto Atendimento

**Para:** urgências que não correm risco de vida imediato, mas precisam de atenção no dia.
**Horário:** 24 horas, 7 dias por semana.

A UPA resolve a maioria das urgências sem precisar ir a um hospital: radiografia, medicação, ponto em ferimento, crise asmática, febre alta, torção, infecção com febre. Atende adultos, crianças e tem suporte odontológico em algumas unidades.

Florianópolis tem **três UPAs**, uma em cada região da cidade:

| Região | Nome | Endereço |
| ----- | ----- | ----- |
| Sul da Ilha | UPA Sul (MultiHospital) | Av. Dep. Diomício Freitas, 3393, Carianos |
| Norte da Ilha | UPA Norte | R. Francisco Faustino Martins, confluência SC-401 e SC-403, Canasvieiras |
| Continente | UPA Continente | R. Gualberto Senna, 275, Jardim Atlântico |

Dica prática: se você mora no Centro ou na região da Trindade, a UPA mais acessível de ônibus é a UPA Norte (terminal TICAN) ou, no Continente, a UPA Continente (linhas do corredor Continente). Para o Sul, a linha TIRIO-Multihospital cobre o acesso.

### Hospitais públicos

**Para:** emergências graves, cirurgias, internação, alta complexidade.
**Horário:** pronto-socorro 24h.

Florianópolis tem três hospitais públicos principais, todos atendendo pelo SUS:

- **HU/UFSC (Hospital Universitário).** R. Professora Maria Flora Pausewang, s/n, Trindade. O único hospital federal de Santa Catarina, referência no estado, com mais de 20 especialidades. Atende exclusivamente pelo SUS.
- **HGCR (Hospital Governador Celso Ramos).** R. Irmã Benwarda, 297, Centro. Hospital estadual, referência em cirurgias de média e alta complexidade.
- **Hospital Florianópolis.** Bairro Estreito, Continente. Referência estadual em ortopedia. Pronto-socorro 24h com clínica médica, pediatria, ortopedia, traumatologia e cirurgia geral.

Salvo em emergências presenciais, o acesso a hospitais geralmente passa por encaminhamento da UBS ou UPA. Se estiver em dúvida sobre a gravidade, ligue primeiro para o Alô Saúde (0800 333 3233).

## SAMU: quando a situação é grave

**192: gratuito, 24 horas**

Ligue para o **192** quando a situação exigir uma ambulância: infarto, AVC, acidente com vítima, dificuldade respiratória grave, desmaio, sangramento sem controle. O SAMU envia equipe médica até o local.

Não é necessário ter documentos nem cadastro para acionar o SAMU. Qualquer pessoa pode ligar.

## Vacinação gratuita pelo SUS

O Brasil oferece um dos calendários de vacinação mais completos do mundo, totalmente gratuito. São mais de 30 vacinas disponíveis nas UBSs, incluindo:

- Febre Amarela
- Influenza (gripe)
- Tríplice Viral (sarampo, caxumba, rubéola)
- HPV
- Varicela (catapora)
- Hepatite A e B
- Covid-19

**Para se vacinar:** vá a qualquer UBS de Florianópolis, sem agendamento prévio, nos horários de funcionamento. Leve a caderneta de vacinação do seu país de origem, se tiver. Não é obrigatória, mas facilita o controle do histórico.

**Ponto adicional no Centro:** o **SESC Prainha** oferece vacinas gratuitas do SUS em parceria com a Prefeitura. Faça um cadastro no local para ser atendido.

### Quanto custa?

**Nada.** O SUS é gratuito para todos, brasileiros e estrangeiros. Você não paga no momento do atendimento e não receberá cobrança depois.

### Resumo rápido: qual porta usar?

| Situação | Onde ir |
| ----- | ----- |
| Dúvida sobre sintomas, qualquer hora | **Alô Saúde:** 0800 333 3233 |
| Consulta de rotina, exame, vacina | **UBS** do seu bairro (seg-sex) |
| Urgência que não ameaça a vida imediatamente | **UPA** mais próxima (24h) |
| Emergência grave, risco de vida | **SAMU: 192** ou pronto-socorro do hospital |
| Vacinas gratuitas | **UBS** ou SESC Prainha |

## Encontrar a UBS do seu bairro

Florianópolis tem 51 Unidades Básicas de Saúde, distribuídas por todas as regiões. Elas funcionam de segunda a sexta, em horário comercial.

Não sabe qual é a sua? Há três caminhos rápidos:

- Ligue **136**, informe seu CEP e descubra na hora.
- Use o app **Conecte SUS** para localizar a unidade mais próxima pelo GPS.
- Ligue para o **Alô Saúde Floripa** (0800 333 3233, 24 horas): eles fazem o cadastro no SUS por telefone.

> Este é um rascunho da comunidade. Telefones e endereços de unidades de saúde mudam com frequência. Confirme sempre pelo 136 ou pelo Alô Saúde antes de se deslocar.`,
      },
    },
  },
];
