"use client";

import React, { useMemo, useState } from "react";
import { Bot, Link2, Megaphone, MousePointerClick, Search, Share2, type LucideIcon } from "lucide-react";
import { classifySource, type Channel } from "@/lib/analytics/sources";
import ChartToolbar, { type Range } from "./ChartToolbar";
import styles from "./TrafficSources.module.scss";

export interface SourceRow {
  /** The day, "YYYY-MM-DD". */
  date: string;
  referrer_host: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  /** Visits that started from this source that day. */
  entries: number;
}

const CHANNELS: Record<Channel, { label: string; Icon: LucideIcon; color: string }> = {
  search: { label: "Search", Icon: Search, color: "#3b82f6" },
  social: { label: "Social", Icon: Share2, color: "#ec4899" },
  ai: { label: "AI assistants", Icon: Bot, color: "#8b5cf6" },
  referral: { label: "Other websites", Icon: Link2, color: "#10b981" },
  campaign: { label: "Campaigns", Icon: Megaphone, color: "#f59e0b" },
  direct: { label: "Direct", Icon: MousePointerClick, color: "#94a3b8" },
};
const ORDER: Channel[] = ["search", "social", "ai", "referral", "campaign", "direct"];
const TOP_SOURCES = 8;

const pctText = (part: number, whole: number) => {
  const p = whole > 0 ? (part / whole) * 100 : 0;
  return `${p > 0 && p < 10 ? p.toFixed(1) : Math.round(p)}%`;
};

/**
 * "Traffic sources": how visits started — search, social, AI assistants,
 * other websites, tagged campaigns, or direct — and the sites that sent the
 * most. A visit is the first page of a browser tab session (see
 * lib/analytics/track.ts); channels come from lib/analytics/sources.ts.
 */
export default function TrafficSources({ rows, since }: { rows: SourceRow[]; since: string | null }) {
  const [range, setRange] = useState<Range>(30);

  const view = useMemo(() => {
    const from = new Date(Date.now() - range * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    const channelTotals = new Map<Channel, number>();
    const sourceTotals = new Map<string, { channel: Channel; visits: number }>();
    let total = 0;
    for (const r of rows) {
      if (r.date < from) continue;
      const { channel, source } = classifySource(r);
      total += r.entries;
      channelTotals.set(channel, (channelTotals.get(channel) ?? 0) + r.entries);
      const key = `${channel}|${source}`;
      const s = sourceTotals.get(key) ?? { channel, visits: 0 };
      s.visits += r.entries;
      sourceTotals.set(key, s);
    }
    const channels = ORDER.map((c) => ({ channel: c, visits: channelTotals.get(c) ?? 0 }))
      .filter((c) => c.visits > 0)
      .sort((a, b) => b.visits - a.visits);
    const sources = [...sourceTotals.entries()]
      .map(([key, v]) => ({ name: key.split("|")[1], ...v }))
      .sort((a, b) => b.visits - a.visits);
    return { total, channels, sources, top: sources.slice(0, TOP_SOURCES) };
  }, [rows, range]);

  const lead = view.channels[0];
  const maxSource = view.top[0]?.visits ?? 1;

  return (
    <div className={styles.wrap}>
      <ChartToolbar
        range={range}
        onRange={setRange}
        items={[
          { label: "Visits", value: view.total.toLocaleString() },
          {
            label: "Top channel",
            value: lead ? CHANNELS[lead.channel].label : "–",
            note: lead ? pctText(lead.visits, view.total) : undefined,
          },
          { label: "Sources", value: view.sources.length },
        ]}
      />

      {view.total === 0 ? (
        <p className={styles.empty}>
          {rows.length === 0
            ? "No sources recorded yet. They are counted from the first page of each visit once tracking is live."
            : "No visits in this range yet."}
          {since && <> Recording since {since}.</>}
        </p>
      ) : (
        <>
          <div className={styles.split} role="img" aria-label={view.channels.map((c) => `${CHANNELS[c.channel].label} ${pctText(c.visits, view.total)}`).join(", ")}>
            {view.channels.map((c) => (
              <span
                key={c.channel}
                style={{ width: `${(c.visits / view.total) * 100}%`, background: CHANNELS[c.channel].color }}
                title={`${CHANNELS[c.channel].label}: ${pctText(c.visits, view.total)}`}
              />
            ))}
          </div>

          <div className={styles.columns}>
            <ul className={styles.channels}>
              {view.channels.map(({ channel, visits }) => {
                const { label, Icon, color } = CHANNELS[channel];
                return (
                  <li key={channel} style={{ ["--accent" as string]: color }}>
                    <span className={styles.icon}>
                      <Icon size={16} aria-hidden="true" />
                    </span>
                    <span className={styles.name}>{label}</span>
                    <span className={styles.count}>
                      {visits.toLocaleString()}
                      <small>{pctText(visits, view.total)}</small>
                    </span>
                  </li>
                );
              })}
            </ul>

            <div className={styles.sources}>
              <p className={styles.sourcesTitle}>Top sources</p>
              <ol>
                {view.top.map((s) => (
                  <li key={`${s.channel}-${s.name}`}>
                    <span className={styles.sourceName}>
                      <i style={{ background: CHANNELS[s.channel].color }} />
                      {s.name}
                    </span>
                    <span className={styles.bar} aria-hidden="true">
                      <span style={{ width: `${(s.visits / maxSource) * 100}%`, background: CHANNELS[s.channel].color }} />
                    </span>
                    <b>{s.visits.toLocaleString()}</b>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
