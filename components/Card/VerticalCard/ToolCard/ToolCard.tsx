"use client";
import React, { forwardRef, useEffect, useState } from "react";

import Image from "next/image";
import FlatBtn from "@/components/Button/FlatBtn/FlatBtn";
import styles from "./ToolCard.module.scss";
import { mitr } from "@/lib/fonts";

export type Props = {
  color?: string;
  locale?: string;
  image?: string;
  title: string;
  title2?: string;
  contentFirst: string;
  contentSecond: string;
  onlineLink: string;
  productLink: string;
  // onClick?: () => void;
  // onClickMore?: () => void;
};

const ToolCard = forwardRef<HTMLDivElement, Props>(
  (
    {
      color = "",
      locale = "en",
      image = "",
      title = "-",
      title2 = "",
      contentFirst = "-",
      contentSecond = "",
      onlineLink = "",
      productLink = "",
      // onClick,
      // onClickMore,
      ...props
    },
    ref
  ): JSX.Element => {
    const [isComingSoonOpen, setComingSoonOpen] = useState(false);

    useEffect(() => {
      if (!isComingSoonOpen) return;

      const timer = setTimeout(() => {
        setComingSoonOpen(false);
      }, 2000);

      return () => clearTimeout(timer);
    }, [isComingSoonOpen]);

    const onClick = () => {
      window.open(onlineLink, "_blank");
    };
    const onClickMore = () => {
      window.open(productLink, "_blank");
    };

    const actionText = onlineLink ? "Try me" : productLink ? "Buy" : "Upcoming";
    const actionHandler = onlineLink ? onClick : onClickMore;
    const hasAction = Boolean(onlineLink || productLink);
    const onExploreClick = () => {
      setComingSoonOpen(true);
    };

    return (
      <div
        ref={ref}
        className={styles.ToolCardContainer}
        style={{ backgroundColor: color }}
        {...props}
      >
        <div className={styles.cardMedia}>
          {productLink && <span className={styles.priceBadge}>$49.99</span>}
          <div className={styles.itemIcon}>
            <Image
              className={styles.icon}
              src={image}
              width={300}
              height={320}
              alt=""
            />
          </div>
        </div>
        <div className={styles.itemData}>
          <div className={styles.titleContainer}>
            <p className={styles.title}>
              {title} {title2}
            </p>
          </div>
          <p
            className={`${styles.content} ${
              locale == "th" ? `${mitr.className} ${styles.thfontbold}` : null
            }`}
          >
            {contentFirst}
          </p>
          <p
            className={`${styles.content} ${
              locale == "th" ? `${mitr.className} ${styles.thfontbold}` : null
            }`}
          >
            {contentSecond}
          </p>
        </div>
        <div className={styles.itemAction}>
          <FlatBtn
            className={styles.secondaryBtn}
            text="Explore"
            onClick={onExploreClick}
          />
          <FlatBtn
            className={`${hasAction ? styles.primaryBtn : styles.disabledBtn}`}
            text={actionText}
            disabled={!hasAction}
            onClick={actionHandler}
          />
        </div>
        {isComingSoonOpen && (
          <div
            className={styles.cardOverlay}
            onClick={() => setComingSoonOpen(false)}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                setComingSoonOpen(false);
              }
            }}
          >
            <div
              className={styles.comingSoonModal}
              onClick={(event) => event.stopPropagation()}
            >
              <p className={styles.comingSoonTitle}>Coming soon</p>
              <p className={styles.comingSoonDetail}>
                We are preparing the Explore details for this tool.
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }
);
export default ToolCard;
