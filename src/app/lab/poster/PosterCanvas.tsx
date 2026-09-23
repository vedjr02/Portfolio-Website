"use client";

import { useEffect, useRef } from "react";
import { PerspectiveCamera, Vector3 } from "three";
import { frame, regionFor } from "@/engine/camera";
import { fromHalf, type Manifest, type StateMeta } from "@/engine/format";
import { hashU, noisePosition } from "@/engine/noise";
import { loadStateBuffer } from "@/engine/loader";

declare global {
  interface Window {
    __posterDone?: boolean;
    __posterInfo?: Record<string, unknown>;
  }
}

function sprite(color: string, px = 32) {
  const c = document.createElement("canvas");
  c.width = c.height = px;
  const g = c.getContext("2d")!;
  const grd = g.createRadialGradient(px / 2, px / 2, 0, px / 2, px / 2, px / 2);
  grd.addColorStop(0, color);
  grd.addColorStop(0.35, color);
  grd.addColorStop(1, "rgba(0,0,0,0)");
  g.fillStyle = grd;
  g.fillRect(0, 0, px, px);
  return c;
}

function unitBall(i: number): [number, number, number] {
  const u = hashU(i * 7 + 1) * 2 - 1;
  const a = hashU(i * 7 + 2) * Math.PI * 2;
  const s = Math.sqrt(1 - u * u);
  const d = Math.cbrt(hashU(i * 7 + 3));
  return [Math.cos(a) * s * d, Math.sin(a) * s * d, u * d];
}

export function PosterCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const q = new URLSearchParams(location.search);
    const id = q.get("state") ?? "noise";
    const W = Number(q.get("w") ?? 1680);
    const H = Number(q.get("h") ?? 1050);
    const N = Number(q.get("n") ?? 90000);
    const time = Number(q.get("t") ?? 14);
    const canvas = ref.current!;
    canvas.width = W;
    canvas.height = H;
    canvas.style.width = `${W}px`;
    canvas.style.height = `${H}px`;
    const ctx = canvas.getContext("2d")!;

    (async () => {
      await document.fonts.ready;
      const manifest: Manifest = await (await fetch("/states/manifest.json")).json();
      const meta: StateMeta = manifest.states[id];
      const src = meta.source ? manifest.states[meta.source] : meta;
      const data = src.file ? await loadStateBuffer(`/states/${src.file}`) : null;

      const f = frame(meta.camera, W, H, regionFor(meta.camera, W, H));
      const cam = new PerspectiveCamera(f.fov, W / H, 0.05, 200);
      cam.position.set(...f.position);
      cam.lookAt(new Vector3(...f.target));
      cam.setViewOffset(...f.offset);
      cam.updateMatrixWorld();
      cam.updateProjectionMatrix();

      ctx.fillStyle = "#0c0b10";
      ctx.fillRect(0, 0, W, H);
      ctx.globalCompositeOperation = "lighter";
      const sprites = meta.categories.map((c) => sprite(c.color));
      const focal = H / 2 / Math.tan((f.fov * Math.PI) / 360);
      const density = Math.sqrt(40000 / N);
      const v = new Vector3();
      const p = [0, 0, 0];
      const lid = meta.params.lid ?? 105;
      const hinge = meta.params.hinge ?? [0, 0];
      const lidDelta = ((105 - lid) * Math.PI) / 180;
      const cosL = Math.cos(lidDelta);
      const sinL = Math.sin(lidDelta);

      // lens (hero poster only): a circle of order in the noise
      const lens = id === "noise" ? { x: W * (W < 768 ? 0.62 : 0.74), y: H * (W < 768 ? 0.3 : 0.36), r: Math.min(W, H) * 0.14, grid: 11 } : null;
      let inLens = 0;

      const signalN = data ? Math.floor(data.count * meta.density) : N;
      const ambient = { color: "#8a8490", size: 0.016, alpha: 0.07, spread: 0, name: "ambient" };
      const ambientSprite = sprite(ambient.color);
      for (let i = 0; i < N; i++) {
        let category = 0;
        const isAmbient = !!data && i >= signalN;
        if (!data || isAmbient) {
          noisePosition(i, time, p);
          if (isAmbient) p[2] -= 3.5;
        } else {
          const j = i % data.count;
          const o = j * 4;
          p[0] = fromHalf(data.anchors[o]);
          p[1] = fromHalf(data.anchors[o + 1]);
          p[2] = fromHalf(data.anchors[o + 2]);
          const w = fromHalf(data.anchors[o + 3]);
          category = Math.round(w) % 16;
          const c = meta.categories[category];
          if (c.flow && data.flow) {
            const u0 = (fromHalf(data.flow[o + 3]) + time * c.flow.speed) % 1;
            const u = c.flow.congest ? 1 - Math.pow(1 - u0, c.flow.congest) : u0;
            const ex = fromHalf(data.flow[o]);
            const ey = fromHalf(data.flow[o + 1]);
            const ez = fromHalf(data.flow[o + 2]);
            const wave = (c.flow.wave ?? 0) * Math.sin(u * Math.PI) * Math.sin(u * (c.flow.freq ?? 1) * Math.PI * 2 + j);
            p[0] = p[0] + (ex - p[0]) * u;
            p[1] = p[1] + (ey - p[1]) * u + wave;
            p[2] = p[2] + (ez - p[2]) * u + wave * 0.5;
          }
          if (c.hinge && lidDelta) {
            const y = p[1] - hinge[0];
            const z = p[2] - hinge[1];
            p[1] = hinge[0] + y * cosL - z * sinL;
            p[2] = hinge[1] + y * sinL + z * cosL;
          }
          if (i >= data.count) {
            const [bx, by, bz] = unitBall(i);
            p[0] += bx * c.spread;
            p[1] += by * c.spread;
            p[2] += bz * c.spread;
          }
        }
        const c = isAmbient ? ambient : meta.categories[category];
        if (!c || c.alpha <= 0) continue;
        v.set(p[0], p[1], p[2]).applyMatrix4(cam.matrixWorldInverse);
        const depth = -v.z;
        if (depth < 0.1) continue;
        v.applyMatrix4(cam.projectionMatrix);
        let sx = (v.x * 0.5 + 0.5) * W;
        let sy = (-v.y * 0.5 + 0.5) * H;
        let spr = isAmbient ? ambientSprite : sprites[category];
        // fake depth of field: far points shrink into haze, near points blur and fade
        const focus = f.position[2] - f.target[2] > 0 ? Math.hypot(f.position[0] - f.target[0], f.position[1] - f.target[1], f.position[2] - f.target[2]) : depth;
        const dof = Math.min(2.2, Math.abs(depth - focus) / Math.max(1, focus) * 3);
        let alpha = (c.alpha * density) / (1 + dof * dof);
        if (lens) {
          const d = Math.hypot(sx - lens.x, sy - lens.y);
          if (d < lens.r) {
            const k = Math.min(1, (lens.r - d) / (lens.r * 0.25));
            const gx = Math.round(sx / lens.grid) * lens.grid;
            const gy = Math.round(sy / lens.grid) * lens.grid;
            sx += (gx - sx) * k;
            sy += (gy - sy) * k;
            if (k > 0.5) {
              spr = sprites[1] ?? spr;
              alpha = 0.18 * density;
              inLens++;
            }
          }
        }
        const glow = "glow" in c ? Number(c.glow ?? 0) : 0;
        const size = Math.max(1.2, (c.size * focal) / depth) * (1 + glow * 0.6) * (1 + dof * 0.9);
        if (sx < -size || sy < -size || sx > W + size || sy > H + size) continue;
        ctx.globalAlpha = Math.min(1, alpha);
        ctx.drawImage(spr, sx - size, sy - size, size * 2, size * 2);
      }

      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;
      const mono = getComputedStyle(document.documentElement).getPropertyValue("--font-geist-mono").trim() || "monospace";
      const labelPx = W < 768 ? 20 : 13;

      if (lens) {
        ctx.strokeStyle = "rgba(242,182,74,0.55)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(lens.x, lens.y, lens.r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = "rgba(242,182,74,0.9)";
        ctx.font = `500 ${labelPx}px ${mono}`;
        const n = Math.round(inLens * (250000 / N));
        ctx.fillText(`n=${n.toLocaleString("en-US")} · σ 0.00`, lens.x + lens.r * 0.72, lens.y + lens.r * 0.95);
      }

      ctx.font = `${labelPx}px ${mono}`;
      ctx.textBaseline = "middle";
      for (const l of meta.labels) {
        v.set(...l.pos).project(cam);
        const sx = (v.x * 0.5 + 0.5) * W;
        const sy = (-v.y * 0.5 + 0.5) * H;
        const text = l.kind === "tick" ? l.text : l.text.toUpperCase();
        ctx.fillStyle =
          l.kind === "marker" || l.kind === "bottleneck" ? "rgba(242,182,74,0.95)" : l.kind === "bin" ? "rgba(196,98,90,0.95)" : "rgba(184,178,168,0.85)";
        ctx.textAlign = l.kind === "lane" ? "right" : l.kind.startsWith("cluster") || l.kind === "tick" || l.kind === "node" || l.kind === "bottleneck" ? "center" : "left";
        if (l.kind === "cluster" || (l.kind === "cluster-major" && W < 768)) continue;
        ctx.fillText(text, sx, sy);
      }

      window.__posterInfo = { id, N, W, H, inLens };
      window.__posterDone = true;
    })().catch((e) => {
      console.error(e);
      window.__posterDone = true;
    });
  }, []);

  return <canvas ref={ref} />;
}
