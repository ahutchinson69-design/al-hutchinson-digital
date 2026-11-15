/**
 * Booking.
 *
 * The kinds of session a visitor can ask for. This is a request, not an
 * instant calendar booking: the form emails the request and Al replies to
 * agree a time. Nothing here promises a price, a length or a response time —
 * add those only once they are decided.
 */

export const sessionTypes = [
  {
    id: "ai-workflow",
    title: "Healthcare AI workflow consult",
    summary:
      "Talk through a documentation, education or operations problem and where AI could realistically help.",
  },
  {
    id: "speaking",
    title: "Speaking or workshop",
    summary:
      "A talk or hands-on session on practical AI for nurses, clinicians, educators or healthcare leaders.",
  },
  {
    id: "teaching",
    title: "Teaching and training",
    summary:
      "Clinical education, instructor development or AI skills training for a team.",
  },
  {
    id: "collaboration",
    title: "Project or research collaboration",
    summary:
      "Explore building, writing or researching something together.",
  },
] as const;

export type SessionType = (typeof sessionTypes)[number];
