"use client";

import type { PostMeta } from "@/lib/chat/catalog";
import type { ChatMessage } from "@/lib/chat/types";
import { cn } from "@/lib/utils";
import { Streamdown } from "streamdown";

import { ContactCard } from "./parts/contact-card";
import { ExperienceCard } from "./parts/experience-card";
import { PostResults } from "./parts/post-results";
import { ProjectResults } from "./parts/project-results";

interface MessageProps {
  message: ChatMessage;
  streaming: boolean;
  posts: PostMeta[];
}

type ToolPart = Extract<ChatMessage["parts"][number], { type: `tool-${string}` }>;

function Skeleton({ className }: { className?: string }) {
  return <div className={cn("rounded-lg bg-muted motion-safe:animate-pulse", className)} />;
}

function ToolState({
  part,
  skeleton,
  children,
}: {
  part: ToolPart;
  skeleton: React.ReactNode;
  children: () => React.ReactNode;
}) {
  switch (part.state) {
    case "input-streaming":
    case "input-available":
      return <div aria-label="Loading">{skeleton}</div>;
    case "output-available":
      return <>{children()}</>;
    case "output-error":
      return (
        <p className="rounded-md border border-dashed px-3 py-2 text-muted-foreground">
          Couldn&apos;t load this. Try asking again.
        </p>
      );
    default:
      return null;
  }
}

export function Message({ message, streaming, posts }: MessageProps) {
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
                className="text-pretty leading-relaxed [&_a]:underline [&_a]:underline-offset-4"
              >
                {part.text}
              </Streamdown>
            );
          case "tool-showProjects":
            return (
              <ToolState
                key={i}
                part={part}
                skeleton={
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <Skeleton className="h-64" />
                    <Skeleton className="hidden h-64 sm:block" />
                  </div>
                }
              >
                {() => <ProjectResults keys={part.output!.keys} />}
              </ToolState>
            );
          case "tool-showPosts":
            return (
              <ToolState key={i} part={part} skeleton={<Skeleton className="h-16" />}>
                {() => <PostResults slugs={part.output!.slugs} posts={posts} />}
              </ToolState>
            );
          case "tool-showExperience":
            return (
              <ToolState key={i} part={part} skeleton={<Skeleton className="h-16" />}>
                {() => <ExperienceCard companies={part.output!.companies} />}
              </ToolState>
            );
          case "tool-showContact":
            return (
              <ToolState key={i} part={part} skeleton={<Skeleton className="h-12" />}>
                {() => <ContactCard />}
              </ToolState>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
