import { DATA } from "@/data/resume";

// Stable IDs the tools return and the client resolves back to DATA entries.
export function projectKey(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export const projectsByKey = new Map(
  DATA.projects.map((project) => [projectKey(project.title), project])
);

export const workByCompany = new Map<string, (typeof DATA.work)[number]>(
  DATA.work.map((work) => [work.company, work])
);

export type PostMeta = {
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
};
