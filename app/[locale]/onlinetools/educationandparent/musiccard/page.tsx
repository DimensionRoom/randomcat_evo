"use client";
import React from "react";
import Link from "next/link";
import { useTranslations } from "@/hooks/useTranslations";
import PageShell from "@/components/PageShell/PageShell";
import MainNavigationTopBar from "@/components/NavigationBar/MainNavigationTopBar";
import SiteLogo from "@/public/svgs/siteLogo";
import mainLoad from "@/public/json/mainload.json";
import { mitr } from "@/lib/fonts";
import styles from "./MusicCardChooser.module.scss";

const i18nNamespaces = ["musicBandScreen"];

export default function MusicCardChooser({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const { t, resources, ready } = useTranslations(locale, i18nNamespaces);
  const isThai = locale === "th";
  const thFont = isThai ? mitr.className : "";

  const options = [
    {
      key: "cardGame",
      href: `/${locale}/onlinetools/educationandparent/musiccard/game`,
      icon: (
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <rect
            x="8"
            y="6"
            width="24"
            height="34"
            rx="4"
            transform="rotate(-8 20 23)"
          />
          <rect x="16" y="8" width="24" height="34" rx="4" />
        </svg>
      ),
    },
    {
      key: "band",
      href: `/${locale}/onlinetools/educationandparent/musiccard/band`,
      icon: (
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <circle cx="15" cy="34" r="6" />
          <circle cx="35" cy="30" r="6" />
          <path d="M21 34V12l20-4v22" />
        </svg>
      ),
    },
  ];

  return (
    <PageShell
      locale={locale}
      namespaces={i18nNamespaces}
      resources={resources}
      ready={ready}
      loaderAnimation={mainLoad}
    >
      <div className={styles.MobileHeader}>
        <header className={styles.LayoutHeader}>
          <Link href="/" className={styles.textLink}>
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
          <MainNavigationTopBar fill locale={locale} />
        </div>

        <div className={styles.content}>
          <div className={styles.heroHeader}>
            <p className={`${styles.eyebrow} ${thFont}`}>
              {t("chooser.eyebrow")}
            </p>
            <h1 className={`${styles.title} ${thFont}`}>{t("chooser.title")}</h1>
            <p className={`${styles.subtitle} ${thFont}`}>
              {t("chooser.subtitle")}
            </p>
            <div className={styles.divider} aria-hidden="true">
              <span className={styles.dividerBarPurple} />
              <span className={styles.dividerDot} />
              <span className={styles.dividerBarPink} />
            </div>
          </div>

          <div className={styles.optionGrid}>
            {options.map((option) => (
              <Link
                key={option.key}
                href={option.href}
                className={styles.optionCard}
              >
                <span className={styles.optionIcon} aria-hidden="true">
                  {option.icon}
                </span>
                <h2 className={`${styles.optionTitle} ${thFont}`}>
                  {t(`chooser.${option.key}.title`)}
                </h2>
                <p className={`${styles.optionDesc} ${thFont}`}>
                  {t(`chooser.${option.key}.desc`)}
                </p>
                <span className={`${styles.optionAction} ${thFont}`}>
                  {t(`chooser.${option.key}.action`)}
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M5 12h13M12 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </PageShell>
  );
}
