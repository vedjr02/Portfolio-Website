"use client";

import { useEffect, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "motion/react";

export function BackgroundLayer() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-bg">
      {/* Slow drifting paper grain grid */}
      <div
        aria-hidden
        className="absolute inset-[-20%] opacity-[0.35] animate-grid-drift"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(246,241,232,0.055) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Aurora field */}
      <div
        aria-hidden
        className="absolute -top-40 -left-32 h-[38rem] w-[38rem] rounded-full bg-accent/20 blur-[110px] animate-aurora-a"
      />
      <div
        aria-hidden
        className="absolute top-[28%] -right-40 h-[34rem] w-[34rem] rounded-full bg-sage/16 blur-[120px] animate-aurora-b"
      />
      <div
        aria-hidden
        className="absolute bottom-[-18%] left-[12%] h-[30rem] w-[30rem] rounded-full bg-[#c48a2a]/14 blur-[100px] animate-aurora-c"
      />
      <div
        aria-hidden
        className="absolute top-[55%] left-[42%] h-[22rem] w-[22rem] rounded-full bg-accent/10 blur-[90px] animate-float-soft"
      />

      {/* Soft vignette so content stays readable */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_28%,rgba(11,10,9,0.82)_100%)]"
      />

      {/* Fine film grain — CSS only, cheap */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.045] mix-blend-overlay animate-grain"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "180px 180px",
        }}
      />
    </div>
  );
}

/** Hero-only interactive light — follows pointer with soft lag */
export function HeroAtmosphere() {
  const reduceMotion = usePrefersReducedMotion();
  const rawX = useMotionValue(50);
  const rawY = useMotionValue(35);
  const x = useSpring(rawX, { stiffness: 45, damping: 22, mass: 0.6 });
  const y = useSpring(rawY, { stiffness: 45, damping: 22, mass: 0.6 });
  const spotlight = useMotionTemplate`radial-gradient(620px circle at ${x}% ${y}%, rgba(61,155,255,0.18), transparent 55%)`;

  useEffect(() => {
    if (reduceMotion) return;
    const onMove = (e: PointerEvent) => {
      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;
      rawX.set((e.clientX / w) * 100);
      rawY.set((e.clientY / h) * 100);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [rawX, rawY, reduceMotion]);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-[1] overflow-hidden"
    >
      <motion.div
        className="absolute inset-0"
        style={{
          background: reduceMotion
            ? "radial-gradient(620px circle at 55% 30%, rgba(61,155,255,0.14), transparent 55%)"
            : spotlight,
        }}
      />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent animate-scanline" />
      <div className="absolute -top-24 left-1/2 h-[28rem] w-[70%] -translate-x-1/2 rounded-full bg-accent/10 blur-[90px]" />
    </div>
  );
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

export function SectionParallaxOrbs() {
  return null;
}
