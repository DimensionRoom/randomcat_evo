'use client';
import React, { useState } from 'react'
import { Quicksand, Mitr } from "next/font/google";
import Tag from '@/components/Tag/Tag';
import styles from './PhysicalCard.module.css';
import KeyLockIcon from '@/public/svgs/components/ExpandCard/keyLock';
import KeyUnlockIcon from '@/public/svgs/components/ExpandCard/keyUnlock';
import FlatBtn from '@/components/Button/FlatBtn/FlatBtn';
import ExpandArrowIcon from '@/public/svgs/components/ExpandCard/expandArrow';

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"]
});
const mitr = Mitr({
  subsets: ["thai"],
  weight: ["200", "300", "400", "500", "600", "700"]
});


export type Props = {
  className?: string;
  locale?: string;
  title: string;
  itemKey: string;
  headingContent: string;
  content: string;
  expand?: boolean;
  lock?: boolean;
  onLockContentChange: (key:string,lockContent: boolean) => void;
  onClick?: () => void;
}

const PhysicalCard = ({
  className = '',
  locale = 'en',
  title = '-',
  itemKey,
  headingContent = '-',
  content = '-',
  expand = false,
  lock = false,
  onLockContentChange,
  onClick,
  ...props
}: Props): JSX.Element => {

  const [expanded, setExpanded] = useState<boolean>(expand);
  const [lockContent, setLockContent] = useState<boolean>(lock);

  const handleLockClick = async () => {
    setLockContent((prev) => !prev);
    onLockContentChange(itemKey,!lockContent);
  }

  const handleExpandClick = async () => {
    if (!content) return;
    // console.log(expanded)
    setExpanded((prev) => !prev);
  };

  return (
    <div className={`${styles.CardItem} ${styles[className]}`}>
      <div className={styles.CardItemTitle}>
        <Tag className={className} text={title} />
        <div onClick={handleLockClick} className={styles.HeaderIconContainer}>
          {lockContent ? <KeyLockIcon width={20} height={20} />
            : <KeyUnlockIcon color='#ffffffa6' width={20} height={20} />}
        </div>
      </div>
      <div className={styles.CardItemHeaderContent}>
        {/* <div onClick={handleLockClick} className={styles.HeaderIconContainer}>
          {lockContent ? <KeyLockIcon width={20} height={20} />
            : <KeyUnlockIcon color='#5b5879' width={20} height={20} />}
        </div> */}
        <div className={styles.HeaderTextContainer}>
          <p className={`${styles.HeaderText} ${locale == 'th' ? `${mitr.className} ${styles.thfontbold}` : null}`}>{headingContent}</p>
        </div>
      </div>
      <div className={`${styles.CardItemBodyContent} ${expanded ? styles.Expanded : styles.NonExpanded} `}>
        <p className={`${styles.HeaderText} ${locale == 'th' ? `${mitr.className} ${styles.thfontbold}` : null}`}>{content}</p>
      </div>
      <div onClick={handleExpandClick} className={`
        ${styles.CardItemActionContent} 
        ${expanded ? styles.Expanded : styles.NonExpanded} 
        ${content ? styles.HaveContent : styles.NonContent}`}>
        <ExpandArrowIcon width={30} height={30} disabled={!content ? true : false} />
      </div>
      <div className={styles.CardItemFooterContent}>
        <FlatBtn className={styles.randomBtn} disabled={lockContent} style={{ width: 100 }} text="Random" onClick={onClick}/>
      </div>
    </div>
  )
}

export default PhysicalCard
