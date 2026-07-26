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
import { NumberTicker } from "@/components/ui/number-ticker";
import { ArrowUpRight } from "lucide-react";
import { DoodleNote } from "@/components/Doodles";

export function ProjectIndex() {
  const adflex = useMemo(
    () => consultingProjects.find((p) => p.id === "adflex") ?? null,
    []
  );

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [drawerProject, setDrawerProject] = useState<Project | null>(null);

  const rows = useMemo(() => {
    const consulting = consultingProjects.filter((p) => p.id !== "adflex");
    return [...consulting, ...productProjects, ...selectedProjects];
  }, []);

  return (
    <section id="archive" className="relative py-16 md:py-24">
      <div className="mb-12 overflow-hidden border-y border-line py-4 bg-panel/40">
        <Marquee pauseOnHover className="[--duration:48s] [--gap:1rem]">
          {sideProjects.map((p) => (
            <a
              key={p.id}
              href={p.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full border border-line bg-bg-deep px-4 py-2 no-underline text-ink hover:border-accent transition-colors"
            >
              <span>{p.emoji}</span>
              <span className="text-sm font-bold">{p.name}</span>
            </a>
          ))}
        </Marquee>
      </div>

      <div className="mx-auto max-w-5xl px-5 md:px-6 relative">
        <div className="relative max-w-xl mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent mb-3">
            Projects
          </p>
          <h2 className="font-display text-[clamp(1.85rem,4vw,2.75rem)] leading-[1.1] tracking-tight text-ink">
            Consulting & product builds.
          </h2>
          <p className="mt-3 text-[15px] text-ink-soft leading-relaxed">
            Current engagement up top. Everything else stays visible — open a
            row when you want the brief.
          </p>
        </div>

        {/* AdFlex — always open featured project card */}
        {adflex && (
          <div className="relative mb-5 pt-14 lg:pt-16">
            <DoodleNote
              label="what I'm building now"
              direction="down"
              size="lg"
              rotate={-4}
              className="absolute left-6 top-0 z-10 hidden lg:flex"
            />
            <article className="surface overflow-hidden bg-[#101820]">
              <div className="h-1 w-full bg-accent" />
              <div className="p-5 md:p-7">
                <div className="flex flex-wrap items-center gap-2 mb-4 w-fit">
                  <span className="pill pill-accent">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-dot" />
                    Current
                  </span>
                  <span className="pill">{adflex.status}</span>
                  <span className="pill">{adflex.period}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                  <div className="lg:col-span-8 min-w-0">
                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted mb-1.5">
                      {adflex.category}
                    </p>
                    <h3 className="font-display text-[clamp(1.4rem,2.8vw,1.9rem)] leading-[1.15] tracking-tight text-ink">
                      {adflex.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink-soft max-w-2xl">
                      {adflex.description}
                    </p>

                    <ul className="mt-5 space-y-2.5">
                      {adflex.highlights.map((h, i) => (
                        <li key={h} className="flex gap-3 text-sm text-ink-soft">
                          <span className="font-mono text-[11px] font-bold text-accent shrink-0 pt-0.5">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          {h}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {adflex.tags.map((t) => (
                        <span key={t} className="pill">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 flex flex-wrap gap-3">
                      {adflex.liveUrl && (
                        <a
                          href={adflex.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="btn-primary gap-2 !py-2.5 !px-4 text-sm"
                        >
                          Open live
                          <ArrowUpRight className="h-4 w-4" />
                        </a>
                      )}
                      {adflex.repoUrl && (
                        <a
                          href={adflex.repoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="btn-secondary !py-2.5 !px-4 text-sm"
                        >
                          Source
                        </a>
                      )}
                      <button
                        type="button"
                        onClick={() => setDrawerProject(adflex)}
                        className="btn-secondary !py-2.5 !px-4 text-sm"
                      >
                        Brief
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-4 min-w-0">
                    <div className="rounded-2xl border border-line bg-bg/50 p-5 h-full flex flex-col justify-between">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted">
                          Engagement
                        </p>
                        <p className="mt-3 font-display text-4xl tracking-tight text-accent">
                          Now
                        </p>
                        <p className="mt-2 text-sm font-semibold text-ink-soft">
                          Business Consultant project for Sustainable Energy
                          Ireland (SEI)
                        </p>
                      </div>
                      <p className="mt-6 text-xs font-bold uppercase tracking-[0.1em] text-muted">
                        Dynamic pricing · KPI scenarios
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        )}

        <div className="relative">
          <DoodleNote
            label="tap a row"
            direction="down-left"
            size="sm"
            rotate={5}
            className="absolute -top-10 right-4 hidden md:flex"
          />
          {/* Other projects — closed by default, visible rows */}
          <div className="surface divide-y divide-line overflow-hidden">
          <div className="px-5 md:px-7 py-3 border-b border-line bg-bg/30">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted">
              More projects · click a row to expand
            </p>
          </div>

          {rows.map((project, index) => {
            const open = expandedId === project.id;
            return (
              <div key={project.id} className="bg-panel">
                <button
                  type="button"
                  onClick={() =>
                    setExpandedId((id) => (id === project.id ? null : project.id))
                  }
                  className="flex w-full items-center gap-4 md:gap-6 px-5 md:px-7 py-4 text-left hover:bg-bg-deep/70 transition-colors"
                >
                  <span className="text-sm font-bold text-muted w-7">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-lg md:text-xl text-ink truncate tracking-tight">
                      {project.title}
                    </h3>
                    <p className="mt-1 text-xs font-bold uppercase tracking-[0.08em] text-muted truncate">
                      {project.category} · {project.status}
                    </p>
                  </div>
                  <span className="hidden md:block text-sm font-semibold text-muted">
                    {project.period.split("—")[0].trim()}
                  </span>
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-full border border-line text-lg text-ink transition-transform ${
                      open ? "rotate-45 bg-accent text-[#061018] border-accent" : ""
                    }`}
                  >
                    +
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 md:px-7 pb-6 md:pl-16 bg-bg/50">
                        <p className="max-w-3xl text-sm text-ink-soft leading-relaxed">
                          {project.description}
                        </p>
                        {project.metric && (
                          <p className="mt-3 font-display text-2xl text-accent tabular-nums">
                            <NumberTicker
                              value={project.metric.value}
                              decimalPlaces={project.metric.decimals ?? 0}
                              className="text-accent"
                            />
                            {project.metric.suffix}{" "}
                            <span className="text-sm font-sans font-semibold text-muted">
                              {project.metric.label}
                            </span>
                          </p>
                        )}
                        <div className="mt-4 flex flex-wrap gap-2">
                          {project.tags.map((t) => (
                            <span key={t} className="pill">
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
                              className="btn-primary !py-2.5 !px-4 text-sm"
                            >
                              Live
                            </a>
                          )}
                          {project.repoUrl && (
                            <a
                              href={project.repoUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="btn-secondary !py-2.5 !px-4 text-sm"
                            >
                              GitHub
                            </a>
                          )}
                          <button
                            type="button"
                            onClick={() => setDrawerProject(project)}
                            className="btn-secondary !py-2.5 !px-4 text-sm"
                          >
                            Brief
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
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
