"use client";
import React, { useState, useEffect, useRef, ReactNode } from "react";
import LottiePlayer from "@/components/Loading/LottiePlayer";

import initTranslations from "@/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";
import templateLoad from "@/public/json/templateload.json";
import webElementHeaderAnimate from "@/public/json/animate/webElementHeaderAnimate.json";
import signatureAnimate from "@/public/json/animate/signature.json";
import webelementLoad from "@/public/json/webelementLoad.json";
import teamwork from "@/public/json/animate/teamwork.json";
import FlatBtn from "@/components/Button/FlatBtn/FlatBtn";
import styles from "./Dropdown.module.scss";
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

export default function DropdownUiScreen({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const [t, setT] = useState<any>(null);
  const [resources, setResources] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [elementsItems, setElementsItems] = useState<ElementTypeItem[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const gridRef = useRef<HTMLDivElement>(null); // ✅ reference to scroll

  const MultiSelectDropdown = () => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<string[]>([]);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (
          wrapperRef.current &&
          !wrapperRef.current.contains(e.target as Node)
        ) {
          setOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    const toggleSelect = (value: string) => {
      setSelected((prev) =>
        prev.includes(value)
          ? prev.filter((v) => v !== value)
          : [...prev, value]
      );
    };
    const options = [
      { value: "math", label: "คณิตศาสตร์" },
      { value: "science", label: "วิทยาศาสตร์" },
      { value: "english", label: "ภาษาอังกฤษ" },
      { value: "history", label: "ประวัติศาสตร์" },
      { value: "thai", label: "ภาษาไทย" },
    ];

    const selectedLabels =
      selected
        .map((v) => options.find((o) => o.value === v)?.label)
        .filter(Boolean)
        .join(", ") || "เลือกวิชา";

    return (
      <div ref={wrapperRef} style={{ maxWidth: "280px", fontSize: "1rem" }}>
        <label
          style={{
            display: "block",
            marginBottom: "8px",
            fontWeight: "600",
            color: "#374151",
          }}
        >
          เลือกวิชาที่สนใจ (ได้มากกว่า1)
        </label>
        <div
          onClick={() => setOpen(!open)}
          style={{
            padding: "10px 14px",
            borderRadius: "8px",
            border: "1px solid #d1d5db",
            backgroundColor: "#fff",
            cursor: "pointer",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            userSelect: "none",
          }}
        >
          <span style={{ color: "#111827" }}>{selectedLabels}</span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 20 20"
            fill="none"
            stroke="#6b7280"
            strokeWidth="1.5"
            xmlns="http://www.w3.org/2000/svg"
            style={{ marginLeft: "8px" }}
          >
            <path
              d="M6 8l4 4 4-4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {open && (
          <div
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              marginTop: "4px",
              padding: "10px",
              background: "#fff",
              boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
              position: "absolute",
              zIndex: 1000,
              width: "100%",
            }}
          >
            {options.map((opt) => (
              <label
                key={opt.value}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "6px",
                  gap: "8px",
                  fontSize: "0.95rem",
                  color: "#374151",
                }}
              >
                <input
                  type="checkbox"
                  checked={selected.includes(opt.value)}
                  onChange={() => toggleSelect(opt.value)}
                />
                {opt.label}
              </label>
            ))}
          </div>
        )}
      </div>
    );
  };

  useEffect(() => {
    setElementsItems([
      {
        id: "minimal-dropdown",
        name: "Minimal Dropdown",
        description:
          "เหมาะสำหรับ: หน้าแบบฟอร์มหรือระบบที่เน้นการใช้งานที่รวดเร็วและสะอาดตา",
        detail: `
Dropdown ที่มีดีไซน์เรียบ ๆ ขอบบาง และไม่มีพื้นหลังเด่นชัด 
เหมาะสำหรับระบบแบบฟอร์มหรือ LMS ที่ไม่ต้องการรบกวนสายตา
  `,
        prompt:
          "สร้าง Dropdown สไตล์มินิมอล ขอบบาง ไม่มีพื้นหลังเด่น พร้อมข้อความ 'เลือกหมวดหมู่'",
        example: (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              maxWidth: "260px",
            }}
          >
            <label
              htmlFor="category"
              style={{
                fontWeight: "500",
                fontSize: "0.95rem",
                color: "#374151",
              }}
            >
              เลือกหมวดหมู่
            </label>
            <div style={{ position: "relative" }}>
              <select
                id="category"
                style={{
                  width: "100%",
                  padding: "8px 36px 8px 12px",
                  fontSize: "1rem",
                  border: "1px solid #d1d5db",
                  borderRadius: "6px",
                  backgroundColor: "#fff",
                  color: "#111827",
                  appearance: "none",
                  boxShadow: "none",
                  transition: "border-color 0.2s ease",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#7c8cfd")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#d1d5db")}
              >
                <option value="">-- เลือก --</option>
                <option>คณิตศาสตร์</option>
                <option>ประวัติศาสตร์</option>
                <option>วิทยาศาสตร์</option>
              </select>

              {/* ลูกศร SVG เล็ก เรียบ */}
              <svg
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  width: "12px",
                  height: "12px",
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  pointerEvents: "none",
                  stroke: "#6b7280",
                  strokeWidth: 1.5,
                }}
              >
                <path
                  d="M6 8l4 4 4-4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        ),
      },
      {
        id: "nested-dropdown",
        name: "Grouped (Nested) Dropdown",
        description:
          "เหมาะสำหรับ: การเลือกจากกลุ่ม เช่น วิชาตามช่วงชั้น ป.1–3, ป.4–6",
        detail: `
Dropdown แบบกลุ่มที่แยกหัวข้อออกเป็นหมวดหมู่ 
เหมาะกับการเลือกวิชาโดยแบ่งตามช่วงชั้นหรือกลุ่มสาระวิชา
  `,
        prompt:
          "สร้าง Dropdown แบบมีหมวดหมู่วิชา เช่น ป.1–3 และ ป.4–6 แยกแต่ละวิชาในกลุ่ม พร้อมลูกศรเล็กและจัดวางอย่างเหมาะสม",
        example: (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              maxWidth: "260px",
            }}
          >
            <label
              htmlFor="grouped-subject"
              style={{
                fontWeight: "600",
                color: "#374151",
                fontSize: "0.95rem",
              }}
            >
              เลือกวิชา
            </label>
            <div style={{ position: "relative" }}>
              <select
                id="grouped-subject"
                style={{
                  width: "100%",
                  padding: "10px 36px 10px 14px",
                  borderRadius: "10px",
                  border: "1px solid #ccc",
                  backgroundColor: "#fff",
                  color: "#111827",
                  fontWeight: 500,
                  fontSize: "1rem",
                  appearance: "none",
                  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.06)",
                  cursor: "pointer",
                }}
              >
                <optgroup label="ระดับ ป.1 – ป.3">
                  <option>คณิตพื้นฐาน</option>
                  <option>วิทยาศาสตร์เบื้องต้น</option>
                </optgroup>
                <optgroup label="ระดับ ป.4 – ป.6">
                  <option>คณิตประยุกต์</option>
                  <option>วิทยาศาสตร์ทดลอง</option>
                </optgroup>
              </select>

              {/* ลูกศร SVG ขนาดเล็ก */}
              <svg
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  width: "12px",
                  height: "12px",
                  position: "absolute",
                  right: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  pointerEvents: "none",
                  stroke: "#6b7280",
                  strokeWidth: 1.8,
                }}
              >
                <path
                  d="M6 8l4 4 4-4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        ),
      },
      {
        id: "gradient-dropdown",
        name: "Gradient Dropdown",
        description: "เหมาะสำหรับ: สื่อการเรียนรู้หรือเกมการศึกษา เน้นความสดใส",
        detail: `
Dropdown ที่มีพื้นหลังไล่สีเพื่อดึงดูดความสนใจ 
เหมาะสำหรับแพลตฟอร์มเด็กหรือเกมการเรียนรู้
  `,
        prompt:
          "สร้าง Dropdown พื้นหลังไล่สี (gradient) สำหรับเลือกกิจกรรม เช่น เกม, แบบฝึกหัด, วิดีโอ พร้อมเงา ขอบมน และเอฟเฟกต์ hover",
        example: (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              maxWidth: "240px",
            }}
          >
            <label
              htmlFor="activity"
              style={{
                fontWeight: "600",
                color: "#374151",
                fontSize: "0.95rem",
              }}
            >
              เลือกกิจกรรม
            </label>
            <div style={{ position: "relative" }}>
              <select
                id="activity"
                style={{
                  width: "100%",
                  padding: "10px 36px 10px 16px", // เพิ่ม padding ขวาเผื่อ space ลูกศร
                  borderRadius: "10px",
                  border: "none",
                  appearance: "none",
                  background: "linear-gradient(to right, #a78bfa, #34d399)",
                  color: "#ffffff",
                  fontWeight: 600,
                  fontSize: "1rem",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
                  cursor: "pointer",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "scale(1.02)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 14px rgba(0,0,0,0.2)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 10px rgba(0, 0, 0, 0.15)";
                }}
              >
                <option>เกม</option>
                <option>แบบฝึกหัด</option>
                <option>วิดีโอ</option>
              </select>
              {/* ลูกศร SVG ขนาดเล็ก */}
              <svg
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  width: "12px",
                  height: "12px",
                  position: "absolute",
                  right: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  pointerEvents: "none",
                  stroke: "#ffffff",
                  strokeWidth: 2,
                }}
              >
                <path
                  d="M6 8l4 4 4-4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        ),
      },
      {
        id: "icon-dropdown",
        name: "Dropdown with Icons",
        description:
          "เหมาะสำหรับ: ใช้ไอคอนแสดงประเภทข้อมูล เช่น ภาษา สื่อ หรือสถานะ",
        detail: `
Dropdown ที่แต่ละตัวเลือกมีไอคอนแสดงความหมาย 
ช่วยให้ผู้เรียนตัดสินใจเร็วขึ้น เช่น เลือกภาษา พร้อมธง
  `,
        prompt:
          "สร้าง Dropdown พร้อมไอคอน เช่น ธงชาติหน้าแต่ละภาษา พร้อมไอคอนลูกศร SVG ขนาดเล็กทางด้านขวา",
        example: (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              maxWidth: "240px",
            }}
          >
            <label
              htmlFor="lang"
              style={{
                fontWeight: "600",
                color: "#374151",
                fontSize: "0.95rem",
              }}
            >
              เลือกภาษา
            </label>
            <div style={{ position: "relative" }}>
              <select
                id="lang"
                style={{
                  width: "100%",
                  padding: "10px 36px 10px 16px", // เพิ่ม padding ขวาเพื่อไม่ให้ทับลูกศร
                  borderRadius: "10px",
                  border: "1px solid #ccc",
                  backgroundColor: "#fff",
                  color: "#111827",
                  fontWeight: 500,
                  fontSize: "1rem",
                  appearance: "none",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.06)",
                  cursor: "pointer",
                  transition: "box-shadow 0.2s, transform 0.2s",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 6px 14px rgba(0,0,0,0.1)";
                  e.currentTarget.style.transform = "scale(1.02)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 4px 10px rgba(0, 0, 0, 0.06)";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <option>🇹🇭 ไทย</option>
                <option>🇬🇧 อังกฤษ</option>
                <option>🇨🇳 จีน</option>
              </select>

              {/* SVG Arrow Icon */}
              <svg
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  width: "14px",
                  height: "14px",
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  pointerEvents: "none",
                  stroke: "#6b7280",
                  strokeWidth: 1.8,
                }}
              >
                <path
                  d="M6 8l4 4 4-4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        ),
      },
      {
        id: "language-switcher-dropdown",
        name: "Multi Select Dropdown",
        description:
          "เหมาะสำหรับ: เลือกหลายภาษาที่ต้องการใช้งานหรือแสดงผลพร้อมกัน เช่น แสดง UI ทั้งภาษาไทยและอังกฤษ",
        detail: `
Multi-select dropdown สำหรับเลือกหลายภาษาในเวลาเดียวกัน 
เหมาะกับระบบที่รองรับเนื้อหาและผู้ใช้หลายภาษา เช่น แพลตฟอร์มเรียนรู้ข้ามชาติ
สามารถใช้เพื่อเลือกภาษาที่ต้องการเปิดใช้งานพร้อมกันในเอกสาร เว็บไซต์ หรือระบบแสดงผล
  `,
        prompt:
          "สร้าง Multi select dropdown สำหรับเลือกหลายภาษา เช่น ไทย อังกฤษ จีน พร้อม label 'เลือกภาษา'",
        example: <MultiSelectDropdown />,
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

  // ✅ Auto-scroll after loading is false
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
        <LottiePlayer autoplay loop src={webelementLoad} style={{ width: "25vh" }} />
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
              <LottiePlayer
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
          <LottiePlayer
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
          <span className={styles.elementName}>Dropdown UI</span>
          <br />
          รูปแบบเมนูแบบเลื่อนลง เหมาะสำหรับการแสดงตัวเลือกจำนวนมากในพื้นที่จำกัด
          <br />
          เช่น การเลือกหมวดหมู่ การตั้งค่า หรือการกรอกข้อมูลแบบมีตัวเลือก
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
    </TranslationsProvider>
  );
}
