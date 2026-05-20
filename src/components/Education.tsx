"use client";

import { motion } from "framer-motion";
import { education } from "@/lib/data";
import { SectionParallaxOrbs } from "@/components/BackgroundLayer";
import { ParallaxDepth } from "@/components/Parallax";

const easeOut = [0.2, 0.8, 0.2, 1] as const;

export function Education() {
  return (
    <section id="education" className="relative py-24 md:py-36 overflow-hidden">
      <SectionParallaxOrbs />

      <div className="relative mx-auto max-w-6xl px-6">
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
                Education
              </span>
            </div>
            <ParallaxDepth depth="foreground" stagger={10}>
              <h2 className="font-display text-[clamp(2rem,5vw,4.25rem)] leading-[0.95] text-white max-w-5xl">
                Two countries,{" "}
                <span className="italic text-sky-300/90 whitespace-nowrap">
                  one continuous&nbsp;curriculum.
                </span>
              </h2>
            </ParallaxDepth>
          </motion.div>
        </ParallaxDepth>

        <div className="mt-14 md:mt-20 relative">
          <ParallaxDepth depth="background" className="absolute left-3 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px">
            <div className="h-full w-full bg-gradient-to-b from-transparent via-neutral-700 to-transparent" />
          </ParallaxDepth>

          <div className="space-y-12 md:space-y-20">
            {education.map((e, i) => (
              <ParallaxDepth
                key={e.degree}
                depth={i % 2 === 0 ? "medium" : "fast"}
                stagger={i * 12}
              >
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.8, ease: easeOut, delay: i * 0.08 }}
                  className={`relative grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16 items-center ${
                    i % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""
                  }`}
                >
                  <div className="absolute left-3 md:left-1/2 md:-translate-x-1/2 top-1 h-3 w-3 rounded-full bg-sky-300 ring-4 ring-sky-300/15" />

                  <div className="pl-10 md:pl-0 md:pr-10">
                    <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-neutral-400 mb-3 flex items-center gap-2">
                      {e.status === "current" && (
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      )}
                      {e.period}
                    </div>
                    <h3 className="font-display text-3xl md:text-4xl text-white leading-tight">
                      {e.degree}
                    </h3>
                  </div>

                  <div className="pl-10 md:pl-10">
                    <div className="glass rounded-2xl p-6">
                      <div className="text-neutral-200 font-medium">
                        {e.school}
                      </div>
                      <div className="mt-1 text-sm text-neutral-400">
                        {e.location}
                      </div>
                      <div className="mt-4 flex items-center gap-2">
                        <span
                          className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-mono tracking-[0.18em] uppercase ${
                            e.status === "current"
                              ? "bg-emerald-400/15 text-emerald-300 border border-emerald-400/20"
                              : "bg-white/5 text-neutral-400 border border-white/10"
                          }`}
                        >
                          {e.status === "current" ? "Ongoing" : "Completed"}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </ParallaxDepth>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
