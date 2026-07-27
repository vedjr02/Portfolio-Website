"use client";

import { useMemo, useState } from "react";
import {
  consultingProjects,
  productProjects,
  selectedProjects,
  sideProjects,
  type Project,
} from "@/lib/data";
import { ProjectDrawer } from "@/components/ProjectDrawer";
import { Marquee } from "@/components/ui/marquee";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { DoodleNote } from "@/components/Doodles";
import { ProjectPreview } from "@/components/ProjectPreview";

export function ProjectIndex() {
  const adflex = useMemo(
    () => consultingProjects.find((p) => p.id === "adflex") ?? null,
    []
  );

  const [drawerProject, setDrawerProject] = useState<Project | null>(null);

  const rows = useMemo(() => {
    const order = [
      "retentioniq",
      "insightpilot",
      "votion",
      "lumen",
      "pricesense",
      "vcg",
      "smartbus",
      "diabetic-foot",
    ];
    const rest = [...consultingProjects, ...productProjects, ...selectedProjects].filter(
      (p) => p.id !== "adflex"
    );
    return order
      .map((id) => rest.find((p) => p.id === id))
      .filter((p): p is Project => !!p);
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
            Current engagement up top. Everything else as clear cards with a live
            preview when there&apos;s a demo to open.
          </p>
        </div>

        {adflex && (
          <div className="relative mb-10 lg:pt-16">
            <DoodleNote
              label="what I'm building now"
              direction="down"
              size="lg"
              rotate={-4}
              className="absolute left-6 top-0 z-10 hidden lg:flex flex-col"
            />
            <article className="surface relative overflow-hidden">
              <div className="h-1 w-full bg-accent/80" />
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
                  <div className="lg:col-span-7 min-w-0">
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
                        className="btn-brief text-sm"
                      >
                        Brief
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-5 min-w-0 flex flex-col gap-4">
                    {adflex.liveUrl && (
                      <ProjectPreview
                        url={adflex.liveUrl}
                        title={adflex.title}
                        size="md"
                        image={adflex.previewImage}
                      />
                    )}
                    <div className="surface-quiet p-5">
                      <div className="flex items-start gap-3">
                        <span
                          className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-sage animate-pulse-dot"
                          aria-hidden
                        />
                        <p className="text-sm leading-relaxed text-ink-soft">
                          Most probably as you&apos;re reading this, I&apos;m
                          hustling to improve it, fix issues, and keep building
                          this project.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        )}

        <div className="relative">
          <div className="mb-5 flex items-end justify-between gap-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted">
              More projects
            </p>
            <DoodleNote
              label="peek inside"
              direction="down-left"
              size="sm"
              rotate={5}
              className="hidden lg:flex flex-col"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {rows.map((project, index) => (
              <article
                key={project.id}
                className="surface overflow-hidden flex flex-col"
              >
                {(project.liveUrl || project.previewImage) && (
                  <div className="p-3 pb-0">
                    <ProjectPreview
                      url={project.liveUrl}
                      title={project.title}
                      size="sm"
                      image={project.previewImage}
                      caption={
                        project.liveUrl ? undefined : "Research preview"
                      }
                    />
                  </div>
                )}

                <div className="flex flex-1 flex-col p-5">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="font-mono text-[11px] font-bold text-accent">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="pill">{project.status}</span>
                    <span className="pill hidden sm:inline-flex">
                      {project.period.split("—")[0].trim()}
                    </span>
                  </div>

                  <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-muted">
                    {project.category}
                  </p>
                  <h3 className="mt-1.5 font-display text-xl leading-tight tracking-tight text-ink">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft line-clamp-3">
                    {project.description}
                  </p>

                  <div className="mt-auto pt-5 flex flex-wrap gap-2 items-center">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-primary !py-2 !px-3.5 text-sm"
                      >
                        Live
                      </a>
                    )}
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-secondary !py-2 !px-3.5 text-sm"
                      >
                        GitHub
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={() => setDrawerProject(project)}
                      className="btn-brief text-sm"
                    >
                      Brief
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
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
