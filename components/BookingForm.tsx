"use client";

/**
 * BookingForm — a request to book a session.
 *
 * This is not a live calendar. It collects the kind of session and the times
 * that suit the visitor, then sends them through the same /api/contact route
 * as the contact form, so a request arrives as an email to reply to. Like the
 * contact form, it says so plainly when delivery is not set up or fails.
 *
 * Accessibility: every field has a <label>; errors are tied to their field
 * with aria-describedby; the error summary and failure notice take focus.
 */

import { useRef, useState } from "react";
import { CircleAlert, CircleCheck, LoaderCircle } from "lucide-react";
import { site } from "@/data/site";
import { sessionTypes } from "@/data/booking";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

type FieldName = "name" | "email" | "organization" | "session" | "times" | "timezone" | "details";
type Errors = Partial<Record<FieldName, string>>;
type SendFailure = "not_configured" | "rate_limited" | "send_failed";

const initialValues: Record<FieldName, string> = {
  name: "",
  email: "",
  organization: "",
  session: "",
  times: "",
  timezone: "",
  details: "",
};

const LABELS: Record<FieldName, string> = {
  name: "Name",
  email: "Email",
  organization: "Organization",
  session: "Session type",
  times: "Days and times that suit you",
  timezone: "Your time zone",
  details: "What you would like to cover",
};

function validate(values: Record<FieldName, string>): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "Enter your name.";
  if (!values.email.trim()) errors.email = "Enter your email address.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
    errors.email = "Enter a valid email address, for example name@example.com.";
  if (!values.session) errors.session = "Choose a session type.";
  if (values.times.trim().length < 5)
    errors.times = "Give two or three days and times that suit you.";
  return errors;
}

/** The browser's own time zone, used when the visitor leaves that field empty. */
function detectedTimeZone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone ?? "";
  } catch {
    return "";
  }
}

/** The request as one plain-text message for the contact route. */
export function bookingMessage(values: Record<FieldName, string>): string {
  return [
    "Booking request",
    `Session type: ${values.session}`,
    `Preferred days and times: ${values.times.trim()}`,
    `Time zone: ${values.timezone.trim() || "not given"}`,
    "",
    values.details.trim() || "No further details given.",
  ].join("\n");
}

const fieldClasses = (hasError: boolean) =>
  cn(
    "w-full rounded-lg border bg-canvas-2 px-4 py-3 text-base text-ink",
    "placeholder:text-ink-muted/50 transition-colors",
    "focus:border-accent focus:outline-none",
    hasError ? "border-red-400/60" : "border-hairline hover:border-hairline-strong",
  );

const FAILURE_COPY: Record<SendFailure, { title: string; body: string }> = {
  not_configured: {
    title: "Booking requests are not connected yet",
    body: "Email delivery has not been set up on this site, so your request was not sent. Please email me directly with the times that suit you:",
  },
  rate_limited: {
    title: "Too many requests just now",
    body: "This form accepts a few requests at a time to keep out spam. Please wait a few minutes and try again, or email me directly:",
  },
  send_failed: {
    title: "That did not go through",
    body: "Something went wrong on the way to my inbox and your request was not delivered. Please try again in a moment, or email me directly:",
  },
};

export function BookingForm({ initialSession = "" }: { initialSession?: string }) {
  const [values, setValues] = useState({ ...initialValues, session: initialSession });
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "submitting" | "success">("idle");
  const [failure, setFailure] = useState<SendFailure | null>(null);
  const [website, setWebsite] = useState("");
  const summaryRef = useRef<HTMLDivElement>(null);
  const failureRef = useRef<HTMLDivElement>(null);

  const update = (field: FieldName) => (value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    setFailure(null);
    if (Object.keys(found).length > 0) {
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    setState("submitting");
    const request = {
      ...values,
      timezone: values.timezone.trim() || detectedTimeZone(),
    };
    let outcome: SendFailure | "ok" = "send_failed";
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          organization: values.organization,
          reason: `Booking request: ${values.session}`,
          message: bookingMessage(request),
          website,
        }),
      });
      if (response.ok) outcome = "ok";
      else if (response.status === 503) outcome = "not_configured";
      else if (response.status === 429) outcome = "rate_limited";
    } catch {
      outcome = "send_failed";
    }

    if (outcome === "ok") {
      setState("success");
      setValues({ ...initialValues, timezone: values.timezone });
      return;
    }
    setState("idle");
    setFailure(outcome);
    requestAnimationFrame(() => failureRef.current?.focus());
  }

  if (state === "success") {
    return (
      <div role="status" className="flex flex-col items-start gap-4">
        <CircleCheck aria-hidden="true" className="size-8 text-accent" />
        <h3 className="text-xl font-semibold text-ink">Request sent.</h3>
        <p className="max-w-md text-sm leading-relaxed text-ink-muted">
          Thank you. Your request is in my inbox. This is not a confirmed
          booking yet: I will reply by email to agree a time.
        </p>
        <Button variant="secondary" size="sm" onClick={() => setState("idle")}>
          Send another request
        </Button>
      </div>
    );
  }

  const errorList = (Object.entries(errors) as [FieldName, string][]).filter(([, m]) => Boolean(m));
  const describe = (field: FieldName) => (errors[field] ? `booking-${field}-error` : undefined);
  const errorText = (field: FieldName) =>
    errors[field] ? (
      <p id={`booking-${field}-error`} className="text-sm text-red-300">
        {errors[field]}
      </p>
    ) : null;

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      {failure ? (
        <div
          ref={failureRef}
          tabIndex={-1}
          role="alert"
          className="flex gap-3 rounded-lg border border-amber-400/40 bg-amber-400/[0.06] p-4"
        >
          <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-amber-300" />
          <div className="flex flex-col gap-1.5 text-sm">
            <p className="font-medium text-ink">{FAILURE_COPY[failure].title}</p>
            <p className="leading-relaxed text-ink-muted">
              {FAILURE_COPY[failure].body}{" "}
              <a
                href={`mailto:${site.email}?subject=${encodeURIComponent("Booking request")}`}
                className="text-accent underline underline-offset-2 hover:text-accent-hover"
              >
                {site.email}
              </a>
            </p>
          </div>
        </div>
      ) : null}

      {errorList.length > 0 ? (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="flex gap-3 rounded-lg border border-red-400/40 bg-red-400/[0.06] p-4"
        >
          <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-red-300" />
          <div className="flex flex-col gap-2 text-sm">
            <p className="font-medium text-ink">
              There {errorList.length === 1 ? "is 1 problem" : `are ${errorList.length} problems`} with
              this request
            </p>
            <ul className="flex flex-col gap-1 text-ink-muted">
              {errorList.map(([field, message]) => (
                <li key={field}>
                  <a href={`#booking-${field}`} className="underline underline-offset-2 hover:text-ink">
                    {LABELS[field]}: {message}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="booking-name" className="text-sm font-medium text-ink">
            {LABELS.name}
          </label>
          <input
            id="booking-name"
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(e) => update("name")(e.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describe("name")}
            className={fieldClasses(Boolean(errors.name))}
          />
          {errorText("name")}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="booking-email" className="text-sm font-medium text-ink">
            {LABELS.email}
          </label>
          <input
            id="booking-email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            value={values.email}
            onChange={(e) => update("email")(e.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describe("email")}
            className={fieldClasses(Boolean(errors.email))}
          />
          {errorText("email")}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="booking-organization" className="text-sm font-medium text-ink">
            {LABELS.organization} <span className="font-normal text-ink-muted">(optional)</span>
          </label>
          <input
            id="booking-organization"
            name="organization"
            type="text"
            autoComplete="organization"
            value={values.organization}
            onChange={(e) => update("organization")(e.target.value)}
            className={fieldClasses(false)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="booking-session" className="text-sm font-medium text-ink">
            {LABELS.session}
          </label>
          <select
            id="booking-session"
            name="session"
            value={values.session}
            onChange={(e) => update("session")(e.target.value)}
            aria-invalid={Boolean(errors.session)}
            aria-describedby={describe("session")}
            className={fieldClasses(Boolean(errors.session))}
          >
            <option value="">Choose one…</option>
            {sessionTypes.map((type) => (
              <option key={type.id} value={type.title}>
                {type.title}
              </option>
            ))}
          </select>
          {errorText("session")}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-[1.4fr_1fr]">
        <div className="flex flex-col gap-2">
          <label htmlFor="booking-times" className="text-sm font-medium text-ink">
            {LABELS.times}
          </label>
          <input
            id="booking-times"
            name="times"
            type="text"
            placeholder="Tue or Thu after 3 pm, Fri morning"
            value={values.times}
            onChange={(e) => update("times")(e.target.value)}
            aria-invalid={Boolean(errors.times)}
            aria-describedby={describe("times")}
            className={fieldClasses(Boolean(errors.times))}
          />
          {errorText("times")}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="booking-timezone" className="text-sm font-medium text-ink">
            {LABELS.timezone} <span className="font-normal text-ink-muted">(optional)</span>
          </label>
          <input
            id="booking-timezone"
            name="timezone"
            type="text"
            placeholder="Central (Chicago)"
            value={values.timezone}
            onChange={(e) => update("timezone")(e.target.value)}
            className={fieldClasses(false)}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="booking-details" className="text-sm font-medium text-ink">
          {LABELS.details} <span className="font-normal text-ink-muted">(optional)</span>
        </label>
        <textarea
          id="booking-details"
          name="details"
          rows={5}
          value={values.details}
          onChange={(e) => update("details")(e.target.value)}
          className={cn(fieldClasses(false), "resize-y")}
        />
        <p className="text-xs leading-relaxed text-ink-muted">
          Please do not include patient information or anything confidential.
        </p>
      </div>

      {/* Honeypot: hidden from people, filled in by naive bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="booking-website">Website</label>
        <input
          id="booking-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-xs leading-relaxed text-ink-muted">
          This sends a request, not a confirmed booking. I reply by email to agree a time.
        </p>
        <Button type="submit" size="lg" disabled={state === "submitting"}>
          {state === "submitting" ? (
            <>
              <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />
              Sending…
            </>
          ) : (
            "Request a Session"
          )}
        </Button>
      </div>
    </form>
  );
}
