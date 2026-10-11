import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { simulateReadableStream, type LanguageModel } from "ai";
import { MockLanguageModelV4 } from "ai/test";

const DEFAULT_MODEL = "z-ai/glm-4.6";

const MOCK_TEXT =
  "This is **mock mode**: no `OPENROUTER_API_KEY` is set, so this reply is canned. " +
  "Set the key in `.env.local` to talk to a real model.";

const usage = {
  inputTokens: { total: 0, noCache: 0, cacheRead: 0, cacheWrite: 0 },
  outputTokens: { total: 0, text: 0, reasoning: 0 },
};

function mockModel() {
  return new MockLanguageModelV4({
    provider: "mock",
    modelId: "mock",
    doStream: async () => ({
      stream: simulateReadableStream({
        initialDelayInMs: 200,
        chunkDelayInMs: 30,
        chunks: [
          { type: "stream-start" as const, warnings: [] },
          { type: "text-start" as const, id: "t1" },
          ...MOCK_TEXT.split(/(?<= )/).map((delta) => ({
            type: "text-delta" as const,
            id: "t1",
            delta,
          })),
          { type: "text-end" as const, id: "t1" },
          {
            type: "finish" as const,
            finishReason: { unified: "stop" as const, raw: "stop" },
            usage,
          },
        ],
      }),
    }),
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
