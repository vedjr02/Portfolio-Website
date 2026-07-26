"use client";

import { motion } from "framer-motion";
import { education } from "@/lib/data";
import { BlurFade } from "@/components/ui/blur-fade";

const easeOut = [0.2, 0.8, 0.2, 1] as const;

export function Education() {
  return (
    <section id="education" className="relative py-24 md:py-32 overflow-hidden">
      <div className="relative mx-auto max-w-6xl px-6">
        <BlurFade inView direction="up">
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-8 bg-ink/20" />
            <span className="font-mono text-[12px] tracking-[0.22em] uppercase text-muted">
              Education
            </span>
          </div>
          <h2 className="font-display text-[clamp(2.2rem,5vw,4.25rem)] leading-[0.95] text-ink max-w-4xl tracking-tight">
            Two countries,{" "}
            <span className="text-accent">one curriculum.</span>
          </h2>
        </BlurFade>

        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-5">
          {education.map((e, i) => (
            <motion.div
              key={e.degree}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: easeOut, delay: i * 0.08 }}
              className="neu neu-hover rounded-[24px] p-6 md:p-7 flex flex-col min-h-[240px]"
            >
              <div className="flex items-center gap-2 mb-6">
                {e.status === "current" && (
                  <span className="h-1.5 w-1.5 rounded-full bg-accent animate-soft-pulse" />
                )}
                <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-muted">
                  {e.period}
                </span>
              </div>

              <h3 className="font-display text-2xl md:text-[1.65rem] leading-tight tracking-tight text-ink">
                {e.degree}
              </h3>
              <p className="mt-3 text-sm text-ink-soft leading-relaxed">
                {e.school}
              </p>
              <p className="mt-1 text-sm text-muted">{e.location}</p>

              <div className="mt-auto pt-6">
                <span className="neu-inset inline-flex rounded-full px-3 py-1 text-[11px] font-mono tracking-[0.16em] uppercase text-ink-soft">
                  {e.status === "current" ? "Ongoing" : "Completed"}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
