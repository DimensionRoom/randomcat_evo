"use client";

import React from "react";
import * as RSM from "react-simple-maps";

// react-simple-maps v3 ships React-17 component types that don't satisfy the
// JSX.ElementType constraint under React 18; cast to bypass the type mismatch.
const ComposableMap = RSM.ComposableMap as unknown as React.ComponentType<any>;
const Geographies = RSM.Geographies as unknown as React.ComponentType<any>;
const Geography = RSM.Geography as unknown as React.ComponentType<any>;

const GEO_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Map our Intl.DisplayNames country names to the world-atlas property names.
const ALIASES: Record<string, string> = {
  "United States": "United States of America",
  "Czechia": "Czech Republic",
  "Myanmar (Burma)": "Myanmar",
};

export interface CountryDatum {
  name: string;
  views: number;
  color?: string;
}

export default function WorldMap({ data }: { data: CountryDatum[] }) {
  // Map atlas country name -> assigned distinct color.
  const colorByName: Record<string, string> = {};
  for (const d of data) {
    if (!d.name || d.name === "Unknown" || d.name === "unknown") continue;
    if (!d.color) continue;
    const key = ALIASES[d.name] || d.name;
    colorByName[key] = d.color;
  }

  return (
    <ComposableMap
      projection="geoMercator"
      projectionConfig={{ scale: 152, center: [0, 10] }}
      width={980}
      height={540}
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      <Geographies geography={GEO_URL}>
        {({ geographies }: { geographies: any[] }) =>
          geographies.map((geo: any) => {
            const name = geo.properties.name as string;
            const fill = colorByName[name] || "#eef0f6";
            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={fill}
                stroke="#ffffff"
                strokeWidth={0.4}
                style={{
                  default: { outline: "none" },
                  hover: { outline: "none", opacity: 0.85 },
                  pressed: { outline: "none" },
                }}
              />
            );
          })
        }
      </Geographies>
    </ComposableMap>
  );
}
