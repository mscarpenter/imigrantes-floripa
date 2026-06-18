import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

interface FlagProps {
  locale: Locale;
  className?: string;
}

export function Flag({ locale, className }: FlagProps) {
  const base = cn("inline-block overflow-hidden rounded-[2px]", className);
  switch (locale) {
    case "pt":
      return <BrazilFlag className={base} />;
    case "es":
      // Espanhol latino-americano — sem bandeira de um país específico.
      return <SpanishAmericasIcon className={base} />;
    case "fr":
      return <FranceFlag className={base} />;
    case "en":
      return <UkFlag className={base} />;
  }
}

function BrazilFlag({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 720 504"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={className}
    >
      <rect width="720" height="504" fill="#009c3b" />
      <polygon points="360,42 678,252 360,462 42,252" fill="#ffdf00" />
      <circle cx="360" cy="252" r="100" fill="#002776" />
      <path
        d="M260,232 Q360,180 460,232 L460,242 Q360,194 260,242 Z"
        fill="#ffffff"
      />
    </svg>
  );
}

/** Globo com destaque nas Américas — espanhol da América do Sul, não da Espanha. */
function SpanishAmericasIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={className}
    >
      <circle cx="16" cy="16" r="16" fill="#2b8fd4" />
      <circle cx="16" cy="16" r="15.5" fill="none" stroke="#1a6fa8" strokeWidth="0.5" />
      {/* América do Sul (silhueta simplificada) */}
      <path
        fill="#4caf50"
        d="M19.5 7.5c2.2 1.2 3.8 3.4 4.2 5.8.5 2.8-.2 5.6-1.8 7.8-1.4 1.8-3.4 3.2-5.6 3.6-2 .4-3.8-.4-5-1.8-1.4-1.6-2-3.8-1.6-6 .4-2.2 1.8-4.2 3.8-5.4 1.2-.8 2.6-1.2 4-1z"
      />
      {/* América Central / México (pequeno, à esquerda) */}
      <path
        fill="#66bb6a"
        d="M11 10.5c.8-.2 1.6.2 2 1 .3.6.2 1.4-.3 1.9-.6.6-1.5.8-2.3.5-.7-.3-1.2-1-1.1-1.8.1-.4.4-.8.7-1.1z"
      />
      {/* Paralelos do globo */}
      <ellipse
        cx="16"
        cy="16"
        rx="14"
        ry="5"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.25"
        strokeWidth="0.6"
      />
      <ellipse
        cx="16"
        cy="16"
        rx="14"
        ry="9"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.15"
        strokeWidth="0.5"
      />
    </svg>
  );
}

function FranceFlag({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 900 600"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={className}
    >
      <rect width="300" height="600" fill="#002395" />
      <rect x="300" width="300" height="600" fill="#ffffff" />
      <rect x="600" width="300" height="600" fill="#ed2939" />
    </svg>
  );
}

function UkFlag({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 30"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={className}
    >
      <rect width="60" height="30" fill="#012169" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#ffffff" strokeWidth="6" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="2" />
      <path d="M30,0 V30 M0,15 H60" stroke="#ffffff" strokeWidth="10" />
      <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  );
}
