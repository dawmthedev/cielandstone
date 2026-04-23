import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Ciel & Stone — Residential Design-Build Studio";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #1a1512 0%, #2a1f18 100%)",
          color: "#f7f1e8",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "16px",
            fontSize: "28px",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            fontFamily: "sans-serif",
          }}
        >
          <span style={{ fontWeight: 600 }}>Ciel</span>
          <span style={{ opacity: 0.6 }}>&</span>
          <span style={{ fontWeight: 600 }}>Stone</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div
            style={{
              fontSize: "80px",
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
              maxWidth: "900px",
              display: "flex",
            }}
          >
            Residential design-build.
            <br />
            Planned before it&apos;s built.
          </div>
          <div
            style={{
              fontSize: "22px",
              opacity: 0.75,
              letterSpacing: "-0.01em",
              display: "flex",
            }}
          >
            Los Angeles · Pacific Northwest — kitchens, pools, additions, whole-home renovations.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(247, 241, 232, 0.15)",
            paddingTop: "28px",
            fontSize: "18px",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            fontFamily: "sans-serif",
            opacity: 0.6,
          }}
        >
          <span>Design-Build · Preconstruction · Feasibility</span>
          <span>cielandstone.com</span>
        </div>
      </div>
    ),
    size,
  );
}
