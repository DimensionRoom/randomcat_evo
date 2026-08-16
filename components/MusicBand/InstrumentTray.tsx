"use client";
import React, { useRef, useState } from "react";
import ImageWithSkeleton from "@/components/Media/ImageWithSkeleton/ImageWithSkeleton";
import {
  instrumentCategories,
  type Instrument,
} from "@/public/data/musicband/instruments";
import styles from "./BandStage.module.scss";

interface Props {
  isThai: boolean;
  labels: { scrollLeft: string; scrollRight: string };
  onPick: (instrument: Instrument) => void;
}

export default function InstrumentTray({ isThai, labels, onPick }: Props) {
  const [activeCategory, setActiveCategory] = useState(
    instrumentCategories[0].id
  );
  const railRef = useRef<HTMLDivElement>(null);

  const category =
    instrumentCategories.find((entry) => entry.id === activeCategory) ??
    instrumentCategories[0];

  const scrollBy = (direction: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollBy({ left: direction * rail.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <div className={styles.tray}>
      <div className={styles.categoryBar} role="tablist">
        {instrumentCategories.map((entry) => (
          <button
            key={entry.id}
            type="button"
            role="tab"
            aria-selected={entry.id === activeCategory}
            className={`${styles.categoryTab} ${
              entry.id === activeCategory ? styles.categoryTabActive : ""
            }`}
            style={{ ["--accent" as string]: entry.accent }}
            onClick={() => {
              setActiveCategory(entry.id);
              railRef.current?.scrollTo({ left: 0 });
            }}
          >
            {isThai ? entry.nameTh : entry.nameEn}
          </button>
        ))}
      </div>

      <div className={styles.railWrap}>
        <button
          type="button"
          className={`${styles.railArrow} ${styles.railArrowLeft}`}
          onClick={() => scrollBy(-1)}
          aria-label={labels.scrollLeft}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M15 5l-7 7 7 7" />
          </svg>
        </button>

        <div className={styles.rail} ref={railRef}>
          {category.instruments.map((instrument) => (
            <button
              key={instrument.id}
              type="button"
              className={styles.trayCard}
              style={{ ["--accent" as string]: category.accent }}
              onClick={() => onPick(instrument)}
              title={isThai ? instrument.hintTh : instrument.hintEn}
            >
              <span className={styles.trayImage}>
                <ImageWithSkeleton
                  src={instrument.image}
                  alt={isThai ? instrument.nameTh : instrument.nameEn}
                  fill
                  sizes="140px"
                />
              </span>
              <span className={styles.trayName}>
                {isThai ? instrument.nameTh : instrument.nameEn}
              </span>
              <span className={styles.trayHint}>
                {isThai ? instrument.hintTh : instrument.hintEn}
              </span>
            </button>
          ))}
        </div>

        <button
          type="button"
          className={`${styles.railArrow} ${styles.railArrowRight}`}
          onClick={() => scrollBy(1)}
          aria-label={labels.scrollRight}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
