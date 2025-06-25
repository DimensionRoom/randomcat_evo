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
import styles from "./Button.module.scss";

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

  const ToggleBtn = () => {
    const [on, setOn] = useState(false);

    return (
      <div
        onClick={() => setOn(!on)}
        style={{
          width: "80px",
          height: "36px",
          borderRadius: "18px",
          backgroundColor: on ? "#34d399" : "#d1d5db",
          position: "relative",
          cursor: "pointer",
          transition: "background-color 0.3s ease-in-out",
          padding: "4px",
          boxSizing: "border-box",
        }}
      >
        {/* Toggle Thumb with text inside */}
        <div
          style={{
            width: "28px",
            height: "28px",
            borderRadius: "50%",
            backgroundColor: "#ffffff",
            boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
            position: "absolute",
            top: "4px",
            left: on ? "48px" : "4px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "0.7rem",
            fontWeight: 600,
            color: "#374151",
            transition: "left 0.25s ease-in-out",
          }}
        >
          {on ? "เปิด" : "ปิด"}
        </div>
      </div>
    );
  };

  const SplitDownloadButton = () => {
    const [showMenu, setShowMenu] = useState(false);

    return (
      <div style={{ position: "relative", display: "inline-block" }}>
        <div
          style={{
            display: "inline-flex",
            borderRadius: "8px",
            overflow: "hidden",
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
            border: "1px solid #7c8cfd",
          }}
        >
          {/* ปุ่มหลัก */}
          <button
            style={{
              backgroundColor: "#3f29ab",
              color: "#ffffff",
              padding: "10px 18px",
              border: "none",
              fontWeight: 600,
              fontSize: "0.95rem",
              cursor: "pointer",
            }}
            onClick={() => alert("ดาวน์โหลดเอกสารเริ่มต้น")}
          >
            ดาวน์โหลด
          </button>

          {/* ปุ่มลูกศร */}
          <button
            style={{
              backgroundColor: "#7c8cfd",
              color: "#abf7f2",
              border: "none",
              padding: "0 14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1rem",
              cursor: "pointer",
            }}
            title="เลือกชนิดไฟล์"
            onClick={() => setShowMenu(!showMenu)}
          >
            ▼
          </button>
        </div>

        {/* Dropdown Menu */}
        {showMenu && (
          <div
            style={{
              position: "absolute",
              top: "110%",
              right: 0,
              backgroundColor: "#ffffff",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
              borderRadius: "6px",
              overflow: "hidden",
              zIndex: 10,
              minWidth: "160px",
            }}
          >
            {["ดาวน์โหลด PDF", "ดาวน์โหลด Excel", "ดาวน์โหลด Word"].map(
              (option) => (
                <div
                  key={option}
                  style={{
                    padding: "10px 14px",
                    fontSize: "0.9rem",
                    cursor: "pointer",
                    color: "#111827",
                    borderBottom: "1px solid #f3f4f6",
                  }}
                  onClick={() => {
                    alert(`คุณเลือก: ${option}`);
                    setShowMenu(false);
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = "#f0fdf4")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor = "#ffffff")
                  }
                >
                  {option}
                </div>
              )
            )}
          </div>
        )}
      </div>
    );
  };

  useEffect(() => {
    setElementsItems([
      {
        id: "toggle-button",
        name: "Toggle Button",
        description:
          "เหมาะสำหรับ: การสลับสถานะ เช่น เปิด/ปิดเสียง หรือเปิด/ปิดระบบช่วยเหลือ",
        detail: `
ปุ่มสวิตช์เลื่อนซ้าย-ขวาพร้อมข้อความ "เปิด"/"ปิด" อยู่ภายในวงกลม 
พื้นหลังเปลี่ยนสีตามสถานะ เหมาะสำหรับเปิด-ปิดฟีเจอร์ เช่น เสียงหรือการแจ้งเตือน
  `,
        prompt:
          "สร้าง Toggle Switch แบบวงกลมเลื่อนซ้าย-ขวา พร้อมข้อความ 'เปิด' หรือ 'ปิด' อยู่ภายในวงกลม และเปลี่ยนสีพื้นหลังตามสถานะ (สีเขียวเมื่อเปิด, สีเทาเมื่อปิด)",
        example: <ToggleBtn />,
      },
      {
        id: "three-d-button",
        name: "3D Button",
        description:
          "เหมาะสำหรับ: ปุ่มดึงดูด เช่น 'กดเพื่อรับคะแนน', 'เริ่มเกมการเรียนรู้'",
        detail: `
ปุ่มที่มีเอฟเฟกต์ 3 มิติ เช่น เงา ลึก หรือกดแล้วดูยุบ เพื่อให้ผู้เรียนสนใจ 
เหมาะกับการใช้งานที่ต้องการแรงจูงใจ เช่น เกมในห้องเรียน หรือกิจกรรมสนุก
    `,
        prompt: "สร้างปุ่มข้อความ 'เริ่มเกม' มีเงาและเอฟเฟกต์ยุบเมื่อคลิก",
        example: (
          <button
            style={{
              backgroundColor: "#7c8cfd",
              color: "#fff",
              padding: "12px 24px",
              fontSize: "1rem",
              borderRadius: "12px",
              boxShadow: "0 6px #3f29ab",
              border: "none",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "all 0.1s",
            }}
            onMouseDown={(e) =>
              (e.currentTarget.style.transform = "translateY(3px)")
            }
            onMouseUp={(e) =>
              (e.currentTarget.style.transform = "translateY(0)")
            }
          >
            เริ่มเกม
          </button>
        ),
      },
      {
        id: "icon-button",
        name: "Icon Button",
        description:
          "เหมาะสำหรับ: การกระทำที่รวดเร็ว เช่น แก้ไข ลบ หรือดูรายละเอียด",
        detail: `
ปุ่มไอคอนทรงกลมที่เรียบง่าย เหมาะสำหรับใช้ในพื้นที่จำกัด เช่น มุมของการ์ดหรือรายการ 
แนะนำให้ใช้คู่กับ Tooltip เพื่อสื่อความหมายไอคอนให้ชัดเจน
  `,
        prompt:
          "สร้างปุ่มกลมสีขาวพร้อมเงา มีไอคอนดินสออยู่ตรงกลาง และเอฟเฟกต์ hover แบบยกขึ้นเล็กน้อย",
        example: (
          <button
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #3f29ab",
              borderRadius: "50%",
              width: "44px",
              height: "44px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
              transition: "all 0.2s ease-in-out",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.boxShadow = "0 2px 6px rgba(0, 0, 0, 0.05)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
            title="แก้ไข"
          >
            ✏️
          </button>
        ),
      },
      {
        id: "disabled-button",
        name: "Disabled Button",
        description:
          "เหมาะสำหรับ: สถานะที่ยังไม่สามารถกดได้ เช่น 'รอการอนุมัติ'",
        detail: `
ปุ่มที่ปิดการใช้งาน ช่วยให้ผู้ใช้รู้ว่าไม่สามารถกระทำได้ในขณะนี้ 
ควรใช้สีจางและเคอร์เซอร์แบบไม่อนุญาต เพื่อหลีกเลี่ยงความสับสน
    `,
        prompt: "สร้างปุ่มสีเทาข้อความ 'รออนุมัติ' และไม่สามารถคลิกได้",
        example: (
          <button
            disabled
            style={{
              backgroundColor: "#e5e7eb",
              color: "#9ca3af",
              border: "none",
              borderRadius: "10px",
              padding: "10px 20px",
              fontSize: "1rem",
              cursor: "not-allowed",
            }}
          >
            รออนุมัติ
          </button>
        ),
      },
      {
        id: "cta-learn-button",
        name: "Call-to-Action Button",
        description:
          "เหมาะสำหรับ: ปุ่มเชิญชวนเช่น 'เริ่มเรียนรู้' หรือ 'ลงทะเบียน'",
        detail: `
มักใช้ในหน้า Landing Page เพื่อเชิญชวนให้ผู้เรียนดำเนินการ เช่น เริ่มเรียน ลงทะเบียน 
ควรใช้สีสด ตัวอักษรชัด และมีเอฟเฟกต์ hover หรือ animation เล็กน้อย
    `,
        prompt:
          "สร้างปุ่มสีเขียวข้อความ 'เริ่มเรียนรู้' พร้อมเอฟเฟกต์ hover สว่างขึ้น",
        example: (
          <button
            style={{
              backgroundColor: "#7c8cfd",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              padding: "10px 20px",
              fontWeight: "bold",
              fontSize: "1rem",
              cursor: "pointer",
              transition: "background 0.3s",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#6ee7b7")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#34d399")
            }
          >
            เริ่มเรียนรู้
          </button>
        ),
      },
      {
        id: "split-button-download",
        name: "Split Button – Download",
        description:
          "เหมาะสำหรับ: ดาวน์โหลดไฟล์แบบมีตัวเลือก เช่น PDF, Excel, Word",
        detail: `
ปุ่มดาวน์โหลดที่ประกอบด้วยสองส่วน: 
ปุ่มหลักใช้ดาวน์โหลดเอกสารเริ่มต้นทันที และปุ่มลูกศรด้านขวาเปิดเมนูให้เลือกชนิดไฟล์เพิ่มเติม 
เหมาะกับสถานการณ์ที่ผู้ใช้ต้องการควบคุมรูปแบบการดาวน์โหลด
  `,
        prompt:
          "สร้างปุ่ม 'ดาวน์โหลด' ที่มีลูกศร dropdown ด้านขวา เมื่อกดจะแสดงเมนูให้เลือกชนิดไฟล์ เช่น PDF, Excel, Word พร้อมดีไซน์ขอบโค้งและเงาเบา ๆ",
        example: <SplitDownloadButton />,
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
          <span className={styles.elementName}>Button UI</span>
          <br />
          รูปแบบปุ่มที่เหมาะสำหรับการโต้ตอบกับผู้ใช้ เช่น การส่งข้อมูล
          <br />การยืนยันคำสั่ง และ การนำทางไปยังหน้าต่าง ๆ
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
