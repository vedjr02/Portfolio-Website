"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

const links = [
  { id: "work", label: "Work" },
  { id: "story", label: "Story" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 24);
  });

  return (
    <motion.header
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-6xl"
    >
      <nav
        className={`flex items-center justify-between rounded-full px-3 py-2.5 transition-all duration-500 ${
          scrolled
            ? "glass shadow-[0_8px_40px_-8px_rgba(0,0,0,0.5)]"
            : "bg-transparent border border-transparent"
        }`}
      >
        <a
          href="#top"
          className="flex items-center gap-2 pl-3 pr-2 group"
          aria-label="Vedant Ambre — home"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-soft-pulse" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-neutral-300 group-hover:text-white transition-colors">
            Vedant&nbsp;Ambre
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className="px-4 py-2 text-sm text-neutral-300 hover:text-white rounded-full hover:bg-white/5 transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="group relative overflow-hidden rounded-full bg-white text-black px-4 py-2 text-sm font-medium hover:bg-amber-200 transition-colors duration-300"
        >
          <span className="relative z-10 flex items-center gap-1.5">
            Get in touch
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            >
              <path
                d="M3 9L9 3M9 3H4M9 3V8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </a>
      </nav>
    </motion.header>
  );
}
