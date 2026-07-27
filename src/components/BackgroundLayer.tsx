"use client";

export function BackgroundLayer() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-bg">
      {/* Soft base wash — breaks flat #0b0a09 posterization */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 120% 90% at 50% 40%, #12100e 0%, #0e0d0b 42%, #0b0a09 72%, #090807 100%)",
        }}
      />

      {/* Aurora as multi-stop radials (no blur blobs — blur bands on dark) */}
      <div
        aria-hidden
        className="absolute inset-0 animate-aurora-a"
        style={{
          background: [
            "radial-gradient(ellipse 55% 45% at 12% 8%, rgba(61,155,255,0.22) 0%, rgba(61,155,255,0.12) 18%, rgba(61,155,255,0.05) 38%, rgba(61,155,255,0.015) 55%, transparent 72%)",
            "radial-gradient(ellipse 50% 42% at 88% 38%, rgba(125,186,154,0.16) 0%, rgba(125,186,154,0.08) 22%, rgba(125,186,154,0.03) 42%, transparent 68%)",
          ].join(", "),
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 animate-aurora-b"
        style={{
          background:
            "radial-gradient(ellipse 48% 40% at 28% 92%, rgba(196,138,42,0.14) 0%, rgba(196,138,42,0.07) 24%, rgba(196,138,42,0.025) 44%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 animate-aurora-c"
        style={{
          background:
            "radial-gradient(ellipse 40% 34% at 58% 58%, rgba(61,155,255,0.1) 0%, rgba(61,155,255,0.04) 28%, transparent 62%)",
        }}
      />

      {/* Soft vignette with many stops so edges don’t stair-step */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 75% 65% at 50% 42%, transparent 0%, transparent 36%, rgba(11,10,9,0.12) 52%, rgba(11,10,9,0.28) 64%, rgba(11,10,9,0.48) 76%, rgba(11,10,9,0.68) 88%, rgba(11,10,9,0.86) 100%)",
        }}
      />
    </div>
  );
}

export function SectionParallaxOrbs() {
  return null;
}
