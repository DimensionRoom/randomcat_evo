"use client";
import React, { useState, useEffect } from "react";
import styles from "./CategoryFilterSearch.module.scss";

const mockData = [
  { title: "คณิตศาสตร์ ม.1", category: "คณิตศาสตร์" },
  { title: "คณิตศาสตร์ ม.2", category: "คณิตศาสตร์" },
  { title: "ฟิสิกส์ ม.ปลาย", category: "วิทยาศาสตร์" },
  { title: "ชีววิทยา ม.ปลาย", category: "วิทยาศาสตร์" },
  { title: "พื้นฐานภาษาอังกฤษ", category: "ภาษาอังกฤษ" },
];

const categories = ["ทั้งหมด", "คณิตศาสตร์", "วิทยาศาสตร์", "ภาษาอังกฤษ"];

export default function CategoryFilterSearch() {
  const [selectedCategory, setSelectedCategory] = useState("ทั้งหมด");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredResults, setFilteredResults] = useState<typeof mockData>([]);

  useEffect(() => {
    let results = mockData;

    if (selectedCategory !== "ทั้งหมด") {
      results = results.filter(item => item.category === selectedCategory);
    }

    if (searchTerm.trim() !== "") {
      results = results.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredResults(results);
  }, [selectedCategory, searchTerm]);

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchRow}>
        <select
          className={styles.select}
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="พิมพ์คำค้นหา..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      {filteredResults.length > 0 ? (
        <div className={styles.results}>
          {filteredResults.map((item, idx) => (
            <span key={idx} className={styles.resultItem}>
              {item.title}
              {idx !== filteredResults.length - 1 && ", "}
            </span>
          ))}
        </div>
      ) : searchTerm.trim() !== "" ? (
        <div className={styles.noResults}>ไม่พบผลลัพธ์</div>
      ) : null}
    </div>
  );
}