'use client';
import React, { useState } from 'react'
import styles from './TagFilter.module.css';


export type Props = {
    categories: string[];
    onFilterChange: (selectedCategories: string[]) => void;
    defaultSelectedCategories?: string[];
}

const TagFilter = ({
    categories,
    onFilterChange,
    defaultSelectedCategories = [],
    ...props
}: Props): JSX.Element => {
    const [selectedCategories, setSelectedCategories] = useState<string[]>(defaultSelectedCategories);
    const handleToggleCategory = (category: string) => {
        const updatedSelectedCategories = selectedCategories.includes(category)
            ? selectedCategories.filter((cat) => cat !== category)
            : [...selectedCategories, category];
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
