import { Chapter, Eyebrow, Scene } from "@/components/Chapter";
import {
  adflexRoom,
  chatGptLaunch,
  nvidiaCrossover,
  nvidiaEvents,
  nvidiaRoom,
  rejectedClaims,
  tariffSurface,
  type Room,
} from "@/content/cases";
import { tariffs } from "@/content/data/tariffs";

const money = (m: number) => `$${m.toLocaleString("en-US")}M`;
const longDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

function Proof({ room }: { room: Room }) {
  return (
    <dl className="grid gap-x-[var(--gutter)] gap-y-8 border-t border-rule pt-6 sm:grid-cols-3">
      {room.proof.map((p) => (
        <div key={p.label}>
          <dt className="sr-only">{p.label}</dt>
          <dd>
            <span className="t-num block text-paper">{p.value}</span>
            <span className="t-body mt-2 block !text-[15px]">{p.label}</span>
          </dd>
        </div>
      ))}
    </dl>
  );
}

function Links({ room }: { room: Room }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {room.links.map((l, i) => (
        <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className={`btn ${i === 0 ? "btn-signal" : "btn-ghost"}`}>
          {l.label}
        </a>
      ))}
    </div>
  );
}

export function NvidiaRoom() {
  const c = nvidiaCrossover;
  return (
    <Chapter id="nvidia" label="03.1 — NVIDIA">
      <Scene state="timeline" className="wrap pt-[18vh]" minHeight="130svh">
        <div className="scrim max-w-[44rem]">
          <Eyebrow index="03.1">{nvidiaRoom.eyebrow}</Eyebrow>
          <h2 id="nvidia-title" className="t-chapter mt-6">
            {nvidiaRoom.title}
          </h2>
          <p className="t-lead mt-5 text-paper-2">{nvidiaRoom.claim}</p>
        </div>
      </Scene>

      <Scene state="timeline-rejected" className="wrap flex items-end pb-[16vh]" minHeight="120svh">
        <div className="scrim max-w-[38rem]">
          <p className="t-label !text-rejected">Rejected · {rejectedClaims.length} claims</p>
          <p className="t-title mt-4">Claims that couldn&rsquo;t be sourced don&rsquo;t get deleted. They get logged.</p>
          <p className="t-body mt-4">
            {rejectedClaims.length} widely repeated figures failed the sourcing standard: a filing, an investor release, a
            government publication, the counterparty&rsquo;s own announcement, or wire reporting. Each one keeps its reason.
          </p>
        </div>
      </Scene>

      <Scene state="crossover" className="wrap flex items-center" minHeight="130svh">
        <div className="scrim max-w-[34rem]">
          <div>
            <p className="t-label text-signal">The crossover</p>
            <p className="t-chapter mt-5">Six months before ChatGPT.</p>
          </div>
          <div className="mt-8">
            <p className="t-body">
              In the quarter to {longDate(c.end)} ({c.quarter.replace("FY", "fiscal ")}), data centre revenue passed gaming
              for good: <span className="t-mono text-paper">{money(c.dataCenter)}</span> against{" "}
              <span className="t-mono text-paper">{money(c.gaming)}</span>. ChatGPT launched on {longDate(chatGptLaunch)}.
              The AI demand shock landed on a business that had already changed.
            </p>
          </div>
        </div>
      </Scene>

      <div className="wrap relative z-[1] space-y-10 pb-[14vh]">
        <Proof room={nvidiaRoom} />
        <Links room={nvidiaRoom} />
        <p className="text-[13px] text-paper-3">Sources: {nvidiaRoom.sourceNote}</p>
        <div className="grid gap-6 lg:grid-cols-2">
          <details className="rounded-[12px] border border-rule bg-[rgb(21_20_29/0.9)] p-5">
            <summary className="cursor-pointer text-[15px] font-medium">All {nvidiaEvents.length} sourced events</summary>
            <ol className="mt-4 max-h-[26rem] space-y-2 overflow-y-auto pr-2 text-[14px]">
              {nvidiaEvents.map((e) => (
                <li key={e.id} className="grid grid-cols-[6.5rem_1fr] gap-3">
                  <span className="t-mono text-paper-3">{e.date}</span>
                  <span>
                    {e.title}{" "}
                    <a href={e.source} className="link text-paper-3" target="_blank" rel="noreferrer">
                      {e.sourceHost}
                    </a>
                  </span>
                </li>
              ))}
            </ol>
          </details>
          <details className="rounded-[12px] border border-rule bg-[rgb(21_20_29/0.9)] p-5">
            <summary className="cursor-pointer text-[15px] font-medium">
              <span className="text-rejected">{rejectedClaims.length} rejected claims</span>, with reasons
            </summary>
            <ol className="mt-4 max-h-[26rem] space-y-4 overflow-y-auto pr-2 text-[14px]">
              {rejectedClaims.map((r) => (
                <li key={r.claim}>
                  <p className="text-paper line-through decoration-[var(--rejected)]">{r.claim}</p>
                  <p className="mt-1 text-paper-2">{r.reason}</p>
                </li>
              ))}
            </ol>
          </details>
        </div>
      </div>
    </Chapter>
  );
}

export function AdflexRoom() {
  const { peak, min, max } = tariffSurface;
  const hh = (h: number) => `${String(h).padStart(2, "0")}:00`;
  return (
    <Chapter id="adflex" label="03.2 — AdFlex">
      <Scene state="surface" className="wrap flex flex-col justify-between gap-16 py-[16vh]" minHeight="160svh">
        <div className="scrim max-w-[40rem]">
          <Eyebrow index="03.2">{adflexRoom.eyebrow}</Eyebrow>
          <h2 id="adflex-title" className="t-chapter mt-6">
            {adflexRoom.title}
          </h2>
          <p className="t-lead mt-5 text-paper-2">{adflexRoom.claim}</p>
        </div>
        <div className="scrim max-w-[26rem] lg:ml-auto">
          <p className="t-label text-signal">The peak ridge</p>
          <p className="t-title mt-3">
            {hh(peak.hour)}–{hh(peak.hour + 2)}
          </p>
          <p className="t-body mt-3">
            The evening peak band is where plans split furthest: from {min.toFixed(2)} to{" "}
            <span className="t-mono text-paper">{max.toFixed(2)} c/kWh</span> across the day, topping out on {peak.plan}.
            Height is price; width is the hour; depth is {tariffs.length} plans, cheapest first.
          </p>
        </div>
      </Scene>
      <div className="wrap relative z-[1] space-y-10 pb-[14vh]">
        <Proof room={adflexRoom} />
        <Links room={adflexRoom} />
        <p className="text-[13px] text-paper-3">Sources: {adflexRoom.sourceNote}</p>
      </div>
    </Chapter>
  );
}
