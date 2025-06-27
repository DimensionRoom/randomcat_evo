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
import styles from "./Modal.module.scss";

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

export default function ModalUiScreen({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const [t, setT] = useState<any>(null);
  const [resources, setResources] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [elementsItems, setElementsItems] = useState<ElementTypeItem[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const gridRef = useRef<HTMLDivElement>(null);

  const MultiStepModal = () => {
    const [step, setStep] = useState(1);

    return (
      <div
        style={{
          position: "relative",
          backgroundColor: "#7c8cfd",
          color: "#fff",
          padding: "1.25rem",
          borderRadius: "1rem",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          width: "80%",
          maxWidth: "400px",
        }}
      >
        {/* ปุ่ม ✕ ปิด */}
        <button
          onClick={() => alert("ปิด modal (mock)")}
          aria-label="ปิด"
          style={{
            position: "absolute",
            top: "0.75rem",
            right: "0.75rem",
            background: "transparent",
            border: "none",
            color: "#fff",
            fontSize: "1.25rem",
            cursor: "pointer",
          }}
        >
          ✕
        </button>

        {/* เนื้อหา modal */}
        <h4 style={{ marginBottom: "0.5rem", fontWeight: 500 }}>
          แบบสอบถาม (ขั้นตอนที่ {step} / 3)
        </h4>
        <p style={{ fontWeight: 300 }}>
          {step === 1 && "คุณเข้าใจเนื้อหาบทเรียนหรือไม่?"}
          {step === 2 && "คุณต้องการเนื้อหาเพิ่มเติมในส่วนใด?"}
          {step === 3 && "คุณอยากให้ปรับปรุงการสอนได้อย่างไร?"}
        </p>
        {step < 3 ? (
          <button
            onClick={() => setStep((prev) => prev + 1)}
            style={{
              backgroundColor: "#fff",
              border: "1px solid #3f29ab",
              color: "#000",
              padding: "0.5rem 1rem",
              marginTop: "1rem",
              borderRadius: "0.5rem",
              cursor: "pointer",
            }}
          >
            ถัดไป
          </button>
        ) : (
          <p style={{ marginTop: "1rem" }}>ขอบคุณสำหรับความคิดเห็น!</p>
        )}
      </div>
    );
  };

  useEffect(() => {
    async function fetchTranslations() {
      const { t, resources } = await initTranslations(locale, i18nNamespaces);
      setT(() => t);
      setResources(resources);
      setStep(1);
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
    fetchTranslations();
  }, [locale]);

  useEffect(() => {
    setElementsItems([
      {
        id: "basic",
        name: "Basic Modal",
        description: "โมดอลพื้นฐานสำหรับการแจ้งเตือนหรือยืนยันการดำเนินการ",
        detail:
          "ใช้สำหรับยืนยันหรือยกเลิกการกระทำ เช่น การส่งคะแนนหรือการลบข้อมูล",
        prompt:
          "สร้างโมดอลพื้นฐานสำหรับใช้ยืนยันการดำเนินการ โดยมีหัวข้อขนาดใหญ่ ข้อความอธิบายแบบย่อ ปุ่ม “ยืนยัน” สีพื้นหลังเข้ม และปุ่ม “ยกเลิก” สีพื้นหลังอ่อน พร้อมจัดวางปุ่มอยู่ด้านขวาล่างของโมดอล",
        example: (
          <div
            style={{
              position: "relative",
              backgroundColor: "#abf7f2",
              color: "#000",
              padding: "2rem",
              borderRadius: "1rem",
              width: "100%",
              maxWidth: "400px",
              maxHeight: "200px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
              fontFamily: "inherit",
            }}
          >
            {/* หัวข้อ */}
            <h4
              style={{
                fontSize: "1.25rem",
                marginBottom: "0.75rem",
                fontWeight: 500,
              }}
            >
              ยืนยันการส่งคะแนน
            </h4>

            {/* ข้อความ */}
            <p style={{ fontSize: "1rem", marginBottom: "1.5rem" }}>
              คุณแน่ใจหรือไม่ว่าจะส่งผลคะแนนนักเรียน?
              หากส่งแล้วจะไม่สามารถแก้ไขได้
            </p>

            {/* ปุ่ม action */}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "0.75rem",
              }}
            >
              <button
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #3f29ab",
                  color: "#3f29ab",
                  padding: "0.5rem 1.25rem",
                  borderRadius: "0.5rem",
                  cursor: "pointer",
                  fontSize: "0.95rem",
                }}
              >
                ยกเลิก
              </button>
              <button
                style={{
                  backgroundColor: "#3f29ab",
                  color: "#fff",
                  padding: "0.5rem 1.25rem",
                  borderRadius: "0.5rem",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "0.95rem",
                }}
              >
                ยืนยัน
              </button>
            </div>
          </div>
        ),
      },
      {
        id: "sidepanel",
        name: "Side Panel Modal",
        description: "โมดอลแถบด้านข้างสำหรับแสดงข้อมูลเพิ่มเติม",
        detail:
          "เหมาะสำหรับการแสดงข้อมูลเชิงลึก เช่น รายละเอียดของนักเรียนหรือข้อมูลส่วนตัว",
        prompt: "สร้างโมดอลแบบแถบด้านขวา (Side Panel) ที่เปิดจากด้านข้าง มีปุ่ม ✕ ปิดที่มุมขวาบน ภายในแสดงข้อมูลนักเรียน เช่น ชื่อ ชั้นเรียน คะแนนล่าสุด โดยด้านซ้ายแสดงพื้นที่ภาพตัวอย่างแบบ mock-up และด้านขวาแสดงรายละเอียดทั้งหมด",
        example: (
          <div
            style={{
              display: "flex",
              width: "100%",
              maxWidth: "600px",
              maxHeight: "200px",
              borderRadius: "1rem",
              overflow: "hidden",
              boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
              position: "relative",
            }}
          >
            {/* ด้านซ้าย - mock content */}
            <div
              style={{
                flex: 1,
                backgroundColor: "#eee",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.875rem",
                color: "#888",
                padding: "0.5rem",
              }}
            >
              พื้นที่เนื้อหา/รูป
            </div>

            {/* ด้านขวา - side panel */}
            <div
              style={{
                width: "250px",
                backgroundColor: "#3f29ab",
                color: "#fff",
                padding: "1.25rem",
                position: "relative",
              }}
            >
              {/* ปุ่มปิด */}
              <button
                style={{
                  position: "absolute",
                  top: "8px",
                  right: "8px",
                  background: "transparent",
                  border: "none",
                  color: "#fff",
                  fontSize: "1rem",
                  cursor: "pointer",
                }}
                onClick={() => alert("ปิด modal (mock)")}
                aria-label="ปิด"
              >
                ✕
              </button>

              <h4 style={{ marginBottom: "0.5rem", fontWeight: 500 }}>
                ข้อมูลนักเรียน
              </h4>
              <p style={{ fontWeight: 300 }}>ชื่อ: ศิรดา น.</p>
              <p style={{ fontWeight: 300 }}>ระดับชั้น: ม.3</p>
              <p style={{ fontWeight: 300 }}>สถานะ: ผ่าน</p>
              <p style={{ fontWeight: 300 }}>คะแนนล่าสุด: 85/100</p>
            </div>
          </div>
        ),
      },
      {
        id: "multistep",
        name: "Multi-Step Modal",
        description: "โมดอลแบบหลายขั้นตอนสำหรับการกรอกข้อมูลหรือทำแบบสอบถาม",
        detail:
          "เหมาะสำหรับการใช้งานที่ต้องแบ่งเนื้อหาเป็นหลายหน้า เช่น แบบสอบถามหรือขั้นตอนการสมัคร",
        prompt:
          "สร้างโมดอลแบบหลายขั้นตอนสำหรับแบบสอบถามที่มีทั้งหมด 3 ขั้นตอน โดยแสดงคำถามต่างกันในแต่ละขั้น พร้อมปุ่ม “ถัดไป” สำหรับเปลี่ยนขั้นตอน และแสดงข้อความขอบคุณเมื่อจบแบบสอบถาม ปุ่ม ✕ อยู่ที่มุมขวาบน",
        example: <MultiStepModal />,
      },
      {
        id: "dialog",
        name: "Dialog Modal",
        description: "กล่องโต้ตอบแบบกะทัดรัด สำหรับยืนยันการกระทำทันที",
        detail: "ใช้เพื่อยืนยันการกระทำสำคัญ เช่น การออกจากระบบ หรือลบบัญชี",
        prompt:
          "สร้างกล่องโต้ตอบแบบ Dialog สำหรับยืนยันการออกจากระบบ โดยแสดงข้อความยืนยันอย่างชัดเจน มีปุ่ม “✕” มุมขวาบน และปุ่ม “ออกจากระบบ” ด้านล่าง ให้ดีไซน์ดูเรียบง่าย กะทัดรัด พร้อมใช้จริง",
        example: (
          <div
            style={{
              position: "relative",
              backgroundColor: "#ffffff",
              border: "1px solid #c9c9c9",
              color: "#222",
              padding: "1.5rem",
              borderRadius: "1rem",
              width: "280px",
              textAlign: "center",
            }}
          >
            {/* ปุ่มปิด */}
            <button
              onClick={() => alert("ปิด dialog (mock)")}
              aria-label="ปิด"
              style={{
                position: "absolute",
                top: "0.75rem",
                right: "0.75rem",
                background: "transparent",
                border: "none",
                color: "#555",
                fontSize: "1rem",
                cursor: "pointer",
              }}
            >
              ✕
            </button>
            {/* ข้อความ */}
            <p
              style={{
                fontSize: "1rem",
                fontWeight: 400,
                margin: "1rem 0 1rem 0",
              }}
            >
              คุณแน่ใจหรือไม่ว่าจะออกจากระบบ?
            </p>

            {/* ปุ่ม */}
            <button
              style={{
                padding: "0.5rem 1.25rem",
                backgroundColor: "#7c4dff",
                color: "#fff",
                border: "none",
                borderRadius: "0.5rem",
                fontSize: "0.95rem",
                cursor: "pointer",
                transition: "background 0.2s",
              }}
              onClick={() => alert("ออกจากระบบ (mock)")}
            >
              ออกจากระบบ
            </button>
          </div>
        ),
      },
      {
        id: "video",
        name: "Video Modal",
        description: "โมดอลแสดงวิดีโอเพื่อใช้ในการเรียนรู้หรือสื่อสาร",
        detail: "ใช้ในการแสดงคลิปวิดีโอ เช่น วิดีโอแนะนำบทเรียน หรือสื่อการสอน",
        prompt: "สร้างโมดอลที่แสดงวิดีโอแนะนำบทเรียน โดยมีพื้นหลังสีเข้ม พร้อมปุ่ม ✕ สำหรับปิดที่มุมขวาบน วิดีโอควรขนาดพอดีกับกรอบ และไม่ล้นออกนอกโมดอล ให้สามารถเล่น/หยุดวิดีโอได้ตามปกติ",
        example: (
          <div
            style={{
              position: "relative",
              backgroundColor: "#3f29ab",
              color: "#fff",
              borderRadius: "1rem",
              width: "80%",
              boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* ปุ่ม ✕ ปิด */}
            <button
              onClick={() => alert("ปิด modal (mock)")}
              aria-label="ปิด"
              style={{
                position: "absolute",
                top: "0.5rem",
                right: "0.5rem",
                background: "transparent",
                border: "none",
                color: "#fff",
                fontSize: "1.2rem",
                cursor: "pointer",
              }}
            >
              ✕
            </button>
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <video
                controls
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "cover",
                  borderRadius: "0.5rem",
                }}
              >
                <source
                  src="https://www.w3schools.com/html/mov_bbb.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
          </div>
        ),
      },
      {
        id: "result",
        name: "Result Modal",
        description: "โมดอลแสดงผลลัพธ์ เช่น คะแนนหรือผลการประเมิน",
        detail: "ใช้แสดงผลคะแนนหลังจากผู้ใช้ทำแบบทดสอบ พร้อมข้อความให้กำลังใจ",
        prompt: "สร้างโมดอลแสดงผลคะแนนหลังจากผู้เรียนทำแบบฝึกหัด โดยมีหัวข้อ “ผลลัพธ์” ขนาดใหญ่ ตัวเลขคะแนนเด่นชัด เช่น “8/10” พร้อมข้อความให้กำลังใจ ปุ่ม ✕ อยู่มุมขวาบน โมดอลมีดีไซน์ที่สวยงามและดึงดูดสายตา",
        example: (
          <div
            style={{
              position: "relative",
              backgroundColor: "#7c8cfd",
              color: "#fff",
              padding: "1.5rem",
              borderRadius: "1rem",
              width: "100%",
              maxWidth: "360px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
              fontFamily: "inherit",
              textAlign: "center",
            }}
          >
            {/* ปุ่มปิด */}
            <button
              onClick={() => alert("ปิด modal (mock)")}
              aria-label="ปิด"
              style={{
                position: "absolute",
                top: "0.75rem",
                right: "0.75rem",
                background: "transparent",
                border: "none",
                color: "#fff",
                fontSize: "1.25rem",
                cursor: "pointer",
              }}
            >
              ✕
            </button>

            {/* หัวข้อ */}
            <h4
              style={{
                fontSize: "1.25rem",
                fontWeight: 500,
                marginBottom: "1rem",
              }}
            >
              ผลลัพธ์
            </h4>

            {/* คะแนน */}
            <p
              style={{
                fontSize: "1.125rem",
                fontWeight: 600,
                marginBottom: "0.5rem",
              }}
            >
              คุณทำได้{" "}
              <span style={{ fontSize: "1.5rem", color: "#3f29ab" }}>8/10</span>{" "}
              คะแนน
            </p>

            {/* ข้อความเสริม */}
            <p style={{ fontSize: "1rem", fontWeight: 300 }}>
              เยี่ยมมาก! ลองทำอีกครั้งเพื่อทบทวน
            </p>
          </div>
        ),
      },
    ]);
  }, []);

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
              <br />
              Speacial Project
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
          <span className={styles.elementName}>Modal UI</span>
          <br />
          ตัวอย่างโมดอลสำหรับการใช้งานในเว็บไซต์เพื่อการศึกษา
          <br />
          มีทั้งแบบแจ้งเตือน, หลายขั้นตอน, วิดีโอ และผลลัพธ์
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
                  {copiedId === item.id ? "คัดลอกแล้ว!" : "คัดลอก Prompt"}
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
