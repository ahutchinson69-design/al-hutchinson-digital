/**
 * The four professional pillars shown on the homepage.
 * `icon` maps to a key in components/ui/Icon.tsx.
 */

import type { IconName } from "@/components/ui/Icon";

export type Pillar = {
  title: string;
  description: string;
  href: string;
  icon: IconName;
};

export const pillars: Pillar[] = [
  {
    title: "Healthcare",
    description:
      "Clinical and skilled nursing experience grounded in real operational challenges.",
    href: "/healthcare-ai",
    icon: "heartPulse",
  },
  {
    title: "Artificial Intelligence",
    description:
      "Practical AI workflows, prompt systems, automation concepts, and emerging-technology analysis.",
    href: "/projects?category=AI",
    icon: "circuit",
  },
  {
    title: "Teaching and Leadership",
    description:
      "Educational resources, professional development, military leadership, and a long-term commitment to teaching future healthcare professionals.",
    href: "/teaching",
    icon: "graduationCap",
  },
  {
    title: "Creative Technology",
    description:
      "Moon Tape Radio, visual storytelling, multimedia production, and experimental design concepts.",
    href: "/media",
    icon: "waveform",
  },
];

/**
 * "Currently exploring" research cards on the homepage.
 * These describe areas of interest — they make no claim of completed work.
 */
export const currentResearch = [
  {
    title: "AI-assisted skilled nursing operations",
    description:
      "How documentation, scheduling, and quality workflows inside skilled nursing facilities could be restructured around AI assistance without displacing professional judgment.",
    icon: "clipboard" as IconName,
  },
  {
    title: "Future healthcare education",
    description:
      "What healthcare professionals actually need to learn about AI tools, and how that education can be delivered in a way that fits clinical schedules.",
    icon: "graduationCap" as IconName,
  },
  {
    title: "Human-centered intelligent systems",
    description:
      "Design patterns that keep intelligent systems legible, correctable, and accountable to the people responsible for the outcome.",
    icon: "compass" as IconName,
  },
];
