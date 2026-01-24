import BlurFade from "@/components/magicui/blur-fade";
import { getBlogPosts } from "@/data/blog";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export const metadata = {
  title: "Blog",
  description: "My thoughts on software development, life, and more.",
};

const BLUR_FADE_DELAY = 0.04;

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <section className="section-spacing">
      <div className="container-lg">
        <BlurFade delay={BLUR_FADE_DELAY}>
          <h1 className="text-3xl font-bold tracking-tight mb-8">Blog</h1>
        </BlurFade>
        <div className="grid grid-cols-1 gap-4">
          {posts
            .sort((a, b) => {
              if (
                new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
              ) {
                return -1;
              }
              return 1;
            })
            .map((post, id) => (
              <BlurFade delay={BLUR_FADE_DELAY * 2 + id * 0.05} key={post.slug}>
                <Link href={`/blog/${post.slug}`}>
                  <Card className="p-4 sm:p-6 shadow-refined hover:shadow-elevated transition-all duration-300 hover:-translate-y-0.5">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <h2 className="text-base sm:text-lg font-semibold tracking-tight">
                        {post.metadata.title}
                      </h2>
                      <time className="text-sm text-muted-foreground whitespace-nowrap">
                        {post.metadata.publishedAt}
                      </time>
                    </div>
                    {post.metadata.summary && (
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                        {post.metadata.summary}
                      </p>
                    )}
                  </Card>
                </Link>
              </BlurFade>
            ))}
        </div>
      </div>
    </section>
  );
}
