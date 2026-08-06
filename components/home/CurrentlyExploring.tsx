/** Section 7 — Currently exploring. */

import { currentResearch } from "@/data/pillars";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function CurrentlyExploring() {
  return (
    <section className="bg-canvas-2">
      <div className="shell section-y">
        <Reveal>
          <SectionHeading
            eyebrow="Current research"
            heading="Currently exploring."
            lead="Open questions I am actively working on. These are directions of enquiry, not finished findings."
          />
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {currentResearch.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.08}>
              <article className="flex h-full flex-col gap-4 rounded-2xl border border-hairline bg-surface/60 p-6">
                <span
                  aria-hidden="true"
                  className="inline-flex size-10 items-center justify-center rounded-xl border border-hairline bg-accent/[0.07] text-accent"
                >
                  <Icon name={item.icon} className="size-5" />
                </span>

                <h3 className="text-base font-semibold text-ink">{item.title}</h3>

                <p className="text-sm leading-relaxed text-ink-muted">
                  {item.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
