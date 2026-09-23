import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Favicon: a 3×3 field of dust with one point of signal. */
export default function AppleIcon() {
  const dots = Array.from({ length: 9 }, (_, i) => i);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexWrap: "wrap",
          alignContent: "center",
          justifyContent: "center",
          gap: 22,
          padding: 34,
          background: "#0c0b10",
          borderRadius: 0,
        }}
      >
        {dots.map((i) => (
          <div
            key={i}
            style={{ width: 22, height: 22, borderRadius: 22, background: i === 4 ? "#f2b64a" : "#6f6a73" }}
          />
        ))}
      </div>
    ),
    { ...size }
  );
}
