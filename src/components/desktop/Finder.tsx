"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import { Window } from "@/components/desktop/Window";
import { QuickLook } from "@/components/desktop/QuickLook";
import { FolderIcon } from "@/components/desktop/FolderIcon";
import { groups, projects, type Project, type ProjectGroup } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Stickers } from "@/components/desktop/Stickers";

type Filter = "all" | ProjectGroup;
type Sort = { key: "name" | "date"; dir: 1 | -1 };

const FILTER_ORDER: ProjectGroup[] = ["flagship", "product", "data", "case", "consulting", "experiment"];

function matches(p: Project, q: string) {
  if (!q) return true;
  const hay = [p.name, p.kind, p.summary, p.stack.join(" "), groups[p.group].label].join(" ").toLowerCase();
  return q
    .toLowerCase()
    .split(/\s+/)
    .every((w) => hay.includes(w));
}

function StatusLabel({ status }: { status: Project["status"] }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        aria-hidden
        className={cn(
          "size-[7px] rounded-full",
          status === "Live" && "bg-live",
          status === "In progress" && "bg-[#f5a524]",
          status === "Built" && "bg-ink-4"
        )}
      />
      {status}
    </span>
  );
}

/**
 * Every project in one Finder list view. Rows stay one line each; the detail
 * lives in Quick Look (click, Return or Space), never on the page itself.
 */
export function Finder() {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>({ key: "date", dir: -1 });
  const [selected, setSelected] = useState<string | null>(null);
  const [lookId, setLookId] = useState<string | null>(null);

  const rows = useMemo(() => {
    const list = projects.filter((p) => (filter === "all" || p.group === filter) && matches(p, query));
    return [...list].sort((a, b) =>
      sort.key === "name" ? a.name.localeCompare(b.name) * sort.dir : a.sort.localeCompare(b.sort) * sort.dir
    );
  }, [filter, query, sort]);

  const counts = useMemo(() => {
    const c = { all: projects.length } as Record<Filter, number>;
    FILTER_ORDER.forEach((g) => (c[g] = projects.filter((p) => p.group === g).length));
    return c;
  }, []);

  const look = rows.find((p) => p.id === lookId) ?? projects.find((p) => p.id === lookId) ?? null;
  const lookIndex = look ? rows.findIndex((p) => p.id === look.id) : -1;

  const openLook = (id: string) => {
    setSelected(id);
    setLookId(id);
  };

  const step = useCallback(
    (dir: 1 | -1) => {
      if (!rows.length) return;
      const i = rows.findIndex((p) => p.id === lookId);
      const next = rows[(i + dir + rows.length) % rows.length];
      setLookId(next.id);
      setSelected(next.id);
    },
    [rows, lookId]
  );

  const close = useCallback(() => setLookId(null), []);

  // Spotlight asks for a project by id
  useEffect(() => {
    const onOpen = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      if (projects.some((p) => p.id === id)) {
        setFilter("all");
        setQuery("");
        openLook(id);
      }
    };
    window.addEventListener("va:quick-look", onOpen);
    return () => window.removeEventListener("va:quick-look", onOpen);
  }, []);

  const toggleSort = (key: Sort["key"]) =>
    setSort((s) => (s.key === key ? { key, dir: (s.dir * -1) as 1 | -1 } : { key, dir: key === "date" ? -1 : 1 }));

  const SortIcon = sort.dir === 1 ? ChevronUp : ChevronDown;

  const filters: { id: Filter; label: string; tag?: string }[] = [
    { id: "all", label: "All projects" },
    ...FILTER_ORDER.map((g) => ({ id: g, label: groups[g].label, tag: groups[g].tag })),
  ];

  return (
    <section id="projects" aria-labelledby="projects-title" className="relative scroll-mt-14 px-3 py-10 sm:px-8 sm:py-16">
      <Stickers
        items={[
          { src: "/stickers/folder.webp", w: 50, x: "calc(50% + 614px)", y: 120, r: 6 },
          { text: "(\u30fb_\u30fb?)", mono: true, size: 15, x: "calc(50% - 690px)", y: 360, r: -6 },
          { src: "/stickers/beachball.svg", w: 24, x: "calc(50% + 640px)", y: 560, r: 0 },
        ]}
      />
      <div className="mx-auto max-w-[1180px]">
        <Window
          title="Projects"
          labelId="projects-title"
          subtitle={`${projects.length} items`}
          bodyClassName="grid md:grid-cols-[13.5rem_1fr]"
          toolbar={
            <label className="relative hidden sm:block">
              <span className="sr-only">Search projects</span>
              <Search aria-hidden className="pointer-events-none absolute top-1/2 left-2 size-3.5 -translate-y-1/2 text-ink-3" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search"
                className="h-7 w-44 rounded-[7px] bg-fill pr-2 pl-7 text-[13px] text-ink outline-none placeholder:text-ink-3 focus:bg-surface focus:shadow-[0_0_0_3px_rgba(10,108,255,0.35)] lg:w-56"
              />
            </label>
          }
        >
          {/* sidebar: tags */}
          <nav aria-label="Filter projects" className="border-b border-rule bg-sidebar md:border-r md:border-b-0">
            <p className="hidden px-4 pt-4 pb-1 text-[11px] font-semibold text-ink-3 md:block">Tags</p>
            <ul className="flex gap-1 overflow-x-auto p-2 md:flex-col md:overflow-visible">
              {filters.map((f) => {
                const on = filter === f.id;
                return (
                  <li key={f.id} className="shrink-0">
                    <button
                      type="button"
                      aria-pressed={on}
                      onClick={() => setFilter(f.id)}
                      className={cn(
                        "flex min-h-8 w-full items-center gap-2 rounded-[6px] px-2.5 text-left text-[13px] whitespace-nowrap transition-colors",
                        on ? "bg-fill-2 font-medium" : "hover:bg-fill"
                      )}
                    >
                      {f.tag ? (
                        <span aria-hidden className="size-2.5 shrink-0 rounded-full" style={{ background: f.tag }} />
                      ) : (
                        <FolderIcon className="h-3.5 w-4 shrink-0" />
                      )}
                      <span className="flex-1">{f.label}</span>
                      <span className="tabular text-[12px] text-ink-3">{counts[f.id]}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className="px-2 pb-2 sm:hidden">
              <label className="relative block">
                <span className="sr-only">Search projects</span>
                <Search aria-hidden className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-ink-3" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search projects"
                  className="h-10 w-full rounded-[8px] bg-fill pr-2 pl-8 text-[16px] outline-none placeholder:text-ink-3 focus:bg-surface focus:shadow-[0_0_0_3px_rgba(10,108,255,0.35)]"
                />
              </label>
            </div>
          </nav>

          {/* list view */}
          <div className="min-w-0">
            <div className="mac-scroll max-h-[30rem] overflow-y-auto md:max-h-[34rem]">
              <table className="w-full table-fixed border-collapse text-[13px]">
                <caption className="sr-only">
                  Projects, {rows.length} shown. Select a row to open it in Quick Look.
                </caption>
                <thead className="sticky top-0 z-10 bg-window">
                  <tr className="border-b border-rule text-left text-[12px] text-ink-3">
                    <th scope="col" className="w-auto py-1.5 pl-4 font-normal sm:w-[38%]">
                      <button type="button" onClick={() => toggleSort("name")} className="inline-flex items-center gap-1 hover:text-ink">
                        Name
                        {sort.key === "name" && <SortIcon className="size-3" />}
                      </button>
                    </th>
                    <th scope="col" className="hidden w-[22%] py-1.5 font-normal md:table-cell">Kind</th>
                    <th scope="col" className="hidden w-[20%] py-1.5 font-normal lg:table-cell">Built with</th>
                    <th scope="col" className="w-[5.5rem] py-1.5 font-normal">
                      <button type="button" onClick={() => toggleSort("date")} className="inline-flex items-center gap-1 hover:text-ink">
                        Date
                        {sort.key === "date" && <SortIcon className="size-3" />}
                      </button>
                    </th>
                    <th scope="col" className="w-[7.5rem] py-1.5 pr-4 font-normal">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((p, i) => {
                    const on = selected === p.id;
                    return (
                      <tr
                        key={p.id}
                        className={cn(
                          "group cursor-default",
                          on ? "bg-select text-white" : i % 2 ? "bg-zebra" : "bg-window",
                          !on && "hover:bg-select-soft"
                        )}
                        onClick={() => openLook(p.id)}
                      >
                        <td className="py-0 pl-4">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              openLook(p.id);
                            }}
                            onFocus={() => setSelected(p.id)}
                            onKeyDown={(e) => {
                              if (e.key === " ") {
                                e.preventDefault();
                                openLook(p.id);
                              }
                            }}
                            className="flex min-h-10 w-full min-w-0 items-center gap-2.5 text-left outline-none focus-visible:underline sm:min-h-9"
                            aria-label={`${p.name}, ${p.kind}, ${p.status}. Open in Quick Look`}
                          >
                            {p.id === "hold-my-code" ? (
                              <Image src="/hmc/app-icon.png" alt="" width={20} height={20} className="size-5 shrink-0" />
                            ) : (
                              <FolderIcon className="h-4 w-5 shrink-0" tag={groups[p.group].tag} />
                            )}
                            <span className="min-w-0">
                              <span className="block truncate font-medium">{p.name}</span>
                              <span className={cn("block truncate text-[12px] sm:hidden", on ? "text-white/80" : "text-ink-3")}>
                                {p.kind}
                              </span>
                            </span>
                          </button>
                        </td>
                        <td className={cn("hidden truncate pr-3 md:table-cell", on ? "text-white/85" : "text-ink-3")}>{p.kind}</td>
                        <td className={cn("hidden truncate pr-3 lg:table-cell", on ? "text-white/85" : "text-ink-3")}>
                          {p.stack.slice(0, 2).join(", ")}
                        </td>
                        <td className={cn("tabular truncate pr-2", on ? "text-white/85" : "text-ink-3")}>{p.date}</td>
                        <td className={cn("truncate pr-4", on ? "text-white" : "text-ink-2")}>
                          <StatusLabel status={p.status} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {rows.length === 0 && (
                <div className="px-6 py-14 text-center text-[13.5px] text-ink-3">
                  <p>No projects match &ldquo;{query}&rdquo;.</p>
                  <button
                    type="button"
                    onClick={() => {
                      setQuery("");
                      setFilter("all");
                    }}
                    className="mt-3 text-accent hover:underline"
                  >
                    Clear the search
                  </button>
                </div>
              )}
            </div>
            <div className="flex items-center justify-between border-t border-rule bg-chrome px-4 py-1.5 text-[12px] text-ink-3">
              <span className="tabular">
                {rows.length} of {projects.length} items
              </span>
              <span className="hidden sm:inline">Click a row, or press Space, to Quick Look</span>
              <span className="sm:hidden">Tap a row for details</span>
            </div>
          </div>
        </Window>
      </div>

      <QuickLook
        project={look}
        onClose={close}
        onStep={step}
        position={lookIndex >= 0 ? { index: lookIndex, total: rows.length } : undefined}
      />
    </section>
  );
}
