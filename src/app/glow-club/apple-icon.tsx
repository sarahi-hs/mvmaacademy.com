import { ImageResponse } from "next/og";

// Ícono grande para "Add to Home Screen" en iOS (180×180 = tamaño oficial de Apple)
export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(180deg, #722F37 0%, #3D1A1F 100%)",
          color: "#F4D4D4",
        }}
      >
        <div style={{ fontSize: 90, lineHeight: 1 }}>✨</div>
        <div
          style={{
            marginTop: 8,
            fontSize: 22,
            fontWeight: 500,
            letterSpacing: 1,
          }}
        >
          Glow Club
        </div>
      </div>
    ),
    size
  );
}
