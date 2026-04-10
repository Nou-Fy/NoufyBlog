import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ width: string; height: string }> },
) {
  const { width: w, height: h } = await context.params;
  const width = clamp(Number(w) || 400, 50, 1600);
  const height = clamp(Number(h) || 320, 50, 1200);

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
      <rect width="100%" height="100%" fill="#f7f7f7"/>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#c0c0c0"
        font-family="system-ui, Arial, sans-serif" font-size="${Math.round(
          Math.min(width, height) / 6,
        )}">
        ${width}×${height}
      </text>
    </svg>
  `.trim();

  return new NextResponse(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
