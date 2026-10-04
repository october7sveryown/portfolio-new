import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { PostList } from "@/components/post-list";
import { ProjectCard } from "@/components/project-card";
import { ResumeCard } from "@/components/resume-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { getBlogPosts } from "@/data/blog";
import { DATA } from "@/data/resume";
import { ArrowRightIcon, MapPinIcon } from "lucide-react";
import Link from "next/link";
import Markdown from "react-markdown";

const BLUR_FADE_DELAY = 0.04;

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-4 text-sm font-medium uppercase tracking-widest text-muted-foreground">
      {children}
    </h2>
  );
}

export default async function Page() {
  const latestPosts = (await getBlogPosts()).slice(0, 3);

  return (
    <main className="flex min-h-[100dvh] flex-col space-y-14">
      <section id="hero">
        <div className="flex items-start justify-between gap-6">
          <div className="flex min-w-0 flex-1 flex-col gap-3">
            <BlurFadeText
              delay={BLUR_FADE_DELAY}
              className="font-serif text-5xl tracking-tight sm:text-6xl"
              yOffset={8}
              text={`Hi, I'm ${DATA.name.split(" ")[0]}`}
            />
            <BlurFadeText
              className="max-w-[540px] text-muted-foreground md:text-lg"
              delay={BLUR_FADE_DELAY * 2}
              text={DATA.description}
            />
            <BlurFade delay={BLUR_FADE_DELAY * 3}>
              <Link
                href={DATA.locationLink}
                target="_blank"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
              >
                <MapPinIcon className="size-3.5" />
                {DATA.location}
              </Link>
            </BlurFade>
          </div>
          <BlurFade delay={BLUR_FADE_DELAY}>
            <Avatar className="size-20 border sm:size-28">
              <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
              <AvatarFallback>{DATA.initials}</AvatarFallback>
            </Avatar>
          </BlurFade>
        </div>
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <div className="mt-8 flex items-start gap-3 rounded-lg border border-dashed px-4 py-3 text-sm">
            <span className="relative mt-1.5 flex size-2 shrink-0">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            <p>
              <span className="font-medium">Now: </span>
              <span className="text-muted-foreground">{DATA.now}</span>
            </p>
          </div>
        </BlurFade>
      </section>

      <section id="about">
        <BlurFade delay={BLUR_FADE_DELAY * 5}>
          <SectionHeading>About</SectionHeading>
          <Markdown className="prose max-w-full text-pretty text-muted-foreground dark:prose-invert">
            {DATA.summary}
          </Markdown>
        </BlurFade>
      </section>

      <section id="work">
        <BlurFade delay={BLUR_FADE_DELAY * 6}>
          <SectionHeading>Work</SectionHeading>
        </BlurFade>
        <div className="flex flex-col">
          {DATA.work.map((work, id) => (
            <BlurFade key={work.company} delay={BLUR_FADE_DELAY * 7 + id * 0.05}>
              <ResumeCard
                logoUrl={work.logoUrl}
                altText={work.company}
                title={work.company}
                subtitle={work.title}
                href={work.href}
                badges={work.badges}
                period={`${work.start.split(" ").pop()} – ${work.end.split(" ").pop()}`}
                description={work.description}
              />
            </BlurFade>
          ))}
        </div>
      </section>

      <section id="writing">
        <BlurFade delay={BLUR_FADE_DELAY * 8}>
          <div className="flex items-baseline justify-between">
            <SectionHeading>Writing</SectionHeading>
            <Link
              href="/blog"
              className="group inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            >
              All posts
              <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </BlurFade>
        <PostList posts={latestPosts} delay={BLUR_FADE_DELAY * 9} />
      </section>

      <section id="projects">
        <BlurFade delay={BLUR_FADE_DELAY * 10}>
          <div className="flex items-baseline justify-between">
            <SectionHeading>Projects</SectionHeading>
            <Link
              href={DATA.contact.social.GitHub.url}
              target="_blank"
              className="group inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            >
              More on GitHub
              <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </BlurFade>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {DATA.projects.map((project, id) => (
            <BlurFade key={project.title} delay={BLUR_FADE_DELAY * 11 + id * 0.05}>
              <ProjectCard
                href={project.href}
                title={project.title}
                description={project.description}
                dates={project.dates}
                tags={project.technologies}
                image={project.image}
                video={project.video}
                links={project.links}
              />
            </BlurFade>
          ))}
        </div>
      </section>

      <section id="skills">
        <BlurFade delay={BLUR_FADE_DELAY * 12}>
          <SectionHeading>Skills</SectionHeading>
          <div className="flex flex-wrap gap-1.5">
            {DATA.skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="font-normal">
                {skill}
              </Badge>
            ))}
          </div>
        </BlurFade>
      </section>

      <section id="education">
        <BlurFade delay={BLUR_FADE_DELAY * 13}>
          <SectionHeading>Education</SectionHeading>
        </BlurFade>
        <div className="flex flex-col">
          {DATA.education.map((education, id) => (
            <BlurFade key={education.school} delay={BLUR_FADE_DELAY * 14 + id * 0.05}>
              <ResumeCard
                href={education.href}
                logoUrl={education.logoUrl}
                altText={education.school}
                title={education.school}
                subtitle={education.degree}
                period={`${education.start} – ${education.end}`}
              />
            </BlurFade>
          ))}
        </div>
      </section>

      <section id="contact">
        <BlurFade delay={BLUR_FADE_DELAY * 15}>
          <SectionHeading>Contact</SectionHeading>
          <p className="text-pretty text-muted-foreground">
            Want to chat? Send me a DM{" "}
            <Link
              href={DATA.contact.social.X.url}
              target="_blank"
              className="text-foreground underline underline-offset-4"
            >
              on X
            </Link>{" "}
            or{" "}
            <Link
              href={`mailto:${DATA.contact.email}`}
              className="text-foreground underline underline-offset-4"
            >
              email me
            </Link>{" "}
            and I&apos;ll get back to you as soon as I can.
          </p>
        </BlurFade>
      </section>
    </main>
  );
}
