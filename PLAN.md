# PLAN — vedantambre.com v3 "SIGNAL"

Brief: `docs/BRIEF.md`. Live task list and metrics: `PROGRESS.md`. Decisions and rejected ideas: `DECISIONS.md`.

---

## 1. Audit of the v2 site (Phase 0)

| Area | Finding |
|---|---|
| Repo | `vedjrr/Portfolio-Website` (the session's attached `vedjrr/vedjr02` is the GitHub profile README, a separate Python SVG generator). |
| Framework | Next.js **16.2.6** (App Router, Turbopack build), React **19.2.4**, TypeScript strict, Tailwind CSS **4**, ESLint 9 (`eslint-config-next`). |
| UI deps | `motion`/`framer-motion` 12 (entrances), `lenis` 1.3 (installed, barely used), `lucide-react`, `@base-ui/react`, shadcn config (unused primitives). |
| Routing | One route (`/`) plus generated `icon`/`apple-icon`. Sections are anchors (`#hold-my-code`, `#cases`, `#projects`, `#about`, `#contact`). |
| Content | All copy in `src/lib/data.ts` (profile, Hold My Code facts, 21 projects, education, toolkit). Good, plain, sourced copy. |
| Concept | A macOS desktop: menu bar, dock, Control Center, windows per section, Spotlight (⌘K command palette), Finder list with Quick Look, Mail compose window, stickers, a hand-drawn doodle arrow. Separate iOS-style layout for phones. |
| Deploy | Vercel (GitHub integration). Production = `main`; every branch push gets a preview deployment (verified: `v3-signal` builds). Domain `vedantambre.com` (metadataBase). |
| Assets | `public/vedant.jpg` (1800×1350, EXIF-rotated portrait), `public/hmc/*` (agent logos, app icon, 17.6 MB walkthrough video, laptop hero), `public/previews/*` (case screenshots), dock/sticker art, Golden Gate wallpaper. |
| Theme | `themeColor #15141d`, system-blue accent, Geist + Caveat + Geist Mono. |
| Reusable | The content (now `src/content/`), the **HmcPanel** demo logic (agents script, usage bars, keep-awake), the Finder table's sort/filter/search/Quick Look behaviour, the mail-composer idea, agent logos, portrait, previews, walkthrough video. |
| Dropped | Desktop chrome (menu bar, dock, Control Center, windows, stickers, wallpaper, doodle, iOS layer). The pre-answer keeps exactly one nod: the Hold My Code menu-bar panel. |
| Issues found | Old GitHub username everywhere; Hold My Code facts one release behind (2.5.1 vs 2.5.4); links to two private repos; Meridian numbers differ from the Meridian repo's measured facts. All fixed and flagged in `DECISIONS.md`. |

---

## 2. Phases

As in brief §9, broken into 50+ verifiable tasks in `PROGRESS.md`:

0. Audit, content layer, plan → **done when** this file exists and assumptions are logged.
1. Art direction: tokens, type, grid, layouts for every chapter, and static poster frames drawn from the *real* state data (Canvas 2D render of the same particle anchors the engine will use). No motion.
2. Engine spike in `/lab`: noise → histogram → MacBook, lens, tiers, fps table.
3. All states + the scroll director: continuous transitions through every chapter.
4. DOM layer: every chapter's content, HMC panel on the laptop screen, rooms, index table, SQL console, `/cv`, `/colophon`, all readable with JS off.
5. Polish: preloader, cursor, sound, page transitions, perf HUD.
6. Hardening: budgets, Lighthouse, a11y, reduced motion, SEO, cross-browser.
7. Critic rounds (fresh subagent, three reviewers) + `HANDOFF.md`.

---

## 3. Storyboard

Each chapter is a `<section data-chapter>` with one or more scene markers (`[data-scene]`). A marker names an engine state; the director scrubs between consecutive markers so every transition is the *same particles travelling*, never a cut. Beats inside a scene (lid closing, claims falling, light sweeping) are driven by the scene's own scroll progress.

| # | Chapter | Scene(s) → engine state | Transition in | Beats inside the scene | DOM layer |
|---|---|---|---|---|---|
| — | Preloader | `noise` (particles drop in) | — | Counter `cleaning 240,000 rows…` tied to real bytes loaded; at 100% the rows fall into the field | Mono counter bottom-left; never covers the H1 (LCP) |
| 00 | Hero — Noise | `noise` | preloader drop | Analyst's Lens follows cursor/finger; idle drift on touch | Name in Instrument Serif, "Business analyst who ships software.", CTAs *See the work* / *60-second version*, availability line |
| 01 | Method — Sort | `histogram` → `columns` | noise particles are pulled down into a settling bell histogram | histogram splits into four labelled columns | Four method steps, each with one grounded example |
| 02 | Flagship — Hold My Code | `macbook` → `macbook-closed` | histogram columns pour upward into the laptop surface | lid closes; screen glow leaks through the gap; one stream per agent keeps flowing in | HMC panel (real DOM) mapped onto the screen quad; "How I ran it, as an analyst"; download + version + release notes; walkthrough on demand |
| 03a | Room: NVIDIA | `timeline` → `timeline-rejected` → `crossover` | laptop dissolves along the x-axis into a 20-year line | hover lifts an event + shows its source; 15 rejected claims detach, turn muted red and fall into the bin; camera pushes in on May 2022 | Title, claim, 3 proof points, *Open the case* / *Source*; accessible list of all 68 events + rejected log |
| 03b | Room: AdFlex × SEI | `surface` | timeline pours into a 24 h × 19-plan grid, then rises into a surface | a light sweeps across hours; the 17:00–19:00 peak ridge is labelled | Title, claim, 3 proof points, *Open the dashboard*; source note |
| 04 | In progress — Meridian | `process` | surface flattens and re-forms as nodes and edges | tokens (cases) flow along edges; A_Validating congests (queue + glow); the rework loop cycles | "In progress" tag, claim, the three published figures, source |
| 05 | Index — all 21 | `clusters` | tokens fall out of the map into 21 clusters sized by scope tier | hover lifts + names a cluster; filters/SQL regroup and light clusters | Filterable, searchable table with Quick Look; `> query` chip and ⌘K SQL console |
| 06 | About — Portrait | `portrait` | clusters drift together into my portrait | camera orbits a few degrees (real depth parallax); the lens decodes the face into grid points | Bio, education, toolkit (Analyse / Present / Build / Practice) |
| 07 | Contact — Converge | `point` | the portrait collapses to a single bright point | the point follows the cursor with a short comet tail | Big email, copy, LinkedIn, GitHub, simplified composer; footer → `/colophon` |

`/cv` and `/colophon` are plain server-rendered pages; the canvas is paused and hidden there.

---

## 4. Engine state list

A state = an anchor texture (xyz + packed `id·16 + category`), an optional flow texture (xyz end + phase) and a 16-row category table (colour, size, alpha, jitter, flow and glow parameters). Camera pose per state.

| State | Anchors | Source | Categories |
|---|---|---|---|
| `noise` | procedural (no file) | hash + time-varying 3D noise in-shader | field |
| `histogram` | 16 384 | maths: Box–Muller normal, binned and stacked | bars, axis |
| `columns` | 16 384 | maths: the same particles regrouped into 4 columns | 4 columns, baseline |
| `macbook` | 32 768 | procedural MacBook GLB (built by script, 13.3" proportions) → `MeshSurfaceSampler` | base, keyboard, trackpad, lid, screen, agent streams (hidden) |
| `macbook-closed` | 32 768 | same samples, lid rotated shut; streams enabled | as above + glow |
| `timeline` | 16 384 | 68 events from `src/content/data/nvidia.ts`, x = date, stacked per category | axis, year ticks, 6 event categories, rejected (15, waiting above) |
| `timeline-rejected` | 16 384 | same, rejected claims moved into the bin | as above |
| `crossover` | = `timeline-rejected` | camera-only change | — |
| `surface` | 16 384 | 19 tariffs × 24 h from `data/tariffs.ts`, bilinear surface | surface, peak ridge, grid |
| `process` | 16 384 | 13 nodes / 15 edges from `cases.ts`; edges sampled as curves | nodes, edges, tokens (flow), bottleneck queue, loop |
| `clusters` | 16 384 | 21 projects, layout precomputed (force relaxation), size by scope tier | one id per project |
| `portrait` | 32 768 | `vedant.jpg` → person mask (rembg, u2net_human_seg) → luminance-weighted sampling, depth from mask distance field + luminance | face/hair, hoodie, edge |
| `point` | 4 096 | a tight gaussian at the origin | core, halo |

Particle `i` reads anchor `i mod M`, where `M` is the state's anchor count; extra particles on higher tiers are jittered around their anchor by the category's `spread`. That keeps downloads small (≈ 1.3 MB of states in total) while Ultra still draws ~250k points.

---

## 5. Architecture

```
src/
  app/
    layout.tsx            fonts, metadata, JSON-LD, <SignalRoot/> (persistent canvas, outside the route tree)
    page.tsx              home: chapters as server components + small client islands
    cv/page.tsx           60-second version (no WebGL, print CSS)
    colophon/page.tsx     the site's requirements doc, measured budgets
    lab/page.tsx          engine spike + tuning (noindex)
    sitemap.ts, robots.ts, opengraph-image.tsx (+ per route)
  content/                typed content layer (done in Phase 0)
  engine/                 vanilla three/webgpu, no React
    index.ts              createEngine(canvas) → { goTo, setScroll, setLens, highlight, pick, setTier, stats, dispose }
    renderer.ts           WebGPURenderer (WebGPU → WebGL2 fallback), DPR clamp, loop, visibility/offscreen pause
    material.ts           TSL particle material (the whole look)
    states.ts             manifest, loader (gzip → half floats → DataTexture), prefetch
    tiers.ts              GPU heuristics + fps probe + runtime downgrade
    lens.ts, camera.ts, pick.ts, audio.ts (lazy)
  signal/                 React glue
    SignalRoot.tsx        mounts the canvas once; lazy-imports the engine after first paint
    director.ts           scene markers → (from, to, t, beat); Lenis + GSAP ScrollTrigger
    Preloader.tsx, PerfHud.tsx, SoundToggle.tsx
  components/             chapters, HmcPanel, ProjectIndex, QuickLook, SqlConsole, Nav, Footer
  lib/sql/                tokenizer, parser, executor (+ tests)
scripts/
  build-states.ts         runs every builder → public/states/*.bin.gz + manifest.json
  builders/*.ts           one pure builder per state (shared with the poster renderer)
  build-macbook.ts        procedural MacBook → assets/models/macbook.glb
  portrait-mask.py        rembg person mask + depth → assets/portrait/*.png
  render-posters.ts       Playwright → public/posters/*.avif|webp (static tier + OG)
  build-cv-pdf.ts         Playwright print of /cv → public/cv/vedant-ambre-cv.pdf
  shots.mjs               screenshots for every visual check
```

**Why vanilla three instead of R3F:** one persistent canvas that React never re-renders, an imperative API the director calls ~60×/s, no reconciler in the hot path, and a smaller engine chunk. React owns only the DOM.

**Why WebGPURenderer + TSL:** one shader source compiles to WGSL (WebGPU) or GLSL ES 3.0 (WebGL2). r186's WebGL backend also emulates compute with transform feedback, but the core morph path never needs compute, so both backends run the same material. The WebGPU compute pass (hero advection) is an enhancement only.

---

## 6. Engine design details

- **Draw:** one `THREE.Sprite` with `PointsNodeMaterial`, `count = N` (instanced quads). Additive blending, soft round sprites, `sizeAttenuation`. Alpha scales with `1/√(N/40k)` so density looks the same on every tier.
- **Morph:** `pos = mix(A(i), B(i), e)` where `e = ease(clamp((t − d_i)/w))`, `d_i = 0.45·hash(i) + 0.25·distanceFactor`, `w = 0.3`. Mid-flight displacement `n(pos, time)·sin(πe)·amp` so shapes dissolve like a flock.
- **Per-category table** (16×4 RGBA float texture per state): colour + size; alpha + jitter spread + flow speed + wave amplitude; wave frequency + phase + congestion + glow; lift + reserved.
- **Highlights / regrouping:** a 128×1 RGBA float texture indexed by item id: `(dx, dy, dz, light)`, animated on the CPU with springs (21 clusters, 68 events). `engine.highlight(ids)` lights and dims; `pick(x, y)` projects item centres on the CPU.
- **Lens:** screen-space lens (centre, radius, strength) → particles inside snap to a world-space grid on the view plane with smooth falloff; inertia on the CPU (critically damped spring). Readout: `n` = particles inside the lens computed from the current state's density, `σ` = the lens's residual jitter.
- **Fake DoF:** size ∝ 1 + k·|z − focus|, alpha ∝ 1/size² (bokeh without a post pass). Restrained glow = a small set of glow-category particles drawn larger and fainter. A real bloom pass is optional on Ultra only if it measures cheaply.
- **Director:** reads `[data-scene]` markers once per resize; per scroll frame computes `(from, to, t)` in a window around each boundary and `beat` inside each scene. Camera pose per state is interpolated with the same `t`. Reduced motion: no director; poster crossfades.
- **Tiers:** Static if `?lite`, reduced motion, Save-Data, no WebGL2, or a failed probe. Otherwise GPU string heuristics pick a starting tier, a 1-second probe confirms it, and a rolling 3 s average steps down (Ultra → High → Medium → Static poster) on sustained misses. Changing tier only changes `sprite.count` and DPR — no reallocation.
- **Loop hygiene:** DPR ≤ 2 desktop, ≤ 1.5 mobile (≤ 1.25 on Medium); loop paused on `visibilitychange` and when the canvas is covered (on `/cv`, `/colophon`).

---

## 7. Art direction

**Palette** (tokens in `globals.css`):

| Token | Value | Use |
|---|---|---|
| `--bg` | `#0c0b10` | page + canvas clear colour (warm near-black, same family as v2's `#15141d`) |
| `--bg-raise` | `#15141d` | panels, table, console (continuity with v2) |
| `--paper` | `#efeae2` | primary text, "resolved" particles |
| `--paper-2` | `#b8b2a8` | secondary text |
| `--paper-3` | `#8c867e` | captions, axis labels (≥ 4.5:1 on `--bg`) |
| `--dust` | `#6f6a73` | noise particles |
| `--signal` | `#f2b64a` | the one accent: "signal", focus rings, primary CTA — terminal amber, a nod to the data terminals analysts live in |
| `--rejected` | `#b9564a` | reserved for rejected claims and nothing else |
| `--rule` | `rgb(239 234 226 / 0.12)` | hairlines |

No neon, no rainbow: agent streams use each agent's brand hue desaturated to sit beside amber.

**Type:** Instrument Serif (display, roman + italic), Geist (UI/body), Geist Mono (data labels, counters, readouts). Kept from the brief: the serif gives the editorial poster frame; Geist Mono makes every number look like a measurement. Scale (fluid): display `clamp(4.25rem, 13vw, 12.5rem)` / 0.86; chapter title `clamp(2.75rem, 7vw, 6.5rem)` / 0.95; lead `clamp(1.25rem, 2vw, 1.6rem)`; body 17 px / 1.6; mono label 11–12 px, +0.08 em, uppercase.

**Grid:** 12 columns, max 1440 px, side margin `clamp(16px, 4vw, 64px)`, gutter 24 px. Copy lives in columns 1–5 on desktop so particles own the right two-thirds; on phones copy sits below the shape with a soft scrim. Chapter eyebrows in mono: `03 — NVIDIA · 2006–2026`.

---

## 8. Performance budget and strategy

| Budget | Plan |
|---|---|
| LCP < 2.0 s (4G) | H1 is server-rendered text with `font-display: swap`; the preloader never covers it; no hero image. |
| CLS < 0.05 | Canvas is `position: fixed`; fonts use `adjustFontFallback`; no late-inserted content above the fold. |
| INP < 200 ms | Engine updates run in rAF; SQL parsing is synchronous but tiny; handlers never touch layout in loops. |
| Initial JS < 180 KB gz | Server components for all content; client islands only for nav, table, console chip, contact copy. `motion`/`framer-motion` removed. GSAP/Lenis/three load with the engine chunk after first paint. |
| Engine + first state < 600 KB gz | `three/webgpu` + engine code; first state `noise` is procedural (0 bytes); `histogram` prefetched after. |
| Whole experience < 6 MB | ≈ 1.3 MB states + ≈ 0.3 MB posters + fonts + JS. The 17.6 MB walkthrough video loads only on explicit click and is excluded. |
| ≥ 55 fps desktop / ≥ 45 Medium | Tiering + runtime downgrade; single draw call; no post on Medium. |
| Lighthouse 90/100/100/100 | Engine boots after `load` + idle; static poster for Lighthouse's throttled profile if the probe fails. |

---

## 9. Risks

| Risk | Mitigation |
|---|---|
| WebGPU can't be tested in this headless sandbox (no `navigator.gpu`). | Verify WebGL2 with SwiftShader; keep the material backend-agnostic (no WGSL-only features); catch WebGPU init/device-lost errors and fall back to `forceWebGL`. Log honestly. |
| SwiftShader fps is not representative of real phones. | Record SwiftShader numbers as a floor, plus per-frame GPU-independent CPU cost; flag real-device measurement in HANDOFF. |
| `*.vercel.app` previews are blocked from the sandbox. | Verify with local production builds (`next build && next start`); preview URLs come from the GitHub deployment API. |
| Particles behind text hurt contrast. | Copy columns sit over empty space by layout; mobile scrim; contrast checked with axe on the static poster path. |
| Lighthouse penalises the engine's main-thread work. | Engine loads after `load` + idle; shader compile async (`renderer.init()` + `compileAsync`); tier probe can drop to poster. |
| Portrait mask quality. | rembg's human-segmentation model (the same tool the profile README pipeline uses). |
| Scope. | Build the whole spine first (all states at "good"), then polish; max two refinement passes per effect. |

---

## 10. Assumptions (pre-answered questions are in `docs/BRIEF.md`)

- `v3-signal` lives in `Portfolio-Website`; the profile README repo only gets the username fix (on its designated branch).
- Two rooms (NVIDIA, AdFlex) plus one in-progress system (Meridian), per the tier-1 pre-answer.
- Sound is synthesised with Web Audio (no audio files), off by default.
- The CV PDF is generated from `/cv` itself, so it can never drift from the site's content.
- OG images: one per route (`/`, `/cv`, `/colophon`) plus chapter posters reused as shareable images; URL fragments can't carry their own OG tags.
