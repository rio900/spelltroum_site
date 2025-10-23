'use client';

import Image from "next/image";

export default function ArrowDivider() {
    return (
        <Image
            src="/right-arrow.png"
            alt="Arrow"
            width={50}
            height={50}
            className="
        w-[50px] sm:w-[50px] h-auto flex-shrink-0 mb-0 sm:mb-11
        rotate-90 sm:rotate-0
        transition-transform duration-300"
        />
    );
}