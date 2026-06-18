import { describe, expect, it } from "vitest";
import {
  NOVIDADES_ALERT_STORAGE_KEY,
  NOVIDADES_ALERT_VERSION,
} from "./novidades-alert";

describe("novidades-alert", () => {
  it("exports stable storage key and version", () => {
    expect(NOVIDADES_ALERT_STORAGE_KEY).toBe("hip-novidades-alert");
    expect(NOVIDADES_ALERT_VERSION).toBeTruthy();
  });
});
