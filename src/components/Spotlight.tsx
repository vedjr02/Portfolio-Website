"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  consultingProjects,
  featuredProjects,
  type Project,
} from "@/lib/data";
import { NumberTicker } from "@/components/ui/number-ticker";
import { BlurFade } from "@/components/ui/blur-fade";

const easeOut = [0.22, 1, 0.36, 1] as const;

export function Spotlight() {
  const lineup = useMemo(() => {
    const adflex = consultingProjects.find((p) => p.id === "adflex");
    return [...featuredProjects, ...(adflex ? [adflex] : [])];
  }, []);

  const [activeId, setActiveId] = useState(lineup[0]?.id ?? "");
  const [previewReady, setPreviewReady] = useState(false);
  const active = lineup.find((p) => p.id === activeId) ?? lineup[0];

  useEffect(() => {
    setPreviewReady(false);
  }, [activeId]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!["ArrowLeft", "ArrowRight"].includes(e.key)) return;
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      const idx = lineup.findIndex((p) => p.id === activeId);
      if (idx < 0) return;
      if (e.key === "ArrowRight") {
        setActiveId(lineup[(idx + 1) % lineup.length].id);
      }
      if (e.key === "ArrowLeft") {
        setActiveId(lineup[(idx - 1 + lineup.length) % lineup.length].id);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeId, lineup]);

  if (!active) return null;

  return (
    <section id="spotlight" className="relative py-20 md:py-28 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        <BlurFade inView direction="up">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px w-8 bg-ink/20" />
                <span className="font-mono text-[12px] tracking-[0.22em] uppercase text-muted">
                  Spotlight
                </span>
              </div>
              <h2 className="font-display text-[clamp(2.4rem,6vw,4.5rem)] leading-[1.02] text-ink">
                Open the work.
              </h2>
              <p className="mt-3 max-w-xl text-ink-soft text-[15px] md:text-base">
                Switch case studies, preview the live site in-place, then jump
                out when you want the full experience. ← → to cycle.
              </p>
            </div>
            <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-muted">
              {lineup.findIndex((p) => p.id === active.id) + 1} / {lineup.length}
            </p>
          </div>
        </BlurFade>

        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2 mb-5">
          {lineup.map((project) => {
            const selected = project.id === active.id;
            return (
              <button
                key={project.id}
                type="button"
                onClick={() => setActiveId(project.id)}
                aria-pressed={selected}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  selected
                    ? "neu-inset text-ink"
                    : "neu-btn text-ink-soft hover:text-ink"
                }`}
              >
                {project.id === "adflex"
                  ? "AdFlex · SEI"
                  : project.title.split(" ").slice(0, 2).join(" ")}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: easeOut }}
            className="neu rounded-[28px] overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-5 p-7 md:p-9 flex flex-col border-b lg:border-b-0 lg:border-r border-line">
                <div className="flex flex-wrap items-center gap-2 mb-5">
                  <StatusDot status={active.status} />
                  {active.id === "adflex" && (
                    <span className="neu-inset rounded-full px-2.5 py-1 font-mono text-[10px] tracking-[0.14em] uppercase text-accent">
                      Current · SEI
                    </span>
                  )}
                  <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-muted">
                    {active.period}
                  </span>
                </div>

                <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-muted mb-2">
                  {active.category}
                </p>
                <h3 className="font-display text-[clamp(1.7rem,3vw,2.5rem)] leading-[1.08] text-ink">
                  {active.title}
                </h3>
                <p className="mt-4 text-sm md:text-[15px] text-ink-soft leading-relaxed">
                  {active.description}
                </p>

                <ul className="mt-5 space-y-2">
                  {active.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-start gap-2.5 text-sm text-ink-soft"
                    >
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>

                {active.metric && (
                  <div className="neu-inset rounded-2xl p-5 mt-6">
                    <div className="font-display text-4xl text-ink">
                      <NumberTicker
                        value={active.metric.value}
                        decimalPlaces={active.metric.decimals ?? 0}
                      />
                      {active.metric.suffix}
                    </div>
                    <p className="mt-1 font-mono text-[10px] tracking-[0.14em] uppercase text-muted">
                      {active.metric.label}
                    </p>
                  </div>
                )}

                <div className="mt-auto pt-7 flex flex-wrap gap-3">
                  {active.liveUrl && (
                    <a
                      href={active.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full bg-ink text-bg px-5 py-2.5 text-sm font-semibold hover:bg-accent hover:text-bg transition-colors shadow-[6px_6px_14px_#121417]"
                    >
                      Open full site →
                    </a>
                  )}
                  {active.repoUrl && (
                    <a
                      href={active.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="neu-inset rounded-full px-5 py-2.5 text-sm text-ink-soft hover:text-ink transition-colors"
                    >
                      GitHub
                    </a>
                  )}
                </div>
              </div>

              <div className="lg:col-span-7 relative min-h-[320px] md:min-h-[480px] bg-[#15171b]">
                <div className="absolute inset-x-0 top-0 z-10 flex items-center gap-2 border-b border-white/5 px-4 py-2.5 bg-[#15171b]/90 backdrop-blur-sm">
                  <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                  <span className="ml-2 truncate font-mono text-[10px] tracking-[0.12em] uppercase text-white/40 flex-1">
                    {active.liveUrl ?? "Preview unavailable"}
                  </span>
                  {active.liveUrl && (
                    <a
                      href={active.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="shrink-0 rounded-full bg-white/10 px-2.5 py-1 font-mono text-[10px] tracking-[0.12em] uppercase text-white/70 hover:bg-white/15 hover:text-white"
                    >
                      New tab
                    </a>
                  )}
                </div>

                {active.liveUrl ? (
                  <>
                    {!previewReady && (
                      <div className="absolute inset-0 z-[5] flex items-center justify-center pt-8">
                        <div className="neu-inset rounded-2xl px-5 py-4 text-sm text-ink-soft">
                          Loading live preview…
                        </div>
                      </div>
                    )}
                    <iframe
                      key={active.liveUrl}
                      src={active.liveUrl}
                      title={`${active.title} live preview`}
                      className="absolute inset-0 h-full w-full border-0 pt-10"
                      loading="lazy"
                      onLoad={() => setPreviewReady(true)}
                      sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                    />
                  </>
                ) : (
                  <PreviewFallback project={active} />
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function PreviewFallback({ project }: { project: Project }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center p-8 pt-14">
      <div className="max-w-sm text-center">
        <p className="font-display text-2xl text-ink">{project.title}</p>
        <p className="mt-3 text-sm text-ink-soft">
          Live preview ships when a public URL is available. Open GitHub for the
          source in the meantime.
        </p>
      </div>
    </div>
  );
}

function StatusDot({ status }: { status: Project["status"] }) {
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
