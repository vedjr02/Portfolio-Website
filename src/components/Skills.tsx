"use client";

import { motion } from "framer-motion";
import { skills } from "@/lib/data";
import { SectionParallaxOrbs } from "@/components/BackgroundLayer";
import { ParallaxDepth, ParallaxMarquee } from "@/components/Parallax";

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

const ROW_DEPTHS = ["slow", "medium", "fast"] as const;

export function Skills() {
  return (
    <section id="skills" className="relative py-24 md:py-36 overflow-hidden">
      <SectionParallaxOrbs />

      <div className="relative mx-auto max-w-6xl px-6 mb-14 md:mb-20">
        <ParallaxDepth depth="slow">
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
            <ParallaxDepth depth="foreground" stagger={8}>
              <h2 className="font-display text-[clamp(2.2rem,5.5vw,4.5rem)] leading-[0.95] text-white max-w-3xl">
                Every tool has a job;{" "}
                <span className="italic text-sky-300/90">
                  I match the tool to the question.
                </span>
              </h2>
            </ParallaxDepth>
          </motion.div>
        </ParallaxDepth>
      </div>

      <div className="relative space-y-5 md:space-y-7">
        {rows.map((row, idx) => (
          <SkillRow key={row.title} row={row} index={idx} />
        ))}
      </div>
    </section>
  );
}

function SkillRow({ row, index }: { row: Row; index: number }) {
  const items = [...row.items, ...row.items];
  const animClass =
    row.direction === "left" ? "animate-marquee-slow" : "animate-marquee-reverse";
  const depth = ROW_DEPTHS[index % ROW_DEPTHS.length];

  return (
    <ParallaxDepth depth={depth} stagger={index * 10}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: easeOut, delay: index * 0.06 }}
        className="relative"
      >
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

        <ParallaxMarquee direction={row.direction === "left" ? 1 : -1} speed={60 + index * 15}>
          <div className="relative overflow-hidden">
            <div className={`flex w-max ${animClass} pause-on-hover gap-3`}>
              {items.map((item, i) => (
                <SkillPill key={`${item}-${i}`} label={item} />
              ))}
            </div>
          </div>
        </ParallaxMarquee>
      </motion.div>
    </ParallaxDepth>
  );
}

function SkillPill({ label }: { label: string }) {
  return (
    <div className="group shrink-0 flex items-center gap-4 px-1">
      <span className="font-display tracking-[0.01em] text-2xl md:text-4xl text-white/60 group-hover:text-white whitespace-nowrap transition-colors duration-500">
        {label}
      </span>
      <span className="text-sky-300/50 text-xl md:text-2xl select-none">✦</span>
    </div>
  );
}
