import React, { useRef, useCallback } from "react";
import { BoardCard as BoardCardType } from "./types/Card";
import styles from "./BoardCard.module.scss";

interface BoardCardProps {
  card: BoardCardType;
  onMove: (id: string, x: number, y: number) => void;
  onFlip: (id: string) => void;
  onRemove: (id: string) => void;
  backgroundGradient?: string;
}

const BoardCard = ({
  card,
  onMove,
  onFlip,
  onRemove,
  backgroundGradient = "#fff",
}: BoardCardProps): JSX.Element => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const dragStartTime = useRef(0);
  const dragStartPos = useRef({ x: 0, y: 0 });

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      dragStartTime.current = Date.now();
      dragStartPos.current = { x: e.clientX, y: e.clientY };

      const rect = cardRef.current?.getBoundingClientRect();
      if (rect) {
        isDragging.current = false;
        dragOffset.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        };
      }

      const handleMouseMove = (e: MouseEvent) => {
        const distance = Math.sqrt(
          Math.pow(e.clientX - dragStartPos.current.x, 2) +
            Math.pow(e.clientY - dragStartPos.current.y, 2)
        );

        if (distance > 5 && !isDragging.current) {
          isDragging.current = true;
        }

        if (!isDragging.current || !cardRef.current) return;

        const boardRect =
          cardRef.current.parentElement?.getBoundingClientRect();
        if (!boardRect) return;

        const newX = e.clientX - boardRect.left - dragOffset.current.x;
        const newY = e.clientY - boardRect.top - dragOffset.current.y;

        onMove(card.id, Math.max(0, newX), Math.max(0, newY));
      };

      const handleMouseUp = (event: MouseEvent) => {
        const dragDuration = Date.now() - dragStartTime.current;
        const distance = Math.sqrt(
          Math.pow(event.clientX - dragStartPos.current.x, 2) +
            Math.pow(event.clientY - dragStartPos.current.y, 2)
        );

        isDragging.current = false;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [card.id, onMove]
  );

  const handleDoubleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      if (!isDragging.current) {
        onFlip(card.id);
      }
    },
    [card.id, onFlip]
  );

  const handleRightClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      onRemove(card.id);
    },
    [card.id, onRemove]
  );

  return (
    <div
      ref={cardRef}
      className={`board-card ${styles.cardContainer}`}
      style={{
        left: card.x,
        top: card.y,
      }}
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
      onContextMenu={handleRightClick}
    >
      <div
        className={`${styles.cardInner} ${
          card.isFlipped ? styles.isFlipped : ""
        }`}
      >
        {/* Front */}
        <div
          className={`card-face ${styles.cardFace} ${styles.cardFront}`}
          style={{ background: backgroundGradient }}
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
          className={`card-face ${styles.cardFace} ${styles.cardBack} bg-gradient-to-br ${card.color}`}
          style={{ background: backgroundGradient }}
        >
          <div className={styles.cardContent}>
            <div className="flex-1 overflow-y-auto">
              <h3 className={styles.backTitle}>{card.backTitle}</h3>
              <div className={styles.backContent}>{card.backContent}</div>
            </div>
            <div className={styles.flipHint}>Double-click to flip back</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardCard;
