"use client";
import React, { useState, useEffect } from "react";
import styles from "./TagfilterSearch.module.scss";

// Mock lesson data
const lessons = [
  { title: "คณิตศาสตร์พื้นฐาน", tags: ["คณิตศาสตร์"] },
  { title: "คณิตศาสตร์ ม.2", tags: ["คณิตศาสตร์"] },
  { title: "วิทยาศาสตร์พื้นฐาน", tags: ["วิทยาศาสตร์"] },
  { title: "พื้นฐานภาษาอังกฤษ", tags: ["ภาษาอังกฤษ"] },
  { title: "อังกฤษเพื่อการสื่อสาร", tags: ["ภาษาอังกฤษ"] },
];

const tags = ["คณิตศาสตร์", "วิทยาศาสตร์", "ภาษาอังกฤษ"];

export default function TagFilterSearch() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredLessons, setFilteredLessons] = useState<typeof lessons>([]);

  useEffect(() => {
    let results = lessons;

    if (searchTerm.trim()) {
      results = results.filter((lesson) =>
        lesson.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedTags.length > 0) {
      results = results.filter((lesson) =>
        lesson.tags.some((tag) => selectedTags.includes(tag))
      );
    }

    setFilteredLessons(results);
  }, [searchTerm, selectedTags]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        placeholder="ค้นหาบทเรียน..."
        className={styles.searchInput}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className={styles.tags}>
        {tags.map((tag, idx) => (
          <button
            key={idx}
            className={`${styles.tag} ${
              selectedTags.includes(tag) ? styles.activeTag : ""
            }`}
            onClick={() => toggleTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className={styles.results}>
        {filteredLessons.length > 0 ? (
          <div className={styles.inlineResult}>
            {filteredLessons.map((lesson, idx) => (
              <span key={idx}>
                {lesson.title}
                {idx !== filteredLessons.length - 1 && ", "}
              </span>
            ))}
          </div>
        ) : (
          <div className={styles.noResults}>ไม่พบผลลัพธ์</div>
        )}
      </div>
    </div>
  );
}
