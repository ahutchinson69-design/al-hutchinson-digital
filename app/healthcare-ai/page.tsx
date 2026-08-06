import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  CLINICAL_SAFEGUARD,
  MEDICAL_DISCLAIMER,
  healthcareIntro,
  observedProblems,
  opportunities,
  safeguards,
  standing,
} from "@/data/healthcare-ai";
import { projects } from "@/data/projects";
import { articles } from "@/data/articles";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { CallToAction } from "@/components/CallToAction";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { ArticleCard } from "@/components/cards/ArticleCard";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata = pageMetadata({
  title: "Healthcare AI",
  description:
    "Where AI can realistically reduce friction in healthcare — documentation, quality monitoring, and workforce education — and the safeguards that must hold.",
  path: "/healthcare-ai",
});

const relatedProjects = projects.filter((p) => p.category === "Healthcare");
const relatedArticles = articles.filter(
  (a) => a.category === "Healthcare AI" || a.category === "Education",
);

export default function HealthcareAIPage() {
  return (
    <>
      <PageHero
        eyebrow="Healthcare AI"
        heading={healthcareIntro.heading}
        lead={healthcareIntro.body}
      />

      {/* ── Safeguard statement — required to be visible ─────────────────── */}
      <section className="border-b border-hairline bg-canvas-2">
        <div className="shell py-10 md:py-12">
          <Reveal>
            <blockquote className="mx-auto max-w-3xl text-center">
              <p className="text-lg leading-relaxed font-medium text-ink text-balance sm:text-xl">
                “{CLINICAL_SAFEGUARD}”
              </p>
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* ── Standing ─────────────────────────────────────────────────────── */}
      <section className="shell section-y">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="Why listen to me"
              heading={standing.heading}
            />
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col gap-6">
            <p className="text-base leading-relaxed text-ink-muted sm:text-lg">
              {standing.body}
            </p>
            <ul className="flex flex-col gap-3">
              {standing.points.map((point) => (
                <li key={point} className="flex gap-3 text-sm text-ink-muted">
                  <span
                    aria-hidden="true"
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-accent"
                  />
                  <span className="leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ── Observed problems ────────────────────────────────────────────── */}
      <section className="border-t border-hairline">
        <div className="shell section-y">
          <Reveal>
            <SectionHeading
              eyebrow="What I have observed"
              heading="The friction is rarely where the technology conversation starts."
              lead="These patterns show up repeatedly in skilled nursing environments. They are observations from working inside them, not findings from a study."
            />
          </Reveal>

          <ul className="mt-12 grid gap-5 sm:grid-cols-2">
            {observedProblems.map((problem, index) => (
              <Reveal as="li" key={problem.title} delay={(index % 2) * 0.08}>
                <div className="flex h-full flex-col gap-3 rounded-2xl border border-hairline bg-surface/60 p-6">
                  <h3 className="text-base font-semibold text-ink">
                    {problem.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-ink-muted">
                    {problem.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Opportunities ────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-y border-hairline bg-canvas-2">
        <div aria-hidden="true" className="glow-warm absolute inset-0" />

        <div className="shell section-y relative">
          <Reveal>
            <SectionHeading
              eyebrow="Where AI helps"
              heading="Four areas worth the effort."
              lead="Each of these reduces a real cost. None of them requires a clinician to trust the system beyond what it has demonstrated."
            />
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {opportunities.map((item, index) => (
              <Reveal key={item.title} delay={(index % 2) * 0.08}>
                <article className="flex h-full flex-col gap-4 rounded-2xl border border-hairline bg-surface/60 p-7">
                  <span
                    aria-hidden="true"
                    className="inline-flex size-11 items-center justify-center rounded-xl border border-hairline bg-accent/[0.07] text-accent"
                  >
                    <Icon name={item.icon} className="size-5" />
                  </span>

                  <h3 className="text-lg font-semibold text-ink">
                    {item.title}
                  </h3>

                  <p className="leading-relaxed text-ink-muted">
                    {item.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Ethical safeguards ───────────────────────────────────────────── */}
      <section className="shell section-y">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              eyebrow="Ethical safeguards"
              heading="Non-negotiables."
              lead="These are design constraints, applied before anything gets built — not compliance work bolted on afterwards."
            />
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="flex flex-col gap-4">
              {safeguards.map((rule) => (
                <li
                  key={rule}
                  className="flex gap-4 rounded-xl border border-hairline bg-surface/40 p-5"
                >
                  <span
                    aria-hidden="true"
                    className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent"
                  />
                  <span className="leading-relaxed text-ink-muted">{rule}</span>
                </li>
              ))}
            </ul>

            <p className="mt-8 rounded-xl border border-dashed border-hairline-strong bg-white/[0.02] p-5 text-sm leading-relaxed text-ink-muted">
              {MEDICAL_DISCLAIMER}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Related projects ─────────────────────────────────────────────── */}
      {relatedProjects.length > 0 ? (
        <section className="border-y border-hairline bg-canvas-2">
          <div className="shell section-y">
            <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <SectionHeading
                eyebrow="Related work"
                heading="Healthcare projects."
              />
              <Link
                href="/projects"
                className="group inline-flex shrink-0 items-center gap-2 text-sm font-medium text-accent hover:text-accent-hover"
              >
                All projects
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-300 motion-safe:group-hover:translate-x-1"
                />
              </Link>
            </Reveal>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProjects.map((project) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  className="h-full"
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* ── Related articles ─────────────────────────────────────────────── */}
      {relatedArticles.length > 0 ? (
        <section className="shell section-y">
          <Reveal>
            <SectionHeading
              eyebrow="Further reading"
              heading="Related articles."
            />
          </Reveal>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {relatedArticles.map((article) => (
              <ArticleCard
                key={article.slug}
                article={article}
                className="h-full"
              />
            ))}
          </div>
        </section>
      ) : null}

      <CallToAction
        eyebrow="Healthcare AI"
        heading="Facing one of these problems?"
        body="If you work in skilled nursing or long-term care and any of this sounds familiar, I would genuinely like to hear how it looks from where you sit."
        secondary={{ label: "See the Projects", href: "/projects" }}
      />
    </>
  );
}
