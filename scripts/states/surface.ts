import { HOURS, tariffSurface } from "../../src/content/cases";
import type { Label } from "../../src/engine/format";
import { cat, DIM, pack, PAPER, PAPER_2, rng, SIGNAL, type Built, type Point } from "./common";

/**
 * AdFlex: 19 Irish retail tariffs × 24 hours as a terraced surface (prices are
 * step functions of the hour, so the surface steps too). x = hour, z = plan
 * (cheapest at the front), y = c/kWh. Peak cells (≥ 37 c/kWh) are amber.
 */

const COUNT = 16384;
const XW = 8;
const ZD = 3.8;
const YH = 2.3;
const PEAK = 37;

export function surface(): Built {
  const r = rng(41);
  const { rows, min, max, peak } = tariffSurface;
  const nP = rows.length;
  const xOf = (h: number) => -XW / 2 + (h / 24) * XW;
  const zOf = (p: number) => ZD / 2 - (p / nP) * ZD;
  const yOf = (price: number) => -0.9 + ((price - min) / (max - min)) * YH;
  const pts: Point[] = [];

  const topN = 12600;
  const cliffN = 2200;
  const floorN = COUNT - topN - cliffN;

  for (let k = 0; k < topN; k++) {
    const u = r() * 24;
    const v = r() * nP;
    const p = rows[Math.floor(v)].prices[Math.floor(u)];
    pts.push({ x: xOf(u), y: yOf(p), z: zOf(v), cat: p >= PEAK ? 1 : 0 });
  }
  // vertical faces where the price steps between hours
  const steps: { h: number; p: number; a: number; b: number }[] = [];
  rows.forEach((row, pi) => {
    for (let h = 1; h < 24; h++) if (row.prices[h] !== row.prices[h - 1]) steps.push({ h, p: pi, a: row.prices[h - 1], b: row.prices[h] });
  });
  for (let k = 0; k < cliffN; k++) {
    const s = steps[Math.floor(r() * steps.length)];
    const t = r();
    const price = s.a + (s.b - s.a) * t;
    pts.push({ x: xOf(s.h), y: yOf(price), z: zOf(s.p + r()), cat: Math.max(s.a, s.b) >= PEAK ? 1 : 2 });
  }
  // floor: hour ticks every 3 hours plus the outline
  for (let k = 0; k < floorN; k++) {
    const kind = r();
    if (kind < 0.55) {
      const h = Math.floor(r() * 9) * 3;
      pts.push({ x: xOf(h), y: -1.0, z: zOf(r() * nP), cat: 3 });
    } else {
      const edge = r() < 0.5;
      pts.push(edge ? { x: xOf(r() * 24), y: -1.0, z: zOf(0) + 0.04, cat: 3 } : { x: xOf(24), y: -1.0, z: zOf(r() * nP), cat: 3 });
    }
  }

  const { anchors } = pack(pts, COUNT);
  const hh = (h: number) => `${String(h).padStart(2, "0")}:00`;
  const labels: Label[] = [
    ...[0, 8, 17, 23].map((h) => ({ text: hh(h), pos: [xOf(h + 0.5), -1.12, zOf(0) + 0.25] as [number, number, number], kind: "tick" })),
    { text: "cheapest plan", pos: [xOf(24) + 0.2, -1.0, zOf(0.5)], kind: "axis" },
    { text: "dearest plan", pos: [xOf(24) + 0.2, -1.0, zOf(nP - 0.5)], kind: "axis" },
    {
      text: `${hh(peak.hour)}–${hh(peak.hour + 2)} peak · ${peak.price.toFixed(2)} c/kWh`,
      pos: [xOf(peak.hour + 1), yOf(peak.price) + 0.3, zOf(rows.findIndex((x) => `${x.tariff.supplier} ${x.tariff.plan}` === peak.plan) + 0.5)],
      kind: "marker",
    },
  ];

  return {
    id: "surface",
    count: COUNT,
    anchors,
    categories: [
      cat({ name: "surface", color: PAPER_2, size: 0.02, alpha: 0.45, spread: 0.02, sweep: true }),
      cat({ name: "peak", color: SIGNAL, size: 0.022, alpha: 0.6, spread: 0.02, sweep: true, glow: 0.3 }),
      cat({ name: "cliff", color: PAPER, size: 0.016, alpha: 0.3, spread: 0.01, sweep: true }),
      cat({ name: "floor", color: DIM, size: 0.014, alpha: 0.6, spread: 0.004 }),
    ],
    camera: {
      center: [0.2, 0.1, 0],
      size: [XW + 0.6, YH + 1.4, ZD],
      yaw: -30,
      pitch: 30,
      fov: 32,
      desktop: [0.4, 0.14, 0.97, 0.86],
      mobile: [0.02, 0.1, 0.98, 0.44],
    },
    params: { sweep: 1 },
    labels,
  };
}

export { PAPER, HOURS };
