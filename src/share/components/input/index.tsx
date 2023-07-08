import styles from "./styles.module.scss";
import { HTMLInputTypeAttribute } from "react";

interface InputProps {
  type?: HTMLInputTypeAttribute;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  label?: string;
  size?: "sm" | "md" | "lg";
}
export default function Input({
  type,
  value,
  placeholder,
  onChange,
  label,
  size,
  ...rest
}: InputProps) {
  return (
    <div>
      <h1 className={styles.text}>{label}</h1>
      <input
        {...rest}
        className={`${styles.input} ${size ? styles[size] : ""}`}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
