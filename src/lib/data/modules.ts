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

1. **Agende** no site da Receita Federal e vá à unidade de Florianópolis — **Rua Claudino Bento da Silva, 11**, no centro. (Dá pra fazer **online**, de graça, sem sair de casa.)
2. Apresente os documentos abaixo.
3. Receba o número de CPF na hora.

> **Atendimento rápido.** O CPF para migrantes costuma sair em 15–30 minutos. O atendimento presencial na Receita é **mediante agendamento**; as entidades conveniadas (Correios, Banco do Brasil, Caixa) atendem sem agendar, com taxa de R$ 7.

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

1. **Agendá** en el sitio de la Receita Federal y andá a la unidad de Florianópolis — **Rua Claudino Bento da Silva, 11**, en el centro. (Se puede hacer **online**, gratis, sin salir de casa.)
2. Presentá los documentos abajo.
3. Recibís el número de CPF en el momento.

> **Atención rápida.** El CPF para migrantes suele salir en 15–30 minutos. La atención presencial en la Receita es **con cita previa**; las entidades convenidas (Correios, Banco do Brasil, Caixa) atienden sin cita, con tasa de R$ 7.

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
2. **Gere e pague as GRUs** (Guias de Recolhimento da União): **R$ 168,13** (processamento do pedido de residência) + **R$ 204,77** (emissão da CRNM), cerca de **R$ 373** no total. Não há isenção da taxa de emissão.
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

**Posto de Migração da Polícia Federal (Floripa Shopping)**
Loja 132 — Rod. SC-401, 3116, Saco Grande · Seg-Sex 10:00-17:00

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
2. **Generá y pagá las GRU** (Guías de Recaudación de la Unión): **R$ 168,13** (procesamiento del pedido de residencia) + **R$ 204,77** (emisión de la CRNM), cerca de **R$ 373** en total. No hay exención de la tasa de emisión.
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

**Puesto de Migración de la Policía Federal (Floripa Shopping)**
Local 132 — Rod. SC-401, 3116, Saco Grande · Lun-Vie 10:00-17:00

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
    contactIds: ["sus-cartao", "alo-saude-floripa", "upa-sul", "samu-192"],
    translations: {
      pt: {
        title: "Saúde pública (SUS)",
        summary:
          "Atendimento médico gratuito pelo SUS, como conseguir o cartão e onde procurar atendimento.",
        body: `**No Brasil, qualquer pessoa tem direito a atendimento gratuito pelo SUS** — incluindo migrantes em situação irregular. Não precisa de visto, CPF ou comprovante de renda pra ser atendido numa emergência.

O sistema é dividido em níveis: a **UBS** do bairro pra coisas comuns, a **UPA** pra urgências, o **hospital** pra casos graves, e o **SAMU (192)** pra ambulância. Em Floripa há ainda o **Alô Saúde Floripa (0800 333 3233)** — atendimento médico gratuito por telefone, 24h, que resolve muito caso à distância.

> **Salve no celular** o telefone e o endereço da UBS mais próxima da sua casa. Numa emergência, você vai precisar dessa informação rápido.`,
      },
      es: {
        title: "Salud pública (SUS)",
        summary:
          "Atención médica gratuita por el SUS, cómo conseguir la tarjeta y dónde buscar atención.",
        body: `**En Brasil, cualquier persona tiene derecho a atención gratuita por el SUS** — incluso migrantes en situación irregular. No necesitás visa, CPF ni comprobante de ingresos para ser atendido en una emergencia.

El sistema se divide en niveles: la **UBS** del barrio para cosas comunes, la **UPA** para urgencias, el **hospital** para casos graves, y el **SAMU (192)** para ambulancia. En Floripa hay además el **Alô Saúde Floripa (0800 333 3233)** — atención médica gratuita por teléfono, 24h, que resuelve muchos casos a distancia.

> **Guardá en el celular** el teléfono y la dirección de la UBS más cercana a tu casa. En una emergencia, vas a necesitar esa información rápido.`,
      },
    },
    topics: [
      {
        slug: "cartao-sus",
        order: 1,
        contactIds: ["sus-cartao"],
        translations: {
          pt: {
            title: "Cartão SUS",
            summary:
              "Documento que identifica você no sistema de saúde. Gratuito e tira no posto de saúde do seu bairro.",
            body: `**O Cartão Nacional de Saúde é o seu identificador no SUS.** Você não precisa dele numa emergência — qualquer unidade atende. Mas pra consultas marcadas, vacinas, exames de rotina e receitas, ter o cartão facilita muito.

A boa notícia: é **gratuito** e tira no posto de saúde do seu bairro.

## Como tirar (passo a passo)

1. Encontre a **Unidade Básica de Saúde (UBS)** do seu bairro. Em Floripa há vagas em quase todos os bairros.
2. Vá pessoalmente em horário de atendimento (em geral seg–sex, 7h–17h).
3. Apresente os documentos abaixo.
4. Receba o cartão (ou um número provisório) na hora ou em poucos dias.

## O que levar

- **Documento de identificação:** passaporte, CRNM ou protocolo da PF.
- **CPF** (se já tiver).
- **Comprovante de residência** atualizado, mesmo provisório.

> **Não tem nenhum dos documentos?** Mesmo assim, a unidade te atende em emergência. O cartão é pra consultas planejadas — emergência é universal.

## Pra que serve

- **Consultas marcadas** na sua UBS.
- **Encaminhamentos** pra especialistas (cardiologista, oftalmologista, etc.).
- **Prontuário eletrônico** acessível em qualquer UBS do Brasil.
- **Vacinas registradas** no sistema nacional.
- **Receita de remédios** pela Farmácia Popular (vários gratuitos).`,
          },
          es: {
            title: "Tarjeta SUS",
            summary:
              "Documento que te identifica en el sistema de salud. Gratis y se saca en el centro de salud de tu barrio.",
            body: `**La Tarjeta Nacional de Salud es tu identificador en el SUS.** No la necesitás en una emergencia — cualquier unidad atiende. Pero para consultas agendadas, vacunas, estudios de rutina y recetas, tener la tarjeta facilita mucho.

Buena noticia: es **gratuita** y se saca en el centro de salud de tu barrio.

## Cómo sacarla (paso a paso)

1. Encontrá la **Unidad Básica de Salud (UBS)** de tu barrio. En Floripa hay unidades en casi todos los barrios.
2. Andá personalmente en horario de atención (en general lun–vie, 7h–17h).
3. Presentá los documentos abajo.
4. Recibís la tarjeta (o un número provisorio) en el momento o en pocos días.

## Qué llevar

- **Documento de identificación:** pasaporte, CRNM o protocolo de la PF.
- **CPF** (si ya lo tenés).
- **Comprobante de domicilio** actualizado, incluso provisorio.

> **¿No tenés ninguno de los documentos?** Igual la unidad te atiende en emergencia. La tarjeta es para consultas planificadas — la emergencia es universal.

## Para qué sirve

- **Consultas agendadas** en tu UBS.
- **Derivaciones** a especialistas (cardiología, oftalmología, etc.).
- **Historia clínica electrónica** accesible en cualquier UBS de Brasil.
- **Vacunas registradas** en el sistema nacional.
- **Recetas de medicamentos** por la Farmácia Popular (varios gratuitos).`,
          },
        },
      },
      {
        slug: "onde-buscar-atendimento",
        order: 2,
        contactIds: ["alo-saude-floripa", "upa-sul"],
        translations: {
          pt: {
            title: "UBS, UPA ou hospital? Quando ir aonde",
            summary:
              "Guia rápido pra escolher a porta de entrada certa e não esperar à toa.",
            body: `**O sistema brasileiro tem 3 portas de entrada principais.** Escolher a errada faz você esperar mais ou ser mandado pra outro lugar.

## Antes de sair de casa: Alô Saúde Floripa (0800 333 3233)

Florianópolis tem um serviço **gratuito de atendimento médico por telefone**, **24h, todos os dias**: o **Alô Saúde Floripa**. Ligue **0800 333 3233** antes de ir a uma unidade — muito caso se resolve sem sair de casa.

- **Como funciona:** começa com uma triagem por enfermagem. Conforme os sintomas, você recebe orientação, agenda consulta no Centro de Saúde, é encaminhado a uma UPA ou faz uma **teleconsulta médica por vídeo**.
- **Receita e atestado:** se o médico prescrever remédio ou você precisar de atestado, eles chegam por **WhatsApp ou e-mail**. Com a receita, dá pra retirar o remédio na farmácia do Centro de Saúde, de graça pelo SUS.
- **Quem pode usar:** moradores de Florianópolis com cadastro no SUS. **Não tem cadastro? Dá pra fazer na hora, durante a ligação.**

> **Migrante recém-chegado:** mesmo sem Cartão SUS ainda, ligue — o cadastro é feito na própria chamada. O serviço é gratuito e não pergunta situação migratória.

## Decisão rápida

| Situação | Onde ir |
| --- | --- |
| Consulta marcada, sintoma comum, vacina, exame leve | **UBS** (posto do bairro) |
| Urgência: febre alta, machucado feio, crise asmática, mordida de animal | **UPA** (24h) |
| Emergência grave: AVC, infarto, parto, sangramento intenso | **Ligar 192 (SAMU)** ou hospital |

## UBS — atendimento comum

A **Unidade Básica de Saúde** é o seu posto de bairro. Marca consulta, faz vacina, acompanha gravidez, cuida de doenças crônicas (diabetes, pressão alta).

- Geralmente abre **seg–sex, 7h–17h**.
- Atende **clínico geral, enfermeiro, dentista e agente comunitário**.
- Pra consulta planejada, marque com antecedência.
- Pra urgências leves no horário de atendimento, dá pra ir e esperar.

## UPA — urgência e emergência 24h

A **Unidade de Pronto Atendimento** funciona 24 horas, sem agendamento. Você chega, faz triagem, e é atendido por prioridade (não por ordem de chegada).

- Pra casos que **não dão pra esperar até a UBS abrir**.
- A triagem usa **cores**: **vermelho** atende imediato, **amarelo** rápido, **verde** e **azul** podem demorar horas.
- Em Floripa há **3 UPAs 24h**: **Sul** (Carianos), **Norte** (Vargem Grande) e **Continente** (Estreito).

## Hospital de emergência

Pra casos graves que exigem cirurgia ou internação. **Geralmente você chega via SAMU ou encaminhado pela UPA** — ir direto sem isso pode te deixar esperando muito.

> **Em dúvida?** Ligue **136** (Disque Saúde) ou **192** (SAMU). Eles orientam pra onde ir.`,
          },
          es: {
            title: "¿UBS, UPA u hospital? Cuándo ir adónde",
            summary:
              "Guía rápida para elegir la puerta de entrada correcta y no esperar al cuete.",
            body: `**El sistema brasileño tiene 3 puertas de entrada principales.** Elegir la equivocada hace que esperes más o que te manden a otro lado.

## Antes de salir de casa: Alô Saúde Floripa (0800 333 3233)

Florianópolis tiene un servicio **gratuito de atención médica por teléfono**, **24h, todos los días**: el **Alô Saúde Floripa**. Llamá al **0800 333 3233** antes de ir a una unidad — muchos casos se resuelven sin salir de casa.

- **Cómo funciona:** empieza con un triage por enfermería. Según los síntomas, recibís orientación, agendás consulta en el Centro de Salud, te derivan a una UPA o hacés una **teleconsulta médica por video**.
- **Receta y certificado:** si el médico receta un remedio o necesitás un certificado, llegan por **WhatsApp o e-mail**. Con la receta, podés retirar el remedio en la farmacia del Centro de Salud, gratis por el SUS.
- **Quién puede usarlo:** residentes de Florianópolis con registro en el SUS. **¿No tenés registro? Se puede hacer en el momento, durante la llamada.**

> **Migrante recién llegado:** aunque todavía no tengas Tarjeta SUS, llamá — el registro se hace en la propia llamada. El servicio es gratuito y no pregunta situación migratoria.

## Decisión rápida

| Situación | Adónde ir |
| --- | --- |
| Consulta agendada, síntoma común, vacuna, estudio leve | **UBS** (centro del barrio) |
| Urgencia: fiebre alta, herida fea, crisis asmática, mordedura de animal | **UPA** (24h) |
| Emergencia grave: ACV, infarto, parto, sangrado intenso | **Llamar al 192 (SAMU)** u hospital |

## UBS — atención común

La **Unidad Básica de Salud** es tu centro de salud del barrio. Agenda consultas, vacuna, acompaña embarazos, cuida enfermedades crónicas (diabetes, presión alta).

- Generalmente abre **lun–vie, 7h–17h**.
- Atiende **clínico general, enfermero, dentista y agente comunitario**.
- Para consulta planificada, agendá con antelación.
- Para urgencias leves dentro del horario de atención, podés ir y esperar.

## UPA — urgencia y emergencia 24h

La **Unidad de Atención Inmediata** funciona 24 horas, sin agendamiento. Llegás, hacés triage, y te atienden por prioridad (no por orden de llegada).

- Para casos que **no pueden esperar hasta que abra la UBS**.
- El triage usa **colores**: **rojo** atiende inmediato, **amarillo** rápido, **verde** y **azul** pueden demorar horas.
- En Floripa hay **3 UPAs 24h**: **Sur** (Carianos), **Norte** (Vargem Grande) y **Continente** (Estreito).

## Hospital de emergencia

Para casos graves que exigen cirugía o internación. **Generalmente llegás vía SAMU o derivado por la UPA** — ir directo sin eso te puede dejar esperando mucho.

> **¿En duda?** Llamá al **136** (Disque Saúde) o al **192** (SAMU). Te orientan adónde ir.`,
          },
        },
      },
      {
        slug: "samu-emergencias",
        order: 3,
        contactIds: ["samu-192"],
        translations: {
          pt: {
            title: "SAMU (192) e emergências médicas",
            summary:
              "Quando ligar 192, o que falar e o que fazer enquanto a ambulância chega.",
            body: `**O SAMU (192) é o serviço público de ambulância.** Ligação **gratuita**, **24h**, atende qualquer pessoa — não precisa de cartão SUS, CPF ou documento.

## Quando ligar 192

- **Dor no peito**, falta de ar, suspeita de **infarto ou AVC**.
- **Acidente** (carro, queda, atropelamento).
- **Convulsão**, desmaio, perda de consciência.
- **Sangramento intenso** que não para.
- **Trabalho de parto**.
- **Tentativa de suicídio** ou crise psiquiátrica grave.
- **Envenenamento, queimadura grave**.

## Como ligar (3 passos)

1. **Disque 192.** Funciona de qualquer celular, **mesmo sem chip ou sem crédito**.
2. **Diga claramente o endereço**: rua, número, bairro, ponto de referência se ajudar.
3. **Descreva o que está acontecendo** em poucas palavras: quem é a pessoa, o que sente, há quanto tempo.

> **Não fala português bem?** Diga "**preciso de intérprete**" ou diga o seu idioma e mantenha a ligação. O atendente vai tentar acionar tradução.

## Enquanto a ambulância não chega

- **Não desligue** o telefone até o atendente mandar.
- **Mantenha a pessoa onde está**, a menos que haja perigo imediato (fogo, trânsito).
- Se a pessoa **estiver consciente**, conforte e fale com ela.
- Se **inconsciente, vire de lado** pra não engasgar.
- Se **não respira**, comece massagem cardíaca — o atendente do 192 te guia por telefone.

## Outros números úteis

| Número | Pra que serve |
| --- | --- |
| **192** | Ambulância (SAMU) |
| **193** | Bombeiros (incêndios, resgates) |
| **190** | Polícia |
| **180** | Violência contra mulher |
| **100** | Direitos humanos (xenofobia, abuso) |
| **199** | Defesa Civil (enchente, deslizamento) |`,
          },
          es: {
            title: "SAMU (192) y emergencias médicas",
            summary:
              "Cuándo llamar al 192, qué decir y qué hacer mientras llega la ambulancia.",
            body: `**El SAMU (192) es el servicio público de ambulancia.** Llamada **gratuita**, **24h**, atiende a cualquier persona — no necesitás tarjeta SUS, CPF ni documento.

## Cuándo llamar al 192

- **Dolor en el pecho**, falta de aire, sospecha de **infarto o ACV**.
- **Accidente** (auto, caída, atropello).
- **Convulsión**, desmayo, pérdida de conciencia.
- **Sangrado intenso** que no para.
- **Trabajo de parto**.
- **Intento de suicidio** o crisis psiquiátrica grave.
- **Envenenamiento, quemadura grave**.

## Cómo llamar (3 pasos)

1. **Discá 192.** Funciona desde cualquier celular, **incluso sin chip o sin crédito**.
2. **Decí claramente la dirección**: calle, número, barrio, punto de referencia si ayuda.
3. **Describí qué está pasando** en pocas palabras: quién es la persona, qué siente, hace cuánto.

> **¿No hablás bien portugués?** Decí "**preciso de intérprete**" o decí tu idioma y mantené la llamada. El operador va a intentar accionar traducción.

## Mientras no llega la ambulancia

- **No cortes** el teléfono hasta que el operador te diga.
- **Mantené a la persona donde está**, salvo que haya peligro inmediato (fuego, tránsito).
- Si la persona **está consciente**, calmala y hablale.
- Si **inconsciente, ponela de costado** para que no se ahogue.
- Si **no respira**, empezá masaje cardíaco — el operador del 192 te guía por teléfono.

## Otros números útiles

| Número | Para qué sirve |
| --- | --- |
| **192** | Ambulancia (SAMU) |
| **193** | Bomberos (incendios, rescates) |
| **190** | Policía |
| **180** | Violencia contra la mujer |
| **100** | Derechos humanos (xenofobia, abuso) |
| **199** | Defensa Civil (inundación, deslizamiento) |`,
          },
        },
      },
      {
        slug: "vacinacao",
        order: 4,
        contactIds: [],
        translations: {
          pt: {
            title: "Vacinação gratuita pelo SUS",
            summary:
              "Calendário gratuito, com ou sem documentos, e o que levar pra UBS atualizar suas vacinas.",
            body: `**Todas as vacinas do calendário nacional são gratuitas pelo SUS** — pra brasileiros e migrantes, com ou sem documentos. Crianças, adultos e idosos têm calendários próprios.

## Onde vacinar

- **Sua UBS** (posto de saúde do bairro) — opção principal.
- **Campanhas itinerantes** (em escolas, shoppings, terminais) em datas específicas.
- **Hospitais e UPAs** vacinam em situações de risco (exposição a sangue, mordida de animal).

## O que levar

- **Documento de identificação** (qualquer um).
- **Cartão de vacinação anterior** do seu país, se tiver — pra UBS atualizar e evitar repetir doses.
- **Cartão SUS** ajuda, mas não é obrigatório.

> **Trouxe vacinas do seu país?** Leve o cartão original (mesmo em outro idioma). A UBS transcreve pro padrão brasileiro e indica o que está faltando.

## Calendário básico do adulto migrante

Vacinas que provavelmente vão te oferecer se você ainda não tomou:

- **Tríplice viral** (sarampo, caxumba, rubéola).
- **Hepatite B** (3 doses).
- **dT** (difteria e tétano, reforço a cada 10 anos).
- **Febre amarela** (especialmente importante no Brasil).
- **COVID-19** e **influenza** (anuais).

Crianças têm calendário muito mais extenso — pergunte na UBS sobre o esquema completo.

## Vacinas pra viagens internacionais

Voltar de visita ao seu país de origem? Algumas regiões pedem **comprovante de febre amarela** pra entrar ou sair. Tome a vacina na UBS (gratuita) e depois emita o **Certificado Internacional de Vacinação (CIVP) de graça pela Anvisa**, pelo [gov.br](https://www.gov.br) ou num posto da Anvisa no aeroporto.`,
          },
          es: {
            title: "Vacunación gratuita por el SUS",
            summary:
              "Calendario gratuito, con o sin documentos, y qué llevar para que la UBS actualice tus vacunas.",
            body: `**Todas las vacunas del calendario nacional son gratuitas por el SUS** — para brasileños y migrantes, con o sin documentos. Niños, adultos y adultos mayores tienen calendarios propios.

## Dónde vacunarse

- **Tu UBS** (centro de salud del barrio) — opción principal.
- **Campañas itinerantes** (en escuelas, shoppings, terminales) en fechas específicas.
- **Hospitales y UPAs** vacunan en situaciones de riesgo (exposición a sangre, mordedura de animal).

## Qué llevar

- **Documento de identificación** (cualquiera).
- **Carnet de vacunación anterior** de tu país, si tenés — para que la UBS actualice y evite repetir dosis.
- **Tarjeta SUS** ayuda, pero no es obligatoria.

> **¿Trajiste vacunas de tu país?** Llevá el carnet original (incluso en otro idioma). La UBS transcribe al estándar brasileño e indica lo que está faltando.

## Calendario básico del adulto migrante

Vacunas que probablemente te van a ofrecer si todavía no te las diste:

- **Triple viral** (sarampión, paperas, rubéola).
- **Hepatitis B** (3 dosis).
- **dT** (difteria y tétano, refuerzo cada 10 años).
- **Fiebre amarilla** (especialmente importante en Brasil).
- **COVID-19** e **influenza** (anuales).

Los niños tienen un calendario mucho más extenso — preguntá en la UBS sobre el esquema completo.

## Vacunas para viajes internacionales

¿Volvés de visita a tu país de origen? Algunas regiones piden **comprobante de fiebre amarilla** para entrar o salir. Vacunate en la UBS (gratis) y después emití el **Certificado Internacional de Vacunación (CIVP) gratis por la Anvisa**, por [gov.br](https://www.gov.br) o en un puesto de la Anvisa en el aeropuerto.`,
          },
        },
      },
    ],
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
        body: `**Pra trabalhar formalmente no Brasil você precisa de CPF e CRNM** (ou outro documento que comprove sua situação migratória regular). Sem isso, só dá pra fazer trabalho informal.

Floripa tem um mercado de trabalho mais quente que a média do país, principalmente em **turismo e hotelaria** (alta temporada dezembro–março), **gastronomia, construção civil** e **tecnologia** (várias startups locais).

> **Os tópicos abaixo te ajudam a se orientar:** o que é CLT e quais são seus direitos, onde achar vagas, alternativas à CLT (MEI, autônomo, apps) e como se proteger de golpes — comuns com quem está começando.`,
      },
      es: {
        title: "Trabajo e ingresos",
        summary:
          "Cómo buscar empleo, derechos básicos y dónde registrarse para vacantes.",
        body: `**Para trabajar formalmente en Brasil necesitás CPF y CRNM** (u otro documento que pruebe tu situación migratoria regular). Sin eso, solo podés hacer trabajo informal.

Floripa tiene un mercado de trabajo más caliente que la media del país, sobre todo en **turismo y hotelería** (alta temporada diciembre–marzo), **gastronomía, construcción** y **tecnología** (varias startups locales).

> **Los temas debajo te ayudan a orientarte:** qué es la CLT y cuáles son tus derechos, dónde encontrar vacantes, alternativas a la CLT (MEI, autónomo, apps) y cómo protegerte de estafas — comunes con quien está empezando.`,
      },
    },
    topics: [
      {
        slug: "clt-direitos",
        order: 1,
        contactIds: [],
        translations: {
          pt: {
            title: "CLT: como funciona e seus direitos",
            summary:
              "Trabalho de carteira assinada — o que o empregador é obrigado a te dar.",
            body: `**CLT é o regime de trabalho formal no Brasil — o famoso "carteira assinada".** Te dá um conjunto de direitos que vão muito além do salário.

Pra ser contratado em CLT você precisa de **CPF** e **CRNM** (ou outro documento de regularização migratória). Sem isso, só trabalho informal.

## Seus direitos básicos

| Direito | Como funciona |
| --- | --- |
| **Salário mínimo** | R$ 1.518 em 2025 — ou o piso da sua categoria, o que for maior |
| **13º salário** | Um salário extra por ano, pago em duas parcelas (nov e dez) |
| **Férias** | 30 dias corridos por ano + adicional de 1/3 do salário |
| **FGTS** | 8% do seu salário depositado mensalmente numa conta no seu nome |
| **Aviso prévio** | Em demissão sem justa causa, 30+ dias avisados ou pagos |
| **Seguro-desemprego** | 3–5 parcelas após demissão sem justa causa (depende do tempo trabalhado) |
| **Hora extra** | Mínimo 50% acima do valor normal |

## Como conferir se você está sendo registrado

1. Baixe o app **Carteira de Trabalho Digital** (veja o módulo de documentos).
2. Veja se a sua contratação aparece lá.
3. Confira mensalmente se os depósitos do FGTS estão sendo feitos.

> **Empresa que não registra você ou paga "por fora" está te tirando direitos.** Mesmo se for combinado entre vocês, você não tem como provar contratação se der problema.

## Em caso de problema

- **Sindicato da categoria** orienta gratuitamente.
- **Ministério Público do Trabalho (MPT)** recebe denúncia, gratuito.
- **Justiça do Trabalho** julga ações trabalhistas. Você pode entrar com ação sem advogado se o valor for baixo.

> **Atrasou salário, não pagou férias, demitiu sem aviso?** Procure o sindicato ou a Defensoria Pública. Você tem 2 anos pra entrar com ação após sair do emprego.`,
          },
          es: {
            title: "CLT: cómo funciona y tus derechos",
            summary:
              "Trabajo en blanco (carteira assinada) — lo que el empleador está obligado a darte.",
            body: `**CLT es el régimen de trabajo formal en Brasil — el famoso "carteira assinada".** Te da un conjunto de derechos que va mucho más allá del salario.

Para ser contratado en CLT necesitás **CPF** y **CRNM** (u otro documento de regularización migratoria). Sin eso, solo trabajo informal.

## Tus derechos básicos

| Derecho | Cómo funciona |
| --- | --- |
| **Salario mínimo** | R$ 1.518 en 2025 — o el piso de tu categoría, el que sea mayor |
| **13° sueldo (aguinaldo)** | Un sueldo extra por año, pagado en dos cuotas (nov y dic) |
| **Vacaciones** | 30 días corridos por año + adicional de 1/3 del sueldo |
| **FGTS** | 8% de tu sueldo depositado mensualmente en una cuenta a tu nombre |
| **Aviso previo** | En despido sin causa, 30+ días avisados o pagados |
| **Seguro de desempleo** | 3–5 cuotas después de despido sin causa (depende del tiempo trabajado) |
| **Hora extra** | Mínimo 50% por encima del valor normal |

## Cómo confirmar que te están registrando

1. Descargá la app **Carteira de Trabalho Digital** (mirá el módulo de documentos).
2. Mirá si tu contratación aparece ahí.
3. Confirmá mensualmente si los depósitos del FGTS están siendo hechos.

> **Una empresa que no te registra o paga "por fuera" te está sacando derechos.** Incluso si fue acordado entre ustedes, no tenés cómo probar la contratación si surge un problema.

## En caso de problema

- **Sindicato de la categoría** orienta gratuitamente.
- **Ministério Público do Trabalho (MPT)** recibe denuncias, gratis.
- **Justicia del Trabajo** juzga acciones laborales. Podés iniciar acción sin abogado si el valor es bajo.

> **¿Atraso de salario, no pagó vacaciones, despidió sin aviso?** Buscá el sindicato o la Defensoría Pública. Tenés 2 años para iniciar acción después de salir del empleo.`,
          },
        },
      },
      {
        slug: "onde-procurar-vagas",
        order: 2,
        contactIds: ["sine-floripa"],
        translations: {
          pt: {
            title: "Onde procurar vagas em Floripa",
            summary:
              "SINE, plataformas online, grupos de WhatsApp e setores em alta na cidade.",
            body: `**Floripa tem várias frentes de busca por trabalho. Use mais de uma em paralelo** — quem espera vaga numa fonte só perde tempo.

## Canais oficiais

- **SINE** (Sistema Nacional de Emprego): cadastro gratuito pra vagas formais. Tem posto físico no centro (Terminal Rita Maria, 2º andar — Av. Paulo Fontes, 1101) e pelo site [gov.br/sine](https://www.gov.br/empregabrasil/pt-br).
- **App Sine Fácil**: vagas, encaminhamento e habilitação do seguro-desemprego no celular.

## Plataformas online

| Plataforma | Foco |
| --- | --- |
| **LinkedIn** | Vagas qualificadas, tecnologia, escritório |
| **Catho** | Generalista, muitas vagas |
| **Vagas.com** | Generalista |
| **Gupy** | Processos seletivos de empresas grandes |
| **Indeed** | Agregador, vagas diversas |
| **Trampos.co** | Vagas em comunicação e criativo |

## Grupos de WhatsApp e Facebook

Em Floripa, **muita vaga roda por WhatsApp e grupos de Facebook**, especialmente pra:

- Hotelaria e gastronomia (garçom, recepcionista, cozinheiro).
- Construção civil.
- Limpeza, cuidador, motorista.

Busque por "Vagas Floripa", "Empregos Florianópolis", "Vagas Hotelaria SC". Tem grupos por bairro também.

## Setores em alta em Floripa

| Setor | Quando contrata mais |
| --- | --- |
| **Turismo, hotelaria, gastronomia** | Alta temporada (dez–mar). Picos antes da virada do ano. |
| **Tecnologia** | Ano todo. Várias startups (saas, fintech) em Floripa. |
| **Construção civil** | Estável. Sempre tem demanda em obras. |
| **Limpeza e serviços gerais** | Ano todo. Procura via empresas terceirizadas. |

> **Dica pra alta temporada:** muitos hotéis e restaurantes começam a contratar **em outubro/novembro**. Não espere dezembro — quando a temporada começa, as vagas já estão preenchidas.`,
          },
          es: {
            title: "Dónde buscar vacantes en Floripa",
            summary:
              "SINE, plataformas online, grupos de WhatsApp y sectores en alta en la ciudad.",
            body: `**Floripa tiene varios frentes de búsqueda laboral. Usá más de uno en paralelo** — quien espera una vacante de una sola fuente pierde tiempo.

## Canales oficiales

- **SINE** (Sistema Nacional de Empleo): registro gratuito para vacantes formales. Tiene puesto físico en el centro (Terminal Rita Maria, 2º piso — Av. Paulo Fontes, 1101) y por el sitio [gov.br/sine](https://www.gov.br/empregabrasil/pt-br).
- **App Sine Fácil**: vacantes, derivación y solicitud del seguro de desempleo desde el celular.

## Plataformas online

| Plataforma | Foco |
| --- | --- |
| **LinkedIn** | Vacantes calificadas, tecnología, oficina |
| **Catho** | Generalista, muchas vacantes |
| **Vagas.com** | Generalista |
| **Gupy** | Procesos selectivos de empresas grandes |
| **Indeed** | Agregador, vacantes variadas |
| **Trampos.co** | Vacantes en comunicación y creativo |

## Grupos de WhatsApp y Facebook

En Floripa, **muchas vacantes circulan por WhatsApp y grupos de Facebook**, sobre todo para:

- Hotelería y gastronomía (mesero, recepcionista, cocinero).
- Construcción.
- Limpieza, cuidador, chofer.

Buscá "Vagas Floripa", "Empregos Florianópolis", "Vagas Hotelaria SC". Hay grupos por barrio también.

## Sectores en alta en Floripa

| Sector | Cuándo contrata más |
| --- | --- |
| **Turismo, hotelería, gastronomía** | Alta temporada (dic–mar). Picos antes de fin de año. |
| **Tecnología** | Todo el año. Varias startups (saas, fintech) en Floripa. |
| **Construcción** | Estable. Siempre hay demanda en obras. |
| **Limpieza y servicios generales** | Todo el año. Búsqueda por empresas tercerizadas. |

> **Tip para alta temporada:** muchos hoteles y restaurantes empiezan a contratar **en octubre/noviembre**. No esperes a diciembre — cuando la temporada empieza, las vacantes ya están cubiertas.`,
          },
        },
      },
      {
        slug: "alternativas-clt",
        order: 3,
        contactIds: [],
        translations: {
          pt: {
            title: "Alternativas à CLT: MEI, autônomo e apps",
            summary:
              "Quando registrar como MEI vale a pena, e o que considerar em trabalho por plataforma.",
            body: `**Nem todo trabalho é CLT.** Boa parte de quem chega começa em modalidades mais flexíveis — MEI, autônomo, plataformas. Cada uma tem suas regras.

## MEI (Microempreendedor Individual)

Pra quem trabalha por conta própria com faturamento até **R$ 81 mil/ano** (em 2025).

**Pra que serve:**
- Emitir nota fiscal.
- Ter CNPJ próprio.
- Pagar INSS reduzido (~R$ 70/mês).
- Acessar aposentadoria e auxílio-doença.

**Como abrir:**
1. Você precisa de **CPF e CRNM** (estrangeiros precisam de residência regular).
2. Faça pelo site [gov.br/mei](https://www.gov.br/empresas-e-negocios/pt-br/empreendedor) ou no SEBRAE.
3. É **gratuito** abrir. Mensalmente paga só o DAS-MEI.

> **Cuidado:** alguns setores **não** podem ser MEI (advocacia, medicina, alguns serviços técnicos). Confira a lista antes.

## Autônomo (sem MEI)

Se você presta serviço esporádico e não atinge o faturamento de MEI, dá pra trabalhar como autônomo simples — sem CNPJ.

- Você emite **RPA (Recibo de Pagamento Autônomo)** ao receber.
- Paga INSS por carnê, se quiser cobertura previdenciária.
- Imposto de renda anual, se passar do limite.

## Apps (Uber, iFood, 99, etc.)

Trabalho por plataforma é legal no Brasil — mas **você não é empregado** da plataforma. É autônomo, sem direitos CLT.

**Vantagens:**
- Começa rápido. Geralmente exige CNH (Uber) ou bicicleta/moto/carro (iFood, 99).
- Flexibilidade de horários.

**Pontos de atenção:**
- **Sem férias, 13º, FGTS ou seguro-desemprego.**
- **Seguro próprio**: se você se machucar trabalhando, a plataforma raramente cobre.
- **Custos por sua conta**: gasolina, manutenção, seguro do veículo.
- **Renda variável** — em meses fracos pode ficar bem abaixo do mínimo.

> **Plataformas pagam por entrega/corrida, não por hora.** Faça as contas — se descontar gasolina, manutenção e tempo "parado", o ganho real costuma ser bem menor que o bruto.`,
          },
          es: {
            title: "Alternativas a la CLT: MEI, autónomo y apps",
            summary:
              "Cuándo conviene registrarse como MEI y qué considerar en trabajo por plataforma.",
            body: `**No todo trabajo es CLT.** Buena parte de quien llega arranca con modalidades más flexibles — MEI, autónomo, plataformas. Cada una tiene sus reglas.

## MEI (Microemprendedor Individual)

Para quien trabaja por cuenta propia con facturación hasta **R$ 81 mil/año** (en 2025).

**Para qué sirve:**
- Emitir factura.
- Tener CNPJ propio.
- Pagar INSS reducido (~R$ 70/mes).
- Acceder a jubilación y subsidio por enfermedad.

**Cómo abrirlo:**
1. Necesitás **CPF y CRNM** (los extranjeros necesitan residencia regular).
2. Hacelo por el sitio [gov.br/mei](https://www.gov.br/empresas-e-negocios/pt-br/empreendedor) o en el SEBRAE.
3. Es **gratuito** abrirlo. Mensualmente solo pagás el DAS-MEI.

> **Cuidado:** algunos sectores **no** pueden ser MEI (abogacía, medicina, algunos servicios técnicos). Revisá la lista antes.

## Autónomo (sin MEI)

Si prestás servicio esporádico y no llegás a la facturación de MEI, podés trabajar como autónomo simple — sin CNPJ.

- Emitís **RPA (Recibo de Pago Autónomo)** al cobrar.
- Pagás INSS por libreta, si querés cobertura previsional.
- Impuesto a las ganancias anual, si superás el límite.

## Apps (Uber, iFood, 99, etc.)

El trabajo por plataforma es legal en Brasil — pero **no sos empleado** de la plataforma. Sos autónomo, sin derechos CLT.

**Ventajas:**
- Empezás rápido. En general exige licencia (Uber) o bici/moto/auto (iFood, 99).
- Flexibilidad de horarios.

**Puntos de atención:**
- **Sin vacaciones, aguinaldo, FGTS ni seguro de desempleo.**
- **Seguro propio**: si te lastimás trabajando, la plataforma raramente cubre.
- **Costos por tu cuenta**: nafta, mantenimiento, seguro del vehículo.
- **Ingreso variable** — en meses flojos puede quedar bastante por debajo del mínimo.

> **Las plataformas pagan por entrega/viaje, no por hora.** Hacé las cuentas — si descontás nafta, mantenimiento y tiempo "parado", la ganancia real suele ser bastante menor que la bruta.`,
          },
        },
      },
      {
        slug: "cuidado-com-golpes",
        order: 4,
        contactIds: [],
        translations: {
          pt: {
            title: "Cuidado com golpes em vagas de emprego",
            summary:
              "Sinais de alerta e como verificar se uma oferta é real antes de dar dados ou pagar qualquer coisa.",
            body: `**Migrante recém-chegado é alvo preferido de golpistas.** Quando estiver procurando trabalho, desconfie sempre — e nunca pague nada antes de ser contratado de verdade.

## Sinais clássicos de golpe

> **Se você vê qualquer um dos sinais abaixo, é golpe quase com certeza.**

- **Pedem dinheiro adiantado** ("taxa de cadastro", "uniforme", "exame admissional", "kit de boas-vindas").
- **Salário muito acima do mercado** sem requisitos altos ("ganhe R$ 8 mil/mês trabalhando de casa, sem experiência").
- **Pedem dados bancários ou foto de documento** antes da entrevista.
- **Vaga "100% remota" em empresa que você nunca ouviu falar**, com contato só por WhatsApp.
- **Empresa não tem site, LinkedIn ou endereço físico verificável.**
- **"Trabalho de digitação", "encartelagem", "pirâmide com escalada de bônus"** — golpes clássicos.

## Como conferir se uma vaga é real

1. **Procure a empresa no Google** — tem site, redes sociais, endereço?
2. **Veja se tem reclamações** no Reclame Aqui ou no Glassdoor.
3. **Liga pra empresa direto** (telefone que você achou no Google, não o que o "recrutador" te passou).
4. **Veja se o recrutador tem perfil real no LinkedIn**, com histórico coerente.
5. **Desconfie de e-mail genérico** (@gmail.com, @hotmail.com) em vez do domínio da empresa.

## Pegadinhas comuns com migrantes

- **"Te ajudo a regularizar seu visto se você trabalhar pra mim"**: ilegal. Visto é via PF, não via empregador particular.
- **"Você pode começar sem documento e a gente regulariza depois"**: você fica sem direito a NADA se der problema.
- **"Pague uma taxa de adiantamento e eu te garanto a vaga"**: nunca aconteceu.

## Onde denunciar

- **Procon SC** — denúncias de consumidor (golpes de "empresas").
- **Polícia Civil** — estelionato, registre boletim de ocorrência online.
- **Disque 100** — abuso a migrantes, exploração no trabalho.
- **Ministério Público do Trabalho (MPT)** — trabalho análogo à escravidão, exploração.

> **Trabalho análogo à escravidão existe.** Se te ofereceram "alojamento", documentaram seus papéis e estão te impedindo de sair: **ligue 100 ou peça ajuda à Cáritas imediatamente**.`,
          },
          es: {
            title: "Cuidado con estafas en vacantes de empleo",
            summary:
              "Señales de alerta y cómo verificar si una oferta es real antes de dar datos o pagar nada.",
            body: `**El migrante recién llegado es blanco preferido de estafadores.** Cuando estés buscando trabajo, desconfiá siempre — y nunca pagues nada antes de ser contratado de verdad.

## Señales clásicas de estafa

> **Si ves cualquiera de las señales abajo, es estafa casi seguro.**

- **Piden dinero por adelantado** ("tasa de registro", "uniforme", "examen pre-ocupacional", "kit de bienvenida").
- **Sueldo muy por encima del mercado** sin requisitos altos ("ganá R$ 8 mil/mes trabajando desde casa, sin experiencia").
- **Piden datos bancarios o foto de documento** antes de la entrevista.
- **Vacante "100% remota" en una empresa de la que nunca escuchaste**, con contacto solo por WhatsApp.
- **La empresa no tiene sitio, LinkedIn ni dirección física verificable.**
- **"Trabajo de tipeo", "armado de sobres", "pirámide con escala de bonos"** — estafas clásicas.

## Cómo confirmar si una vacante es real

1. **Buscá la empresa en Google** — ¿tiene sitio, redes sociales, dirección?
2. **Mirá si tiene quejas** en Reclame Aqui o Glassdoor.
3. **Llamá a la empresa directo** (teléfono que encontraste en Google, no el que el "reclutador" te pasó).
4. **Mirá si el reclutador tiene perfil real en LinkedIn**, con historial coherente.
5. **Desconfiá de correo genérico** (@gmail.com, @hotmail.com) en lugar del dominio de la empresa.

## Estafas comunes con migrantes

- **"Te ayudo a regularizar tu visa si trabajás para mí"**: ilegal. La visa es vía PF, no vía empleador particular.
- **"Podés empezar sin documento y después regularizamos"**: quedás sin derecho a NADA si surge un problema.
- **"Pagá una tasa de adelanto y te garantizo la vacante"**: nunca pasó.

## Dónde denunciar

- **Procon SC** — denuncias de consumidor (estafas de "empresas").
- **Policía Civil** — estafa, hacé denuncia online.
- **Disque 100** — abuso a migrantes, explotación laboral.
- **Ministério Público do Trabalho (MPT)** — trabajo análogo a esclavitud, explotación.

> **El trabajo análogo a esclavitud existe.** Si te ofrecieron "alojamiento", retuvieron tus papeles y te están impidiendo salir: **llamá al 100 o pedí ayuda a Cáritas inmediatamente**.`,
          },
        },
      },
    ],
  },
  {
    slug: "assistencia-social",
    order: 5,
    icon: "HandHeart",
    color: "violet",
    contactIds: ["cras-floripa", "caritas-sc", "circulos-hospitalidade"],
    translations: {
      pt: {
        title: "Assistência Social",
        summary:
          "Círculos de Hospitalidade e serviços de apoio para famílias em situação de vulnerabilidade.",
        body: `**O Brasil tem uma rede pública e privada de assistência social que atende migrantes gratuitamente.** Você não precisa estar em situação extrema pra procurar. É um direito.

> A ONG **Círculos de Hospitalidade** também oferece serviços gratuitos de acolhimento e orientação a migrantes. Confira [aqui](/pt/modulo/assistencia-social/circulos-de-hospitalidade) como ela pode te ajudar.

Há quatro portas principais:

- **Círculos de Hospitalidade** para acolhimento, orientação e apoio a migrantes e famílias.
- **CRAS** pra cadastro, benefícios e orientação geral.
- **CREAS** pra situações específicas (violência, exploração, situação de rua).
- **ONGs especializadas** em migrantes e refugiados (Cáritas, Pastoral do Migrante, parceiros do ACNUR).

> **Não tenha vergonha de pedir ajuda.** Esses serviços existem exatamente pra isso e são pagos com seu imposto também.`,
      },
      es: {
        title: "Asistencia Social",
        summary:
          "Círculos de Hospitalidade y servicios de apoyo para familias en situación de vulnerabilidad.",
        body: `**Brasil tiene una red pública y privada de asistencia social que atiende migrantes gratuitamente.** No tenés que estar en situación extrema para buscarla. Es un derecho.

> La ONG **Círculos de Hospitalidade** también ofrece servicios gratuitos de acogida y orientación a migrantes. Mirá [aquí](/es/modulo/assistencia-social/circulos-de-hospitalidade) cómo puede ayudarte.

Hay cuatro puertas principales:

- **Círculos de Hospitalidade** para acogida, orientación y apoyo a migrantes y familias.
- **CRAS** para registro, beneficios y orientación general.
- **CREAS** para situaciones específicas (violencia, explotación, situación de calle).
- **ONGs especializadas** en migrantes y refugiados (Cáritas, Pastoral del Migrante, socios del ACNUR).

> **No tengas vergüenza de pedir ayuda.** Estos servicios existen exactamente para eso y se pagan también con tu impuesto.`,
      },
    },
    topics: [
      {
        slug: "cras-cadunico",
        order: 2,
        contactIds: ["cras-floripa"],
        translations: {
          pt: {
            title: "CRAS e Cadastro Único",
            summary:
              "Porta de entrada da assistência social. Destrava Bolsa Família, tarifa social e mais.",
            body: `**O CRAS (Centro de Referência de Assistência Social) é o lugar pra qualquer assunto social do governo.** Em Florianópolis existem várias unidades — uma em cada região da cidade.

A primeira coisa que o CRAS faz com você é o **Cadastro Único (CadÚnico)**, que destrava praticamente todos os benefícios sociais.

## O que o CadÚnico destrava

| Benefício | Pra quem |
| --- | --- |
| **Bolsa Família** | Famílias com renda muito baixa, com crianças |
| **Auxílio Gás** | Bimestral, ajuda no botijão |
| **Tarifa social de luz** | Desconto de até 65% na conta |
| **Tarifa social de água** | Desconto na conta da CASAN |
| **Tarifa social do ônibus (Passe Rápido Social)** | Tarifa reduzida ou gratuita |
| **Minha Casa Minha Vida** | Habitação subsidiada |
| **BPC (Benefício de Prestação Continuada)** | Pra idosos e pessoas com deficiência sem renda |

## Como se cadastrar no CadÚnico

1. Encontre o **CRAS** mais próximo da sua casa.
2. Ligue antes ou vá pessoalmente pra agendar a entrevista.
3. **Leve documentos de todos os membros da família** (veja abaixo).
4. A entrevista dura cerca de **1 hora**. A entrevistadora pergunta sobre renda, escolaridade, situação de moradia.
5. O cadastro fica ativo em **poucos dias** (geralmente 1 semana).

## O que levar

- **CPF** de cada membro da família.
- **Documento de identidade** (passaporte, CRNM, certidão de nascimento das crianças).
- **Comprovante de residência** atualizado.
- **Comprovante de renda** de quem trabalha (mesmo que informal — uma declaração escrita serve).

## Outros serviços do CRAS

Além do CadÚnico, o CRAS oferece:

- **Orientação jurídica e social** gratuita.
- **Encaminhamento** pra outras políticas (saúde, educação, habitação).
- **Atendimento psicossocial** em alguns casos.
- **Grupos de convivência** pra idosos, crianças, adolescentes.

> **Atualize seu cadastro pelo menos uma vez por ano.** Se seu CadÚnico desatualiza, você perde temporariamente todos os benefícios vinculados.`,
          },
          es: {
            title: "CRAS y Cadastro Único",
            summary:
              "Puerta de entrada de la asistencia social. Destraba Bolsa Família, tarifa social y más.",
            body: `**El CRAS (Centro de Referencia de Asistencia Social) es el lugar para cualquier asunto social del gobierno.** En Florianópolis existen varias unidades — una en cada región de la ciudad.

Lo primero que el CRAS hace con vos es el **Cadastro Único (CadÚnico)**, que destraba prácticamente todos los beneficios sociales.

## Qué destraba el CadÚnico

| Beneficio | Para quién |
| --- | --- |
| **Bolsa Família** | Familias con ingresos muy bajos, con niños |
| **Auxilio Gas** | Bimestral, ayuda con la garrafa |
| **Tarifa social de luz** | Descuento de hasta 65% en la cuenta |
| **Tarifa social de agua** | Descuento en la cuenta de CASAN |
| **Tarifa social del colectivo (Passe Rápido Social)** | Tarifa reducida o gratuita |
| **Minha Casa Minha Vida** | Vivienda subsidiada |
| **BPC (Beneficio de Prestación Continuada)** | Para adultos mayores y personas con discapacidad sin ingresos |

## Cómo registrarse en el CadÚnico

1. Encontrá el **CRAS** más cercano a tu casa.
2. Llamá antes o andá personalmente para agendar la entrevista.
3. **Llevá documentos de todos los miembros de la familia** (mirá abajo).
4. La entrevista dura alrededor de **1 hora**. La entrevistadora pregunta sobre ingresos, escolaridad, situación de vivienda.
5. El registro queda activo en **pocos días** (generalmente 1 semana).

## Qué llevar

- **CPF** de cada miembro de la familia.
- **Documento de identidad** (pasaporte, CRNM, partida de nacimiento de los niños).
- **Comprobante de domicilio** actualizado.
- **Comprobante de ingresos** de quien trabaja (incluso informal — una declaración escrita sirve).

## Otros servicios del CRAS

Además del CadÚnico, el CRAS ofrece:

- **Orientación jurídica y social** gratuita.
- **Derivación** a otras políticas (salud, educación, vivienda).
- **Atención psicosocial** en algunos casos.
- **Grupos de convivencia** para adultos mayores, niños, adolescentes.

> **Actualizá tu registro por lo menos una vez al año.** Si tu CadÚnico se desactualiza, perdés temporariamente todos los beneficios vinculados.`,
          },
        },
      },
      {
        slug: "creas",
        order: 3,
        contactIds: [],
        translations: {
          pt: {
            title: "CREAS — quando procurar",
            summary:
              "Casos de violência, situação de rua, exploração, abandono. Atendimento especializado.",
            body: `**O CREAS (Centro de Referência Especializado de Assistência Social) atende situações graves de violação de direitos.** Diferente do CRAS, que é a porta de entrada geral, o CREAS é especializado em casos mais delicados.

## Quando o CREAS atende

- **Violência doméstica** (contra mulher, criança, idoso, pessoa com deficiência).
- **Exploração sexual** ou trabalho infantil.
- **Pessoas em situação de rua** (adultos ou famílias).
- **Abandono de idosos ou pessoas com deficiência.**
- **Conflitos familiares graves** com risco de violência.
- **Tráfico humano** ou trabalho análogo à escravidão.

> **Se você está numa dessas situações ou conhece alguém que está, procure o CREAS direto.** Não precisa passar pelo CRAS antes. O atendimento é confidencial.

## Como o atendimento funciona

1. **Você vai ao CREAS** (ou alguém te leva, ou é encaminhado pela polícia/saúde/escola).
2. Faz **escuta especializada** com psicólogo ou assistente social.
3. A equipe define um **plano de atendimento individual**: pode incluir abrigo, orientação jurídica, encaminhamento médico.
4. Há **acompanhamento periódico** até a situação se estabilizar.

## Pra pessoas em situação de rua

Em Florianópolis funciona o **Centro POP** (vinculado ao CREAS), com:

- **Refeições** gratuitas.
- **Higiene** (banho, lavagem de roupa).
- **Endereço de referência** pra você receber correspondência.
- **Acompanhamento** pra documentos e benefícios.

## Pra mulheres em situação de violência

- **Ligue 180** (Central de Atendimento à Mulher) — gratuito, 24h.
- Vá à **DEAM** (Delegacia Especializada de Atendimento à Mulher).
- O CREAS articula com **abrigos de proteção** pra mulheres e crianças em risco.

> **Você tem direito a intérprete.** Se não fala português, peça — em violência doméstica, comunicação é crítica.`,
          },
          es: {
            title: "CREAS — cuándo recurrir",
            summary:
              "Casos de violencia, situación de calle, explotación, abandono. Atención especializada.",
            body: `**El CREAS (Centro de Referencia Especializado de Asistencia Social) atiende situaciones graves de violación de derechos.** A diferencia del CRAS, que es la puerta de entrada general, el CREAS está especializado en casos más delicados.

## Cuándo el CREAS atiende

- **Violencia doméstica** (contra mujer, niño, adulto mayor, persona con discapacidad).
- **Explotación sexual** o trabajo infantil.
- **Personas en situación de calle** (adultos o familias).
- **Abandono de adultos mayores o personas con discapacidad.**
- **Conflictos familiares graves** con riesgo de violencia.
- **Trata de personas** o trabajo análogo a esclavitud.

> **Si estás en una de esas situaciones o conocés a alguien que esté, andá al CREAS directo.** No necesitás pasar por el CRAS antes. La atención es confidencial.

## Cómo funciona la atención

1. **Vas al CREAS** (o alguien te lleva, o sos derivado por la policía/salud/escuela).
2. Hacés **escucha especializada** con psicólogo o asistente social.
3. El equipo define un **plan de atención individual**: puede incluir refugio, orientación jurídica, derivación médica.
4. Hay **seguimiento periódico** hasta que la situación se estabilice.

## Para personas en situación de calle

En Florianópolis funciona el **Centro POP** (vinculado al CREAS), con:

- **Comidas** gratuitas.
- **Higiene** (baño, lavado de ropa).
- **Dirección de referencia** para que recibas correspondencia.
- **Seguimiento** para documentos y beneficios.

## Para mujeres en situación de violencia

- **Llamá al 180** (Central de Atención a la Mujer) — gratuito, 24h.
- Andá a la **DEAM** (Delegación Especializada de Atención a la Mujer).
- El CREAS articula con **refugios de protección** para mujeres y niños en riesgo.

> **Tenés derecho a intérprete.** Si no hablás portugués, pedilo — en violencia doméstica, la comunicación es crítica.`,
          },
        },
      },
      {
        slug: "ongs-migrantes",
        order: 4,
        contactIds: ["caritas-sc"],
        translations: {
          pt: {
            title: "ONGs e entidades de apoio a migrantes",
            summary:
              "Cáritas, Pastoral do Migrante e parceiros do ACNUR. Apoio especializado em migração e refúgio.",
            body: `**Além do sistema público, há entidades especializadas no apoio a migrantes e refugiados em Florianópolis.** Costumam ser mais rápidas e específicas que o CRAS pra questões de migração.

## Cáritas Brasileira (SC)

Faz parte de uma rede internacional ligada à Igreja Católica, mas **atende qualquer pessoa**, independente de religião.

**Serviços:**
- **Orientação jurídica** sobre vistos, regularização, refúgio.
- **Apoio em processos** com a PF, CONARE, Defensoria.
- **Encaminhamento social** (saúde, escola, abrigo).
- **Cursos** de português e capacitação profissional.
- **Ajuda emergencial** (alimentação, roupa, kit de higiene) em casos críticos.

Atendimento a migrantes na Casa de Direitos — R. Antônio Mariano de Souza, 1135, São José (Seg-Sex 13:30-18:00).

## Pastoral do Migrante

Vinculada à Igreja Católica, foca em **acolhimento humano** e **apoio espiritual**, mas atende pessoas de qualquer crença.

- **Grupos de convivência** entre migrantes.
- **Apoio em situações de luto, depressão, isolamento.**
- **Articulação com a Cáritas** pra demandas jurídicas/sociais.

## ACNUR e parceiros locais

O **ACNUR** (Agência da ONU pra Refugiados) atua no Brasil por meio de **parceiros locais**. Em Floripa, o principal é a **Cáritas**, mas há também a **Defensoria Pública da União (DPU)** pra orientação jurídica gratuita.

Se você é **solicitante de refúgio** (esperando decisão do CONARE) ou **refugiado reconhecido**, tem direito a:

- **Atendimento gratuito** em saúde, educação, assistência social.
- **Documentação** (protocolo provisório, depois CRNM).
- **Apoio do ACNUR via parceiros** pra integração local.

## Quando procurar essas ONGs

- Você tem dúvida sobre **regularização migratória** que o CRAS não resolve.
- Precisa de **acompanhamento contínuo** (não só uma orientação pontual).
- Quer participar de **comunidade de migrantes** pra trocar experiência.
- Está em situação **muito vulnerável** e o sistema público está demorando.

> **As ONGs e o sistema público trabalham juntos.** Não é "ou um ou outro" — você pode (e deve) usar os dois em paralelo.`,
          },
          es: {
            title: "ONGs y entidades de apoyo a migrantes",
            summary:
              "Cáritas, Pastoral del Migrante y socios del ACNUR. Apoyo especializado en migración y refugio.",
            body: `**Además del sistema público, hay entidades especializadas en el apoyo a migrantes y refugiados en Florianópolis.** Suelen ser más rápidas y específicas que el CRAS para cuestiones de migración.

## Cáritas Brasileña (SC)

Forma parte de una red internacional vinculada a la Iglesia Católica, pero **atiende a cualquier persona**, sin importar la religión.

**Servicios:**
- **Orientación jurídica** sobre visas, regularización, refugio.
- **Apoyo en trámites** con la PF, CONARE, Defensoría.
- **Derivación social** (salud, escuela, refugio).
- **Cursos** de portugués y capacitación profesional.
- **Ayuda de emergencia** (alimentos, ropa, kit de higiene) en casos críticos.

Atención a migrantes en la Casa de Direitos — R. Antônio Mariano de Souza, 1135, São José (Lun-Vie 13:30-18:00).

## Pastoral del Migrante

Vinculada a la Iglesia Católica, se enfoca en **acogida humana** y **apoyo espiritual**, pero atiende a personas de cualquier creencia.

- **Grupos de convivencia** entre migrantes.
- **Apoyo en situaciones de duelo, depresión, aislamiento.**
- **Articulación con la Cáritas** para demandas jurídicas/sociales.

## ACNUR y socios locales

El **ACNUR** (Agencia de la ONU para Refugiados) actúa en Brasil por medio de **socios locales**. En Floripa, el principal es la **Cáritas**, pero también está la **Defensoría Pública de la Unión (DPU)** para orientación jurídica gratuita.

Si sos **solicitante de refugio** (esperando decisión del CONARE) o **refugiado reconocido**, tenés derecho a:

- **Atención gratuita** en salud, educación, asistencia social.
- **Documentación** (protocolo provisorio, después CRNM).
- **Apoyo del ACNUR vía socios** para integración local.

## Cuándo recurrir a estas ONGs

- Tenés dudas sobre **regularización migratoria** que el CRAS no resuelve.
- Necesitás **seguimiento continuo** (no solo una orientación puntual).
- Querés participar de **comunidad de migrantes** para intercambiar experiencias.
- Estás en situación **muy vulnerable** y el sistema público está demorando.

> **Las ONGs y el sistema público trabajan juntos.** No es "o uno o el otro" — podés (y debés) usar los dos en paralelo.`,
          },
        },
      },
      {
        slug: "circulos-de-hospitalidade",
        order: 1,
        contactIds: ["circulos-hospitalidade"],
        translations: {
          pt: {
            title: "Círculos de Hospitalidade",
            summary:
              "Rede de apoio e acolhimento para migrantes e famílias. Parceira deste portal.",
            body: `**Os Círculos de Hospitalidade são uma rede de apoio e acolhimento** para migrantes e famílias que chegam ou vivem em Florianópolis. O projeto é parceiro deste portal e oferece orientação prática sobre integração na cidade.

## O que é?

Os Círculos de Hospitalidade conectam pessoas, comunidades e instituições para **acolher quem chega de fora** — com informação, encaminhamento e apoio humano. A iniciativa trabalha com **hospitalidade** no sentido mais amplo: receber, orientar e integrar migrantes na vida local.

## Como acessar?

1. Acesse o [site oficial dos Círculos de Hospitalidade](https://circulosdehospitalidade.org/).
2. Confira os **programas, materiais e orientações** disponíveis para migrantes.
3. Se precisar de atendimento direto, use a página de contato abaixo.

## Entre em contato

Para falar com a equipe, acesse a [página de contato dos Círculos de Hospitalidade](https://circulosdehospitalidade.org/contato/).

> **Quer mais detalhes?** Veja as informações completas no [site dos Círculos de Hospitalidade](https://circulosdehospitalidade.org/).`,
          },
          es: {
            title: "Círculos de Hospitalidade",
            summary:
              "Red de apoyo y acogida para migrantes y familias. Aliada de este portal.",
            body: `**Los Círculos de Hospitalidade son una red de apoyo y acogida** para migrantes y familias que llegan o viven en Florianópolis. El proyecto es aliado de este portal y ofrece orientación práctica sobre integración en la ciudad.

## ¿Qué es?

Los Círculos de Hospitalidade conectan personas, comunidades e instituciones para **acoger a quien llega de afuera** — con información, derivaciones y apoyo humano. La iniciativa trabaja la **hospitalidad** en el sentido más amplio: recibir, orientar e integrar migrantes en la vida local.

## ¿Cómo acceder?

1. Ingresá al [sitio oficial de Círculos de Hospitalidade](https://circulosdehospitalidade.org/).
2. Revisá los **programas, materiales y orientaciones** disponibles para migrantes.
3. Si necesitás atención directa, usá la página de contacto indicada abajo.

## Contactanos

Para hablar con el equipo, accedé a la [página de contacto de Círculos de Hospitalidade](https://circulosdehospitalidade.org/contato/).

> **¿Querés más detalles?** Consultá la información completa en el [sitio de Círculos de Hospitalidade](https://circulosdehospitalidade.org/).`,
          },
        },
      },
    ],
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
        body: `**A educação pública no Brasil é gratuita** e, no caso das crianças, **garantida por lei** — inclusive a migrantes em situação irregular. Você tem direito a:

- **Matricular** seus filhos na escola, mesmo sem CRNM.
- Aprender **português gratuitamente** em programas como o PLAc da UFSC.
- **Revalidar** seu diploma do exterior pra atuar profissionalmente.
- Fazer **cursos técnicos** gratuitos (SENAI, SENAC, IFSC) que aceleram a entrada no mercado.

> **Mesmo sem revalidar o diploma original, dá pra trabalhar.** Cursos técnicos são um caminho rápido e respeitado no mercado brasileiro.`,
      },
      es: {
        title: "Educación",
        summary:
          "Matrícula en escuela pública, cursos gratuitos de portugués y revalidación de título.",
        body: `**La educación pública en Brasil es gratuita** y, en el caso de los niños, **garantizada por ley** — incluso a migrantes en situación irregular. Tenés derecho a:

- **Matricular** a tus hijos en la escuela, incluso sin CRNM.
- Aprender **portugués gratis** en programas como el PLAc de la UFSC.
- **Revalidar** tu título del exterior para ejercer profesionalmente.
- Hacer **cursos técnicos** gratuitos (SENAI, SENAC, IFSC) que aceleran la entrada al mercado.

> **Incluso sin revalidar el título original, podés trabajar.** Los cursos técnicos son un camino rápido y respetado en el mercado brasileño.`,
      },
    },
    topics: [
      {
        slug: "matricula-escola-criancas",
        order: 1,
        contactIds: [],
        translations: {
          pt: {
            title: "Matrícula escolar para crianças",
            summary:
              "Educação básica gratuita garantida por lei, mesmo sem visto ou CRNM.",
            body: `**A Constituição brasileira garante educação básica a toda criança no país, independente da situação migratória.** Você pode matricular seus filhos sem CRNM, sem visto, sem CPF do menor.

Em Floripa, a rede pública atende desde a creche até o ensino médio.

## Onde matricular (por idade)

| Idade | Onde matricular |
| --- | --- |
| **0–3 anos** (creche) | Secretaria Municipal de Educação |
| **4–5 anos** (pré-escola) | Secretaria Municipal de Educação |
| **6–14 anos** (fundamental) | Secretaria Municipal de Educação |
| **15–17 anos** (médio) | Secretaria Estadual de Educação |

## Como fazer

1. **Encontre a Secretaria de Educação** correspondente. Em Floripa, a municipal é na **Rua Conselheiro Mafra, 656** (Centro). A estadual fica em endereços diferentes.
2. **Apresente os documentos** abaixo. Se faltar algum, peça orientação — quase sempre dá pra resolver.
3. **A vaga é atribuída** geralmente em escola próxima da sua casa.
4. Em alguns casos pode ter **lista de espera** pra creches.

## O que levar

- **Documento da criança**: passaporte, certidão de nascimento (original ou tradução), CRNM se já tiver.
- **Documento do responsável** (você): qualquer um.
- **Comprovante de residência**.
- **Histórico escolar** do país anterior, se tiver — ajuda a colocar no ano certo. Tradução não-juramentada é aceita pra começar.
- **Cartão de vacinação** atualizado (não impede a matrícula, mas a escola pode te encaminhar pra UBS).

> **Se a Secretaria criar dificuldade alegando falta de documento, procure o CRAS ou a Defensoria Pública.** Recusar matrícula a uma criança é ilegal — eles te ajudam a contornar.

## Almoço e material escolar

- **Alimentação escolar** (almoço/lanche) é **gratuita** em todas as escolas públicas.
- Pra **kit de material escolar**, escolas municipais geralmente distribuem no início do ano. Estaduais variam.
- **Uniforme** muitas vezes também é fornecido pela escola.`,
          },
          es: {
            title: "Matrícula escolar para niños",
            summary:
              "Educación básica gratuita garantizada por ley, incluso sin visa ni CRNM.",
            body: `**La Constitución brasileña garantiza educación básica a todo niño en el país, sin importar la situación migratoria.** Podés matricular a tus hijos sin CRNM, sin visa, sin CPF del menor.

En Floripa, la red pública atiende desde el jardín hasta la secundaria.

## Dónde matricular (por edad)

| Edad | Dónde matricular |
| --- | --- |
| **0–3 años** (jardín maternal) | Secretaría Municipal de Educación |
| **4–5 años** (preescolar) | Secretaría Municipal de Educación |
| **6–14 años** (primaria) | Secretaría Municipal de Educación |
| **15–17 años** (secundaria) | Secretaría Estadual de Educación |

## Cómo hacer

1. **Encontrá la Secretaría de Educación** correspondiente. En Floripa, la municipal está en la **Rua Conselheiro Mafra, 656** (Centro). La estadual queda en direcciones diferentes.
2. **Presentá los documentos** abajo. Si falta alguno, pedí orientación — casi siempre se puede resolver.
3. **La vacante se asigna** generalmente en una escuela cerca de tu casa.
4. En algunos casos puede haber **lista de espera** para jardín.

## Qué llevar

- **Documento del niño**: pasaporte, partida de nacimiento (original o traducción), CRNM si ya tiene.
- **Documento del responsable** (vos): cualquiera.
- **Comprobante de domicilio**.
- **Historial escolar** del país anterior, si tenés — ayuda a ubicarlo en el grado correcto. Una traducción no jurada se acepta para empezar.
- **Carnet de vacunación** actualizado (no impide la matrícula, pero la escuela puede derivarte a la UBS).

> **Si la Secretaría pone trabas alegando falta de documento, andá al CRAS o a la Defensoría Pública.** Negar matrícula a un niño es ilegal — ellos te ayudan a sortearlo.

## Almuerzo y material escolar

- **Alimentación escolar** (almuerzo/merienda) es **gratuita** en todas las escuelas públicas.
- Para **kit de material escolar**, las escuelas municipales suelen distribuirlo al inicio del año. Las estaduales varían.
- **Uniforme** muchas veces también lo provee la escuela.`,
          },
        },
      },
      {
        slug: "aprender-portugues",
        order: 2,
        contactIds: ["plac-ufsc"],
        translations: {
          pt: {
            title: "Aprender português (PLAc UFSC e outros)",
            summary:
              "Cursos gratuitos de português pra migrantes e refugiados em Floripa.",
            body: `**Em Floripa há cursos gratuitos de português específicos pra migrantes e refugiados** — o principal é o **PLAc da UFSC**. Não é só "aula de idioma": o foco é português pra você se virar no Brasil (banco, médico, escola, trabalho).

## PLAc UFSC (principal opção)

**Português como Língua de Acolhimento** é um programa da Universidade Federal de Santa Catarina.

| Característica | Detalhe |
| --- | --- |
| **Custo** | Gratuito |
| **Modalidade** | Presencial (campus Trindade) e online |
| **Níveis** | Básico, intermediário, avançado |
| **Quem pode** | Qualquer migrante ou refugiado, qualquer nacionalidade |
| **Duração** | Em geral 4 meses por nível |

### Como se inscrever

1. Acesse o site [plac.paginas.ufsc.br](https://plac.paginas.ufsc.br) ou escreva pra **plac.ufsc@gmail.com**.
2. As **inscrições abrem geralmente em fevereiro e em agosto** (início de semestre).
3. Você faz uma **prova de nivelamento** rápida pra entrar na turma certa.

## Outras opções na cidade

- **Cáritas SC**: oferece cursos pontuais de português, geralmente associados a outras orientações.
- **Pastoral do Migrante**: tem grupos de conversação informais.
- **Igrejas e ONGs locais**: muitas oferecem aulas de português pra suas comunidades. Pergunte na sua região.
- **Aplicativos**: Duolingo, Tandem (pra praticar com falantes nativos) — bons complementos, não substituem aula presencial.

## Dicas pra aprender mais rápido

- **Combine aula com prática diária**: ouça rádio brasileiro, assista TV/Netflix com legendas, leia jornal online (G1, Folha).
- **Faça amigos brasileiros** — o sotaque catarinense é puxado, mas você se acostuma.
- **Pratique até com erros**. Brasileiros são muito tolerantes com pronúncia de migrante.
- **Foque em situações reais**: banco, supermercado, médico. Essas são as palavras que você vai usar primeiro.

> **Aprender o português é o investimento de maior retorno nos primeiros meses.** Tudo fica mais fácil: trabalho, documentos, amizade, integração geral.`,
          },
          es: {
            title: "Aprender portugués (PLAc UFSC y otros)",
            summary:
              "Cursos gratuitos de portugués para migrantes y refugiados en Floripa.",
            body: `**En Floripa hay cursos gratuitos de portugués específicos para migrantes y refugiados** — el principal es el **PLAc de la UFSC**. No es solo "clase de idioma": el foco es el portugués para que te puedas mover en Brasil (banco, médico, escuela, trabajo).

## PLAc UFSC (opción principal)

**Portugués como Lengua de Acogida** es un programa de la Universidad Federal de Santa Catarina.

| Característica | Detalle |
| --- | --- |
| **Costo** | Gratuito |
| **Modalidad** | Presencial (campus Trindade) y online |
| **Niveles** | Básico, intermedio, avanzado |
| **Quién puede** | Cualquier migrante o refugiado, cualquier nacionalidad |
| **Duración** | En general 4 meses por nivel |

### Cómo inscribirse

1. Accedé al sitio [plac.paginas.ufsc.br](https://plac.paginas.ufsc.br) o escribí a **plac.ufsc@gmail.com**.
2. Las **inscripciones abren generalmente en febrero y en agosto** (inicio de semestre).
3. Hacés una **prueba de nivelación** rápida para entrar al grupo correcto.

## Otras opciones en la ciudad

- **Cáritas SC**: ofrece cursos puntuales de portugués, generalmente asociados a otras orientaciones.
- **Pastoral del Migrante**: tiene grupos de conversación informales.
- **Iglesias y ONGs locales**: muchas ofrecen clases de portugués para sus comunidades. Preguntá en tu región.
- **Aplicaciones**: Duolingo, Tandem (para practicar con hablantes nativos) — buenos complementos, no reemplazan la clase presencial.

## Tips para aprender más rápido

- **Combiná clase con práctica diaria**: escuchá radio brasileña, mirá TV/Netflix con subtítulos, leé diario online (G1, Folha).
- **Hacé amigos brasileños** — el acento de Santa Catarina es cerrado, pero te acostumbrás.
- **Practicá incluso con errores.** Los brasileños son muy tolerantes con la pronunciación del migrante.
- **Enfocate en situaciones reales**: banco, supermercado, médico. Esas son las palabras que vas a usar primero.

> **Aprender portugués es la inversión de mayor retorno en los primeros meses.** Todo se vuelve más fácil: trabajo, documentos, amistad, integración general.`,
          },
        },
      },
      {
        slug: "revalidar-diploma",
        order: 3,
        contactIds: [],
        translations: {
          pt: {
            title: "Revalidar diploma do exterior",
            summary:
              "Como dar validade brasileira ao seu título de ensino médio, graduação ou pós.",
            body: `**Revalidar diploma é o processo de tornar oficial no Brasil o título que você obteve em outro país.** Sem revalidação, você pode trabalhar em vários cargos — mas não nos que **exigem registro profissional** (médico, advogado, engenheiro, professor de carreira, etc.).

## Por nível de ensino

### Ensino médio

- Procure a **Secretaria Estadual de Educação** de SC.
- Apresente histórico escolar do país de origem **com tradução juramentada**.
- A Secretaria avalia e emite o **certificado equivalente brasileiro**.
- Processo costuma ser mais rápido que o de graduação.

### Graduação (universidade)

- Feita por **universidades públicas brasileiras** que tenham o curso equivalente.
- Em Floripa, a **UFSC** participa do sistema nacional **Carolina Bori**, que centraliza pedidos.
- Acesse [carolinabori.mec.gov.br](https://carolinabori.mec.gov.br) e escolha a universidade.

### Pós-graduação (mestrado e doutorado)

- Também via universidades públicas, pelo mesmo sistema Carolina Bori.
- Pode envolver banca examinadora ou prova específica.

## Documentos típicos

- **Diploma original** (legalizado pelo consulado brasileiro do seu país, ou pela Apostila de Haia se o país for signatário).
- **Histórico escolar completo** com notas e carga horária.
- **Tradução juramentada** de tudo (feita por tradutor público no Brasil).
- **Identificação pessoal** (passaporte, CRNM).
- **Comprovante de pagamento da taxa** da universidade.

## Custos e tempos

- **Taxas das universidades**: variam de R$ 0 a alguns milhares de reais.
- **Traduções juramentadas**: cobradas por página (cerca de R$ 70–100/página). Um histórico de graduação pode dar **R$ 1.000–3.000** só de tradução.
- **Tempo**: graduação leva em geral **6 meses a 2 anos**.

> **Se o orçamento aperta**, comece pelo ensino médio (mais barato e rápido) e por **cursos técnicos brasileiros** (gratuitos) enquanto o processo de graduação anda. Você pode estar trabalhando enquanto a revalidação tramita.

## Quando vale a pena

- Vale **sempre** pra profissões regulamentadas (saúde, direito, engenharia, ensino).
- Vale pra cargos públicos com exigência de diploma.
- Pode **não compensar** se você vai atuar em áreas onde experiência conta mais que diploma (TI, marketing, gastronomia, vendas).`,
          },
          es: {
            title: "Revalidar título del exterior",
            summary:
              "Cómo darle validez brasileña a tu título de secundario, universitario o posgrado.",
            body: `**Revalidar título es el proceso de hacer oficial en Brasil el título que obtuviste en otro país.** Sin revalidación, podés trabajar en varios cargos — pero no en los que **exigen registro profesional** (médico, abogado, ingeniero, docente de carrera, etc.).

## Por nivel de educación

### Secundario

- Andá a la **Secretaría Estadual de Educación** de SC.
- Presentá historial escolar del país de origen **con traducción jurada**.
- La Secretaría evalúa y emite el **certificado equivalente brasileño**.
- El trámite suele ser más rápido que el de universidad.

### Universidad

- Hecha por **universidades públicas brasileñas** que tengan el curso equivalente.
- En Floripa, la **UFSC** participa del sistema nacional **Carolina Bori**, que centraliza pedidos.
- Accedé a [carolinabori.mec.gov.br](https://carolinabori.mec.gov.br) y elegí la universidad.

### Posgrado (maestría y doctorado)

- También vía universidades públicas, por el mismo sistema Carolina Bori.
- Puede incluir tribunal examinador o prueba específica.

## Documentos típicos

- **Título original** (legalizado por el consulado brasileño en tu país, o por la Apostilla de La Haya si el país es firmante).
- **Historial escolar completo** con notas y carga horaria.
- **Traducción jurada** de todo (hecha por traductor público en Brasil).
- **Identificación personal** (pasaporte, CRNM).
- **Comprobante de pago de la tasa** de la universidad.

## Costos y tiempos

- **Tasas de las universidades**: varían de R$ 0 a varios miles de reales.
- **Traducciones juradas**: se cobran por página (alrededor de R$ 70–100/página). Un historial universitario puede costar **R$ 1.000–3.000** solo en traducción.
- **Tiempo**: la universidad lleva en general **6 meses a 2 años**.

> **Si el presupuesto aprieta**, empezá por el secundario (más barato y rápido) y por **cursos técnicos brasileños** (gratuitos) mientras el trámite universitario avanza. Podés estar trabajando mientras la revalidación tramita.

## Cuándo vale la pena

- Vale **siempre** para profesiones reguladas (salud, derecho, ingeniería, docencia).
- Vale para cargos públicos con exigencia de título.
- Puede **no compensar** si vas a actuar en áreas donde la experiencia cuenta más que el título (TI, marketing, gastronomía, ventas).`,
          },
        },
      },
      {
        slug: "cursos-tecnicos",
        order: 4,
        contactIds: [],
        translations: {
          pt: {
            title: "Cursos técnicos e profissionalizantes",
            summary:
              "SENAI, SENAC, IFSC — gratuitos, rápidos e ótimos pra entrar no mercado brasileiro.",
            body: `**Cursos técnicos e profissionalizantes são o caminho mais rápido pra trabalhar com qualificação no Brasil.** Boa parte é gratuita, dura de poucas semanas a 2 anos, e tem alta empregabilidade.

São abertos a migrantes — basta ter CPF.

## Principais instituições

| Instituição | Foco | Custo |
| --- | --- | --- |
| **SENAI** | Indústria, mecânica, eletricidade, automação, panificação | Maioria gratuito |
| **SENAC** | Comércio, hotelaria, gastronomia, beleza, administração | Tem gratuitos e pagos |
| **IFSC** (Instituto Federal) | Técnico de nível médio em várias áreas | Gratuito |
| **SEBRAE** | Empreendedorismo, MEI, gestão de pequeno negócio | Maioria gratuito ou simbólico |
| **Pronatec** | Programa federal que reúne vagas em diversas escolas | Gratuito |

## Como se inscrever

1. **Acesse o site da instituição** (senai.com.br, senac.com.br, ifsc.edu.br).
2. **Veja o catálogo de cursos** e o calendário de inscrições.
3. **Cadastre-se** com CPF e dados pessoais.
4. Alguns cursos têm **processo seletivo simples** (prova ou sorteio); outros entram por ordem de inscrição.
5. **Vagas gratuitas** geralmente são pra famílias do CadÚnico (se você tem cadastro, vale citar).

## Cursos que casam bem com o mercado de Floripa

- **Gastronomia, panificação, garçom**: SENAC, ótimo pra hotelaria e restaurantes.
- **Recepcionista, camareira**: SENAC, demanda alta na alta temporada.
- **Eletricista, encanador, pedreiro**: SENAI, sempre tem vaga.
- **Auxiliar administrativo, vendedor**: SENAC.
- **Técnico em informática, redes**: SENAI ou IFSC.
- **Idiomas (inglês, espanhol)**: SENAC tem cursos baratos.

## Vantagens em relação à graduação

- **Mais rápido** (semanas a 2 anos vs 4–5 anos de graduação).
- **Mais barato** (muitos gratuitos).
- **Mais prático** (foco em "saber fazer", não em teoria).
- **Mercado valoriza** — em vários setores, certificado técnico abre tantas portas quanto diploma.

> **Estratégia que funciona pra muitos migrantes:** comece com um curso técnico curto, entre no mercado de trabalho, e use o salário pra bancar a revalidação do diploma original em paralelo.`,
          },
          es: {
            title: "Cursos técnicos y profesionales",
            summary:
              "SENAI, SENAC, IFSC — gratuitos, rápidos y excelentes para entrar al mercado brasileño.",
            body: `**Los cursos técnicos y profesionales son el camino más rápido para trabajar con calificación en Brasil.** Buena parte es gratuita, duran de pocas semanas a 2 años, y tienen alta empleabilidad.

Están abiertos a migrantes — solo necesitás CPF.

## Principales instituciones

| Institución | Foco | Costo |
| --- | --- | --- |
| **SENAI** | Industria, mecánica, electricidad, automatización, panadería | La mayoría gratuito |
| **SENAC** | Comercio, hotelería, gastronomía, belleza, administración | Hay gratuitos y pagos |
| **IFSC** (Instituto Federal) | Técnico de nivel medio en varias áreas | Gratuito |
| **SEBRAE** | Emprendimiento, MEI, gestión de pequeño negocio | La mayoría gratuito o simbólico |
| **Pronatec** | Programa federal que reúne vacantes en diversas escuelas | Gratuito |

## Cómo inscribirse

1. **Accedé al sitio de la institución** (senai.com.br, senac.com.br, ifsc.edu.br).
2. **Mirá el catálogo de cursos** y el calendario de inscripciones.
3. **Registrate** con CPF y datos personales.
4. Algunos cursos tienen **proceso selectivo simple** (prueba o sorteo); otros entran por orden de inscripción.
5. **Las vacantes gratuitas** generalmente son para familias del CadÚnico (si tenés registro, vale citarlo).

## Cursos que combinan bien con el mercado de Floripa

- **Gastronomía, panadería, mozo**: SENAC, óptimo para hotelería y restaurantes.
- **Recepcionista, mucama**: SENAC, alta demanda en alta temporada.
- **Electricista, plomero, albañil**: SENAI, siempre hay vacante.
- **Auxiliar administrativo, vendedor**: SENAC.
- **Técnico en informática, redes**: SENAI o IFSC.
- **Idiomas (inglés, español)**: SENAC tiene cursos baratos.

## Ventajas sobre la universidad

- **Más rápido** (semanas a 2 años vs 4–5 años de universidad).
- **Más barato** (muchos gratuitos).
- **Más práctico** (foco en "saber hacer", no en teoría).
- **El mercado valora** — en varios sectores, el certificado técnico abre tantas puertas como un título universitario.

> **Estrategia que funciona para muchos migrantes:** empezá con un curso técnico corto, entrá al mercado de trabajo, y usá el sueldo para bancar la revalidación del título original en paralelo.`,
          },
        },
      },
    ],
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
        body: `**Florianópolis tem um dos aluguéis mais caros do Sul do Brasil**, principalmente perto da praia (Lagoa, Jurerê, Ingleses) e no Centro. Bairros mais acessíveis: **Trindade, Capoeiras, Estreito, Coqueiros, Saco dos Limões**.

> **Alta temporada (dez–mar)** infla preços e reduz oferta de aluguel longo. Se der, **feche contrato até novembro**.

Os tópicos abaixo cobrem desde como alugar de forma tradicional (com as exigências brasileiras), passando por alternativas pra quem está chegando, até o que fazer em emergência habitacional e programas públicos de moradia.`,
      },
      es: {
        title: "Vivienda",
        summary:
          "Orientaciones para alquilar, programas habitacionales y refugios de emergencia.",
        body: `**Florianópolis tiene uno de los alquileres más caros del Sur de Brasil**, sobre todo cerca de la playa (Lagoa, Jurerê, Ingleses) y en el Centro. Barrios más accesibles: **Trindade, Capoeiras, Estreito, Coqueiros, Saco dos Limões**.

> **Alta temporada (dic–mar)** infla precios y reduce la oferta de alquiler largo. Si podés, **cerrá contrato hasta noviembre**.

Los temas debajo cubren desde cómo alquilar de forma tradicional (con las exigencias brasileñas), pasando por alternativas para quien está llegando, hasta qué hacer en emergencia habitacional y programas públicos de vivienda.`,
      },
    },
    topics: [
      {
        slug: "como-alugar",
        order: 1,
        contactIds: [],
        translations: {
          pt: {
            title: "Como alugar um imóvel em Floripa",
            summary:
              "Fiador, seguro fiança ou caução — entenda as 3 garantias e qual é mais viável pra você.",
            body: `**Pra alugar um imóvel pelas imobiliárias em Floripa, você precisa apresentar uma garantia.** São 3 modalidades — escolha conforme sua situação.

## As 3 garantias possíveis

| Garantia | Como funciona | Quando faz sentido |
| --- | --- | --- |
| **Fiador** | Alguém com imóvel próprio em Floripa assina como garantia | Você conhece alguém local que aceita |
| **Seguro fiança** | Você paga uma seguradora ~10–15% do aluguel mensal | Mais comum pra quem está chegando |
| **Caução** | 3 meses de aluguel adiantados, devolvidos ao sair | Você tem dinheiro guardado |

### 1. Fiador

A imobiliária quer alguém com **imóvel próprio em Florianópolis** que assina garantindo o pagamento. Se você não pagar, o fiador é cobrado.

- **Difícil pra migrante recém-chegado** — quase ninguém conhece pessoa local com imóvel disposta a assumir o risco.
- Se conseguir, é a opção **mais barata** (sem custo extra mensal).

### 2. Seguro fiança

Você contrata uma seguradora que garante o aluguel. Custa **~10–15% do valor do aluguel todo mês**.

- **Mais comum pra quem está chegando.**
- A seguradora avalia seu perfil (renda, histórico). Em geral pede comprovante de renda **3x o aluguel**.
- Se você não tiver renda formal alta, fica difícil aprovar.

### 3. Caução

Você deposita o **valor de 3 aluguéis** numa conta vinculada. Sai do bolso, mas é devolvido com correção ao fim do contrato (se entregar o imóvel em boa condição).

- **Sem análise de crédito complicada** — quem tem o dinheiro alugou.
- **Bom pra freelancer, MEI ou autônomo** sem holerite.
- Cuidado: alguns contratos retêm parte da caução por avarias mínimas.

## Outros custos do aluguel

Além do aluguel mensal, prepare-se pra:

- **IPTU** (imposto da prefeitura), geralmente pago pelo inquilino.
- **Condomínio** (em apartamento) — pode chegar a 1/3 do aluguel.
- **Água, luz, internet, gás** — por sua conta.
- **Taxa de cadastro** da imobiliária (~R$ 100–500).

> **Sempre veja o imóvel pessoalmente.** Foto e descrição online enganam — vista o lugar, confira pressão da água, mofo, vizinhos, ventilação. Vá em horários diferentes pra avaliar barulho.`,
          },
          es: {
            title: "Cómo alquilar un inmueble en Floripa",
            summary:
              "Garante, seguro fianza o caución — entendé las 3 garantías y cuál es más viable para vos.",
            body: `**Para alquilar un inmueble por las inmobiliarias en Floripa, tenés que presentar una garantía.** Son 3 modalidades — elegí según tu situación.

## Las 3 garantías posibles

| Garantía | Cómo funciona | Cuándo conviene |
| --- | --- | --- |
| **Garante (fiador)** | Alguien con inmueble propio en Floripa firma como garantía | Conocés a alguien local que acepta |
| **Seguro fianza** | Pagás a una aseguradora ~10–15% del alquiler mensual | Más común para quien recién llega |
| **Caución** | 3 meses de alquiler adelantados, devueltos al salir | Tenés plata ahorrada |

### 1. Garante

La inmobiliaria quiere a alguien con **inmueble propio en Florianópolis** que firme garantizando el pago. Si no pagás, le cobran al garante.

- **Difícil para migrante recién llegado** — casi nadie conoce a una persona local con inmueble dispuesta a asumir el riesgo.
- Si lo conseguís, es la opción **más barata** (sin costo extra mensual).

### 2. Seguro fianza

Contratás una aseguradora que garantiza el alquiler. Cuesta **~10–15% del valor del alquiler todos los meses**.

- **Más común para quien está llegando.**
- La aseguradora evalúa tu perfil (ingresos, historial). En general piden comprobante de ingresos **3x el alquiler**.
- Si no tenés ingresos formales altos, es difícil aprobar.

### 3. Caución

Depositás el **valor de 3 alquileres** en una cuenta vinculada. Sale del bolsillo, pero se devuelve con corrección al final del contrato (si entregás el inmueble en buena condición).

- **Sin análisis de crédito complicado** — quien tiene la plata alquila.
- **Bueno para freelancer, MEI o autónomo** sin recibo de sueldo.
- Cuidado: algunos contratos retienen parte de la caución por daños mínimos.

## Otros costos del alquiler

Además del alquiler mensual, preparate para:

- **IPTU** (impuesto de la municipalidad), generalmente pagado por el inquilino.
- **Expensas (condomínio)** en departamentos — pueden llegar a 1/3 del alquiler.
- **Agua, luz, internet, gas** — por tu cuenta.
- **Tasa de registro** de la inmobiliaria (~R$ 100–500).

> **Visitá siempre el inmueble personalmente.** La foto y descripción online engañan — andá al lugar, fijate la presión del agua, moho, vecinos, ventilación. Andá en horarios distintos para evaluar el ruido.`,
          },
        },
      },
      {
        slug: "alternativas-pra-comecar",
        order: 2,
        contactIds: [],
        translations: {
          pt: {
            title: "Alternativas pra começar (sem fiador, sem caução)",
            summary:
              "República, aluguel direto, pousadas — o que serve enquanto você se estabiliza.",
            body: `**Se você acabou de chegar, ainda não tem renda comprovada, ou não quer travar dinheiro em caução, há alternativas mais flexíveis pra começar.**

## República (compartilhado)

**Você divide aluguel e contas com outras pessoas.** É a opção **mais barata e mais flexível** pra quem chega.

**Vantagens:**
- **Sem fiador, sem caução** — quem mora paga a parte direto.
- **Custo baixo** (R$ 800–1.500/mês em geral, dependendo do bairro e do quarto).
- **Contas divididas** (luz, água, internet).
- **Já vem mobiliado**, geralmente.

**Pontos de atenção:**
- Convivência com desconhecidos exige paciência.
- Acordos verbais — leia atentamente as regras da casa antes de entrar.
- Em alguns casos, o "morador veterano" cobra "luvas" (taxa de entrada) — desconfie.

**Onde achar:**
- Grupos do **Facebook** "República Florianópolis", "Vagas República UFSC".
- **OLX**, categoria "Quartos pra alugar".
- Cartazes em **universidades** (UFSC, UDESC).

## Aluguel direto com proprietário

**Sem imobiliária** — você fala direto com o dono do imóvel. Costuma ser **mais negociável** (menos burocracia, menos garantia exigida).

- Procure em **grupos de Facebook**, **OLX**, **QuintoAndar Direto**.
- Pode topar conversar sobre **caução parcelada**, dispensar fiador em troca de aluguel maior, etc.
- Cuidado: **sempre faça contrato escrito**, mesmo informal. Sem contrato, você não tem proteção legal.

## Pousadas, hostels e quartos baratos

**Pra os primeiros dias/semanas**, enquanto procura algo fixo.

- **Hostels**: R$ 60–120/diária em quarto compartilhado. Tem em todos os bairros turísticos.
- **Pousadas**: R$ 100–250/diária em quarto privado.
- **Booking, Airbnb, Hostelworld**: aluguel por temporada, vale pra estadias curtas (até 1 mês).

> **Negocie desconto por estadia longa.** Quase todo hostel/pousada faz preço menor pra quem fica 2+ semanas. Ligue antes e pergunte.

## Hospedagem solidária (em emergências)

Algumas ONGs e igrejas oferecem **hospedagem temporária** (3–15 dias) pra migrantes em situação crítica. Procure a **Cáritas SC** ou a **Pastoral do Migrante**.`,
          },
          es: {
            title: "Alternativas para empezar (sin garante, sin caución)",
            summary:
              "Compartido, alquiler directo, hostels — lo que sirve mientras te estabilizás.",
            body: `**Si recién llegás, todavía no tenés ingresos comprobados, o no querés trabar plata en caución, hay alternativas más flexibles para empezar.**

## Compartido (república)

**Dividís alquiler y cuentas con otras personas.** Es la opción **más barata y flexible** para quien llega.

**Ventajas:**
- **Sin garante, sin caución** — quien vive paga su parte directo.
- **Costo bajo** (R$ 800–1.500/mes en general, depende del barrio y del cuarto).
- **Cuentas divididas** (luz, agua, internet).
- **Suele venir amoblado.**

**Puntos de atención:**
- Convivir con desconocidos exige paciencia.
- Acuerdos verbales — leé atentamente las reglas de la casa antes de entrar.
- En algunos casos, el "veterano" cobra "llave" (tasa de entrada) — desconfiá.

**Dónde encontrar:**
- Grupos de **Facebook** "República Florianópolis", "Vagas República UFSC".
- **OLX**, categoría "Cuartos en alquiler".
- Carteles en **universidades** (UFSC, UDESC).

## Alquiler directo con propietario

**Sin inmobiliaria** — hablás directo con el dueño del inmueble. Suele ser **más negociable** (menos burocracia, menos garantía exigida).

- Buscá en **grupos de Facebook**, **OLX**, **QuintoAndar Direto**.
- Puede aceptar conversar sobre **caución en cuotas**, dispensar garante a cambio de alquiler más alto, etc.
- Cuidado: **siempre hacé contrato escrito**, aunque sea informal. Sin contrato, no tenés protección legal.

## Hostels, posadas y cuartos baratos

**Para los primeros días/semanas**, mientras buscás algo fijo.

- **Hostels**: R$ 60–120/día en cuarto compartido. Hay en todos los barrios turísticos.
- **Posadas**: R$ 100–250/día en cuarto privado.
- **Booking, Airbnb, Hostelworld**: alquiler por temporada, vale para estadías cortas (hasta 1 mes).

> **Negociá descuento por estadía larga.** Casi todo hostel/posada hace precio menor para quien se queda 2+ semanas. Llamá antes y preguntá.

## Hospedaje solidario (en emergencias)

Algunas ONGs e iglesias ofrecen **hospedaje temporario** (3–15 días) para migrantes en situación crítica. Andá a la **Cáritas SC** o a la **Pastoral del Migrante**.`,
          },
        },
      },
      {
        slug: "emergencia-habitacional",
        order: 3,
        contactIds: ["cras-floripa", "caritas-sc"],
        translations: {
          pt: {
            title: "Em situação de emergência habitacional",
            summary:
              "Sem onde dormir, com a família na rua, despejo iminente — onde buscar ajuda imediata.",
            body: `**Se você está sem onde dormir ou em risco de despejo, existem serviços públicos e privados que atendem em emergência.** Procure imediatamente — não espere a situação piorar.

## Primeiro passo: o CRAS

O **CRAS** é a porta de entrada pra qualquer emergência social, **inclusive habitacional**. Você chega lá (sem agendamento, em casos de risco), conta a situação e é encaminhado.

> **Não tem como chegar ao CRAS?** Ligue **100** (Direitos Humanos) ou **156** (Ouvidoria Geral de Florianópolis). Eles orientam.

## Centro POP — pra adultos em situação de rua

O **Centro POP** (vinculado ao CREAS) atende **adultos em situação de rua** com:

- **Banho, lavagem de roupa, alimentação.**
- **Endereço de referência** pra você receber correspondência.
- **Acompanhamento** pra documentos, benefícios, encaminhamento pra abrigo.

Funciona em Florianópolis na região central.

## Abrigos e casas de passagem

Se a situação é mais grave (família com crianças, mulher em violência, idoso abandonado), o sistema oferece **abrigamento temporário**.

- **Casas de passagem**: estadia curta (poucos dias) enquanto se busca solução duradoura.
- **Abrigos institucionais**: mais longos, com infraestrutura completa.
- **Acolhimento pra famílias**: separação respeitando o núcleo familiar (não separa filhos dos pais).

Pra acessar, **passe pelo CREAS ou pelo CRAS**.

## Cáritas e ONGs

A **Cáritas SC** mantém ou indica abrigos pra migrantes especificamente. Em situações de extrema urgência, pode dar:

- **Hospedagem temporária** (poucos dias) na própria estrutura ou em casa de família parceira.
- **Kit emergencial** (alimentos, roupa, higiene).
- **Encaminhamento jurídico** se há despejo iminente ou abuso de aluguel.

## Despejo iminente: o que fazer

Se o proprietário está te ameaçando de despejo:

1. **Não saia de imediato.** Despejo só é legal por ordem judicial.
2. **Procure a Defensoria Pública da União (DPU)** — atendimento gratuito.
3. **Reúna provas**: contrato, recibos de aluguel pago, mensagens.
4. A DPU pode pedir **prazo extra** ou negociar com o proprietário.

> **Despejo sem decisão judicial é ilegal.** Ninguém pode trocar a fechadura, cortar luz ou jogar suas coisas na rua sem ordem do juiz. Se isso acontecer, **chame a polícia (190)** imediatamente.`,
          },
          es: {
            title: "En situación de emergencia habitacional",
            summary:
              "Sin dónde dormir, con la familia en la calle, desalojo inminente — dónde buscar ayuda inmediata.",
            body: `**Si estás sin dónde dormir o en riesgo de desalojo, existen servicios públicos y privados que atienden en emergencia.** Andá inmediatamente — no esperes a que empeore.

## Primer paso: el CRAS

El **CRAS** es la puerta de entrada para cualquier emergencia social, **incluso habitacional**. Llegás ahí (sin agendamiento, en casos de riesgo), contás la situación y te derivan.

> **¿No tenés cómo llegar al CRAS?** Llamá al **100** (Derechos Humanos) o al **156** (Defensoría Vecinal de Florianópolis). Te orientan.

## Centro POP — para adultos en situación de calle

El **Centro POP** (vinculado al CREAS) atiende **adultos en situación de calle** con:

- **Baño, lavado de ropa, alimentación.**
- **Dirección de referencia** para que recibas correspondencia.
- **Seguimiento** para documentos, beneficios, derivación a refugio.

Funciona en Florianópolis en la región central.

## Refugios y casas de pasaje

Si la situación es más grave (familia con niños, mujer en violencia, adulto mayor abandonado), el sistema ofrece **refugio temporario**.

- **Casas de pasaje**: estadía corta (pocos días) mientras se busca solución duradera.
- **Refugios institucionales**: más largos, con infraestructura completa.
- **Acogida para familias**: separación respetando el núcleo familiar (no separa hijos de padres).

Para acceder, **andá al CREAS o al CRAS**.

## Cáritas y ONGs

La **Cáritas SC** mantiene o indica refugios para migrantes específicamente. En situaciones de extrema urgencia, puede dar:

- **Hospedaje temporario** (pocos días) en su propia estructura o en casa de familia socia.
- **Kit de emergencia** (alimentos, ropa, higiene).
- **Derivación jurídica** si hay desalojo inminente o abuso de alquiler.

## Desalojo inminente: qué hacer

Si el propietario te amenaza con desalojo:

1. **No salgas de inmediato.** El desalojo solo es legal por orden judicial.
2. **Andá a la Defensoría Pública de la Unión (DPU)** — atención gratuita.
3. **Juntá pruebas**: contrato, recibos de alquiler pagado, mensajes.
4. La DPU puede pedir **plazo extra** o negociar con el propietario.

> **El desalojo sin decisión judicial es ilegal.** Nadie puede cambiar la cerradura, cortar la luz o tirar tus cosas a la calle sin orden del juez. Si pasa, **llamá a la policía (190)** inmediatamente.`,
          },
        },
      },
      {
        slug: "programas-habitacionais",
        order: 4,
        contactIds: ["cras-floripa"],
        translations: {
          pt: {
            title: "Programas habitacionais públicos",
            summary:
              "Minha Casa Minha Vida, aluguel social, financiamento subsidiado — quando vale a pena.",
            body: `**Pra quem pretende ficar de forma mais permanente no Brasil, há programas públicos que ajudam a comprar ou pagar moradia.** Pra estrangeiros, geralmente é exigido **residência regular** (CRNM ativa).

## Minha Casa Minha Vida (MCMV)

O principal programa federal de habitação. Financia a **compra de imóvel próprio** com **subsídio do governo** (você paga só parte do valor, o resto vem do governo).

### Como funciona

- **Renda familiar até R$ 8 mil/mês** (em 2025; varia por faixa).
- **Subsídio cresce conforme a renda é mais baixa** — famílias mais pobres pagam menos.
- **Parcelas reduzidas** pela Caixa Econômica Federal.
- Imóveis são geralmente **apartamentos novos**, em conjuntos habitacionais.

### O que você precisa

- **CPF** e **CRNM** (residência regular).
- **Comprovante de renda** (CTPS, holerite, ou autodeclaração pra autônomos).
- **CadÚnico atualizado** (passa pelo CRAS).
- **Não ter imóvel próprio** em qualquer lugar do Brasil.
- **Não ter financiamento ativo** pelo SFH.

### Como se candidatar

1. **Cadastre-se na Caixa Econômica Federal** ou na **Cohab/Companhia de Habitação local** (em Floripa, a **Cohab/SC**).
2. **Aguarde a chamada** — há filas longas, pode demorar **meses ou anos**.
3. **Acompanhe convocações** pelo site da Caixa ou da Cohab.

## Aluguel social municipal

Programa da **Prefeitura de Florianópolis** que paga (parcial ou totalmente) o aluguel de famílias em **vulnerabilidade extrema**. Casos: vítimas de calamidade (enchente, deslizamento), desalojados por reintegração de posse, mulheres em violência.

- Avaliação caso-a-caso, **via CRAS**.
- Benefício temporário, com renovação periódica.
- Foco em quem está **prestes a ir parar na rua**.

## Programa Casa Verde e Amarela / outros

O nome do programa principal já mudou várias vezes (Minha Casa Minha Vida, Casa Verde e Amarela, e voltou pra Minha Casa Minha Vida). Confira no momento da inscrição qual é a marca ativa — as **regras gerais permanecem similares**.

## Cooperativas habitacionais

Algumas cooperativas constroem moradia coletiva mais barata. **Pesquise reputação antes** — há cooperativas idôneas e há golpes.

> **Programas habitacionais são processos longos** (geralmente 1–5 anos da inscrição à chave do imóvel). Vale começar o processo logo, mas **não conte com a casa pra resolver moradia imediata**. Combine com alguma das alternativas dos outros tópicos.`,
          },
          es: {
            title: "Programas habitacionales públicos",
            summary:
              "Minha Casa Minha Vida, alquiler social, financiación subsidiada — cuándo conviene.",
            body: `**Para quien pretende quedarse de forma más permanente en Brasil, hay programas públicos que ayudan a comprar o pagar vivienda.** Para extranjeros, generalmente se exige **residencia regular** (CRNM activa).

## Minha Casa Minha Vida (MCMV)

El principal programa federal de vivienda. Financia la **compra de inmueble propio** con **subsidio del gobierno** (pagás solo parte del valor, el resto viene del gobierno).

### Cómo funciona

- **Ingreso familiar hasta R$ 8 mil/mes** (en 2025; varía por franja).
- **El subsidio crece a medida que el ingreso es más bajo** — familias más pobres pagan menos.
- **Cuotas reducidas** por la Caixa Econômica Federal.
- Los inmuebles son generalmente **departamentos nuevos**, en complejos habitacionales.

### Lo que necesitás

- **CPF** y **CRNM** (residencia regular).
- **Comprobante de ingresos** (CTPS, recibo de sueldo, o autodeclaración para autónomos).
- **CadÚnico actualizado** (pasa por el CRAS).
- **No tener inmueble propio** en ningún lugar de Brasil.
- **No tener financiación activa** por el SFH.

### Cómo postularse

1. **Registrate en la Caixa Econômica Federal** o en la **Cohab/Compañía de Vivienda local** (en Floripa, la **Cohab/SC**).
2. **Esperá la convocatoria** — hay filas largas, puede demorar **meses o años**.
3. **Seguí convocatorias** por el sitio de la Caixa o de la Cohab.

## Alquiler social municipal

Programa de la **Municipalidad de Florianópolis** que paga (parcial o totalmente) el alquiler de familias en **vulnerabilidad extrema**. Casos: víctimas de calamidad (inundación, deslizamiento), desalojados por reintegro de posesión, mujeres en violencia.

- Evaluación caso a caso, **vía CRAS**.
- Beneficio temporario, con renovación periódica.
- Foco en quien está **a punto de ir a parar a la calle**.

## Programa Casa Verde y Amarela / otros

El nombre del programa principal ya cambió varias veces (Minha Casa Minha Vida, Casa Verde y Amarela, y volvió a Minha Casa Minha Vida). Confirmá en el momento de la inscripción cuál es la marca activa — las **reglas generales se mantienen similares**.

## Cooperativas habitacionales

Algunas cooperativas construyen vivienda colectiva más barata. **Investigá reputación antes** — hay cooperativas serias y hay estafas.

> **Los programas habitacionales son procesos largos** (generalmente 1–5 años desde la inscripción a la entrega de la llave). Vale empezar el trámite ya, pero **no cuentes con la casa para resolver vivienda inmediata**. Combiná con alguna de las alternativas de los otros temas.`,
          },
        },
      },
    ],
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
        body: `**No Brasil existem números gratuitos que funcionam de qualquer telefone — mesmo sem chip ou crédito.** Saber qual ligar e quando faz diferença em emergência.

| Quem ligar | Número |
| --- | --- |
| Polícia Militar | **190** |
| SAMU (ambulância) | **192** |
| Bombeiros | **193** |
| Defesa Civil | **199** |
| Direitos Humanos | **100** |
| Atendimento à mulher | **180** |

> **Você tem direito a intérprete em qualquer atendimento de emergência ou delegacia.** Se não fala português bem, peça — está garantido por lei.

Os tópicos abaixo cobrem como agir em **violência**, **xenofobia/discriminação** e **perda de documentos** — situações que infelizmente acontecem e que têm caminhos legais e gratuitos pra resolver.`,
      },
      es: {
        title: "Emergencias y seguridad",
        summary:
          "Números de emergencia, qué hacer en situación de violencia y cómo denunciar discriminación.",
        body: `**En Brasil existen números gratuitos que funcionan desde cualquier teléfono — incluso sin chip o crédito.** Saber a quién llamar y cuándo hace diferencia en emergencia.

| A quién llamar | Número |
| --- | --- |
| Policía Militar | **190** |
| SAMU (ambulancia) | **192** |
| Bomberos | **193** |
| Defensa Civil | **199** |
| Derechos Humanos | **100** |
| Atención a la mujer | **180** |

> **Tenés derecho a intérprete en cualquier atención de emergencia o comisaría.** Si no hablás bien portugués, pedilo — está garantizado por ley.

Los temas debajo cubren cómo actuar en **violencia**, **xenofobia/discriminación** y **pérdida de documentos** — situaciones que lamentablemente pasan y que tienen caminos legales y gratuitos para resolver.`,
      },
    },
    topics: [
      {
        slug: "numeros-emergencia",
        order: 1,
        contactIds: ["samu-192", "policia-militar-190", "bombeiros-193"],
        translations: {
          pt: {
            title: "Os 6 números de emergência que você precisa saber",
            summary:
              "Polícia, ambulância, bombeiros, mulher, direitos humanos — gratuitos, 24h, sem precisar de chip.",
            body: `**Os números abaixo funcionam de qualquer telefone no Brasil — celular sem chip, sem crédito, ou fixo.** Todos são **24h e gratuitos**. Salve no celular hoje, antes de precisar.

## A lista essencial

| Número | Pra quê | Quando ligar |
| --- | --- | --- |
| **190** | Polícia Militar | Crime em andamento, briga, suspeito, violência |
| **192** | SAMU (ambulância) | Acidente, infarto, AVC, parto, ferimento grave |
| **193** | Bombeiros | Incêndio, resgate em altura/água, animais presos |
| **180** | Atendimento à mulher | Violência contra mulher, estupro, ameaça |
| **100** | Direitos humanos | Xenofobia, abuso, exploração, violação de direitos |
| **199** | Defesa Civil | Enchente, deslizamento, risco geológico |

## Como ligar bem (3 regras)

1. **Diga primeiro o endereço.** Rua, número, bairro, ponto de referência. Se você cair na ligação, é o que mais importa.
2. **Conte o que está acontecendo** em poucas palavras: quem, o que, quando.
3. **Não desligue** até o atendente mandar.

## Se você não fala português bem

**Diga "intérprete" ou diga o seu idioma e mantenha a ligação.** Os serviços têm sistema de tradução. Pode demorar 30 segundos a 1 minuto pra acionar, mas funciona.

Se ninguém fala seu idioma, fale **devagar e em frases curtas** — o atendente entende mais do que parece.

## Diferença entre 190 (polícia) e 180 (mulher)

- **190**: emergência geral, qualquer crime. Vai a Polícia Militar.
- **180**: especializado em **violência contra mulher**. A operadora é treinada pra esse atendimento e aciona apoio especializado (DEAM, abrigo, psicólogo).

Se você é mulher em violência doméstica, **prefira o 180** quando possível.

## Outros números úteis (não emergência)

- **136**: Disque Saúde — orientação SUS.
- **156**: Ouvidoria de Florianópolis — reclamações sobre serviços municipais.
- **151**: Procon SC — defesa do consumidor.`,
          },
          es: {
            title: "Los 6 números de emergencia que tenés que saber",
            summary:
              "Policía, ambulancia, bomberos, mujer, derechos humanos — gratuitos, 24h, sin necesidad de chip.",
            body: `**Los números abajo funcionan desde cualquier teléfono en Brasil — celular sin chip, sin crédito, o fijo.** Todos son **24h y gratuitos**. Guardalos en el celular hoy, antes de necesitarlos.

## La lista esencial

| Número | Para qué | Cuándo llamar |
| --- | --- | --- |
| **190** | Policía Militar | Delito en curso, pelea, sospechoso, violencia |
| **192** | SAMU (ambulancia) | Accidente, infarto, ACV, parto, herida grave |
| **193** | Bomberos | Incendio, rescate en altura/agua, animales atrapados |
| **180** | Atención a la mujer | Violencia contra la mujer, violación, amenaza |
| **100** | Derechos humanos | Xenofobia, abuso, explotación, violación de derechos |
| **199** | Defensa Civil | Inundación, deslizamiento, riesgo geológico |

## Cómo llamar bien (3 reglas)

1. **Decí primero la dirección.** Calle, número, barrio, punto de referencia. Si se corta la llamada, es lo que más importa.
2. **Contá qué está pasando** en pocas palabras: quién, qué, cuándo.
3. **No cortes** hasta que el operador te diga.

## Si no hablás bien portugués

**Decí "intérprete" o decí tu idioma y mantené la llamada.** Los servicios tienen sistema de traducción. Puede tardar 30 segundos a 1 minuto en accionar, pero funciona.

Si nadie habla tu idioma, hablá **despacio y en frases cortas** — el operador entiende más de lo que parece.

## Diferencia entre 190 (policía) y 180 (mujer)

- **190**: emergencia general, cualquier delito. Va la Policía Militar.
- **180**: especializado en **violencia contra la mujer**. La operadora está entrenada para esa atención y acciona apoyo especializado (DEAM, refugio, psicólogo).

Si sos mujer en violencia doméstica, **preferí el 180** cuando puedas.

## Otros números útiles (no emergencia)

- **136**: Disque Saúde — orientación SUS.
- **156**: Ouvidoria de Florianópolis — quejas sobre servicios municipales.
- **151**: Procon SC — defensa del consumidor.`,
          },
        },
      },
      {
        slug: "em-caso-de-violencia",
        order: 2,
        contactIds: ["policia-militar-190", "defensoria-publica-uniao"],
        translations: {
          pt: {
            title: "Em caso de violência (qualquer tipo)",
            summary:
              "Onde ir, como registrar boletim, e quais direitos você tem — inclusive intérprete e proteção.",
            body: `**Se você sofreu violência, há um caminho claro pra denunciar e se proteger no Brasil — gratuito.** O atendimento independe da sua situação migratória.

## Primeiro: você está segura/seguro?

- **Em risco imediato:** ligue **190** (polícia) ou **180** (se é mulher em violência).
- **Já está em local seguro:** dá pra ir direto a uma delegacia depois.

## Onde registrar boletim de ocorrência (BO)

| Tipo de violência | Onde ir |
| --- | --- |
| **Violência geral** | Qualquer delegacia de polícia |
| **Violência contra mulher** | DEAM (Delegacia Especializada) |
| **Violência contra criança/adolescente** | Conselho Tutelar + DPCA (Delegacia Polícia da Criança) |
| **Violência contra idoso** | Delegacia comum + CRAS/CREAS |
| **Crime de ódio (LGBTQIA+)** | Delegacia + Disque 100 |

> **O BO pode ser feito online em SC** pelo site da Polícia Civil: [pc.sc.gov.br](https://www.pc.sc.gov.br). Vale pra crimes sem prisão em flagrante e sem violência física grave.

## O que levar

- **Documento de identificação** (passaporte, CRNM, protocolo da PF).
- **Provas que tiver**: fotos de lesões, mensagens, áudio, testemunhas.
- **Roupa que usava** (em casos de violência sexual — não lave nem troque antes de ir ao hospital).
- **Documento médico** (se já foi ao hospital).

## Você tem direito a

- **Intérprete** gratuito se não fala português.
- **Mulher**: ser atendida por **policial mulher** se preferir. Pedir.
- **Acompanhamento de assistente social** durante o atendimento.
- **Medida protetiva** (afastamento do agressor, proibição de aproximação) — emitida em até 24h.
- **Defesa jurídica gratuita** pela **Defensoria Pública**.

## Em casos de violência sexual

**Vá direto a um hospital de referência antes da delegacia** (em Floripa, o **HU – Hospital Universitário** e a **Maternidade Carmela Dutra**). Eles fazem:

- **Atendimento médico** sem custo.
- **Coleta de provas** (perícia) pra futuro processo.
- **Profilaxia de HIV e outras ISTs.**
- **Contracepção de emergência** quando aplicável.

Você **não precisa** decidir denunciar na hora — primeiro cuida da saúde, depois decide.

> **Procure também a Defensoria Pública e a Cáritas SC**. Eles dão apoio jurídico, psicológico e te orientam em cada passo. **Você não precisa enfrentar isso sozinha/sozinho.**`,
          },
          es: {
            title: "En caso de violencia (cualquier tipo)",
            summary:
              "Adónde ir, cómo hacer denuncia, y qué derechos tenés — incluido intérprete y protección.",
            body: `**Si sufriste violencia, hay un camino claro para denunciar y protegerte en Brasil — gratuito.** La atención no depende de tu situación migratoria.

## Primero: ¿estás segura/seguro?

- **En riesgo inmediato:** llamá al **190** (policía) o al **180** (si sos mujer en violencia).
- **Ya estás en lugar seguro:** podés ir directamente a una comisaría después.

## Dónde hacer la denuncia (BO – Boletim de Ocorrência)

| Tipo de violencia | Adónde ir |
| --- | --- |
| **Violencia general** | Cualquier comisaría |
| **Violencia contra mujer** | DEAM (Delegacia Especializada) |
| **Violencia contra niño/adolescente** | Conselho Tutelar + DPCA (Delegación de la Niñez) |
| **Violencia contra adulto mayor** | Comisaría común + CRAS/CREAS |
| **Crimen de odio (LGBTQIA+)** | Comisaría + Disque 100 |

> **El BO se puede hacer online en SC** por el sitio de la Policía Civil: [pc.sc.gov.br](https://www.pc.sc.gov.br). Vale para delitos sin detención en flagrancia y sin violencia física grave.

## Qué llevar

- **Documento de identificación** (pasaporte, CRNM, protocolo de la PF).
- **Pruebas que tengas**: fotos de lesiones, mensajes, audios, testigos.
- **Ropa que usabas** (en casos de violencia sexual — no la laves ni cambies antes de ir al hospital).
- **Documento médico** (si ya fuiste al hospital).

## Tenés derecho a

- **Intérprete** gratuito si no hablás portugués.
- **Mujer**: ser atendida por **policía mujer** si lo preferís. Pedilo.
- **Acompañamiento de asistente social** durante la atención.
- **Medida de protección** (alejamiento del agresor, prohibición de acercamiento) — emitida en hasta 24h.
- **Defensa jurídica gratuita** por la **Defensoría Pública**.

## En casos de violencia sexual

**Andá directo a un hospital de referencia antes de la comisaría** (en Floripa, el **HU – Hospital Universitário** y la **Maternidad Carmela Dutra**). Hacen:

- **Atención médica** sin costo.
- **Recolección de pruebas** (pericia) para futuro proceso.
- **Profilaxis de HIV y otras ETS.**
- **Anticoncepción de emergencia** cuando corresponde.

**No necesitás** decidir denunciar en el momento — primero cuidá la salud, después decidís.

> **Buscá también la Defensoría Pública y la Cáritas SC**. Dan apoyo jurídico, psicológico y te orientan en cada paso. **No tenés que enfrentar esto sola/solo.**`,
          },
        },
      },
      {
        slug: "xenofobia-discriminacao",
        order: 3,
        contactIds: ["disque-100", "caritas-sc"],
        translations: {
          pt: {
            title: "Xenofobia e discriminação são crime",
            summary:
              "Por nacionalidade, origem ou raça — é crime, e dá pra denunciar gratuitamente.",
            body: `**Discriminar alguém por nacionalidade, origem ou raça é crime no Brasil** (Lei nº 7.716/89 e Lei nº 14.532/23, que tornou injúria racial imprescritível). Não importa se foi numa rua, num posto de saúde, num emprego ou na internet — **xenofobia é crime e dá processo**.

## O que conta como xenofobia

- **Negar serviço** por ser migrante (não te atender no banco, não alugar imóvel pela nacionalidade, recusar matrícula escolar).
- **Insulto verbal** com base na sua origem ("volta pra seu país", apelidos pejorativos, deboche pelo sotaque).
- **Assédio** no trabalho ou em ambiente público por ser estrangeiro.
- **Postagens em redes sociais** te ofendendo pela nacionalidade.
- **Recusa de emprego** declaradamente por ser migrante.

> **Não tem "nível mínimo".** Mesmo um comentário aparentemente "leve" mas direcionado à sua nacionalidade já é crime e pode ser denunciado.

## Como denunciar

### 1. Disque 100 (Direitos Humanos)

- **Ligação gratuita**, 24h, **anônima** se você quiser.
- Funciona de qualquer telefone, com ou sem chip.
- Aceita denúncia em **qualquer idioma**.
- O órgão registra a denúncia e encaminha pra apuração.

### 2. Boletim de Ocorrência

- Qualquer **delegacia de polícia** registra. O BO online (pc.sc.gov.br) também vale.
- Leve **provas**: prints, áudios, vídeos, testemunhas.

### 3. Ministério Público

- Pra casos mais graves ou continuados (assédio sistemático no trabalho, recusa institucional).
- Atendimento gratuito.

## Provas — guarde TUDO

- **Print de mensagens** (mostrando data, hora, autor).
- **Áudio** se for por chamada ou áudio de mensagem.
- **Vídeo** se aconteceu em público.
- **Nome e contato de testemunhas.**
- **E-mails e correspondências** que mostrem a recusa.

Guarde em **mais de um lugar** (celular, e-mail, nuvem).

## Apoio jurídico gratuito

- **Defensoria Pública da União (DPU)** — gratuito, atende migrantes especificamente.
- **Cáritas SC** — orienta e às vezes acompanha o processo.
- **OAB Pro Bono** (Ordem dos Advogados) — em casos selecionados, advogados voluntários.

## Pra ambientes específicos

| Onde aconteceu | Onde denunciar (além do 100) |
| --- | --- |
| **No trabalho** | Sindicato + Ministério Público do Trabalho (MPT) |
| **Na escola** | Conselho Tutelar + Secretaria de Educação |
| **Em hospital/posto SUS** | Ouvidoria do SUS + Disque 136 |
| **Em loja/restaurante** | Procon SC (151) + BO |
| **Em rede social/internet** | Print, BO online, denúncia na própria plataforma |

> **Você tem direito de ser ouvida/ouvido em sua língua.** Tem direito de ter intérprete em qualquer atendimento estatal. Tem direito a tratamento digno.`,
          },
          es: {
            title: "Xenofobia y discriminación son delito",
            summary:
              "Por nacionalidad, origen o raza — es delito, y se puede denunciar gratis.",
            body: `**Discriminar a alguien por nacionalidad, origen o raza es delito en Brasil** (Ley n° 7.716/89 y Ley n° 14.532/23, que volvió la injuria racial imprescriptible). No importa si fue en la calle, en un centro de salud, en un trabajo o en internet — **la xenofobia es delito y da proceso**.

## Qué cuenta como xenofobia

- **Negar servicio** por ser migrante (no atenderte en el banco, no alquilarte por la nacionalidad, rechazar matrícula escolar).
- **Insulto verbal** por tu origen ("andate a tu país", apodos peyorativos, burla por el acento).
- **Acoso** en el trabajo o en ambiente público por ser extranjero.
- **Posteos en redes sociales** ofendiéndote por la nacionalidad.
- **Rechazo de empleo** declaradamente por ser migrante.

> **No hay "nivel mínimo".** Incluso un comentario aparentemente "liviano" pero dirigido a tu nacionalidad ya es delito y puede ser denunciado.

## Cómo denunciar

### 1. Disque 100 (Derechos Humanos)

- **Llamada gratuita**, 24h, **anónima** si querés.
- Funciona desde cualquier teléfono, con o sin chip.
- Acepta denuncias en **cualquier idioma**.
- El organismo registra la denuncia y la deriva para investigación.

### 2. Denuncia (BO – Boletim de Ocorrência)

- Cualquier **comisaría** registra. El BO online (pc.sc.gov.br) también vale.
- Llevá **pruebas**: capturas, audios, videos, testigos.

### 3. Ministerio Público

- Para casos más graves o continuos (acoso sistemático en el trabajo, rechazo institucional).
- Atención gratuita.

## Pruebas — guardá TODO

- **Captura de mensajes** (mostrando fecha, hora, autor).
- **Audio** si fue por llamada o audio de mensaje.
- **Video** si pasó en público.
- **Nombre y contacto de testigos.**
- **Correos y correspondencias** que muestren el rechazo.

Guardá en **más de un lugar** (celular, correo, nube).

## Apoyo jurídico gratuito

- **Defensoría Pública de la Unión (DPU)** — gratuita, atiende migrantes específicamente.
- **Cáritas SC** — orienta y a veces acompaña el proceso.
- **OAB Pro Bono** (Orden de Abogados) — en casos seleccionados, abogados voluntarios.

## Para ambientes específicos

| Dónde pasó | Dónde denunciar (además del 100) |
| --- | --- |
| **En el trabajo** | Sindicato + Ministério Público do Trabalho (MPT) |
| **En la escuela** | Conselho Tutelar + Secretaría de Educación |
| **En hospital/centro SUS** | Defensoría del SUS + Disque 136 |
| **En negocio/restaurante** | Procon SC (151) + BO |
| **En red social/internet** | Captura, BO online, denuncia en la propia plataforma |

> **Tenés derecho a ser oída/oído en tu lengua.** Tenés derecho a intérprete en cualquier atención estatal. Tenés derecho a trato digno.`,
          },
        },
      },
      {
        slug: "documentos-perdidos",
        order: 4,
        contactIds: ["policia-federal-floripa"],
        translations: {
          pt: {
            title: "Documentos perdidos ou roubados",
            summary:
              "Passos pra registrar BO, emitir 2ª via de CRNM e CPF, e acionar consulado se for passaporte.",
            body: `**Perdeu seus documentos ou foi roubada/roubado? Aja rápido pra evitar fraude no seu nome.** Cada documento tem um processo próprio — siga na ordem abaixo.

## Passo 1: registre boletim de ocorrência (BO)

**Faça primeiro de tudo.** O BO é exigido pra emitir 2ª via na maioria dos órgãos.

- **BO online**: site da Polícia Civil de SC ([pc.sc.gov.br](https://www.pc.sc.gov.br)). Vale pra perda/extravio (sem violência).
- **BO presencial**: qualquer delegacia, atendimento gratuito.

Anote o **número do BO** — você vai usar várias vezes.

## Passo 2: emita 2ª via de cada documento

### CPF

- **Online** pelo site da Receita Federal ou pelo app gov.br.
- Praticamente **instantâneo** se você lembra o número (consulta pelo nome também).
- **Gratuito.**

### CRNM (Carteira de Registro Nacional Migratório)

- Vá à **Polícia Federal**, agendamento obrigatório por gov.br/pf.
- Leve: **BO da perda/roubo**, passaporte (ou cópia), comprovante de residência, **GRU paga** (~R$ 200).
- **Prazo: meses** até a CRNM física chegar. Você recebe protocolo provisório.

### Passaporte do seu país

- A **PF não emite** passaporte estrangeiro.
- Procure o **consulado do seu país** em Brasil (a maioria fica em Brasília, SP ou RJ).
- Alguns países permitem 2ª via online; outros pedem comparecimento.
- Custo e prazo variam por consulado.

### Cartão SUS

- Vá à **UBS** do seu bairro com qualquer documento de identificação. Reemissão na hora.

### Cartão do Passe Rápido

- **Bloqueie no app Consórcio Fênix** ou ligue pra eles imediatamente.
- Vá ao TICEN com BO e documento pra emitir nova via.
- **Saldo é recuperado** se o cartão estiver no seu nome com CPF.

### Cartões bancários

- **Bloqueie pelo app do banco** imediatamente — antes de tudo.
- Solicite 2ª via pelo app ou na agência.

## Passo 3: vigie por fraude

Por 6 meses, **monitore**:

- **Score de crédito** no Serasa (gratuito).
- **CPF**: consulta de débitos no site da Receita Federal.
- **Conta bancária**: extrato semanal.

Se aparecer movimento estranho, **bloqueie e notifique o banco** na hora.

> **Dica preventiva pra antes da próxima vez:** tire foto de TODOS os documentos e salve em **2 lugares** (e-mail + nuvem). Em caso de perda, agiliza muito recuperar — você terá os números e detalhes em mãos.`,
          },
          es: {
            title: "Documentos perdidos o robados",
            summary:
              "Pasos para hacer BO, emitir 2ª vía de CRNM y CPF, y accionar consulado si es el pasaporte.",
            body: `**¿Perdiste tus documentos o te los robaron? Actuá rápido para evitar fraudes a tu nombre.** Cada documento tiene un proceso propio — seguí el orden abajo.

## Paso 1: hacé denuncia (BO – Boletim de Ocorrência)

**Hacelo primero que todo.** El BO es exigido para emitir 2ª vía en la mayoría de los organismos.

- **BO online**: sitio de la Policía Civil de SC ([pc.sc.gov.br](https://www.pc.sc.gov.br)). Vale para pérdida/extravío (sin violencia).
- **BO presencial**: cualquier comisaría, atención gratuita.

Anotá el **número del BO** — vas a usarlo varias veces.

## Paso 2: emití 2ª vía de cada documento

### CPF

- **Online** por el sitio de la Receita Federal o por la app gov.br.
- Prácticamente **instantáneo** si recordás el número (también se consulta por nombre).
- **Gratis.**

### CRNM (Cédula de Registro Nacional Migratorio)

- Andá a la **Policía Federal**, agendamiento obligatorio por gov.br/pf.
- Llevá: **BO de la pérdida/robo**, pasaporte (o copia), comprobante de domicilio, **GRU pagada** (~R$ 200).
- **Plazo: meses** hasta que la CRNM física llegue. Recibís protocolo provisorio.

### Pasaporte de tu país

- La **PF no emite** pasaporte extranjero.
- Andá al **consulado de tu país** en Brasil (la mayoría está en Brasilia, SP o RJ).
- Algunos países permiten 2ª vía online; otros piden comparecimiento.
- Costo y plazo varían por consulado.

### Tarjeta SUS

- Andá a la **UBS** de tu barrio con cualquier documento de identificación. Reemisión en el momento.

### Tarjeta del Passe Rápido

- **Bloqueala en la app Consórcio Fênix** o llamalos inmediatamente.
- Andá al TICEN con BO y documento para emitir nueva tarjeta.
- **El saldo se recupera** si la tarjeta está a tu nombre con CPF.

### Tarjetas bancarias

- **Bloqueá por la app del banco** inmediatamente — antes que nada.
- Solicitá 2ª vía por la app o en la sucursal.

## Paso 3: vigilá por fraude

Por 6 meses, **monitoreá**:

- **Score de crédito** en Serasa (gratis).
- **CPF**: consulta de deudas en el sitio de la Receita Federal.
- **Cuenta bancaria**: resumen semanal.

Si aparece movimiento extraño, **bloqueá y notificá al banco** en el momento.

> **Tip preventivo para la próxima vez:** sacale foto a TODOS los documentos y guardalos en **2 lugares** (correo + nube). En caso de pérdida, agiliza mucho recuperar — vas a tener los números y detalles a mano.`,
          },
        },
      },
    ],
  },
];
