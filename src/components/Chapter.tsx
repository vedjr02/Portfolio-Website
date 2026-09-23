import type { ReactNode } from "react";

/**
 * One chapter of the film. The stage holds the chapter's poster frame (the static
 * tier and the no-JS view); when the engine runs it is hidden and the persistent
 * canvas shows through. Scroll length comes from the [data-scene] markers inside.
 */
export function Chapter({
  id,
  poster,
  label,
  children,
  className,
}: {
  id: string;
  /** poster file stem in /public/posters (without -d/-m suffix) */
  poster: string;
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} data-chapter={id} aria-labelledby={`${id}-title`} className={`chapter ${className ?? ""}`}>
      <div className="stage" aria-hidden>
        <picture>
          <source media="(max-width: 767px)" srcSet={`/posters/${poster}-m.webp`} />
          <img src={`/posters/${poster}-d.webp`} alt="" loading="lazy" decoding="async" />
        </picture>
      </div>
      <div className="chapter-body" data-label={label}>
        {children}
      </div>
    </section>
  );
}

/** A scroll marker: the engine morphs to `state` as this block reaches the viewport centre. */
export function Scene({
  state,
  children,
  className,
  minHeight = "100svh",
}: {
  state: string;
  children?: ReactNode;
  className?: string;
  minHeight?: string;
}) {
  return (
    <div data-scene={state} className={className} style={{ minHeight }}>
      {children}
    </div>
  );
}

export function Eyebrow({ index, children }: { index: string; children: ReactNode }) {
  return (
    <p className="t-label flex items-center gap-3">
      <span className="text-signal">{index}</span>
      <span aria-hidden className="h-px w-8 bg-rule-strong" style={{ background: "var(--rule-strong)" }} />
      <span>{children}</span>
    </p>
  );
}
