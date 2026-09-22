"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Window } from "@/components/desktop/Window";
import { caseStudies } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Stickers } from "@/components/desktop/Stickers";
import { MobileCases } from "@/components/mobile/MobileSections";

/** Case studies as a Preview window: thumbnails in the sidebar, the open one on the right. */
export function Cases() {
  const [activeId, setActiveId] = useState(caseStudies[0].id);
  const active = caseStudies.find((c) => c.id === activeId) ?? caseStudies[0];

  // Spotlight can ask for a specific case
  useEffect(() => {
    const onOpen = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      if (caseStudies.some((c) => c.id === id)) setActiveId(id);
    };
    window.addEventListener("va:open-case", onOpen);
    return () => window.removeEventListener("va:open-case", onOpen);
  }, []);

  return (
    <section id="cases" aria-labelledby="cases-title" className="relative scroll-mt-14 px-4 py-7 sm:px-8 md:py-16">
      <Stickers
        items={[
          { src: "/stickers/doc.webp", w: 48, x: "calc(50% - 668px)", y: 150, r: -6 },
          { src: "/stickers/settings.webp", w: 50, x: "calc(50% + 616px)", y: 430, r: 7 },
        ]}
      />
      <div className="md:hidden">
        <MobileCases />
      </div>
      <div className="mx-auto hidden max-w-[1180px] md:block">
        <Window
          title="Case studies"
          subtitle={`${caseStudies.length} documents`}
          labelId="cases-title"
          bodyClassName="grid md:grid-cols-[15rem_1fr]"
        >
          <div
            role="tablist"
            aria-label="Case studies"
            aria-orientation="vertical"
            className="flex gap-2 overflow-x-auto border-b border-rule bg-sidebar p-3 md:flex-col md:overflow-visible md:border-r md:border-b-0"
          >
            {caseStudies.map((c) => {
              const on = c.id === active.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  role="tab"
                  id={`case-tab-${c.id}`}
                  aria-selected={on}
                  aria-controls="case-panel"
                  onClick={() => setActiveId(c.id)}
                  onKeyDown={(e) => {
                    const i = caseStudies.findIndex((x) => x.id === c.id);
                    const d = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
                    if (!d) return;
                    e.preventDefault();
                    const next = caseStudies[(i + d + caseStudies.length) % caseStudies.length];
                    setActiveId(next.id);
                    document.getElementById(`case-tab-${next.id}`)?.focus();
                  }}
                  tabIndex={on ? 0 : -1}
                  className="group w-40 shrink-0 rounded-[8px] p-2 text-left md:w-full"
                >
                  <span
                    className={cn(
                      "relative block aspect-[16/11] overflow-hidden rounded-[4px] bg-surface shadow-[0_0_0_0.5px_rgba(0,0,0,0.18),0_1px_3px_rgba(0,0,0,0.12)] ring-offset-2 ring-offset-sidebar transition",
                      on ? "ring-[3px] ring-select" : "group-hover:ring-2 group-hover:ring-black/10"
                    )}
                  >
                    {c.preview && (
                      <Image src={c.preview} alt="" fill sizes="220px" className="object-cover object-top" />
                    )}
                  </span>
                  <span
                    className={cn(
                      "mx-auto mt-2 block w-fit max-w-full truncate rounded-[4px] px-1.5 text-center text-[12.5px] font-medium",
                      on ? "bg-select text-white" : "text-ink"
                    )}
                  >
                    {c.name}
                  </span>
                </button>
              );
            })}
          </div>

          <div id="case-panel" role="tabpanel" aria-labelledby={`case-tab-${active.id}`} className="min-w-0">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="grid gap-8 p-5 sm:p-8 xl:grid-cols-[1.35fr_1fr] xl:gap-10"
              >
                {active.preview && (
                  <a
                    href={active.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="relative block aspect-[16/11] overflow-hidden rounded-[6px] bg-chrome shadow-[0_0_0_0.5px_rgba(0,0,0,0.2),0_8px_24px_-8px_rgba(0,0,0,0.25)]"
                    aria-label={`Open the ${active.name} live site`}
                  >
                    <Image
                      src={active.preview}
                      alt={`${active.name} site`}
                      fill
                      sizes="(max-width: 1280px) 90vw, 560px"
                      className="object-cover object-top"
                    />
                  </a>
                )}
                <div className="min-w-0">
                  <h3 className="text-[clamp(1.6rem,3vw,2.2rem)] leading-[1.08] font-semibold tracking-[-0.03em]">
                    {active.summary}
                  </h3>
                  <p className="mt-2 text-[13px] text-ink-3">
                    {active.kind} · {active.date} · {active.status}
                  </p>
                  <p className="mt-4 text-[15px] leading-[1.6] text-ink-2">{active.description}</p>
                  <ul className="mt-5 space-y-1.5 text-[14.5px]">
                    {active.highlights.map((h) => (
                      <li key={h} className="flex gap-2.5">
                        <span aria-hidden className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-ink-4" />
                        {h}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex flex-wrap gap-2.5">
                    {active.liveUrl && (
                      <a href={active.liveUrl} target="_blank" rel="noreferrer" className="btn btn-default">
                        Open the case
                        <ArrowUpRight className="size-4" />
                      </a>
                    )}
                    {active.repoUrl && (
                      <a href={active.repoUrl} target="_blank" rel="noreferrer" className="btn btn-plain">
                        Source
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Window>
      </div>
    </section>
  );
}
