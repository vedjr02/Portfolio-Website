/**
 * The hero noise field, as plain maths. The TSL material evaluates the same
 * formula on the GPU; this copy draws the Canvas 2D posters and lets tests and
 * the lens readout reason about density without a GPU.
 */

export const FIELD = {
  min: [-7, -3.8, -4.5] as const,
  max: [7, 3.8, 1.6] as const,
  /** world units per second of sideways drift */
  drift: 0.045,
  amp: 1.35,
  freq: 0.62,
};

/** Integer hash → [0, 1). Same constants as the shader's `hashU`. */
export function hashU(n: number): number {
  let x = (n >>> 0) ^ 0x9e3779b9;
  x = Math.imul(x ^ (x >>> 16), 0x21f0aaad);
  x = Math.imul(x ^ (x >>> 15), 0x735a2d97);
  x = x ^ (x >>> 15);
  return (x >>> 0) / 4294967296;
}

/** Position of particle i in the noise field at time t (seconds). */
export function noisePosition(i: number, t: number, out: number[] = [0, 0, 0]): number[] {
  const { min, max, drift, amp, freq } = FIELD;
  const rx = hashU(i * 3);
  const ry = hashU(i * 3 + 1);
  const rz = hashU(i * 3 + 2);
  const w = max[0] - min[0];
  let x = min[0] + rx * w;
  const y = min[1] + ry * (max[1] - min[1]);
  const z = min[2] + rz * (max[2] - min[2]);
  // slow sideways drift, wrapped inside the field
  x = min[0] + ((((x - min[0] + t * drift * (0.5 + rx)) % w) + w) % w);
  // swirl displacement: sums of sines in rotated frames read as curl-like filaments
  // two passes: the second samples the field at the displaced point, which folds
  // space into sheets and filaments instead of an even haze
  let px = x;
  let py = y;
  let pz = z;
  for (let k = 0; k < 2; k++) {
    const a = freq * (k ? 1.9 : 1);
    const s = k ? 0.45 : 1;
    const dx = Math.sin(py * a * 1.3 + t * 0.21 + pz * 0.4) + 0.5 * Math.sin(pz * a * 2.1 - t * 0.17 + px * 0.3);
    const dy = Math.sin(pz * a * 1.1 + t * 0.19 + px * 0.5) + 0.5 * Math.sin(px * a * 1.9 + t * 0.23 - py * 0.2);
    const dz = Math.sin(px * a * 0.9 - t * 0.15 + py * 0.6) + 0.5 * Math.sin(py * a * 1.7 + t * 0.13);
    px += dx * amp * s;
    py += dy * amp * 0.75 * s;
    pz += dz * amp * s;
  }
  out[0] = px;
  out[1] = py;
  out[2] = pz;
  return out;
}
