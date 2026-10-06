/**
 * PillarCard — the four professional pillars on the homepage.
 * Double-bezel shell with an inner core; `featured` gives a larger treatment.
 */

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Icon, type IconName } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

export function PillarCard({
  title,
  description,
  href,
  icon,
  className,
  featured = false,
}: {
  title: string;
  description: string;
  href: string;
  icon: IconName;
  className?: string;
  featured?: boolean;
}) {
  return (
    <div className={cn("bezel group relative lift focus-within:ring-2 focus-within:ring-accent/60", className)}>
      <div
        className={cn(
          "bezel-core relative flex flex-col gap-5 p-6 sm:p-8",
          featured && "justify-between sm:min-h-72 sm:p-10",
        )}
      >
        {featured ? (
          <div
            aria-hidden="true"
            className="glow-warm pointer-events-none absolute inset-0 opacity-70"
          />
        ) : null}

        <span
          aria-hidden="true"
          className="relative inline-flex size-12 items-center justify-center rounded-2xl bg-accent/[0.08] text-accent shadow-[inset_0_0_0_1px_rgba(243,223,162,0.2)]"
        >
          <Icon name={icon} className="size-5" />
        </span>

        <div className="relative flex flex-col gap-3">
          <h3
            className={cn(
              "font-semibold text-ink",
              featured ? "text-2xl sm:text-3xl" : "text-lg",
            )}
          >
            <Link href={href} className="after:absolute after:-inset-[0.375rem] after:rounded-[2rem] after:content-['']">
              {title}
            </Link>
          </h3>
          <p
            className={cn(
              "leading-relaxed text-ink-muted",
              featured ? "max-w-md text-base" : "text-sm",
            )}
          >
            {description}
          </p>
        </div>

        <span
          aria-hidden="true"
          className="absolute top-6 right-6 inline-flex size-9 items-center justify-center rounded-full bg-white/[0.06] text-ink-muted transition-[transform,background-color,color] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:bg-accent group-hover:text-canvas"
        >
          <ArrowUpRight className="size-4" />
        </span>
      </div>
    </div>
  );
}
