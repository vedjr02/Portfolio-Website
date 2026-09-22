"use client";

import { motion, useReducedMotion } from "motion/react";
import { useFinePointer } from "@/components/desktop/useFinePointer";
import { useSettings } from "@/components/desktop/settings";

/**
 * Desktop clutter, the same set holdmycode.xyz scatters around its page:
 * Finder icons, a beachball, a kaomoji or two. Pure decoration, so the layer
 * is aria-hidden, never focusable, and only shown where the margins are wide
 * enough to hold it clear of the windows. Every piece can be picked up.
 */

export type Sticker =
  | { src: string; w: number; x: string; y: number; r: number }
  | { text: string; mono?: boolean; size: number; x: string; y: number; r: number };

export function Stickers({ items }: { items: Sticker[] }) {
  const reduce = useReducedMotion();
  const fine = useFinePointer(1360);
  const { icons } = useSettings();
  if (!fine || !icons) return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-30 overflow-visible">
      {items.map((s, i) => (
        <motion.div
          key={i}
          drag
          dragMomentum={false}
          dragElastic={0}
          whileDrag={reduce ? undefined : { scale: 1.07 }}
          initial={{ rotate: s.r }}
          className="pointer-events-auto absolute cursor-grab touch-none select-none active:cursor-grabbing"
          style={{ left: s.x, top: s.y }}
        >
          {"src" in s ? (
            // eslint-disable-next-line @next/next/no-img-element -- tiny static icons, drag needs a plain element
            <img
              src={s.src}
              alt=""
              width={s.w}
              height={s.w}
              draggable={false}
              className="block h-auto drop-shadow-[0_5px_12px_rgba(0,0,0,0.18)]"
              style={{ width: s.w }}
            />
          ) : (
            <span
              className={s.mono ? "font-mono whitespace-nowrap text-white/75" : "whitespace-nowrap"}
              style={{ fontSize: s.size, lineHeight: 1, letterSpacing: s.mono ? "-0.02em" : undefined }}
            >
              {s.text}
            </span>
          )}
        </motion.div>
      ))}
    </div>
  );
}
