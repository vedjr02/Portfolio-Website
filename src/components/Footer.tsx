"use client";

import { motion } from "framer-motion";
import { profile } from "@/lib/data";

const easeOut = [0.2, 0.8, 0.2, 1] as const;

export function Footer() {
  return (
    <footer id="contact" className="relative pt-24 md:pt-32 pb-10 overflow-hidden">
      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: easeOut }}
          className="neu rounded-[32px] px-8 py-14 md:px-14 md:py-16 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full neu-inset px-3.5 py-1.5 mb-8">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-60 animate-soft-pulse" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            <span className="font-mono text-[12px] tracking-[0.18em] uppercase text-ink-soft">
              Open to BA / DA roles
            </span>
          </div>

          <h2 className="font-display text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.98] text-ink">
            Let&apos;s make the numbers
            <br />
            <span className="text-accent">make sense.</span>
          </h2>

          <p className="mt-7 max-w-xl mx-auto text-ink-soft text-base md:text-lg">
            Hiring for a Business Analyst or Data Analyst who ships case studies
            and stakeholder-ready dashboards? Reach out — replies usually within
            24 hours.
          </p>

          <a
            href={profile.socials.email}
            className="inline-flex items-center gap-3 mt-10 rounded-full bg-ink text-bg px-6 py-3.5 text-base font-semibold hover:bg-accent transition-colors shadow-[8px_8px_18px_#121417]"
          >
            <span>{profile.email}</span>
            <ArrowUpRight />
          </a>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-line">
          <div>
            <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-muted mb-3">
              Navigate
            </div>
            <ul className="space-y-1.5 text-ink-soft text-sm">
              <li>
                <a href="#work" className="hover:text-ink transition-colors">
                  Work
                </a>
              </li>
              <li>
                <a href="#story" className="hover:text-ink transition-colors">
                  Story
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-ink transition-colors">
                  Skills
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-ink transition-colors">
                  Connect
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-muted mb-3">
              Social
            </div>
            <ul className="space-y-1.5 text-ink-soft text-sm">
              <li>
                <a
                  href={profile.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-ink transition-colors inline-flex items-center gap-2"
                >
                  LinkedIn <ArrowUpRight />
                </a>
              </li>
              <li>
                <a
                  href={profile.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-ink transition-colors inline-flex items-center gap-2"
                >
                  GitHub <ArrowUpRight />
                </a>
              </li>
              <li>
                <a
                  href={profile.socials.email}
                  className="hover:text-ink transition-colors inline-flex items-center gap-2"
                >
                  Email <ArrowUpRight />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-muted mb-3">
              Now
            </div>
            <p className="text-ink-soft text-sm leading-relaxed">
              {profile.now}
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-muted">
            © {new Date().getFullYear()} Vedant Ambre
          </p>
          <p className="font-display text-[clamp(2.5rem,10vw,7rem)] leading-none text-ink/10 select-none">
            VA
          </p>
        </div>
      </div>
    </footer>
  );
}

function ArrowUpRight() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="opacity-70">
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
