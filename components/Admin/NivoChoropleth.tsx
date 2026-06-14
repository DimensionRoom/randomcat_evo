"use client";

import React, { useEffect, useRef, useState } from "react";
import { ResponsiveChoropleth } from "@nivo/geo";
import worldData from "./world_countries.json";
import { nameToAlpha3 } from "@/lib/countryCodes";

const FEATURES = (worldData as any).features as any[];

export interface CountryDatum {
  name: string;
  value: number;
}

export default function NivoChoropleth({ data }: { data: CountryDatum[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(720);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width;
      if (w) setWidth(w);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  let max = 1;
  const nivoData: { id: string; value: number }[] = [];
  for (const d of data) {
    if (!d.name || d.name === "Unknown" || d.name === "unknown") continue;
    const id = nameToAlpha3(d.name); // matches GeoJSON feature.id (alpha-3)
    if (!id) continue;
    nivoData.push({ id, value: d.value });
    if (d.value > max) max = d.value;
  }

  // Mercator full-world width ≈ 2π·scale, so scale ≈ width / 6.3 keeps the whole
  // map inside the container at any size (mobile/tablet/desktop).
  const scale = Math.max(48, width / 6.3);

  const Choropleth = ResponsiveChoropleth as any;
  return (
    <div ref={ref} style={{ width: "100%", height: "100%" }}>
      <Choropleth
        data={nivoData}
        features={FEATURES}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        colors={[
          "#ede9fe",
          "#c4b5fd",
          "#a78bfa",
          "#8b5cf6",
          "#7c3aed",
          "#6d28d9",
        ]}
        domain={[0, max]}
        unknownColor="#eef0f6"
        label="properties.name"
        valueFormat=".0f"
        projectionType="mercator"
        projectionScale={scale}
        projectionTranslation={[0.5, 0.72]}
        projectionRotation={[0, 0, 0]}
        borderWidth={0.4}
        borderColor="#ffffff"
        legends={[
          {
            anchor: "bottom-left",
            direction: "column",
            justify: true,
            translateX: 8,
            translateY: -8,
            itemsSpacing: 0,
            itemWidth: 94,
            itemHeight: 16,
            itemDirection: "left-to-right",
            itemTextColor: "#666",
            itemOpacity: 0.9,
            symbolSize: 14,
          },
        ]}
      />
    </div>
  );
}
