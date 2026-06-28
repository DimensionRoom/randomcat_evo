import { redirect } from "next/navigation";
import { Eye, UserRound, Users, Globe } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { countryFlag } from "@/lib/countryFlag";
import NivoLine from "@/components/Admin/NivoLine";
import NivoStackedBar from "@/components/Admin/NivoStackedBar";
import CollapsibleCard from "@/components/Admin/CollapsibleCard";
import EqualHeightRow from "@/components/Admin/EqualHeightRow";
import NivoPie from "@/components/Admin/NivoPie";
import NivoChoropleth from "@/components/Admin/NivoChoropleth";
import styles from "./Admin.module.scss";

export const dynamic = "force-dynamic";

type Row = Record<string, unknown>;
type Column = { key: string; label: string };

function fmt(value: unknown): string {
  if (value === null || value === undefined || value === "") return "-";
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}T/.test(value)) {
    return new Date(value).toLocaleString();
  }
  if (typeof value === "number") return value.toLocaleString();
  return String(value);
}

function Table({
  columns,
  rows,
}: {
  columns: Column[];
  rows: Row[];
}) {
  if (rows.length === 0)
    return <p className={styles.empty}>No data yet.</p>;
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key}>{c.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {columns.map((c) => (
                <td key={c.key}>{fmt(r[c.key])}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const sum = (rows: Row[] | null, key: string) =>
  (rows ?? []).reduce((a, r) => a + (Number(r[key]) || 0), 0);

export default async function AdminPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect(`/${locale}/login`);

  // Verify admin via the service-role client (not the user session): getUser()
  // above already validated WHO the user is, but reading their profile through
  // the RLS-bound user session can come back empty when the request's access
  // token is stale (common on mobile after the token has just expired), which
  // would wrongly bounce a real admin back to home. The service role ignores
  // RLS, so the is_admin check is reliable.
  const admin = createAdminClient();
  const { data: profile } = await admin
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single();
  if (!profile?.is_admin) redirect(`/${locale}`);

  const [daily, byPath, byCountry, byDevice, users, totalsRes, byDayCountry] =
    await Promise.all([
      admin.from("usage_daily").select("*").limit(60),
      admin.from("usage_by_path").select("*").limit(100),
      admin.from("usage_by_country").select("*"),
      admin.from("usage_by_device").select("*"),
      admin.from("user_activity").select("*").limit(200),
      admin.from("usage_totals").select("*").single(),
      admin.from("usage_by_day_and_country").select("*"),
    ]);

  const totals = (totalsRes.data ?? {}) as Row;
  const dailyRows = (daily.data ?? []) as Row[];
  const countryRows = (byCountry.data ?? []) as Row[];

  // Stat cards
  const stats = [
    {
      label: "Page views",
      value: Number(totals.page_views) || sum(byPath.data as Row[], "views"),
      Icon: Eye,
      tint: "#ede9fe",
      color: "#7c3aed",
    },
    {
      label: "Visitors",
      value: Number(totals.anonymous_visitors) || 0,
      Icon: UserRound,
      tint: "#fff1e6",
      color: "#f5a25d",
    },
    {
      label: "Signed-in users",
      value: Number(totals.unique_users) || (users.data ?? []).length,
      Icon: Users,
      tint: "#dcfce7",
      color: "#16a34a",
    },
    {
      label: "Countries",
      value: countryRows.filter((c) => c.country !== "unknown").length,
      Icon: Globe,
      tint: "#dbeafe",
      color: "#2563eb",
    },
  ];

  // Line chart (oldest -> newest)
  const dayLabel = (r: Row) =>
    new Date(String(r.day)).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  const linePoints = [...dailyRows]
    .reverse()
    .map((r) => ({ label: dayLabel(r), value: Number(r.views) || 0 }));

  // Stacked "Users per day": every country gets its own segment (no "Other"),
  // ranked by total visitors. "unknown" is excluded.
  const STACK_COLORS = [
    "#7c6cf0",
    "#34d399",
    "#f5a25d",
    "#2563eb",
    "#f472b6",
    "#fbbf24",
    "#06b6d4",
    "#ef4444",
    "#a78bfa",
    "#10b981",
    "#fb923c",
    "#3b82f6",
    "#ec4899",
    "#84cc16",
  ];
  const dayCountryRows = (byDayCountry.data ?? []) as Row[];
  // Rank every known country by total unique visitors across the window.
  const countryTotals = new Map<string, number>();
  for (const r of dayCountryRows) {
    const c = String(r.country);
    if (c === "unknown") continue;
    countryTotals.set(c, (countryTotals.get(c) ?? 0) + (Number(r.unique_visitors) || 0));
  }
  const stackKeys = [...countryTotals.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([c]) => c);
  const stackColors = stackKeys.map(
    (_, i) => STACK_COLORS[i % STACK_COLORS.length]
  );
  // One row per day (oldest -> newest), each country's unique visitors as a key.
  const dayBuckets = new Map<string, Record<string, number>>();
  for (const r of dayCountryRows) {
    const c = String(r.country);
    if (c === "unknown") continue;
    const label = dayLabel(r);
    const bucket = dayBuckets.get(label) ?? {};
    bucket[c] = (bucket[c] ?? 0) + (Number(r.unique_visitors) || 0);
    dayBuckets.set(label, bucket);
  }
  const stackData = [...dailyRows]
    .reverse()
    .map((r) => {
      const label = dayLabel(r);
      const bucket = dayBuckets.get(label) ?? {};
      const row: Record<string, number | string> = { day: label };
      for (const k of stackKeys) row[k] = bucket[k] ?? 0;
      return row;
    });

  // Donut: anonymous visitors vs signed-in users
  const anonVisitors = Number(totals.anonymous_visitors) || 0;
  const signedInUsers = Number(totals.unique_users) || 0;
  const donutSegments = [
    { label: "Anonymous", value: anonVisitors, color: "#f5a25d" },
    { label: "Signed-in", value: signedInUsers, color: "#34d399" },
  ];
  const donutTotal = anonVisitors + signedInUsers;
  const pct = (v: number) =>
    donutTotal ? `${Math.round((v / donutTotal) * 100)}%` : "0%";

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Usage Dashboard</h1>
          <p className={styles.subtitle}>
            Overview of your website usage and visitor activity.
          </p>
        </div>
        <a className={styles.backLink} href={`/${locale}`}>
          ← Back to site
        </a>
      </header>

      <div className={styles.stats}>
        {stats.map(({ label, value, Icon, color }) => (
          <div
            key={label}
            className={styles.statCard}
            style={{
              ["--accent" as any]: color,
              background: `linear-gradient(135deg, ${color}1f, ${color}0d)`,
              borderColor: `${color}33`,
            }}
          >
            <span
              className={styles.statIcon}
              style={{ background: color, color: "#fff" }}
            >
              <Icon size={22} />
            </span>
            <div className={styles.statInfo}>
              <div className={styles.statValue}>{value.toLocaleString()}</div>
              <div className={styles.statLabel}>{label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.chartsRow}>
        <CollapsibleCard title="Page views over time">
          <NivoLine points={linePoints} />
        </CollapsibleCard>
        <section className={`${styles.card} ${styles.visitorsCard}`}>
          <h2 className={styles.cardTitle}>Visitors overview</h2>
          <div className={styles.donutRow}>
            <NivoPie
              segments={donutSegments}
              total={donutTotal}
              centerLabel="Visitors"
            />
            <ul className={styles.legend}>
              <li>
                <span className={styles.legendDot} style={{ background: "#f5a25d" }} />
                <span className={styles.legendText}>
                  Anonymous
                  <small>visitors</small>
                </span>
                <b>
                  {anonVisitors.toLocaleString()}
                  <small>{pct(anonVisitors)}</small>
                </b>
              </li>
              <li>
                <span className={styles.legendDot} style={{ background: "#34d399" }} />
                <span className={styles.legendText}>
                  Signed-in
                  <small>users</small>
                </span>
                <b>
                  {signedInUsers.toLocaleString()}
                  <small>{pct(signedInUsers)}</small>
                </b>
              </li>
            </ul>
          </div>
        </section>
      </div>

      <div className={styles.chartsRow}>
        <CollapsibleCard title="Daily views">
          <Table
            columns={[
              { key: "day", label: "Day" },
              { key: "views", label: "Views" },
              { key: "unique_visitors", label: "Unique visitors" },
              { key: "unique_users", label: "Unique users" },
            ]}
            rows={dailyRows.map((r) => ({
              ...r,
              // Show the day as day/month/year (en-GB) instead of the default
              // US month/day/year.
              day: new Date(String(r.day)).toLocaleDateString("en-GB"),
            }))}
          />
        </CollapsibleCard>

        <section className={styles.card}>
          <h2 className={styles.cardTitle}>Users per day</h2>
          <NivoStackedBar
            data={stackData}
            keys={stackKeys}
            colors={stackColors}
          />
          {stackKeys.length > 0 && (
            <ul className={styles.barLegend}>
              {stackKeys.map((c, i) => (
                <li key={c}>
                  <span
                    className={styles.legendDot}
                    style={{ background: stackColors[i] }}
                  />
                  <span>{`${countryFlag(c)} ${c}`}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <EqualHeightRow className={styles.chartsRow}>
      <CollapsibleCard title="By page">
        <Table
          columns={[
            { key: "path", label: "Path" },
            { key: "views", label: "Views" },
            { key: "logged_in_views", label: "Logged-in" },
            { key: "anon_views", label: "Anonymous" },
          ]}
          rows={(byPath.data ?? []) as Row[]}
        />
      </CollapsibleCard>

      <section className={styles.card}>
        <h2 className={styles.cardTitle}>By country</h2>
          <div className={styles.mapWrap}>
            <NivoChoropleth
              data={countryRows.map((c) => ({
                name: String(c.country),
                value: Number(c.views) || 0,
              }))}
            />
          </div>
          <div
            className={`${styles.tableWrap} ${styles.scrollTable}`}
            data-equal-fill
          >
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Country</th>
                  <th>Views</th>
                  <th>Unique visitors</th>
                  <th>Unique users</th>
                </tr>
              </thead>
              <tbody>
                {countryRows.map((c, i) => (
                  <tr key={i}>
                    <td>
                      <span className={styles.flag}>
                        {countryFlag(String(c.country))}
                      </span>
                      {String(c.country)}
                    </td>
                    <td>{fmt(c.views)}</td>
                    <td>{fmt(c.unique_visitors)}</td>
                    <td>{fmt(c.unique_users)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </EqualHeightRow>

      <section className={styles.card}>
        <h2 className={styles.cardTitle}>By device</h2>
        <Table
          columns={[
            { key: "device", label: "Device" },
            { key: "views", label: "Views" },
            { key: "unique_visitors", label: "Unique visitors" },
            { key: "unique_users", label: "Unique users" },
          ]}
          rows={(byDevice.data ?? []) as Row[]}
        />
      </section>

      <section className={styles.card}>
        <h2 className={styles.cardTitle}>Per user (signed-in)</h2>
        <Table
          columns={[
            { key: "email", label: "Email" },
            { key: "full_name", label: "Name" },
            { key: "country", label: "Country" },
            { key: "sign_in_count", label: "Sign-ins" },
            { key: "page_views", label: "Page views" },
            { key: "active_days", label: "Active days" },
            { key: "last_seen", label: "Last seen" },
          ]}
          rows={(users.data ?? []).map((u) => ({
            ...(u as Row),
            // Most recent country (from user_activity), shown with its flag to
            // match the "By country" table.
            country: u.country
              ? `${countryFlag(String(u.country))} ${u.country}`
              : "-",
          }))}
        />
      </section>

      <footer className={styles.footer}>
        © {new Date().getFullYear()} ThinkTool · Usage analytics
      </footer>
    </main>
  );
}
