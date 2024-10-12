"use client";
import React, { useState, useEffect, use } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { useSearchParams } from "next/navigation";
import { Kanit, Quicksand, Mitr, Poppins } from "next/font/google";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import PageFooter from "@/components/Footer/PageFooter";
import initTranslations from "@/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";
import templateLoad from "@/public/json/templateload.json";
import MainNavigationTopBar from "@/components/NavigationBar/MainNavigationTopBar";
import ProductCard from "@/components/Card/VerticalCard/ProductCard/ProductCard";
import styles from "./Products.module.scss";
import "swiper/css";
import "swiper/css/navigation";

type DocumentItem = {
  id: string;
  picture: string;
  topic: string;
  desc: string;
  desc2: string;
  link: string;
};

interface TemplateFile {
  type: string;
  topic: string;
  desc: string;
  desc2: string;
}

interface OutputItem {
  id: string;
  picture: string;
  topic: string;
  desc: string;
  desc2: string;
  link: string;
}

const i18nNamespaces = ["productsScreen"];
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
export default function ProductsScreen({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const [t, setT] = useState<any>(null);
  const searchParams = useSearchParams();
  const searchParamsInfo = searchParams.get("info");
  const [resources, setResources] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [documents, setDocuments] = useState<DocumentItem[]>([]);

  const pagination = {
    clickable: true,
    renderBullet: function (index: number, className: string) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  };

  const transformJsonTemplateData = () => {
    const templateData = require(`@/locales/${locale}/documentTemplateData.json`);
    if (!templateData?.template?.files) {
      return [];
    }

    const files = templateData.template.files;

    const transformedData = Object.keys(files).map((key, index) => {
      const item = files[key];

      return {
        id: (index + 1).toString(),
        picture: `/image/pdf_cover/${key}.png`,
        topic: item.topic,
        desc: item.desc,
        desc2: item.desc2,
        link: `/workshop_template/${key}.pdf`,
      };
    });
    setDocuments(transformedData);
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
        <section className={`${styles.section} ${styles.whiteSection}`}>
          <div className={styles.textContainer}>
            <p className={styles.title}>{t("section.whiteSection.title")}</p>
            <p
              className={`${styles.subtitle} ${
                locale == "th" ? `${mitr.className} ${styles.thfontbold}` : null
              }`}
            >
              {t("section.whiteSection.subtitle")}
            </p>
          </div>
        </section>
        <section className={`${styles.section} ${styles.slideSection}`}>
          <Swiper
            id="CreativitySwiper"
            className="CreativitySwiper"
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
          >
            <SwiperSlide className={styles.SwiperSlide}>
              <ProductCard
                key={1}
                locale={"th"}
                title={"xxx"}
                contentFirst={"xxx2"}
                contentSecond={"xxxx3"}
                image={""}
                onClick={() => {
                  window.open("", "_blank");
                }}
              />
            </SwiperSlide>
            <SwiperSlide className={styles.SwiperSlide}>
              <ProductCard
                key={1}
                locale={"th"}
                title={"xxx"}
                contentFirst={"xxx2"}
                contentSecond={"xxxx3"}
                image={""}
                onClick={() => {
                  window.open("", "_blank");
                }}
              />
            </SwiperSlide>
            <SwiperSlide className={styles.SwiperSlide}>
              <ProductCard
                key={1}
                locale={"th"}
                title={"xxx"}
                contentFirst={"xxx2"}
                contentSecond={"xxxx3"}
                image={""}
                onClick={() => {
                  window.open("", "_blank");
                }}
              />
            </SwiperSlide>
            <SwiperSlide className={styles.SwiperSlide}>
              <ProductCard
                key={1}
                locale={"th"}
                title={"xxx"}
                contentFirst={"xxx2"}
                contentSecond={"xxxx3"}
                image={""}
                onClick={() => {
                  window.open("", "_blank");
                }}
              />
            </SwiperSlide>
          </Swiper>
        </section>
        <section className={`${styles.section} ${styles.footerSection}`}>
          <PageFooter locale={locale} />
        </section>
      </main>
    </TranslationsProvider>
  );
}
