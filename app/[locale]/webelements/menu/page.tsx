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
import {
  HorizonMenu,
  SidebarMenu,
  VerticalMenu,
  HamburgerMenu,
  TabMenu
} from "./MenuExample/MenuExamples";
import styles from "./Menu.module.scss";

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
    setElementsItems([
      {
        id: "menu1",
        name: "Horizon Menu",
        description: "เมนูแนวนอนด้านบน เหมาะกับโครงสร้างเนื้อหาหลัก",
        detail: "ช่วยให้ผู้ใช้นำทางได้รวดเร็ว เหมาะกับเว็บไซต์เรียนรู้",
        prompt:
          "สร้าง Horizon Menu สำหรับเว็บไซต์การศึกษา ที่มีหมวดหมู่: วิทยาศาสตร์, คณิตศาสตร์, ภาษาไทย, สังคมศึกษา",
        example: <HorizonMenu color="#3f29ab" />,
      },
      {
        id: "menu2",
        name: "Side Bar Menu",
        description: "เมนูด้านข้างสำหรับแสดงหมวดหมู่รายวิชา",
        detail: "เหมาะกับเว็บที่มีหลายฟีเจอร์ เช่น ครู นักเรียน วิชา",
        prompt:
          "สร้าง Side Bar Menu สำหรับระบบจัดการชั้นเรียน ที่มีเมนูหลัก: นักเรียน, ครูผู้สอน, วิชาเรียน, แบบฝึกหัด และสามารถกางเมนูย่อยแต่ละหัวข้อได้",
        example: <SidebarMenu color="#7c8cfd" />,
      },
      {
        id: "menu3",
        name: "Vertical Menu",
        description: "เมนูแนวตั้งเรียงจากบนลงล่าง",
        detail: "เหมาะกับคอร์สเรียนที่มีลำดับบทเรียน",
        prompt:
          "สร้าง Vertical Menu สำหรับเว็บไซต์สอนออนไลน์ ที่มีเนื้อหา, วิดีโอการสอน, แบบฝึกหัด, คำถามท้ายบท",
        example: <VerticalMenu color="#c03df4" />,
      },
      {
        id: "menu4",
        name: "Hamburger Menu",
        description: "เมนูไอคอน 3 ขีด ใช้งานสะดวกบนมือถือ",
        detail: "คลิกแล้วแสดงเมนูย่อยทั้งหมด",
        prompt:
          "สร้าง Hamburger Menu สำหรับแอปเรียนรู้บนมือถือ โดยแสดงหัวข้อหลัก: คลังบทเรียน, บันทึกผลการเรียน, ตั้งค่า เมื่อคลิกแล้วกางเมนูออก",
        example: <HamburgerMenu color="#006dca" />,
      },
      {
        id: "menu5",
        name: "Tab Menu",
        description: "เมนูแบบแท็บใช้เปลี่ยนหมวดภายในหน้าเดียวกัน",
        detail: "เช่น ทดสอบแบบแบ่งระดับชั้น",
        prompt:
          "สร้าง Tab Menu สำหรับหน้าทดสอบความรู้ ที่แบ่งหมวดเป็น ป.1-ป.3, ป.4-ป.6, ม.1-ม.3 และแต่ละแท็บเปลี่ยนเนื้อหาในหน้าโดยไม่โหลดใหม่",
        example: <TabMenu color="#5be1d8" />,
      }
    ]);
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
          <span className={styles.elementName}>Menu UI</span>
          <br />
          เมนูที่ได้รับการออกแบบอย่างเป็นระบบ
          <br />
          ช่วยให้ผู้ใช้สามารถนำทางและเข้าถึงเนื้อหาได้อย่างรวดเร็วและตรงจุด
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
