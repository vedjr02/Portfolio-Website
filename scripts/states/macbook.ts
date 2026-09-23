import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler.js";
import { holdMyCode } from "../../src/content/holdMyCode";
import { cat, pack, PAPER, PAPER_2, rng, SIGNAL, type Built, type Point } from "./common";

/**
 * A 13-inch MacBook (30.4 × 21.5 cm, 1 world unit = 10 cm), modelled from
 * primitives, exported as a real GLB (assets/models/macbook.glb), loaded back and
 * surface-sampled. The lid is stored open at 105°; the shader swings it shut
 * around the hinge for the "lid closed, still awake" beat.
 */

export const LAPTOP = {
  w: 3.04,
  d: 2.15,
  baseH: 0.075,
  lidH: 2.12,
  lidT: 0.034,
  open: 105,
  closed: 1.6,
  screenW: 2.82,
  screenH: 1.78,
};
export const HINGE: [number, number] = [LAPTOP.baseH, -LAPTOP.d / 2];

const GLB_PATH = "assets/models/macbook.glb";

// GLTFExporter needs FileReader, which Node lacks
class NodeFileReader {
  result: ArrayBuffer | string | null = null;
  onloadend: (() => void) | null = null;
  readAsArrayBuffer(blob: Blob) {
    blob.arrayBuffer().then((b) => {
      this.result = b;
      this.onloadend?.();
    });
  }
  readAsDataURL(blob: Blob) {
    blob.arrayBuffer().then((b) => {
      this.result = `data:application/octet-stream;base64,${Buffer.from(b).toString("base64")}`;
      this.onloadend?.();
    });
  }
}

function model(): THREE.Group {
  const { w, d, baseH, lidH, lidT, screenW, screenH, open } = LAPTOP;
  const g = new THREE.Group();
  const add = (name: string, geo: THREE.BufferGeometry, pos: [number, number, number], parent: THREE.Object3D = g) => {
    const m = new THREE.Mesh(geo, new THREE.MeshBasicMaterial());
    m.name = name;
    m.position.set(...pos);
    parent.add(m);
    return m;
  };

  add("base", new RoundedBoxGeometry(w, baseH, d, 3, 0.03), [0, baseH / 2, 0]);

  // keyboard: key tops only, 6 rows
  const keys: THREE.BufferGeometry[] = [];
  const rows = 6;
  for (let rI = 0; rI < rows; rI++) {
    const n = rI === 0 ? 14 : 13;
    const kw = rI === 0 ? 0.16 : 0.175;
    const gap = 0.022;
    const rowW = n * kw + (n - 1) * gap;
    for (let k = 0; k < n; k++) {
      const wide = rI === 5 && k === 6 ? 4 : 1;
      if (rI === 5 && k > 6 && k < 10) continue;
      const kg = new THREE.PlaneGeometry(kw * wide + gap * (wide - 1), rI === 0 ? 0.09 : 0.165);
      kg.rotateX(-Math.PI / 2);
      kg.translate(-rowW / 2 + k * (kw + gap) + (kw * wide + gap * (wide - 1)) / 2, baseH + 0.002, -0.92 + rI * 0.19 + (rI === 0 ? -0.04 : 0));
      keys.push(kg);
    }
  }
  const kb = mergeGeometries(keys);
  add("keyboard", kb, [0, 0, 0]);

  const pad = new THREE.PlaneGeometry(1.25, 0.8);
  pad.rotateX(-Math.PI / 2);
  add("trackpad", pad, [0, baseH + 0.002, 0.55]);

  // lid pivot at the hinge
  const pivot = new THREE.Group();
  pivot.name = "hinge";
  pivot.position.set(0, HINGE[0], HINGE[1]);
  pivot.rotation.x = THREE.MathUtils.degToRad(90 - open);
  g.add(pivot);
  add("lid", new RoundedBoxGeometry(w, lidH, lidT, 3, 0.015), [0, lidH / 2, -lidT / 2], pivot);
  const screen = new THREE.PlaneGeometry(screenW, screenH);
  add("screen", screen, [0, lidH / 2 + 0.06, 0.002], pivot);

  return g;
}

function mergeGeometries(geos: THREE.BufferGeometry[]): THREE.BufferGeometry {
  const pos: number[] = [];
  const idx: number[] = [];
  let off = 0;
  for (const geo of geos) {
    const g = geo.index ? geo : geo;
    const p = g.getAttribute("position");
    for (let i = 0; i < p.count; i++) pos.push(p.getX(i), p.getY(i), p.getZ(i));
    const index = g.index!;
    for (let i = 0; i < index.count; i++) idx.push(index.getX(i) + off);
    off += p.count;
  }
  const out = new THREE.BufferGeometry();
  out.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  out.setIndex(idx);
  out.computeVertexNormals();
  return out;
}

async function exportGlb(): Promise<ArrayBuffer> {
  (globalThis as unknown as { FileReader: typeof NodeFileReader }).FileReader = NodeFileReader;
  const exporter = new GLTFExporter();
  const glb = (await exporter.parseAsync(model(), { binary: true })) as ArrayBuffer;
  mkdirSync("assets/models", { recursive: true });
  writeFileSync(GLB_PATH, Buffer.from(glb));
  return glb;
}

async function loadGlb(): Promise<THREE.Group> {
  const data = readFileSync(GLB_PATH);
  const ab = data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);
  const gltf = await new Promise<{ scene: THREE.Group }>((res, rej) => new GLTFLoader().parse(ab, "", res, rej));
  gltf.scene.updateMatrixWorld(true);
  return gltf.scene;
}

const COUNT = 32768;

export async function macbook(): Promise<Built[]> {
  await exportGlb();
  const scene = await loadGlb();
  const r = rng(21);
  const sample = (name: string, n: number, category: number): Point[] => {
    let mesh: THREE.Mesh | undefined;
    scene.traverse((o) => {
      if ((o as THREE.Mesh).isMesh && o.name === name) mesh = o as THREE.Mesh;
    });
    if (!mesh) throw new Error(`mesh ${name} missing from GLB`);
    const geo = mesh.geometry.clone().applyMatrix4(mesh.matrixWorld);
    const sampler = new MeshSurfaceSampler(new THREE.Mesh(geo));
    // typed in the JS source but missing from @types/three
    (sampler as unknown as { setRandomGenerator(f: () => number): void }).setRandomGenerator(r);
    sampler.build();
    const v = new THREE.Vector3();
    return Array.from({ length: n }, () => {
      sampler.sample(v);
      return { x: v.x, y: v.y, z: v.z, cat: category };
    });
  };

  // category indices (≤ 16): 0 base, 1 keyboard, 2 trackpad, 3 lid, 4 screen, 5 glow, 6.. agents
  const agents = holdMyCode.agents;
  const streamEach = 300;
  const glowN = 1100;
  const shape = COUNT - streamEach * agents.length - glowN;
  // the lid's front face behind the display stays empty so the screen reads dark
  const openT = THREE.MathUtils.degToRad(90 - LAPTOP.open);
  const lidLocal = (p: Point) => {
    const y = p.y - HINGE[0];
    const z = p.z - HINGE[1];
    return { y: y * Math.cos(-openT) - z * Math.sin(-openT), z: y * Math.sin(-openT) + z * Math.cos(-openT) };
  };
  const lid = sample("lid", Math.round(shape * 0.5), 3).filter((p) => {
    const l = lidLocal(p);
    const front = l.z > -0.004;
    const inScreen = Math.abs(p.x) < LAPTOP.screenW / 2 + 0.02 && Math.abs(l.y - (LAPTOP.lidH / 2 + 0.06)) < LAPTOP.screenH / 2 + 0.02;
    return !(front && inScreen);
  });
  const pts: Point[] = [
    ...sample("base", Math.round(shape * 0.3), 0),
    ...sample("keyboard", Math.round(shape * 0.17), 1),
    ...sample("trackpad", Math.round(shape * 0.05), 2),
    ...lid.slice(0, Math.round(shape * 0.26)),
  ];
  pts.push(...sample("screen", shape - pts.length, 4));

  // glow: light leaking from the front gap and the sides once the lid is down
  const { w, d, baseH } = LAPTOP;
  for (let i = 0; i < glowN; i++) {
    const side = r();
    const onFront = side < 0.7;
    const x = onFront ? (r() - 0.5) * w * 0.94 : (r() < 0.5 ? -1 : 1) * (w / 2 + 0.01);
    const z = onFront ? d / 2 + 0.01 + r() * 0.05 : (r() - 0.5) * d * 0.9;
    pts.push({ x, y: baseH + 0.012 + r() * 0.02, z, cat: 5 });
  }

  // agent streams: from a wide fan behind and above, into the front gap
  agents.forEach((_, a) => {
    const ang = -Math.PI * 0.95 + (a / (agents.length - 1)) * Math.PI * 0.9;
    for (let i = 0; i < streamEach; i++) {
      const spreadS = 0.35;
      const sx = Math.cos(ang) * 6.2 + (r() - 0.5) * spreadS;
      const sy = 1.2 + Math.sin(ang * 1.7 + a) * 1.4 + 2.2 * r() * 0.4;
      const sz = -2.5 + Math.sin(ang) * 3.5 + (r() - 0.5) * spreadS;
      const ex = (a / (agents.length - 1) - 0.5) * w * 0.8 + (r() - 0.5) * 0.06;
      pts.push({
        x: sx,
        y: sy,
        z: sz,
        cat: 6 + a,
        item: a,
        fx: ex,
        fy: baseH + 0.02,
        fz: d / 2 - 0.05,
        phase: r(),
      });
    }
  });

  const { anchors, flow } = pack(pts, COUNT, { flow: true });

  const agentCats = agents.map((ag) =>
    cat({ name: `agent:${ag.name}`, color: ag.color, size: 0.02, alpha: 0, spread: 0.02, flow: { speed: 0.16, wave: 0.28, freq: 1.6 } })
  );
  const shapeCats = [
    cat({ name: "base", color: PAPER_2, size: 0.016, alpha: 0.2, spread: 0.006 }),
    cat({ name: "keyboard", color: PAPER, size: 0.015, alpha: 0.26, spread: 0.004 }),
    cat({ name: "trackpad", color: PAPER_2, size: 0.015, alpha: 0.12, spread: 0.004 }),
    cat({ name: "lid", color: PAPER_2, size: 0.016, alpha: 0.22, spread: 0.006, hinge: true }),
    cat({ name: "screen", color: "#3a3544", size: 0.016, alpha: 0.12, spread: 0.008, hinge: true }),
    cat({ name: "glow", color: SIGNAL, size: 0.03, alpha: 0, spread: 0.02, glow: 1 }),
  ];
  const screenCenterOpen = (() => {
    const t = THREE.MathUtils.degToRad(90 - LAPTOP.open);
    const yLocal = LAPTOP.lidH / 2 + 0.06;
    return [0, HINGE[0] + yLocal * Math.cos(t), HINGE[1] + yLocal * Math.sin(t)] as [number, number, number];
  })();

  const open: Built = {
    id: "macbook",
    count: COUNT,
    anchors,
    flow,
    categories: [...shapeCats, ...agentCats],
    camera: {
      center: screenCenterOpen,
      size: [LAPTOP.screenW, LAPTOP.screenH, 0.1],
      yaw: 0,
      pitch: 15,
      fov: 30,
      desktop: [0.5, 0.2, 0.93, 0.56],
      mobile: [0.08, 0.1, 0.92, 0.3],
      anchor: "laptop-screen",
    },
    params: { lid: LAPTOP.open, hinge: HINGE },
    labels: [],
  };

  const closedCats = [
    ...shapeCats.map((c) =>
      c.name === "glow"
        ? { ...c, alpha: 0.75 }
        : c.name === "screen"
          ? { ...c, color: SIGNAL, alpha: 0.2 }
          : { ...c, alpha: c.alpha * 0.85 }
    ),
    ...agentCats.map((c) => ({ ...c, alpha: 0.45 })),
  ];

  const closed: Built = {
    id: "macbook-closed",
    source: "macbook",
    count: COUNT,
    anchors,
    flow,
    categories: closedCats,
    camera: {
      center: [0, 0.35, 0],
      size: [4.6, 1.6, 3.2],
      yaw: -22,
      pitch: 24,
      fov: 32,
      desktop: [0.44, 0.1, 0.97, 0.9],
      mobile: [0.04, 0.08, 0.96, 0.46],
    },
    params: { lid: LAPTOP.closed, hinge: HINGE },
    labels: [],
  };
  return [open, closed];
}
