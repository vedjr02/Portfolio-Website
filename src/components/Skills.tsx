"use client";

import { motion } from "framer-motion";
import { skills } from "@/lib/data";

const easeOut = [0.2, 0.8, 0.2, 1] as const;

export function Skills() {
  const groups: { title: string; items: string[]; eyebrow: string }[] = [
    {
      eyebrow: "01",
      title: "Technical Stack",
      items: skills.technical,
    },
    {
      eyebrow: "02",
      title: "Tech & Frameworks",
      items: skills.frameworks,
    },
    {
      eyebrow: "03",
      title: "Core Competencies",
      items: skills.competencies,
    },
  ];

  return (
    <section id="skills" className="relative py-24 md:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: easeOut }}
          className="flex items-end justify-between flex-wrap gap-6 mb-14 md:mb-20"
        >
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-neutral-700" />
              <span className="font-mono text-[12px] tracking-[0.22em] uppercase text-neutral-400">
                The Toolkit
              </span>
            </div>
            <h2 className="font-display text-[clamp(2.2rem,5.5vw,4.5rem)] leading-[0.95] text-white max-w-2xl">
              Every tool has a job;{" "}
              <span className="italic text-sky-300/90">
                I match the tool to the question.
              </span>
            </h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {groups.map((g, gi) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease: easeOut, delay: gi * 0.08 }}
              className="glass glass-hover rounded-3xl p-7 md:p-8"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-neutral-500">
                  {g.eyebrow}
                </span>
                <span className="h-px w-12 bg-neutral-700" />
              </div>
              <h3 className="font-display text-2xl md:text-3xl text-white mb-6">
                {g.title}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {g.items.map((it, i) => (
                  <motion.li
                    key={it}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      ease: easeOut,
                      delay: gi * 0.08 + i * 0.03,
                    }}
                    className="rounded-full border border-white/10 bg-white/[0.025] px-3 py-1.5 text-sm text-neutral-200 hover:bg-white/10 hover:border-white/20 transition-colors"
                  >
                    {it}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
