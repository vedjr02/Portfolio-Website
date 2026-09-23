/**
 * Particle state format, shared by the build script (Node) and the engine (browser).
 *
 * A state is M anchors. Each anchor is 4 half floats: x, y, z, w where
 * w = itemId * 16 + category (itemId < 128, category < 16; exact in half precision).
 * Optional flow targets (4 half floats: x, y, z, phase) move "flow" categories along
 * start → end paths. Files are gzipped; the engine inflates them with DecompressionStream.
 */

export const MAGIC = 0x4c4e4753; // "SGNL"
export const VERSION = 1;
export const TEX_WIDTH = 128;
export const MAX_CATEGORIES = 16;
export const MAX_ITEMS = 128;

export type Vec3 = [number, number, number];

export type FlowParams = {
  /** loops per second along the start → end path */
  speed: number;
  /** perpendicular wave amplitude (world units) */
  wave?: number;
  /** waves along the path */
  freq?: number;
  /** > 1 slows tokens near the end of the path so they queue */
  congest?: number;
};

export type CategoryDef = {
  name: string;
  /** sRGB hex */
  color: string;
  /** sprite size in world units */
  size: number;
  alpha: number;
  /** jitter radius for particles beyond the anchor count (world units) */
  spread: number;
  /** extra brightness 0..1 (fake bloom via halo) */
  glow?: number;
  flow?: FlowParams;
  /** rotates with the laptop lid around the hinge */
  hinge?: boolean;
  /** brightened by the sweeping light (tariff surface) */
  sweep?: boolean;
};

export type Region = [x0: number, y0: number, x1: number, y1: number];

export type CameraSpec = {
  /** world box the camera frames */
  center: Vec3;
  size: Vec3;
  /** degrees around y (positive = look from the right) and x (positive = look from above) */
  yaw: number;
  pitch: number;
  fov: number;
  /** screen regions (0..1, y down) the box is fitted into */
  desktop: Region;
  mobile: Region;
  /** optional DOM [data-anchor] whose rect overrides the region at runtime */
  anchor?: string;
};

export type Label = { text: string; pos: Vec3; kind: string; item?: number };

export type StateParams = {
  /** laptop lid angle in degrees (0 = shut, 105 = open) */
  lid?: number;
  /** hinge axis: point on the axis (x ignored) */
  hinge?: [y: number, z: number];
  /** 1 = the light sweep runs across x in this state */
  sweep?: number;
  /** lens strength available in this state (hero, portrait) */
  lens?: number;
  /** portrait orbit amplitude, degrees */
  orbit?: number;
};

export type StateMeta = {
  id: string;
  /** null for procedural states (noise) */
  file: string | null;
  /** texture that holds the anchors, when a state reuses another state's file */
  source?: string;
  count: number;
  /**
   * Particles per anchor this state takes. Particles beyond count × density stay
   * behind as faint ambient noise, so small shapes never saturate and the
   * unsorted data is always faintly there.
   */
  density: number;
  hasFlow: boolean;
  bytes?: number;
  categories: CategoryDef[];
  camera: CameraSpec;
  params: StateParams;
  labels: Label[];
  /** world centres of hoverable items (events, clusters) by item id */
  items?: { id: number; pos: Vec3; r: number }[];
};

export type Manifest = { version: number; built: string; states: Record<string, StateMeta> };

/* ---------------------------------------------------------------- */
/* Half floats                                                       */
/* ---------------------------------------------------------------- */

const f32 = new Float32Array(1);
const u32 = new Uint32Array(f32.buffer);

export function toHalf(v: number): number {
  f32[0] = v;
  const x = u32[0];
  const sign = (x >> 16) & 0x8000;
  const exp = ((x >> 23) & 0xff) - 127 + 15;
  let mant = x & 0x7fffff;
  if (exp <= 0) {
    if (exp < -10) return sign;
    mant = (mant | 0x800000) >> (1 - exp);
    return sign | ((mant + 0x1000) >> 13);
  }
  if (exp >= 31) return sign | 0x7c00;
  // rounding can carry into the exponent; that is still correct
  return (sign | (exp << 10) | ((mant + 0x1000) >> 13)) & 0xffff;
}

export function fromHalf(h: number): number {
  const s = h & 0x8000 ? -1 : 1;
  const e = (h >> 10) & 0x1f;
  const m = h & 0x3ff;
  if (e === 0) return s * m * 2 ** -24;
  if (e === 31) return m ? NaN : s * Infinity;
  return s * (1 + m / 1024) * 2 ** (e - 15);
}

/** Pack anchors (+ optional flow) into the binary layout (before gzip). */
export function encodeState(anchors: Float32Array, flow?: Float32Array): Uint8Array {
  const count = anchors.length / 4;
  const header = 16;
  const size = header + count * 8 + (flow ? count * 8 : 0);
  const buf = new ArrayBuffer(size);
  const dv = new DataView(buf);
  dv.setUint32(0, MAGIC, true);
  dv.setUint16(4, VERSION, true);
  dv.setUint16(6, flow ? 1 : 0, true);
  dv.setUint32(8, count, true);
  const halves = new Uint16Array(buf, header, count * 4 + (flow ? count * 4 : 0));
  for (let i = 0; i < anchors.length; i++) halves[i] = toHalf(anchors[i]);
  if (flow) for (let i = 0; i < flow.length; i++) halves[anchors.length + i] = toHalf(flow[i]);
  return new Uint8Array(buf);
}

/** Read the binary layout (after gunzip). Returns raw half-float views for GPU upload. */
export function decodeState(buf: ArrayBuffer): { count: number; anchors: Uint16Array; flow: Uint16Array | null } {
  const dv = new DataView(buf);
  if (dv.getUint32(0, true) !== MAGIC) throw new Error("Not a SIGNAL state file");
  const flags = dv.getUint16(6, true);
  const count = dv.getUint32(8, true);
  const anchors = new Uint16Array(buf, 16, count * 4);
  const flow = flags & 1 ? new Uint16Array(buf, 16 + count * 8, count * 4) : null;
  return { count, anchors, flow };
}

export const packW = (item: number, category: number) => item * 16 + category;
