"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  type MotionProps,
  type UseInViewOptions,
  type Variants,
} from "motion/react";

type MarginType = UseInViewOptions["margin"];

interface BlurFadeProps extends MotionProps {
  children: React.ReactNode;
  className?: string;
  variant?: {
    hidden: { y: number };
    visible: { y: number };
  };
  duration?: number;
  delay?: number;
  offset?: number;
  direction?: "up" | "down" | "left" | "right";
  inView?: boolean;
  inViewMargin?: MarginType;
  /** Kept for API compat — blur disabled by default for readability */
  blur?: string;
}

export function BlurFade({
  children,
  className,
  variant,
  duration = 0.45,
  delay = 0,
  offset = 10,
  direction = "up",
  inView = false,
  inViewMargin = "-40px",
  ...props
}: BlurFadeProps) {
  const ref = useRef(null);
  const inViewResult = useInView(ref, { once: true, margin: inViewMargin });
  const isInView = !inView || inViewResult;

  const axis = direction === "left" || direction === "right" ? "x" : "y";
  const from =
    direction === "right" || direction === "down" ? -offset : offset;

  const defaultVariants: Variants = {
    hidden: { [axis]: from, opacity: 0 },
    visible: { [axis]: 0, opacity: 1 },
  };
  const combinedVariants = variant ?? defaultVariants;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={combinedVariants}
      transition={{
        delay: 0.04 + delay,
        duration,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
