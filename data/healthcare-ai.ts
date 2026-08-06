/**
 * Content for the Healthcare AI page and the homepage Healthcare AI feature.
 *
 * Accuracy note: nothing here claims a clinical outcome, a study result, or a
 * measured improvement. The page describes observed friction and design
 * positions — not evidence of effect.
 */

import type { IconName } from "@/components/ui/Icon";

/** The safeguard statement required to appear visibly on the page. */
export const CLINICAL_SAFEGUARD =
  "AI systems should support professional judgment, not replace licensed clinical decision-making.";

/** Rendered site-wide beneath healthcare content. */
export const MEDICAL_DISCLAIMER =
  "This website is a professional portfolio. It does not provide medical advice, diagnosis, or treatment, and nothing on it establishes a clinical relationship.";

export const healthcareIntro = {
  heading: "AI should solve real healthcare problems.",
  body: "The most valuable healthcare technology is not the technology that appears most advanced. It is the technology that reduces friction, supports better decisions, protects patients, and allows professionals to focus more attention on care.",
};

/**
 * Why these observations carry weight. Every claim traces to the CV — the
 * daily census, the settings, and the years are all stated there.
 */
export const standing = {
  heading: "This is written from inside the building.",
  body: "I am a board-certified nurse practitioner carrying a daily census of 20–25 medically fragile patients across skilled nursing and long-term care facilities. Before that: twenty-seven years in emergency medical services, emergency and critical care nursing, and a pandemic spent on the front line of an academic medical center. The observations on this page are not gathered from research about healthcare workflows. They are what the work looks like from where I stand in it.",
  points: [
    "Practising in skilled nursing and long-term care today, not recalling it",
    "Thirty-five years across military medicine, EMS, emergency nursing and primary care",
    "DNP candidate researching healthcare AI, informatics and quality improvement",
  ],
};

/** Three focus areas shown on the homepage feature section. */
export const focusAreas = [
  {
    title: "Documentation and clinical workflow",
    description:
      "Reducing duplicated entry and making the shape of routine documentation predictable.",
    icon: "clipboard" as IconName,
  },
  {
    title: "Quality assurance and risk monitoring",
    description:
      "Surfacing gaps while they can still be corrected, rather than at audit.",
    icon: "shield" as IconName,
  },
  {
    title: "Workforce education and operational efficiency",
    description:
      "Giving staff a usable framework for when these tools can and cannot be relied on.",
    icon: "graduationCap" as IconName,
  },
];

/** Problems observed in healthcare workflows. */
export const observedProblems = [
  {
    title: "Documentation consumes clinical time",
    description:
      "Recording care competes directly with delivering it, and the competition intensifies as staffing tightens.",
  },
  {
    title: "Systems do not talk to each other",
    description:
      "The same information is entered more than once because the tools holding it were never designed to interoperate.",
  },
  {
    title: "Problems surface late",
    description:
      "Gaps are frequently discovered during review, audit, or survey — long after the moment when correcting them would have been simple.",
  },
  {
    title: "Training assumes time that does not exist",
    description:
      "Education designed around uninterrupted sessions rarely reaches staff working a full clinical schedule.",
  },
];

/** Where AI assistance plausibly helps. */
export const opportunities = [
  {
    title: "Documentation systems",
    description:
      "Structuring and cross-checking what a clinician has already recorded — organising entries, flagging omissions and contradictions at the point of care, and leaving the clinical narrative to the clinician.",
    icon: "clipboard" as IconName,
  },
  {
    title: "Quality and compliance support",
    description:
      "Continuous, low-friction visibility into the records that quality and regulatory review depend on, so that preparation is a routine state rather than an event.",
    icon: "shield" as IconName,
  },
  {
    title: "Workforce training",
    description:
      "Short, specific, role-relevant education on using AI tools responsibly — including how to verify output and what must never be entered into a general-purpose system.",
    icon: "graduationCap" as IconName,
  },
  {
    title: "Skilled nursing innovation",
    description:
      "Rethinking how operational and quality information moves through a facility, rather than layering software onto processes that were never designed for it.",
    icon: "building" as IconName,
  },
];

/** Ethical safeguards — non-negotiable design positions. */
export const safeguards = [
  "A licensed professional remains accountable for every clinical decision.",
  "AI-generated content is always attributable, reviewable, and straightforward to reject.",
  "Systems disclose their limits rather than presenting uniform confidence.",
  "Protected health information is handled under the applicable regulatory framework, never entered into general-purpose consumer tools.",
  "Assistive systems must reduce total workload — a tool that only relocates effort has not helped.",
  "Staff are trained on failure modes, not only on features.",
];
