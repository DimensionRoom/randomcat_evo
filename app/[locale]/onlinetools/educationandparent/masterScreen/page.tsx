"use client";
import React, { useState, useEffect, useRef } from "react";
import LottiePlayer from "@/components/Loading/LottiePlayer";

import initTranslations from "@/i18n";
import { useTranslations } from "@/hooks/useTranslations";
import PageShell from "@/components/PageShell/PageShell";
import MainNavigationTopBar from "@/components/NavigationBar/MainNavigationTopBar";
import Link from "next/link";
import TranslationsProvider from "@/components/TranslationsProvider";
import FlatBtn from "@/components/Button/FlatBtn/FlatBtn";
import musicLoad from "@/public/json/musicLoading.json";
import SiteLogo from "@/public/svgs/siteLogo";
import styles from "./MasterScreen.module.scss";
import { kanit } from "@/lib/fonts";

const i18nNamespaces = ["common"];
export default function MasterScreen({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const { t, resources, ready } = useTranslations(locale, i18nNamespaces);



  return (
    <PageShell
      locale={locale}
      namespaces={i18nNamespaces}
      resources={resources}
      ready={ready}
      loaderAnimation={musicLoad}
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
    </PageShell>
  );
}
