import {
  ArrowUpRight,
  Bookmark,
  CalendarClock,
  CalendarPlus,
  CircleCheck,
  Clock,
  Globe,
  MapPin,
  Shuffle,
  Star,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/Icon";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Course, CourseEnrollmentStatus, CourseFormat } from "@/lib/data/types";
import { getCategoryBySlug, getCourseTranslation } from "@/lib/data/queries";
import { formatDate } from "@/i18n/intl-locale";
import { colorsFor } from "@/lib/data/colors";
import { cn } from "@/lib/utils";

interface CourseCardProps {
  course: Course;
  locale: Locale;
  dict: Dictionary;
  /** Wide, prominent layout used for the rotating highlight (roadmap) slot. */
  featured?: boolean;
}

const formatIcon: Record<CourseFormat, typeof Globe> = {
  online: Globe,
  presencial: MapPin,
  hibrido: Shuffle,
};

const enrollmentBadge: Record<
  CourseEnrollmentStatus,
  { labelKey: "enrollmentOpen" | "enrollmentComingSoon"; className: string; icon: typeof CircleCheck }
> = {
  open: {
    labelKey: "enrollmentOpen",
    className:
      "border-emerald-500/35 bg-emerald-500/10 text-emerald-800 hover:bg-emerald-500/10",
    icon: CircleCheck,
  },
  coming_soon: {
    labelKey: "enrollmentComingSoon",
    className: "border-amber-500/35 bg-amber-500/10 text-amber-900 hover:bg-amber-500/10",
    icon: Clock,
  },
};

export function CourseCard({ course, locale, dict, featured }: CourseCardProps) {
  const t = dict.novidades;
  const { t: c } = getCourseTranslation(course, locale);
  const category = getCategoryBySlug(course.categorySlug);
  const colors = category ? colorsFor(category.color) : null;

  const formatLabel = {
    online: t.formatOnline,
    presencial: t.formatPresencial,
    hibrido: t.formatHibrido,
  }[course.format];
  const FormatIcon = formatIcon[course.format];
  const enrollment = enrollmentBadge[course.enrollmentStatus ?? "coming_soon"];
  const EnrollmentIcon = enrollment.icon;

  const iconChip = featured
    ? "bg-warm/15 text-warm"
    : colors
      ? cn(colors.iconBg, colors.iconText)
      : "bg-primary/10 text-primary";

  return (
    <Card
      className={cn(
        "group/card relative flex h-full flex-col gap-4 rounded-2xl border-border/60 p-5 shadow-soft ring-0 transition-all duration-300 ease-out sm:p-6",
        "hover:-translate-y-1 hover:border-warm/50 hover:shadow-soft-lg",
        featured && "border-warm/40 bg-gradient-to-br from-warm/[0.06] to-card",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge
            className={cn("h-6 gap-1 rounded-full font-medium", enrollment.className)}
          >
            <EnrollmentIcon className="size-3.5" aria-hidden />
            {t[enrollment.labelKey]}
          </Badge>
          {featured && (
            <Badge className="h-6 gap-1 rounded-full bg-warm px-2.5 text-warm-foreground hover:bg-warm">
              <Star className="size-3.5 fill-current" aria-hidden />
              {t.featuredLabel}
            </Badge>
          )}
          <Badge variant="outline" className="h-6 gap-1 rounded-full">
            <FormatIcon className="size-3.5" aria-hidden />
            {formatLabel}
          </Badge>
          {course.isFree && (
            <Badge variant="secondary" className="h-6 rounded-full">
              {t.freeLabel}
            </Badge>
          )}
        </div>
        <span
          className={cn(
            "flex shrink-0 items-center justify-center rounded-2xl transition-colors",
            featured ? "size-11" : "size-10",
            iconChip,
          )}
          aria-hidden
        >
          {category ? (
            <Icon
              name={category.icon}
              className={featured ? "size-6" : "size-5"}
            />
          ) : (
            <FormatIcon className={featured ? "size-6" : "size-5"} />
          )}
        </span>
      </div>

      <div className="flex flex-1 flex-col">
        <h3
          className={cn(
            "font-bold tracking-tight text-balance",
            featured ? "text-xl md:text-2xl" : "text-lg",
          )}
        >
          {c.title}
        </h3>
        <p className="mt-1 text-xs font-medium text-muted-foreground">
          {c.institution}
        </p>
        <p
          className={cn(
            "mt-3 flex-1 text-sm leading-relaxed text-muted-foreground",
            featured ? "" : "line-clamp-4",
          )}
        >
          {c.summary}
        </p>
        {course.tags.length > 0 && (
          <ul
            className="mt-4 flex flex-wrap gap-1.5"
            aria-label="tags"
          >
            {course.tags.slice(0, featured ? 6 : 4).map((tag) => (
              <li key={tag}>
                <Badge
                  variant="outline"
                  className="rounded-md font-normal text-muted-foreground"
                >
                  #{tag}
                </Badge>
              </li>
            ))}
          </ul>
        )}
        {course.enrollmentDeadline && (
          <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-warm">
            <CalendarClock className="size-3.5" aria-hidden />
            {t.deadlineLabel} {formatDate(locale, course.enrollmentDeadline)}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-3 border-t border-border/50 pt-4">
        <a
          href={course.url}
          target="_blank"
          rel="noopener noreferrer"
          title={t.externalHint}
          className={cn(
            buttonVariants({ size: "lg" }),
            "w-full justify-center gap-1.5 sm:w-auto",
          )}
        >
          {t.enrollCta}
          <ArrowUpRight className="size-4" aria-hidden />
        </a>
        <div className="flex flex-wrap items-center gap-2">
          <ComingSoonAction
            icon={<Bookmark className="size-4" aria-hidden />}
            label={t.saveCta}
            badge={t.comingSoonBadge}
          />
          <ComingSoonAction
            icon={<CalendarPlus className="size-4" aria-hidden />}
            label={t.agendaCta}
            badge={t.comingSoonBadge}
          />
        </div>
      </div>
    </Card>
  );
}

function ComingSoonAction({
  icon,
  label,
  badge,
}: {
  icon: React.ReactNode;
  label: string;
  badge: string;
}) {
  return (
    <span
      className={cn(
        buttonVariants({ variant: "outline", size: "sm" }),
        "cursor-not-allowed gap-1.5 border-dashed opacity-70",
      )}
      aria-disabled="true"
      title={badge}
    >
      {icon}
      {label}
      <Badge variant="secondary" className="h-5 rounded px-1.5 text-[0.65rem]">
        {badge}
      </Badge>
    </span>
  );
}
