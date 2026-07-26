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
import { SectionParallaxOrbs } from "@/components/BackgroundLayer";
import { ParallaxCard, ParallaxDepth } from "@/components/Parallax";
import { BlurFade } from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";
import { ShineBorder } from "@/components/ui/shine-border";
import { NumberTicker } from "@/components/ui/number-ticker";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const easeOut = [0.2, 0.8, 0.2, 1] as const;

export function Work() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      const cards = gsap.utils.toArray<HTMLElement>(".featured-case");
      cards.forEach((card) => {
        gsap.from(card, {
          opacity: 0,
          y: 56,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative py-24 md:py-36 overflow-hidden"
    >
      <SectionParallaxOrbs />

      <div className="relative mx-auto max-w-6xl px-6">
        <ParallaxDepth depth="slow">
          <SectionHeader
            eyebrow="Selected Work"
            title="Proof over pitch"
            subtitle="Featured case studies hiring managers can open, click through, and verify — then consulting, product analytics, and systems work behind them."
          />
        </ParallaxDepth>

        {/* Featured case studies */}
        <div className="mt-14 md:mt-20 space-y-6 md:space-y-8">
          <TierLabel index="01" label="Featured Case Studies" />
          {featuredProjects.map((project, i) => (
            <FeaturedCase key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* Consulting / Now */}
        <div className="mt-20 md:mt-28">
          <TierLabel index="02" label="Consulting · Now" />
          <p className="mt-3 mb-8 max-w-2xl text-neutral-400 text-sm md:text-[15px] leading-relaxed">
            Currently building the{" "}
            <span className="text-white">AdFlex dynamic pricing dashboard</span>{" "}
            as a Business Consultant project for{" "}
            <span className="text-sky-300/90">
              Sustainable Energy Ireland (SEI)
            </span>
            , alongside related energy analytics engagements.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
            {consultingProjects.map((p, i) => (
              <ProjectCard
                key={p.id}
                project={p}
                index={i}
                className={
                  i === 0
                    ? "md:col-span-12"
                    : i === 1
                      ? "md:col-span-7"
                      : "md:col-span-5"
                }
                emphasize={i === 0}
              />
            ))}
          </div>
        </div>

        {/* Product / analytics */}
        <div className="mt-20 md:mt-28">
          <TierLabel index="03" label="Product & Analytics Builds" />
          <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
            {productProjects.map((p, i) => (
              <ProjectCard
                key={p.id}
                project={p}
                index={i}
                className={
                  [
                    "md:col-span-7",
                    "md:col-span-5",
                    "md:col-span-5",
                    "md:col-span-7",
                  ][i % 4]
                }
              />
            ))}
          </div>
        </div>

        {/* Selected systems / research */}
        <div className="mt-20 md:mt-28">
          <TierLabel index="04" label="Systems & Research" />
          <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
            {selectedProjects.map((p, i) => (
              <ProjectCard
                key={p.id}
                project={p}
                index={i}
                className={i === 0 ? "md:col-span-7" : "md:col-span-5"}
              />
            ))}
          </div>
        </div>

        <ParallaxDepth depth="medium" stagger={10}>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: easeOut }}
            className="mt-16 text-center text-neutral-400"
          >
            More case studies shipping soon —{" "}
            <span className="font-display italic text-sky-300/90">
              steadily, and sourced.
            </span>
          </motion.p>
        </ParallaxDepth>
      </div>
    </section>
  );
}

function TierLabel({ index, label }: { index: string; label: string }) {
  return (
    <BlurFade inView delay={0.05} offset={8} direction="up">
      <div className="flex items-center gap-3">
        <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-sky-300/80">
          {index}
        </span>
        <span className="h-px w-6 bg-neutral-700" />
        <span className="font-mono text-[12px] tracking-[0.22em] uppercase text-neutral-400">
          {label}
        </span>
      </div>
    </BlurFade>
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
  const words = title.split(" ");
  return (
    <div className="flex flex-col gap-5">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: easeOut }}
        className="flex items-center gap-3"
      >
        <span className="h-px w-8 bg-neutral-700" />
        <span className="font-mono text-[12px] tracking-[0.22em] uppercase text-neutral-400">
          {eyebrow}
        </span>
      </motion.div>
      <ParallaxDepth depth="foreground" stagger={8}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: easeOut, delay: 0.05 }}
          className="font-display text-[clamp(2.5rem,6.5vw,5.5rem)] leading-[0.95] text-white"
        >
          {words.map((w, idx) =>
            idx === words.length - 1 ? (
              <span key={idx} className="italic text-neutral-300">
                {" "}
                {w}
              </span>
            ) : idx === 0 ? (
              <span key={idx}>{w}</span>
            ) : (
              <span key={idx}> {w}</span>
            )
          )}
        </motion.h2>
      </ParallaxDepth>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: easeOut, delay: 0.1 }}
          className="max-w-2xl text-neutral-400 text-base md:text-lg"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

function FeaturedCase({ project, index }: { project: Project; index: number }) {
  return (
    <article
      className={cn(
        "featured-case group relative glass rounded-[28px] overflow-hidden bg-neutral-950/75 backdrop-blur-2xl",
        "min-h-[420px] md:min-h-[480px]"
      )}
    >
      <ShineBorder
        shineColor={["#7dd3fc", "#1d78eb", "#67e8f9"]}
        duration={12 + index * 2}
        borderWidth={1}
      />
      <BorderBeam
        size={120}
        duration={10}
        delay={index * 1.5}
        colorFrom="#7dd3fc"
        colorTo="#1d78eb"
        borderWidth={1.5}
      />

      <div
        className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-40 group-hover:opacity-60 transition-opacity duration-700`}
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 p-7 md:p-10 lg:p-12 h-full">
        <div className="lg:col-span-7 flex flex-col">
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <StatusPill status={project.status} />
            <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-neutral-400">
              {project.period}
            </span>
            <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-neutral-500">
              {project.category}
            </span>
          </div>

          <h3 className="font-display text-[clamp(1.85rem,4vw,3.25rem)] leading-[1.02] tracking-tight text-white max-w-xl">
            {project.title}
          </h3>
          <p className="mt-5 text-neutral-300/90 text-sm md:text-[15px] leading-relaxed max-w-prose">
            {project.description}
          </p>

          <ul className="mt-6 space-y-2">
            {project.highlights.map((h) => (
              <li
                key={h}
                className="flex items-start gap-2.5 text-sm text-neutral-300"
              >
                <span className="mt-1.5 h-1 w-1 rounded-full bg-sky-300 shrink-0" />
                {h}
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-8 flex flex-wrap gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white text-black px-4 py-2.5 text-sm font-medium hover:bg-sky-300 transition-colors"
              >
                Open live case study
                <ArrowUpRight />
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-neutral-200 hover:bg-white/10 hover:text-white transition-colors"
              >
                GitHub
                <ArrowUpRight />
              </a>
            )}
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col justify-between gap-6">
          <div className="flex flex-wrap gap-1.5 justify-start lg:justify-end">
            {project.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[12px] text-neutral-300"
              >
                {t}
              </span>
            ))}
          </div>

          {project.metric && (
            <div className="glass rounded-3xl p-6 md:p-7 mt-auto">
              <div className="font-display text-5xl md:text-6xl text-white tracking-tight">
                <NumberTicker
                  value={project.metric.value}
                  decimalPlaces={project.metric.decimals ?? 0}
                />
                {project.metric.suffix}
              </div>
              <p className="mt-2 font-mono text-[11px] tracking-[0.16em] uppercase text-neutral-400">
                {project.metric.label}
              </p>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

function ProjectCard({
  project,
  index,
  className,
  emphasize = false,
}: {
  project: Project;
  index: number;
  className?: string;
  emphasize?: boolean;
}) {
  const href = project.liveUrl ?? project.repoUrl;
  const linkProps = href
    ? { as: "a" as const, href, target: "_blank" as const, rel: "noreferrer" }
    : { as: "article" as const };

  return (
    <ParallaxCard
      {...linkProps}
      index={index}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, ease: easeOut, delay: (index % 2) * 0.08 }}
      className={cn(
        "group relative glass glass-hover rounded-[28px] overflow-hidden bg-neutral-950/70 backdrop-blur-2xl block no-underline",
        emphasize && "ring-1 ring-sky-300/20",
        className
      )}
    >
      {emphasize && (
        <BorderBeam
          size={90}
          duration={9}
          colorFrom="#7dd3fc"
          colorTo="#38bdf8"
          borderWidth={1}
        />
      )}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-30 group-hover:opacity-50 transition-opacity duration-700`}
      />
      <ParallaxDepth
        depth="foreground"
        stagger={index * 6}
        className="absolute -top-2 -right-3 select-none pointer-events-none"
      >
        <span className="font-display text-[10rem] md:text-[14rem] leading-none text-white/[0.04]">
          0{index + 1}
        </span>
      </ParallaxDepth>

      <div
        className={cn(
          "relative p-7 md:p-10 flex flex-col h-full",
          emphasize ? "min-h-[380px] md:min-h-[420px]" : "min-h-[400px] md:min-h-[480px]"
        )}
      >
        <div className="flex items-center justify-between mb-auto gap-3">
          <StatusPill status={project.status} />
          <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-neutral-400 text-right">
            {project.period}
          </span>
        </div>

        <div className="mt-12 md:mt-14">
          {emphasize && (
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-sky-300/20 bg-sky-300/10 px-2.5 py-1 font-mono text-[10px] tracking-[0.18em] uppercase text-sky-200">
              Current · SEI consulting
            </p>
          )}
          <p className="font-mono text-[12px] tracking-[0.18em] uppercase text-neutral-400 mb-3">
            {project.category}
          </p>
          <h3 className="font-display text-3xl md:text-4xl text-white leading-[1.05] tracking-tight">
            {project.title}
          </h3>
          <p className="mt-4 text-neutral-300/90 text-sm md:text-[15px] leading-relaxed max-w-prose">
            {project.description}
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-1.5">
          {project.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[12px] text-neutral-300"
            >
              {t}
            </span>
          ))}
        </div>

        {(project.liveUrl || project.repoUrl) && (
          <div className="mt-6 flex items-center gap-4 text-[13px] text-neutral-400">
            {project.liveUrl && (
              <span className="group-hover:text-sky-300 transition-colors">
                Live demo →
              </span>
            )}
            {!project.liveUrl && project.repoUrl && (
              <span className="group-hover:text-white transition-colors">
                View repo →
              </span>
            )}
          </div>
        )}
      </div>

      <div className="absolute top-6 right-6 md:top-7 md:right-7 h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 group-hover:bg-white group-hover:text-black transition-all duration-500">
        <ArrowUpRight />
      </div>
    </ParallaxCard>
  );
}

function StatusPill({ status }: { status: Project["status"] }) {
  const color =
    status === "In Progress"
      ? "bg-sky-300"
      : status === "Live"
        ? "bg-emerald-400"
        : "bg-neutral-400";

  return (
    <div className="flex items-center gap-2">
      <span className={cn("h-1.5 w-1.5 rounded-full", color)} />
      <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-neutral-300">
        {status}
      </span>
    </div>
  );
}

function ArrowUpRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path
        d="M3 9L9 3M9 3H4M9 3V8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
