'use client';
import React, { useState, forwardRef,useEffect } from 'react'
import { Quicksand, Mitr } from "next/font/google";
import styles from './PhysicalCard.module.css';
import KeyLockIcon from '@/public/svgs/components/ExpandCard/keyLock';
import KeyUnlockIcon from '@/public/svgs/components/ExpandCard/keyUnlock';
import FlatBtn from '@/components/Button/FlatBtn/FlatBtn';
import ExpandArrowIcon from '@/public/svgs/components/ExpandCard/expandArrow';
import RerenderIcon from '@/public/svgs/components/HorizonCard/rerender';
import SiteLogo from '@/public/svgs/siteLogo';
import CystalIcon from '@/public/svgs/components/PhysicalCard/cystal';

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
  color?: string;
  locale?: string;
  title: string;
  subTitle: string;
  categoryName: string | undefined;
  itemKey: string;
  headingContent: string;
  content: string;
  expand?: boolean;
  lock?: boolean;
  flip?: boolean;
  delay?: number;
  onLockContentChange: (key: string, lockContent: boolean) => void;
  onClick?: () => void;
}

const PhysicalCard = forwardRef<HTMLDivElement, Props>(({
  setFlippedCards = () => { },
  color = '',
  locale = 'en',
  title = '-',
  subTitle = '',
  categoryName = '',
  itemKey,
  headingContent = '-',
  content = '-',
  expand = false,
  lock = false,
  flip = true,
  delay = 200,
  onLockContentChange,
  onClick,
  ...props
}, ref): JSX.Element => {

  const [expanded, setExpanded] = useState<boolean>(expand);
  const [lockContent, setLockContent] = useState<boolean>(lock);
  const [flipContent, setFlipContent] = useState<boolean>(flip);
  const [isAnimated, setIsAnimated] = useState(true);

  const handleLockClick = async () => {
    setLockContent((prev) => !prev);
    onLockContentChange(itemKey, !lockContent);
  }

  const handleExpandClick = async () => {
    if (!content) return;
    setExpanded((prev) => !prev);
  };

  const handleCardClick = (side: string) => {
    if (lockContent) return;
    if (side === 'back' && !flipContent) return;
    setFlipContent(!flipContent);
    if (!flipContent) {
      setFlippedCards((prev) => prev + 1);
    } else {
      setFlippedCards((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsAnimated(true);
    }, delay);

    return () => clearTimeout(timeout);
  }, [delay]);

  return (
    <div ref={ref} className={`${styles.CardItem} ${styles[color]} ${flipContent ? styles.CardFliped : styles.CardNoneFliped} ${isAnimated ? styles.fadeInFromTop : ''}`} onClick={() => handleCardClick('back')}>
      <div className={styles.CardFront}>
        <div className={styles.CardItemActionStart}>
          <div className={styles.TitleGroup}>
            {/* <CrystalIcon color={color} width={20} height={20} /> */}
            <div className={styles.CardCystal}/>
            <p className={`${styles.CardTitle} ${locale == 'th' ? `${mitr.className} ${styles.thfontbold}` : null}`}>{title}{subTitle ? `-${subTitle}` : ''}</p>
          </div>
          <div onClick={handleLockClick} className={styles.IconContainer}>
            {lockContent ? <KeyLockIcon className={styles.IconLock} width={20} height={20} />
              : <KeyUnlockIcon className={styles.IconUnLock} width={20} height={20} />}
          </div>
        </div>
        <div className={`${styles.CardItemContent}`}>
          <div className={`${styles.CardTextContainer} ${content ? styles.HaveContent : styles.NonContent}`}>
            <p className={`${styles.CardDetail} ${locale == 'th' ? `${mitr.className} ${styles.thfontbold}` : null}`}>{headingContent}</p>
          </div>
          <div className={`${styles.CardItemBodyContent}`}>
            <p className={`${styles.ExpandText} ${locale == 'th' ? `${mitr.className} ${styles.thfontbold}` : null}`}>{content}</p>
          </div>
        </div>
        <div className={styles.CardItemActionEnd}>
          <FlatBtn className={styles.flipBtn} disabled={lockContent} style={{ width: 80 }} text="Flip" onClick={() => handleCardClick('front')} />
          <FlatBtn className={styles.randomBtn} disabled={lockContent} style={{ width: 80 }} text="Random" onClick={onClick} />
        </div>
      </div>
      <div className={styles.CardBack}>
        <div className={styles.CardItemContent}>
          <p className={`${styles.CardTitle}`}>{title.toUpperCase()}</p>
          <p className={`${styles.CardSubTitle}`}>{subTitle.toUpperCase()}</p>
          <p className={`${styles.CardCatName}`}>{categoryName}</p>
        </div>
      </div>
    </div>
  )
}
)
export default PhysicalCard
