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
  LoginFormExample,
  RegisterFormExample,
  UploadFormExample,
  FeedbackFormExample
} from "./FormExample/FormExample";
import styles from "./Form.module.scss";

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

export default function FormUiScreen({
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
  const exampleStyle = (bgColor: string, textColor: string) => ({
    backgroundColor: bgColor,
    color: textColor,
    borderRadius: "12px",
    padding: "16px",
    textAlign: "center",
    fontWeight: 500,
  });

  const formItems: ElementTypeItem[] = [
    {
      id: "login",
      name: "Login Form",
      description: "แบบฟอร์มเข้าสู่ระบบสำหรับนักเรียนหรือบุคลากรทางการศึกษา",
      detail:
        "ใช้สำหรับยืนยันตัวตนก่อนเข้าใช้งานระบบ เช่น ระบบเรียนออนไลน์ หรือห้องเรียนเสมือน",
      prompt:
        "สร้างแบบฟอร์มเข้าสู่ระบบที่ประกอบด้วยช่องกรอกอีเมลและรหัสผ่าน พร้อมปุ่มเข้าสู่ระบบ มีการแสดงข้อความแจ้งเตือนหากกรอกข้อมูลไม่ครบหรือไม่ถูกต้อง",
      example: (
        <LoginFormExample/>
      ),
    },
    {
      id: "register",
      name: "Register Form",
      description: "แบบฟอร์มสมัครสมาชิกสำหรับนักเรียนใหม่",
      detail:
        "ใช้สำหรับกรอกข้อมูลส่วนตัวเพื่อสร้างบัญชีใช้งานในระบบการเรียนรู้",
      prompt:
        "ออกแบบแบบฟอร์มสมัครสมาชิกที่ประกอบด้วยชื่อ-นามสกุล อีเมล และ รหัสผ่าน พร้อมเช็กความถูกต้องของข้อมูลและยืนยันเงื่อนไขการใช้งาน",
      example: (
        <RegisterFormExample/>
      ),
    },
    {
      id: "upload",
      name: "Upload Assignment Form",
      description: "แบบฟอร์มส่งงานหรือไฟล์การบ้าน",
      detail: "ช่วยให้นักเรียนสามารถอัปโหลดไฟล์งานเพื่อส่งให้คุณครูได้ง่าย",
      prompt:
        "สร้างแบบฟอร์มอัปโหลดไฟล์ที่ให้นักเรียนเลือกวิชา แนบไฟล์ ส่งคำอธิบาย และปุ่มกดส่ง พร้อมแจ้งเตือนเมื่ออัปโหลดสำเร็จหรือเกิดข้อผิดพลาด",
      example: (
        <UploadFormExample/>
      ),
    },
    {
      id: "feedback",
      name: "Feedback Form",
      description: "แบบฟอร์มแสดงความคิดเห็นหรือประเมินการสอน",
      detail:
        "ให้นักเรียนหรือผู้ปกครองสามารถแสดงความคิดเห็นต่อบทเรียนหรือครูผู้สอน",
      prompt:
        "ออกแบบฟอร์มประเมินการสอนที่มีการให้คะแนนระดับความพึงพอใจ และช่องแสดงความคิดเห็นเพิ่มเติม พร้อมปุ่มส่งความคิดเห็น",
      example: (
        <FeedbackFormExample/>
      ),
    }
  ];

  setElementsItems(formItems);
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
          <span className={styles.elementName}>Form UI</span>
          <br />
          แบบฟอร์มคือพื้นที่ให้ผู้ใช้งานกรอกข้อมูล เช่น ชื่อหรืออีเมล
          <br />
          ช่วยให้ระบบรวบรวมข้อมูลและนำไปใช้งานได้อย่างเป็นระเบียบ
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
