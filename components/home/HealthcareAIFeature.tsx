/** Section 5 — Healthcare AI feature. Visually distinct from its neighbours. */

import { focusAreas, healthcareIntro, CLINICAL_SAFEGUARD } from "@/data/healthcare-ai";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";

export function HealthcareAIFeature() {
  return (
    <section className="relative overflow-hidden bg-canvas-2/60">
      <div aria-hidden="true" className="glow-warm absolute inset-0" />
      <div
        aria-hidden="true"
        className="grid-faint absolute inset-0 opacity-30 [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]"
      />

      <div className="shell section-y relative">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <Reveal className="flex flex-col gap-6">
            <p className="pill-label w-fit">Healthcare AI</p>

            <h2 className="text-2xl leading-[1.15] font-semibold sm:text-3xl lg:text-4xl">
              {healthcareIntro.heading}
            </h2>

            <p className="max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
              {healthcareIntro.body}
            </p>

            <blockquote className="max-w-xl border-l-2 border-accent py-1 pl-5 text-sm leading-relaxed text-ink italic sm:text-base">
              {CLINICAL_SAFEGUARD}
            </blockquote>

            <Button href="/healthcare-ai" className="mt-2 w-fit" withArrow>
              Explore Healthcare AI
            </Button>
          </Reveal>

          <ul className="flex flex-col gap-4">
            {focusAreas.map((area, index) => (
              <Reveal as="li" key={area.title} delay={0.1 + index * 0.08}>
                <div className="bezel"><div className="bezel-core flex gap-4 p-5 sm:p-6">
                  <span
                    aria-hidden="true"
                    className="inline-flex size-11 shrink-0 items-center justify-center rounded-2xl bg-accent/[0.08] text-accent shadow-[inset_0_0_0_1px_rgba(243,223,162,0.2)]"
                  >
                    <Icon name={area.icon} className="size-5" />
                  </span>

                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-sm font-semibold text-ink sm:text-base">
                      {area.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-ink-muted">
                      {area.description}
                    </p>
                  </div>
                </div></div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
