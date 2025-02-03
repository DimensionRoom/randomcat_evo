import React from "react";
import styles from "./TempoControl.module.scss";

interface TempoControlProps {
  tempo: number;
  setTempo: (value: number | ((prev: number) => number)) => void;
  togglePlay: () => void;
  isPlaying: boolean;
}

export default function TempoControl({
  tempo,
  setTempo,
  togglePlay,
  isPlaying,
}: TempoControlProps) {
  return (
    <div className={styles.tempoControler}>
      <div className={styles.bpmDisplay}>{tempo}</div>
      <div className={styles.tempoContainer}>
        <button
          className={styles.controlButton}
          onClick={() => setTempo((prev) => Math.max(40, prev - 1))}
        >
          –
        </button>
        <input
          type="range"
          min="40"
          max="200"
          step="1"
          value={tempo}
          onChange={(e) => setTempo(Number(e.target.value))}
          className={styles.slider}
        />

        <button
          className={styles.controlButton}
          onClick={() => setTempo((prev) => Math.min(240, prev + 1))}
        >
          +
        </button>

        <button className={styles.playButton} onClick={togglePlay}>
          {isPlaying ? "⏹" : "►"}
        </button>
      </div>
    </div>
  );
}
