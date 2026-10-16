"use client";

import React, { useMemo, useState } from "react";
import { ResponsiveBar } from "@nivo/bar";
import ChartToolbar, { dayText, rangeTicks, type Range } from "./ChartToolbar";
import styles from "./UsersPerDayChart.module.scss";

export interface DayUsers {
  /** The day, "YYYY-MM-DD" (UTC, as usage_daily buckets it). */
  date: string;
  /** Unique visitors that day, per country name. */
  values: Record<string, number>;
}

export interface ChartCountry {
  name: string;
  flag: string;
  color: string;
  /** First seen within the "new" window (see the admin page). */
  isNew: boolean;
}

/**
 * "Users per day" stacked by country, with a range toggle, a per-day tooltip
 * listing every country, and a legend that highlights a country on hover.
 * The 1Y range draws one bar per week (365 daily bars would be slivers); the
 * summary figures stay per day either way.
 * `days` runs oldest → newest; `countries` is ranked by all-time visitors.
 */
export default function UsersPerDayChart({
  days,
  countries,
}: {
  days: DayUsers[];
  countries: ChartCountry[];
}) {
  const [range, setRange] = useState<Range>(30);
  const [focus, setFocus] = useState<string | null>(null);

  const view = useMemo(() => {
    const shown = days.slice(-range);
    const totals = new Map<string, number>();
    for (const d of shown)
      for (const [c, v] of Object.entries(d.values)) totals.set(c, (totals.get(c) ?? 0) + v);
    // Only countries that actually visited in this range, busiest first.
    const active = countries
      .filter((c) => (totals.get(c.name) ?? 0) > 0)
      .sort((a, b) => (totals.get(b.name) ?? 0) - (totals.get(a.name) ?? 0));
    const dayTotal = (d: DayUsers) => active.reduce((a, c) => a + (d.values[c.name] ?? 0), 0);
    const dayTotals = shown.map(dayTotal);
    const peakIndex = dayTotals.indexOf(Math.max(0, ...dayTotals));

    // Bars: one per day, or per week for 1Y (weeks counted back from the
    // latest day, so the last bar is always a full, current week). A week's
    // value sums its days' unique visitors.
    const weekly = range === 365;
    const groups: DayUsers[][] = [];
    if (weekly) {
      for (let end = shown.length; end > 0; end -= 7) groups.unshift(shown.slice(Math.max(0, end - 7), end));
    } else {
      for (const d of shown) groups.push([d]);
    }
    const rows = groups.map((group) => {
      const row: Record<string, number | string> = { day: group[0].date };
      let total = 0;
      for (const c of active) {
        const v = group.reduce((a, d) => a + (d.values[c.name] ?? 0), 0);
        row[c.name] = v;
        total += v;
      }
      row.__total = total;
      return row;
    });
    return {
      rows,
      weekly,
      active,
      totals,
      average: dayTotals.length ? dayTotals.reduce((a, b) => a + b, 0) / dayTotals.length : 0,
      peak: peakIndex >= 0 ? { value: dayTotals[peakIndex], date: shown[peakIndex].date } : null,
      ticks: rangeTicks(rows.map((r) => String(r.day)), range),
    };
  }, [days, countries, range]);

  const byName = useMemo(() => new Map(countries.map((c) => [c.name, c])), [countries]);
  const Bar = ResponsiveBar as any;
  const hasData = view.rows.length > 0 && view.active.length > 0;

  return (
    <div className={styles.wrap}>
      <ChartToolbar
        range={range}
        onRange={setRange}
        items={[
          {
            label: "Avg / day",
            value: view.average.toLocaleString(undefined, { maximumFractionDigits: 1 }),
          },
          {
            label: "Peak",
            value: view.peak?.value ?? 0,
            note:
              view.peak && view.peak.value > 0
                ? dayText(view.peak.date, range === 365 ? "full" : "axis", 30)
                : undefined,
          },
          { label: "Countries", value: view.active.length },
        ]}
      />

      {hasData ? (
        <div className={styles.chart}>
          <Bar
            data={view.rows}
            keys={view.active.map((c) => c.name)}
            indexBy="day"
            groupMode="stacked"
            margin={{ top: 12, right: 8, bottom: 32, left: 36 }}
            padding={range === 7 ? 0.45 : range === 30 ? 0.28 : 0.18}
            innerPadding={1}
            borderRadius={3}
            colors={({ id }: { id: string }) => {
              const color = byName.get(id)?.color ?? "#cbd5e1";
              // Dim everything but the hovered legend entry.
              return focus && focus !== id ? `${color}33` : color;
            }}
            enableLabel={false}
            enableGridX={false}
            gridYValues={4}
            axisLeft={{ tickSize: 0, tickPadding: 8, tickValues: 4 }}
            axisBottom={{
              tickSize: 0,
              tickPadding: 10,
              tickValues: view.ticks,
              format: (iso: string) => dayText(iso, "axis", range),
            }}
            motionConfig="gentle"
            theme={{
              text: { fill: "#8b8aa3", fontSize: 11 },
              grid: { line: { stroke: "#efedf7", strokeDasharray: "3 4" } },
            }}
            tooltip={({ id, indexValue, data }: { id: string; indexValue: string; data: Record<string, number> }) => {
              const entries = view.active
                .map((c) => ({ c, v: Number(data[c.name]) || 0 }))
                .filter((e) => e.v > 0)
                .sort((a, b) => b.v - a.v);
              return (
                <div className={styles.tooltip}>
                  <div className={styles.tooltipHead}>
                    <span>
                      {view.weekly ? "Week of " : ""}
                      {dayText(indexValue, "full", range)}
                    </span>
                    <b>{Number(data.__total)} users</b>
                  </div>
                  <ul>
                    {entries.map(({ c, v }) => (
                      <li key={c.name} data-active={c.name === id || undefined}>
                        <i style={{ background: c.color }} />
                        <span>
                          {c.flag} {c.name}
                        </span>
                        <b>{v}</b>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            }}
          />
        </div>
      ) : (
        <p className={styles.empty}>No visitors in this range yet.</p>
      )}

      {view.active.length > 0 && (
        <ul className={styles.legend} onMouseLeave={() => setFocus(null)}>
          {view.active.map((c) => (
            <li
              key={c.name}
              onMouseEnter={() => setFocus(c.name)}
              data-dim={(focus && focus !== c.name) || undefined}
            >
              <i style={{ background: c.color }} />
              <span className={styles.legendName}>
                {c.flag} {c.name}
              </span>
              {c.isNew && <span className={styles.newBadge}>NEW</span>}
              <b>{view.totals.get(c.name) ?? 0}</b>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
