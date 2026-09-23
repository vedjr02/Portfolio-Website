import type { Metadata } from "next";
import { PosterCanvas } from "./PosterCanvas";

export const metadata: Metadata = { title: "Poster renderer", robots: { index: false, follow: false } };

/** Tooling page: renders one state as a still frame for scripts/render-posters.mjs. */
export default function PosterPage() {
  return (
    <>
      <style>{`header, footer, .skip-link { display: none !important } body { margin: 0; background: #0c0b10 }`}</style>
      <PosterCanvas />
    </>
  );
}
