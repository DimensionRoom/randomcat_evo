"use client";
import React, { useState, useEffect, use } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { useSearchParams } from "next/navigation";

import PageFooter from "@/components/Footer/PageFooter";
import initTranslations from "@/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";
import showcaseLoad from "@/public/json/showcaseLoad.json";
import MainNavigationTopBar from "@/components/NavigationBar/MainNavigationTopBar";
import ShowcaseMasonry from "@/components/Masonry/Showcase/ShowcaseMasonry";
import styles from "./Showcase.module.scss";
import { kanit } from "@/lib/fonts";

type DocumentItem = {
  id: string;
  picture: string;
  topic: string;
  desc: string;
  desc2: string;
  link: string;
};

const i18nNamespaces = ["showcaseScreen"];
export default function ShowcaseScreen({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const [t, setT] = useState<any>(null);
  const searchParams = useSearchParams();
  const searchParamsInfo = searchParams.get("info");
  const [resources, setResources] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const showcaseData = require("@/json/showcaseItems.json");
    console.log(showcaseData.data);
    setItems(showcaseData.data || []);
  }, []);

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
          src={showcaseLoad}
          style={{ width: "20vh" }}
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
        <section>
          <ShowcaseMasonry items={items} shuffle />
        </section>
        <section className={`${styles.section} ${styles.footerSection}`}>
          <PageFooter locale={locale} />
        </section>
      </main>
    </TranslationsProvider>
  );
}
