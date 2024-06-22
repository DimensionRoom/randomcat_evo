import React from 'react';
import styles from './ToastMessage.module.css';

interface ToastMessageProps {
    message: string;
    type: 'info' | 'success' | 'error' | 'warning';
  }
  
  const ToastMessage: React.FC<ToastMessageProps> = ({ message, type }) => {
    return (
      <div className={`${styles.toast} ${styles[type]}`}>
        {message}
      </div>
    );
  };
  
  export default ToastMessage;