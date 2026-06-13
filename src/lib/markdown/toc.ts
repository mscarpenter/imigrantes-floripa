import type { ReactNode } from "react";

/** Converts a heading label into a URL-safe anchor id (accent-insensitive). */
export function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Flattens React children (markdown inline nodes) into plain text. */
export function nodeToText(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(nodeToText).join("");
  if (typeof node === "object" && "props" in node) {
    return nodeToText((node as { props?: { children?: ReactNode } }).props?.children);
  }
  return "";
}

export interface Heading {
  id: string;
  title: string;
}

/**
 * Extracts level-2 headings (`## `) from a markdown body, skipping fenced
 * code blocks. Ids match what `MarkdownContent` renders via `slugify`.
 */
export function extractHeadings(body: string): Heading[] {
  const headings: Heading[] = [];
  let inFence = false;

  for (const rawLine of body.split("\n")) {
    const line = rawLine.trimEnd();
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const match = /^##\s+(.+)$/.exec(line);
    if (match) {
      const title = match[1].replace(/[*_`]/g, "").trim();
      headings.push({ id: slugify(title), title });
    }
  }

  return headings;
}
