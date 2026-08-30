# Hutchinson Healthcare AI Guide Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a public, streaming, safety-bounded Healthcare AI Guide at `/ai-guide` using Gemini while keeping credentials and conversation handling server-side.

**Architecture:** A client component holds the current tab's bounded message history and POSTs it to a Next.js route. Pure validation and rate-limit modules protect the route; a focused Gemini adapter converts the validated history into the official SDK's content format and exposes only text chunks to a plain-text response stream.

**Tech Stack:** Next.js 16.3 App Router, React 19, TypeScript 5, Tailwind CSS 4, Node test runner, `@google/genai`, Gemini `generateContentStream`, Playwright CLI.

**Spec:** `docs/superpowers/specs/2026-08-30-healthcare-ai-guide-design.md`

## Global Constraints

- Product name: **Hutchinson Healthcare AI Guide**.
- Route: `/ai-guide`; API route: `POST /api/ai-guide`.
- Model: `gemini-2.5-flash`, a stable free-tier-capable model; keep it in one exported constant.
- Environment variable: `GEMINI_API_KEY`; never use a `NEXT_PUBLIC_` prefix.
- Conversation state remains in React memory only; do not add cookies, local storage, accounts, analytics, or a database.
- Do not log message content, provider response bodies, or secrets.
- Reject patient-specific medical advice and identifiable patient information through the fixed system instruction and visible UI notice.
- Preserve the existing dark canvas, warm accent, typography, spacing, and responsive navigation patterns.
- Do not push or deploy without separate user approval.

---

### Task 1: Define and test the request contract

**Files:**
- Create: `lib/ai-guide/contracts.ts`
- Create: `tests/ai-guide-contracts.test.mts`

**Interfaces:**
- Produces: `ChatRole`, `ChatMessage`, `AiGuideRequest`, `ValidationResult`, `AI_GUIDE_LIMITS`, and `validateAiGuideRequest(value: unknown): ValidationResult`.
- Consumers: API handler, Gemini adapter, and client component.

- [ ] **Step 1: Write failing contract tests**

Create tests covering a valid alternating conversation, malformed bodies, invalid roles, empty text, first-message role, consecutive duplicate roles, message count, per-message length, and total conversation length:

```ts
import assert from "node:assert/strict";
import test from "node:test";

import {
  AI_GUIDE_LIMITS,
  validateAiGuideRequest,
} from "../lib/ai-guide/contracts.ts";

test("accepts a bounded alternating conversation", () => {
  const result = validateAiGuideRequest({
    messages: [
      { role: "user", content: "How could AI change skilled nursing?" },
      { role: "assistant", content: "It may improve workflow visibility." },
      { role: "user", content: "What safeguards matter?" },
    ],
  });
  assert.equal(result.ok, true);
});

test("rejects invalid roles and empty content", () => {
  assert.deepEqual(
    validateAiGuideRequest({ messages: [{ role: "system", content: "" }] }),
    { ok: false, error: "invalid_messages" },
  );
});

test("rejects oversized messages", () => {
  const result = validateAiGuideRequest({
    messages: [{ role: "user", content: "x".repeat(AI_GUIDE_LIMITS.message + 1) }],
  });
  assert.deepEqual(result, { ok: false, error: "message_too_long" });
});
```

Add these explicit boundary tests:

```ts
test("rejects excess message count", () => {
  const messages = Array.from({ length: AI_GUIDE_LIMITS.messages + 1 }, (_, index) => ({
    role: index % 2 === 0 ? "user" as const : "assistant" as const,
    content: `message ${index}`,
  }));
  assert.deepEqual(validateAiGuideRequest({ messages }), {
    ok: false,
    error: "too_many_messages",
  });
});

test("rejects excess total conversation length", () => {
  const content = "x".repeat(AI_GUIDE_LIMITS.message);
  const messages = Array.from({ length: 7 }, (_, index) => ({
    role: index % 2 === 0 ? "user" as const : "assistant" as const,
    content,
  }));
  assert.deepEqual(validateAiGuideRequest({ messages }), {
    ok: false,
    error: "conversation_too_long",
  });
});
```

- [ ] **Step 2: Run the contract tests and confirm RED**

Run: `node --disable-warning=MODULE_TYPELESS_PACKAGE_JSON --test tests/ai-guide-contracts.test.mts`

Expected: FAIL because `lib/ai-guide/contracts.ts` does not exist.

- [ ] **Step 3: Implement the pure validator**

Use these exact public types and limits:

```ts
export type ChatRole = "user" | "assistant";
export type ChatMessage = { role: ChatRole; content: string };
export type AiGuideRequest = { messages: ChatMessage[] };

export const AI_GUIDE_LIMITS = {
  messages: 12,
  message: 2_000,
  conversation: 12_000,
} as const;

export type ValidationError =
  | "invalid_json"
  | "invalid_messages"
  | "too_many_messages"
  | "message_too_long"
  | "conversation_too_long";

export type ValidationResult =
  | { ok: true; value: AiGuideRequest }
  | { ok: false; error: ValidationError };
```

`validateAiGuideRequest` must trim content, require 1–12 messages, require the first and last messages to be `user`, require exact role alternation, reject unknown keys only when they alter the required shape, and apply both length ceilings.

- [ ] **Step 4: Run the contract tests and confirm GREEN**

Run: `npm test`

Expected: all existing project-filter and new contract tests PASS.

- [ ] **Step 5: Commit the contract**

```bash
git add lib/ai-guide/contracts.ts tests/ai-guide-contracts.test.mts
git commit -m "test: define AI guide request contract"
```

---

### Task 2: Add and test request throttling

**Files:**
- Create: `lib/ai-guide/rate-limit.ts`
- Create: `tests/ai-guide-rate-limit.test.mts`

**Interfaces:**
- Produces: `createRateLimiter(options?: { windowMs?: number; max?: number; now?: () => number }): { isLimited(key: string): boolean }`.
- Consumer: API handler.

- [ ] **Step 1: Write failing deterministic limiter tests**

```ts
import assert from "node:assert/strict";
import test from "node:test";

import { createRateLimiter } from "../lib/ai-guide/rate-limit.ts";

test("limits the sixth request inside one window", () => {
  let now = 1_000;
  const limiter = createRateLimiter({ max: 5, windowMs: 60_000, now: () => now });
  for (let index = 0; index < 5; index += 1) {
    assert.equal(limiter.isLimited("203.0.113.1"), false);
  }
  assert.equal(limiter.isLimited("203.0.113.1"), true);
  now += 60_001;
  assert.equal(limiter.isLimited("203.0.113.1"), false);
});
```

Add a second test proving independent IP keys do not share counts.

- [ ] **Step 2: Run the limiter tests and confirm RED**

Run: `node --disable-warning=MODULE_TYPELESS_PACKAGE_JSON --test tests/ai-guide-rate-limit.test.mts`

Expected: FAIL because the limiter module does not exist.

- [ ] **Step 3: Implement the in-memory sliding-window limiter**

Store timestamps in `Map<string, number[]>`, discard timestamps at or beyond `windowMs`, count the current hit, and prune expired keys whenever the map exceeds 5,000 entries. Default to 10 requests per 10 minutes. Document that this is per-instance and intended to blunt casual abuse, matching the existing contact route's posture.

- [ ] **Step 4: Run all tests and confirm GREEN**

Run: `npm test`

Expected: all tests PASS.

- [ ] **Step 5: Commit the limiter**

```bash
git add lib/ai-guide/rate-limit.ts tests/ai-guide-rate-limit.test.mts
git commit -m "feat: rate limit AI guide requests"
```

---

### Task 3: Build the Gemini stream adapter and protected API handler

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Create: `.env.example`
- Create: `lib/ai-guide/prompt.ts`
- Create: `lib/ai-guide/gemini.ts`
- Create: `lib/ai-guide/handler.ts`
- Create: `app/api/ai-guide/route.ts`
- Create: `tests/ai-guide-handler.test.mts`

**Interfaces:**
- Produces: `AI_GUIDE_MODEL`, `AI_GUIDE_SYSTEM_INSTRUCTION`, `streamGeminiReply(args)`, `createAiGuideHandler(dependencies)`, and route `POST`.
- `streamGeminiReply(args: { apiKey: string; messages: ChatMessage[]; signal?: AbortSignal }): Promise<AsyncIterable<string>>`.
- `createAiGuideHandler({ getApiKey, isRateLimited, streamReply }): (request: Request) => Promise<Response>`.

- [ ] **Step 1: Install the official SDK**

Run: `npm install @google/genai`

Expected: `package.json` and lockfile add the current compatible SDK without audit vulnerabilities.

- [ ] **Step 2: Write failing handler tests with a fake provider**

Test these exact cases without making network calls:

```ts
import assert from "node:assert/strict";
import test from "node:test";

import { createAiGuideHandler } from "../lib/ai-guide/handler.ts";

async function* fakeStream() {
  yield "Healthcare ";
  yield "AI can support safer workflows.";
}

test("streams plain text from a valid provider response", async () => {
  const handler = createAiGuideHandler({
    getApiKey: () => "test-key",
    isRateLimited: () => false,
    streamReply: async () => fakeStream(),
  });
  const response = await handler(new Request("http://localhost/api/ai-guide", {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": "203.0.113.2" },
    body: JSON.stringify({ messages: [{ role: "user", content: "What is next?" }] }),
  }));
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/plain/);
  assert.equal(await response.text(), "Healthcare AI can support safer workflows.");
});
```

Add a table-driven test using these dependency/request variations and exact expectations:

```ts
const cases = [
  { name: "invalid JSON", body: "{", key: "test", limited: false, status: 400, error: "invalid_json" },
  { name: "invalid messages", body: JSON.stringify({ messages: [] }), key: "test", limited: false, status: 422, error: "invalid_messages" },
  { name: "rate limited", body: JSON.stringify({ messages: [{ role: "user", content: "Hello" }] }), key: "test", limited: true, status: 429, error: "rate_limited" },
  { name: "missing key", body: JSON.stringify({ messages: [{ role: "user", content: "Hello" }] }), key: "", limited: false, status: 503, error: "not_configured" },
] as const;

for (const item of cases) {
  test(item.name, async () => {
    const handler = createAiGuideHandler({
      getApiKey: () => item.key,
      isRateLimited: () => item.limited,
      streamReply: async () => fakeStream(),
    });
    const response = await handler(new Request("http://localhost/api/ai-guide", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: item.body,
    }));
    assert.equal(response.status, item.status);
    assert.deepEqual(await response.json(), { error: item.error });
  });
}

test("hides provider failure details", async () => {
  const handler = createAiGuideHandler({
    getApiKey: () => "test",
    isRateLimited: () => false,
    streamReply: async () => { throw new Error("secret provider detail"); },
  });
  const response = await handler(new Request("http://localhost/api/ai-guide", {
    method: "POST",
    body: JSON.stringify({ messages: [{ role: "user", content: "Hello" }] }),
  }));
  assert.equal(response.status, 502);
  assert.deepEqual(await response.json(), { error: "provider_unavailable" });
});
```

- [ ] **Step 3: Run handler tests and confirm RED**

Run: `node --disable-warning=MODULE_TYPELESS_PACKAGE_JSON --test tests/ai-guide-handler.test.mts`

Expected: FAIL because the handler does not exist.

- [ ] **Step 4: Add the fixed safety instruction**

Export a single multiline `AI_GUIDE_SYSTEM_INSTRUCTION` that names the guide, defines its healthcare-futures scope, requires plain-language explanations, separates facts/trends/speculation, forbids fabricated sources, refuses diagnosis/treatment/prescribing/triage/patient-specific advice, rejects PHI, and recommends qualified review for clinical/legal/regulatory/privacy/cybersecurity/financial decisions.

- [ ] **Step 5: Implement the Gemini adapter**

Initialize `GoogleGenAI` with the supplied server key. Map `user` to Gemini `user` and `assistant` to Gemini `model`, retaining only text. Call:

```ts
const response = await ai.models.generateContentStream({
  model: AI_GUIDE_MODEL,
  contents,
  config: {
    systemInstruction: AI_GUIDE_SYSTEM_INSTRUCTION,
    temperature: 0.35,
    maxOutputTokens: 1_200,
  },
});
```

Return an async iterable yielding only nonempty `chunk.text`. Do not log prompts, chunks, the key, or provider bodies.

- [ ] **Step 6: Implement the dependency-injected handler**

Parse JSON inside `try/catch`, validate with Task 1, derive the IP from `x-forwarded-for` then `x-real-ip`, check Task 2's limiter, require the API key, and return a `ReadableStream<Uint8Array>` using `TextEncoder`. Map errors to the public JSON codes tested above. Set `Content-Type: text/plain; charset=utf-8`, `Cache-Control: no-store`, and `X-Content-Type-Options: nosniff`.

- [ ] **Step 7: Wire the production route and environment template**

In `app/api/ai-guide/route.ts`, export `runtime = "nodejs"`, create one module-level limiter, and wire `process.env.GEMINI_API_KEY` plus `streamGeminiReply`. Add `.env.example` containing only:

```env
GEMINI_API_KEY=
```

Verify the real `.env.local` remains ignored with `git check-ignore .env.local`.

- [ ] **Step 8: Run tests, typecheck, and audit**

Run: `npm test && npm run typecheck && npm audit --audit-level=high`

Expected: PASS and zero high/critical advisories.

- [ ] **Step 9: Commit the API slice**

```bash
git add package.json package-lock.json .env.example lib/ai-guide app/api/ai-guide tests/ai-guide-handler.test.mts
git commit -m "feat: add streaming healthcare AI endpoint"
```

---

### Task 4: Build the accessible conversation experience

**Files:**
- Create: `lib/ai-guide/client-state.ts`
- Create: `tests/ai-guide-client-state.test.mts`
- Create: `components/ai-guide/AiGuideChat.tsx`
- Create: `app/ai-guide/page.tsx`

**Interfaces:**
- Produces: `AiGuideChat`, `ClientMessage`, `appendUserMessage`, `appendAssistantChunk`, and page metadata.
- Consumes: `ChatMessage` and `AI_GUIDE_LIMITS` from Task 1; `/api/ai-guide` from Task 3.

- [ ] **Step 1: Write failing client-state tests**

Test that `appendUserMessage` trims input and appends a user turn, `appendAssistantChunk` creates an assistant turn for the first chunk, later chunks append to that final assistant turn, and `toApiMessages` strips client-only IDs.

```ts
test("accumulates streamed assistant chunks", () => {
  const first = appendAssistantChunk(
    [{ id: "u1", role: "user", content: "What changes next?" }],
    "Healthcare ",
    "a1",
  );
  const second = appendAssistantChunk(first, "AI will evolve.", "a1");
  assert.equal(second.at(-1)?.content, "Healthcare AI will evolve.");
});
```

- [ ] **Step 2: Run client-state tests and confirm RED**

Run: `node --disable-warning=MODULE_TYPELESS_PACKAGE_JSON --test tests/ai-guide-client-state.test.mts`

Expected: FAIL because the state module does not exist.

- [ ] **Step 3: Implement pure state helpers**

Define `ClientMessage = ChatMessage & { id: string }`. Keep helpers immutable, deterministic, and independent of React or browser globals.

- [ ] **Step 4: Run all tests and confirm GREEN**

Run: `npm test`

Expected: all tests PASS.

- [ ] **Step 5: Build the client component**

Implement:

- Empty-state introduction and four specific suggested prompts.
- Message list with semantic labels for user and guide.
- Controlled textarea capped at 2,000 characters.
- Enter to send; Shift+Enter for a newline.
- `AbortController` for Stop.
- Streaming reader loop using `response.body.getReader()` and `TextDecoder`.
- Disabled duplicate submission while pending.
- New conversation that aborts, clears messages/errors/input, and refocuses the composer.
- `aria-live="polite"` for status and errors, visible focus styles, and accessible button labels.
- Error mapping for `invalid_messages`, `rate_limited`, `not_configured`, and `provider_unavailable`.
- Automatic scroll only when new content arrives, respecting reduced motion.

Do not render model output as HTML. Render it as whitespace-preserving text so generated markup cannot execute.

- [ ] **Step 6: Build the page shell**

Create metadata title `Healthcare AI Guide` and description `Explore the future of healthcare AI with an educational guide focused on technology, operations, workforce change, governance, and responsible adoption.` Add a compact page introduction, permanent warning not to enter PHI, the chat component, and a footer note that responses may be inaccurate or outdated and do not provide medical advice.

- [ ] **Step 7: Run lint and typecheck**

Run: `npm run lint && npm run typecheck`

Expected: PASS.

- [ ] **Step 8: Commit the conversation UI**

```bash
git add lib/ai-guide/client-state.ts tests/ai-guide-client-state.test.mts components/ai-guide/AiGuideChat.tsx app/ai-guide/page.tsx
git commit -m "feat: add Healthcare AI Guide chat interface"
```

---

### Task 5: Integrate the guide throughout the site

**Files:**
- Modify: `data/site.ts`
- Modify: `app/healthcare-ai/page.tsx`
- Modify: `app/sitemap.ts`
- Modify: `app/llms.txt/route.ts`

**Interfaces:**
- Produces discoverable navigation and metadata links to `/ai-guide`.
- Consumes the route created in Task 4.

- [ ] **Step 1: Add discoverability assertions**

Create `tests/ai-guide-site-integration.test.mts` importing `primaryNav` and `sitemap`, then assert `AI Guide` maps to `/ai-guide` and the sitemap contains an `/ai-guide` URL.

- [ ] **Step 2: Run the integration test and confirm RED**

Run: `node --disable-warning=MODULE_TYPELESS_PACKAGE_JSON --test tests/ai-guide-site-integration.test.mts`

Expected: FAIL because the nav and sitemap do not contain the route.

- [ ] **Step 3: Update navigation and machine-readable pages**

Add `{ label: "AI Guide", href: "/ai-guide" }` immediately after Healthcare AI in `primaryNav` and to the footer's Explore group. Add `/ai-guide` with priority `0.9` to the sitemap and an AI Guide description to the Pages section of `llms.txt`.

- [ ] **Step 4: Update the Healthcare AI call to action**

Change the final CTA to invite visitors to explore future-facing healthcare AI questions. Make the primary action `Open the AI Guide` → `/ai-guide`, retain Contact as the conversational/business path, and retain Projects as the secondary evidence path only if the component supports both without crowding.

- [ ] **Step 5: Run all tests and checks**

Run: `npm test && npm run lint && npm run typecheck`

Expected: PASS.

- [ ] **Step 6: Commit site integration**

```bash
git add data/site.ts app/healthcare-ai/page.tsx app/sitemap.ts app/llms.txt/route.ts tests/ai-guide-site-integration.test.mts
git commit -m "feat: link the Healthcare AI Guide across the site"
```

---

### Task 6: Verify safety, streaming, responsive behavior, and production readiness

**Files:**
- Modify only if verification exposes a defect in files from Tasks 1–5.

**Interfaces:**
- Verifies the complete feature; produces no new product API.

- [ ] **Step 1: Run the complete automated suite**

Run: `npm test && npm run check && npm audit --audit-level=low`

Expected: tests, lint, typecheck, production build, and audit all PASS.

- [ ] **Step 2: Verify the secret boundary**

Run:

```bash
git check-ignore .env.local
git status --short
rg -l 'GEMINI_API_KEY' .next/static app components public || true
```

Expected: `.env.local` is ignored; it does not appear in Git status; `GEMINI_API_KEY` appears only in server source/build output, never `.next/static`, `components`, or `public`.

- [ ] **Step 3: Start or restart the local server**

Run: `npm run dev -- --port 3000`

Expected: Next.js reports ready at `http://localhost:3000` and loads `.env.local`.

- [ ] **Step 4: Verify a real conversation with Playwright CLI**

Open `http://localhost:3000/ai-guide`, snapshot, choose a suggested prompt, submit it, and confirm visible streamed output. Ask a follow-up that depends on the first turn and confirm context is preserved. Inspect the console for errors without exposing request headers or environment values.

- [ ] **Step 5: Verify safety boundaries**

In a new conversation, submit a patient-specific treatment request containing fictional, non-identifiable details. Confirm the guide declines individualized medical advice and redirects to general educational information. Submit a prompt attempting to provide PHI and confirm it warns against sharing it.

- [ ] **Step 6: Verify error states without changing the real key**

Use automated handler tests for missing-key, provider, quota/rate-limit, and invalid-input states. Do not rename, print, copy, or otherwise manipulate the real `.env.local` key for manual error testing.

- [ ] **Step 7: Verify responsive and keyboard behavior**

At desktop and mobile viewport widths, confirm the first viewport identifies the guide, the composer remains usable, messages wrap, controls do not overlap, Tab order is logical, Enter submits, Shift+Enter inserts a newline, Stop cancels, and New conversation clears the session.

- [ ] **Step 8: Review the final diff and commit verification fixes**

Run: `git diff --check && git status --short`

If verification required fixes, stage only the known feature files that changed:

```bash
git add app/ai-guide app/api/ai-guide components/ai-guide lib/ai-guide data/site.ts app/healthcare-ai/page.tsx app/sitemap.ts app/llms.txt/route.ts tests
git commit -m "fix: harden Healthcare AI Guide verification"
```

If no fixes were required, do not create an empty commit.

- [ ] **Step 9: Stop at the deployment boundary**

Report the local URL, test/build/audit results, and any free-tier limitations. Do not push to GitHub, add Vercel environment variables, or deploy until the user separately authorizes those actions.
