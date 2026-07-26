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
        <div className="absolute -top-[18%] -left-[12%] h-[52vh] w-[52vh] rounded-full bg-[#c5cedb]/55 blur-[100px]" />
        <div className="absolute top-[28%] -right-[18%] h-[48vh] w-[48vh] rounded-full bg-[#d2d8e2] blur-[110px]" />
        <div className="absolute -bottom-[12%] left-[18%] h-[42vh] w-[42vh] rounded-full bg-[#c8d4cc]/45 blur-[120px]" />
      </motion.div>

      <motion.div
        style={{ y: yMid }}
        className="absolute inset-0 transform-gpu will-change-transform pointer-events-none opacity-40"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(11,13,16,0.07) 1px, transparent 0)",
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
