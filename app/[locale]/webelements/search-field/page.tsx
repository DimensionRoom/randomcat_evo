"use client";
import React, { useState, useEffect, useRef, ReactNode } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { Kanit, Quicksand, Mitr, Poppins } from "next/font/google";
import initTranslations from "@/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";
import webElementHeaderAnimate from "@/public/json/animate/webElementHeaderAnimate.json";
import signatureAnimate from "@/public/json/animate/signature.json";
import webelementLoad from "@/public/json/webelementLoad.json";
import teamwork from "@/public/json/animate/teamwork.json";
import FlatBtn from "@/components/Button/FlatBtn/FlatBtn";
import AutocompleteSearch from "./AutocompleteSearch/AutocompleteSearch";
import TagFilterSearch from "./TagFilterSearch/TagFilterSearch";
import CategoryFilterSearch from "./CategoryFilterSearch/CategoryFilterSearch";
import styles from "./SearchField.module.scss";

type ElementTypeItem = {
  id: string;
  name: string;
  description: string;
  detail: string;
  prompt: string;
  example: ReactNode;
};

const i18nNamespaces = ["webElementsScreen"];
const kanit = Kanit({ subsets: ["latin"], weight: ["100","200","300","400","500","600","700","800","900"] });
const popins = Poppins({ subsets: ["latin"], weight: ["100","200","300","400","500","600","700","800","900"] });
const quicksand = Quicksand({ subsets: ["latin"], weight: ["300","400","500","600","700"] });
const mitr = Mitr({ subsets: ["thai"], weight: ["200","300","400","500","600","700"] });

export default function SearchFieldUiScreen({ params: { locale } }: { params: { locale: string } }) {
  const [t, setT] = useState<any>(null);
  const [resources, setResources] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [elementsItems, setElementsItems] = useState<ElementTypeItem[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mockSuggestions = [
      "วิทยาศาสตร์ ม.1",
      "วิทยาศาสตร์ ม.2",
      "ชีววิทยา ม.ปลาย",
      "ฟิสิกส์ ม.ปลาย",
      "เคมีเบื้องต้น"
    ];

    const mockTags = ["คณิตศาสตร์", "วิทยาศาสตร์", "ภาษาอังกฤษ"];

    setElementsItems([
      {
        id: "categoryfilter",
        name: "Category Filter Search",
        description: "ค้นหาข้อมูลด้วยการเลือกหมวดหมู่ก่อนพิมพ์คำค้น",
        detail: "ผู้ใช้สามารถเลือกหมวดหมู่ (เช่น วิชา หรือระดับชั้น) จากเมนูดรอปดาวน์ แล้วจึงพิมพ์คำค้นเพื่อกรองผลลัพธ์อย่างแม่นยำ เหมาะสำหรับระบบคลังเนื้อหาขนาดใหญ่ เช่น คลังบทเรียนหรือหลักสูตร",
        prompt: "สร้างช่องค้นหาที่มี dropdown สำหรับเลือกหมวดหมู่ก่อน จากนั้นให้ผู้ใช้พิมพ์คำค้นเพื่อแสดงผลลัพธ์ที่ตรงกับหมวดหมู่และคำค้น เช่น วิชา: วิทยาศาสตร์ + คำค้น: 'ฟิสิกส์'",
        example: (
          <CategoryFilterSearch/>
        )
      },
      {
        id: "tagfilter",
        name: "Tag Filter Search",
        description: "ค้นหาโดยการเลือกแท็กคำหลัก เช่น วิชา หรือหัวข้อ",
        detail: "แสดงแท็กที่สามารถเลือกเพื่อกรองเนื้อหา และสามารถพิมพ์คำค้นเพิ่มเติมเพื่อแสดงผลลัพธ์ที่แม่นยำ เหมาะกับระบบแสดงบทเรียนหรือเนื้อหาหมวดหมู่",
        prompt: "ออกแบบช่องค้นหาที่ให้ผู้ใช้เลือกแท็กคำหลักได้ เช่น 'คณิตศาสตร์', 'ภาษาอังกฤษ' พร้อมช่อง input สำหรับค้นหาคำเพิ่มเติม",
        example: (
          <TagFilterSearch/>
        )
      },
      {
        id: "autocomplete",
        name: "Autocomplete Search",
        description: "แนะนำคำค้นอัตโนมัติทันทีที่ผู้ใช้เริ่มพิมพ์",
        detail: "ช่วยให้ผู้ใช้สามารถค้นหาเนื้อหาหรือคำสำคัญได้เร็วขึ้นโดยแสดงคำแนะนำแบบเรียลไทม์ เหมาะกับระบบค้นหาที่มีคำยอดนิยม หรือคำศัพท์เฉพาะทาง",
        prompt: "สร้างระบบ autocomplete ที่แนะนำคำค้นทันทีที่ผู้ใช้เริ่มพิมพ์ โดยสามารถคลิกเลือกคำที่แนะนำเพื่อกรอกลงในช่องค้นหาโดยอัตโนมัติ",
        example: (
          <AutocompleteSearch/>
        )
      }
    ]);
  }, [searchQuery]);

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
      <div style={{ display: "flex", flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Player autoplay loop src={webelementLoad} style={{ width: "25vh" }} />
      </div>
    );
  }

  return (
    <TranslationsProvider namespaces={i18nNamespaces} locale={locale} resources={resources}>
      <section className={`${styles.section} ${styles.parallaxSection} ${mitr.className} ${styles.thfontlight}`}>
        <div className={styles.headerContainer}>
          <div className={styles.specialCredit}>
            <div className={styles.icon}>
              <Player keepLastFrame autoplay loop={false} src={signatureAnimate} />
            </div>
            <p className={styles.specialText}>
              Think-Tool<br /> Speacial Project
            </p>
          </div>
          <h1 className={styles.title}>AI WEBSITE</h1>
          <h1 className={styles.title}>Elements &</h1>
          <h1 className={styles.title}>Prompts</h1>
          <p className={styles.subtitle}>
            เว็บไซต์ที่รวบรวมชื่อของส่วนประกอบหน้าตาการ<br />ออกแบบเว็บไซต์พร้อม prompt สำหรับนำไปใช้งาน
          </p>
          <FlatBtn className={styles.learnButton} text="LEARN MORE ABOUT US " onClick={() => window.open("https://www.think-tool.com", "_blank")} />
        </div>
        <div className={styles.headerImage}>
          <Player autoplay loop src={webElementHeaderAnimate} style={{ width: "100%" }} />
        </div>
      </section>

      <section className={`${styles.section} ${styles.elementsTypeSection} ${mitr.className}`}>
        <p className={styles.centerText}>
          <span className={styles.elementName}>Search Field UI</span><br />
          การใช้ช่องค้นหา (Search Field) เพื่อกรอกคำค้นหรือคำสำคัญ<br />
          ช่วยให้ผู้ใช้งานสามารถเข้าถึงข้อมูลที่ต้องการได้อย่างรวดเร็วและมีประสิทธิภาพ
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

      <section className={`${styles.section} ${styles.footerSection}`}>
        <div className={styles.details}>
          <div className={styles.icon}>
            <Player keepLastFrame autoplay loop={false} src={signatureAnimate} />
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
