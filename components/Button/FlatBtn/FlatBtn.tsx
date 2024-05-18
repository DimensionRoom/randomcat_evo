'use client';
import React from 'react'
import { Prompt } from "next/font/google";
import styles from './FlatBtn.module.css';

const promt = Prompt({
  subsets: ["thai"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
});


export type Props = {
  text: string
  style: React.CSSProperties
  onClick?: () => void;
  disabled?: boolean;
}

const FlatBtn = ({
  text,
  style,
  onClick,
  disabled = false,
  ...props
}: Props): JSX.Element => {

  const handleClick = async () => {
    console.log('click')
  };

  return (
    <button disabled={disabled} className={styles.FlatBtn} style={{...promt.style,...style}} onClick={onClick}>
      <span className={styles.FlatBtnText}>{text}</span>
    </button>
  )
}

export default FlatBtn
