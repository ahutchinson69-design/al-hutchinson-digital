import { NextResponse } from "next/server";
import { site } from "@/data/site";

/**
 * POST /api/contact
 *
 * Delivers a contact-form submission by email via Resend's REST API — called
 * with `fetch` rather than the SDK so the project takes on no new dependency.
 *
 * ── Configuration ───────────────────────────────────────────────────────────
 * Two environment variables, both set in your host's dashboard (Vercel:
 * Settings → Environment Variables) and in `.env.local` for development:
 *
 *   RESEND_API_KEY   from resend.com — starts "re_"
 *   CONTACT_TO       where enquiries land. Defaults to site.email.
 *   CONTACT_FROM     a verified sender on your domain, e.g.
 *                    "Al Hutchinson Digital <hello@alhutchinsondigital.com>".
 *                    Resend requires the domain be verified before it will
 *                    send; until then use "onboarding@resend.dev" to test.
 *
 * Without RESEND_API_KEY the route returns 503 and the form tells the visitor
 * to email directly. It never silently swallows a message.
 */

export const runtime = "nodejs";

/* ── Validation ─────────────────────────────────────────────────────────── */

const LIMITS = {
  name: 120,
  email: 200,
  organization: 200,
  reason: 120,
  message: 5000,
} as const;

type Payload = Record<keyof typeof LIMITS, string> & { website?: string };

function validate(data: Partial<Payload>): {
  ok: boolean;
  errors: string[];
  clean?: Payload;
} {
  const errors: string[] = [];
  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

  const name = str(data.name);
  const email = str(data.email);
  const organization = str(data.organization);
  const reason = str(data.reason);
  const message = str(data.message);

  if (!name) errors.push("name");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) errors.push("email");
  if (!reason) errors.push("reason");
  if (message.length < 20) errors.push("message");

  // Length ceilings guard against someone using the form as a paste buffer.
  for (const [field, max] of Object.entries(LIMITS)) {
    if (str(data[field as keyof typeof LIMITS]).length > max) {
      errors.push(field);
    }
  }

  if (errors.length > 0) return { ok: false, errors: [...new Set(errors)] };

  return {
    ok: true,
    errors: [],
    clean: { name, email, organization, reason, message },
  };
}

/* ── Rate limiting ──────────────────────────────────────────────────────── */

/**
 * A deliberately simple in-memory limiter: 5 submissions per IP per 10
 * minutes. It resets on redeploy and is per-instance rather than global, which
 * is fine for a personal site — it exists to blunt casual abuse, not to be a
 * real WAF. Move to a shared store if this ever needs to hold up.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);

  // Keep the map from growing without bound on a long-lived instance.
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
  }

  return recent.length > MAX_PER_WINDOW;
}

/* ── Handler ────────────────────────────────────────────────────────────── */

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  let data: Partial<Payload>;

  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  // Honeypot: a field hidden from people but filled in by naive bots.
  if (typeof data.website === "string" && data.website.trim() !== "") {
    // Report success so the bot does not learn to try again.
    return NextResponse.json({ ok: true });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  const result = validate(data);
  if (!result.ok || !result.clean) {
    return NextResponse.json(
      { error: "validation_failed", fields: result.errors },
      { status: 422 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Not configured. Say so plainly rather than pretending it was delivered.
    console.warn("[contact] RESEND_API_KEY is not set — message not sent.");
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  const { name, email, organization, reason, message } = result.clean;

  const lines = [
    `Name: ${name}`,
    `Email: ${email}`,
    organization ? `Organization: ${organization}` : null,
    `Reason: ${reason}`,
    "",
    message,
  ].filter(Boolean);

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from:
          process.env.CONTACT_FROM ??
          `${site.name} <onboarding@resend.dev>`,
        to: [process.env.CONTACT_TO ?? site.email],
        // So a reply in the mail client goes straight back to the sender.
        reply_to: email,
        subject: `${reason} — ${name}`,
        text: lines.join("\n"),
        html: `<pre style="font:14px/1.6 ui-monospace,monospace;white-space:pre-wrap">${escapeHtml(
          lines.join("\n"),
        )}</pre>`,
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error("[contact] Resend rejected the message:", detail);
      return NextResponse.json({ error: "send_failed" }, { status: 502 });
    }
  } catch (error) {
    console.error("[contact] Could not reach Resend:", error);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
