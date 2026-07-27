"use client";

import { motion } from "framer-motion";
import { profile } from "@/lib/data";
import { useCommand } from "@/components/CommandProvider";
import { DoodleNote, DoodleUnderline } from "@/components/Doodles";

const easeOut = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const { toggle } = useCommand();

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] min-h-[100dvh] flex-col justify-start overflow-x-clip pt-24 pb-10 sm:justify-end sm:pt-28 sm:pb-16 md:pb-24"
    >
      <div className="relative mx-auto w-full max-w-6xl px-5 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeOut }}
          className="mb-6 flex flex-wrap items-center gap-2.5 sm:mb-8 sm:gap-3"
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

        <div className="relative isolate">
          {/* Wide soft name glow — low opacity, long falloff; kept inside clip */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-[-8%] top-[-20%] z-0 h-[140%] sm:inset-x-[-12%] sm:top-[-30%] sm:h-[160%]"
            style={{
              background: [
                "radial-gradient(ellipse 70% 55% at 32% 42%, rgba(246,241,232,0.07) 0%, rgba(246,241,232,0.035) 18%, rgba(246,241,232,0.015) 36%, transparent 62%)",
                "radial-gradient(ellipse 75% 60% at 58% 58%, rgba(61,155,255,0.11) 0%, rgba(61,155,255,0.055) 16%, rgba(61,155,255,0.025) 34%, rgba(61,155,255,0.01) 50%, transparent 72%)",
              ].join(", "),
            }}
          />

          <h1 className="relative z-[1] max-w-full font-display leading-[0.9] tracking-[-0.05em] sm:leading-[0.86]">
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: easeOut, delay: 0.05 }}
              className="block max-w-full break-words text-[clamp(2.85rem,13vw,11rem)] text-ink"
            >
              {profile.firstName}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: easeOut, delay: 0.16 }}
              className="inline-block max-w-full break-words text-[clamp(2.85rem,13vw,11rem)] text-accent pb-1 sm:pb-2"
            >
              {profile.lastName}
              <DoodleUnderline className="mt-1 h-2 w-[min(100%,14rem)] sm:h-2.5 sm:w-[min(100%,16rem)]" />
            </motion.span>
          </h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOut, delay: 0.28 }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-ink-soft sm:mt-8 sm:text-lg md:text-xl"
        >
          Business Analyst building sourced case studies, stakeholder
          dashboards, and KPI models that hold up in the room.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeOut, delay: 0.38 }}
          className="mt-8 grid grid-cols-1 items-end gap-5 border-t border-line pt-6 sm:mt-10 sm:gap-6 sm:pt-8 md:grid-cols-12 md:gap-8"
        >
          <div className="md:col-span-6">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-muted">
              {profile.title}
            </p>
            <p className="max-w-md text-sm leading-relaxed text-ink-soft">
              {profile.now}
            </p>
          </div>
          <div className="relative flex flex-wrap items-center justify-start gap-3 md:col-span-6 md:justify-end">
            <DoodleNote
              label="start here"
              direction="right"
              size="sm"
              rotate={-4}
              className="mr-1 hidden flex-col order-first lg:flex lg:order-none"
            />
            <a href="#showcase" className="btn-primary min-h-11">
              See the work
            </a>
            <button
              type="button"
              onClick={toggle}
              className="btn-secondary min-h-11"
            >
              Search projects
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
