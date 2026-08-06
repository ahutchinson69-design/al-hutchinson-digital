import { Download } from "lucide-react";
import {
  resources,
  speakingInterests,
  teachingPhilosophy,
  teachingRecord,
  teachingTopics,
  workshopFormats,
} from "@/data/teaching";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { CallToAction } from "@/components/CallToAction";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata = pageMetadata({
  title: "Teaching",
  description:
    "Practical AI education for healthcare professionals — teaching philosophy, topics, workshop formats, and downloadable resources.",
  path: "/teaching",
});

export default function TeachingPage() {
  return (
    <>
      <PageHero
        eyebrow="Teaching"
        heading={teachingPhilosophy.heading}
        lead="Education for healthcare professionals who already have a full schedule and need something they can use on their next shift."
      />

      {/* ── Philosophy ───────────────────────────────────────────────────── */}
      <section className="shell section-y">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="Philosophy"
              heading="How I approach teaching."
            />
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col gap-6">
            {teachingPhilosophy.paragraphs.map((paragraph, i) => (
              <p
                key={i}
                className="text-base leading-relaxed text-ink-muted sm:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── Teaching record ──────────────────────────────────────────────── */}
      <section className="border-t border-hairline bg-canvas-2">
        <div className="shell section-y">
          <Reveal>
            <SectionHeading eyebrow="Record" heading={teachingRecord.heading} />
          </Reveal>

          <dl className="mt-12 grid gap-5 sm:grid-cols-3">
            {teachingRecord.stats.map((stat, index) => (
              <Reveal key={stat.label} delay={index * 0.08}>
                <div className="flex h-full flex-col gap-2 rounded-2xl border border-hairline bg-surface/60 p-6">
                  <dt className="order-2 text-sm leading-relaxed text-ink-muted">
                    {stat.label}
                  </dt>
                  <dd className="order-1 text-2xl font-semibold text-accent">
                    {stat.figure}
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>

          <Reveal delay={0.1}>
            <ul className="mt-10 flex flex-col gap-4">
              {teachingRecord.highlights.map((item) => (
                <li key={item} className="flex gap-3 text-ink-muted">
                  <span
                    aria-hidden="true"
                    className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent"
                  />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ── Topics ───────────────────────────────────────────────────────── */}
      <section className="border-t border-hairline">
        <div className="shell section-y">
          <Reveal>
            <SectionHeading
              eyebrow="Topics"
              heading="What I teach."
              lead="Each of these can be delivered as a short session or expanded into a longer workshop."
            />
          </Reveal>

          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {teachingTopics.map((topic, index) => (
              <Reveal as="li" key={topic.title} delay={(index % 3) * 0.07}>
                <div className="flex h-full flex-col gap-4 rounded-2xl border border-hairline bg-surface/60 p-6">
                  <span
                    aria-hidden="true"
                    className="inline-flex size-10 items-center justify-center rounded-xl border border-hairline bg-accent/[0.07] text-accent"
                  >
                    <Icon name={topic.icon} className="size-5" />
                  </span>
                  <h3 className="text-base font-semibold text-ink">
                    {topic.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-ink-muted">
                    {topic.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Workshop formats ─────────────────────────────────────────────── */}
      <section className="shell section-y">
        <Reveal>
          <SectionHeading
            eyebrow="Formats"
            heading="Workshop options."
            lead="Formats currently offered. These describe what can be delivered, not a record of past engagements."
          />
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {workshopFormats.map((format, index) => (
            <Reveal key={format.title} delay={index * 0.08}>
              <article className="flex h-full flex-col gap-3 rounded-2xl border border-hairline bg-surface/60 p-6">
                <p className="eyebrow">{format.duration}</p>
                <h3 className="text-base font-semibold text-ink">
                  {format.title}
                </h3>
                <p className="text-sm leading-relaxed text-ink-muted">
                  {format.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Resources ────────────────────────────────────────────────────── */}
      <section className="border-y border-hairline bg-canvas-2">
        <div className="shell section-y">
          <Reveal className="flex flex-col gap-6">
            <SectionHeading
              eyebrow="Resources"
              heading="Downloadable guides."
              lead="Practical material designed to be worked through in short sessions."
            />
          </Reveal>

          <ul className="mt-12 grid gap-5 md:grid-cols-3">
            {resources.map((resource, index) => (
              <Reveal as="li" key={resource.title} delay={index * 0.08}>
                <div className="flex h-full flex-col gap-4 rounded-2xl border border-hairline bg-surface/60 p-6">
                  <h3 className="text-base font-semibold text-ink">
                    {resource.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-ink-muted">
                    {resource.description}
                  </p>

                  <Button
                    href={resource.href}
                    variant="secondary"
                    size="sm"
                    external
                    nofollow={resource.isPlaceholder}
                    className="mt-auto w-fit"
                  >
                    <Download aria-hidden="true" className="size-4" />
                    Download
                    {resource.isPlaceholder ? (
                      <span className="text-xs opacity-70">(placeholder)</span>
                    ) : null}
                  </Button>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Speaking ─────────────────────────────────────────────────────── */}
      <section className="shell section-y">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="Speaking"
              heading="Where I would like to speak."
              lead="Settings I am actively interested in. Enquiries are welcome."
            />
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col gap-6">
            <ul className="flex flex-col gap-4">
              {speakingInterests.map((item) => (
                <li key={item} className="flex gap-3 text-ink-muted">
                  <span
                    aria-hidden="true"
                    className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent"
                  />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>

            <Button href="/contact" className="w-fit">
              Discuss a session
            </Button>
          </Reveal>
        </div>
      </section>

      <CallToAction
        eyebrow="Teaching"
        heading="Need practical AI training for your team?"
        body="If your staff are already using these tools without a framework for judging the output, that gap is worth closing."
        secondary={{ label: "Read Insights", href: "/insights" }}
      />
    </>
  );
}
