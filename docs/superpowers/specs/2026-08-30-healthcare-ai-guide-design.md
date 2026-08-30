# Hutchinson Healthcare AI Guide Design

## Purpose

Add a public, conversational Healthcare AI Guide to Al Hutchinson Digital. The guide will educate visitors about the future of AI technology in healthcare, including operations, clinical workflows, workforce effects, education, governance, ethics, and responsible adoption. It is an educational product, not a medical service.

## Product scope

The first release will live at `/ai-guide` and use a ChatGPT-style conversation layout that matches the existing Al Hutchinson Digital visual system. It will use Gemini's general knowledge under a tightly scoped system instruction.

The release includes:

- Streaming AI answers.
- Conversation context for the current browser session.
- Suggested starter questions.
- A new-conversation control.
- Responsive and keyboard-accessible interaction.
- A primary-navigation link and a link from the Healthcare AI page.
- Clear privacy, medical, and accuracy notices.
- Server-side input validation, rate limiting, and provider error handling.

The release excludes accounts, permanent conversation storage, analytics, file uploads, patient data, private document retrieval, and clinical decision support.

## Identity and voice

The product name is **Hutchinson Healthcare AI Guide**. It speaks in a clear, professional, educational voice. It does not impersonate Al Hutchinson or claim that an answer was personally written or reviewed by him.

The guide should be useful to healthcare leaders, clinicians, educators, operators, and professionals exploring responsible AI adoption. It should explain technical ideas in plain language, acknowledge uncertainty, and separate established facts from trends and speculation.

## User experience

The page begins with a concise title, purpose statement, and visible educational-use notice. Before the first message, it presents suggested prompts about future healthcare AI, skilled-nursing workflows, workforce change, governance, and responsible implementation.

The main surface contains:

- A scrollable message history.
- Visually distinct user and assistant messages.
- A multiline composer.
- Send and stop controls.
- A new-conversation control.
- Loading, empty, rate-limit, configuration, provider, and network states.
- An accessible live region for generated responses and errors.

The layout preserves the site's dark canvas, warm accent, typography hierarchy, borders, spacing, and restrained motion. The desktop view uses a focused central conversation column. The mobile view keeps the composer reachable and all controls touch-friendly.

Conversation state remains in browser memory only. Starting a new conversation or reloading the page clears it. The first release does not use local storage, cookies, a database, or identity.

## Architecture and data flow

The client submits a bounded message history to `POST /api/ai-guide`. The server route:

1. Parses and validates the JSON body.
2. Enforces role, message-count, individual-message, and total-conversation limits.
3. Applies a per-IP request limit to reduce casual abuse of the free quota.
4. Prepends the fixed Hutchinson Healthcare AI Guide system instruction.
5. Calls Gemini using a server-only `GEMINI_API_KEY`.
6. Streams the generated answer back to the browser.

The Gemini key is stored in `.env.local` for local development and as an encrypted Vercel environment variable for deployment. It is never included in client code, responses, logs, source control, or browser-visible configuration.

The first implementation should use the current official Gemini JavaScript SDK or supported streaming REST interface, selecting the simplest maintained option that supports server-side streaming in the installed Next.js version.

## Safety behavior

The fixed system instruction requires the guide to:

- Focus on healthcare AI technology, operations, education, governance, ethics, workforce effects, and future possibilities.
- Clearly distinguish established facts, current trends, and forward-looking speculation.
- Avoid fabricating sources, research, statistics, regulations, deployments, or model capabilities.
- Avoid diagnosis, treatment, prescribing, emergency triage, and patient-specific recommendations.
- Refuse requests involving identifiable patient information and remind users not to submit protected health information or confidential records.
- Encourage qualified professional review for clinical, legal, regulatory, privacy, cybersecurity, and financial decisions.
- State plainly when information may be incomplete, uncertain, or outdated.
- Avoid presenting the system as a substitute for medical judgment or organizational governance.

The page displays a permanent notice that the guide is educational, may be inaccurate, and must not receive patient-identifiable information. Unsafe or out-of-scope requests receive a brief boundary followed, when appropriate, by a safer educational alternative.

## Abuse and error handling

The server rejects malformed JSON, empty conversations, invalid roles, excess messages, messages over the length ceiling, and conversations over the total-character ceiling. The client prevents duplicate submissions and supports cancellation.

The initial per-instance IP limiter follows the existing contact-route pattern and is sufficient for a personal-site first release. Its limits and limitations are documented. A shared rate-limit store is deferred until traffic warrants it.

User-facing errors distinguish:

- Missing server configuration.
- Free-tier quota or rate-limit exhaustion.
- Provider rejection.
- Temporary network failure.
- Invalid or oversized input.
- User cancellation.

Provider response bodies and secrets are never exposed to visitors. Server logs contain only the minimum diagnostic information and do not log conversation content.

## Site integration

The primary navigation adds an `AI Guide` item linking to `/ai-guide`. The Healthcare AI page adds a contextual call to action inviting visitors to explore questions with the guide. Sitemap and machine-readable site information are updated to include the new page. Page metadata describes the guide as educational and avoids claims of clinical authority.

## Testing and acceptance criteria

Automated tests cover request validation, conversation limits, role validation, rate limiting, safe construction of the provider request, missing configuration, provider failures, and successful streaming behavior using mocked provider responses.

Component or browser-level checks cover suggested prompts, message submission, pending state, cancellation, new conversation, keyboard behavior, accessible labels, error display, and responsive layout.

The feature is ready for local approval when:

- Lint and TypeScript checks pass.
- Automated tests pass.
- The production build succeeds.
- The API key is absent from client bundles and browser output.
- The page renders correctly on desktop and mobile.
- A real Gemini conversation succeeds when a local key is configured.
- Medical-advice and patient-specific test prompts receive appropriate boundaries.
- Missing-key and exhausted-quota states are understandable.

## Delivery boundary

Implementation and testing occur locally first. No commit containing secrets is permitted. The feature will not be pushed to GitHub or deployed to Vercel without separate user approval. A real provider test depends on the user privately adding a Gemini free-tier API key to `.env.local`; the key must never be pasted into chat.
