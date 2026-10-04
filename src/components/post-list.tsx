import BlurFade from "@/components/magicui/blur-fade";
import { getBlogPosts } from "@/data/blog";
import Link from "next/link";

type Post = Awaited<ReturnType<typeof getBlogPosts>>[number];

interface PostListProps {
  posts: Post[];
  delay?: number;
}

export function PostList({ posts, delay = 0 }: PostListProps) {
  return (
    <ul className="flex flex-col">
      {posts.map((post, id) => (
        <BlurFade delay={delay + id * 0.05} key={post.slug}>
          <li>
            <Link
              href={`/blog/${post.slug}`}
              className="group -mx-3 flex flex-col gap-1 rounded-lg px-3 py-3 transition-colors hover:bg-muted"
            >
              <div className="flex items-baseline justify-between gap-4">
                <span className="font-medium tracking-tight">
                  {post.metadata.title}
                </span>
                <time className="shrink-0 text-xs tabular-nums text-muted-foreground">
                  {new Date(post.metadata.publishedAt).toLocaleDateString(
                    "en-US",
                    { month: "short", year: "numeric", timeZone: "UTC" }
                  )}
                </time>
              </div>
              {post.metadata.summary && (
                <p className="line-clamp-2 text-sm text-muted-foreground">
                  {post.metadata.summary}
                </p>
              )}
            </Link>
          </li>
        </BlurFade>
      ))}
    </ul>
  );
}
