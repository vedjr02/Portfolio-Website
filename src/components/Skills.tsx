"use client";

import { motion } from "framer-motion";
import { skills } from "@/lib/data";
import { SectionParallaxOrbs } from "@/components/BackgroundLayer";
import { ParallaxDepth } from "@/components/Parallax";
import CurvedLoop from "@/components/CurvedLoop";

const easeOut = [0.2, 0.8, 0.2, 1] as const;
const SEP = " ✦ ";
const VB_H = 100;
const BASELINE = 50;

function toMarquee(items: string[]) {
  return items.join(SEP) + SEP;
}

const WAVES = [
  {
    label: "Stack",
    text: toMarquee(skills.technical),
    curveAmount: 36,
    direction: "left" as const,
    speed: 1.5,
    startPhase: 0,
    className: "curved-loop-skills curved-loop-skills--wave-top",
    interactive: true,
  },
  {
    label: "Build",
    text: toMarquee(skills.frameworks),
    curveAmount: -36,
    direction: "right" as const,
    speed: 1.7,
    startPhase: 0.25,
    className: "curved-loop-skills curved-loop-skills--wave-mid",
    interactive: true,
  },
  {
    label: "Practice",
    text: toMarquee(skills.competencies),
    curveAmount: 36,
    direction: "left" as const,
    speed: 1.4,
    startPhase: 0.5,
    className: "curved-loop-skills curved-loop-skills--wave-bottom",
    interactive: true,
  },
];

export function Skills() {
  return (
    <section id="skills" className="relative py-24 md:py-36 overflow-hidden">
      <SectionParallaxOrbs />

      <div className="relative mx-auto max-w-6xl px-6 mb-10 md:mb-14">
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

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1, ease: easeOut }}
        className="relative w-full"
      >
        <div className="skills-wave-stack mx-auto w-full max-w-[100vw]">
          {WAVES.map((wave, i) => (
            <div key={wave.label} className="skills-wave-row">
              <div className="mx-auto max-w-6xl px-6 flex items-center gap-3 mb-1 md:mb-2">
                <span className="font-mono text-[10px] md:text-[11px] tracking-[0.22em] uppercase text-neutral-500">
                  0{i + 1} · {wave.label}
                </span>
                <span className="h-px flex-1 bg-white/[0.06]" />
              </div>
              <CurvedLoop
                marqueeText={wave.text}
                speed={wave.speed}
                baselineY={BASELINE}
                curveAmount={wave.curveAmount}
                viewBoxHeight={VB_H}
                startPhase={wave.startPhase}
                direction={wave.direction}
                interactive={wave.interactive}
                className={wave.className}
                containerClassName="curved-loop-jacket--row"
              />
            </div>
          ))}
        </div>

        <p className="mt-8 text-center font-mono text-[11px] tracking-[0.2em] uppercase text-neutral-600 px-6">
          Drag any wave to explore · {skills.technical.length + skills.frameworks.length + skills.competencies.length} tools
        </p>
      </motion.div>
    </section>
  );
}
