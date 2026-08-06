/**
 * Career timeline.
 *
 * Every entry below is drawn from Al Hutchinson's CV. Dates, employers, units
 * and roles are as stated there — do not add anything that is not on the CV,
 * and do not soften or inflate what is.
 */

import type { IconName } from "@/components/ui/Icon";

export type TimelineEntry = {
  id: string;
  title: string;
  /** Organisation or unit. */
  org?: string;
  /** e.g. "1987 – 1991". Null renders no date. */
  period: string | null;
  description: string;
  icon: IconName;
  /** True while the description is scaffolding rather than a real account. */
  isPlaceholder: boolean;
};

export const timeline: TimelineEntry[] = [
  {
    id: "military",
    title: "Fleet Marine Force Corpsman",
    org: "United States Navy · 2nd Marine Division, 8th Marine Regiment",
    period: "1987 – 1991",
    description:
      "Expeditionary and battlefield medical care with the 2nd Marine Division, 8th Marine Regiment. Deployed in support of Operations Desert Shield and Desert Storm, delivering combat casualty care in Southwest Asia — field trauma stabilization, sick call, preventive medicine, and casualty evacuation coordination in austere forward environments.",
    icon: "shield",
    isPlaceholder: false,
  },
  {
    id: "paramedic",
    title: "Paramedic",
    org: "Stat Ambulance Service",
    period: "1996 – 2001",
    description:
      "911 emergency response and advanced life support across a diverse patient population — the foundation for everything that followed in critical care transport and emergency nursing.",
    icon: "heartPulse",
    isPlaceholder: false,
  },
  {
    id: "critical-care",
    title: "Critical Care Paramedic",
    org: "Emergystat Ambulance Service · Pickens County Ambulance Service",
    period: "2001 – 2014",
    description:
      "High-acuity prehospital and interfacility critical care transport, including ventilator, cardiac, and multi-drip patient management. Served as field leader and preceptor, supervising paramedics and EMTs, and supported EMS quality assurance and continuing education for field crews.",
    icon: "circuit",
    isPlaceholder: false,
  },
  {
    id: "emergency-nursing",
    title: "Emergency and Acute Care Nurse",
    org: "Baptist Memorial Hospital – Golden Triangle · Jackson-Madison County General Hospital",
    period: "2015 – 2019",
    description:
      "Emergency and medical-surgical nursing in high-volume regional hospitals, applying prehospital critical care expertise to rapid triage, resuscitation, and stabilization. Served as clinical resource and preceptor, bridging EMS and nursing practice.",
    icon: "building",
    isPlaceholder: false,
  },
  {
    id: "johns-hopkins",
    title: "Registered Nurse",
    org: "Johns Hopkins Bayview Medical Center",
    period: "2019 – 2021",
    description:
      "Acute and critical care nursing inside a nationally recognised academic medical center. Served on the front lines of the COVID-19 pandemic response, caring for high-acuity and isolation patients under evolving protocols alongside attending physicians, residents, and fellows.",
    icon: "heartPulse",
    isPlaceholder: false,
  },
  {
    id: "nurse-practitioner",
    title: "Primary Care Nurse Practitioner",
    org: "MedElite Healthcare Management",
    period: "2023 – Present",
    description:
      "Primary care for a daily census of 20–25 patients across skilled nursing and long-term care facilities. Complex chronic disease management, wound and palliative care, transitional and post-acute management, interdisciplinary care coordination, and advance-care-planning conversations aimed at reducing avoidable hospitalizations.",
    icon: "clipboard",
    isPlaceholder: false,
  },
  {
    id: "education",
    title: "Healthcare Educator",
    org: "American Heart Association Instructor — BLS / ACLS / PALS",
    period: "1988 – Present",
    description:
      "More than 5,000 healthcare professionals, EMS providers, nurses, and students educated across three decades. Named EMS Instructor of the Year in 2012. Built EMS training programs from initial certification through advanced continuing education, and created a Nursing Preceptor Course for Baptist Memorial Hospital.",
    icon: "graduationCap",
    isPlaceholder: false,
  },
  {
    id: "doctoral",
    title: "DNP Candidate and Healthcare AI Work",
    org: "University of Texas at Arlington",
    period: "Expected 2028",
    description:
      "Doctoral study alongside applied work in healthcare artificial intelligence, informatics, quality improvement, and evidence-based practice — including evaluating large language models for accuracy, safety, and clinical relevance, and building the AI concepts published under Hutchinson FutureWorks.",
    icon: "compass",
    isPlaceholder: false,
  },
];
