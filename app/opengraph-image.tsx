import { ImageResponse } from "next/og";
export const alt =
  "Ali Asghar — Software Engineer. Thoughtful systems. Real-world software.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        background: "#f8fafc",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "75px 85px",
        color: "#142238",
        fontFamily: "sans-serif",
        borderBottom: "12px solid #245be0",
      }}
    >
      <div style={{ display: "flex", fontSize: 28, letterSpacing: -1 }}>
        ali asghar<span style={{ color: "#245be0" }}>.</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: 70,
          fontSize: 78,
          letterSpacing: -4,
          lineHeight: 1.1,
        }}
      >
        <span>Ideas, meet</span>
        <span>
          engineering<span style={{ color: "#245be0" }}>.</span>
        </span>
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 45,
          fontSize: 24,
          color: "#526176",
        }}
      >
        Software Engineer · Karachi, Pakistan
      </div>
      <div
        style={{
          display: "flex",
          position: "absolute",
          right: 85,
          bottom: 64,
          fontSize: 22,
          color: "#245be0",
        }}
      >
        asghar.me
      </div>
    </div>,
    size,
  );
}
