/**
 * Section 2 — The four disciplines, as a picture-and-icon bento grid.
 *
 * Desktop: Healthcare is one large picture tile on the left; Artificial
 * Intelligence is a wide icon tile; Teaching is an icon tile and Creative
 * Technology a small picture tile beneath it. Each tile is one link.
 */

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { pillars } from "@/data/pillars";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

/** Where each of the four tiles sits in the desktop grid. */
const placement = [
  "sm:col-span-2 lg:col-span-2 lg:row-span-2",
  "sm:col-span-2 lg:col-span-2",
  "lg:col-span-1",
  "lg:col-span-1",
];

export function Pillars() {
  return (
    <section aria-labelledby="disciplines-heading">
      <div className="shell section-y">
        <Reveal>
          <SectionHeading
            eyebrow="What I do"
            heading={<span id="disciplines-heading">Four disciplines, one way of working.</span>}
            lead="Each of these areas informs the others. The healthcare experience is what makes the AI work practical; the teaching is what makes any of it useful to someone else."
          />
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-[minmax(15.5rem,auto)_minmax(18rem,auto)]">
          {pillars.map((pillar, index) => {
            const lead = index === 0;
            const wide = index === 1;
            const picture = Boolean(pillar.image);

            return (
              <Reveal key={pillar.title} delay={index * 0.08} className={placement[index]}>
                <article
                  className={cn(
                    "group relative flex h-full min-h-64 flex-col justify-end gap-2.5 overflow-hidden rounded-3xl p-6 sm:p-7",
                    "shadow-[inset_0_0_0_1px_var(--color-hairline)] transition-[box-shadow,transform] duration-300",
                    "hover:-translate-y-1 hover:shadow-[inset_0_0_0_2px_var(--color-accent)]",
                    "focus-within:shadow-[inset_0_0_0_2px_var(--color-accent)]",
                    wide ? "bg-surface" : "bg-canvas-2",
                    lead && "min-h-80 sm:p-9 lg:min-h-0",
                  )}
                >
                  {pillar.image ? (
                    <>
                      <Image
                        src={pillar.image}
                        alt={pillar.imageAlt ?? ""}
                        fill
                        sizes={lead ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"}
                        className="object-cover saturate-[0.7] transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-[linear-gradient(0deg,rgb(8_9_11/0.96)_0%,rgb(8_9_11/0.8)_38%,rgb(8_9_11/0.25)_75%,rgb(8_9_11/0.35)_100%)]"
                      />
                    </>
                  ) : (
                    /* Icon tiles carry a large, faint copy of their icon as a backdrop */
                    <Icon
                      name={pillar.icon}
                      className={cn(
                        "pointer-events-none absolute text-accent [stroke-width:0.9]",
                        wide
                          ? "-right-4 -bottom-6 size-56 opacity-[0.16]"
                          : "-right-8 -bottom-8 size-36 opacity-[0.12]",
                      )}
                    />
                  )}

                  <span
                    aria-hidden="true"
                    className="absolute top-5 right-5 inline-flex size-10 items-center justify-center rounded-full bg-canvas/55 text-ink shadow-[inset_0_0_0_1px_rgba(255,255,255,0.16)] transition-colors duration-300 group-hover:bg-accent group-hover:text-canvas"
                  >
                    <ArrowUpRight className="size-[1.125rem]" />
                  </span>

                  <div className="relative mb-1.5 flex items-center gap-3.5">
                    <span
                      aria-hidden="true"
                      className={cn(
                        "inline-flex items-center justify-center",
                        lead ? "size-16 rounded-[1.125rem]" : "size-[3.25rem] rounded-[0.875rem]",
                        picture
                          ? "bg-accent text-canvas"
                          : "bg-accent/[0.14] text-accent-hover shadow-[inset_0_0_0_1px_rgba(61,139,255,0.4)]",
                      )}
                    >
                      <Icon name={pillar.icon} className={lead ? "size-[1.875rem]" : "size-6"} />
                    </span>
                    <span
                      aria-hidden="true"
                      className={cn(
                        "text-[0.8125rem] font-semibold tracking-[0.14em]",
                        picture ? "text-ink" : "text-ink-muted",
                      )}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3
                    className={cn(
                      "relative font-semibold text-ink",
                      lead ? "text-3xl sm:text-4xl lg:text-[2.75rem] lg:leading-[1.05]" : "text-[1.375rem] leading-[1.12]",
                    )}
                  >
                    {/* The whole tile is the link target */}
                    <Link href={pillar.href} className="outline-none after:absolute after:-inset-[100vmax] after:content-['']">
                      {pillar.title}
                    </Link>
                  </h3>
                  <p
                    className={cn(
                      "relative leading-relaxed",
                      picture ? "text-[#c9d2de]" : "text-ink-muted",
                      lead ? "max-w-md text-base sm:text-[1.0625rem]" : "text-[0.90625rem]",
                      wide && "max-w-sm",
                    )}
                  >
                    {pillar.description}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
