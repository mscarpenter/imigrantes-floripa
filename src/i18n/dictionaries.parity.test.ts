import { describe, expect, it } from "vitest";
import pt from "./dictionaries/pt.json";
import es from "./dictionaries/es.json";
import fr from "./dictionaries/fr.json";
import en from "./dictionaries/en.json";
import { keyDiff } from "@/test/flatten-keys";

const locales = { es, fr, en } as const;

describe("dictionary parity (all locales ↔ pt)", () => {
  for (const [code, dict] of Object.entries(locales)) {
    it(`has the same keys in pt.json and ${code}.json`, () => {
      const { onlyInLeft, onlyInRight } = keyDiff(pt, dict);

      expect(
        { onlyInPt: onlyInLeft, [`onlyIn${code}`]: onlyInRight },
        `dictionary keys must match between pt and ${code}`,
      ).toEqual({ onlyInPt: [], [`onlyIn${code}`]: [] });
    });
  }
});
