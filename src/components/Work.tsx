"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  consultingProjects,
  featuredProjects,
  productProjects,
  selectedProjects,
  type Project,
} from "@/lib/data";
import { BlurFade } from "@/components/ui/blur-fade";
import { NumberTicker } from "@/components/ui/number-ticker";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const easeOut = [0.2, 0.8, 0.2, 1] as const;

const moreProjects = [
  ...consultingProjects.filter((p) => p.id !== "adflex"),
  ...productProjects,
  ...selectedProjects,
];

const adflex = consultingProjects.find((p) => p.id === "adflex");

export function Work() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      // Transform only — never leave featured cards stuck at opacity 0
      gsap.utils.toArray<HTMLElement>(".featured-block").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 36 },
          {
            y: 0,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="Selected Work"
          title="Proof over pitch"
          subtitle="A few deep case studies you can open and verify — everything else stays compact."
        />

        {/* MAIN — large featured */}
        <div className="mt-14 md:mt-18 space-y-8 md:space-y-10">
          <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-muted">
            Main projects
          </p>

          {featuredProjects.map((project, i) => (
            <FeaturedBlock key={project.id} project={project} index={i} />
          ))}

          {adflex && <FeaturedBlock project={adflex} index={2} consulting />}
        </div>

        {/* SECONDARY — small cards */}
        <div className="mt-20 md:mt-28">
          <div className="flex items-end justify-between gap-4 mb-8">
            <div>
              <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-muted mb-2">
                More work
              </p>
              <h3 className="font-display text-2xl md:text-3xl text-ink tracking-tight">
                Compact builds & systems
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {moreProjects.map((project, i) => (
              <SmallCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="flex flex-col gap-4 max-w-3xl">
      <BlurFade inView delay={0.05} direction="up">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-ink/20" />
          <span className="font-mono text-[12px] tracking-[0.22em] uppercase text-muted">
            {eyebrow}
          </span>
        </div>
      </BlurFade>
      <BlurFade inView delay={0.1} direction="up">
        <h2 className="font-display text-[clamp(2.75rem,7vw,5.5rem)] leading-[0.92] text-ink">
          {title}
        </h2>
      </BlurFade>
      {subtitle && (
        <BlurFade inView delay={0.15} direction="up">
          <p className="text-ink-soft text-base md:text-lg leading-relaxed">
            {subtitle}
          </p>
        </BlurFade>
      )}
    </div>
  );
}

function FeaturedBlock({
  project,
  index,
  consulting = false,
}: {
  project: Project;
  index: number;
  consulting?: boolean;
}) {
  return (
    <article className="featured-block neu rounded-[32px] overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        <div className="lg:col-span-8 p-8 md:p-11 lg:p-12 flex flex-col">
          <div className="flex flex-wrap items-center gap-3 mb-7">
            <StatusPill status={project.status} />
            {consulting && (
              <span className="neu-inset rounded-full px-3 py-1 font-mono text-[10px] tracking-[0.16em] uppercase text-accent">
                Current · SEI
              </span>
            )}
            <span className="font-mono text-[11px] tracking-[0.16em] uppercase text-muted">
              {project.period}
            </span>
          </div>

          <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-muted mb-3">
            {project.category}
          </p>
          <h3 className="font-display text-[clamp(2rem,4.2vw,3.4rem)] leading-[1.02] tracking-tight text-ink max-w-2xl">
            {project.title}
          </h3>
          <p className="mt-5 text-ink-soft text-[15px] md:text-base leading-relaxed max-w-2xl">
            {project.description}
          </p>

          <ul className="mt-6 space-y-2.5">
            {project.highlights.map((h) => (
              <li
                key={h}
                className="flex items-start gap-3 text-sm text-ink-soft"
              >
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                {h}
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-9 flex flex-wrap gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="neu-btn rounded-full px-5 py-3 text-sm font-semibold text-ink hover:text-accent"
              >
                Open live demo →
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="neu-inset rounded-full px-5 py-3 text-sm font-medium text-ink-soft hover:text-ink transition-colors"
              >
                GitHub
              </a>
            )}
          </div>
        </div>

        <div className="lg:col-span-4 p-8 md:p-10 lg:p-12 flex flex-col justify-between gap-8 border-t lg:border-t-0 lg:border-l border-line">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span
                key={t}
                className="neu-inset rounded-full px-3 py-1.5 text-[12px] text-ink-soft"
              >
                {t}
              </span>
            ))}
          </div>

          {project.metric ? (
            <div className="neu-inset rounded-[24px] p-6">
              <div className="font-display text-5xl md:text-6xl text-ink tracking-tight">
                <NumberTicker
                  value={project.metric.value}
                  decimalPlaces={project.metric.decimals ?? 0}
                  className="text-ink"
                />
                {project.metric.suffix}
              </div>
              <p className="mt-2 font-mono text-[11px] tracking-[0.14em] uppercase text-muted">
                {project.metric.label}
              </p>
            </div>
          ) : (
            <div className="neu-inset rounded-[24px] p-6">
              <p className="font-display text-4xl text-ink tracking-tight">
                0{index + 1}
              </p>
              <p className="mt-2 font-mono text-[11px] tracking-[0.14em] uppercase text-muted">
                Featured engagement
              </p>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

function SmallCard({ project, index }: { project: Project; index: number }) {
  const href = project.liveUrl ?? project.repoUrl;
  const className =
    "neu neu-hover rounded-[22px] p-5 md:p-6 flex flex-col min-h-[200px] h-full no-underline text-inherit block";

  const inner = (
    <>
      <div className="flex items-center justify-between gap-2 mb-4">
        <StatusPill status={project.status} compact />
        <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-muted">
          {project.period.split("—")[0].trim()}
        </span>
      </div>

      <h4 className="font-display text-xl leading-tight tracking-tight text-ink">
        {project.title}
      </h4>
      <p className="mt-2 text-[13px] text-ink-soft leading-relaxed line-clamp-3">
        {project.description}
      </p>

      <div className="mt-auto pt-4 flex flex-wrap gap-1.5">
        {project.tags.slice(0, 3).map((t) => (
          <span
            key={t}
            className="neu-inset rounded-full px-2 py-0.5 text-[10px] text-muted"
          >
            {t}
          </span>
        ))}
      </div>
    </>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, ease: easeOut, delay: (index % 6) * 0.04 }}
    >
      {href ? (
        <a href={href} target="_blank" rel="noreferrer" className={className}>
          {inner}
        </a>
      ) : (
        <article className={className}>{inner}</article>
      )}
    </motion.div>
  );
}

function StatusPill({
  status,
  compact = false,
}: {
  status: Project["status"];
  compact?: boolean;
}) {
  const color =
    status === "In Progress"
      ? "bg-accent-soft"
      : status === "Live"
        ? "bg-emerald-600"
        : "bg-muted";

  return (
    <div className="flex items-center gap-2">
      <span className={cn("h-1.5 w-1.5 rounded-full", color)} />
      <span
        className={cn(
          "font-mono tracking-[0.16em] uppercase text-ink-soft",
          compact ? "text-[10px]" : "text-[11px]"
        )}
      >
        {status}
      </span>
    </div>
  );
}
