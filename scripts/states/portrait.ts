import sharp from "sharp";
import { cat, DUST, pack, PAPER, PAPER_2, rng, SIGNAL, type Built, type Point } from "./common";

/**
 * About: the portrait, sampled from assets/portrait/portrait.png (made by
 * scripts/portrait-mask.py from public/vedant.jpg). Density follows luminance and
 * edges inside the person mask; z comes from the generated depth estimate, so a
 * few degrees of camera orbit show real parallax.
 */

const COUNT = 32768;
const WW = 2.6; // world width of the crop
const WH = 3.25; // world height (4:5)
const DEPTH = 0.75;

export async function portrait(): Promise<Built> {
  const { data, info } = await sharp("assets/portrait/portrait.png").raw().toBuffer({ resolveWithObject: true });
  const { width: W, height: H } = info;
  const weight = new Float32Array(W * H);
  let total = 0;
  for (let i = 0; i < W * H; i++) {
    const l = data[i * 4] / 255;
    const e = data[i * 4 + 1] / 255;
    const m = data[i * 4 + 3] / 255;
    const w = m < 0.35 ? 0 : m * (0.16 + 0.7 * l * l + 0.45 * e);
    weight[i] = w;
    total += w;
  }
  // inverse-CDF sampling over pixels, then jitter inside the pixel
  const cdf = new Float64Array(W * H);
  let acc = 0;
  for (let i = 0; i < W * H; i++) cdf[i] = acc += weight[i] / total;
  const r = rng(71);
  const pts: Point[] = [];
  for (let k = 0; k < COUNT; k++) {
    const u = r();
    let lo = 0;
    let hi = cdf.length - 1;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (cdf[mid] < u) lo = mid + 1;
      else hi = mid;
    }
    const px = (lo % W) + r();
    const py = Math.floor(lo / W) + r();
    const l = data[lo * 4] / 255;
    const e = data[lo * 4 + 1] / 255;
    const d = data[lo * 4 + 2] / 255;
    pts.push({
      x: (px / W - 0.5) * WW,
      y: (0.5 - py / H) * WH,
      z: d * DEPTH - DEPTH / 2 + (r() - 0.5) * 0.02,
      cat: e > 0.55 ? 3 : l > 0.62 ? 0 : l > 0.3 ? 1 : 2,
    });
  }
  const { anchors } = pack(pts, COUNT);
  return {
    id: "portrait",
    count: COUNT,
    anchors,
    categories: [
      cat({ name: "light", color: PAPER, size: 0.013, alpha: 0.3, spread: 0.008 }),
      cat({ name: "mid", color: PAPER_2, size: 0.013, alpha: 0.22, spread: 0.008 }),
      cat({ name: "dark", color: DUST, size: 0.013, alpha: 0.22, spread: 0.008 }),
      cat({ name: "edge", color: SIGNAL, size: 0.012, alpha: 0.16, spread: 0.006 }),
    ],
    camera: {
      center: [0, 0, 0],
      size: [WW, WH, DEPTH],
      yaw: 0,
      pitch: 0,
      fov: 28,
      desktop: [0.56, 0.1, 0.9, 0.92],
      mobile: [0.1, 0.08, 0.9, 0.44],
    },
    params: { lens: 1, orbit: 6 },
    labels: [],
  };
}
