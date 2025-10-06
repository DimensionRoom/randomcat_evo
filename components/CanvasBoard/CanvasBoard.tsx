import React, { useState } from "react";
import {
  BoardCard as BoardCardType,
  TextAnnotation as TextAnnotationType,
} from "./types/Card";
import { cardCategories } from "@/public/data/gamificationinbusiness/cards_en";
import BoardCard from './BoardCard';
import  TextAnnotation  from './TextAnnotation';
import styles from "./CanvasBoard.module.scss";

interface CanvasBoardProps {
  cards: BoardCardType[];
  textAnnotations: TextAnnotationType[];
  onDrop: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onCardMove: (id: string, x: number, y: number) => void;
  onCardFlip: (id: string) => void;
  onCardRemove: (id: string) => void;
  onTextAdd: (x: number, y: number, text: string) => void;
  onTextUpdate: (id: string, text: string) => void;
  onTextRemove: (id: string) => void;
  onTextMove: (id: string, x: number, y: number) => void;
}

const CanvasBoard = ({
  cards,
  textAnnotations,
  onDrop,
  onDragOver,
  onCardMove,
  onCardFlip,
  onCardRemove,
  onTextAdd,
  onTextUpdate,
  onTextRemove,
  onTextMove,
}: CanvasBoardProps): JSX.Element => {
  const [showTextInput, setShowTextInput] = useState(false);
  const [textInputPosition, setTextInputPosition] = useState({ x: 0, y: 0 });
  const [newText, setNewText] = useState("");

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();

    // Only show text input if clicking on empty space (not on cards or text)
    const target = e.target as HTMLElement;
    if (target.closest(".board-card") || target.closest(".text-annotation")) {
      return;
    }

    const boardRect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - boardRect.left;
    const y = e.clientY - boardRect.top;

    setTextInputPosition({ x, y });
    setShowTextInput(true);
    setNewText("");
  };

  const handleTextSubmit = () => {
    if (newText.trim()) {
      onTextAdd(textInputPosition.x, textInputPosition.y, newText.trim());
    }
    setShowTextInput(false);
    setNewText("");
  };

  const handleTextKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleTextSubmit();
    } else if (e.key === "Escape") {
      setShowTextInput(false);
      setNewText("");
    }
  };

  return (
    <div className={styles.canvasWrapper} data-wrapper>
      <div
        className={styles.canvasInner}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onContextMenu={handleRightClick}
      >
        {cards.length === 0 && textAnnotations.length === 0 && (
          <div className={styles.emptyState}>
            <div>
              <div className={styles.emptyIcon}>📋</div>
              <p className={styles.emptyTitle}>Your Creative Workspace</p>
              <p className={styles.emptySubtitle}>
                Drag cards here to start organizing your ideas
              </p>
              <p className={styles.emptyHint}>Right-click to add text notes</p>
            </div>
          </div>
        )}

        {/* Render cards */}
        {cards.map((card) => (
          <BoardCard
            key={card.id}
            card={card}
            onMove={onCardMove}
            onFlip={onCardFlip}
            onRemove={onCardRemove}
            backgroundGradient={cardCategories[card.category].color}
          />
        ))}

        {/* Render text annotations */}
        {textAnnotations.map((annotation) => (
          <TextAnnotation
            key={annotation.id}
            annotation={annotation}
            onUpdate={onTextUpdate}
            onRemove={onTextRemove}
            onMove={onTextMove}
          />
        ))}

        {/* Text input overlay */}
        {showTextInput && (
          <div
            className={styles.textInputOverlay}
            style={{ left: textInputPosition.x, top: textInputPosition.y }}
          >
            <textarea
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              onKeyDown={handleTextKeyDown}
              onBlur={handleTextSubmit}
              placeholder="Type your note..."
              className={styles.textArea}
              rows={1}
              autoFocus
            />
            <div className={styles.inputHint}>
              Enter to save • Esc to cancel
            </div>
          </div>
        )}
      </div>

      {(cards.length > 0 || textAnnotations.length > 0) && (
        <div className={styles.bottomHintBar}>
          <div className={styles.bottomHintContent}>
            <span>💡 Click to flip cards</span>
            <span>•</span>
            <span>🗑️ Right-click to remove</span>
            <span>•</span>
            <span>📝 Right-click empty space to add text</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CanvasBoard;
