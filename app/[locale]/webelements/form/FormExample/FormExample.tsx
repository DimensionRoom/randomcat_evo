"use client";
import React from "react";
import styles from "./FormExample.module.scss";

export const LoginFormExample = () => (
  <form className={styles.formSignin}>
    <p className={styles.formTitleSignin}>เข้าสู่ระบบเรียนออนไลน์</p>

    <div className={styles.inputContainerSignin}>
      <input placeholder="อีเมล" type="email" />
      <span>
        <svg
          stroke="currentColor"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
          ></path>
        </svg>
      </span>
    </div>

    <div className={styles.inputContainerSignin}>
      <input placeholder="รหัสผ่าน" type="password" />
      <span>
        <svg
          stroke="currentColor"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
          ></path>
          <path
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
          ></path>
        </svg>
      </span>
    </div>

    <button type="submit" className={styles.submitSignin}>
      เข้าสู่ระบบ
    </button>

    <p className={styles.signupLinkSignin}>
      ไม่มีบัญชี?{" "}
      <a href="#" style={{ color: "blue" }}>
        ลงทะเบียน
      </a>
    </p>
  </form>
);

export const RegisterFormExample = () => (
  <div className={styles.formBoxSignup}>
    <form className={styles.formSignup}>
      <span className={styles.titleSignup}>สมัครสมาชิก</span>
      <span className={styles.subtitleSignup}>สำหรับนักเรียนใหม่</span>
      <div className={styles.formContainerSignup}>
        <input
          type="text"
          className={styles.inputSignup}
          placeholder="ชื่อ-นามสเกุล"
        />
        <input
          type="email"
          className={styles.inputSignup}
          placeholder="อีเมล"
        />
        <input
          type="password"
          className={styles.inputSignup}
          placeholder="รหัสผ่าน"
        />
      </div>
      <button type="submit" className={styles.button}>
        ลงทะเบียน
      </button>
    </form>
    <div className={styles.formSectionSignup}>
      <p>
        มีบัญชีแล้ว? <a href="#">เข้าสู่ระบบ</a>
      </p>
    </div>
  </div>
);

export const UploadFormExample = () => (
  <div className={styles.modalUpload}>
    <div className={styles.modalHeader}>
      <div className={styles.modalLogo}>
        <span className={styles.logoCircle}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            viewBox="0 0 512 419.116"
          >
            <path
              d="M16.991,419.116A16.989,16.989,0,0,1,0,402.125V16.991A16.989,16.989,0,0,1,16.991,0H146.124a17,17,0,0,1,10.342,3.513L227.217,57.77H437.805A16.989,16.989,0,0,1,454.8,74.761v53.244h40.213A16.992,16.992,0,0,1,511.6,148.657L454.966,405.222a17,17,0,0,1-16.6,13.332H410.053v.562ZM63.06,384.573H424.722L473.86,161.988H112.2Z"
              fill="var(--c-action-primary)"
            />
          </svg>
        </span>
      </div>
      <button className={styles.btnClose}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path fill="none" d="M0 0h24v24H0V0z" />
          <path
            d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
            fill="var(--c-text-secondary)"
          />
        </svg>
      </button>
    </div>

    <div className={styles.modalBody}>
      <p className={styles.modalTitle}>อัปโหลดไฟล์การบ้าน</p>
      <p className={styles.modalDescription}>แนบไฟล์ด้านล่าง</p>

      <button className={styles.uploadArea}>
        <span className={styles.uploadAreaIcon}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            viewBox="0 0 340.531 419.116"
          >
            <path
              d="M-2904.708-8.885A39.292,39.292,0,0,1-2944-48.177V-388.708A39.292,39.292,0,0,1-2904.708-428h209.558a13.1,13.1,0,0,1,9.3,3.8l78.584,78.584a13.1,13.1,0,0,1,3.8,9.3V-48.177a39.292,39.292,0,0,1-39.292,39.292Zm-13.1-379.823V-48.177a13.1,13.1,0,0,0,13.1,13.1h261.947a13.1,13.1,0,0,0,13.1-13.1V-323.221h-52.39a26.2,26.2,0,0,1-26.194-26.195v-52.39h-196.46A13.1,13.1,0,0,0-2917.805-388.708Zm146.5,241.621a14.269,14.269,0,0,1-7.883-12.758v-19.113h-68.841c-7.869,0-7.87-47.619,0-47.619h68.842v-18.8a14.271,14.271,0,0,1,7.882-12.758,14.239,14.239,0,0,1,14.925,1.354l57.019,42.764c.242.185.328.485.555.671a13.9,13.9,0,0,1,2.751,3.292,14.57,14.57,0,0,1,.984,1.454,14.114,14.114,0,0,1,1.411,5.987,14.006,14.006,0,0,1-1.411,5.973,14.653,14.653,0,0,1-.984,1.468,13.9,13.9,0,0,1-2.751,3.293c-.228.2-.313.485-.555.671l-57.019,42.764a14.26,14.26,0,0,1-8.558,2.847A14.326,14.326,0,0,1-2771.3-147.087Z"
              transform="translate(2944 428)"
              fill="var(--c-action-primary)"
            />
          </svg>
        </span>
        <span className={styles.uploadAreaTitle}>
          ลากไฟล์มาวางที่นี่เพื่ออัปโหลด
        </span>
        <span className={styles.uploadAreaDescription}>
          หรือ
          <strong>กดที่นี่</strong>
        </span>
      </button>
    </div>

    <div className={styles.modalFooter}>
      <button className={styles.btnSecondary}>ยกเลิก</button>
      <button className={styles.btnPrimary}>อัปโหลด</button>
    </div>
  </div>
);

export const FeedbackFormExample = () => (
  <form className={styles.formContact}>
    <div className={styles.title}>feedback</div>
    <input type="text" placeholder="อีเมลของคุณ" className={styles.input} />
    <textarea placeholder="ความคิดเห็น" className={styles.textarea} />
    <button type="submit" className={styles.button}>
      ส่งความคิดเห็น
    </button>
  </form>
);

