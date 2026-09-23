import { FIELD } from "../../src/engine/noise";
import { cat, DIM, DUST, gaussian, pack, PAPER, PAPER_2, rng, SIGNAL, type Built, type Point } from "./common";

/* ---------------------------------------------------------------- */
/* 00 noise — procedural in the shader; only metadata ships           */
/* ---------------------------------------------------------------- */

export function noise(): Built {
  const c = FIELD.min.map((v, i) => (v + FIELD.max[i]) / 2) as [number, number, number];
  return {
    id: "noise",
    count: 0,
    anchors: new Float32Array(0),
    categories: [
      cat({ name: "dust", color: "#8a8490", size: 0.02, alpha: 0.42, spread: 0 }),
      cat({ name: "lens-grid", color: SIGNAL, size: 0.026, alpha: 0.9, spread: 0, glow: 0.4 }),
    ],
    camera: {
      center: [c[0], c[1], 0],
      size: [11, 6.2, 1],
      yaw: 0,
      pitch: 0,
      fov: 40,
      desktop: [0, 0, 1, 1],
      mobile: [0, 0, 1, 1],
    },
    params: { lens: 1 },
    labels: [],
  };
}

/* ---------------------------------------------------------------- */
/* 01 histogram → columns                                            */
/* ---------------------------------------------------------------- */

const H_COUNT = 16384;
const BINS = 34;
const SPAN = 3.4; // ±σ shown
const WIDTH = 6.6; // world width of the histogram
const TALL = 2.7; // world height of the tallest bar

export function histogram(): Built {
  const r = rng(7);
  const values = Array.from({ length: H_COUNT - 1024 }, () => Math.max(-SPAN + 1e-3, Math.min(SPAN - 1e-3, gaussian(r))));
  const binOf = (v: number) => Math.floor(((v + SPAN) / (2 * SPAN)) * BINS);
  const counts = new Array(BINS).fill(0);
  values.forEach((v) => counts[binOf(v)]++);
  const max = Math.max(...counts);
  const binW = WIDTH / BINS;
  const seen = new Array(BINS).fill(0);
  const pts: Point[] = values.map((v) => {
    const b = binOf(v);
    const k = seen[b]++;
    const x = -WIDTH / 2 + (b + 0.5) * binW + (r() - 0.5) * binW * 0.78;
    const y = -TALL / 2 + ((k + r()) / max) * TALL;
    const z = (r() - 0.5) * 0.35;
    return { x, y, z, cat: Math.abs(v) < 1 ? 1 : 0 };
  });
  // baseline axis with σ ticks
  for (let i = 0; i < 1024; i++) {
    const tick = i % 8 === 0;
    const s = Math.round(((i % 7) - 3) * 1);
    pts.push(
      tick
        ? { x: (s / SPAN) * (WIDTH / 2), y: -TALL / 2 - 0.06 - r() * 0.1, z: 0, cat: 2 }
        : { x: (r() - 0.5) * WIDTH * 1.04, y: -TALL / 2 - 0.05, z: (r() - 0.5) * 0.02, cat: 2 }
    );
  }
  const { anchors } = pack(pts, H_COUNT);
  return {
    id: "histogram",
    count: H_COUNT,
    anchors,
    categories: [
      cat({ name: "bar", color: PAPER_2, size: 0.022, alpha: 0.5, spread: 0.012 }),
      cat({ name: "within-1σ", color: SIGNAL, size: 0.022, alpha: 0.55, spread: 0.012 }),
      cat({ name: "axis", color: DIM, size: 0.016, alpha: 0.7, spread: 0.004 }),
    ],
    camera: {
      center: [0, 0, 0],
      size: [WIDTH * 1.08, TALL * 1.15, 0.5],
      yaw: -8,
      pitch: 4,
      fov: 32,
      desktop: [0.47, 0.14, 0.95, 0.86],
      mobile: [0.06, 0.12, 0.94, 0.42],
    },
    labels: [
      { text: "−3σ", pos: [-(3 / SPAN) * (WIDTH / 2), -TALL / 2 - 0.3, 0], kind: "tick" },
      { text: "mean", pos: [0, -TALL / 2 - 0.3, 0], kind: "tick" },
      { text: "+3σ", pos: [(3 / SPAN) * (WIDTH / 2), -TALL / 2 - 0.3, 0], kind: "tick" },
    ],
  };
}

export const COLUMN_CENTERS = [-3.3, -1.1, 1.1, 3.3];

export function columns(): Built {
  const r = rng(8);
  const per = H_COUNT / 4;
  const colW = 1.55;
  const colH = 3.0;
  const pts: Point[] = [];
  COLUMN_CENTERS.forEach((cx, c) => {
    // an ordered lattice: sorted data, not noise
    const nx = 26;
    const ny = Math.ceil(per / (nx * 2));
    let n = 0;
    for (let layer = 0; layer < 2 && n < per; layer++)
      for (let j = 0; j < ny && n < per; j++)
        for (let i = 0; i < nx && n < per; i++, n++) {
          pts.push({
            x: cx - colW / 2 + ((i + 0.5) / nx) * colW,
            y: -colH / 2 + ((j + 0.5) / ny) * colH,
            z: layer * 0.12 - 0.06 + (r() - 0.5) * 0.004,
            cat: c === 3 ? 1 : 0,
            item: c,
          });
        }
  });
  const { anchors } = pack(pts, H_COUNT);
  return {
    id: "columns",
    count: H_COUNT,
    anchors,
    categories: [
      cat({ name: "column", color: PAPER, size: 0.018, alpha: 0.32, spread: 0.008 }),
      cat({ name: "check", color: SIGNAL, size: 0.018, alpha: 0.38, spread: 0.008 }),
    ],
    camera: {
      center: [0, 0, 0],
      size: [8.8, colH * 1.02, 0.4],
      yaw: 0,
      pitch: 0,
      fov: 30,
      desktop: [0.04, 0.2, 0.96, 0.62],
      mobile: [0.05, 0.16, 0.95, 0.5],
      anchor: "columns",
    },
    items: COLUMN_CENTERS.map((x, id) => ({ id, pos: [x, 0, 0], r: colW / 2 })),
    labels: [],
  };
}

/* ---------------------------------------------------------------- */
/* 07 contact — everything converges to one point                    */
/* ---------------------------------------------------------------- */

export function point(): Built {
  const r = rng(11);
  const n = 4096;
  const pts: Point[] = [];
  for (let i = 0; i < n; i++) {
    if (i < 3000) {
      const s = 0.035 + r() * 0.05;
      pts.push({ x: gaussian(r) * s, y: gaussian(r) * s, z: gaussian(r) * s, cat: 0 });
    } else {
      const a = r() * Math.PI * 2;
      const d = 0.18 + r() * 0.35;
      pts.push({ x: Math.cos(a) * d, y: Math.sin(a) * d, z: (r() - 0.5) * 0.1, cat: 1 });
    }
  }
  const { anchors } = pack(pts, n);
  return {
    id: "point",
    count: n,
    anchors,
    categories: [
      cat({ name: "core", color: PAPER, size: 0.012, alpha: 0.22, spread: 0.02, glow: 1 }),
      cat({ name: "halo", color: SIGNAL, size: 0.01, alpha: 0.08, spread: 0.08 }),
    ],
    camera: {
      center: [0, 0, 0],
      size: [1.2, 1.2, 1.2],
      yaw: 0,
      pitch: 0,
      fov: 35,
      desktop: [0.5, 0.18, 0.95, 0.62],
      mobile: [0.2, 0.08, 0.8, 0.34],
    },
    labels: [],
  };
}

export { PAPER };
