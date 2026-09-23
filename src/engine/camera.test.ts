import { describe, expect, it } from "vitest";
import { PerspectiveCamera, Vector3 } from "three";
import { frame } from "./camera";
import type { Region, Vec3 } from "./format";

function project(spec: { center: Vec3; size: Vec3; yaw: number; pitch: number; fov: number }, W: number, H: number, region: Region) {
  const f = frame(spec, W, H, region);
  const cam = new PerspectiveCamera(f.fov, W / H, 0.05, 200);
  cam.position.set(...f.position);
  cam.lookAt(new Vector3(...f.target));
  cam.setViewOffset(...f.offset);
  cam.updateMatrixWorld();
  cam.updateProjectionMatrix();
  return (p: Vec3) => {
    const v = new Vector3(...p).project(cam);
    return [(v.x * 0.5 + 0.5), (-v.y * 0.5 + 0.5)];
  };
}

describe("frame", () => {
  it("centres the box in the region and keeps every corner inside it", () => {
    const spec = { center: [1, 2, 0] as Vec3, size: [8.8, 3.06, 0.4] as Vec3, yaw: 0, pitch: 0, fov: 30 };
    const region: Region = [0.04, 0.2, 0.96, 0.62];
    const p = project(spec, 1680, 1050, region);
    const [cx, cy] = p(spec.center);
    expect(cx).toBeCloseTo(0.5, 3);
    expect(cy).toBeCloseTo(0.41, 3);
    for (const sx of [-1, 1])
      for (const sy of [-1, 1]) {
        const [x, y] = p([1 + (sx * 8.8) / 2, 2 + (sy * 3.06) / 2, 0]);
        expect(x).toBeGreaterThanOrEqual(region[0] - 1e-3);
        expect(x).toBeLessThanOrEqual(region[2] + 1e-3);
        expect(y).toBeGreaterThanOrEqual(region[1] - 1e-3);
        expect(y).toBeLessThanOrEqual(region[3] + 1e-3);
      }
  });

  it("handles an off-centre region with yaw and pitch", () => {
    const spec = { center: [0, 0.3, -0.5] as Vec3, size: [3, 2, 1] as Vec3, yaw: -22, pitch: 24, fov: 32 };
    const p = project(spec, 1440, 900, [0.5, 0.2, 0.93, 0.56]);
    const [cx, cy] = p(spec.center);
    expect(cx).toBeCloseTo(0.715, 3);
    expect(cy).toBeCloseTo(0.38, 3);
  });
});
