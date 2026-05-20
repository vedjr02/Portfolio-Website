"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import ColorBends from "./ColorBends";
import { ParallaxFloat } from "./Parallax";

export function BackgroundLayer() {
  const { scrollY } = useScroll();

  const smoothScroll = useSpring(scrollY, {
    stiffness: 80,
    damping: 24,
    mass: 0.4,
  });

  const blurPx = useTransform(smoothScroll, [0, 600], [0, 16]);
  const filter = useTransform(blurPx, (v) => `blur(${v}px)`);
  const overlayOpacity = useTransform(smoothScroll, [0, 600], [0, 0.4]);

  // Multi-speed background layers — each drifts at a different rate
  const bgYDeep = useTransform(smoothScroll, [0, 4000], [0, 520]);
  const bgYMid = useTransform(smoothScroll, [0, 4000], [0, 340]);
  const bgYFront = useTransform(smoothScroll, [0, 4000], [0, 180]);
  const bgScale = useTransform(smoothScroll, [0, 4000], [1, 1.14]);
  const bgRotate = useTransform(smoothScroll, [0, 4000], [0, 8]);

  return (
    <div className="fixed inset-0 -z-10 bg-[#0a0a0a] overflow-hidden">
      {/* Deep layer — slowest drift */}
      <motion.div
        style={{ y: bgYDeep, scale: bgScale, rotate: bgRotate }}
        className="absolute inset-[-15%] will-change-transform origin-center"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(29,120,235,0.12),transparent_70%)]" />
      </motion.div>

      {/* Shader layer — mid-speed parallax + progressive blur */}
      <motion.div
        style={{ filter, y: bgYMid, scale: useTransform(smoothScroll, [0, 4000], [1, 1.1]) }}
        className="absolute inset-0 will-change-[filter,transform] origin-center"
      >
        <ColorBends
          colors={["#1d78eb"]}
          rotation={90}
          speed={0.2}
          scale={1}
          frequency={0.9}
          warpStrength={0.975}
          mouseInfluence={1}
          noise={0.15}
          parallax={0.75}
          iterations={1}
          intensity={2}
          bandWidth={4}
          transparent
        />
      </motion.div>

      {/* Front glow layer — fastest background drift */}
      <motion.div
        style={{ y: bgYFront }}
        className="absolute inset-0 will-change-transform pointer-events-none"
      >
        <div className="absolute top-[20%] left-[10%] w-[40vw] h-[40vw] max-w-xl max-h-xl rounded-full bg-sky-500/[0.04] blur-[100px]" />
        <div className="absolute bottom-[15%] right-[8%] w-[35vw] h-[35vw] max-w-lg max-h-lg rounded-full bg-indigo-500/[0.05] blur-[90px]" />
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
        className="-top-32 -right-24 h-72 w-72 rounded-full bg-sky-400/[0.06] blur-[80px]"
      />
      <ParallaxFloat
        depth="slow"
        className="-bottom-24 -left-20 h-56 w-56 rounded-full bg-indigo-400/[0.05] blur-[70px]"
      />
    </>
  );
}
