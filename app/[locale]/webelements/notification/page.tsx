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
import styles from "./Notification.module.scss";

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

export default function NotificationUiScreen({
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

  // Minimal SVG icons
  const IconCheck = (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="#2ecc71" strokeWidth="2" />
      <path
        d="M8 12l2 2 4-4"
        stroke="#2ecc71"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const IconWarning = (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 9v4"
        stroke="#f1c40f"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="12" cy="17" r="1" fill="#f1c40f" />
      <path
        d="M12 3L2 21h20L12 3z"
        stroke="#f1c40f"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );

  const IconInfo = (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="#3f29ab" strokeWidth="2" />
      <path
        d="M12 8h.01"
        stroke="#3f29ab"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M11 12h1v4h1"
        stroke="#3f29ab"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );

  const IconTime = (
    <svg width="25" height="25" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="#e67e22" strokeWidth="2" />
      <path
        d="M12 6v6l4 2"
        stroke="#e67e22"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const IconList = (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="4" cy="6" r="1.5" fill="#e6a8ff" />
      <circle cx="4" cy="12" r="1.5" fill="#e6a8ff" />
      <circle cx="4" cy="18" r="1.5" fill="#e6a8ff" />
      <line x1="8" y1="6" x2="20" y2="6" stroke="#e6a8ff" strokeWidth="2" />
      <line x1="8" y1="12" x2="20" y2="12" stroke="#e6a8ff" strokeWidth="2" />
      <line x1="8" y1="18" x2="20" y2="18" stroke="#e6a8ff" strokeWidth="2" />
    </svg>
  );

  useEffect(() => {
setElementsItems([
  {
    id: "toast",
    name: "Toast Notification",
    description: "แจ้งผลลัพธ์ทันทีแบบย่อ เช่น ส่งงานสำเร็จ",
    detail: "เหมาะกับสถานการณ์ที่ไม่ต้องการรบกวนผู้ใช้ เช่น แจ้งเตือนสั้นๆ หลังการกระทำ",
    prompt: "ออกแบบ Toast แจ้งเตือนเมื่อผู้เรียนส่งแบบฝึกหัดสำเร็จ พร้อมข้อความยืนยันสั้นๆ ที่เข้าใจง่าย",
    example: (
      <div
        style={{
          backgroundColor: "#c9fffb",
          color: "#000000",
          borderRadius: "12px",
          padding: "1rem 1.5rem",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.12)",
          maxWidth: 300,
          fontSize: "0.95rem",
          fontWeight: 400,
          display: "flex",
          alignItems: "center",
          gap: "0.6rem",
        }}
      >
        {IconCheck}
        ส่งแบบฝึกหัดสำเร็จแล้ว
      </div>
    ),
  },
  {
    id: "banner",
    name: "Banner Notification",
    description: "แบนเนอร์ประกาศบนสุด พร้อมขอบซ้ายแสดงสถานะ",
    detail: "ใช้แจ้งข่าวสารหรือประกาศสำคัญที่ต้องการให้ผู้ใช้สังเกตทันที",
    prompt: "สร้าง Banner เพื่อแจ้งเตือนกำหนดการปิดปรับปรุงระบบ โดยมีแถบสีแสดงความสำคัญด้านซ้าย",
    example: (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#ffe672",
          color: "#945b02",
          padding: "1rem 1.25rem",
          borderLeft: "6px solid #ffd200",
          borderRadius: "8px",
          maxWidth: 640,
          fontSize: "0.95rem",
          gap: "0.75rem",
        }}
      >
        {IconWarning}
        ระบบจะปิดปรับปรุง เวลา 22:00 - 00:00
      </div>
    ),
  },
  {
    id: "snackbar",
    name: "Snackbar",
    description: "แถบแจ้งเตือนด้านล่าง พร้อมปุ่ม 'ดูเพิ่มเติม'",
    detail: "เหมาะสำหรับแจ้งข้อความสั้นๆ พร้อมลิงก์ดำเนินการต่อ เช่น การบ้านใหม่",
    prompt: "ออกแบบ Snackbar ที่แจ้งว่ามีการบ้านใหม่ในรายวิชา พร้อมปุ่มให้ผู้เรียนคลิกดูรายละเอียดเพิ่มเติม",
    example: (
      <div
        style={{
          backgroundColor: "#7c8cfd",
          color: "#ffffff",
          padding: "0.85rem 1.2rem",
          borderRadius: "6px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: 420,
          fontSize: "0.95rem",
          gap: "1rem",
        }}
      >
        <span
          style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
        >
          {IconInfo} มีการบ้านใหม่ในรายวิชาคณิตศาสตร์
        </span>
        <button
          style={{
            backgroundColor: "#ffffff",
            color: "#3f29ab",
            padding: "0.4rem 0.9rem",
            border: "none",
            borderRadius: "4px",
            fontSize: "0.85rem",
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          ดูเพิ่มเติม
        </button>
      </div>
    ),
  },
  {
    id: "statusUpdate",
    name: "Status Update",
    description: "แจ้งสถานะการทำงาน พร้อมไอคอนและสีแสดงสถานะ",
    detail: "ใช้แสดงความคืบหน้าแบบเป็นขั้นตอน เช่น การอัปโหลดข้อสอบ",
    prompt: "สร้างกล่องแจ้งสถานะที่แสดงว่าผู้เรียนอัปโหลดข้อสอบเรียบร้อยแล้ว พร้อมจุดสถานะ",
    example: (
      <div
        style={{
          backgroundColor: "#d2f8e5",
          color: "#2c6e49",
          padding: "1rem 1.25rem",
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          maxWidth: 380,
          fontSize: "0.95rem",
          fontWeight: 500,
        }}
      >
        <div
          style={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            backgroundColor: "#2c6e49",
          }}
        />
        ข้อสอบของคุณอัปโหลดเรียบร้อยแล้ว (100%)
      </div>
    ),
  },
  {
    id: "inApp",
    name: "In-App Notification",
    description: "แสดงรายการแจ้งเตือน พร้อมหัวข้อด้านบน",
    detail: "เหมาะสำหรับแสดงรายการเนื้อหาใหม่แบบเรียงตามลำดับเวลา",
    prompt: "ออกแบบการแจ้งเตือนในแอปที่แสดงรายการบทเรียนหรือกิจกรรมใหม่ พร้อมแสดงเวลาที่เพิ่มแต่ละรายการ",
    example: (
      <div
        style={{
          backgroundColor: "#3f29ab",
          color: "#ffffff",
          padding: "0.5rem 1rem ",
          borderRadius: "12px",
          maxWidth: 400,
          fontSize: "0.95rem",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
          textAlign: "left",
        }}
      >
        <div
          style={{
            fontSize: "1rem",
            fontWeight: 600,
          }}
        >
          การแจ้งเตือน
        </div>

        {[
          {
            title: "เพิ่มแบบฝึกหัดเรื่องสมดุลเคมี",
            time: "5 นาทีที่แล้ว",
          },
          {
            title: "บทเรียนใหม่ “วิทยาศาสตร์สิ่งแวดล้อม”",
            time: "15 นาทีที่แล้ว",
          },
        ].map((item, index, arr) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "0.5rem",
              padding: "0.5rem 0",
              borderBottom:
                index !== arr.length - 1
                  ? "1px solid rgba(255, 255, 255, 0.15)"
                  : "none",
            }}
          >
            <div style={{ flexShrink: 0 }}>{IconList}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600 }}>{item.title}</div>
              <div
                style={{
                  fontSize: "0.85rem",
                  opacity: 0.75,
                  marginTop: "0.25rem",
                }}
              >
                {item.time}
              </div>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "reminder",
    name: "Reminder Notification",
    description: "แจ้งเตือนกำหนดเวลาสำคัญ เช่น วันส่งงาน",
    detail: "ใช้เพื่อเตือนผู้เรียนล่วงหน้าให้เตรียมตัวทันเวลา",
    prompt: "ออกแบบ Reminder แจ้งเตือนวันส่งโครงงาน พร้อมแสดงวันที่และเวลาอย่างชัดเจน รวมถึงไอคอนแสดงเวลา",
    example: (
      <div
        style={{
          backgroundColor: "#ffffff",
          color: "#000000",
          border: "1px solid #e67e22",
          padding: "1rem 1.25rem",
          borderRadius: "10px",
          fontWeight: 500,
          maxWidth: 320,
          fontSize: "0.95rem",
          display: "flex",
          alignItems: "center",
          gap: "0.5em",
        }}
      >
        {IconTime}
        ส่งโครงงานภายในวันศุกร์ที่ <br />
        30 มิ.ย. ก่อน 18:00 น.
      </div>
    ),
  },
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
          <span className={styles.elementName}>Notification UI</span>
          <br />
          การแจ้งเตือนที่ชัดเจนและเหมาะสมกับบริบท
          <br />
          ช่วยให้ผู้ใช้ไม่พลาดข้อมูลสำคัญ
          พร้อมสร้างประสบการณ์ที่ดีในการใช้งานระบบ
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
