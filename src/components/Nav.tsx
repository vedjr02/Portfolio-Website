"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useEffect, useState } from "react";

const links = [
  { id: "work", label: "Work" },
  { id: "story", label: "Story" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("top");
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 24);
  });

  useEffect(() => {
    const sectionIds = ["top", ...links.map((l) => l.id), "contact"];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) setActive(visible[0].target.id);
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: [0.1, 0.25, 0.5] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

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
        aria-label="Primary"
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
          {links.map((link) => {
            const isActive = active === link.id;
            return (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={`px-3 py-1.5 text-[13px] rounded-full transition-colors ${
                    isActive
                      ? "text-white bg-white/10"
                      : "text-neutral-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
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
