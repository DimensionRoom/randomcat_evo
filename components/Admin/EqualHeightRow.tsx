"use client";

import React, { ReactNode, useEffect, useRef } from "react";

/**
 * Sizes a "fill" card to match a "reference" sibling card's height. The fill card's
 * scroll body is marked `data-equal-fill`; the OTHER direct child is the reference.
 *
 * The fill body's max-height is set to `referenceHeight - (fill card's non-body
 * height)` so the fill card ends up exactly the reference's height — its table grows
 * or shrinks (scrolling) to follow the reference. We uncap the body first so the
 * measurement isn't clamped by its CSS max-height (the bug that produced 360 instead
 * of 640). Stacked / single-column layouts are left at the CSS default.
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
      const fill = el.querySelector(
        "[data-equal-fill]"
      ) as HTMLElement | null;
      if (!fill) return;

      const cards = Array.from(el.children) as HTMLElement[];
      const fillCard = cards.find((c) => c.contains(fill));
      const refCard = cards.find((c) => c !== fillCard);
      if (!fillCard || !refCard) return;

      // Reset to the CSS default cap before measuring / when not equalizing.
      fill.style.maxHeight = "";
      fill.style.overflowY = "";

      // Only equalize when the cards are side by side.
      if (Math.abs(fillCard.offsetTop - refCard.offsetTop) > 1) return;

      // Uncap so the true geometry is read (not clamped by the CSS max-height).
      fill.style.maxHeight = "none";
      const refH = refCard.getBoundingClientRect().height;
      const fillCardH = fillCard.getBoundingClientRect().height;
      const fillBodyH = fill.getBoundingClientRect().height;
      const nonBody = fillCardH - fillBodyH; // title + map + paddings
      const desired = refH - nonBody;

      if (desired > 0 && desired < fillBodyH) {
        fill.style.maxHeight = `${Math.round(desired)}px`;
        fill.style.overflowY = "auto";
      } else {
        // Fill content already shorter than the reference (or no room): leave natural.
        fill.style.maxHeight = "";
        fill.style.overflowY = "";
      }
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
