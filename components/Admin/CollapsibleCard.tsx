"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import styles from "@/app/[locale]/admin/Admin.module.scss";

/**
 * Card that collapses on mobile/tablet (<1024px), defaulting to closed. On
 * desktop it's always expanded and not interactive.
 */
export default function CollapsibleCard({
  title,
  children,
  className,
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  const [isDesktop, setIsDesktop] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const collapsible = !isDesktop;
  const showBody = !collapsible || open;

  return (
    <section className={`${styles.card} ${className ?? ""}`}>
      <button
        type="button"
        className={styles.collapseHeader}
        onClick={collapsible ? () => setOpen((o) => !o) : undefined}
        aria-expanded={showBody}
      >
        <h2 className={styles.cardTitle}>{title}</h2>
        {collapsible && (
          <ChevronDown
            size={20}
            className={`${styles.collapseChevron} ${
              open ? styles.collapseChevronOpen : ""
            }`}
          />
        )}
      </button>
      {showBody && <div className={styles.collapseBody}>{children}</div>}
    </section>
  );
}
