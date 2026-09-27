import React from "react";
import { Sparkle } from "lucide-react";
import SiteLogo from "@/public/svgs/siteLogo";
import { quicksand, mitr } from "@/lib/fonts";
import type { ExampleCard } from "./loadExampleCards";
import styles from "./DeckCard.module.scss";

export type DeckCardTheme = "blue" | "purple" | "orange" | "teal" | "pink" | "coral" | "rose" | {
  primary: string;
  tint: string;
  accent: string;
};

export type DeckCardProps = {
  theme: DeckCardTheme;
  toolTitle: string;
  brandLabel?: string;
  seriesLabel?: string;
  className?: string;
  style?: React.CSSProperties;
} & (
  | { side: "front"; card: ExampleCard }
  | { side: "back"; card: Pick<ExampleCard, "category" | "categoryPrompt" | "backHeading" | "backTitle" | "backSubtitle"> }
);

/** Reusable 60 × 100 card. Custom palettes apply to both faces. */
export default function DeckCard({ theme, toolTitle, brandLabel = toolTitle,
  seriesLabel = "A Series of ThinkTools", className = "", style, ...props
}: DeckCardProps) {
  const palette = typeof theme === "string" ? undefined : {
    "--deck-primary": theme.primary,
    "--deck-tint": theme.tint,
    "--deck-accent": theme.accent,
  } as React.CSSProperties;
  const card = props.card;
  // A curated card names its own back ("DESIGN GENRE" / "Story Design");
  // otherwise the back shows the category and the tool.
  const category = (props.side === "back" && card.backTitle) || card.category;
  const backLine = (props.side === "back" && card.backSubtitle) || toolTitle;
  const categorySize = Math.min(13.5, 110 / Math.max(...category.split(/\s+/).map(word => word.length)));
  // Shrink the front title only when its longest word would not fit on one
  // line (the body is ~79% of the card wide), so "Pharmaceutical" stays whole
  // instead of being broken mid-word.
  const compact = props.side === "front" &&
    props.card.title.length + props.card.content.length > 180;
  const longestTitleWord = props.side === "front"
    ? Math.max(...props.card.title.split(/\s+/).map(word => word.length)) : 0;
  const titleFit = 76 / (0.64 * Math.max(longestTitleWord, 1));
  const titleStyle = titleFit < (compact ? 8.5 : 11) ? { fontSize: `${titleFit}cqi` } : undefined;
  const isThai = props.side === "front" && /[\u0e00-\u0e7f]/.test(props.card.title + props.card.content);

  return (
    <div className={`${styles.card} ${quicksand.className} ${typeof theme === "string" ? styles[theme] : ""} ${className}`}
      style={{ ...palette, ...style }}>
      <div className={`${styles.face} ${styles[props.side]}`}>
        <div className={styles.pattern} aria-hidden="true" />
        {props.side === "back" ? (
          <div className={styles.backContent} data-heading={Boolean(card.backHeading)}>
            <span className={styles.logo} aria-hidden="true"><SiteLogo color="currentColor" /></span>
            {!card.backTitle && (card.backHeading || card.categoryPrompt) && <p className={styles.backPrompt}>{card.backHeading || card.categoryPrompt}</p>}
            <p className={styles.backCategory} style={{ fontSize: `${categorySize}cqi` }}>{category}</p>
            <p className={styles.backTool}>{backLine}</p>
          </div>
        ) : (
          <>
            <div className={styles.frontBrand}>
              <span className={styles.brandMark}><Sparkle aria-hidden="true" fill="currentColor" /></span>
              <span>{brandLabel}</span>
            </div>
            <div className={`${styles.frontBody} ${isThai ? mitr.className : ""}`}
              data-density={compact ? "compact" : "normal"}>
              <p className={styles.frontTitle} style={titleStyle}>{props.card.title}</p>
              {props.card.content && <p className={styles.frontDescription}>{props.card.content}</p>}
              <span className={styles.categoryTag}>
                {[props.card.categoryPrompt, props.card.category].filter(Boolean).join("-")}
              </span>
            </div>
            <div className={styles.frontFooter}>
              <span>{seriesLabel}</span>
              <strong>{props.card.code}</strong>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
