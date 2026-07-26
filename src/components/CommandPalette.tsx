"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { projects, profile, sideProjects } from "@/lib/data";
import { useCommand } from "@/components/CommandProvider";

type CommandItem = {
  id: string;
  label: string;
  hint: string;
  group: string;
  action: () => void;
};

export function CommandPalette() {
  const { open, setOpen } = useCommand();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const items = useMemo<CommandItem[]>(() => {
    const jump = (id: string) => {
      setOpen(false);
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    const list: CommandItem[] = [
      {
        id: "sec-showcase",
        label: "Jump to Work",
        hint: "Featured chapters",
        group: "Navigate",
        action: () => jump("showcase"),
      },
      {
        id: "sec-archive",
        label: "Jump to Archive",
        hint: "Full project list",
        group: "Navigate",
        action: () => jump("archive"),
      },
      {
        id: "sec-story",
        label: "Jump to About",
        hint: "Story & impact",
        group: "Navigate",
        action: () => jump("story"),
      },
      {
        id: "sec-contact",
        label: "Jump to Contact",
        hint: "Email & socials",
        group: "Navigate",
        action: () => jump("contact"),
      },
      {
        id: "copy-email",
        label: "Copy email",
        hint: profile.email,
        group: "Actions",
        action: async () => {
          await navigator.clipboard.writeText(profile.email);
          setOpen(false);
        },
      },
      {
        id: "open-linkedin",
        label: "Open LinkedIn",
        hint: "Profile",
        group: "Actions",
        action: () => {
          window.open(profile.socials.linkedin, "_blank", "noopener,noreferrer");
          setOpen(false);
        },
      },
      {
        id: "open-github",
        label: "Open GitHub",
        hint: "vedjr02",
        group: "Actions",
        action: () => {
          window.open(profile.socials.github, "_blank", "noopener,noreferrer");
          setOpen(false);
        },
      },
    ];

    projects.forEach((p) => {
      if (p.liveUrl) {
        list.push({
          id: `live-${p.id}`,
          label: `Open live · ${p.title}`,
          hint: p.category,
          group: "Projects",
          action: () => {
            window.open(p.liveUrl, "_blank", "noopener,noreferrer");
            setOpen(false);
          },
        });
      }
      if (p.repoUrl) {
        list.push({
          id: `repo-${p.id}`,
          label: `GitHub · ${p.title}`,
          hint: "Repository",
          group: "Projects",
          action: () => {
            window.open(p.repoUrl, "_blank", "noopener,noreferrer");
            setOpen(false);
          },
        });
      }
    });

    sideProjects.forEach((p) => {
      list.push({
        id: `side-${p.id}`,
        label: p.name,
        hint: "Side project",
        group: "Side projects",
        action: () => {
          window.open(p.href, "_blank", "noopener,noreferrer");
          setOpen(false);
        },
      });
    });

    return list;
  }, [setOpen]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (i) =>
        i.label.toLowerCase().includes(q) ||
        i.hint.toLowerCase().includes(q) ||
        i.group.toLowerCase().includes(q)
    );
  }, [items, query]);

  useEffect(() => {
    if (!open) {
      setQuery("");
      setActive(0);
      return;
    }
    const t = window.setTimeout(() => inputRef.current?.focus(), 40);
    return () => window.clearTimeout(t);
  }, [open]);

  useEffect(() => {
    setActive(0);
  }, [query]);

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
            className="relative z-10 w-full max-w-xl overflow-hidden rounded-[1.75rem] border border-line bg-panel"
          >
            <div className="flex items-center gap-3 border-b border-line px-4 py-3.5">
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-accent">
                Search
              </span>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Jump, open a demo, copy email…"
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
                            <span className="text-sm font-semibold">{item.label}</span>
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
