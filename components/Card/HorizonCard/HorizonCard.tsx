'use client';
import React, { useState, forwardRef } from 'react'
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
  setFlippedCards?: React.Dispatch<React.SetStateAction<number>> ;
  className?: string;
  locale?: string;
  title: string;
  itemKey: string;
  headingContent: string;
  content: string;
  expand?: boolean;
  lock?: boolean;
  flip?: boolean;
  onLockContentChange: (key: string, lockContent: boolean) => void;
  onClick?: () => void;
}

const HorizonCard = forwardRef<HTMLDivElement, Props>(({
  setFlippedCards = () => {},
  className = '',
  locale = 'en',
  title = '-',
  itemKey,
  headingContent = '-',
  content = '-',
  expand = false,
  lock = false,
  flip = true,
  onLockContentChange,
  onClick,
  ...props
}, ref): JSX.Element => {

  const [expanded, setExpanded] = useState<boolean>(expand);
  const [lockContent, setLockContent] = useState<boolean>(lock);
  const [flipContent, setFlipContent] = useState<boolean>(flip);

  const handleLockClick = async () => {
    setLockContent((prev) => !prev);
    onLockContentChange(itemKey, !lockContent);
  }

  const handleExpandClick = async () => {
    if (!content) return;
    // console.log(expanded)
    setExpanded((prev) => !prev);
  };

  const handleCardClick = (side: string) => {
    if (lockContent) return;
    if (side === 'back' && !flipContent) return;
    setFlipContent(!flipContent);
    if (!flipContent) {
      setFlippedCards((prev) => prev + 1);
    }else{
      setFlippedCards((prev) => prev - 1);
    }
  };
  

  return (
    <div ref={ref} className={`${styles.CardItem} ${styles[className]} ${flipContent ? styles.CardFliped : null}`} onClick={() => handleCardClick('back')}>
      <div className={styles.CardFront}>
        <div className={styles.CardItemActionStart}>
          <div onClick={handleLockClick} className={styles.IconContainer}>
            {lockContent ? <KeyLockIcon className={styles.IconLock} width={20} height={20} />
              : <KeyUnlockIcon className={styles.IconUnLock} width={20} height={20} />}
          </div>
        </div>
        <div className={styles.CardItemContent} onClick={() => handleCardClick('front')}>
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
            <ExpandArrowIcon className={!content ? styles.IconExpandArrowDisabled : styles.IconExpandArrow} width={20} height={20} disabled={!content ? true : false} />
          </div>
        </div>
        <div onClick={onClick} className={styles.CardItemActionEnd}>
          <div className={`${styles.IconContainer} ${lockContent ? styles.actionDisable : null}`}>
            {lockContent ? <RerenderIcon className={styles.IconUnLock} width={20} height={20} />
              : <RerenderIcon className={styles.IconLock} width={20} height={20} />}
          </div>
        </div>
      </div>
      <div className={styles.CardBack}>
        <div className={styles.CardItemContent} style={{ flex: 1, alignItems: 'center' }}>
          <p className={`${styles.CardTitle} ${locale == 'th' ? `${mitr.className} ${styles.thfontbold}` : null}`}>{title}</p>
        </div>
      </div>
    </div>
  )
}
)

export default HorizonCard
