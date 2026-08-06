"use client";

/**
 * NewsletterSignup.
 *
 * ⚠️  NO EMAIL BACKEND IS CONNECTED. This validates the address and shows a
 * confirmation that states plainly that nothing was subscribed. See README →
 * "Connecting the contact form" for the same wiring pattern.
 */

import { useState } from "react";
import { CircleAlert } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      setError("Enter a valid email address, for example name@example.com.");
      return;
    }

    setError(null);
    setDone(true);
    setEmail("");
  }

  return (
    <div className="rounded-2xl border border-hairline bg-surface/60 p-7 sm:p-10">
      <div className="flex flex-col gap-3">
        <p className="eyebrow">Stay updated</p>
        <h2 className="text-xl font-semibold text-ink sm:text-2xl">
          New writing, occasionally.
        </h2>
        <p className="max-w-xl text-sm leading-relaxed text-ink-muted">
          Notes on healthcare technology, AI workflows and what actually changes
          when these tools reach a working environment.
        </p>
      </div>

      {done ? (
        <p
          role="status"
          className="mt-6 rounded-lg border border-dashed border-hairline-strong bg-white/[0.02] p-4 text-sm text-ink-muted"
        >
          <span className="font-medium text-ink">Address validated. </span>
          No subscription was created — the newsletter is not yet connected to an
          email service.
        </p>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="mt-6 flex flex-col gap-3">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="flex-1">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  if (error) setError(null);
                }}
                placeholder="you@example.com"
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? "newsletter-error" : undefined}
                className={cn(
                  "min-h-12 w-full rounded-full border bg-canvas-2 px-5 text-base text-ink",
                  "placeholder:text-ink-muted/60 transition-colors focus:border-accent focus:outline-none",
                  error ? "border-red-400/60" : "border-hairline hover:border-hairline-strong",
                )}
              />
            </div>

            <Button type="submit">Subscribe</Button>
          </div>

          {error ? (
            <p
              id="newsletter-error"
              className="flex items-center gap-1.5 text-sm text-red-300"
            >
              <CircleAlert aria-hidden="true" className="size-3.5 shrink-0" />
              {error}
            </p>
          ) : (
            <p className="text-xs text-ink-muted">
              Placeholder form — not yet connected to an email service.
            </p>
          )}
        </form>
      )}
    </div>
  );
}
