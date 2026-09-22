"use client";

import {
  animate,
  motion,
  useDragControls,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import { useState, type PointerEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useFinePointer } from "@/components/desktop/useFinePointer";

/** The three window controls. Decorative: the page has nothing to close. */
export function TrafficLights({ className, inactive }: { className?: string; inactive?: boolean }) {
  const dot = "size-3 rounded-full shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.18)]";
  return (
    <span aria-hidden className={cn("flex shrink-0 items-center gap-2", className)}>
      <span className={cn(dot, inactive ? "bg-[#d6d6d5]" : "bg-[#ff5f57]")} />
      <span className={cn(dot, inactive ? "bg-[#d6d6d5]" : "bg-[#febc2e]")} />
      <span className={cn(dot, inactive ? "bg-[#d6d6d5]" : "bg-[#28c840]")} />
    </span>
  );
}

/** Stacking order shared by every window: the last one grabbed sits on top. */
let topZ = 20;

type WindowProps = {
  title: string;
  /** Shown in the title bar next to the title, e.g. an item count */
  subtitle?: string;
  /** Controls on the right of the unified toolbar */
  toolbar?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  /** id of the heading that labels the section */
  labelId?: string;
  /** A window behind the focused one: grey controls, softer shadow */
  inactive?: boolean;
};

/**
 * An AppKit document window: unified title bar and toolbar, white body.
 * It opens once as it scrolls in, and on a mouse-driven screen it can be
 * dragged by its title bar. Double-click the title bar to put it back.
 */
export function Window({
  title,
  subtitle,
  toolbar,
  children,
  className,
  bodyClassName,
  labelId,
  inactive,
}: WindowProps) {
  const reduce = useReducedMotion();
  const movable = useFinePointer(1024);
  const controls = useDragControls();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [z, setZ] = useState<number | undefined>(undefined);
  const [dragging, setDragging] = useState(false);
  const Title = labelId ? "h2" : "span";

  const onTitlePointerDown = (e: PointerEvent) => {
    if (!movable) return;
    if ((e.target as HTMLElement).closest("a, button, input, textarea, label")) return;
    setZ(++topZ);
    controls.start(e);
  };

  const reset = () => {
    const opts = reduce ? { duration: 0 } : { type: "spring" as const, stiffness: 320, damping: 30 };
    animate(x, 0, opts);
    animate(y, 0, opts);
  };

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, scale: 0.97, y: 24 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ type: "spring", stiffness: 260, damping: 30, mass: 0.9 }}
      className={cn("relative", className)}
      style={{ zIndex: z }}
    >
      <motion.div
        drag={movable}
        dragControls={controls}
        dragListener={false}
        dragMomentum={false}
        dragElastic={0}
        onDragStart={() => setDragging(true)}
        onDragEnd={() => setDragging(false)}
        style={{ x, y }}
        className={cn(
          "overflow-hidden rounded-window bg-window transition-shadow duration-200",
          inactive
            ? "shadow-[0_0_0_0.5px_rgba(0,0,0,0.18),0_12px_30px_-12px_rgba(16,38,30,0.3)]"
            : "shadow-window",
          dragging && "shadow-[0_0_0_0.5px_rgba(0,0,0,0.22),0_36px_80px_-16px_rgba(16,38,30,0.5)]"
        )}
      >
        <div
          onPointerDown={onTitlePointerDown}
          onDoubleClick={movable ? reset : undefined}
          title={movable ? "Drag to move · double-click to put back" : undefined}
          className={cn(
            "flex min-h-12 items-center gap-3 border-b border-rule bg-chrome px-4 py-2 select-none",
            movable && (dragging ? "cursor-grabbing" : "cursor-grab")
          )}
          style={movable ? { touchAction: "none" } : undefined}
        >
          <TrafficLights inactive={inactive} />
          <div className="flex min-w-0 flex-1 items-baseline gap-2 pl-2">
            <Title id={labelId} className={cn("truncate text-[13px] font-semibold", inactive ? "text-ink-3" : "text-ink")}>
              {title}
            </Title>
            {subtitle && (
              <span className="hidden truncate text-[12px] text-ink-3 sm:inline">{subtitle}</span>
            )}
          </div>
          {toolbar && <div className="flex shrink-0 cursor-default items-center gap-2">{toolbar}</div>}
        </div>
        <div className={bodyClassName}>{children}</div>
      </motion.div>
    </motion.div>
  );
}
