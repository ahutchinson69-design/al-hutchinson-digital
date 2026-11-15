"use client";

/**
 * Section 1 — Hero ("The Split Screen").
 *
 * Desktop: the message and calls to action fill the left half; the portrait
 * fills the right half edge to edge, with the two headline figures overlaid.
 * Phone: the portrait and figures come first, the message follows.
 * Content fades and rises on load; suppressed under prefers-reduced-motion.
 */

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CalendarDays } from "lucide-react";
import { site } from "@/data/site";
import { Button } from "@/components/ui/Button";

const EYEBROW = "Healthcare • AI • Education • Creative Technology";

/** Figures from the CV. */
const STATS = [
  { value: "35 years", label: "working inside healthcare" },
  { value: "5,000+", label: "educated across three decades" },
];

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
    <section
      aria-labelledby="hero-heading"
      className="relative grid border-b border-hairline lg:min-h-[max(46rem,100dvh)] lg:grid-cols-2"
    >
      {/* ── Message ─────────────────────────────────────────────────────── */}
      <div className="order-2 flex flex-col justify-center px-5 pt-10 pb-16 sm:px-8 lg:order-1 lg:pt-36 lg:pr-14 lg:pb-20 lg:pl-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))]">
        <motion.p className="pill-label w-fit max-w-full" {...rise(0)}>
          <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-accent" />
          {EYEBROW}
        </motion.p>

        <motion.h1
          id="hero-heading"
          className="mt-6 max-w-2xl text-[2.5rem] leading-[1.03] font-semibold tracking-[-0.035em] sm:text-5xl xl:text-[4.1rem]"
          {...rise(0.08)}
        >
          Building practical technology for the future of{" "}
          <span className="text-accent">healthcare and human work.</span>
        </motion.h1>

        <motion.p
          className="mt-6 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg"
          {...rise(0.16)}
        >
          Board-certified nurse practitioner, Fleet Marine Force veteran,
          retired critical care paramedic, and educator of more than three
          decades — now building practical AI for the systems I have spent
          thirty-five years working inside.
        </motion.p>

        <motion.div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center" {...rise(0.24)}>
          <Button href="/book" size="lg">
            <CalendarDays aria-hidden="true" className="size-[1.125rem]" />
            Book a Session
          </Button>
          <Button href="/projects" variant="secondary" size="lg">
            Explore My Work
            <ArrowRight aria-hidden="true" className="size-[1.125rem]" />
          </Button>
        </motion.div>

        <motion.p className="mt-4 text-sm text-ink-muted" {...rise(0.3)}>
          New here?{" "}
          <Link
            href="/about"
            className="text-ink underline decoration-accent underline-offset-4 transition-colors hover:text-accent"
          >
            About Al
          </Link>
        </motion.p>
      </div>

      {/* ── Portrait, edge to edge ──────────────────────────────────────── */}
      <motion.div
        className="relative order-1 h-[30rem] overflow-hidden bg-surface sm:h-[36rem] lg:order-2 lg:h-auto"
        {...(reduceMotion
          ? {}
          : {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { duration: 0.9, delay: 0.1 },
            })}
      >
        {site.portrait ? (
          <Image
            src={site.portrait}
            alt={site.portraitAlt}
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            // Drawn taller than its frame so the coat embroidery at the foot of the
            // photo falls below the edge instead of peeking out beside the figures.
            className="!h-[116%] object-cover object-top"
          />
        ) : null}

        {/* Shading so the header, name and figures stay readable over the photo */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(0deg,rgb(8_9_11/0.94)_0%,rgb(8_9_11/0.55)_28%,rgb(8_9_11/0)_54%),linear-gradient(180deg,rgb(8_9_11/0.6)_0%,rgb(8_9_11/0)_18%)] lg:bg-[linear-gradient(90deg,rgb(8_9_11/0.9)_0%,rgb(8_9_11/0)_22%),linear-gradient(0deg,rgb(8_9_11/0.92)_0%,rgb(8_9_11/0.55)_26%,rgb(8_9_11/0)_52%),linear-gradient(180deg,rgb(8_9_11/0.55)_0%,rgb(8_9_11/0)_16%)]"
        />
        {/* The one accent line: along the join */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-[3px] bg-accent lg:inset-x-auto lg:inset-y-0 lg:left-0 lg:h-auto lg:w-[3px]"
        />

        <div className="absolute inset-x-5 bottom-6 flex flex-col gap-4 sm:inset-x-8 lg:inset-x-10 lg:bottom-9">
          <p className="text-xs font-semibold tracking-[0.12em] text-ink uppercase sm:text-[0.8125rem]">
            {site.personName}, {site.credentials}
          </p>
          <dl className="grid grid-cols-2 gap-2.5 sm:gap-3.5">
            {STATS.map((stat) => (
              <div
                key={stat.value}
                className="flex flex-col-reverse rounded-2xl bg-canvas/70 px-3.5 py-3.5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.14)] backdrop-blur-xl sm:px-5 sm:py-5"
              >
                <dt className="mt-2 text-xs text-ink sm:text-sm">{stat.label}</dt>
                <dd className="text-3xl leading-none font-semibold tracking-[-0.04em] text-accent sm:text-4xl xl:text-[2.9rem]">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </motion.div>
    </section>
  );
}
