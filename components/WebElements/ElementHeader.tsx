"use client";
import React, { useState, useEffect } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { Mitr } from "next/font/google";
import FlatBtn from "@/components/Button/FlatBtn/FlatBtn";
import signatureAnimate from "@/public/json/animate/signature.json";
import webElementHeaderAnimate from "@/public/json/animate/webElementHeaderAnimate.json";
import styles from "./ElementHeader.module.scss";

const mitr = Mitr({
  subsets: ["thai"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

export type Props = {
  style?: React.CSSProperties;
  className?: string;
};

const ElementHeader = ({ style, className, ...props }: Props): JSX.Element => {
  return (
    <section
      className={`${styles.headerSection} ${mitr.className} ${styles.thfontlight}`}
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
  );
};

export default ElementHeader;