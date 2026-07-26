"use client";

import { motion } from "framer-motion";
import { profile, experience, impactStats } from "@/lib/data";
import { NumberTicker } from "@/components/ui/number-ticker";
import { BlurFade } from "@/components/ui/blur-fade";

const easeOut = [0.2, 0.8, 0.2, 1] as const;

export function Story() {
  return (
    <section id="story" className="relative py-24 md:py-32 overflow-hidden">
      <div className="relative w-full overflow-hidden py-6 md:py-8">
        <div className="neu-inset mx-4 md:mx-8 rounded-full py-5 overflow-hidden">
          <div className="flex w-max animate-marquee gap-10 md:gap-14 pr-10">
            {[...experience, ...experience, ...experience, ...experience].map(
              (item, i) => (
                <div
                  key={`${item.label}-${i}`}
                  className="flex items-center gap-10 md:gap-14 shrink-0"
                >
                  <span className="font-display text-2xl md:text-4xl text-ink whitespace-nowrap tracking-tight">
                    {item.label}
                  </span>
                  <span className="h-2 w-2 rounded-full bg-accent/50" />
                </div>
              )
            )}
          </div>
        </div>
      </div>

      <div className="relative mx-auto max-w-6xl px-6 mt-16 md:mt-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-5">
            <BlurFade inView direction="up">
              <div className="flex items-center gap-3 mb-5">
                <span className="h-px w-8 bg-ink/20" />
                <span className="font-mono text-[12px] tracking-[0.22em] uppercase text-muted">
                  The Story
                </span>
              </div>
              <h2 className="font-display text-[clamp(2.4rem,5.5vw,4.5rem)] leading-[0.95] text-ink tracking-tight">
                Evidence first.{" "}
                <span className="text-accent">Slides second.</span>
              </h2>
            </BlurFade>
          </div>

          <div className="md:col-span-7 md:pt-2">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: easeOut, delay: 0.1 }}
            >
              <p className="text-lg md:text-xl text-ink-soft leading-relaxed">
                {profile.story}
              </p>
              <p className="mt-6 text-muted leading-relaxed">
                {profile.intro}
              </p>

              <div className="mt-10 grid grid-cols-2 gap-4">
                {impactStats.map((stat, index) => (
                  <BlurFade key={stat.label} inView delay={0.08 * index} direction="up">
                    <div className="neu rounded-[22px] p-5 h-full">
                      <div className="font-display text-3xl md:text-4xl text-ink tracking-tight">
                        <NumberTicker
                          value={stat.value}
                          decimalPlaces={stat.decimals}
                          delay={0.1 * index}
                          className="text-ink"
                        />
                        {stat.suffix}
                      </div>
                      <div className="mt-1.5 font-mono text-[11px] tracking-[0.14em] uppercase text-muted">
                        {stat.label}
                      </div>
                    </div>
                  </BlurFade>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
