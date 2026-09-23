import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Favicon: a 3×3 field of dust with one point of signal. */
export default function Icon() {
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
          gap: 4,
          padding: 6,
          background: "#0c0b10",
          borderRadius: "22%",
        }}
      >
        {dots.map((i) => (
          <div
            key={i}
            style={{ width: 4, height: 4, borderRadius: 4, background: i === 4 ? "#f2b64a" : "#6f6a73" }}
          />
        ))}
      </div>
    ),
    { ...size }
  );
}
