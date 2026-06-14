"use client";
import React, { useState, useEffect, use } from "react";
import { useSearchParams } from "next/navigation";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import PageFooter from "@/components/Footer/PageFooter";
import { useTranslations } from "@/hooks/useTranslations";
import PageShell from "@/components/PageShell/PageShell";
import templateLoad from "@/public/json/templateload.json";
import MainNavigationTopBar from "@/components/NavigationBar/MainNavigationTopBar";
import ProductCard from "@/components/Card/VerticalCard/ProductCard/ProductCard";
import styles from "./Products.module.scss";
import "swiper/css";
import "swiper/css/navigation";
import { kanit, mitr } from "@/lib/fonts";

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
export default function ProductsScreen({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const { t, resources, ready } = useTranslations(locale, i18nNamespaces);
  const searchParams = useSearchParams();
  const searchParamsInfo = searchParams.get("info");
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
    transformJsonTemplateData();
  }, []);

  return (
    <PageShell
      ready={ready}
      loaderAnimation={templateLoad}
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
    </PageShell>
  );
}
