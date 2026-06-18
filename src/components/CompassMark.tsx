"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface CompassMarkProps {
  className?: string;
  /** Gira suavemente conforme o scroll da página (respeita prefers-reduced-motion). */
  spinOnScroll?: boolean;
}

/** Ícone de bússola do FAB — agulha + aro. */
export function CompassMark({ className, spinOnScroll = false }: CompassMarkProps) {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (!spinOnScroll) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    let raf = 0;

    const update = () => {
      raf = 0;
      // ~360° a cada ~1400px de scroll
      setRotation(window.scrollY * 0.25);
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [spinOnScroll]);

  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden
      className={cn(spinOnScroll && "will-change-transform", className)}
      style={spinOnScroll ? { transform: `rotate(${rotation}deg)` } : undefined}
    >
      <circle
        cx="24"
        cy="24"
        r="17"
        stroke="currentColor"
        strokeWidth="3.2"
      />
      <polygon
        points="27.37,15.66 28.82,25.94 20.63,32.34 19.18,22.06"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
    </svg>
  );
}
