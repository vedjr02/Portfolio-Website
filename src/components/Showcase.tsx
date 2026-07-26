"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { featuredProjects } from "@/lib/data";
import { NumberTicker } from "@/components/ui/number-ticker";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { DoodleNote } from "@/components/Doodles";

const SHORT: Record<string, string> = {
  starbucks: "Starbucks",
  nvidia: "NVIDIA",
};

const PROOF: Record<string, string> = {
  starbucks:
    "Public filings only — every figure traces to a named disclosure.",
  nvidia:
    "Twenty years of AI infrastructure decisions, sourced and reject-logged.",
};

export function Showcase() {
  const lineup = useMemo(() => featuredProjects, []);
  const [activeId, setActiveId] = useState(lineup[0]?.id ?? "");
  const active = lineup.find((p) => p.id === activeId) ?? lineup[0];
  const activeIndex = Math.max(
    0,
    lineup.findIndex((p) => p.id === active?.id)
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      e.preventDefault();
      const next =
        e.key === "ArrowRight"
          ? (activeIndex + 1) % lineup.length
          : (activeIndex - 1 + lineup.length) % lineup.length;
      setActiveId(lineup[next].id);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, lineup]);

  if (!active) return null;

  return (
    <section id="showcase" className="relative py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-5 md:px-6 relative">
        <div className="max-w-xl mb-6">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent mb-3">
            Case studies
          </p>
          <h2 className="font-display text-[clamp(1.85rem,4vw,2.75rem)] leading-[1.1] tracking-tight text-ink">
            Case studies with receipts.
          </h2>
          <p className="mt-3 text-[15px] text-ink-soft leading-relaxed">
            Deep, sourced narratives — separate from product and consulting
            builds. Pick a case, scan the proof, open the live demo.
          </p>
          <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.12em] text-muted">
            Tip · use ← → to switch cases
          </p>
        </div>

        <div className="relative">
          {/* One cue in the empty gutter above the browser — long arrow into the tabs */}
          <DoodleNote
            label="open these"
            direction="down"
            size="xxl"
            rotate={-5}
            className="absolute right-6 top-0 z-10 hidden lg:flex"
          />
          <div className="hidden lg:block h-40" aria-hidden />

          <div className="surface overflow-hidden relative">
            <div
              role="tablist"
              aria-label="Featured case studies"
              className="flex gap-1 overflow-x-auto border-b border-line p-2 hide-scrollbar"
            >
              {lineup.map((project, index) => {
                const on = project.id === active.id;
                return (
                  <button
                    key={project.id}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    onClick={() => setActiveId(project.id)}
                    className={`group relative flex min-w-[9.5rem] flex-1 items-center gap-3 rounded-2xl px-3.5 py-3 text-left transition-colors ${
                      on
                        ? "bg-bg-deep text-ink"
                        : "text-ink-soft hover:bg-bg/60 hover:text-ink"
                    }`}
                  >
                    <span
                      className={`font-mono text-[11px] font-bold ${
                        on ? "text-accent" : "text-muted"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate font-display text-[15px] tracking-tight">
                        {SHORT[project.id] ?? project.title}
                      </span>
                      <span className="mt-0.5 flex items-center gap-1.5 text-[11px] font-semibold text-muted">
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            project.status === "Live" ? "bg-sage" : "bg-muted"
                          }`}
                        />
                        {project.status}
                      </span>
                    </span>
                    {on && (
                      <motion.span
                        layoutId="case-tab-indicator"
                        className="absolute inset-x-2 -bottom-[9px] h-0.5 rounded-full bg-accent"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                role="tabpanel"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-1 lg:grid-cols-12"
              >
                <div className="lg:col-span-7 min-w-0 p-5 md:p-8 lg:border-r border-line">
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted">
                    {active.category}
                  </p>
                  <h3 className="mt-2 font-display text-[clamp(1.5rem,3vw,2.15rem)] leading-[1.12] tracking-tight text-ink">
                    {active.title}
                  </h3>
                  <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
                    {active.description}
                  </p>

                  <ol className="mt-7 space-y-0">
                    {active.highlights.map((h, i) => (
                      <li
                        key={h}
                        className="grid grid-cols-[2.25rem_1fr] gap-3 border-t border-line py-3.5"
                      >
                        <span className="font-mono text-[11px] font-bold text-accent pt-0.5">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-sm text-ink leading-relaxed">{h}</span>
                      </li>
                    ))}
                  </ol>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {active.tags.map((t) => (
                      <span key={t} className="pill">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-8 flex flex-wrap gap-3">
                    {active.liveUrl && (
                      <a
                        href={active.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-primary gap-2"
                      >
                        Open live demo
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    )}
                    {active.repoUrl && (
                      <a
                        href={active.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-secondary gap-2"
                      >
                        Source
                      </a>
                    )}
                  </div>
                </div>

                <aside className="lg:col-span-5 min-w-0 flex flex-col bg-bg/40">
                  <div className="p-5 md:p-8 flex-1">
                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted">
                      Signal
                    </p>

                    <div className="mt-5 rounded-2xl border border-line bg-panel p-5 overflow-hidden">
                      {active.metric ? (
                        <>
                          <div className="font-display text-[clamp(2.5rem,6vw,3.75rem)] leading-none tracking-tight text-accent tabular-nums">
                            <NumberTicker
                              value={active.metric.value}
                              decimalPlaces={active.metric.decimals ?? 0}
                              className="text-accent"
                            />
                            <span>{active.metric.suffix}</span>
                          </div>
                          <p className="mt-3 text-sm font-semibold text-ink-soft">
                            {active.metric.label}
                          </p>
                        </>
                      ) : null}
                    </div>

                    <div className="mt-5 space-y-4">
                      <MetaRow label="Period" value={active.period} />
                      <MetaRow label="Status" value={active.status} />
                      <MetaRow
                        label="Why it matters"
                        value={PROOF[active.id] ?? active.highlights[0]}
                      />
                    </div>
                  </div>

                  {active.liveUrl && (
                    <a
                      href={active.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center justify-between gap-3 border-t border-line px-5 md:px-8 py-4 text-sm font-bold text-ink hover:bg-panel/80 transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <ExternalLink className="h-4 w-4 text-accent" />
                        Launch this case
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
                    </a>
                  )}
                </aside>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[6.5rem_1fr] gap-3 border-t border-line pt-3">
      <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-muted pt-0.5">
        {label}
      </span>
      <span className="text-sm text-ink-soft leading-relaxed">{value}</span>
    </div>
  );
}
