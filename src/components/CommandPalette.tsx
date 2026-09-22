"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { AtSign, CornerDownLeft, Link2, Search } from "lucide-react";
import { caseStudies, groups, profile, projects } from "@/lib/data";
import { useCommand } from "@/components/CommandProvider";
import { useToast } from "@/components/Toast";
import { FolderIcon } from "@/components/desktop/FolderIcon";
import { SECTIONS, goTo } from "@/components/desktop/sections";

type CommandItem = {
  id: string;
  label: string;
  hint: string;
  group: string;
  keywords?: string;
  icon: React.ReactNode;
  action: () => void;
};

const RECENT_KEY = "va-cmd-recent";
const RECENT_MAX = 4;

function readRecent(): string[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(RECENT_KEY) ?? "[]") as unknown;
    return Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}

function pushRecent(id: string) {
  try {
    localStorage.setItem(RECENT_KEY, JSON.stringify([id, ...readRecent().filter((x) => x !== id)].slice(0, RECENT_MAX)));
  } catch {
    /* private mode */
  }
}

/** Higher is better; -1 means no match */
function fuzzyScore(query: string, ...fields: string[]): number {
  const q = query.trim().toLowerCase();
  if (!q) return 0;
  const text = fields.join(" ").toLowerCase();
  if (text.startsWith(q)) return 900;
  if (text.includes(q)) return 700;
  let qi = 0;
  let score = 0;
  let streak = 0;
  let last = -2;
  for (let i = 0; i < text.length && qi < q.length; i++) {
    if (text[i] === q[qi]) {
      streak = i === last + 1 ? streak + 1 : 0;
      score += 12 + 6 * streak + (i === 0 || /[\s\-_/·]/.test(text[i - 1] ?? "") ? 10 : 0);
      last = i;
      qi += 1;
    }
  }
  return qi === q.length ? score : -1;
}

const iconBox = "grid size-7 shrink-0 place-items-center rounded-[7px]";

/** Spotlight: search every project, section and action on the site. */
export function CommandPalette() {
  const { open } = useCommand();
  return <AnimatePresence>{open && <Spotlight />}</AnimatePresence>;
}

function Spotlight() {
  const { setOpen } = useCommand();
  const { toast } = useToast();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [recentIds] = useState<string[]>(readRecent);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const run = useCallback(
    (id: string, fn: () => void) => {
      pushRecent(id);
      setOpen(false);
      fn();
    },
    [setOpen]
  );

  const items = useMemo<CommandItem[]>(() => {
    const list: CommandItem[] = [];

    projects.forEach((p) => {
      list.push({
        id: `ql-${p.id}`,
        label: p.name,
        hint: p.kind,
        group: "Projects",
        keywords: `${p.summary} ${p.stack.join(" ")} ${groups[p.group].label}`,
        icon:
          p.id === "hold-my-code" ? (
            <Image src="/hmc/app-icon.png" alt="" width={28} height={28} className="size-7" />
          ) : (
            <FolderIcon className="h-6 w-7" tag={groups[p.group].tag} />
          ),
        action: () =>
          run(`ql-${p.id}`, () => {
            if (caseStudies.some((c) => c.id === p.id)) {
              goTo("cases");
              window.dispatchEvent(new CustomEvent("va:open-case", { detail: p.id }));
            } else if (p.id === "hold-my-code") {
              goTo("hold-my-code");
            } else {
              window.dispatchEvent(new CustomEvent("va:quick-look", { detail: p.id }));
            }
          }),
      });
    });

    SECTIONS.forEach((s) => {
      list.push({
        id: `sec-${s.id}`,
        label: s.label,
        hint: "Section",
        group: "Sections",
        icon: (
          <span className={`${iconBox} bg-fill`}>
            <CornerDownLeft className="size-3.5 text-ink-2" />
          </span>
        ),
        action: () => run(`sec-${s.id}`, () => goTo(s.id)),
      });
    });

    list.push(
      {
        id: "copy-email",
        label: "Copy email address",
        hint: profile.email,
        group: "Actions",
        keywords: "contact mail hire",
        icon: (
          <span className={`${iconBox} bg-accent text-white`}>
            <AtSign className="size-3.5" />
          </span>
        ),
        action: () =>
          run("copy-email", async () => {
            try {
              await navigator.clipboard.writeText(profile.email);
              toast("Email address copied", profile.email);
            } catch {
              toast("Couldn't copy the address", "Open Contact instead.");
            }
          }),
      },
      {
        id: "open-github",
        label: "Open GitHub",
        hint: "vedjr02",
        group: "Actions",
        icon: (
          <span className={`${iconBox} bg-ink text-white`}>
            <Link2 className="size-3.5" />
          </span>
        ),
        action: () => run("open-github", () => window.open(profile.socials.github, "_blank", "noopener,noreferrer")),
      },
      {
        id: "open-linkedin",
        label: "Open LinkedIn",
        hint: "Profile",
        group: "Actions",
        icon: (
          <span className={`${iconBox} bg-[#0a66c2] text-white`}>
            <Link2 className="size-3.5" />
          </span>
        ),
        action: () => run("open-linkedin", () => window.open(profile.socials.linkedin, "_blank", "noopener,noreferrer")),
      }
    );

    return list;
  }, [run, toast]);

  const filtered = useMemo(() => {
    const q = query.trim();
    if (!q) {
      const recent = recentIds
        .map((id) => items.find((i) => i.id === id))
        .filter((i): i is CommandItem => !!i)
        .map((i) => ({ ...i, group: "Recent" }));
      return [...recent, ...items.filter((i) => !recentIds.includes(i.id))];
    }
    return items
      .map((item) => {
        const fuzzy = fuzzyScore(q, item.label);
        const loose = (item.hint + " " + (item.keywords ?? "")).toLowerCase().includes(q.toLowerCase()) ? 500 : -1;
        return { item, score: Math.max(fuzzy, loose) };
      })
      .filter((x) => x.score >= 0)
      .sort((a, b) => b.score - a.score)
      .map((x) => ({ ...x.item, group: "Top hits" }));
  }, [items, query, recentIds]);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => inputRef.current?.focus(), 30);
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = prevOverflow;
      previous?.focus?.({ preventScroll: true });
    };
  }, []);

  useEffect(() => {
    listRef.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && filtered[active]) {
      e.preventDefault();
      filtered[active].action();
    } else if (e.key === "Tab") {
      e.preventDefault();
    }
  };

  const grouped = useMemo(() => {
    const map = new Map<string, { item: CommandItem; index: number }[]>();
    filtered.forEach((item, index) => {
      const arr = map.get(item.group) ?? [];
      arr.push({ item, index });
      map.set(item.group, arr);
    });
    return [...map.entries()];
  }, [filtered]);

  return (
        <motion.div
          className="fixed inset-0 z-[80] flex items-start justify-center px-3 pt-[calc(env(safe-area-inset-top)+3.5rem)] sm:pt-[16vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.14 }}
        >
          <button
            type="button"
            tabIndex={-1}
            aria-label="Close search"
            className="absolute inset-0 bg-transparent"
            onClick={() => setOpen(false)}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Search the site"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 520, damping: 36 }}
            className="relative w-full max-w-[40rem] overflow-hidden rounded-[18px] vibrant shadow-[0_0_0_0.5px_rgba(0,0,0,0.2),0_30px_80px_-20px_rgba(0,0,0,0.5)]"
            onKeyDown={onKeyDown}
          >
            <label className="flex items-center gap-3 px-4 py-3">
              <Search aria-hidden className="size-5 shrink-0 text-ink-3" strokeWidth={2.2} />
              <span className="sr-only">Search projects, sections and actions</span>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                placeholder="Spotlight Search"
                role="combobox"
                aria-expanded="true"
                aria-controls="spotlight-list"
                aria-activedescendant={filtered[active] ? `sl-${filtered[active].id}` : undefined}
                className="min-w-0 flex-1 bg-transparent text-[20px] font-light text-ink outline-none focus-visible:outline-none placeholder:text-ink-4 sm:text-[22px]"
              />
            </label>

            <div ref={listRef} id="spotlight-list" role="listbox" className="mac-scroll max-h-[min(52vh,26rem)] overflow-y-auto border-t border-rule px-2 py-2">
              {filtered.length === 0 && (
                <p className="px-3 py-8 text-center text-[14px] text-ink-3">No results for &ldquo;{query}&rdquo;</p>
              )}
              {grouped.map(([group, rows]) => (
                <div key={group} role="group" aria-label={group} className="mb-1">
                  <p className="px-3 pt-1.5 pb-1 text-[11.5px] font-semibold text-ink-3">{group}</p>
                  {rows.map(({ item, index }) => {
                    const on = index === active;
                    return (
                      <div
                        key={item.id}
                        id={`sl-${item.id}`}
                        role="option"
                        aria-selected={on}
                        data-index={index}
                        onMouseMove={() => setActive(index)}
                        onClick={item.action}
                        className={`flex min-h-10 cursor-default items-center gap-3 rounded-[8px] px-2.5 py-1.5 ${
                          on ? "bg-select text-white" : "text-ink"
                        }`}
                      >
                        {item.icon}
                        <span className="min-w-0 flex-1 truncate text-[14px] font-medium">{item.label}</span>
                        <span className={`truncate text-[12.5px] ${on ? "text-white/80" : "text-ink-3"}`}>{item.hint}</span>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
  );
}
