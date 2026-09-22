"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { AppWindow, Laptop, Moon, Play, Radio, Sun, SunDim } from "lucide-react";
import { useSettings, type Appearance, type WallpaperId } from "@/components/desktop/settings";
import { goTo } from "@/components/desktop/sections";
import { Kildare } from "@/components/desktop/Wallpaper";
import { useToast } from "@/components/Toast";
import { holdMyCode, profile } from "@/lib/data";
import { cn } from "@/lib/utils";

/** The menu bar glyph: two toggle pills, as macOS draws Control Center. */
export function ControlCenterGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 18 16" className={className} aria-hidden fill="none">
      <rect x="1" y="1.5" width="16" height="5.5" rx="2.75" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="13.9" cy="4.25" r="1.7" fill="currentColor" />
      <rect x="1" y="9" width="16" height="5.5" rx="2.75" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="4.1" cy="11.75" r="1.7" fill="currentColor" />
    </svg>
  );
}

const tile = "rounded-[16px] bg-surface shadow-[0_0_0_0.5px_var(--rule),0_1px_2px_rgba(0,0,0,0.06)]";

function Round({ on, children }: { on: boolean; children: ReactNode }) {
  return (
    <span
      className={cn(
        "grid size-8 shrink-0 place-items-center rounded-full transition-colors",
        on ? "bg-accent text-white" : "bg-fill-2 text-ink"
      )}
    >
      {children}
    </span>
  );
}

function ToggleTile({
  on,
  onClick,
  icon,
  title,
  detail,
}: {
  on: boolean;
  onClick: () => void;
  icon: ReactNode;
  title: string;
  detail: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={onClick}
      className={cn(tile, "flex min-h-[3.75rem] items-center gap-2.5 px-3 text-left")}
    >
      <Round on={on}>{icon}</Round>
      <span className="min-w-0">
        <span className="block text-[13px] leading-tight font-semibold">{title}</span>
        <span className="block truncate text-[11.5px] text-ink-3">{detail}</span>
      </span>
    </button>
  );
}

const APPEARANCES: { id: Appearance; label: string; icon: ReactNode }[] = [
  { id: "light", label: "Light", icon: <Sun className="size-4" /> },
  { id: "dark", label: "Dark", icon: <Moon className="size-4" /> },
  { id: "auto", label: "Auto", icon: <Laptop className="size-4" /> },
];

const WALLPAPERS: { id: WallpaperId; label: string; thumb: string }[] = [
  {
    id: "golden-gate",
    label: "Golden Gate",
    thumb: "center / cover url(/wallpapers/golden-gate-dark-1920.webp)",
  },
  {
    id: "kildare",
    label: "Kildare",
    thumb: "",
  },
];

export function ControlCenter({ open, onClose }: { open: boolean; onClose: () => void }) {
  const s = useSettings();
  const { toast } = useToast();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    const onDown = (e: PointerEvent) => {
      const t = e.target as HTMLElement;
      if (!ref.current?.contains(t) && !t.closest("[data-cc-toggle]")) onClose();
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    const f = window.setTimeout(() => ref.current?.querySelector<HTMLElement>("button")?.focus(), 40);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
      window.clearTimeout(f);
    };
  }, [open, onClose]);

  const announce = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      toast("Available from Sep 2026", `${profile.email} copied`);
    } catch {
      toast("Available from Sep 2026", profile.email);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={ref}
          id="control-center"
          role="dialog"
          aria-label="Control Center"
          initial={{ opacity: 0, y: -6, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -4, scale: 0.98 }}
          transition={{ duration: 0.16, ease: [0.2, 0.8, 0.2, 1] }}
          style={{ transformOrigin: "top right" }}
          className="will-change-transform fixed top-[calc(env(safe-area-inset-top)+2.75rem)] right-2 z-[60] w-[min(21rem,calc(100vw-1rem))]"
        >
          <div className="vibrant rounded-[24px] p-3 shadow-menu">
            <div className="grid grid-cols-2 gap-2.5 text-ink">
              {/* Appearance */}
              <div className={cn(tile, "col-span-2 p-3")}>
                <p className="text-[12.5px] font-semibold text-ink-2">Appearance</p>
                <div role="radiogroup" aria-label="Appearance" className="mt-2 grid grid-cols-3 gap-2">
                  {APPEARANCES.map((a) => {
                    const on = s.appearance === a.id;
                    return (
                      <button
                        key={a.id}
                        type="button"
                        role="radio"
                        aria-checked={on}
                        onClick={() => s.set("appearance", a.id)}
                        className="flex flex-col items-center gap-1.5 text-[12px]"
                      >
                        <Round on={on}>{a.icon}</Round>
                        <span className={on ? "font-semibold" : "text-ink-2"}>{a.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <ToggleTile
                on={s.focus}
                onClick={() => s.set("focus", !s.focus)}
                icon={<Moon className="size-4" />}
                title="Focus"
                detail={s.focus ? "Motion paused" : "Off"}
              />
              <ToggleTile
                on={s.icons}
                onClick={() => s.set("icons", !s.icons)}
                icon={<AppWindow className="size-4" />}
                title="Desktop icons"
                detail={s.icons ? "Shown" : "Tidied away"}
              />

              {/* AirDrop, repurposed: availability */}
              <button type="button" onClick={announce} className={cn(tile, "col-span-2 flex items-center gap-2.5 px-3 py-2.5 text-left")}>
                <Round on>
                  <Radio className="size-4" />
                </Round>
                <span className="min-w-0 flex-1">
                  <span className="block text-[13px] leading-tight font-semibold">Available for work</span>
                  <span className="block text-[11.5px] text-ink-3">Business analyst roles from {profile.availableFrom} · tap to copy email</span>
                </span>
              </button>

              {/* Wallpaper brightness */}
              <label className={cn(tile, "col-span-2 block px-3 py-2.5")}>
                <span className="text-[12.5px] font-semibold text-ink-2">Wallpaper brightness</span>
                <span className="mt-2 flex items-center gap-2">
                  <SunDim aria-hidden className="size-4 text-ink-3" />
                  <input
                    type="range"
                    min={0}
                    max={60}
                    value={60 - s.dim}
                    onChange={(e) => s.set("dim", 60 - Number(e.target.value))}
                    className="cc-slider h-7 flex-1"
                    aria-valuetext={`${Math.round(((60 - s.dim) / 60) * 100)}%`}
                  />
                  <Sun aria-hidden className="size-4 text-ink-3" />
                </span>
              </label>

              {/* Wallpaper picker */}
              <div className={cn(tile, "col-span-2 px-3 py-2.5")}>
                <p className="text-[12.5px] font-semibold text-ink-2">Wallpaper</p>
                <div role="radiogroup" aria-label="Wallpaper" className="mt-2 grid grid-cols-2 gap-2.5">
                  {WALLPAPERS.map((w) => {
                    const on = s.wallpaper === w.id;
                    return (
                      <button
                        key={w.id}
                        type="button"
                        role="radio"
                        aria-checked={on}
                        onClick={() => s.set("wallpaper", w.id)}
                        className="text-left text-[12px]"
                      >
                        <span
                          className={cn(
                            "block aspect-[16/10] rounded-[8px] shadow-[0_0_0_0.5px_rgba(0,0,0,0.2)] ring-offset-2 ring-offset-transparent transition",
                            on ? "ring-[2.5px] ring-accent" : ""
                          )}
                          style={w.thumb ? { background: w.thumb } : undefined}
                        >
                          {!w.thumb && (
                            <span className="relative block h-full w-full overflow-hidden rounded-[8px]">
                              <Kildare night={false} />
                            </span>
                          )}
                        </span>
                        <span className={cn("mt-1 block", on ? "font-semibold" : "text-ink-2")}>{w.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Now Playing */}
              <button
                type="button"
                onClick={() => {
                  onClose();
                  goTo("hold-my-code");
                }}
                className={cn(tile, "col-span-2 flex items-center gap-3 px-3 py-2.5 text-left")}
              >
                <Image src="/hmc/app-icon.png" alt="" width={40} height={40} className="size-10 rounded-[9px]" />
                <span className="min-w-0 flex-1">
                  <span className="block text-[11px] text-ink-3">Now shipping</span>
                  <span className="block truncate text-[13px] font-semibold">
                    {holdMyCode.name} {holdMyCode.version}
                  </span>
                  <span className="block truncate text-[11.5px] text-ink-3">{holdMyCode.changelog[0].headline}</span>
                </span>
                <span className="grid size-8 place-items-center rounded-full bg-fill-2">
                  <Play className="ml-0.5 size-3.5 fill-current" />
                </span>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
