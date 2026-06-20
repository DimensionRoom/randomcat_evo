"use client";

import React, { ReactNode, useEffect, useRef } from "react";

/**
 * Equalizes the height of its direct child cards. CSS grid/flex always sizes the
 * row to the TALLER card (max-content), so we measure both and cap the TALLER
 * card's scroll body (the element marked `data-equal-body`) so both cards end up
 * the SHORTER one's height — the taller table scrolls, neither card has a gap.
 *
 * Leaves heights natural when the cards wrap onto separate rows (mobile/single
 * column).
 */
export default function EqualHeightRow({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () => {
      const cards = Array.from(el.children) as HTMLElement[];
      if (cards.length < 2) return;

      const bodies = cards.map(
        (c) => c.querySelector("[data-equal-body]") as HTMLElement | null
      );

      // Reset previous caps so we read natural heights.
      bodies.forEach((b) => {
        if (b) {
          b.style.maxHeight = "";
          b.style.overflowY = "";
        }
      });

      // Only equalize when the cards are side by side (same top).
      const sameRow = cards.every(
        (c) => Math.abs(c.offsetTop - cards[0].offsetTop) < 1
      );
      if (!sameRow) return;

      const heights = cards.map((c) => c.getBoundingClientRect().height);
      const target = Math.min(...heights);

      cards.forEach((c, i) => {
        const body = bodies[i];
        if (!body) return;
        const excess = heights[i] - target;
        if (excess > 1) {
          const bodyHeight = body.getBoundingClientRect().height;
          body.style.maxHeight = `${Math.max(120, bodyHeight - excess)}px`;
          body.style.overflowY = "auto";
        }
      });
    };

    measure();
    // Re-measure after the Nivo map / fonts / data settle.
    const timers = [
      window.setTimeout(measure, 200),
      window.setTimeout(measure, 600),
    ];

    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(measure, 150);
    };
    window.addEventListener("resize", onResize);

    return () => {
      timers.forEach((t) => window.clearTimeout(t));
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
    };
  }, [children]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
