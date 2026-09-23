"use client";

import { useEffect, useState } from "react";

/**
 * A working recreation of the Hold My Code menu bar panel, laid out like the real
 * app: Refresh beside the switch, agents, keep-awake mode, the Claude Code usage
 * card and a Codex card that appears only while Codex works. Every figure is a
 * demo value, and the panel says so.
 *
 * The one Mac-desktop nod the v3 site keeps. It stays real DOM (sharp, readable,
 * interactive) and is composited onto the particle laptop's screen.
 */

type AgentState = "working" | "idle";

const AGENTS = [
  { name: "Claude Code", logo: "/hmc/claude-code.svg" },
  { name: "Codex", logo: "/hmc/codex.svg" },
  { name: "Cursor", logo: "/hmc/cursor.svg" },
];

/** Which agents are working at each step. Loops. */
const SCRIPT: AgentState[][] = [
  ["working", "idle", "idle"],
  ["working", "working", "idle"],
  ["working", "working", "working"],
  ["idle", "working", "working"],
  ["idle", "idle", "working"],
  ["working", "idle", "idle"],
  ["idle", "idle", "idle"],
];

const usd = (n: number) =>
  `$${n.toLocaleString("en-US", { maximumFractionDigits: n < 100 ? 2 : 0, minimumFractionDigits: n < 100 ? 2 : 0 })}`;

function fmtAwake(s: number) {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  return `${h}h ${String(m).padStart(2, "0")}m`;
}

function Bar({ value }: { value: number }) {
  return (
    <div className="hmc-bar">
      <div style={{ transform: `scaleX(${Math.min(100, value) / 100})` }} />
    </div>
  );
}

export function HmcPanel({
  paused = false,
  lidClosed = false,
  className = "",
}: {
  paused?: boolean;
  /** When the particle lid closes, the panel reports the held state. */
  lidClosed?: boolean;
  className?: string;
}) {
  const [reduce, setReduce] = useState(false);
  const [step, setStep] = useState(1);
  const [awake, setAwake] = useState(4 * 3600 + 7 * 60);
  const [session, setSession] = useState(38);
  const [today, setToday] = useState(41.2);
  const [tokens, setTokens] = useState(2.8);
  const [spin, setSpin] = useState(0);
  const [mode, setMode] = useState<"agents" | "always">("agents");

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduce(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const still = reduce || paused;
  const states = SCRIPT[step];
  const working = states.filter((s) => s === "working").length;
  const holding = working > 0 || mode === "always";
  const codexOn = states[1] === "working";

  useEffect(() => {
    if (still) return;
    const id = window.setInterval(() => setStep((s) => (s + 1) % SCRIPT.length), 3400);
    return () => window.clearInterval(id);
  }, [still]);

  useEffect(() => {
    if (still || working === 0) return;
    // One demo minute per second while an agent works
    const id = window.setInterval(() => {
      setAwake((a) => a + 60);
      setSession((v) => (v >= 72 ? 38 : v + 1));
      setToday((t) => +(t + 0.37 * working).toFixed(2));
      setTokens((t) => +(t + 0.01 * working).toFixed(2));
    }, 1000);
    return () => window.clearInterval(id);
  }, [still, working]);

  useEffect(() => {
    if (still) return;
    const id = window.setInterval(() => setSpin((n) => n + 1), 9000);
    return () => window.clearInterval(id);
  }, [still]);

  const month = 612 + today - 41.2;
  const lifetime = 874 + today - 41.2;
  const status = holding ? (lidClosed ? "Holding · lid closed" : "Holding · lid can close") : "Idle · Mac can sleep";

  return (
    <div className={`hmc-panel ${className}`}>
      <p className="sr-only" aria-live="polite">
        Hold My Code panel demo: {working} of 3 agents working, {holding ? "holding the Mac awake" : "idle, the Mac may sleep"}.
        Demo values.
      </p>
      <div aria-hidden>
        <div className="hmc-head">
          <div className="min-w-0">
            <p className="hmc-name">Hold My Code</p>
            <p className="hmc-status">
              <span className={`dot ${holding ? "bg-[#34c759]" : "bg-[#8a8a8e]"}`} />
              {status}
            </p>
          </div>
          <span className="flex shrink-0 items-center gap-1.5">
            <span className="hmc-chip">
              <svg
                viewBox="0 0 16 16"
                className="size-3"
                style={{ transform: `rotate(${spin * 360}deg)`, transition: "transform 0.9s ease-in-out" }}
              >
                <path d="M13.5 8a5.5 5.5 0 1 1-1.61-3.89M13.5 2.5v3h-3" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Refresh
            </span>
            <span className={`hmc-switch ${holding ? "on" : ""}`}>
              <span />
            </span>
          </span>
        </div>

        <div className="hmc-card">
          <div className="hmc-cap">
            <span>Agents</span>
            <span className="tabular-nums normal-case tracking-normal">{working} working</span>
          </div>
          <ul className="mt-1.5 space-y-1">
            {AGENTS.map((a, i) => {
              const on = states[i] === "working";
              return (
                <li key={a.name} className="flex items-center gap-2 py-[3px]">
                  <span className="hmc-logo">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={a.logo} alt="" width={14} height={14} />
                  </span>
                  <span className="flex-1 font-medium">{a.name}</span>
                  <span className={`hmc-pill ${on ? "on" : ""}`}>{on ? "working" : "idle"}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <p className="hmc-cap mt-2 px-1.5">Keep awake</p>
      <div className="hmc-seg" role="radiogroup" aria-label="Keep awake (demo)">
        {(
          [
            ["agents", "While agents work"],
            ["always", "Always"],
          ] as const
        ).map(([id, label]) => (
          <button key={id} type="button" role="radio" aria-checked={mode === id} onClick={() => setMode(id)}>
            {label}
          </button>
        ))}
      </div>

      <div aria-hidden>
        <div className="hmc-card mt-2">
          <div className="hmc-cap">
            <span>Claude usage</span>
            <span className="normal-case tracking-normal">demo values</span>
          </div>
          <div className="mt-1.5 flex justify-between">
            <span className="font-semibold tabular-nums">Session {session}% used</span>
            <span className="hmc-dim">Resets in 2h 51m</span>
          </div>
          <Bar value={session} />
          <div className="mt-2 flex justify-between">
            <span className="font-semibold">Weekly 21% used</span>
            <span className="hmc-dim">Resets in 4d 6h</span>
          </div>
          <Bar value={21} />
          <p className="hmc-dim mt-1 text-[10.5px]">20 windows until reset</p>
          <div className="mt-2 grid grid-cols-4 border-t border-[var(--hmc-rule)] pt-2 text-center">
            {[
              [fmtAwake(awake), "awake"],
              [usd(today), "today"],
              [usd(month), "30 days"],
              [usd(lifetime), "lifetime"],
            ].map(([v, k]) => (
              <span key={k}>
                <span className="block font-semibold tabular-nums">{v}</span>
                <span className="hmc-dim text-[10.5px]">{k}</span>
              </span>
            ))}
          </div>
          <p className="hmc-dim mt-1.5 text-center text-[11px] tabular-nums">
            {tokens.toFixed(1)}M today · 25M in 30 days · Opus 5
          </p>
        </div>

        <div className={`hmc-collapse ${codexOn ? "open" : ""}`}>
          <div>
            <div className="hmc-card mt-2">
              <div className="hmc-cap">
                <span>Codex usage</span>
                <span className="normal-case tracking-normal">from Codex</span>
              </div>
              <div className="mt-1.5 flex justify-between">
                <span className="font-semibold">Weekly 12% used</span>
                <span className="hmc-dim">Resets in 5d 2h</span>
              </div>
              <Bar value={12} />
              <p className="hmc-dim mt-1.5 text-[11px] tabular-nums">$3.10 today · $48 in 30 days, at OpenAI rates</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
