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
import styles from "./Table.module.scss";

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

  useEffect(() => {
    setElementsItems([
      {
        id: "table-basic",
        name: "Basic Table",
        description: "ตารางพื้นฐานสำหรับแสดงข้อมูลทั่วไป",
        detail:
          "เหมาะสำหรับข้อมูลทั่วไป เช่น รายชื่อห้องเรียนหรือวิชาที่เปิดสอน",
        prompt:
          "สร้างตารางพื้นฐานที่มีหัวตารางและแถวข้อมูลเกี่ยวกับวิชาในโรงเรียน",
        example: (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              border: "1px solid #ccc",
              backgroundColor: "#fff",
            }}
          >
            <thead style={{ backgroundColor: "#3f29ab" }}>
              <tr>
                <th
                  style={{
                    padding: "8px",
                    color: "#ffffff",
                    fontWeight: 500,
                    border: "1px solid #ccc",
                  }}
                >
                  วิชา
                </th>
                <th
                  style={{
                    padding: "8px",
                    color: "#ffffff",
                    fontWeight: 500,
                    border: "1px solid #ccc",
                  }}
                >
                  ครูผู้สอน
                </th>
                <th
                  style={{
                    padding: "8px",
                    color: "#ffffff",
                    fontWeight: 500,
                    border: "1px solid #ccc",
                  }}
                >
                  ห้องเรียน
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  style={{
                    padding: "8px",
                    color: "#000",
                    border: "1px solid #ccc",
                  }}
                >
                  คณิตศาสตร์
                </td>
                <td
                  style={{
                    padding: "8px",
                    color: "#000",
                    border: "1px solid #ccc",
                  }}
                >
                  อ.สมชาย
                </td>
                <td
                  style={{
                    padding: "8px",
                    color: "#000",
                    border: "1px solid #ccc",
                  }}
                >
                  301
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: "8px",
                    color: "#000",
                    border: "1px solid #ccc",
                  }}
                >
                  วิทยาศาสตร์
                </td>
                <td
                  style={{
                    padding: "8px",
                    color: "#000",
                    border: "1px solid #ccc",
                  }}
                >
                  อ.สุภาพร
                </td>
                <td
                  style={{
                    padding: "8px",
                    color: "#000",
                    border: "1px solid #ccc",
                  }}
                >
                  305
                </td>
              </tr>
            </tbody>
          </table>
        ),
      },
      {
        id: "table-striped",
        name: "Striped Table",
        description: "แสดงแถวแบบสลับสีเพื่อให้อ่านง่ายขึ้น",
        detail: "เหมาะกับรายชื่อนักเรียนหรือข้อมูลที่มีหลายแถว",
        prompt: "สร้างตารางรายชื่อนักเรียนโดยมีแถวสลับสีเพื่อให้อ่านง่าย",
        example: (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ backgroundColor: "#7c8cfd" }}>
              <tr>
                <th
                  style={{ padding: "8px", color: "#ffffff", fontWeight: 500 }}
                >
                  รหัส
                </th>
                <th
                  style={{ padding: "8px", color: "#ffffff", fontWeight: 500 }}
                >
                  ชื่อ-นามสกุล
                </th>
                <th
                  style={{ padding: "8px", color: "#ffffff", fontWeight: 500 }}
                >
                  ชั้น
                </th>
              </tr>
            </thead>
            <tbody>
              {["001", "002", "003"].map((id, index) => (
                <tr
                  key={id}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#eeeeee",
                  }}
                >
                  <td style={{ padding: "8px", color: "#000" }}>{id}</td>
                  <td style={{ padding: "8px", color: "#000" }}>
                    {index === 0
                      ? "อาทิตย์ ใจดี"
                      : index === 1
                      ? "จันทร์ อารมณ์ดี"
                      : "อังคาร อดทน"}
                  </td>
                  <td style={{ padding: "8px", color: "#000" }}>ม.2/3</td>
                </tr>
              ))}
            </tbody>
          </table>
        ),
      },
      {
        id: "table-material",
        name: "Material Design Table",
        description: "ตารางแนว Material UI พร้อมเงาและพื้นหลังเน้น",
        detail: "เหมาะสำหรับระบบรายงานผล หรือแดชบอร์ดการศึกษา",
        prompt: "สร้างตารางแนว Material Design เพื่อแสดงผลการเรียนของนักเรียน",
        example: (
          <div
            style={{
              background: "#fff",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              overflow: "hidden",
            }}
          >
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead style={{ backgroundColor: "#3f29ab" }}>
                <tr>
                  <th
                    style={{
                      padding: "12px",
                      color: "#ffffff",
                      fontWeight: 500,
                    }}
                  >
                    นักเรียน
                  </th>
                  <th
                    style={{
                      padding: "12px",
                      color: "#ffffff",
                      fontWeight: 500,
                    }}
                  >
                    คะแนนเฉลี่ย
                  </th>
                  <th
                    style={{
                      padding: "12px",
                      color: "#ffffff",
                      fontWeight: 500,
                    }}
                  >
                    ระดับผลสัมฤทธิ์
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ backgroundColor: "#f2f2f2" }}>
                  <td style={{ padding: "12px", color: "#000" }}>นราธิป</td>
                  <td style={{ padding: "12px", color: "#000" }}>89</td>
                  <td style={{ padding: "12px", color: "#000" }}>ดีมาก</td>
                </tr>
                <tr>
                  <td style={{ padding: "12px", color: "#000" }}>วิชญา</td>
                  <td style={{ padding: "12px", color: "#000" }}>75</td>
                  <td style={{ padding: "12px", color: "#000" }}>ดี</td>
                </tr>
              </tbody>
            </table>
          </div>
        ),
      },
      {
        id: "table-dashboard",
        name: "Dashboard Table",
        description: "แสดงข้อมูลแบบย่อพร้อมไอคอนหรือกราฟเล็ก ๆ",
        detail: "เหมาะกับแดชบอร์ดโรงเรียน หรือสถิติการเข้าเรียน",
        prompt: "สร้างตารางสไตล์แดชบอร์ดเพื่อติดตามการเข้าเรียนของนักเรียน",
        example: (
          <table
            style={{
              width: "100%",
              backgroundColor: "#fff",
              borderCollapse: "collapse",
            }}
          >
            <thead style={{ backgroundColor: "#3f29ab" }}>
              <tr>
                <th
                  style={{ padding: "10px", color: "#ffffff", fontWeight: 500 }}
                >
                  นักเรียน
                </th>
                <th
                  style={{ padding: "10px", color: "#ffffff", fontWeight: 500 }}
                >
                  เข้าเรียน (%)
                </th>
                <th
                  style={{ padding: "10px", color: "#ffffff", fontWeight: 500 }}
                >
                  สถานะ
                </th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ backgroundColor: "#f4f4f4" }}>
                <td style={{ padding: "10px", color: "#000" }}>พิชญ์</td>
                <td style={{ padding: "10px", color: "#000" }}>98%</td>
                <td style={{ padding: "10px", color: "#07b768" }}>
                  <span
                    style={{
                      backgroundColor: "#efffef",
                      padding: "2px 5px",
                      borderRadius: "10px",
                      border: "1px solid #07b768",
                    }}
                  >
                    ปกติ
                  </span>
                </td>
              </tr>
              <tr>
                <td style={{ padding: "10px", color: "#000" }}>ฐิติรัตน์</td>
                <td style={{ padding: "10px", color: "#000" }}>52%</td>
                <td style={{ padding: "10px", color: "#ff103d" }}>
                  <span
                    style={{
                      backgroundColor: "#ffeef1",
                      padding: "2px 5px",
                      borderRadius: "10px",
                      border: "1px solid #ff103d",
                    }}
                  >
                    เฝ้าระวัง
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        ),
      },
      {
        id: "table-borderless",
        name: "Borderless Table",
        description: "ตารางแบบไม่มีเส้นขอบ สะอาดตา",
        detail: "เหมาะสำหรับแสดงข้อมูลประกอบเนื้อหาหรือสรุปผล",
        prompt:
          "สร้างตารางแบบไม่มีเส้นขอบ เพื่อสรุปข้อมูลของนักเรียนอย่างเรียบง่าย",
        example: (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              backgroundColor: "#fff",
            }}
          >
            <thead>
              <tr style={{ color: "#3f29ab", fontWeight: "bold" }}>
                <th
                  style={{
                    padding: "10px",
                    textAlign: "center",
                    color: "#000",
                    fontWeight: 600,
                  }}
                >
                  ชื่อ
                </th>
                <th
                  style={{
                    padding: "10px",
                    textAlign: "center",
                    color: "#000",
                    fontWeight: 600,
                  }}
                >
                  ชั้น
                </th>
                <th
                  style={{
                    padding: "10px",
                    textAlign: "center",
                    color: "#000",
                    fontWeight: 600,
                  }}
                >
                  ผลรวมคะแนน
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "10px", color: "#000" }}>พลอยไพลิน</td>
                <td style={{ padding: "10px", color: "#000" }}>ม.3/2</td>
                <td style={{ padding: "10px", color: "#000" }}>285</td>
              </tr>
              <tr>
                <td style={{ padding: "10px", color: "#000" }}>อัครเดช</td>
                <td style={{ padding: "10px", color: "#000" }}>ม.3/2</td>
                <td style={{ padding: "10px", color: "#000" }}>298</td>
              </tr>
            </tbody>
          </table>
        ),
      },
      {
  id: "table-fixed-header",
  name: "Fixed Header Table",
  description: "ตารางที่หัวตารางไม่เลื่อนตาม ช่วยให้ดูข้อมูลได้สะดวก",
  detail:
    "เหมาะสำหรับข้อมูลจำนวนมาก เช่น รายชื่อนักเรียนหรือผลการเรียนที่มีหลายแถว",
  prompt:
    "สร้างตารางที่มีหัวตารางแบบตรึงอยู่ด้านบนเมื่อเลื่อนข้อมูลจำนวนมาก",
  example: (
    <div
      style={{
        width:"100%",
        maxHeight: "200px",
        overflowY: "auto",
        border: "1px solid #ccc",
        borderRadius: "6px",
      }}
    >
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          backgroundColor: "#fff",
        }}
      >
        <thead style={{ backgroundColor: "#3f29ab", position: "sticky", top: 0, zIndex: 1 }}>
          <tr>
            <th
              style={{
                padding: "10px",
                color: "#ffffff",
                fontWeight: 500,
                border: "1px solid #ccc",
              }}
            >
              ลำดับ
            </th>
            <th
              style={{
                padding: "10px",
                color: "#ffffff",
                fontWeight: 500,
                border: "1px solid #ccc",
              }}
            >
              ชื่อ-นามสกุล
            </th>
            <th
              style={{
                padding: "10px",
                color: "#ffffff",
                fontWeight: 500,
                border: "1px solid #ccc",
              }}
            >
              คะแนนรวม
            </th>
          </tr>
        </thead>
        <tbody>
          {[...Array(15)].map((_, i) => (
            <tr key={i}>
              <td
                style={{
                  padding: "10px",
                  color: "#000",
                  border: "1px solid #ccc",
                }}
              >
                {i + 1}
              </td>
              <td
                style={{
                  padding: "10px",
                  color: "#000",
                  border: "1px solid #ccc",
                }}
              >
                นักเรียน {i + 1}
              </td>
              <td
                style={{
                  padding: "10px",
                  color: "#000",
                  border: "1px solid #ccc",
                }}
              >
                {Math.floor(Math.random() * 100)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
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
          <span className={styles.elementName}>Table UI</span>
          <br />
          การใช้ตาราง (Table) เพื่อจัดระเบียบข้อมูลอย่างเป็นระบบ
          <br />
          ช่วยให้ผู้ใช้งานสามารถเปรียบเทียบและค้นหาข้อมูลได้สะดวก
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
