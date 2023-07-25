import { ButtonHTMLAttributes } from "react";
import "./styles.button.scss";

interface ButtonProps {
  text: string;
  onClick: () => void;
  styleOption?: "primary" | "secondary" | "alternative";
  size?: "sm" | "md" | "lg" | "xl";
  disabled?: boolean;
}

export default function Button({
  text,
  onClick,
  styleOption = "primary",
  size = "md",
  disabled,
  ...rest
}: ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <div>
      <button
        className={`button ${styleOption} ${size}`}
        onClick={() => onClick()}
        {...rest}
        disabled={disabled}
      >
        {text}
      </button>
    </div>
  );
}
