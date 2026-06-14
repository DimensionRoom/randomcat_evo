"use client";

import React from "react";
import { ResponsiveLine } from "@nivo/line";

export interface LinePoint {
  label: string;
  value: number;
}

export default function NivoLine({ points }: { points: LinePoint[] }) {
  if (points.length === 0) {
    return <p style={{ color: "#888", fontSize: 14 }}>No data yet.</p>;
  }

  const data = [
    {
      id: "Page views",
      data: points.map((p) => ({ x: p.label, y: p.value })),
    },
  ];

  const Line = ResponsiveLine as any;

  return (
    <div style={{ height: 280 }}>
      <Line
        data={data}
        margin={{ top: 16, right: 24, bottom: 40, left: 40 }}
        xScale={{ type: "point" }}
        yScale={{ type: "linear", min: 0, max: "auto" }}
        curve="monotoneX"
        colors={["#7c6cf0"]}
        lineWidth={2.5}
        enableArea
        areaOpacity={0.12}
        enablePoints
        pointSize={8}
        pointColor="#ffffff"
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        enableGridX={false}
        axisBottom={{ tickSize: 0, tickPadding: 10 }}
        axisLeft={{ tickSize: 0, tickPadding: 8, tickValues: 5 }}
        useMesh
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
