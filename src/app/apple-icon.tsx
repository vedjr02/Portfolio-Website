import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Apple touch icon - same VA mark, larger */
export default function AppleIcon() {
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
          borderRadius: 40,
        }}
      >
        <span
          style={{
            color: "#ffffff",
            fontSize: 78,
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
