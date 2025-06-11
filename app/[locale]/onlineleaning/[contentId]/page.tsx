"use client";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Player } from "@lottiefiles/react-lottie-player";
import ReactPlayer from "react-player";
import { Kanit, Mitr } from "next/font/google";
import MainNavigationTopBar from "@/components/NavigationBar/MainNavigationTopBar";
import initTranslations from "@/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";
import onlinelearningLoad from "@/public/json/onlinelearningLoad.json";
import styles from "./ContentDetails.module.scss";

const i18nNamespaces = ["onlinelearningScreen"];

const kanit = Kanit({ subsets: ["latin"], weight: ["400", "700"] });
const mitr = Mitr({ subsets: ["thai"], weight: ["300", "500"] });

type ContentItem = {
  id: string;
  topic: string;
  desc: string;
  url: string;
};

export default function OnlineLearningDetailPage({
  params,
}: {
  params: { contentId: string; locale: string };
}) {
  const [content, setContent] = useState<ContentItem | null>(null);
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [t, setT] = useState<any>(null);
  const [resources, setResources] = useState<any>(null);
  const [playing, setPlaying] = useState(false);
  const playerRef = useRef(null);
  const router = useRouter();

  const locale = params.locale || "th";

  useEffect(() => {
    async function fetchTranslations() {
      const { t, resources } = await initTranslations(locale, i18nNamespaces);
      setT(() => t);
      setResources(resources);
    }

    const loadContent = () => {
      const onlinelearningData = require("@/json/onlineLearningData.json");
      const itemList = Object.keys(onlinelearningData.content).map(
        (key, index) => {
          const item = onlinelearningData.content[key];
          return {
            id: (index + 1).toString(),
            topic: item.topic[locale],
            desc: item.desc[locale],
            url: item.url,
          };
        }
      );

      setContents(itemList);
      const selected = itemList.find((i) => i.id === params.contentId);
      setContent(selected ?? null);
      setTimeout(() => setLoading(false), 1000);
    };

    fetchTranslations();
    loadContent();
  }, [params.contentId, locale]);

  const goBack = () => router.push(`/onlineleaning`);
  const goToNext = () => {
    const currentIndex = contents.findIndex((i) => i.id === params.contentId);
    const nextItem = contents[currentIndex + 1];
    if (nextItem) {
      router.push(`/onlineleaning/${nextItem.id}`);
    }
  };

  if (loading || !t || !resources) {
    return (
      <div className={styles.loader}>
        <Player
          autoplay
          loop
          src={onlinelearningLoad}
          style={{ width: "25vh" }}
        />
      </div>
    );
  }

  if (!content) {
    return <div className={styles.notFound}>ไม่พบข้อมูลวิดีโอ</div>;
  }

  return (
    <TranslationsProvider
      locale={locale}
      namespaces={i18nNamespaces}
      resources={resources}
    >
      <MainNavigationTopBar fill locale={locale} />
      <main className={styles.main}>
        {/* Parallax Header */}
        <section className={`${styles.section} ${styles.parallaxSection}`}>
          <div className={styles.textContainer}>
            <p className={styles.title}>{t("section.parallaxSection.title")}</p>
            <p className={styles.subtitle}>
              {t("section.parallaxSection.subtitle")}
            </p>
          </div>
        </section>
        {/* Detail Title (ขึ้นก่อน Video) */}
        <section className={styles.detailSection}>
          <h1 className={`${styles.title} ${mitr.className}`}>
            {content.topic}
          </h1>
        </section>
        {/* Video */}
        <section className={styles.videoSection}>
          <ReactPlayer
            ref={playerRef}
            url={content.url}
            playing={playing}
            controls
            width="100%"
            height="50vh"
            // style={{ maxWidth: "80%", margin: "0 auto", borderRadius: "20px" }}
          />
        </section>
        {/* Detail */}
        <section className={styles.detailSection}>
          <p className={`${styles.description} ${mitr.className}`}>
            {content.desc}
          </p>

          <div className={styles.buttons}>
            <button onClick={goBack} className={`${mitr.className} ${styles.thfontbold}`}>
              หน้ารวมคอร์ส
            </button>
            <button
              className={`${mitr.className} ${styles.thfontbold}`}
              onClick={goToNext}
              disabled={
                contents.findIndex((i) => i.id === params.contentId) ===
                contents.length - 1
              }
            >
              เนื้อหาต่อไป
            </button>
          </div>
        </section>
      </main>
    </TranslationsProvider>
  );
}
