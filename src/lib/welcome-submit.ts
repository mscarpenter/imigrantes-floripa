import {
  GOOGLE_FORM_ACTION,
  GOOGLE_FORM_CONSENT_VALUE,
  GOOGLE_FORM_FIELDS,
  GOOGLE_FORM_LANGUAGE_OPTIONS,
  GOOGLE_FORM_NATIONALITY_OTHER,
  GOOGLE_FORM_OTHER_OPTION_VALUE,
} from "@/lib/welcome-config";

export type WelcomeSubmitInput = {
  firstName: string;
  lastName: string;
  email?: string;
  phone: string;
  language: string;
  otherLanguage?: string;
  nationality: string;
  otherNationality?: string;
};

const OTHER = "__other__";

export function buildWelcomeFormBody(input: WelcomeSubmitInput): URLSearchParams {
  const body = new URLSearchParams();
  body.append(GOOGLE_FORM_FIELDS.firstName, input.firstName.trim());
  body.append(GOOGLE_FORM_FIELDS.lastName, input.lastName.trim());
  body.append(GOOGLE_FORM_FIELDS.email, input.email!.trim());
  body.append(GOOGLE_FORM_FIELDS.phone, input.phone.trim());
  body.append(GOOGLE_FORM_FIELDS.consent, GOOGLE_FORM_CONSENT_VALUE);

  if (input.language === OTHER) {
    body.append(GOOGLE_FORM_FIELDS.language, GOOGLE_FORM_OTHER_OPTION_VALUE);
    body.append(
      `${GOOGLE_FORM_FIELDS.language}.other_option_response`,
      (input.otherLanguage ?? "").trim(),
    );
  } else {
    body.append(GOOGLE_FORM_FIELDS.language, input.language);
  }

  const nationalityValue =
    input.nationality === GOOGLE_FORM_NATIONALITY_OTHER
      ? (input.otherNationality ?? "").trim()
      : input.nationality;

  if (input.nationality === GOOGLE_FORM_NATIONALITY_OTHER) {
    body.append(GOOGLE_FORM_FIELDS.nationality, GOOGLE_FORM_NATIONALITY_OTHER);
    body.append(
      `${GOOGLE_FORM_FIELDS.nationality}.other_option_response`,
      nationalityValue,
    );
  } else {
    body.append(GOOGLE_FORM_FIELDS.nationality, nationalityValue);
  }

  return body;
}

export function validateWelcomeSubmitInput(
  input: WelcomeSubmitInput,
): string | null {
  if (
    !input.firstName.trim() ||
    !input.lastName.trim() ||
    !input.email?.trim() ||
    !input.phone.trim()
  ) {
    return "required";
  }
  if (
    !input.language ||
    (input.language === OTHER && !input.otherLanguage?.trim())
  ) {
    return "language";
  }
  if (
    !input.nationality ||
    (input.nationality === GOOGLE_FORM_NATIONALITY_OTHER &&
      !input.otherNationality?.trim())
  ) {
    return "nationality";
  }
  const allowedLanguages = [
    ...GOOGLE_FORM_LANGUAGE_OPTIONS,
    OTHER,
  ] as readonly string[];
  if (!allowedLanguages.includes(input.language)) {
    return "language";
  }
  return null;
}

const SUCCESS_MARKERS = [
  "Sua resposta foi registrada",
  "Your response has been recorded",
  "Tu respuesta se ha registrado",
  "Votre réponse a été enregistrée",
];

export function isGoogleFormSuccessResponse(html: string): boolean {
  return SUCCESS_MARKERS.some((marker) => html.includes(marker));
}

export async function submitWelcomeToGoogleForm(
  input: WelcomeSubmitInput,
): Promise<{ ok: true } | { ok: false; reason: string }> {
  const validationError = validateWelcomeSubmitInput(input);
  if (validationError) {
    return { ok: false, reason: validationError };
  }

  const body = buildWelcomeFormBody(input);
  const response = await fetch(GOOGLE_FORM_ACTION, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
    redirect: "follow",
  });

  const html = await response.text();
  if (response.ok && isGoogleFormSuccessResponse(html)) {
    return { ok: true };
  }

  return { ok: false, reason: `google_forms_${response.status}` };
}
