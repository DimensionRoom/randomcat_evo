import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { Eye, UserRound, Users, Globe } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { countryFlag } from "@/lib/countryFlag";
import { canonicalCountryName } from "@/lib/countryCodes";
import PageViewsChart, { type DayViews } from "@/components/Admin/PageViewsChart";
import DeviceBreakdown from "@/components/Admin/DeviceBreakdown";
import TrafficSources, { type SourceRow } from "@/components/Admin/TrafficSources";
import UsersPerDayChart, { type DayUsers } from "@/components/Admin/UsersPerDayChart";
import CollapsibleCard from "@/components/Admin/CollapsibleCard";
import SortableTable, { type SortValue } from "@/components/Admin/SortableTable";
import EqualHeightRow from "@/components/Admin/EqualHeightRow";
import VisitorsOverview from "@/components/Admin/VisitorsOverview";
import CountryMap from "@/components/Admin/CountryMap";
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

const SUMMED = ["views", "unique_visitors", "unique_users"] as const;

/**
 * Group rows whose country is the same place under different stored names.
 * `keys` are the columns that identify a row (country, plus day for per-day
 * rows); counts are summed and first/last seen widened.
 */
function mergeCountryRows(rows: Row[], keys: string[]): Row[] {
  const merged = new Map<string, Row>();
  for (const r of rows) {
    const country = canonicalCountryName(r.country == null ? null : String(r.country));
    const id = keys.map((k) => (k === "country" ? country : String(r[k]))).join("|");
    const prev = merged.get(id);
    if (!prev) {
      merged.set(id, { ...r, country });
      continue;
    }
    for (const k of SUMMED) prev[k] = (Number(prev[k]) || 0) + (Number(r[k]) || 0);
    if (r.first_seen && (!prev.first_seen || String(r.first_seen) < String(prev.first_seen)))
      prev.first_seen = r.first_seen;
    if (r.last_seen && (!prev.last_seen || String(r.last_seen) > String(prev.last_seen)))
      prev.last_seen = r.last_seen;
  }
  return [...merged.values()];
}

/** Value used to sort a cell: numbers (Postgres counts may arrive as numeric
 *  strings) compare as numbers, ISO timestamps compare correctly as text. */
function sortValue(value: unknown): SortValue {
  if (value === null || value === undefined || value === "") return null;
  if (typeof value === "number") return value;
  const text = String(value);
  return /^-?\d+(\.\d+)?$/.test(text) ? Number(text) : text;
}

/**
 * Sortable admin table. Sorting happens in the browser (SortableTable); here
 * each row is split into raw sort values and what the cell shows, so a
 * formatted date or a flag still sorts by the underlying value.
 */
function Table({
  columns,
  rows,
  display,
  sortBy,
  rowAttrs,
  wrapClassName = styles.tableWrap,
  wrapAttrs,
}: {
  columns: Column[];
  rows: Row[];
  /** Custom cell content for some columns; return undefined to use fmt(). */
  display?: (key: string, row: Row) => ReactNode | undefined;
  /** Custom sort value for some columns; return undefined to use the raw value. */
  sortBy?: (key: string, row: Row) => SortValue | undefined;
  rowAttrs?: (row: Row) => Record<string, string | boolean | undefined>;
  wrapClassName?: string;
  wrapAttrs?: Record<string, string | boolean | undefined>;
}) {
  return (
    <SortableTable
      columns={columns}
      tableClassName={styles.table}
      wrapClassName={wrapClassName}
      wrapAttrs={wrapAttrs}
      emptyClassName={styles.empty}
      rows={rows.map((r, i) => ({
        id: String(i),
        sort: Object.fromEntries(
          columns.map((c) => [c.key, sortBy?.(c.key, r) ?? sortValue(r[c.key])])
        ),
        cells: Object.fromEntries(
          columns.map((c) => [c.key, display?.(c.key, r) ?? fmt(r[c.key])])
        ),
        attrs: rowAttrs?.(r),
      }))}
    />
  );
}

/** Days of history the time charts load (their longest range is 1Y). */
const CHART_DAYS = 365;

/**
 * Read every row of a query, 1,000 at a time — the API's per-request cap. The
 * query must have a stable order, or rows can repeat or go missing between
 * pages.
 */
async function fetchAllRows(
  page: (from: number, to: number) => PromiseLike<{ data: unknown[] | null; error: unknown }>
): Promise<{ data: Row[] }> {
  const PAGE = 1000;
  const all: Row[] = [];
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await page(from, from + PAGE - 1);
    if (error || !data) break;
    all.push(...(data as Row[]));
    if (data.length < PAGE) break;
  }
  return { data: all };
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

  const [daily, byPath, byCountry, byDevice, users, totalsRes, byDayCountry, bySource] =
    await Promise.all([
      admin.from("usage_daily").select("*").limit(CHART_DAYS),
      admin.from("usage_by_path").select("*").limit(100),
      admin.from("usage_by_country").select("*"),
      admin.from("usage_by_device").select("*"),
      // Sorted here rather than in JS: the limit applies after ordering, so this
      // returns the 200 users with the most sign-ins, not the 200 most recent.
      admin
        .from("user_activity")
        .select("*")
        .order("sign_in_count", { ascending: false })
        .order("last_seen", { ascending: false, nullsFirst: false })
        .limit(200),
      admin.from("usage_totals").select("*").single(),
      // A year of day x country rows passes the API's 1,000-row cap, so this
      // one is read page by page (a single request would silently drop days).
      fetchAllRows((from, to) =>
        admin
          .from("usage_by_day_and_country")
          .select("*")
          .gte("day", new Date(Date.now() - CHART_DAYS * 24 * 60 * 60 * 1000).toISOString())
          .order("day", { ascending: false })
          .order("country", { ascending: true })
          .range(from, to)
      ),
      // Traffic sources (migration 0012). Without that view this returns no
      // rows and the card says nothing has been recorded yet.
      fetchAllRows((from, to) =>
        admin
          .from("usage_by_source")
          .select("*")
          .gte("day", new Date(Date.now() - CHART_DAYS * 24 * 60 * 60 * 1000).toISOString())
          .order("day", { ascending: false })
          .order("entries", { ascending: false })
          .range(from, to)
      ),
    ]);

  const totals = (totalsRes.data ?? {}) as Row;
  const dailyRows = (daily.data ?? []) as Row[];
  // The same country can be stored under several names (each visitor's browser
  // words it differently, or only the ISO code was saved), so merge rows under
  // one canonical name before anything counts or ranks them. Visitor counts are
  // summed across variants; a visitor seen under two variants counts twice,
  // which is rare and far smaller than the split it fixes.
  const countryRows = mergeCountryRows((byCountry.data ?? []) as Row[], ["country"]).sort(
    (a, b) => (Number(b.views) || 0) - (Number(a.views) || 0)
  );

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

  // Days are keyed by their "YYYY-MM-DD" (the views bucket by UTC day); the
  // charts format them, adding the year where a range spans two.
  const dayKey = (r: Row) => String(r.day).slice(0, 10);
  // usage_daily.views as deployed in Supabase is a running total, not a
  // per-day count: it starts from the view count carried over from the old
  // tracking system (so it is far above the number of usage_events rows).
  // The repo's 0002 migration still shows the original per-day definition.
  const viewDays: DayViews[] = [...dailyRows].reverse().map((r) => ({
    date: dayKey(r),
    total: Number(r.views) || 0,
  }));

  // A country counts as "new" when its first visit is this recent. Needs
  // usage_by_country.first_seen (migration 0010); without it nothing is new.
  const NEW_COUNTRY_DAYS = 7;
  const newSince = Date.now() - NEW_COUNTRY_DAYS * 24 * 60 * 60 * 1000;
  const isNewCountry = (c: Row) =>
    c.country !== "unknown" &&
    Boolean(c.first_seen) &&
    new Date(String(c.first_seen)).getTime() >= newSince;
  const newCountries = countryRows
    .filter(isNewCountry)
    .sort((a, b) => String(b.first_seen).localeCompare(String(a.first_seen)));
  const newCountryNames = new Set(newCountries.map((c) => String(c.country)));
  const knownCountries = countryRows.filter((c) => c.country !== "unknown");
  const maxCountryVisitors = Math.max(1, ...knownCountries.map((c) => Number(c.unique_visitors) || 0));

  // "Users per day": every country gets its own segment (no "Other"), ranked
  // by total visitors; "unknown" is excluded.
  const STACK_COLORS = [
    "#7c6cf0",
    "#34d399",
    "#f5a25d",
    "#3b82f6",
    "#f472b6",
    "#fbbf24",
    "#06b6d4",
    "#ef6b6b",
    "#a78bfa",
    "#10b981",
    "#fb923c",
    "#60a5fa",
    "#ec4899",
    "#84cc16",
  ];
  const dayCountryRows = mergeCountryRows((byDayCountry.data ?? []) as Row[], ["day", "country"]);
  const countryTotals = new Map<string, number>();
  const dayBuckets = new Map<string, Record<string, number>>();
  for (const r of dayCountryRows) {
    const c = String(r.country);
    if (c === "unknown") continue;
    const v = Number(r.unique_visitors) || 0;
    countryTotals.set(c, (countryTotals.get(c) ?? 0) + v);
    const key = dayKey(r);
    const bucket = dayBuckets.get(key) ?? {};
    bucket[c] = (bucket[c] ?? 0) + v;
    dayBuckets.set(key, bucket);
  }
  const chartCountries = [...countryTotals.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([name], i) => ({
      name,
      flag: countryFlag(name),
      color: STACK_COLORS[i % STACK_COLORS.length],
      isNew: newCountryNames.has(name),
    }));
  // One entry per day, oldest -> newest (usage_daily is newest-first).
  const chartDays: DayUsers[] = [...dailyRows].reverse().map((r) => ({
    date: dayKey(r),
    values: dayBuckets.get(dayKey(r)) ?? {},
  }));
  const sourceRows: SourceRow[] = bySource.data.map((r) => ({
    date: dayKey(r),
    referrer_host: r.referrer_host ? String(r.referrer_host) : null,
    utm_source: r.utm_source ? String(r.utm_source) : null,
    utm_medium: r.utm_medium ? String(r.utm_medium) : null,
    utm_campaign: r.utm_campaign ? String(r.utm_campaign) : null,
    entries: Number(r.entries) || 0,
  }));
  const firstSourceDay = sourceRows.reduce<string | null>(
    (min, r) => (!min || r.date < min ? r.date : min),
    null
  );
  const shortDate = (v: unknown) =>
    v ? new Date(String(v)).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "-";
  const sourcesSince = firstSourceDay ? shortDate(firstSourceDay) : null;

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
          <PageViewsChart days={viewDays} />
        </CollapsibleCard>
        <section className={`${styles.card} ${styles.visitorsCard}`}>
          <h2 className={styles.cardTitle}>Visitors overview</h2>
          <VisitorsOverview
            totalVisitors={Number(totals.unique_visitors) || 0}
            signedInVisitors={Number(totals.logged_in_visitors) || 0}
            accounts={Number(totals.unique_users) || 0}
          />
        </section>
      </div>

      {/* Daily views follows the height of Users per day and scrolls inside. */}
      <EqualHeightRow className={styles.chartsRow}>
        <CollapsibleCard title="Daily views">
          <Table
            columns={[
              { key: "day", label: "Day" },
              // Running total (see viewDays above); the other two are per day.
              { key: "views", label: "Total views" },
              { key: "unique_visitors", label: "Unique visitors" },
              { key: "unique_users", label: "Unique users" },
            ]}
            rows={dailyRows}
            // Show the day as day/month/year (en-GB) instead of the default
            // US month/day/year; it still sorts by the real date.
            display={(key, r) =>
              key === "day" ? new Date(String(r.day)).toLocaleDateString("en-GB") : undefined
            }
            wrapClassName={`${styles.tableWrap} ${styles.scrollTable}`}
            wrapAttrs={{ "data-equal-fill": true }}
          />
        </CollapsibleCard>

        <section className={styles.card}>
          <h2 className={styles.cardTitle}>Users per day</h2>
          <UsersPerDayChart days={chartDays} countries={chartCountries} />
        </section>
      </EqualHeightRow>

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
          // Follows the By country card's height (map + its capped table) and
          // scrolls inside, instead of stretching both cards to 100 rows.
          wrapClassName={`${styles.tableWrap} ${styles.scrollTable}`}
          wrapAttrs={{ "data-equal-fill": true }}
        />
      </CollapsibleCard>

      <section className={styles.card}>
        <h2 className={styles.cardTitle}>By country</h2>
          <CountryMap
            data={knownCountries.map((c) => ({
              name: String(c.country),
              flag: countryFlag(String(c.country)),
              visitors: Number(c.unique_visitors) || 0,
              views: Number(c.views) || 0,
              isNew: isNewCountry(c),
            }))}
          />
          {newCountries.length > 0 && (
            <p className={styles.newCountries}>
              <span className={styles.newBadge}>NEW</span>
              {newCountries.length} new{" "}
              {newCountries.length === 1 ? "country" : "countries"} in the last{" "}
              {NEW_COUNTRY_DAYS} days:{" "}
              {newCountries
                .map((c) => `${countryFlag(String(c.country))} ${c.country}`)
                .join(", ")}
            </p>
          )}
          <Table
            columns={[
              { key: "country", label: "Country" },
              { key: "views", label: "Views" },
              { key: "unique_visitors", label: "Unique visitors" },
              { key: "unique_users", label: "Unique users" },
              { key: "first_seen", label: "First seen" },
            ]}
            rows={countryRows}
            // Capped at the .scrollTable height; By page matches this card.
            wrapClassName={`${styles.tableWrap} ${styles.scrollTable}`}
            rowAttrs={(c) => ({ "data-new": isNewCountry(c) || undefined })}
            display={(key, c) => {
              if (key === "first_seen")
                return <span className={styles.muted}>{shortDate(c.first_seen)}</span>;
              if (key === "unique_visitors") {
                const v = Number(c.unique_visitors) || 0;
                // Bar relative to the busiest country, so the ranking reads at a glance.
                return (
                  <span className={styles.shareCell}>
                    <span className={styles.shareBar}>
                      <span style={{ width: `${(v / maxCountryVisitors) * 100}%` }} />
                    </span>
                    {v.toLocaleString()}
                  </span>
                );
              }
              if (key !== "country") return undefined;
              return (
                <>
                  <span className={styles.flag}>{countryFlag(String(c.country))}</span>
                  {String(c.country)}
                  {isNewCountry(c) && <span className={styles.newBadge}>NEW</span>}
                </>
              );
            }}
          />
        </section>
      </EqualHeightRow>

      <section className={styles.card}>
        <h2 className={styles.cardTitle}>Traffic sources</h2>
        <TrafficSources rows={sourceRows} since={sourcesSince} />
      </section>

      <section className={styles.card}>
        <h2 className={styles.cardTitle}>By device</h2>
        <DeviceBreakdown
          rows={((byDevice.data ?? []) as Row[]).map((r) => ({
            device: String(r.device ?? "unknown"),
            views: Number(r.views) || 0,
            visitors: Number(r.unique_visitors) || 0,
            users: Number(r.unique_users) || 0,
          }))}
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
          rows={(users.data ?? []) as Row[]}
          // Most recent country (from user_activity), shown with its flag to
          // match the "By country" table; sorts by the country name.
          sortBy={(key, u) =>
            key === "country" && u.country ? canonicalCountryName(String(u.country)) : undefined
          }
          display={(key, u) =>
            key === "country"
              ? u.country
                ? `${countryFlag(String(u.country))} ${canonicalCountryName(String(u.country))}`
                : "-"
              : undefined
          }
        />
      </section>

      <footer className={styles.footer}>
        © {new Date().getFullYear()} ThinkTool · Usage analytics
      </footer>
    </main>
  );
}
