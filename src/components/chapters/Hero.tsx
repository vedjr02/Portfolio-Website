import Link from "next/link";
import { Chapter, Scene } from "@/components/Chapter";
import { profile } from "@/content/profile";

export function Hero() {
  return (
    <Chapter id="hero" poster="noise" label="00 — Noise">
      <Scene state="noise" className="wrap flex flex-col pt-[calc(var(--nav-h)+env(safe-area-inset-top))]">
        <div className="flex flex-1 flex-col justify-end pb-[max(40px,7vh)]">
          <p className="t-label mb-6 flex items-center gap-3">
            <span className="text-signal">00</span>
            <span aria-hidden className="h-px w-8" style={{ background: "var(--rule-strong)" }} />
            <span>Every pixel on this page is a data point</span>
          </p>
          <h1 id="hero-title" className="t-display -ml-[0.04em]">
            {profile.firstName}
            <br />
            {profile.lastName}
          </h1>
          <div className="scrim mt-8 grid gap-8 md:mt-10 md:grid-cols-12 md:items-end">
            <div className="md:col-span-6">
              <p className="t-lead text-paper">{profile.positioning}</p>
              <p className="t-body mt-3 max-w-[34rem]">
                {profile.thesis} The latest is Hold My Code, a macOS app that keeps a Mac awake while coding
                agents work, even with the lid closed.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href="#method" className="btn btn-signal">
                  See the work
                </a>
                <Link href="/cv" className="btn btn-ghost">
                  60-second version
                </Link>
              </div>
            </div>
            <dl className="t-mono grid grid-cols-[auto_1fr] gap-x-5 gap-y-1.5 text-[13px] md:col-span-5 md:col-start-8 md:justify-self-end">
              <dt className="text-paper-3">Based in</dt>
              <dd>{profile.location}</dd>
              <dt className="text-paper-3">Studying</dt>
              <dd>MSc Business Analytics, Maynooth</dd>
              <dt className="text-paper-3">Available</dt>
              <dd>{profile.availability.replace("Available from ", "From ")}</dd>
            </dl>
          </div>
        </div>
      </Scene>
    </Chapter>
  );
}
