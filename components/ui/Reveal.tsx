"use client";

/**
 * Reveal — the site's single scroll-reveal primitive.
 *
 * Content fades, un-blurs and rises once, the first time it enters the
 * viewport. With reduced motion the children render immediately.
 */

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Stagger delay in seconds. */
  delay?: number;
  /** Travel distance in pixels. */
  y?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article";
};

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = "div",
}: Props) {
  const reduceMotion = useReducedMotion();
  const Component = motion[as];

  if (reduceMotion) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -60px 0px" }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.32, 0.72, 0, 1],
      }}
    >
      {children}
    </Component>
  );
}
