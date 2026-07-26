"use client";

import { useReducedMotion } from "framer-motion";
import { FlickeringGrid } from "@/components/ui/flickering-grid";

export function BackgroundLayer() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#0e1014]">
      {/* Deep base — no muddy color blobs */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(232,226,212,0.07),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_80%_100%,rgba(232,226,212,0.04),transparent_50%)]" />

      {!prefersReducedMotion && (
        <div className="absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_75%)]">
          <FlickeringGrid
            className="h-full w-full"
            squareSize={3}
            gridGap={7}
            flickerChance={0.22}
            color="rgb(232, 226, 212)"
            maxOpacity={0.18}
          />
        </div>
      )}

      {/* Soft vignette so content stays readable */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(14,16,20,0.55)_70%,rgba(14,16,20,0.92)_100%)] pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0e1014] to-transparent pointer-events-none" />
    </div>
  );
}

export function SectionParallaxOrbs() {
  return null;
}
