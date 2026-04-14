import React from "react";
import { Card } from "./types/Card";
import CardItem from "./CardItem";
import styles from "./CategorySection.module.scss";

interface CategorySectionProps {
  keyName:string;
  category: any;
  cards: Card[];
  onDragStart: (e: React.DragEvent, card: Card) => void;
}

const CategorySection = ({
  keyName,
  category,
  cards,
  onDragStart,
}: CategorySectionProps): JSX.Element => {
  const categoryKey = keyName;
  const categoryInfo = category[categoryKey];

  return (
    <div className={styles.sectionWrapper}>
      <div className={styles.sectionHeader}>
        <div className={styles.headerContent}>
          <span className={styles.icon}>{category.icon}</span>
          <div className={styles.headerText}>
            <h3 className={styles.title}>{categoryInfo.name}</h3>
            <p className={styles.subtitle}>{cards.length} cards</p>
          </div>
        </div>
      </div>

      <div className={styles.cardList}>
        {cards.map((card) => (
          <CardItem
            key={card.id}
            card={card}
            onDragStart={onDragStart}
            className="w-full h-24 flex-shrink-0"
            backgroundGradient={categoryInfo.color}
          />
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
