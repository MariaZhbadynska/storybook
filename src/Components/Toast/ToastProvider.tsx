import React, { createContext, useContext, useState } from "react";
import Toast, { type ToastType } from "./Toast";
import styles from "./Toast.module.css";

type ToastItem = {
  id: number;
  type: ToastType;
  message: string;
  duration: number;
  closable: boolean;
  leaving?: boolean;
};

type ToastContextValue = {
  showToast: (
    message: string,
    type?: ToastType,
    options?: { duration?: number; closable?: boolean }
  ) => void;
};

const ToastCtx = createContext<ToastContextValue | null>(null);
export const useToast = () => {
  const ctx = useContext(ToastCtx);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const remove = (id: number) => setToasts((s) => s.filter((t) => t.id !== id));

  const startClose = (id: number) => {
    setToasts((s) => s.map((t) => (t.id === id ? { ...t, leaving: true } : t)));
    window.setTimeout(() => remove(id), 180);
  };

  const showToast: ToastContextValue["showToast"] = (
    message,
    type = "info",
    options
  ) => {
    const id = Date.now() + Math.random();
    const duration = options?.duration ?? 3000;
    const closable = options?.closable ?? true;

    setToasts((s) => [...s, { id, type, message, duration, closable }]);

    if (duration > 0) {
      window.setTimeout(() => startClose(id), duration);
    }
  };

  return (
    <ToastCtx.Provider value={{ showToast }}>
      {children}
      <div className={styles.container}>
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`${styles.itemWrap} ${t.leaving ? styles.leaving : ""}`}
          >
            <Toast
              type={t.type}
              message={t.message}
              closable={t.closable}
              onClose={() => startClose(t.id)}
            />
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}
