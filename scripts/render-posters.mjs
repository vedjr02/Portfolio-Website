#!/usr/bin/env node
/**
 * Render every chapter's poster frame (static tier, no-JS view, share images).
 *   node scripts/render-posters.mjs [--url http://localhost:3100] [--only noise,macbook] [--renderer poster|engine]
 * Desktop 1680×1050 and phone 780×1688 (390×844 @2x) → public/posters/<state>-{d,m}.webp
 */
import { chromium } from "playwright";
import sharp from "sharp";
import { mkdirSync, statSync } from "node:fs";

const arg = (k, d) => {
  const i = process.argv.indexOf(`--${k}`);
  return i > -1 ? process.argv[i + 1] : d;
};
const url = arg("url", "http://localhost:3100");
const only = arg("only", "")?.split(",").filter(Boolean);
const renderer = arg("renderer", "poster");
const STATES = ["noise", "histogram", "columns", "macbook", "macbook-closed", "timeline", "timeline-rejected", "crossover", "surface", "process", "clusters", "portrait", "point"];
const SIZES = [
  { tag: "d", w: 1680, h: 1050, n: 110000 },
  { tag: "m", w: 780, h: 1688, n: 70000 },
];

mkdirSync("public/posters", { recursive: true });
const browser = await chromium.launch({ args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
for (const id of STATES.filter((s) => !only?.length || only.includes(s))) {
  for (const s of SIZES) {
    const page = await browser.newPage({ viewport: { width: s.w, height: s.h }, deviceScaleFactor: 1 });
    page.on("console", (m) => m.type() === "error" && console.error(`[${id}] ${m.text()}`));
    const path = renderer === "engine" ? "/lab" : "/lab/poster";
    await page.goto(`${url}${path}?state=${id}&w=${s.w}&h=${s.h}&n=${s.n}&poster=1`, { waitUntil: "load" });
    await page.waitForFunction(() => window.__posterDone === true, null, { timeout: 120000 });
    const png = await page.locator("canvas").first().screenshot({ type: "png" });
    const out = `public/posters/${id}-${s.tag}.webp`;
    await sharp(png).webp({ quality: 72, effort: 6 }).toFile(out);
    console.log(`${out}  ${(statSync(out).size / 1024).toFixed(0)} KB`);
    await page.close();
  }
}
await browser.close();
