"use client";
import React, { useState, useEffect, useRef } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { useSearchParams } from "next/navigation";
import { Kanit, Quicksand, Mitr, Poppins } from "next/font/google";
import ReactPlayer from "react-player";
import PageFooter from "@/components/Footer/PageFooter";
import initTranslations from "@/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";
import onlinelearningLoad from "@/public/json/onlinelearningLoad.json";
import MainNavigationTopBar from "@/components/NavigationBar/MainNavigationTopBar";
import TemplateCard from "@/components/Card/VerticalCard/TemplateCard/TemplateCard";
import OnlineLearningCard from "@/components/Card/OnlineLearningCard/OnlineLearningCard"
import videoPlay from "@/public/json/videoPlay.json";
import styles from "./OnlineLeaning.module.scss";

type contenttItem = {
  id: string;
  topic: string;
  desc: string;
  url: string;
};

const i18nNamespaces = ["onlinelearningScreen"];
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
export default function OnlineLeaningScreen({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const [t, setT] = useState<any>(null);
  const searchParams = useSearchParams();
  const searchParamsInfo = searchParams.get("info");
  const [resources, setResources] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [contents, setContents] = useState<contenttItem[]>([]);
  const presentPlayerRef = useRef(null);
  const [presentPlaying, setPresentPlaying] = useState(false);
  const togglePlayPresentVideo = () => {
    setPresentPlaying(!presentPlaying);
  };

  const transformJsonTemplateData = () => {
    const onlinelearningData = require(`@/json/onlineLearningData.json`);
    if (!onlinelearningData?.content) {
      return [];
    }

    const content = onlinelearningData.content;

    const transformedData = Object.keys(content).map((key, index) => {
      const item = content[key];

      return {
        id: (index + 1).toString(),
        topic: item.topic[locale],
        desc: item.desc[locale],
        url: item.url,
      };
    });
    console.log("transformedData", transformedData);
    setContents(transformedData);
  };

  useEffect(() => {
    async function fetchTranslations() {
      const { t, resources } = await initTranslations(locale, i18nNamespaces);
      setT(() => t);
      setResources(resources);
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
    fetchTranslations();
  }, [locale]);

  useEffect(() => {
    transformJsonTemplateData();
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
          src={onlinelearningLoad}
          style={{ width: "25vh" }}
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
      <MainNavigationTopBar fill locale={locale} />
      <main className={styles.main}>
        <section className={`${styles.section} ${styles.parallaxSection}`}>
          <div className={styles.textContainer}>
            <p className={styles.title}>{t("section.parallaxSection.title")}</p>
            <p className={styles.subtitle}>
              {t("section.parallaxSection.subtitle")}
            </p>
          </div>
        </section>
        <section className={`${styles.section} ${styles.whiteSection}`}>
          <div className={styles.textContainer}>
            <p   className={`${styles.title} ${mitr.className} ${styles.thfontbold}`}>{t("section.whiteSection.title")}</p>
            <p
              className={`${styles.subtitle} ${mitr.className} ${styles.thfontbold}`}
            >
              {t("section.whiteSection.subtitle")}
            </p>
          </div>
        </section>
        <section className={`${styles.section} ${styles.contentSection}`}>
          <div className={styles.contentContainer}>
            {contents.map((content: contenttItem) => (
              <OnlineLearningCard
                key={content.id}
                content={content}
                playing={presentPlaying}
                onPlayToggle={togglePlayPresentVideo}
                videoPlayAnimation={videoPlay}
              />
              // <div className={styles.contentBox}>
              //   <div className={styles.videoBox}>
              //     <ReactPlayer
              //       ref={presentPlayerRef}
              //       url={content.url}
              //       playing={presentPlaying}
              //       onPause={() => setPresentPlaying(false)}
              //       controls={presentPlaying}
              //       width="100%"
              //       height="22vh"
              //       style={{ display: "flex" }}
              //     />
              //     {!presentPlaying && (
              //       <div
              //         className={styles.customPlayButton}
              //         onClick={togglePlayPresentVideo}
              //       >
              //         <Player
              //           autoplay={false}
              //           // loop
              //           src={videoPlay}
              //           style={{ width: "22vh" }}
              //         ></Player>
              //       </div>
              //     )}
              //   </div>

              //   <div className={styles.details}>
              //     <div className={styles.textDetails}>
              //       <p className={styles.header}>{content.topic}</p>
              //       <p className={styles.body}>{content.desc}</p>
              //     </div>
              //     <div className={styles.action}>
              //       <p>เรียนเลย  <span>{`>`}</span></p>
              //     </div>
              //   </div>
              // </div>
            ))}
          </div>
        </section>
        <section className={`${styles.section} ${styles.footerSection}`}>
          <PageFooter locale={locale} />
        </section>
      </main>
    </TranslationsProvider>
  );
}
