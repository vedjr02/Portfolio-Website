import { projectById } from "./projects";
import { nvidiaEvents, rejectedClaims, segmentQuarters } from "./data/nvidia";
import { tariffs, priceAt } from "./data/tariffs";

/**
 * Case-study rooms (chapter 03) and the in-progress system (chapter 04).
 * Tier-1 work only: NVIDIA, AdFlex, Meridian. Starbucks and GridPeer live in the Index.
 * Every number below is copied from a named source; see `sourceNote`.
 */

export type ProofPoint = { value: string; label: string };

export type Room = {
  id: "nvidia" | "adflex" | "meridian";
  eyebrow: string;
  title: string;
  claim: string;
  proof: ProofPoint[];
  links: { label: string; href: string }[];
  sourceNote: string;
  status: "Live" | "In progress";
};

const nvidia = projectById("nvidia")!;
const adflex = projectById("adflex")!;
const meridianProject = projectById("meridian")!;

/* ------------------------------------------------------------------ */
/* NVIDIA                                                               */
/* ------------------------------------------------------------------ */

/** Data Center first out-earned Gaming for good in the quarter ended 1 May 2022. */
export const nvidiaCrossover = (() => {
  const permanent = segmentQuarters.findIndex((q, i) => segmentQuarters.slice(i).every((x) => x.dataCenter > x.gaming));
  return segmentQuarters[permanent];
})();

export const chatGptLaunch = "2022-11-30";

export const nvidiaRoom: Room = {
  id: "nvidia",
  eyebrow: "Case study · 2006–2026",
  title: "NVIDIA, told only from filings",
  claim: "How a gaming GPU company became the backbone of the AI economy, with every event traced to a filing or primary report.",
  proof: [
    { value: String(nvidiaEvents.length), label: "sourced events across 20 years" },
    {
      value: "May 2022",
      label: "data centre out-earns gaming for good, six months before ChatGPT",
    },
    { value: String(rejectedClaims.length), label: "widely repeated claims rejected, with reasons" },
  ],
  links: [
    { label: "Open the case", href: nvidia.liveUrl! },
    { label: "Source", href: nvidia.repoUrl! },
  ],
  sourceNote: "SEC EDGAR filings, NVIDIA investor relations and wire reporting, compiled in the case repo (timeline.json, financials.json).",
  status: "Live",
};

export { nvidiaEvents, rejectedClaims, segmentQuarters };

/* ------------------------------------------------------------------ */
/* AdFlex × SEI                                                         */
/* ------------------------------------------------------------------ */

export const HOURS = Array.from({ length: 24 }, (_, h) => h);

/** Plans ordered by average daily price, cheapest first: the surface's depth axis. */
export const tariffSurface = (() => {
  const rows = tariffs.map((t) => {
    const prices = HOURS.map((h) => priceAt(t, h));
    return { tariff: t, prices, mean: prices.reduce((a, b) => a + b, 0) / prices.length };
  });
  rows.sort((a, b) => a.mean - b.mean);
  let peak = { price: 0, hour: 0, plan: "" };
  for (const r of rows)
    r.prices.forEach((p, h) => {
      if (p > peak.price) peak = { price: p, hour: h, plan: `${r.tariff.supplier} ${r.tariff.plan}` };
    });
  const all = rows.flatMap((r) => r.prices);
  return { rows, peak, min: Math.min(...all), max: Math.max(...all) };
})();

export const adflexRoom: Room = {
  id: "adflex",
  eyebrow: "Consulting · Sustainable Energy Ireland",
  title: "AdFlex: tariffs before decisions",
  claim: "My Master's consulting project with SEI: requirements, a KPI framework, and a pricing dashboard non-technical teams can use before they decide.",
  proof: [
    { value: "End to end", label: "requirements owned, from stakeholder asks to scope" },
    { value: "KPIs first", label: "agreed before any visual was built" },
    { value: String(tariffs.length), label: "Irish retail plans priced hour by hour, May 2026" },
  ],
  links: [{ label: "Open the dashboard", href: adflex.liveUrl! }],
  sourceNote: "Tariffs: Selectra.ie, verified May 2026, c/kWh excl. VAT, as used in the AdFlex dashboard. The repository is private client work.",
  status: "In progress",
};

/* ------------------------------------------------------------------ */
/* Meridian (in progress)                                               */
/* ------------------------------------------------------------------ */

export type ProcessNode = { id: string; label: string; lane: "A" | "O" | "W"; x: number; y: number; terminal?: boolean };
export type ProcessEdge = { from: string; to: string; weight: 1 | 2 | 3; loop?: boolean; bottleneck?: boolean };

/**
 * A simplified map of the BPI Challenge 2017 loan-application process: 13 of the
 * log's 26 activities. Node positions are a hand-checked left-to-right layout of
 * the flow Meridian mines; edge weights are relative (1–3), not counts. The only
 * numbers shown are the ones Meridian's own docs publish (07-PROGRESS-STATE.md).
 */
export const processMap: { nodes: ProcessNode[]; edges: ProcessEdge[] } = {
  nodes: [
    { id: "create", label: "A_Create Application", lane: "A", x: 0, y: 0 },
    { id: "submitted", label: "A_Submitted", lane: "A", x: 1, y: -0.9 },
    { id: "concept", label: "A_Concept", lane: "A", x: 2, y: 0 },
    { id: "accepted", label: "A_Accepted", lane: "A", x: 3, y: 0 },
    { id: "offer", label: "O_Create Offer", lane: "O", x: 4, y: 0.9 },
    { id: "created", label: "O_Created", lane: "O", x: 5, y: 0.9 },
    { id: "sent", label: "O_Sent", lane: "O", x: 6, y: 0.9 },
    { id: "complete", label: "A_Complete", lane: "A", x: 7, y: 0 },
    { id: "validating", label: "A_Validating", lane: "A", x: 8.2, y: 0 },
    { id: "incomplete", label: "A_Incomplete", lane: "A", x: 8.2, y: -1.3 },
    { id: "pending", label: "A_Pending", lane: "A", x: 9.6, y: 0.6, terminal: true },
    { id: "denied", label: "A_Denied", lane: "A", x: 9.6, y: -0.6, terminal: true },
    { id: "cancelled", label: "A_Cancelled", lane: "A", x: 8.2, y: 1.6, terminal: true },
  ],
  edges: [
    { from: "create", to: "submitted", weight: 2 },
    { from: "create", to: "concept", weight: 2 },
    { from: "submitted", to: "concept", weight: 2 },
    { from: "concept", to: "accepted", weight: 3 },
    { from: "accepted", to: "offer", weight: 3 },
    { from: "offer", to: "created", weight: 3 },
    { from: "created", to: "offer", weight: 1, loop: true },
    { from: "created", to: "sent", weight: 3 },
    { from: "sent", to: "complete", weight: 3 },
    { from: "complete", to: "validating", weight: 3, bottleneck: true },
    { from: "complete", to: "cancelled", weight: 2 },
    { from: "validating", to: "incomplete", weight: 2, loop: true },
    { from: "incomplete", to: "validating", weight: 2, loop: true },
    { from: "validating", to: "pending", weight: 3 },
    { from: "validating", to: "denied", weight: 1 },
  ],
};

export const meridianRoom: Room = {
  id: "meridian",
  eyebrow: "In progress · Process mining",
  title: "Meridian: how a loan process really runs",
  claim: "Process mining on 31,509 real loan applications. Rebuild the process as it runs, check it against a reference model, and find where the time goes.",
  proof: [
    { value: "7.2 days", label: "median wait from A_Complete to A_Validating, 23.7% of all case time" },
    { value: "51.5%", label: "of cases repeat an activity; A_Incomplete ⇄ A_Validating is the biggest loop" },
    { value: "610 of 5,623", label: "variants cover 80% of cases" },
  ],
  links: [{ label: "Source", href: meridianProject.repoUrl! }],
  sourceNote: "BPI Challenge 2017 event log (4TU.ResearchData). Figures from Meridian's measured results, complete-only log, Sep 2026.",
  status: "In progress",
};

export const rooms = { nvidia: nvidiaRoom, adflex: adflexRoom, meridian: meridianRoom };
