import { describe, expect, it } from "vitest";
import { pickBestTrustedUrl, trustScore } from "@/lib/bot/trusted-domains";

describe("trusted domain scoring", () => {
  it("prefers gov.br over generic sites", () => {
    const gov = trustScore("https://www.gov.br/pf/pt-br");
    const blog = trustScore("https://example.com/pf");
    expect(gov.score).toBeGreaterThan(blog.score);
  });

  it("blocks social networks as canonical targets", () => {
    expect(trustScore("https://facebook.com/foo").score).toBe(0);
  });

  it("picks best from a list", () => {
    const best = pickBestTrustedUrl([
      "https://random-blog.com/caritas",
      "https://www.sc.caritas.org.br",
      "https://caritas.org.br/regional-sul",
    ]);
    expect(best?.url).toContain("caritas");
    expect((best?.score ?? 0) >= 80).toBe(true);
  });
});
