'use client';

import Image from "next/image";
import CustomButton from "../custom/CustomButton";

type TokenButtonProps = {
    href: string;
    src: string;
    alt: string;
    label?: string;
    value?: string;
    locked?: boolean; // 👈 новый флаг
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
    value,
    locked = false,
    variant = "primary",
    imgWidth = 100,
    imgHeight = 100,
    className = "",
}: TokenButtonProps) {
    return (
        <CustomButton href={href} variant={variant} className={`px-6 py-4 ${className}`}>
            <div className="flex flex-col items-center relative">
                {/* Основная картинка */}
                <Image
                    src={src}
                    alt={alt}
                    width={imgWidth}
                    height={imgHeight}
                    className="w-[100px] sm:w-[100px] h-auto flex-shrink-0"
                />

                {/* Оверлей замка */}
                {locked && (
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pb-15 rounded-lg">
                        <Image
                            src="/lock-icon.png"
                            alt="Locked"
                            width={40}
                            height={40}
                            className="w-[40px] sm:w-[40px] h-auto opacity-90"
                        />
                    </div>
                )}

                {/* Текст под картинкой */}
                {label && (
                    <>
                        <span className="mt-2 text-sm sm:text-base text-[var(--color-btn-primary-text)] font-semibold">
                            {label}
                        </span>
                        {value && (
                            <span className="mt-1 text-sm sm:text-base text-[var(--color-btn-primary-text)] font-semibold">
                                {value}
                            </span>
                        )}
                    </>
                )}
            </div>
        </CustomButton>
    );
}