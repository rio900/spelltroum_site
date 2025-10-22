'use client';

import Link from "next/link";
import { ReactNode } from "react";

interface CustomButtonProps {
    href?: string;
    onClick?: () => void;
    children: ReactNode;
    variant?: "primary" | "gray" | "secondary";
    className?: string;
    disabled?: boolean;
}

export default function CustomButton({
    href,
    onClick,
    children,
    variant = "primary",
    className = "",
    disabled = false,
}: CustomButtonProps) {
    const baseStyles =
        "inline-flex items-center justify-center px-6 py-3 rounded-2xl font-semibold shadow-md transition-all duration-200 active:scale-95 select-none";

    const variants = {
        primary: `bg-gradient-to-b from-[var(--color-btn-primary-from)] to-[var(--color-btn-primary-to)]
      hover:from-[var(--color-btn-primary-hover-from)] hover:to-[var(--color-btn-primary-hover-to)]
      text-[var(--color-btn-primary-text)] shadow-[0_4px_10px_rgba(235,165,0,0.5)]`,
        gray: `bg-gradient-to-b from-[var(--color-btn-gray-from)] to-[var(--color-btn-gray-to)]
      hover:from-[var(--color-btn-gray-hover-from)] hover:to-[var(--color-btn-gray-hover-to)]
      text-[var(--color-btn-gray-text)] shadow-[0_4px_10px_rgba(0,0,0,0.15)]`,
        secondary: `bg-gradient-to-b from-[var(--color-btn-secondary-from)] to-[var(--color-btn-secondary-to)]
      hover:from-[var(--color-btn-secondary-hover-from)] hover:to-[var(--color-btn-secondary-hover-to)]
      text-[var(--color-btn-secondary-text)] shadow-[0_4px_10px_rgba(0,166,63,0.4)]`,
    };

    const disabledStyles = disabled ? "opacity-50 pointer-events-none cursor-not-allowed" : "";
    const combinedClasses = `${baseStyles} ${variants[variant]} ${disabledStyles} ${className}`;

    if (href) {
        return <Link href={href} className={combinedClasses}>{children}</Link>;
    }

    return (
        <button onClick={onClick} className={combinedClasses} disabled={disabled} aria-disabled={disabled}>
            {children}
        </button>
    );
}