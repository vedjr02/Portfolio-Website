"use client";

import { useCallback, useEffect, useState } from "react";
import { ControlCenter, ControlCenterGlyph } from "@/components/desktop/ControlCenter";
import { Search } from "lucide-react";
import { useCommand } from "@/components/CommandProvider";
import { SECTIONS, goTo, useActiveSection } from "@/components/desktop/sections";
import { cn } from "@/lib/utils";

/** Hold My Code's menu bar glyph: a laptop with a sleeping "z". */
export function HmcGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 22 16" className={className} aria-hidden fill="none">
      <rect x="3.5" y="2" width="12" height="8.5" rx="1.4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M1.5 12.6h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M17.4 1.2h3.2l-3.2 3.6h3.2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Clock() {
  const [now, setNow] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-IE", {
      weekday: "short",
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Europe/Dublin",
    });
    const tick = () => setNow(fmt.format(new Date()).replace(",", ""));
    tick();
    const id = window.setInterval(tick, 15_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span
      className="tabular hidden min-w-[9.5rem] text-right sm:inline"
      title="Time in Maynooth, Ireland"
      suppressHydrationWarning
    >
      {now ?? " "}
    </span>
  );
}

export function MenuBar() {
  const { toggle } = useCommand();
  const active = useActiveSection();
  const [cc, setCc] = useState(false);
  const closeCc = useCallback(() => setCc(false), []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b bg-[var(--menubar)] border-black/[0.06] pt-[env(safe-area-inset-top)]">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-9 items-center gap-1 px-2 text-[13px] text-ink sm:px-3"
      >
        <a
          href="#top"
          className="flex h-7 items-center gap-2 rounded-md px-2 font-semibold no-underline hover:bg-fill"
        >
          <span
            aria-hidden
            className="grid size-[18px] place-items-center rounded-[5px] bg-ink text-[9px] font-bold tracking-tight text-window"
          >
            VA
          </span>
          Vedant Ambre
        </a>

        <ul className="hidden items-center md:flex">
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  goTo(s.id);
                }}
                aria-current={active === s.id ? "location" : undefined}
                className={cn(
                  "flex h-7 items-center rounded-md px-2.5 no-underline transition-colors",
                  active === s.id ? "bg-fill-2" : "hover:bg-fill"
                )}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-0.5">
          <a
            href="#hold-my-code"
            onClick={(e) => {
              e.preventDefault();
              goTo("hold-my-code");
            }}
            className="grid h-7 w-9 place-items-center rounded-md text-ink hover:bg-fill"
            aria-label="Hold My Code, the app I built"
            title="Hold My Code"
          >
            <HmcGlyph className="h-[15px] w-[21px]" />
          </a>
          <button
            type="button"
            onClick={toggle}
            className="grid h-7 w-9 place-items-center rounded-md hover:bg-fill"
            aria-label="Search the site (Command K)"
            title="Search  ⌘K"
          >
            <Search className="size-[15px]" strokeWidth={2.2} />
          </button>
          <button
            type="button"
            data-cc-toggle
            onClick={() => setCc((v) => !v)}
            aria-expanded={cc}
            aria-controls="control-center"
            className={cn("grid h-7 w-9 place-items-center rounded-md", cc ? "bg-fill-2" : "hover:bg-fill")}
            aria-label="Control Center: appearance, wallpaper and more"
            title="Control Center"
          >
            <ControlCenterGlyph className="h-[14px] w-[16px]" />
          </button>
          <span className="px-2 font-medium">
            <Clock />
          </span>
        </div>
      </nav>
      <ControlCenter open={cc} onClose={closeCc} />
    </header>
  );
}
