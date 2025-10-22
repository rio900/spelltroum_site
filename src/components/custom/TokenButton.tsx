'use client';

import Image from "next/image";
import CustomButton from "../custom/CustomButton";

type TokenButtonProps = {
    href: string;
    src: string;
    alt: string;
    label?: string;                 // ← подпись под картинкой (опционально)
    variant?: "primary" | "gray" | "secondary";
    imgWidth?: number;
    imgHeight?: number;
    className?: string;
};

export default function TokenButton({
    href,
    src,
    alt,
    label,
    variant = "primary",
    imgWidth = 100,
    imgHeight = 100,
    className = "",
}: TokenButtonProps) {
    return (
        <CustomButton href={href} variant={variant} className={`px-6 py-4 ${className}`}>
            <div className="flex flex-col items-center">
                <Image
                    src={src}
                    alt={alt}
                    width={imgWidth}
                    height={imgHeight}
                    className="w-[100px] sm:w-[100px] h-auto flex-shrink-0"
                />
                {label ? (
                    <span className="mt-2 text-sm sm:text-base text-[var(--color-btn-primary-text)] font-semibold">
                        {label}
                    </span>
                ) : null}
            </div>
        </CustomButton>
    );
}