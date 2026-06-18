import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface WelcomeOptionCardProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

/** Hub option card — same hover/elevation pattern as ModuleCard and ContactRow. */
export function WelcomeOptionCard({
  href,
  icon,
  title,
  description,
}: WelcomeOptionCardProps) {
  return (
    <Link href={href} className="group block focus:outline-none">
      <Card
        className={cn(
          "relative h-full gap-0 rounded-2xl border-border/60 p-5 shadow-soft ring-0",
          "transition-all duration-300 ease-out",
          "hover:-translate-y-1 hover:border-warm/50 hover:shadow-soft-lg",
          "group-active:translate-y-0 group-active:scale-[0.98] group-active:shadow-soft",
          "group-focus-visible:ring-2 group-focus-visible:ring-ring",
        )}
      >
        <ArrowUpRight
          className={cn(
            "absolute right-4 top-4 size-5 text-muted-foreground/40 opacity-0 transition-all duration-300",
            "group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-warm group-hover:opacity-100",
          )}
          aria-hidden
        />
        <span className="flex size-10 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-warm/15 group-hover:text-warm">
          {icon}
        </span>
        <div className="mt-3">
          <h3 className="font-semibold tracking-tight">{title}</h3>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>
      </Card>
    </Link>
  );
}
