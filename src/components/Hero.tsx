"use client";

import { motion } from "framer-motion";
import { profile } from "@/lib/data";
import { useCommand } from "@/components/CommandProvider";
import { DoodleNote, DoodleUnderline } from "@/components/Doodles";
import { HeroAtmosphere } from "@/components/BackgroundLayer";

const easeOut = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const { toggle } = useCommand();

  return (
    <section
      id="top"
      className="relative min-h-[100svh] flex flex-col justify-end pt-28 pb-16 md:pb-24"
    >
      <HeroAtmosphere />

      <div className="mx-auto w-full max-w-6xl px-5 md:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeOut }}
          className="flex flex-wrap items-center gap-3 mb-8"
        >
          <span className="pill pill-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-dot" />
            Open to BA roles
          </span>
          <span className="pill">{profile.location}</span>
        </motion.div>

        <DoodleNote
          label="that's me"
          direction="down-left"
          size="md"
          rotate={8}
          className="absolute right-4 top-16 z-10 hidden lg:flex flex-col md:right-8 md:top-20"
        />

        <h1 className="font-display leading-[0.86] tracking-[-0.05em]">
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: easeOut, delay: 0.05 }}
            className="block text-[clamp(4.2rem,15vw,11rem)] text-ink"
          >
            {profile.firstName}
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: easeOut, delay: 0.16 }}
            className="inline-block text-[clamp(4.2rem,15vw,11rem)] text-accent pb-2"
          >
            {profile.lastName}
            <DoodleUnderline className="mt-1 h-2.5 w-[min(100%,16rem)]" />
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOut, delay: 0.28 }}
          className="mt-8 max-w-2xl text-lg md:text-xl leading-relaxed text-ink-soft"
        >
          Business Analyst building sourced case studies, stakeholder
          dashboards, and KPI models that hold up in the room.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeOut, delay: 0.38 }}
          className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-end border-t border-line pt-8"
        >
          <div className="md:col-span-6">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted mb-2">
              {profile.title}
            </p>
            <p className="text-sm text-ink-soft leading-relaxed max-w-md">
              {profile.now}
            </p>
          </div>
          <div className="md:col-span-6 relative flex flex-wrap items-center justify-start md:justify-end gap-3">
            <DoodleNote
              label="start here"
              direction="right"
              size="sm"
              rotate={-4}
              className="hidden lg:flex flex-col order-first lg:order-none mr-1"
            />
            <a href="#showcase" className="btn-primary">
              See the work
            </a>
            <button type="button" onClick={toggle} className="btn-secondary">
              Search projects
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
