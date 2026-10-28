import {
  convertToModelMessages,
  createUIMessageStream,
  createUIMessageStreamResponse,
  isStepCount,
  streamText,
  toUIMessageStream,
  validateUIMessages,
} from "ai";
import { z } from "zod";

import { looksLikeAttack, refusal } from "@/lib/chat/guard";
import { CHAT_ENABLED } from "@/lib/chat/enabled";
import { getInstructions } from "@/lib/chat/instructions";
import { getModel } from "@/lib/chat/model";
import { checkRateLimit, clientIp } from "@/lib/chat/rate-limit";
import { tools } from "@/lib/chat/tools";
import type { ChatMessage } from "@/lib/chat/types";

export const maxDuration = 30;

const MAX_MESSAGE_LENGTH = 500;
const MAX_HISTORY = 10;

const bodySchema = z.object({
  messages: z.array(z.unknown()).min(1).max(100),
});

export async function POST(req: Request) {
  if (!CHAT_ENABLED) {
    return Response.json({ error: "Not found." }, { status: 404 });
  }

  const limit = await checkRateLimit(clientIp(req));
  if (!limit.ok) {
    return Response.json({ error: limit.message }, { status: 429 });
  }

  const parsed = bodySchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  let messages;
  try {
    messages = await validateUIMessages<ChatMessage>({
      messages: parsed.data.messages,
      tools,
    });
  } catch {
    return Response.json({ error: "Invalid messages." }, { status: 400 });
  }

  // Only the server sets instructions; a client-sent system message is an injection attempt.
  if (messages.some((m) => m.role === "system")) {
    return Response.json({ error: "Invalid messages." }, { status: 400 });
  }

  const tooLong = messages.some(
    (m) =>
      m.role === "user" &&
      m.parts.some((p) => p.type === "text" && p.text.length > MAX_MESSAGE_LENGTH)
  );
  if (tooLong) {
    return Response.json(
      { error: `Please keep messages under ${MAX_MESSAGE_LENGTH} characters.` },
      { status: 400 }
    );
  }

  // Only recent turns go to the model, starting from a user message.
  let recent = messages.slice(-MAX_HISTORY);
  while (recent.length > 1 && recent[0].role !== "user") recent = recent.slice(1);

  const userText = recent
    .filter((m) => m.role === "user")
    .flatMap((m) => m.parts.map((p) => (p.type === "text" ? p.text : "")));
  if (userText.some(looksLikeAttack)) {
    return cannedReply(refusal());
  }

  const result = streamText({
    model: getModel(),
    instructions: await getInstructions(),
    tools,
    messages: await convertToModelMessages(recent, { tools }),
    maxOutputTokens: 600,
    stopWhen: isStepCount(3),
    // One round of tools, then text only: stops the model repeating a call.
    prepareStep: ({ steps }) =>
      steps.some((step) => step.toolCalls.length > 0) ? { toolChoice: "none" } : {},
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({
      stream: result.stream,
      tools,
      // Reasoning often quotes the instructions, so it never leaves the server.
      sendReasoning: false,
      onError: (error) => {
        console.error("Chat stream error", error);
        return "Something went wrong. Please try again.";
      },
    }),
  });
}

// A fixed reply streamed like a model answer, so the client renders it normally.
function cannedReply(text: string) {
  return createUIMessageStreamResponse({
    stream: createUIMessageStream<ChatMessage>({
      execute: ({ writer }) => {
        writer.write({ type: "start" });
        writer.write({ type: "text-start", id: "canned" });
        writer.write({ type: "text-delta", id: "canned", delta: text });
        writer.write({ type: "text-end", id: "canned" });
        writer.write({ type: "finish" });
      },
    }),
  });
}
