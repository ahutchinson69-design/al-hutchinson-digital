/**
 * StatusBadge — project lifecycle indicator.
 *
 * Accessibility: status is never communicated by colour alone. Each badge
 * carries a text label and a small shape marker, so the meaning survives
 * greyscale, colour-blindness and high-contrast modes.
 */

import type { ProjectStatus } from "@/data/projects";
import { cn } from "@/lib/cn";

const styles: Record<ProjectStatus, { chip: string; dot: string }> = {
  Concept: {
    chip: "border-sky-300/25 bg-sky-300/10 text-sky-100",
    dot: "bg-sky-300",
  },
  Active: {
    chip: "border-emerald-300/25 bg-emerald-300/10 text-emerald-100",
    dot: "bg-emerald-300",
  },
  Research: {
    chip: "border-violet-300/25 bg-violet-300/10 text-violet-100",
    dot: "bg-violet-300",
  },
  Published: {
    chip: "border-accent/30 bg-accent/10 text-accent",
    dot: "bg-accent",
  },
};

export function StatusBadge({
  status,
  className,
}: {
  status: ProjectStatus;
  className?: string;
}) {
  const style = styles[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1",
        "text-[0.6875rem] font-medium tracking-wide uppercase",
        style.chip,
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn("size-1.5 rounded-full", style.dot)}
      />
      <span className="sr-only">Status: </span>
      {status}
    </span>
  );
}
