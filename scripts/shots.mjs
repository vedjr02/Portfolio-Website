#!/usr/bin/env node
/**
 * Playwright screenshots for visual checks.
 *
 *   node scripts/shots.mjs [--url http://localhost:3000] [--out .shots/latest]
 *                          [--sizes 390x844,1440x900] [--routes /,/cv]
 *                          [--sections hero,method] [--wait 1200] [--full]
 *                          [--js=false] [--motion=reduce] [--query ?lite]
 *
 * For "/" it scrolls to each `[data-chapter]` section (or the ones named in
 * --sections) and captures the viewport; other routes are captured from the top
 * (or full page with --full).
 */
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, ...v] = a.replace(/^--/, "").split("=");
    return [k, v.length ? v.join("=") : true];
  })
);
const next = (flag) => {
  const i = process.argv.indexOf(`--${flag}`);
  return i > -1 && process.argv[i + 1] && !process.argv[i + 1].startsWith("--") ? process.argv[i + 1] : undefined;
};
const opt = (k, d) => args[k] !== undefined && args[k] !== true ? args[k] : next(k) ?? d;

const url = opt("url", "http://localhost:3000");
const out = opt("out", ".shots/latest");
const sizes = opt("sizes", "390x844,1440x900").split(",").map((s) => s.split("x").map(Number));
const routes = opt("routes", "/").split(",");
const only = opt("sections", "") ? opt("sections").split(",") : null;
const wait = Number(opt("wait", "1200"));
const query = opt("query", "");
const js = opt("js", "true") !== "false";
const reduce = opt("motion", "") === "reduce";
const full = Boolean(args.full);

mkdirSync(out, { recursive: true });

const browser = await chromium.launch({ args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
for (const [w, h] of sizes) {
  const ctx = await browser.newContext({
    viewport: { width: w, height: h },
    deviceScaleFactor: 1,
    javaScriptEnabled: js,
    reducedMotion: reduce ? "reduce" : "no-preference",
    isMobile: w < 700,
    hasTouch: w < 700,
  });
  const page = await ctx.newPage();
  page.on("pageerror", (e) => console.error(`[pageerror ${w}] ${e.message}`));
  page.on("console", (m) => m.type() === "error" && console.error(`[console ${w}] ${m.text()}`));
  for (const route of routes) {
    await page.goto(url + route + query, { waitUntil: "load" });
    await page.waitForTimeout(wait);
    const slug = route === "/" ? "home" : route.replace(/\//g, "_").replace(/^_/, "");
    if (route === "/" && !full) {
      const ids = await page.$$eval("[data-chapter]", (els) => els.map((e) => e.getAttribute("data-chapter")));
      for (const id of ids.filter((i) => !only || only.includes(i))) {
        await page.evaluate((id) => {
          const el = document.querySelector(`[data-chapter="${id}"]`);
          const y = el.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({ top: y, behavior: "instant" });
        }, id);
        await page.waitForTimeout(wait);
        const file = join(out, `${slug}-${id}-${w}x${h}.png`);
        await page.screenshot({ path: file });
        console.log(file);
      }
    } else {
      const file = join(out, `${slug}-${w}x${h}.png`);
      await page.screenshot({ path: file, fullPage: full });
      console.log(file);
    }
  }
  await ctx.close();
}
await browser.close();
