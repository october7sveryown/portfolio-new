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

function nearBottom() {
  const el = document.documentElement;
  return el.scrollHeight - window.scrollY - window.innerHeight < 80;
}

export function Chat({ posts }: { posts: PostMeta[] }) {
  const { messages, setMessages, sendMessage, status, stop, error, regenerate } =
    useChat<ChatMessage>();
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
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
    inputRef.current?.focus();
  }, [setMessages]);

  useEffect(() => {
    if (!restored.current || busy) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {}
  }, [messages, busy]);

  // Follow new content unless the user has scrolled up.
  useEffect(() => {
    const onScroll = () => {
      stickToBottom.current = nearBottom();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (stickToBottom.current) {
      window.scrollTo({ top: document.documentElement.scrollHeight });
    }
  }, [messages, status]);

  const send = (text: string) => {
    stickToBottom.current = true;
    sendMessage({ text });
    setInput("");
  };

  const clear = () => {
    stop();
    setMessages([]);
    inputRef.current?.focus();
  };

  return (
    <div id="chat" className="flex flex-1 flex-col gap-6">
      <div className="flex items-baseline justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="font-serif text-4xl tracking-tight sm:text-5xl">Ask me anything</h1>
          <p className="text-sm text-muted-foreground">
            An assistant that answers questions about Yash&apos;s work, projects and writing.
          </p>
        </div>
        {messages.length > 0 && (
          <button
            type="button"
            onClick={clear}
            className="shrink-0 text-sm text-muted-foreground hover:text-foreground"
          >
            Clear
          </button>
        )}
      </div>

      <div aria-live="polite" className="flex flex-1 flex-col gap-6">
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

      <div className="sticky bottom-20 z-20 -mx-2 bg-background px-2 pb-2 pt-2">
        <ChatInput
          ref={inputRef}
          value={input}
          onChange={setInput}
          onSubmit={send}
          onStop={stop}
          busy={busy}
          showStarters={messages.length === 0}
        />
      </div>
    </div>
  );
}
