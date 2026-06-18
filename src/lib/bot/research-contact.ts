import { pickBestTrustedUrl, searchQueriesForContact } from "./trusted-domains";
import { isReachable, probeUrl, type ProbeResult } from "./probe-url";
import { searchWeb, sleep } from "./search";
import type { Contact } from "@/lib/data/types";
import type { ContactPatchFile } from "@/lib/data/types";

export interface ContactResearchResult {
  contactId: string;
  currentWebsite?: string;
  currentProbe: ProbeResult | null;
  suggestedWebsite?: string;
  suggestedScore?: number;
  evidenceUrls: string[];
  draft?: ContactPatchFile;
  action: "ok" | "blocked_official" | "suggest_update" | "needs_manual_review";
  notes: string;
}

function normalizeUrl(url: string): string {
  try {
    const u = new URL(url);
    u.hash = "";
    let s = u.toString();
    if (s.endsWith("/")) s = s.slice(0, -1);
    return s;
  } catch {
    return url;
  }
}

export async function researchContact(
  contact: Contact,
  locale: "pt" | "es" = "pt",
): Promise<ContactResearchResult> {
  const name = contact.translations[locale]?.name ?? contact.id;
  const currentWebsite = contact.website;
  const today = new Date().toISOString().slice(0, 10);

  if (!currentWebsite) {
    return {
      contactId: contact.id,
      currentProbe: null,
      evidenceUrls: [],
      action: "needs_manual_review",
      notes: "Contato sem website cadastrado.",
    };
  }

  const currentProbe = await probeUrl(currentWebsite);

  if (isReachable(currentProbe)) {
    return {
      contactId: contact.id,
      currentWebsite,
      currentProbe,
      evidenceUrls: [currentWebsite],
      action: currentProbe.status === "blocked" ? "blocked_official" : "ok",
      notes:
        currentProbe.status === "blocked"
          ? "Site oficial responde com bloqueio a robôs (comum em gov.br). URL mantida."
          : "URL atual responde normalmente.",
    };
  }

  const queries = searchQueriesForContact(
    contact.id,
    `${name} Santa Catarina site oficial`,
  );

  const evidenceUrls: string[] = [];
  for (const q of queries) {
    const found = await searchWeb(q);
    evidenceUrls.push(...found);
    await sleep(1100);
  }

  const best = pickBestTrustedUrl([...new Set(evidenceUrls)]);
  if (!best) {
    return {
      contactId: contact.id,
      currentWebsite,
      currentProbe,
      evidenceUrls: [...new Set(evidenceUrls)].slice(0, 10),
      action: "needs_manual_review",
      notes:
        "URL atual inacessível e busca não encontrou alternativa em domínio confiável.",
    };
  }

  const suggestedProbe = await probeUrl(best.url);
  if (!isReachable(suggestedProbe)) {
    return {
      contactId: contact.id,
      currentWebsite,
      currentProbe,
      suggestedWebsite: best.url,
      suggestedScore: best.score,
      evidenceUrls: [...new Set(evidenceUrls)].slice(0, 10),
      action: "needs_manual_review",
      notes: `Candidato ${best.url} também inacessível ao robô.`,
    };
  }

  if (normalizeUrl(best.url) === normalizeUrl(currentWebsite)) {
    return {
      contactId: contact.id,
      currentWebsite,
      currentProbe,
      suggestedWebsite: best.url,
      evidenceUrls: [...new Set(evidenceUrls)].slice(0, 10),
      action: "needs_manual_review",
      notes:
        "Busca confirmou o mesmo domínio, mas o robô não consegue acessar. Revisar manualmente no navegador.",
    };
  }

  const draft: ContactPatchFile = {
    meta: {
      draftId: `${contact.id}-website-${today}`,
      contactId: contact.id,
      sourceUrl: best.url,
      checkedAt: today,
      botRunId: process.env.GITHUB_RUN_ID ?? "local",
    },
    patch: { website: best.url },
    rationale: [
      `URL cadastrada (${currentWebsite}) inacessível ao bot: ${currentProbe.status === "dead" ? currentProbe.error : "erro"}.`,
      `Busca gratuita (DuckDuckGo) sugeriu ${best.url} (${best.label}, score ${best.score}).`,
      "Revisar no navegador antes de aplicar em contacts.ts.",
    ].join(" "),
  };

  return {
    contactId: contact.id,
    currentWebsite,
    currentProbe,
    suggestedWebsite: best.url,
    suggestedScore: best.score,
    evidenceUrls: [...new Set(evidenceUrls)].slice(0, 10),
    draft,
    action: "suggest_update",
    notes: "Rascunho de atualização gerado para revisão humana.",
  };
}
