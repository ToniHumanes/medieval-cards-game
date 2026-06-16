import type { ButtonHTMLAttributes, ReactNode } from "react";
import "./Button.scss";

type ButtonColor = "yellow" | "red";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: ButtonColor;
  children: ReactNode;
}

export function Button({
  color = "yellow",
  children,
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`button button--${color} ${className}`.trim()}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
