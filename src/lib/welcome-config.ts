/**
 * Configuração da página de boas-vindas (acessada pelo QR Code da apresentação).
 *
 * O formulário é NATIVO (no visual do site), mas envia as respostas para o
 * Google Forms por baixo dos panos — então tudo cai na mesma planilha, sem
 * precisar de backend, banco de dados ou autenticação.
 *
 * Se você recriar o formulário no Google (apagar/adicionar perguntas), os IDs
 * "entry.XXXX" abaixo podem mudar. Para descobrir os novos: abra o formulário
 * publicado, veja o código-fonte e procure por "entry." (ou peça para eu
 * extrair de novo a partir da URL).
 */

// URL pública do formulário (usada no link "abrir no Google Forms").
export const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSffs_bcZ81VqTRcwTWDcWOB_XhGlj2kjdXOqsVlxLbTZ7Itqw/viewform";

// Endpoint que recebe os envios (derivado da URL acima).
export const GOOGLE_FORM_ACTION = GOOGLE_FORM_URL.replace(
  "/viewform",
  "/formResponse",
);

// Mapeamento campo -> ID da pergunta no Google Forms.
export const GOOGLE_FORM_FIELDS = {
  name: "entry.366340186",
  email: "entry.121275218",
  phone: "entry.811564496",
  language: "entry.154772705",
  consent: "entry.1869454645",
} as const;

// Valor exato (igual à opção do Forms) enviado quando o consentimento é marcado.
export const GOOGLE_FORM_CONSENT_VALUE = "Sim";

// Opções de idioma — os VALORES precisam ser idênticos às opções no Google Forms.
// (o rótulo exibido é traduzido nos dicionários, mas o valor enviado é este)
export const GOOGLE_FORM_LANGUAGE_OPTIONS = [
  "Español",
  "Francês",
  "Inglês",
] as const;

// Valor especial do Google Forms quando se usa a opção "Outro" (com texto livre).
// Requer que a pergunta "Idioma" tenha o "Outro" de verdade ativado no Forms.
export const GOOGLE_FORM_OTHER_OPTION_VALUE = "__other_option__";
