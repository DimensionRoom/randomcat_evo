"use client";
import React, { useState, useEffect, useRef } from "react";
import LottiePlayer from "@/components/Loading/LottiePlayer";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import MainNavigationTopBar from "@/components/NavigationBar/MainNavigationTopBar";
import initTranslations from "@/i18n";
import { useTranslations } from "@/hooks/useTranslations";
import PageShell from "@/components/PageShell/PageShell";
import Link from "next/link";
import styles from "./ObliqueStrategies.module.scss";
import TranslationsProvider from "@/components/TranslationsProvider";
import FlatBtn from "@/components/Button/FlatBtn/FlatBtn";
import whatifLoad from "@/public/json/whatifLoading.json";
import randomBook from "@/public/json/randomBook.json";
import SiteLogo from "@/public/svgs/siteLogo";
import i18nConfig from "@/i18nConfig";
import obliquestrategiesEnData from "@/public/json/obliquestrategiesEnCat.json";
import obliquestrategiesThData from "@/public/json/obliquestrategiesThCat.json";
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
export default function Obliquestrategies({
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
  const obliquestrategiesData =
    locale === "en"
      ? obliquestrategiesEnData
      : locale === "th"
      ? obliquestrategiesThData
      : obliquestrategiesEnData;

  const generateRandomItems = () => {
    randomQuestion(obliquestrategiesData);
  };

  let previousRandomIndex = -1;

  const randomQuestion = (obliquestrategiesData: any) => {
    // setLoadingRandom(true);
    setTimeout(() => {
      const dataLength = obliquestrategiesData.Category.data.length;
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
      // console.log(
      //   obliquestrategiesData.Category.data[randomIndex][`content_${locale}`]
      // );
      setRandomQuestionItem(
        obliquestrategiesData.Category.data[randomIndex][`content_${locale}`]
        // obliquestrategiesData.Category.data[randomIndex][`content_en`]
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
    randomQuestion(obliquestrategiesData);
  }, []);

  return (
    <PageShell
      locale={locale}
      namespaces={i18nNamespaces}
      resources={resources}
      ready={ready}
      loaderAnimation={whatifLoad}
    >
      <main className={styles.main}>
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
                      Oblique Strategies
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
                    {/* <CountdownTimer/> */}
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
