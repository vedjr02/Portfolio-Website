"use client";

import { useEffect, useMemo } from "react";
import { featuredProjects, type Project } from "@/lib/data";
import { NumberTicker } from "@/components/ui/number-ticker";
import { ArrowUpRight } from "lucide-react";
import { DoodleNote } from "@/components/Doodles";
import { ProjectPreview } from "@/components/ProjectPreview";

const SHORT: Record<string, string> = {
  starbucks: "Starbucks",
  nvidia: "NVIDIA",
};

const BLURB: Record<string, string> = {
  starbucks:
    "Public filings only — growth levers, Rewards economics, and a full source appendix.",
  nvidia:
    "Twenty years of AI infrastructure bets, 68 sourced events, reject log included.",
};

export function Showcase() {
  const lineup = useMemo(() => featuredProjects, []);

  useEffect(() => {
    const focusCase = (id: string) => {
      document
        .getElementById(`case-${id}`)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    };

    const params = new URLSearchParams(window.location.search);
    const fromUrl = params.get("case");
    if (fromUrl && lineup.some((p) => p.id === fromUrl)) {
      window.setTimeout(() => focusCase(fromUrl), 80);
    }

    const onSelect = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      if (id && lineup.some((p) => p.id === id)) focusCase(id);
    };
    window.addEventListener("va:select-case", onSelect);
    return () => window.removeEventListener("va:select-case", onSelect);
  }, [lineup]);

  if (!lineup.length) return null;

  return (
    <section id="showcase" className="relative py-16 md:py-24">
      <div className="relative mx-auto max-w-5xl px-5 md:px-6">
        <div className="relative mb-8 max-w-xl">
          <DoodleNote
            label="open these"
            direction="down-right"
            size="md"
            rotate={-6}
            className="absolute -right-4 top-0 z-10 hidden lg:flex flex-col xl:-right-28"
          />
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-accent">
            Case studies
          </p>
          <h2 className="font-display text-[clamp(1.85rem,4vw,2.75rem)] leading-[1.1] tracking-tight text-ink">
            Case studies with receipts.
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
            Two deep, sourced narratives — both live. Pick either and open the
            demo.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
          {lineup.map((project, index) => (
            <CaseCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseCard({ project, index }: { project: Project; index: number }) {
  const short = SHORT[project.id] ?? project.title;
  const blurb = BLURB[project.id] ?? project.description;

  return (
    <article
      id={`case-${project.id}`}
      className="surface flex h-full flex-col overflow-hidden scroll-mt-28"
    >
      {(project.liveUrl || project.previewImage) && (
        <div className="p-3 pb-0">
          <ProjectPreview
            url={project.liveUrl}
            title={project.title}
            size="sm"
            image={project.previewImage}
          />
        </div>
      )}

      <div className="flex flex-1 flex-col p-4 md:p-5">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="font-mono text-[11px] font-bold text-accent">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-muted">
          {project.category}
        </p>
        <h3 className="mt-1.5 font-display text-[1.35rem] leading-[1.15] tracking-tight text-ink md:text-[1.5rem]">
          {short}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink-soft">
          {blurb}
        </p>

        <ul className="mt-4 space-y-2">
          {project.highlights.slice(0, 2).map((h, i) => (
            <li key={h} className="flex gap-2.5 text-sm text-ink-soft">
              <span className="shrink-0 pt-0.5 font-mono text-[10px] font-bold text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="leading-snug line-clamp-2">{h}</span>
            </li>
          ))}
        </ul>

        {project.metric && (
          <div className="mt-4 surface-quiet px-3.5 py-3">
            <div className="flex items-baseline gap-1.5">
              <span className="font-display text-2xl leading-none tracking-tight text-accent tabular-nums md:text-[1.75rem]">
                <NumberTicker
                  value={project.metric.value}
                  decimalPlaces={project.metric.decimals ?? 0}
                  className="text-accent"
                />
                {project.metric.suffix}
              </span>
            </div>
            <p className="mt-1 text-[11px] font-semibold text-muted">
              {project.metric.label}
            </p>
          </div>
        )}

        <div className="mt-auto flex flex-wrap gap-2 pt-5">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-primary min-h-10 gap-1.5 !px-3.5 !py-2 text-sm"
            >
              Open demo
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary min-h-10 !px-3.5 !py-2 text-sm"
            >
              Source
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
