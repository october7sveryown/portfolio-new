# Chat feature — implementation plan

An "Ask me anything" chat on the portfolio home page. Answers stream in as text,
and some answers include UI components (project cards, post links, experience,
contact) driven by tool calls. Built with the Vercel AI SDK (v7) and an
open-weight model (GLM or Kimi) served through OpenRouter.

Status: **planned**, not yet implemented. Open decisions are listed at the end.

## Prerequisites

| Item | Status | Action |
|---|---|---|
| Node | AI SDK v7 requires Node 22+ (24 LTS recommended) | Use Node 24 locally (`nvm install 24`) and set Node 24 in Vercel project settings. `package.json` already declares `>=24`. |
| Next 14 / React 18 | `@ai-sdk/react` 4.x peer deps allow React 18 | No framework upgrade needed. Next upgrade is a separate PR. |
| ESM-only packages | v7 removed CommonJS builds | No change: Next bundles ESM and the config is already `.mjs`. |

| OpenRouter provider | `@openrouter/ai-sdk-provider` must support AI SDK v7's provider spec | Check its peer deps in step 1. If it lags behind v7, use `@ai-sdk/openai-compatible` with `baseURL: https://openrouter.ai/api/v1` instead (OpenRouter's API is OpenAI-compatible). |

New dependencies: `ai`, `@ai-sdk/react`, `@openrouter/ai-sdk-provider`, `zod`,
`@upstash/ratelimit`, `@upstash/redis`, `streamdown` (markdown rendering that
tolerates partially streamed text).

## Architecture

```
Browser                                   Server (/api/chat)
useChat() ──POST messages──────────────►  validate (zod) → rate limit (Upstash)
   │                                       streamText({ model, instructions, tools, stopWhen })
   │◄── UI message stream ───────────────  toUIMessageStream → createUIMessageStreamResponse
   │
message.parts.map(part =>
  text                → streamdown
  tool-showProjects   → skeleton ('input-streaming' / 'input-available') → <ProjectResults> ('output-available')
  tool-showPosts      → <PostResults>
  tool-showExperience → <ExperienceCard>
  tool-showContact    → <ContactCard>
  'output-error'      → inline error)
```

### Tools return IDs, not content

Each tool returns identifiers (project keys, post slugs, company names). The
client component resolves them against `DATA` (`src/data/resume.tsx`) and the
blog post metadata. This means:

- the model cannot invent project details, links or dates in cards;
- tool results stay small, which saves tokens on later turns;
- results are compact rows (title, date, one line, link), not copies of the
  full portfolio cards: the chat lists and links, the home page shows detail.

## Server — `src/app/api/chat/route.ts`

- **Model:** OpenRouter through `@openrouter/ai-sdk-provider`, chosen by the
  `CHAT_MODEL` env var. The default is a GLM model (e.g. `z-ai/glm-…`), with a
  Kimi model (`moonshotai/kimi-…`) as the alternative. Check the current IDs on
  openrouter.ai/models before choosing. Changing models needs no code change.
- **Provider routing:** OpenRouter picks among several hosts for each model, and
  not every host supports tool calling. Set:
  - `provider.require_parameters: true`, so only hosts that support `tools` are used;
  - `provider.data_collection: "deny"`, so hosts that log or train on prompts are skipped;
  - optionally a `provider.order` list to pin hosts with good tool-calling quality.
- **Instructions** (`src/lib/chat/instructions.ts`): built from `DATA` (summary,
  `now`, work, skills, projects) plus each blog post's title, summary and slug.
  Rules:
  - only answer questions about Yash, his work, projects and writing;
  - never state facts that aren't in the provided data;
  - point people to the contact email for anything else;
  - keep answers short;
  - prefer a tool call when a card shows the answer better than text.
  The instructions are the same on every request and go first in the prompt.
  Hosts for GLM and Kimi cache repeated prefixes automatically (no
  `cache_control` markers needed), so a stable prefix is enough to get cache
  discounts where the host offers them.
- **Tool-calling reliability:** open models are less consistent than Claude at
  calling tools and following format rules. Keep tool descriptions short and
  explicit, keep schemas flat, and treat a malformed tool call as an
  `output-error` part, not a crash.
- **Tools** (`src/lib/chat/tools.ts`), all read-only and run on the server:

  | Tool | Input | Returns |
  |---|---|---|
  | `showProjects` | `{ tech?: string }` | matching project keys |
  | `showPosts` | `{ topic?: string }` | matching post slugs |
  | `showExperience` | `{ company?: string }` | matching work entries |
  | `showContact` | `{}` | nothing (renders contact card) |

- **Limits and abuse protection:**
  - zod validation of the request body;
  - max 500 characters per user message; only the last 10 messages are sent to the model;
  - about 600 max output tokens; `stopWhen: isStepCount(3)`;
  - Upstash rate limit: about 10 requests per 10 minutes per IP, plus a global daily cap;
  - a friendly error message when a limit is hit;
  - a credit limit on the OpenRouter API key (and prepaid credits with
    auto top-up turned off) as a final backstop.
- **Mock mode:** if `OPENROUTER_API_KEY` is unset, use `MockLanguageModelV4` and
  `simulateReadableStream` from `ai/test` to stream canned text and a
  `showProjects` call. Local dev, preview deploys and CI builds work without a key.

## Client — `src/components/chat/`

| File | Role |
|---|---|
| `chat.tsx` | Client component: `useChat`, message list, status handling (submitted, streaming, ready, error) |
| `chat-input.tsx` | Auto-growing textarea, Enter to send, stop button while streaming, 3 starter questions when the chat is empty |
| `message.tsx` | Renders `message.parts`: text through streamdown, tool parts through skeleton then component |
| `parts/project-results.tsx` | Project rows from keys |
| `parts/post-results.tsx` | Post rows from slugs |
| `parts/experience-card.tsx` | Work rows (company, role, years) |
| `parts/contact-card.tsx` | Email / socials |

**Placement:** a separate `/chat` page. The conversation scrolls with the page
and the input sticks to the bottom above the dock. The home page links to it
with an "Ask me anything about my work" link under the "Now" line, and the dock
has a chat icon.

**Behaviour:**
- auto-scroll that pauses when the user scrolls up;
- retry on error;
- messages kept for the browser session only (no database);
- respects `prefers-reduced-motion`; dark mode; works at 375px;
- the stop button has an accessible label.

Starter questions (initial set):
- "What are you building right now?"
- "Show me your AI projects"
- "Summarize your Claude Code post"

## Build order

Each step is one commit on `feature/chat`.

1. Install dependencies, set the Node version, add `.env.example`.
2. Route handler in mock mode; check the stream with `curl`.
3. Chat UI with text only.
4. Tools, their part components and skeletons.
5. Real OpenRouter calls: instructions and provider routing. Default model is
   `z-ai/glm-5.3-flash` (cheapest current GLM with tool support); no model
   comparison for now.
6. Rate limiting and the other limits.
7. Polish: mobile, dark mode, accessibility, dock icon.
8. Verification (below).

## Verification

- `npx tsc --noEmit` and `npm run build` pass with no `OPENROUTER_API_KEY`.
- Mock mode: `curl` the route and confirm text and tool parts stream in order.
- With a key:
  - questions that should trigger each tool (check the tool is actually called,
    not answered in text);
  - normal questions;
  - off-topic questions (should decline politely);
  - prompt-injection attempts ("ignore your instructions and…");
  - questions about things not in the data (should not make anything up).
- Trigger the rate limit and confirm the error UI.
- Screenshots at desktop and 375px, light and dark.

## Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `OPENROUTER_API_KEY` | for real responses | OpenRouter access. Mock mode is used when unset. |
| `CHAT_MODEL` | no | OpenRouter model ID, default `z-ai/glm-5.3-flash` |
| `CHAT_DAILY_LIMIT` | no | Global daily request cap, default 500 |
| `UPSTASH_REDIS_REST_URL` | in production | Rate limiting |
| `UPSTASH_REDIS_REST_TOKEN` | in production | Rate limiting |

## Out of scope (for now)

- Vue and standalone React demos, and the blog post about the feature.
- Conversation persistence or analytics.
- Next.js / React upgrade.

## Open decisions

1. **Voice:** an assistant speaking about Yash, e.g. "Yash is building…"
   (recommended: it never puts words in his mouth), or first person
   ("I'm building…").
