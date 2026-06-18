import { describe, expect, it } from "vitest";
import {
  buildWelcomeFormBody,
  isGoogleFormSuccessResponse,
  validateWelcomeSubmitInput,
} from "./welcome-submit";
import {
  GOOGLE_FORM_FIELDS,
  GOOGLE_FORM_NATIONALITY_OTHER,
} from "./welcome-config";

describe("welcome-submit", () => {
  it("builds body with nationality and consent", () => {
    const body = buildWelcomeFormBody({
      firstName: "Maria",
      lastName: "Silva",
      email: "maria@example.com",
      phone: "48999999999",
      language: "Español",
      nationality: "Brasil",
    });

    expect(body.get(GOOGLE_FORM_FIELDS.firstName)).toBe("Maria");
    expect(body.get(GOOGLE_FORM_FIELDS.nationality)).toBe("Brasil");
    expect(body.get(GOOGLE_FORM_FIELDS.consent)).toBe("Sim");
  });

  it("requires email", () => {
    expect(
      validateWelcomeSubmitInput({
        firstName: "A",
        lastName: "B",
        phone: "1",
        language: "Inglês",
        nationality: "Brasil",
      }),
    ).toBe("required");
  });

  it("requires nationality", () => {
    expect(
      validateWelcomeSubmitInput({
        firstName: "A",
        lastName: "B",
        email: "a@example.com",
        phone: "1",
        language: "Inglês",
        nationality: "",
      }),
    ).toBe("nationality");
  });

  it("sends other nationality via Google Forms other option", () => {
    const body = buildWelcomeFormBody({
      firstName: "A",
      lastName: "B",
      email: "a@example.com",
      phone: "1",
      language: "Francês",
      nationality: GOOGLE_FORM_NATIONALITY_OTHER,
      otherNationality: "País inventado",
    });

    expect(body.get(GOOGLE_FORM_FIELDS.nationality)).toBe(
      GOOGLE_FORM_NATIONALITY_OTHER,
    );
    expect(
      body.get(`${GOOGLE_FORM_FIELDS.nationality}.other_option_response`),
    ).toBe("País inventado");
  });

  it("detects Google Forms success page", () => {
    expect(
      isGoogleFormSuccessResponse(
        '<div class="vHW8K">Sua resposta foi registrada.</div>',
      ),
    ).toBe(true);
    expect(isGoogleFormSuccessResponse("<html>validation error</html>")).toBe(
      false,
    );
  });
});
