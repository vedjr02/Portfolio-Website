"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

function hostname(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

/** Prefer local `/previews/*.jpg`. Remote mShots only as last resort. */
export function remotePreviewSrc(liveUrl: string) {
  return `https://s0.wp.com/mshots/v1/${encodeURIComponent(liveUrl)}?w=1200&h=760`;
}

type ProjectPreviewProps = {
  title: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  url?: string;
  image?: string;
  caption?: string;
};

function BrandedFallback({ title, host }: { title: string; host: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#12100e]">
      <div
        aria-hidden
        className="absolute -right-8 -top-10 h-40 w-40 rounded-full bg-accent/25 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -bottom-12 -left-6 h-36 w-36 rounded-full bg-sage/20 blur-3xl"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(246,241,232,0.05)_1px,transparent_0)] [background-size:18px_18px]" />

      <div className="absolute inset-x-4 top-4 bottom-4 rounded-xl border border-white/10 bg-panel/50 p-3 backdrop-blur-sm">
        <div className="mb-3 flex items-center justify-between gap-2">
          <div className="h-2 w-16 rounded-full bg-accent/50" />
          <div className="h-2 w-8 rounded-full bg-white/10" />
        </div>
        <div className="space-y-2">
          <div className="h-2.5 w-[78%] rounded-full bg-white/12" />
          <div className="h-2.5 w-[58%] rounded-full bg-white/8" />
          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="aspect-[4/3] rounded-lg bg-accent/15 border border-white/8" />
            <div className="aspect-[4/3] rounded-lg bg-white/6 border border-white/8" />
            <div className="aspect-[4/3] rounded-lg bg-sage/15 border border-white/8" />
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0b0a09] via-[#0b0a09]/80 to-transparent px-4 pb-3 pt-10">
        <p className="font-display text-[15px] leading-tight tracking-tight text-ink line-clamp-2">
          {title}
        </p>
        <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.12em] text-muted">
          {host}
        </p>
      </div>
    </div>
  );
}

export function ProjectPreview({
  url,
  title,
  className = "",
  size = "md",
  image,
  caption,
}: ProjectPreviewProps) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const host = url ? hostname(url) : caption ?? "Preview";
  const src = image ?? (url ? remotePreviewSrc(url) : undefined);
  const showImage = Boolean(src) && !failed;
  const showSkeleton = showImage && !loaded;

  useEffect(() => {
    setFailed(false);
    setLoaded(false);
  }, [src]);

  const chrome = (
    <>
      <div className="flex items-center gap-2 border-b border-white/8 bg-white/[0.03] px-3 py-2">
        <span className="flex gap-1.5" aria-hidden>
          <span className="h-2 w-2 rounded-full bg-[#ff5f57]/90" />
          <span className="h-2 w-2 rounded-full bg-[#febc2e]/90" />
          <span className="h-2 w-2 rounded-full bg-[#28c840]/90" />
        </span>
        <span className="min-w-0 flex-1 truncate rounded-full border border-white/8 bg-bg/50 px-2.5 py-0.5 text-[10px] font-semibold text-muted">
          {host}
        </span>
        {url && (
          <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-muted transition-colors group-hover/preview:text-accent" />
        )}
      </div>

      <div
        className={cn(
          "relative overflow-hidden bg-[#12100e] aspect-[16/10]",
          size === "lg" && "aspect-[16/9]"
        )}
      >
        {showSkeleton && (
          <div
            aria-hidden
            className="preview-skeleton absolute inset-0 z-[1]"
          />
        )}

        {showImage ? (
          <Image
            key={src}
            src={src!}
            alt={`Preview of ${title}`}
            fill
            sizes="(max-width: 768px) 100vw, 480px"
            className={cn(
              "object-cover object-top transition-[opacity,transform] duration-500 group-hover/preview:scale-[1.03]",
              loaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => setLoaded(true)}
            onError={() => {
              setFailed(true);
              setLoaded(false);
            }}
            unoptimized
          />
        ) : (
          <BrandedFallback title={title} host={host} />
        )}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b0a09]/25 via-transparent to-transparent"
        />
      </div>
    </>
  );

  const shellClass = cn(
    "group/preview block overflow-hidden rounded-2xl border border-white/10 bg-bg-deep/60 no-underline transition-colors",
    url && "hover:border-accent/40",
    className
  );

  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className={shellClass}
        aria-label={`Open preview of ${title}`}
      >
        {chrome}
      </a>
    );
  }

  return (
    <div className={shellClass} aria-label={`Preview of ${title}`}>
      {chrome}
    </div>
  );
}
