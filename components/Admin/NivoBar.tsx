"use client";

import React from "react";
import { ResponsiveBar } from "@nivo/bar";

export interface BarPoint {
  label: string;
  value: number;
}

export default function NivoBar({ points }: { points: BarPoint[] }) {
  if (points.length === 0) {
    return <p style={{ color: "#888", fontSize: 14 }}>No data yet.</p>;
  }

  const data = points.map((p) => ({ day: p.label, users: p.value }));
  const Bar = ResponsiveBar as any;

  return (
    <div style={{ height: 280 }}>
      <Bar
        data={data}
        keys={["users"]}
        indexBy="day"
        margin={{ top: 16, right: 16, bottom: 40, left: 40 }}
        padding={0.35}
        colors={["#7c6cf0"]}
        borderRadius={5}
        enableLabel={false}
        axisLeft={{ tickSize: 0, tickPadding: 8, tickValues: 5 }}
        axisBottom={{ tickSize: 0, tickPadding: 10 }}
        enableGridX={false}
        theme={{
          text: { fill: "#9aa" },
          axis: { ticks: { text: { fill: "#9aa", fontSize: 11 } } },
          grid: { line: { stroke: "#eee", strokeWidth: 1 } },
          tooltip: { container: { fontSize: 12 } },
        }}
      />
    </div>
  );
}
