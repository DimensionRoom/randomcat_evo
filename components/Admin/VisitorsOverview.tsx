import React from "react";
import { UserRound, UserCheck } from "lucide-react";
import styles from "./VisitorsOverview.module.scss";

/**
 * "Visitors overview": how many visitors there are and how many of them have
 * signed in. Both groups are counted in visitors (browsers, by visitor_id) so
 * they add up to the total; the number of accounts is a separate figure,
 * since one account can sign in from several browsers.
 */
export default function VisitorsOverview({
  totalVisitors,
  signedInVisitors,
  accounts,
}: {
  /** usage_totals.unique_visitors */
  totalVisitors: number;
  /** usage_totals.logged_in_visitors: visitors who signed in at least once */
  signedInVisitors: number;
  /** usage_totals.unique_users: distinct accounts */
  accounts: number;
}) {
  const anonymous = Math.max(0, totalVisitors - signedInVisitors);
  const share = (v: number) => (totalVisitors > 0 ? (v / totalVisitors) * 100 : 0);
  const pctText = (v: number) => {
    const p = share(v);
    return `${p > 0 && p < 10 ? p.toFixed(1) : Math.round(p)}%`;
  };
  const oneIn = signedInVisitors > 0 ? Math.round(totalVisitors / signedInVisitors) : null;

  const groups = [
    {
      key: "anon",
      label: "Anonymous",
      hint: "never signed in",
      value: anonymous,
      color: "#f5a25d",
      Icon: UserRound,
    },
    {
      key: "signed",
      label: "Signed in",
      hint: "signed in at least once",
      value: signedInVisitors,
      color: "#10b981",
      Icon: UserCheck,
    },
  ];

  return (
    <div className={styles.wrap}>
      <div className={styles.total}>
        <span className={styles.totalValue}>{totalVisitors.toLocaleString()}</span>
        <span className={styles.totalLabel}>total visitors</span>
      </div>

      <div
        className={styles.split}
        role="img"
        aria-label={groups.map((g) => `${g.label} ${pctText(g.value)}`).join(", ")}
      >
        {groups.map((g) =>
          g.value > 0 ? (
            <span key={g.key} style={{ width: `${share(g.value)}%`, background: g.color }} />
          ) : null
        )}
      </div>

      <ul className={styles.groups}>
        {groups.map(({ key, label, hint, value, color, Icon }) => (
          <li key={key} style={{ ["--accent" as string]: color }}>
            <span className={styles.icon}>
              <Icon size={18} aria-hidden="true" />
            </span>
            <span className={styles.groupText}>
              {label}
              <small>{hint}</small>
            </span>
            <span className={styles.groupValue}>
              {value.toLocaleString()}
              <small>{pctText(value)}</small>
            </span>
          </li>
        ))}
      </ul>

      <p className={styles.insight}>
        {oneIn ? (
          <>
            <b>1 in {oneIn.toLocaleString()}</b> visitors has signed in
          </>
        ) : (
          "No visitor has signed in yet"
        )}
        <span aria-hidden="true"> · </span>
        <b>{accounts.toLocaleString()}</b> {accounts === 1 ? "account" : "accounts"}
      </p>
    </div>
  );
}
