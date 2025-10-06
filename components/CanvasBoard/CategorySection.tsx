import React from "react";
import { Card } from "./types/Card";
import { cardCategories } from "@/public/data/gamificationinbusiness/cards_en";
import CardItem from "./CardItem";
import styles from "./CategorySection.module.scss";

interface CategorySectionProps {
  category: keyof typeof cardCategories;
  cards: Card[];
  onDragStart: (e: React.DragEvent, card: Card) => void;
}

const CategorySection = ({
  category,
  cards,
  onDragStart,
}: CategorySectionProps): JSX.Element => {
  const categoryInfo = cardCategories[category];

  return (
    <div className={styles.sectionWrapper}>
      <div className={styles.sectionHeader}>
        <div className={styles.headerContent}>
          <span className={styles.icon}>{categoryInfo.icon}</span>
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
            backgroundGradient={cardCategories[card.category].color}
          />
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
