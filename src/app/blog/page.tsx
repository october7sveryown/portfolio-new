import BlurFade from "@/components/magicui/blur-fade";
import { PostList } from "@/components/post-list";
import { getBlogPosts } from "@/data/blog";

export const metadata = {
  title: "Blog",
  description: "My thoughts on software development, life, and more.",
};

const BLUR_FADE_DELAY = 0.04;

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <section>
      <BlurFade delay={BLUR_FADE_DELAY}>
        <h1 className="font-serif text-4xl tracking-tight mb-2">Blog</h1>
        <p className="text-sm text-muted-foreground mb-8">
          Notes on building software, AI tools, and what I&apos;m learning.
        </p>
      </BlurFade>
      <PostList posts={posts} delay={BLUR_FADE_DELAY * 2} />
    </section>
  );
}
