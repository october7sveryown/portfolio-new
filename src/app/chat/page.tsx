import { Chat } from "@/components/chat/chat";
import { getBlogPosts } from "@/data/blog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chat",
  description: "Ask questions about Yash's work, projects and writing.",
};

export default async function ChatPage() {
  const posts = (await getBlogPosts()).map((post) => ({
    slug: post.slug,
    title: post.metadata.title,
    summary: post.metadata.summary,
    publishedAt: post.metadata.publishedAt,
  }));

  return (
    <main className="flex min-h-[calc(100dvh-14rem)] flex-col">
      <Chat posts={posts} />
    </main>
  );
}
