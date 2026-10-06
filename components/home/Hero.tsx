"use client";

/**
 * Section 1 — Hero.
 *
 * Two columns on desktop, stacked on mobile. Content fades and rises on load;
 * the portrait glow drifts very slowly. Both are suppressed under
 * prefers-reduced-motion.
 */

import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { PortraitPlaceholder } from "@/components/ui/PortraitPlaceholder";

const EYEBROW =
  "Healthcare • Artificial Intelligence • Education • Creative Technology";

export function Hero() {
  const reduceMotion = useReducedMotion();

  const rise = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section className="relative overflow-hidden">
      <div aria-hidden="true" className="glow-warm absolute inset-0" />

      <div className="shell relative grid items-center gap-12 pt-32 pb-20 sm:pt-36 md:min-h-[100dvh] md:pt-44 md:pb-28 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
        {/* ── Left column ─────────────────────────────────────────────── */}
        <div className="flex flex-col gap-7">
          <motion.p className="pill-label w-fit max-w-full" {...rise(0)}>
            {EYEBROW}
          </motion.p>

          <motion.h1
            className="max-w-2xl text-4xl leading-[1.05] font-semibold sm:text-5xl lg:text-7xl"
            {...rise(0.08)}
          >
            Building practical technology for the future of{" "}
            <span className="text-accent">healthcare and human work.</span>
          </motion.h1>

          <motion.p
            className="max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg"
            {...rise(0.16)}
          >
            Board-certified nurse practitioner, Fleet Marine Force veteran,
            retired critical care paramedic, and educator of more than three
            decades — now building practical AI for the systems I have spent
            thirty-five years working inside.
          </motion.p>

          <motion.div
            className="flex flex-col gap-3 sm:flex-row sm:items-center"
            {...rise(0.24)}
          >
            <Button href="/projects" size="lg" withArrow>
              Explore My Work
            </Button>
            <Button href="/about" variant="secondary" size="lg">
              About Al
            </Button>
          </motion.div>
        </div>

        {/* ── Right column: portrait ──────────────────────────────────── */}
        <motion.div
          className="relative mx-auto w-full max-w-sm lg:max-w-none"
          {...(reduceMotion
            ? {}
            : {
                initial: { opacity: 0, scale: 0.97 },
                animate: { opacity: 1, scale: 1 },
                transition: {
                  duration: 0.9,
                  delay: 0.15,
                  ease: [0.22, 1, 0.36, 1] as const,
                },
              })}
        >
          {/* Slow ambient glow behind the portrait */}
          {reduceMotion ? null : (
            <motion.div
              aria-hidden="true"
              className="absolute -inset-10 rounded-full bg-accent/[0.07] blur-3xl"
              animate={{ opacity: [0.5, 0.85, 0.5], scale: [1, 1.06, 1] }}
              transition={{
                duration: 11,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}

          <div className="bezel relative">
            <PortraitPlaceholder priority />
          </div>

          {/* Floating fact chips (figures from the CV) */}
          <div className="absolute -bottom-5 -left-3 rounded-2xl bg-canvas/80 px-4 py-3 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12),0_20px_40px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl sm:-left-8">
            <p className="text-2xl leading-none font-semibold text-accent">35 years</p>
            <p className="mt-1 text-xs text-ink-muted">working inside healthcare</p>
          </div>
          <div className="absolute -top-4 -right-2 rounded-2xl bg-canvas/80 px-4 py-3 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12),0_20px_40px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl sm:-right-6">
            <p className="text-2xl leading-none font-semibold text-accent">5,000+</p>
            <p className="mt-1 text-xs text-ink-muted">educated across three decades</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
