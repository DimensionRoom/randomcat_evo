"use client";
import React, { useState, useEffect } from "react";
import LottiePlayer from "@/components/Loading/LottiePlayer";

import MainNavigationTopBar from "@/components/NavigationBar/MainNavigationTopBar";
import initTranslations from "@/i18n";
import { useTranslations } from "@/hooks/useTranslations";
import PageShell from "@/components/PageShell/PageShell";
import Link from "next/link";
import styles from "./PublicSpeaking.module.scss";
import TranslationsProvider from "@/components/TranslationsProvider";
import FlatBtn from "@/components/Button/FlatBtn/FlatBtn";
import whatifLoad from "@/public/json/whatifLoading.json";
import randomBook from "@/public/json/randomBook.json";
import SiteLogo from "@/public/svgs/siteLogo";
import publicSpeakingData from "@/public/json/publicSpeaking.json";
import { kanit, mitr } from "@/lib/fonts";

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
  header: string;
  content: string;
}

const i18nNamespaces = ["common"];
export default function PublicSpeaking({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const { t, resources, ready } = useTranslations(locale, i18nNamespaces);
  const [randomItems, setRandomItems] = useState<Item[]>([]);
  const [selectedCardItem, setSelectedCardItem] = useState<string[]>([]);
  const [randomQuestionItem, setRandomQuestionItem] = useState<Question>();
  const [previousRandomData, setPreviousRandomData] = useState<string>("");
  const [loadingRandom, setLoadingRandom] = useState<boolean>(false);

  const generateRandomItems = () => {
    randomQuestion(publicSpeakingData);
  };

  const randomQuestion = (publicSpeakingData: any) => {
    const dataLength = publicSpeakingData.Category.data.length;

    let randomIndex = Math.floor(Math.random() * (dataLength - 1));
    if (previousRandomData === publicSpeakingData.Category.data[randomIndex].en) {
      randomIndex = Math.floor(Math.random() * (dataLength - 1));
      setRandomQuestionItem({
        header: publicSpeakingData.Category.data[randomIndex][locale],
        content: publicSpeakingData.Category.data[randomIndex][`content_${locale}`],
      });
    } else {
      setRandomQuestionItem({
        header: publicSpeakingData.Category.data[randomIndex][locale],
        content: publicSpeakingData.Category.data[randomIndex][`content_${locale}`],
      });
      setPreviousRandomData(publicSpeakingData.Category.data[randomIndex].en);
    }
  };

  useEffect(() => {}, [randomItems]);

  useEffect(() => {
    const filteredData = randomItems.filter((item) =>
      selectedCardItem.includes(item.catItemId)
    );
  }, [selectedCardItem]);


  useEffect(() => {
    randomQuestion(publicSpeakingData);
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
                    <p
                      className={`${styles.ToolNameText} ${
                        locale == "th"
                          ? `${mitr.className} ${styles.thfontlight}`
                          : null
                      }`}
                    >
                      {randomQuestionItem
                        ? randomQuestionItem.header
                        : "Question"}
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
                      {randomQuestionItem
                        ? randomQuestionItem.content
                        : "Content"}
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
