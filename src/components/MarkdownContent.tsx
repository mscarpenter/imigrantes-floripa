import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { Lightbulb } from "lucide-react";
import { BlogDiagram, isBlogDiagram } from "@/components/blog/diagrams";
import { colorsFor, type ModuleColor } from "@/lib/data/colors";
import { nodeToText, slugify } from "@/lib/markdown/toc";
import { cn } from "@/lib/utils";

// Composite selectors must appear literally in source for Tailwind v4 to
// generate them. This map is the only place the `[&>li]:before:bg-...-500`
// combinations live.
const stepCircleByColor: Record<ModuleColor, string> = {
  blue: "[&>li]:before:bg-blue-500",
  rose: "[&>li]:before:bg-rose-500",
  orange: "[&>li]:before:bg-orange-500",
  emerald: "[&>li]:before:bg-emerald-500",
  violet: "[&>li]:before:bg-violet-500",
  teal: "[&>li]:before:bg-teal-500",
  amber: "[&>li]:before:bg-amber-500",
  red: "[&>li]:before:bg-red-500",
};

interface MarkdownContentProps {
  body: string;
  color: ModuleColor;
}

export function MarkdownContent({ body, color }: MarkdownContentProps) {
  const colors = colorsFor(color);
  const stepCircleClass = stepCircleByColor[color];

  const components: Components = {
    h2: ({ children }) => (
      <h2
        id={slugify(nodeToText(children))}
        className="mt-12 mb-4 flex scroll-mt-28 items-start gap-3 clear-both text-2xl font-bold tracking-tight"
      >
        <span
          aria-hidden
          className={cn(
            "mt-2 inline-block h-6 w-1 shrink-0 rounded-full",
            colors.solidBg,
          )}
        />
        <span>{children}</span>
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 mb-3 clear-both text-lg font-semibold tracking-tight">
        {children}
      </h3>
    ),
    p: ({ node, children }) => {
      // Imagem sozinha em um parágrafo: desembrulha o <p> para que figuras
      // (mapas/diagramas de largura cheia) não fiquem aninhadas dentro de <p>,
      // o que é HTML inválido e quebra a hidratação.
      const kids = node?.children ?? [];
      const meaningful = kids.filter(
        (c) => !(c.type === "text" && c.value.trim() === ""),
      );
      const only = meaningful[0];
      if (
        meaningful.length === 1 &&
        only.type === "element" &&
        only.tagName === "img"
      ) {
        return <>{children}</>;
      }
      return (
        <p className="my-4 leading-relaxed text-foreground/90">{children}</p>
      );
    },
    a: ({ children, href }) => (
      <a
        href={href}
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noreferrer" : undefined}
        className="font-medium text-primary underline underline-offset-2 hover:text-primary/80"
      >
        {children}
      </a>
    ),
    strong: ({ children }) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),
    ul: ({ children }) => (
      <ul className="my-4 space-y-2 pl-0 [&>li]:relative [&>li]:pl-6 [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:top-2.5 [&>li]:before:size-1.5 [&>li]:before:rounded-full [&>li]:before:bg-muted-foreground/60">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol
        className={cn(
          "my-6 grid gap-3 list-none pl-0 [counter-reset:step]",
          "[&>li]:relative [&>li]:rounded-xl [&>li]:border [&>li]:bg-card [&>li]:p-4 [&>li]:pl-14 [&>li]:[counter-increment:step]",
          "[&>li]:before:absolute [&>li]:before:left-3 [&>li]:before:top-3.5 [&>li]:before:flex [&>li]:before:size-8 [&>li]:before:items-center [&>li]:before:justify-center [&>li]:before:rounded-full [&>li]:before:text-sm [&>li]:before:font-bold [&>li]:before:text-white [&>li]:before:content-[counter(step)]",
          stepCircleClass,
        )}
      >
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="leading-relaxed text-foreground/90 [&>p]:my-0 [&>p+p]:mt-2 [&>ul]:mt-2 [&>ol]:mt-2">
        {children}
      </li>
    ),
    blockquote: ({ children }) => (
      <div
        className={cn(
          "my-6 flex gap-3 rounded-lg border p-4",
          colors.softBg,
          colors.softBorder,
        )}
      >
        <Lightbulb
          aria-hidden
          className={cn("mt-0.5 size-5 shrink-0", colors.iconText)}
        />
        <div className="flex-1 text-sm leading-relaxed text-foreground/90 [&>p]:my-0 [&>p+p]:mt-2 [&>strong]:font-semibold">
          {children}
        </div>
      </div>
    ),
    table: ({ children }) => (
      <div className="my-6 overflow-x-auto rounded-xl border">
        <table className="w-full border-collapse text-sm">{children}</table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className={cn("text-left", colors.tableHeadBg)}>{children}</thead>
    ),
    th: ({ children }) => (
      <th className="border-b px-4 py-2.5 font-semibold text-foreground">
        {children}
      </th>
    ),
    tbody: ({ children }) => <tbody className="divide-y">{children}</tbody>,
    td: ({ children }) => (
      <td className="px-4 py-2.5 align-top text-foreground/90">{children}</td>
    ),
    img: ({ src, alt }) => {
      if (typeof src !== "string") return null;
      if (isBlogDiagram(src)) {
        return <BlogDiagram src={src} caption={alt ?? undefined} />;
      }
      // Screenshots de apps (em /app-shots/): miniatura de celular flutuando à
      // direita, com o texto descritivo correndo ao lado (estilo guia).
      if (src.includes("/app-shots/")) {
        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt ?? ""}
            loading="lazy"
            className="float-right ml-4 mb-2 h-56 w-auto rounded-xl border border-border/60 bg-card object-contain shadow-soft sm:h-64"
          />
        );
      }
      // Ícones de apps (em /app-icons/) viram um "selo" pequeno ao lado do texto.
      if (src.includes("/app-icons/")) {
        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt ?? ""}
            loading="lazy"
            className="float-left mr-3 mb-2 inline-block size-12 rounded-2xl border border-border/60 bg-card object-contain shadow-soft"
          />
        );
      }
      // Demais imagens: figura responsiva com legenda opcional (texto alt).
      return (
        <figure className="my-6 clear-both">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt ?? ""}
            loading="lazy"
            className="w-full rounded-xl border border-border/60 shadow-soft"
          />
          {alt ? (
            <figcaption className="mt-2 text-center text-xs text-muted-foreground">
              {alt}
            </figcaption>
          ) : null}
        </figure>
      );
    },
    hr: () => <hr className="my-8 border-border" />,
    code: ({ children }) => (
      <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.9em]">
        {children}
      </code>
    ),
  };

  return (
    <div className="text-[15px]">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {body}
      </ReactMarkdown>
    </div>
  );
}
