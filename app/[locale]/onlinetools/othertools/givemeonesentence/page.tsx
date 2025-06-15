"use client";
import React, { useState, useEffect } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { Kanit, Quicksand, Mitr, Poppins } from "next/font/google";
import MainNavigationTopBar from "@/components/NavigationBar/MainNavigationTopBar";
import initTranslations from "@/i18n";
import Link from "next/link";
import styles from "./GiveMeOneSentence.module.scss";
import TranslationsProvider from "@/components/TranslationsProvider";
import FlatBtn from "@/components/Button/FlatBtn/FlatBtn";
import whatifLoad from "@/public/json/whatifLoading.json";
import randomBook from "@/public/json/randomBook.json";
import SiteLogo from "@/public/svgs/siteLogo";
import giveMeOneSentenceData from "@/public/json/givemeonesentenceCat.json";
import DynamicModal from "@/components/Modal/DynamicModal/DynamicModal";

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
    challenge_event: {
      en: string;
      th: string;
    }[];
  }[];
}

interface Question {
  header: string;
  content: string;
}

const i18nNamespaces = ["givemeonesentenceScreen"];
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

export default function GiveMeOneSentence({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const [t, setT] = useState<any>(null);
  const [resources, setResources] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [randomItems, setRandomItems] = useState<Item[]>([]);
  const [selectedCardItem, setSelectedCardItem] = useState<string[]>([]);
  const [randomQuestionItem, setRandomQuestionItem] = useState<Question>();
  const [previousRandomData, setPreviousRandomData] = useState<string>("");
  const [loadingRandom, setLoadingRandom] = useState<boolean>(false);
  const [challengeText, setChallengeText] = useState<string | null>(null);
  const [previousChallenge, setPreviousChallenge] = useState<string | null>(
    null
  );
  const [isHowtoPlayModalOpen, setHowtoPlayModalOpen] = useState(false);

  const generateRandomItems = () => {
    randomQuestion(giveMeOneSentenceData);
  };
  const showHowToPlayOncePerDay = () => {
    const today = new Date().toISOString().split("T")[0]; // yyyy-mm-dd
    const lastShownDate = localStorage.getItem("howToPlayShownDate");

    if (lastShownDate !== today) {
      localStorage.setItem("howToPlayShownDate", today);

      setHowtoPlayModalOpen(true);
    }
  };
  const randomQuestion = (giveMeOneSentenceData: any) => {
    const data = giveMeOneSentenceData.Category.data;
    const dataLength = data.length;

    let randomIndex = Math.floor(Math.random() * dataLength);
    let newItem = data[randomIndex];

    // ป้องกันซ้ำ
    let loopCount = 0;
    while (newItem.en === previousRandomData && loopCount < 10) {
      randomIndex = Math.floor(Math.random() * dataLength);
      newItem = data[randomIndex];
      loopCount++;
    }

    setRandomQuestionItem({
      header: newItem[locale],
      content: newItem[`content_${locale}`],
    });

    setPreviousRandomData(newItem.en);
    setChallengeText(null); // reset challenge
    setPreviousChallenge(null); // reset previous challenge
  };

  const showChallenge = () => {
    if (!randomQuestionItem) return;

    const currentItem = giveMeOneSentenceData.Category.data.find(
      (item: any) => item[locale] === randomQuestionItem.header
    );

    if (currentItem && currentItem.challenge_event?.length > 0) {
      const challenges = currentItem.challenge_event;

      let randIndex = Math.floor(Math.random() * challenges.length);
      let selectedChallenge = challenges[randIndex];

      let selectedText = selectedChallenge[locale as "en" | "th"];

      let attempts = 0;
      while (
        selectedText === previousChallenge &&
        attempts < 10 &&
        challenges.length > 1
      ) {
        randIndex = Math.floor(Math.random() * challenges.length);
        selectedChallenge = challenges[randIndex];
        selectedText = selectedChallenge[locale as "en" | "th"];
        attempts++;
      }

      setChallengeText(selectedText);
      setPreviousChallenge(selectedText);
    }
  };

  const renderParagraphList = (t: any): JSX.Element[] => {
    const list = t("modal.howtoplay.paragraph", {
      returnObjects: true,
    }) as string[];

    if (!Array.isArray(list)) return [<p key="0">Error loading content</p>];

    return list.map((line, idx) => (
      <p
        className={`${styles.modalParagraph} ${
          locale == "th" ? `${mitr.className} ${styles.thfontbold}` : null
        }`}
        key={idx}
      >
        {line}
      </p>
    ));
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
    if (!loading) {
      showHowToPlayOncePerDay();
    }
  }, [loading]);

  useEffect(() => {
    randomQuestion(giveMeOneSentenceData);
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
        <Player autoplay loop src={whatifLoad} style={{ width: "30vh" }} />
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
          <MainNavigationTopBar fill fillMode="transparent" locale={locale} />
        </div>
        <div className={styles.randomSection}>
          <div className={styles.TextItemsContainer}>
            <div className={styles.GroupItem}>
              {!loadingRandom ? (
                <React.Fragment>
                  <div
                    className={styles.ActionText}
                    onClick={generateRandomItems}
                  >
                    <SiteLogo />
                    <p>RANDOM HERE</p>
                    {/* <FlatBtn
                      text="Random"
                      className={styles.RandomBtn}
                      onClick={generateRandomItems}
                    /> */}
                  </div>
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
                      text={
                        challengeText ? challengeText : "CLICK FOR CHALLENGE"
                      }
                      className={`${styles.RandomEventBtn} ${
                        locale == "th" ? styles.thfont : null
                      }`}
                      onClick={showChallenge}
                      locale={locale}
                    />
                  </div>
                </React.Fragment>
              ) : (
                <Player
                  autoplay
                  loop
                  src={randomBook}
                  style={{ width: "50vh" }}
                />
              )}
            </div>
          </div>
        </div>
        <DynamicModal
          backdrop={false}
          className={`${styles.modalHeadLess} ${styles.backdropNone}`}
          size="medium"
          isOpen={isHowtoPlayModalOpen}
          onClose={() => setHowtoPlayModalOpen(false)}
        >
          <p className={styles.modalTitle}>{t("modal.howtoplay.title")}</p>
          <div className={styles.modalLine} />
          <div className={styles.listContainer}>{renderParagraphList(t)}</div>
        </DynamicModal>
      </main>
    </TranslationsProvider>
  );
}
