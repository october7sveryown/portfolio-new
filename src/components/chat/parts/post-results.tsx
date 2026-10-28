import type { PostMeta } from "@/lib/chat/catalog";
import Link from "next/link";

export function PostResults({ slugs, posts }: { slugs: string[]; posts: PostMeta[] }) {
  const found = slugs.flatMap((slug) => posts.find((p) => p.slug === slug) ?? []);
  if (found.length === 0) return null;

  return (
    <ul className="flex flex-col divide-y rounded-lg border">
      {found.map((post) => (
        <li key={post.slug}>
          <Link
            href={`/blog/${post.slug}`}
            className="flex flex-col gap-1 px-3 py-2.5 transition-colors hover:bg-muted"
          >
            <div className="flex items-baseline justify-between gap-4">
              <span className="font-medium tracking-tight">{post.title}</span>
              <time className="shrink-0 text-xs tabular-nums text-muted-foreground">
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                  timeZone: "UTC",
                })}
              </time>
            </div>
            {post.summary && (
              <p className="line-clamp-2 text-muted-foreground">{post.summary}</p>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}
