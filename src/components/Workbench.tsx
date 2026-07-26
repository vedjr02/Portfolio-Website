"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useMotionTemplate, useMotionValue, useSpring } from "motion/react";
import {
  consultingProjects,
  productProjects,
  selectedProjects,
  sideProjects,
  type Project,
  type SideProject,
} from "@/lib/data";
import { BlurFade } from "@/components/ui/blur-fade";
import { ProjectDrawer } from "@/components/ProjectDrawer";

type FilterId = "all" | "consulting" | "product" | "systems" | "side";

const FILTERS: { id: FilterId; label: string }[] = [
  { id: "all", label: "All" },
  { id: "consulting", label: "Consulting" },
  { id: "product", label: "Product" },
  { id: "systems", label: "Systems" },
  { id: "side", label: "Side quests" },
];

const easeOut = [0.22, 1, 0.36, 1] as const;

export function Workbench() {
  const [filter, setFilter] = useState<FilterId>("all");
  const [active, setActive] = useState<Project | null>(null);

  const projectPool = useMemo(() => {
    const consulting = consultingProjects.filter((p) => p.id !== "adflex");
    return {
      consulting,
      product: productProjects,
      systems: selectedProjects,
    };
  }, []);

  const visibleProjects = useMemo(() => {
    if (filter === "consulting") return projectPool.consulting;
    if (filter === "product") return projectPool.product;
    if (filter === "systems") return projectPool.systems;
    if (filter === "side") return [];
    return [
      ...projectPool.consulting,
      ...projectPool.product,
      ...projectPool.systems,
    ];
  }, [filter, projectPool]);

  const showSides = filter === "all" || filter === "side";

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <section id="workbench" className="relative py-20 md:py-28 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        <BlurFade inView direction="up">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px w-8 bg-ink/20" />
                <span className="font-mono text-[12px] tracking-[0.22em] uppercase text-muted">
                  Workbench
                </span>
              </div>
              <h2 className="font-display text-[clamp(2.2rem,5vw,3.75rem)] leading-[1.02] text-ink">
                Everything else, filterable.
              </h2>
            </div>
            <p className="text-sm text-muted max-w-xs">
              Click a card for the dossier drawer — live demos still one hop away.
            </p>
          </div>
        </BlurFade>

        <div
          className="flex flex-wrap gap-2 mb-8"
          role="tablist"
          aria-label="Project filters"
        >
          {FILTERS.map((f) => {
            const selected = filter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setFilter(f.id)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  selected
                    ? "neu-inset text-ink"
                    : "neu-btn text-ink-soft hover:text-ink"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="popLayout">
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4"
          >
            {visibleProjects.map((project, index) => (
              <BentoCard
                key={project.id}
                project={project}
                index={index}
                onOpen={() => setActive(project)}
              />
            ))}

            {showSides &&
              sideProjects
                .slice(0, filter === "side" ? undefined : 4)
                .map((project, index) => (
                  <SideBento
                    key={project.id}
                    project={project}
                    index={index + visibleProjects.length}
                  />
                ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <ProjectDrawer
        project={active}
        open={!!active}
        onClose={() => setActive(null)}
      />
    </section>
  );
}

function spanFor(index: number) {
  const pattern = [
    "lg:col-span-4",
    "lg:col-span-2",
    "lg:col-span-2",
    "lg:col-span-2",
    "lg:col-span-2",
    "lg:col-span-3",
    "lg:col-span-3",
  ];
  return pattern[index % pattern.length];
}

function BentoCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) {
  const tall = index % 5 === 0;
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rx = useSpring(rawX, { stiffness: 200, damping: 20 });
  const ry = useSpring(rawY, { stiffness: 200, damping: 20 });
  const glare = useMotionTemplate`radial-gradient(420px circle at ${mx}px ${my}px, rgba(232,226,212,0.14), transparent 55%)`;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.35, ease: easeOut, delay: (index % 6) * 0.03 }}
      className={`sm:col-span-1 ${spanFor(index)} [perspective:900px]`}
    >
      <motion.button
        type="button"
        onClick={onOpen}
        data-cursor="interactive"
        style={{ rotateX: rx, rotateY: ry, backgroundImage: glare }}
        onPointerMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const px = e.clientX - rect.left;
          const py = e.clientY - rect.top;
          mx.set(px);
          my.set(py);
          const nx = (px / rect.width) * 2 - 1;
          const ny = (py / rect.height) * 2 - 1;
          rawY.set(nx * 6);
          rawX.set(-ny * 6);
        }}
        onPointerLeave={() => {
          rawX.set(0);
          rawY.set(0);
        }}
        className={`group neu neu-hover relative overflow-hidden rounded-[22px] p-5 md:p-6 flex flex-col h-full min-h-[210px] w-full text-left transform-gpu ${
          tall ? "md:min-h-[280px]" : ""
        }`}
      >
        <div className="relative z-10 flex h-full flex-col">
          <div className="flex items-center justify-between gap-2 mb-4">
            <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-muted">
              {project.status}
            </span>
            <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-muted">
              Open dossier
            </span>
          </div>
          <h3 className="font-display text-xl md:text-2xl leading-tight text-ink">
            {project.title}
          </h3>
          <p
            className={`mt-3 text-[13px] text-ink-soft leading-relaxed ${
              tall ? "line-clamp-5" : "line-clamp-3"
            }`}
          >
            {project.description}
          </p>
          <div className="mt-auto pt-5 flex flex-wrap gap-1.5">
            {project.tags.slice(0, 3).map((t) => (
              <span
                key={t}
                className="neu-inset rounded-full px-2 py-0.5 text-[10px] text-muted"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.button>
    </motion.div>
  );
}

function SideBento({
  project,
  index,
}: {
  project: SideProject;
  index: number;
}) {
  return (
    <motion.a
      layout
      href={project.href}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.35, ease: easeOut, delay: (index % 6) * 0.03 }}
      data-cursor="interactive"
      className="sm:col-span-1 lg:col-span-2 neu neu-hover rounded-[22px] p-5 flex flex-col min-h-[180px] no-underline text-inherit"
    >
      <span className="font-display text-xl text-accent mb-4">{project.emoji}</span>
      <h3 className="font-display text-lg text-ink leading-tight">{project.name}</h3>
      <p className="mt-2 text-[13px] text-ink-soft line-clamp-2">{project.blurb}</p>
    </motion.a>
  );
}
