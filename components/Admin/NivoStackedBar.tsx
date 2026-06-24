"use client";

import React from "react";
import { ResponsiveBar } from "@nivo/bar";

export type StackedDatum = Record<string, number | string>;

export default function NivoStackedBar({
  data,
  keys,
  colors,
}: {
  data: StackedDatum[];
  keys: string[];
  colors: string[];
}) {
  if (data.length === 0 || keys.length === 0) {
    return <p style={{ color: "#888", fontSize: 14 }}>No data yet.</p>;
  }

  const colorMap: Record<string, string> = {};
  keys.forEach((k, i) => {
    colorMap[k] = colors[i % colors.length];
  });

  const Bar = ResponsiveBar as any;

  return (
    <div style={{ height: 280 }}>
      <Bar
        data={data}
        keys={keys}
        indexBy="day"
        groupMode="stacked"
        margin={{ top: 16, right: 16, bottom: 40, left: 40 }}
        padding={0.35}
        colors={({ id }: { id: string }) => colorMap[id] ?? "#cbd5e1"}
        borderRadius={2}
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
