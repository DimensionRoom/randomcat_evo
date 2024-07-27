"use client";
import React, { useState, useEffect, useRef, use } from "react";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Kanit, Quicksand, Mitr, Poppins } from "next/font/google";
import initTranslations from "../i18n";
import Link from "next/link";
import CountdownProgressBar from "@/components/Progress/CountdownProgressBar/CountdownProgressBar";
import styles from "./MusicCard.module.scss";
import TranslationsProvider from "@/components/TranslationsProvider";
import FlatBtn from "@/components/Button/FlatBtn/FlatBtn";
import ImageCard from "@/components/Card/ImageCard/ImageCard";
import LottieAnimation from "@/components/Loading/LottieAnimation";
import musicLoad from "../../../public/json/musicLoading.json";
import musicLogo from "../../../public/json/musicLogo.json";

import i18nConfig from "@/i18nConfig";
import THFlag from "@/public/svgs/thFlag";
import ENFlag from "@/public/svgs/enFlag";

import musicCardData from "../../../public/json/musicCardCat.json";
import musicCardQuestion from "../../../public/json/musicCardQuestion.json";

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
export default function MusicCard({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const [t, setT] = useState<any>(null);
  const searchParams = useSearchParams();
  const searchParamsInfo = searchParams.get("info");
  const [resources, setResources] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const physicalRefs = useRef<(HTMLDivElement | null)[]>([]);
  const physicalGridRefs = useRef<(HTMLDivElement | null)[]>([]);

  const extractMainKeys = (jsonData: JSONData): string[] => {
    return Object.keys(jsonData);
  };
  const mainKeys = extractMainKeys(musicCardData);
  const cardData: { [key: string]: Category } = musicCardData;
  const [filteredCategories, setFilteredCategories] =
    useState<string[]>(mainKeys);
  const [randomItems, setRandomItems] = useState<Item[]>([]);
  const [lockItem, setLockItem] = useState<string[]>([]);
  const [selectedCardItem, setSelectedCardItem] = useState<string[]>([]);
  const [flippedCards, setFlippedCards] = useState<number>(0);
  const [flippedPhysicalCards, setFlippedPhysicalCards] = useState<number>(0);
  const [flippedPhysicalGridCards, setFlippedPhysicalGridCards] =
    useState<number>(0);
  const [flipCardLimit, setFlipCardLimit] = useState<number>(0);
  const [resetCountdownTrigger, setResetCountdownTrigger] = useState(false);
  const [randomQuestionItem, setRandomQuestionItem] = useState<string>();

  const router = useRouter();
  const searchParamsString = useSearchParams().toString();
  const currentPathname = usePathname();

  const handleChangeLanguage = async (lang: string) => {
    const newLocale = lang;

    // set cookie for next-i18n-router
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${date.toUTCString()};path=/`;

    // redirect to the new locale path
    if (locale === i18nConfig.defaultLocale) {
      searchParamsString
        ? router.push(
            "/" + newLocale + currentPathname + "?" + searchParamsString
          )
        : router.push("/" + newLocale + currentPathname);
    } else {
      router.push(
        searchParamsString
          ? currentPathname.replace(`/${locale}`, `/${newLocale}`) +
              "?" +
              searchParamsString
          : currentPathname.replace(`/${locale}`, `/${newLocale}`)
      );
    }
    router.refresh();
  };

  const handleLockContentChange = (
    catItemId: string,
    newLockContent: boolean
  ) => {
    if (newLockContent) {
      setLockItem([...lockItem, catItemId]);
    } else {
      setLockItem(lockItem.filter((item) => item !== catItemId));
    }
  };

  const handleSelectedCardChange = (catItem: string, newFlipCard: boolean) => {
    if (!newFlipCard && !selectedCardItem.includes(catItem)) {
      const newSelectedCardItem = [...selectedCardItem, catItem];
      setSelectedCardItem(newSelectedCardItem);
    } else {
      const newSelectedCardItem = selectedCardItem.filter(
        (item) => item !== catItem
      );
      setSelectedCardItem(newSelectedCardItem);
    }
  };

  const handleComplete = () => {
    console.log("Countdown finished!");
  };
  const resetCountdown = () => {
    setResetCountdownTrigger((prev) => !prev); // Toggle reset trigger to restart countdown
  };

  const getRandomItem = (category: any): Item => {
    const { title, subTitle, key, data } = category;
    const randomIndex = Math.floor(Math.random() * data.length);
    const randomData = data[randomIndex];
    return {
      title: `${title}`,
      subTitle: `${subTitle}`,
      catItemId: key,
      topic: randomData[locale],
      dataKey: randomData.dataKey,
      content: `${randomData[`content_${locale}`]}`,
    };
  };

  const generateRandomItems = () => {
    const items: Item[] = [];
    for (const key in cardData) {
      if (cardData.hasOwnProperty(key)) {
        const category = cardData[key];
        items.push(getRandomItem(category));
      }
    }
    const newRandomItems = items
      .map((item) => {
        if (lockItem.includes(item.catItemId)) {
          const originalItem = randomItems.find(
            (randomItem) => randomItem.catItemId === item.catItemId
          );
          return originalItem ? originalItem : item;
        } else {
          return item;
        }
      })
      .filter((item) => item !== undefined) as Item[];
    setRandomItems(newRandomItems);
    randomQuestion(musicCardQuestion);
    resetCountdown();
    if (flippedCards == items.length) {
      trigerCardClick("card");
    }
    if (flippedPhysicalCards == items.length) {
      trigerCardClick("physical");
    }
    if (flippedPhysicalGridCards == items.length) {
      trigerCardClick("grid");
    }
  };

  const trigerCardClick = (type: string) => {
    if (type === "card") {
      cardRefs.current.forEach((ref, index) => {
        setTimeout(() => {
          if (ref) {
            ref.click();
          }
        }, index * 150);
      });
    }
    if (type === "physical") {
      physicalRefs.current.forEach((ref, index) => {
        setTimeout(() => {
          if (ref) {
            ref.click();
          }
        }, index * 150);
      });
    }
    if (type === "grid") {
      physicalGridRefs.current.forEach((ref, index) => {
        setTimeout(() => {
          if (ref) {
            ref.click();
          }
        }, index * 150);
      });
    }
  };

  const generateRandomEachItem = (key: string) => {
    const category = cardData[key];
    const item = getRandomItem(category);
    const newRandomItems = randomItems.map((randomItem) => {
      if (randomItem.catItemId === key) {
        return lockItem.includes(key) ? randomItem : item;
      }
      return randomItem;
    });
    setRandomItems(newRandomItems);
  };

  const randomQuestion = (musicCardQuestion: any) => {
    const randomIndex = Math.floor(Math.random() * musicCardQuestion.length);
    setRandomQuestionItem(musicCardQuestion[randomIndex][locale]);
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
    const items: Item[] = [];
    for (const key in cardData) {
      if (cardData.hasOwnProperty(key)) {
        const category = cardData[key];
        items.push(getRandomItem(category));
      }
    }
    setRandomItems(items);
    randomQuestion(musicCardQuestion);
    setFlippedCards(items.length);
    setFlippedPhysicalCards(items.length);
    setFlippedPhysicalGridCards(items.length);
    setFlipCardLimit(items.length);
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
          src={musicLoad}
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
        <div className={styles.HeaderSection}>
          <div className={styles.HeaderCatContainer}>
            <p
              className={`${styles.HeaderCatContainerText} ${styles.BrandText}  ${popins.className}`}
            >
              Random Tool
            </p>
            <Player
              className={styles.BrandLogo}
              autoplay
              loop={false}
              src={musicLoad}
              style={{ width: "50px" }}
            ></Player>
            <div className={styles.ToolContainer}>
              <p
                className={`${styles.HeaderCatContainerText} ${popins.className}`}
              >
                Music Card Game
              </p>
              <div
                onClick={() => handleChangeLanguage("en")}
                className={`${styles.FlagContainer} ${
                  locale == "en" ? styles.active : ""
                }`}
              >
                <ENFlag />
              </div>
              <div
                onClick={() => handleChangeLanguage("th")}
                className={`${styles.FlagContainer} ${
                  locale == "th" ? styles.active : ""
                }`}
              >
                <THFlag />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.randomSection}>
          <div className={styles.CardItemsContainer}>
            {randomItems
              .filter((cardItem) =>
                filteredCategories.includes(cardItem.catItemId)
              )
              .map((cardItem, index) => (
                <ImageCard
                  className={styles.CardItemConfig}
                  key={index}
                  ref={(el) => (physicalRefs.current[index] = el)}
                  itemKey={cardItem.catItemId}
                  locale={locale}
                  title={cardItem.title}
                  subTitle={cardItem.subTitle}
                  categoryName={cardItem.catItemId}
                  headingContent={cardItem.dataKey}
                  content={cardItem.content}
                  setFlippedCards={setFlippedPhysicalCards}
                  onClick={() => generateRandomEachItem(cardItem.catItemId)}
                  lock={lockItem.includes(cardItem.catItemId)}
                  delay={index * 200}
                  flipLimit={flipCardLimit}
                  flippedCards={flippedPhysicalCards}
                  onSelectedCardChange={(key, newFlipCard) =>
                    handleSelectedCardChange(cardItem.catItemId, newFlipCard)
                  }
                  onLockContentChange={(key, newLockContent) =>
                    handleLockContentChange(cardItem.catItemId, newLockContent)
                  }
                />
              ))}
          </div>
          <div className={styles.TextItemsContainer}>
            <div className={styles.GroupItem}>
              <div className={styles.ToolName}>
                <p className={`${styles.ToolNameText} ${popins.className}`}>
                  Music Card Game
                </p>
              </div>
              <div className={styles.Action}>
                <FlatBtn
                  text="Random"
                  className={styles.RandomBtn}
                  onClick={generateRandomItems}
                />
              </div>
              <div className={styles.Countdown}>
                <CountdownProgressBar
                  duration={10}
                  delay={1000}
                  onComplete={handleComplete}
                  resetTrigger={resetCountdownTrigger}
                  displayMode="none"
                  showCompletedText
                  completedText="Time's up!"
                />
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
            </div>
          </div>
        </div>
      </main>
    </TranslationsProvider>
  );
}
