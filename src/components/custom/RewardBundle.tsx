'use client';

import Image from "next/image";
import CustomButton from "../custom/CustomButton";

type TokenButtonProps = {
    href: string;
    src: string;
    alt: string;
    label?: string;
    rewardAmount?: string;
    victoryCount?: string;
    variant?: "primary" | "gray" | "secondary";
    imgWidth?: number;
    imgHeight?: number;
    className?: string;
};

export default function RewardBundle({
    href,
    src,
    alt,
    label,
    victoryCount,
    rewardAmount,
    variant = "secondary",
    imgWidth = 100,
    imgHeight = 100,
    className = "",
}: TokenButtonProps) {
    return (
        <div className="flex flex-col items-center">
            {victoryCount && (
                <span className="mb-3 text-2xl text-white font-semibold text-stroke-1 text-stroke-black">
                    {victoryCount}
                </span>
            )}

            <CustomButton href={href} variant={variant} className={`px-3 py-4 ${className}`}>
                <div className="flex flex-col items-center">
                    <Image
                        src={src}
                        alt={alt}
                        width={imgWidth}
                        height={imgHeight}
                        className="w-[100px] sm:w-[100px] h-auto flex-shrink-0"
                    />
                    {label && (
                        <span className="mt-2 text-sm sm:text-base text-[var(--color-btn-primary-text)] font-semibold">
                            {label}
                        </span>
                    )}
                    {rewardAmount && (
                        <div className="flex items-center  gap-5 px-4 py-4 max-w-lg text-sm sm:text-base leading-relaxed">
                            <Image
                                src="/sol-logo.png"
                                alt="Solana Logo"
                                width={50}
                                height={50}
                                className="w-[40px] sm:w-[50px] h-auto flex-shrink-0"
                            />
                            <p className="text-left text-lg">{rewardAmount}</p>
                        </div>
                    )}
                </div>
            </CustomButton>


        </div>
    );
}