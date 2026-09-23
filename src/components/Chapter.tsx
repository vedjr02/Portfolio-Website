import type { ReactNode } from "react";

/**
 * One chapter of the film. Scroll length and poster frames come from the
 * [data-scene] markers inside it.
 */
export function Chapter({ id, label, children, className }: { id: string; label: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} data-chapter={id} data-label={label} aria-labelledby={`${id}-title`} className={`chapter ${className ?? ""}`}>
      {children}
    </section>
  );
}

/**
 * A scroll beat. The engine morphs to `state` as this block crosses the viewport.
 * Its stage holds the state's poster frame: the static tier and the no-JS view step
 * through these frames; with the engine running the stage is removed and the
 * persistent canvas shows through.
 */
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
    <div data-scene={state} className="scene" style={{ minHeight }}>
      <div className="stage" aria-hidden>
        <picture>
          <source media="(max-aspect-ratio: 1/1)" srcSet={`/posters/${state}-m.webp`} />
          <img src={`/posters/${state}-d.webp`} alt="" loading="lazy" decoding="async" />
        </picture>
      </div>
      <div className={`scene-body ${className ?? ""}`} style={{ minHeight }}>
        {children}
      </div>
    </div>
  );
}

export function Eyebrow({ index, children }: { index: string; children: ReactNode }) {
  return (
    <p className="t-label flex items-center gap-3">
      <span className="text-signal">{index}</span>
      <span aria-hidden className="h-px w-8" style={{ background: "var(--rule-strong)" }} />
      <span>{children}</span>
    </p>
  );
}
