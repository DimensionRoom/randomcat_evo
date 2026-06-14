"use client";
import React, { useState, useEffect, useRef, ReactNode } from "react";
import LottiePlayer from "@/components/Loading/LottiePlayer";

import initTranslations from "@/i18n";
import { useTranslations } from "@/hooks/useTranslations";
import PageShell from "@/components/PageShell/PageShell";
import TranslationsProvider from "@/components/TranslationsProvider";
import templateLoad from "@/public/json/templateload.json";
import webElementHeaderAnimate from "@/public/json/animate/webElementHeaderAnimate.json";
import signatureAnimate from "@/public/json/animate/signature.json";
import webelementLoad from "@/public/json/webelementLoad.json";
import teamwork from "@/public/json/animate/teamwork.json";
import FlatBtn from "@/components/Button/FlatBtn/FlatBtn";
import ElementHeader from "@/components/WebElements/ElementHeader";
import styles from "./Demo.module.scss";
import { kanit, mitr } from "@/lib/fonts";

type ElementTypeItem = {
  id: string;
  name: string;
  description: string;
  detail: string;
  prompt: string;
  example: ReactNode;
};

const i18nNamespaces = ["webElementsScreen"];

export default function TemplateScreen({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const { t, resources, ready } = useTranslations(locale, i18nNamespaces);
  const [elementsItems, setElementsItems] = useState<ElementTypeItem[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const gridRef = useRef<HTMLDivElement>(null); 

  useEffect(() => {
    setElementsItems([]);
  }, []);


  useEffect(() => {
    if (ready && gridRef.current) {
      gridRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [ready]);


  return (
    <PageShell
      locale={locale}
      namespaces={i18nNamespaces}
      resources={resources}
      ready={ready}
      loaderAnimation={webelementLoad}
    >
      <ElementHeader/>
      {/* Section Elements */}
      <section
        className={`${styles.section} ${styles.elementsTypeSection} ${mitr.className}`}
      >
        <p className={styles.centerText}>
          <span className={styles.elementName}>Demo UI</span>
          <br />
          การใช้ตาราง (Table) เพื่อจัดระเบียบข้อมูลอย่างเป็นระบบ
          <br />
          ช่วยให้ผู้ใช้งานสามารถเปรียบเทียบและค้นหาข้อมูลได้สะดวก
        </p>
        <div className={styles.gridContainer} ref={gridRef}>
          {elementsItems.map((item) => (
            <div key={item.id} className={styles.gridItem}>
              <div className={styles.previewBox}>{item.example}</div>
              <h3>{item.name}</h3>
              <p className={styles.sub}>{item.description}</p>
              <p className={styles.detail}>{item.detail}</p>
              <div className={styles.promptSection}>
                <button
                  className={styles.copyBtn}
                  onClick={() => {
                    navigator.clipboard.writeText(item.prompt);
                    setCopiedId(item.id);
                    setTimeout(() => setCopiedId(null), 1500);
                  }}
                >
                  {copiedId === item.id ? "Copied!" : "Copy Prompt"}
                </button>
                <code className={styles.prompt}>{item.prompt}</code>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Footer */}
      <section className={`${styles.section} ${styles.footerSection}`}>
        <div className={styles.details}>
          <div className={styles.icon}>
            <LottiePlayer
              keepLastFrame
              autoplay
              loop={false}
              src={signatureAnimate}
            />
          </div>
          <div className={styles.detail}>
            <p className={styles.credit}>Created by</p>
            <p>Natchaya N.</p>
            <p>Tada S.</p>
          </div>
        </div>
        <div className={styles.animate}>
          <LottiePlayer autoplay loop src={teamwork} />
        </div>
      </section>
    </PageShell>
  );
}
