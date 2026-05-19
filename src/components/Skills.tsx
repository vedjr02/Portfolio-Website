"use client";

import { motion } from "framer-motion";
import { skills } from "@/lib/data";

const easeOut = [0.2, 0.8, 0.2, 1] as const;

type Row = {
  eyebrow: string;
  title: string;
  items: string[];
  direction: "left" | "right";
};

const rows: Row[] = [
  {
    eyebrow: "01 · Stack",
    title: "Technical",
    items: skills.technical,
    direction: "left",
  },
  {
    eyebrow: "02 · Build",
    title: "Frameworks",
    items: skills.frameworks,
    direction: "right",
  },
  {
    eyebrow: "03 · Practice",
    title: "Core Competencies",
    items: skills.competencies,
    direction: "left",
  },
];

export function Skills() {
  return (
    <section id="skills" className="relative py-24 md:py-36 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 mb-14 md:mb-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: easeOut }}
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-8 bg-neutral-700" />
            <span className="font-mono text-[12px] tracking-[0.22em] uppercase text-neutral-400">
              The Toolkit
            </span>
          </div>
          <h2 className="font-display text-[clamp(2.2rem,5.5vw,4.5rem)] leading-[0.95] text-white max-w-3xl">
            Every tool has a job;{" "}
            <span className="italic text-sky-300/90">
              I match the tool to the question.
            </span>
          </h2>
        </motion.div>
      </div>

      <div className="space-y-5 md:space-y-7">
        {rows.map((row, idx) => (
          <SkillRow key={row.title} row={row} index={idx} />
        ))}
      </div>
    </section>
  );
}

function SkillRow({ row, index }: { row: Row; index: number }) {
  // Duplicate so the marquee loops seamlessly
  const items = [...row.items, ...row.items];

  const animClass =
    row.direction === "left" ? "animate-marquee-slow" : "animate-marquee-reverse";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: easeOut, delay: index * 0.06 }}
      className="relative"
    >
      {/* Category label floating above the row */}
      <div className="mx-auto max-w-6xl px-6 flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-neutral-500">
            {row.eyebrow}
          </span>
          <span className="font-display text-base md:text-lg tracking-[0.06em] text-neutral-300">
            {row.title}
          </span>
        </div>
        <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-neutral-600 hidden md:inline">
          {row.items.length} tools
        </span>
      </div>

      {/* Marquee track */}
      <div className="relative overflow-hidden">
        <div className={`flex w-max ${animClass} pause-on-hover gap-3`}>
          {items.map((item, i) => (
            <SkillPill key={`${item}-${i}`} label={item} accent={index} />
          ))}
        </div>
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 md:w-40 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 md:w-40 bg-gradient-to-l from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
      </div>
    </motion.div>
  );
}

function SkillPill({ label, accent }: { label: string; accent: number }) {
  const accents = [
    "from-sky-400/20 to-blue-500/5 hover:from-sky-300/30 hover:to-blue-500/10",
    "from-indigo-400/20 to-blue-600/5 hover:from-indigo-300/30 hover:to-blue-600/10",
    "from-cyan-400/20 to-sky-500/5 hover:from-cyan-300/30 hover:to-sky-500/10",
  ];
  return (
    <div
      className={`group shrink-0 rounded-2xl border border-white/10 bg-gradient-to-br ${accents[accent % 3]} backdrop-blur-xl px-5 py-3 md:px-6 md:py-3.5 transition-colors duration-500 hover:border-white/25`}
    >
      <div className="flex items-center gap-2.5">
        <span className="h-1.5 w-1.5 rounded-full bg-sky-300 group-hover:bg-sky-200 transition-colors" />
        <span className="font-display tracking-[0.02em] text-[15px] md:text-base text-white whitespace-nowrap">
          {label}
        </span>
      </div>
    </div>
  );
}
