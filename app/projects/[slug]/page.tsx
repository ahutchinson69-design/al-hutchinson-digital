import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import {
  getProject,
  getRelatedProjects,
  projects,
  type Project,
} from "@/data/projects";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { CallToAction } from "@/components/CallToAction";
import { Button } from "@/components/ui/Button";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { PlaceholderNotice } from "@/components/ui/PlaceholderNotice";
import { Reveal } from "@/components/ui/Reveal";
import { StatusBadge } from "@/components/ui/StatusBadge";

/** Pre-render every project at build time. */
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return pageMetadata({
      title: "Project not found",
      description: "This project could not be found.",
      path: `/projects/${slug}`,
    });
  }

  return pageMetadata({
    title: project.title,
    description: project.summary,
    path: `/projects/${project.slug}`,
    type: "article",
  });
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const related = getRelatedProjects(project);

  return (
    <>
      <article>
        {/* ── Header ────────────────────────────────────────────────────── */}
        <header className="relative overflow-hidden border-b border-hairline">
          <div aria-hidden="true" className="glow-warm absolute inset-0" />

          <div className="shell relative pt-28 pb-12 sm:pt-32 md:pt-40 md:pb-16">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-accent"
            >
              <ArrowLeft
                aria-hidden="true"
                className="size-4 transition-transform duration-300 motion-safe:group-hover:-translate-x-1"
              />
              All projects
            </Link>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="eyebrow">{project.categoryLabel}</span>
              <StatusBadge status={project.status} />
            </div>

            <h1 className="mt-4 max-w-3xl text-4xl leading-[1.05] font-semibold sm:text-5xl">
              {project.title}
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
              {project.summary}
            </p>
          </div>
        </header>

        <div className="shell section-y">
          <div className="grid gap-12 lg:grid-cols-[1.35fr_0.65fr] lg:gap-16">
            {/* ── Main column ─────────────────────────────────────────── */}
            <div className="flex flex-col gap-14">
              <Reveal>
                <MediaPlaceholder
                  src={project.image}
                  alt={project.imageAlt}
                  seed={project.slug}
                  aspect="aspect-16/9"
                  sizes="(min-width: 1024px) 48rem, 92vw"
                />
              </Reveal>

              {project.contentStatus === "placeholder" ? (
                <PlaceholderNotice>
                  The write-up below is illustrative scaffolding that demonstrates
                  the case-study format. It describes the intent of the work, not a
                  verified record — no outcomes, dates, clients or results are
                  claimed.
                </PlaceholderNotice>
              ) : null}

              {project.overview ? (
                <Section title="Overview">
                  <p className="leading-relaxed text-ink-muted">
                    {project.overview}
                  </p>
                </Section>
              ) : null}

              {project.problem?.length ? (
                <Section title="The problem">
                  <BulletList items={project.problem} />
                </Section>
              ) : null}

              {project.solution?.length ? (
                <Section title="Proposed approach">
                  <BulletList items={project.solution} />
                </Section>
              ) : null}

              {project.process?.length ? (
                <Section title="Process">
                  <ol className="flex flex-col gap-6">
                    {project.process.map((step, index) => (
                      <li key={step.title} className="flex gap-4">
                        <span
                          aria-hidden="true"
                          className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg border border-hairline bg-surface font-mono text-xs text-accent"
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div className="flex flex-col gap-1.5">
                          <h3 className="font-medium text-ink">{step.title}</h3>
                          <p className="text-sm leading-relaxed text-ink-muted">
                            {step.description}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </Section>
              ) : null}

              {project.lessons?.length ? (
                <Section title="What this has clarified">
                  <BulletList items={project.lessons} />
                </Section>
              ) : null}

              {project.nextSteps?.length ? (
                <Section title="Next steps">
                  <BulletList items={project.nextSteps} />
                </Section>
              ) : null}
            </div>

            {/* ── Sidebar ─────────────────────────────────────────────── */}
            <aside className="flex flex-col gap-8 lg:sticky lg:top-28 lg:self-start">
              {project.liveUrl ? (
                <SidebarBlock title="Live">
                  <Button
                    href={project.liveUrl}
                    size="sm"
                    external
                    className="w-fit"
                  >
                    {project.liveLabel ?? "View it live"}
                    <ExternalLink aria-hidden="true" className="size-4" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </Button>
                </SidebarBlock>
              ) : null}

              <SidebarBlock title="Current status">
                <StatusBadge status={project.status} />
              </SidebarBlock>

              <SidebarBlock title="Category">
                <p className="text-sm text-ink-muted">{project.categoryLabel}</p>
              </SidebarBlock>

              {project.tools?.length ? (
                <SidebarBlock title="Tools and methods">
                  <ul className="flex flex-wrap gap-2">
                    {project.tools.map((tool) => (
                      <li
                        key={tool}
                        className="rounded-full border border-hairline px-3 py-1.5 text-xs text-ink-muted"
                      >
                        {tool}
                      </li>
                    ))}
                  </ul>
                </SidebarBlock>
              ) : null}
            </aside>
          </div>
        </div>

        {/* ── Related ───────────────────────────────────────────────────── */}
        {related.length > 0 ? (
          <section className="border-t border-hairline bg-canvas-2">
            <div className="shell section-y">
              <h2 className="text-2xl font-semibold sm:text-3xl">
                Related projects
              </h2>

              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((item: Project) => (
                  <ProjectCard key={item.slug} project={item} className="h-full" />
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </article>

      <CallToAction
        heading="Questions about this work?"
        body="I am always glad to talk through a concept in more detail, especially with people who work in these environments."
        secondary={{ label: "All Projects", href: "/projects" }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Projects", path: "/projects" },
              { name: project.title, path: `/projects/${project.slug}` },
            ]),
          ),
        }}
      />
    </>
  );
}

/* ── Local presentational helpers ──────────────────────────────────────── */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal as="section" className="flex flex-col gap-5">
      <h2 className="text-xl font-semibold text-ink sm:text-2xl">{title}</h2>
      {children}
    </Reveal>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-ink-muted">
          <span
            aria-hidden="true"
            className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent"
          />
          <span className="leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function SidebarBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 border-t border-hairline pt-6 first:border-t-0 first:pt-0">
      <h2 className="eyebrow">{title}</h2>
      {children}
    </div>
  );
}
