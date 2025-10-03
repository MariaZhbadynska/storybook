import React, { useId, useState } from "react";
import styles from "./Input.module.css";

type InputProps = {
  label?: string;
  type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
  placeholder?: string;
  defaultValue?: string;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  helperText?: string;
  errorText?: string;
  clearable?: boolean;
  onChange?: (value: string) => void;
  inputProps?: Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "type" | "defaultValue" | "disabled" | "required" | "name" | "placeholder" | "onChange"
  >;
};

export default function Input({
  label,
  type = "text",
  placeholder,
  defaultValue = "",
  disabled,
  required,
  name,
  helperText,
  errorText,
  clearable,
  onChange,
  inputProps,
}: InputProps) {
  const id = useId();
  const [val, setVal] = useState(defaultValue);
  const [showPwd, setShowPwd] = useState(false);

  const isPassword = type === "password";
  const actualType = isPassword ? (showPwd ? "text" : "password") : type;
  const hasError = Boolean(errorText);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value;
    setVal(next);
    onChange?.(next);
  };

  const handleClear = () => {
    setVal("");
    onChange?.("");
  };

  return (
    <div
      className={[
        styles.root,
        hasError ? styles.error : "",
        disabled ? styles.disabled : "",
      ].join(" ")}
    >
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label} {required && <span className={styles.req}>*</span>}
        </label>
      )}

      <div className={styles.fieldWrap}>
        <input
          id={id}
          className={styles.input}
          type={actualType}
          value={val}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          name={name}
          aria-invalid={hasError || undefined}
          aria-describedby={helperText || errorText ? `${id}-desc` : undefined}
          {...inputProps}
        />

        {isPassword && (
          <button
            type="button"
            className={styles.ghostBtn}
            onClick={() => setShowPwd((s) => !s)}
            aria-label={showPwd ? "Скрыть пароль" : "Показать пароль"}
            title={showPwd ? "Hide password" : "Show password"}
          >
            {showPwd ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        )}

        {clearable && val && (
          <button
            type="button"
            className={styles.ghostBtn}
            onClick={handleClear}
            aria-label="Очистить поле"
            title="Clear"
          >
            <CloseIcon />
          </button>
        )}
      </div>

      {(helperText || errorText) && (
        <div id={`${id}-desc`} className={styles.helper} aria-live="polite">
          {errorText ? (
            <span className={styles.helperError}>{errorText}</span>
          ) : (
            helperText
          )}
        </div>
      )}
    </div>
  );
}

function EyeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" stroke="currentColor" strokeWidth="1.6"/>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6"/>
    </svg>
  );
}
function EyeOffIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M3 3l18 18" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M2 12s3.5-7 10-7c2.3 0 4.2.7 5.8 1.7" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M22 12s-3.5 7-10 7c-2.3 0-4.2-.7-5.8-1.7" stroke="currentColor" strokeWidth="1.6"/>
    </svg>
  );
}
function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}
