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
      className="fixed top-4 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-2xl"
    >
      <nav
        className={`flex items-center justify-between rounded-full pl-3 pr-1.5 py-1.5 transition-all duration-500 ${
          scrolled
            ? "glass shadow-[0_8px_40px_-8px_rgba(0,0,0,0.5)]"
            : "glass shadow-[0_4px_20px_-8px_rgba(0,0,0,0.4)]"
        }`}
      >
        <a
          href="#top"
          className="flex items-center gap-2 px-2 group"
          aria-label="Vedant Ambre — home"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-soft-pulse" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>
          <span className="font-mono text-[11px] tracking-[0.16em] uppercase text-neutral-200 group-hover:text-white transition-colors">
            Vedant
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-0.5">
          {links.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className="px-3 py-1.5 text-[13px] text-neutral-300 hover:text-white rounded-full hover:bg-white/5 transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="group relative overflow-hidden rounded-full bg-white text-black px-3.5 py-1.5 text-[13px] font-medium hover:bg-sky-300 transition-colors duration-300"
        >
          Contact
        </a>
      </nav>
    </motion.header>
  );
}
