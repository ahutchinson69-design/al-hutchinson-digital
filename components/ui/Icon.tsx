/**
 * Icon registry.
 *
 * Data files reference icons by name so that content stays free of component
 * imports. Add a new icon by extending `iconMap` — the `IconName` type updates
 * automatically and TypeScript will flag any data file using an unknown name.
 */

import {
  ArrowRight,
  ArrowUpRight,
  AudioWaveform,
  Building2,
  ClipboardList,
  Compass,
  Cpu,
  FileText,
  GraduationCap,
  HeartPulse,
  Lightbulb,
  Music,
  Play,
  Shield,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export const iconMap = {
  arrowRight: ArrowRight,
  arrowUpRight: ArrowUpRight,
  building: Building2,
  circuit: Cpu,
  clipboard: ClipboardList,
  compass: Compass,
  fileText: FileText,
  graduationCap: GraduationCap,
  heartPulse: HeartPulse,
  lightbulb: Lightbulb,
  music: Music,
  play: Play,
  shield: Shield,
  sparkles: Sparkles,
  waveform: AudioWaveform,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof iconMap;

type IconProps = {
  name: IconName;
  className?: string;
  /** Icons are decorative by default; pass a label to expose them to AT. */
  label?: string;
};

export function Icon({ name, className, label }: IconProps) {
  const Component = iconMap[name];
  return (
    <Component
      className={className}
      strokeWidth={1.6}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? "img" : undefined}
    />
  );
}
