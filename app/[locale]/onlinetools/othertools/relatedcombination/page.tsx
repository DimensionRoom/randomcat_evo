"use client";
import React, { useState, useEffect, useRef } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Kanit, Quicksand, Mitr, Poppins } from "next/font/google";
import MainNavigationTopBar from "@/components/NavigationBar/MainNavigationTopBar";
import initTranslations from "@/i18n";
import Link from "next/link";
import styles from "./RelatedCombination.module.scss";
import TranslationsProvider from "@/components/TranslationsProvider";
import FlatBtn from "@/components/Button/FlatBtn/FlatBtn";
import whatifLoad from "@/public/json/whatifLoading.json";
import randomBook from "@/public/json/randomBook.json";
import SiteLogo from "@/public/svgs/siteLogo";
import Dice from "@/public/svgs/components/Button/dice";
import i18nConfig from "@/i18nConfig";
import relatedCombinationData from "@/public/json/relatedCombinationCat.json";

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
const kanit = Kanit({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
const popins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});
const mitr = Mitr({
  subsets: ["thai"],
  weight: ["200", "300", "400", "500", "600", "700"],
});
export default function RelatedCombination({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const [t, setT] = useState<any>(null);
  const [resources, setResources] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [randomItems, setRandomItems] = useState<Item[]>([]);
  const [lockItem, setLockItem] = useState<string[]>([]);
  const [selectedCardItem, setSelectedCardItem] = useState<string[]>([]);
  const [randomProductQuestionItem, setRandomProductQuestionItem] =
    useState<any>();
  const [randomServiceQuestionItem, setRandomServiceQuestionItem] =
    useState<any>();
  const [loadingRandom, setLoadingRandom] = useState<boolean>(false);

  const generateRandomItems = () => {
    randomQuestion();
  };

  const gernerateProductRandomItems = () => {
    randomProduct(relatedCombinationData);
  };

  const gernerateServiceRandomItems = () => {
    randomService(relatedCombinationData);
  };

  let previousRandomIndex = -1;

  const randomProduct = (relatedCombinationData: any) => {
    const productDataLength = relatedCombinationData.Product.data.length;
    let randomIndex;
    if (productDataLength > 1) {
      randomIndex = Math.floor(Math.random() * (productDataLength - 1));
      if (randomIndex >= previousRandomIndex) {
        randomIndex += 1;
      }
    } else {
      randomIndex = 0;
    }
    previousRandomIndex = randomIndex;
    setRandomProductQuestionItem(
      relatedCombinationData.Product.data[randomIndex]
    );
  };
  const randomService = (relatedCombinationData: any) => {
    const serviceDataLength = relatedCombinationData.Service.data.length;
    let randomIndex;
    if (serviceDataLength > 1) {
      randomIndex = Math.floor(Math.random() * (serviceDataLength - 1));
      if (randomIndex >= previousRandomIndex) {
        randomIndex += 1;
      }
    } else {
      randomIndex = 0;
    }
    previousRandomIndex = randomIndex;
    setRandomServiceQuestionItem(
      relatedCombinationData.Service.data[randomIndex]
    );
  };

  const randomQuestion = () => {
    randomProduct(relatedCombinationData);
    randomService(relatedCombinationData);
  };

  useEffect(() => {}, [randomItems]);

  useEffect(() => {
    const filteredData = randomItems.filter((item) =>
      selectedCardItem.includes(item.catItemId)
    );
  }, [selectedCardItem]);

  useEffect(() => {
    async function fetchTranslations() {
      const { t, resources } = await initTranslations(locale, i18nNamespaces);
      setT(() => t);
      setResources(resources);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
    fetchTranslations();
  }, [locale]);

  useEffect(() => {
    randomQuestion();
  }, []);
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Player
          autoplay
          loop
          src={whatifLoad}
          style={{ width: "30vh" }}
        ></Player>
      </div>
    );
  }

  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
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
          <MainNavigationTopBar
            absolute
            fill
            fillMode="transparent"
            locale={locale}
          />
        </div>
        <div className={styles.randomSection}>
          <div className={styles.diceContainer}>
            <div onClick={generateRandomItems} className={styles.diceItem}>
              <Dice width={40} height={40} />
            </div>
          </div>
          <div className={styles.TextItemsContainer}>
            <div className={styles.GroupItem}>
              <React.Fragment>
                <div className={styles.RandomCardName}>
                  <div className={styles.ToolName}>
                    <p className={`${styles.ToolNameText} ${popins.className}`}>
                      {randomProductQuestionItem
                        ? randomProductQuestionItem.en
                        : "Question"}
                    </p>
                  </div>
                  <p
                    className={`${styles.CardNameText} ${
                      locale == "th"
                        ? `${mitr.className} ${styles.thfontlight}`
                        : null
                    }`}
                  >
                    {randomProductQuestionItem
                      ? randomProductQuestionItem.content_en
                      : ""}
                  </p>
                </div>
                <div className={styles.Action}>
                  <FlatBtn
                    text="Try Again"
                    className={`${styles.RandomBtn} ${styles.btnL}`}
                    onClick={gernerateProductRandomItems}
                  />
                </div>
              </React.Fragment>
            </div>
          </div>
          <div className={styles.TextItemsContainer}>
            <div className={styles.GroupItem}>
              <React.Fragment>
                <div className={styles.RandomCardName}>
                  <div className={styles.ToolName}>
                    <p className={`${styles.ToolNameText} ${popins.className}`}>
                      {randomServiceQuestionItem
                        ? randomServiceQuestionItem.en
                        : "Question"}
                    </p>
                  </div>
                  <p
                    className={`${styles.CardNameText} ${
                      locale == "th"
                        ? `${mitr.className} ${styles.thfontlight}`
                        : null
                    }`}
                  >
                    {randomServiceQuestionItem
                      ? randomServiceQuestionItem.content_en
                      : ""}
                  </p>
                </div>
                <div className={styles.Action}>
                  <FlatBtn
                    text="Try Again"
                    className={`${styles.RandomBtn} ${styles.btnR}`}
                    onClick={gernerateServiceRandomItems}
                  />
                </div>
              </React.Fragment>
            </div>
          </div>
        </div>
      </main>
    </TranslationsProvider>
  );
}
