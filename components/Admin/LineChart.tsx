"use client";

import React, { useState } from "react";

export interface LinePoint {
  label: string;
  value: number;
}

const W = 580;
const H = 260;
const PAD = { l: 40, r: 16, t: 16, b: 30 };

export default function LineChart({ points }: { points: LinePoint[] }) {
  const [hover, setHover] = useState<number | null>(null);

  if (points.length === 0) {
    return <p style={{ color: "#888", fontSize: 14 }}>No data yet.</p>;
  }

  const innerW = W - PAD.l - PAD.r;
  const innerH = H - PAD.t - PAD.b;
  const max = Math.max(1, ...points.map((p) => p.value));
  const stepX = points.length > 1 ? innerW / (points.length - 1) : 0;
  const x = (i: number) => PAD.l + (points.length > 1 ? i * stepX : innerW / 2);
  const y = (v: number) => PAD.t + innerH - (v / max) * innerH;

  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${x(i)},${y(p.value)}`)
    .join(" ");
  const areaPath = `${linePath} L${x(points.length - 1)},${PAD.t + innerH} L${x(
    0
  )},${PAD.t + innerH} Z`;

  const ticks = 4;
  const yTicks = Array.from({ length: ticks + 1 }, (_, i) =>
    Math.round((max / ticks) * i)
  );

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img">
      <defs>
        <linearGradient id="lcArea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c6cf0" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#7c6cf0" stopOpacity="0" />
        </linearGradient>
      </defs>

      {yTicks.map((t, i) => {
        const yy = y(t);
        return (
          <g key={i}>
            <line
              x1={PAD.l}
              x2={W - PAD.r}
              y1={yy}
              y2={yy}
              stroke="#eee"
              strokeWidth={1}
            />
            <text x={PAD.l - 8} y={yy + 4} fontSize="11" fill="#9aa" textAnchor="end">
              {t}
            </text>
          </g>
        );
      })}

      <path d={areaPath} fill="url(#lcArea)" />
      <path d={linePath} fill="none" stroke="#7c6cf0" strokeWidth={2.5} />

      {points.map((p, i) => (
        <g key={i}>
          <text
            x={x(i)}
            y={H - 8}
            fontSize="11"
            fill="#9aa"
            textAnchor="middle"
          >
            {p.label}
          </text>
          <circle
            cx={x(i)}
            cy={y(p.value)}
            r={hover === i ? 6 : 3.5}
            fill="#fff"
            stroke="#7c6cf0"
            strokeWidth={2}
          />
          <rect
            x={x(i) - stepX / 2}
            y={PAD.t}
            width={stepX || innerW}
            height={innerH}
            fill="transparent"
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
          />
        </g>
      ))}

      {hover !== null && (
        <g>
          <rect
            x={Math.min(x(hover) + 8, W - 130)}
            y={y(points[hover].value) - 38}
            width={120}
            height={34}
            rx={6}
            fill="#fff"
            stroke="#eee"
          />
          <text
            x={Math.min(x(hover) + 16, W - 122)}
            y={y(points[hover].value) - 22}
            fontSize="11"
            fill="#555"
          >
            {points[hover].label}
          </text>
          <text
            x={Math.min(x(hover) + 16, W - 122)}
            y={y(points[hover].value) - 9}
            fontSize="12"
            fontWeight="700"
            fill="#2e1065"
          >
            {points[hover].value} views
          </text>
        </g>
      )}
    </svg>
  );
}
