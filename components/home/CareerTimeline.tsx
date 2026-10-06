/** Section 6 — Career timeline. */

import { Timeline } from "@/components/Timeline";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function CareerTimeline() {
  return (
    <section>
      <div className="shell section-y">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal className="flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              heading="From service, to care, to systems."
              lead="Thirty-five years, in the order it happened. Each phase supplied a constraint the next one had to respect."
            />
          </Reveal>

          <div>
            <Timeline />
          </div>
        </div>
      </div>
    </section>
  );
}
