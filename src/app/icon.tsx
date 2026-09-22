import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Browser tab favicon - VA mark matching the nav badge */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1d1d1f",
          borderRadius: "22%",
        }}
      >
        <span
          style={{
            color: "#ffffff",
            fontSize: 14,
            fontWeight: 800,
            letterSpacing: "-0.06em",
            fontFamily: "ui-sans-serif, system-ui, sans-serif",
            lineHeight: 1,
          }}
        >
          VA
        </span>
      </div>
    ),
    { ...size }
  );
}
