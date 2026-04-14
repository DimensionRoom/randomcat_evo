"use client";
import styles from "./PageLogger.module.scss";
import { useEffect, useState } from "react";

interface PageLoggerProps {
  showVisits?: boolean;
}

export default function PageLogger({ showVisits = false }: PageLoggerProps) {
  const [totalVisits, setTotalVisits] = useState<number | null>(null);

  useEffect(() => {
    // POST: log page visit
    fetch(
      "https://script.google.com/macros/s/AKfycbyLrcVLQXY60O3h3nWBVTwZN4ur-EtrKqhnE_I3rO_JSjawlhcDE399_WpSp1jgn9UwcQ/exec",
      {
        method: "POST",
        body: JSON.stringify({
          page_path: window.location.pathname,
          referrer: document.referrer || "",
          device: window.innerWidth < 768 ? "mobile" : "desktop",
        }),
      },
    ).catch(console.error);

    // GET: fetch total visits
    if (showVisits) {
      fetch(
        "https://script.google.com/macros/s/AKfycbyLrcVLQXY60O3h3nWBVTwZN4ur-EtrKqhnE_I3rO_JSjawlhcDE399_WpSp1jgn9UwcQ/exec",
      )
        .then((res) => res.json())
        .then((data) => {
          if (data?.total_visits) {
            setTotalVisits(data.total_visits);
          }
        })
        .catch(console.error);
    }
  }, [showVisits]);

  if (!showVisits || totalVisits === null) {
    return null;
  }

  return (
    <div className={styles.loggerContainer}>
      ผู้เข้าชมทั้งหมด:{" "}
      <span>
        {totalVisits.toLocaleString()}
      </span>
    </div>
  );
}
