"use client";

import { motion } from "framer-motion";
import { profile } from "@/lib/data";
import { SectionParallaxOrbs } from "@/components/BackgroundLayer";
import { ParallaxDepth } from "@/components/Parallax";

const easeOut = [0.2, 0.8, 0.2, 1] as const;

export function Footer() {
  return (
    <footer id="contact" className="relative pt-24 md:pt-36 pb-10 overflow-hidden">
      <SectionParallaxOrbs />

      <div className="relative mx-auto max-w-6xl px-6">
        <ParallaxDepth depth="slow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: easeOut }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 mb-8">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-soft-pulse" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              <span className="font-mono text-[12px] tracking-[0.18em] uppercase text-neutral-300">
                Open to opportunities
              </span>
            </div>

            <ParallaxDepth depth="foreground" stagger={14}>
              <h2 className="font-display text-[clamp(2.5rem,8vw,7rem)] leading-[0.9] text-white">
                Let&apos;s build something
                <br />
                <span className="italic text-sky-300/90">data-driven.</span>
              </h2>
            </ParallaxDepth>

            <p className="mt-8 max-w-xl mx-auto text-neutral-400 text-base md:text-lg">
              Have a question, a dataset, or a dashboard to scope? Tap the button
              below — replies usually land within 24 hours.
            </p>

            <a
              href={profile.socials.email}
              className="group inline-flex items-center gap-3 mt-10 rounded-full bg-white text-black px-6 py-3.5 text-base font-medium hover:bg-sky-300 transition-colors duration-300"
            >
              <span>{profile.email}</span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black/10 group-hover:bg-black/20 transition-colors">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M3 9L9 3M9 3H4M9 3V8"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </a>
          </motion.div>
        </ParallaxDepth>

        <ParallaxDepth depth="background" stagger={20}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.2, ease: easeOut }}
            className="mt-24 md:mt-36 select-none"
          >
            <div className="font-display leading-[0.85] text-center text-white text-[clamp(4.5rem,18vw,18rem)]">
              <ParallaxDepth depth="slow" className="inline-block">
                <span>Vedant</span>
              </ParallaxDepth>{" "}
              <ParallaxDepth depth="medium" stagger={16} className="inline-block">
                <span className="italic text-neutral-700">Ambre</span>
              </ParallaxDepth>
            </div>
          </motion.div>
        </ParallaxDepth>

        <ParallaxDepth depth="medium">
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-white/5">
            <div className="md:col-span-1">
              <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-neutral-500 mb-3">
                Insights
              </div>
              <ul className="space-y-1.5 text-neutral-300 text-sm">
                <li><a href="#work" className="hover:text-white transition-colors">Work</a></li>
                <li><a href="#story" className="hover:text-white transition-colors">Story</a></li>
                <li><a href="#skills" className="hover:text-white transition-colors">Process</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Connect</a></li>
              </ul>
            </div>

            <div className="md:col-span-1">
              <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-neutral-500 mb-3">
                Social
              </div>
              <ul className="space-y-1.5 text-neutral-300 text-sm">
                <li>
                  <a
                    href={profile.socials.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white transition-colors inline-flex items-center gap-2"
                  >
                    LinkedIn
                    <ArrowUpRight />
                  </a>
                </li>
                <li>
                  <a
                    href={profile.socials.github}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white transition-colors inline-flex items-center gap-2"
                  >
                    GitHub
                    <ArrowUpRight />
                  </a>
                </li>
                <li>
                  <a
                    href={profile.socials.email}
                    className="hover:text-white transition-colors inline-flex items-center gap-2"
                  >
                    Email
                    <ArrowUpRight />
                  </a>
                </li>
              </ul>
            </div>

            <div className="md:col-span-1">
              <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-neutral-500 mb-3">
                Now
              </div>
              <p className="text-neutral-300 text-sm leading-relaxed">
                Wrapping up my Master&apos;s in Maynooth and exploring what comes
                next. Open to{" "}
                <span className="text-white">
                  Business Analyst & Data Analyst
                </span>{" "}
                roles wherever the data is interesting.
              </p>
            </div>
          </div>
        </ParallaxDepth>

        <div className="mt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-neutral-500">
            © {new Date().getFullYear()} Vedant Ambre. Crafted with care.
          </p>
          <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-neutral-500">
            Built with love
          </p>
        </div>
      </div>
    </footer>
  );
}

function ArrowUpRight() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 12 12"
      fill="none"
      className="opacity-60"
    >
      <path
        d="M3 9L9 3M9 3H4M9 3V8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
