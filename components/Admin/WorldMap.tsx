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
}

export default function WorldMap({ data }: { data: CountryDatum[] }) {
  const byName: Record<string, number> = {};
  let max = 1;
  for (const d of data) {
    if (!d.name || d.name === "Unknown") continue;
    const key = ALIASES[d.name] || d.name;
    byName[key] = (byName[key] || 0) + d.views;
    if (byName[key] > max) max = byName[key];
  }

  const color = (v: number) => {
    if (!v) return "#eef0f6";
    const t = Math.min(1, v / max);
    const lerp = (a: number, b: number) => Math.round(a + (b - a) * t);
    // light lavender -> brand purple
    return `rgb(${lerp(221, 124)}, ${lerp(214, 108)}, ${lerp(243, 240)})`;
  };

  return (
    <ComposableMap
      projectionConfig={{ scale: 140 }}
      width={800}
      height={400}
      style={{ width: "100%", height: "auto" }}
    >
      <Geographies geography={GEO_URL}>
        {({ geographies }: { geographies: any[] }) =>
          geographies.map((geo: any) => {
            const name = geo.properties.name as string;
            const v = byName[name] || 0;
            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={color(v)}
                stroke="#ffffff"
                strokeWidth={0.4}
                style={{
                  default: { outline: "none" },
                  hover: { outline: "none", fill: "#a78bfa" },
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
