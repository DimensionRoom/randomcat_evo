import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import styles from "./Admin.module.scss";

export const dynamic = "force-dynamic";

type Column = { key: string; label: string };

function formatCell(value: unknown): string {
  if (value === null || value === undefined || value === "") return "-";
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}T/.test(value)) {
    return new Date(value).toLocaleString();
  }
  return String(value);
}

function Table({
  title,
  columns,
  rows,
}: {
  title: string;
  columns: Column[];
  rows: Record<string, unknown>[];
}) {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>{title}</h2>
      {rows.length === 0 ? (
        <p className={styles.empty}>No data yet.</p>
      ) : (
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
              {rows.map((row, i) => (
                <tr key={i}>
                  {columns.map((c) => (
                    <td key={c.key}>{formatCell(row[c.key])}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

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

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single();
  if (!profile?.is_admin) redirect(`/${locale}`);

  const admin = createAdminClient();
  const [daily, byPath, byCountry, users] = await Promise.all([
    admin.from("usage_daily").select("*").limit(60),
    admin.from("usage_by_path").select("*").limit(100),
    admin.from("usage_by_country").select("*"),
    admin.from("user_activity").select("*").limit(200),
  ]);

  const sum = (rows: Record<string, unknown>[] | null, key: string) =>
    (rows ?? []).reduce((acc, r) => acc + (Number(r[key]) || 0), 0);

  const stats = [
    { label: "Page views", value: sum(byPath.data, "views") },
    { label: "Sign-ins", value: sum(users.data, "sign_in_count") },
    { label: "Signed-in users", value: (users.data ?? []).length },
    { label: "Countries", value: (byCountry.data ?? []).length },
  ];

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1 className={styles.title}>Usage Dashboard</h1>
        <a className={styles.backLink} href={`/${locale}`}>
          ← Back to site
        </a>
      </header>

      <div className={styles.stats}>
        {stats.map((s) => (
          <div key={s.label} className={styles.statCard}>
            <div className={styles.statValue}>{s.value.toLocaleString()}</div>
            <div className={styles.statLabel}>{s.label}</div>
          </div>
        ))}
      </div>

      <Table
        title="Daily views"
        columns={[
          { key: "day", label: "Day" },
          { key: "views", label: "Views" },
          { key: "unique_visitors", label: "Unique visitors" },
          { key: "unique_users", label: "Unique users" },
        ]}
        rows={daily.data ?? []}
      />

      <Table
        title="By page"
        columns={[
          { key: "path", label: "Path" },
          { key: "views", label: "Views" },
          { key: "logged_in_views", label: "Logged-in" },
          { key: "anon_views", label: "Anonymous" },
        ]}
        rows={byPath.data ?? []}
      />

      <Table
        title="By country"
        columns={[
          { key: "country", label: "Country" },
          { key: "views", label: "Views" },
          { key: "unique_visitors", label: "Unique visitors" },
          { key: "unique_users", label: "Unique users" },
        ]}
        rows={byCountry.data ?? []}
      />

      <Table
        title="Per user (signed-in)"
        columns={[
          { key: "email", label: "Email" },
          { key: "full_name", label: "Name" },
          { key: "sign_in_count", label: "Sign-ins" },
          { key: "page_views", label: "Page views" },
          { key: "active_days", label: "Active days" },
          { key: "last_seen", label: "Last seen" },
        ]}
        rows={users.data ?? []}
      />
    </main>
  );
}
