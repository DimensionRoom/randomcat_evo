'use client';
import React, { useState, forwardRef } from 'react'
import { Quicksand, Mitr } from "next/font/google";
import { useToast } from '@/contexts/ToastContext';
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
  setFlippedCards?: React.Dispatch<React.SetStateAction<number>>;
  className?: string;
  locale?: string;
  title: string;
  subTitle: string;
  categoryName: string | undefined;
  itemKey: string;
  headingContent: string;
  content: string;
  expand?: boolean;
  lock?: boolean;
  flipLimit?: number;
  flippedCards?: number;
  flip?: boolean;
  onSelectedCardChange: (key: string, flipContent: boolean) => void;
  onLockContentChange: (key: string, lockContent: boolean) => void;
  onClick?: () => void;
}

const HorizonCard = forwardRef<HTMLDivElement, Props>(({
  setFlippedCards = () => { },
  className = '',
  locale = 'en',
  title = '',
  subTitle = '',
  categoryName = '',
  itemKey,
  headingContent = '-',
  content = '-',
  expand = false,
  lock = false,
  flipLimit = 0,
  flippedCards = 0,
  flip = true,
  onSelectedCardChange,
  onLockContentChange,
  onClick,
  ...props
}, ref): JSX.Element => {
  const { showToast } = useToast();
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
    // console.log(flippedCards,flipLimit)
    if (side === 'front') {
      if (flippedCards >= flipLimit) {
        // showToast('This is an info toast!', 'warning');
        return;
      }
    }
    setFlipContent((prev) => !prev);
    if (!flipContent) {
      setFlippedCards((prev) => prev + 1);
      onSelectedCardChange(itemKey,!flipContent);
    } else {
      setFlippedCards((prev) => prev - 1);
      onSelectedCardChange(itemKey,!flipContent);
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
            {categoryName === 'Innovation Design' ?
            <p className={`${styles.CardTitle} ${locale == 'th' ? `${mitr.className} ${styles.thfontbold}` : null}`}>{title}{subTitle ? `-${subTitle}` : ''}</p>
            : <p className={`${styles.CardTitle} ${locale == 'th' ? `${mitr.className} ${styles.thfontbold}` : null}`}>{subTitle ? `${subTitle}` : ''}</p>
          }
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
          {categoryName === 'Innovation Design' ?
            <p className={`${styles.CardTitle} ${locale == 'th' ? `${mitr.className} ${styles.thfontbold}` : null}`}>
              {title}{subTitle ? `-${subTitle}` : ''}
            </p> :
            <p className={`${styles.CardTitle} ${locale == 'th' ? `${mitr.className} ${styles.thfontbold}` : null}`}>
              {subTitle ? `${subTitle}` : ''}
            </p>
          }
        </div>
      </div>
    </div>
  )
}
)

export default HorizonCard
