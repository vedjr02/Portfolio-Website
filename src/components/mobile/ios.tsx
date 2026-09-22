"use client";

import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * iOS building blocks for the phone layout. Below the md breakpoint the
 * desktop windows give way to these: large titles, inset grouped lists and
 * rows, the way Settings, Contacts and the App Store draw them.
 */

export function IosTitle({ id, children, className }: { id?: string; children: ReactNode; className?: string }) {
  return (
    <h2 id={id} className={cn("px-1 pb-3 text-[30px] leading-tight font-bold tracking-[-0.02em] text-white", className)}>
      {children}
    </h2>
  );
}

export function IosGroup({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-[14px] bg-surface text-ink shadow-[0_0_0_0.5px_var(--rule)]", className)}>
      {children}
    </div>
  );
}

type RowProps = {
  icon?: ReactNode;
  label: ReactNode;
  detail?: ReactNode;
  chevron?: boolean;
  href?: string;
  external?: boolean;
  onClick?: () => void;
  className?: string;
};

/** One table row. Hairline separators are inset past the icon, as in Settings. */
export function IosRow({ icon, label, detail, chevron, href, external, onClick, className }: RowProps) {
  const inner = (
    <>
      {icon && <span className="shrink-0">{icon}</span>}
      <span className="flex min-h-11 min-w-0 flex-1 items-center gap-3 border-b border-rule py-2.5 pr-4 group-last:border-b-0">
        <span className="min-w-0 flex-1 text-[16px] leading-snug">{label}</span>
        {detail && <span className="max-w-[55%] shrink-0 truncate text-right text-[15px] text-ink-3">{detail}</span>}
        {chevron && <ChevronRight aria-hidden className="size-4 shrink-0 text-ink-4" strokeWidth={2.5} />}
      </span>
    </>
  );
  const cls = cn("group flex w-full items-center gap-3 pl-4 text-left no-underline active:bg-fill", className);
  if (href)
    return (
      <a href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined} className={cls}>
        {inner}
      </a>
    );
  if (onClick)
    return (
      <button type="button" onClick={onClick} className={cls}>
        {inner}
      </button>
    );
  return <div className={cls}>{inner}</div>;
}

/** The coloured rounded-square glyph Settings puts at the start of a row. */
export function IosGlyph({ color, children }: { color: string; children: ReactNode }) {
  return (
    <span className="grid size-[29px] place-items-center rounded-[7px] text-white" style={{ background: color }}>
      {children}
    </span>
  );
}
