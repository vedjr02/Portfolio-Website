"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

export function BackgroundLayer() {
  const { scrollY } = useScroll();
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const parallaxEnabled = !prefersReducedMotion && !isMobile;

  const ySlow = useTransform(scrollY, (v) => (parallaxEnabled ? v * 0.04 : 0));
  const yMid = useTransform(scrollY, (v) => (parallaxEnabled ? v * 0.025 : 0));

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#dde1e8]">
      {/* Soft topographic wash — no neon, no WebGL */}
      <motion.div
        style={{ y: ySlow }}
        className="absolute inset-[-8%] transform-gpu will-change-transform"
      >
        <div className="absolute -top-[20%] -left-[10%] h-[55vh] w-[55vh] rounded-full bg-[#c9d2de]/45 blur-[90px]" />
        <div className="absolute top-[30%] -right-[15%] h-[50vh] w-[50vh] rounded-full bg-[#d5dbe6] blur-[100px]" />
        <div className="absolute -bottom-[10%] left-[20%] h-[45vh] w-[45vh] rounded-full bg-[#c5d0c8]/40 blur-[110px]" />
      </motion.div>

      <motion.div
        style={{ y: yMid }}
        className="absolute inset-0 transform-gpu will-change-transform pointer-events-none"
      >
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(20,23,29,0.06) 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
      </motion.div>

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(221,225,232,0.55)_70%,rgba(221,225,232,0.95)_100%)] pointer-events-none" />
    </div>
  );
}

export function SectionParallaxOrbs() {
  return null;
}
