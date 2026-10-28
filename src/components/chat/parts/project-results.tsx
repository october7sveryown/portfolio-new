import { projectsByKey } from "@/lib/chat/catalog";
import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";

export function ProjectResults({ keys }: { keys: string[] }) {
  const projects = keys.flatMap((key) => projectsByKey.get(key) ?? []);
  if (projects.length === 0) return null;

  return (
    <ul className="flex flex-col divide-y rounded-lg border">
      {projects.map((project) => (
        <li key={project.title}>
          <Link
            href={project.href}
            target="_blank"
            className="group flex flex-col gap-1 px-3 py-2.5 transition-colors hover:bg-muted"
          >
            <div className="flex items-baseline justify-between gap-4">
              <span className="inline-flex items-center gap-1 font-medium tracking-tight">
                {project.title}
                <ArrowUpRightIcon className="size-3.5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
              <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                {project.dates.split(" - ")[0]}
              </span>
            </div>
            <p className="line-clamp-2 text-muted-foreground">{project.description}</p>
            <p className="text-xs text-muted-foreground">
              {project.technologies.join(" · ")}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
