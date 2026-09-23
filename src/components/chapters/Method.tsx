import { Chapter, Eyebrow, Scene } from "@/components/Chapter";
import { method } from "@/content/method";

export function Method() {
  return (
    <Chapter id="method" poster="columns" label="01 — Method">
      <Scene state="histogram" className="wrap flex items-center py-[18vh]">
        <div className="scrim max-w-[46rem]">
          <Eyebrow index="01">Method · sort before you build</Eyebrow>
          <h2 id="method-title" className="t-chapter mt-6">
            Noise in. A decision out. Then the thing that ships.
          </h2>
          <p className="t-body mt-6 max-w-[34rem]">
            Most of the job is sorting: turning a pile of asks, logs and filings into one question worth answering.
            The same four steps run through everything below.
          </p>
        </div>
      </Scene>
      <Scene state="columns" className="wrap flex flex-col justify-end pb-[10vh]" minHeight="130svh">
        <ol className="grid gap-x-[var(--gutter)] gap-y-8 border-t border-rule pt-6 sm:grid-cols-2 lg:grid-cols-4">
          {method.map((step) => (
            <li key={step.id} className="scrim" data-anchor={`column-${step.id}`}>
              <p className="t-label text-signal">{step.index}</p>
              <h3 className="t-title mt-3 !text-[clamp(1.6rem,2.4vw,2.2rem)]">{step.title}</h3>
              <p className="t-body mt-3 !text-[15.5px]">{step.example}</p>
            </li>
          ))}
        </ol>
      </Scene>
    </Chapter>
  );
}
