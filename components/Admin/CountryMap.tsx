"use client";

import React, { useMemo, useState } from "react";
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps";
import { Minus, Plus, RotateCcw } from "lucide-react";
import isoCountries from "i18n-iso-countries";
import world from "world-atlas/countries-110m.json";
import { toCountryCode } from "@/lib/countryCodes";
import { MAP_POINTS } from "./mapPointCountries";
import styles from "./CountryMap.module.scss";

export interface CountryStat {
  name: string;
  flag: string;
  visitors: number;
  views: number;
  isNew: boolean;
}

type Metric = "visitors" | "views";

const STEPS = ["#ede9fe", "#d8ccfd", "#c4b5fd", "#a78bfa", "#8b5cf6", "#7c3aed", "#5b21b6"];
const NO_DATA = "#eef0f6";
const MIN_ZOOM = 1;
const MAX_ZOOM = 8;
const START = { coordinates: [12, 12] as [number, number], zoom: 1 };

// world-atlas ids are ISO 3166-1 numeric ("764"); a few disputed areas have none.
const alpha2OfFeature = (id: unknown) =>
  id ? isoCountries.numericToAlpha2(String(id)) ?? null : null;
const SHAPED = new Set(
  ((world as any).objects.countries.geometries as { id?: string }[])
    .map((g) => alpha2OfFeature(g.id))
    .filter(Boolean) as string[]
);

/**
 * Log-spaced colour step: visitor counts here range from 1 to several hundred,
 * so linear buckets would paint almost every country the palest shade.
 */
function colorFor(value: number, max: number): string {
  if (value <= 0 || max <= 0) return NO_DATA;
  const t = Math.log1p(value) / Math.log1p(max);
  return STEPS[Math.min(STEPS.length - 1, Math.floor(t * STEPS.length))];
}

/**
 * World map for "By country" (react-simple-maps): Equal Earth projection,
 * zoom and pan, a hover card per country, and a Visitors / Views switch for
 * the shading. Countries with no shape at this resolution (Singapore, Hong
 * Kong, ...) are drawn as dots at their coordinates.
 */
export default function CountryMap({ data }: { data: CountryStat[] }) {
  const [metric, setMetric] = useState<Metric>("visitors");
  const [position, setPosition] = useState(START);
  const [hover, setHover] = useState<{ stat: CountryStat; x: number; y: number } | null>(null);

  const { byCode, max, total, dots } = useMemo(() => {
    const byCode = new Map<string, CountryStat>();
    for (const s of data) {
      const code = toCountryCode(s.name);
      if (code) byCode.set(code, s);
    }
    const values = data.map((s) => s[metric]);
    const dots = [...byCode.entries()]
      .filter(([code]) => !SHAPED.has(code) && MAP_POINTS[code])
      .map(([code, stat]) => ({ code, stat, lngLat: MAP_POINTS[code] }));
    return { byCode, max: Math.max(0, ...values), total: values.reduce((a, b) => a + b, 0), dots };
  }, [data, metric]);

  const share = (v: number) => (total > 0 ? (v / total) * 100 : 0);
  const zoomBy = (factor: number) =>
    setPosition((p) => ({ ...p, zoom: Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, p.zoom * factor)) }));
  const track = (stat: CountryStat) => (e: React.MouseEvent) => {
    const box = (e.currentTarget as Element).closest(`.${styles.wrap}`)?.getBoundingClientRect();
    if (box) setHover({ stat, x: e.clientX - box.left, y: e.clientY - box.top });
  };
  // Borders stay hairline when zoomed in.
  const stroke = 0.5 / position.zoom;

  return (
    <div className={styles.wrap} onMouseLeave={() => setHover(null)}>
      <div className={styles.toolbar}>
        <div className={styles.metric} role="group" aria-label="Colour countries by">
          {(["visitors", "views"] as Metric[]).map((m) => (
            <button
              key={m}
              type="button"
              aria-pressed={metric === m}
              className={metric === m ? styles.metricActive : styles.metricButton}
              onClick={() => setMetric(m)}
            >
              {m === "visitors" ? "Visitors" : "Views"}
            </button>
          ))}
        </div>
        <div className={styles.zoom} role="group" aria-label="Zoom">
          <button type="button" onClick={() => zoomBy(1.6)} aria-label="Zoom in" disabled={position.zoom >= MAX_ZOOM}>
            <Plus size={16} />
          </button>
          <button type="button" onClick={() => zoomBy(1 / 1.6)} aria-label="Zoom out" disabled={position.zoom <= MIN_ZOOM}>
            <Minus size={16} />
          </button>
          <button type="button" onClick={() => setPosition(START)} aria-label="Reset view">
            <RotateCcw size={15} />
          </button>
        </div>
      </div>

      <div className={styles.map}>
        <ComposableMap projection="geoEqualEarth" projectionConfig={{ scale: 165 }} width={800} height={380}>
          <ZoomableGroup
            center={position.coordinates}
            zoom={position.zoom}
            minZoom={MIN_ZOOM}
            maxZoom={MAX_ZOOM}
            onMoveEnd={(p) =>
              setPosition({ coordinates: p.coordinates ?? START.coordinates, zoom: p.zoom ?? START.zoom })
            }
          >
            {/* A TopoJSON topology; the library converts it, its types only name GeoJSON. */}
            <Geographies geography={world as any}>
              {({ geographies }: { geographies: any[] }) =>
                geographies
                  // Antarctica takes a fifth of the frame and never has visitors.
                  .filter((geo) => geo.id !== "010")
                  .map((geo) => {
                    const code = alpha2OfFeature(geo.id);
                    const stat = code ? byCode.get(code) : undefined;
                    const fill = stat ? colorFor(stat[metric], max) : NO_DATA;
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={fill}
                        stroke="#ffffff"
                        strokeWidth={stroke}
                        className={styles.country}
                        data-active={stat ? true : undefined}
                        onMouseMove={stat ? track(stat) : undefined}
                        onMouseLeave={() => setHover(null)}
                      />
                    );
                  })
              }
            </Geographies>
            {dots.map(({ code, stat, lngLat }) => (
              <Marker key={code} coordinates={lngLat}>
                <circle
                  r={4 / position.zoom}
                  fill={colorFor(stat[metric], max)}
                  stroke="#5b21b6"
                  strokeWidth={1 / position.zoom}
                  className={styles.dot}
                  onMouseMove={track(stat)}
                  onMouseLeave={() => setHover(null)}
                />
              </Marker>
            ))}
          </ZoomableGroup>
        </ComposableMap>

        {hover && (
          <div
            className={styles.tooltip}
            style={{ left: hover.x, top: hover.y }}
            role="status"
          >
            <div className={styles.tooltipHead}>
              <span className={styles.flag}>{hover.stat.flag}</span>
              {hover.stat.name}
              {hover.stat.isNew && <span className={styles.newBadge}>NEW</span>}
            </div>
            <dl>
              <div>
                <dt>Visitors</dt>
                <dd>{hover.stat.visitors.toLocaleString()}</dd>
              </div>
              <div>
                <dt>Views</dt>
                <dd>{hover.stat.views.toLocaleString()}</dd>
              </div>
              <div>
                <dt>Share</dt>
                <dd>{share(hover.stat[metric]).toFixed(1)}%</dd>
              </div>
            </dl>
          </div>
        )}
      </div>

      <div className={styles.legend} aria-hidden="true">
        <span>{metric === "visitors" ? "Fewer visitors" : "Fewer views"}</span>
        <span className={styles.ramp} style={{ background: `linear-gradient(90deg, ${STEPS.join(", ")})` }} />
        <span>{max.toLocaleString()}</span>
        <span className={styles.noData}>
          <i /> no visits
        </span>
      </div>
    </div>
  );
}
