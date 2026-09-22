"use client";

import { useState } from "react";
import { Copy, Send } from "lucide-react";
import { Window } from "@/components/desktop/Window";
import { useToast } from "@/components/Toast";
import { profile } from "@/lib/data";
import { Stickers } from "@/components/desktop/Stickers";

/** A Mail compose window. Send hands the draft to the visitor's own mail app. */
export function Contact() {
  const { toast } = useToast();
  const [subject, setSubject] = useState("Business analyst role");
  const [body, setBody] = useState("");

  const href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      toast("Email address copied", profile.email);
    } catch {
      toast("Couldn't copy the address", "Select it and copy it by hand.");
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative scroll-mt-14 px-3 pt-10 pb-8 sm:px-8 sm:pt-16">
      <Stickers
        items={[
          { src: "/stickers/mark.webp", w: 52, x: "calc(50% + 470px)", y: 120, r: 5 },
          { text: "\\(^o^)/", mono: true, size: 15, x: "calc(50% - 560px)", y: 200, r: -5 },
          { src: "/stickers/clock.webp", w: 46, x: "calc(50% - 540px)", y: 420, r: 8 },
          { src: "/stickers/folder-dev.webp", w: 48, x: "calc(50% + 500px)", y: 380, r: -6 },
        ]}
      />
      <div className="mx-auto max-w-[820px]">
        <Window
          title="New Message"
          labelId="contact-title"
          toolbar={
            <a href={href} className="btn btn-sm btn-default" aria-label="Send: opens your mail app with this draft">
              <Send className="size-3.5" />
              Send
            </a>
          }
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              window.location.href = href;
            }}
          >
            <div className="flex items-center gap-3 border-b border-rule px-5 py-2.5 text-[14px]">
              <span className="w-16 shrink-0 text-ink-3">To:</span>
              <span className="min-w-0 flex-1 truncate">
                <span className="rounded-[5px] bg-select-soft px-1.5 py-0.5 text-[#0b4fbf]">{profile.name}</span>{" "}
                <span className="text-ink-3 select-all">{profile.email}</span>
              </span>
              <button type="button" onClick={copy} className="btn btn-sm btn-plain shrink-0" aria-label="Copy email address">
                <Copy className="size-3.5" />
                <span className="hidden sm:inline">Copy</span>
              </button>
            </div>
            <label className="flex items-center gap-3 border-b border-rule px-5 py-2.5 text-[14px]">
              <span className="w-16 shrink-0 text-ink-3">Subject:</span>
              <input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="min-w-0 flex-1 bg-transparent py-1 text-[16px] outline-none sm:text-[14px]"
              />
            </label>
            <label className="block px-5 pt-4 pb-2">
              <span className="sr-only">Message</span>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={6}
                placeholder={`Hi Vedant,\n\nWe're hiring for…`}
                className="w-full resize-y bg-transparent text-[16px] leading-[1.55] outline-none placeholder:text-ink-4 sm:text-[15px]"
              />
            </label>
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-rule bg-chrome px-5 py-3 text-[13px] text-ink-3">
              <span>Send opens your own mail app with this draft.</span>
              <span className="flex gap-3">
                <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" className="text-accent hover:underline">
                  LinkedIn
                </a>
                <a href={profile.socials.github} target="_blank" rel="noreferrer" className="text-accent hover:underline">
                  GitHub
                </a>
              </span>
            </div>
          </form>
        </Window>
      </div>

      <footer className="vibrant mx-auto mt-16 mb-28 w-fit max-w-[calc(100%-1rem)] rounded-full px-4 py-2 text-center text-[12.5px] text-ink-2 shadow-menu">
        © {new Date().getFullYear()} {profile.name}. Built as a Mac desktop, in Next.js.
      </footer>
    </section>
  );
}
