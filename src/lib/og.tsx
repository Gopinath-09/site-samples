import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { brand, dark } from "./tokens";
import { company } from "./site";

/**
 * Shared Open Graph image renderer (1200×630). Used by app/opengraph-image.tsx
 * and the per-route files under dynamic segments.
 *
 * Satori (next/og) supports only flexbox and a CSS subset — every element with
 * more than one child needs `display: flex`. Colours come from tokens.ts
 * because CSS variables are not available here.
 */

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

interface OgProps {
  eyebrow: string;
  title: string;
  description?: string;
}

async function loadMark(): Promise<string | null> {
  try {
    const buf = await readFile(join(process.cwd(), "public/brand/logo-mark-256.png"));
    return `data:image/png;base64,${buf.toString("base64")}`;
  } catch {
    return null;
  }
}

/**
 * Optional brand font. Drop `Geist-SemiBold.ttf` into /public/fonts to use
 * it; otherwise next/og falls back to its bundled Geist Regular.
 */
async function loadFont(): Promise<ArrayBuffer | null> {
  try {
    const buf = await readFile(join(process.cwd(), "public/fonts/Geist-SemiBold.ttf"));
    return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer;
  } catch {
    return null;
  }
}

/** Truncate at a word boundary with an ellipsis. */
function clamp(text: string, max: number) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  const atWord = cut.lastIndexOf(" ");
  return `${(atWord > max * 0.6 ? cut.slice(0, atWord) : cut).trimEnd()}…`;
}

export async function renderOgImage({ eyebrow, title, description }: OgProps) {
  const [mark, font] = await Promise.all([loadMark(), loadFont()]);
  // Social cards always use the brand's matte-black surface — they have no
  // theme of their own, and dark reads better in most feeds.
  const hue = brand.onDark;
  const grid = "rgba(255,255,255,0.06)";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px 64px",
          background: dark.paper,
          color: "#ffffff",
          fontFamily: "Geist, sans-serif",
          position: "relative",
        }}
      >
        {/* Engineering grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `linear-gradient(to right, ${grid} 1px, transparent 1px), linear-gradient(to bottom, ${grid} 1px, transparent 1px)`,
            backgroundSize: "56px 56px",
          }}
        />
        {/* Accent wash */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(circle at 88% 12%, ${hue}66 0%, transparent 45%)`,
          }}
        />
        {/* Concentric arcs */}
        <svg
          width="560"
          height="560"
          viewBox="0 0 400 400"
          style={{ position: "absolute", right: -140, top: 35, opacity: 0.35 }}
        >
          <circle cx="200" cy="200" r="60" fill="none" stroke={hue} strokeWidth="1" />
          <circle cx="200" cy="200" r="110" fill="none" stroke={hue} strokeWidth="1" strokeDasharray="3 8" />
          <circle cx="200" cy="200" r="160" fill="none" stroke={hue} strokeWidth="1" />
          <circle cx="200" cy="200" r="195" fill="none" stroke={hue} strokeWidth="1.5" strokeDasharray="3 8" />
          <circle cx="200" cy="200" r="10" fill={hue} />
        </svg>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {mark && (
            <div
              style={{
                display: "flex",
                width: 64,
                height: 64,
                borderRadius: 16,
                background: "#ffffff",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={mark} width={52} height={52} alt="" />
            </div>
          )}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: 4 }}>COBRR</div>
            <div style={{ fontSize: 16, color: dark.muted, letterSpacing: 2 }}>
              TECH LABS
            </div>
          </div>
        </div>

        {/* Body */}
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 880 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 20,
              fontWeight: 600,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: hue,
            }}
          >
            <div style={{ width: 28, height: 1, background: "currentColor", opacity: 0.6 }} />
            {clamp(eyebrow, 48)}
          </div>
          <div
            style={{
              marginTop: 18,
              fontSize: title.length > 48 ? 52 : 64,
              fontWeight: 600,
              lineHeight: 1.08,
              letterSpacing: -1.5,
            }}
          >
            {clamp(title, 90)}
          </div>
          {description && (
            <div
              style={{
                marginTop: 22,
                fontSize: 26,
                lineHeight: 1.4,
                color: dark.muted,
                maxWidth: 820,
              }}
            >
              {clamp(description, 150)}
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 20,
            color: dark.muted,
          }}
        >
          <div style={{ display: "flex" }}>{company.siteUrl.replace(/^https?:\/\//, "")}</div>
          <div style={{ display: "flex", width: 160, height: 4, borderRadius: 2, background: hue }} />
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: font
        ? [{ name: "Geist", data: font, weight: 600, style: "normal" }]
        : undefined,
    },
  );
}
