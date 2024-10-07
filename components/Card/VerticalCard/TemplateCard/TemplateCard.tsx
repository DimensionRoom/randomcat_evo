"use client";
import React, { useState, forwardRef, useEffect } from "react";
import { Quicksand, Mitr } from "next/font/google";
import { useToast } from "@/contexts/ToastContext";
import Image from "next/image";
import FlatBtn from "@/components/Button/FlatBtn/FlatBtn";
import styles from "./TemplateCard.module.scss";

const mitr = Mitr({
  subsets: ["thai"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

export type Props = {
  color?: string;
  locale?: string;
  image?: string;
  title: string;
  contentFirst: string;
  contentSecond: string;
  onClick?: () => void;
};

const TemplateCard = forwardRef<HTMLDivElement, Props>(
  (
    {
      color = "",
      locale = "en",
      image = "",
      title = "-",
      contentFirst = "-",
      contentSecond = "",
      onClick,
      ...props
    },
    ref
  ): JSX.Element => {
    return (
      <div
        ref={ref}
        className={styles.TemplateCardContainer}
        style={{ backgroundColor: color }}
        onClick={onClick}
        {...props}
      >
        <div className={styles.itemImage}>
          <Image
            className={styles.image}
            src={image ? image : "/image/defaultimg.jpg"}
            width={300}
            height={250}
            style={{ objectFit: "cover" }}
            alt=""
          />
        </div>
        <div className={styles.itemData}>
          <p className={styles.title}>{title}</p>
          <p className={styles.content}>{contentFirst}</p>
          <p className={styles.content}>{contentSecond}</p>
        </div>
        <div className={styles.itemAction}>
          <FlatBtn
            className={`${styles.downloadBtn}`}
            text="Download"
            onClick={onClick}
          />
        </div>
      </div>
    );
  }
);
export default TemplateCard;
