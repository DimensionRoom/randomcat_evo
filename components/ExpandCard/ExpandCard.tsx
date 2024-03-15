'use client';
import React from 'react'
import styles from './ExpandCard.module.css';


export type Props = {
  title: string;
  content: string;
}

const ExpandCard = ({
  title = '',
  content = '',
  ...props
}: Props): JSX.Element => {

  const handleClick = async () => {
    console.log('click')
  };

  return (
    <div className={styles.CardItem}>
      <div className='CardItemTitle'>
        <h2>{title}</h2>
      </div>
      <div className='CardItemContent'>
        <p>{content}</p>
      </div>
    </div>
  )
}

export default ExpandCard
