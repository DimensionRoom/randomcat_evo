"use client";
import React, { useState, useEffect, useRef } from "react";
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
import styles from "./Chart.module.scss";

type ElementTypeItem = {
  id: string;
  nameEN: string;
  nameTH: string;
  link: string;
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
  const [elementsType, setElementsType] = useState<ElementTypeItem[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const gridRef = useRef<HTMLDivElement>(null); // ✅ reference to scroll

  const chartItems = [
    {
      id: "bar",
      name: "Bar Chart",
      description: "เหมาะสำหรับ: เปรียบเทียบค่าระหว่างหมวดหมู่",
      detail:
        "แสดงผลข้อมูลด้วยแท่งที่มีความยาวสัมพันธ์กับค่าที่วัดได้ เหมาะสำหรับการเปรียบเทียบระหว่างกลุ่ม",
      prompt:
        "สร้างกราฟแท่งแนวนอนสำหรับเปรียบเทียบยอดขายรายเดือน โดยให้แต่ละแท่งแสดงชื่อเดือน เช่น Jan, Feb, Mar, Apr, May และแสดงค่ายอดขายเป็นหน่วยพัน (K) ที่ปลายแท่ง ใช้สีไล่เฉดจากฟ้าอ่อนถึงฟ้าเข้ม พร้อมแสดง label ชื่อเดือนด้านซ้ายมือและความยาวแท่งสัมพันธ์กับยอดขาย",
      example: (
        <div
          style={{
            width: "100%",
            borderRadius: "12px",
            padding: "1rem",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          {[
            { month: "Jan", value: 180 },
            { month: "Feb", value: 130 },
            { month: "Mar", value: 200 },
            { month: "Apr", value: 100 },
            { month: "May", value: 160 },
          ].map((data, index) => (
            <div
              key={index}
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              <div
                style={{ width: "40px", fontSize: "0.85rem", color: "#374151" }}
              >
                {data.month}
              </div>
              <div
                style={{
                  height: "20px",
                  width: `${data.value}px`,
                  background: "linear-gradient(to right, #3f29ab, #7c8cfd)",
                  borderRadius: "6px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                }}
              ></div>
              <div
                style={{
                  fontSize: "0.8rem",
                  marginLeft: "8px",
                  color: "#6b7280",
                }}
              >
                {data.value}K
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "line",
      name: "Line Chart",
      description: "เหมาะสำหรับ: แนวโน้มของข้อมูลตามเวลา",
      detail:
        "แสดงแนวโน้มการเปลี่ยนแปลงของข้อมูลแบบต่อเนื่อง เช่น ยอดขายในแต่ละเดือน",
      prompt:
        "สร้างกราฟเส้นแสดงแนวโน้มอุณหภูมิรายวันตลอดสัปดาห์ โดยมีเส้นกริดแนวนอนเพื่อบอกระดับอุณหภูมิ และจุดแต่ละวัน (จันทร์ถึงอาทิตย์) แสดงเป็นจุดวงกลมสีแดงบนเส้น พร้อม label ชื่อวันอยู่ด้านล่างของแต่ละจุด ใช้เส้นสีม่วงเข้มขนาด 3px",
      example: (
        <svg width="100%" height="200" viewBox="0 0 240 160">
          <g stroke="#d1d5db" strokeWidth="1">
            <line x1="0" y1="20" x2="240" y2="20" />
            <line x1="0" y1="50" x2="240" y2="50" />
            <line x1="0" y1="80" x2="240" y2="80" />
            <line x1="0" y1="110" x2="240" y2="110" />
          </g>
          <polyline
            fill="none"
            stroke="#7c8cfd"
            strokeWidth="3"
            points="0,90 40,80 80,60 120,40 160,55 200,70 240,65"
          />
          <g fill="#3f29ab">
            <circle cx="0" cy="90" r="3" />
            <circle cx="40" cy="80" r="3" />
            <circle cx="80" cy="60" r="3" />
            <circle cx="120" cy="40" r="3" />
            <circle cx="160" cy="55" r="3" />
            <circle cx="200" cy="70" r="3" />
            <circle cx="240" cy="65" r="3" />
          </g>
          <g fontSize="10" fill="#374151" textAnchor="middle">
            <text x="0" y="150">
              จันทร์
            </text>
            <text x="40" y="150">
              อังคาร
            </text>
            <text x="80" y="150">
              พุธ
            </text>
            <text x="120" y="150">
              พฤหัส
            </text>
            <text x="160" y="150">
              ศุกร์
            </text>
            <text x="200" y="150">
              เสาร์
            </text>
            <text x="240" y="150">
              อาทิตย์
            </text>
          </g>
        </svg>
      ),
    },
    {
      id: "pie",
      name: "Pie Chart",
      description: "เหมาะสำหรับ: แสดงสัดส่วนหรือเปอร์เซ็นต์",
      detail: "แสดงข้อมูลเป็นส่วนๆ ของวงกลมเพื่อเปรียบเทียบสัดส่วนแต่ละกลุ่ม",
      prompt:
        "สร้างกราฟวงกลมแสดงการแบ่งงบประมาณเป็นเปอร์เซ็นต์ 3 หมวดหมู่ ได้แก่ พัฒนาระบบ 50%, การตลาด 30%, ค่าใช้จ่ายอื่นๆ 20% โดยใช้สี #3f29ab, #7c8cfd, และ #e85a71 ตามลำดับ พร้อมแสดงเปอร์เซ็นต์ตัวเลขสีขาวอยู่ภายในแต่ละส่วนของวงกลม และมี legend อยู่ด้านขวาพร้อมสีและชื่อหมวดหมู่แต่ละรายการ",
      example: (
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          <div
            style={{
              width: "160px",
              height: "160px",
              borderRadius: "50%",
              background:
                "conic-gradient(#3f29ab 0% 50%, #7c8cfd 50% 80%, #e6a8ff 80% 100%)",
              position: "relative",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            {" "}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "75%",
                transform: "translate(-50%, -50%)",
                color: "#fff",
                fontSize: "12px",
              }}
            >
              50%
            </div>
            <div
              style={{
                position: "absolute",
                top: "70%",
                left: "30%",
                transform: "translate(-50%, -50%)",
                color: "#fff",
                fontSize: "12px",
              }}
            >
              30%
            </div>
            <div
              style={{
                position: "absolute",
                top: "25%",
                left: "30%",
                transform: "translate(-50%, -50%)",
                color: "#fff",
                fontSize: "12px",
              }}
            >
              20%
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.6rem",
              fontSize: "14px",
              color: "#374151",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span
                style={{
                  width: "12px",
                  height: "12px",
                  background: "#3f29ab",
                  borderRadius: "3px",
                }}
              />
              พัฒนาระบบ (50%)
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span
                style={{
                  width: "12px",
                  height: "12px",
                  background: "#7c8cfd",
                  borderRadius: "3px",
                }}
              />
              การตลาด (30%)
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span
                style={{
                  width: "12px",
                  height: "12px",
                  background: "#e6a8ff",
                  borderRadius: "3px",
                }}
              />
              ค่าใช้จ่ายอื่นๆ (20%)
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "area",
      name: "Area Chart",
      description:
        "เหมาะสำหรับ: แสดงปริมาณสะสมหรือความเปลี่ยนแปลงเมื่อเทียบกับเวลา",
      detail:
        "คล้ายกับกราฟเส้น แต่มีพื้นที่ใต้เส้นถูกเติมสี เหมาะสำหรับแสดงแนวโน้มและขนาดรวม",
      prompt:
        "สร้าง Area Chart แสดงแนวโน้มจำนวนผู้ใช้งานแอปพลิเคชันรายวันในสัปดาห์ โดยมีสีพื้นแบบไล่เฉดใต้กราฟและจุดวงกลมแสดงค่าบนเส้น ใช้ชื่อวันเป็น label ด้านล่าง",
      example: (
        <svg width="100%" height="200" viewBox="0 0 240 160">
          <defs>
            <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3f29ab" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#3f29ab" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            fill="url(#areaFill)"
            d="M0,130 L0,90 L40,80 L80,60 L120,40 L160,55 L200,70 L240,65 L240,130 Z"
          />
          <polyline
            fill="none"
            stroke="#7c8cfd"
            strokeWidth="3"
            points="0,90 40,80 80,60 120,40 160,55 200,70 240,65"
          />
          <g fill="#3f29ab">
            <circle cx="0" cy="90" r="3" />
            <circle cx="40" cy="80" r="3" />
            <circle cx="80" cy="60" r="3" />
            <circle cx="120" cy="40" r="3" />
            <circle cx="160" cy="55" r="3" />
            <circle cx="200" cy="70" r="3" />
            <circle cx="240" cy="65" r="3" />
          </g>
          <g fontSize="10" fill="#374151" textAnchor="middle">
            <text x="0" y="150">
              จ.
            </text>
            <text x="40" y="150">
              อ.
            </text>
            <text x="80" y="150">
              พ.
            </text>
            <text x="120" y="150">
              พฤ.
            </text>
            <text x="160" y="150">
              ศ.
            </text>
            <text x="200" y="150">
              ส.
            </text>
            <text x="240" y="150">
              อา.
            </text>
          </g>
        </svg>
      ),
    },
    {
      id: "radar",
      name: "Radar Chart",
      description: "เหมาะสำหรับ: เปรียบเทียบข้อมูลหลายมิติในรูปแบบเรดาร์",
      detail:
        "เหมาะสำหรับแสดงจุดแข็งและจุดอ่อนในหลายหมวด เช่น ทักษะของผู้เรียนในแต่ละด้าน",
      prompt:
        "สร้าง Radar Chart แสดงทักษะของผู้เรียนใน 6 หมวด ได้แก่ Coding, Creativity, Collaboration, Critical Thinking, Communication และ Leadership โดยมีรูปทรงหกเหลี่ยมเป็นเส้นกรอบ พร้อมสีพื้นอ่อนใต้กราฟ ใช้จุดสีแสดงแต่ละมิติ",
      example: (
        <svg viewBox="0 0 250 250" width="100%" height="auto">
          {[1, 2, 3].map((level) => {
            const r = level * 40;
            const points = Array.from({ length: 6 }, (_, i) => {
              const angle = (Math.PI / 3) * i - Math.PI / 2;
              const x = 125 + r * Math.cos(angle);
              const y = 125 + r * Math.sin(angle);
              return `${x},${y}`;
            }).join(" ");
            return (
              <polygon
                key={level}
                points={points}
                fill="none"
                stroke="#d1d5db"
                strokeWidth="1"
              />
            );
          })}
          {Array.from({ length: 6 }, (_, i) => {
            const angle = (Math.PI / 3) * i - Math.PI / 2;
            const x = 125 + 120 * Math.cos(angle);
            const y = 125 + 120 * Math.sin(angle);
            return (
              <line
                key={i}
                x1="125"
                y1="125"
                x2={x}
                y2={y}
                stroke="#d1d5db"
                strokeWidth="1"
              />
            );
          })}
          <polygon
            points="
              125,65
              170,95
              160,150
              125,185
              90,150
              80,95
            "
            fill="rgba(59, 212, 246, 0.3)"
            stroke="#7c8cfd"
            strokeWidth="2"
          />
          <g fill="#3f29ab">
            <circle cx="125" cy="65" r="4" />
            <circle cx="170" cy="95" r="4" />
            <circle cx="160" cy="150" r="4" />
            <circle cx="125" cy="185" r="4" />
            <circle cx="90" cy="150" r="4" />
            <circle cx="80" cy="95" r="4" />
          </g>
          <g fontSize="12" fill="#374151" fontWeight="500" textAnchor="middle">
            <text x="125" y="40">
              Coding
            </text>
            <text x="190" y="85">
              Creativity
            </text>
            <text x="175" y="170">
              Collaboration
            </text>
            <text x="125" y="210">
              Critical Thinking
            </text>
            <text x="75" y="170">
              Communication
            </text>
            <text x="60" y="85">
              Leadership
            </text>
          </g>
        </svg>
      ),
    },
    {
      id: "scatter",
      name: "Scatter Chart",
      description: "เหมาะสำหรับ: วิเคราะห์ความสัมพันธ์ระหว่างตัวแปร",
      detail:
        "แต่ละจุดแสดงข้อมูลคู่ เช่น ความสัมพันธ์ระหว่างอายุและรายได้ เหมาะสำหรับการวิเคราะห์เชิงสถิติ",
      prompt:
        "สร้าง Scatter Chart เพื่อแสดงความสัมพันธ์ระหว่างอายุและรายได้ โดยแต่ละจุดแทนผู้ใช้งาน 1 คน ใช้สีฟ้าเข้ม ขนาดจุดเท่ากัน และแสดงในพื้นที่ พร้อมเส้นกริดแนวตั้งและแนวนอนสีเทา",
      example: (
        <svg width="100%" height="180" viewBox="0 0 260 180">
          <g stroke="#d1d5db" strokeWidth="1">
            {[20, 60, 100, 140].map((y) => (
              <line key={y} x1="30" y1={y} x2="230" y2={y} />
            ))}
          </g>
          <g stroke="#d1d5db" strokeWidth="1">
            {[50, 90, 130, 170, 210].map((x) => (
              <line key={`v-${x}`} x1={x} y1="20" x2={x} y2="140" />
            ))}
          </g>

          <g>
            {[
              { x: 50, y: 120, color: "#3b82f6" }, // น้ำเงิน
              { x: 90, y: 100, color: "#10b981" }, // เขียว
              { x: 130, y: 90, color: "#f59e0b" }, // ส้ม
              { x: 170, y: 60, color: "#ef4444" }, // แดง
              { x: 210, y: 80, color: "#8b5cf6" }, // ม่วง
            ].map((point, i) => (
              <circle
                key={i}
                cx={point.x}
                cy={point.y}
                r="4"
                fill={point.color}
              />
            ))}
          </g>
          <g fontSize="12" fill="#374151" textAnchor="middle">
            <text x="50" y="170">
              20
            </text>
            <text x="90" y="170">
              30
            </text>
            <text x="130" y="170">
              40
            </text>
            <text x="170" y="170">
              50
            </text>
            <text x="210" y="170">
              60
            </text>
          </g>
          <g fontSize="12" fill="#374151" textAnchor="end">
            <text x="25" y="125">
              น้อย
            </text>
            <text x="25" y="95">
              กลาง
            </text>
            <text x="25" y="65">
              มาก
            </text>
          </g>
        </svg>
      ),
    },
  ];

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
          <span className={styles.elementName}>Chart UI element website</span>
          <br />
          แผนภูมิรูปแบบต่างๆเพื่อใช้แสดงข้อมูล, เปรียบเทียบ ในด้านต่างๆ
          <br />
          เช่น กราฟแท่ง, กราฟเส้น, กราฟวงกลม
        </p>
        <div className={styles.gridContainer} ref={gridRef}>
          {chartItems.map((item) => (
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
