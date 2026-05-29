import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "HorizonRelevance — AI + Cloud + DevSecOps Platform";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  const geist = await readFile(
    join(
      process.cwd(),
      "node_modules/next/dist/compiled/@vercel/og/Geist-Regular.ttf"
    )
  );

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
          background: "linear-gradient(135deg, #0d0520 0%, #080318 60%, #050210 100%)",
          fontFamily: "Geist",
          position: "relative",
        }}
      >
        {/* Subtle violet bloom */}
        <div
          style={{
            position: "absolute",
            left: "-10%",
            top: "-10%",
            width: "60%",
            height: "70%",
            background: "radial-gradient(ellipse, rgba(139,92,246,0.22) 0%, transparent 70%)",
            borderRadius: "50%",
            filter: "blur(80px)",
          }}
        />
        {/* Subtle cyan bloom */}
        <div
          style={{
            position: "absolute",
            right: "-8%",
            bottom: "-8%",
            width: "50%",
            height: "60%",
            background: "radial-gradient(ellipse, rgba(6,182,212,0.14) 0%, transparent 70%)",
            borderRadius: "50%",
            filter: "blur(80px)",
          }}
        />

        {/* Logo tile */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: 36,
          }}
        >
          {/* Arc (dome) */}
          <div
            style={{
              width: 88,
              height: 44,
              background: "#8B5CF6",
              borderRadius: "44px 44px 0 0",
              marginBottom: 6,
            }}
          />
          {/* Bar */}
          <div
            style={{
              width: 120,
              height: 10,
              background: "rgba(255,255,255,0.88)",
              borderRadius: 5,
            }}
          />
        </div>

        {/* Wordmark */}
        <div
          style={{
            display: "flex",
            fontSize: 64,
            fontWeight: 700,
            letterSpacing: "-1px",
            marginBottom: 16,
          }}
        >
          <span style={{ color: "rgba(255,255,255,0.95)" }}>Horizon</span>
          <span style={{ color: "#8B5CF6" }}>Relevance</span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 22,
            color: "rgba(255,255,255,0.38)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          AI · Cloud · DevSecOps
        </div>

        {/* Bottom rule */}
        <div
          style={{
            position: "absolute",
            bottom: 48,
            width: 180,
            height: 1,
            background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.5), transparent)",
          }}
        />
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Geist", data: geist, style: "normal", weight: 400 }],
    }
  );
}
