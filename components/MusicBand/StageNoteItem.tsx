"use client";
import React, { useEffect, useRef, useState } from "react";
import { useStageDrag } from "./useStageDrag";
import type { StageNote } from "./types";
import styles from "./BandStage.module.scss";

interface Props {
  note: StageNote;
  selected: boolean;
  placeholder: string;
  removeLabel: string;
  stageRef: React.RefObject<HTMLElement>;
  onMove: (uid: string, x: number, y: number) => void;
  onChange: (uid: string, text: string) => void;
  onSelect: (uid: string) => void;
  onRemove: (uid: string) => void;
}

export default function StageNoteItem({
  note,
  selected,
  placeholder,
  removeLabel,
  stageRef,
  onMove,
  onChange,
  onSelect,
  onRemove,
}: Props) {
  // A brand-new note opens straight into edit mode so it can be typed at once.
  const [editing, setEditing] = useState(note.text === "");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { dragHandlers, didMove } = useStageDrag({
    stageRef,
    onMove: (x, y) => onMove(note.uid, x, y),
    onDragStart: () => onSelect(note.uid),
  });

  useEffect(() => {
    if (editing) textareaRef.current?.focus();
  }, [editing]);

  const stopEditing = () => {
    setEditing(false);
    // An empty note has nothing to show or export — drop it.
    if (note.text.trim() === "") onRemove(note.uid);
  };

  return (
    <div
      className={`${styles.note} ${selected ? styles.noteSelected : ""}`}
      style={{ left: `${note.x}%`, top: `${note.y}%`, zIndex: note.z }}
      {...(editing ? {} : dragHandlers)}
      onClick={() => {
        if (!didMove()) onSelect(note.uid);
      }}
      onDoubleClick={() => setEditing(true)}
    >
      {editing ? (
        <textarea
          ref={textareaRef}
          className={styles.noteInput}
          value={note.text}
          placeholder={placeholder}
          onChange={(e) => onChange(note.uid, e.target.value)}
          onBlur={stopEditing}
          onKeyDown={(e) => {
            if (e.key === "Escape" || (e.key === "Enter" && !e.shiftKey)) {
              e.preventDefault();
              stopEditing();
            }
          }}
          rows={2}
        />
      ) : (
        <p className={styles.noteText}>{note.text}</p>
      )}

      {selected && !editing && (
        <div className={styles.noteToolbar} data-html2canvas-ignore="true">
          <button
            type="button"
            className={styles.pieceButton}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              setEditing(true);
            }}
            aria-label="Edit"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 20h4l10-10-4-4L4 16v4z" />
            </svg>
          </button>
          <button
            type="button"
            className={`${styles.pieceButton} ${styles.pieceRemove}`}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              onRemove(note.uid);
            }}
            aria-label={removeLabel}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
