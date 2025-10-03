import styles from "./Toast.module.css";

export type ToastType = "success" | "error" | "info" | "warning";

export type ToastProps = {
  type?: ToastType;
  message: string;
  closable?: boolean;
  onClose?: () => void;
};

export default function Toast({
  type = "info",
  message,
  closable = true,
  onClose,
}: ToastProps) {
  return (
    <div
      className={`${styles.toast} ${styles[type]}`}
      role="status"
      aria-live="polite"
    >
      <span className={styles.bar} aria-hidden />
      <div className={styles.content}>
        <div className={styles.title}>{type}</div>
        <div className={styles.msg}>{message}</div>
      </div>

      {closable && (
        <button
          className={styles.close}
          aria-label="Close"
          onClick={onClose}
          title="Close"
          type="button"
        >
          ×
        </button>
      )}
    </div>
  );
}
