'use client';
import React, { useState, useEffect } from 'react';
import { Quicksand } from "next/font/google";
import styles from './BackToTopBtn.module.css';

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"]
});

export type Props = {
  text?: string;
  style?: React.CSSProperties;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
};

const BackToTopBtn = ({
  text = "↑ Back to Top",
  style,
  className,
  onClick,
  disabled = false,
  ...props
}: Props): JSX.Element => {
  const [isVisible, setIsVisible] = useState(false);

const toggleVisibility = () => {
  console.log("ScrollY:", window.scrollY); // ดูค่าตรงนี้
  if (window.scrollY > 300) {
    setIsVisible(true);
  } else {
    setIsVisible(false);
  }
};
  const scrollToTop = () => {
    if (disabled) return;
    if (onClick) onClick();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

useEffect(() => {
  const toggleVisibility = () => {
    console.log('SCROLL CHECK:', window.scrollY);
    setIsVisible(window.scrollY > 300);
  };

  window.addEventListener('scroll', toggleVisibility, { passive: true });

  // log ทดสอบ
  console.log("Scroll listener added!");

  return () => {
    window.removeEventListener('scroll', toggleVisibility);
    console.log("Scroll listener removed!");
  };
}, []);
  return (
    <div className={styles.BackToTopBtnContainer}>
      <button
        onClick={scrollToTop}
        className={`${styles.BackToTopBtn} ${isVisible ? styles.visible : ''} ${className ?? ''}`}
        style={style}
        disabled={disabled}
        {...props}
      >
        {text}
      </button>
    </div>
  );
};

export default BackToTopBtn;