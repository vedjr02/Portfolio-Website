"use client";

import { motion } from "framer-motion";
import { projects, type Project } from "@/lib/data";
import { SectionParallaxOrbs } from "@/components/BackgroundLayer";
import { ParallaxCard, ParallaxDepth } from "@/components/Parallax";

const easeOut = [0.2, 0.8, 0.2, 1] as const;

export function Work() {
  return (
    <section id="work" className="relative py-24 md:py-36 overflow-hidden">
      <SectionParallaxOrbs />

      <div className="relative mx-auto max-w-6xl px-6">
        <ParallaxDepth depth="slow">
          <SectionHeader
            eyebrow="Selected Work"
            title="Things I've shipped"
            subtitle="A handful of projects where data, design and decision-making intersect."
          />
        </ParallaxDepth>

        <div className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>

        <ParallaxDepth depth="medium" stagger={10}>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: easeOut }}
            className="mt-16 text-center text-neutral-400"
          >
            More case studies coming soon,{" "}
            <span className="font-display italic text-sky-300/90">
              steadily but surely.
            </span>
          </motion.p>
        </ParallaxDepth>
      </div>
    </section>
  );
}

function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="flex flex-col gap-5">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: easeOut }}
        className="flex items-center gap-3"
      >
        <span className="h-px w-8 bg-neutral-700" />
        <span className="font-mono text-[12px] tracking-[0.22em] uppercase text-neutral-400">
          {eyebrow}
        </span>
      </motion.div>
      <ParallaxDepth depth="foreground" stagger={8}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: easeOut, delay: 0.05 }}
          className="font-display text-[clamp(2.5rem,6.5vw,5.5rem)] leading-[0.95] text-white"
        >
          {title.split(" ").map((w, idx) =>
            idx === title.split(" ").length - 1 ? (
              <span key={idx} className="italic text-neutral-300">
                {" "}
                {w}
              </span>
            ) : idx === 0 ? (
              <span key={idx}>{w}</span>
            ) : (
              <span key={idx}> {w}</span>
            )
          )}
        </motion.h2>
      </ParallaxDepth>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: easeOut, delay: 0.1 }}
          className="max-w-xl text-neutral-400 text-base md:text-lg"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const layouts = [
    "md:col-span-7",
    "md:col-span-5",
    "md:col-span-5",
    "md:col-span-7",
  ];
  const span = layouts[index % layouts.length];

  return (
    <ParallaxCard
      index={index}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, ease: easeOut, delay: (index % 2) * 0.08 }}
      className={`group relative ${span} glass glass-hover rounded-[28px] overflow-hidden bg-neutral-950/70 backdrop-blur-2xl`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-30 group-hover:opacity-50 transition-opacity duration-700`}
      />
      <ParallaxDepth depth="foreground" stagger={index * 6} className="absolute -top-2 -right-3 select-none pointer-events-none">
        <span className="font-display text-[10rem] md:text-[14rem] leading-none text-white/[0.04]">
          0{index + 1}
        </span>
      </ParallaxDepth>

      <div className="relative p-7 md:p-10 flex flex-col h-full min-h-[420px] md:min-h-[520px]">
        <div className="flex items-center justify-between mb-auto">
          <div className="flex items-center gap-2">
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                project.status === "In Progress"
                  ? "bg-sky-300"
                  : "bg-emerald-400"
              }`}
            />
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-neutral-300">
              {project.status}
            </span>
          </div>
          <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-neutral-400">
            {project.period}
          </span>
        </div>

        <div className="mt-12 md:mt-16">
          <p className="font-mono text-[12px] tracking-[0.18em] uppercase text-neutral-400 mb-3">
            {project.category}
          </p>
          <h3 className="font-display text-3xl md:text-4xl text-white leading-[1.05] tracking-tight">
            {project.title}
          </h3>
          <p className="mt-4 text-neutral-300/90 text-sm md:text-[15px] leading-relaxed max-w-prose">
            {project.description}
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-1.5">
          {project.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[12px] text-neutral-300"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="absolute top-6 right-6 md:top-7 md:right-7 h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 group-hover:bg-white group-hover:text-black transition-all duration-500">
        <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
          <path
            d="M3 9L9 3M9 3H4M9 3V8"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </ParallaxCard>
  );
}
