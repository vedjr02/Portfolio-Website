import type { CameraSpec, CategoryDef, Label, StateParams, Vec3 } from "../../src/engine/format";
import { TEX_WIDTH, packW } from "../../src/engine/format";

/** What a builder returns. Positions are world units, y up, camera looking down -z. */
export type Built = {
  id: string;
  count: number;
  anchors: Float32Array;
  flow?: Float32Array;
  categories: CategoryDef[];
  camera: CameraSpec;
  params?: StateParams;
  labels?: Label[];
  items?: { id: number; pos: Vec3; r: number }[];
  /** reuse another state's anchor file (camera or parameter change only) */
  source?: string;
  /** particles per anchor (see StateMeta.density) */
  density?: number;
};

export type Point = { x: number; y: number; z: number; cat: number; item?: number; fx?: number; fy?: number; fz?: number; phase?: number };

/** mulberry32: small, fast, deterministic. */
export function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function gaussian(r: () => number) {
  const u = Math.max(1e-9, r());
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * r());
}

/** Round up to a whole number of texture rows. */
export const roundCount = (n: number) => Math.ceil(n / TEX_WIDTH) * TEX_WIDTH;

/**
 * Pack points into anchor (+ flow) arrays. Points are sorted by x (then y) so the
 * same particle index sits at a similar horizontal position in every state: shapes
 * pour sideways into each other instead of scrambling.
 */
export function pack(points: Point[], count: number, opts: { sort?: boolean; flow?: boolean } = {}) {
  const { sort = true, flow = false } = opts;
  if (points.length > count) points = points.slice(0, count);
  const r = rng(99);
  while (points.length < count) points.push({ ...points[Math.floor(r() * points.length)] });
  if (sort) points.sort((a, b) => a.x - b.x || a.y - b.y);
  const anchors = new Float32Array(count * 4);
  const f = flow ? new Float32Array(count * 4) : undefined;
  points.forEach((p, i) => {
    anchors[i * 4] = p.x;
    anchors[i * 4 + 1] = p.y;
    anchors[i * 4 + 2] = p.z;
    anchors[i * 4 + 3] = packW(p.item ?? 0, p.cat);
    if (f) {
      f[i * 4] = p.fx ?? p.x;
      f[i * 4 + 1] = p.fy ?? p.y;
      f[i * 4 + 2] = p.fz ?? p.z;
      f[i * 4 + 3] = p.phase ?? 0;
    }
  });
  return { anchors, flow: f };
}

/** Distribute `total` across weights, at least `min` each, summing exactly to total. */
export function allocate(weights: number[], total: number, min = 0): number[] {
  const sum = weights.reduce((a, b) => a + b, 0);
  const out = weights.map((w) => Math.max(min, Math.floor((w / sum) * total)));
  let diff = total - out.reduce((a, b) => a + b, 0);
  for (let i = 0; diff !== 0; i = (i + 1) % out.length) {
    const d = Math.sign(diff);
    if (out[i] + d >= min) {
      out[i] += d;
      diff -= d;
    }
  }
  return out;
}

/** Uniform point in a disc (in the xy plane). */
export function disc(r: () => number, radius: number): [number, number] {
  const a = r() * Math.PI * 2;
  const d = Math.sqrt(r()) * radius;
  return [Math.cos(a) * d, Math.sin(a) * d];
}

/** Uniform point in a ball. */
export function ball(r: () => number, radius: number): Vec3 {
  const u = r() * 2 - 1;
  const a = r() * Math.PI * 2;
  const s = Math.sqrt(1 - u * u);
  const d = Math.cbrt(r()) * radius;
  return [Math.cos(a) * s * d, Math.sin(a) * s * d, u * d];
}

export const PAPER = "#efeae2";
export const PAPER_2 = "#b8b2a8";
export const DUST = "#6f6a73";
export const SIGNAL = "#f2b64a";
export const REJECTED = "#c4625a";
export const DIM = "#4a4650";

export function cat(def: Partial<CategoryDef> & { name: string }): CategoryDef {
  return { color: PAPER, size: 0.02, alpha: 0.6, spread: 0.01, ...def };
}
