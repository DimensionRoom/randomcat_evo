"use client";
import React, { useState, useEffect } from "react";
import { Player} from "@lottiefiles/react-lottie-player";
import { useSearchParams } from "next/navigation";
import { Kanit, Quicksand, Mitr, Poppins } from "next/font/google";
import PageFooter from "@/components/Footer/PageFooter";
import initTranslations from "@/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";
import templateLoad from "@/public/json/templateLoad.json";
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
      picture: "/image/pdf_cover/morphological_chart.png",
      topic: "Morphological Chart",
      desc: "A visual way to capture the",
      desc2: "necessary product functionality.",
      link: "/workshop_template/morphological_chart.pdf",
    },
    {
      id: "2",
      picture: "/image/pdf_cover/pitching_plan.png",
      topic: "Pitching Plan",
      desc: "Planning your pitch on a single",
      desc2: "page sounds great, right?",
      link: "/workshop_template/pitching_plan.pdf",
    },
    {
      id: "3",
      picture: "/image/pdf_cover/scamper.png",
      topic: "SCAMPER",
      desc: "Think creatively by using",
      desc2: "the SCAMPER method.",
      link: "/workshop_template/scamper.pdf",
    },
    {
      id: "4",
      picture: "/image/pdf_cover/innovation_design.png",
      topic: "Innovation Design",
      desc: "This template can be used",
      desc2: "along with our online cards.",
      link: "/workshop_template/innovation_design.pdf",
    },
    {
      id: "5",
      picture: "/image/pdf_cover/story_design.png",
      topic: "Story Design",
      desc: "This template can be used",
      desc2: "along with our online cards.",
      link: "/workshop_template/story_design.pdf",
    },
    {
      id: "6",
      picture: "/image/pdf_cover/education_design.png",
      topic: "Education Design",
      desc: "This template can be used",
      desc2: "along with our online cards.",
      link: "/workshop_template/education_design.pdf",
    },
    {
      id: "7",
      picture: "/image/pdf_cover/educational_canvas.png",
      topic: "Innovation Canvas",
      desc: "A canvas that shows an overview",
      desc2: "of your educational innovation.",
      link: "/workshop_template/educational_canvas.pdf",
    },
    {
      id: "8",
      picture: "/image/pdf_cover/content_combination.png",
      topic: "Content Combination",
      desc: "Finding the right content for",
      desc2: "your audience with this tool.",
      link: "/workshop_template/content_combination.pdf",
    },
    {
      id: "9",
      picture: "/image/pdf_cover/character_design.png",
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
      }, 1500);
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
        <Player
          autoplay
          loop
          src={templateLoad}
          style={{ width: "25vh" }}
        ></Player>
      </div>
    );
  }

  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
      <MainNavigationTopBar fill locale={locale} />
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
