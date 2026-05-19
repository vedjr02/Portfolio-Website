"use client";

import { motion } from "framer-motion";
import { profile, experience } from "@/lib/data";

const easeOut = [0.2, 0.8, 0.2, 1] as const;

export function Story() {
  return (
    <section id="story" className="relative py-24 md:py-36 overflow-hidden">
      {/* Marquee — companies / institutions */}
      <Marquee items={experience.map((e) => e.label)} />

      <div className="mx-auto max-w-6xl px-6 mt-20 md:mt-28">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: easeOut }}
            className="md:col-span-5"
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-neutral-700" />
              <span className="font-mono text-[12px] tracking-[0.22em] uppercase text-neutral-400">
                The Story
              </span>
            </div>
            <h2 className="font-display text-[clamp(2.2rem,5.5vw,4.5rem)] leading-[0.95] text-white">
              I don&apos;t have dark secrets,{" "}
              <span className="italic text-sky-300/90">
                only bright spreadsheets.
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: easeOut, delay: 0.1 }}
            className="md:col-span-7 md:pt-6"
          >
            <p className="text-lg md:text-xl text-neutral-300 leading-relaxed">
              {profile.story}
            </p>

            <p className="mt-6 text-neutral-400 leading-relaxed">
              {profile.intro}
            </p>

            <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-6">
              <Stat value="15K+" label="Thermal images processed" />
              <Stat value="88%" label="Diagnostic accuracy" />
              <Stat value="90%" label="Manual workflow automated" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="glass rounded-2xl p-5">
      <div className="font-display text-3xl md:text-4xl text-white">
        {value}
      </div>
      <div className="mt-1.5 font-mono text-[11px] tracking-[0.15em] uppercase text-neutral-400">
        {label}
      </div>
    </div>
  );
}

function Marquee({ items }: { items: string[] }) {
  // Duplicate the list so the marquee can loop seamlessly
  const list = [...items, ...items, ...items, ...items];
  return (
    <div className="relative w-full overflow-hidden border-y border-white/5 py-6 md:py-8">
      <div className="flex w-max animate-marquee gap-12 md:gap-16 pr-12">
        {list.map((label, i) => (
          <div
            key={`${label}-${i}`}
            className="flex items-center gap-12 md:gap-16 shrink-0"
          >
            <span className="font-display text-3xl md:text-5xl text-neutral-200 whitespace-nowrap">
              {label}
            </span>
            <span className="h-2 w-2 rounded-full bg-sky-300/60" />
          </div>
        ))}
      </div>
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 md:w-40 bg-gradient-to-r from-[#0a0a0a] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 md:w-40 bg-gradient-to-l from-[#0a0a0a] to-transparent" />
    </div>
  );
}
