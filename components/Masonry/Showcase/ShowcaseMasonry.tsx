"use client";
import React, { useState, useMemo } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import styles from "./ShowcaseMasonry.module.scss";

type DocumentItem = {
  id: string;
  topic: string;
  picture: string;
};

interface ShowcaseMasonryProps {
  items: DocumentItem[];
  shuffle?: boolean; 
}

const ShowcaseMasonry: React.FC<ShowcaseMasonryProps> = ({
  items,
  shuffle = false,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const displayedItems = useMemo(() => {
    return shuffle ? [...items].sort(() => Math.random() - 0.5) : items;
  }, [items, shuffle]);

  return (
    <>
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 350: 1, 768: 2, 1024: 3, 1280: 4 }}
      >
        <Masonry className={styles.masonry} gutter="0px">
          {displayedItems.map((item, index) => (
            <img
              key={index}
              src={item.picture}
              alt={item.topic}
              onClick={() => setSelectedImage(item.picture)}
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                cursor: "pointer",
                transition: "transform 0.2s ease",
              }}
            />
          ))}
        </Masonry>
      </ResponsiveMasonry>

      {selectedImage && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 1000,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Full View"
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              height: "80%",
              borderRadius: "8px",
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.4)",
            }}
          />
        </div>
      )}
    </>
  );
};

export default ShowcaseMasonry;