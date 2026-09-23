import { Chapter, Eyebrow, Scene } from "@/components/Chapter";
import { education, toolkit } from "@/content/about";
import { profile } from "@/content/profile";

export function About() {
  return (
    <Chapter id="about" label="06 — About">
      <Scene state="portrait" className="wrap grid items-center py-[16vh] lg:grid-cols-12" minHeight="140svh">
        <div className="scrim lg:col-span-5">
          <Eyebrow index="06">About</Eyebrow>
          <h2 id="about-title" className="t-chapter mt-6">
            A clean query can change what a team believes.
          </h2>
          <p className="t-body mt-6 max-w-[34rem]">{profile.story}</p>
          <p className="mt-6 max-w-[34rem] text-[15.5px] text-paper">
            <span className="t-label mr-2 text-signal">Now</span>
            {profile.now}
          </p>
        </div>
      </Scene>
      <div className="wrap relative z-[1] grid gap-14 pb-[16vh] lg:grid-cols-12">
        <div className="scrim lg:col-span-4">
          <h3 className="t-label">Education</h3>
          <ol className="mt-4 divide-y divide-[var(--rule)] border-y border-rule">
            {education.map((e) => (
              <li key={e.degree} className="py-4">
                <p className="text-[16px] font-medium">{e.degree}</p>
                <p className="mt-1 text-[14px] text-paper-2">
                  {e.school}, {e.place}
                </p>
                <p className="t-mono mt-1 text-[12.5px] text-paper-3">{e.period}</p>
              </li>
            ))}
          </ol>
        </div>
        <div className="scrim lg:col-span-7 lg:col-start-6">
          <h3 className="t-label">Toolkit</h3>
          <div className="mt-4 grid gap-x-[var(--gutter)] gap-y-8 sm:grid-cols-2">
            {toolkit.map((g) => (
              <div key={g.id}>
                <p className="t-title !text-[1.7rem]">{g.label}</p>
                <ul className="mt-3 divide-y divide-[var(--rule)] border-t border-rule">
                  {g.items.map((i) => (
                    <li key={i.name} className="flex items-baseline justify-between gap-4 py-2.5 text-[14.5px]">
                      <span className="font-medium">{i.name}</span>
                      <span className="text-right text-paper-3">{i.use}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Chapter>
  );
}
