import type { InferUITools, UIDataTypes, UIMessage } from "ai";

import type { ChatTools } from "./tools";

export type ChatMessage = UIMessage<unknown, UIDataTypes, InferUITools<ChatTools>>;
