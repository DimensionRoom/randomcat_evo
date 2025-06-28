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
import styles from "./Card.module.scss";

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

export default function CardUiScreen({
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

  useEffect(() => {
    const sampleElements: ElementTypeItem[] = [
      {
        id: "1",
        name: "การ์ดข้อมูล (Info Card)",
        description: "แสดงเนื้อหาสำคัญหรือคำอธิบายประกอบการเรียนรู้",
        detail:
          "เหมาะสำหรับการสรุปบทเรียนหรือแสดงเนื้อหาสั้น ๆ พร้อมหัวข้อชัดเจน",
        prompt: `ออกแบบการ์ดข้อมูลที่มีหัวข้อ คำอธิบายสั้น ๆ และสามารถใส่ไอคอนประกอบเนื้อหาเพื่อเพิ่มความเข้าใจ`,
        example: (
          <div className={styles.cardInfo}>
            <div className={styles.header}>
              <span className={styles.title}>คอร์สพื้นฐานวิทยาศาสตร์</span>
              <span className={styles.price}>Free</span>
            </div>
            <p className={styles.desc}>
              เรียนรู้เนื้อหาวิทยาศาสตร์เบื้องต้นอย่างเข้าใจง่าย
              ผ่านบทเรียนสั้นและภาพประกอบที่น่าสนใจ
            </p>
            <ul className={styles.lists}>
              {[
                "บทเรียนสั้นกระชับ",
                "มีแบบฝึกหัดทุกบท",
                "ใบประกาศนียบัตรเมื่อจบคอร์ส",
              ].map((feature, index) => (
                <li className={styles.list} key={index}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    width="20"
                    height="20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 
          10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 
          2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              className={styles.action}
              onClick={() => alert("เริ่มเรียนแล้ว!")}
            >
              เริ่มเรียนเลย
            </button>
          </div>
        ),
      },
      {
        id: "5",
        name: "การ์ดแสดงความก้าวหน้า (Progress Card)",
        description: "ติดตามความคืบหน้าในการเรียนของผู้เรียน",
        detail:
          "การ์ดประเภทนี้ช่วยแสดงเปอร์เซ็นต์ความก้าวหน้า เช่น จำนวนบทเรียนที่เรียนครบ เป้าหมายที่สำเร็จ หรือสถานะของคอร์สเรียน ช่วยกระตุ้นให้ผู้เรียนมีแรงจูงใจและเห็นพัฒนาการของตนเองอย่างชัดเจน",
        prompt: `ออกแบบการ์ดแสดงความก้าวหน้าในการเรียน โดยมีหัวข้อที่ชัดเจน เช่น 'ความก้าวหน้า' พร้อมเปอร์เซ็นต์ความสำเร็จ แถบแสดงความคืบหน้า (progress bar) และข้อความสรุป เช่น 'เรียนครบแล้ว 3 จาก 4 บทเรียน'`,
        example: (
          <div className={styles.widgetCard}>
            <div className={styles.widgetHeader}>
              <h3>📚 ความก้าวหน้า</h3>
              <span className={styles.percent}>75%</span>
            </div>
            <div className={styles.progressBar}>
              <div className={styles.progress} style={{ width: "75%" }} />
            </div>
            <p className={styles.percent}>คุณเรียนครบแล้ว 3 จาก 4 บทเรียน</p>
          </div>
        ),
      },
      {
        id: "3",
        name: "การ์ดกิจกรรมแบบพลิก (Flip Card)",
        description: "กระตุ้นการมีส่วนร่วมผ่านกิจกรรมที่มีปฏิสัมพันธ์",
        detail:
          "การ์ดแบบพลิก (Flip Card) เหมาะสำหรับแนะนำกิจกรรมการเรียนรู้ โดยด้านหน้าอาจแสดงหัวข้อกิจกรรม ส่วนด้านหลังเมื่อพลิกจะเผยรายละเอียดเพิ่มเติม เช่น คำอธิบาย กำหนดเวลา และปุ่มเข้าร่วม หรือแนบไฟล์ผลงาน เหมาะกับทั้งกิจกรรมเดี่ยวและกลุ่ม",
        prompt: `ออกแบบการ์ดกิจกรรมที่สามารถพลิกได้ โดยด้านหน้าแสดงชื่อกิจกรรมหรือภาพประกอบ ด้านหลังแสดงรายละเอียดกิจกรรม เช่น คำอธิบายสั้น ๆ วันเวลาที่ต้องส่ง และปุ่มเข้าร่วม หรือแนบผลงาน`,
        example: (
          <div className={`${styles.cardFlip}`}>
            <div className={styles.cardInner}>
              <div className={styles.cardFront}>
                <p>
                  ชื่อกิจกรรม
                  <br />
                  (นำเมาส์มาวางเพื่อพลิก)
                </p>
              </div>
              <div className={styles.cardBack}>
                <p>
                  ส่งภายในวันศุกร์
                  <br />
                  แนบผลงานผ่านระบบ
                </p>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: "4",
        name: "การ์ดกิจกรรมแบบแอนิเมชัน (Animation Card)",
        description: "แสดงกิจกรรมสำคัญพร้อมลูกเล่นแอนิเมชันที่น่าสนใจ",
        detail:
          "การ์ดประเภทนี้เหมาะสำหรับการแจ้งกิจกรรม เช่น การสอบ การส่งงาน หรือกิจกรรมนอกห้องเรียน โดยเน้นภาพเคลื่อนไหวหรือเอฟเฟกต์ที่ดึงดูดสายตา ช่วยให้ผู้เรียนไม่พลาดกำหนดการสำคัญ และกระตุ้นความสนใจได้ดีขึ้น",
        prompt: `ออกแบบการ์ดกิจกรรมที่มีแอนิเมชัน เช่น การขยับหรือคลื่นสี เพื่อแจ้งข้อมูลคะแนนเฉลี่ยวิชาคณิตศาสตร์ 92/100`,
        example: (
          <div className={`${styles.eCard} ${styles.playing}`}>
            <div className={styles.image}></div>

            <div className={styles.wave}></div>
            <div className={styles.wave}></div>
            <div className={styles.wave}></div>

            <div className={styles.infotop}>
              <br />
              คะแนนเฉลี่ยวิชาคณิตศาสตร์
              <br />
              <div className={styles.name}>92 / 100</div>
            </div>
          </div>
        ),
      },
      {
        id: "5",
        name: "การ์ดโปรไฟล์ (Avatar Card)",
        description: "แสดงข้อมูลสรุปของบุคคลอย่างกระชับและน่าสนใจ",
        detail:
          "การ์ดประเภทนี้ใช้ในการแสดงข้อมูลส่วนตัวของผู้เรียน เช่น ชื่อ ห้องเรียน คะแนนเฉลี่ย หรือพฤติกรรมการเรียนรู้ อาจรวมถึงภาพประจำตัว และสามารถแสดงผลการเรียนเป็นตัวเลขหรือแผนภูมิแบบย่อเพื่อให้เห็นภาพรวมในพริบตา เหมาะกับแดชบอร์ดหรือหน้าสรุปข้อมูลรายบุคคล",
        prompt: `ออกแบบการ์ดโปรไฟล์ของผู้เรียนที่มีภาพประจำตัว พร้อมข้อมูลสำคัญ เช่น ระดับชั้น คะแนนเฉลี่ย เวลาเข้าเรียน หรือกิจกรรมล่าสุด โดยจัดวางให้อ่านง่าย`,
        example: (
          <div className={styles.avatarCard}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={styles.avatar}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
            </svg>
            <div className={styles.info}>
              <h3 className={styles.name}>ณัฐชา ธีรเมธา</h3>
              <p className={styles.role}>นักเรียน ม.2/3</p>
              <p className={styles.detail}>คะแนนเฉลี่ย: 88 | เข้าเรียน 95%</p>
            </div>
          </div>
        ),
      },
    ];

    setElementsItems(sampleElements);
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
          <span className={styles.elementName}>Card UI</span>
          <br />
          การใช้ Card UI ช่วยจัดระเบียบข้อมูลให้เป็นหมวดหมู่
          <br />
          เข้าถึงง่าย มองเห็นชัดเจน และเหมาะกับการเปรียบเทียบเนื้อหา
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
