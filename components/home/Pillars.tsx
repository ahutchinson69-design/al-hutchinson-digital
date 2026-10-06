/** Section 2 — Professional pillars, as an asymmetric bento grid. */

import { pillars } from "@/data/pillars";
import { PillarCard } from "@/components/cards/PillarCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

// 6-column grid: row 1 is 4+2, row 2 is 2+4 — exactly four cells.
const spans = [
  "lg:col-span-4",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-4",
];

export function Pillars() {
  return (
    <section>
      <div className="shell section-y">
        <Reveal>
          <SectionHeading
            eyebrow="What I do"
            heading="Four disciplines, one way of working."
            lead="Each of these areas informs the others. The healthcare experience is what makes the AI work practical; the teaching is what makes any of it useful to someone else."
          />
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {pillars.map((pillar, index) => (
            <Reveal
              key={pillar.title}
              delay={index * 0.08}
              className={`${spans[index] ?? "lg:col-span-3"} sm:col-span-1 ${index % 3 === 0 ? "sm:col-span-2 lg:col-span-4" : ""}`}
            >
              <PillarCard
                {...pillar}
                featured={index === 0 || index === 3}
                className="h-full"
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
