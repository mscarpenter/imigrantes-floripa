import type { Module } from "./types";

export const modules: Module[] = [
  {
    slug: "documentos-essenciais",
    order: 1,
    icon: "FileText",
    color: "blue",
    contactIds: ["policia-federal-floripa", "receita-federal-floripa"],
    translations: {
      pt: {
        title: "Documentos essenciais",
        summary:
          "Os primeiros documentos que você precisa tirar ao chegar: CPF, CRNM e CTPS.",
        body: `**Pra ter vida prática no Brasil, você precisa de dois documentos: CPF e CRNM.** Sem eles, banco, hospital, escola, contrato — quase tudo trava.

A boa notícia: o **CPF é gratuito e sai no mesmo dia**. A CRNM exige agendamento na Polícia Federal e tem custo, mas é o seu documento oficial enquanto você estiver no país. A Carteira de Trabalho hoje é totalmente digital — você nem sai de casa pra ter.

> **Comece pelo CPF.** Ele é exigido até pra emitir a CRNM. Sem CPF, você trava nos outros documentos também.`,
      },
      es: {
        title: "Documentos esenciales",
        summary:
          "Los primeros documentos que necesitás sacar al llegar: CPF, CRNM y CTPS.",
        body: `**Para tener vida práctica en Brasil, necesitás dos documentos: CPF y CRNM.** Sin ellos, banco, hospital, escuela, contrato — casi todo se traba.

La buena noticia: el **CPF es gratis y sale el mismo día**. La CRNM exige agendamiento en la Policía Federal y tiene costo, pero es tu documento oficial mientras estés en el país. La Libreta de Trabajo hoy es totalmente digital — ni siquiera salís de casa para tenerla.

> **Empezá por el CPF.** Lo van a pedir hasta para emitir la CRNM. Sin CPF, te trabás también para los otros documentos.`,
      },
    },
    topics: [
      {
        slug: "cpf",
        order: 1,
        contactIds: ["receita-federal-floripa"],
        translations: {
          pt: {
            title: "CPF (Cadastro de Pessoa Física)",
            summary:
              "Documento de identificação fiscal. Gratuito e obrigatório pra quase tudo.",
            body: `**Tire o CPF antes de tudo.** Sem ele você trava em quase tudo: banco, contrato de aluguel, posto de saúde, escola, compra com nota fiscal.

A boa notícia: é **gratuito** na Receita Federal e sai pronto no mesmo balcão, em poucos minutos.

## Como tirar (passo a passo)

1. Vá a uma agência da **Receita Federal**. Em Florianópolis, fica no centro — **Rua Felipe Schmidt, 235**.
2. Apresente os documentos abaixo.
3. Receba o número de CPF na hora.

> **Atendimento rápido.** O CPF pra migrantes costuma sair em 15–30 minutos. Não precisa de agendamento prévio.

## O que levar

- **Passaporte** ou documento de identidade do seu país (original).
- **Comprovante de endereço**, mesmo provisório (conta de luz, contrato de aluguel, declaração de hospedagem assinada).

> **Não tem comprovante?** Você pode assinar uma **autodeclaração de endereço** no balcão. É aceita.

## Onde tirar e quanto custa

| Local | Custo | Observação |
| --- | --- | --- |
| Receita Federal | **Grátis** | Atendimento próprio pra migrantes |
| Caixa Econômica | ~R$ 7 | Útil se a Receita estiver cheia |
| Banco do Brasil | ~R$ 7 | Idem |
| Correios | ~R$ 7 | Mesma coisa |

Se não tem pressa, a Receita compensa pelo preço.

## Depois de tirar

- **Salve o número** no celular (Notas, app gov.br, onde for).
- **Tire foto** do papel que entregaram.
- Já dá pra **criar sua conta gov.br** com esse CPF, que destrava CTPS, SUS, INSS, Receita e outros serviços.`,
          },
          es: {
            title: "CPF (Catastro de Persona Física)",
            summary:
              "Documento de identificación fiscal. Gratis y obligatorio para casi todo.",
            body: `**Sacá el CPF antes que cualquier otra cosa.** Sin él, te trabás en casi todo: banco, contrato de alquiler, centro de salud, escuela, compra con factura.

Buena noticia: es **gratis** en la Receita Federal y sale listo en el mismo mostrador, en pocos minutos.

## Cómo sacarlo (paso a paso)

1. Andá a una agencia de la **Receita Federal**. En Florianópolis está en el centro — **Rua Felipe Schmidt, 235**.
2. Presentá los documentos abajo.
3. Recibís el número de CPF en el momento.

> **Atención rápida.** El CPF para migrantes suele salir en 15–30 minutos. No necesita agendamiento previo.

## Qué llevar

- **Pasaporte** o documento de identidad de tu país (original).
- **Comprobante de domicilio**, incluso provisorio (boleta de luz, contrato de alquiler, declaración firmada de quien te hospeda).

> **¿No tenés comprobante?** Podés firmar una **autodeclaración de domicilio** en el mostrador. Se acepta.

## Dónde sacarlo y cuánto cuesta

| Lugar | Costo | Observación |
| --- | --- | --- |
| Receita Federal | **Gratis** | Atención específica para migrantes |
| Caixa Econômica | ~R$ 7 | Útil si la Receita está llena |
| Banco do Brasil | ~R$ 7 | Lo mismo |
| Correios | ~R$ 7 | Lo mismo |

Si no tenés apuro, la Receita conviene por el precio.

## Después de sacarlo

- **Guardá el número** en el celular (Notas, app gov.br, donde sea).
- **Sacale foto** al papel que te entregaron.
- Ya podés **crear tu cuenta gov.br** con ese CPF, que destraba CTPS, SUS, INSS, Receita y otros servicios.`,
          },
        },
      },
      {
        slug: "crnm",
        order: 2,
        contactIds: ["policia-federal-floripa"],
        translations: {
          pt: {
            title: "CRNM (Carteira de Registro Nacional Migratório)",
            summary:
              "Seu documento oficial de identidade como migrante no Brasil. Substitui o antigo RNE.",
            body: `**A CRNM é a sua identidade oficial no Brasil** — funciona como o RG dos brasileiros. Você vai usar em banco, hospital, viagens, contratos.

> **Pré-requisito:** você precisa **já ter um visto válido OU protocolo do CONARE (refúgio)**. Sem um dos dois, a Polícia Federal não emite.

## Como tirar (passo a passo)

1. **Agende** pelo site da Polícia Federal: [gov.br/pf](https://www.gov.br/pf). **Atendimento sem agendamento não acontece.**
2. **Gere e pague a GRU** (Guia de Recolhimento da União). Custo entre **R$ 200 e R$ 300**, depende do tipo de visto.
3. **Reúna os documentos** abaixo.
4. **Compareça à PF na data agendada** com tudo em mãos.

## O que levar

- **Passaporte** original.
- **Comprovante de residência** atualizado (no máximo 90 dias).
- **Foto 3x4** recente.
- **Comprovante de pagamento da GRU**.
- **Documentos do seu tipo de visto**: contrato de trabalho, certidão de casamento, protocolo do CONARE, etc.

> **Refugiados:** o protocolo do CONARE substitui o visto. Você solicita a CRNM com base nele.

## Onde fica

**Delegacia da Polícia Federal de Florianópolis**
Av. Gov. Gustavo Richard, 367 — Centro

Só atende com agendamento.

## Depois da PF — atenção ao protocolo provisório

A **CRNM física demora meses** pra chegar pelos Correios. Enquanto não chega, a PF te entrega um **protocolo provisório em papel** que vale como documento oficial.

> **Guarde o protocolo com cuidado.** Sem ele, você fica sem documento durante a espera. Tire foto e salve também no celular.

## Renovação

A CRNM tem **prazo de validade**:

- **9 anos** para residentes permanentes.
- Prazos menores para trabalho temporário, estudo, etc.

Renove **antes de expirar** — perder o prazo gera multa e burocracia extra.`,
          },
          es: {
            title: "CRNM (Cédula de Registro Nacional Migratorio)",
            summary:
              "Tu documento oficial de identidad como migrante en Brasil. Reemplaza la antigua RNE.",
            body: `**La CRNM es tu identidad oficial en Brasil** — funciona como el DNI de los brasileños. La vas a usar en banco, hospital, viajes, contratos.

> **Requisito previo:** necesitás **ya tener una visa válida O protocolo del CONARE (refugio)**. Sin uno de los dos, la Policía Federal no la emite.

## Cómo sacarla (paso a paso)

1. **Agendá** por el sitio de la Policía Federal: [gov.br/pf](https://www.gov.br/pf). **Atención sin agendamiento no se da.**
2. **Generá y pagá la GRU** (Guía de Recaudación de la Unión). Costo entre **R$ 200 y R$ 300**, depende del tipo de visa.
3. **Juntá los documentos** abajo.
4. **Andá a la PF en la fecha agendada** con todo en mano.

## Qué llevar

- **Pasaporte** original.
- **Comprobante de domicilio** actualizado (máximo 90 días).
- **Foto 3x4** reciente.
- **Comprobante de pago de la GRU**.
- **Documentos de tu tipo de visa**: contrato de trabajo, partida de matrimonio, protocolo del CONARE, etc.

> **Refugiados:** el protocolo del CONARE reemplaza la visa. Solicitás la CRNM en base a él.

## Dónde queda

**Delegación de la Policía Federal de Florianópolis**
Av. Gov. Gustavo Richard, 367 — Centro

Solo atiende con agendamiento.

## Después de la PF — atención al protocolo provisorio

La **CRNM física tarda meses** en llegar por correo. Mientras no llega, la PF te entrega un **protocolo provisorio en papel** que vale como documento oficial.

> **Guardá el protocolo con cuidado.** Sin él, quedás sin documento durante la espera. Sacale foto y guardala también en el celular.

## Renovación

La CRNM tiene **plazo de validez**:

- **9 años** para residentes permanentes.
- Plazos menores para trabajo temporario, estudio, etc.

Renovala **antes de que venza** — perder el plazo genera multa y burocracia extra.`,
          },
        },
      },
      {
        slug: "ctps-digital",
        order: 3,
        contactIds: [],
        translations: {
          pt: {
            title: "CTPS Digital (Carteira de Trabalho)",
            summary:
              "Carteira de trabalho 100% digital e gratuita. Não precisa ir a lugar nenhum.",
            body: `**A carteira de trabalho de papel azul acabou.** Hoje é tudo digital, gratuito, e você não vai a lugar nenhum. Tudo que o empregador registra — contratação, demissão, salário, férias, FGTS — aparece automaticamente no seu app.

## Como ter a sua (3 passos)

1. **Tenha o CPF** (veja o tópico anterior). A CTPS Digital é vinculada ao seu CPF.
2. **Crie sua conta gov.br** em [gov.br/govbr](https://www.gov.br/govbr). Precisa de CPF, e-mail e celular.
3. **Baixe o app Carteira de Trabalho Digital** (Android ou iOS) ou acesse [servicos.mte.gov.br](https://servicos.mte.gov.br).

Faça login com a gov.br e pronto. **Sem fila, sem deslocamento, sem taxa.**

## O que dá pra fazer no app

- Ver **histórico completo** de empregos formais.
- Acompanhar **contratações e demissões** em tempo real.
- Conferir **salários, datas, férias e 13º**.
- Solicitar **seguro-desemprego**.
- Ver **saldo do FGTS** (via integração com a Caixa).

## Sobre a conta gov.br (a chave de tudo)

A conta gov.br destrava quase todos os serviços públicos brasileiros: Receita Federal, SUS, INSS, Correios. Vale criar **mesmo se você ainda não vai trabalhar formalmente**.

Existem **três níveis de verificação**:

| Nível | Como conseguir | O que destrava |
| --- | --- | --- |
| Bronze | Cadastro básico | Serviços simples |
| Prata | Validação por banco ou facial | Maioria dos serviços |
| Ouro | Validação biométrica do TSE | Tudo, inclusive assinaturas legais |

> Pra CTPS funciona qualquer nível, mas vale subir pra **prata** pra ter acesso pleno.`,
          },
          es: {
            title: "CTPS Digital (Libreta de Trabajo)",
            summary:
              "Libreta de trabajo 100% digital y gratuita. No tenés que ir a ningún lado.",
            body: `**La libreta de trabajo de papel azul terminó.** Hoy es todo digital, gratuito, y no vas a ningún lado. Todo lo que el empleador registra — contratación, despido, salario, vacaciones, FGTS — aparece automáticamente en tu app.

## Cómo tener la tuya (3 pasos)

1. **Tené el CPF** (mirá el tema anterior). La CTPS Digital está vinculada a tu CPF.
2. **Creá tu cuenta gov.br** en [gov.br/govbr](https://www.gov.br/govbr). Necesitás CPF, correo y celular.
3. **Descargá la app Carteira de Trabalho Digital** (Android o iOS) o accedé a [servicos.mte.gov.br](https://servicos.mte.gov.br).

Iniciá sesión con gov.br y listo. **Sin fila, sin viaje, sin tasa.**

## Qué se puede hacer en la app

- Ver **historial completo** de empleos formales.
- Seguir **contrataciones y despidos** en tiempo real.
- Consultar **salarios, fechas, vacaciones y aguinaldo (13°)**.
- Solicitar **seguro de desempleo**.
- Ver **saldo del FGTS** (vía integración con Caixa).

## Sobre la cuenta gov.br (la llave de todo)

La cuenta gov.br destraba casi todos los servicios públicos brasileños: Receita Federal, SUS, INSS, Correios. Vale crearla **incluso si todavía no vas a trabajar formalmente**.

Existen **tres niveles de verificación**:

| Nivel | Cómo conseguirlo | Qué destraba |
| --- | --- | --- |
| Bronce | Registro básico | Servicios simples |
| Plata | Validación por banco o facial | Mayoría de los servicios |
| Oro | Validación biométrica del TSE | Todo, incluso firmas legales |

> Para CTPS funciona cualquier nivel, pero vale subir a **plata** para tener acceso pleno.`,
          },
        },
      },
    ],
  },
  {
    slug: "saude-sus",
    order: 2,
    icon: "HeartPulse",
    color: "rose",
    contactIds: ["sus-cartao", "upa-sul", "samu-192"],
    translations: {
      pt: {
        title: "Saúde pública (SUS)",
        summary:
          "Atendimento médico gratuito pelo SUS, como conseguir o cartão e onde procurar atendimento.",
        body: `## SUS: atendimento gratuito para todos

O **Sistema Único de Saúde (SUS)** atende qualquer pessoa que esteja no Brasil, **independentemente da nacionalidade ou situação migratória**. Não é necessário CPF para uma emergência.

### Cartão SUS

Para atendimentos não emergenciais (consultas, vacinas, exames), é recomendado ter o **Cartão Nacional de Saúde**.

- **Onde tirar:** qualquer Unidade Básica de Saúde (UBS) do seu bairro.
- **Documentos:** passaporte ou outro documento, CPF (se tiver) e comprovante de residência.
- **Custo:** gratuito.

### Tipos de atendimento

- **UBS (posto de saúde):** consultas comuns, vacinas, exames simples. Procure a UBS do seu bairro.
- **UPA (Unidade de Pronto Atendimento):** urgências e emergências 24h.
- **Hospital:** casos graves, geralmente após encaminhamento.
- **SAMU (192):** ambulância para emergências graves. Ligação gratuita.

### Vacinação

A vacinação no Brasil é **gratuita** pelo SUS. Crianças e adultos têm calendários específicos. Leve seu cartão de vacina antigo (se tiver) para a UBS atualizar.

### Dica

Salve no seu celular o telefone e endereço da UBS mais próxima da sua casa. Em uma emergência, você vai precisar dessas informações rapidamente.`,
      },
      es: {
        title: "Salud pública (SUS)",
        summary:
          "Atención médica gratuita por el SUS, cómo conseguir la tarjeta y dónde buscar atención.",
        body: `## SUS: atención gratuita para todos

El **Sistema Único de Salud (SUS)** atiende a cualquier persona que esté en Brasil, **independientemente de la nacionalidad o situación migratoria**. No es necesario tener CPF para una emergencia.

### Tarjeta SUS

Para atenciones no emergenciales (consultas, vacunas, estudios), se recomienda tener la **Tarjeta Nacional de Salud**.

- **Dónde sacarla:** cualquier Unidad Básica de Salud (UBS) de tu barrio.
- **Documentos:** pasaporte u otro documento, CPF (si tenés) y comprobante de domicilio.
- **Costo:** gratuito.

### Tipos de atención

- **UBS (centro de salud):** consultas comunes, vacunas, estudios simples. Andá a la UBS de tu barrio.
- **UPA (Unidad de Atención Inmediata):** urgencias y emergencias 24h.
- **Hospital:** casos graves, normalmente con derivación.
- **SAMU (192):** ambulancia para emergencias graves. Llamada gratuita.

### Vacunación

La vacunación en Brasil es **gratuita** por el SUS. Niños y adultos tienen calendarios específicos. Llevá tu carnet de vacunación antiguo (si tenés) para que la UBS lo actualice.

### Tip

Guardá en tu celular el teléfono y la dirección de la UBS más cercana a tu casa. En una emergencia, vas a necesitar esa información rápidamente.`,
      },
    },
  },
  {
    slug: "transporte-publico",
    order: 3,
    icon: "Bus",
    color: "orange",
    contactIds: ["consorcio-fenix"],
    translations: {
      pt: {
        title: "Transporte público",
        summary:
          "Ônibus, integração e como conseguir o cartão Passe Rápido em Florianópolis.",
        body: `**O transporte público de Floripa é principalmente ônibus**, operado pelo Consórcio Fênix. O sistema tem **6 terminais de integração** que permitem trocar de linha sem pagar tarifa nova — vantagem grande pra trajetos longos.

> **Quem paga com cartão paga menos** que quem paga em dinheiro. Vale tirar o Passe Rápido logo nos primeiros dias.

Os tópicos abaixo explicam como tirar e usar o cartão, quem tem direito à tarifa social e quais apps facilitam o dia a dia.

Em **horário de pico (07h–09h e 17h–19h)**, o trânsito pesa, principalmente no centro. Saia com folga.`,
      },
      es: {
        title: "Transporte público",
        summary:
          "Colectivos, integración y cómo conseguir la tarjeta Passe Rápido en Florianópolis.",
        body: `**El transporte público de Floripa es principalmente colectivos (ônibus)**, operado por el Consorcio Fênix. El sistema tiene **6 terminales de integración** que permiten cambiar de línea sin pagar tarifa nueva — gran ventaja para trayectos largos.

> **Quien paga con tarjeta paga menos** que quien paga en efectivo. Vale sacar el Passe Rápido en los primeros días.

Los temas debajo explican cómo sacar y usar la tarjeta, quién tiene derecho a la tarifa social y qué apps facilitan el día a día.

En **hora pico (07h–09h y 17h–19h)**, el tránsito pesa, sobre todo en el centro. Salí con margen.`,
      },
    },
    topics: [
      {
        slug: "cartao-passe-rapido",
        order: 1,
        contactIds: ["consorcio-fenix"],
        translations: {
          pt: {
            title: "Cartão Passe Rápido",
            summary:
              "Como tirar e recarregar o cartão de ônibus. Pagar com cartão sai mais barato.",
            body: `**O Passe Rápido é o cartão de ônibus de Floripa. Quem paga com cartão paga menos do que quem paga em dinheiro** — diferença que se acumula rápido se você anda todo dia.

## Onde tirar

- **TICEN** (Terminal de Integração do Centro) — posto principal, com várias guichês.
- **Outros terminais de integração** espalhados pela cidade.

**Leve:** documento com foto + CPF. O cartão sai na hora.

> **Faça o cartão no seu nome** (com CPF). Sem cadastro, se perder você perde o saldo. Com cadastro, dá pra bloquear e recuperar.

## Como recarregar

| Onde | Como funciona |
| --- | --- |
| **Terminais de integração** | Em dinheiro ou cartão, no balcão |
| **Casas lotéricas** | Em dinheiro |
| **App Consórcio Fênix** | Pix ou cartão de crédito, 24h |

> **Não dá pra recarregar dentro do ônibus.** Zerou e tá indo embarcar? Recarregue no terminal mais próximo ou pague em dinheiro com o valor exato (motorista nem sempre tem troco).

## Integração entre linhas (a grande vantagem)

Você pode trocar de linha **sem pagar tarifa nova** em qualquer um dos **6 terminais de integração**, dentro de um intervalo de tempo. Útil pra trajetos longos com baldeação.

## Atenção

- **Um cartão por pessoa.** Dois passageiros não podem usar o mesmo cartão no mesmo ônibus.
- **Bloqueie em caso de perda:** ligue pro Consórcio Fênix ou bloqueie no app antes que alguém use o saldo.
- **Idosos (65+), estudantes e pessoas com deficiência** têm benefícios próprios. Veja o tópico sobre tarifa social.`,
          },
          es: {
            title: "Tarjeta Passe Rápido",
            summary:
              "Cómo sacar y recargar la tarjeta del colectivo. Pagar con tarjeta sale más barato.",
            body: `**El Passe Rápido es la tarjeta del colectivo de Floripa. Quien paga con tarjeta paga menos que quien paga en efectivo** — diferencia que se acumula rápido si andás todos los días.

## Dónde sacarla

- **TICEN** (Terminal de Integración del Centro) — punto principal, con varias ventanillas.
- **Otros terminales de integración** distribuidos por la ciudad.

**Llevá:** documento con foto + CPF. La tarjeta sale en el momento.

> **Sacá la tarjeta a tu nombre** (con CPF). Sin registro, si la perdés perdés el saldo. Con registro, podés bloquearla y recuperarlo.

## Cómo recargar

| Dónde | Cómo funciona |
| --- | --- |
| **Terminales de integración** | En efectivo o tarjeta, en el mostrador |
| **Casas lotéricas** | En efectivo |
| **App Consórcio Fênix** | Pix o tarjeta de crédito, 24h |

> **No se puede recargar dentro del colectivo.** ¿Te quedaste sin saldo y estás por subir? Recargá en el terminal más cercano o pagá en efectivo con el monto exacto (el chofer no siempre tiene cambio).

## Integración entre líneas (la gran ventaja)

Podés cambiar de línea **sin pagar tarifa nueva** en cualquiera de los **6 terminales de integración**, dentro de un intervalo de tiempo. Útil para trayectos largos con trasbordo.

## Atención

- **Una tarjeta por persona.** Dos pasajeros no pueden usar la misma tarjeta en el mismo colectivo.
- **Bloqueá en caso de pérdida:** llamá al Consórcio Fênix o bloqueala en la app antes que alguien use el saldo.
- **Adultos mayores (65+), estudiantes y personas con discapacidad** tienen beneficios propios. Mirá el tema sobre tarifa social.`,
          },
        },
      },
      {
        slug: "tarifa-social",
        order: 2,
        contactIds: ["cras-floripa", "consorcio-fenix"],
        translations: {
          pt: {
            title: "Tarifa social (Passe Rápido Social)",
            summary:
              "Tarifa reduzida ou gratuita pra famílias de baixa renda cadastradas no CadÚnico.",
            body: `**Pessoas em situação de baixa renda têm direito a tarifa reduzida — ou totalmente gratuita — no ônibus de Floripa.** O programa se chama **Passe Rápido Social**.

> Idosos a partir de 65 anos, estudantes e pessoas com deficiência também têm benefícios próprios, com regras diferentes.

## Quem tem direito

- Famílias com renda per capita até **meio salário-mínimo**, cadastradas no **CadÚnico**.
- Critérios extras podem se aplicar, dependendo da modalidade.

## Antes de qualquer coisa: o CadÚnico

**Sem CadÚnico, não dá pra pedir tarifa social.** O CadÚnico é o cadastro federal de famílias de baixa renda e destrava vários benefícios:

- Bolsa Família.
- Tarifa social de água e luz.
- Auxílio Gás.
- Outros programas federais e municipais.

### Como se cadastrar no CadÚnico

1. Vá ao **CRAS** mais próximo da sua casa (são vários, distribuídos por bairro).
2. Leve documentos de **todos os membros da família**:
   - **CPF** de cada um.
   - **Comprovante de residência**.
   - **Comprovante de renda** (mesmo informal — declaração serve).
3. A entrevista dura **cerca de 1 hora**.
4. O cadastro fica ativo em poucos dias.

## Como pedir a tarifa social do transporte

Depois de cadastrado no CadÚnico:

1. Vá a um posto do **Consórcio Fênix** (TICEN é o principal).
2. Leve seu cartão Passe Rápido (ou tire um na hora) e o **NIS** (número do CadÚnico) da família.
3. A redução é aplicada ao cartão.

## Atenção à renovação

O benefício é **renovado periodicamente**. Se seu CadÚnico desatualizar, você **perde o benefício** até atualizar de novo.

> **Volte ao CRAS pelo menos uma vez por ano** pra revisar seu cadastro. Vale como rotina, junto com aniversário de algum filho ou início do ano.`,
          },
          es: {
            title: "Tarifa social (Passe Rápido Social)",
            summary:
              "Tarifa reducida o gratuita para familias de bajos ingresos registradas en el CadÚnico.",
            body: `**Personas en situación de bajos ingresos tienen derecho a tarifa reducida — o totalmente gratuita — en el colectivo de Floripa.** El programa se llama **Passe Rápido Social**.

> Adultos mayores desde los 65 años, estudiantes y personas con discapacidad también tienen beneficios propios, con reglas diferentes.

## Quién tiene derecho

- Familias con ingreso per cápita hasta **medio salario mínimo**, registradas en el **CadÚnico**.
- Criterios extra pueden aplicarse según la modalidad.

## Antes que cualquier cosa: el CadÚnico

**Sin CadÚnico, no se puede pedir tarifa social.** El CadÚnico es el registro federal de familias de bajos ingresos y destraba varios beneficios:

- Bolsa Família.
- Tarifa social de agua y luz.
- Auxilio Gas.
- Otros programas federales y municipales.

### Cómo registrarse en el CadÚnico

1. Andá al **CRAS** más cercano a tu casa (hay varios, distribuidos por barrio).
2. Llevá documentos de **todos los miembros de la familia**:
   - **CPF** de cada uno.
   - **Comprobante de domicilio**.
   - **Comprobante de ingresos** (incluso informal — una declaración sirve).
3. La entrevista dura **alrededor de 1 hora**.
4. El registro queda activo en pocos días.

## Cómo pedir la tarifa social del transporte

Después de registrado en el CadÚnico:

1. Andá a un puesto del **Consórcio Fênix** (TICEN es el principal).
2. Llevá tu tarjeta Passe Rápido (o sacá una en el momento) y el **NIS** (número del CadÚnico) de la familia.
3. La reducción se aplica a la tarjeta.

## Atención a la renovación

El beneficio se **renueva periódicamente**. Si tu CadÚnico se desactualiza, **perdés el beneficio** hasta actualizarlo de nuevo.

> **Volvé al CRAS por lo menos una vez al año** para revisar tu registro. Vale como rutina — junto con un cumpleaños familiar o el inicio del año.`,
          },
        },
      },
      {
        slug: "apps-uteis",
        order: 3,
        contactIds: [],
        translations: {
          pt: {
            title: "Aplicativos úteis",
            summary:
              "Apps que ajudam a achar a linha certa, ver horários e recarregar o cartão.",
            body: `**Três aplicativos resolvem quase tudo no dia a dia do transporte em Floripa.** Não precisa instalar todos — escolha conforme o uso.

## Pra achar rota e horário

| App | Pra que serve | Quando usar |
| --- | --- | --- |
| **Google Maps** | Rota completa porta-a-porta | Maioria dos trajetos |
| **Moovit** | Alertas em tempo real, dicas de usuários | Trajetos frequentes |

Os dois funcionam offline pra rotas já consultadas, mas precisam de internet pra ver horários atualizados.

## Pra recarregar e gerenciar o cartão

- **Consórcio Fênix (app oficial):** recarga via Pix ou cartão de crédito, consulta saldo, histórico de viagens, bloqueio em caso de perda.

## Dicas práticas

- **Salve seus trajetos comuns** (casa-trabalho, casa-escola) como favoritos no Maps ou Moovit. Em 2 toques você confere o próximo ônibus.
- **Cuidado com a bateria:** o Moovit roda GPS o tempo todo e drena rápido. Em viagens longas, leve um carregador portátil.
- **Wifi nos terminais:** o TICEN tem wifi grátis do Consórcio. Útil pra conferir rota antes de embarcar sem gastar seus dados.

> **Antes de fechar aluguel em um bairro,** rode no Maps o trajeto até o trabalho/escola. Floripa tem trânsito sazonal — o que parece perto pode levar 1h em janeiro.`,
          },
          es: {
            title: "Apps útiles",
            summary:
              "Apps que ayudan a encontrar la línea correcta, ver horarios y recargar la tarjeta.",
            body: `**Tres aplicaciones resuelven casi todo en el día a día del transporte en Floripa.** No necesitás instalar todas — elegí según el uso.

## Para encontrar ruta y horario

| App | Para qué sirve | Cuándo usar |
| --- | --- | --- |
| **Google Maps** | Ruta completa puerta a puerta | Mayoría de los trayectos |
| **Moovit** | Alertas en tiempo real, consejos de usuarios | Trayectos frecuentes |

Los dos funcionan offline para rutas ya consultadas, pero necesitan internet para ver horarios actualizados.

## Para recargar y gestionar la tarjeta

- **Consórcio Fênix (app oficial):** recarga vía Pix o tarjeta de crédito, consulta saldo, historial de viajes, bloqueo en caso de pérdida.

## Tips prácticos

- **Guardá tus trayectos comunes** (casa-trabajo, casa-escuela) como favoritos en Maps o Moovit. En 2 toques consultás el próximo colectivo.
- **Cuidado con la batería:** Moovit corre GPS todo el tiempo y consume rápido. En viajes largos, llevá un cargador portátil.
- **Wifi en los terminales:** el TICEN tiene wifi gratis del Consorcio. Útil para chequear ruta antes de embarcar sin gastar tus datos.

> **Antes de cerrar alquiler en un barrio,** corré en Maps el trayecto hasta el trabajo/escuela. Floripa tiene tránsito estacional — lo que parece cerca puede llevar 1h en enero.`,
          },
        },
      },
    ],
  },
  {
    slug: "trabalho-e-renda",
    order: 4,
    icon: "Briefcase",
    color: "emerald",
    contactIds: ["sine-floripa"],
    translations: {
      pt: {
        title: "Trabalho e renda",
        summary:
          "Como procurar emprego, direitos básicos e onde se cadastrar para vagas.",
        body: `## Trabalhar legalmente no Brasil

Para trabalhar de carteira assinada no Brasil, você precisa de **CPF** e **CRNM** (ou outro documento que comprove sua situação migratória regular).

### Onde procurar vagas

- **SINE (Sistema Nacional de Emprego):** cadastro gratuito para vagas formais. Há postos físicos e o site **gov.br/sine**.
- **Plataformas online:** Catho, Vagas.com, LinkedIn, Indeed, Gupy.
- **Grupos de WhatsApp e Facebook:** comuns em Floripa, especialmente para hotelaria, gastronomia e construção civil.

### Seus direitos básicos (CLT)

Se você trabalha com carteira assinada, tem direito a:

- Salário mínimo (R$ 1.518/mês em 2025) ou o da categoria, o que for maior.
- 13º salário.
- Férias remuneradas (30 dias por ano + 1/3).
- FGTS (depositado pelo empregador).
- Aviso prévio se for demitido sem justa causa.
- Seguro-desemprego (em alguns casos).

### Trabalho informal

Muita gente começa em trabalhos informais (autônomos, MEI, plataformas como Uber/iFood). É legal, mas você não tem os mesmos direitos que um trabalho CLT. Pense nisso ao decidir.

### Cuidado com golpes

- Vaga **nunca** cobra dinheiro para te contratar.
- Desconfie de promessas de salário muito acima do mercado.
- Se algo parece bom demais, provavelmente é golpe.

### Dica

Em Florianópolis há muitas vagas em **turismo, hotelaria e gastronomia** (alta temporada: dezembro a março) e em **tecnologia** (várias startups na cidade).`,
      },
      es: {
        title: "Trabajo e ingresos",
        summary:
          "Cómo buscar empleo, derechos básicos y dónde registrarse para vacantes.",
        body: `## Trabajar legalmente en Brasil

Para trabajar en blanco (carteira assinada) en Brasil, necesitás **CPF** y **CRNM** (u otro documento que pruebe tu situación migratoria regular).

### Dónde buscar vacantes

- **SINE (Sistema Nacional de Empleo):** registro gratuito para vacantes formales. Hay puestos físicos y el sitio **gov.br/sine**.
- **Plataformas online:** Catho, Vagas.com, LinkedIn, Indeed, Gupy.
- **Grupos de WhatsApp y Facebook:** comunes en Floripa, sobre todo para hotelería, gastronomía y construcción.

### Tus derechos básicos (CLT)

Si trabajás con carteira assinada, tenés derecho a:

- Salario mínimo (R$ 1.518/mes en 2025) o el de la categoría, lo que sea mayor.
- 13° sueldo (aguinaldo).
- Vacaciones pagas (30 días al año + 1/3).
- FGTS (depositado por el empleador).
- Aviso previo si te despiden sin causa.
- Seguro de desempleo (en algunos casos).

### Trabajo informal

Mucha gente arranca con trabajos informales (autónomos, MEI, plataformas como Uber/iFood). Es legal, pero no tenés los mismos derechos que un trabajo CLT. Tenelo en cuenta al decidir.

### Cuidado con estafas

- Una vacante **nunca** cobra dinero para contratarte.
- Desconfiá de promesas de salario muy por encima del mercado.
- Si algo parece demasiado bueno, probablemente sea estafa.

### Tip

En Florianópolis hay muchas vacantes en **turismo, hotelería y gastronomía** (alta temporada: diciembre a marzo) y en **tecnología** (varias startups en la ciudad).`,
      },
    },
  },
  {
    slug: "assistencia-social",
    order: 5,
    icon: "HandHeart",
    color: "violet",
    contactIds: ["cras-floripa", "caritas-sc"],
    translations: {
      pt: {
        title: "Assistência social",
        summary:
          "CRAS, ONGs e serviços de apoio para famílias em situação de vulnerabilidade.",
        body: `## A quem recorrer quando precisar de apoio

O Brasil tem uma rede pública e privada de assistência social que atende migrantes. Tudo gratuito.

### CRAS - Centros de Referência de Assistência Social

O CRAS é a porta de entrada para:

- **Cadastro Único (CadÚnico):** te dá acesso a vários benefícios sociais, incluindo Bolsa Família, tarifa social de água/luz, tarifa social do ônibus.
- **Bolsa Família:** auxílio mensal para famílias de baixa renda.
- **Orientação jurídica e social.**

Há várias unidades de CRAS espalhadas pelos bairros de Florianópolis. Procure a mais próxima da sua casa.

### CREAS

O **CREAS** atende casos mais específicos: violência doméstica, exploração de crianças, situação de rua, abandono. Se você está em uma situação assim ou conhece alguém, procure o CREAS.

### ONGs e entidades

- **Cáritas Brasileira (SC):** atende migrantes, refugiados e solicitantes de refúgio. Tem orientação jurídica e ajuda em vários processos.
- **Pastoral do Migrante:** apoio espiritual e social para imigrantes católicos (e abertos a todos).
- **ACNUR (parceiros locais):** apoio específico para refugiados.

### O que levar quando for ao CRAS

- Documento de identidade (passaporte ou CRNM).
- CPF de todos os membros da família.
- Comprovante de residência.
- Comprovante de renda (mesmo que informal).

### Dica

Não tenha vergonha de pedir ajuda. Esses serviços existem exatamente para isso e são um direito seu.`,
      },
      es: {
        title: "Asistencia social",
        summary:
          "CRAS, ONGs y servicios de apoyo para familias en situación de vulnerabilidad.",
        body: `## A quién recurrir cuando necesitás apoyo

Brasil tiene una red pública y privada de asistencia social que atiende a migrantes. Todo gratuito.

### CRAS - Centros de Referencia de Asistencia Social

El CRAS es la puerta de entrada para:

- **Cadastro Único (CadÚnico):** te da acceso a varios beneficios sociales, incluyendo Bolsa Família, tarifa social de agua/luz, tarifa social del colectivo.
- **Bolsa Família:** subsidio mensual para familias de bajos ingresos.
- **Orientación jurídica y social.**

Hay varias unidades de CRAS distribuidas por los barrios de Florianópolis. Buscá la más cercana a tu casa.

### CREAS

El **CREAS** atiende casos más específicos: violencia doméstica, explotación de niños, situación de calle, abandono. Si estás en una situación así o conocés a alguien, andá al CREAS.

### ONGs y entidades

- **Cáritas Brasileña (SC):** atiende migrantes, refugiados y solicitantes de refugio. Tiene orientación jurídica y ayuda en varios trámites.
- **Pastoral del Migrante:** apoyo espiritual y social para inmigrantes católicos (y abiertos a todos).
- **ACNUR (socios locales):** apoyo específico para refugiados.

### Qué llevar al CRAS

- Documento de identidad (pasaporte o CRNM).
- CPF de todos los miembros de la familia.
- Comprobante de domicilio.
- Comprobante de ingresos (incluso informal).

### Tip

No tengas vergüenza de pedir ayuda. Estos servicios existen exactamente para eso y son un derecho tuyo.`,
      },
    },
  },
  {
    slug: "educacao",
    order: 6,
    icon: "GraduationCap",
    color: "teal",
    contactIds: ["plac-ufsc"],
    translations: {
      pt: {
        title: "Educação",
        summary:
          "Matrícula em escola pública, cursos gratuitos de português e revalidação de diploma.",
        body: `## Escola pública e cursos gratuitos

A educação pública no Brasil é **gratuita** e **garantida por lei a todas as crianças**, inclusive imigrantes em situação irregular.

### Matrícula escolar para crianças

- Procure a **Secretaria Municipal de Educação** (para creche/fundamental) ou a **Secretaria Estadual** (para ensino médio).
- Documentos: certidão de nascimento (mesmo do país de origem), comprovante de residência, histórico escolar (se tiver). **Não precisa de visto ou CRNM** para matricular criança.
- Há vagas em escolas próximas a você. Se houver dificuldade, peça apoio ao CRAS.

### Português como Língua de Acolhimento (PLAc)

A UFSC oferece cursos **gratuitos** de português especificamente para imigrantes e refugiados.

- Aulas presenciais e online.
- Vários níveis (do básico ao avançado).
- Aberto para qualquer nacionalidade.

Há também cursos em **escolas técnicas, igrejas e ONGs** — pergunte na Cáritas ou na Pastoral do Migrante.

### Revalidação de diploma estrangeiro

Se você tem um diploma do seu país (graduação, ensino médio), pode revalidar no Brasil:

- **Ensino médio:** Secretaria Estadual de Educação.
- **Graduação:** universidades públicas (a UFSC participa do Carolina Bori, processo nacional).
- **Pós-graduação:** também via universidades.

O processo pode ser demorado e ter custos (taxas, traduções juramentadas).

### Dica

Mesmo sem revalidar o diploma, **muitos cursos de qualificação profissional gratuitos** (SENAI, SENAC, IFSC) estão abertos para imigrantes. É um caminho mais rápido para entrar no mercado de trabalho.`,
      },
      es: {
        title: "Educación",
        summary:
          "Matrícula en escuela pública, cursos gratuitos de portugués y revalidación de título.",
        body: `## Escuela pública y cursos gratuitos

La educación pública en Brasil es **gratuita** y **garantizada por ley a todos los niños**, incluso inmigrantes en situación irregular.

### Matrícula escolar para niños

- Andá a la **Secretaría Municipal de Educación** (para jardín/primaria) o a la **Secretaría Estadual** (para secundaria).
- Documentos: partida de nacimiento (incluso del país de origen), comprobante de domicilio, historial escolar (si tenés). **No se necesita visa ni CRNM** para matricular a un niño.
- Hay vacantes en escuelas cerca de tu casa. Si tenés dificultad, pedí apoyo en el CRAS.

### Portugués como Lengua de Acogida (PLAc)

La UFSC ofrece cursos **gratuitos** de portugués específicamente para inmigrantes y refugiados.

- Clases presenciales y online.
- Varios niveles (de básico a avanzado).
- Abierto a cualquier nacionalidad.

También hay cursos en **escuelas técnicas, iglesias y ONGs** — preguntá en la Cáritas o en la Pastoral del Migrante.

### Revalidación de título extranjero

Si tenés un título de tu país (universitario, secundario), podés revalidarlo en Brasil:

- **Secundario:** Secretaría Estadual de Educación.
- **Universitario:** universidades públicas (la UFSC participa del Carolina Bori, proceso nacional).
- **Posgrado:** también vía universidades.

El proceso puede ser largo y tener costos (tasas, traducciones juradas).

### Tip

Aun sin revalidar el título, **muchos cursos de capacitación profesional gratuitos** (SENAI, SENAC, IFSC) están abiertos a inmigrantes. Es un camino más rápido para entrar al mercado laboral.`,
      },
    },
  },
  {
    slug: "moradia",
    order: 7,
    icon: "Home",
    color: "amber",
    contactIds: ["cras-floripa", "caritas-sc"],
    translations: {
      pt: {
        title: "Moradia",
        summary:
          "Orientações para alugar imóvel, programas habitacionais e abrigos emergenciais.",
        body: `## Onde morar em Floripa

Florianópolis tem aluguéis caros, principalmente perto da praia e no centro. Bairros mais acessíveis: Trindade, Capoeiras, Estreito, Coqueiros.

### Alugar um imóvel

A maioria das imobiliárias exige um destes três:

1. **Fiador** com imóvel próprio em Floripa.
2. **Seguro fiança** (você paga um valor mensal extra à seguradora).
3. **Depósito caução** (3 meses de aluguel adiantado, devolvido no fim).

Se você não tem fiador, o seguro fiança e o caução são os caminhos mais comuns para quem está chegando.

### Alternativas para começar

- **República:** dividir aluguel com outras pessoas. Muito comum entre estudantes e jovens trabalhadores.
- **Aluguel direto com proprietário:** sem imobiliária, costuma ser mais flexível. Procure em grupos do Facebook ou OLX.
- **Pousadas e quartos baratos:** para os primeiros dias enquanto procura algo fixo.

### Situação de rua ou emergência

Se você ou sua família estiver sem onde dormir:

- **CREAS / Centro POP:** atendem população em situação de rua. Procure o CRAS para encaminhamento.
- **Casa de passagem:** abrigo temporário enquanto se busca solução.
- **Cáritas:** pode orientar para abrigos parceiros.

### Programas habitacionais

- **Minha Casa Minha Vida:** financiamento subsidiado para compra de imóvel próprio. Tem critérios de renda e exige documentos brasileiros (CPF, comprovante de renda).
- **Aluguel social municipal:** em casos de vulnerabilidade extrema. Via CRAS.

### Dica

Em alta temporada (dez-mar), preços de aluguel sobem muito em Florianópolis. Se possível, feche contrato antes de dezembro.`,
      },
      es: {
        title: "Vivienda",
        summary:
          "Orientaciones para alquilar, programas habitacionales y refugios de emergencia.",
        body: `## Dónde vivir en Floripa

Florianópolis tiene alquileres caros, sobre todo cerca de la playa y en el centro. Barrios más accesibles: Trindade, Capoeiras, Estreito, Coqueiros.

### Alquilar un inmueble

La mayoría de las inmobiliarias exige uno de estos tres:

1. **Fiador (garante)** con propiedad propia en Floripa.
2. **Seguro fianza** (pagás un valor mensual extra a la aseguradora).
3. **Depósito (caución)** (3 meses de alquiler por adelantado, devuelto al final).

Si no tenés garante, el seguro fianza y el depósito son los caminos más comunes para quien está llegando.

### Alternativas para empezar

- **República (compartido):** dividir alquiler con otras personas. Muy común entre estudiantes y jóvenes trabajadores.
- **Alquiler directo con propietario:** sin inmobiliaria, suele ser más flexible. Buscá en grupos de Facebook o OLX.
- **Hostels y cuartos baratos:** para los primeros días mientras buscás algo fijo.

### Situación de calle o emergencia

Si vos o tu familia están sin dónde dormir:

- **CREAS / Centro POP:** atienden a personas en situación de calle. Andá al CRAS para derivación.
- **Casa de pasaje:** refugio temporal mientras se busca solución.
- **Cáritas:** puede orientar a refugios socios.

### Programas habitacionales

- **Minha Casa Minha Vida:** financiación subsidiada para comprar inmueble propio. Tiene criterios de ingresos y exige documentos brasileños (CPF, comprobante de ingresos).
- **Alquiler social municipal:** en casos de vulnerabilidad extrema. Vía CRAS.

### Tip

En alta temporada (dic-mar), los alquileres suben mucho en Florianópolis. Si podés, cerrá contrato antes de diciembre.`,
      },
    },
  },
  {
    slug: "emergencias",
    order: 8,
    icon: "Siren",
    color: "red",
    contactIds: [
      "samu-192",
      "policia-militar-190",
      "bombeiros-193",
      "disque-100",
      "defensoria-publica-uniao",
    ],
    translations: {
      pt: {
        title: "Emergências e segurança",
        summary:
          "Números de emergência, o que fazer em situação de violência e como denunciar discriminação.",
        body: `## Números de emergência (ligação gratuita)

| Serviço | Número |
| --- | --- |
| Polícia Militar | **190** |
| SAMU (ambulância) | **192** |
| Bombeiros | **193** |
| Defesa Civil | **199** |
| Direitos Humanos (denúncias) | **100** |
| Atendimento à mulher | **180** |

Esses números funcionam de qualquer telefone, **mesmo sem chip ativo e sem crédito**.

### Em caso de violência

Se você for vítima de violência (qualquer tipo):

- **Em emergência:** ligue 190 (polícia) ou 180 (violência contra mulher).
- **Para registrar boletim:** vá à **Delegacia de Polícia** mais próxima. O atendimento é gratuito e em qualquer delegacia. Para mulheres, há a **DEAM** (Delegacia Especializada).
- **Apoio jurídico:** Defensoria Pública (gratuito).

Você tem direito a **intérprete** se não falar português bem. Peça.

### Xenofobia e discriminação

Discriminação por nacionalidade ou origem é **crime** no Brasil (Lei de Crimes Raciais). Se você sofrer:

- Registre boletim de ocorrência na delegacia mais próxima.
- Denuncie no **Disque 100** (Direitos Humanos), gratuito e anônimo.
- Procure a Defensoria Pública ou a Cáritas para orientação.

### Documentos perdidos ou roubados

Se perdeu seus documentos ou foram roubados:

1. Faça boletim de ocorrência online (site da Polícia Civil de SC) ou em qualquer delegacia.
2. Vá à Polícia Federal para emitir 2ª via de CRNM.
3. Se for passaporte, procure o consulado do seu país.

### Dica

Tire foto ou faça cópia de todos os seus documentos importantes e salve em um lugar seguro (e-mail, nuvem). Em caso de perda, agiliza muito a recuperação.`,
      },
      es: {
        title: "Emergencias y seguridad",
        summary:
          "Números de emergencia, qué hacer en situación de violencia y cómo denunciar discriminación.",
        body: `## Números de emergencia (llamada gratuita)

| Servicio | Número |
| --- | --- |
| Policía Militar | **190** |
| SAMU (ambulancia) | **192** |
| Bomberos | **193** |
| Defensa Civil | **199** |
| Derechos Humanos (denuncias) | **100** |
| Atención a la mujer | **180** |

Estos números funcionan desde cualquier teléfono, **incluso sin chip activo y sin crédito**.

### En caso de violencia

Si sos víctima de violencia (de cualquier tipo):

- **En emergencia:** llamá al 190 (policía) o 180 (violencia contra la mujer).
- **Para hacer denuncia:** andá a la **Delegacia de Polícia** más cercana. La atención es gratuita y en cualquier comisaría. Para mujeres, hay la **DEAM** (Delegación Especializada).
- **Apoyo jurídico:** Defensoría Pública (gratuito).

Tenés derecho a **intérprete** si no hablás bien portugués. Pedilo.

### Xenofobia y discriminación

La discriminación por nacionalidad u origen es **delito** en Brasil (Ley de Delitos Raciales). Si sufrís:

- Hacé denuncia en la comisaría más cercana.
- Denunciá en el **Disque 100** (Derechos Humanos), gratuito y anónimo.
- Buscá la Defensoría Pública o la Cáritas para orientación.

### Documentos perdidos o robados

Si perdés tus documentos o te los roban:

1. Hacé denuncia online (sitio de la Policía Civil de SC) o en cualquier comisaría.
2. Andá a la Policía Federal para emitir 2ª vía de CRNM.
3. Si es pasaporte, contactá al consulado de tu país.

### Tip

Sacá foto o copia de todos tus documentos importantes y guardalos en un lugar seguro (correo, nube). En caso de pérdida, agiliza mucho la recuperación.`,
      },
    },
  },
];
