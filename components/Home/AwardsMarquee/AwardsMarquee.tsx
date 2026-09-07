"use client";
import React from "react";
import ImageWithSkeleton from "@/components/Media/ImageWithSkeleton/ImageWithSkeleton";
import { awards, type Award } from "@/public/data/awards";
import { mitr } from "@/lib/fonts";
import styles from "./AwardsMarquee.module.scss";

function AwardCard({
  award,
  isThai,
  thFont,
  hidden,
}: {
  award: Award;
  isThai: boolean;
  thFont: string;
  hidden?: boolean;
}) {
  const name = isThai ? award.nameTh : award.nameEn;
  return (
    <div className={styles.card} aria-hidden={hidden || undefined}>
      <span className={styles.logo}>
        <ImageWithSkeleton src={award.logo} alt={name} fill sizes="120px" />
      </span>
      <p className={`${styles.awardTitle} ${thFont}`}>{name}</p>
    </div>
  );
}

/**
 * A continuously scrolling band of awards.
 *
 * The list is rendered twice and the track slides by exactly half its width, so
 * the second copy takes over the moment the first scrolls out and the loop has
 * no visible seam. That only holds while the card spacing lives on the cards
 * themselves rather than in a flex `gap` on the track (see the stylesheet).
 *
 * Driving the motion from CSS keyframes rather than a slider library means
 * nothing runs in JavaScript while it scrolls.
 */
function AwardsMarquee({
  locale,
  title,
  subtitle,
}: {
  locale: string;
  title: string;
  subtitle: string;
}) {
  const isThai = locale === "th";
  const thFont = isThai ? `${mitr.className} ${styles.thfont}` : "";

  return (
    <section className={styles.awards}>
      <div className={styles.panel}>
        <div className={styles.intro}>
          <p className={`${styles.title} ${thFont}`}>
            {title}
            <span className={styles.trophy} aria-hidden="true">
              🏆
            </span>
          </p>
          <p className={`${styles.subtitle} ${thFont}`}>{subtitle}</p>
          <span className={styles.rule} aria-hidden="true" />
        </div>

        <div className={styles.viewport}>
          <div className={styles.track}>
            {awards.map((award) => (
              <AwardCard
                key={award.id}
                award={award}
                isThai={isThai}
                thFont={thFont}
              />
            ))}
            {/* The duplicate exists only to make the loop seamless, so it is
                hidden from assistive tech to avoid reading every award twice. */}
            {awards.map((award) => (
              <AwardCard
                key={`echo-${award.id}`}
                award={award}
                isThai={isThai}
                thFont={thFont}
                hidden
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// The home page holds scroll-driven state, so it re-renders while the band is
// mid-animation. Memoising keeps that from reconciling ten cards on every
// scroll; all three props are primitives, so the default shallow compare is
// exact rather than merely a heuristic.
export default React.memo(AwardsMarquee);
