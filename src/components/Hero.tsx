"use client";

import { motion } from "framer-motion";
import { profile } from "@/lib/data";
import { ParallaxLayer, useHeroParallax } from "@/components/Parallax";
import { BlurFade } from "@/components/ui/blur-fade";
import { useCommand } from "@/components/CommandProvider";
import { Magnetic } from "@/components/Magnetic";
import { Ripple } from "@/components/ui/ripple";

const easeOut = [0.2, 0.8, 0.2, 1] as const;

export function Hero() {
  const { toggle } = useCommand();
  const {
    ref,
    disabled,
    pillStyle,
    introStyle,
    firstNameStyle,
    lastNameStyle,
    metaStyle,
  } = useHeroParallax();

  return (
    <section
      ref={ref}
      id="top"
      className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden pt-28 pb-24 md:pb-28"
    >
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-50">
        <Ripple mainCircleSize={280} numCircles={6} className="opacity-80" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
        <ParallaxLayer className="inline-block mb-8" style={disabled ? {} : pillStyle}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeOut, delay: 0.1 }}
            className="inline-flex items-center gap-2.5 rounded-full neu-sm px-4 py-2"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-60 animate-soft-pulse" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            <span className="font-mono text-[12px] tracking-[0.16em] uppercase text-ink-soft">
              {profile.tagline}
            </span>
          </motion.div>
        </ParallaxLayer>

        <ParallaxLayer style={disabled ? {} : introStyle}>
          <BlurFade delay={0.15} offset={16} direction="up">
            <p className="max-w-2xl text-balance text-base sm:text-lg md:text-xl text-ink-soft leading-relaxed mb-10 md:mb-14">
              Business Analyst who turns ambiguous data into{" "}
              <span className="text-ink font-semibold">
                decisions teams can ship on.
              </span>
            </p>
          </BlurFade>
        </ParallaxLayer>

        <div className="relative">
          <h1 className="font-display leading-[0.9]">
            <ParallaxLayer style={disabled ? {} : firstNameStyle} className="block">
              <motion.span
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1, ease: easeOut, delay: 0.3 }}
                className="block text-[clamp(4.25rem,15vw,13.5rem)] text-ink"
              >
                {profile.firstName}
              </motion.span>
            </ParallaxLayer>
            <ParallaxLayer style={disabled ? {} : lastNameStyle} className="block">
              <motion.span
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1, ease: easeOut, delay: 0.45 }}
                className="block text-[clamp(4.25rem,15vw,13.5rem)] text-accent"
              >
                {profile.lastName}
              </motion.span>
            </ParallaxLayer>
          </h1>
        </div>

        <ParallaxLayer style={disabled ? {} : metaStyle}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: easeOut, delay: 0.7 }}
            className="mt-8 md:mt-12 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8"
          >
            <div className="max-w-md">
              <p className="font-mono text-[12px] tracking-[0.2em] uppercase text-muted mb-3">
                {profile.title} / {profile.altTitle}
              </p>
              <p className="text-sm text-ink-soft leading-relaxed">{profile.now}</p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Magnetic>
                <a
                  href="#showcase"
                  className="neu-btn rounded-full px-5 py-3 text-sm font-semibold text-ink"
                >
                  Enter showcase
                </a>
              </Magnetic>
              <Magnetic strength={0.22}>
                <button
                  type="button"
                  onClick={toggle}
                  className="neu-inset rounded-full px-5 py-3 text-sm font-medium text-ink-soft hover:text-ink transition-colors"
                >
                  <span className="inline-flex items-center gap-2">
                    Command
                    <kbd className="rounded-md border border-line px-1.5 py-0.5 font-mono text-[10px] tracking-[0.12em]">
                      ⌘K
                    </kbd>
                  </span>
                </button>
              </Magnetic>
            </div>
          </motion.div>
        </ParallaxLayer>
      </div>
    </section>
  );
}
