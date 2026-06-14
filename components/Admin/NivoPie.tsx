"use client";

import React from "react";
import { ResponsivePie } from "@nivo/pie";

export interface PieSegment {
  label: string;
  value: number;
  color: string;
}

export default function NivoPie({
  segments,
  total,
  centerLabel = "Total",
}: {
  segments: PieSegment[];
  total: number;
  centerLabel?: string;
}) {
  const data = segments
    .filter((s) => s.value > 0)
    .map((s) => ({ id: s.label, label: s.label, value: s.value, color: s.color }));

  const Pie = ResponsivePie as any;

  // Custom layer: total in the donut hole.
  const CenterText = ({ centerX, centerY }: any) => (
    <>
      <text
        x={centerX}
        y={centerY - 9}
        textAnchor="middle"
        dominantBaseline="central"
        style={{ fontSize: 12, fill: "#9a9ab0" }}
      >
        {centerLabel}
      </text>
      <text
        x={centerX}
        y={centerY + 13}
        textAnchor="middle"
        dominantBaseline="central"
        style={{ fontSize: 28, fontWeight: 800, fill: "#211a4d" }}
      >
        {total.toLocaleString()}
      </text>
    </>
  );

  return (
    <div style={{ width: 210, height: 210 }}>
      <Pie
        data={data}
        colors={{ datum: "data.color" }}
        margin={{ top: 6, right: 6, bottom: 6, left: 6 }}
        innerRadius={0.62}
        padAngle={1.5}
        cornerRadius={4}
        borderWidth={0}
        activeOuterRadiusOffset={5}
        enableArcLabels={false}
        enableArcLinkLabels={false}
        layers={["arcs", CenterText]}
      />
    </div>
  );
}
