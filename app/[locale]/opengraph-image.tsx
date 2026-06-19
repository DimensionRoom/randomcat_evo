import { ImageResponse } from "next/og";
import { HOME_META, type Locale } from "@/lib/seo";

export const runtime = "edge";
export const alt = "Think Tool — online brainstorming tools";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage({
  params,
}: {
  params: { locale: string };
}) {
  const home = HOME_META[(params.locale as Locale)] ?? HOME_META.en;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "90px",
          background: "linear-gradient(135deg, #5b2cbc 0%, #821dbf 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 34,
            letterSpacing: 6,
            textTransform: "uppercase",
            opacity: 0.85,
          }}
        >
          Think Tool
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 70,
            fontWeight: 800,
            lineHeight: 1.1,
            maxWidth: 900,
          }}
        >
          {home.title.replace("Think Tool — ", "")}
        </div>
        <div
          style={{
            marginTop: 36,
            fontSize: 30,
            opacity: 0.9,
            maxWidth: 920,
          }}
        >
          www.think-tool.com
        </div>
      </div>
    ),
    { ...size }
  );
}
