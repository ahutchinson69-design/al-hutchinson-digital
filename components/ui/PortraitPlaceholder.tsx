/**
 * Portrait frame.
 *
 * Renders the real photograph when `data/site.ts` supplies `portrait`, and an
 * elegant abstract monogram panel when it does not. The placeholder is an
 * inline SVG — no stock photography, no robot or circuit-board clichés.
 */

import Image from "next/image";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";

export function PortraitPlaceholder({
  className,
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  const frame = cn(
    "relative isolate aspect-4/5 w-full overflow-hidden rounded-[1.625rem]",
    "bg-canvas-2",
    className,
  );

  if (site.portrait) {
    return (
      <div className={frame}>
        <Image
          src={site.portrait}
          alt={site.portraitAlt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 28rem, (min-width: 640px) 60vw, 90vw"
          // The source file is cropped to 4:5 — the same ratio as this frame —
          // so `object-cover` scales it without discarding anything at any
          // viewport width. Keep any replacement photograph at 4:5 (e.g.
          // 1600 × 2000) and the framing stays predictable.
          className="object-cover object-center"
        />
      </div>
    );
  }

  return (
    <div className={frame}>
      {/* Faint grid + warm glow, matching the hero treatment */}
      <div aria-hidden="true" className="grid-faint absolute inset-0 opacity-60" />
      <div aria-hidden="true" className="glow-warm absolute inset-0" />

      <svg
        viewBox="0 0 400 500"
        className="relative size-full"
        role="img"
        aria-label={`Portrait placeholder for ${site.personName}`}
      >
        <defs>
          <radialGradient id="portrait-halo" cx="50%" cy="42%" r="46%">
            <stop offset="0%" stopColor="#f3dfa2" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#f3dfa2" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="400" height="500" fill="url(#portrait-halo)" />

        {/* Concentric rings — an abstract nod to signal and structure */}
        {[132, 100, 68].map((r, i) => (
          <circle
            key={r}
            cx="200"
            cy="212"
            r={r}
            fill="none"
            stroke="#f3dfa2"
            strokeOpacity={0.1 + i * 0.05}
            strokeWidth="1"
          />
        ))}

        <text
          x="200"
          y="212"
          textAnchor="middle"
          dominantBaseline="central"
          fill="#f3dfa2"
          fillOpacity="0.9"
          fontSize="72"
          fontWeight="600"
          letterSpacing="4"
          fontFamily="var(--font-geist-sans), system-ui, sans-serif"
        >
          AH
        </text>

        <text
          x="200"
          y="392"
          textAnchor="middle"
          fill="#a7a7b0"
          fontSize="13"
          letterSpacing="3"
          fontFamily="var(--font-geist-sans), system-ui, sans-serif"
        >
          PORTRAIT PLACEHOLDER
        </text>
      </svg>
    </div>
  );
}
