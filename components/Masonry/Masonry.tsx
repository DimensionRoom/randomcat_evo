import React from "react";
import styles from "./Masonry.module.scss";

interface MasonryProps {
  items: Array<{ index: number | string; content: string }>;
  randomColor?: boolean;
  selectedColor?: string;
  onClickItem?: (index: number | string) => void;
}

const Masonry: React.FC<MasonryProps> = ({
  items,
  randomColor = false,
  selectedColor,
  onClickItem,
}) => {
  const getColor = () => {
    if (randomColor) {
      return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    }
    return selectedColor || "#ffffff";
  };

  return (
    <div className={styles.masonry}>
      {items.map((item) => (
        <div
          key={item.index}
          className={`${styles.item} ${
            selectedColor ? styles.selectedColor : styles.randomColor
          }`}
          style={{ backgroundColor: getColor() }}
          onClick={() => onClickItem && onClickItem(item.index)}
        >
          {item.content}
        </div>
      ))}
    </div>
  );
};

export default Masonry;
