"use client";

import Image from "next/image";
import { profile, experience } from "@/lib/data";
import { DoodleNote } from "@/components/Doodles";

export function Story() {
  return (
    <section id="story" className="relative py-16 md:py-24">
      <div className="border-y border-line bg-panel/50 py-4 mb-12 overflow-hidden">
        <div className="flex w-max animate-marquee gap-8 pr-8">
          {[...experience, ...experience, ...experience, ...experience].map(
            (item, i) => (
              <div key={`${item.label}-${i}`} className="flex items-center gap-8">
                <span className="font-display text-xl md:text-2xl text-ink whitespace-nowrap tracking-tight">
                  {item.label}
                </span>
                <span className="text-accent text-sm">●</span>
              </div>
            )
          )}
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-5 md:px-6 relative">
        <div className="relative max-w-xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent mb-3">
            About
          </p>
          <h2 className="font-display text-[clamp(1.85rem,4vw,2.75rem)] leading-[1.1] tracking-tight text-ink">
            I make the business case clear.
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <figure className="relative lg:col-span-4 min-w-0">
            <div className="relative aspect-[4/5]">
              <div className="absolute inset-0 overflow-hidden rounded-[1.25rem] border border-line bg-bg-deep">
                <Image
                  src="/vedant.jpg"
                  alt="Vedant Ambre in Maynooth, Ireland"
                  fill
                  sizes="(max-width: 1024px) 100vw, 320px"
                  className="object-cover object-center scale-[1.55] origin-center brightness-[0.88] contrast-[1.08] saturate-[0.72]"
                  priority={false}
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b0a09]/70 via-[#0b0a09]/10 to-transparent"
                />
              </div>
              <DoodleNote
                label="that's me"
                direction="down"
                size="md"
                rotate={-4}
                className="absolute left-1/2 top-2 z-10 flex -translate-x-1/2 flex-col items-center gap-1"
              />
            </div>
            <figcaption className="mt-3">
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-muted">
                Maynooth · Ireland
              </span>
            </figcaption>
          </figure>

          <div className="lg:col-span-8 min-w-0">
            <p className="text-[15px] md:text-base text-ink-soft leading-relaxed">
              {profile.story}
            </p>
            <p className="mt-4 text-sm md:text-[15px] text-ink-soft/90 leading-relaxed">
              {profile.intro}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
