import type { LanguageModelV4StreamPart } from "@ai-sdk/provider";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { simulateReadableStream, type LanguageModel } from "ai";
import { MockLanguageModelV4 } from "ai/test";

const DEFAULT_MODEL = "z-ai/glm-4.6";

const MOCK_TEXT =
  "This is **mock mode**: no `OPENROUTER_API_KEY` is set, so this reply is canned. " +
  "Set it in `.env` or `.env.local` to talk to a real model.";

const usage = {
  inputTokens: { total: 0, noCache: 0, cacheRead: 0, cacheWrite: 0 },
  outputTokens: { total: 0, text: 0, reasoning: 0 },
};

function textChunks(text: string): LanguageModelV4StreamPart[] {
  return [
    { type: "text-start", id: "t1" },
    ...text.split(/(?<= )/).map((delta) => ({ type: "text-delta" as const, id: "t1", delta })),
    { type: "text-end", id: "t1" },
  ];
}

function finish(reason: "stop" | "tool-calls"): LanguageModelV4StreamPart {
  return { type: "finish", finishReason: { unified: reason, raw: reason }, usage };
}

// Canned replies: a showProjects call when the question mentions projects,
// a one-line follow-up after the tool result, and MOCK_TEXT otherwise.
function mockModel() {
  return new MockLanguageModelV4({
    provider: "mock",
    modelId: "mock",
    doStream: async ({ prompt }) => {
      const last = prompt[prompt.length - 1];
      const lastText =
        last?.role === "user"
          ? last.content.map((part) => (part.type === "text" ? part.text : "")).join(" ")
          : "";

      let chunks: LanguageModelV4StreamPart[];
      if (last?.role === "tool") {
        chunks = [...textChunks("Here are a few projects Yash has built."), finish("stop")];
      } else if (/project/i.test(lastText)) {
        chunks = [
          {
            type: "tool-call",
            toolCallId: `mock-${Date.now()}`,
            toolName: "showProjects",
            input: JSON.stringify({}),
          },
          finish("tool-calls"),
        ];
      } else {
        chunks = [...textChunks(MOCK_TEXT), finish("stop")];
      }

      return {
        stream: simulateReadableStream({
          initialDelayInMs: 200,
          chunkDelayInMs: 30,
          chunks: [{ type: "stream-start", warnings: [] }, ...chunks],
        }),
      };
    },
  });
}

export const isMockMode = !process.env.OPENROUTER_API_KEY;

export function getModel(): LanguageModel {
  if (isMockMode) return mockModel();

  const openrouter = createOpenRouter({ apiKey: process.env.OPENROUTER_API_KEY });
  return openrouter.chat(process.env.CHAT_MODEL || DEFAULT_MODEL, {
    provider: {
      // Only route to hosts that support every parameter we send, including tools.
      require_parameters: true,
      // Skip hosts that store or train on prompts.
      data_collection: "deny",
    },
  });
}
