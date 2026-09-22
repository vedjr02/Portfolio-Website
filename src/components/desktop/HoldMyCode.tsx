"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Play } from "lucide-react";
import { Window } from "@/components/desktop/Window";
import { holdMyCode as app } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Stickers } from "@/components/desktop/Stickers";
import { MobileHoldMyCode } from "@/components/mobile/MobileSections";

type Media = "screenshot" | "walkthrough";

function MediaViewer() {
  const [media, setMedia] = useState<Media>("walkthrough");
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const play = () => {
    setPlaying(true);
    requestAnimationFrame(() => videoRef.current?.play().catch(() => setPlaying(false)));
  };

  return (
    <div>
      <div
        role="radiogroup"
        aria-label="Media"
        className="mx-auto grid w-fit grid-cols-2 gap-0.5 rounded-[8px] bg-fill p-0.5 text-[13px] font-medium"
      >
        {(
          [
            ["walkthrough", "Walkthrough video"],
            ["screenshot", "Screenshot"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            role="radio"
            aria-checked={media === id}
            onClick={() => {
              setMedia(id);
              if (id !== "walkthrough") {
                videoRef.current?.pause();
                setPlaying(false);
              }
            }}
            className={cn(
              "min-h-8 rounded-[6px] px-4 transition-colors",
              media === id
                ? "bg-surface text-ink shadow-[0_0.5px_1.5px_rgba(0,0,0,0.22)]"
                : "text-ink-2 hover:text-ink"
            )}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="relative mt-6">
        {media === "screenshot" ? (
          <Image
            src="/hmc/hero-laptop-2400.webp"
            alt="A MacBook with the Hold My Code panel open in the menu bar: holding, lid can close, Claude Code working, usage limits and cost for the day."
            width={2400}
            height={1450}
            sizes="(max-width: 1100px) 100vw, 1000px"
            className="mx-auto h-auto w-full max-w-[1000px]"
          />
        ) : (
          <div className="relative mx-auto aspect-video max-w-[1000px] overflow-hidden rounded-[10px] bg-black shadow-[0_0_0_0.5px_rgba(0,0,0,0.3)]">
            <video
              ref={videoRef}
              src="/hmc/walkthrough.mp4"
              poster="/hmc/walkthrough-poster.jpg"
              preload="none"
              playsInline
              controls={playing}
              className="h-full w-full object-cover"
              onPause={() => setPlaying(false)}
              onPlay={() => setPlaying(true)}
            />
            {!playing && (
              <button
                type="button"
                onClick={play}
                className="group absolute inset-0 grid place-items-center bg-black/10"
                aria-label="Play the Hold My Code walkthrough"
              >
                <span className="vibrant grid size-16 place-items-center rounded-full shadow-menu transition-transform group-hover:scale-105">
                  <Play className="ml-1 size-6 fill-ink text-ink" />
                </span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export function HoldMyCode() {
  return (
    <section id="hold-my-code" aria-labelledby="hmc-title" className="relative scroll-mt-14 px-4 py-7 sm:px-8 md:py-16">
      <Stickers
        items={[
          { src: "/stickers/folder-dev.webp", w: 50, x: "calc(50% + 612px)", y: 180, r: 6 },
          { src: "/stickers/clock.webp", w: 46, x: "calc(50% - 668px)", y: 640, r: -8 },
          { text: "(-_-) zzZ", mono: true, size: 16, x: "calc(50% - 690px)", y: 1180, r: 8 },
          { text: "\u{1F4A4}", size: 30, x: "calc(50% + 624px)", y: 1500, r: -12 },
          { text: "\u00af\\_(\u30c4)_/\u00af", mono: true, size: 14, x: "calc(50% + 600px)", y: 900, r: -6 },
        ]}
      />
      <div className="md:hidden">
        <MobileHoldMyCode />
      </div>
      <div className="hidden md:block">
      <Window
        title="Hold My Code"
        subtitle={`Version ${app.version}`}
        className="mx-auto max-w-[1180px]"
        toolbar={
          <a href={app.site} target="_blank" rel="noreferrer" className="btn btn-sm btn-plain">
            holdmycode.xyz
            <ArrowUpRight className="size-3.5" />
          </a>
        }
      >
        {/* identity */}
        <div className="grid gap-6 px-5 pt-8 pb-8 sm:grid-cols-[auto_1fr] sm:gap-8 sm:px-10 sm:pt-12">
          <Image
            src="/hmc/app-icon.png"
            alt="Hold My Code app icon"
            width={128}
            height={128}
            className="size-24 drop-shadow-[0_6px_14px_rgba(0,0,0,0.22)] sm:size-32"
          />
          <div className="min-w-0">
            <h2 id="hmc-title" className="text-[clamp(2rem,4.4vw,3.25rem)] leading-[1.02] font-semibold tracking-[-0.035em]">
              Hold My Code
            </h2>
            <p className="mt-3 max-w-[38rem] text-[17px] leading-[1.5] text-ink-2">{app.oneLiner}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href={app.site} target="_blank" rel="noreferrer" className="btn btn-default">
                Visit the website
                <ArrowUpRight className="size-4" />
              </a>
              <a href={app.download} className="btn btn-plain">
                Download for Mac
              </a>
              <span className="text-[13px] text-ink-3">Free · {app.requirements} · Source private</span>
            </div>
          </div>
        </div>

        {/* App Store style information row */}
        <dl className="mx-5 grid grid-cols-2 border-y border-rule text-center sm:mx-10 sm:grid-cols-4">
          {[
            ["Version", app.version, `Released ${app.latestRelease}`],
            ["Runs on", "macOS 14+", "Apple Silicon and Intel"],
            ["Agents", String(app.agents.length), "Watched through hooks"],
            ["Built", "Solo", "Product, design, code"],
          ].map(([label, value, sub], i) => (
            <div
              key={label}
              className={cn(
                "px-3 py-4",
                i % 2 === 1 && "border-l border-rule",
                i >= 2 && "border-t border-rule sm:border-t-0",
                i === 2 && "sm:border-l"
              )}
            >
              <dt className="text-[12px] font-medium text-ink-3">{label}</dt>
              <dd className="tabular mt-1 text-[22px] font-semibold tracking-tight">{value}</dd>
              <dd className="text-[12px] text-ink-3">{sub}</dd>
            </div>
          ))}
        </dl>

        {/* media */}
        <div className="bg-gradient-to-b from-window to-chrome px-4 pt-10 pb-12 sm:px-10">
          <MediaViewer />
        </div>

        {/* what / how */}
        <div className="grid border-t border-rule md:grid-cols-2">
          <div className="px-5 py-10 sm:px-10">
            <h3 className="text-[22px] font-semibold tracking-[-0.02em]">What it does</h3>
            <ul className="mt-5 space-y-5">
              {app.features.map((f) => (
                <li key={f.title}>
                  <p className="font-semibold">{f.title}</p>
                  <p className="mt-1 text-[15px] leading-[1.55] text-ink-2">{f.detail}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="border-t border-rule bg-chrome px-5 py-10 sm:px-10 md:border-t-0 md:border-l">
            <h3 className="text-[22px] font-semibold tracking-[-0.02em]">How I ran it, as an analyst</h3>
            <ul className="mt-5 space-y-5">
              {app.decisions.map((d) => (
                <li key={d.title}>
                  <p className="font-semibold">{d.title}</p>
                  <p className="mt-1 text-[15px] leading-[1.55] text-ink-2">{d.detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* agents + release notes */}
        <div className="grid border-t border-rule lg:grid-cols-[1.1fr_1fr]">
          <div className="px-5 py-10 sm:px-10">
            <h3 className="text-[17px] font-semibold">Agents it watches</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {app.agents.map((a) => (
                <li
                  key={a.name}
                  className="flex items-center gap-2 rounded-full bg-chrome py-1 pr-3 pl-1 text-[13.5px] shadow-[0_0_0_0.5px_rgba(0,0,0,0.1)]"
                >
                  <span className="grid size-6 place-items-center rounded-full bg-white shadow-[0_0_0_0.5px_rgba(0,0,0,0.1)]">
                    <Image src={a.logo} alt="" width={14} height={14} className="size-3.5 object-contain" />
                  </span>
                  {a.name}
                </li>
              ))}
            </ul>
            <p className="mt-4 max-w-[30rem] text-[13px] leading-[1.5] text-ink-3">
              Logos belong to their owners and only name the agent being watched.
            </p>
          </div>
          <div className="border-t border-rule px-5 py-10 sm:px-10 lg:border-t-0 lg:border-l">
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="text-[17px] font-semibold">Release notes</h3>
              <a
                href={app.releases}
                target="_blank"
                rel="noreferrer"
                className="text-[13px] text-accent hover:underline"
              >
                All releases
              </a>
            </div>
            <ol className="mt-3 divide-y divide-rule">
              {app.changelog.map((r) => (
                <li key={r.version} className="grid grid-cols-[3.5rem_3.75rem_1fr] items-baseline gap-2 py-2.5 text-[14px]">
                  <span className="font-mono text-[13px] font-medium">{r.version}</span>
                  <span className="tabular text-ink-3">{r.date}</span>
                  <span className="text-ink-2">{r.headline}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Window>
      </div>
    </section>
  );
}
