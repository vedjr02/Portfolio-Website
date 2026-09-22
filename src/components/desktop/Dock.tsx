"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useSettings } from "@/components/desktop/settings";
import { goTo, useActiveSection, type SectionId } from "@/components/desktop/sections";
import { profile } from "@/lib/data";
import { cn } from "@/lib/utils";

const BASE = 50;
const PEAK = 76;
const REACH = 140;

type Item = {
  key: string;
  label: string;
  section?: SectionId;
  href?: string;
  desktopOnly?: boolean;
  tile: ReactNode;
};

/** Icons are the real macOS app icons (from the system's own .icns), each standing in for a section. */
function AppIcon({ src }: { src: string }) {
  return (
    <Image
      src={src}
      alt=""
      width={128}
      height={128}
      draggable={false}
      className="size-full scale-[1.14] drop-shadow-[0_1px_1.5px_rgba(0,0,0,0.3)]"
    />
  );
}

const ITEMS: Item[] = [
  { key: "finder", label: "Projects", section: "projects", tile: <AppIcon src="/dock/finder.webp" /> },
  { key: "hmc", label: "Hold My Code", section: "hold-my-code", tile: <AppIcon src="/hmc/app-icon.png" /> },
  { key: "preview", label: "Case studies", section: "cases", tile: <AppIcon src="/dock/preview.webp" /> },
  { key: "contacts", label: "About", section: "about", tile: <AppIcon src="/dock/contacts.webp" /> },
  { key: "mail", label: "Contact", section: "contact", tile: <AppIcon src="/dock/mail.webp" /> },
  { key: "safari", label: "LinkedIn", href: profile.socials.linkedin, desktopOnly: true, tile: <AppIcon src="/dock/safari.webp" /> },
  { key: "terminal", label: "GitHub", href: profile.socials.github, desktopOnly: true, tile: <AppIcon src="/dock/terminal.webp" /> },
];

function DockIcon({
  item,
  mouseX,
  active,
  magnify,
}: {
  item: Item;
  mouseX: MotionValue<number>;
  active: boolean;
  magnify: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const distance = useTransform(mouseX, (x) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r || !Number.isFinite(x)) return REACH;
    return x - (r.left + r.width / 2);
  });
  const target = useTransform(distance, [-REACH, 0, REACH], [BASE, PEAK, BASE], { clamp: true });
  const size = useSpring(target, { stiffness: 380, damping: 28, mass: 0.2 });

  const external = !!item.href;

  return (
    <li className={cn("relative flex flex-col items-center", item.desktopOnly && "hidden sm:flex")}>
      <motion.a
        ref={ref}
        href={external ? item.href : `#${item.section}`}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        onClick={(e) => {
          if (external || !item.section) return;
          e.preventDefault();
          goTo(item.section);
        }}
        aria-label={item.label}
        aria-current={active ? "location" : undefined}
        style={magnify ? { width: size, height: size } : undefined}
        className="peer relative block size-[52px] text-[16px] sm:size-[50px] sm:text-[20px]"
      >
        {item.tile}
      </motion.a>
      <span
        aria-hidden
        className="vibrant pointer-events-none absolute -top-10 rounded-[7px] px-2.5 py-1 text-[12.5px] whitespace-nowrap text-ink opacity-0 shadow-menu transition-opacity duration-100 peer-hover:opacity-100 peer-focus-visible:opacity-100"
      >
        {item.label}
      </span>
      <span
        aria-hidden
        className={cn(
          "mt-[3px] size-[4px] rounded-full bg-ink/75 transition-opacity duration-300",
          active ? "opacity-100" : "opacity-0"
        )}
      />
    </li>
  );
}

/** The Dock is the site's navigation. A dot sits under the section you are reading. */
export function Dock() {
  const mouseX = useMotionValue(Number.POSITIVE_INFINITY);
  const active = useActiveSection();
  const reduce = useReducedMotion();
  const [finePointer, setFinePointer] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 640px)");
    const sync = () => setFinePointer(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  const { focus } = useSettings();
  const magnify = finePointer && !reduce && !focus;

  const main = ITEMS.filter((i) => !i.href);
  const links = ITEMS.filter((i) => i.href);

  return (
    <nav
      aria-label="Dock"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center pb-[max(0.5rem,env(safe-area-inset-bottom))]"
    >
      <ul
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Number.POSITIVE_INFINITY)}
        className="vibrant pointer-events-auto flex items-end gap-3.5 rounded-[30px] px-3.5 pt-3 pb-2 sm:gap-2.5 sm:rounded-[22px] sm:px-2.5 sm:pt-2 sm:pb-1 shadow-[0_0_0_0.5px_rgba(255,255,255,0.18),0_10px_30px_-8px_rgba(0,0,0,0.5)] sm:gap-2"
      >
        {main.map((item) => (
          <DockIcon key={item.key} item={item} mouseX={mouseX} active={active === item.section} magnify={magnify} />
        ))}
        <li aria-hidden className="mx-0.5 hidden h-12 w-px self-center bg-black/15 sm:block" />
        {links.map((item) => (
          <DockIcon key={item.key} item={item} mouseX={mouseX} active={false} magnify={magnify} />
        ))}
      </ul>
    </nav>
  );
}
