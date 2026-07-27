"use client";

import { useEffect, useRef } from "react";
import { Scrollspy } from "@/components/reui/scrollspy";

const SECTIONS = [
  { id: "top", label: "Top" },
  { id: "story", label: "About" },
  { id: "showcase", label: "Cases" },
  { id: "archive", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Path" },
  { id: "contact", label: "Contact" },
];

const NAV_OFFSET = 110;

export function SideRail() {
  const docRef = useRef<Document | null>(null);

  useEffect(() => {
    docRef.current = document;
  }, []);

  return (
    <nav
      aria-label="Section rail"
      className="pointer-events-none fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 xl:block"
    >
      <Scrollspy
        targetRef={docRef}
        offset={NAV_OFFSET}
        history={false}
        className="pointer-events-auto space-y-1 rounded-full border border-white/10 bg-panel/55 px-2 py-3 backdrop-blur-xl"
      >
        {SECTIONS.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            data-scrollspy-anchor={section.id}
            aria-label={section.label}
            title={section.label}
            className="group relative flex h-8 w-8 items-center justify-center"
          >
            <span className="block h-1.5 w-1.5 rounded-full bg-muted transition-all group-hover:bg-ink-soft group-data-[active=true]:h-2.5 group-data-[active=true]:w-2.5 group-data-[active=true]:bg-accent" />
            <span className="pointer-events-none absolute right-10 translate-x-1 whitespace-nowrap rounded-full border border-line bg-panel px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-ink-soft opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100">
              {section.label}
            </span>
          </a>
        ))}
      </Scrollspy>
    </nav>
  );
}
