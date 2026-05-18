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
        body: `Para acessar quase qualquer serviço no Brasil (banco, escola, posto de saúde, trabalho formal), você vai precisar de pelo menos **dois documentos**: o CPF e a CRNM. A Carteira de Trabalho, por sua vez, hoje é digital e dispensa filas.

Cada tópico abaixo cobre um documento em detalhe. **Comece pelo CPF** — ele é exigido em quase todos os outros passos, inclusive na emissão da CRNM. Sem CPF, você trava.`,
      },
      es: {
        title: "Documentos esenciales",
        summary:
          "Los primeros documentos que necesitás sacar al llegar: CPF, CRNM y CTPS.",
        body: `Para acceder a casi cualquier servicio en Brasil (banco, escuela, centro de salud, trabajo formal), vas a necesitar por lo menos **dos documentos**: el CPF y la CRNM. La Libreta de Trabajo, por su lado, hoy es digital y evita filas.

Cada tema debajo cubre un documento en detalle. **Empezá por el CPF** — lo van a pedir en casi todos los otros pasos, incluso para emitir la CRNM. Sin CPF, te trabás.`,
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
            body: `## O que é

O CPF é o seu número de identificação fiscal no Brasil. Sem ele, você não consegue abrir conta em banco, assinar contrato formal, comprar com nota fiscal ou acessar serviços públicos online.

É o **primeiro documento** que um migrante deve tirar ao chegar.

## Onde tirar

- **Receita Federal:** agências espalhadas pela cidade. Atendimento gratuito. Em Florianópolis, fica no centro (Rua Felipe Schmidt, 235).
- **Parceiros credenciados:** Caixa Econômica, Banco do Brasil e Correios também emitem. Cobram uma taxa pequena (em torno de R$ 7).

## O que levar

- Passaporte ou documento de identidade do seu país.
- Comprovante de endereço, mesmo provisório (pode ser declaração de hospedagem assinada).

Se você não tiver comprovante, é possível assinar uma autodeclaração no momento.

## Custo

- **Receita Federal:** gratuito.
- **Parceiros:** cerca de R$ 7.

## Depois de tirar

Você recebe o número na hora. Salve no celular e tire foto do papel — vai precisar todo dia.`,
          },
          es: {
            title: "CPF (Catastro de Persona Física)",
            summary:
              "Documento de identificación fiscal. Gratis y obligatorio para casi todo.",
            body: `## Qué es

El CPF es tu número de identificación fiscal en Brasil. Sin él, no podés abrir cuenta en banco, firmar contrato formal, comprar con factura ni acceder a servicios públicos online.

Es el **primer documento** que un migrante debe sacar al llegar.

## Dónde sacarlo

- **Receita Federal:** agencias distribuidas por la ciudad. Atención gratuita. En Florianópolis está en el centro (Rua Felipe Schmidt, 235).
- **Socios habilitados:** Caixa Econômica, Banco do Brasil y Correios también emiten. Cobran una tasa pequeña (alrededor de R$ 7).

## Qué llevar

- Pasaporte o documento de identidad de tu país.
- Comprobante de domicilio, incluso provisorio (puede ser una declaración firmada de quien te hospeda).

Si no tenés comprobante, podés firmar una autodeclaración en el momento.

## Costo

- **Receita Federal:** gratis.
- **Socios:** alrededor de R$ 7.

## Después de sacarlo

Recibís el número en el momento. Guardalo en el celular y sacale foto al papel — lo vas a necesitar todos los días.`,
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
            body: `## O que é

A CRNM (antiga RNE) é a sua identidade oficial como migrante no Brasil. Funciona como o RG dos brasileiros — você usa em bancos, hospitais, viagens, contratos.

Pra solicitar, você precisa **já ter um visto válido ou um protocolo de solicitação de refúgio**. Sem isso, a Polícia Federal não emite.

## Antes de ir à PF

1. **Agende** pelo site da Polícia Federal (gov.br/pf). Atendimento sem agendamento prévio não acontece.
2. **Pague a GRU** (Guia de Recolhimento da União). O valor fica entre R$ 200 e R$ 300, dependendo do caso. Pague num banco ou pela internet.
3. **Reúna os documentos** abaixo antes de sair de casa.

## O que levar

- Passaporte original.
- Comprovante de residência atualizado.
- Foto 3x4 recente.
- Comprovante de pagamento da GRU.
- Documentos específicos do seu tipo de visto (trabalho, refúgio, reunião familiar, etc.).

Refugiados levam também o protocolo do CONARE.

## Onde fica

Delegacia da PF de Florianópolis: Avenida Gov. Gustavo Richard, 367 — Centro. Atendimento exclusivo com agendamento.

## Prazo de entrega

A CRNM física pode demorar **meses** pra chegar. Enquanto isso, você recebe um **protocolo provisório** que vale como documento oficial — guarde com cuidado.

## Renovação

Renovação periódica (geralmente 9 anos pra residentes permanentes, prazos menores em outros casos). Fique de olho na validade.`,
          },
          es: {
            title: "CRNM (Cédula de Registro Nacional Migratorio)",
            summary:
              "Tu documento oficial de identidad como migrante en Brasil. Reemplaza la antigua RNE.",
            body: `## Qué es

La CRNM (antigua RNE) es tu identidad oficial como migrante en Brasil. Funciona como el DNI de los brasileños — la usás en bancos, hospitales, viajes, contratos.

Para solicitarla, necesitás **ya tener una visa válida o un protocolo de solicitud de refugio**. Sin eso, la Policía Federal no la emite.

## Antes de ir a la PF

1. **Agendá** por el sitio de la Policía Federal (gov.br/pf). Atención sin agendamiento previo no se da.
2. **Pagá la GRU** (Guía de Recaudación de la Unión). El valor está entre R$ 200 y R$ 300, depende del caso. Pagás en un banco o por internet.
3. **Juntá los documentos** abajo antes de salir de casa.

## Qué llevar

- Pasaporte original.
- Comprobante de domicilio actualizado.
- Foto 3x4 reciente.
- Comprobante de pago de la GRU.
- Documentos específicos según tu tipo de visa (trabajo, refugio, reunificación familiar, etc.).

Los refugiados también llevan el protocolo del CONARE.

## Dónde queda

Delegación de la PF de Florianópolis: Avenida Gov. Gustavo Richard, 367 — Centro. Atención exclusiva con agendamiento.

## Plazo de entrega

La CRNM física puede tardar **meses** en llegar. Mientras tanto, recibís un **protocolo provisorio** que vale como documento oficial — guardalo con cuidado.

## Renovación

Renovación periódica (generalmente 9 años para residentes permanentes, plazos menores en otros casos). Estate atento al vencimiento.`,
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
            body: `## O que é

A CTPS Digital substitui a antiga carteira de papel azul. Hoje tudo é registrado digitalmente: contratações, demissões, salários, férias, FGTS. **Você não precisa mais carregar nada físico.**

## Como ter a sua

1. **Tire o CPF primeiro** (veja o tópico anterior). A CTPS Digital usa o CPF como número de identificação.
2. **Crie ou acesse sua conta gov.br** (gov.br/govbr).
3. **Baixe o app Carteira de Trabalho Digital** (Android ou iOS) ou acesse pelo navegador em servicos.mte.gov.br.
4. **Faça login com sua conta gov.br** — a carteira já fica disponível.

Pronto. Sem fila, sem deslocamento, sem taxa.

## O que dá pra fazer no app

- Ver seu histórico de empregos.
- Acompanhar contratações e demissões (aparecem automaticamente quando o empregador registra).
- Conferir salários e datas.
- Solicitar seguro-desemprego.
- Ver saldo do FGTS (via integração com a Caixa).

## Sobre a conta gov.br

A conta gov.br é a chave pra quase tudo no governo brasileiro. Vale criar **mesmo antes de ter CTPS**, porque você vai usar pra Receita Federal, SUS, INSS e outros.

Pra criar precisa de CPF, e-mail e celular. Há níveis de verificação (bronze, prata, ouro) — quanto mais alto o nível, mais serviços você acessa.`,
          },
          es: {
            title: "CTPS Digital (Libreta de Trabajo)",
            summary:
              "Libreta de trabajo 100% digital y gratuita. No tenés que ir a ningún lado.",
            body: `## Qué es

La CTPS Digital reemplaza la antigua libreta de papel azul. Hoy todo se registra digitalmente: contrataciones, despidos, salarios, vacaciones, FGTS. **Ya no tenés que cargar nada físico.**

## Cómo obtenerla

1. **Sacá el CPF primero** (mirá el tema anterior). La CTPS Digital usa el CPF como número de identificación.
2. **Creá o accedé a tu cuenta gov.br** (gov.br/govbr).
3. **Descargá la app Carteira de Trabalho Digital** (Android o iOS) o accedé por el navegador en servicos.mte.gov.br.
4. **Iniciá sesión con tu cuenta gov.br** — la libreta queda disponible.

Listo. Sin fila, sin viaje, sin tasa.

## Qué se puede hacer en la app

- Ver tu historial de empleos.
- Seguir contrataciones y despidos (aparecen automáticamente cuando el empleador los registra).
- Consultar salarios y fechas.
- Solicitar seguro de desempleo.
- Ver saldo del FGTS (vía integración con Caixa).

## Sobre la cuenta gov.br

La cuenta gov.br es la llave para casi todo en el gobierno brasileño. Vale crearla **incluso antes de tener CTPS**, porque la vas a usar para Receita Federal, SUS, INSS y otros.

Para crearla necesitás CPF, correo y celular. Hay niveles de verificación (bronce, plata, oro) — cuanto más alto el nivel, más servicios accedés.`,
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
        body: `O transporte público de Florianópolis é feito principalmente por **ônibus**, operado pelo Consórcio Fênix. A cidade tem **6 terminais de integração** que permitem trocar de linha sem pagar tarifa nova.

Os tópicos abaixo explicam como tirar e recarregar o cartão Passe Rápido, quem tem direito à tarifa social, e quais aplicativos ajudam a se virar no dia a dia.

Em horários de pico (07:00–09:00 e 17:00–19:00) o trânsito fica pesado, sobretudo no centro — planeje com folga.`,
      },
      es: {
        title: "Transporte público",
        summary:
          "Colectivos, integración y cómo conseguir la tarjeta Passe Rápido en Florianópolis.",
        body: `El transporte público de Florianópolis es principalmente por **colectivos (ônibus)**, operado por el Consorcio Fênix. La ciudad tiene **6 terminales de integración** que permiten cambiar de línea sin pagar tarifa nueva.

Los temas debajo explican cómo sacar y recargar la tarjeta Passe Rápido, quién tiene derecho a la tarifa social, y qué apps ayudan en el día a día.

En horas pico (07:00–09:00 y 17:00–19:00) el tránsito es pesado, sobre todo en el centro — planeá con margen.`,
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
            body: `## O que é

O Passe Rápido é o cartão de transporte público de Florianópolis. Você passa o cartão no ônibus e desconta a tarifa.

Quem paga com cartão tem **tarifa mais barata** que quem paga em dinheiro no ônibus. Vale a pena tirar logo, mesmo se você usa pouco transporte público.

## Onde tirar

- **Terminal de Integração do Centro (TICEN):** posto principal, com várias guichês.
- **Outros terminais e pontos credenciados** espalhados pela cidade.

Leve um documento com foto e o CPF. O cartão é emitido na hora.

## Como recarregar

- **Nos terminais** de integração.
- **Em casas lotéricas** espalhadas pela cidade.
- **Pelo aplicativo Consórcio Fênix** (recarga via Pix ou cartão de crédito).

Não dá pra recarregar dentro do ônibus.

## Integração entre linhas

Uma das vantagens do sistema: você pode trocar de linha em qualquer um dos 6 terminais de integração **sem pagar tarifa nova**, dentro de um intervalo de tempo. Útil para trajetos longos com baldeação.

## Cuidados

- Tem um cartão pra **cada pessoa**: não dá pra dois passageiros usarem o mesmo cartão no mesmo ônibus.
- Se você perder, o saldo só é recuperado se o cartão estiver no seu nome (com CPF) e você bloquear rapidinho.`,
          },
          es: {
            title: "Tarjeta Passe Rápido",
            summary:
              "Cómo sacar y recargar la tarjeta del colectivo. Pagar con tarjeta sale más barato.",
            body: `## Qué es

La Passe Rápido es la tarjeta del transporte público de Florianópolis. Pasás la tarjeta en el colectivo y se descuenta la tarifa.

Quien paga con tarjeta tiene **tarifa más barata** que quien paga en efectivo. Vale la pena sacarla rápido, incluso si usás poco el transporte.

## Dónde sacarla

- **Terminal de Integración del Centro (TICEN):** punto principal, con varias ventanillas.
- **Otros terminales y puntos habilitados** distribuidos por la ciudad.

Llevá un documento con foto y el CPF. La tarjeta se emite en el momento.

## Cómo recargar

- **En los terminales** de integración.
- **En casas lotéricas** distribuidas por la ciudad.
- **Por la app Consórcio Fênix** (recarga vía Pix o tarjeta de crédito).

No se puede recargar dentro del colectivo.

## Integración entre líneas

Una de las ventajas del sistema: podés cambiar de línea en cualquiera de los 6 terminales de integración **sin pagar tarifa nueva**, dentro de un intervalo de tiempo. Útil para trayectos largos con trasbordo.

## Cuidados

- Hay una tarjeta **por persona**: no podés pasar dos pasajeros con la misma tarjeta en el mismo colectivo.
- Si la perdés, el saldo solo se recupera si la tarjeta está a tu nombre (con CPF) y la bloqueás rápido.`,
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
            body: `## Quem tem direito

Pessoas em situação de baixa renda, com cadastro atualizado no **CadÚnico**, podem se inscrever no programa **Passe Rápido Social**. Dependendo do perfil, a tarifa fica **reduzida pela metade ou totalmente gratuita**.

Pessoas com deficiência, idosos (acima de 65 anos) e estudantes também têm benefícios próprios, com regras diferentes.

## Pré-requisito: ter o CadÚnico

O CadÚnico é o cadastro federal de famílias de baixa renda. Sem ele, não tem como solicitar a tarifa social.

Pra se cadastrar:

1. Vá ao **CRAS** mais próximo da sua casa.
2. Leve documentos de todos os membros da família (CPF, comprovante de residência, comprovante de renda mesmo que informal).
3. O cadastro fica pronto e te dá acesso ao Bolsa Família, tarifa social de água/luz/transporte, entre outros benefícios.

## Como solicitar a tarifa social do transporte

Depois de cadastrado no CadÚnico:

1. Vá a um posto de atendimento do **Consórcio Fênix** (TICEN é o principal).
2. Leve seu cartão Passe Rápido (ou tire um na hora) e o número da sua família no CadÚnico.
3. A redução é aplicada ao seu cartão.

## Renovação

O benefício precisa ser **renovado periodicamente** — fique de olho no prazo. Se o seu CadÚnico desatualizar, você perde o benefício até atualizar de novo.`,
          },
          es: {
            title: "Tarifa social (Passe Rápido Social)",
            summary:
              "Tarifa reducida o gratuita para familias de bajos ingresos registradas en el CadÚnico.",
            body: `## Quién tiene derecho

Personas en situación de bajos ingresos, con registro actualizado en el **CadÚnico**, pueden inscribirse en el programa **Passe Rápido Social**. Según el perfil, la tarifa queda **reducida a la mitad o totalmente gratuita**.

Personas con discapacidad, adultos mayores (más de 65 años) y estudiantes también tienen beneficios propios, con reglas diferentes.

## Requisito previo: tener el CadÚnico

El CadÚnico es el registro federal de familias de bajos ingresos. Sin él, no se puede solicitar la tarifa social.

Para registrarse:

1. Andá al **CRAS** más cercano a tu casa.
2. Llevá documentos de todos los miembros de la familia (CPF, comprobante de domicilio, comprobante de ingresos aunque sea informal).
3. El registro queda listo y te da acceso a Bolsa Família, tarifa social de agua/luz/transporte, entre otros beneficios.

## Cómo solicitar la tarifa social del transporte

Después de registrado en el CadÚnico:

1. Andá a un puesto de atención del **Consórcio Fênix** (TICEN es el principal).
2. Llevá tu tarjeta Passe Rápido (o sacá una en el momento) y el número de tu familia en el CadÚnico.
3. La reducción se aplica a tu tarjeta.

## Renovación

El beneficio necesita ser **renovado periódicamente** — estate atento al plazo. Si tu CadÚnico se desactualiza, perdés el beneficio hasta actualizarlo de nuevo.`,
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
            body: `## Pra achar linha e horário

- **Google Maps:** colocou origem e destino, ele mostra as linhas, horários previstos e onde descer. É o mais completo no dia a dia.
- **Moovit:** especializado em transporte público. Tem alertas em tempo real (atrasos, ônibus lotados) e dicas de outros usuários.

Os dois funcionam offline pra rotas já consultadas, mas precisam de internet pra horários atualizados.

## Pra recarregar e gerenciar o cartão

- **Consórcio Fênix (app oficial):** recarga via Pix ou cartão de crédito, consulta saldo, histórico de viagens, bloqueio em caso de perda.

## Dicas práticas

- **Salve seus trajetos comuns** (casa-trabalho, casa-escola) como favoritos no Maps ou Moovit. Em alguns minutos você confere o horário do próximo ônibus.
- **Cuidado com a bateria:** principalmente Moovit consome bateria com GPS ligado. Em viagens longas, vale ter um carregador portátil.
- **Wifi nos terminais:** TICEN tem wifi gratuito do Consórcio. Útil pra consultar rota antes de embarcar.`,
          },
          es: {
            title: "Apps útiles",
            summary:
              "Apps que ayudan a encontrar la línea correcta, ver horarios y recargar la tarjeta.",
            body: `## Para encontrar línea y horario

- **Google Maps:** ponés origen y destino, te muestra las líneas, horarios previstos y dónde bajar. Es el más completo en el día a día.
- **Moovit:** especializado en transporte público. Tiene alertas en tiempo real (atrasos, colectivos llenos) y consejos de otros usuarios.

Los dos funcionan offline para rutas ya consultadas, pero necesitan internet para horarios actualizados.

## Para recargar y gestionar la tarjeta

- **Consórcio Fênix (app oficial):** recarga vía Pix o tarjeta de crédito, consulta saldo, historial de viajes, bloqueo en caso de pérdida.

## Tips prácticos

- **Guardá tus trayectos comunes** (casa-trabajo, casa-escuela) como favoritos en Maps o Moovit. En unos minutos consultás el horario del próximo colectivo.
- **Cuidado con la batería:** sobre todo Moovit consume batería con el GPS prendido. En viajes largos, llevá un cargador portátil.
- **Wifi en los terminales:** TICEN tiene wifi gratuito del Consorcio. Útil para consultar ruta antes de embarcar.`,
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
