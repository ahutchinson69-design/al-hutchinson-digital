import { Download } from "lucide-react";
import {
  aboutIntro,
  credentials,
  currentFocus,
  journey,
  mission,
  values,
  vision,
} from "@/data/about";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { Timeline } from "@/components/Timeline";
import { CallToAction } from "@/components/CallToAction";
import { Button } from "@/components/ui/Button";
import { PortraitPlaceholder } from "@/components/ui/PortraitPlaceholder";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata = pageMetadata({
  title: "About",
  description:
    "Al Hutchinson's path from military service through healthcare and skilled nursing into artificial intelligence, education, and creative technology.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={aboutIntro.eyebrow}
        heading={aboutIntro.heading}
        lead={aboutIntro.lead}
      >
        <Button href={site.resume.href} variant="secondary" external>
          <Download aria-hidden="true" className="size-4" />
          {site.resume.label}
          {site.resume.isPlaceholder ? (
            <span className="text-xs opacity-70">(placeholder)</span>
          ) : null}
        </Button>
      </PageHero>

      {/* ── Portrait + mission ───────────────────────────────────────────── */}
      <section className="shell section-y">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal>
            <PortraitPlaceholder className="mx-auto max-w-sm lg:max-w-none" />
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col gap-6">
            <SectionHeading eyebrow="Mission" heading={mission.heading} />
            <p className="text-base leading-relaxed text-ink-muted sm:text-lg">
              {mission.body}
            </p>

            <dl className="mt-2 grid gap-x-8 gap-y-5 sm:grid-cols-2">
              <div>
                <dt className="eyebrow">Practising as</dt>
                <dd className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {site.role}
                </dd>
              </div>
              <div>
                <dt className="eyebrow">Credentials</dt>
                <dd className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {site.credentials}
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </section>

      {/* ── Career journey ───────────────────────────────────────────────── */}
      <section className="border-y border-hairline bg-canvas-2">
        <div className="shell section-y">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <Reveal>
              <SectionHeading eyebrow="Journey" heading={journey.heading} />
            </Reveal>

            <Reveal delay={0.1} className="flex flex-col gap-6">
              {journey.paragraphs.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-base leading-relaxed text-ink-muted sm:text-lg"
                >
                  {paragraph}
                </p>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Timeline ─────────────────────────────────────────────────────── */}
      <section className="shell section-y">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              eyebrow="Timeline"
              heading="Military service, to healthcare, to technology."
              lead="Each phase supplied a constraint the next one had to respect."
            />
          </Reveal>

          <div>
            <Timeline />
          </div>
        </div>
      </section>

      {/* ── Credentials, service and recognition ─────────────────────────── */}
      <section className="border-t border-hairline bg-canvas-2">
        <div className="shell section-y">
          <Reveal>
            <SectionHeading
              eyebrow="Record"
              heading="Education, licensure and service."
            />
          </Reveal>

          <div className="mt-12 grid gap-10 md:grid-cols-2 lg:gap-14">
            <Reveal className="flex flex-col gap-10">
              <CredentialBlock title="Education">
                <ul className="flex flex-col gap-4">
                  {credentials.education.map((item) => (
                    <li key={item.award} className="flex flex-col gap-0.5">
                      <span className="text-sm font-medium text-ink">
                        {item.award}
                      </span>
                      <span className="text-sm text-ink-muted">{item.org}</span>
                      <span className="text-xs text-ink-muted/70">
                        {item.year}
                      </span>
                    </li>
                  ))}
                </ul>
              </CredentialBlock>

              <CredentialBlock title="Licensure and certification">
                <PlainList items={credentials.licensure} />
              </CredentialBlock>
            </Reveal>

            <Reveal delay={0.1} className="flex flex-col gap-10">
              <CredentialBlock title="Military service">
                <p className="text-sm font-medium text-ink">
                  {credentials.military.role}
                </p>
                <p className="mt-1 text-sm text-ink-muted">
                  {credentials.military.unit}
                </p>
                <p className="mt-1 text-xs text-ink-muted/70">
                  {credentials.military.period} · Operations Desert Shield and
                  Desert Storm
                </p>
                <PlainList
                  items={[...credentials.military.decorations]}
                  className="mt-4"
                />
              </CredentialBlock>

              <CredentialBlock title="Publications">
                <PlainList items={[...credentials.publications]} />
              </CredentialBlock>

              <CredentialBlock title="Leadership and service">
                <PlainList items={[...credentials.service]} />
              </CredentialBlock>

              <CredentialBlock title="Honors">
                <ul className="flex flex-col gap-2">
                  {credentials.honors.map((item) => (
                    <li key={item.award} className="text-sm text-ink-muted">
                      <span className="font-medium text-ink">{item.award}</span>
                      {" — "}
                      {item.org}, {item.year}
                    </li>
                  ))}
                </ul>
              </CredentialBlock>

              <CredentialBlock title="Professional memberships">
                <PlainList items={[...credentials.memberships]} />
              </CredentialBlock>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Values ───────────────────────────────────────────────────────── */}
      <section className="border-y border-hairline bg-canvas-2">
        <div className="shell section-y">
          <Reveal>
            <SectionHeading
              eyebrow="Principles"
              heading="What I hold to."
              lead="These are working commitments rather than slogans — they decide what gets built and what gets left alone."
            />
          </Reveal>

          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value, index) => (
              <Reveal as="li" key={value.title} delay={(index % 3) * 0.07}>
                <div className="flex h-full flex-col gap-3 rounded-2xl border border-hairline bg-surface/60 p-6">
                  <h3 className="text-base font-semibold text-ink">
                    {value.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-ink-muted">
                    {value.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Current focus + vision ───────────────────────────────────────── */}
      <section className="shell section-y">
        <div className="grid gap-12 md:grid-cols-2 lg:gap-16">
          <Reveal className="flex flex-col gap-6">
            <SectionHeading eyebrow="Now" heading={currentFocus.heading} />
            <ul className="flex flex-col gap-4">
              {currentFocus.items.map((item) => (
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

          <Reveal delay={0.1} className="flex flex-col gap-6">
            <SectionHeading eyebrow="Ahead" heading={vision.heading} />
            {vision.paragraphs.map((paragraph, i) => (
              <p key={i} className="leading-relaxed text-ink-muted">
                {paragraph}
              </p>
            ))}
          </Reveal>
        </div>
      </section>

      <CallToAction
        heading="Interested in working together?"
        body="I am open to conversations about healthcare innovation, AI-assisted workflows, teaching, research, and creative technology."
        secondary={{ label: "See My Projects", href: "/projects" }}
      />
    </>
  );
}

/* ── Local presentational helpers ──────────────────────────────────────── */

function CredentialBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="eyebrow">{title}</h3>
      {children}
    </div>
  );
}

function PlainList({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  return (
    <ul className={className}>
      {items.map((item) => (
        <li key={item} className="flex gap-3 py-1 text-sm text-ink-muted">
          <span
            aria-hidden="true"
            className="mt-2 size-1 shrink-0 rounded-full bg-accent"
          />
          <span className="leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
}
