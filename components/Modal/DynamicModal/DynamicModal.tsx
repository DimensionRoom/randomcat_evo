import React, { ReactNode } from "react";
import styles from "./DynamicModal.module.scss";

type ModalSize = "small" | "medium" | "full";

interface ModalProps {
  size: ModalSize;
  isOpen: boolean;
  onClose?: () => void;
  children: ReactNode;
  confirmLabel?: string;
  onConfirm?: () => void;
}

const DynamicModal: React.FC<ModalProps> = ({
  size,
  isOpen,
  onClose,
  children,
  confirmLabel = "Confirm",
  onConfirm,
}) => {
  if (!isOpen) return null;

  const onConfirmHandler = () => {
    if (onConfirm) {
      onConfirm();
    }
    onClose && onClose();
  };

  const onCloseHandler = () => {
    onClose && onClose();
  };

  return (
    <div className={styles.modalBackdrop} onClick={onCloseHandler}>
      <div
        className={`${styles.modal} ${styles[size]}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modalHeader}>
          <button className={styles.closeButton} onClick={onConfirmHandler}>
            &times;
          </button>
        </div>
        <div className={styles.modalBody}>{children}</div>
        {onConfirm && (
          <div className={styles.modalFooter}>
            <button className={styles.confirmButton} onClick={onConfirm}>
              {confirmLabel}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DynamicModal;
