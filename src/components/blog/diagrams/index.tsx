import type { ComponentType } from "react";
import { TransportIntegracaoDiagram } from "./TransportIntegracaoDiagram";
import { TransportTerminaisDiagram } from "./TransportTerminaisDiagram";
import { SaudeQualPortaDiagram } from "./SaudeQualPortaDiagram";

const DIAGRAMS: Record<string, ComponentType<{ caption?: string }>> = {
  "/diagrams/transporte-integracao.svg": TransportIntegracaoDiagram,
  "/diagrams/transporte-terminais.svg": TransportTerminaisDiagram,
  "/diagrams/saude-qual-porta.svg": SaudeQualPortaDiagram,
};

export function BlogDiagram({
  src,
  caption,
}: {
  src: string;
  caption?: string;
}) {
  const Diagram = DIAGRAMS[src];
  if (!Diagram) return null;
  return <Diagram caption={caption} />;
}

export function isBlogDiagram(src: string): boolean {
  return src in DIAGRAMS;
}
