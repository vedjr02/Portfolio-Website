"use client";

import { profile } from "@/lib/data";
import { DoodleNote } from "@/components/Doodles";

export function Footer() {
  return (
    <footer id="contact" className="relative pt-16 md:pt-24 pb-10">
      <div className="mx-auto max-w-5xl px-5 md:px-6">
        <div className="surface overflow-hidden bg-bg-deep border-line">
          <div className="p-8 md:p-12 relative">
            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent/20 blur-3xl" />
            <div className="absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-sage/15 blur-3xl" />

            <p className="relative text-xs font-bold uppercase tracking-[0.18em] text-accent mb-4">
              Contact
            </p>
            <h2 className="relative font-display text-[clamp(1.85rem,4vw,2.85rem)] leading-[1.1] tracking-tight max-w-2xl text-ink">
              Looking for a BA who ships?
            </h2>
            <p className="relative mt-5 max-w-xl text-ink-soft leading-relaxed">
              I got you — requirements, dashboards, and numbers you can defend
              with stakeholders. Email me and let&apos;s talk.
            </p>
            <div className="relative mt-8 flex w-full flex-wrap items-center gap-y-4">
              <a
                href={profile.socials.email}
                className="relative inline-flex btn-primary text-base shrink-0"
              >
                {profile.email}
              </a>
              <div className="ml-auto hidden md:flex min-w-0 pl-6">
                <DoodleNote
                  label="say hi"
                  direction="left"
                  size="xxl"
                  rotate={-2}
                  align="end"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted mb-3">
              Navigate
            </p>
            <ul className="space-y-2 text-sm font-semibold text-ink-soft">
              <li><a href="#showcase" className="hover:text-accent">Cases</a></li>
              <li><a href="#archive" className="hover:text-accent">Projects</a></li>
              <li><a href="#story" className="hover:text-accent">About</a></li>
              <li><a href="#contact" className="hover:text-accent">Contact</a></li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted mb-3">
              Social
            </p>
            <ul className="space-y-2 text-sm font-semibold text-ink-soft">
              <li>
                <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-accent">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href={profile.socials.github} target="_blank" rel="noreferrer" className="hover:text-accent">
                  GitHub
                </a>
              </li>
              <li>
                <a href={profile.socials.email} className="hover:text-accent">
                  Email
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted mb-3">
              Now
            </p>
            <p className="text-sm text-ink-soft leading-relaxed">{profile.now}</p>
          </div>
        </div>

        <div className="mt-10 flex flex-col md:flex-row md:items-center justify-between gap-3 border-t border-line pt-6">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-muted">
            © {new Date().getFullYear()} Vedant Ambre
          </p>
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-muted">
            Paper studio · Business Analyst
          </p>
        </div>
      </div>
    </footer>
  );
}
