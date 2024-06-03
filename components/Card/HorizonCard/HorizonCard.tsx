'use client';
import React, { useState } from 'react'
import { Quicksand, Mitr } from "next/font/google";
import styles from './HorizonCard.module.css';
import KeyLockIcon from '@/public/svgs/components/ExpandCard/keyLock';
import KeyUnlockIcon from '@/public/svgs/components/ExpandCard/keyUnlock';
import FlatBtn from '@/components/Button/FlatBtn/FlatBtn';
import RerenderIcon from '@/public/svgs/components/HorizonCard/rerender';
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
  onLockContentChange: (key: string, lockContent: boolean) => void;
  onClick?: () => void;
}

const HorizonCard = ({
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
    onLockContentChange(itemKey, !lockContent);
  }

  const handleExpandClick = async () => {
    if (!content) return;
    // console.log(expanded)
    setExpanded((prev) => !prev);
  };

  return (
    <div className={`${styles.CardItem} ${styles[className]}`}>
      <div className={styles.CardItemActionStart}>
        <div onClick={handleLockClick} className={styles.IconContainer}>
          {lockContent ? <KeyLockIcon width={20} height={20} />
            : <KeyUnlockIcon color='#ffffff7d' width={20} height={20} />}
        </div>
      </div>
      <div className={styles.CardItemContent}>
        <div className={styles.CardTextContainer}>
          <p className={`${styles.CardTitle} ${locale == 'th' ? `${mitr.className} ${styles.thfontbold}` : null}`}>{title}</p>
          <p className={`${styles.CardDetail} ${locale == 'th' ? `${mitr.className} ${styles.thfontbold}` : null}`}>{headingContent}</p>
        </div>
        <div className={`${styles.CardItemBodyContent} ${expanded ? styles.Expanded : styles.NonExpanded} `}>
          <p className={`${styles.ExpandText} ${locale == 'th' ? `${mitr.className} ${styles.thfontbold}` : null}`}>{content}</p>
        </div>
      </div>
      <div onClick={handleExpandClick} className={`
        ${styles.CardItemActionContent} 
        ${expanded ? styles.Expanded : styles.NonExpanded} 
        ${content ? styles.HaveContent : styles.NonContent}`}>
        <div className={`${styles.IconContainer} ${lockContent ? styles.actionDisable : null}`}>
          <ExpandArrowIcon color='#ffffff' width={20} height={20} disabled={!content ? true : false}/>
        </div>
      </div>
      <div onClick={onClick} className={styles.CardItemActionEnd}>
        <div  className={`${styles.IconContainer} ${lockContent ? styles.actionDisable : null}`}>
          {lockContent ? <RerenderIcon color='#ffffff30' width={20} height={20} />
            : <RerenderIcon color='#ffffff' width={20} height={20} />}
        </div>
      </div>
    </div>
  )
}

export default HorizonCard
