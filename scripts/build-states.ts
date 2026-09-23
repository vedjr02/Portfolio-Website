/**
 * Precompute every particle state: `npm run states`.
 * Writes public/states/<id>.bin.gz (half-float anchors + flow) and manifest.json.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { gzipSync } from "node:zlib";
import { encodeState, MAX_CATEGORIES, VERSION, type Manifest, type StateMeta } from "../src/engine/format";
import type { Built } from "./states/common";
import { columns, histogram, noise, point } from "./states/basic";
import { macbook } from "./states/macbook";
import { timeline } from "./states/timeline";
import { surface } from "./states/surface";
import { process as processMap } from "./states/process";
import { clusters } from "./states/clusters";
import { portrait } from "./states/portrait";

const OUT = "public/states";

/** particles per anchor; everything beyond stays as ambient noise */
const DENSITY: Record<string, number> = {
  noise: 1e6,
  histogram: 2,
  columns: 2,
  macbook: 2.5,
  "macbook-closed": 2.5,
  timeline: 1,
  "timeline-rejected": 1,
  crossover: 1.5,
  surface: 2,
  process: 2,
  clusters: 1.5,
  portrait: 3,
  point: 1,
};

async function main() {
  const built: Built[] = [
    noise(),
    histogram(),
    columns(),
    ...(await macbook()),
    ...timeline(),
    surface(),
    processMap(),
    clusters(),
    await portrait(),
    point(),
  ];
  mkdirSync(OUT, { recursive: true });
  const manifest: Manifest = { version: VERSION, built: new Date().toISOString().slice(0, 10), states: {} };
  let total = 0;
  for (const b of built) {
    if (b.categories.length > MAX_CATEGORIES) throw new Error(`${b.id}: ${b.categories.length} categories > ${MAX_CATEGORIES}`);
    if (b.count % 128) throw new Error(`${b.id}: count ${b.count} is not a multiple of 128`);
    // anchors are x-sorted, so a density below 1 would cut the shape in half
    if ((b.density ?? DENSITY[b.id] ?? 2) < 1) throw new Error(`${b.id}: density must be >= 1`);
    let file: string | null = null;
    let bytes = 0;
    if (b.count > 0 && !b.source) {
      const gz = gzipSync(encodeState(b.anchors, b.flow), { level: 9 });
      file = `${b.id}.bin.gz`;
      writeFileSync(`${OUT}/${file}`, gz);
      bytes = gz.byteLength;
      total += bytes;
    }
    const meta: StateMeta = {
      id: b.id,
      file,
      source: b.source,
      count: b.count,
      density: b.density ?? DENSITY[b.id] ?? 2,
      hasFlow: !!b.flow,
      bytes,
      categories: b.categories,
      camera: b.camera,
      params: b.params ?? {},
      labels: (b.labels ?? []).map((l) => ({ ...l, pos: l.pos.map((v) => +v.toFixed(3)) as [number, number, number] })),
      items: b.items?.map((it) => ({ ...it, pos: it.pos.map((v) => +v.toFixed(3)) as [number, number, number], r: +it.r.toFixed(3) })),
    };
    manifest.states[b.id] = meta;
    console.log(`${b.id.padEnd(18)} ${String(b.count).padStart(6)} anchors  ${(bytes / 1024).toFixed(1).padStart(6)} KB${b.source ? `  (reuses ${b.source})` : ""}`);
  }
  writeFileSync(`${OUT}/manifest.json`, JSON.stringify(manifest));
  console.log(`total ${(total / 1024).toFixed(1)} KB gzipped across ${built.filter((b) => b.count && !b.source).length} files`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
