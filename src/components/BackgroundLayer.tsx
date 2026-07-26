"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

export function BackgroundLayer() {
  const { scrollY } = useScroll();
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const parallaxEnabled = !prefersReducedMotion && !isMobile;

  const ySlow = useTransform(scrollY, (v) => (parallaxEnabled ? v * 0.035 : 0));
  const yMid = useTransform(scrollY, (v) => (parallaxEnabled ? v * 0.02 : 0));

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-bg">
      <motion.div
        style={{ y: ySlow }}
        className="absolute inset-[-8%] transform-gpu will-change-transform"
      >
        <div className="absolute -top-[18%] -left-[12%] h-[52vh] w-[52vh] rounded-full bg-[#2a2f36] blur-[110px]" />
        <div className="absolute top-[28%] -right-[18%] h-[48vh] w-[48vh] rounded-full bg-[#252a30] blur-[120px]" />
        <div className="absolute -bottom-[12%] left-[18%] h-[42vh] w-[42vh] rounded-full bg-[#232820]/80 blur-[130px]" />
      </motion.div>

      <motion.div
        style={{ y: yMid }}
        className="absolute inset-0 transform-gpu will-change-transform pointer-events-none opacity-30"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(243,241,236,0.06) 1px, transparent 0)",
            backgroundSize: "26px 26px",
          }}
        />
      </motion.div>
    </div>
  );
}

export function SectionParallaxOrbs() {
  return null;
}
