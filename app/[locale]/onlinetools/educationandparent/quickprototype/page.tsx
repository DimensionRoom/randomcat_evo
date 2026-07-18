"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "@/hooks/useTranslations";
import PageShell from "@/components/PageShell/PageShell";
import MainNavigationTopBar from "@/components/NavigationBar/MainNavigationTopBar";
import DynamicModal from "@/components/Modal/DynamicModal/DynamicModal";
import SiteLogo from "@/public/svgs/siteLogo";
import mainLoad from "@/public/json/mainload.json";
import { mitr } from "@/lib/fonts";
import BookSpread from "./BookSpread";
import styles from "./QuickPrototype.module.scss";

const PAIR_COUNT = 15;
const IMG_BASE = "/image/quick_prototype";
const i18nNamespaces = ["quickprototypeScreen"];

const shuffle = (input: number[]): number[] => {
  const ids = [...input];
  for (let i = ids.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [ids[i], ids[j]] = [ids[j], ids[i]];
  }
  return ids;
};

export default function QuickPrototype({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const { t, resources, ready } = useTranslations(locale, i18nNamespaces);
  const [cardOrder, setCardOrder] = useState<number[]>(
    Array.from({ length: PAIR_COUNT }, (_, i) => i + 1)
  );
  const [openPair, setOpenPair] = useState<number | null>(null);
  const [isHowtoPlayModalOpen, setHowtoPlayModalOpen] = useState(true);

  // Shuffled after mount (not in the state initializer) to stay hydration-safe.
  useEffect(() => {
    setCardOrder((current) => shuffle(current));
  }, []);

  const isThai = locale === "th";

  const renderParagraphList = (): JSX.Element[] => {
    const list = t("modal.howtoplay.paragraph", {
      returnObjects: true,
    }) as string[];

    if (!Array.isArray(list)) return [<p key="0">Error ready content</p>];

    return list.map((line, idx) => (
      <p
        className={`${styles.modalParagraph} ${
          isThai ? `${mitr.className} ${styles.thfontbold}` : ""
        }`}
        key={idx}
      >
        {line}
      </p>
    ));
  };

  return (
    <PageShell
      locale={locale}
      namespaces={i18nNamespaces}
      resources={resources}
      ready={ready}
      loaderAnimation={mainLoad}
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
          <h1
            className={`${styles.ToolNameText} ${
              isThai ? `${mitr.className} ${styles.thfontlight}` : ""
            }`}
          >
            {t("toolName")}
          </h1>
          <div className={styles.cardGrid}>
            {cardOrder.map((pairId, index) => (
              <button
                key={pairId}
                className={styles.card}
                style={{ animationDelay: `${index * 35}ms` }}
                onClick={() => setOpenPair(pairId)}
                aria-label={`${t("toolName")} ${index + 1}`}
              >
                <Image
                  src={`${IMG_BASE}/cover.webp`}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 30vw, 15vw"
                />
              </button>
            ))}
          </div>
        </div>

        <DynamicModal
          backdrop={false}
          className={`${styles.modalHeadLess} ${styles.backdropNone}`}
          size="medium"
          isOpen={isHowtoPlayModalOpen}
          onClose={() => setHowtoPlayModalOpen(false)}
        >
          <p
            className={`${styles.modalTitle} ${
              isThai ? `${mitr.className} ${styles.thfontbold}` : ""
            }`}
          >
            {t("modal.howtoplay.title")}
          </p>
          <div className={styles.modalLine} />
          <p
            className={`${styles.modalIntro} ${
              isThai ? `${mitr.className} ${styles.thfontlight}` : ""
            }`}
          >
            {t("modal.howtoplay.intro")}
          </p>
          <p
            className={`${styles.modalSubTitle} ${
              isThai ? `${mitr.className} ${styles.thfontbold}` : ""
            }`}
          >
            {t("modal.howtoplay.subTitle")}
          </p>
          <div className={styles.listContainer}>{renderParagraphList()}</div>
          <p
            className={`${styles.readyText} ${
              isThai ? `${mitr.className} ${styles.thfontbold}` : ""
            }`}
          >
            {t("modal.howtoplay.ready")}
          </p>
        </DynamicModal>

        <BookSpread
          pair={openPair}
          onClose={() => setOpenPair(null)}
          leftAlt={t("spread.leftAlt")}
          rightAlt={t("spread.rightAlt")}
          closeLabel={t("spread.close")}
        />
      </main>
    </PageShell>
  );
}
