'use client';
import React from 'react'
import ForwardArrowIcon from '@/public/svgs/components/Button/forwardArrow';
import styles from './IconBtn.module.css';
import { quicksand } from "@/lib/fonts";

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
