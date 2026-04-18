import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px",
          background:
            "radial-gradient(circle at 20% 15%, rgba(99,102,241,0.35) 0%, rgba(2,6,23,1) 55%), linear-gradient(140deg, #020617 0%, #0f172a 100%)",
          color: "#e2e8f0",
          fontFamily: "Inter, Arial, sans-serif",
        }}
      >
        <div style={{ fontSize: 24, letterSpacing: 2, textTransform: "uppercase", color: "#a5b4fc" }}>Nexus Growth Hub</div>
        <div style={{ maxWidth: 900, display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.1 }}>
            Advanced Systems for Global Scale
          </div>
          <div style={{ marginTop: 22, fontSize: 28, lineHeight: 1.35, color: "#cbd5e1" }}>
            Infrastructure Architecture | AI Automation | B2B Growth Engines
          </div>
        </div>
        <div style={{ display: "flex", gap: 14, fontSize: 20, color: "#cbd5e1" }}>
          <span>1,482 Active Members</span>
          <span>|</span>
          <span>$12M+ Partner Revenue</span>
          <span>|</span>
          <span>99.9% Uptime</span>
        </div>
      </div>
    ),
    size,
  );
}
