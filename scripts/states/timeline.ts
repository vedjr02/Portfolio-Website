import { nvidiaCrossover, nvidiaEvents, rejectedClaims, rejectedRefDates, chatGptLaunch } from "../../src/content/cases";
import type { NvidiaCategory } from "../../src/content/data/nvidia";
import type { Label, Vec3 } from "../../src/engine/format";
import { ball, cat, DIM, pack, PAPER, PAPER_2, REJECTED, rng, SIGNAL, type Built, type Point } from "./common";

/**
 * NVIDIA 2006–2026: 68 sourced events on six swimlanes (one per event category),
 * a year axis, the data-centre crossover (quarter ended 1 May 2022) as an amber
 * rule, and the 15 rejected claims waiting above the lanes. In the second state
 * the claims fall into a bin below; the third state is a camera push-in.
 */

const COUNT = 16384;
const X0 = -4.6;
const X1 = 4.6;
const T0 = Date.UTC(2006, 0, 1);
const T1 = Date.UTC(2026, 11, 31);
export const dateX = (iso: string) => X0 + ((Date.parse(`${iso}T00:00:00Z`) - T0) / (T1 - T0)) * (X1 - X0);

export const LANES: { id: NvidiaCategory; label: string; y: number }[] = [
  { id: "product", label: "Product", y: 1.05 },
  { id: "ecosystem", label: "Ecosystem", y: 0.6 },
  { id: "corporate", label: "Corporate", y: 0.15 },
  { id: "competitive", label: "Competitive", y: -0.3 },
  { id: "regulatory", label: "Regulatory", y: -0.75 },
  { id: "market-shock", label: "Market shock", y: -1.2 },
];
const AXIS_Y = -1.62;
const CLAIMS_Y = 1.72;
const BIN = { x: 2.7, y: -2.8, w: 3.4, h: 0.5 };
const R_EVENT = 0.05;

export function timeline(): Built[] {
  const r = rng(31);
  const pts: Point[] = [];
  const items: { id: number; pos: Vec3; r: number }[] = [];
  const binItems: { id: number; pos: Vec3; r: number }[] = [];

  // event positions with collision stacking inside a lane
  const placed = new Map<string, Vec3>();
  for (const lane of LANES) {
    const evs = nvidiaEvents.filter((e) => e.category === lane.id).sort((a, b) => a.date.localeCompare(b.date));
    const stack: number[] = [];
    evs.forEach((e) => {
      const x = dateX(e.date);
      let level = 0;
      while (stack[level] !== undefined && x - stack[level] < R_EVENT * 2.3) level++;
      stack[level] = x;
      const y = lane.y + (level % 2 ? -1 : 1) * Math.ceil(level / 2) * R_EVENT * 2.1;
      placed.set(e.id, [x, y, 0]);
    });
  }

  // budget: axis 1800, crossover 900, claims 15×110, events share the rest
  const axisN = 1800;
  const crossN = 900;
  const claimN = 110;
  const eventN = Math.floor((COUNT - axisN - crossN - claimN * rejectedClaims.length) / nvidiaEvents.length);

  nvidiaEvents.forEach((e, i) => {
    const [x, y] = placed.get(e.id)!;
    items.push({ id: i, pos: [x, y, 0], r: R_EVENT * 1.4 });
    const chat = e.date === chatGptLaunch;
    for (let k = 0; k < eventN; k++) {
      const [bx, by, bz] = ball(r, R_EVENT);
      pts.push({ x: x + bx, y: y + by, z: bz, cat: chat ? 3 : 0, item: i });
    }
  });

  // axis with year ticks
  for (let k = 0; k < axisN; k++) {
    const tick = k % 6 === 0;
    if (tick) {
      const year = 2006 + (Math.floor(k / 6) % 21);
      const x = dateX(`${year}-01-01`);
      pts.push({ x: x + (r() - 0.5) * 0.004, y: AXIS_Y - r() * (year % 5 === 0 ? 0.14 : 0.07), z: 0, cat: 1 });
    } else {
      pts.push({ x: X0 + r() * (X1 - X0), y: AXIS_Y + (r() - 0.5) * 0.006, z: (r() - 0.5) * 0.01, cat: 1 });
    }
  }
  // lane guides (very faint) are part of the axis category
  // crossover rule, quarter ended 1 May 2022
  const cx = dateX(nvidiaCrossover.end);
  for (let k = 0; k < crossN; k++) {
    pts.push({ x: cx + (r() - 0.5) * 0.012, y: AXIS_Y + r() * (LANES[0].y + 0.35 - AXIS_Y), z: (r() - 0.5) * 0.01, cat: 2 });
  }

  // rejected claims: waiting above the lanes at the date they refer to…
  const claimPos: Vec3[] = rejectedRefDates.map((d, i) => {
    let x = dateX(d);
    // nudge overlapping claims apart
    for (let j = 0; j < i; j++) if (Math.abs(dateX(rejectedRefDates[j]) - x) < 0.1) x += 0.06;
    return [x, CLAIMS_Y + (i % 2) * 0.13, 0];
  });
  // …and in the bin once they fall (a tidy 5 × 3 pile, bottom right)
  const binPos: Vec3[] = rejectedClaims.map((_, i) => [
    BIN.x - BIN.w / 2 + ((i % 5) + 0.5) * (BIN.w / 5),
    BIN.y + Math.floor(i / 5) * 0.2,
    0,
  ]);

  const base = pts.slice();
  const fallen = pts.slice();
  rejectedClaims.forEach((_, i) => {
    const id = nvidiaEvents.length + i;
    items.push({ id, pos: claimPos[i], r: R_EVENT * 1.4 });
    binItems.push({ id, pos: binPos[i], r: R_EVENT * 1.4 });
    for (let k = 0; k < claimN; k++) {
      const [bx, by, bz] = ball(r, R_EVENT * 0.9);
      base.push({ x: claimPos[i][0] + bx, y: claimPos[i][1] + by, z: bz, cat: 4, item: id });
      fallen.push({ x: binPos[i][0] + bx, y: binPos[i][1] + by, z: bz, cat: 5, item: id });
    }
  });

  const categories = [
    cat({ name: "event", color: PAPER, size: 0.018, alpha: 0.4, spread: 0.02 }),
    cat({ name: "axis", color: DIM, size: 0.016, alpha: 0.75, spread: 0.004 }),
    cat({ name: "crossover", color: SIGNAL, size: 0.02, alpha: 0.7, spread: 0.006, glow: 0.5 }),
    cat({ name: "chatgpt", color: PAPER, size: 0.02, alpha: 0.45, spread: 0.02 }),
    cat({ name: "claim", color: PAPER_2, size: 0.018, alpha: 0.18, spread: 0.02 }),
    cat({ name: "rejected", color: REJECTED, size: 0.018, alpha: 0.5, spread: 0.02 }),
  ];

  const years: Label[] = [2006, 2010, 2014, 2018, 2022, 2026].map((y) => ({
    text: String(y),
    pos: [dateX(`${y}-01-01`), AXIS_Y - 0.3, 0],
    kind: "tick",
  }));
  const lanes: Label[] = LANES.map((l) => ({ text: l.label, pos: [X0 - 0.12, l.y, 0], kind: "lane" }));
  const crossLabel: Label = { text: "May 2022 · data centre passes gaming for good", pos: [cx + 0.08, LANES[0].y + 0.45, 0], kind: "marker" };
  const chat = nvidiaEvents.find((e) => e.date === chatGptLaunch)!;
  const chatLabel: Label = { text: "Nov 2022 · ChatGPT", pos: [placed.get(chat.id)![0] + 0.1, LANES[LANES.length - 1].y - 0.2, 0], kind: "marker" };

  const camTimeline = {
    center: [0, 0.05, 0] as Vec3,
    size: [X1 - X0 + 0.9, 4.1, 0.5] as Vec3,
    yaw: 0,
    pitch: 0,
    fov: 30,
    desktop: [0.03, 0.34, 0.97, 0.92] as [number, number, number, number],
    mobile: [0.02, 0.1, 0.98, 0.42] as [number, number, number, number],
  };

  // one shared order so only the claims move between the two states
  const order = base.map((_, i) => i).sort((i, j) => base[i].x - base[j].x || base[i].y - base[j].y);
  const a = pack(order.map((i) => base[i]), COUNT, { sort: false });
  const b = pack(order.map((i) => fallen[i]), COUNT, { sort: false });
  return [
    {
      id: "timeline",
      count: COUNT,
      anchors: a.anchors,
      categories,
      camera: camTimeline,
      labels: [...years, ...lanes, crossLabel, chatLabel, { text: "Unverified claims", pos: [X0 - 0.12, CLAIMS_Y, 0], kind: "lane" }],
      items,
    },
    {
      id: "timeline-rejected",
      count: COUNT,
      anchors: b.anchors,
      categories,
      camera: { ...camTimeline, center: [0, -0.45, 0], size: [X1 - X0 + 0.9, 5.2, 0.5], desktop: [0.03, 0.12, 0.97, 0.72], mobile: [0.02, 0.08, 0.98, 0.46] },
      labels: [...years, ...lanes, crossLabel, { text: `Rejected · ${rejectedClaims.length} claims`, pos: [BIN.x - BIN.w / 2, BIN.y - 0.28, 0], kind: "bin" }],
      items: [...items.filter((it) => it.id < nvidiaEvents.length), ...binItems],
    },
    {
      id: "crossover",
      source: "timeline-rejected",
      count: COUNT,
      anchors: b.anchors,
      categories: categories.map((c) => (c.name === "crossover" ? { ...c, alpha: 0.95, glow: 1 } : c.name === "event" ? { ...c, alpha: 0.4 } : c)),
      camera: {
        center: [cx - 0.1, -0.1, 0],
        size: [2.6, 3.4, 0.5],
        yaw: -14,
        pitch: 4,
        fov: 30,
        desktop: [0.45, 0.12, 0.96, 0.8],
        mobile: [0.05, 0.1, 0.95, 0.46],
      },
      labels: [crossLabel, chatLabel],
      items: items.filter((it) => it.id < nvidiaEvents.length),
    },
  ];
}
