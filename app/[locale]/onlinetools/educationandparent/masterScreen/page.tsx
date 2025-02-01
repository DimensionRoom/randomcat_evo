"use client";
import React, { useState, useEffect, useRef } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { Kanit, Quicksand, Mitr, Poppins } from "next/font/google";
import initTranslations from "@/i18n";
import MainNavigationTopBar from "@/components/NavigationBar/MainNavigationTopBar";
import Link from "next/link";
import TranslationsProvider from "@/components/TranslationsProvider";
import FlatBtn from "@/components/Button/FlatBtn/FlatBtn";
import musicLoad from "@/public/json/musicLoading.json";
import SiteLogo from "@/public/svgs/siteLogo";
import styles from "./MasterScreen.module.scss";



const i18nNamespaces = ["common"];
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
export default function MasterScreen({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const [t, setT] = useState<any>(null);
  const [resources, setResources] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

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
          src={musicLoad}
          style={{ width: "30vh" }}
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

        </div>
      </main>
    </TranslationsProvider>
  );
}
