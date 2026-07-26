"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { sideProjects, type SideProject } from "@/lib/data";

const easeOut = [0.2, 0.8, 0.2, 1] as const;

export function SideProjects() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.min(el.clientWidth * 0.8, 420);
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        window.scrollBy({ top: e.deltaY, left: 0, behavior: "auto" });
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <section id="side-quests" className="relative py-20 md:py-28 overflow-hidden">
      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: easeOut }}
          className="flex items-end justify-between gap-6 flex-wrap mb-10"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-ink/20" />
              <span className="font-mono text-[12px] tracking-[0.22em] uppercase text-muted">
                Side Quests
              </span>
            </div>
            <h2 className="font-display text-[clamp(1.9rem,4.5vw,3.25rem)] leading-[1.02] text-ink max-w-2xl">
              Built for curiosity.
            </h2>
            <p className="mt-3 max-w-xl text-ink-soft text-[15px]">
              Small experiments under the case studies — scroll sideways.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => scrollBy(-1)}
              aria-label="Scroll left"
              className="h-10 w-10 rounded-full neu-btn flex items-center justify-center text-ink-soft"
            >
              <Chevron dir="left" />
            </button>
            <button
              onClick={() => scrollBy(1)}
              aria-label="Scroll right"
              className="h-10 w-10 rounded-full neu-btn flex items-center justify-center text-ink-soft"
            >
              <Chevron dir="right" />
            </button>
          </div>
        </motion.div>
      </div>

      <div
        ref={scrollerRef}
        className="side-projects-track flex gap-4 overflow-x-auto overflow-y-visible snap-x snap-mandatory scroll-px-6 px-6 md:px-[max(1.5rem,calc((100vw-72rem)/2))] py-2 hide-scrollbar"
      >
        {sideProjects.map((p, i) => (
          <SideProjectCard key={p.id} project={p} index={i} />
        ))}
        <div className="shrink-0 w-6" aria-hidden />
      </div>
    </section>
  );
}

function SideProjectCard({
  project,
  index,
}: {
  project: SideProject;
  index: number;
}) {
  return (
    <motion.a
      href={project.href}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, ease: easeOut, delay: (index % 4) * 0.05 }}
      className="group shrink-0 snap-start w-[min(260px,calc(100vw-3rem))] neu neu-hover rounded-[22px] p-5 flex flex-col h-[240px] no-underline text-inherit touch-pan-y"
    >
      <div className="flex items-start justify-between">
        <span className="font-display text-2xl text-accent">
          {project.emoji}
        </span>
        <span className="h-8 w-8 rounded-full neu-inset flex items-center justify-center text-ink-soft group-hover:text-ink">
          <ArrowUpRight />
        </span>
      </div>

      <div className="mt-auto">
        <h3 className="font-display text-lg leading-tight text-ink">
          {project.name}
        </h3>
        <p className="mt-2 text-[13px] text-ink-soft leading-relaxed line-clamp-2">
          {project.blurb}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 3).map((s) => (
            <span
              key={s}
              className="neu-inset rounded-full px-2 py-0.5 text-[10px] text-muted"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </motion.a>
  );
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d={dir === "left" ? "M9 2L3 7l6 5" : "M5 2l6 5-6 5"}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowUpRight() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path
        d="M3 9L9 3M9 3H4M9 3V8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
