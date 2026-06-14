"use client";
import React, { useState, useEffect, useRef } from "react";
import LottiePlayer from "@/components/Loading/LottiePlayer";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import MainNavigationTopBar from "@/components/NavigationBar/MainNavigationTopBar";
import initTranslations from "@/i18n";
import { useTranslations } from "@/hooks/useTranslations";
import PageShell from "@/components/PageShell/PageShell";
import Link from "next/link";
import styles from "./WhatIf.module.scss";
import TranslationsProvider from "@/components/TranslationsProvider";
import FlatBtn from "@/components/Button/FlatBtn/FlatBtn";
import whatifLoad from "@/public/json/whatifLoading.json";
import randomBook from "@/public/json/randomBook.json";
import SiteLogo from "@/public/svgs/siteLogo";
import i18nConfig from "@/i18nConfig";
import whatifEnData from "@/public/json/whatifEnCat.json";
import whatifThData from "@/public/json/whatifThCat.json";
import { kanit, mitr, popins } from "@/lib/fonts";

export type SubCategoryProps = {
  name: string;
  nameEx: string;
  fullDescription: string;
  catItemId: string;
};

type JSONData = {
  [key: string]: any;
};

interface Item {
  dataKey: string;
  title: string;
  subTitle: string;
  catItemId: string;
  topic: string;
  content: string;
}
interface Category {
  title: string;
  key: string;
  data: {
    type_th: string;
    type_en: string;
    th: string;
    en: string;
    content_th: string;
    content_en: string;
  }[];
}

interface Question {
  th: string;
  en: string;
  content_th: string;
  content_en: string;
}

const i18nNamespaces = ["common"];
export default function WhatIf({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const { t, resources, ready } = useTranslations(locale, i18nNamespaces);
  const [randomItems, setRandomItems] = useState<Item[]>([]);
  const [lockItem, setLockItem] = useState<string[]>([]);
  const [selectedCardItem, setSelectedCardItem] = useState<string[]>([]);
  const [randomQuestionItem, setRandomQuestionItem] = useState<string>();
  const [loadingRandom, setLoadingRandom] = useState<boolean>(false);
  const whatifData =
    locale === "en"
      ? whatifEnData
      : locale === "th"
      ? whatifThData
      : whatifEnData;

  const generateRandomItems = () => {
    console.log('x',whatifData)
    randomQuestion(whatifData);
  };

  let previousRandomIndex = -1;

  const randomQuestion = (whatifData: any) => {
    // setLoadingRandom(true);
    setTimeout(() => {
      const dataLength = whatifData.Category.data.length;
      let randomIndex;

      if (dataLength > 1) {
        randomIndex = Math.floor(Math.random() * (dataLength - 1));
        // Adjust the index if it meets or exceeds the previous index
        if (randomIndex >= previousRandomIndex) {
          randomIndex += 1;
        }
      } else {
        randomIndex = 0; // Only one item is available
      }

      // Update the previous index
      previousRandomIndex = randomIndex;

      // Proceed with your existing logic
      // console.log(whatifData.Category.data[randomIndex][`content_${locale}`]);
      setRandomQuestionItem(
        whatifData.Category.data[randomIndex][`content_${locale}`]
        // whatifData.Category.data[randomIndex][`content_en`]
      );
      // setLoadingRandom(false);
    }, 0);
  };

  useEffect(() => {}, [randomItems]);

  useEffect(() => {
    const filteredData = randomItems.filter((item) =>
      selectedCardItem.includes(item.catItemId)
    );
  }, [selectedCardItem]);


  useEffect(() => {
    randomQuestion(whatifData);
  }, []);

  return (
    <PageShell
      locale={locale}
      namespaces={i18nNamespaces}
      resources={resources}
      ready={ready}
      loaderAnimation={whatifLoad}
    >
      <div className={`${styles.MobileHeader}`}>
        <header className={`${styles.LayoutHeader}`}>
          <Link href="/" className={`${styles.textLink}`}>
            <div className={styles.BrandContainer}>
              <div className={styles.LogoContainer}>
                <SiteLogo />
              </div>
            </div>
          </Link>
        </header>
      </div>
      <main className={styles.main}>
        <div className={styles.HeaderSection}>
          <MainNavigationTopBar fill fillMode="transparent" locale={locale} />
        </div>
        <div className={styles.randomSection}>
          <div className={styles.TextItemsContainer}>
            <div className={styles.GroupItem}>
              {!loadingRandom ? (
                <React.Fragment>
                  <div className={styles.ToolName}>
                    <p className={`${styles.ToolNameText} ${popins.className}`}>
                      What If ?
                    </p>
                  </div>
                  <div className={styles.RandomCardName}>
                    <p
                      className={`${styles.CardNameText} ${
                        locale == "th"
                          ? `${mitr.className} ${styles.thfontlight}`
                          : null
                      }`}
                    >
                      {randomQuestionItem ? randomQuestionItem : "Question"}
                    </p>
                  </div>
                  <div className={styles.Action}>
                    <FlatBtn
                      text="Random"
                      className={styles.RandomBtn}
                      onClick={generateRandomItems}
                    />
                  </div>
                </React.Fragment>
              ) : (
                <LottiePlayer
                  autoplay
                  loop
                  src={randomBook}
                  style={{ width: "50vh" }}
                ></LottiePlayer>
              )}
            </div>
          </div>
        </div>
      </main>
    </PageShell>
  );
}
