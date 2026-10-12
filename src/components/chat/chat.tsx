"use client";

import { useChat } from "@ai-sdk/react";
import { RotateCcwIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import type { PostMeta } from "@/lib/chat/catalog";
import type { ChatMessage } from "@/lib/chat/types";

import { ChatInput } from "./chat-input";
import { Message } from "./message";

const STORAGE_KEY = "chat-messages";

function errorText(error: Error) {
  try {
    const body = JSON.parse(error.message);
    if (typeof body?.error === "string") return body.error;
  } catch {}
  return "Something went wrong. Please try again.";
}

export function Chat({ posts }: { posts: PostMeta[] }) {
  const { messages, setMessages, sendMessage, status, stop, error, regenerate } =
    useChat<ChatMessage>();
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const stickToBottom = useRef(true);
  const restored = useRef(false);

  const busy = status === "submitted" || status === "streaming";

  // Keep the conversation for this browser session only.
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) setMessages(JSON.parse(saved) as ChatMessage[]);
    } catch {}
    restored.current = true;
  }, [setMessages]);

  useEffect(() => {
    if (!restored.current || busy) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {}
  }, [messages, busy]);

  // Follow new content unless the user has scrolled up.
  useEffect(() => {
    const el = scrollRef.current;
    if (el && stickToBottom.current) el.scrollTop = el.scrollHeight;
  }, [messages, status]);

  const onScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    stickToBottom.current = el.scrollHeight - el.scrollTop - el.clientHeight < 40;
  };

  const send = (text: string) => {
    stickToBottom.current = true;
    sendMessage({ text });
    setInput("");
  };

  return (
    <div id="chat" className="flex scroll-mt-24 flex-col gap-3">
      {messages.length > 0 && (
        <div
          ref={scrollRef}
          onScroll={onScroll}
          aria-live="polite"
          className="flex max-h-[28rem] flex-col gap-4 overflow-y-auto overscroll-contain rounded-lg border px-4 py-4"
        >
          {messages.map((message, i) => (
            <Message
              key={message.id}
              message={message}
              streaming={status === "streaming" && i === messages.length - 1}
              posts={posts}
            />
          ))}
          {status === "submitted" && (
            <div className="flex gap-1 py-1" aria-label="Thinking">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="size-1.5 rounded-full bg-muted-foreground motion-safe:animate-pulse"
                  style={{ animationDelay: `${i * 150}ms` }}
                />
              ))}
            </div>
          )}
          {error && (
            <div className="flex items-center justify-between gap-3 rounded-md border border-dashed px-3 py-2 text-sm text-muted-foreground">
              <span>{errorText(error)}</span>
              <button
                type="button"
                onClick={() => regenerate()}
                className="inline-flex shrink-0 items-center gap-1 text-foreground hover:underline"
              >
                <RotateCcwIcon className="size-3.5" />
                Retry
              </button>
            </div>
          )}
        </div>
      )}
      <ChatInput
        value={input}
        onChange={setInput}
        onSubmit={send}
        onStop={stop}
        busy={busy}
        showStarters={messages.length === 0}
      />
    </div>
  );
}
