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
import styles from "./WebsiteLayout.module.scss";

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

useEffect(() => {
  const exampleLayouts: ElementTypeItem[] = [
    {
  id: "layout1",
  name: "Feature Grid",
  description: "แสดงกล่องคุณสมบัติในรูปแบบกริด",
  detail: "เหมาะสำหรับแสดงจุดเด่นของเว็บไซต์การศึกษา",
  prompt:
    "ออกแบบกริดคุณสมบัติ (Feature) ให้แสดงในแนวกริดพร้อมขนาดกล่องเท่าๆ กัน",
  example: (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "1rem",
        width: "100%",
        height: "100%",
      }}
    >
      {["#abf7f2", "#d0e4ff", "#e6a8ff"].map((color, i) => (
        <div
          key={i}
          style={{
            background: "#ffffff",
            borderRadius: "8px",
            padding: "1rem",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          {/* Mock Title */}
          <div
            style={{
              background: color,
              height: "20px",
              width: "60%",
              borderRadius: "4px",
              marginBottom: "0.5rem",
            }}
          />
          {/* Mock Detail */}
          <div
            style={{
              background: color,
              height: "10px",
              width: "100%",
              borderRadius: "4px",
              marginBottom: "0.25rem",
            }}
          />
          <div
            style={{
              background: color,
              height: "10px",
              width: "90%",
              borderRadius: "4px",
              marginBottom: "0.25rem",
            }}
          />
          <div
            style={{
              background: color,
              height: "10px",
              width: "75%",
              borderRadius: "4px",
            }}
          />
        </div>
      ))}
    </div>
  ),
},
    {
      id: "layout2",
      name: "Responsive Grid",
      description: "กล่องกริดที่ปรับจำนวนคอลัมน์ตามขนาดหน้าจอ",
      detail: "เหมาะสำหรับแสดงคอนเทนต์บนทุกอุปกรณ์",
      prompt:
        "สร้างเลย์เอาท์ที่ใช้กริดปรับคอลัมน์อัตโนมัติตามขนาดหน้าจอผู้ใช้",
      example: (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "1rem",
            width: "100%",
            height: "100%",
          }}
        >
          {[
            { color: "#abf7f2", label: "กล่องที่ 1" },
            { color: "#cbb9ff", label: "กล่องที่ 2" },
            { color: "#7c8cfd", label: "กล่องที่ 3" },
            { color: "#e6a8ff", label: "กล่องที่ 4" },
          ].map((box, i) => (
            <div
              key={i}
              style={{
                background: box.color,
                borderRadius: "6px",
                padding: "1rem",
                color: "#1f2937",
                textAlign: "center",
                minHeight: "100px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {box.label}
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "layout3",
      name: "Card Grid",
      description: "แสดงข้อมูลแบบการ์ด เช่น คอร์ส หรือทรัพยากร",
      detail: "เหมาะสำหรับรายการที่มีข้อมูลภาพรวม",
      prompt:
        "สร้างกริดที่แสดงการ์ดของแต่ละคอร์ส พร้อมพื้นที่แสดงหัวข้อ รายละเอียด และปุ่ม",
      example: (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1rem",
            width: "100%",
            height: "100%",
          }}
        >
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div
              key={n}
              style={{
                background: "#ffffff",
                border: "1px solid #d1d5db",
                borderRadius: "8px",
                padding: "1rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
              }}
            >
              <div>
                <div
                  style={{
                    background: "#7c8cfd",
                    height: "16px",
                    width: "60%",
                    marginBottom: "0.5rem",
                    borderRadius: "4px",
                  }}
                />
                <div
                  style={{
                    background: "#dcdfff",
                    height: "12px",
                    width: "100%",
                    borderRadius: "4px",
                  }}
                />
              </div>
              <div
                style={{
                  marginTop: "1rem",
                  height: "30px",
                  background: "#3f29ab",
                  borderRadius: "4px",
                }}
              />
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "layout4",
      name: "Dashboard Layout",
      description: "แดชบอร์ดแบบ 2 คอลัมน์ แสดงกล่องข้อมูลขนาดต่างกัน",
      detail: "ฝั่งซ้ายมี 1 กล่องใหญ่ ฝั่งขวามี 4 กล่องย่อย เรียงแบบกริด",
      prompt:
        "ออกแบบแดชบอร์ดแบบ 2 คอลัมน์ โดยฝั่งซ้ายมีกล่องข้อมูล 1 กล่องใหญ่ และฝั่งขวามีกล่องย่อย 4 กล่องเรียงในรูปแบบกริด",
      example: (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 3fr",
            gap: "1rem",
            width: "100%",
            height: "100%",
          }}
        >
          {/* คอลัมน์ซ้าย: 1 กล่องใหญ่ */}
          <div
            style={{
              background: "#abf7f2",
              borderRadius: "6px",
              height: "100%",
            }}
          />

          {/* คอลัมน์ขวา: 4 กล่องย่อย */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gridTemplateRows: "1fr 1fr",
              gap: "1rem",
              height: "100%",
            }}
          >
            <div
              style={{
                background: "#e6a8ff",
                borderRadius: "6px",
                height: "100%",
              }}
            />
            <div
              style={{
                background: "#cbb9ff",
                borderRadius: "6px",
                height: "100%",
              }}
            />
            <div
              style={{
                background: "#7c8cfd",
                borderRadius: "6px",
                height: "100%",
              }}
            />
            <div
              style={{
                background: "#3f29ab",
                borderRadius: "6px",
                height: "100%",
              }}
            />
          </div>
        </div>
      ),
    },
  ];

  setElementsItems(exampleLayouts);
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
          <span className={styles.elementName}>Website Layout UI</span>
          <br />
          การจัดวางโครงสร้างหน้าเว็บอย่างเป็นระบบ
          เพื่อให้ผู้ใช้งานเข้าถึงข้อมูลได้อย่างง่ายดาย
          <br />
          ตามหลัก UX / UI Design
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
