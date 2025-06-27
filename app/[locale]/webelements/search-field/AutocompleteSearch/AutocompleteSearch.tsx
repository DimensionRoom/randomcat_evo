"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./AutocompleteSearch.module.scss";

const mockSuggestions = [
  "วิทยาศาสตร์ ม.1",
  "วิทยาศาสตร์ ม.2",
  "ชีววิทยา ม.ปลาย",
  "ฟิสิกส์ ม.ปลาย",
  "เคมีเบื้องต้น",
];

export default function AutocompleteSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filtered, setFiltered] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const justSelectedRef = useRef(false); // 🔑 ใช้บอกว่าเพิ่งเลือกไป

  const handleSelect = (item: string) => {
    justSelectedRef.current = true; // ✅ บอกว่าเราเพิ่งเลือก
    setSearchQuery(item);
    setShowDropdown(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      // ถ้าเพิ่งเลือก ให้ skip logic นี้ (ไม่ต้อง setFiltered)
      if (justSelectedRef.current) {
        justSelectedRef.current = false;
        return;
      }

      if (searchQuery.trim() === "") {
        setFiltered([]);
        setShowDropdown(false);
        return;
      }

      const results = mockSuggestions.filter((item) =>
        item.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setFiltered(results);
      setShowDropdown(results.length > 0);
    }, 200);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      setShowDropdown(false);
    }
  };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.inputGroup}>
        <input
          type="text"
          placeholder="ค้นหาหลักสูตร...(เคมี,วิทยาศาสตร์,ฟิสิกส์)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
        />
        <button className={styles.searchButton} onClick={handleSearch}>
          ค้นหา
        </button>
      </div>

      {showDropdown && (
        <ul className={styles.dropdown}>
          {filtered.map((item, idx) => (
            <li
              key={idx}
              onClick={() => handleSelect(item)}
              className={styles.dropdownItem}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}