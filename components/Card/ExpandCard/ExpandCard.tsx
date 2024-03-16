'use client';
import React from 'react'
import Tag from '@/components/Tag/Tag';
import styles from './ExpandCard.module.css';
import KeyLockIcon from '@/public/svgs/components/ExpandCard/keyLock';


export type Props = {
  title: string;
  headingContent: string;
  content: string;
}

const ExpandCard = ({
  title = '-',
  headingContent = '-',
  content = '-',
  ...props
}: Props): JSX.Element => {

  const handleClick = async () => {
    console.log('click')
  };

  return (
    <div className={styles.CardItem}>
      <div className={styles.CardItemTitle}>
        <Tag text={title} />
      </div>
      <div className={styles.CardItemHeaderContent}>
        <div className={styles.HeaderIconContainer}>
          <KeyLockIcon width={20} height={20}/>
        </div>
        <div className={styles.HeaderTextContainer}>
          <p className={styles.HeaderText}>{headingContent}</p>
        </div>
      </div>
    </div>
  )
}

export default ExpandCard
