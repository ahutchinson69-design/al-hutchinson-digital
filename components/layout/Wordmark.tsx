/**
 * Wordmark — refined text mark, no generic tech-company logo.
 * The "AH" monogram accompanies it in the header.
 */

import Link from "next/link";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";

export function Wordmark({
  className,
  showSub = true,
}: {
  className?: string;
  showSub?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex shrink-0 items-center gap-3",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "inline-flex size-9 shrink-0 items-center justify-center rounded-lg",
          "border border-accent/25 bg-accent/[0.07] text-[0.8125rem] font-semibold",
          "tracking-tight text-accent transition-colors group-hover:bg-accent/[0.12]",
        )}
      >
        AH
      </span>

      <span className="flex flex-col leading-none">
        {/*
          "AL HUTCHINSON | DIGITAL". The name is set in the plain ink and the
          suffix in the gold accent, so the two halves read as distinct without
          either one shouting. The rule between them is a real element rather
          than a typed pipe character — its height and colour are controllable
          and screen readers do not announce it.

          `whitespace-nowrap` matters here: the two halves plus the rule make
          this lockup wide enough that a flex parent will otherwise squeeze it
          and break "AL HUTCHINSON" across two lines on a phone. Tracking
          tightens slightly below `sm` so the whole mark still fits at 320px.
        */}
        <span className="flex items-center gap-2 text-[0.75rem] font-semibold tracking-[0.1em] whitespace-nowrap sm:gap-2.5 sm:text-[0.8125rem] sm:tracking-[0.14em]">
          <span className="text-ink">{site.wordmark}</span>

          <span
            aria-hidden="true"
            className="h-3 w-px shrink-0 bg-accent/35"
          />

          <span className="text-accent">{site.wordmarkSuffix}</span>
        </span>

        {showSub ? (
          <span className="mt-1.5 text-[0.625rem] tracking-[0.1em] whitespace-nowrap text-ink-muted/80">
            {site.wordmarkSub}
          </span>
        ) : null}
      </span>

      <span className="sr-only">— {site.name} home</span>
    </Link>
  );
}
