"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ImageWithSkeleton from "@/components/Media/ImageWithSkeleton/ImageWithSkeleton";
import type { Instrument } from "@/public/data/musicband/instruments";
import { useStageDrag } from "./useStageDrag";
import { clampScale, SCALE_STEP, type StagePiece } from "./types";
import styles from "./BandStage.module.scss";

interface Props {
  piece: StagePiece;
  instrument: Instrument;
  label: string;
  selected: boolean;
  stageRef: React.RefObject<HTMLElement>;
  labels: { remove: string; smaller: string; bigger: string };
  onMove: (uid: string, x: number, y: number) => void;
  onScale: (uid: string, scale: number) => void;
  onSelect: (uid: string) => void;
  onRemove: (uid: string) => void;
}

export default function StagePieceItem({
  piece,
  instrument,
  label,
  selected,
  stageRef,
  labels,
  onMove,
  onScale,
  onSelect,
  onRemove,
}: Props) {
  const { dragHandlers } = useStageDrag({
    stageRef,
    onMove: (x, y) => onMove(piece.uid, x, y),
    onDragStart: () => onSelect(piece.uid),
  });

  // Corner handle: scale follows how far the pointer moves away from the
  // piece's centre, relative to where the drag started. Listeners go on window
  // for the same reason as useStageDrag — a re-render drops pointer capture.
  const [resizing, setResizing] = useState(false);
  const resizeStart = useRef({ dist: 0, scale: 1 });

  const distanceFromCentre = useCallback(
    (clientX: number, clientY: number) => {
      const stage = stageRef.current;
      if (!stage) return 0;
      const stageRect = stage.getBoundingClientRect();
      const cx = stageRect.left + (piece.x / 100) * stageRect.width;
      const cy = stageRect.top + (piece.y / 100) * stageRect.height;
      return Math.hypot(clientX - cx, clientY - cy);
    },
    [piece.x, piece.y, stageRef]
  );

  const handleResizeDown = (event: React.PointerEvent<HTMLElement>) => {
    event.stopPropagation();
    resizeStart.current = {
      dist: distanceFromCentre(event.clientX, event.clientY) || 1,
      scale: piece.scale,
    };
    setResizing(true);
    onSelect(piece.uid);
  };

  useEffect(() => {
    if (!resizing) return;

    const handleMove = (event: PointerEvent) => {
      const dist = distanceFromCentre(event.clientX, event.clientY);
      const ratio = dist / resizeStart.current.dist;
      onScale(piece.uid, clampScale(resizeStart.current.scale * ratio));
    };
    const stop = () => setResizing(false);

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", stop);
    window.addEventListener("pointercancel", stop);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", stop);
      window.removeEventListener("pointercancel", stop);
    };
  }, [resizing, distanceFromCentre, onScale, piece.uid]);

  return (
    <div
      className={`${styles.piece} ${selected ? styles.pieceSelected : ""}`}
      style={{
        left: `${piece.x}%`,
        top: `${piece.y}%`,
        zIndex: piece.z,
        ["--piece-scale" as string]: piece.scale,
      }}
      {...dragHandlers}
      onClick={() => onSelect(piece.uid)}
      role="button"
      tabIndex={0}
      aria-label={label}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect(piece.uid);
        }
        if (event.key === "Delete" || event.key === "Backspace") {
          event.preventDefault();
          onRemove(piece.uid);
        }
      }}
    >
      <div className={styles.pieceImage}>
        <ImageWithSkeleton src={instrument.image} alt={label} fill sizes="220px" />
      </div>

      {selected && (
        <>
          <div className={styles.pieceToolbar} data-html2canvas-ignore="true">
            <button
              type="button"
              className={styles.pieceButton}
              title={labels.smaller}
              aria-label={labels.smaller}
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                onScale(piece.uid, clampScale(piece.scale - SCALE_STEP));
              }}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 12h14" />
              </svg>
            </button>
            <button
              type="button"
              className={styles.pieceButton}
              title={labels.bigger}
              aria-label={labels.bigger}
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                onScale(piece.uid, clampScale(piece.scale + SCALE_STEP));
              }}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </button>
            <button
              type="button"
              className={`${styles.pieceButton} ${styles.pieceRemove}`}
              title={labels.remove}
              aria-label={labels.remove}
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                onRemove(piece.uid);
              }}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          <span
            className={styles.pieceHandle}
            data-html2canvas-ignore="true"
            onPointerDown={handleResizeDown}
            onClick={(e) => e.stopPropagation()}
            aria-hidden="true"
          />
        </>
      )}
    </div>
  );
}
