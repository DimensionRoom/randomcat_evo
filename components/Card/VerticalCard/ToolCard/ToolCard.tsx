"use client";
import React, { useState, forwardRef, useEffect } from "react";
import { Quicksand, Mitr } from "next/font/google";
import Image from "next/image";
import FlatBtn from "@/components/Button/FlatBtn/FlatBtn";
import InnovationDesign from "@/public/svgs/onlinetools/innovation_design";
import styles from "./ToolCard.module.scss";

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
  onClick?: () => void;
  onClickMore?: () => void;
};

const ToolCard = forwardRef<HTMLDivElement, Props>(
  (
    {
      color = "",
      locale = "en",
      image = "",
      title = "-",
      title2= "",
      contentFirst = "-",
      contentSecond = "",
      onClick,
      onClickMore,
      ...props
    },
    ref
  ): JSX.Element => {
    return (
      <div
        ref={ref}
        className={styles.TemplateCardContainer}
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
          <FlatBtn
            className={`${styles.tryBtn}`}
            text="Try Online"
            onClick={onClick}
          />
          <FlatBtn
            className={`${styles.moreBtn}`}
            text="Learn More"
            onClick={onClickMore}
          />
        </div>
      </div>
    );
  }
);
export default ToolCard;
