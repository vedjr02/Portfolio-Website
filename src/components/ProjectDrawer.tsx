"use client";

import { AnimatePresence, motion } from "motion/react";
import type { Project } from "@/lib/data";
import { NumberTicker } from "@/components/ui/number-ticker";

export function ProjectDrawer({
  project,
  open,
  onClose,
}: {
  project: Project | null;
  open: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && project && (
        <>
          <motion.button
            type="button"
            aria-label="Close project details"
            className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 280, damping: 32 }}
            className="fixed top-0 right-0 z-[75] flex h-[100dvh] w-full max-w-lg flex-col neu border-l border-line"
          >
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <span className="font-mono text-[11px] tracking-[0.16em] uppercase text-muted">
                Project dossier
              </span>
              <button
                type="button"
                onClick={onClose}
                className="neu-btn rounded-full px-3 py-1.5 text-sm text-ink-soft hover:text-ink"
              >
                Close
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-6">
              <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-muted">
                {project.category}
              </p>
              <h2 className="mt-2 font-display text-3xl leading-[1.08] text-ink">
                {project.title}
              </h2>
              <p className="mt-2 font-mono text-[11px] tracking-[0.14em] uppercase text-muted">
                {project.status} · {project.period}
              </p>

              <p className="mt-6 text-[15px] leading-relaxed text-ink-soft">
                {project.description}
              </p>

              <ul className="mt-6 space-y-2.5">
                {project.highlights.map((h) => (
                  <li key={h} className="flex gap-2.5 text-sm text-ink-soft">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {h}
                  </li>
                ))}
              </ul>

              {project.metric && (
                <div className="neu-inset mt-8 rounded-2xl p-5">
                  <div className="font-display text-4xl text-ink">
                    <NumberTicker
                      value={project.metric.value}
                      decimalPlaces={project.metric.decimals ?? 0}
                    />
                    {project.metric.suffix}
                  </div>
                  <p className="mt-1 font-mono text-[10px] tracking-[0.14em] uppercase text-muted">
                    {project.metric.label}
                  </p>
                </div>
              )}

              <div className="mt-8 flex flex-wrap gap-1.5">
                {project.tags.map((t) => (
                  <span
                    key={t}
                    className="neu-inset rounded-full px-2.5 py-1 text-[11px] text-ink-soft"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="border-t border-line p-5 flex flex-wrap gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-ink text-bg px-5 py-2.5 text-sm font-semibold hover:bg-accent transition-colors"
                >
                  Open live demo →
                </a>
              )}
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="neu-inset rounded-full px-5 py-2.5 text-sm text-ink-soft hover:text-ink"
                >
                  GitHub
                </a>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
