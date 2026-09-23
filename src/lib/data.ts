/**
 * v2 adapter: the old desktop components read from here. The real content now
 * lives in src/content (typed content layer). Removed once v3 replaces the page.
 */
import { projects, type Project, type ProjectGroup } from "@/content/projects";

export { profile } from "@/content/profile";
export { holdMyCode } from "@/content/holdMyCode";
export { education, toolkit } from "@/content/about";
export { projects };
export type { Project, ProjectGroup };
export type { ProjectStatus } from "@/content/projects";

export const groups: Record<ProjectGroup, { label: string; tag: string }> = {
  flagship: { label: "Flagship", tag: "#1d1d1f" },
  case: { label: "Case studies", tag: "#e5484d" },
  consulting: { label: "Consulting", tag: "#f5a524" },
  data: { label: "Analytics & data", tag: "#30a46c" },
  product: { label: "Products", tag: "#0a84ff" },
  experiment: { label: "Experiments", tag: "#8e8e93" },
};

export const caseStudies = ["nvidia", "starbucks", "adflex"]
  .map((id) => projects.find((p) => p.id === id))
  .filter((p): p is Project => !!p);
