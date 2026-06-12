import { describe, expect, it } from "vitest";
import pt from "./dictionaries/pt.json";
import es from "./dictionaries/es.json";
import { keyDiff } from "@/test/flatten-keys";

describe("dictionary parity (pt ↔ es)", () => {
  it("has the same keys in pt.json and es.json", () => {
    const { onlyInLeft, onlyInRight } = keyDiff(pt, es);

    expect(
      { onlyInPt: onlyInLeft, onlyInEs: onlyInRight },
      "dictionary keys must match between locales",
    ).toEqual({ onlyInPt: [], onlyInEs: [] });
  });
});
