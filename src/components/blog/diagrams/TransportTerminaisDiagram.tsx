import { DiagramFrame } from "./DiagramFrame";
import { cn } from "@/lib/utils";

/** Posições projetadas a partir de lat/lon (referência OSM / Consórcio Fênix). */
const TERMINALS = [
  {
    id: "TICAN",
    label: "Canasvieiras",
    x: 86,
    y: 8,
    hub: false,
  },
  {
    id: "TISAN",
    label: "Santo Antônio",
    x: 40,
    y: 34,
    hub: false,
  },
  {
    id: "TITRI",
    label: "Trindade / UFSC",
    x: 42,
    y: 62,
    hub: false,
  },
  {
    id: "TICEN",
    label: "Hub principal · Centro",
    x: 14,
    y: 66,
    hub: true,
  },
  {
    id: "TILAG",
    label: "Lagoa da Conceição",
    x: 84,
    y: 68,
    hub: false,
  },
  {
    id: "TIRIO",
    label: "Rio Tavares",
    x: 62,
    y: 93,
    hub: false,
  },
] as const;

function TerminalPin({
  id,
  label,
  x,
  y,
  hub,
}: (typeof TERMINALS)[number]) {
  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      <div
        className={cn(
          "flex flex-col items-center gap-1",
          y < 20 ? "flex-col-reverse" : "flex-col",
        )}
      >
        <span
          className={cn(
            "whitespace-nowrap rounded-md px-2 py-0.5 text-[10px] font-bold text-white shadow-sm sm:text-xs",
            hub ? "bg-warm" : "bg-primary",
          )}
        >
          {id}
        </span>
        <span
          className={cn(
            "flex items-center justify-center rounded-full border-[3px] border-white font-bold text-white shadow-md",
            hub ? "size-10 bg-warm text-xs" : "size-8 bg-primary text-[10px]",
          )}
          aria-hidden
        >
          TI
        </span>
        <span className="max-w-[5.5rem] text-center text-[10px] leading-tight text-muted-foreground sm:max-w-none sm:text-xs">
          {label}
        </span>
      </div>
    </div>
  );
}

export function TransportTerminaisDiagram({ caption }: { caption?: string }) {
  return (
    <DiagramFrame
      title="Os 6 terminais de integração"
      subtitle="Mapa ilustrativo com posições aproximadas (referência: OpenStreetMap)."
      caption={caption}
    >
      <div className="relative mx-auto aspect-[4/3] w-full max-w-2xl">
        {/* Continente */}
        <div
          className="absolute bottom-[8%] left-0 top-[12%] w-[14%] rounded-l-lg border border-border/40 bg-muted/80"
          aria-hidden
        >
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 text-[10px] font-semibold text-muted-foreground sm:text-xs">
            Continente
          </span>
        </div>

        {/* Ilha (SVG simplificado) */}
        <svg
          viewBox="0 0 820 580"
          className="absolute inset-0 ml-[12%] h-full w-[88%]"
          aria-hidden
        >
          <path
            d="M0 20
               C50 0, 140 -8, 250 0
               C370 8, 510 28, 650 55
               C710 68, 750 110, 740 170
               C730 240, 690 300, 610 350
               C530 400, 430 430, 320 440
               C220 448, 120 440, 60 410
               C30 395, 15 350, 8 290
               C2 230, 0 170, 0 110
               Z"
            className="fill-primary/10 stroke-primary"
            strokeWidth="2.5"
          />
          <path
            d="M450 45 C510 55, 570 95, 590 155 C600 195, 570 235, 520 250 C480 258, 440 230, 420 180 C405 135, 420 75, 450 45 Z"
            className="fill-[#fbf8f4] stroke-primary/40"
            strokeWidth="1.2"
          />
          {/* Pontes */}
          <rect x="0" y="195" width="36" height="7" rx="2" className="fill-warm" opacity="0.9" />
          <rect x="0" y="210" width="36" height="7" rx="2" className="fill-warm" opacity="0.65" />
        </svg>

        <span className="absolute left-[58%] top-[2%] text-[10px] font-semibold text-primary/50 sm:text-xs">
          Norte da Ilha
        </span>
        <span className="absolute bottom-[4%] left-[48%] text-[10px] font-semibold text-primary/50 sm:text-xs">
          Sul da Ilha
        </span>

        <div className="absolute inset-0 ml-[12%] w-[88%]">
          {TERMINALS.map((t) => (
            <TerminalPin key={t.id} {...t} />
          ))}
        </div>
      </div>

      {/* Legenda + lista mobile-friendly */}
      <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 rounded-xl border border-border/60 bg-card px-4 py-3 text-xs text-muted-foreground sm:text-sm">
        <span className="inline-flex items-center gap-2">
          <span className="size-3 rounded-full bg-primary" aria-hidden />
          Terminal de integração
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="size-3.5 rounded-full bg-warm" aria-hidden />
          TICEN (hub principal)
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-1.5 w-5 rounded-sm bg-warm" aria-hidden />
          Pontes Centro / Continente
        </span>
      </div>

      <ul className="mt-4 grid gap-2 sm:grid-cols-2 md:hidden">
        {TERMINALS.map((t) => (
          <li
            key={t.id}
            className="flex items-center gap-2 rounded-lg border border-border/50 bg-card px-3 py-2 text-sm"
          >
            <span
              className={cn(
                "rounded-md px-1.5 py-0.5 text-xs font-bold text-white",
                t.hub ? "bg-warm" : "bg-primary",
              )}
            >
              {t.id}
            </span>
            <span className="text-muted-foreground">{t.label}</span>
          </li>
        ))}
      </ul>
    </DiagramFrame>
  );
}
