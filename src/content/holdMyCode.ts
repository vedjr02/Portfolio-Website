import { github } from "./profile";

/**
 * Hold My Code: the flagship. Every figure comes from the app's public
 * releases page (github.com/vedjrr/Hold-My-Code/releases), not from estimates.
 * Release facts refreshed 2026-09-23 (latest: 2.5.4).
 */

export type Agent = {
  name: string;
  logo: string;
  /** Stream colour in the "lid closed, still awake" beat. Muted, never neon. */
  color: string;
};

export const holdMyCode = {
  name: "Hold My Code",
  oneLiner: "A macOS menu bar app that keeps a Mac awake while coding agents work, even with the lid closed.",
  site: "https://holdmycode.xyz",
  download: github("Hold-My-Code/releases/latest/download/HoldMyCode.dmg"),
  releases: github("Hold-My-Code/releases"),
  version: "2.5.4",
  firstCommit: "14 Sep 2026",
  latestRelease: "23 Sep 2026",
  requirements: "macOS 14 or later",
  platforms: "Apple Silicon and Intel",
  source: "Source private; releases public",
  stack: ["Swift 6", "SwiftUI", "AppKit", "SMAppService", "XPC"],
  walkthrough: { src: "/hmc/walkthrough.mp4", poster: "/hmc/walkthrough-poster.jpg" },
  agents: [
    { name: "Claude Code", logo: "/hmc/claude-code.svg", color: "#d9825f" },
    { name: "Codex", logo: "/hmc/codex.svg", color: "#e7e2d8" },
    { name: "Cursor", logo: "/hmc/cursor.svg", color: "#8fa3c8" },
    { name: "Gemini CLI", logo: "/hmc/gemini.svg", color: "#7f9fe0" },
    { name: "Cline", logo: "/hmc/cline.svg", color: "#b8b1a4" },
    { name: "Claude Cowork", logo: "/hmc/claude-cowork.svg", color: "#c9906e" },
    { name: "OpenCode", logo: "/hmc/opencode.png", color: "#a7a39b" },
    { name: "Copilot CLI", logo: "/hmc/copilot.png", color: "#9d8fc4" },
    { name: "Windsurf", logo: "/hmc/windsurf.png", color: "#7fb8a8" },
    { name: "Goose", logo: "/hmc/goose.png", color: "#c4b48a" },
  ] satisfies Agent[],
  /** Checked and left out, each for lacking a machine-wide hook (per the README). */
  rejectedAgents: ["Aider", "Kiro", "Amazon Q", "Roo Code", "Continue"],
  features: [
    {
      title: "Awake only while an agent works",
      detail:
        "Hooks tell the app when a session starts and stops. The Mac holds while work is running and sleeps normally the rest of the time.",
    },
    {
      title: "Lid closed, no display attached",
      detail: "A privileged helper, registered through SMAppService, keeps the machine running with the lid shut.",
    },
    {
      title: "Usage and limits in the panel",
      detail:
        "Session and weekly limits for Claude Code, plus Codex and OpenCode spend, read from files each tool already keeps.",
    },
    {
      title: "One-click updates",
      detail:
        "The app downloads the new build, swaps itself and relaunches, then explains the release in a What's New window.",
    },
  ],
  decisions: [
    {
      title: "Wrote the requirement before the feature",
      detail:
        "Updating had to cost an existing user one click: no browser, no dragging to Applications. The installer was built to that rule.",
    },
    {
      title: "Rejected five agents, with reasons on record",
      detail:
        "Aider, Kiro, Amazon Q, Roo Code and Continue were checked and left out. Each one lacks a machine-wide hook, and the README says why.",
    },
    {
      title: "Fixed a support problem, not a symptom",
      detail:
        "Friends kept pressing Repair after each update. From 2.4.0 the app notices a new build on launch and repairs its own helper.",
    },
    {
      title: "Cut a feature users misread",
      detail:
        "A pace line under the limit bars read as more confusing than useful, so 2.5.0 removed it and kept the one count people understood.",
    },
  ],
  changelog: [
    { version: "2.5.4", date: "23 Sep", headline: "Native Claude Code installs detected" },
    { version: "2.5.3", date: "22 Sep", headline: "Moved agent folders are found" },
    { version: "2.5.2", date: "22 Sep", headline: "Bug fixes" },
    { version: "2.5.1", date: "22 Sep", headline: "Refresh means everything" },
    { version: "2.5.0", date: "22 Sep", headline: "Faster updates, clearer agents" },
    { version: "2.4.0", date: "21 Sep", headline: "Updates stop needing Repair" },
  ],
};

export type HoldMyCode = typeof holdMyCode;
