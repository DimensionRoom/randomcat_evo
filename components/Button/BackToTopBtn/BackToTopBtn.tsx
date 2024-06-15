'use client';
import React, { useState, useEffect } from 'react';
import { Quicksand } from "next/font/google";
import styles from './BackToTopBtn.module.css';


const quicksand = Quicksand({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"]
});


export type Props = {
    text?: string
    style?: React.CSSProperties
    className?: string
    onClick?: () => void;
    disabled?: boolean;
}

const BackToTopBtn = ({
    text,
    style,
    className,
    onClick,
    disabled = false,
    ...props
}: Props): JSX.Element => {
    const [isVisible, setIsVisible] = useState(true);

    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
  
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };
  
    useEffect(() => {
      window.addEventListener('scroll', toggleVisibility);
      return () => {
        window.removeEventListener('scroll', toggleVisibility);
      };
    }, []);
  
    

    return (
        <div className={styles.BackToTopBtnContainer}>
            {isVisible && (
                <button onClick={scrollToTop} className={styles.BackToTopBtn}>
                    ↑ Back to Top
                </button>
            )}
        </div>
    )
}

export default BackToTopBtn
