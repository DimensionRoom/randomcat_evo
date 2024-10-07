"use client";
import React, { useState, useEffect, useRef, use } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Kanit, Quicksand, Mitr, Poppins } from "next/font/google";
import PageFooter from "@/components/Footer/PageFooter";
import initTranslations from "@/i18n";
import Link from "next/link";
import TranslationsProvider from "@/components/TranslationsProvider";
import LottieAnimation from "@/components/Loading/LottieAnimation";
import mainLoad from "@/public/json/mainload.json";
import MainNavigationTopBar from "@/components/NavigationBar/MainNavigationTopBar";
import TemplateCard from "@/components/Card/VerticalCard/TemplateCard/TemplateCard";
import styles from "./Template.module.scss";

type DocumentItem = {
  id: string;
  picture: string;
  topic: string;
  desc: string;
  desc2: string;
  link: string;
};

const i18nNamespaces = ["innovationboard"];
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
  const searchParams = useSearchParams();
  const searchParamsInfo = searchParams.get("info");
  const [resources, setResources] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const documents = [
    {
      id: "1",
      picture: "",
      topic: "Morphological Chart",
      desc: "A visual way to capture the",
      desc2: "necessary product functionality.",
      link: "/workshop_template/morphological_chart.pdf",
    },
    {
      id: "2",
      picture: "",
      topic: "Pitching Plan",
      desc: "Planning your pitch on a single",
      desc2: "page sounds great, right?",
      link: "/workshop_template/pitching_plan.pdf",
    },
    {
      id: "3",
      picture: "",
      topic: "SCAMPER",
      desc: "Think creatively by using",
      desc2: "the SCAMPER method.",
      link: "/workshop_template/scamper.pdf",
    },
    {
      id: "4",
      picture: "",
      topic: "Innovation Design",
      desc: "This template can be used",
      desc2: "along with our online cards.",
      link: "/workshop_template/innovation_design.pdf",
    },
    {
      id: "5",
      picture: "",
      topic: "Story Design",
      desc: "This template can be used",
      desc2: "along with our online cards.",
      link: "/workshop_template/story_design.pdf",
    },
    {
      id: "6",
      picture: "",
      topic: "Education Design",
      desc: "This template can be used",
      desc2: "along with our online cards.",
      link: "/workshop_template/education_design.pdf",
    },
    {
      id: "7",
      picture: "",
      topic: "Innovation Canvas",
      desc: "A canvas that shows an overview",
      desc2: "of your educational innovation.",
      link: "/workshop_template/educational_canvas.pdf",
    },
    {
      id: "8",
      picture: "",
      topic: "Content Combination",
      desc: "Finding the right content for",
      desc2: "your audience with this tool.",
      link: "/workshop_template/content_combination.pdf",
    },
    {
      id: "9",
      picture: "",
      topic: "Character Design",
      desc: "Can’t think of a character for",
      desc2: "your story? look at this tool.",
      link: "/workshop_template/character_design.pdf",
    },
  ];

  useEffect(() => {
    async function fetchTranslations() {
      const { t, resources } = await initTranslations(locale, i18nNamespaces);
      setT(() => t);
      setResources(resources);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
    fetchTranslations();
  }, [locale]);

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
        <LottieAnimation
          animationData={mainLoad}
          color={["#1e4e9c", "#298edc", "#072167"]}
        />
      </div>
    );
  }

  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
      <MainNavigationTopBar locale={locale} />
      <main className={styles.main}>
        <section className={`${styles.section} ${styles.parallaxSection}`}>
          <div className={styles.textContainer}>
            <p className={styles.title}>Resources</p>
            <p className={styles.subtitle}>Beyond creative tools</p>
          </div>
        </section>
        <section className={`${styles.section} ${styles.whiteSection}`}>
          <div className={styles.textContainer}>
            <p className={styles.title}>Free templates for you</p>
            <p className={styles.subtitle}>
              "These templates help you work systematically. Try it now!"
            </p>
          </div>
        </section>
        <section className={`${styles.section} ${styles.documentSection}`}>
          <div className={styles.documentContainer}>
            {documents.map((document: DocumentItem) => (
              <TemplateCard
                locale={locale}
                title={document.topic}
                contentFirst={document.desc}
                contentSecond={document.desc2}
                image={document.picture}
                onClick={() => {
                  window.open(document.link, "_blank");
                }}
              />
            ))}
          </div>
        </section>
        <section className={`${styles.section} ${styles.footerSection}`}>
          <PageFooter locale={locale} />
        </section>
      </main>
    </TranslationsProvider>
  );
}
