import type { CameraSpec, Region, Vec3 } from "./format";

/**
 * Fit a state's world box into a screen region.
 *
 * The camera looks at the box centre from (yaw, pitch); its distance is solved so
 * every box corner lands inside the region; a view offset then shifts the image so
 * the box centre sits at the region centre. Pure maths so the engine, the poster
 * renderer and tests agree exactly.
 */
export type Framed = {
  position: Vec3;
  target: Vec3;
  fov: number;
  /** setViewOffset(fullW, fullH, x, y, w, h) arguments */
  offset: [number, number, number, number, number, number];
};

const rad = (d: number) => (d * Math.PI) / 180;

export function viewDir(yaw: number, pitch: number): Vec3 {
  const y = rad(yaw);
  const p = rad(pitch);
  return [Math.sin(y) * Math.cos(p), Math.sin(p), Math.cos(y) * Math.cos(p)];
}

function basis(dir: Vec3) {
  // camera looks along -dir; right = up × dir, up' = dir × right
  const up: Vec3 = [0, 1, 0];
  const rx = up[1] * dir[2] - up[2] * dir[1];
  const ry = up[2] * dir[0] - up[0] * dir[2];
  const rz = up[0] * dir[1] - up[1] * dir[0];
  const rl = Math.hypot(rx, ry, rz) || 1;
  const right: Vec3 = [rx / rl, ry / rl, rz / rl];
  const u: Vec3 = [
    dir[1] * right[2] - dir[2] * right[1],
    dir[2] * right[0] - dir[0] * right[2],
    dir[0] * right[1] - dir[1] * right[0],
  ];
  return { right, up: u };
}

export function frame(spec: Pick<CameraSpec, "center" | "size" | "yaw" | "pitch" | "fov">, width: number, height: number, region: Region): Framed {
  const dir = viewDir(spec.yaw, spec.pitch);
  const { right, up } = basis(dir);
  const t = Math.tan(rad(spec.fov) / 2);
  const aspect = width / height;
  const fw = Math.max(0.05, region[2] - region[0]);
  const fh = Math.max(0.05, region[3] - region[1]);
  let dist = 0.5;
  const [sx, sy, sz] = spec.size.map((v) => v / 2);
  for (const cx of [-sx, sx])
    for (const cy of [-sy, sy])
      for (const cz of [-sz, sz]) {
        const px = cx * right[0] + cy * right[1] + cz * right[2];
        const py = cx * up[0] + cy * up[1] + cz * up[2];
        const dz = cx * dir[0] + cy * dir[1] + cz * dir[2]; // towards the camera
        dist = Math.max(dist, Math.abs(py) / (t * fh) + dz, Math.abs(px) / (t * aspect * fw) + dz);
      }
  const target = spec.center;
  const position: Vec3 = [target[0] + dir[0] * dist, target[1] + dir[1] * dist, target[2] + dir[2] * dist];
  const rcx = ((region[0] + region[2]) / 2) * width;
  const rcy = ((region[1] + region[3]) / 2) * height;
  return {
    position,
    target,
    fov: spec.fov,
    offset: [width, height, width / 2 - rcx, height / 2 - rcy, width, height],
  };
}

/** Portrait viewports (phones, tablets upright) use the tall layout. */
export const isTall = (width: number, height: number) => width < 768 || height >= width;

/** Screen region for a spec on this viewport. */
export function regionFor(spec: CameraSpec, width: number, height: number): Region {
  return isTall(width, height) ? spec.mobile : spec.desktop;
}

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const lerp3 = (a: Vec3, b: Vec3, t: number): Vec3 => [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
export const lerpRegion = (a: Region, b: Region, t: number): Region => [
  lerp(a[0], b[0], t),
  lerp(a[1], b[1], t),
  lerp(a[2], b[2], t),
  lerp(a[3], b[3], t),
];
