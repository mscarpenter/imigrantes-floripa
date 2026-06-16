import { cn } from "@/lib/utils";

interface DiagramFrameProps {
  title: string;
  subtitle?: string;
  caption?: string;
  children: React.ReactNode;
  className?: string;
}

export function DiagramFrame({
  title,
  subtitle,
  caption,
  children,
  className,
}: DiagramFrameProps) {
  return (
    <figure className={cn("my-6 clear-both", className)}>
      <div className="overflow-hidden rounded-2xl border border-border/60 bg-[#fbf8f4] p-5 shadow-soft sm:p-6">
        <header className="mb-5">
          <h4 className="text-xl font-bold tracking-tight text-primary sm:text-2xl">
            {title}
          </h4>
          {subtitle ? (
            <p className="mt-1 text-sm text-muted-foreground sm:text-base">
              {subtitle}
            </p>
          ) : null}
        </header>
        {children}
      </div>
      {caption ? (
        <figcaption className="mt-2 text-center text-xs text-muted-foreground">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
