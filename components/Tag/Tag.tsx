'use client';
import React from 'react'
import styles from './Tag.module.css';


export type Props = {
  className?: string;
  text: string;
  radius?: number;
  bgColor?: string
  borderColor?: string
  fontColor?: string
}

const Tag = ({
  className = '',
  text = '',
  radius = 0,
  bgColor = '#b2abfb',
  borderColor = '#b2abfb',
  fontColor = '#fff',
  ...props
}: Props): JSX.Element => {

  const handleClick = async () => {
    console.log('click')
  };

  return (
    <div className={`${styles.TagContainer} ${styles[className]}`}>
      <div className={styles.TagContent}>
        <span>{text}</span>
      </div>
    </div>
  )
}

export default Tag
