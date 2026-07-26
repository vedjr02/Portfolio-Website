"use client";

export function BackgroundLayer() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-bg">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(246,241,232,0.04) 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="absolute -top-28 -left-24 h-[30rem] w-[30rem] rounded-full bg-accent/15 blur-3xl animate-float-soft" />
      <div className="absolute top-[38%] -right-28 h-[28rem] w-[28rem] rounded-full bg-sage/12 blur-3xl" />
      <div className="absolute bottom-[-12%] left-[18%] h-[24rem] w-[24rem] rounded-full bg-[#c48a2a]/10 blur-3xl animate-float-soft" />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(11,10,9,0.88)_100%)]" />
    </div>
  );
}

export function SectionParallaxOrbs() {
  return null;
}
