/** Section 4 — Featured projects. */

import { Button } from "@/components/ui/Button";
import { featuredProjects } from "@/data/projects";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const spans = [
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-4",
  "lg:col-span-3",
  "lg:col-span-3",
];

export function FeaturedProjects() {
  return (
    <section id="work">
      <div className="shell section-y">
        <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            heading="Projects and concepts."
            lead="Concepts, research and creative work developed under Hutchinson FutureWorks. Each entry states plainly where it currently stands."
          />

          <Button href="/projects" variant="secondary" withArrow className="shrink-0">
            All projects
          </Button>
        </Reveal>

        {/* Asymmetric 6-column bento: 3+3, 2+2+2, 2+4, 3+3 (nine projects) */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {featuredProjects.map((project, index) => (
            <Reveal
              key={project.slug}
              delay={(index % 3) * 0.08}
              className={spans[index] ?? "lg:col-span-2"}
            >
              <ProjectCard project={project} className="h-full" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
