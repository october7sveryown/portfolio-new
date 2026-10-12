import { workByCompany } from "@/lib/chat/catalog";

export function ExperienceCard({ companies }: { companies: string[] }) {
  const entries = companies.flatMap((company) => workByCompany.get(company) ?? []);
  if (entries.length === 0) return null;

  return (
    <ul className="flex flex-col divide-y rounded-lg border">
      {entries.map((work) => (
        <li key={work.company} className="flex items-baseline justify-between gap-4 px-3 py-2.5">
          <div className="flex min-w-0 flex-col">
            <span className="font-medium tracking-tight">{work.company}</span>
            <span className="text-muted-foreground">{work.title}</span>
          </div>
          <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
            {work.start.split(" ").pop()} – {work.end.split(" ").pop()}
          </span>
        </li>
      ))}
    </ul>
  );
}
