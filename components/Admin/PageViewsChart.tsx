"use client";

import React, { useMemo, useState } from "react";
import { ResponsiveLine } from "@nivo/line";
import ChartToolbar, { dayText, rangeTicks, type Range } from "./ChartToolbar";
import styles from "./PageViewsChart.module.scss";

export interface DayViews {
  /** The day, "YYYY-MM-DD" (UTC, as usage_daily buckets it). */
  date: string;
  /** Running total of page views at the end of this day (as usage_daily serves it). */
  total: number;
}

const COLOR = "#7c3aed";

/**
 * "Page views over time". The data is a running total, so the summary is the
 * growth over the chosen range: from the total just before the range began
 * (or its first day, when the loaded data does not go back further) to the
 * latest total. The tooltip shows each day's total and how much it added.
 * `days` runs oldest → newest.
 */
export default function PageViewsChart({ days }: { days: DayViews[] }) {
  const [range, setRange] = useState<Range>(30);

  const view = useMemo(() => {
    const start = Math.max(0, days.length - range);
    const shown = days.slice(start);
    // The total the range grew from: the day before it, if that was loaded.
    const base = start > 0 ? days[start - 1] : shown[0];
    const latest = shown[shown.length - 1];
    const added = latest && base ? latest.total - base.total : 0;
    const growth = base && base.total > 0 ? (added / base.total) * 100 : null;
    // What each day added on top of the day before (first loaded day: unknown).
    const addedOn = new Map(
      shown.map((d, i) => {
        const prev = days[start + i - 1];
        return [d.date, prev ? d.total - prev.total : null] as const;
      })
    );
    return {
      shown,
      added,
      growth,
      since: start > 0 || !base ? null : dayText(base.date, "full", range),
      addedOn,
      ticks: rangeTicks(shown.map((d) => d.date), range),
    };
  }, [days, range]);

  const Line = ResponsiveLine as any;
  const growthText =
    view.growth === null
      ? "–"
      : `${view.growth >= 0 ? "+" : ""}${view.growth.toLocaleString(undefined, {
          maximumFractionDigits: view.growth !== 0 && Math.abs(view.growth) < 10 ? 1 : 0,
        })}%`;

  return (
    <div className={styles.wrap}>
      <ChartToolbar
        range={range}
        onRange={setRange}
        items={[
          {
            label: "Growth",
            value: growthText,
            note: `${view.added >= 0 ? "+" : ""}${view.added.toLocaleString()} views`,
            trend: view.growth === null ? undefined : view.growth >= 0 ? "up" : "down",
          },
        ]}
      />
      <p className={styles.compareNote}>
        {view.since ? `since ${view.since}` : `over the last ${range} days`}
      </p>

      {view.shown.length === 0 ? (
        <p className={styles.empty}>No data yet.</p>
      ) : (
        <div className={styles.chart}>
          <Line
            data={[{ id: "views", data: view.shown.map((d) => ({ x: d.date, y: d.total })) }]}
            margin={{ top: 14, right: 16, bottom: 32, left: 52 }}
            xScale={{ type: "point" }}
            // A running total sits far above zero; starting the axis near the
            // data shows the growth instead of a nearly flat line at the top.
            yScale={{ type: "linear", min: "auto", max: "auto" }}
            curve="monotoneX"
            colors={[COLOR]}
            lineWidth={2.5}
            enableArea
            areaBaselineValue={view.shown[0]?.total ?? 0}
            areaOpacity={1}
            defs={[
              {
                id: "viewsFill",
                type: "linearGradient",
                colors: [
                  { offset: 0, color: COLOR, opacity: 0.28 },
                  { offset: 100, color: COLOR, opacity: 0 },
                ],
              },
            ]}
            fill={[{ match: "*", id: "viewsFill" }]}
            enablePoints={view.shown.length <= 10}
            pointSize={7}
            pointColor="#ffffff"
            pointBorderWidth={2}
            pointBorderColor={{ from: "seriesColor" }}
            enableGridX={false}
            gridYValues={4}
            axisLeft={{ tickSize: 0, tickPadding: 8, tickValues: 4, format: ">,~d" }}
            axisBottom={{
              tickSize: 0,
              tickPadding: 10,
              tickValues: view.ticks,
              format: (iso: string) => dayText(iso, "axis", range),
            }}
            enableSlices="x"
            enableCrosshair
            crosshairType="x"
            motionConfig="gentle"
            theme={{
              text: { fill: "#8b8aa3", fontSize: 11 },
              grid: { line: { stroke: "#efedf7", strokeDasharray: "3 4" } },
              crosshair: { line: { stroke: "#c4b5fd", strokeWidth: 1, strokeOpacity: 1 } },
            }}
            sliceTooltip={({ slice }: { slice: any }) => {
              const point = slice.points[0];
              const iso = String(point?.data.x);
              const addedThatDay = view.addedOn.get(iso);
              return (
                <div className={styles.tooltip}>
                  <div className={styles.tooltipHead}>{dayText(iso, "full", range)}</div>
                  <ul>
                    <li>
                      <i style={{ background: COLOR }} />
                      <span>Total views</span>
                      <b>{Number(point?.data.y).toLocaleString()}</b>
                    </li>
                    {addedThatDay !== null && addedThatDay !== undefined && (
                      <li>
                        <i style={{ background: "transparent" }} />
                        <span>Added that day</span>
                        <b>
                          {addedThatDay >= 0 ? "+" : ""}
                          {addedThatDay.toLocaleString()}
                        </b>
                      </li>
                    )}
                  </ul>
                </div>
              );
            }}
          />
        </div>
      )}
    </div>
  );
}
