"use client";
import React from "react";

import styles from "./toggleBtn.module.scss";
import { quicksand, mitr } from "@/lib/fonts";

interface ToggleProps {
  pressed: boolean;
  onPressedChange: (pressed: boolean) => void;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  locale: string;
}

const ToggleBtn: React.FC<ToggleProps> = ({
  pressed,
  onPressedChange,
  children,
  className = "",
  style,
  locale,
}) => {
  return (
    <button
      type="button"
      onClick={() => onPressedChange(!pressed)}
      style={{ ...style }}
      className={`
        ${styles.toggleBtn} 
        ${pressed ? styles.pressed : ""} 
        ${locale == "th" ? `${mitr.className} ${styles.thfontbold}` : `${quicksand.className}`}
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default ToggleBtn;
