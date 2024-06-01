'use client';
import React, { useState } from 'react'
import styles from './TagFilter.module.css';


export type Props = {
    className?: string;
    categories: string[];
    onFilterChange: (selectedCategories: string[]) => void;
    defaultSelectedCategories?: string[];
    noneSelected?: boolean;
}

const TagFilter = ({
    className='',
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
            if (selectedCategories.length === 2) return;
            updatedSelectedCategories = selectedCategories.filter((cat) => cat !== category);
        } else {
            updatedSelectedCategories = [...selectedCategories, category];
        }
        setSelectedCategories(updatedSelectedCategories);
        onFilterChange(updatedSelectedCategories);
    };

    return (
        <div className={`${styles.ChipContainer} ${styles[className]}`}>
            {categories.map((category) => (
                <div
                    key={category}
                    className={`${styles.Chip} ${selectedCategories.includes(category) ? '' : styles.ChipSelected}`}
                    onClick={() => handleToggleCategory(category)}
                >
                    {category}
                </div>
            ))}
        </div>
    )
}

export default TagFilter
