/** Section 3 — Personal introduction with fact tiles (all figures from the CV). */

import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

const stats = [
  { figure: "35", label: "years working inside healthcare systems" },
  { figure: "5,000+", label: "healthcare professionals and students educated" },
  { figure: "2012", label: "EMS Instructor of the Year" },
];

export function Introduction() {
  return (
    <section className="bg-canvas-2/60">
      <div className="shell section-y">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <Reveal>
            <h2 className="text-3xl leading-[1.1] font-semibold sm:text-4xl lg:text-5xl">
              Experience across disciplines. One practical mission.
            </h2>
            <p className="mt-8 text-base leading-relaxed text-ink-muted sm:text-lg">
              I began developing leadership and resilience through military service
              before building a career in healthcare. Years inside skilled nursing
              environments revealed how documentation burdens, fragmented systems,
              and outdated workflows affect both professionals and residents. My
              current work explores how artificial intelligence, thoughtful design,
              and education can create more efficient and humane systems.
            </p>
            <div className="mt-8">
              <Button href="/about" variant="secondary" withArrow>
                Read My Story
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="grid gap-4 sm:grid-cols-2">
              {stats.map((s, i) => (
                <li key={s.figure} className={`bezel ${i === 0 ? "sm:col-span-2" : ""}`}>
                  <div className="bezel-core flex h-full flex-col justify-between gap-6 p-6 sm:p-8">
                    <p className="text-5xl leading-none font-semibold text-accent sm:text-6xl">
                      {s.figure}
                    </p>
                    <p className="text-sm text-ink-muted">{s.label}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
