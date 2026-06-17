/**
 * Formulário de sugestões/correções (modal no aviso da página "Sobre").
 *
 * É um SEGUNDO Google Forms (separado do de contato), porque os campos são
 * diferentes: sugestão (texto longo) + nome + e-mail. As respostas caem numa
 * planilha — sem backend.
 *
 * Como ligar:
 *  1. Crie um Google Forms com 3 perguntas:
 *     - "Sua sugestão ou correção" (parágrafo)  -> obrigatória
 *     - "Nome" (resposta curta)                  -> opcional
 *     - "E-mail" (resposta curta)                -> opcional
 *  2. Publique e cole a URL (…/viewform) em FEEDBACK_FORM_URL.
 *  3. Me peça para extrair os IDs "entry.XXXX" (ou pegue no código-fonte do
 *     formulário) e preencha FEEDBACK_FORM_FIELDS.
 *
 * Enquanto FEEDBACK_FORM_URL estiver vazio, o modal mostra "em breve".
 */
export const FEEDBACK_FORM_URL: string = "";

export const FEEDBACK_FORM_ACTION = FEEDBACK_FORM_URL
  ? FEEDBACK_FORM_URL.replace("/viewform", "/formResponse")
  : "";

export const FEEDBACK_FORM_FIELDS = {
  suggestion: "entry.000000000",
  name: "entry.000000000",
  email: "entry.000000000",
} as const;

export const FEEDBACK_ENABLED = FEEDBACK_FORM_URL.trim().length > 0;
