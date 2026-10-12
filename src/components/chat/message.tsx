"use client";

import { cn } from "@/lib/utils";
import type { UIMessage } from "ai";
import { Streamdown } from "streamdown";

interface MessageProps {
  message: UIMessage;
  streaming: boolean;
}

export function Message({ message, streaming }: MessageProps) {
  if (message.role === "user") {
    const text = message.parts
      .map((part) => (part.type === "text" ? part.text : ""))
      .join("");
    return (
      <div className="flex justify-end">
        <p className="max-w-[85%] whitespace-pre-wrap rounded-lg bg-muted px-3 py-2 text-sm">
          {text}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 text-sm">
      {message.parts.map((part, i) => {
        switch (part.type) {
          case "text":
            return (
              <Streamdown
                key={i}
                mode={streaming ? "streaming" : "static"}
                isAnimating={streaming}
                className={cn("text-pretty leading-relaxed [&_a]:underline [&_a]:underline-offset-4")}
              >
                {part.text}
              </Streamdown>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
