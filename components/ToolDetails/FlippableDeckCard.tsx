"use client";

import { useState } from "react";
import DeckCard, { type DeckCardTheme } from "./DeckCard";
import type { ExampleCard } from "./loadExampleCards";
import styles from "./FlippableDeckCard.module.scss";

type Props = {
  card: ExampleCard;
  theme: DeckCardTheme;
  toolTitle: string;
  brandLabel?: string;
  showFrontLabel: string;
  showBackLabel: string;
  initiallyFlipped?: boolean;
};

export default function FlippableDeckCard({ showFrontLabel, showBackLabel, initiallyFlipped = false, ...props }: Props) {
  const [flipped, setFlipped] = useState(initiallyFlipped);
  const action = flipped ? showFrontLabel : showBackLabel;

  return (
    <div className={styles.card}>
      <div className={styles.rotator} data-flipped={flipped}>
        <div className={styles.front} aria-hidden={flipped}>
          <DeckCard {...props} side="front" />
        </div>
        <div className={styles.back} aria-hidden={!flipped}>
          <DeckCard {...props} side="back" />
        </div>
      </div>
      <button type="button" className={styles.control}
        onClick={() => setFlipped(value => !value)}
        aria-label={`${props.card.title}: ${action}`} />
    </div>
  );
}
