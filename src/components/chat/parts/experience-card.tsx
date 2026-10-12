import { ResumeCard } from "@/components/resume-card";
import { workByCompany } from "@/lib/chat/catalog";

export function ExperienceCard({ companies }: { companies: string[] }) {
  const entries = companies.flatMap((company) => workByCompany.get(company) ?? []);
  if (entries.length === 0) return null;

  return (
    <div className="flex flex-col">
      {entries.map((work) => (
        <ResumeCard
          key={work.company}
          logoUrl={work.logoUrl}
          altText={work.company}
          title={work.company}
          subtitle={work.title}
          href={work.href}
          badges={work.badges}
          period={`${work.start.split(" ").pop()} – ${work.end.split(" ").pop()}`}
          description={work.description}
        />
      ))}
    </div>
  );
}
