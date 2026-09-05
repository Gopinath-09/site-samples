import { ImageResponse } from "next/og";
import { company } from "@/lib/site";

/**
 * The card every shared COBRR link renders as. Built with `ImageResponse`
 * rather than a static file so it always carries the current tagline, and so
 * per-route variants can be added later by dropping the same file into a
 * segment. Satori supports flexbox only, hence the explicit `display: flex`.
 */
export const alt = `${company.legalName} — ${company.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#08080a";
const BRAND = "#c9962f";
const LINE = "rgba(255,255,255,0.10)";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: INK,
          backgroundImage: `radial-gradient(110% 85% at 72% 0%, #1c1c21 0%, #0d0d0f 45%, ${INK} 100%)`,
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        {/* Eyebrow */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 10, height: 10, borderRadius: 999, background: BRAND }} />
          <div
            style={{
              display: "flex",
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.65)",
              fontWeight: 600,
            }}
          >
            Enterprise Software Engineering
          </div>
        </div>

        {/* Wordmark + tagline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 128,
              fontWeight: 700,
              letterSpacing: -4,
              color: "#ffffff",
              lineHeight: 1,
            }}
          >
            {company.name}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 24,
              fontSize: 34,
              lineHeight: 1.3,
              color: "rgba(255,255,255,0.72)",
              maxWidth: 900,
            }}
          >
            {company.tagline}
          </div>
        </div>

        {/* Footer rule */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: `1px solid ${LINE}`,
            paddingTop: 28,
            fontSize: 24,
            color: "rgba(255,255,255,0.55)",
          }}
        >
          <div style={{ display: "flex" }}>cobrr.tech</div>
          <div style={{ display: "flex" }}>{company.location}</div>
        </div>
      </div>
    ),
    size,
  );
}
