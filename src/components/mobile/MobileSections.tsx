"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, AtSign, Copy, Link2, Mail, Play } from "lucide-react";
import { IosGlyph, IosGroup, IosRow, IosTitle } from "@/components/mobile/ios";
import { FolderIcon } from "@/components/desktop/FolderIcon";
import { useToast } from "@/components/Toast";
import { caseStudies, education, groups, holdMyCode as app, profile, projects, toolkit, type ProjectGroup } from "@/lib/data";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Hold My Code as an iOS App Store product page                        */
/* ------------------------------------------------------------------ */

export function MobileHoldMyCode() {
  const [more, setMore] = useState(false);
  const [playing, setPlaying] = useState(false);

  const info = [
    ["Version", app.version, `Updated ${app.latestRelease.replace(" 2026", "")}`],
    ["Agents", String(app.agents.length), "watched"],
    ["Runs on", "macOS", "14 or later"],
    ["Price", "Free", "no account"],
    ["Developer", "Vedant", "solo build"],
  ];

  return (
    <div className="text-white">
      {/* header */}
      <div className="flex gap-4">
        <Image src="/hmc/app-icon.png" alt="Hold My Code app icon" width={112} height={112} className="size-28 shrink-0 rounded-[24px]" />
        <div className="flex min-w-0 flex-col">
          <h2 id="hmc-title-m" className="text-[22px] leading-tight font-semibold">
            {app.name}
          </h2>
          <p className="mt-0.5 text-[15px] leading-snug text-white/60">Keeps your Mac awake while coding agents work</p>
          <div className="mt-auto flex items-center gap-3 pt-2">
            <a
              href={app.site}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-accent px-5 py-1.5 text-[15px] font-bold text-white no-underline"
            >
              Get
            </a>
            <span className="text-[11px] leading-tight text-white/50">Free download
              <br />for Mac</span>
          </div>
        </div>
      </div>

      {/* info strip */}
      <div className="-mx-4 mt-5 flex snap-x overflow-x-auto border-y border-white/10 px-4 py-3 [scrollbar-width:none]">
        {info.map(([k, v, s], i) => (
          <div key={k} className={cn("min-w-[6.25rem] shrink-0 snap-start px-3 text-center", i > 0 && "border-l border-white/10")}>
            <p className="text-[11px] font-semibold tracking-wide text-white/45 uppercase">{k}</p>
            <p className="mt-1 text-[20px] leading-none font-bold text-white/85">{v}</p>
            <p className="mt-1 text-[11px] text-white/45">{s}</p>
          </div>
        ))}
      </div>

      {/* what's new */}
      <div className="mt-5">
        <div className="flex items-baseline justify-between">
          <h3 className="text-[20px] font-bold">What&rsquo;s New</h3>
          <a href={app.releases} target="_blank" rel="noreferrer" className="text-[15px] text-accent no-underline">
            Version History
          </a>
        </div>
        <div className="mt-1 flex justify-between text-[14px] text-white/50">
          <span>Version {app.version}</span>
          <span>{app.latestRelease}</span>
        </div>
        <p className="mt-1.5 text-[15px] leading-snug text-white/80">{app.changelog[0].headline}. {app.changelog[1].headline}.</p>
      </div>

      {/* preview */}
      <h3 className="mt-6 text-[20px] font-bold">Preview</h3>
      <div className="-mx-4 mt-3 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1 [scrollbar-width:none]">
        <div className="relative aspect-video w-[85%] shrink-0 snap-center overflow-hidden rounded-[16px] bg-black">
          <video
            src="/hmc/walkthrough.mp4"
            poster="/hmc/walkthrough-poster.jpg"
            preload="none"
            playsInline
            controls={playing}
            onPlay={() => setPlaying(true)}
            className="h-full w-full object-cover"
          />
          {!playing && (
            <button
              type="button"
              aria-label="Play the Hold My Code walkthrough"
              onClick={(e) => {
                const v = (e.currentTarget.previousElementSibling as HTMLVideoElement | null);
                setPlaying(true);
                v?.play().catch(() => setPlaying(false));
              }}
              className="absolute inset-0 grid place-items-center"
            >
              <span className="grid size-12 place-items-center rounded-full bg-white/85">
                <Play className="ml-0.5 size-5 fill-black text-black" />
              </span>
            </button>
          )}
        </div>
        <div className="relative aspect-video w-[85%] shrink-0 snap-center overflow-hidden rounded-[16px] bg-[#1b1a26]">
          <Image src="/hmc/hero-laptop.webp" alt="Hold My Code panel on a MacBook" fill sizes="85vw" className="object-contain" />
        </div>
      </div>

      {/* description */}
      <p className={cn("mt-5 text-[15px] leading-[1.5] text-white/80", !more && "line-clamp-3")}>
        {app.oneLiner} {app.features.map((f) => `${f.title}: ${f.detail}`).join(" ")}
      </p>
      {!more && (
        <button type="button" onClick={() => setMore(true)} className="text-[15px] text-accent">
          more
        </button>
      )}

      {/* information */}
      <h3 className="mt-6 mb-2 text-[20px] font-bold">Information</h3>
      <IosGroup>
        <IosRow label="Developer" detail="Vedant Ambre" />
        <IosRow label="Compatibility" detail={app.requirements} />
        <IosRow label="Price" detail="Free" />
        <IosRow label="Source" detail="Private" />
        <IosRow label="Website" detail="holdmycode.xyz" href={app.site} external chevron />
      </IosGroup>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Case studies: swipeable cards                                         */
/* ------------------------------------------------------------------ */

export function MobileCases() {
  return (
    <div>
      <IosTitle id="cases-title-m">Case studies</IosTitle>
      <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1 [scrollbar-width:none]">
        {caseStudies.map((c) => (
          <a
            key={c.id}
            href={c.liveUrl ?? c.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="w-[82%] shrink-0 snap-center overflow-hidden rounded-[18px] bg-surface text-ink no-underline shadow-[0_0_0_0.5px_var(--rule)]"
          >
            {c.preview && (
              <span className="relative block aspect-[16/10] bg-chrome-2">
                <Image src={c.preview} alt="" fill sizes="82vw" className="object-cover object-top" />
              </span>
            )}
            <span className="block p-4">
              <span className="block text-[12px] font-semibold tracking-wide text-ink-3 uppercase">{c.kind}</span>
              <span className="mt-1 block text-[18px] leading-snug font-semibold">{c.name}</span>
              <span className="mt-1 line-clamp-2 block text-[14px] text-ink-3">{c.summary}</span>
              <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-fill px-3.5 py-1 text-[14px] font-semibold text-accent">
                Open <ArrowUpRight className="size-3.5" />
              </span>
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Projects: inset list, six rows until asked for more                  */
/* ------------------------------------------------------------------ */

const FILTERS: ("all" | ProjectGroup)[] = ["all", "product", "data", "case", "consulting", "experiment"];

export function MobileProjects({ onOpen }: { onOpen: (id: string) => void }) {
  const [filter, setFilter] = useState<"all" | ProjectGroup>("all");
  const [all, setAll] = useState(false);
  const list = [...projects]
    .filter((p) => filter === "all" || p.group === filter)
    .sort((a, b) => b.sort.localeCompare(a.sort));
  const shown = all ? list : list.slice(0, 6);

  return (
    <div>
      <IosTitle id="projects-title-m">Projects</IosTitle>
      <div className="-mx-4 mb-3 flex gap-2 overflow-x-auto px-4 [scrollbar-width:none]">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => {
              setFilter(f);
              setAll(false);
            }}
            className={cn(
              "min-h-9 shrink-0 rounded-full px-3.5 text-[14px] font-medium whitespace-nowrap",
              filter === f ? "bg-white text-black" : "bg-white/12 text-white/85"
            )}
          >
            {f === "all" ? "All" : groups[f].label}
          </button>
        ))}
      </div>
      <IosGroup>
        {shown.map((p) => (
          <IosRow
            key={p.id}
            onClick={() => onOpen(p.id)}
            chevron
            icon={
              p.id === "hold-my-code" ? (
                <Image src="/hmc/app-icon.png" alt="" width={32} height={32} className="size-8" />
              ) : (
                <FolderIcon className="h-7 w-8" tag={groups[p.group].tag} />
              )
            }
            label={
              <>
                <span className="block font-medium">{p.name}</span>
                <span className="block text-[13px] text-ink-3">{p.kind}</span>
              </>
            }
            detail={p.status}
          />
        ))}
        {list.length > 6 && !all && (
          <IosRow onClick={() => setAll(true)} label={<span className="text-accent">Show all {list.length}</span>} />
        )}
      </IosGroup>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* About as a Contacts card                                             */
/* ------------------------------------------------------------------ */

export function MobileAbout() {
  const [more, setMore] = useState(false);
  return (
    <div>
      <div className="flex flex-col items-center text-center text-white">
        <span className="relative size-28 overflow-hidden rounded-full shadow-[0_0_0_3px_rgba(255,255,255,0.15)]">
          <Image src="/vedant.jpg" alt="Vedant Ambre" fill sizes="112px" className="object-cover object-[45%_30%]" />
        </span>
        <h2 id="about-title-m" className="mt-3 text-[28px] leading-tight font-bold">
          {profile.name}
        </h2>
        <p className="text-[15px] text-white/60">Business analyst · {profile.location}</p>
      </div>
      <IosGroup className="mt-5">
        <IosRow label="Available" detail={`From ${profile.availableFrom}`} />
        {education.map((e) => (
          <IosRow
            key={e.degree}
            label={
              <>
                <span className="block">{e.degree}</span>
                <span className="block text-[13px] text-ink-3">
                  {e.school.split(",")[0]} · {e.period}
                </span>
              </>
            }
          />
        ))}
      </IosGroup>
      <IosGroup className="mt-4 px-4 py-3">
        <p className={cn("text-[15px] leading-[1.5] text-ink-2", !more && "line-clamp-4")}>{profile.story}</p>
        {!more && (
          <button type="button" onClick={() => setMore(true)} className="mt-1 text-[15px] text-accent">
            more
          </button>
        )}
      </IosGroup>
      <div className="mt-4 flex flex-wrap gap-2">
        {toolkit.flatMap((g) => g.items).map((i) => (
          <span key={i.name} className="rounded-full bg-white/12 px-3 py-1.5 text-[13px] text-white/85">
            {i.name}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Contact as a Settings-style action list                              */
/* ------------------------------------------------------------------ */

export function MobileContact() {
  const { toast } = useToast();
  return (
    <div>
      <IosTitle id="contact-title-m">Contact</IosTitle>
      <IosGroup>
        <IosRow
          href={`mailto:${profile.email}?subject=${encodeURIComponent("Business analyst role")}`}
          icon={
            <IosGlyph color="#0a84ff">
              <Mail className="size-4" />
            </IosGlyph>
          }
          label="Email me"
          detail={profile.email}
          chevron
        />
        <IosRow
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(profile.email);
              toast("Email address copied", profile.email);
            } catch {
              toast("Couldn't copy the address", profile.email);
            }
          }}
          icon={
            <IosGlyph color="#8e8e93">
              <Copy className="size-4" />
            </IosGlyph>
          }
          label="Copy email address"
        />
        <IosRow
          href={profile.socials.linkedin}
          external
          icon={
            <IosGlyph color="#0a66c2">
              <AtSign className="size-4" />
            </IosGlyph>
          }
          label="LinkedIn"
          chevron
        />
        <IosRow
          href={profile.socials.github}
          external
          icon={
            <IosGlyph color="#1d1d1f">
              <Link2 className="size-4" />
            </IosGlyph>
          }
          label="GitHub"
          detail="vedjr02"
          chevron
        />
      </IosGroup>
    </div>
  );
}
