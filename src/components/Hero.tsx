"use client";

import { motion } from "framer-motion";
import { profile } from "@/lib/data";

const easeOut = [0.2, 0.8, 0.2, 1] as const;

export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden pt-32 pb-12 md:pb-16"
    >

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
        {/* Status pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOut, delay: 0.1 }}
          className="inline-flex items-center gap-2.5 rounded-full glass px-3.5 py-1.5 mb-8"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-soft-pulse" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>
          <span className="font-mono text-[12px] tracking-[0.16em] uppercase text-neutral-300">
            {profile.tagline}
          </span>
        </motion.div>

        {/* Intro paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: easeOut, delay: 0.2 }}
          className="max-w-2xl text-balance text-base sm:text-lg md:text-xl text-neutral-300 leading-relaxed mb-10 md:mb-14"
        >
          Howdy! Meet your trusted analytics partner,{" "}
          <span className="text-white">turning ambiguous data into</span>{" "}
          <span className="italic font-display text-sky-300/90">
            confident business decisions.
          </span>
        </motion.p>

        {/* Giant name */}
        <div className="relative">
          <h1 className="font-display leading-[0.85] tracking-tight">
            <motion.span
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: easeOut, delay: 0.3 }}
              className="block text-[clamp(4.5rem,16vw,15rem)] text-white"
            >
              {profile.firstName}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: easeOut, delay: 0.45 }}
              className="block text-[clamp(4.5rem,16vw,15rem)] text-white italic"
            >
              {profile.lastName}
            </motion.span>
          </h1>
        </div>

        {/* Bottom row: title + scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: easeOut, delay: 0.7 }}
          className="mt-8 md:mt-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="h-px w-10 bg-neutral-600" />
            <p className="font-mono text-[12px] tracking-[0.2em] uppercase text-neutral-400">
              {profile.title} <span className="text-neutral-600">/</span>{" "}
              {profile.altTitle}
            </p>
          </div>

          <a
            href="#work"
            className="group flex items-center gap-3 text-neutral-400 hover:text-white transition-colors"
          >
            <span className="font-mono text-[12px] tracking-[0.2em] uppercase">
              Scroll to explore
            </span>
            <span className="relative flex h-8 w-5 items-start justify-center rounded-full border border-neutral-600 group-hover:border-white transition-colors">
              <motion.span
                animate={{ y: [2, 12, 2], opacity: [1, 0.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="mt-1.5 block h-1.5 w-0.5 rounded-full bg-current"
              />
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
