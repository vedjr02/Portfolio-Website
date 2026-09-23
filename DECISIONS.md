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

_(filled in during Phase 0)_

## Rejected ideas

_(filled in as they come up)_
