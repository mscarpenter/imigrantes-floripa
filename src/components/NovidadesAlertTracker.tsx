"use client";

import { useEffect } from "react";
import { markNovidadesAlertSeen } from "@/lib/novidades-alert";

export function NovidadesAlertTracker() {
  useEffect(() => {
    markNovidadesAlertSeen();
  }, []);

  return null;
}
