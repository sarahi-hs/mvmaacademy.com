import { ImageResponse } from "next/og";

// Ícono para pestañas del navegador y accesos genéricos (32×32)
export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

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
          background: "#722F37",
          borderRadius: 8,
          color: "#F4D4D4",
          fontSize: 22,
        }}
      >
        ✨
      </div>
    ),
    size
  );
}
