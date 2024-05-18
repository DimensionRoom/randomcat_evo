'use client';
import React, { useState } from 'react'
import styles from './TagFilter.module.css';


export type Props = {
    categories: string[];
    onFilterChange: (selectedCategories: string[]) => void;
    defaultSelectedCategories?: string[];
    noneSelected?: boolean;
}

const TagFilter = ({
    categories,
    onFilterChange,
    defaultSelectedCategories = [],
    noneSelected = false,
    ...props
}: Props): JSX.Element => {
    const [selectedCategories, setSelectedCategories] = useState<string[]>(defaultSelectedCategories);
    const handleToggleCategory = (category: string) => {
        let updatedSelectedCategories;
        if (selectedCategories.includes(category)) {
            // Prevent deselecting the last remaining category
            if (selectedCategories.length === 1) return;
            updatedSelectedCategories = selectedCategories.filter((cat) => cat !== category);
        } else {
            updatedSelectedCategories = [...selectedCategories, category];
        }
        setSelectedCategories(updatedSelectedCategories);
        onFilterChange(updatedSelectedCategories);
    };

    return (
        <div className={styles.ChipContainer}>
            {categories.map((category) => (
                <div
                    key={category}
                    className={`${styles.Chip} ${selectedCategories.includes(category) ? styles.ChipSelected : ''}`}
                    onClick={() => handleToggleCategory(category)}
                >
                    {category}
                </div>
            ))}
        </div>
    )
}

export default TagFilter
