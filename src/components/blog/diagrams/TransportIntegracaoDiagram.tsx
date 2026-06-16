import { ArrowRight, Building2, Bus, Home } from "lucide-react";
import { DiagramFrame } from "./DiagramFrame";
import { cn } from "@/lib/utils";

function StepCard({
  icon: Icon,
  iconClassName,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>;
  iconClassName: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-1 flex-col rounded-2xl border border-border/60 bg-card p-4 sm:p-5">
      <div
        className={cn(
          "mb-3 flex size-12 items-center justify-center rounded-xl",
          iconClassName,
        )}
      >
        <Icon className="size-6" aria-hidden />
      </div>
      <p className="text-base font-bold text-foreground">{title}</p>
      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

function FlowArrow({ topLabel, bottomLabel }: { topLabel: string; bottomLabel: string }) {
  return (
    <div className="flex shrink-0 flex-col items-center justify-center gap-1 px-1 py-2 md:px-2 md:py-0">
      <span className="text-center text-xs font-semibold text-primary">
        {topLabel}
      </span>
      <ArrowRight
        className="size-5 text-primary md:rotate-0 rotate-90"
        aria-hidden
      />
      <span className="text-center text-xs font-semibold text-primary">
        {bottomLabel}
      </span>
    </div>
  );
}

export function TransportIntegracaoDiagram({ caption }: { caption?: string }) {
  return (
    <DiagramFrame
      title="Como funciona a integração"
      subtitle="Do seu bairro ao destino, pagando uma só passagem."
      caption={caption}
    >
      <div className="flex flex-col items-stretch md:flex-row md:items-center">
        <StepCard
          icon={Home}
          iconClassName="bg-primary/10 text-primary"
          title="Seu bairro"
          description="Você pega o ônibus perto de casa."
        />
        <FlowArrow topLabel="linha" bottomLabel="alimentadora" />
        <StepCard
          icon={Bus}
          iconClassName="bg-warm/15 text-warm"
          title="Terminal"
          description="Você troca de ônibus sem pagar de novo."
        />
        <FlowArrow topLabel="linha" bottomLabel="troncal" />
        <StepCard
          icon={Building2}
          iconClassName="bg-primary/10 text-primary"
          title="Centro / destino"
          description="Chega ao TICEN ou a outro terminal."
        />
      </div>

      <div className="mt-5 rounded-xl border border-warm/25 bg-warm/10 px-4 py-3.5">
        <p className="text-sm leading-relaxed text-foreground sm:text-[15px]">
          <span className="mr-1.5 inline-block size-2 translate-y-[-1px] rounded-full bg-warm align-middle" />
          <strong className="font-semibold">Com o cartão Passe Rápido:</strong>{" "}
          1 passagem · até 3 horas · trocas ilimitadas no sistema convencional.
        </p>
      </div>

      <p className="mt-3 text-xs leading-relaxed text-warm/90 sm:text-sm">
        Sem cartão (dinheiro ou QR avulso), cada embarque é cobrado de novo — a
        integração não vale.
      </p>
    </DiagramFrame>
  );
}
