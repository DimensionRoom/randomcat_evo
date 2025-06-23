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
import styles from "./Progress.module.scss";

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
        id: "circle-progress-indicator",
        name: "Circle Progress Indicator",
        description:
          "เหมาะสำหรับ: นักเรียนแต่ละคน หรือการติดตามรายวิชารายห้องเรียน",
        detail: `
    รูปแบบวงกลมแสดงเปอร์เซ็นต์การเรียนรู้ในแต่ละวิชา เช่น วิทยาศาสตร์ ภาษาไทย ฯลฯ 
    เหมาะสำหรับใช้แสดงบนแดชบอร์ดนักเรียน หรือรายงานที่ผู้ปกครองสามารถเข้าใจได้ง่าย 
    ตัวเลขอยู่ตรงกลางเพื่อเน้นความคืบหน้า พร้อมขอบสีไล่เฉดเพื่อสร้างความรู้สึกของการเติบโต 
    และมีป้ายชื่อวิชาอยู่ด้านล่างเพื่ออธิบายว่าค่าดังกล่าวเกี่ยวข้องกับอะไร.
  `,
        prompt:
          "สร้างวงกลมแสดงความคืบหน้าในการเรียนรู้วิชาวิทยาศาสตร์ 75% โดยมีตัวเลขตรงกลาง วงแหวนรอบนอกเป็นสีไล่เฉดม่วงไปเขียว มีพื้นหลังโปร่งใส และมีข้อความชื่อวิชาอยู่ด้านล่าง",
        example: (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <div style={{ position: "relative", width: 120, height: 120 }}>
              <svg viewBox="0 0 36 36" width="100%" height="100%">
                <circle
                  cx="18"
                  cy="18"
                  r="15.9155"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="2"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="15.9155"
                  fill="none"
                  stroke="url(#gradient1)"
                  strokeWidth="2.5"
                  strokeDasharray="75, 100"
                  strokeLinecap="round"
                  transform="rotate(-90 18 18)"
                />
                <defs>
                  <linearGradient id="gradient1" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#abf7f2" />
                    <stop offset="100%" stopColor="#7c8cfd" />
                  </linearGradient>
                </defs>
              </svg>
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  fontWeight: 600,
                  fontSize: "1.25rem",
                  color: "#3f29ab",
                }}
              >
                75%
              </div>
            </div>
            <div
              style={{
                fontSize: "0.85rem",
                fontWeight: 500,
                color: "#374151",
              }}
            >
              วิทยาศาสตร์
            </div>
          </div>
        ),
      },
      {
        id: "linear-progress-bar",
        name: "Linear Progress Bar",
        description: "เหมาะสำหรับ: นักเรียนทุกระดับชั้นและครูผู้สอนรายวิชา",
        detail: `
    ใช้ติดตามว่านักเรียนส่งงานครบหรือยัง เช่น การบ้าน โปรเจกต์ แบบฝึกหัด ฯลฯ 
    แถบแนวนอนให้ความรู้สึกของเส้นทาง มีการไล่เฉดสีจากเข้มไปอ่อนเพื่อสื่อความคืบหน้า 
    ตัวเลขด้านขวาช่วยให้เข้าใจว่าเสร็จแล้วเท่าไหร่ชัดเจน พร้อมชื่อวิชาด้านล่างเพื่อระบุความหมายของแถบ
  `,
        prompt:
          "แสดงความคืบหน้าการส่งงานวิชาภาษาไทย โดยมีแถบแนวนอนสีม่วงไปเขียวที่แสดงถึงความคืบหน้า 70% พร้อมตัวเลขอยู่ด้านขวา และชื่อวิชาด้านล่าง",
        example: (
          <div
            style={{
              display: "flex",
              flex: 1,
              flexDirection: "column",
              gap: "0.5rem",
              padding: "0px 15px",
            }}
          >
            <div
              style={{
                width: "100%",
                background: "#ffffff",
                borderRadius: "10px",
                height: "20px",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: "70%",
                  height: "100%",
                  background: "linear-gradient(to right, #7c8cfd, #abf7f2)",
                  borderRadius: "10px 0 0 10px",
                }}
              />
              <span
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  color: "#374151",
                }}
              >
                70%
              </span>
            </div>
            <div
              style={{
                fontSize: "0.85rem",
                fontWeight: 500,
                color: "#374151",
              }}
            >
              ภาษาไทย
            </div>
          </div>
        ),
      },
      {
        id: "perfect-horizontal-step",
        name: "Horizontal Step Progress",
        description:
          "เหมาะสำหรับ: แสดงลำดับกิจกรรม เช่น โครงงาน การบ้าน หรือกระบวนการสอน",
        detail: `
แสดงลำดับขั้นตอนการเรียนรู้แบบแนวนอน พร้อมเส้นพาดผ่านจุดกึ่งกลางของวงกลมแต่ละขั้น 
ช่วยให้ผู้เรียนเห็นภาพรวมของกระบวนการได้ชัดเจน เหมาะสำหรับกิจกรรมที่มีลำดับ เช่น โครงงานหรือแบบฝึกหัดหลายตอน
  `,
        prompt:
          "สร้างขั้นตอนแนวนอน 5 ขั้น โดยมีเส้นแนวนอนพาดผ่านกึ่งกลางวงกลม ใช้สีม่วงสำหรับขั้นที่เสร็จแล้ว และชื่อขั้นตอนอยู่ด้านล่าง",
        example: (
          <div style={{ width: "100%", padding: "2rem 0" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                position: "relative",
              }}
            >
              {["เริ่มต้น", "ศึกษา", "ปฏิบัติ", "ประเมิน", "สรุปผล"].map(
                (label, index, arr) => {
                  const isCompleted = index <= 2;
                  return (
                    <div
                      key={label}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        zIndex: 1,
                        flex: 1,
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: "50%",
                          backgroundColor: "#fff",
                          border: `4px solid ${
                            isCompleted ? "#7c8cfd" : "#cbd5e1"
                          }`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginBottom: 8,
                        }}
                      >
                        <div
                          style={{
                            width: 12,
                            height: 12,
                            borderRadius: "50%",
                            backgroundColor: isCompleted
                              ? "#3f29ab"
                              : "#e5e7eb",
                          }}
                        />
                      </div>
                      <span
                        style={{
                          fontSize: "0.75rem",
                          color: isCompleted ? "#3f29ab" : "#6b7280",
                          fontWeight: isCompleted ? 600 : 400,
                          marginTop: 4,
                        }}
                      >
                        {label}
                      </span>
                      {index < arr.length - 1 && (
                        <div
                          style={{
                            position: "absolute",
                            top: "16px", // กลางของ 32px
                            left: "50%",
                            width: "100%",
                            height: "4px",
                            backgroundColor: isCompleted
                              ? "#7c8cfd"
                              : "#e5e7eb",
                            zIndex: -1,
                          }}
                        />
                      )}
                    </div>
                  );
                }
              )}
            </div>
          </div>
        ),
      },
      {
        id: "vertical-steps-progress",
        name: "Vertical Steps Progress",
        description: "เหมาะสำหรับ: การให้คะแนนแบบ rubric หรือพัฒนาการรายบุคคล",
        detail: `
    แสดงลำดับขั้นการประเมินผลแบบแนวตั้ง พร้อมเส้นเชื่อมตัดผ่านจุดตรงกลาง 
    และ label ที่จัดให้อยู่ในแนวเดียวกับวงกลมอย่างแม่นยำ
  `,
        prompt:
          "สร้าง Vertical Step Progress 4 ขั้น ได้แก่ 'เตรียม', 'ตรวจ', 'สรุป', 'ส่งผล' โดยอยู่ที่ขั้น 'สรุปผล' เส้นแนวตั้งตัดผ่านจุด และ label อยู่กึ่งกลางของจุด",
        example: (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
          >
            {["เตรียมข้อมูล", "ตรวจข้อสอบ", "สรุปผล", "ส่งรายงาน"].map(
              (label, index, arr) => {
                const isCurrent = index === 2;
                const isCompleted = index < 2;
                const isLast = index === arr.length - 1;

                return (
                  <div
                    key={label}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      position: "relative",
                    }}
                  >
                    {/* วงกลมและเส้น */}
                    <div
                      style={{ position: "relative", marginRight: "0.75rem" }}
                    >
                      <div
                        style={{
                          width: 16,
                          height: 16,
                          borderRadius: "50%",
                          backgroundColor:
                            isCompleted || isCurrent ? "#abf7f2" : "#fff",
                          border: `2px solid ${
                            isCompleted || isCurrent ? "#7c8cfd" : "#cbd5e1"
                          }`,
                          zIndex: 2,
                        }}
                      />
                      {!isLast && (
                        <div
                          style={{
                            position: "absolute",
                            top: 16,
                            left: "50%",
                            transform: "translateX(-50%)",
                            width: 3,
                            height: "calc(100% + 2rem - 16px)",
                            backgroundColor: isCompleted
                              ? "#7c8cfd"
                              : "#e5e7eb",
                            zIndex: 0,
                          }}
                        />
                      )}
                    </div>
                    <span
                      style={{
                        fontSize: "0.85rem",
                        color: isCurrent ? "#3f29ab" : "#6b7280",
                        fontWeight: isCurrent ? 600 : 400,
                        lineHeight: "16px", 
                        height: "16px", 
                      }}
                    >
                      {label}
                    </span>
                  </div>
                );
              }
            )}
          </div>
        ),
      },
      {
        id: "liquld-progress-indicator",
        name: "Liquld Progress Indicator",
        description:
          "เหมาะสำหรับ: โครงการอ่านหนังสือ, ความคืบหน้าในแบบเรียนรายบท",
        detail: `
    เป็นวงกลมที่มีเอฟเฟกต์คลื่นน้ำแสดงเปอร์เซ็นต์ความคืบหน้า เช่น อ่านไป 45% แล้ว
    ให้ความรู้สึกเคลื่อนไหว สนุก มีชีวิตชีวา เหมาะกับนักเรียนประถมหรือมัธยมต้น
  `,
        prompt:
          "แสดง Liquid Progress Indicator แสดงการอ่านหนังสืออยู่ที่ 45% มีคลื่นสีม่วงครึ่งวงกลม พร้อมตัวเลขตรงกลาง",
        example: (
          <div
            style={{ position: "relative", width: "150px", height: "150px" }}
          >
            <svg viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="#ffffff"
                stroke="#3f29ab"
                strokeWidth="2"
              />
              <defs>
                <clipPath id="wave">
                  <path d="M0 60 Q 25 50 50 60 T 100 60 V100 H0 Z" />
                </clipPath>
              </defs>
              <g clipPath="url(#wave)">
                <circle cx="50" cy="50" r="45" fill="#abf7f2" />
              </g>
            </svg>
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontWeight: 600,
                fontSize: "1.1rem",
                color: "#3f29ab",
              }}
            >
              45%
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
          <span className={styles.elementName}>
            Progress UI
          </span>
          <br />
          รูปแบบการแสดงผลความคืบหน้าเหมาะสำหรับการเรียนรู้
          การส่งงาน และการประเมินผล
          <br />
          เช่น แถบความคืบหน้า วงกลมเปอร์เซ็นต์ และขั้นตอนการทำงาน
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
