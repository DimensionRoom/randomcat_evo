"use client";
import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";

import ReactPlayer from "react-player";
import PageFooter from "@/components/Footer/PageFooter";
import { useTranslations } from "@/hooks/useTranslations";
import PageShell from "@/components/PageShell/PageShell";
import onlinelearningLoad from "@/public/json/onlinelearningLoad.json";
import MainNavigationTopBar from "@/components/NavigationBar/MainNavigationTopBar";
import TemplateCard from "@/components/Card/VerticalCard/TemplateCard/TemplateCard";
import OnlineLearningCard from "@/components/Card/OnlineLearningCard/OnlineLearningCard"
import videoPlay from "@/public/json/videoPlay.json";
import styles from "./OnlineLeaning.module.scss";
import { kanit, mitr } from "@/lib/fonts";

type contenttItem = {
  id: string;
  topic: string;
  desc: string;
  url: string;
};

const i18nNamespaces = ["onlinelearningScreen"];
export default function OnlineLeaningScreen({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const { t, resources, ready } = useTranslations(locale, i18nNamespaces);
  const searchParams = useSearchParams();
  const searchParamsInfo = searchParams.get("info");
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
    transformJsonTemplateData();
  }, []);

  return (
    <PageShell
      locale={locale}
      namespaces={i18nNamespaces}
      resources={resources}
      ready={ready}
      loaderAnimation={onlinelearningLoad}
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
              //         <LottiePlayer
              //           autoplay={false}
              //           // loop
              //           src={videoPlay}
              //           style={{ width: "22vh" }}
              //         ></LottiePlayer>
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
    </PageShell>
  );
}
