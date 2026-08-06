/** Section 2 — Professional pillars. */

import { pillars } from "@/data/pillars";
import { PillarCard } from "@/components/cards/PillarCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Pillars() {
  return (
    <section className="border-t border-hairline">
      <div className="shell section-y">
        <Reveal>
          <SectionHeading
            eyebrow="What I do"
            heading="Four disciplines, one way of working."
            lead="Each of these areas informs the others. The healthcare experience is what makes the AI work practical; the teaching is what makes any of it useful to someone else."
          />
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, index) => (
            <Reveal key={pillar.title} delay={index * 0.07}>
              <PillarCard {...pillar} className="h-full" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
