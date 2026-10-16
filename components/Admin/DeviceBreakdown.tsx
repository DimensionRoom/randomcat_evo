import React from "react";
import { Monitor, Smartphone, Tablet, HelpCircle, type LucideIcon } from "lucide-react";
import styles from "./DeviceBreakdown.module.scss";

export interface DeviceRow {
  device: string;
  views: number;
  visitors: number;
  users: number;
}

const DEVICES: Record<string, { label: string; Icon: LucideIcon; color: string; tint: string }> = {
  desktop: { label: "Desktop", Icon: Monitor, color: "#7c3aed", tint: "#f3edff" },
  mobile: { label: "Mobile", Icon: Smartphone, color: "#f5a25d", tint: "#fff4ea" },
  tablet: { label: "Tablet", Icon: Tablet, color: "#10b981", tint: "#e9faf3" },
};
const OTHER = { label: "Unknown", Icon: HelpCircle, color: "#a0a3b8", tint: "#f2f3f7" };

const pct = (part: number, whole: number) => (whole > 0 ? (part / whole) * 100 : 0);
const pctText = (v: number) => `${v < 10 && v > 0 ? v.toFixed(1) : Math.round(v)}%`;

/**
 * "By device": one bar splitting visitors across devices, then a tile per
 * device. Shares are of unique visitors (people), with share of views as the
 * secondary figure. Device comes from viewport width at the time of the visit
 * (see lib/analytics/track.ts), not the user agent.
 */
export default function DeviceBreakdown({ rows }: { rows: DeviceRow[] }) {
  if (rows.length === 0) return <p className={styles.empty}>No data yet.</p>;

  const sorted = [...rows].sort((a, b) => b.visitors - a.visitors);
  const totalVisitors = sorted.reduce((a, r) => a + r.visitors, 0);
  const totalViews = sorted.reduce((a, r) => a + r.views, 0);
  const meta = (d: string) => DEVICES[d] ?? { ...OTHER, label: d === "unknown" ? OTHER.label : d };

  return (
    <div className={styles.wrap}>
      <div
        className={styles.split}
        role="img"
        aria-label={sorted
          .map((r) => `${meta(r.device).label} ${pctText(pct(r.visitors, totalVisitors))}`)
          .join(", ")}
      >
        {sorted.map((r) => {
          const share = pct(r.visitors, totalVisitors);
          return share > 0 ? (
            <span
              key={r.device}
              style={{ width: `${share}%`, background: meta(r.device).color }}
              title={`${meta(r.device).label}: ${pctText(share)} of visitors`}
            />
          ) : null;
        })}
      </div>

      <ul className={styles.tiles}>
        {sorted.map((r) => {
          const { label, Icon, color, tint } = meta(r.device);
          const share = pct(r.visitors, totalVisitors);
          return (
            <li key={r.device} className={styles.tile} style={{ ["--accent" as string]: color, ["--tint" as string]: tint }}>
              <div className={styles.tileHead}>
                <span className={styles.icon}>
                  <Icon size={20} strokeWidth={2} aria-hidden="true" />
                </span>
                <span className={styles.name}>{label}</span>
              </div>
              <div className={styles.share}>
                {pctText(share)}
                <small>of visitors</small>
              </div>
              <div className={styles.meter} aria-hidden="true">
                <span style={{ width: `${share}%` }} />
              </div>
              <dl className={styles.stats}>
                <div>
                  <dt>Visitors</dt>
                  <dd>{r.visitors.toLocaleString()}</dd>
                </div>
                <div>
                  <dt>Views</dt>
                  <dd>
                    {r.views.toLocaleString()}
                    <small>{pctText(pct(r.views, totalViews))}</small>
                  </dd>
                </div>
                <div>
                  <dt>Pages / visitor</dt>
                  <dd>{r.visitors ? (r.views / r.visitors).toFixed(1) : "–"}</dd>
                </div>
                <div>
                  <dt>Signed-in users</dt>
                  <dd>{r.users.toLocaleString()}</dd>
                </div>
              </dl>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
