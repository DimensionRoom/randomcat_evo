"use client";
import React, { useState, useEffect, useRef } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { useSearchParams } from "next/navigation";
import { Mitr } from "next/font/google";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import ReactPlayer from "react-player";
import ToolCard from "@/components/Card/VerticalCard/ToolCard/ToolCard";
import PageFooter from "@/components/Footer/PageFooter";
import initTranslations from "@/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";
import templateLoad from "@/public/json/templateload.json";
import MainNavigationTopBar from "@/components/NavigationBar/MainNavigationTopBar";
import videoPlay from "@/public/json/videoPlay.json";
import styles from "./OnlineTools.module.scss";
import "swiper/css";
import "swiper/css/navigation";
type ToolsItem = {
  category: string;
  item: OutputItem[];
};

interface OutputItem {
  id: string;
  picture: string;
  topic: string;
  topic2: string;
  desc: string;
  desc2: string;
  onlineLink: string;
  productLink: string;
}

const i18nNamespaces = ["onlinetoolsScreen"];
const mitr = Mitr({
  subsets: ["thai"],
  weight: ["200", "300", "400", "500", "600", "700"],
});
export default function OnlineToolsScreen({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const [t, setT] = useState<any>(null);
  const searchParams = useSearchParams();
  const [resources, setResources] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [tools, setTools] = useState<ToolsItem[]>([]);
  const [presentPlaying, setPresentPlaying] = useState(false);
  const presentPlayerRef = useRef(null);

  const togglePlayPresentVideo = () => {
    setPresentPlaying(!presentPlaying);
  };

  const transformJsonTemplateData = () => {
    const toolsListData = require(`@/locales/${locale}/toolsListData.json`);
    if (!toolsListData?.tools) {
      return [];
    }

    const tools = toolsListData.tools;
    const data = Object.keys(tools).map((categoryKey) => {
      const categoryItems = tools[categoryKey];
      const itemsArray = Object.keys(categoryItems).map((itemKey, idx) => {
        const item = categoryItems[itemKey];
        return {
          id: `${categoryKey}-${itemKey}-${idx}`,
          picture: `/svgs/svg/onlinetools/${itemKey}.svg`,
          topic: item.topic,
          topic2: item.topic2,
          desc: item.desc,
          desc2: item.desc2,
          onlineLink: item.onlineLink || item.productLink || "",
          productLink: item.productLink || "",
        };
      });

      return {
        category: categoryKey,
        item: itemsArray,
      };
    });
    setTools(data);
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
          src={templateLoad}
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

        {tools.map((tool, index) => (
          <React.Fragment key={index}>
            <section className={`${styles.section} ${styles.whiteSection}`}>
              <div className={styles.textContainer}>
                <p className={styles.title}>
                  {t(`section.whiteSection.${tool.category}.title`)}
                </p>
                <p
                  className={`${styles.subtitle} ${
                    locale == "th"
                      ? `${mitr.className} ${styles.thfontbold}`
                      : null
                  }`}
                >
                  {t(`section.whiteSection.${tool.category}.subtitle`)}
                </p>
              </div>
            </section>
            <section className={`${styles.section} ${styles.slideSection}`}>
              <Swiper
                id={tool.category}
                modules={[Pagination, Navigation]}
                grabCursor={true}
                slidesPerView={3}
                spaceBetween={0}
                navigation={true}
                breakpoints={{
                  384: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 0,
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 0,
                  },
                }}
                className={styles.ToolsSwiper}
              >
                {tool.item.map((item, index) => (
                  <SwiperSlide key={index} className={styles.SwiperSlide}>
                    <ToolCard
                      key={item.id}
                      locale={locale}
                      title={item.topic}
                      title2={item.topic2}
                      contentFirst={item.desc}
                      contentSecond={item.desc2}
                      image={item.picture}
                      onClick={() => {
                        window.open(item.onlineLink, "_blank");
                      }}
                      onClickMore={() => {
                        window.open(item.productLink, "_blank");
                      }}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </section>
          </React.Fragment>
        ))}
        <section className={styles.videoSection}>
          <div className={styles.videoBox}>
            <ReactPlayer
              ref={presentPlayerRef}
              url="https://thinktool.s3.ap-southeast-2.amazonaws.com/presentvid01.mp4"
              playing={presentPlaying}
              onPause={() => setPresentPlaying(false)}
              controls={presentPlaying}
              width="100%"
              height="auto"
              style={{ display: "flex" }}
            />
            {!presentPlaying && (
              <div
                className={styles.customPlayButton}
                onClick={togglePlayPresentVideo}
              >
                <Player
                  autoplay
                  loop
                  src={videoPlay}
                  style={{ width: "22vh" }}
                ></Player>
              </div>
            )}
          </div>
        </section>
        <section className={`${styles.section} ${styles.footerSection}`}>
          <PageFooter locale={locale} />
        </section>
      </main>
    </TranslationsProvider>
  );
}
