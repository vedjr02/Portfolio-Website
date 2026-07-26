"use client";

import { motion } from "framer-motion";
import { skills } from "@/lib/data";
import CurvedLoop from "@/components/CurvedLoop";
import { BlurFade } from "@/components/ui/blur-fade";

const easeOut = [0.2, 0.8, 0.2, 1] as const;
const SEP = " · ";
const VB_H = 48;
const BASELINE = 34;

function toMarquee(items: string[]) {
  return items.join(SEP) + SEP;
}

const WAVES = [
  {
    label: "Stack",
    text: toMarquee(skills.technical),
    curveAmount: 0,
    direction: "left" as const,
    speed: 1.1,
    startPhase: 0,
    className: "curved-loop-skills curved-loop-skills--wave-top",
    interactive: true,
  },
  {
    label: "Build",
    text: toMarquee(skills.frameworks),
    curveAmount: 0,
    direction: "right" as const,
    speed: 1.2,
    startPhase: 0.25,
    className: "curved-loop-skills curved-loop-skills--wave-mid",
    interactive: true,
  },
  {
    label: "Practice",
    text: toMarquee(skills.competencies),
    curveAmount: 0,
    direction: "left" as const,
    speed: 1,
    startPhase: 0.5,
    className: "curved-loop-skills curved-loop-skills--wave-bottom",
    interactive: true,
  },
];

export function Skills() {
  return (
    <section id="skills" className="relative py-24 md:py-32 overflow-hidden">
      <div className="relative mx-auto max-w-6xl px-6 mb-8">
        <BlurFade inView direction="up">
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-8 bg-ink/20" />
            <span className="font-mono text-[12px] tracking-[0.22em] uppercase text-muted">
              The Toolkit
            </span>
          </div>
          <h2 className="font-display text-[clamp(2.4rem,5.5vw,4.5rem)] leading-[1.02] text-ink max-w-3xl">
            Tools matched to the{" "}
            <span className="text-accent">question.</span>
          </h2>
        </BlurFade>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1, ease: easeOut }}
        className="relative w-full"
      >
        <div className="neu mx-4 md:mx-8 rounded-[28px] py-8 md:py-10">
          <div className="skills-wave-stack mx-auto w-full max-w-[100vw]">
            {WAVES.map((wave, i) => (
              <div key={wave.label} className="skills-wave-row">
                <div className="mx-auto max-w-6xl px-6 flex items-center gap-3 mb-0.5">
                  <span className="font-mono text-[10px] md:text-[11px] tracking-[0.22em] uppercase text-muted">
                    0{i + 1} · {wave.label}
                  </span>
                  <span className="h-px flex-1 bg-ink/10" />
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
        </div>

        <p className="mt-5 text-center font-mono text-[10px] tracking-[0.18em] uppercase text-muted px-6">
          Drag a line ·{" "}
          {skills.technical.length +
            skills.frameworks.length +
            skills.competencies.length}{" "}
          tools
        </p>
      </motion.div>
    </section>
  );
}
