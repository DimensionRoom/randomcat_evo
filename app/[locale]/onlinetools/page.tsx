"use client";
import React, { useState, useEffect, useRef } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { useSearchParams } from "next/navigation";
import { Mitr } from "next/font/google";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import ReactPlayer from "react-player";
import ToolCard from "@/components/Card/VerticalCard/ToolCard/ToolCard";
import FlatBtn from "@/components/Button/FlatBtn/FlatBtn";
import PageFooter from "@/components/Footer/PageFooter";
import initTranslations from "@/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";
import mainLoad from "@/public/json/mainload.json";
import MainNavigationTopBar from "@/components/NavigationBar/MainNavigationTopBar";
import videoPlay from "@/public/json/videoPlay.json";
import PdfFile from "@/public/svgs/onlinetools/pdffile";
import Capture from "@/public/svgs/onlinetools/capture";
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

  const transformToolsData = async () => {
    const toolsListData = await import(`/locales/${locale}/toolsListData.json`);
    if (!toolsListData?.tools) {
      return [];
    }

    const toolsData = toolsListData.tools;
    const transformedToolsData = Object.keys(toolsData).map((categoryKey) => {
      const categoryItems = toolsData[categoryKey];
      const itemsArray = Object.keys(categoryItems).map((itemKey, idx) => {
        const item = categoryItems[itemKey];
        return {
          id: `${categoryKey}-${itemKey}-${idx}`,
          picture: `/svgs/svg/onlinetools/${itemKey}.svg`,
          topic: item.topic,
          topic2: item.topic2,
          desc: item.desc,
          desc2: item.desc2,
          onlineLink: item.onlineLink || "",
          productLink: item.productLink || "",
        };
      });

      return {
        category: categoryKey,
        item: itemsArray,
      };
    });
    setTools(transformedToolsData);
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
    transformToolsData();
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
        <Player autoplay loop src={mainLoad} style={{ width: "30vh" }}></Player>
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
                rewind={true}
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
                      onlineLink={item.onlineLink}
                      productLink={item.productLink}
                      // onClick={() => {
                      //   window.open(item.onlineLink, "_blank");
                      // }}
                      // onClickMore={() => {
                      //   window.open(item.productLink, "_blank");
                      // }}
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
        <section className={`${styles.section} ${styles.gradientSection}`}>
          <div className={styles.itemContainer}>
            <div className={styles.item}>
              <div className={styles.itemImage}>
                <Capture width={"60%"} />
              </div>
              <div className={styles.itemData}>
                <p className={styles.title}>
                  {t("section.gradientSection.items.showWork.title")}
                </p>
                <p className={styles.subtitle}>
                  {t("section.gradientSection.items.showWork.desc")}
                </p>
                <p className={styles.subtitle}>
                  {t("section.gradientSection.items.showWork.desc2")}
                </p>
                <FlatBtn
                  className={`${styles.moreBtn}`}
                  text={"Let's share!"}
                  onClick={() => {
                    window.open("https://www.instagram.com/thinktool_official", "_blank");
                  }}
                />
              </div>
            </div>
            <div className={styles.item}>
              <div className={styles.itemImage}>
                <PdfFile width={"60%"} />
                {/* <Image
                  className={styles.icon}
                  src={"/svgs/svg/onlinetools/business_design.svg"}
                  width={300}
                  height={250}
                  style={{ objectFit: "contain" }}
                  alt=""
                /> */}
              </div>
              <div className={styles.itemData}>
                <p className={styles.title}>
                  {t("section.gradientSection.items.downloadMaterial.title")}
                </p>
                <p className={styles.subtitle}>
                  {t("section.gradientSection.items.downloadMaterial.desc")}
                </p>
                <p className={styles.subtitle}>
                  {t("section.gradientSection.items.downloadMaterial.desc2")}
                </p>
                <FlatBtn
                  className={`${styles.moreBtn}`}
                  text={"Learn More"}
                  onClick={() => {
                    window.open("/templates", "_blank");
                  }}
                />
              </div>
            </div>
          </div>
        </section>
        <section className={`${styles.section} ${styles.footerSection}`}>
          <PageFooter locale={locale} />
        </section>
      </main>
    </TranslationsProvider>
  );
}
