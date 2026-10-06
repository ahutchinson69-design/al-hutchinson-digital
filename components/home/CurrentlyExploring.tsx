/** Section 7 — Currently exploring. */

import { currentResearch } from "@/data/pillars";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function CurrentlyExploring() {
  return (
    <section className="bg-canvas-2/60">
      <div className="shell section-y">
        <Reveal>
          <SectionHeading
            heading="Currently exploring."
            lead="Open questions I am actively working on. These are directions of enquiry, not finished findings."
          />
        </Reveal>

        {/* Bento: one large cell on the left, two stacked on the right */}
        <div className="mt-14 grid gap-4 md:grid-cols-2 md:grid-rows-2">
          {currentResearch.map((item, index) => (
            <Reveal
              key={item.title}
              delay={index * 0.08}
              className={index === 0 ? "md:row-span-2" : ""}
            >
              <article className="bezel h-full">
                <div
                  className={`bezel-core relative flex h-full flex-col gap-5 p-6 sm:p-8 ${index === 0 ? "justify-between md:min-h-96 md:p-10" : ""}`}
                >
                  {index === 0 ? (
                    <div aria-hidden="true" className="glow-warm pointer-events-none absolute inset-0 opacity-70" />
                  ) : null}
                  <span
                    aria-hidden="true"
                    className="relative inline-flex size-12 items-center justify-center rounded-2xl bg-accent/[0.08] text-accent shadow-[inset_0_0_0_1px_rgba(243,223,162,0.2)]"
                  >
                    <Icon name={item.icon} className="size-5" />
                  </span>
                  <div className="relative flex flex-col gap-3">
                    <h3 className={`font-semibold text-ink ${index === 0 ? "text-2xl sm:text-3xl" : "text-lg"}`}>
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-ink-muted sm:text-base">
                      {item.description}
                    </p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
