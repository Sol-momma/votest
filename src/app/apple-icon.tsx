import { ImageResponse } from "next/og";

// Apple Touch Icon — iOS のホーム画面追加時に使われる180x180のPNG
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#2E75CC",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      {/* Calendar body */}
      <div
        style={{
          position: "absolute",
          width: 116,
          height: 92,
          left: 32,
          top: 56,
          background: "#FFFFFF",
          borderRadius: 14,
        }}
      />
      {/* Header band */}
      <div
        style={{
          position: "absolute",
          width: 116,
          height: 22,
          left: 32,
          top: 56,
          background: "#D9E7F4",
          borderTopLeftRadius: 14,
          borderTopRightRadius: 14,
        }}
      />
      {/* Top binders */}
      <div
        style={{
          position: "absolute",
          width: 14,
          height: 36,
          left: 56,
          top: 34,
          background: "#FFFFFF",
          borderRadius: 7,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 14,
          height: 36,
          left: 110,
          top: 34,
          background: "#FFFFFF",
          borderRadius: 7,
        }}
      />
      {/* O vote mark in center */}
      <div
        style={{
          position: "absolute",
          width: 44,
          height: 44,
          left: 68,
          top: 90,
          borderRadius: 22,
          border: "9px solid #2E75CC",
        }}
      />
    </div>,
    { ...size },
  );
}
