import React, { useState } from "react";
import { Card } from "./types/Card";
import styles from "./CardItem.module.scss";

interface GameCardProps {
  card: Card;
  onDragStart: (e: React.DragEvent, card: Card) => void;
  className?: string;
  backgroundGradient?: string;
}

const GameCard = ({
  card,
  onDragStart,
  className = "",
  backgroundGradient = "#fff",
}: GameCardProps): JSX.Element => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleDoubleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className={`${styles.sidebarCard} ${className}`}>
      <div
        className={`${styles.cardInner} ${isFlipped ? styles.isFlipped : ""}`}
        onDoubleClick={handleDoubleClick}
        data-flipped={isFlipped}
      >
        {/* Front */}
        <div
          className={`${styles.cardFace} ${styles.cardFront}`}
          style={{ background: backgroundGradient }}
          draggable
          onDragStart={(e) => onDragStart(e, card)}
          data-face="front"
        >
          <div className={styles.cardContent}>
            <div className={styles.frontTitle}>
              <h3>{card.frontTitle}</h3>
            </div>
            <div className={styles.flipHint}>Double-click to flip</div>
          </div>
        </div>

        {/* Back */}
        <div
          className={`${styles.cardFace} ${styles.cardBack}`}
          style={{ background: backgroundGradient }}
          draggable
          onDragStart={(e) => onDragStart(e, card)}
          data-face="back"
          data-export-ignore
        >
          <div className={styles.cardContent}>
            <div className={styles.frontTitle}>
              <h3>{card.backTitle}</h3>
            </div>
            <div className={styles.backContent}>{card.backContent}</div>
            <div className={styles.flipHint}>Double-click to flip</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
