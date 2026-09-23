# PROGRESS — v3 "SIGNAL"

**Current phase:** 0 — Audit, content layer, plan
**Current task:** 0.2 Typed content layer

Resume prompt: *"Resume the autonomous loop: read docs/BRIEF.md, loop-harness rules in PROGRESS.md header, and continue from the first unchecked task."*

---

## Loop harness (copied from the kickoff message — these rules govern every session)

### C. The loop — repeat until the exit condition

Each iteration:

1. **Orient.** Read `PROGRESS.md` (and `docs/BRIEF.md` if you don't have it in context). Pick the first unchecked task.
2. **Build.** Implement that one task. Small, focused changes.
3. **Verify.** Nothing counts as done until it passes, in this order:
   - `typecheck`, `lint`, `build` all pass with zero errors
   - For any visual change: run Playwright, take screenshots at 390×844 and 1440×900, **open and look at them**, and compare against the brief. If it looks generic, broken, or off-brief, it's not done.
   - For engine work: record measured fps per tier in the Metrics table
   - For perf work: record bundle sizes / Lighthouse numbers
4. **Commit.** One logical commit per task, clear message, repo's configured git identity, no AI co-author trailers. Push the branch.
5. **Record.** Tick the task, add the iteration log line, update Current phase/task.
6. **Continue immediately** to the next iteration. Do not summarise to the user, do not wait.

**Phase boundaries:** when all tasks in a phase are ticked, run a quick phase review (screenshots of every chapter touched, check against brief), add any fix-up tasks you find to the list, then move straight into the next phase.

### D. When things go wrong (never stop for these)

- **Same task fails verification 3 times:** try a genuinely different approach (not a tweak). If a 4th attempt fails, write the problem to **Blockers**, implement the simplest version that meets the brief's intent, log the compromise in `DECISIONS.md`, and move on. Come back to Blockers in the Phase 7 critic pass.
- **Something in the brief is technically unwise or blows the performance budget:** choose the better option, log why in `DECISIONS.md`, continue.
- **Headless browser can't run WebGPU:** verify the WebGL2 path with software GL, note it in Metrics, continue.
- **A dependency or tool is missing:** install it. If it can't be installed, pick an alternative and log it.
- **Visual polish loops:** max 2 refinement passes per effect per phase. Then move on; the critic pass will catch anything that still matters.
- **Context getting long:** the files are your memory. Keep `PROGRESS.md` accurate enough that a fresh session could resume from it alone.

### E. Hard limits (the only things that stop you)

- **Never** merge to the default branch, force-push, rewrite history, or deploy to the production domain. Vercel preview deploys of `v3-signal` are fine.
- **Never** delete the old site's content or assets from the default branch.
- **Never** add paid services, API keys, or accounts.
- **Never** invent metrics, testimonials, or claims about the work.

### F. Exit condition (the only reason to end the loop)

All of these are true:
1. Every task in `PROGRESS.md` is ticked, including the Phase 7 critic pass.
2. The critic subagent (brief section 9) scores every category **≥ 8/10** from all three reviewers, on the second pass. If not, add fix tasks and keep looping. Maximum 3 critic rounds; after that, record the remaining gaps honestly.
3. All section 6 budgets are measured and met (or any miss is explained in `DECISIONS.md` with the reason).
4. The Definition of Done (brief section 10) is checked line by line in `PROGRESS.md`.

Then, and only then, write `HANDOFF.md`: the preview URL, what was built, the final metrics table, open blockers, decisions to double-check, and the exact steps to merge and go live.

---

## Working notes for a fresh session

- Repo: `vedjrr/Portfolio-Website` cloned at `/home/user/portfolio-website`, branch `v3-signal`. (The session's other repo, `vedjrr/vedjr02`, is the GitHub profile README, not the site.)
- Local builds need `NODE_USE_ENV_PROXY=1` so `next/font` can fetch Google Fonts through the sandbox proxy (Vercel does not need it).
- Data sources were read from the case-study repos (cloned read-only under `/home/user/vedjrr/` and `/home/user/adflex-dynamic-prices`): NVIDIA `data/timeline.json` + `data/financials.json`, Meridian `07-PROGRESS-STATE.md`/`AUDIT-LOG.md`, AdFlex `lib/retailTariffs.ts`, Hold My Code releases via GitHub API.
- Headless Chromium: WebGL2 = ANGLE/SwiftShader (software). `navigator.gpu` absent on `about:blank`; WebGPU to be re-tested on `http://localhost`.
- Commands: `npm run typecheck`, `npm run lint`, `npm run build`, `npm test`, `npm run shots` (Playwright screenshots), `npm run states` (rebuild particle states).

---

## Task list

### Setup
- [x] S.1 Branch `v3-signal` from `main`; brief saved to `docs/BRIEF.md`
- [ ] S.2 `PROGRESS.md`, `DECISIONS.md`; tooling scripts (typecheck, test, shots)

### Phase 0 — Audit, content layer, plan
- [ ] 0.1 Audit report (framework, routing, content, deploy, reusable parts) → `PLAN.md §1`
- [ ] 0.2 Typed content layer `src/content/*` (21 projects, HMC facts + releases, NVIDIA events/rejected/quarters, Starbucks, AdFlex tariffs, Meridian, GridPeer, method, education, toolkit, contact); `vedjr02` → `vedjrr`; flag every copy change
- [ ] 0.3 Old site renders from the new content layer (no regressions); typecheck/lint/build green
- [ ] 0.4 `PLAN.md` (phases, storyboard, state list, architecture, perf budget, palette, type, risks, assumptions)
- [ ] 0.5 Profile README repo (`vedjrr/vedjr02`, designated branch): `vedjr02` → `vedjrr` in config/README/SVG text

### Phase 1 — Art direction (static posters, no motion)
- [ ] 1.1 Design tokens: palette, type scale, grid, fonts (Instrument Serif / Geist / Geist Mono), focus styles
- [ ] 1.2 Page skeleton: root layout, nav (60-second version, sound slot), skip link, footer, chapter sections; old desktop UI removed from the page
- [ ] 1.3 State builders A: noise, histogram, method columns, MacBook (procedural GLB → surface sampling), NVIDIA timeline + rejected bin
- [ ] 1.4 State builders B: Starbucks braid, AdFlex tariff surface, Meridian process map, GridPeer, 21 clusters, portrait (mask + depth), converge point
- [ ] 1.5 `scripts/build-states.ts` → `public/states/*.bin.gz` + manifest; Canvas2D poster renderer → `public/posters/*`
- [ ] 1.6 Poster composition: Hero, Method, Flagship
- [ ] 1.7 Poster composition: Cases (3 rooms), Systems
- [ ] 1.8 Poster composition: Index, About, Contact
- [ ] 1.9 Phase 1 review at 390/768/1440/1920; fix-ups

### Phase 2 — Signal engine spike (`/lab`)
- [ ] 2.1 Engine core: WebGPURenderer (WebGPU → WebGL2), DPR clamp, resize, loop, visibility/offscreen pause
- [ ] 2.2 Particle material (TSL): state textures, per-particle staggered morph, curl dissolve, soft sprites, size attenuation, in-shader DoF, category palettes
- [ ] 2.3 Hero noise field + Analyst's Lens (grid snap, inertia, readout, touch/idle drift)
- [ ] 2.4 `/lab`: noise → histogram → MacBook scrub; state loader (gzip) + prefetch
- [ ] 2.5 Tier detection + 1 s fps probe + runtime downgrade
- [ ] 2.6 Measure fps per tier; Metrics table; Phase 2 review (poster test)

### Phase 3 — States + scroll choreography
- [ ] 3.1 Persistent canvas in root layout, engine lazy-loaded after first paint; scene director (markers → from/to/t/beat); Lenis
- [ ] 3.2 Camera poses per state; beat uniforms; continuous transitions
- [ ] 3.3 Hero → Method (histogram → four labelled columns)
- [ ] 3.4 Flagship: MacBook, lid closes / stays awake, agent streams, screen glow; HMC panel composited on the screen
- [ ] 3.5 NVIDIA room: 68-event timeline, hover lift + source, rejected claims fall, crossover push-in
- [ ] 3.6 Starbucks braid; AdFlex surface + light sweep + ridge label
- [ ] 3.7 Meridian process map with tokens + congested bottleneck; GridPeer packets
- [ ] 3.8 Index: 21 clusters, hover names, DOM filter regroups clusters
- [ ] 3.9 Portrait with depth parallax + lens decode; Contact converge point following the cursor
- [ ] 3.10 Continuity review (frame strip through every transition); fix cuts

### Phase 4 — DOM layer
- [ ] 4.1 Hero + Method DOM (type reveals, CTAs)
- [ ] 4.2 Flagship DOM (analyst decisions, download, version, release notes, walkthrough on demand)
- [ ] 4.3 Case rooms DOM (claim, 3 proof points, links; accessible NVIDIA event list)
- [ ] 4.4 Systems DOM (Meridian, GridPeer, In progress tags)
- [ ] 4.5 Index table (filters, search, Quick Look dialog, no-JS details)
- [ ] 4.6 SQL parser + executor + unit tests
- [ ] 4.7 SQL console UI (⌘K/Ctrl-K, `> query` chip, 5 suggestions, ARIA, clusters light up)
- [ ] 4.8 About + Contact DOM (copy button, simplified composer)
- [ ] 4.9 `/cv` (print A4, ATS semantics) + PDF generation
- [ ] 4.10 `/colophon`
- [ ] 4.11 JS-off verification of every route

### Phase 5 — Polish
- [ ] 5.1 Preloader tied to real loading (`cleaning 240,000 rows…`), rows drop into the canvas
- [ ] 5.2 Cursor + micro-interactions
- [ ] 5.3 Sound (Web Audio synth bed + resolve tones), nav toggle, session memory
- [ ] 5.4 Page transitions (home ↔ /cv ↔ /colophon) with the persistent canvas
- [ ] 5.5 Perf HUD (fps, tier, particles, renderer)
- [ ] 5.6 WebGPU compute enhancement (or logged deferral)
- [ ] 5.7 Juror checklist review (poster / throttle / continuity / reduced motion)

### Phase 6 — Hardening
- [ ] 6.1 Bundle budgets measured + optimised
- [ ] 6.2 Lighthouse mobile + desktop; fix to targets
- [ ] 6.3 Reduced-motion + static tier path (poster crossfades), `?lite`
- [ ] 6.4 Accessibility audit (axe, keyboard, focus, contrast, headings)
- [ ] 6.5 SEO: metadata, OG images, JSON-LD Person, sitemap, robots
- [ ] 6.6 Cross-browser checks (what can be automated here; log the rest)
- [ ] 6.7 Scroll perf: long tasks, fps during scroll
- [ ] 6.8 Posters re-rendered from the engine; measured numbers published on `/colophon`

### Phase 7 — Critic + handoff
- [ ] 7.1 Preview deploy verified
- [ ] 7.2 Critic round 1 → fix tasks
- [ ] 7.3 Critic round 2 (≥ 8/10 all categories, all reviewers)
- [ ] 7.4 Definition of Done checked line by line; `HANDOFF.md`

---

## Definition of Done (brief §10) — checked in Phase 7

- [ ] A stranger scrolling once can say what I do in one sentence.
- [ ] A recruiter on a mid-range phone gets to the CV in two taps and under three seconds.
- [ ] Every chapter's frozen frame works as a poster.
- [ ] The Signal engine never visibly cuts between states.
- [ ] All budgets in §6 met and published on `/colophon`.
- [ ] It feels like one continuous film about turning noise into decisions.

---

## Metrics

| Metric | Budget | Measured | Where / how | Date |
|---|---|---|---|---|
| fps — Ultra (~250k) | ≥ 55 | — | | |
| fps — High (~120k) | ≥ 55 | — | | |
| fps — Medium (~40k) | ≥ 45 | — | | |
| LCP (mobile, 4G) | < 2.0 s | — | | |
| CLS | < 0.05 | — | | |
| INP / TBT proxy | < 200 ms | — | | |
| Initial JS (gz) before engine | < 180 KB | — | | |
| Engine + first state (gz) | < 600 KB | — | | |
| Whole experience scrolled | < 6 MB | — | | |
| Lighthouse mobile Perf / A11y / BP / SEO | 90 / 100 / 100 / 100 | — | | |

---

## Iteration log

| # | Task | Result | Commit |
|---|---|---|---|
| 1 | S.1 branch + brief | done | (pending) |

---

## Blockers

_None yet._
