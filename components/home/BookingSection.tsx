/** Section 9 — Booking: what can be booked, and the way in. */

import { CalendarClock } from "lucide-react";
import { sessionTypes } from "@/data/booking";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function BookingSection() {
  return (
    <section id="book" className="border-y border-hairline bg-canvas-2">
      <div className="shell section-y">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal className="flex flex-col items-start gap-8">
            <SectionHeading
              eyebrow="Book a session"
              heading="Bring a problem. Leave with a next step."
              lead="Request time to talk through a healthcare AI idea, a workshop, training for your team, or a project we could build together."
            />
            <Button href="/book" size="lg" withArrow>
              Request a Session
            </Button>
            <p className="flex items-center gap-2 text-sm text-ink-muted">
              <CalendarClock aria-hidden="true" className="size-4 shrink-0 text-accent" />
              Send the times that suit you. I reply by email to confirm.
            </p>
          </Reveal>

          <ul className="grid gap-4 sm:grid-cols-2">
            {sessionTypes.map((type, index) => (
              <Reveal key={type.id} delay={index * 0.06}>
                <li className="flex h-full flex-col gap-3 rounded-2xl border border-hairline bg-surface p-6">
                  <h3 className="text-base font-semibold text-ink">{type.title}</h3>
                  <p className="text-sm leading-relaxed text-ink-muted">{type.summary}</p>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
