'use client';
import React from 'react'
import ForwardArrowIcon from '@/public/svgs/components/Button/forwardArrow';
import styles from './IconBtn.module.css';
import { Quicksand } from "next/font/google";

const quicksand = Quicksand({
  // subsets: ["thai"],
  // weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"]
});


export type Props = {
  onClick?: () => void;
}

const IconBtn = ({
  onClick,
  ...props
}: Props): JSX.Element => {

  const handleClick = async () => {
    console.log('click')
  };

  return (
    <button className={styles.IconBtn} style={quicksand.style} onClick={onClick}>
      <span className={styles.IconBtnText}>Random all</span>
      <div style={{ height: "2em", padding: 7, backgroundColor: "#10092b", borderRadius: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <ForwardArrowIcon />
      </div>
    </button>
  )
}

export default IconBtn
