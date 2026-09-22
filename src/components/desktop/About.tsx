import Image from "next/image";
import { Window } from "@/components/desktop/Window";
import { education, profile, toolkit } from "@/lib/data";
import { Stickers } from "@/components/desktop/Stickers";

/** "About This Mac", for a person. Next to it, the toolkit as a System Settings pane. */
export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative scroll-mt-14 px-3 py-10 sm:px-8 sm:py-16">
      <Stickers
        items={[
          { src: "/stickers/terminal.webp", w: 48, x: "calc(50% - 668px)", y: 200, r: 7 },
          { text: "\u{1F50B}", size: 28, x: "calc(50% + 628px)", y: 520, r: -8 },
        ]}
      />
      <div className="mx-auto grid max-w-[1180px] items-start gap-6 lg:grid-cols-[1.45fr_1fr] lg:gap-8">
        <Window title="About Vedant" labelId="about-title" bodyClassName="grid gap-8 p-5 sm:grid-cols-[13rem_1fr] sm:p-8">
          <div className="relative mx-auto aspect-[4/5] w-44 overflow-hidden rounded-[10px] shadow-[0_0_0_0.5px_rgba(0,0,0,0.2),0_10px_24px_-10px_rgba(0,0,0,0.4)] sm:mx-0 sm:w-full">
            <Image
              src="/vedant.jpg"
              alt="Vedant standing on a green in Maynooth on a sunny evening"
              fill
              sizes="(max-width: 640px) 176px, 208px"
              className="object-cover object-[45%_42%]"
            />
          </div>

          <div className="min-w-0">
            <p className="text-[clamp(1.75rem,3vw,2.25rem)] leading-[1.05] font-semibold tracking-[-0.03em]">
              {profile.name}
            </p>
            <p className="mt-1 text-[15px] text-ink-3">Business analyst · {profile.location}</p>

            <dl className="mt-6 grid grid-cols-[6.5rem_1fr] gap-x-4 gap-y-2.5 text-[14px]">
              <dt className="text-right font-medium text-ink-2">Available</dt>
              <dd>From {profile.availableFrom}</dd>
              {education.map((e, i) => (
                <div key={e.degree} className="contents">
                  <dt className="text-right font-medium text-ink-2">{i === 0 ? "Studying" : i === 1 ? "Degree" : "Diploma"}</dt>
                  <dd>
                    {e.degree}
                    <span className="block text-[13px] text-ink-3">
                      {e.school}, {e.place} · {e.period}
                    </span>
                  </dd>
                </div>
              ))}
              <dt className="text-right font-medium text-ink-2">Now</dt>
              <dd>{profile.now}</dd>
            </dl>

            <p className="mt-6 max-w-[62ch] border-t border-rule pt-5 text-[15px] leading-[1.6] text-ink-2">
              {profile.story}
            </p>
          </div>
        </Window>

        <Window title="Toolkit" bodyClassName="bg-sidebar p-4 sm:p-5">
          <div className="space-y-5">
            {toolkit.map((group) => (
              <div key={group.id}>
                <h3 className="px-1 pb-1.5 text-[12.5px] font-semibold text-ink-3">{group.label}</h3>
                <ul className="divide-y divide-rule overflow-hidden rounded-[10px] bg-surface shadow-[0_0_0_0.5px_rgba(0,0,0,0.1)]">
                  {group.items.map((item) => (
                    <li key={item.name} className="flex items-baseline justify-between gap-4 px-3.5 py-2.5 text-[13.5px]">
                      <span className="font-medium">{item.name}</span>
                      <span className="text-right text-ink-3">{item.use}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Window>
      </div>
    </section>
  );
}
