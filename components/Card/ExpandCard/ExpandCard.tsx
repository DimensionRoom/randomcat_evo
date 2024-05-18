'use client';
import React, { useState } from 'react'
import Tag from '@/components/Tag/Tag';
import styles from './ExpandCard.module.css';
import KeyLockIcon from '@/public/svgs/components/ExpandCard/keyLock';
import KeyUnlockIcon from '@/public/svgs/components/ExpandCard/keyUnlock';
import FlatBtn from '@/components/Button/FlatBtn/FlatBtn';
import ExpandArrowIcon from '@/public/svgs/components/ExpandCard/expandArrow';


export type Props = {
  title: string;
  headingContent: string;
  content: string;
  expand?: boolean;
  lock?: boolean;
}

const ExpandCard = ({
  title = '-',
  headingContent = '-',
  content = '-',
  expand = false,
  lock = false,
  ...props
}: Props): JSX.Element => {

  const [expanded, setExpanded] = useState<boolean>(expand);
  const [lockContent, setLockContent] = useState<boolean>(lock);

  const handleLockClick = async () => {
    setLockContent((prev) => !prev);
  }

  const handleExpandClick = async () => {
    if (!content) return;
    console.log(expanded)
    setExpanded((prev) => !prev);
  };

  return (
    <div className={styles.CardItem}>
      <div className={styles.CardItemTitle}>
        <Tag text={title} />
        <div onClick={handleLockClick} className={styles.HeaderIconContainer}>
          {lockContent ? <KeyLockIcon width={20} height={20} />
            : <KeyUnlockIcon color='#5b5879' width={20} height={20} />}
        </div>
      </div>
      <div className={styles.CardItemHeaderContent}>
        {/* <div onClick={handleLockClick} className={styles.HeaderIconContainer}>
          {lockContent ? <KeyLockIcon width={20} height={20} />
            : <KeyUnlockIcon color='#5b5879' width={20} height={20} />}
        </div> */}
        <div className={styles.HeaderTextContainer}>
          <p className={styles.HeaderText}>{headingContent}</p>
        </div>
      </div>
      <div className={`${styles.CardItemBodyContent} ${expanded ? styles.Expanded : styles.NonExpanded} `}>
        <p>{content}</p>
      </div>
      <div onClick={handleExpandClick} className={`
        ${styles.CardItemActionContent} 
        ${expanded ? styles.Expanded : styles.NonExpanded} 
        ${content ? styles.HaveContent : styles.NonContent}`}>
        <ExpandArrowIcon width={30} height={30} disabled={!content ? true : false} />
      </div>
      <div className={styles.CardItemFooterContent}>
        <FlatBtn style={{ width: 100 }} text="Random" />
      </div>
    </div>
  )
}

export default ExpandCard
