"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import ColorBends from "./ColorBends";
import { ParallaxFloat } from "./Parallax";
import { useIsMobile } from "@/hooks/useIsMobile";

export function BackgroundLayer() {
  const { scrollY } = useScroll();
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const parallaxEnabled = !prefersReducedMotion && !isMobile;

  const blurPx = useTransform(scrollY, [0, 600], [0, 16]);
  const filter = useTransform(blurPx, (v) => `blur(${v}px)`);
  const overlayOpacity = useTransform(scrollY, [0, 600], [0, 0.4]);

  const bgYDeep = useTransform(scrollY, (v) => (parallaxEnabled ? v * 0.09 : 0));
  const bgYMid = useTransform(scrollY, (v) => (parallaxEnabled ? v * 0.055 : 0));
  const bgYFront = useTransform(scrollY, (v) => (parallaxEnabled ? v * 0.03 : 0));
  const bgScale = useTransform(scrollY, (v) => (parallaxEnabled ? 1 + v * 0.00002 : 1));
  const bgRotate = useTransform(scrollY, (v) => (parallaxEnabled ? v * 0.001 : 0));
  const bgMidScale = useTransform(scrollY, (v) => (parallaxEnabled ? 1 + v * 0.000015 : 1));

  return (
    <div className="fixed inset-0 -z-10 bg-[#0a0a0a] overflow-hidden">
      <motion.div
        style={{ y: bgYDeep, scale: bgScale, rotate: bgRotate }}
        className="absolute inset-[-10%] transform-gpu will-change-transform origin-center"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(29,120,235,0.12),transparent_70%)]" />
      </motion.div>

      <motion.div
        style={{ filter, y: bgYMid, scale: bgMidScale }}
        className="absolute inset-0 transform-gpu will-change-[filter,transform] origin-center"
      >
        <ColorBends
          colors={["#1d78eb"]}
          rotation={90}
          speed={0.2}
          scale={1}
          frequency={0.9}
          warpStrength={0.975}
          mouseInfluence={isMobile ? 0 : 1}
          noise={0.15}
          parallax={isMobile ? 0 : 0.75}
          iterations={1}
          intensity={2}
          bandWidth={4}
          transparent
        />
      </motion.div>

      <motion.div
        style={{ y: bgYFront }}
        className="absolute inset-0 transform-gpu will-change-transform pointer-events-none"
      >
        <div className="absolute top-[20%] left-[10%] w-[min(40vw,20rem)] h-[min(40vw,20rem)] rounded-full bg-sky-500/[0.04] blur-[100px]" />
        <div className="absolute bottom-[15%] right-[8%] w-[min(35vw,18rem)] h-[min(35vw,18rem)] rounded-full bg-indigo-500/[0.05] blur-[90px]" />
      </motion.div>

      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-[#0a0a0a] pointer-events-none"
      />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,10,10,0.35)_75%,rgba(10,10,10,0.7)_100%)] pointer-events-none" />
    </div>
  );
}

/** Section-scoped floating orbs that parallax independently per section */
export function SectionParallaxOrbs() {
  return (
    <>
      <ParallaxFloat
        depth="background"
        className="-top-32 -right-16 md:-right-24 h-48 w-48 md:h-72 md:w-72 rounded-full bg-sky-400/[0.06] blur-[80px]"
      />
      <ParallaxFloat
        depth="slow"
        className="-bottom-24 -left-16 md:-left-20 h-40 w-40 md:h-56 md:w-56 rounded-full bg-indigo-400/[0.05] blur-[70px]"
      />
    </>
  );
}
