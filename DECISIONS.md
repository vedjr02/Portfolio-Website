# DECISIONS

Decisions and rejected ideas, each with a one-line reason. This file feeds `/colophon`.
Format: **Decision** — reason. Items marked **[check]** are ones Vedant should double-check.

## Setup and repo

- **The site lives in `vedjrr/Portfolio-Website`, not the session's attached repo.** — The attached `vedjrr/vedjr02` is the GitHub profile README (Python SVG generators). The Next.js site matching the brief was found in `Portfolio-Website`, cloned, and branched to `v3-signal`.
- **Commits use the repo's configured git identity with no co-author trailers.** — As the brief asks. The sandbox's configured identity is used as-is rather than impersonating Vedant's address. **[check]** Re-author on merge if you want the commits under your own name.
- **Kept Next.js 16.2.6 (latest is 16.3.6).** — The brief says keep the major; a minor bump mid-build adds risk for no feature we need.
- **Three.js pinned to 0.186.0** — latest on npm at build time (2026-09-08).
- **Playwright pinned to 1.56.1** — matches the pre-installed Chromium 141 build in the sandbox, so no browser download is needed.

## Content

The typed content layer lives in `src/content/` (profile, projects, holdMyCode, cases, method, about, contact, plus generated `data/nvidia.ts` and `data/tariffs.ts`). v2 copy is kept verbatim except for the changes below. Every change is flagged.

- **GitHub links moved from `vedjr02` to `vedjrr` everywhere**, via one `github()` helper so a future rename is a one-line change. Repo names checked against the live repo list: `Gridpeer` (was `gridpeer`), `Air-Canvas.` (the repo name has a trailing dot).
- **Hold My Code download now points at `vedjrr/Hold-My-Code/releases/latest/download/HoldMyCode.dmg`** — verified to redirect to the 2.5.4 asset.
- **Hold My Code version 2.5.1 → 2.5.4, latest release 22 → 23 Sep 2026; release notes gain 2.5.4 / 2.5.3 / 2.5.2 and 2.4.0.** — The releases page already had these; headlines are shortened from the release text ("Native Claude Code installs detected", "Moved agent folders are found", "Bug fixes"). **[check]**
- **Removed "Source" links to private repos** (`adflex-dynamic-prices`, `neighbor-swap-connect`). — They 404 for visitors. Each now carries a `repoNote` ("Client work; the repository is private.") instead. **[check]** if you'd rather make either public.
- **Hold My Code's Index row links to the public releases page** — its source is private; releases are public.
- **Meridian figures updated to the ones in Meridian's own `07-PROGRESS-STATE.md`.** — v2 said "561,671 events", "80% of cases follow 207 of 4,047 variants" and "180 tests"; the repo's measured facts say 1,202,267 events (31,509 cases, 26 activities), 610 of 5,623 variants cover 80% of cases, and 256 tests at the Day 13 checkpoint. Summary line now reads "from 1.2 million events". **[check]** — if the v2 numbers came from a different log filter, restore them and note the filter.
- **New copy, all derived from existing facts:** the method chapter's four examples (each cites a line already on the site), room claims and proof points for NVIDIA / AdFlex / Meridian, and a contact line ("Send the role and the problem behind it."). No response-time or availability promises were added.
- **NVIDIA data is generated from the case repo** (`timeline.json`: 68 events, 15 rejected claims; `financials.json`: quarterly segments). The permanent data-centre crossover is computed, not typed: quarter ended 1 May 2022 ($3,750M vs $3,620M), reported six months before ChatGPT's 30 Nov 2022 launch.
- **AdFlex surface uses the 19 Irish retail tariffs in the AdFlex repo** (Selectra.ie, verified May 2026, c/kWh excl. VAT) with the repo's documented time bands. Peak cell: 51.08 c/kWh, Energia EV Smart Drive Plus, 17:00–19:00.
- **Meridian process map is a simplified 13-of-26-activity view** with relative edge weights (1–3), not counts. — The raw BPI 2017 log can't be downloaded in this sandbox (4TU host blocked), so no edge frequencies are invented; the only numbers shown are Meridian's published ones (7.2-day median wait into A_Validating, 23.7% of case time; 51.5% of cases with rework; the A_Incomplete ⇄ A_Validating loop).
- **Scope tiers (cluster size in the Index) are my classification** — 3 = shipped product or multi-module system, 2 = full app / sourced case / client work, 1 = single-feature experiment. Never usage numbers. **[check]** the tier per project in `src/content/projects.ts`.
- **Tier-1 rooms follow the pre-answered list: Hold My Code, NVIDIA, Meridian, AdFlex.** — The brief's storyboard also gave Starbucks a room and GridPeer a scene; the pre-answer ("everything else goes in the Index") is newer, so both move to the Index (still in the table, clusters and SQL console). This also removes two particle states from the byte budget.

## Rejected ideas

_(filled in as they come up)_
