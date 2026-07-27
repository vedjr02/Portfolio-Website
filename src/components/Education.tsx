"use client";

import { education } from "@/lib/data";
import { DoodleNote } from "@/components/Doodles";

export function Education() {
  return (
    <section id="education" className="relative py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-5 md:px-6">
        <div className="max-w-2xl mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent mb-3">
            Path
          </p>
          <h2 className="font-display text-[clamp(1.85rem,4vw,2.75rem)] leading-[1.1] tracking-tight text-ink">
            Education across India and Ireland.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {education.map((e) => (
            <article
              key={e.degree}
              className={`relative surface p-6 flex flex-col min-h-[230px] hover:border-ink/20 transition-colors ${
                e.status === "current" ? "border-accent/40 lg:mt-16" : ""
              }`}
            >
              {e.status === "current" && (
                <DoodleNote
                  label="right now"
                  direction="down"
                  size="lg"
                  rotate={-4}
                  className="absolute left-4 -top-16 z-10 hidden lg:flex flex-col"
                />
              )}
              <div className="flex items-center gap-2 mb-8">
                {e.status === "current" && (
                  <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-dot" />
                )}
                <span className="text-xs font-bold uppercase tracking-[0.12em] text-muted">
                  {e.period}
                </span>
              </div>
              <h3 className="font-display text-xl md:text-2xl leading-tight text-ink tracking-tight">
                {e.degree}
              </h3>
              <p className="mt-3 text-sm font-semibold text-ink-soft">{e.school}</p>
              <p className="mt-1 text-sm text-muted">{e.location}</p>
              <div className="mt-auto pt-6">
                <span className={`pill ${e.status === "current" ? "pill-accent" : ""}`}>
                  {e.status === "current" ? "Ongoing" : "Completed"}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
