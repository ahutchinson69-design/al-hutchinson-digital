"use client";

/**
 * ContactForm.
 *
 * Posts to /api/contact, which validates again server-side and delivers by
 * email. The route returns 503 when it has no mail credentials configured, and
 * this form surfaces that honestly rather than claiming a message was sent —
 * see the `not_configured` branch below.
 *
 * Accessibility:
 *  • every field has a real <label>
 *  • errors are linked with aria-describedby and marked aria-invalid
 *  • the error summary receives focus on failed submit
 *  • status changes are announced via role="status" / role="alert"
 */

import { useRef, useState } from "react";
import { CircleAlert, CircleCheck, LoaderCircle } from "lucide-react";
import { site } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const REASONS = [
  "Healthcare AI collaboration",
  "Speaking or teaching",
  "Research or writing",
  "Creative or media project",
  "Consulting or advisory",
  "Something else",
] as const;

type FieldName = "name" | "email" | "organization" | "reason" | "message";
type Errors = Partial<Record<FieldName, string>>;

const initialValues: Record<FieldName, string> = {
  name: "",
  email: "",
  organization: "",
  reason: "",
  message: "",
};

function validate(values: Record<FieldName, string>): Errors {
  const errors: Errors = {};

  if (!values.name.trim()) {
    errors.name = "Enter your name.";
  }

  if (!values.email.trim()) {
    errors.email = "Enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) {
    errors.email = "Enter a valid email address, for example name@example.com.";
  }

  if (!values.reason) {
    errors.reason = "Select a reason for contact.";
  }

  const message = values.message.trim();
  if (!message) {
    errors.message = "Enter a message.";
  } else if (message.length < 20) {
    errors.message = `Add a little more detail — ${20 - message.length} more character${
      20 - message.length === 1 ? "" : "s"
    } needed.`;
  }

  return errors;
}

const fieldClasses = (hasError: boolean) =>
  cn(
    "w-full rounded-lg border bg-canvas-2 px-4 py-3 text-base text-ink",
    "placeholder:text-ink-muted/50 transition-colors",
    "focus:border-accent focus:outline-none",
    hasError ? "border-red-400/60" : "border-hairline hover:border-hairline-strong",
  );

/** What the server said, when it could not deliver the message. */
type SendFailure = "not_configured" | "rate_limited" | "send_failed";

export function ContactForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "submitting" | "success">("idle");
  const [failure, setFailure] = useState<SendFailure | null>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const failureRef = useRef<HTMLDivElement>(null);
  /** Honeypot. Hidden from people; bots fill it in and are silently dropped. */
  const [website, setWebsite] = useState("");

  const update = (field: FieldName) => (value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    // Clear a field's error as soon as the visitor starts correcting it.
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
      // Move focus to the summary so the failure is announced immediately.
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    setState("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website }),
      });

      if (response.ok) {
        setState("success");
        setValues(initialValues);
        return;
      }

      const body = await response.json().catch(() => ({}));

      if (response.status === 422 && Array.isArray(body.fields)) {
        // The server disagreed with the client-side check — trust the server.
        const serverErrors: Errors = {};
        for (const field of body.fields as FieldName[]) {
          serverErrors[field] = "Please check this field.";
        }
        setErrors(serverErrors);
        setState("idle");
        requestAnimationFrame(() => summaryRef.current?.focus());
        return;
      }

      const known: SendFailure[] = [
        "not_configured",
        "rate_limited",
        "send_failed",
      ];
      setFailure(
        known.includes(body.error) ? (body.error as SendFailure) : "send_failed",
      );
    } catch {
      // Offline, blocked, or the request never landed.
      setFailure("send_failed");
    }

    setState("idle");
    requestAnimationFrame(() => failureRef.current?.focus());
  }

  if (state === "success") {
    return (
      <div
        role="status"
        className="flex flex-col items-start gap-4 rounded-2xl border border-hairline bg-surface/60 p-8"
      >
        <span className="inline-flex size-11 items-center justify-center rounded-full border border-accent/30 bg-accent/[0.08] text-accent">
          <CircleCheck aria-hidden="true" className="size-5" />
        </span>

        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold text-ink">Message sent</h3>
          <p className="text-sm leading-relaxed text-ink-muted">
            Thank you — your message is on its way and I will reply to the
            address you gave. If you do not hear back within a few days, email{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-accent hover:text-accent-hover"
            >
              {site.email}
            </a>{" "}
            directly in case it went astray.
          </p>
        </div>

        <Button variant="secondary" size="sm" onClick={() => setState("idle")}>
          Send another message
        </Button>
      </div>
    );
  }

  const errorList = (Object.entries(errors) as [FieldName, string][]).filter(
    ([, message]) => Boolean(message),
  );

  /**
   * Wording for each way delivery can fail. Every one of these keeps a route
   * open for the visitor rather than leaving them at a dead end.
   */
  const FAILURE_COPY: Record<SendFailure, { title: string; body: string }> = {
    not_configured: {
      title: "The form is not connected yet",
      body: "Email delivery has not been set up on this site, so your message was not sent. Nothing was lost — please email me directly and it will reach me.",
    },
    rate_limited: {
      title: "Too many messages just now",
      body: "This form accepts a few messages at a time to keep out spam. Please wait a few minutes and try again, or email me directly.",
    },
    send_failed: {
      title: "That did not go through",
      body: "Something went wrong on the way to my inbox. Your message was not delivered. Please try again in a moment, or email me directly.",
    },
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      {failure ? (
        <div
          ref={failureRef}
          tabIndex={-1}
          role="alert"
          className="flex gap-3 rounded-lg border border-amber-400/40 bg-amber-400/[0.06] p-4"
        >
          <CircleAlert
            aria-hidden="true"
            className="mt-0.5 size-4 shrink-0 text-amber-300"
          />
          <div className="flex flex-col gap-1.5 text-sm">
            <p className="font-medium text-ink">
              {FAILURE_COPY[failure].title}
            </p>
            <p className="leading-relaxed text-ink-muted">
              {FAILURE_COPY[failure].body}{" "}
              <a
                href={`mailto:${site.email}`}
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
              There {errorList.length === 1 ? "is 1 problem" : `are ${errorList.length} problems`}{" "}
              with this form
            </p>
            <ul className="flex flex-col gap-1">
              {errorList.map(([field, message]) => (
                <li key={field}>
                  <a href={`#${field}`} className="text-red-200 underline underline-offset-2">
                    {message}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}

      <Field
        id="name"
        label="Name"
        required
        value={values.name}
        onChange={update("name")}
        error={errors.name}
        autoComplete="name"
      />

      <Field
        id="email"
        label="Email"
        type="email"
        required
        value={values.email}
        onChange={update("email")}
        error={errors.email}
        autoComplete="email"
      />

      <Field
        id="organization"
        label="Organization"
        optional
        value={values.organization}
        onChange={update("organization")}
        error={errors.organization}
        autoComplete="organization"
      />

      <div className="flex flex-col gap-2">
        <Label htmlFor="reason" required>
          Reason for contact
        </Label>
        <select
          id="reason"
          name="reason"
          value={values.reason}
          onChange={(e) => update("reason")(e.target.value)}
          aria-invalid={errors.reason ? true : undefined}
          aria-describedby={errors.reason ? "reason-error" : undefined}
          className={cn(fieldClasses(Boolean(errors.reason)), "min-h-12 appearance-none")}
        >
          <option value="">Select an option…</option>
          {REASONS.map((reason) => (
            <option key={reason} value={reason}>
              {reason}
            </option>
          ))}
        </select>
        <FieldError id="reason-error" message={errors.reason} />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="message" required>
          Message
        </Label>
        <textarea
          id="message"
          name="message"
          rows={6}
          value={values.message}
          onChange={(e) => update("message")(e.target.value)}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "message-error" : "message-hint"}
          className={cn(fieldClasses(Boolean(errors.message)), "resize-y")}
          placeholder="What would you like to discuss?"
        />
        {errors.message ? (
          <FieldError id="message-error" message={errors.message} />
        ) : (
          <p id="message-hint" className="text-xs text-ink-muted">
            A sentence or two about what you have in mind is plenty.
          </p>
        )}
      </div>

      {/*
        Honeypot. Positioned off-screen rather than `display:none`, because
        some bots skip hidden inputs but not displaced ones. aria-hidden and
        tabIndex={-1} keep it away from screen readers and keyboard users.
      */}
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] h-px w-px overflow-hidden"
      >
        <label htmlFor="website">Leave this field empty</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
        />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" disabled={state === "submitting"}>
          {state === "submitting" ? (
            <>
              <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />
              Sending…
            </>
          ) : (
            "Send Message"
          )}
        </Button>

        <p className="text-xs leading-relaxed text-ink-muted">
          Your message goes straight to my inbox. I read everything, and reply
          to most things.
        </p>
      </div>
    </form>
  );
}

/* ── Field primitives ──────────────────────────────────────────────────── */

function Label({
  htmlFor,
  required,
  optional,
  children,
}: {
  htmlFor: string;
  required?: boolean;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="text-sm font-medium text-ink">
      {children}
      {required ? (
        <span className="ms-1 text-accent">
          <span aria-hidden="true">*</span>
          <span className="sr-only">(required)</span>
        </span>
      ) : null}
      {optional ? (
        <span className="ms-2 text-xs font-normal text-ink-muted">(optional)</span>
      ) : null}
    </label>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="flex items-center gap-1.5 text-sm text-red-300">
      <CircleAlert aria-hidden="true" className="size-3.5 shrink-0" />
      {message}
    </p>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  required,
  optional,
  autoComplete,
}: {
  id: FieldName;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  required?: boolean;
  optional?: boolean;
  autoComplete?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id} required={required} optional={optional}>
        {label}
      </Label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(fieldClasses(Boolean(error)), "min-h-12")}
      />
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}
