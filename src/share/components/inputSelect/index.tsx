import styles from "./styles.module.scss";

interface InputSelectProps {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  label?: string;
  options: string[];
  size?: "sm" | "md" | "lg";
}
export default function InputSelect({
  value,
  placeholder,
  onChange,
  label,
  options,
  size,
  ...rest
}: InputSelectProps) {
  return (
    <div>
      <h1 className={styles.text}>{label}</h1>
      <select
        {...rest}
        className={`${styles.input} ${size ? styles[size] : ""}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      >
        {options.map((option, index) => (
          <option value={option} key={index}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
