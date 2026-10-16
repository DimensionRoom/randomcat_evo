"use client";

import React, { useMemo, useState } from "react";
import styles from "./SortableTable.module.scss";

export type SortValue = string | number | null;

export interface SortableColumn {
  key: string;
  label: string;
}

export interface SortableRow {
  id: string;
  /** Raw values compared when sorting, per column key. */
  sort: Record<string, SortValue>;
  /** What each cell shows; falls back to the sort value. */
  cells?: Record<string, React.ReactNode>;
  /** Extra attributes for the <tr>, e.g. data-new for highlighted rows. */
  attrs?: Record<string, string | boolean | undefined>;
}

type Direction = "asc" | "desc";

function compare(a: SortValue, b: SortValue): number {
  if (typeof a === "number" && typeof b === "number") return a - b;
  return String(a).localeCompare(String(b), undefined, { numeric: true, sensitivity: "base" });
}

/**
 * Admin data table whose columns sort on click. The first click on a column
 * sorts it descending (largest/newest first, which is what a dashboard is
 * usually asked), the second ascending. Empty values always go last.
 * Without a click, rows keep the order they were given in.
 */
export default function SortableTable({
  columns,
  rows,
  tableClassName,
  wrapClassName,
  wrapAttrs,
  emptyText = "No data yet.",
  emptyClassName,
}: {
  columns: SortableColumn[];
  rows: SortableRow[];
  tableClassName?: string;
  wrapClassName?: string;
  wrapAttrs?: Record<string, string | boolean | undefined>;
  emptyText?: string;
  emptyClassName?: string;
}) {
  const [sort, setSort] = useState<{ key: string; dir: Direction } | null>(null);

  const sorted = useMemo(() => {
    if (!sort) return rows;
    const { key, dir } = sort;
    return [...rows].sort((ra, rb) => {
      const a = ra.sort[key] ?? null;
      const b = rb.sort[key] ?? null;
      const aEmpty = a === null || a === "";
      const bEmpty = b === null || b === "";
      if (aEmpty || bEmpty) return aEmpty === bEmpty ? 0 : aEmpty ? 1 : -1;
      const c = compare(a, b);
      return dir === "asc" ? c : -c;
    });
  }, [rows, sort]);

  if (rows.length === 0) return <p className={emptyClassName}>{emptyText}</p>;

  const onSort = (key: string) =>
    setSort((s) => (s?.key === key ? { key, dir: s.dir === "desc" ? "asc" : "desc" } : { key, dir: "desc" }));

  return (
    <div className={wrapClassName} {...wrapAttrs}>
      <table className={tableClassName}>
        <thead>
          <tr>
            {columns.map((c) => {
              const active = sort?.key === c.key;
              return (
                <th
                  key={c.key}
                  aria-sort={active ? (sort.dir === "asc" ? "ascending" : "descending") : "none"}
                  className={styles.th}
                >
                  <button type="button" className={styles.sortButton} onClick={() => onSort(c.key)}>
                    {c.label}
                    <span className={styles.arrow} data-active={active || undefined} aria-hidden="true">
                      {active ? (sort.dir === "asc" ? "▲" : "▼") : "↕"}
                    </span>
                  </button>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {sorted.map((r) => (
            <tr key={r.id} {...r.attrs}>
              {columns.map((c) => (
                <td key={c.key}>{r.cells?.[c.key] ?? r.sort[c.key] ?? "-"}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
