"use client";
import React, { forwardRef } from "react";

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
    const onClick = () => {
      window.open(onlineLink, "_blank");
    };
    const onClickMore = () => {
      window.open(productLink, "_blank");
    };

    const actionText = onlineLink ? "Try me" : productLink ? "Buy" : "Upcoming";
    const actionHandler = onlineLink ? onClick : onClickMore;
    const hasAction = Boolean(onlineLink || productLink);
    const hasExplore = Boolean(productLink);

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
            className={`${hasExplore ? styles.secondaryBtn : styles.disabledBtn}`}
            text="Explore"
            disabled={!hasExplore}
            onClick={onClickMore}
          />
          <FlatBtn
            className={`${hasAction ? styles.primaryBtn : styles.disabledBtn}`}
            text={actionText}
            disabled={!hasAction}
            onClick={actionHandler}
          />
        </div>
      </div>
    );
  }
);
export default ToolCard;
