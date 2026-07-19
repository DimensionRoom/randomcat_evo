"use client";
import React, { useEffect } from "react";
import ImageWithSkeleton from "@/components/Media/ImageWithSkeleton/ImageWithSkeleton";
import styles from "./QuickPrototype.module.scss";

interface BookSpreadProps {
  pair: number | null;
  onClose: () => void;
  leftAlt: string;
  rightAlt: string;
  closeLabel: string;
}

const IMG_BASE = "/image/quick_prototype";

export default function BookSpread({
  pair,
  onClose,
  leftAlt,
  rightAlt,
  closeLabel,
}: BookSpreadProps) {
  useEffect(() => {
    if (pair === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [pair, onClose]);

  if (pair === null) return null;

  return (
    <div className={styles.spreadBackdrop} onClick={onClose}>
      <div
        className={styles.book}
        onClick={(e) => e.stopPropagation()}
        key={pair}
      >
        <button
          className={styles.spreadClose}
          onClick={onClose}
          aria-label={closeLabel}
        >
          &times;
        </button>
        <div className={styles.pageLeft}>
          <ImageWithSkeleton
            src={`${IMG_BASE}/L${pair}.webp`}
            alt={leftAlt}
            fill
            priority
            sizes="(max-width: 768px) 90vw, 40vw"
          />
        </div>
        <div className={styles.pageRight}>
          <ImageWithSkeleton
            src={`${IMG_BASE}/R${pair}.webp`}
            alt={rightAlt}
            fill
            priority
            sizes="(max-width: 768px) 90vw, 40vw"
          />
        </div>
      </div>
    </div>
  );
}
