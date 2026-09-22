"use client";

import { useEffect, useId, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { groups, type Project } from "@/lib/data";

type Props = {
  project: Project | null;
  onClose: () => void;
  onStep: (dir: 1 | -1) => void;
  position?: { index: number; total: number };
};

/**
 * Quick Look for a project. Opens over the page like Finder's Space-bar preview:
 * Space or Esc closes it, the arrow keys step through the list behind it.
 */
export function QuickLook({ project, onClose, onStep, position }: Props) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();
  const open = !!project;

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => closeRef.current?.focus(), 30);

    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      const native = tag === "INPUT" || tag === "A" || tag === "BUTTON";
      if (e.key === "Escape" || (e.key === " " && !native)) {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        onStep(1);
        return;
      }
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        onStep(-1);
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      previous?.focus?.({ preventScroll: true });
    };
  }, [open, onClose, onStep]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-end justify-center p-0 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <button
            type="button"
            aria-label="Close Quick Look"
            tabIndex={-1}
            onClick={onClose}
            className="absolute inset-0 bg-black/35"
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 8 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            className="relative flex max-h-[92dvh] w-full max-w-[860px] flex-col overflow-hidden rounded-t-[14px] bg-window shadow-window sm:rounded-[14px]"
          >
            <span aria-hidden className="mx-auto mt-2 block h-[5px] w-9 shrink-0 rounded-full bg-fill-2 sm:hidden" />
            <div className="flex min-h-12 items-center gap-2 border-b border-rule bg-chrome px-3">
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="grid size-9 place-items-center rounded-md text-ink-2 hover:bg-fill"
              >
                <X className="size-4" />
              </button>
              <p className="min-w-0 flex-1 truncate text-center text-[13px] font-semibold">
                {project.name}
                {position && (
                  <span className="ml-2 font-normal text-ink-3 tabular">
                    {position.index + 1} of {position.total}
                  </span>
                )}
              </p>
              <button
                type="button"
                onClick={() => onStep(-1)}
                aria-label="Previous project"
                className="grid size-9 place-items-center rounded-md text-ink-2 hover:bg-fill"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => onStep(1)}
                aria-label="Next project"
                className="grid size-9 place-items-center rounded-md text-ink-2 hover:bg-fill"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>

            <div className="mac-scroll overflow-y-auto">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.14 }}
                >
                  {project.preview ? (
                    <div className="relative aspect-[16/9] bg-chrome-2">
                      <Image
                        src={project.preview}
                        alt={`${project.name} screenshot`}
                        fill
                        sizes="860px"
                        className="object-cover object-top"
                      />
                    </div>
                  ) : (
                    <ReadmePreview project={project} />
                  )}

                  <div className="px-5 py-6 sm:px-8 sm:py-8">
                    <h2 id={titleId} className="text-[clamp(1.6rem,3.4vw,2.25rem)] leading-[1.05] font-semibold tracking-[-0.03em]">
                      {project.name}
                    </h2>
                    <p className="mt-2 text-[17px] text-ink-2">{project.summary}</p>
                    <p className="mt-3 flex flex-wrap items-center gap-x-2 text-[13px] text-ink-3">
                      <span
                        aria-hidden
                        className="size-2.5 rounded-full"
                        style={{ background: groups[project.group].tag }}
                      />
                      {groups[project.group].label} · {project.kind} · {project.date} · {project.status}
                    </p>

                    {project.role && <p className="mt-3 text-[13.5px] text-ink-3">Role: {project.role}</p>}

                    <p className="mt-5 max-w-[65ch] text-[15px] leading-[1.6] text-ink-2">{project.description}</p>

                    <ul className="mt-5 space-y-1.5 text-[14.5px]">
                      {project.highlights.map((h) => (
                        <li key={h} className="flex gap-2.5">
                          <span aria-hidden className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-ink-4" />
                          {h}
                        </li>
                      ))}
                    </ul>

                    <p className="mt-5 text-[13.5px] text-ink-3">
                      Built with <span className="text-ink-2">{project.stack.join(", ")}</span>
                    </p>

                    {(project.liveUrl || project.repoUrl) && (
                      <div className="mt-6 flex flex-wrap gap-2.5">
                        {project.liveUrl && (
                          <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn btn-default">
                            {project.id === "hold-my-code" ? "Visit the website" : "Open live"}
                            <ArrowUpRight className="size-4" />
                          </a>
                        )}
                        {project.repoUrl && (
                          <a href={project.repoUrl} target="_blank" rel="noreferrer" className="btn btn-plain">
                            Source on GitHub
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Projects without a screenshot preview their README, the way Quick Look shows a Markdown file. */
function ReadmePreview({ project }: { project: Project }) {
  return (
    <div className="bg-chrome-2 px-4 pt-6 sm:px-10 sm:pt-8">
      <div className="mx-auto max-w-[36rem] rounded-t-[6px] bg-surface px-6 pt-6 pb-8 font-mono text-[12.5px] leading-[1.7] text-ink-2 shadow-[0_0_0_0.5px_rgba(0,0,0,0.14),0_8px_24px_-12px_rgba(0,0,0,0.3)] sm:px-8">
        <p className="text-[11px] text-ink-4">README.md</p>
        <p className="mt-3 text-[15px] font-medium text-ink"># {project.name}</p>
        <p className="mt-2">{project.summary}</p>
        <p className="mt-4 font-medium text-ink">## Stack</p>
        <ul className="mt-1">
          {project.stack.map((s) => (
            <li key={s}>- {s}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
