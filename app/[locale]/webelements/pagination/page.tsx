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
import styles from "./Pagination.module.scss";

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

export default function PaginationUiScreen({
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

  const BasicPagination = () => {
    const [currentPage, setCurrentPage] = React.useState(2);
    const totalPages = 4;

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
      <div
        style={{
          display: "flex",
          gap: "8px",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          style={{
            padding: "6px 12px",
            backgroundColor: currentPage === 1 ? "#f3f4f6" : "#e0e7ff",
            color: currentPage === 1 ? "#9ca3af" : "#3730a3",
            border: "none",
            borderRadius: "6px",
            fontSize: "0.95rem",
            cursor: currentPage === 1 ? "not-allowed" : "pointer",
          }}
        >
          Previous
        </button>

        {pages.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            style={{
              padding: "6px 12px",
              backgroundColor: currentPage === page ? "#6366f1" : "#ffffff",
              color: currentPage === page ? "#ffffff" : "#374151",
              border: currentPage === page ? "none" : "1px solid #d1d5db",
              borderRadius: "6px",
              fontWeight: currentPage === page ? "600" : "400",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          style={{
            padding: "6px 12px",
            backgroundColor: currentPage === totalPages ? "#f3f4f6" : "#e0e7ff",
            color: currentPage === totalPages ? "#9ca3af" : "#3730a3",
            border: "none",
            borderRadius: "6px",
            fontSize: "0.95rem",
            cursor: currentPage === totalPages ? "not-allowed" : "pointer",
          }}
        >
          Next
        </button>
      </div>
    );
  };

  const LoadMore = () => {
    const [items, setItems] = React.useState<string[]>([
      "แบบฝึกหัดที่ 1",
      "แบบฝึกหัดที่ 2",
      "แบบฝึกหัดที่ 3",
    ]);

    const [isLoading, setIsLoading] = React.useState(false);

    const handleLoadMore = () => {
      setIsLoading(true);
      setTimeout(() => {
        setItems((prev) => [
          ...prev,
          `แบบฝึกหัดที่ ${prev.length + 1}`,
          `แบบฝึกหัดที่ ${prev.length + 2}`,
        ]);
        setIsLoading(false);
      }, 1000); // จำลองการโหลด
    };

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <ul style={{ paddingLeft: "20px", margin: 0 }}>
          {items.map((item, index) => (
            <p key={index} style={{ color: "#374151", fontSize: "0.95rem" }}>
              {item}
            </p>
          ))}
        </ul>
        <button
          onClick={handleLoadMore}
          disabled={isLoading}
          style={{
            padding: "10px 20px",
            backgroundColor: "#6366f1",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: isLoading ? "not-allowed" : "pointer",
            fontSize: "0.95rem",
            fontWeight: "500",
          }}
        >
          {isLoading ? "กำลังโหลด..." : "Load More"}
        </button>
      </div>
    );
  };

  const CompactPagination = () => {
    const [currentQuestion, setCurrentQuestion] = React.useState(3);
    const totalQuestions = 10;

    return (
      <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        <button
          onClick={() => setCurrentQuestion((prev) => Math.max(prev - 1, 1))}
          disabled={currentQuestion === 1}
          style={{
            padding: "8px 16px",
            backgroundColor: currentQuestion === 1 ? "#f3f4f6" : "#e0e7ff",
            border: "none",
            borderRadius: "8px",
            color: currentQuestion === 1 ? "#9ca3af" : "#3730a3",
            fontWeight: "500",
            fontSize: "0.95rem",
            cursor: currentQuestion === 1 ? "not-allowed" : "pointer",
          }}
        >
          ← ก่อนหน้า
        </button>
        <span style={{ color: "#6b7280", fontSize: "0.9rem" }}>
          คำถาม {currentQuestion} จาก {totalQuestions}
        </span>
        <button
          onClick={() =>
            setCurrentQuestion((prev) => Math.min(prev + 1, totalQuestions))
          }
          disabled={currentQuestion === totalQuestions}
          style={{
            padding: "8px 16px",
            backgroundColor:
              currentQuestion === totalQuestions ? "#f3f4f6" : "#e0e7ff",
            border: "none",
            borderRadius: "8px",
            color: currentQuestion === totalQuestions ? "#9ca3af" : "#3730a3",
            fontWeight: "500",
            fontSize: "0.95rem",
            cursor:
              currentQuestion === totalQuestions ? "not-allowed" : "pointer",
          }}
        >
          ถัดไป →
        </button>
      </div>
    );
  };

  useEffect(() => {
    setElementsItems([
      {
        id: "basic-pagination",
        name: "Basic Pagination",
        description: "เหมาะสำหรับ: รายการบทเรียนหรือบทความในระบบ LMS",
        detail: `
รูปแบบการแบ่งหน้าพื้นฐาน เช่น ปุ่มเลขหน้า (1, 2, 3...) พร้อมปุ่มถัดไป/ก่อนหน้า
เหมาะสำหรับการเรียกดูรายการเนื้อหาที่ยาว เช่น บทเรียนหรือข่าวการศึกษา
      `,
        prompt:
          "สร้าง Pagination พื้นฐานสำหรับรายการบทความการศึกษา โดยมีเลขหน้าและปุ่มก่อนหน้า/ถัดไป",
        example: <BasicPagination />,
      },
      {
        id: "load-more",
        name: "Load More",
        description: "เหมาะสำหรับ: แบบฝึกหัดหรือเนื้อหาต่อเนื่องในแอปการศึกษา",
        detail: `
ปุ่ม "Load More" ช่วยให้ผู้ใช้สามารถโหลดเนื้อหาถัดไปโดยไม่เปลี่ยนหน้า
เหมาะสำหรับการแสดงเนื้อหาการเรียนรู้ต่อเนื่อง เช่น คลิปสอนหรือแบบฝึกหัด
      `,
        prompt: "สร้างปุ่ม Load More สำหรับเพิ่มเนื้อหาแบบฝึกหัดในแอปการศึกษา",
        example: <LoadMore />,
      },
      {
        id: "infinite-scroll",
        name: "Infinite Scroll",
        description: "เหมาะสำหรับ: รายวิชาหรือบทเรียนในแอปบนมือถือ",
        detail: `
โหลดเนื้อหาใหม่โดยอัตโนมัติเมื่อผู้ใช้เลื่อนถึงด้านล่าง
เหมาะสำหรับแอปพลิเคชันบนมือถือ เช่น การเลื่อนดูรายวิชาหรือคอร์สเรียน
      `,
        prompt:
          "สร้างการโหลดแบบ Infinite Scroll สำหรับแสดงรายวิชาบนแพลตฟอร์มเรียนออนไลน์",
        example: (
          <div
            style={{
              width: "100%",
              maxHeight: "200px",
              overflowY: "auto",
              border: "1px solid #e5e7eb",
              borderRadius: "6px",
              padding: "12px",
              backgroundColor: "#f9fafb",
            }}
          >
            <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
              {[
                "บทเรียนที่ 1",
                "บทเรียนที่ 2",
                "บทเรียนที่ 3",
                "บทเรียนที่ 4",
                "บทเรียนที่ 5",
                "บทเรียนที่ 6",
                "บทเรียนที่ 7",
              ].map((item, index) => (
                <li
                  key={index}
                  style={{
                    padding: "8px 0",
                    borderBottom: "1px solid #e5e7eb",
                    color: "#374151",
                    fontSize: "0.95rem",
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>
            <div style={{ textAlign: "center", marginTop: "12px" }}>
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="#6366f1"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-loader"
              >
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
              </svg>
              <p
                style={{
                  marginTop: "4px",
                  fontSize: "0.85rem",
                  color: "#6b7280",
                }}
              >
                กำลังโหลดเนื้อหาเพิ่มเติม...
              </p>
            </div>
          </div>
        ),
      },
      {
        id: "compact-pagination",
        name: "Compact Pagination",
        description: "เหมาะสำหรับ: แบบสอบถามหรือการประเมินผลสั้น ๆ",
        detail: `
Pagination ที่แสดงเพียงปุ่ม ก่อนหน้า/ถัดไป โดยไม่แสดงหมายเลขหน้า
เหมาะกับสถานการณ์ที่ต้องการพื้นที่ UI ที่ประหยัด เช่น แบบสอบถามในห้องเรียน
      `,
        prompt:
          "สร้าง Compact Pagination สำหรับแสดงแบบสอบถามในห้องเรียนโดยไม่มีเลขหน้า",
        example: <CompactPagination />,
      },
      {
        id: "dropdown-pagination",
        name: "Dropdown Pagination",
        description: "เหมาะสำหรับ: การค้นหาหรือเลือกชุดคำถามในคลังข้อสอบ",
        detail: `
ให้ผู้ใช้เลือกหน้าที่ต้องการจาก Dropdown
เหมาะกับฐานข้อมูลขนาดใหญ่ เช่น คลังข้อสอบหรือชุดคำถาม
      `,
        prompt:
          "สร้าง Dropdown สำหรับเลือกหน้าในคลังข้อสอบเพื่อให้เข้าถึงชุดคำถามได้เร็วขึ้น",
        example: (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "6px",
              maxWidth: "240px",
            }}
          >
            <div style={{ position: "relative" }}>
              <select
                id="pageSelect"
                style={{
                  width: "100%",
                  padding: "10px 40px 10px 12px",
                  fontSize: "0.95rem",
                  border: "1px solid #d1d5db",
                  borderRadius: "8px",
                  backgroundColor: "#ffffff",
                  color: "#111827",
                  appearance: "none",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                  transition: "border-color 0.2s ease",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#6366f1")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#d1d5db")}
              >
                <option>หน้า 1</option>
                <option>หน้า 2</option>
                <option>หน้า 3</option>
                <option>หน้า 4</option>
                <option>หน้า 5</option>
                <option>หน้า 6</option>
              </select>

              {/* ลูกศร */}
              <svg
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  width: "16px",
                  height: "16px",
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
          <span className={styles.elementName}>Pagination UI</span>
          <br />
          รูปแบบการแบ่งหน้า เหมาะสำหรับการแสดงข้อมูลจำนวนมากโดยไม่ให้แสดงทั้งหมด
          <br />
          เช่น การแสดงรายการบทความ ผลลัพธ์จากการค้นหา
          หรือข้อมูลสินค้าในระบบอีคอมเมิร์ซ
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
