import React, { useState } from 'react';
import styles from './CustomSelect.module.scss';

interface CustomSelectProps {
  label: string;
  labelPosition?: 'left' | 'right' | 'top' | 'bottom';
  options: { value: string; label: string; }[];
  defaultValue?: number | string;
  required?: boolean;
  onChange?: (value: string) => void;
}

const CustomSelect = ({ 
  label, 
  labelPosition = 'left',
  options,
  defaultValue = '',
  required = false,
  onChange 
}: CustomSelectProps) => {
  const [isActive, setIsActive] = useState(false);

  const containerClasses = {
    left: styles.labelLeft,
    right: styles.labelRight,
    top: styles.labelTop,
    bottom: styles.labelBottom
  };

  return (
    <div className={`${styles.container} ${containerClasses[labelPosition]}`}>
      <label className={`${styles.label} ${required ? styles.required : ''}`}>
        {label}
      </label>
      <div className={styles.selectWrapper}>
        <select
          className={`${styles.select} ${isActive ? styles.active : ''}`}
          onFocus={() => setIsActive(true)}
          onBlur={() => setIsActive(false)}
          onChange={(e) => onChange?.(e.target.value)}
          required={required}
          defaultValue={defaultValue}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span className={styles.arrow} />
      </div>
    </div>
  );
};

export default CustomSelect;