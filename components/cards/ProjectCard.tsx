/**
 * ProjectCard — used by the homepage grid and the Projects gallery.
 *
 * The whole card is a single link target (via a stretched overlay) so the hit
 * area is generous on touch, while screen readers still announce one clear
 * link with the project title as its accessible name.
 */

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { cn } from "@/lib/cn";

export function ProjectCard({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl",
        "border border-hairline bg-surface/60 p-3",
        "transition-[border-color,transform,box-shadow] duration-300",
        "hover:border-hairline-strong hover:shadow-[0_18px_50px_-30px_rgba(0,0,0,0.9)]",
        "motion-safe:hover:-translate-y-1",
        "focus-within:border-accent/50",
        className,
      )}
    >
      <MediaPlaceholder
        src={project.image}
        alt={project.imageAlt}
        seed={project.slug}
        icon="sparkles"
        className="transition-transform duration-500 motion-safe:group-hover:scale-[1.015]"
      />

      <div className="flex flex-1 flex-col gap-3 p-4 pt-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="eyebrow">{project.categoryLabel}</span>
          <StatusBadge status={project.status} className="ms-auto" />
        </div>

        <h3 className="text-lg font-semibold text-ink transition-colors group-hover:text-accent">
          <Link href={`/projects/${project.slug}`} className="after:absolute after:inset-0">
            {project.title}
          </Link>
        </h3>

        <p className="text-sm leading-relaxed text-ink-muted">{project.summary}</p>

        <span
          aria-hidden="true"
          className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-medium text-accent"
        >
          View Case Study
          <ArrowUpRight className="size-4 transition-transform duration-300 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5" />
        </span>
      </div>
    </article>
  );
}
