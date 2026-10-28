import { tool } from "ai";
import { z } from "zod";

import { getBlogPosts } from "@/data/blog";
import { DATA } from "@/data/resume";
import { projectKey } from "./catalog";

function matches(query: string | undefined, ...fields: readonly string[]) {
  if (!query) return true;
  const q = query.toLowerCase();
  return fields.some((field) => field.toLowerCase().includes(q));
}

export const tools = {
  showProjects: tool({
    description:
      "Show project cards. Use when the user asks about projects or things Yash has built. Optionally filter by a technology or keyword.",
    inputSchema: z.object({
      tech: z.string().optional().describe("Technology or keyword, e.g. 'Python' or 'AI'"),
    }),
    execute: async ({ tech }) => {
      const found = DATA.projects.filter((p) =>
        matches(tech, p.title, p.description, ...p.technologies)
      );
      // An over-narrow filter shouldn't produce an empty card list.
      const projects = found.length > 0 ? found : DATA.projects;
      return { keys: projects.map((p) => projectKey(p.title)), noMatch: found.length === 0 };
    },
  }),

  showPosts: tool({
    description:
      "Show links to Yash's blog posts. Use when the user asks about his writing or a topic he has written about.",
    inputSchema: z.object({
      topic: z.string().optional().describe("Topic keyword, e.g. 'Claude Code'"),
    }),
    execute: async ({ topic }) => {
      const posts = await getBlogPosts();
      const found = posts.filter((p) =>
        matches(topic, p.metadata.title, p.metadata.summary ?? "")
      );
      const list = found.length > 0 ? found : posts;
      return { slugs: list.map((p) => p.slug), noMatch: found.length === 0 };
    },
  }),

  showExperience: tool({
    description:
      "Show work experience entries. Use when the user asks where Yash has worked or about a specific job.",
    inputSchema: z.object({
      company: z.string().optional().describe("Company name to show, omit for all"),
    }),
    execute: async ({ company }) => {
      const found = DATA.work.filter((w) => matches(company, w.company, w.title));
      const list = found.length > 0 ? found : DATA.work;
      return { companies: list.map((w) => w.company), noMatch: found.length === 0 };
    },
  }),

  showContact: tool({
    description: "Show Yash's contact details. Use when the user wants to get in touch, hire him or ask something you can't answer.",
    inputSchema: z.object({}),
    execute: async () => ({ shown: true }),
  }),
};

export type ChatTools = typeof tools;
