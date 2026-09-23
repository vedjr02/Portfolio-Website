#!/usr/bin/env python3
"""
Portrait preprocessing for the particle portrait (chapter 06).

public/vedant.jpg → assets/portrait/portrait.png (RGBA, 256×320):
  R = luminance, stretched to the 2nd–98th percentile inside the person mask
      (so the black hoodie still spreads across the ramp)
  G = Sobel edge strength
  B = depth estimate: the mask's distance field (bodies bulge towards the camera)
      plus a little luminance relief. A generated estimate, not a depth sensor.
  A = person mask from rembg's u2net_human_seg model

Run once: python3 scripts/portrait-mask.py  (needs rembg, pillow, numpy, scipy)
"""
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter, ImageOps
from rembg import new_session, remove
from scipy import ndimage

SRC = Path("public/vedant.jpg")
OUT = Path("assets/portrait/portrait.png")
W, H = 256, 320

img = ImageOps.exif_transpose(Image.open(SRC)).convert("RGB")
cut = remove(img, session=new_session("u2net_human_seg"))
mask = np.asarray(cut.split()[-1], dtype=np.float32) / 255.0

# crop head to waist: from just above the hair to ~55% down the silhouette
ys, xs = np.where(mask > 0.5)
top, bottom = ys.min(), ys.max()
height = bottom - top
y0 = max(0, int(top - height * 0.05))
y1 = int(top + height * 0.56)
cx = int(np.median(xs[ys < top + height * 0.25]))  # centre on the head
crop_h = y1 - y0
crop_w = int(crop_h * W / H)
x0 = max(0, min(img.width - crop_w, cx - crop_w // 2))
box = (x0, y0, x0 + crop_w, y1)

rgb = img.crop(box).resize((W, H), Image.LANCZOS)
m = Image.fromarray((mask * 255).astype(np.uint8)).crop(box).resize((W, H), Image.LANCZOS)
m = m.filter(ImageFilter.GaussianBlur(0.8))
ma = np.asarray(m, dtype=np.float32) / 255.0

luma = np.asarray(rgb.convert("L"), dtype=np.float32) / 255.0
inside = luma[ma > 0.5]
lo, hi = np.percentile(inside, 2), np.percentile(inside, 98)
stretched = np.clip((luma - lo) / max(1e-3, hi - lo), 0, 1)

sx = ndimage.sobel(luma, axis=1)
sy = ndimage.sobel(luma, axis=0)
edges = np.hypot(sx, sy)
edges = np.clip(edges / np.percentile(edges[ma > 0.5], 97), 0, 1)

dt = ndimage.distance_transform_edt(ma > 0.5)
depth = np.sqrt(dt / max(1.0, dt.max()))
depth = np.clip(depth * 0.85 + stretched * 0.15, 0, 1)

rgba = np.stack([stretched, edges, depth, ma], axis=-1)
OUT.parent.mkdir(parents=True, exist_ok=True)
Image.fromarray((rgba * 255).astype(np.uint8), "RGBA").save(OUT)
Image.fromarray((stretched * ma * 255).astype(np.uint8)).save(OUT.with_name("preview-luma.png"))
print(f"wrote {OUT} from crop {box}")
