import { DATA } from "@/data/resume";
import { ImageResponse } from "next/og";

export const runtime = "edge";

// Social preview image. Pass ?title= for blog posts; defaults to name + tagline.
export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title")?.slice(0, 120);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "#fafafa",
          color: "#09090b",
        }}
      >
        <div style={{ fontSize: 28, color: "#71717a" }}>
          {DATA.url.replace("https://", "")}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: title ? 64 : 88, fontWeight: 700, lineHeight: 1.1 }}>
            {title ?? DATA.name}
          </div>
          <div style={{ fontSize: 32, color: "#52525b" }}>
            {title ? DATA.name : DATA.description}
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
