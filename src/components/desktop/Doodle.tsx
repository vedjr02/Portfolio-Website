"use client";

import { useEffect, useState, type RefObject } from "react";
import { motion, useReducedMotion } from "motion/react";

type Pt = { x: number; y: number };

/** Sample a cubic Bézier and nudge each point sideways so the line wobbles like a pen stroke. */
function wobblyPath(a: Pt, c1: Pt, c2: Pt, b: Pt) {
  const pts: Pt[] = [];
  const n = 36;
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const mt = 1 - t;
    const x = mt ** 3 * a.x + 3 * mt ** 2 * t * c1.x + 3 * mt * t ** 2 * c2.x + t ** 3 * b.x;
    const y = mt ** 3 * a.y + 3 * mt ** 2 * t * c1.y + 3 * mt * t ** 2 * c2.y + t ** 3 * b.y;
    const j = i === 0 || i === n ? 0 : Math.sin(i * 1.7) * 1.3 + Math.sin(i * 0.6) * 0.9;
    pts.push({ x: x + j, y: y - j * 0.6 });
  }
  let d = `M${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const mx = (pts[i].x + pts[i + 1].x) / 2;
    const my = (pts[i].y + pts[i + 1].y) / 2;
    d += ` Q${pts[i].x.toFixed(1)} ${pts[i].y.toFixed(1)} ${mx.toFixed(1)} ${my.toFixed(1)}`;
  }
  const last = pts[pts.length - 1];
  d += ` L${last.x.toFixed(1)} ${last.y.toFixed(1)}`;
  // arrowhead along the final tangent
  const prev = pts[pts.length - 3];
  const ang = Math.atan2(last.y - prev.y, last.x - prev.x);
  const len = 13;
  const head = [ang + Math.PI - 0.5, ang + Math.PI + 0.42].map(
    (a2) => `M${last.x.toFixed(1)} ${last.y.toFixed(1)} L${(last.x + Math.cos(a2) * len).toFixed(1)} ${(last.y + Math.sin(a2) * len).toFixed(1)}`
  );
  const mid = pts[Math.round(n * 0.78)];
  return { d, head, mid };
}

/**
 * A faint hand-drawn arrow from a word in the hero copy to the Hold My Code
 * panel, with a pencilled note, so a first-time visitor knows the panel is the
 * app Vedant built. Measured from the real elements; desktop layout only.
 */
export function Doodle({
  container,
  from,
  to,
}: {
  container: RefObject<HTMLElement | null>;
  from: RefObject<HTMLElement | null>;
  to: RefObject<HTMLElement | null>;
}) {
  const reduce = useReducedMotion();
  const [geo, setGeo] = useState<(ReturnType<typeof wobblyPath> & { underline: string }) | null>(null);

  useEffect(() => {
    const measure = () => {
      const c = container.current;
      const f = from.current;
      const t = to.current;
      if (!c || !f || !t || !window.matchMedia("(min-width: 1024px)").matches) {
        setGeo(null);
        return;
      }
      const cr = c.getBoundingClientRect();
      const fr = f.getBoundingClientRect();
      const para = (f.closest("p") ?? f).getBoundingClientRect();
      const tr = t.getBoundingClientRect();
      // start just under the highlighted words, finish at the panel's left edge
      // dip under the paragraph, then rise into the gap and land on the panel's left edge
      const a = { x: fr.left - cr.left + fr.width * 0.5, y: para.bottom - cr.top + 10 };
      const b = { x: tr.left - cr.left - 16, y: tr.top - cr.top + 300 };
      const c1 = { x: a.x + 30, y: a.y + 78 };
      const c2 = { x: b.x - 170, y: b.y + 110 };
      const u = { x1: fr.left - cr.left, x2: fr.right - cr.left, y: fr.bottom - cr.top + 1 };
      setGeo({ ...wobblyPath(a, c1, c2, b), underline: `M${u.x1} ${u.y + 1} Q${(u.x1 + u.x2) / 2} ${u.y + 4} ${u.x2} ${u.y - 1}` });
    };
    const frame = requestAnimationFrame(measure);
    const ro = new ResizeObserver(measure);
    if (container.current) ro.observe(container.current);
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure).catch(() => {});
    // the panel animates in; measure again once it has settled
    const t = window.setTimeout(measure, 1200);
    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      window.removeEventListener("resize", measure);
      window.clearTimeout(t);
    };
  }, [container, from, to]);

  if (!geo) return null;

  const draw = reduce
    ? {}
    : {
        initial: { pathLength: 0, opacity: 0 },
        animate: { pathLength: 1, opacity: 1 },
      };

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-10 hidden lg:block">
      <svg className="absolute inset-0 h-full w-full overflow-visible">
        <motion.path
          d={geo.d}
          fill="none"
          stroke="rgba(255,255,255,0.55)"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          {...draw}
          transition={{ duration: 1.1, ease: [0.45, 0, 0.25, 1], delay: 1.1 }}
        />
        <motion.path
          d={geo.underline}
          fill="none"
          stroke="rgba(255,255,255,0.55)"
          strokeWidth={1.6}
          strokeLinecap="round"
          {...draw}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.8 }}
        />
        {geo.head.map((h, i) => (
          <motion.path
            key={i}
            d={h}
            fill="none"
            stroke="rgba(255,255,255,0.55)"
            strokeWidth={1.8}
            strokeLinecap="round"
            {...draw}
            transition={{ duration: 0.18, delay: 2.2 + i * 0.08 }}
          />
        ))}
      </svg>
      <motion.span
        initial={reduce ? false : { opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 2.1 }}
        className="font-hand absolute text-[22px] leading-none whitespace-nowrap text-white/75"
        style={{ left: geo.mid.x - 150, top: geo.mid.y - 62, rotate: "-5deg" }}
      >
        the app I built, running live
      </motion.span>
    </div>
  );
}
