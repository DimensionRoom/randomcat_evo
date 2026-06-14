"use client";
import React, { useState, useEffect, use } from "react";
import { useSearchParams } from "next/navigation";

import PageFooter from "@/components/Footer/PageFooter";
import { useTranslations } from "@/hooks/useTranslations";
import PageShell from "@/components/PageShell/PageShell";
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
  const { t, resources, ready } = useTranslations(locale, i18nNamespaces);
  const searchParams = useSearchParams();
  const searchParamsInfo = searchParams.get("info");
  const [items, setItems] = useState([]);

  useEffect(() => {
    const showcaseData = require("@/json/showcaseItems.json");
    setItems(showcaseData.data || []);
  }, []);

  return (
    <PageShell
      locale={locale}
      namespaces={i18nNamespaces}
      resources={resources}
      ready={ready}
      loaderAnimation={showcaseLoad}
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
    </PageShell>
  );
}
