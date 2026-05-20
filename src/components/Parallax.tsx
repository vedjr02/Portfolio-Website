"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type HTMLMotionProps,
  type MotionStyle,
  type MotionValue,
} from "framer-motion";
import {
  useRef,
  type CSSProperties,
  type ReactNode,
  type RefObject,
} from "react";
import { useIsMobile } from "@/hooks/useIsMobile";

export type ParallaxDepthLevel =
  | "background"
  | "slow"
  | "medium"
  | "fast"
  | "foreground";

type ScrollOffset = [
  "start end" | "end end" | "start start" | "end start",
  "start end" | "end end" | "start start" | "end start",
];

const DEPTH_Y: Record<ParallaxDepthLevel, number> = {
  background: 20,
  slow: 34,
  medium: 50,
  fast: 66,
  foreground: 84,
};

const DEPTH_X: Record<ParallaxDepthLevel, number> = {
  background: 8,
  slow: 14,
  medium: 22,
  fast: 30,
  foreground: 38,
};

const GPU = "transform-gpu will-change-transform [backface-visibility:hidden]";

type ParallaxConfig = {
  y?: number;
  x?: number;
  scale?: [number, number];
  opacity?: [number, number];
  rotate?: [number, number];
  offset?: ScrollOffset;
  stagger?: number;
};

function useParallaxEnabled() {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  return !(prefersReducedMotion || isMobile);
}

function useParallaxMotion(
  ref: RefObject<HTMLDivElement | null>,
  {
    y = 0,
    x = 0,
    scale = [1, 1],
    opacity = [1, 1],
    rotate = [0, 0],
    offset = ["start end", "end start"],
    stagger = 0,
  }: ParallaxConfig
) {
  const enabled = useParallaxEnabled();
  const { scrollYProgress } = useScroll({ target: ref, offset });

  const yTravel = y + stagger;
  const xTravel = x + stagger * 0.25;

  const rawY = useTransform(scrollYProgress, [0, 1], [yTravel * 0.4, -yTravel * 0.4]);
  const rawX = useTransform(scrollYProgress, [0, 1], [-xTravel * 0.4, xTravel * 0.4]);
  const rawScale = useTransform(scrollYProgress, [0, 0.5, 1], [scale[0], (scale[0] + scale[1]) / 2, scale[1]]);
  const rawOpacity = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [opacity[0], 1, 1, opacity[1]]);
  const rawRotate = useTransform(scrollYProgress, [0, 1], rotate);

  const style: MotionStyle = enabled
    ? {
        y: y !== 0 || stagger !== 0 ? rawY : undefined,
        x: x !== 0 || stagger !== 0 ? rawX : undefined,
        scale: scale[0] !== 1 || scale[1] !== 1 ? rawScale : undefined,
        opacity: opacity[0] !== 1 || opacity[1] !== 1 ? rawOpacity : undefined,
        rotate: rotate[0] !== 0 || rotate[1] !== 0 ? rawRotate : undefined,
      }
    : {};

  return { ref, style, scrollYProgress, disabled: !enabled };
}

export function useParallaxDepth(
  depth: ParallaxDepthLevel = "medium",
  stagger = 0,
  offset?: ScrollOffset
) {
  const ref = useRef<HTMLDivElement>(null);
  return useParallaxMotion(ref, {
    y: DEPTH_Y[depth],
    x: depth === "background" || depth === "foreground" ? DEPTH_X[depth] * 0.35 : 0,
    scale: depth === "foreground" ? [1, 0.98] : depth === "background" ? [1.01, 1] : [1, 1],
    stagger,
    offset,
  });
}

export function useHeroParallax() {
  const ref = useRef<HTMLElement>(null);
  const enabled = useParallaxEnabled();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const nameScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const firstNameY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const lastNameY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const introY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const metaY = useTransform(scrollYProgress, [0, 1], [0, 180]);

  if (!enabled) {
    return {
      ref,
      disabled: true,
      pillStyle: {},
      introStyle: {},
      firstNameStyle: {},
      lastNameStyle: {},
      metaStyle: {},
    };
  }

  return {
    ref,
    disabled: false,
    pillStyle: { y: introY, opacity: contentOpacity },
    introStyle: { y: introY },
    firstNameStyle: { y: firstNameY, scale: nameScale },
    lastNameStyle: { y: lastNameY, scale: nameScale },
    metaStyle: { y: metaY, opacity: contentOpacity },
  };
}

type ParallaxDepthProps = {
  children: ReactNode;
  depth?: ParallaxDepthLevel;
  className?: string;
  stagger?: number;
  offset?: ScrollOffset;
  style?: CSSProperties;
};

export function ParallaxDepth({
  children,
  depth = "medium",
  className,
  stagger = 0,
  offset,
  style: extraStyle,
}: ParallaxDepthProps) {
  const { ref, style, disabled } = useParallaxDepth(depth, stagger, offset);

  if (disabled) {
    return (
      <div ref={ref} className={className} style={extraStyle}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      style={{ ...style, ...extraStyle }}
      className={`${GPU} ${className ?? ""}`}
    >
      {children}
    </motion.div>
  );
}

type ParallaxMarqueeProps = {
  children: ReactNode;
  className?: string;
  direction?: 1 | -1;
  speed?: number;
};

export function ParallaxMarquee({
  children,
  className,
  direction = 1,
  speed = 80,
}: ParallaxMarqueeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const enabled = useParallaxEnabled();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [speed * direction * 0.35, -speed * direction * 0.35]
  );

  if (!enabled) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div ref={ref} style={{ x }} className={`${GPU} ${className ?? ""}`}>
      {children}
    </motion.div>
  );
}

type ParallaxFloatProps = {
  className?: string;
  depth?: ParallaxDepthLevel;
  offset?: ScrollOffset;
};

export function ParallaxFloat({
  className,
  depth = "background",
  offset = ["start end", "end start"],
}: ParallaxFloatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const enabled = useParallaxEnabled();
  const { scrollYProgress } = useScroll({ target: ref, offset });

  const y = useTransform(scrollYProgress, [0, 1], [DEPTH_Y[depth] * 0.5, -DEPTH_Y[depth] * 0.7]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.12, 0.35, 0.28, 0.08]);

  if (!enabled) return null;

  return (
    <motion.div
      ref={ref}
      aria-hidden
      style={{ y, opacity }}
      className={`pointer-events-none absolute ${GPU} ${className ?? ""}`}
    />
  );
}

type ParallaxLayerProps = {
  children: ReactNode;
  className?: string;
  style: {
    y?: MotionValue<number>;
    x?: MotionValue<number>;
    opacity?: MotionValue<number>;
    scale?: MotionValue<number>;
  };
};

export function ParallaxLayer({ children, className, style }: ParallaxLayerProps) {
  const enabled = useParallaxEnabled();

  if (!enabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div style={style} className={`${GPU} ${className ?? ""}`}>
      {children}
    </motion.div>
  );
}

/** Wraps a card with scroll-linked depth */
export function ParallaxCard({
  children,
  className,
  index = 0,
  as = "article",
  ...motionProps
}: {
  children: ReactNode;
  className?: string;
  index?: number;
  as?: "article" | "a" | "div";
} & HTMLMotionProps<"article"> & HTMLMotionProps<"a"> & HTMLMotionProps<"div">) {
  const ref = useRef<HTMLDivElement>(null);
  const enabled = useParallaxEnabled();
  const depth = index % 2 === 0 ? "medium" : "fast";
  const stagger = (index % 3) * 10;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const yTravel = DEPTH_Y[depth] + stagger;
  const y = useTransform(scrollYProgress, [0, 1], [yTravel * 0.35, -yTravel * 0.45]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.99, 1, 0.99]);

  const parallaxStyle = enabled ? { y, scale } : {};
  const Component = motion[as];

  return (
    <Component
      ref={ref as never}
      style={parallaxStyle}
      className={`${enabled ? GPU : ""} ${className ?? ""}`}
      {...motionProps}
    >
      {children}
    </Component>
  );
}
