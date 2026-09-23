import { projects } from "../../src/content/projects";
import type { Label, Vec3 } from "../../src/engine/format";
import { allocate, ball, cat, DUST, pack, PAPER, PAPER_2, rng, type Built, type Point } from "./common";

/**
 * Index: 21 clusters, one per project, radius by scope tier (never by traffic).
 * Layout is a small offline force relaxation inside a wide band, ordered newest
 * left to right so the Index reads like a timeline of work.
 */

const COUNT = 16384;
const RADIUS: Record<1 | 2 | 3, number> = { 1: 0.22, 2: 0.33, 3: 0.46 };
const BAND = { w: 9.6, h: 2.9 };

export function layoutClusters(): { pos: [number, number][]; rad: number[] } {
  const r = rng(61);
  const order = projects.map((p, i) => ({ p, i })).sort((a, b) => b.p.sort.localeCompare(a.p.sort));
  const rad = projects.map((p) => RADIUS[p.scope]);
  const pos: [number, number][] = projects.map(() => [0, 0]);
  order.forEach(({ i }, k) => {
    pos[i] = [-BAND.w / 2 + 0.5 + (k / (order.length - 1)) * (BAND.w - 1), (r() - 0.5) * BAND.h * 0.8];
  });
  // relax: separate overlaps, pull gently to each cluster's time slot, stay in the band
  for (let it = 0; it < 600; it++) {
    for (let a = 0; a < pos.length; a++)
      for (let b = a + 1; b < pos.length; b++) {
        const dx = pos[b][0] - pos[a][0];
        const dy = pos[b][1] - pos[a][1];
        const d = Math.hypot(dx, dy) || 1e-6;
        const min = rad[a] + rad[b] + 0.12;
        if (d < min) {
          const push = (min - d) / 2;
          pos[a][0] -= (dx / d) * push;
          pos[a][1] -= (dy / d) * push;
          pos[b][0] += (dx / d) * push;
          pos[b][1] += (dy / d) * push;
        }
      }
    order.forEach(({ i }, k) => {
      const slot = -BAND.w / 2 + 0.5 + (k / (order.length - 1)) * (BAND.w - 1);
      pos[i][0] += (slot - pos[i][0]) * 0.02;
      pos[i][1] += (0 - pos[i][1]) * 0.004;
      pos[i][1] = Math.max(-BAND.h / 2 + rad[i], Math.min(BAND.h / 2 - rad[i], pos[i][1]));
    });
  }
  return { pos, rad };
}

export function clusters(): Built {
  const r = rng(62);
  const { pos, rad } = layoutClusters();
  const alloc = allocate(rad.map((x) => x * x), COUNT, 200);
  const pts: Point[] = [];
  projects.forEach((p, i) => {
    const c = p.status === "Live" ? 0 : p.status === "In progress" ? 1 : 2;
    for (let k = 0; k < alloc[i]; k++) {
      const shell = r() < 0.55;
      let v: Vec3;
      if (shell) {
        const u = r() * 2 - 1;
        const a = r() * Math.PI * 2;
        const s = Math.sqrt(1 - u * u);
        v = [Math.cos(a) * s * rad[i], Math.sin(a) * s * rad[i], u * rad[i]];
      } else v = ball(r, rad[i] * 0.85);
      pts.push({ x: pos[i][0] + v[0], y: pos[i][1] + v[1], z: v[2], cat: c, item: i });
    }
  });
  const { anchors } = pack(pts, COUNT);
  const labels: Label[] = projects.map((p, i) => ({
    text: p.name,
    pos: [pos[i][0], pos[i][1] + rad[i] + 0.14, 0],
    kind: p.featured || p.scope === 3 ? "cluster-major" : "cluster",
    item: i,
  }));
  return {
    id: "clusters",
    count: COUNT,
    anchors,
    categories: [
      cat({ name: "live", color: PAPER, size: 0.02, alpha: 0.55, spread: 0.02 }),
      cat({ name: "in-progress", color: PAPER_2, size: 0.02, alpha: 0.45, spread: 0.02 }),
      cat({ name: "built", color: DUST, size: 0.02, alpha: 0.55, spread: 0.02 }),
    ],
    camera: {
      center: [0, 0, 0],
      size: [BAND.w + 0.6, BAND.h + 0.5, 1],
      yaw: 0,
      pitch: 0,
      fov: 30,
      desktop: [0.03, 0.14, 0.97, 0.6],
      mobile: [0.02, 0.1, 0.98, 0.42],
    },
    labels,
    items: projects.map((_, i) => ({ id: i, pos: [pos[i][0], pos[i][1], 0], r: rad[i] })),
  };
}
