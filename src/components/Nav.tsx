"use client";

import { useScroll, useMotionValueEvent } from "framer-motion";
import { useEffect, useState } from "react";
import { useCommand } from "@/components/CommandProvider";

const links = [
  { id: "showcase", label: "Cases" },
  { id: "archive", label: "Projects" },
  { id: "story", label: "About" },
  { id: "education", label: "Path" },
];

export function Nav() {
  const { toggle } = useCommand();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("top");
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 20));

  useEffect(() => {
    const ids = ["top", ...links.map((l) => l.id), "contact"];
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) setActive(visible[0].target.id);
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: [0.1, 0.35] }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-40 px-4 pt-4 md:px-6 md:pt-5">
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full px-4 py-2.5 transition-all duration-300 ${
          scrolled
            ? "border border-white/10 bg-[#161412]/55 backdrop-blur-xl backdrop-saturate-150 shadow-[0_10px_40px_rgba(0,0,0,0.35)]"
            : "border border-transparent bg-transparent"
        }`}
        aria-label="Primary"
      >
        <a href="#top" className="flex items-center gap-2.5 pl-1">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent font-display text-[12px] text-[#061018]">
            VA
          </span>
          <span className="hidden sm:inline text-sm font-bold text-ink tracking-tight">
            Vedant Ambre
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                aria-current={active === link.id ? "true" : undefined}
                className={`rounded-full px-3.5 py-1.5 text-sm font-bold transition-colors ${
                  active === link.id
                    ? "bg-ink text-bg"
                    : "text-ink-soft hover:text-ink"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggle}
            className="rounded-full border border-line bg-bg-deep px-3 py-1.5 text-xs font-bold text-ink-soft hover:text-ink"
          >
            ⌘K
          </button>
          <a href="#contact" className="btn-primary !py-2 !px-4 text-sm">
            Contact
          </a>
        </div>
      </nav>
    </header>
  );
}
