import React from "react";
import type { SceneId } from "@/public/data/musicband/ensembles";
import styles from "./VenueScene.module.scss";

/**
 * Venue backdrops are drawn with gradients and inline SVG rather than bitmaps:
 * they stay sharp at any stage size, need no assets, and html2canvas renders
 * them faithfully into the PDF export.
 */
export default function VenueScene({
  scene,
  className,
}: {
  scene: SceneId;
  className?: string;
}) {
  return (
    <div
      className={`${styles.scene} ${styles[scene]} ${className ?? ""}`}
      aria-hidden="true"
    >
      {scene === "chamber" && (
        <svg viewBox="0 0 1200 700" preserveAspectRatio="none">
          <rect x="0" y="0" width="1200" height="430" fill="#f3e3c4" />
          {[140, 330, 870, 1060].map((x) => (
            <g key={x}>
              <rect x={x} y="70" width="70" height="330" rx="35" fill="#e3cda3" />
              <rect x={x + 12} y="80" width="46" height="310" rx="23" fill="#efe0c2" />
            </g>
          ))}
          <path d="M480 60h240v340H480z" fill="#e8d5b0" />
          <path d="M520 100h160v260H520z" fill="#d8bf92" opacity="0.55" />
          <rect x="0" y="430" width="1200" height="270" fill="#a9793f" />
          <rect x="0" y="430" width="1200" height="16" fill="#8c5f2c" />
          {Array.from({ length: 13 }).map((_, i) => (
            <rect
              key={i}
              x={i * 95}
              y="446"
              width="4"
              height="254"
              fill="#8c5f2c"
              opacity="0.5"
            />
          ))}
        </svg>
      )}

      {scene === "orchestra" && (
        <svg viewBox="0 0 1200 700" preserveAspectRatio="none">
          <rect x="0" y="0" width="1200" height="400" fill="#2b1d3d" />
          <path d="M0 0h1200v120q-600 90-1200 0z" fill="#3a2851" />
          {[90, 300, 900, 1110].map((x) => (
            <rect key={x} x={x} y="120" width="56" height="280" rx="28" fill="#4a3567" />
          ))}
          <ellipse cx="600" cy="150" rx="330" ry="90" fill="#f0d896" opacity="0.16" />
          {[420, 600, 780].map((x) => (
            <circle key={x} cx={x} cy="90" r="16" fill="#f7e6b4" opacity="0.85" />
          ))}
          <rect x="0" y="400" width="1200" height="300" fill="#5c3b22" />
          <ellipse cx="600" cy="420" rx="520" ry="46" fill="#6d472a" />
          <ellipse cx="600" cy="470" rx="400" ry="34" fill="#7d5231" opacity="0.7" />
        </svg>
      )}

      {scene === "jazz" && (
        <svg viewBox="0 0 1200 700" preserveAspectRatio="none">
          <rect x="0" y="0" width="1200" height="420" fill="#14141f" />
          <rect x="60" y="60" width="1080" height="300" rx="10" fill="#1d1b2c" />
          <path d="M60 360h1080v20H60z" fill="#2a2740" />
          {[200, 600, 1000].map((x) => (
            <g key={x}>
              <path d={`M${x} 60v70`} stroke="#3a3552" strokeWidth="4" />
              <circle cx={x} cy="140" r="26" fill="#c98f1f" opacity="0.9" />
              <ellipse cx={x} cy="200" rx="120" ry="80" fill="#c98f1f" opacity="0.12" />
            </g>
          ))}
          <rect x="0" y="420" width="1200" height="280" fill="#2c1f18" />
          <rect x="0" y="420" width="1200" height="14" fill="#c98f1f" opacity="0.5" />
          {Array.from({ length: 16 }).map((_, i) => (
            <rect key={i} x={i * 78} y="434" width="3" height="266" fill="#1d1410" opacity="0.7" />
          ))}
        </svg>
      )}

      {scene === "folk" && (
        <svg viewBox="0 0 1200 700" preserveAspectRatio="none">
          <rect x="0" y="0" width="1200" height="440" fill="#f6ead6" />
          <rect x="90" y="80" width="300" height="220" rx="10" fill="#cfe3ee" />
          <rect x="90" y="80" width="300" height="220" rx="10" fill="none" stroke="#b28a5c" strokeWidth="12" />
          <path d="M240 80v220M90 190h300" stroke="#b28a5c" strokeWidth="10" />
          <rect x="820" y="120" width="290" height="180" rx="8" fill="#e3d0b4" />
          {[860, 940, 1020].map((x) => (
            <circle key={x} cx={x} cy="210" r="26" fill="#7fb069" opacity="0.55" />
          ))}
          <rect x="0" y="440" width="1200" height="260" fill="#c69a63" />
          <rect x="0" y="440" width="1200" height="12" fill="#a97f4c" />
          {Array.from({ length: 10 }).map((_, i) => (
            <rect key={i} x={i * 122} y="452" width="5" height="248" fill="#a97f4c" opacity="0.45" />
          ))}
        </svg>
      )}

      {scene === "string" && (
        <svg viewBox="0 0 1200 700" preserveAspectRatio="none">
          <rect x="0" y="0" width="1200" height="430" fill="#0d0b16" />
          {[
            { x: 180, c: "#c0392b" },
            { x: 430, c: "#e0567a" },
            { x: 770, c: "#6a5acd" },
            { x: 1020, c: "#c0392b" },
          ].map((beam) => (
            <polygon
              key={beam.x}
              points={`${beam.x},0 ${beam.x + 60},0 ${beam.x + 230},430 ${beam.x - 170},430`}
              fill={beam.c}
              opacity="0.16"
            />
          ))}
          <rect x="0" y="0" width="1200" height="40" fill="#1a1626" />
          {Array.from({ length: 14 }).map((_, i) => (
            <circle key={i} cx={45 + i * 85} cy="20" r="11" fill="#ffd9a0" opacity="0.8" />
          ))}
          <rect x="340" y="120" width="520" height="230" rx="8" fill="#191527" opacity="0.9" />
          <rect x="0" y="430" width="1200" height="270" fill="#17131f" />
          <rect x="0" y="430" width="1200" height="16" fill="#c0392b" opacity="0.55" />
        </svg>
      )}

      {scene === "stringcombo" && (
        <svg viewBox="0 0 1200 700" preserveAspectRatio="none">
          {/* Open-air evening sky */}
          <rect x="0" y="0" width="1200" height="400" fill="#241a3d" />
          <circle cx="980" cy="90" r="42" fill="#ffe9b8" opacity="0.75" />
          {[
            [120, 70],
            [300, 40],
            [520, 96],
            [700, 56],
            [860, 130],
            [1120, 80],
          ].map(([cx, cy]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3" fill="#fff6d8" opacity="0.8" />
          ))}
          {/* Truss roof over the stage */}
          <path d="M120 150h960v22H120z" fill="#39304f" />
          <path d="M120 150l70-60h820l70 60z" fill="#2c2440" />
          {[260, 460, 660, 860].map((x) => (
            <g key={x}>
              <path d={`M${x} 172v34`} stroke="#4a3f66" strokeWidth="6" />
              <circle cx={x} cy="216" r="18" fill="#e0567a" opacity="0.9" />
              <polygon
                points={`${x - 90},400 ${x + 90},400 ${x + 18},226 ${x - 18},226`}
                fill="#e0567a"
                opacity="0.14"
              />
            </g>
          ))}
          {/* Speaker stacks */}
          {[150, 1010].map((x) => (
            <g key={x}>
              <rect x={x} y="230" width="52" height="170" rx="6" fill="#2a2340" />
              <circle cx={x + 26} cy="272" r="17" fill="#3d3358" />
              <circle cx={x + 26} cy="330" r="17" fill="#3d3358" />
            </g>
          ))}
          {/* Stage deck and crowd barrier */}
          <rect x="0" y="400" width="1200" height="300" fill="#1d1830" />
          <rect x="0" y="400" width="1200" height="16" fill="#e0567a" opacity="0.6" />
          <rect x="0" y="620" width="1200" height="80" fill="#161226" opacity="0.85" />
        </svg>
      )}
    </div>
  );
}
