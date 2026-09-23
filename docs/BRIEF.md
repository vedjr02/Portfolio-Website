# vedantambre.com v3 — "SIGNAL"
### Build brief for Claude Code. Read all of it before writing any code.

> Source of truth for the v3 build. If context is lost, resume from this file,
> `PROGRESS.md` (loop harness + task list) and `DECISIONS.md`.

---

## Pre-answered questions (from the loop harness — use these instead of asking)

- **Availability line:** keep whatever the current site says.
- **Tier-1 projects:** Hold My Code (flagship), NVIDIA case study, Meridian, AdFlex. Everything else goes in the Index.
- **Old Mac-desktop metaphor:** keep one nod only — the Hold My Code menu-bar panel. Drop the rest.
- **Sound:** off by default, toggle in nav.
- **Fonts / palette / anything else unclear:** decide yourself, pick the option a senior Awwwards juror would pick, and log it in `DECISIONS.md` with a one-line reason. A logged decision is always better than a stall.

## Hard limits (from the loop harness)

- **Never** merge to the default branch, force-push, rewrite history, or deploy to the production domain. Vercel preview deploys of `v3-signal` are fine.
- **Never** delete the old site's content or assets from the default branch.
- **Never** add paid services, API keys, or accounts.
- **Never** invent metrics, testimonials, or claims about my work.

---

## 0. Who you are on this job

You are a creative technologist with the eye of a Lusion / Immersive Garden / Active Theory lead and the discipline of a performance engineer. You have shipped Awwwards Site of the Day and Developer Award winners. You treat a 60fps budget on a mid-range Android phone as a hard requirement, not a stretch goal.

You are also working for a **business analyst**, not a creative developer. Every visual decision has to make a recruiter or hiring manager think "this person turns messy data into decisions and then ships the thing." If an effect doesn't serve that sentence, cut it.

---

## 1. The concept in one line

**Every pixel on this site is a data point.**

The whole site runs on ONE persistent GPU particle system (the "Signal engine"). It starts as pure noise. As the visitor scrolls, the same particles are cleaned, sorted, clustered and modelled until they *become* each piece of work: a histogram, a process map with flowing tokens, a 20-year timeline, a tariff surface, a MacBook, and finally my portrait. The site literally performs the job I do: **noise → signal → decision → shipped product.**

This follows the rule every 2026 award winner follows: commit to one hard idea and budget everything around it. Do not bolt on unrelated effects. No floating laptops, no generic starfields, no stacked gimmicks. One system, many states, directed like a film.

### Reference DNA (study the mechanics, never copy the visuals)
- **Lusion — Oryzo** (Awwwards SOTM Apr 2026): a single subject with real weight, inertia and Z-depth camera scroll.
- **Unseen Studio — Hubtown** (SOTD Jun 2026): cursor-reveal on a hero object; 3D making a "boring" sector feel premium. Same move here: 3D making business analysis feel premium.
- **Immersive Garden — Cartier Watches & Wonders**: one self-contained "room" per product, entered and exited on scroll.
- **Shopify Editions**: scroll as the narrative device; each section is a beat (enter, hold, exit).
- **Bruno Simon folio-2025** (MIT): TSL shaders that run on WebGPU with automatic WebGL fallback; sound as UX. Read its structure for engine organisation.
- **Messenger by Abeto** (Site of the Year 2025): a rich world that loads at ~5.7 MB. That's the size discipline to match.
- **Obys / Unseen**: editorial typography where the static frames already look like posters.

Juror test to apply to every screen: (1) screenshot it with motion frozen — is it still a strong poster? (2) throttle CPU 4× + Fast 3G — does it still paint fast and hold frame rate? (3) are transitions *continuous* rather than cuts? (4) does `prefers-reduced-motion` give a graceful, designed path?

---

## 2. Before anything else: audit the repo (Phase 0)

The repo attached to this session is my current live site (Next.js; a "Mac desktop" concept with a Hold My Code menu-bar panel, case-study cards, a Finder-style project table with Quick Look, an About card and a mail-composer contact section).

1. Read the whole codebase. Report: framework and versions, routing, where content lives, deploy target, what's reusable.
2. **Extract all content into a typed content layer** (`/content/*.ts` or MDX): projects (all 21), case studies, Hold My Code facts and release notes, education, toolkit, contact. The copy on the current site is good and written in my voice. Keep it. Improve only where it's weak, and flag every change.
3. Fix while you're in there: my GitHub username is now **`vedjrr`** (old `vedjr02` links must be updated everywhere, including Hold My Code release links).
4. Write `PLAN.md` with: phase breakdown, the chapter-by-chapter storyboard (section 4), the state list for the particle engine, file architecture, perf budget, risks, and any assumptions you made (the open questions are pre-answered in the loop harness).
5. Create branch `v3-signal`. All work happens there. The live site is untouched until I approve a merge.

Open questions are pre-answered in the loop harness above. Log anything else in `DECISIONS.md` and keep going.

---

## 3. Stack (verify current versions yourself; don't pin from memory)

- **Next.js** (App Router, keep whatever major the repo is on unless there's a real reason) + **TypeScript strict**.
- **Three.js latest**, using `WebGPURenderer` from `three/webgpu` with **TSL** node materials so one shader codebase runs on WebGPU and falls back to WebGL2 automatically. Check the installed version's changelog for what the WebGL backend supports (especially compute) and design around it (see section 5).
- Engine lives in **vanilla Three.js** inside a single persistent `<canvas>` mounted once in the root layout, outside the route tree, so it never re-initialises on navigation. React owns the DOM; the engine exposes a tiny imperative API (`engine.goTo(state, progress)`, `engine.setLens(x, y)`, `engine.highlight(ids)`). Justify in PLAN.md if you prefer R3F.
- **GSAP** (ScrollTrigger, SplitText, CustomEase — all free now) + **Lenis** for weighted smooth scroll. One master scroll timeline drives both DOM and engine.
- **Fonts** (self-hosted via `next/font`, subset): Instrument Serif for display, Geist for UI, Geist Mono for data labels. Propose alternatives in PLAN.md if you have a stronger editorial pairing, with reasons.
- Build-time scripts in Node for precomputing particle states (section 5).
- Playwright for visual checks. Vercel preview deploys per phase.

---

## 4. Storyboard — the chapters

Each chapter = one engine state + one DOM layer + one transition in and one out. Particle transitions between states must be **continuous**: the same particles travel, with staggered delays per particle (based on a per-particle random + distance) so shapes dissolve and reform like a flock, never a crossfade.

### Preloader (< 1.5 s perceived)
Dark screen. A Geist Mono counter: `cleaning 240,000 rows…` tied to *real* asset loading progress. At 100%, the rows "drop" into the canvas as the first particles. No fake timers.

### 00 — Hero: Noise
- Full-bleed field of particles drifting on curl noise. Chaotic, beautiful, slightly unsettling.
- **Signature interaction — the Analyst's Lens.** Wherever the cursor moves, a soft circular lens pulls nearby particles out of noise into a perfectly ordered grid, with a thin Geist Mono readout at the lens edge (`n=1,204 · σ 0.03`). Lens has inertia and lags the cursor slightly. On touch: follows the finger; on idle mobile, drifts slowly on its own.
- Type: my name huge in Instrument Serif; one line: "Business analyst who ships software." Two CTAs: *See the work* / *60-second version* (see section 7).

### 01 — Method: Sort
Scroll pulls every particle out of the noise into a clean distribution: a histogram that settles, then splits into four columns for my working method: **pin down the question → agree what good looks like → build it → check it against the numbers.** Each column labels itself as it forms. This is the "why hire a BA who codes" chapter; keep it short.

### 02 — Flagship: Hold My Code
- Particles assemble into a **MacBook** (sampled from a lightweight GLB surface, not a hand-placed shape).
- Keep and upgrade the existing live **menu-bar panel demo** from the current site as a real DOM element composited on the laptop screen (agents list, usage bars, "Keep awake"). It stays sharp and interactive, not rasterised.
- Scroll beat: **the lid closes, but the machine stays awake** — the screen glow keeps leaking through the gap and streams of particles (one colour per agent: Claude Code, Codex, Cursor…) keep flowing into the closed laptop. That single image *is* the product.
- DOM: the "How I ran it, as an analyst" points (requirement before feature; rejected five agents with reasons; fixed a support problem not a symptom; cut a feature users misread). Download CTA + version + release notes.

### 03 — Case studies: three rooms (Cartier-style, one room per case)
- **NVIDIA**: particles form a 20-year horizontal timeline of the **68 sourced events**. Hovering an event lifts it and shows its source. Then the move that makes this case unique: **rejected claims detach, turn a muted red and fall into a "rejected" bin** below the timeline. The data-centre crossover point (six months before ChatGPT) gets the one dramatic camera push-in of the chapter.
- **Starbucks**: particles split into **three streams** (the three growth levers) that braid and diverge.
- **AdFlex**: particles form a **3D surface** of tariff price by hour × scenario. Scroll sweeps a light across it; the peak-price ridge is labelled.
Each room: title, one-line claim, 3 proof points, *Open the case* + *Source* links. Exiting a room, particles pour into the next.

### 04 — In progress: systems
- **Meridian (process mining)**: particles become a **process map** — nodes as activities, edges as flows, and particles *are* cases moving through it as tokens. One bottleneck node visibly congests (tokens queue and glow). This is the most "BA" image on the site; make it gorgeous.
- **GridPeer (P2P energy)**: a small grid of houses; energy packets travel house-to-house instead of to the grid.
Tag both honestly as *In progress*.

### 05 — Index: all 21 projects
- Particles form **21 clusters** (size reflects something honest, e.g. scope tier; never fake metrics). Hover a cluster → it lifts and names itself.
- Below, the full project table (evolve the current Finder-style table: filters by kind, search, Quick Look detail). Filtering in the DOM **physically regroups the clusters** in 3D.
- **SQL console easter egg (⌘K / Ctrl-K, plus a visible `> query` chip):** visitors can type
  `SELECT name, kind FROM projects WHERE status = 'live' ORDER BY date DESC LIMIT 5;`
  Results render as a table *and* the matching clusters light up while the rest dim. Implement a small hand-written parser for a safe subset (SELECT / FROM projects | case_studies / WHERE with =, !=, LIKE, AND, OR / ORDER BY / LIMIT). No `eval`, no LLM calls. Friendly error messages. Include 5 suggested queries for people who don't write SQL. This is the moment a hiring manager remembers.

### 06 — About: the portrait
Particles resolve into **my portrait**, sampled from my existing photo (luminance + a generated depth estimate, so it has real parallax as the camera orbits a few degrees). The Analyst's Lens returns here: hovering my portrait "decodes" it back into ordered grid points. DOM: short bio (current copy), education, toolkit (Analyse / Present / Build / Practice).

### 07 — Contact: Converge
All particles collapse into a single bright point that follows the cursor. Big email, copy button, LinkedIn, GitHub, the existing mail-composer idea kept but simplified. The final frame should work as a poster.

### Colophon — "This site's requirements doc" (`/colophon`)
A short, well-designed page that treats the site like a BA project: goals, users (recruiter in 30 seconds on a phone / hiring manager with 5 minutes / fellow builder), requirements, the performance budget with *measured* results, **rejected ideas with reasons** (mirrors the NVIDIA rejected-claims log and the Hold My Code "rejected five agents" story), and the tech stack. Link it from the footer. Most creative-dev portfolios can't have this page; mine should.

---

## 5. The Signal engine — technical spec

**Architecture**
- One `Points`/instanced-sprite system, N particles, with each **state stored as a position texture** (RGBA16F or half-float `DataTexture`: xyz + a per-state attribute like colour index or size).
- States are **precomputed at build time** by a Node script (`scripts/build-states.ts`) and shipped as compact binary files (`/public/states/*.bin`, half-float, gzip/brotli'd). Sources: GLB surface sampling (MeshSurfaceSampler) for the MacBook; image sampling for the portrait; d3-force layout computed offline for the process map and clusters; maths for histogram, timeline and tariff surface (feed it the real numbers from the content layer).
- Morphing is done in the vertex/TSL stage: `mix(stateA, stateB, easedProgress(per-particle delay))`, plus curl-noise displacement that fades in mid-transition so shapes dissolve organically. **This core path needs no compute shaders, so it runs identically on WebGL2.**
- **Enhancement tier (WebGPU only):** a TSL compute pass for the hero noise field, lens physics and token flow along the process map. Feature-detect; if compute isn't available, fall back to the vertex-shader approximation. Never fork the whole engine.
- Lazy-load state files per chapter (prefetch the next one while the current one is on screen).

**Look**
- Additive-ish soft sprites with size attenuation, subtle depth of field / bokeh on far particles, a restrained bloom only where signal "resolves". Deep near-black background with a very slight warm tint (continuity with the current `#15141d` theme colour). One accent colour for "signal", one muted red reserved for "rejected". Nothing neon, nothing rainbow. Propose a palette in PLAN.md.

**Adaptive quality tiers** (auto-detected from GPU + a 1-second fps probe, adjustable at runtime if fps drops):

| Tier | Target device | Particles | Extras |
|---|---|---|---|
| Ultra | Desktop, discrete / Apple M-series | ~250k | compute, DoF, bloom |
| High | Good laptops, flagship phones | ~120k | bloom |
| Medium | Mid-range Android (the Indian recruiter's phone) | ~40k | no post |
| Static | No WebGL, low-power mode, `?lite`, reduced motion | 0 | designed poster frame per chapter (pre-rendered WebP/AVIF) |

Clamp DPR (≤2 desktop, ≤1.5 mobile). Pause the render loop when the tab is hidden or the canvas is offscreen. Particle counts are targets — measure and adjust.

**Perf HUD (small nerd flex):** a footer toggle showing live fps, the tier this device got, particle count and renderer (WebGPU/WebGL2). It doubles as proof of the performance claim on the colophon page.

**Sound (off by default):** a soft ambient bed plus subtle sonification — transitions produce a quiet tonal "resolve" as noise becomes signal. Toggle in the nav, remembered for the session. Web Audio, tiny files.

---

## 6. Performance, accessibility, SEO — non-negotiable

- **Content first, 3D second.** All text is real, server-rendered HTML that is readable before any JS runs. The engine chunk loads after first paint.
- Budgets (measure on a throttled mid-range Android profile and on desktop):
  - LCP < 2.0 s on 4G; CLS < 0.05; INP < 200 ms.
  - Initial JS before the engine < 180 KB gzipped. Engine + first state < 600 KB. Whole experience fully scrolled < 6 MB.
  - ≥ 55 fps desktop, ≥ 45 fps on the Medium tier. No long tasks > 100 ms during scroll.
  - Lighthouse mobile: Performance ≥ 90, Accessibility 100, Best Practices 100, SEO 100.
- `prefers-reduced-motion`: no particle travel, no smooth scroll hijacking; chapters crossfade between poster frames. Designed, not broken.
- Full keyboard navigation, visible focus states, skip link, correct heading order, ARIA for the SQL console and table, contrast AA minimum on every text layer over the canvas.
- Metadata, OG image per chapter, JSON-LD `Person` schema, sitemap, sensible `<title>`s.
- Scroll is never hijacked so hard that a trackpad user loses control. Lenis stays subtle.

---

## 7. The 60-second version (recruiter fast lane)

A persistent button in the nav: **"60-second version"**. It opens `/cv`: a clean, fast, zero-WebGL page — who I am, what I'm looking for (BA roles), 3 flagship projects with one-line outcomes, skills, education, contact, and a **Download CV (PDF)** button. Print stylesheet so it prints to a tidy A4. ATS-friendly semantics. It should load in under a second on 3G. The immersive site is for delight; this page is for getting hired. Both matter.

---

## 8. Copy rules

- My voice: plain, specific, humanised; varied sentence length; no inflated phrasing ("passionate", "leveraging", "cutting-edge", "seamless", "unlock"). Numbers over adjectives.
- Every claim is sourced or clearly labelled demo data (the current site already does this well — keep that habit).
- No fake metrics, no fake testimonials, no stock "trusted by" logos.

---

## 9. How to work (phases with gates)

Work in phases. Each phase ends with: a commit (small, logical commits throughout, under the repo's configured git identity; no AI co-author trailers), a Vercel preview URL, Playwright screenshots at **390×844, 768×1024, 1440×900, 1920×1080**, and a short status note in `PROGRESS.md`. Then continue straight into the next phase (see loop harness).

| Phase | Deliverable | Gate |
|---|---|---|
| 0 | Audit, content layer, `PLAN.md` | Plan written, assumptions logged |
| 1 | Art direction: type scale, palette, grid, static poster frames for every chapter (no motion yet) | Frames look like posters with motion off |
| 2 | Signal engine spike in `/lab`: noise → histogram → MacBook morph, lens interaction, tier detection | Measured fps table per tier meets section 5 targets; screenshots pass the poster test |
| 3 | All state builders + full scroll choreography across chapters | Continuous transitions, no cuts |
| 4 | DOM layer: all chapters' content, Hold My Code panel, case rooms, index table, SQL console, `/cv`, `/colophon` | Everything readable with JS off |
| 5 | Polish: preloader, cursor, micro-interactions, sound, page transitions, perf HUD | Juror checklist (section 1) passes |
| 6 | Hardening: perf budgets, a11y audit, reduced-motion path, cross-browser (Chrome, Safari, Firefox; iOS Safari; Android Chrome), SEO | All numbers in section 6 met and recorded on `/colophon` |
| 7 | Critic pass (below) + fixes, then `HANDOFF.md` | Exit condition in loop harness |

**Critic pass:** spin up a separate subagent that has not seen the build process. Give it the preview URL and screenshots and ask it to review as (a) an Awwwards juror scoring Design / Usability / Creativity / Content out of 10, (b) a BA hiring manager in Mumbai with 60 seconds on a phone, (c) an accessibility auditor. Fix everything scored below 8 or flagged as blocking. Repeat (see exit condition in the loop harness).

**Self-verification:** after any visual change, screenshot and actually look at the result before calling it done. If headless Chromium can't run WebGPU, verify the WebGL2 path with software GL and say so honestly in `PROGRESS.md`.

**Budget discipline:** I'm running this on limited credits. Don't loop on micro-tweaks of the same effect more than twice. Prefer building a working version of the whole spine over perfecting one chapter. If something in this brief is technically unwise or won't hit the budget, choose the better option and log it in `DECISIONS.md` instead of forcing it.

---

## 10. Definition of done

- A stranger scrolling the site once can say what I do in one sentence.
- A recruiter on a mid-range phone gets to my CV in two taps and under three seconds.
- Every chapter's frozen frame works as a poster.
- The Signal engine never visibly cuts between states.
- All budgets in section 6 met and published on `/colophon`.
- It feels like one continuous film about turning noise into decisions — not a collection of effects.
