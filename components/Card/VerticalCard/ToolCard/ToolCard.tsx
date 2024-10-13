"use client";
import React, { useState, forwardRef, useEffect } from "react";
import { Quicksand, Mitr } from "next/font/google";
import Image from "next/image";
import FlatBtn from "@/components/Button/FlatBtn/FlatBtn";
import styles from "./ToolCard.module.scss";
import { on } from "events";

const mitr = Mitr({
  subsets: ["thai"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

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
    return (
      <div
        ref={ref}
        className={styles.ToolCardContainer}
        style={{ backgroundColor: color }}
        {...props}
      >
        <div className={styles.itemCard}>
          <div className={styles.itemIcon}>
            <Image
              className={styles.icon}
              src={image}
              width={300}
              height={250}
              style={{ objectFit: "contain" }}
              alt=""
            />
          </div>
          <div className={styles.titleContainer}>
            <p className={styles.title}>{title}</p>
            <p className={styles.title}>{title2}</p>
          </div>
        </div>
        <div className={styles.itemData}>
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
          {onlineLink && (
            <FlatBtn
              className={`${styles.tryBtn}`}
              text="Try Online"
              onClick={onClick}
            />
          )}
          {(onlineLink && productLink) ||
            (!onlineLink && !productLink && (
              <FlatBtn
                className={`${styles.moreBtn}`}
                text={onlineLink ? "Learn More" : "Upcoming"}
                disabled={!productLink}
                onClick={onClickMore}
              />
            ))}
        </div>
      </div>
    );
  }
);
export default ToolCard;
