"use client";

import { education } from "@/lib/data";
import { DoodleNote } from "@/components/Doodles";
import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@/components/reui/timeline";

export function Education() {
  const items = [...education].reverse();
  const currentStep =
    items.findIndex((e) => e.status === "current") + 1 || items.length;

  return (
    <section id="education" className="relative py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-5 md:px-6">
        <div className="mb-10 max-w-2xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-accent">
            Path
          </p>
          <h2 className="font-display text-[clamp(1.85rem,4vw,2.75rem)] leading-[1.1] tracking-tight text-ink">
            Education across India and Ireland.
          </h2>
        </div>

        <div className="relative max-w-2xl">
          <DoodleNote
            label="right now"
            direction="left"
            size="md"
            rotate={-4}
            align="end"
            className="absolute -right-2 bottom-8 z-10 hidden lg:flex flex-col xl:-right-28"
          />

          <Timeline
            defaultValue={currentStep}
            className="w-full"
            orientation="vertical"
          >
            {items.map((e, index) => {
              const step = index + 1;
              const isCurrent = e.status === "current";
              const leadsToCurrent = items[index + 1]?.status === "current";

              return (
                <TimelineItem
                  key={e.degree}
                  step={step}
                  className="pb-8 last:pb-0"
                >
                  <TimelineHeader>
                    <TimelineSeparator
                      className={
                        leadsToCurrent
                          ? "!bg-gradient-to-b !from-line !via-accent/20 !to-accent shadow-[0_8px_18px_-4px_rgba(61,155,255,0.45)]"
                          : "!bg-line"
                      }
                    />
                    <TimelineDate className="font-bold uppercase tracking-[0.12em] text-muted">
                      {e.period}
                    </TimelineDate>
                    <TimelineTitle className="font-display text-xl font-extrabold tracking-tight text-ink md:text-2xl">
                      {e.degree}
                    </TimelineTitle>
                    <TimelineIndicator
                      className={
                        isCurrent
                          ? "size-3.5 border-accent bg-accent shadow-[0_0_0_4px_rgba(61,155,255,0.18),0_0_22px_rgba(61,155,255,0.35)]"
                          : "size-3.5 border-line bg-bg-deep group-data-completed/timeline-item:border-line group-data-completed/timeline-item:bg-bg-deep"
                      }
                    >
                      {isCurrent && (
                        <span className="absolute inset-0 m-auto h-1.5 w-1.5 rounded-full bg-[#061018]" />
                      )}
                    </TimelineIndicator>
                  </TimelineHeader>
                  <TimelineContent className="mt-2 space-y-1 text-ink-soft">
                    <p className="text-sm font-semibold text-ink-soft">
                      {e.school}
                    </p>
                    <p className="text-sm text-muted">{e.location}</p>
                    <div className="pt-3">
                      <span
                        className={`pill ${isCurrent ? "pill-accent" : ""}`}
                      >
                        {isCurrent ? "Ongoing" : "Completed"}
                      </span>
                    </div>
                  </TimelineContent>
                </TimelineItem>
              );
            })}
          </Timeline>
        </div>
      </div>
    </section>
  );
}
