import { Chapter, Eyebrow, Scene } from "@/components/Chapter";
import { HmcPanel } from "@/components/HmcPanel";
import { holdMyCode as app } from "@/content/holdMyCode";

export function Flagship() {
  return (
    <Chapter id="flagship" label="02 — Flagship">
      <Scene state="macbook" className="wrap grid items-center gap-12 py-[14vh] lg:grid-cols-12" minHeight="140svh">
        <div className="scrim lg:col-span-5">
          <Eyebrow index="02">Flagship · macOS app</Eyebrow>
          <h2 id="flagship-title" className="t-chapter mt-6">
            {app.name}
          </h2>
          <p className="t-lead mt-5 text-paper">{app.oneLiner}</p>
          <dl className="t-mono mt-8 grid max-w-[30rem] grid-cols-2 gap-px overflow-hidden rounded-[10px] bg-[var(--rule)] text-[13px] sm:grid-cols-4">
            {[
              ["Version", app.version],
              ["Released", app.latestRelease.replace(" 2026", "")],
              ["Runs on", "macOS 14+"],
              ["Agents", String(app.agents.length)],
            ].map(([k, v]) => (
              <div key={k} className="bg-bg px-3 py-2.5">
                <dt className="text-[10.5px] tracking-[0.08em] text-paper-3 uppercase">{k}</dt>
                <dd className="mt-1 text-paper">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={app.download} className="btn btn-signal">
              Download for Mac
            </a>
            <a href={app.site} className="btn btn-ghost" target="_blank" rel="noreferrer">
              holdmycode.xyz
            </a>
          </div>
          <p className="mt-4 text-[13px] text-paper-3">
            Free · {app.requirements} · {app.platforms} · {app.source}
          </p>
        </div>
        <div className="flex flex-col items-center lg:col-span-6 lg:col-start-7">
          <div data-anchor="laptop-screen" className="relative">
            <HmcPanel />
          </div>
          <p className="t-label mt-4 max-w-[20rem] text-center !normal-case !tracking-normal">
            The panel is live; the values are a demo.
          </p>
        </div>
      </Scene>

      <Scene state="macbook-closed" className="wrap flex flex-col justify-center py-[12vh]" minHeight="150svh">
        <div className="scrim max-w-[44rem]">
          <p className="t-label">Lid closed</p>
          <p className="t-chapter mt-5">
            The lid closes.
            <br />
            <em className="text-signal">The Mac stays awake.</em>
          </p>
          <p className="t-body mt-6 max-w-[34rem]">
            Each stream is one agent reporting through its own hooks. While any of them is working, a privileged helper
            keeps the machine running with the lid shut. When the last one stops, the Mac sleeps normally.
          </p>
          <ul aria-label="Agents Hold My Code watches" className="mt-7 flex max-w-[36rem] flex-wrap gap-2">
            {app.agents.map((a) => (
              <li key={a.name} className="tag !normal-case !tracking-normal !text-[12.5px]">
                <span aria-hidden className="dot" style={{ background: a.color }} />
                {a.name}
              </li>
            ))}
          </ul>
        </div>
      </Scene>

      <div className="wrap relative z-[1] pb-[16vh]">
        <div className="grid gap-12 border-t border-rule pt-10 lg:grid-cols-12">
          <div className="scrim lg:col-span-7">
            <h3 className="t-title">How I ran it, as an analyst</h3>
            <ol className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {app.decisions.map((d, i) => (
                <li key={d.title}>
                  <p className="t-label text-signal">{String(i + 1).padStart(2, "0")}</p>
                  <p className="mt-2 text-[18px] leading-snug font-medium">{d.title}</p>
                  <p className="t-body mt-2 !text-[15.5px]">{d.detail}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="scrim lg:col-span-4 lg:col-start-9">
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="t-label">Release notes</h3>
              <a href={app.releases} className="link text-[13px]" target="_blank" rel="noreferrer">
                All releases
              </a>
            </div>
            <ol className="mt-4 divide-y divide-[var(--rule)] border-y border-rule">
              {app.changelog.map((r) => (
                <li key={r.version} className="grid grid-cols-[3.4rem_3.6rem_1fr] items-baseline gap-2 py-3 text-[14px]">
                  <span className="t-mono text-paper">{r.version}</span>
                  <span className="t-mono text-paper-3">{r.date}</span>
                  <span className="text-paper-2">{r.headline}</span>
                </li>
              ))}
            </ol>
            <h3 className="t-label mt-10">What it does</h3>
            <ul className="mt-4 space-y-4">
              {app.features.map((f) => (
                <li key={f.title}>
                  <p className="text-[15.5px] font-medium">{f.title}</p>
                  <p className="t-body mt-1 !text-[14.5px]">{f.detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Chapter>
  );
}
