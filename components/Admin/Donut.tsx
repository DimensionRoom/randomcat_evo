import React from "react";

export interface DonutSegment {
  label: string;
  value: number;
  color: string;
}

/** Static SVG donut chart with a centered total. Server-renderable. */
export default function Donut({
  segments,
  total,
  centerLabel = "Total",
}: {
  segments: DonutSegment[];
  total: number;
  centerLabel?: string;
}) {
  const size = 200;
  const stroke = 26;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const sum = segments.reduce((a, s) => a + s.value, 0) || 1;

  let offset = 0;
  const arcs = segments.map((s) => {
    const frac = s.value / sum;
    const dash = frac * c;
    const arc = (
      <circle
        key={s.label}
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={s.color}
        strokeWidth={stroke}
        strokeDasharray={`${dash} ${c - dash}`}
        strokeDashoffset={-offset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
    );
    offset += dash;
    return arc;
  });

  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="#f0eef8"
        strokeWidth={stroke}
      />
      {arcs}
      <text
        x={size / 2}
        y={size / 2 - 4}
        textAnchor="middle"
        fontSize="13"
        fill="#9aa"
      >
        {centerLabel}
      </text>
      <text
        x={size / 2}
        y={size / 2 + 18}
        textAnchor="middle"
        fontSize="26"
        fontWeight="800"
        fill="#2e1065"
      >
        {total.toLocaleString()}
      </text>
    </svg>
  );
}
