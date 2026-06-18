/**
 * Checagem ao vivo de links de contatos.
 * Usa GET (não HEAD) e trata gov.br bloqueado como OK.
 *
 *   npm run bot:check-contacts
 */
import { describe, expect, it } from "vitest";
import { contacts } from "./contacts";
import { isReachable, probeUrl } from "@/lib/bot/probe-url";

const runLive = process.env.BOT_CHECK_LINKS === "1";

describe.skipIf(!runLive)("contact website links (live)", () => {
  const withWebsite = contacts.filter((c) => c.website);

  it("has contacts with websites to check", () => {
    expect(withWebsite.length).toBeGreaterThan(0);
  });

  for (const contact of withWebsite) {
    it(`${contact.id} → ${contact.website}`, async () => {
      const probe = await probeUrl(contact.website!);
      expect(
        isReachable(probe),
        probe.status === "dead"
          ? `dead: ${probe.error}`
          : `unexpected: ${JSON.stringify(probe)}`,
      ).toBe(true);
    });
  }
});
