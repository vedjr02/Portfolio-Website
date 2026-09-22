"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { RotateCw } from "lucide-react";
import { useSettings } from "@/components/desktop/settings";
import { cn } from "@/lib/utils";

/**
 * A working recreation of Hold My Code 2.5.1's menu bar panel, laid out like
 * the real app: Refresh beside the switch, agents, keep-awake mode, the
 * Claude Code card with windows-until-reset and today / 30 days / lifetime
 * spend, and a Codex card that appears only while Codex is working.
 * Every figure is a demo value.
 */

type AgentState = "working" | "idle";

const AGENTS = [
  { name: "Claude Code", logo: "/hmc/claude-code.svg" },
  { name: "Codex", logo: "/hmc/codex.svg" },
  { name: "Cursor", logo: "/hmc/cursor.svg" },
];

// Which agents are working at each step. Loops.
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

const label = "text-[10.5px] font-semibold tracking-[0.04em] text-ink-3 uppercase";
const card = "rounded-[10px] bg-[var(--panel-card)] px-2.5 py-2 shadow-[0_0_0_0.5px_var(--rule)]";

function Bar({ value }: { value: number }) {
  return (
    <div className="mt-1 h-[5px] overflow-hidden rounded-full bg-fill-2">
      <div
        className="h-full rounded-full bg-[#30c253] transition-[width] duration-700"
        style={{ width: `${Math.min(100, value)}%` }}
      />
    </div>
  );
}

export function HmcPanel({ className, paused = false }: { className?: string; paused?: boolean }) {
  const reduce = useReducedMotion();
  const { focus } = useSettings();
  const still = reduce || focus || paused;

  const [step, setStep] = useState(1);
  const [awake, setAwake] = useState(4 * 3600 + 7 * 60);
  const [session, setSession] = useState(38);
  const [today, setToday] = useState(41.2);
  const [tokens, setTokens] = useState(2.8);
  const [spin, setSpin] = useState(0);

  const states = SCRIPT[step];
  const working = states.filter((s) => s === "working").length;
  const holding = working > 0;
  const codexOn = states[1] === "working";

  useEffect(() => {
    if (still) return;
    const id = window.setInterval(() => setStep((s) => (s + 1) % SCRIPT.length), 3400);
    return () => window.clearInterval(id);
  }, [still]);

  useEffect(() => {
    if (still || !holding) return;
    // One demo minute per second while an agent works
    const id = window.setInterval(() => {
      setAwake((a) => a + 60);
      setSession((v) => (v >= 72 ? 38 : v + 1));
      setToday((t) => +(t + 0.37 * working).toFixed(2));
      setTokens((t) => +(t + 0.01 * working).toFixed(2));
    }, 1000);
    return () => window.clearInterval(id);
  }, [still, holding, working]);

  // Refresh spins now and then: in 2.5.1 it refreshes everything at once
  useEffect(() => {
    if (still) return;
    const id = window.setInterval(() => setSpin((n) => n + 1), 9000);
    return () => window.clearInterval(id);
  }, [still]);

  const month = 612 + today - 41.2;
  const lifetime = 874 + today - 41.2;

  return (
    <div
      role="img"
      aria-label={`Hold My Code panel demo: ${working} of 3 agents working, ${holding ? "holding the Mac awake with the lid closed" : "idle, the Mac may sleep"}. Demo values.`}
      className={cn(
        "vibrant-panel w-[20rem] select-none overflow-hidden rounded-[14px] p-2.5 text-[12px] text-ink shadow-menu",
        className
      )}
    >
      <div aria-hidden>
        {/* header: status, Refresh, switch */}
        <div className="flex items-start justify-between gap-2 px-1.5 pt-0.5 pb-2">
          <div className="min-w-0">
            <p className="text-[13px] font-semibold">Hold My Code</p>
            <p className="mt-0.5 flex items-center gap-1.5 text-ink-3">
              <span className={cn("size-[7px] rounded-full transition-colors duration-500", holding ? "bg-live" : "bg-ink-4")} />
              {holding ? "Holding · lid can close" : "Idle · Mac can sleep"}
            </p>
          </div>
          <span className="flex shrink-0 items-center gap-1.5">
            <span className="flex items-center gap-1 rounded-full bg-fill px-2 py-[3px] text-[11px] font-medium text-ink-2">
              <motion.span
                key={spin}
                initial={{ rotate: 0 }}
                animate={{ rotate: spin ? 360 : 0 }}
                transition={{ duration: 0.9, ease: "easeInOut" }}
                className="inline-flex"
              >
                <RotateCw className="size-3" strokeWidth={2.4} />
              </motion.span>
              Refresh
            </span>
            <span className={cn("relative h-[22px] w-[38px] rounded-full transition-colors duration-500", holding ? "bg-accent" : "bg-fill-2")}>
              <motion.span
                className="absolute top-[2px] size-[18px] rounded-full bg-white shadow-[0_1px_2px_rgba(0,0,0,0.3)]"
                animate={{ left: holding ? 18 : 2 }}
                transition={{ type: "spring", stiffness: 500, damping: 34 }}
              />
            </span>
          </span>
        </div>

        {/* agents */}
        <div className={card}>
          <div className={cn(label, "flex justify-between")}>
            <span>Agents</span>
            <span className="tabular font-medium tracking-normal normal-case">{working} working</span>
          </div>
          <ul className="mt-1.5 space-y-1">
            {AGENTS.map((a, i) => {
              const on = states[i] === "working";
              return (
                <li key={a.name} className="flex items-center gap-2 py-[3px]">
                  <span className="grid size-5 place-items-center rounded-[5px] bg-white shadow-[0_0_0_0.5px_rgba(0,0,0,0.12)]">
                    <Image src={a.logo} alt="" width={14} height={14} className="size-3.5" />
                  </span>
                  <span className="flex-1 font-medium">{a.name}</span>
                  <span
                    className={cn(
                      "rounded-full px-2 py-[1px] text-[11px] font-semibold transition-colors duration-500",
                      on ? "bg-live/20 text-live" : "bg-fill text-ink-3"
                    )}
                  >
                    {on ? "working" : "idle"}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* keep awake */}
        <p className={cn(label, "mt-2 px-1.5")}>Keep awake</p>
        <div className="mt-1 grid grid-cols-2 gap-0.5 rounded-[8px] bg-fill p-0.5 text-center text-[11.5px] font-medium">
          <span className="rounded-[6px] bg-surface py-1 shadow-[0_0.5px_1.5px_rgba(0,0,0,0.2)]">While agents work</span>
          <span className="py-1 text-ink-3">Always</span>
        </div>

        {/* Claude Code usage; hidden on phones so the panel fits above the Dock */}
        <div className={cn(card, "mt-2 hidden min-[420px]:block")}>
          <div className={cn(label, "flex justify-between")}>
            <span>Claude usage</span>
            <span className="font-medium tracking-normal normal-case">demo values</span>
          </div>
          <div className="mt-1.5 flex justify-between">
            <span className="tabular font-semibold">Session {session}% used</span>
            <span className="text-ink-3">Resets in 2h 51m</span>
          </div>
          <Bar value={session} />
          <div className="mt-2 flex justify-between">
            <span className="font-semibold">Weekly 21% used</span>
            <span className="text-ink-3">Resets in 4d 6h</span>
          </div>
          <Bar value={21} />
          <p className="mt-1 text-[10.5px] text-ink-3">20 windows until reset</p>

          <div className="mt-2 grid grid-cols-4 border-t border-rule pt-2 text-center">
            {[
              [fmtAwake(awake), "awake"],
              [usd(today), "today"],
              [usd(month), "30 days"],
              [usd(lifetime), "lifetime"],
            ].map(([v, k]) => (
              <span key={k}>
                <span className="tabular block font-semibold">{v}</span>
                <span className="text-[10.5px] text-ink-3">{k}</span>
              </span>
            ))}
          </div>
          <p className="tabular mt-1.5 text-center text-[11px] text-ink-3">
            {tokens.toFixed(1)}M today · 25M in 30 days · Opus 5
          </p>
        </div>

        {/* Codex card: only while Codex is open, like the real panel */}
        <motion.div
          initial={false}
          animate={{ height: codexOn ? "auto" : 0, opacity: codexOn ? 1 : 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="hidden overflow-hidden min-[420px]:block"
        >
          <div className={cn(card, "mt-2")}>
            <div className={cn(label, "flex justify-between")}>
              <span>Codex usage</span>
              <span className="font-medium tracking-normal normal-case">from Codex</span>
            </div>
            <div className="mt-1.5 flex justify-between">
              <span className="font-semibold">Weekly 12% used</span>
              <span className="text-ink-3">Resets in 5d 2h</span>
            </div>
            <Bar value={12} />
            <p className="tabular mt-1.5 text-[11px] text-ink-3">$3.10 today · $48 in 30 days, at OpenAI rates</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
