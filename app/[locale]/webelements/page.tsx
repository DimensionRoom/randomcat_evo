"use client";
import React, { useState, useEffect, use } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { Kanit, Quicksand, Mitr, Poppins } from "next/font/google";
import initTranslations from "@/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";
import templateLoad from "@/public/json/templateload.json";
import webElementHeaderAnimate from "@/public/json/animate/webElementHeaderAnimate.json";
import signatureAnimate from "@/public/json/animate/signature.json";
import webelementLoad from "@/public/json/webelementLoad.json";
import teamwork from "@/public/json/animate/teamwork.json";
import FlatBtn from "@/components/Button/FlatBtn/FlatBtn";
import styles from "./WebElements.module.scss";

type ElementTypeItem = {
  id: string;
  nameEN: string;
  nameTH: string;
  link: string;
};

const i18nNamespaces = ["webElementsScreen"];
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
export default function TemplateScreen({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const [t, setT] = useState<any>(null);
  const [resources, setResources] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [elementsType, setElementsType] = useState<ElementTypeItem[]>([]);

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
          src={webelementLoad}
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
      {/* Section Header */}
      <section
        className={`${styles.section} ${styles.parallaxSection} ${mitr.className} ${styles.thfontlight}`}
      >
        <div className={styles.headerContainer}>
          <div className={styles.specialCredit}>
            <div className={styles.icon}>
              <Player
                keepLastFrame
                autoplay
                loop={false}
                src={signatureAnimate}
              />
            </div>
            <p className={styles.specialText}>
              Think-Tool
              <br /> Speacial Project
            </p>
          </div>
          <h1 className={styles.title}>AI WEBSITE</h1>
          <h1 className={styles.title}>Elements &</h1>
          <h1 className={styles.title}>Prompts</h1>
          <p className={styles.subtitle}>
            เว็บไซต์ที่รวบรวมชื่อของส่วนประกอบหน้าตาการ
            <br />
            ออกแบบเว็บไซต์พร้อม prompt สำหรับนำไปใช้งาน
          </p>
          <FlatBtn
            className={styles.learnButton}
            text="LEARN MORE ABOUT US "
            onClick={() => {
              window.open("https://www.think-tool.com", "_blank");
            }}
          />
        </div>
        <div className={styles.headerImage}>
          <Player
            autoplay
            loop
            src={webElementHeaderAnimate}
            style={{ width: "100%" }}
          />
        </div>
      </section>

      {/* Section Elements */}
      <section
        className={`${styles.section} ${styles.elementsTypeSection} ${mitr.className}`}
      >
        <p className={styles.centerText}>
          “สร้างเว็บไซต์ด้วย AI ไม่ยากอย่างที่คิด หากรู้คำสั่งและชื่อเรียกของ
          <br />
          ส่วนประกอบที่คุณต้องการ เว็บไซต์นี้ได้รวบรวม keyword สำคัญที่
          <br />
          จะช่วยให้คุณออกแบบเว็บไซต์ได้อย่างตรงใจ”
        </p>
        <div className={styles.gridContainer}>
          {[
            { en: "Chart", th: "แผนภูมิ" },
            { en: "Form", th: "แบบฟอร์ม" },
            { en: "Pagination", th: "การแบ่งหน้า" },
            { en: "Progress", th: "ความคืบหน้า" },
            { en: "Checkbox", th: "ช่องทำเครื่องหมาย" },
            { en: "Dropdown", th: "เมนูแบบเลื่อนลง" },
            { en: "Filter", th: "ตัวกรอง" },
            { en: "Menu", th: "เมนู" },
            { en: "Button", th: "ปุ่ม" },
            { en: "Animation", th: "การเคลื่อนไหว" },
            { en: "Notification", th: "การแจ้งเตือน" },
            { en: "Modal", th: "หน้าต่างป็อปอัพ" },
            { en: "Table", th: "ตาราง" },
            { en: "Website Layout", th: "โครงสร้างเว็บไซต์" },
            { en: "Search Field", th: "ช่องค้นหา" },
          ].map((el, index) => (
            <div key={index} className={styles.gridItem}>
              <p className={styles.typeEN}>{el.en}</p>
              <p className={styles.typeTH}>{el.th}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <section className={`${styles.section} ${styles.footerSection}`}>
        <div className={styles.details}>
          <div className={styles.icon}>
            <Player
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
          <Player autoplay loop src={teamwork} />
        </div>
      </section>
    </TranslationsProvider>
  );
}
