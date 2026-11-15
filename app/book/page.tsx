import { Mail } from "lucide-react";
import { site } from "@/data/site";
import { sessionTypes } from "@/data/booking";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { BookingForm } from "@/components/BookingForm";
import { Reveal } from "@/components/ui/Reveal";

export const metadata = pageMetadata({
  title: "Book a Session",
  description:
    "Request a session with Al Hutchinson, NP: healthcare AI workflow consults, speaking and workshops, clinical teaching and training, or project collaboration.",
  path: "/book",
});

const steps = [
  "Choose the kind of session and send two or three times that suit you.",
  "I reply by email to agree a time and how we will meet.",
  "We talk it through, and you leave with a clear next step.",
];

export default function BookPage() {
  return (
    <>
      <PageHero
        eyebrow="Book a session"
        heading="Book a session with Al Hutchinson."
        lead="For healthcare AI questions, talks and workshops, team training, or a project worth building together."
      />

      <section className="shell section-y">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal className="flex flex-col gap-10">
            <div className="flex flex-col gap-5">
              <h2 className="eyebrow">What you can book</h2>
              <ul className="flex flex-col gap-5">
                {sessionTypes.map((type) => (
                  <li key={type.id} className="flex flex-col gap-1.5">
                    <h3 className="text-base font-semibold text-ink">{type.title}</h3>
                    <p className="text-sm leading-relaxed text-ink-muted">{type.summary}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-5">
              <h2 className="eyebrow">How it works</h2>
              <ol className="flex flex-col gap-3">
                {steps.map((step, index) => (
                  <li key={step} className="flex gap-3 text-sm text-ink-muted">
                    <span className="font-mono text-accent">{index + 1}</span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="eyebrow">Prefer email?</h2>
              <a
                href={`mailto:${site.email}?subject=${encodeURIComponent("Booking request")}`}
                className="flex items-center gap-3 text-sm text-ink transition-colors hover:text-accent"
              >
                <Mail aria-hidden="true" className="size-4 shrink-0 text-accent" />
                {site.email}
              </a>
            </div>
          </Reveal>

          {/* The form comes first on a phone, where the details would push it far down. */}
          <Reveal delay={0.1} className="order-first lg:order-none">
            <div className="rounded-2xl border border-hairline bg-surface/60 p-6 sm:p-8">
              <h2 className="mb-6 text-xl font-semibold text-ink">Your request</h2>
              <BookingForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
