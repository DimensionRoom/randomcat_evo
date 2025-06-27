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
import styles from "./Animation.module.scss";

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

export default function AnimationUiScreen({
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

  const RandomBounceBall = () => {
    const ballRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const ball = ballRef.current;
      const container = containerRef.current;
      if (!ball || !container) return;

      let x = 0;
      let y = 0;
      let dx = 2 + Math.random() * 2;
      let dy = 2 + Math.random() * 2;

      const update = () => {
        const ballSize = 50;
        const cWidth = container.clientWidth;
        const cHeight = container.clientHeight;

        x += dx;
        y += dy;

        if (x <= 0 || x + ballSize >= cWidth) {
          dx = -dx + (Math.random() - 0.5); // เปลี่ยนทิศแบบสุ่มเล็กน้อย
        }

        if (y <= 0 || y + ballSize >= cHeight) {
          dy = -dy + (Math.random() - 0.5);
        }

        ball.style.transform = `translate(${x}px, ${y}px)`;
        requestAnimationFrame(update);
      };

      requestAnimationFrame(update);
    }, []);

    return (
      <div
        ref={containerRef}
        style={{
          width: "100%",
          height: "200px",
          position: "relative",
          overflow: "hidden",
          borderRadius: "1rem",
        }}
      >
        <div
          ref={ballRef}
          style={{
            width: "50px",
            height: "50px",
            backgroundColor: "#00b894",
            borderRadius: "50%",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
      </div>
    );
  };

  useEffect(() => {
    const baseBox: React.CSSProperties = {
      width: "100px",
      height: "100px",
      margin: "1rem auto",
    };

    const colors = [
      "#abf7f2",
      "#3f29ab",
      "#7c8cfd",
      "#e6a8ff",
      "#fdcae1",
      "#ffd93d",
      "#90f1ef",
      "#fcbf49",
      "#ff6f61",
      "#00b894",
    ];

    const sampleItems: ElementTypeItem[] = [
      {
        id: "a1",
        name: "แอนิเมชันเปลี่ยนสี",
        description:
          "กล่องเปลี่ยนสีพื้นหลังไปตามจังหวะที่กำหนด เพื่อดึงดูดความสนใจ",
        detail:
          "ใช้ keyframe เพื่อเปลี่ยน background-color อย่างนุ่มนวลเป็นลูป",
        prompt:
          "สร้างกล่องที่สามารถเปลี่ยนสีอัตโนมัติอย่างต่อเนื่อง โดยใช้ keyframes เพื่อเปลี่ยนสีแบบลูป เช่น สีฟ้า → ม่วง → ชมพู → ฟ้า",
        example: (
          <div
            style={{
              width: "100px",
              height: "100px",
              margin: "1rem auto",
              animation: "colorShift 4s linear infinite",
            }}
          >
            <style>{`
        @keyframes colorShift {
          0%   { background: #abf7f2; }
          25%  { background: #7c8cfd; }
          50%  { background: #e6a8ff; }
          75%  { background: #fdcae1; }
          100% { background: #abf7f2; }
        }
      `}</style>
          </div>
        ),
      },
      {
        id: "a2",
        name: "สามเหลี่ยมสั่น",
        description: "แอนิเมชันรูปสามเหลี่ยมขยับซ้าย-ขวาเล็กน้อยแบบต่อเนื่อง",
        detail: "ใช้ clip-path สร้างรูปสามเหลี่ยม และ animate ด้วย translateX",
        prompt:
          "ออกแบบรูปสามเหลี่ยมที่สั่นไปมาซ้ายขวา เพื่อใช้เน้นข้อความหรือส่วนที่คลิกได้",
        example: (
          <div
            style={{
              ...baseBox,
              backgroundColor: colors[1],
              clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
              animation: "shake 0.5s ease-in-out infinite",
            }}
          >
            <style>{`
            @keyframes shake {
              0%, 100% { transform: translateX(0); }
              50% { transform: translateX(10px); }
            }
          `}</style>
          </div>
        ),
      },
      {
        id: "a3",
        name: "จัตุรัสหมุนเฉียงกระพริบ",
        description:
          "กล่องสี่เหลี่ยมหมุนพร้อมเปลี่ยนความโปร่งใส เพื่อสร้างจังหวะการเต้นขององค์ประกอบ",
        detail: "ใช้ rotation และ opacity สลับค่าผ่าน keyframe",
        prompt:
          "สร้างกล่องจัตุรัสที่หมุนไปพร้อมกับกระพริบเบา ๆ เป็นลูป เพื่อเน้น visual feedback",
        example: (
          <div
            style={{
              ...baseBox,
              backgroundColor: colors[2],
              transform: "rotate(45deg)",
              animation: "blinkSpin 1.2s linear infinite",
            }}
          >
            <style>{`
            @keyframes blinkSpin {
              0%, 100% { opacity: 1; transform: rotate(45deg); }
              50% { opacity: 0.3; transform: rotate(225deg); }
            }
          `}</style>
          </div>
        ),
      },
      {
        id: "a4",
        name: "หัวใจเต้น",
        description: "แอนิเมชันจำลองการเต้นของหัวใจโดยการขยายและหดรูปทรง",
        detail: "ใช้ clip-path รูปหัวใจร่วมกับ scale animation",
        prompt:
          "ออกแบบหัวใจที่เต้นเป็นจังหวะ เพื่อใช้ใน UI ที่สื่อถึงความรัก ความสนใจ หรือการชื่นชอบ",
        example: (
          <div
            style={{
              ...baseBox,
              backgroundColor: colors[3],
              clipPath:
                "path('M50 30 C20 0, 0 40, 50 80 C100 40, 80 0, 50 30 Z')",
              animation: "heartbeat 1.2s ease-in-out infinite",
            }}
          >
            <style>{`
            @keyframes heartbeat {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.15); }
            }
          `}</style>
          </div>
        ),
      },
      {
        id: "a5",
        name: "วงรีกระเด้ง",
        description: "วงรีเด้งขึ้นและลงอย่างสม่ำเสมอคล้ายลูกบอล",
        detail: "ใช้ border-radius วงรีร่วมกับ translateY ใน keyframe",
        prompt:
          "สร้างวงรีที่เด้งขึ้นลงอย่างนุ่มนวล เพื่อใช้ในเกมหรือสื่อการสอนวิทยาศาสตร์ที่ต้องการการเคลื่อนไหวซ้ำ ๆ",
        example: (
          <div
            style={{
              ...baseBox,
              backgroundColor: colors[4],
              borderRadius: "50% / 30%",
              animation: "bounceY 1s ease-in-out infinite",
            }}
          >
            <style>{`
            @keyframes bounceY {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-25px); }
            }
          `}</style>
          </div>
        ),
      },
      {
        id: "a6",
        name: "วงรีหมุนรอบแกน",
        description: "วงรีหมุนรอบแกน X เหมือนหมุนตัวเองในแนวนอน",
        detail: "ใช้ transform: rotateX() เพื่อหมุนในแนวแกน X อย่างต่อเนื่อง",
        prompt:
          "สร้างวงรีที่หมุนรอบแกน X อย่างราบรื่น เพื่อแสดงการเปลี่ยนสถานะหรือเปลี่ยนมุมมอง",
        example: (
          <div
            style={{
              ...baseBox,
              backgroundColor: colors[5],
              borderRadius: "50% / 30%",
              animation: "flipX 2s linear infinite",
            }}
          >
            <style>{`
            @keyframes flipX {
              0% { transform: rotateX(0deg); }
              100% { transform: rotateX(360deg); }
            }
          `}</style>
          </div>
        ),
      },
      {
        id: "a13",
        name: "วงกลมวิ่งทะลุแบบเร็ว",
        description: "วงกลมเคลื่อนที่จากซ้ายไปขวาทะลุจอแบบต่อเนื่องไม่ย้อนกลับ",
        detail: "ใช้ translateX ร่วมกับ animation linear บนตำแหน่ง absolute",
        prompt:
          "สร้างลูกกลมที่วิ่งทะลุจากซ้ายไปขวาโดยไม่ย้อนกลับ เหมาะกับการแสดงข้อมูลที่เคลื่อนไหวต่อเนื่อง เช่น ข่าววิ่ง",
        example: (
          <div
            style={{
              width: "100%",
              height: "150px",
              overflow: "hidden",
              position: "relative",
              margin: "1rem 0",
            }}
          >
            <div
              style={{
                width: "100px",
                height: "100px",
                backgroundColor: "#7c8cfd",
                borderRadius: "50%",
                position: "absolute",
                left: "-60px",
                top: "25px",
                animation: "circleFly 3s linear infinite",
              }}
            >
              <style>{`
          @keyframes circleFly {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(120vw);
            }
          }
        `}</style>
            </div>
          </div>
        ),
      },
      {
        id: "a8",
        name: "ดาวหมุนรอบตัว",
        description:
          "รูปดาวหมุนรอบตัวเองช้า ๆ เพื่อแสดงถึงความโดดเด่นหรือรางวัล",
        detail: "ใช้ clip-path รูปดาว และหมุนด้วย rotate",
        prompt:
          "สร้างแอนิเมชันรูปดาวหมุนรอบตัวเอง เพื่อเน้นสถานะพิเศษ เช่น ผู้ชนะ เหรียญ หรือจุดเด่น",
        example: (
          <div
            style={{
              ...baseBox,
              backgroundColor: colors[7],
              clipPath:
                "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
              animation: "spin 3s linear infinite",
            }}
          >
            <style>{`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}</style>
          </div>
        ),
      },
      {
        id: "a9",
        name: "แคปซูลเลื่อนไปมา",
        description: "แคปซูลเคลื่อนไปทางซ้ายและขวาสลับกันอย่างต่อเนื่อง",
        detail: "ใช้ border-radius capsule และ translateX สลับค่าระยะ",
        prompt:
          "สร้างแคปซูลที่เคลื่อนไปกลับซ้าย-ขวาแบบอ่อนนุ่ม เพื่อใช้กับปุ่ม, แถบแจ้งเตือน หรือคำแนะนำ",
        example: (
          <div
            style={{
              ...baseBox,
              width: "120px",
              height: "50px",
              backgroundColor: colors[8],
              borderRadius: "25px",
              animation: "slideLR 2s ease-in-out infinite",
            }}
          >
            <style>{`
            @keyframes slideLR {
              0%, 100% { transform: translateX(0); }
              50% { transform: translateX(30px); }
            }
          `}</style>
          </div>
        ),
      },
      {
        id: "a10",
        name: "โคจรเป็นวง",
        description: "วงกลมหมุนเป็นวงโคจรรอบจุดศูนย์กลางเหมือนดาวเคราะห์",
        detail:
          "ใช้ transform: rotate + translate + rotate-inverse เพื่อหมุนวนรอบจุด",
        prompt:
          "ออกแบบแอนิเมชันให้วัตถุหมุนเป็นวงรอบศูนย์กลาง เพื่อจำลองการเคลื่อนไหวของดาว หรือแสดงความสัมพันธ์",
        example: (
          <div
            style={{
              width: "120px",
              height: "120px",
              position: "relative",
              margin: "1rem auto",
            }}
          >
            <div
              style={{
                width: "30px",
                height: "30px",
                backgroundColor: colors[9],
                borderRadius: "50%",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                animation: "orbit 3s linear infinite",
              }}
            >
              <style>{`
              @keyframes orbit {
                0% { transform: rotate(0deg) translateX(40px) rotate(0deg); }
                100% { transform: rotate(360deg) translateX(40px) rotate(-360deg); }
              }
            `}</style>
            </div>
          </div>
        ),
      },
      {
        id: "a11",
        name: "แอนิเมชันเปลี่ยนรูปทรง",
        description:
          "กล่องเปลี่ยนรูปร่างไปเรื่อย ๆ เช่น วงกลม → มน → หกเหลี่ยม → วงกลม",
        detail: "ใช้ clip-path หลายรูปแบบใน keyframe เดียว",
        prompt:
          "สร้างกล่องที่เปลี่ยนรูปร่างแบบวนลูป เพื่อแสดงแนวคิดของการเปลี่ยนสถานะหรือความยืดหยุ่น",
        example: (
          <div
            style={{
              width: "100px",
              height: "100px",
              margin: "1rem auto",
              background: "#7c8cfd",
              animation: "shapeMorph 3s infinite",
            }}
          >
            <style>{`
        @keyframes shapeMorph {
          0% {
            clip-path: circle(50%);
          }
          33% {
            clip-path: inset(0% 0% 0% 0% round 20%);
          }
          66% {
            clip-path: polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%);
          }
          100% {
            clip-path: circle(50%);
          }
        }
      `}</style>
          </div>
        ),
      },
      {
        id: "a15",
        name: "วงกลมเด้งสุ่มทิศทาง",
        description: "วงกลมเคลื่อนที่ชนขอบแล้วเปลี่ยนทิศแบบสุ่มตลอดเวลา",
        detail:
          "ควบคุมด้วย JavaScript และ requestAnimationFrame ไม่ใช้ CSS animation",
        prompt:
          "สร้างวงกลมที่เคลื่อนที่ใน container และเด้งเมื่อชนขอบ โดยเปลี่ยนทิศทางแบบสุ่มทุกครั้ง เหมาะกับเกมหรือระบบแสดงผลที่ interactive",
        example: <RandomBounceBall />,
      },
      {
        id: "a16",
        name: "แอนิเมชันโหลด (Loading)",
        description: "วงกลมหมุนรอบตัวเองเพื่อแสดงสถานะกำลังโหลดข้อมูล",
        detail: "ใช้ border แบบโปร่งบางบางส่วน ร่วมกับการหมุน 360 องศา",
        prompt:
          "สร้างแอนิเมชันแสดงสถานะการโหลดข้อมูลด้วยวงกลมที่หมุนอย่างต่อเนื่อง เหมาะสำหรับใช้ในหน้ารอ เช่น ขณะดึงข้อมูลจากเซิร์ฟเวอร์",
        example: (
          <div
            style={{
              width: "60px",
              height: "60px",
              margin: "1rem auto",
              border: "6px solid #e0e0e0",
              borderTop: "6px solid #7c8cfd",
              borderRadius: "50%",
              animation: "spinLoading 1s linear infinite",
            }}
          >
            <style>{`
        @keyframes spinLoading {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
          </div>
        ),
      },
      {
        id: "a19",
        name: "แอนิเมชันปรากฏและหายวนลูป",
        description: "กล่องจะค่อย ๆ ปรากฏ แล้วค่อย ๆ หายไปแบบวนซ้ำอย่างนุ่มนวล",
        detail: "ใช้ keyframe opacity 0 → 1 → 0 ร่วมกับ animation infinite",
        prompt:
          "สร้างกล่องที่มีแอนิเมชันค่อย ๆ ปรากฏแล้วหายไปซ้ำ ๆ เหมาะสำหรับใช้เป็น loading indicator หรือ background motion",
        example: (
          <div
            style={{
              width: "100px",
              height: "100px",
              margin: "1rem auto",
              backgroundColor: "#ffd93d",
              animation: "fadeInOutLoop 3s ease-in-out infinite",
            }}
          >
            <style>{`
        @keyframes fadeInOutLoop {
          0% { opacity: 0; }
          50% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
          </div>
        ),
      },
      {
        id: "a21",
        name: "แอนิเมชันยืด–หด",
        description: "กล่องยืดออกและหดกลับอย่างต่อเนื่องเหมือนการยืดตัว",
        detail: "ใช้ transform: scaleX/scaleY สลับไปมาใน keyframes",
        prompt:
          "สร้างกล่องที่ยืดและหดเป็นจังหวะ เพื่อใช้ใน UI ที่มีความสนุก เช่น เกม, สื่อการเรียน, หรือ loader น่ารัก ๆ",
        example: (
          <div
            style={{
              width: "100px",
              height: "100px",
              margin: "1rem auto",
              backgroundColor: "#fcbf49",
              borderRadius: "1rem",
              animation: "stretchLoop 2s ease-in-out infinite",
              transformOrigin: "center",
            }}
          >
            <style>{`
        @keyframes stretchLoop {
          0%, 100% {
            transform: scaleX(1) scaleY(1);
          }
          25% {
            transform: scaleX(1.2) scaleY(0.8);
          }
          50% {
            transform: scaleX(0.8) scaleY(1.2);
          }
          75% {
            transform: scaleX(1.1) scaleY(0.9);
          }
        }
      `}</style>
          </div>
        ),
      },
    ];

    setElementsItems(sampleItems);
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
          <span className={styles.elementName}>Animation UI</span>
          <br />
          การใช้แอนิเมชันในการออกแบบ UI ช่วยเพิ่มความสวยงาม, น่าสนใจ
          <br />
          และ ความมีชีวิตชีวาให้กับหน้าเว็บ
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
