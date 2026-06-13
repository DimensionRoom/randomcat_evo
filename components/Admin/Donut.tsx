import React from "react";

export interface DonutSegment {
  label: string;
  value: number;
  color: string;
}

function polar(cx: number, cy: number, r: number, angleDeg: number) {
  const a = ((angleDeg - 90) * Math.PI) / 180;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)] as const;
}

function arcPath(
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number
) {
  const [sx, sy] = polar(cx, cy, r, startAngle);
  const [ex, ey] = polar(cx, cy, r, endAngle);
  const large = endAngle - startAngle > 180 ? 1 : 0;
  return `M ${sx} ${sy} A ${r} ${r} 0 ${large} 1 ${ex} ${ey}`;
}

/** Polished SVG donut with rounded segment ends and a centered total. */
export default function Donut({
  segments,
  total,
  centerLabel = "Total",
}: {
  segments: DonutSegment[];
  total: number;
  centerLabel?: string;
}) {
  const size = 220;
  const stroke = 24;
  const cx = size / 2;
  const cy = size / 2;
  const r = (size - stroke) / 2;
  const sum = segments.reduce((a, s) => a + s.value, 0) || 1;
  const active = segments.filter((s) => s.value > 0);
  const gap = active.length > 1 ? 3 : 0; // degrees between segments

  let angle = 0;
  const arcs = active.map((s) => {
    const sweep = (s.value / sum) * 360;
    const start = angle + gap / 2;
    const end = angle + sweep - gap / 2;
    angle += sweep;
    if (end <= start) return null;
    return (
      <path
        key={s.label}
        d={arcPath(cx, cy, r, start, end)}
        fill="none"
        stroke={s.color}
        strokeWidth={stroke}
        strokeLinecap="round"
      />
    );
  });

  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke="#f1eefb"
        strokeWidth={stroke}
      />
      {arcs}
      <text
        x={cx}
        y={cy - 6}
        textAnchor="middle"
        fontSize="12"
        fill="#9a9ab0"
      >
        {centerLabel}
      </text>
      <text
        x={cx}
        y={cy + 18}
        textAnchor="middle"
        fontSize="30"
        fontWeight="800"
        fill="#211a4d"
      >
        {total.toLocaleString()}
      </text>
    </svg>
  );
}
