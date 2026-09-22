"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Doodle } from "@/components/desktop/Doodle";
import { HmcPanel } from "@/components/desktop/HmcPanel";
import { goTo } from "@/components/desktop/sections";
import { holdMyCode, profile } from "@/lib/data";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, ease, delay },
        };

  return (
    <section
      ref={sectionRef}
      id="top"
      aria-labelledby="hero-title"
      className="relative flex flex-col px-4 pt-[calc(env(safe-area-inset-top)+6.5rem)] pb-10 md:min-h-[100svh] md:pb-32 sm:px-8 lg:pt-[calc(env(safe-area-inset-top)+6rem)]"
    >
      <div className="mx-auto w-full max-w-[1180px] lg:flex lg:flex-1 lg:flex-col">
      <div className="max-w-[46rem] lg:flex lg:max-w-[min(46rem,calc(100vw-30rem))] lg:flex-1 lg:flex-col lg:pt-[3vh]">
        <motion.h1
          id="hero-title"
          {...rise(0.05)}
          className="text-[clamp(3.4rem,10vw,7.5rem)] leading-[0.92] font-bold tracking-[-0.035em] text-white"
        >
          {profile.name}
        </motion.h1>

        <motion.p
          {...rise(0.14)}
          className="mt-5 text-[clamp(1.75rem,3.6vw,2.9rem)] lg:mt-7 leading-[1.08] font-semibold tracking-[-0.025em] text-balance text-white/85"
        >
          Business analyst who ships software.
        </motion.p>

        {/* On desktop the copy sits low, leaving the middle open for the doodle arrow */}
        <div className="lg:mt-auto lg:pt-[18vh]">
        <motion.p
          {...rise(0.22)}
          className="mt-6 max-w-[34rem] text-[clamp(1.02rem,1.5vw,1.2rem)] lg:mt-0 leading-[1.55] text-pretty text-white/70"
        >
          I scope a problem the way an analyst does, then build the fix myself.
          The latest is{" "}
          <span ref={wordRef} className="font-medium text-white">
            {holdMyCode.name}
          </span>
          , a macOS app that keeps a Mac awake
          while coding agents work, even with the lid closed.
        </motion.p>

        <motion.div {...rise(0.3)} className="mt-8 flex flex-wrap items-center gap-3 lg:mt-11">
          <a
            href="#hold-my-code"
            onClick={(e) => {
              e.preventDefault();
              goTo("hold-my-code");
            }}
            className="btn btn-default !min-h-11 !px-5 !text-[15px]"
          >
            See Hold My Code
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              goTo("contact");
            }}
            className="btn !min-h-11 bg-white/12 !px-5 !text-[15px] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.22)] hover:bg-white/20"
          >
            Email me
          </a>
        </motion.div>
        </div>
      </div>

      {/* The panel hangs from its menu bar icon, top right, like the real app */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: -10, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease, delay: 0.5 }}
        style={{ transformOrigin: "top right" }}
        className="mt-12 hidden self-center md:block lg:absolute lg:top-[calc(env(safe-area-inset-top)+2.85rem)] lg:right-[4.9rem] lg:mt-0"
      >
        <div ref={panelRef}>
          <HmcPanel />
        </div>
        <p className="vibrant mt-3 max-w-[19.5rem] rounded-[10px] px-3 py-2 text-[12.5px] leading-snug text-ink-2">
          {holdMyCode.name} running in the menu bar. The panel is live; the
          values are a demo.
        </p>
      </motion.div>

      <motion.dl
          {...rise(0.36)}
          className="mx-auto mt-10 hidden w-full md:grid max-w-[1180px] grid-cols-[auto_1fr] gap-x-5 gap-y-1.5 text-[14px] lg:mt-12 lg:grid-cols-[auto_auto_auto_auto_auto_1fr] lg:gap-x-2.5 lg:border-t lg:border-white/15 lg:pt-5"
        >
          <dt className="text-white/55">Based in</dt>
          <dd className="text-white/90 lg:mr-10">{profile.location}</dd>
          <dt className="text-white/55">Studying</dt>
          <dd className="text-white/90 lg:mr-10">Master&rsquo;s in Business Analytics, Maynooth University</dd>
          <dt className="text-white/55">Available</dt>
          <dd className="text-white/90 lg:mr-10">From {profile.availableFrom}, for business analyst roles</dd>
        </motion.dl>
      </div>
      <Doodle container={sectionRef} from={wordRef} to={panelRef} />
    </section>
  );
}
