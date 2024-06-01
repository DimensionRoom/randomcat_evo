'use client';
import React, { useState } from 'react'
import { Quicksand, Mitr } from "next/font/google";
import styles from './HorizonCard.module.css';
import KeyLockIcon from '@/public/svgs/components/ExpandCard/keyLock';
import KeyUnlockIcon from '@/public/svgs/components/ExpandCard/keyUnlock';
import FlatBtn from '@/components/Button/FlatBtn/FlatBtn';

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"]
});
const mitr = Mitr({
  subsets: ["thai"],
  weight: ["200", "300", "400", "500", "600", "700"]
});


export type Props = {
  locale?: string;
  title: string;
  itemKey: string;
  headingContent: string;
  content: string;
  expand?: boolean;
  lock?: boolean;
  onLockContentChange: (key: string, lockContent: boolean) => void;
  onClick?: () => void;
}

const HorizonCard = ({
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
    onLockContentChange(itemKey, !lockContent);
  }

  const handleExpandClick = async () => {
    if (!content) return;
    console.log(expanded)
    setExpanded((prev) => !prev);
  };

  return (
    <div className={styles.CardItem}>
      <div className={styles.CardItemActionStart}>
        <div onClick={handleLockClick} className={styles.HeaderIconContainer}>
          {lockContent ? <KeyLockIcon width={20} height={20} />
            : <KeyUnlockIcon color='#9b9b9b' width={20} height={20} />}
        </div>
      </div>
      <div className={styles.CardItemContent}>
        <div className={styles.CardTextContainer}>
          <p className={`${styles.CardTitle} ${locale == 'th' ? `${mitr.className} ${styles.thfontbold}` : null}`}>{title}</p>
          <p className={`${styles.CardDetail} ${locale == 'th' ? `${mitr.className} ${styles.thfontbold}` : null}`}>{headingContent}</p>
        </div>
      </div>
      <div className={styles.CardItemActionEnd}>
        <div onClick={handleLockClick} className={styles.HeaderIconContainer}>
          {lockContent ? <KeyLockIcon width={20} height={20} />
            : <KeyUnlockIcon color='#9b9b9b' width={20} height={20} />}
        </div>
      </div>
    </div>
  )
}

export default HorizonCard
