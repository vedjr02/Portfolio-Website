"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import ColorBends from "./ColorBends";

export function BackgroundLayer() {
  const { scrollY } = useScroll();

  // Smooth the raw scroll value so the transition feels seamless
  const smoothScroll = useSpring(scrollY, {
    stiffness: 80,
    damping: 24,
    mass: 0.4,
  });

  // 0 -> 600px of scroll drives the transition
  // At top: no blur, no dark overlay (background fully active)
  // After ~600px scroll: ~16px blur + dark veil (40% darkening => ~60% opacity)
  const blurPx = useTransform(smoothScroll, [0, 600], [0, 16]);
  const filter = useTransform(blurPx, (v) => `blur(${v}px)`);
  const overlayOpacity = useTransform(smoothScroll, [0, 600], [0, 0.4]);

  return (
    <div className="fixed inset-0 -z-10 bg-[#0a0a0a] overflow-hidden">
      {/* Shader layer — blurs progressively as the user scrolls */}
      <motion.div
        style={{ filter }}
        className="absolute inset-0 will-change-[filter]"
      >
        <ColorBends
          colors={["#ff5c7a", "#8a5cff", "#00ffd1"]}
          rotation={90}
          speed={0.2}
          scale={1}
          frequency={1}
          warpStrength={1}
          mouseInfluence={1}
          noise={0.15}
          parallax={0.5}
          iterations={1}
          intensity={1.5}
          bandWidth={6}
          transparent
        />
      </motion.div>

      {/* Dark veil that fades in on scroll — drops background to ~60% visibility */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-[#0a0a0a] pointer-events-none"
      />

      {/* Static centered vignette so headlines stay legible at the top too */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,10,10,0.35)_75%,rgba(10,10,10,0.7)_100%)] pointer-events-none" />
    </div>
  );
}
