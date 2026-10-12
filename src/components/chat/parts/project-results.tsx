import { ProjectCard } from "@/components/project-card";
import { projectsByKey } from "@/lib/chat/catalog";

export function ProjectResults({ keys }: { keys: string[] }) {
  const projects = keys.flatMap((key) => projectsByKey.get(key) ?? []);
  if (projects.length === 0) return null;

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {projects.map((project) => (
        <ProjectCard
          key={project.title}
          href={project.href}
          title={project.title}
          description={project.description}
          dates={project.dates}
          tags={project.technologies}
          image={project.image}
          video={project.video}
          links={project.links}
        />
      ))}
    </div>
  );
}
