import { cn } from "@/lib/utils";

type Dir = "down" | "down-right" | "down-left" | "right" | "left";
type Size = "sm" | "md" | "lg" | "xl" | "xxl";

const SIZE: Record<
  Size,
  { down: string; bend: string; side: string; label: string }
> = {
  sm: {
    down: "h-10 w-6",
    bend: "h-10 w-16",
    side: "h-5 w-14",
    label: "text-[11px]",
  },
  md: {
    down: "h-14 w-7",
    bend: "h-14 w-20",
    side: "h-5 w-20",
    label: "text-[12px]",
  },
  lg: {
    down: "h-20 w-8",
    bend: "h-20 w-28",
    side: "h-6 w-32",
    label: "text-[13px]",
  },
  xl: {
    down: "h-28 w-9",
    bend: "h-28 w-36",
    side: "h-7 w-48",
    label: "text-[14px]",
  },
  xxl: {
    down: "h-48 w-11",
    bend: "h-40 w-48",
    side: "h-8 w-80 max-w-[min(22rem,45vw)]",
    label: "text-[14px]",
  },
};

export function DoodleNote({
  label,
  direction = "down",
  size = "md",
  className = "",
  rotate = -5,
  align = "start",
}: {
  label: string;
  direction?: Dir;
  size?: Size;
  className?: string;
  rotate?: number;
  /** Align label+arrow when pointing left toward something */
  align?: "start" | "end";
}) {
  const s = SIZE[size];
  return (
    <div
      aria-hidden
      className={cn(
        // No base display utility — callers pass hidden lg:flex / etc.
        // so mobile never fights inline-flex and shows overlapping arrows.
        "pointer-events-none select-none flex-col gap-2.5 text-accent opacity-75",
        align === "end" ? "items-end" : "items-start",
        className
      )}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <span
        className={cn(
          "font-display font-bold italic tracking-tight leading-none whitespace-nowrap",
          s.label
        )}
      >
        {label}
      </span>
      <ArrowSvg direction={direction} size={size} />
    </div>
  );
}

function ArrowSvg({ direction, size }: { direction: Dir; size: Size }) {
  const s = SIZE[size];

  if (direction === "down") {
    return (
      <svg viewBox="0 0 36 140" className={s.down} fill="none">
        <path
          d="M18 4c2 32-2 70 0 108"
          stroke="currentColor"
          strokeWidth="2.1"
          strokeLinecap="round"
        />
        <path
          d="M7 96l11 32 11-32"
          stroke="currentColor"
          strokeWidth="2.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (direction === "down-right") {
    return (
      <svg viewBox="0 0 120 100" className={s.bend} fill="none">
        <path
          d="M10 8c28 10 62 40 90 78"
          stroke="currentColor"
          strokeWidth="2.1"
          strokeLinecap="round"
        />
        <path
          d="M78 70l24 18-8-26"
          stroke="currentColor"
          strokeWidth="2.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (direction === "down-left") {
    return (
      <svg viewBox="0 0 120 100" className={s.bend} fill="none">
        <path
          d="M110 8c-28 10-62 40-90 78"
          stroke="currentColor"
          strokeWidth="2.1"
          strokeLinecap="round"
        />
        <path
          d="M42 70L18 88l8-26"
          stroke="currentColor"
          strokeWidth="2.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (direction === "right") {
    return (
      <svg viewBox="0 0 160 32" className={s.side} fill="none">
        <path
          d="M4 16c40-4 80 4 130 0"
          stroke="currentColor"
          strokeWidth="2.1"
          strokeLinecap="round"
        />
        <path
          d="M118 6l30 10-30 10"
          stroke="currentColor"
          strokeWidth="2.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  // left — long reach toward CTAs
  return (
    <svg viewBox="0 0 220 32" className={s.side} fill="none">
      <path
        d="M216 16C150 12 80 20 12 16"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
      />
      <path
        d="M36 6L8 16l28 10"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DoodleUnderline({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 10"
      fill="none"
      aria-hidden
      className={`block text-accent ${className}`}
    >
      <path
        d="M4 6c18-4 36 4 54 0s36 4 54-1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.85"
      />
    </svg>
  );
}
