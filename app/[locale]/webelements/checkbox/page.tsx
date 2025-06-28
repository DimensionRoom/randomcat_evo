"use client";
import React, { useState, useEffect, useRef, ReactNode } from "react";
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
import styles from "./Checkbox.module.scss";

type ElementTypeItem = {
  id: string;
  name: string;
  description: string;
  detail: string;
  prompt: string;
  example: ReactNode;
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
  const [elementsItems, setElementsItems] = useState<ElementTypeItem[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items: ElementTypeItem[] = [
      {
        id: "checkbox-basic",
        name: "Basic Checkbox",
        description: "กล่องเลือกพื้นฐานพร้อมตกแต่งด้วย SCSS",
        detail: "เหมาะสำหรับใช้ในแบบฝึกหัดหรือแบบทดสอบที่ต้องการเลือกหลายคำตอบ",
        prompt: `สร้าง Checkbox แบบพื้นฐานที่ตกแต่งด้วย SCSS เช่น เพิ่มขอบมน เปลี่ยนสีเมื่อ hover และใช้ font ที่อ่านง่าย เหมาะสำหรับนักเรียน`,
        example: (
          <div className={styles.customCheckboxBox}>
            <label className={styles.customCheckbox}>
              <input type="checkbox" />
              <span className={styles.checkmark}></span>
              ตัวเลือกที่ 1
            </label>
          </div>
        ),
      },
      {
        id: "checkbox-label-icon",
        name: "Icon Checkbox",
        description: "กล่องเลือกแบบไอคอนหัวใจ (SVG)",
        detail:
          "เหมาะสำหรับกิจกรรมเลือกสิ่งที่ชอบ เช่น เนื้อหาหรือสื่อการเรียนรู้",
        prompt: `ออกแบบ Checkbox ที่ใช้ SVG รูปหัวใจแทน checkbox ปกติ โดยหัวใจจะว่างเปล่าก่อนคลิก และจะกลายเป็นหัวใจเต็มสีแดงเมื่อคลิกเลือก`,
        example: (
          <label className={styles.iconCheckbox}>
            <input type="checkbox" className={styles.favInput} />
            <svg
              className={styles.heartIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.8 4.6c-1.5-1.5-4-1.5-5.6 0L12 7.8 8.8 4.6C7.2 3.1 4.7 3.1 3.2 4.6s-1.5 4 0 5.6l8.8 8.8 8.8-8.8c1.5-1.5 1.5-4 0-5.6z" />
            </svg>
          </label>
        ),
      },
      {
        id: "checkbox-color-option",
        name: "Color Option Checkbox",
        description: "กล่องเลือกสี ไม่มีข้อความ",
        detail: "เหมาะสำหรับกิจกรรมที่ให้ผู้เรียนเลือกสีหรืออารมณ์ความรู้สึก",
        prompt: `สร้างกล่อง Checkbox ที่แสดงเฉพาะสีกลมๆ หรือช่องสี่เหลี่ยมสี โดยไม่มีข้อความ ใช้สี #16e7d9, #3f29ab, #7c8cfd และ #e6a8ff`,
        example: (
          <div className={styles.colorOptions}>
            {["#16e7d9", "#3f29ab", "#7c8cfd", "#e6a8ff"].map(
              (color, index) => (
                <label
                  key={index}
                  className={styles.colorBox}
                  style={{ color }} // ใช้ currentColor
                >
                  <input type="checkbox" />
                  <span></span>
                </label>
              )
            )}
          </div>
        ),
      },
      {
        id: "checkbox-card",
        name: "Card Checkbox",
        description: "กล่องเลือกในรูปแบบการ์ด",
        detail:
          "เหมาะสำหรับให้ผู้เรียนเลือกหมวดเนื้อหา หรือกิจกรรมที่ชอบในรูปแบบการ์ดที่อ่านง่าย และกดเลือกได้สะดวก",
        prompt: `สร้าง Checkbox รูปแบบการ์ด (Card Checkbox) ที่มีข้อความอธิบายอยู่ด้านใน พร้อมพื้นที่แสดงชื่อหัวข้อ และตกแต่งด้วย SCSS ให้ขอบมน สีพื้นอ่อน และแสดงการเลือกด้วยการเปลี่ยนสีพื้นหลังและขอบ`,
        example: (
          <div className={styles.cardCheckbox}>
            <input type="checkbox" id="card-1" />
            <label htmlFor="card-1">
              <div className={styles.cardContent}>
                <h4>วิชาวิทยาศาสตร์</h4>
                <p>เรียนรู้เกี่ยวกับธรรมชาติ สิ่งมีชีวิต และเทคโนโลยีรอบตัว</p>
              </div>
            </label>
          </div>
        ),
      },
      {
        id: "checkbox-toggle",
        name: "Toggle Style Checkbox",
        description: "กล่องเลือกแบบ Toggle Switch",
        detail:
          "เหมาะกับกิจกรรมที่ต้องการเปิด/ปิด เช่น ยินยอมรับข้อตกลง หรือเปิดใช้คุณสมบัติ",
        prompt: `สร้าง Checkbox แบบ Toggle Switch โดยใช้ SCSS แสดงการเปลี่ยนสถานะ เช่น เปลี่ยนสีพื้นหลังและสไลด์ปุ่ม`,
        example: (
          <div className={styles.toggleWrapper}>
            <label className={styles.toggleSwitch}>
              <input type="checkbox" />
              <span className={styles.slider}></span>
            </label>
            <span className={styles.toggleLabel}>เปิดใช้งาน</span>
          </div>
        ),
      },
    ];

    setElementsItems(items);
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

  useEffect(() => {
    if (!loading && gridRef.current) {
      gridRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [loading]);

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
        <Player autoplay loop src={webelementLoad} style={{ width: "25vh" }} />
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
            onClick={() => window.open("https://www.think-tool.com", "_blank")}
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
          <span className={styles.elementName}>Checkbox UI</span>
          <br />
          เครื่องมือที่ใช้สำหรับเลือกหลายตัวเลือกในเวลาเดียวกัน
          <br />
          เหมาะสำหรับแบบฝึกหัด แบบสอบถาม
          หรือกิจกรรมที่เปิดโอกาสให้ผู้เรียนแสดงความเห็นหรือเลือกคำตอบได้หลากหลาย
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
