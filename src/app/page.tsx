import { HackathonCard } from "@/components/hackathon-card";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { ProjectCard } from "@/components/project-card";
import { ResumeCard } from "@/components/resume-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { DATA } from "@/data/resume";
import Link from "next/link";
import Markdown from "react-markdown";
import { MapPin } from "lucide-react";

const BLUR_FADE_DELAY = 0.04;

export default function Page() {
  return (
    <main className="flex flex-col min-h-[100dvh] space-y-0">
      <section id="hero" className="section-spacing">
        <div className="container-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[70vh]">
            {/* Avatar - Shows first on mobile, second on desktop */}
            <BlurFade delay={BLUR_FADE_DELAY} className="flex justify-center lg:justify-end lg:order-2">
              <Avatar className="size-40 sm:size-48 lg:size-56 xl:size-64 border-2 shadow-elevated">
                <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
                <AvatarFallback className="text-4xl">{DATA.initials}</AvatarFallback>
              </Avatar>
            </BlurFade>

            {/* Text Content - Shows second on mobile, first on desktop */}
            <div className="flex flex-col space-y-6 lg:space-y-8 lg:order-1">
              <BlurFadeText
                delay={BLUR_FADE_DELAY}
                className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl"
                yOffset={8}
                text={`Hi, I'm ${DATA.name.split(" ")[0]} 👋`}
              />
              <BlurFadeText
                className="text-lg text-muted-foreground sm:text-xl lg:text-2xl max-w-2xl"
                delay={BLUR_FADE_DELAY * 1.5}
                text={DATA.description}
              />
              <BlurFade delay={BLUR_FADE_DELAY * 2}>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{DATA.location}</span>
                </div>
              </BlurFade>
            </div>
          </div>
        </div>
      </section>
      <section id="about" className="section-spacing bg-muted/50">
        <div className="container-lg">
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <h2 className="text-3xl font-bold tracking-tight mb-8">About</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <Card className="p-6 sm:p-8 shadow-refined hover:shadow-elevated transition-shadow duration-300">
              <Markdown className="prose prose-neutral dark:prose-invert max-w-none text-base sm:text-lg leading-relaxed">
                {DATA.summary}
              </Markdown>
            </Card>
          </BlurFade>
        </div>
      </section>
      <section id="work" className="section-spacing">
        <div className="container-lg">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="text-3xl font-bold tracking-tight mb-8">Work Experience</h2>
          </BlurFade>
          <div className="grid grid-cols-1 gap-6">
            {DATA.work.map((work, id) => (
              <BlurFade
                key={work.company}
                delay={BLUR_FADE_DELAY * 6 + id * 0.05}
              >
                <Card className="p-6 shadow-refined hover:shadow-elevated transition-all duration-300 hover:-translate-y-0.5">
                  <ResumeCard
                    logoUrl={work.logoUrl}
                    altText={work.company}
                    title={work.company}
                    subtitle={work.title}
                    href={work.href}
                    badges={work.badges}
                    period={`${work.start} - ${work.end ?? "Present"}`}
                    description={work.description}
                  />
                </Card>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      <section id="education" className="section-spacing bg-muted/50">
        <div className="container-lg">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 className="text-3xl font-bold tracking-tight mb-8">Education</h2>
          </BlurFade>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {DATA.education.map((education, id) => (
              <BlurFade
                key={education.school}
                delay={BLUR_FADE_DELAY * 8 + id * 0.05}
              >
                <Card className="p-6 shadow-refined hover:shadow-elevated transition-all duration-300 hover:-translate-y-0.5">
                  <ResumeCard
                    href={education.href}
                    logoUrl={education.logoUrl}
                    altText={education.school}
                    title={education.school}
                    period={`${education.start} - ${education.end}`}
                    description={education.degree}
                  />
                </Card>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      <section id="skills" className="section-spacing">
        <div className="container-lg">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 className="text-3xl font-bold tracking-tight mb-8">Skills</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 10}>
            <Card className="p-6 sm:p-8 shadow-refined">
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {DATA.skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="text-sm sm:text-base px-3 py-1.5 sm:px-4 sm:py-2 hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>
          </BlurFade>
        </div>
      </section>
      <section id="projects" className="section-spacing bg-muted/50">
        <div className="container-xl">
          <BlurFade delay={BLUR_FADE_DELAY * 11}>
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
              <div className="inline-flex items-center rounded-full bg-primary text-primary-foreground px-4 py-1.5 text-sm font-medium">
                My Projects
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Check out my latest work
              </h2>
              <p className="text-muted-foreground text-base sm:text-lg max-w-2xl">
                I&apos;ve worked on 20+ projects, from simple websites to mobile applications.
                Here are a few of my favorites and recent ones.
              </p>
            </div>
          </BlurFade>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {DATA.projects.map((project, id) => (
              <BlurFade
                key={project.title}
                delay={BLUR_FADE_DELAY * 12 + id * 0.05}
              >
                <ProjectCard
                  href={project.href}
                  title={project.title}
                  description={project.description}
                  dates={project.dates}
                  tags={project.technologies}
                  image={project.image}
                  video={project.video}
                  links={project.links}
                  className="h-full shadow-refined hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
                />
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="section-spacing">
        <div className="container-md">
          <BlurFade delay={BLUR_FADE_DELAY * 16}>
            <Card className="p-8 sm:p-12 text-center shadow-refined">
              <div className="space-y-6">
                <div className="inline-flex items-center rounded-full bg-primary text-primary-foreground px-4 py-1.5 text-sm font-medium">
                  Contact
                </div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                  Get in Touch
                </h2>
                <p className="mx-auto max-w-2xl text-muted-foreground text-base sm:text-lg leading-relaxed">
                  Want to chat? Just shoot me a dm{" "}
                  <Link
                    href={DATA.contact.social.X.url}
                    className="text-foreground underline underline-offset-4 hover:text-primary transition-colors"
                  >
                    with a direct question on twitter
                  </Link>
                  {" "}or{" "}
                  <Link
                    href="mailto:yashthaker.777@gmail.com"
                    className="text-foreground underline underline-offset-4 hover:text-primary transition-colors"
                  >
                    mail me
                  </Link>
                  {" "}and I&apos;ll respond as soon as possible.
                </p>
              </div>
            </Card>
          </BlurFade>
        </div>
      </section>
    </main>
  );
}
