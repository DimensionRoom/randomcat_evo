"use client";
import React, { useState } from "react";
import styles from "./MenuExamples.module.scss";

// Horizon Menu
export const HorizonMenu = ({ color }: { color: string }) => {
  const [selected, setSelected] = useState("วิทยาศาสตร์");
  const menuItems = ["วิทยาศาสตร์", "คณิตศาสตร์", "ภาษาไทย", "สังคม"];

  return (
    <div className={styles.menuBox} style={{ backgroundColor: color ,width:"100%"}}>
      <div className={styles.menuHorizontal}>
        {menuItems.map((item) => (
          <button
            key={item}
            className={selected === item ? styles.activeBtn : ""}
            onClick={() => setSelected(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <div className={styles.menuContent}>
        <p>คุณเลือกหัวข้อ: <strong>{selected}</strong></p>
        <p>แสดงเนื้อหาวิชา {selected} เช่น วิดีโอ ใบงาน หรือกิจกรรม</p>
      </div>
    </div>
  );
};

// Sidebar Menu
export const SidebarMenu = ({ color }: { color: string }) => {
  const [selected, setSelected] = useState("นักเรียน");
  const menuItems = ["นักเรียน", "ครูผู้สอน", "วิชาเรียน", "แบบฝึกหัด"];

  return (
    <div className={styles.menuBox} style={{ backgroundColor: color }}>
      <div className={styles.menuSidebarWrapper}>
        <div className={styles.menuSidebar}>
          {menuItems.map((item) => (
            <button
              key={item}
              className={
                selected === item
                  ? `${styles.menuButton} ${styles.activeBtn}`
                  : styles.menuButton
              }
              onClick={() => setSelected(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <div className={styles.menuMainContent}>
          <p>
            คุณเลือกหมวด: <strong>{selected}</strong>
          </p>
          <p>เนื้อหาของหมวด {selected} จะแสดงที่นี่</p>
        </div>
      </div>
    </div>
  );
};

// Vertical Menu
export const VerticalMenu = ({ color }: { color: string }) => {
  const [selected, setSelected] = useState("บทที่ 1");
  const menuItems = ["เนื้อหา", "วิดีโอการสอน", "แบบฝึกหัด", "คำถามท้ายบท"];

  return (
    <div className={styles.menuBox} style={{ backgroundColor: color,width:"40%" }}>
      <div className={styles.menuVertical}>
        {menuItems.map((item) => (
          <button
            key={item}
            className={
              selected === item
                ? `${styles.menuButton} ${styles.activeBtn}`
                : styles.menuButton
            }
            onClick={() => setSelected(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

// Hamburger Menu
export const HamburgerMenu = ({ color }: { color: string }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuItems = ["คลังบทเรียน", "ผลการเรียน", "ตั้งค่า"];

  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setExpandedItem(null); // reset submenu when menu closes
  };

  const toggleItem = (item: string) => {
    setExpandedItem((prev) => (prev === item ? null : item));
  };

  return (
    <div className={styles.menuBox} style={{ backgroundColor: color }}>
      {!menuOpen ? (
        <button className={styles.menuButton} onClick={toggleMenu}>
          ☰ เมนู
        </button>
      ) : (
        <div className={styles.menuHamburger}>
          <button className={styles.menuButton} onClick={toggleMenu}>
            ✖ ปิดเมนู
          </button>
          {menuItems.map((item) => (
            <div key={item}>
              <button
                className={`${styles.menuButton} ${
                  expandedItem === item ? styles.activeBtn : ""
                }`}
                onClick={() => toggleItem(item)}
              >
                {item}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};



// Tab Menu
export const TabMenu = ({ color }: { color: string }) => {
  const [tab, setTab] = useState("ป.1-ป.3");
  const tabs = ["ป.1-ป.3", "ป.4-ป.6", "ม.1-ม.3"];

  return (
    <div className={styles.menuBox} style={{ backgroundColor: color }}>
      <div className={styles.tabContainer}>
        <div className={styles.tabHeader}>
          {tabs.map((t) => (
            <button
              key={t}
              className={`${styles.tabButton} ${tab === t ? "" : styles.inActiveTab} ${tab === t ? styles.activeTab : ""}`}
              onClick={() => setTab(t)}
            >
              {t}
            </button>
          ))}
        </div>
        <div className={styles.tabPanel}>
          <p>คุณอยู่ในระดับ: <strong>{tab}</strong></p>
          <p>แสดงแบบฝึกหัดสำหรับระดับ {tab}</p>
        </div>
      </div>
    </div>
  );
};

