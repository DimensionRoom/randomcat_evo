import React, { ReactNode } from "react";
import styles from "./DynamicModal.module.scss";

type ModalSize = "small" | "medium" | "full";

interface ModalProps {
  size: ModalSize;
  className?: string;
  isOpen: boolean;
  onClose?: () => void;
  children: ReactNode;
  confirmLabel?: string;
  backdrop?: boolean;
  onConfirm?: () => void;
}

const DynamicModal: React.FC<ModalProps> = ({
  size,
  className,
  isOpen,
  onClose,
  children,
  confirmLabel = "Confirm",
  backdrop = true,
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
    <div className={`${styles.modalBackdrop} ${!backdrop?styles.backdropNone:null}  ${className}`} onClick={onCloseHandler}>
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
