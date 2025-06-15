"use client";
import React from "react";
import { Quicksand, Mitr } from "next/font/google";
import styles from "./FlatBtn.module.css";

// const promt = Prompt({
//   subsets: ["thai"],
//   weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
// });

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const mitr = Mitr({
  subsets: ["thai"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

export type Props = {
  text: string;
  style?: React.CSSProperties;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  icon?: React.ReactNode;
  locale?: string;
};

const FlatBtn = ({
  text,
  style,
  className,
  onClick,
  disabled = false,
  icon,
  locale = "en",
  ...props
}: Props): JSX.Element => {
  const handleClick = async () => {
    console.log("click");
  };

  return (
    <button
      disabled={disabled}
      className={`${styles.FlatBtn} ${className} ${locale == "th" ? `${mitr.className} ${styles.thfontbold}` : `${quicksand.className}`}`}
      style={{...style }}
      onClick={onClick}
    >
      {icon ? (
        <span className={styles.Icon}>{icon}</span>
      ) : (
        <span className={styles.FlatBtnText}>{text}</span>
      )}
    </button>
  );
};

export default FlatBtn;
