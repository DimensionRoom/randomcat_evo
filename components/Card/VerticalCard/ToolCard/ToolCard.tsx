"use client";
import React, { forwardRef } from "react";
import { useRouter } from "next/navigation";

import ImageWithSkeleton from "@/components/Media/ImageWithSkeleton/ImageWithSkeleton";
import FlatBtn from "@/components/Button/FlatBtn/FlatBtn";
import styles from "./ToolCard.module.scss";
import { mitr } from "@/lib/fonts";
import { hasToolDetails } from "@/public/data/toolDetails";

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
  /** Key in toolsListData.json; opens the shared details page when one exists. */
  toolKey?: string;
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
      toolKey = "",
      // onClick,
      // onClickMore,
      ...props
    },
    ref
  ): JSX.Element => {
    const router = useRouter();
    const onClick = () => {
      window.open(onlineLink, "_blank");
    };
    const onClickMore = () => {
      window.open(productLink, "_blank");
    };

    const actionText = onlineLink ? "Try online" : productLink ? "Buy" : "Upcoming";
    const actionHandler = onlineLink ? onClick : onClickMore;
    const hasAction = Boolean(onlineLink || productLink);
    // Only tools with a details page can be explored; the rest stay disabled.
    const canExplore = Boolean(toolKey) && hasToolDetails(toolKey);
    const onExploreClick = () => {
      if (canExplore) router.push(`/${locale}/onlinetools/details/${toolKey}`);
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
            <ImageWithSkeleton
              className={styles.icon}
              src={image}
              responsive
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
            className={canExplore ? styles.exploreBtn : styles.secondaryBtn}
            text="Explore more"
            disabled={!canExplore}
            onClick={onExploreClick}
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
