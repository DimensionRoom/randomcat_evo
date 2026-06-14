"use client";
import React, { useState, useEffect, use } from "react";
import { useSearchParams } from "next/navigation";

import PageFooter from "@/components/Footer/PageFooter";
import { useTranslations } from "@/hooks/useTranslations";
import PageShell from "@/components/PageShell/PageShell";
import templateLoad from "@/public/json/templateload.json";
import MainNavigationTopBar from "@/components/NavigationBar/MainNavigationTopBar";
import TemplateCard from "@/components/Card/VerticalCard/TemplateCard/TemplateCard";
import Pagination from "@/components/Pagination/Pagination";
import styles from "./Template.module.scss";
import { kanit, mitr } from "@/lib/fonts";

type DocumentItem = {
  id: string;
  picture: string;
  topic: string;
  desc: string;
  desc2: string;
  link: string;
};

interface TemplateFile {
  type: string;
  topic: string;
  desc: string;
  desc2: string;
}

interface OutputItem {
  id: string;
  picture: string;
  topic: string;
  desc: string;
  desc2: string;
  link: string;
}

const i18nNamespaces = ["templateScreen"];
export default function TemplateScreen({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const { t, resources, ready } = useTranslations(locale, i18nNamespaces);
  const searchParams = useSearchParams();
  const searchParamsInfo = searchParams.get("info");
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 9;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDocuments = documents.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(documents.length / itemsPerPage);

  const transformJsonTemplateData = () => {
    const templateData = require(`@/locales/${locale}/documentTemplateData.json`);
    if (!templateData?.template?.files) {
      return [];
    }

    const files = templateData.template.files;

    const transformedData = Object.keys(files).map((key, index) => {
      const item = files[key];

      return {
        id: (index + 1).toString(),
        picture: `/image/pdf_cover/${key}.png`,
        topic: item.topic,
        desc: item.desc,
        desc2: item.desc2,
        link: `/workshop_template/${key}.pdf`,
      };
    });
    setDocuments(transformedData);
  };

  useEffect(() => {
    transformJsonTemplateData();
  }, []);

  return (
    <PageShell
      locale={locale}
      namespaces={i18nNamespaces}
      resources={resources}
      ready={ready}
      loaderAnimation={templateLoad}
    >
      <MainNavigationTopBar fill locale={locale} />
      <main className={styles.main}>
        <section className={`${styles.section} ${styles.parallaxSection}`}>
          <div className={styles.textContainer}>
            <p className={styles.title}>{t("section.parallaxSection.title")}</p>
            <p className={styles.subtitle}>
              {t("section.parallaxSection.subtitle")}
            </p>
          </div>
        </section>
        <section className={`${styles.section} ${styles.whiteSection}`}>
          <div className={styles.textContainer}>
            <p className={styles.title}>{t("section.whiteSection.title")}</p>
            <p
              className={`${styles.subtitle} ${
                locale == "th" ? `${mitr.className} ${styles.thfontbold}` : null
              }`}
            >
              {t("section.whiteSection.subtitle")}
            </p>
          </div>
        </section>
        <section className={`${styles.section} ${styles.documentSection}`}>
          <div className={styles.documentContainer}>
            {currentDocuments.map((document: DocumentItem) => (
              <TemplateCard
                key={document.id}
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
        <section className={`${styles.section} ${styles.paginationSection}`}>
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(documents.length / itemsPerPage)}
            itemsPerPage={itemsPerPage}
            totalItems={documents.length}
            onPageChange={(page) => setCurrentPage(page)}
            locale={locale}
          />
        </section>
        <section className={`${styles.section} ${styles.footerSection}`}>
          <PageFooter locale={locale} />
        </section>
      </main>
    </PageShell>
  );
}
