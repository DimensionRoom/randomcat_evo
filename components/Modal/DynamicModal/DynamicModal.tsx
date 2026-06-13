import React, { ReactNode } from "react";
import styles from "./DynamicModal.module.scss";

type ModalSize = "small" | "medium" | "full";
type CloseMode = "icon" | "cancel";

interface ModalProps {
  size: ModalSize;
  className?: string;
  isOpen: boolean;
  onClose?: () => void;
  children: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  /** "icon" shows a × in the top-right; "cancel" shows a Cancel button in the footer. */
  closeMode?: CloseMode;
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
  cancelLabel = "Cancel",
  closeMode = "icon",
  backdrop = true,
  onConfirm,
}) => {
  if (!isOpen) return null;

  const onCloseHandler = () => {
    onClose && onClose();
  };

  const showFooter = !!onConfirm || closeMode === "cancel";

  return (
    <div
      className={`${styles.modalBackdrop} ${!backdrop ? styles.backdropNone : null}  ${className}`}
      onClick={onCloseHandler}
    >
      <div
        className={`${styles.modal} ${styles[size]}`}
        onClick={(e) => e.stopPropagation()}
      >
        {closeMode === "icon" && (
          <div className={styles.modalHeader}>
            <button className={styles.closeButton} onClick={onCloseHandler}>
              &times;
            </button>
          </div>
        )}
        <div className={styles.modalBody}>{children}</div>
        {showFooter && (
          <div className={styles.modalFooter}>
            {closeMode === "cancel" && (
              <button className={styles.cancelButton} onClick={onCloseHandler}>
                {cancelLabel}
              </button>
            )}
            {onConfirm && (
              <button className={styles.confirmButton} onClick={onConfirm}>
                {confirmLabel}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DynamicModal;
