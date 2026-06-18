import { cn } from "@/lib/utils";

interface ContentFallbackNoticeProps {
  message: string;
  className?: string;
}

/** Discrete banner when editorial content falls back to Portuguese. */
export function ContentFallbackNotice({
  message,
  className,
}: ContentFallbackNoticeProps) {
  return (
    <div
      role="status"
      className={cn(
        "mb-8 rounded-xl border border-border/60 bg-muted/50 p-4 text-sm leading-relaxed text-foreground/90",
        className,
      )}
    >
      {message}
    </div>
  );
}
