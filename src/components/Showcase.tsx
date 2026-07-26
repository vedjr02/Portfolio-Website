"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";
import {
  consultingProjects,
  featuredProjects,
  type Project,
} from "@/lib/data";
import { NumberTicker } from "@/components/ui/number-ticker";
import { Magnetic } from "@/components/Magnetic";

const VISUAL: Record<
  string,
  { tone: string; mark: string; caption: string }
> = {
  starbucks: {
    tone: "from-[#2a221c] via-[#1a1612] to-[#0e1014]",
    mark: "SBX",
    caption: "Daypart · Loyalty · Mix",
  },
  nvidia: {
    tone: "from-[#1c241c] via-[#121814] to-[#0e1014]",
    mark: "NVDA",
    caption: "CUDA · Inflection · Risk",
  },
  adflex: {
    tone: "from-[#222018] via-[#16140f] to-[#0e1014]",
    mark: "ADX",
    caption: "SEI · Tariffs · Pricing",
  },
};

export function Showcase() {
  const lineup = useMemo(() => {
    const adflex = consultingProjects.find((p) => p.id === "adflex");
    return [...featuredProjects, ...(adflex ? [adflex] : [])];
  }, []);

  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const onScroll = () => {
      const width = el.clientWidth;
      if (!width) return;
      const idx = Math.round(el.scrollLeft / width);
      setActive(Math.min(Math.max(idx, 0), lineup.length - 1));
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [lineup.length]);

  const goTo = (index: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTo({ left: index * el.clientWidth, behavior: "smooth" });
  };

  return (
    <section id="showcase" className="relative pt-20 md:pt-28 pb-10 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 mb-8 md:mb-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-ink/20" />
              <span className="font-mono text-[12px] tracking-[0.22em] uppercase text-muted">
                Case cinema
              </span>
            </div>
            <h2 className="font-display text-[clamp(2.6rem,7vw,5rem)] leading-[1.02] text-ink max-w-3xl">
              Scroll sideways through the work that matters.
            </h2>
          </div>
          <div className="flex flex-col items-start md:items-end gap-3">
            <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-muted">
              {String(active + 1).padStart(2, "0")} /{" "}
              {String(lineup.length).padStart(2, "0")}
            </p>
            <div className="flex gap-2">
              {lineup.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  aria-label={`Go to ${p.title}`}
                  aria-current={i === active}
                  onClick={() => goTo(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === active ? "w-8 bg-accent" : "w-2 bg-muted/50 hover:bg-ink-soft"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="flex snap-x snap-mandatory overflow-x-auto hide-scrollbar touch-pan-x"
      >
        {lineup.map((project, index) => (
          <FilmPanel
            key={project.id}
            project={project}
            index={index}
            total={lineup.length}
          />
        ))}
      </div>

      <p className="mt-5 text-center font-mono text-[10px] tracking-[0.18em] uppercase text-muted">
        Drag / trackpad sideways · or tap the dots
      </p>
    </section>
  );
}

function FilmPanel({
  project,
  index,
  total,
}: {
  project: Project;
  index: number;
  total: number;
}) {
  const visual = VISUAL[project.id] ?? {
    tone: "from-[#1a1c20] to-[#0e1014]",
    mark: String(index + 1).padStart(2, "0"),
    caption: project.category,
  };

  return (
    <article className="relative h-[min(78vh,820px)] w-full shrink-0 snap-center px-4 md:px-6">
      <div className="mx-auto flex h-full max-w-6xl overflow-hidden rounded-[28px] neu">
        <div className="grid h-full w-full grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-6 flex flex-col p-7 md:p-10 lg:p-12 border-b lg:border-b-0 lg:border-r border-line">
            <div className="flex items-center justify-between gap-3 mb-8">
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted">
                {String(index + 1).padStart(2, "0")} — {String(total).padStart(2, "0")}
              </span>
              <Status status={project.status} />
            </div>

            <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-muted mb-3">
              {project.category}
            </p>
            <h3 className="font-display text-[clamp(2rem,4.5vw,3.6rem)] leading-[1.05] text-ink">
              {project.title}
            </h3>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-ink-soft line-clamp-5 md:line-clamp-6">
              {project.description}
            </p>

            <ul className="mt-6 space-y-2.5">
              {project.highlights.slice(0, 3).map((h) => (
                <li key={h} className="flex gap-3 text-sm text-ink-soft">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {h}
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-8 flex flex-wrap gap-3">
              {project.liveUrl && (
                <Magnetic>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex rounded-full bg-ink text-bg px-5 py-3 text-sm font-semibold hover:bg-accent transition-colors"
                  >
                    Launch live case →
                  </a>
                </Magnetic>
              )}
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex neu-inset rounded-full px-5 py-3 text-sm text-ink-soft hover:text-ink transition-colors"
                >
                  Source
                </a>
              )}
            </div>
          </div>

          <div
            className={`relative lg:col-span-6 min-h-[280px] bg-gradient-to-br ${visual.tone} overflow-hidden`}
          >
            <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(243,241,236,0.35)_1px,transparent_1px),linear-gradient(90deg,rgba(243,241,236,0.35)_1px,transparent_1px)] [background-size:42px_42px]" />
            <div className="absolute -right-10 top-10 font-display text-[clamp(6rem,18vw,14rem)] leading-none text-white/[0.06] select-none">
              {visual.mark}
            </div>

            <div className="relative z-10 flex h-full flex-col justify-between p-7 md:p-10">
              <div>
                <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-white/45">
                  {visual.caption}
                </p>
                <p className="mt-3 font-mono text-[11px] tracking-[0.14em] uppercase text-white/35">
                  {project.period}
                </p>
              </div>

              {project.metric ? (
                <div>
                  <div className="font-display text-[clamp(4rem,10vw,7rem)] leading-none text-ink tracking-tight">
                    <NumberTicker
                      value={project.metric.value}
                      decimalPlaces={project.metric.decimals ?? 0}
                    />
                    <span className="text-accent">{project.metric.suffix}</span>
                  </div>
                  <p className="mt-3 max-w-[14rem] font-mono text-[11px] tracking-[0.14em] uppercase text-white/50">
                    {project.metric.label}
                  </p>
                </div>
              ) : (
                <div>
                  <p className="font-display text-5xl text-ink">Now</p>
                  <p className="mt-3 font-mono text-[11px] tracking-[0.14em] uppercase text-white/50">
                    Active consulting engagement
                  </p>
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                {project.tags.slice(0, 4).map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/70"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function Status({ status }: { status: Project["status"] }) {
  const color =
    status === "Live"
      ? "bg-emerald-500"
      : status === "In Progress"
        ? "bg-accent"
        : "bg-muted";
  return (
    <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.16em] uppercase text-ink-soft">
      <span className={`h-1.5 w-1.5 rounded-full ${color}`} />
      {status}
    </span>
  );
}
