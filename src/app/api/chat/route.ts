import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  isStepCount,
  streamText,
  toUIMessageStream,
  validateUIMessages,
} from "ai";
import { z } from "zod";

import { getModel } from "@/lib/chat/model";

export const maxDuration = 30;

const bodySchema = z.object({
  messages: z.array(z.unknown()).min(1),
});

export async function POST(req: Request) {
  const parsed = bodySchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  let messages;
  try {
    messages = await validateUIMessages({ messages: parsed.data.messages });
  } catch {
    return Response.json({ error: "Invalid messages." }, { status: 400 });
  }

  const result = streamText({
    model: getModel(),
    instructions:
      "You answer questions about Yash Thaker's work, projects and writing. Keep answers short.",
    messages: await convertToModelMessages(messages),
    maxOutputTokens: 600,
    stopWhen: isStepCount(3),
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  });
}
