export const NOVIDADES_ALERT_STORAGE_KEY = "hip-novidades-alert";

/** Bump when publishing new novidades to show the alert again. */
export const NOVIDADES_ALERT_VERSION = "1";

export const NOVIDADES_ALERT_SEEN_EVENT = "hip-novidades-seen";

export function hasSeenNovidadesAlert(): boolean {
  if (typeof window === "undefined") return true;
  try {
    return (
      localStorage.getItem(NOVIDADES_ALERT_STORAGE_KEY) ===
      NOVIDADES_ALERT_VERSION
    );
  } catch {
    return false;
  }
}

export function markNovidadesAlertSeen(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(
      NOVIDADES_ALERT_STORAGE_KEY,
      NOVIDADES_ALERT_VERSION,
    );
    window.dispatchEvent(new Event(NOVIDADES_ALERT_SEEN_EVENT));
  } catch {
    /* ignore */
  }
}
