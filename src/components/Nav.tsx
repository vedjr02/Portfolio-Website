"use client";

import { useScroll, useMotionValueEvent } from "framer-motion";
import { useEffect, useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useCommand } from "@/components/CommandProvider";

const links = [
  { id: "story", label: "About" },
  { id: "showcase", label: "Cases" },
  { id: "archive", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Path" },
];

export function Nav() {
  const { toggle } = useCommand();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("top");
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const menuTitleId = useId();

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

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const go = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

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
            className="hidden sm:inline-flex rounded-full border border-line bg-bg-deep px-3 py-1.5 text-xs font-bold text-ink-soft hover:text-ink"
          >
            ⌘K
          </button>
          <a
            href="#contact"
            className="hidden sm:inline-flex btn-primary !py-2 !px-4 text-sm"
          >
            Contact
          </a>
          <button
            type="button"
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-bg-deep text-ink"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-50 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              aria-label="Close menu"
              className="absolute inset-0 bg-black/70"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              id="mobile-nav"
              role="dialog"
              aria-modal="true"
              aria-labelledby={menuTitleId}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-4 top-[4.75rem] overflow-hidden rounded-[1.75rem] border border-white/10 bg-panel/60 backdrop-blur-xl backdrop-saturate-150 shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
            >
              <div className="border-b border-line px-5 py-4">
                <p
                  id={menuTitleId}
                  className="text-xs font-bold uppercase tracking-[0.16em] text-accent"
                >
                  Navigate
                </p>
              </div>
              <ul className="p-2">
                {links.map((link) => (
                  <li key={link.id}>
                    <button
                      type="button"
                      onClick={() => go(link.id)}
                      aria-current={active === link.id ? "true" : undefined}
                      className={`flex w-full items-center justify-between rounded-2xl px-4 py-3.5 text-left text-base font-bold transition-colors ${
                        active === link.id
                          ? "bg-bg-deep text-ink"
                          : "text-ink-soft hover:text-ink"
                      }`}
                    >
                      {link.label}
                      {active === link.id && (
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="grid grid-cols-2 gap-2 border-t border-line p-3">
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    toggle();
                  }}
                  className="btn-secondary !py-3 text-sm"
                >
                  Search
                </button>
                <button
                  type="button"
                  onClick={() => go("contact")}
                  className="btn-primary !py-3 text-sm"
                >
                  Contact
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
