"use client";
import React from "react";
import Link from "next/link";
import { useTranslations } from "@/hooks/useTranslations";
import PageShell from "@/components/PageShell/PageShell";
import MainNavigationTopBar from "@/components/NavigationBar/MainNavigationTopBar";
import VenueScene from "@/components/MusicBand/VenueScene";
import SiteLogo from "@/public/svgs/siteLogo";
import mainLoad from "@/public/json/mainload.json";
import { mitr } from "@/lib/fonts";
import { ensembles } from "@/public/data/musicband/ensembles";
import styles from "./MusicBand.module.scss";

const i18nNamespaces = ["musicBandScreen"];

export default function BandMissionPicker({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const { t, resources, ready } = useTranslations(locale, i18nNamespaces);
  const isThai = locale === "th";
  const thFont = isThai ? mitr.className : "";

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
              {t("missions.eyebrow")}
            </p>
            <h1 className={`${styles.title} ${thFont}`}>
              {t("missions.title")}
            </h1>
            <p className={`${styles.subtitle} ${thFont}`}>
              {t("missions.subtitle")}
            </p>
            <div className={styles.divider} aria-hidden="true">
              <span className={styles.dividerBarPurple} />
              <span className={styles.dividerDot} />
              <span className={styles.dividerBarPink} />
            </div>
          </div>

          <div className={styles.missionGrid}>
            {ensembles.map((ensemble) => (
              <Link
                key={ensemble.id}
                href={`/${locale}/onlinetools/educationandparent/musiccard/band/${ensemble.id}`}
                className={styles.missionCard}
                style={{ ["--accent" as string]: ensemble.accent }}
              >
                <span className={styles.missionScene}>
                  <VenueScene scene={ensemble.id} />
                </span>
                <span className={styles.missionBody}>
                  <span className={`${styles.missionName} ${thFont}`}>
                    {isThai ? ensemble.nameTh : ensemble.nameEn}
                  </span>
                  <span className={styles.missionSubtitle}>
                    {ensemble.subtitle}
                  </span>
                  <span className={`${styles.missionDesc} ${thFont}`}>
                    {isThai ? ensemble.descTh : ensemble.descEn}
                  </span>
                  <span className={`${styles.missionVenue} ${thFont}`}>
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11z" />
                      <circle cx="12" cy="10" r="2.6" />
                    </svg>
                    {t("missions.venueLabel")}:{" "}
                    {isThai ? ensemble.venueTh : ensemble.venueEn}
                  </span>
                  <span className={`${styles.missionAction} ${thFont}`}>
                    {t("missions.action")}
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M5 12h13M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </PageShell>
  );
}
