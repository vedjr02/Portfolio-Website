"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "top", label: "Top" },
  { id: "showcase", label: "Showcase" },
  { id: "archive", label: "Index" },
  { id: "story", label: "Story" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export function SideRail() {
  const [active, setActive] = useState("top");

  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => !!el
    );

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -45% 0px", threshold: [0.1, 0.25, 0.5] }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Section rail"
      className="pointer-events-none fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 xl:block"
    >
      <ul className="pointer-events-auto neu rounded-full px-2 py-3 space-y-1">
        {SECTIONS.map((section) => {
          const isActive = active === section.id;
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-label={section.label}
                aria-current={isActive ? "true" : undefined}
                title={section.label}
                className="group relative flex h-8 w-8 items-center justify-center"
              >
                <span
                  className={`block rounded-full transition-all ${
                    isActive
                      ? "h-2.5 w-2.5 bg-accent"
                      : "h-1.5 w-1.5 bg-muted group-hover:bg-ink-soft"
                  }`}
                />
                <span className="pointer-events-none absolute right-10 whitespace-nowrap rounded-full neu-inset px-2.5 py-1 font-mono text-[10px] tracking-[0.14em] uppercase text-ink-soft opacity-0 translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0">
                  {section.label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
