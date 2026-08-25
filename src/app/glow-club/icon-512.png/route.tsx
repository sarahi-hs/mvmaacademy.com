import { ImageResponse } from "next/og";

// Ícono grande (512×512) para Android "Add to Home Screen" y stores
export const runtime = "edge";

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 512,
          height: 512,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(180deg, #722F37 0%, #3D1A1F 100%)",
          color: "#F4D4D4",
        }}
      >
        <div style={{ fontSize: 260, lineHeight: 1 }}>✨</div>
        <div
          style={{
            marginTop: 20,
            fontSize: 60,
            fontWeight: 500,
            letterSpacing: 3,
          }}
        >
          Glow Club
        </div>
      </div>
    ),
    { width: 512, height: 512 }
  );
}
