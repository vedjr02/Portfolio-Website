"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { DoodleNote } from "@/components/Doodles";

type Capability = {
  id: string;
  label: string;
  summary: string;
  items: { name: string; use: string }[];
};

const CAPABILITIES: Capability[] = [
  {
    id: "analyze",
    label: "Analyze",
    summary:
      "Get clean answers out of messy tables — joins, transforms, and checks before anything hits a slide.",
    items: [
      { name: "SQL", use: "Core querying, joins, and validation across sources" },
      { name: "Python", use: "Analysis workflows, automation, and notebooks" },
      { name: "Pandas / NumPy", use: "Cleaning, shaping, and exploratory analysis" },
      { name: "Advanced Excel", use: "Fast models, reconciliation, and stakeholder handoff" },
    ],
  },
  {
    id: "visualize",
    label: "Visualize",
    summary:
      "Dashboards and charts built for non-technical readers — clear hierarchy, not chart spam.",
    items: [
      { name: "Power BI", use: "KPI frameworks and interactive stakeholder views" },
      { name: "Tableau", use: "Exploratory and presentation-ready visuals" },
      { name: "Matplotlib", use: "Custom plots when the default chart isn’t enough" },
      { name: "Recharts / web", use: "Interactive case-study visuals in production UIs" },
    ],
  },
  {
    id: "build",
    label: "Build",
    summary:
      "Ship the analysis as a real product when a spreadsheet or deck won’t cut it.",
    items: [
      { name: "Next.js", use: "Interactive case studies and live demos" },
      { name: "FastAPI / Node", use: "Light backends for data apps and APIs" },
      { name: "PostgreSQL / MySQL", use: "Structured storage for product analytics builds" },
      { name: "Git", use: "Versioned work, clean history, reviewable changes" },
    ],
  },
  {
    id: "practice",
    label: "Practice",
    summary:
      "The BA habits that make the tools useful — requirements, KPIs, and research with sources.",
    items: [
      { name: "Requirement gathering", use: "Translate stakeholder asks into measurable scopes" },
      { name: "KPI modeling", use: "Define what “good” looks like before building views" },
      { name: "Case study research", use: "Trace claims to filings, earnings, and primary sources" },
      { name: "Market research", use: "Context around the numbers so decisions aren’t vacuumed" },
    ],
  },
];

export function Skills() {
  const [activeId, setActiveId] = useState(CAPABILITIES[0].id);
  const active = CAPABILITIES.find((c) => c.id === activeId) ?? CAPABILITIES[0];

  return (
    <section id="skills" className="relative py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-5 md:px-6 relative">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent mb-3">
            Capabilities
          </p>
          <h2 className="font-display text-[clamp(1.85rem,4vw,2.75rem)] leading-[1.1] tracking-tight text-ink">
            How I actually work with data.
          </h2>
          <p className="mt-3 text-[15px] text-ink-soft leading-relaxed">
            Not a logo wall — grouped by the job each skill does on a BA
            engagement.
          </p>
        </div>

        {/* Lives in empty space right of the short intro */}
        <DoodleNote
          label="choose a lane"
          direction="down-left"
          size="lg"
          rotate={-6}
          className="absolute right-6 top-10 hidden lg:flex flex-col"
        />

        <div className="mt-8 surface overflow-hidden">
          {/* Mobile: horizontal chips */}
          <div className="flex gap-2 overflow-x-auto border-b border-line p-3 md:hidden hide-scrollbar">
            {CAPABILITIES.map((cap) => {
              const on = cap.id === activeId;
              return (
                <button
                  key={cap.id}
                  type="button"
                  onClick={() => setActiveId(cap.id)}
                  className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold transition-colors ${
                    on
                      ? "bg-accent text-[#061018]"
                      : "bg-bg-deep text-ink-soft border border-line"
                  }`}
                >
                  {cap.label}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12">
            {/* Desktop: side selector */}
            <aside className="hidden md:block md:col-span-4 border-r border-line bg-bg/35">
              <ul className="p-2">
                {CAPABILITIES.map((cap, i) => {
                  const on = cap.id === activeId;
                  return (
                    <li key={cap.id}>
                      <button
                        type="button"
                        onClick={() => setActiveId(cap.id)}
                        className={`flex w-full items-start gap-3 rounded-2xl px-4 py-3.5 text-left transition-colors ${
                          on
                            ? "bg-panel text-ink"
                            : "text-ink-soft hover:bg-bg-deep hover:text-ink"
                        }`}
                      >
                        <span
                          className={`mt-0.5 font-mono text-[11px] font-bold ${
                            on ? "text-accent" : "text-muted"
                          }`}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span>
                          <span className="block font-display text-lg tracking-tight">
                            {cap.label}
                          </span>
                          <span className="mt-1 block text-xs leading-snug text-muted line-clamp-2">
                            {cap.summary}
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </aside>

            <div className="md:col-span-8 min-w-0 p-5 md:p-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.22 }}
                >
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent mb-2">
                    {active.label}
                  </p>
                  <p className="text-[15px] text-ink-soft leading-relaxed max-w-xl">
                    {active.summary}
                  </p>

                  <ul className="mt-6 divide-y divide-line border-t border-line">
                    {active.items.map((item) => (
                      <li
                        key={item.name}
                        className="grid grid-cols-1 sm:grid-cols-[9rem_1fr] gap-1 sm:gap-4 py-3.5"
                      >
                        <span className="font-display text-base text-ink tracking-tight">
                          {item.name}
                        </span>
                        <span className="text-sm text-ink-soft leading-relaxed">
                          {item.use}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
