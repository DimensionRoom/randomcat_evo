import React, { useState, useRef, useEffect } from "react";
import { X, Edit3 } from "lucide-react";
import { TextAnnotation as TextAnnotationType } from "./types/Card";
import styles from "./TextAnnotation.module.scss";

interface TextAnnotationProps {
  annotation: TextAnnotationType;
  onUpdate: (id: string, text: string) => void;
  onRemove: (id: string) => void;
  onMove: (id: string, x: number, y: number) => void;
}

const TextAnnotation = ({
  annotation,
  onUpdate,
  onRemove,
  onMove,
}: TextAnnotationProps): JSX.Element => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(annotation.text);
  const [isDragging, setIsDragging] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const dragOffset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isEditing) return;

    e.preventDefault();
    e.stopPropagation();

    const rect = textRef.current?.getBoundingClientRect();
    if (rect) {
      dragOffset.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!textRef.current) return;

      setIsDragging(true);
      const boardRect = textRef.current.parentElement?.getBoundingClientRect();
      if (!boardRect) return;

      const newX = e.clientX - boardRect.left - dragOffset.current.x;
      const newY = e.clientY - boardRect.top - dragOffset.current.y;

      onMove(annotation.id, Math.max(0, newX), Math.max(0, newY));
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      setIsEditing(true);
    }
  };

  const handleSave = () => {
    if (editText.trim()) {
      onUpdate(annotation.id, editText.trim());
    } else {
      onRemove(annotation.id);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    } else if (e.key === "Escape") {
      setEditText(annotation.text);
      setIsEditing(false);
    }
  };

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onRemove(annotation.id);
  };

  if (isEditing) {
   return (
    <div
      className={styles.editingContainer}
      style={{ left: annotation.x, top: annotation.y }}
    >
      <textarea
        ref={inputRef}
        value={editText}
        onChange={(e) => setEditText(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleSave}
        className={styles.editTextArea}
        style={{
          fontSize: `${annotation.fontSize}px`,
          color: annotation.color,
        }}
        rows={Math.max(1, editText.split("\n").length)}
      />
    </div>
  );
}


return (
  <div
    ref={textRef}
    className={styles.annotationWrapper}
    style={{ left: annotation.x, top: annotation.y }}
    onMouseDown={handleMouseDown}
    onDoubleClick={handleDoubleClick}
    onContextMenu={handleRightClick}
    title="Double-click to edit • Right-click to delete"
  >
    <div className={styles.bgLayer1} />
    <div className={styles.bgLayer2} />
    <div
      className={styles.noteMain}
      style={{
        fontSize: `${annotation.fontSize}px`,
        color: annotation.color,
      }}
    >
      <div className={styles.noteFold} />
      <div className={styles.noteText}>{annotation.text}</div>

      <div className={styles.hoverControls}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsEditing(true);
          }}
          className={`${styles.controlButton} ${styles.edit}`}
          title="Edit text"
        >
          <Edit3 size={10} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove(annotation.id);
          }}
          className={`${styles.controlButton} ${styles.delete}`}
          title="Delete text"
        >
          <X size={10} />
        </button>
      </div>
    </div>
  </div>
);
};

export default TextAnnotation;
