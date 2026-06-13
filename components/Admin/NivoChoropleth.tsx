"use client";

import React from "react";
import { ResponsiveChoropleth } from "@nivo/geo";
import worldData from "./world_countries.json";

const FEATURES = (worldData as any).features as any[];

// Our stored Intl.DisplayNames names -> the GeoJSON feature names.
const ALIASES: Record<string, string> = {
  "United States": "United States of America",
  Czechia: "Czech Republic",
  "Myanmar (Burma)": "Myanmar",
  Tanzania: "United Republic of Tanzania",
  "Congo - Kinshasa": "Democratic Republic of the Congo",
  "Congo - Brazzaville": "Republic of the Congo",
};

const nameToId: Record<string, string> = {};
for (const f of FEATURES) {
  if (f?.properties?.name && f?.id) nameToId[f.properties.name] = f.id;
}

export interface CountryDatum {
  name: string;
  value: number;
}

export default function NivoChoropleth({ data }: { data: CountryDatum[] }) {
  let max = 1;
  const nivoData: { id: string; value: number }[] = [];
  for (const d of data) {
    if (!d.name || d.name === "Unknown" || d.name === "unknown") continue;
    const id = nameToId[ALIASES[d.name] || d.name] || nameToId[d.name];
    if (!id) continue;
    nivoData.push({ id, value: d.value });
    if (d.value > max) max = d.value;
  }

  const Choropleth = ResponsiveChoropleth as any;
  return (
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
      projectionScale={95}
      projectionTranslation={[0.5, 0.62]}
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
  );
}
