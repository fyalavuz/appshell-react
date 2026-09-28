import { ImageResponse } from "next/og";

// A plain route rather than the opengraph-image file convention: the
// convention resolves its URL against metadataBase's origin and drops the
// GitHub Pages base path, which left og:image pointing at a 404.
export const dynamic = "force-static";

const size = { width: 1200, height: 630 };

const brand = "#C2410C";
const ink = "#1c1917";
const muted = "#78716c";
const paper = "#fafaf9";

function Bar({ w, tone = "#e7e5e4" }: { w: number; tone?: string }) {
  return <div style={{ width: w, height: 12, borderRadius: 6, background: tone }} />;
}

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: paper,
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 14,
                background: brand,
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "center",
                gap: 5,
              }}
            >
              {[26, 26, 26].map((w, i) => (
                <div key={i} style={{ width: w, height: 4, borderRadius: 2, background: "#fff7ed" }} />
              ))}
            </div>
            <div style={{ fontSize: 34, fontWeight: 700, color: ink }}>AppShell</div>
          </div>
          <div
            style={{
              marginTop: 40,
              fontSize: 64,
              lineHeight: 1.05,
              fontWeight: 800,
              color: ink,
              letterSpacing: -2,
              maxWidth: 620,
            }}
          >
            The app shell your mobile web app deserves
          </div>
          <div style={{ marginTop: 28, fontSize: 28, color: muted, maxWidth: 600, lineHeight: 1.35 }}>
            Scroll-aware headers, tab bars, drawers, and safe areas for React + Tailwind v4.
          </div>
        </div>

        <div
          style={{
            width: 300,
            height: 486,
            borderRadius: 44,
            border: `10px solid ${ink}`,
            background: "#ffffff",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            alignSelf: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "34px 20px 16px",
              background: "#fbe7dc",
            }}
          >
            <div style={{ width: 16, height: 16, borderRadius: 8, background: brand }} />
            <Bar w={90} tone="#e6b9a3" />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, padding: 20, flex: 1 }}>
            <Bar w={200} />
            <Bar w={240} />
            <div style={{ height: 90, borderRadius: 14, background: "#f5f5f4" }} />
            <Bar w={170} />
            <Bar w={230} />
            <div style={{ height: 90, borderRadius: 14, background: "#f5f5f4" }} />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              padding: "16px 20px 22px",
              borderTop: "1px solid #e7e5e4",
            }}
          >
            {[brand, "#d6d3d1", "#d6d3d1", "#d6d3d1"].map((c, i) => (
              <div key={i} style={{ width: 22, height: 22, borderRadius: 11, background: c }} />
            ))}
          </div>
        </div>
      </div>
    ),
    size
  );
}
