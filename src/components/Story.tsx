"use client";

import { motion } from "framer-motion";
import { profile, experience, impactStats } from "@/lib/data";
import { NumberTicker } from "@/components/ui/number-ticker";
import { DoodleNote } from "@/components/Doodles";

export function Story() {
  return (
    <section id="story" className="relative py-16 md:py-24">
      <div className="border-y border-line bg-panel/50 py-4 mb-12 overflow-hidden">
        <div className="flex w-max animate-marquee gap-8 pr-8">
          {[...experience, ...experience, ...experience, ...experience].map(
            (item, i) => (
              <div key={`${item.label}-${i}`} className="flex items-center gap-8">
                <span className="font-display text-xl md:text-2xl text-ink whitespace-nowrap tracking-tight">
                  {item.label}
                </span>
                <span className="text-accent text-sm">●</span>
              </div>
            )
          )}
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-5 md:px-6 relative">
        <div className="relative max-w-xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent mb-3">
            About
          </p>
          <h2 className="font-display text-[clamp(1.85rem,4vw,2.75rem)] leading-[1.1] tracking-tight text-ink">
            I make the business case clear.
          </h2>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          <div className="lg:col-span-7 min-w-0">
            <p className="text-[15px] md:text-base text-ink-soft leading-relaxed">
              {profile.story}
            </p>
            <p className="mt-4 text-sm md:text-[15px] text-ink-soft/90 leading-relaxed">
              {profile.intro}
            </p>
          </div>

          <div className="relative lg:col-span-5 min-w-0 lg:pt-28">
            <DoodleNote
              label="the receipts"
              direction="down"
              size="lg"
              rotate={4}
              className="absolute left-1 top-0 z-10 hidden lg:flex"
            />
            <div className="grid grid-cols-2 gap-3 content-start">
              {impactStats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="surface p-4 min-w-0 overflow-hidden"
                >
                  <div className="font-display text-2xl md:text-[1.75rem] text-ink tracking-tight tabular-nums truncate">
                    <NumberTicker
                      value={stat.value}
                      decimalPlaces={stat.decimals}
                      delay={0.05 * i}
                      className="text-ink"
                    />
                    <span className="text-accent">{stat.suffix}</span>
                  </div>
                  <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.08em] text-muted leading-snug">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
