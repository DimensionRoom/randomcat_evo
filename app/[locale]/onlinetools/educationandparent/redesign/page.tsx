"use client";
import React, { useState, useEffect, useRef } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Kanit, Quicksand, Mitr, Poppins } from "next/font/google";
import MainNavigationTopBar from "@/components/NavigationBar/MainNavigationTopBar";
import initTranslations from "@/i18n";
import Link from "next/link";
import styles from "./ReDesign.module.scss";
import TranslationsProvider from "@/components/TranslationsProvider";
import FlatBtn from "@/components/Button/FlatBtn/FlatBtn";
import whatifLoad from "@/public/json/whatifLoading.json";
import randomBook from "@/public/json/randomBook.json";
import SiteLogo from "@/public/svgs/siteLogo";
import i18nConfig from "@/i18nConfig";
import redesignData from "@/public/json/redesignCat.json";

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
export default function ReDesign({
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
  const [randomQuestionItem, setRandomQuestionItem] = useState<Question>();
  const [loadingRandom, setLoadingRandom] = useState<boolean>(false);
  const [previousRandomData, setPreviousRandomData] = useState<string>("");

  const generateRandomItems = () => {
    randomQuestion(redesignData);
  };

  const randomQuestion = (redesignData: any) => {
    const dataLength = redesignData.Category.data.length;

    let randomIndex = Math.floor(Math.random() * (dataLength - 1));
    if (previousRandomData === redesignData.Category.data[randomIndex].en) {
      // console.log("same data");
      randomIndex = Math.floor(Math.random() * (dataLength - 1));
      setRandomQuestionItem({
        header: redesignData.Category.data[randomIndex].en,
        content: redesignData.Category.data[randomIndex][`content_${locale}`],
      });
    } else {
      // console.log("data", redesignData.Category.data[randomIndex].en),previousRandomData;
      setRandomQuestionItem({
        header: redesignData.Category.data[randomIndex].en,
        content: redesignData.Category.data[randomIndex][`content_${locale}`],
      });
      setPreviousRandomData(redesignData.Category.data[randomIndex].en);
    }
    
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
    randomQuestion(redesignData);
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
                     <p
                      className={`${styles.ToolNameText} ${
                        locale == "th"
                          ? `${mitr.className} ${styles.thfontlight}`
                          : null
                      }`}
                    >
                      {randomQuestionItem ? randomQuestionItem.header : "Question"}
                    </p>
                  </div>
                  <div className={styles.RandomCardName}>
                    {/* <p
                      className={`${styles.CardNameText} ${
                        locale == "th"
                          ? `${mitr.className} ${styles.thfontlight}`
                          : null
                      }`}
                    >
                      {randomQuestionItem
                        ? randomQuestionItem.header
                        : "Question"}
                    </p> */}
                    <p
                      className={`${styles.CardContentText} ${
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
                  {/* <CountdownTimer/> */}
                </React.Fragment>
              ) : (
                <Player
                  autoplay
                  loop
                  src={randomBook}
                  style={{ width: "50vh" }}
                ></Player>
              )}
            </div>
          </div>
        </div>
      </main>
    </TranslationsProvider>
  );
}
