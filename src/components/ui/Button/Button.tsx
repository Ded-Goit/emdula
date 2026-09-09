import type { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";

import styles from "./Button.module.css";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
  href?: string;
  icon?: ReactNode;
};

export default function Button({
  children,
  variant = "primary",
  href,
  icon,
  className = "",
  ...props
}: ButtonProps) {
  const buttonClassName =
    `${styles.button} ${styles[variant]} ${className}`.trim();

  if (href) {
    return (
      <Link href={href} className={buttonClassName}>
        <span>{children}</span>
        {icon}
      </Link>
    );
  }

  return (
    <button className={buttonClassName} {...props}>
      <span>{children}</span>
      {icon}
    </button>
  );
}
