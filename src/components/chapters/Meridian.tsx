import { Chapter, Eyebrow, Scene } from "@/components/Chapter";
import { meridianRoom, processMap } from "@/content/cases";

export function Meridian() {
  const bottleneck = processMap.edges.find((e) => e.bottleneck)!;
  const label = (id: string) => processMap.nodes.find((n) => n.id === id)!.label;
  return (
    <Chapter id="meridian" poster="process" label="04 — In progress">
      <Scene state="process" className="wrap flex flex-col justify-between gap-16 py-[16vh]" minHeight="170svh">
        <div className="scrim max-w-[42rem]">
          <Eyebrow index="04">{meridianRoom.eyebrow}</Eyebrow>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <h2 id="meridian-title" className="t-chapter">
              {meridianRoom.title}
            </h2>
          </div>
          <p className="mt-5">
            <span className="tag">
              <span aria-hidden className="dot border border-signal" />
              In progress
            </span>
          </p>
          <p className="t-lead mt-5 text-paper-2">{meridianRoom.claim}</p>
        </div>
        <div className="scrim max-w-[28rem] lg:ml-auto">
          <p className="t-label text-signal">Where the time goes</p>
          <p className="t-title mt-3">Every moving point is a case.</p>
          <p className="t-body mt-3">
            Cases pile up between <span className="t-mono text-paper">{label(bottleneck.from)}</span> and{" "}
            <span className="t-mono text-paper">{label(bottleneck.to)}</span>: a 7.2-day median wait, 23.7% of all case
            time. The loop back through <span className="t-mono text-paper">A_Incomplete</span> is the biggest source of
            rework. The map shows 13 of the log&rsquo;s 26 activities; line weights are relative.
          </p>
        </div>
      </Scene>
      <div className="wrap relative z-[1] space-y-10 pb-[14vh]">
        <dl className="grid gap-x-[var(--gutter)] gap-y-8 border-t border-rule pt-6 sm:grid-cols-3">
          {meridianRoom.proof.map((p) => (
            <div key={p.label}>
              <dt className="sr-only">{p.label}</dt>
              <dd>
                <span className="t-num block">{p.value}</span>
                <span className="t-body mt-2 block !text-[15px]">{p.label}</span>
              </dd>
            </div>
          ))}
        </dl>
        <div className="flex flex-wrap gap-3">
          {meridianRoom.links.map((l) => (
            <a key={l.href} href={l.href} className="btn btn-ghost" target="_blank" rel="noreferrer">
              {l.label}
            </a>
          ))}
        </div>
        <p className="text-[13px] text-paper-3">Sources: {meridianRoom.sourceNote}</p>
      </div>
    </Chapter>
  );
}
