"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  consultingProjects,
  productProjects,
  selectedProjects,
  sideProjects,
  type Project,
} from "@/lib/data";
import { ProjectDrawer } from "@/components/ProjectDrawer";
import { Marquee } from "@/components/ui/marquee";

type FilterId = "all" | "consulting" | "product" | "systems";

const FILTERS: { id: FilterId; label: string }[] = [
  { id: "all", label: "All" },
  { id: "consulting", label: "Consulting" },
  { id: "product", label: "Product" },
  { id: "systems", label: "Systems" },
];

export function ProjectIndex() {
  const [filter, setFilter] = useState<FilterId>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [drawerProject, setDrawerProject] = useState<Project | null>(null);

  const rows = useMemo(() => {
    const consulting = consultingProjects.filter((p) => p.id !== "adflex");
    const all = [...consulting, ...productProjects, ...selectedProjects];
    if (filter === "consulting") return consulting;
    if (filter === "product") return productProjects;
    if (filter === "systems") return selectedProjects;
    return all;
  }, [filter]);

  return (
    <section id="archive" className="relative py-20 md:py-28 overflow-hidden">
      <div className="mb-12 border-y border-line py-4">
        <Marquee pauseOnHover className="[--duration:55s] [--gap:2.5rem]">
          {sideProjects.map((p) => (
            <a
              key={p.id}
              href={p.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 rounded-full neu-sm px-4 py-2 no-underline text-inherit"
            >
              <span className="text-accent">{p.emoji}</span>
              <span className="font-display text-sm text-ink">{p.name}</span>
              <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-muted">
                side
              </span>
            </a>
          ))}
        </Marquee>
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-ink/20" />
              <span className="font-mono text-[12px] tracking-[0.22em] uppercase text-muted">
                Index
              </span>
            </div>
            <h2 className="font-display text-[clamp(2.2rem,5vw,3.75rem)] leading-[1.02] text-ink">
              The rest of the stack.
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  filter === f.id
                    ? "neu-inset text-ink"
                    : "neu-btn text-ink-soft hover:text-ink"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="neu rounded-[28px] overflow-hidden divide-y divide-line">
          {rows.map((project, index) => (
            <IndexRow
              key={project.id}
              project={project}
              index={index}
              expanded={expandedId === project.id}
              onToggle={() =>
                setExpandedId((id) => (id === project.id ? null : project.id))
              }
              onOpenDossier={() => setDrawerProject(project)}
            />
          ))}
        </div>
      </div>

      <ProjectDrawer
        project={drawerProject}
        open={!!drawerProject}
        onClose={() => setDrawerProject(null)}
      />
    </section>
  );
}

function IndexRow({
  project,
  index,
  expanded,
  onToggle,
  onOpenDossier,
}: {
  project: Project;
  index: number;
  expanded: boolean;
  onToggle: () => void;
  onOpenDossier: () => void;
}) {
  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center gap-4 md:gap-6 px-5 md:px-7 py-5 md:py-6 text-left hover:bg-white/[0.02] transition-colors"
      >
        <span className="font-mono text-[12px] tracking-[0.16em] text-muted w-10 shrink-0">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <h3 className="font-display text-xl md:text-2xl text-ink truncate">
              {project.title}
            </h3>
            <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-muted">
              {project.status}
            </span>
          </div>
          <p className="mt-1 font-mono text-[11px] tracking-[0.12em] uppercase text-muted truncate">
            {project.category}
          </p>
        </div>
        <span className="hidden sm:block font-mono text-[11px] tracking-[0.12em] uppercase text-muted shrink-0">
          {project.period.split("—")[0].trim()}
        </span>
        <span
          className={`font-display text-2xl text-accent transition-transform duration-200 ${
            expanded ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 md:px-7 pb-6 md:pb-7 md:pl-[4.75rem]">
              <p className="max-w-3xl text-sm md:text-[15px] leading-relaxed text-ink-soft">
                {project.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((t) => (
                  <span
                    key={t}
                    className="neu-inset rounded-full px-2.5 py-1 text-[11px] text-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full bg-ink text-bg px-4 py-2 text-sm font-semibold hover:bg-accent transition-colors"
                  >
                    Live demo →
                  </a>
                )}
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="neu-inset rounded-full px-4 py-2 text-sm text-ink-soft hover:text-ink"
                  >
                    GitHub
                  </a>
                )}
                <button
                  type="button"
                  onClick={onOpenDossier}
                  className="rounded-full neu-btn px-4 py-2 text-sm text-ink-soft hover:text-ink"
                >
                  Full dossier
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
