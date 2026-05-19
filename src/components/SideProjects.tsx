"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { sideProjects, type SideProject } from "@/lib/data";

const easeOut = [0.2, 0.8, 0.2, 1] as const;

export function SideProjects() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.min(el.clientWidth * 0.8, 520);
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <section id="side-quests" className="relative py-20 md:py-28 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: easeOut }}
          className="flex items-end justify-between gap-6 flex-wrap mb-10 md:mb-14"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-neutral-700" />
              <span className="font-mono text-[12px] tracking-[0.22em] uppercase text-neutral-400">
                Side Quests
              </span>
            </div>
            <h2 className="font-display text-[clamp(1.8rem,4.5vw,3.5rem)] leading-[0.95] text-white max-w-2xl">
              Things I&apos;ve built{" "}
              <span className="italic text-sky-300/90">just for fun.</span>
            </h2>
            <p className="mt-4 max-w-xl text-neutral-400 text-[15px]">
              Weekend experiments, internship leftovers, and the occasional
              foray into computer vision, mobile, or AI — drag, scroll, or use
              the arrows.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => scrollBy(-1)}
              aria-label="Scroll left"
              className="h-10 w-10 rounded-full glass glass-hover flex items-center justify-center text-neutral-300 hover:text-white"
            >
              <Chevron dir="left" />
            </button>
            <button
              onClick={() => scrollBy(1)}
              aria-label="Scroll right"
              className="h-10 w-10 rounded-full glass glass-hover flex items-center justify-center text-neutral-300 hover:text-white"
            >
              <Chevron dir="right" />
            </button>
          </div>
        </motion.div>
      </div>

      <div className="relative">
        <div
          ref={scrollerRef}
          className="flex gap-4 md:gap-5 overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-px-6 px-6 md:px-[max(1.5rem,calc((100vw-72rem)/2))] py-2 hide-scrollbar"
          style={{ scrollbarWidth: "none", overscrollBehaviorY: "contain" }}
        >
          {sideProjects.map((p, i) => (
            <SideProjectCard key={p.id} project={p} index={i} />
          ))}
          <div className="shrink-0 w-6" aria-hidden />
        </div>
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 md:w-24 bg-gradient-to-r from-[#0a0a0a] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 md:w-24 bg-gradient-to-l from-[#0a0a0a] to-transparent" />
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
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: easeOut, delay: (index % 4) * 0.05 }}
      className="group relative shrink-0 snap-start w-[280px] md:w-[320px] glass glass-hover rounded-3xl overflow-hidden bg-neutral-950/70 backdrop-blur-2xl"
    >
      {/* Subtle accent gradient — same family as the Work cards */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-sky-300/20 to-indigo-400/5 opacity-40 group-hover:opacity-70 transition-opacity duration-700" />

      <div className="relative p-6 md:p-7 flex flex-col h-[300px] md:h-[320px]">
        <div className="flex items-start justify-between">
          <span className="font-display text-3xl text-sky-300/80 group-hover:text-sky-200 transition-colors">
            {project.emoji}
          </span>
          <span className="h-9 w-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-300 group-hover:bg-white group-hover:text-black transition-colors duration-500">
            <ArrowUpRight />
          </span>
        </div>

        <div className="mt-auto">
          <h3 className="font-display text-xl md:text-[22px] leading-tight text-white">
            {project.name}
          </h3>
          <p className="mt-3 text-[13.5px] text-neutral-300/90 leading-relaxed line-clamp-3">
            {project.blurb}
          </p>
          <div className="mt-5 flex flex-wrap gap-1.5">
            {project.stack.slice(0, 4).map((s) => (
              <span
                key={s}
                className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[11px] font-medium text-neutral-300"
              >
                {s}
              </span>
            ))}
          </div>
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
    <svg width="13" height="13" viewBox="0 0 12 12" fill="none">
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
