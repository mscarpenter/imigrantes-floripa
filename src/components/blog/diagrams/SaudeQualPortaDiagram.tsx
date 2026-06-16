import { Phone } from "lucide-react";
import { DiagramFrame } from "./DiagramFrame";
import { cn } from "@/lib/utils";

interface CareLevelProps {
  badge: string;
  badgeClassName: string;
  title: string;
  severity: string;
  severityClassName: string;
  lines: [string, string];
}

function CareLevel({
  badge,
  badgeClassName,
  title,
  severity,
  severityClassName,
  lines,
}: CareLevelProps) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card p-4 sm:flex sm:items-center sm:gap-5 sm:p-5">
      <div
        className={cn(
          "mb-3 flex h-14 w-20 shrink-0 items-center justify-center rounded-xl text-xl font-bold text-white sm:mb-0",
          badgeClassName,
        )}
      >
        {badge}
      </div>
      <div className="min-w-0 flex-1 sm:max-w-[220px]">
        <p className="font-semibold text-foreground">{title}</p>
        <p className={cn("mt-0.5 text-sm font-medium", severityClassName)}>
          {severity}
        </p>
      </div>
      <div className="mt-3 min-w-0 flex-1 text-sm leading-relaxed text-muted-foreground sm:mt-0">
        <p>{lines[0]}</p>
        <p className="mt-1">{lines[1]}</p>
      </div>
    </div>
  );
}

export function SaudeQualPortaDiagram({ caption }: { caption?: string }) {
  return (
    <DiagramFrame
      title="Qual porta usar?"
      subtitle="Onde buscar atendimento no SUS, conforme a gravidade."
      caption={caption}
    >
      <div className="mb-4 flex gap-3 rounded-xl border border-primary/15 bg-primary/5 p-4">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <Phone className="size-5" aria-hidden />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-foreground">
            Na dúvida, ligue primeiro:
          </p>
          <p className="mt-0.5 text-sm leading-relaxed text-foreground/90">
            Alô Saúde Floripa ·{" "}
            <strong className="font-semibold">0800 333 3233</strong> · 24h ·
            português, espanhol e inglês
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <CareLevel
          badge="UBS"
          badgeClassName="bg-emerald-600"
          title="Unidade Básica de Saúde"
          severity="Rotina e prevenção"
          severityClassName="text-emerald-700"
          lines={[
            "Consultas, vacinas, receitas, pré-natal e crônicas.",
            "Porta de entrada e onde você se cadastra no SUS.",
          ]}
        />
        <CareLevel
          badge="UPA"
          badgeClassName="bg-amber-500"
          title="Unidade de Pronto Atendimento"
          severity="Urgência (sem risco imediato)"
          severityClassName="text-amber-700"
          lines={[
            "Febre alta, fratura, corte com pontos, dor forte.",
            "Aberta 24h; atende por gravidade, não por chegada.",
          ]}
        />
        <CareLevel
          badge="192"
          badgeClassName="bg-warm"
          title="SAMU / hospital mais próximo"
          severity="Emergência (risco de vida)"
          severityClassName="text-warm"
          lines={[
            "Dor no peito, falta de ar, sinais de AVC, acidente.",
            "Ligue 192 (gratuito, 24h) ou vá ao hospital.",
          ]}
        />
      </div>
    </DiagramFrame>
  );
}
