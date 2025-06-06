"use client";
import React, { useState, useEffect } from "react";
import styles from "./Pagination.module.scss";
import i18nConfig from "@/i18nConfig";
import initTranslations from "@/app/[locale]/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";

const i18nNamespaces = ["common"];

interface PaginateProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  totalItems: number;
  locale?: string;
}

const Pagination: React.FC<PaginateProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  totalItems,
  locale = "en",
}) => {
  const [resources, setResources] = useState<any>(null);
  const [t, setT] = useState<((key: string) => string) | null>(null);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const currentEndIndex = Math.min(currentPage * itemsPerPage, totalItems);

  useEffect(() => {
    async function fetchTranslations() {
      const { t, resources } = await initTranslations(locale, i18nNamespaces);
      setT(() => t);
      setResources(resources);
    }
    fetchTranslations();
  }, [locale]);

  // Wait for translations to load
  if (!t || !resources) return null;

  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
      <div className={styles.pagination}>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {t("button.previous")}
        </button>

        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={currentPage === page ? styles.activePage : ""}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          {t("button.next")}
        </button>
      </div>
    </TranslationsProvider>
  );
};

export default Pagination;