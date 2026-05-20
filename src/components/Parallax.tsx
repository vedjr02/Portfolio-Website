"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
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
  background: 28,
  slow: 48,
  medium: 72,
  fast: 96,
  foreground: 128,
};

const DEPTH_X: Record<ParallaxDepthLevel, number> = {
  background: 12,
  slow: 20,
  medium: 32,
  fast: 44,
  foreground: 56,
};

const SPRING = { stiffness: 90, damping: 28, mass: 0.35 };

type ParallaxConfig = {
  y?: number;
  x?: number;
  scale?: [number, number];
  opacity?: [number, number];
  rotate?: [number, number];
  offset?: ScrollOffset;
  stagger?: number;
};

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
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset });

  const yTravel = y + stagger;
  const xTravel = x + stagger * 0.4;

  const rawY = useTransform(scrollYProgress, [0, 1], [yTravel * 0.5, -yTravel * 0.5]);
  const rawX = useTransform(scrollYProgress, [0, 1], [-xTravel * 0.5, xTravel * 0.5]);
  const rawScale = useTransform(scrollYProgress, [0, 0.5, 1], [scale[0], (scale[0] + scale[1]) / 2, scale[1]]);
  const rawOpacity = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [opacity[0], 1, 1, opacity[1]]);
  const rawRotate = useTransform(scrollYProgress, [0, 1], rotate);

  const smoothY = useSpring(rawY, SPRING);
  const smoothX = useSpring(rawX, SPRING);
  const smoothScale = useSpring(rawScale, SPRING);

  const style: MotionStyle = prefersReducedMotion
    ? {}
    : {
        y: y !== 0 || stagger !== 0 ? smoothY : undefined,
        x: x !== 0 || stagger !== 0 ? smoothX : undefined,
        scale: scale[0] !== 1 || scale[1] !== 1 ? smoothScale : undefined,
        opacity: opacity[0] !== 1 || opacity[1] !== 1 ? rawOpacity : undefined,
        rotate: rotate[0] !== 0 || rotate[1] !== 0 ? rawRotate : undefined,
      };

  return { ref, style, scrollYProgress, disabled: prefersReducedMotion };
}

export function useParallaxDepth(
  depth: ParallaxDepthLevel = "medium",
  stagger = 0,
  offset?: ScrollOffset
) {
  const ref = useRef<HTMLDivElement>(null);
  return useParallaxMotion(ref, {
    y: DEPTH_Y[depth],
    x: depth === "background" || depth === "foreground" ? DEPTH_X[depth] * 0.5 : 0,
    scale: depth === "foreground" ? [1, 0.96] : depth === "background" ? [1.02, 1] : [1, 1],
    stagger,
    offset,
  });
}

export function useHeroParallax() {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const contentY = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 220]),
    SPRING
  );
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const nameScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const firstNameY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 140]), SPRING);
  const lastNameY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 200]), SPRING);
  const introY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 80]), SPRING);
  const metaY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 260]), SPRING);

  if (prefersReducedMotion) {
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
    <motion.div ref={ref} style={{ ...style, ...extraStyle }} className={className}>
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
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const x = useSpring(
    useTransform(scrollYProgress, [0, 1], [speed * direction, -speed * direction]),
    SPRING
  );

  if (prefersReducedMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div ref={ref} style={{ x }} className={className}>
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
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset });

  const y = useSpring(
    useTransform(scrollYProgress, [0, 1], [DEPTH_Y[depth], -DEPTH_Y[depth] * 1.4]),
    { stiffness: 60, damping: 22, mass: 0.5 }
  );
  const x = useSpring(
    useTransform(scrollYProgress, [0, 1], [-DEPTH_X[depth], DEPTH_X[depth] * 1.2]),
    { stiffness: 60, damping: 22, mass: 0.5 }
  );
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1.05, 0.88]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.15, 0.45, 0.35, 0.1]);

  if (prefersReducedMotion) return null;

  return (
    <motion.div
      ref={ref}
      aria-hidden
      style={{ y, x, scale, opacity }}
      className={`pointer-events-none absolute ${className ?? ""}`}
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
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div style={style} className={className}>
      {children}
    </motion.div>
  );
}

/** Wraps a card with scroll-linked depth + subtle tilt */
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
  const prefersReducedMotion = useReducedMotion();
  const depth = index % 2 === 0 ? "medium" : "fast";
  const stagger = (index % 3) * 14;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const yTravel = DEPTH_Y[depth] + stagger;
  const y = useSpring(
    useTransform(scrollYProgress, [0, 1], [yTravel * 0.45, -yTravel * 0.55]),
    SPRING
  );
  const rotate = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [index % 2 === 0 ? -1.2 : 1.2, 0, index % 2 === 0 ? 1.2 : -1.2]
  );
  const scale = useSpring(
    useTransform(scrollYProgress, [0, 0.45, 0.55, 1], [0.97, 1, 1, 0.97]),
    SPRING
  );

  const parallaxStyle = prefersReducedMotion ? {} : { y, rotate, scale };
  const Component = motion[as];

  return (
    <Component
      ref={ref as never}
      style={parallaxStyle}
      className={className}
      {...motionProps}
    >
      {children}
    </Component>
  );
}
