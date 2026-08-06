/**
 * Teaching page content.
 *
 * The teaching record below is from Al's CV and is verified. Workshop formats
 * describe what can be delivered, not a delivery history. Downloadable guides
 * still point at clearly-labelled placeholder files under /public/resources
 * until real material replaces them.
 */

import type { IconName } from "@/components/ui/Icon";

export const teachingPhilosophy = {
  heading: "Teach the judgment, not just the tool.",
  paragraphs: [
    "I have been teaching since 1988. Tools change quickly; the ability to evaluate a tool — to work out what it is reliable for, where it fails, and what remains your responsibility regardless — outlasts any particular piece of software.",
    "Good professional education respects the schedule of the person receiving it. Healthcare professionals rarely have a free afternoon. Material that is short, specific, and immediately applicable reaches the floor; material that assumes uninterrupted study does not.",
    "I teach from operational experience rather than from theory alone. Thirty-five years of it — combat medicine, critical care transport, emergency nursing, an academic medical center, and skilled nursing. The examples come from friction that actually shows up in a working environment, and the goal is always that someone can use it during their next shift.",
  ],
};

/**
 * Teaching record. Every figure here appears on the CV — do not round up,
 * embellish, or add outcomes that were not measured.
 */
export const teachingRecord = {
  heading: "Three decades of teaching.",
  stats: [
    {
      figure: "5,000+",
      label: "Healthcare professionals, EMS providers, nurses and students educated",
    },
    { figure: "Since 1988", label: "American Heart Association instructor" },
    { figure: "BLS · ACLS · PALS", label: "Certified instructor across all three" },
  ],
  highlights: [
    "Named EMS Instructor of the Year in 2012 by the Gordo Police Department, in recognition of teaching excellence and provider development.",
    "Developed and delivered EMS training programs spanning initial certification through advanced continuing education.",
    "Created a Nursing Preceptor Course for Baptist Memorial Hospital to standardise onboarding and clinical mentorship.",
    "Served as clinical preceptor to nurses, paramedics and students across both clinical and prehospital settings.",
    "Sole moderator of r/Paramedics, a professional EMS community of more than 65,000 members, promoting evidence-based practice to a national and international audience.",
  ],
};

export const teachingTopics: {
  title: string;
  description: string;
  icon: IconName;
}[] = [
  {
    title: "Practical AI for healthcare professionals",
    description:
      "What these tools reliably do, where they fail, and how to verify output before it reaches a record or a decision.",
    icon: "circuit",
  },
  {
    title: "AI-assisted résumé development",
    description:
      "Turning clinical experience into accurate, specific professional language — without inflating the record.",
    icon: "fileText",
  },
  {
    title: "Prompt design",
    description:
      "Structuring requests so the output is specific enough to check, and repeatable enough to build a workflow around.",
    icon: "sparkles",
  },
  {
    title: "Skilled nursing workflow improvement",
    description:
      "Finding the steps that exist to compensate for earlier failures, and addressing the cause rather than the symptom.",
    icon: "building",
  },
  {
    title: "Emerging healthcare technology",
    description:
      "Separating demonstrated capability from projected capability, in plain language.",
    icon: "compass",
  },
  {
    title: "Technology literacy and ethical AI use",
    description:
      "Privacy obligations, professional accountability, and the limits that hold no matter what a vendor claims.",
    icon: "shield",
  },
];

export const workshopFormats = [
  {
    title: "Short session",
    duration: "45–60 minutes",
    description:
      "A single topic delivered in one sitting — suitable for in-service education or a staff meeting slot.",
  },
  {
    title: "Half-day workshop",
    duration: "3–4 hours",
    description:
      "Hands-on work through a complete AI-assisted workflow, with time for participants to apply it to their own material.",
  },
  {
    title: "Multi-part series",
    duration: "Several sessions",
    description:
      "A sequence building from tool literacy to workflow design, spaced so participants can practise between sessions.",
  },
];

/**
 * Downloadable resources.
 * Each is a 1–2 page infographic-style PDF, rendered from the HTML sources in
 * /public/resources/src (see the README there for the render command).
 */
export const resources = [
  {
    title: "Practical AI Starter Guide",
    description:
      "A short orientation for healthcare professionals beginning to use AI tools in a work context.",
    href: "/resources/practical-ai-starter-guide.pdf",
    isPlaceholder: false,
  },
  {
    title: "Résumé Workflow Worksheet",
    description:
      "A structured set of prompts for describing clinical experience accurately and specifically.",
    href: "/resources/resume-workflow-worksheet.pdf",
    isPlaceholder: false,
  },
  {
    title: "Prompt Design Reference",
    description:
      "Patterns for writing requests that produce checkable, repeatable output.",
    href: "/resources/prompt-design-reference.pdf",
    isPlaceholder: false,
  },
];

export const speakingInterests = [
  "Healthcare conferences and professional association meetings",
  "Facility in-service and staff development programs",
  "Nursing and allied health education programs",
  "Panels on AI in clinical and operational settings",
  "Podcasts and interviews on healthcare technology",
];
