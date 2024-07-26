"use client";
import React, { useState, forwardRef, useEffect } from "react";
import { Quicksand, Mitr } from "next/font/google";
import { useToast } from "@/contexts/ToastContext";
import Image from "next/image";
import styles from "./ImageCard.module.css";
import KeyLockIcon from "@/public/svgs/components/ExpandCard/keyLock";
import KeyUnlockIcon from "@/public/svgs/components/ExpandCard/keyUnlock";
import FlatBtn from "@/components/Button/FlatBtn/FlatBtn";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});
const mitr = Mitr({
  subsets: ["thai"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

export type Props = {
  setFlippedCards?: React.Dispatch<React.SetStateAction<number>>;
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
  delay?: number;
  onSelectedCardChange: (key: string, flipContent: boolean) => void;
  onLockContentChange: (key: string, lockContent: boolean) => void;
  onClick?: () => void;
};

const ImageCard = forwardRef<HTMLDivElement, Props>(
  (
    {
      setFlippedCards = () => {},
      locale = "en",
      title = "-",
      subTitle = "",
      categoryName = "",
      itemKey,
      headingContent = "-",
      content = "-",
      expand = false,
      lock = false,
      flip = true,
      flipLimit = 0,
      flippedCards = 0,
      delay = 200,
      onSelectedCardChange,
      onLockContentChange,
      onClick,
      ...props
    },
    ref
  ): JSX.Element => {
    const { showToast } = useToast();
    const [expanded, setExpanded] = useState<boolean>(expand);
    const [lockContent, setLockContent] = useState<boolean>(lock);
    const [flipContent, setFlipContent] = useState<boolean>(flip);
    const [isAnimated, setIsAnimated] = useState(true);

    const handleLockClick = async () => {
      setLockContent((prev) => !prev);
      onLockContentChange(itemKey, !lockContent);
    };

    const handleExpandClick = async () => {
      if (!content) return;
      setExpanded((prev) => !prev);
    };

    const handleCardClick = (side: string) => {
      if (lockContent) return;
      if (side === "back" && !flipContent) return;
      if (side === "front") {
        if (flippedCards >= flipLimit) {
          // showToast('This is an info toast!', 'warning');
          return;
        }
      }
      setFlipContent((prev) => !prev);
      if (!flipContent) {
        setFlippedCards((prev) => prev + 1);
        onSelectedCardChange(itemKey, !flipContent);
      } else {
        setFlippedCards((prev) => prev - 1);
        onSelectedCardChange(itemKey, !flipContent);
      }
    };

    useEffect(() => {}, [flipContent]);

    useEffect(() => {
      const timeout = setTimeout(() => {
        setIsAnimated(true);
      }, delay);

      return () => clearTimeout(timeout);
    }, [delay]);

    return (
      <div
        ref={ref}
        className={`${styles.CardItem} ${
          flipContent ? styles.CardFliped : styles.CardNoneFliped
        } ${isAnimated ? styles.fadeInFromTop : ""}`}
        // onClick={() => handleCardClick("back")} // ปิด Fnc กลับด้านหลัง
      >
        <div className={styles.CardFront}>
          <div className={styles.CardItemActionStart}>
            <div onClick={handleLockClick} className={styles.IconContainer}>
              {lockContent ? (
                <KeyLockIcon
                  className={styles.IconLock}
                  width={20}
                  height={20}
                />
              ) : (
                <KeyUnlockIcon
                  className={styles.IconUnLock}
                  width={20}
                  height={20}
                />
              )}
            </div>
          </div>
          <div className={`${styles.CardItemContent}`}>
            <div
              className={`${styles.CardTextContainer} ${
                content ? styles.HaveContent : styles.NonContent
              }`}
            >
              <p
                className={`${styles.CardDetail} ${
                  locale == "th"
                    ? `${mitr.className} ${styles.thfontbold}`
                    : null
                }`}
              >
                {headingContent}
              </p>
            </div>
            <div className={`${styles.CardItemBodyContent}`}>
              <p
                className={`${styles.ExpandText} ${
                  locale == "th"
                    ? `${mitr.className} ${styles.thfontbold}`
                    : null
                }`}
              >
                {content}
              </p>
            </div>
          </div>
          <div className={styles.CardItemActionEnd}>
            <FlatBtn
              className={styles.flipBtn}
              disabled={lockContent}
              style={{ width: 80 }}
              text="Flip"
              onClick={() => handleCardClick("front")}
            />
            <FlatBtn
              className={styles.randomBtn}
              disabled={lockContent}
              style={{ width: 80 }}
              text="Random"
              onClick={onClick}
            />
          </div>
        </div>
        <div className={styles.CardBack}>
          <Image
            className={styles.image}
            src={`/image/music_card/${headingContent}.png`}
            fill={true}
            alt=""
            loading="eager"
          />
        </div>
      </div>
    );
  }
);
export default ImageCard;
