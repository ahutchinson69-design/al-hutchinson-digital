/**
 * PillarCard — the four professional pillars on the homepage.
 */

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Icon, type IconName } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

export function PillarCard({
  title,
  description,
  href,
  icon,
  className,
}: {
  title: string;
  description: string;
  href: string;
  icon: IconName;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group relative flex flex-col gap-4 rounded-2xl border border-hairline",
        "bg-surface/60 p-6",
        "transition-[border-color,background-color,transform] duration-300",
        "hover:border-accent/30 hover:bg-surface",
        "motion-safe:hover:-translate-y-1",
        "focus-within:border-accent/50",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "inline-flex size-11 items-center justify-center rounded-xl",
          "border border-hairline bg-accent/[0.07] text-accent",
          "transition-colors duration-300 group-hover:bg-accent/[0.12]",
        )}
      >
        <Icon name={icon} className="size-5" />
      </span>

      <h3 className="text-base font-semibold text-ink transition-colors group-hover:text-accent">
        <Link href={href} className="after:absolute after:inset-0">
          {title}
        </Link>
      </h3>

      <p className="text-sm leading-relaxed text-ink-muted">{description}</p>

      <ArrowRight
        aria-hidden="true"
        className="mt-auto size-4 text-accent opacity-0 transition-all duration-300 group-hover:opacity-100 motion-safe:group-hover:translate-x-1"
      />
    </div>
  );
}
