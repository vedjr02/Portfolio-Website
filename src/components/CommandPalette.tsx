"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { featuredProjects, projects, profile, sideProjects } from "@/lib/data";
import { useCommand } from "@/components/CommandProvider";
import { useToast } from "@/components/Toast";

type CommandItem = {
  id: string;
  label: string;
  hint: string;
  group: string;
  keywords?: string;
  action: () => void;
};

const RECENT_KEY = "va-cmd-recent";
const RECENT_MAX = 5;

function readRecent(): string[] {
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed)
      ? parsed.filter((x): x is string => typeof x === "string")
      : [];
  } catch {
    return [];
  }
}

function pushRecent(id: string) {
  try {
    const next = [id, ...readRecent().filter((x) => x !== id)].slice(
      0,
      RECENT_MAX
    );
    localStorage.setItem(RECENT_KEY, JSON.stringify(next));
  } catch {
    /* ignore quota / private mode */
  }
}

/** Lightweight fuzzy score — higher is better; -1 = no match */
function fuzzyScore(query: string, ...fields: string[]): number {
  const q = query.trim().toLowerCase();
  if (!q) return 0;
  const text = fields.join(" ").toLowerCase();
  if (!text) return -1;
  if (text === q) return 1000;
  if (text.startsWith(q)) return 850;
  if (text.includes(q)) return 700;

  let qi = 0;
  let score = 0;
  let streak = 0;
  let last = -2;
  for (let i = 0; i < text.length && qi < q.length; i++) {
    if (text[i] === q[qi]) {
      score += 12;
      if (i === last + 1) {
        streak += 1;
        score += 6 * streak;
      } else {
        streak = 0;
      }
      if (i === 0 || /[\s·\-_/]/.test(text[i - 1] ?? "")) score += 10;
      last = i;
      qi += 1;
    }
  }
  return qi === q.length ? score : -1;
}

function caseShareUrl(id: string) {
  const url = new URL(window.location.href);
  url.searchParams.set("case", id);
  url.hash = "showcase";
  return url.toString();
}

export function CommandPalette() {
  const { open, setOpen } = useCommand();
  const { toast } = useToast();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [recentIds, setRecentIds] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const track = useCallback((id: string, run: () => void) => {
    pushRecent(id);
    setRecentIds(readRecent());
    run();
  }, []);

  const items = useMemo<CommandItem[]>(() => {
    const jump = (sectionId: string) => {
      setOpen(false);
      document
        .getElementById(sectionId)
        ?.scrollIntoView({ behavior: "smooth" });
    };

    const list: CommandItem[] = [
      {
        id: "sec-story",
        label: "Jump to About",
        hint: "Story & photo",
        group: "Navigate",
        keywords: "about story bio",
        action: () => track("sec-story", () => jump("story")),
      },
      {
        id: "sec-showcase",
        label: "Jump to Cases",
        hint: "Featured case studies",
        group: "Navigate",
        keywords: "cases showcase starbucks nvidia",
        action: () => track("sec-showcase", () => jump("showcase")),
      },
      {
        id: "sec-archive",
        label: "Jump to Projects",
        hint: "Full project list",
        group: "Navigate",
        keywords: "projects archive builds",
        action: () => track("sec-archive", () => jump("archive")),
      },
      {
        id: "sec-skills",
        label: "Jump to Skills",
        hint: "How I work with data",
        group: "Navigate",
        keywords: "skills capabilities",
        action: () => track("sec-skills", () => jump("skills")),
      },
      {
        id: "sec-education",
        label: "Jump to Path",
        hint: "Education",
        group: "Navigate",
        keywords: "path education maynooth",
        action: () => track("sec-education", () => jump("education")),
      },
      {
        id: "sec-contact",
        label: "Jump to Contact",
        hint: "Email & socials",
        group: "Navigate",
        keywords: "contact email hire",
        action: () => track("sec-contact", () => jump("contact")),
      },
      {
        id: "copy-email",
        label: "Copy email",
        hint: profile.email,
        group: "Actions",
        keywords: "email copy contact",
        action: async () => {
          await navigator.clipboard.writeText(profile.email);
          track("copy-email", () => {
            setOpen(false);
            toast("Copied email");
          });
        },
      },
      {
        id: "open-linkedin",
        label: "Open LinkedIn",
        hint: "Profile",
        group: "Actions",
        action: () =>
          track("open-linkedin", () => {
            window.open(
              profile.socials.linkedin,
              "_blank",
              "noopener,noreferrer"
            );
            setOpen(false);
          }),
      },
      {
        id: "open-github",
        label: "Open GitHub",
        hint: "vedjr02",
        group: "Actions",
        action: () =>
          track("open-github", () => {
            window.open(
              profile.socials.github,
              "_blank",
              "noopener,noreferrer"
            );
            setOpen(false);
          }),
      },
    ];

    featuredProjects.forEach((p) => {
      const short =
        p.id === "starbucks"
          ? "Starbucks"
          : p.id === "nvidia"
            ? "NVIDIA"
            : p.title;
      list.push({
        id: `copy-case-${p.id}`,
        label: `Copy case link · ${short}`,
        hint: "Shareable URL",
        group: "Cases",
        keywords: `${p.title} ${p.id} case link share copy`,
        action: async () => {
          await navigator.clipboard.writeText(caseShareUrl(p.id));
          track(`copy-case-${p.id}`, () => {
            setOpen(false);
            toast(`Copied ${short} link`);
          });
        },
      });
      list.push({
        id: `open-case-${p.id}`,
        label: `Open case · ${short}`,
        hint: "Jump to Cases",
        group: "Cases",
        keywords: `${p.title} ${p.id} case study`,
        action: () =>
          track(`open-case-${p.id}`, () => {
            setOpen(false);
            const url = new URL(window.location.href);
            url.searchParams.set("case", p.id);
            url.hash = "showcase";
            window.history.replaceState({}, "", url.toString());
            document
              .getElementById("showcase")
              ?.scrollIntoView({ behavior: "smooth" });
            window.dispatchEvent(
              new CustomEvent("va:select-case", { detail: p.id })
            );
          }),
      });
    });

    projects.forEach((p) => {
      if (p.liveUrl) {
        list.push({
          id: `live-${p.id}`,
          label: `Open live · ${p.title}`,
          hint: p.category,
          group: "Projects",
          keywords: p.title,
          action: () =>
            track(`live-${p.id}`, () => {
              window.open(p.liveUrl, "_blank", "noopener,noreferrer");
              setOpen(false);
            }),
        });
      }
      if (p.repoUrl) {
        list.push({
          id: `repo-${p.id}`,
          label: `GitHub · ${p.title}`,
          hint: "Repository",
          group: "Projects",
          keywords: p.title,
          action: () =>
            track(`repo-${p.id}`, () => {
              window.open(p.repoUrl, "_blank", "noopener,noreferrer");
              setOpen(false);
            }),
        });
      }
    });

    sideProjects.forEach((p) => {
      list.push({
        id: `side-${p.id}`,
        label: p.name,
        hint: "Side project",
        group: "Side projects",
        keywords: p.blurb,
        action: () =>
          track(`side-${p.id}`, () => {
            window.open(p.href, "_blank", "noopener,noreferrer");
            setOpen(false);
          }),
      });
    });

    return list;
  }, [setOpen, toast, track]);

  const filtered = useMemo(() => {
    const q = query.trim();
    if (!q) {
      const recent = recentIds
        .map((id) => items.find((i) => i.id === id))
        .filter((i): i is CommandItem => !!i)
        .map((i) => ({ ...i, group: "Recent" }));
      const rest = items.filter((i) => !recentIds.includes(i.id));
      return [...recent, ...rest];
    }

    return items
      .map((item) => ({
        item,
        score: fuzzyScore(
          q,
          item.label,
          item.hint,
          item.group,
          item.keywords ?? ""
        ),
      }))
      .filter((x) => x.score >= 0)
      .sort((a, b) => b.score - a.score)
      .map((x) => x.item);
  }, [items, query, recentIds]);

  useEffect(() => {
    if (!open) {
      setQuery("");
      setActive(0);
      return;
    }
    setRecentIds(readRecent());
    const t = window.setTimeout(() => inputRef.current?.focus(), 40);
    return () => window.clearTimeout(t);
  }, [open]);

  useEffect(() => {
    setActive(0);
  }, [query, filtered.length]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((i) => Math.min(i + 1, Math.max(filtered.length - 1, 0)));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((i) => Math.max(i - 1, 0));
      }
      if (e.key === "Enter" && filtered[active]) {
        e.preventDefault();
        filtered[active].action();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, filtered, active]);

  const groups = useMemo(() => {
    const map = new Map<string, CommandItem[]>();
    filtered.forEach((item) => {
      const arr = map.get(item.group) ?? [];
      arr.push(item);
      map.set(item.group, arr);
    });
    return [...map.entries()];
  }, [filtered]);

  let runningIndex = -1;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-start justify-center px-4 pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            aria-label="Close command palette"
            className="absolute inset-0 bg-black/70"
            onClick={() => setOpen(false)}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-xl overflow-hidden rounded-[1.75rem] border border-white/10 bg-panel/55 backdrop-blur-xl backdrop-saturate-150 shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
          >
            <div className="flex items-center gap-3 border-b border-line px-4 py-3.5">
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-accent">
                Search
              </span>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Jump, fuzzy search, copy case link…"
                className="flex-1 bg-transparent text-[15px] text-ink outline-none placeholder:text-muted"
              />
              <kbd className="hidden sm:inline-flex rounded-full border border-line px-2.5 py-1 text-[10px] font-bold text-muted">
                esc
              </kbd>
            </div>

            <div className="max-h-[50vh] overflow-y-auto p-2">
              {filtered.length === 0 && (
                <p className="px-3 py-8 text-center text-sm text-muted">
                  No matches for “{query}”
                </p>
              )}

              {groups.map(([group, groupItems]) => (
                <div key={group} className="mb-2">
                  <p className="px-3 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-muted">
                    {group}
                  </p>
                  <ul>
                    {groupItems.map((item) => {
                      runningIndex += 1;
                      const index = runningIndex;
                      const isActive = index === active;
                      return (
                        <li key={item.id}>
                          <button
                            type="button"
                            onMouseEnter={() => setActive(index)}
                            onClick={item.action}
                            className={`flex w-full items-center justify-between gap-3 rounded-2xl px-3 py-2.5 text-left transition-colors ${
                              isActive
                                ? "bg-bg-deep text-ink"
                                : "text-ink-soft hover:text-ink"
                            }`}
                          >
                            <span className="text-sm font-semibold">
                              {item.label}
                            </span>
                            <span className="truncate text-[11px] font-semibold uppercase tracking-[0.06em] text-muted">
                              {item.hint}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between border-t border-line px-4 py-2.5 text-[11px] font-semibold text-muted">
              <span>↑↓ navigate · ↵ open</span>
              <span>⌘K</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
