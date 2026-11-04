A fazer

**01 - Business Model Canva**: /home/mateus/imigrantes-floripa/PMI III/01-BMC.pdf 
**02 - Matriz de Prioridade**: /home/mateus/imigrantes-floripa/PMI III/02-prioriazacao.pdf
**03 - Transformando BMC em Requisitos**: PMI III/03-transformando-BMC-em-requisitos.pdf
**04 - Elicitacao Requisitos**: PMI III/05-requisitos-de-software.pdf
**5 - Documento de Especificação de Requisitos de Software**: /home/mateus/imigrantes-floripa/PMI III/05-doc-requisitos-de-software.pdf
**06 -Revisão de Requisitos e Planejamento Scrum**: [text](06-revisão-requisitos-e-planejamento-scrum.pdf)
**07 - Diagramas UML**: (selecionar diagramas)
**08 - Template RNF - ISO**: [text](<Template RNF - ISO 25010.pdf>)
**Sprint1**: /home/mateus/imigrantes-floripa/PMI III/Template_Sprint1_ADS31.docx
**Sprint2**: [text](Template_Sprint2_ADS31.docx)
**PLUS**: /home/mateus/imigrantes-floripa/PMI III/plus-economia-comportamental.pdf

Link figjam (Page 2 - PIE III): https://www.figma.com/board/v6zp26CFVopsAUUyw5tIVx/Projeto-Imigrantes?node-id=212-1885&t=jumXm6tGdl7hf5io-1 

Sessoes importantes do figjam:

Ideação: rascunho com perguntas e respostas sobre o projeto, ainda em fase de consolidação
Modelo BMC: Incompleto, deixei post it para completar, usar material base pára o desenvolvimento 
Priorização: Não foi feito nada sobre ainda, há material para desenvolvimento
Web: Tem os rascunhos que fiz para versão web
App: Rascunhos que fiz para o app

Obs: Desenhei ambas as telas para termos com o que traqbalhar, ainda precisamos consolidar a etapa de ideação e depois seguir com o todo na ordem estabelecida. Como é bastante coisa, faremos por partes 

## Desenvolvimento/Ideação

**Ponto de partida:** 

Pensar no ecossistema da extensão Universitária,  no que compreende-se como uma ação diretamente na sociedade.
”A universidade deve atuar diretamente na sociedade porque sua função social é transformarn conhecimento em desenvolvimento humano e social. A extensão aproxima ensino e pesquisa da realidade, valoriza os saberes da comunidade, forma profissionais  éticos e constrói soluções com as pessoas e não apenas pra elas”

O portal do Projeto Imigrantes veio como uma ideia de centralizar informações fundamentais para recém chegados (guias de documentação e contatos) + apresentação com guia de aplicativos desenvolvido pelo grupo responsável.

A curadoria final foi feita por mim, tanto da apresentação tanto quanto do portal. Notamos que após o primeiro dia de apresentação, os participantes demonstraram mais interesse por capacitações para o mercado de trabalho, alem de receberam ajuda com os aplicativos do .GOV e questões relacionadas a CPF, tanto quanto questoes de validação de diploma - serviço que o Circulos de Hospitalidade faz  
Para o segundo dia de apresentação formulei as seguintes ideias: 
- Cursos Gratuitos que não exigem CPF e possuí trilhas de cursos em diversos idiomas (Microsoft Learn)
- Cursos Gratuitos que exigem CPF (Fundação Bradesco)
- Cruzei informações de contato com dados de Geolocalização da cidade de Florianópolis 
- Adicionei um cadastro de coleta de informações dos participantes
- Expandi a gama de linguas com a lib i18n/JS (não cobre todas as informações do site. Ex: Blog) 

OBS: A pesquisa e disponibilidade de cursos é atualizada a partir de Workflows no github: https://github.com/mscarpenter/imigrantes-floripa/actions 

Considerações: Novo layout para a versão web esta sendo desenvolvida/simplificado, pois teremos tambem uma versão mobile. A ideia é captação e trackeamento online para o app chegar nos imigrantes através de pesquisa no google, por isso também pensamos na ideia do blog para alcance nas buscas de keywords relacionadas ao projeto.

Importante porem não urgente (considerar incluir na matriz de priorização): Desenvolvimento de conteúdo com foco em SEO, branding, voz e personalidade 

IMPORTANTE: criação de nova branch para a versão web. A versão mobile sera feita a parte na Android IDE para desenvolvimento automatizado com frameworks disponiveis para criação do prototipo, avaliar criação de um novo repo para a versão mobile ou se fazemos monorepo 