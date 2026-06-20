"use client";

import React, { ReactNode, useEffect, useRef } from "react";

/**
 * Makes its direct child cards share the height of the SHORTER one, so the taller
 * card's flex body (.collapseBody / .scrollTable) scrolls and neither card has an
 * empty gap. CSS grid/flex can only size to the TALLER item (max-content), so the
 * min() of two siblings' heights has to be measured in JS.
 *
 * When the cards wrap onto separate rows (single-column / mobile) heights are left
 * natural.
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

      // Clear any applied height so we read each card's natural height.
      cards.forEach((c) => (c.style.height = ""));

      // Only equalize when the cards are side by side (same top).
      const sameRow = cards.every(
        (c) => Math.abs(c.offsetTop - cards[0].offsetTop) < 1
      );
      if (!sameRow) return;

      const min = Math.min(...cards.map((c) => c.offsetHeight));
      if (min > 0) cards.forEach((c) => (c.style.height = `${min}px`));
    };

    // Run now and again after the Nivo map / fonts / data settle.
    measure();
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
