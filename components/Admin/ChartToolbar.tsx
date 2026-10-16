"use client";

import React from "react";
import styles from "./ChartToolbar.module.scss";

/** Day ranges every admin time chart offers (the page loads 365 days). */
export const RANGES = [7, 30, 90, 365] as const;
export type Range = (typeof RANGES)[number];

export const rangeLabel = (r: Range) => (r === 365 ? "1Y" : `${r}D`);

/**
 * Text for a day given as "YYYY-MM-DD". On the axis a year-long range shows
 * month and year ("Oct '26") — the same "Oct 16" occurs in both years there;
 * shorter ranges show month and day. Tooltips always show the full date.
 */
export function dayText(iso: string, kind: "axis" | "full", range: Range): string {
  const d = new Date(`${iso}T00:00:00Z`);
  if (kind === "full")
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
  if (range === 365)
    return `${d.toLocaleDateString("en-US", { month: "short", timeZone: "UTC" })} '${String(d.getUTCFullYear()).slice(2)}`;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
}

/** At most ~8 date labels under a chart, evenly spaced, always the latest. */
export function sparseTicks(labels: string[], max = 8): string[] {
  if (labels.length <= max) return labels;
  const step = Math.ceil(labels.length / max);
  return labels.filter((_, i) => (labels.length - 1 - i) % step === 0);
}

/**
 * Date labels for a range. 1Y labels the first point of each month (its axis
 * text is the month, so evenly spaced ticks would repeat a month); shorter
 * ranges use evenly spaced days.
 */
export function rangeTicks(isoDates: string[], range: Range): string[] {
  if (range !== 365) return sparseTicks(isoDates);
  const firsts = isoDates.filter((d, i) => i === 0 || d.slice(0, 7) !== isoDates[i - 1].slice(0, 7));
  return sparseTicks(firsts, 12);
}

export interface SummaryItem {
  label: string;
  value: React.ReactNode;
  /** Small text after the value, e.g. the peak's date. */
  note?: React.ReactNode;
  /** Colours the note: positive green, negative red. */
  trend?: "up" | "down";
}

/** Summary figures on the left, the day-range toggle on the right. */
export default function ChartToolbar({
  items,
  range,
  onRange,
}: {
  items: SummaryItem[];
  range: Range;
  onRange: (r: Range) => void;
}) {
  return (
    <div className={styles.toolbar}>
      <dl className={styles.summary}>
        {items.map((item) => (
          <div key={item.label}>
            <dt>{item.label}</dt>
            <dd>
              {item.value}
              {item.note && <small data-trend={item.trend}>{item.note}</small>}
            </dd>
          </div>
        ))}
      </dl>
      <div className={styles.ranges} role="group" aria-label="Date range">
        {RANGES.map((r) => (
          <button
            key={r}
            type="button"
            aria-pressed={range === r}
            className={range === r ? styles.rangeActive : styles.range}
            onClick={() => onRange(r)}
          >
            {rangeLabel(r)}
          </button>
        ))}
      </div>
    </div>
  );
}
