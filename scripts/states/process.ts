import { processMap } from "../../src/content/cases";
import type { Label, Vec3 } from "../../src/engine/format";
import { allocate, cat, DIM, disc, pack, PAPER, PAPER_2, rng, SIGNAL, type Built, type Point } from "./common";

/**
 * Meridian: a simplified BPI 2017 process map. Nodes are activities, edges are
 * directly-follows flows, and tokens (flow particles) are cases moving through.
 * A_Validating congests: tokens slow as they reach it and a glowing queue builds.
 */

const COUNT = 16384;
const SX = 0.92;
const SY = 1.1;
const R_NODE = 0.2;

export function process(): Built {
  const r = rng(51);
  const pos = new Map<string, Vec3>();
  processMap.nodes.forEach((n) => pos.set(n.id, [(n.x - 4.8) * SX, n.y * SY, 0]));
  const pts: Point[] = [];

  const nodeN = 4200;
  const edgeN = 3000;
  const queueN = 900;
  const tokenN = COUNT - nodeN - edgeN - queueN;

  // nodes: a bright ring and a faint fill; the bottleneck is amber
  const nodeAlloc = allocate(processMap.nodes.map((n) => (n.id === "validating" ? 2 : 1)), nodeN);
  processMap.nodes.forEach((n, i) => {
    const [x, y] = pos.get(n.id)!;
    const c = n.id === "validating" ? 2 : n.terminal ? 1 : 0;
    const rad = n.id === "validating" ? R_NODE * 1.35 : R_NODE;
    for (let k = 0; k < nodeAlloc[i]; k++) {
      const ring = r() < 0.6;
      if (ring) {
        const a = r() * Math.PI * 2;
        pts.push({ x: x + Math.cos(a) * rad, y: y + Math.sin(a) * rad, z: (r() - 0.5) * 0.03, cat: c, item: i });
      } else {
        const [dx, dy] = disc(r, rad * 0.92);
        pts.push({ x: x + dx, y: y + dy, z: (r() - 0.5) * 0.06, cat: c === 2 ? 2 : 3, item: i });
      }
    }
  });

  // edges: straight segments between node rims; paired directions sit side by side
  const seg = processMap.edges.map((e) => {
    const a = pos.get(e.from)!;
    const b = pos.get(e.to)!;
    const dx = b[0] - a[0];
    const dy = b[1] - a[1];
    const len = Math.hypot(dx, dy);
    const ux = dx / len;
    const uy = dy / len;
    const paired = processMap.edges.some((o) => o.from === e.to && o.to === e.from);
    const off = paired ? 0.07 : 0;
    const nx = -uy * off;
    const ny = ux * off;
    const ra = e.from === "validating" ? R_NODE * 1.35 : R_NODE;
    const rb = e.to === "validating" ? R_NODE * 1.35 : R_NODE;
    return {
      e,
      s: [a[0] + ux * ra + nx, a[1] + uy * ra + ny] as [number, number],
      t: [b[0] - ux * rb + nx, b[1] - uy * rb + ny] as [number, number],
    };
  });
  const edgeAlloc = allocate(seg.map((s) => s.e.weight * Math.hypot(s.t[0] - s.s[0], s.t[1] - s.s[1])), edgeN, 20);
  seg.forEach((s, i) => {
    for (let k = 0; k < edgeAlloc[i]; k++) {
      const t = r();
      pts.push({ x: s.s[0] + (s.t[0] - s.s[0]) * t, y: s.s[1] + (s.t[1] - s.s[1]) * t, z: (r() - 0.5) * 0.01, cat: 4 });
    }
  });

  // tokens flow along edges, more on heavier edges
  const tokenAlloc = allocate(seg.map((s) => s.e.weight ** 1.5), tokenN, 40);
  seg.forEach((s, i) => {
    const bottleneck = !!s.e.bottleneck;
    for (let k = 0; k < tokenAlloc[i]; k++) {
      pts.push({
        x: s.s[0],
        y: s.s[1],
        z: (r() - 0.5) * 0.02,
        fx: s.t[0],
        fy: s.t[1],
        fz: (r() - 0.5) * 0.02,
        phase: r(),
        cat: bottleneck ? 6 : s.e.loop ? 7 : 5,
      });
    }
  });

  // the queue: cases waiting in front of A_Validating
  const bn = seg.find((s) => s.e.bottleneck)!;
  const qdx = bn.t[0] - bn.s[0];
  const qdy = bn.t[1] - bn.s[1];
  const qlen = Math.hypot(qdx, qdy);
  for (let k = 0; k < queueN; k++) {
    const back = Math.pow(r(), 1.8) * Math.min(0.55, qlen * 0.6);
    const [jx, jy] = disc(r, 0.05 + back * 0.12);
    pts.push({ x: bn.t[0] - (qdx / qlen) * back + jx, y: bn.t[1] - (qdy / qlen) * back + jy, z: (r() - 0.5) * 0.05, cat: 8 });
  }

  const { anchors, flow } = pack(pts, COUNT, { flow: true });
  const labels: Label[] = processMap.nodes.map((n) => {
    const [x, y] = pos.get(n.id)!;
    const below = n.y <= 0 && n.id !== "incomplete";
    return { text: n.label, pos: [x, y + (below ? -0.38 : 0.38), 0] as Vec3, kind: n.id === "validating" ? "bottleneck" : "node" };
  });

  const xs = [...pos.values()].map((p) => p[0]);
  const ys = [...pos.values()].map((p) => p[1]);
  const cx = (Math.min(...xs) + Math.max(...xs)) / 2;
  const cy = (Math.min(...ys) + Math.max(...ys)) / 2;

  return {
    id: "process",
    count: COUNT,
    anchors,
    flow,
    categories: [
      cat({ name: "node", color: PAPER, size: 0.018, alpha: 0.6, spread: 0.008 }),
      cat({ name: "terminal", color: PAPER_2, size: 0.018, alpha: 0.45, spread: 0.008 }),
      cat({ name: "bottleneck", color: SIGNAL, size: 0.022, alpha: 0.75, spread: 0.01, glow: 0.8 }),
      cat({ name: "node-fill", color: PAPER_2, size: 0.016, alpha: 0.12, spread: 0.02 }),
      cat({ name: "edge", color: DIM, size: 0.013, alpha: 0.55, spread: 0.003 }),
      cat({ name: "token", color: PAPER, size: 0.022, alpha: 0.75, spread: 0.01, flow: { speed: 0.11 } }),
      cat({ name: "token-bottleneck", color: SIGNAL, size: 0.022, alpha: 0.8, spread: 0.01, flow: { speed: 0.07, congest: 3.2 } }),
      cat({ name: "token-rework", color: PAPER_2, size: 0.02, alpha: 0.6, spread: 0.01, flow: { speed: 0.09 } }),
      cat({ name: "queue", color: SIGNAL, size: 0.02, alpha: 0.55, spread: 0.02, glow: 0.6 }),
    ],
    camera: {
      center: [cx, cy, 0],
      size: [Math.max(...xs) - Math.min(...xs) + 1.2, Math.max(...ys) - Math.min(...ys) + 1.1, 0.4],
      yaw: 0,
      pitch: 0,
      fov: 28,
      desktop: [0.34, 0.2, 0.97, 0.8],
      mobile: [0.02, 0.14, 0.98, 0.46],
    },
    labels,
    items: processMap.nodes.map((n, i) => ({ id: i, pos: pos.get(n.id)!, r: R_NODE })),
  };
}
