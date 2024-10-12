"use client";
import React, { useState, forwardRef, useEffect } from "react";
import { Quicksand, Mitr } from "next/font/google";
import { useToast } from "@/contexts/ToastContext";
import Image from "next/image";
import FlatBtn from "@/components/Button/FlatBtn/FlatBtn";
import styles from "./ProductCard.module.scss";

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
  contentFirst: string;
  contentSecond: string;
  onClick?: () => void;
};

const ProductCard = forwardRef<HTMLDivElement, Props>(
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
        {...props}
      >
        <div className={styles.itemImage}>
          <Image
            className={styles.image}
            src={image ? image : "/image/defaultimg.jpg"}
            width={300}
            height={250}
            style={{ objectFit: "contain" }}
            alt=""
          />
        </div>
        <div className={styles.itemData}>
          <p className={styles.title}>{title}</p>
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
            className={`${styles.downloadBtn}`}
            text="Download"
            onClick={onClick}
          />
        </div>
      </div>
    );
  }
);
export default ProductCard;
