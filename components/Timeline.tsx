/**
 * Timeline — the career phases from data/timeline.ts.
 *
 * Entries with `period: null` render no date rather than an invented one; the
 * component shows a neutral "Period to be added" marker instead.
 */

import { timeline } from "@/data/timeline";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";

export function Timeline() {
  return (
    <ol className="relative flex flex-col gap-0">
      {timeline.map((entry, index) => (
        <Reveal as="li" key={entry.id} delay={index * 0.05} className="relative">
          <div className="flex gap-5 sm:gap-6">
            {/* Rail: icon marker + connecting line */}
            <div className="flex flex-col items-center">
              <span
                aria-hidden="true"
                className="inline-flex size-12 shrink-0 items-center justify-center rounded-2xl bg-surface text-accent shadow-[inset_0_0_0_1px_rgba(243,223,162,0.2)]"
              >
                <Icon name={entry.icon} className="size-5" />
              </span>
              {index < timeline.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="w-px flex-1 bg-linear-to-b from-hairline-strong to-transparent"
                />
              ) : null}
            </div>

            <div className="flex-1 pb-10">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="text-base font-semibold text-ink sm:text-lg">
                  {entry.title}
                </h3>
                <span className="text-xs tracking-wide text-ink-muted/70 uppercase">
                  {entry.period ?? "Period to be added"}
                </span>
              </div>

              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted">
                {entry.description}
              </p>
            </div>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
