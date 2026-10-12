"use client";

import { cn } from "@/lib/utils";
import { ArrowUpIcon, SquareIcon } from "lucide-react";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

export const MAX_MESSAGE_LENGTH = 500;

const STARTERS = [
  "What are you building right now?",
  "Show me your AI projects",
  "Summarize your Claude Code post",
];

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (text: string) => void;
  onStop: () => void;
  busy: boolean;
  showStarters: boolean;
}

export const ChatInput = forwardRef<HTMLTextAreaElement, ChatInputProps>(
  function ChatInput({ value, onChange, onSubmit, onStop, busy, showStarters }, ref) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    useImperativeHandle(ref, () => textareaRef.current!);

    // Grow with the content, up to the max-height set in CSS.
    useEffect(() => {
      const el = textareaRef.current;
      if (!el) return;
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    }, [value]);

    const submit = (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || busy) return;
      onSubmit(trimmed);
    };

    return (
      <div className="flex flex-col gap-2">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit(value);
          }}
          className="flex items-end gap-2 rounded-lg border bg-background px-3 py-2 focus-within:border-foreground/30"
        >
          <label htmlFor="chat-input" className="sr-only">
            Ask me anything about my work
          </label>
          <textarea
            id="chat-input"
            ref={textareaRef}
            rows={1}
            value={value}
            maxLength={MAX_MESSAGE_LENGTH}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
                e.preventDefault();
                submit(value);
              }
            }}
            placeholder="Ask me anything about my work…"
            className="max-h-40 min-h-[1.5rem] flex-1 resize-none bg-transparent py-1 text-sm outline-none placeholder:text-muted-foreground"
          />
          {busy ? (
            <button
              type="button"
              onClick={onStop}
              aria-label="Stop generating"
              className="flex size-7 shrink-0 items-center justify-center rounded-md bg-foreground text-background"
            >
              <SquareIcon className="size-3 fill-current" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={!value.trim()}
              aria-label="Send message"
              className={cn(
                "flex size-7 shrink-0 items-center justify-center rounded-md bg-foreground text-background transition-opacity",
                "disabled:opacity-30"
              )}
            >
              <ArrowUpIcon className="size-4" />
            </button>
          )}
        </form>
        {showStarters && (
          <div className="flex flex-wrap gap-1.5">
            {STARTERS.map((starter) => (
              <button
                key={starter}
                type="button"
                onClick={() => submit(starter)}
                className="rounded-full border px-3 py-1 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {starter}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }
);
