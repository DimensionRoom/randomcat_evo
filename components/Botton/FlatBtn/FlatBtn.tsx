'use client';
import React from 'react'
import styles from './FlatBtn.module.css';
import { Prompt } from "next/font/google";

const promt = Prompt({
  subsets: ["thai"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
});


export type Props = {
  text: string
  style: React.CSSProperties
}

const FlatBtn = ({
  text,
  style,
  ...props
}: Props): JSX.Element => {

  const handleClick = async () => {
    console.log('click')
  };

  return (
    <button className={styles.FlatBtn} style={{...promt.style,...style}}>
      <span className={styles.FlatBtnText}>{text}</span>
    </button>
  )
}

export default FlatBtn
