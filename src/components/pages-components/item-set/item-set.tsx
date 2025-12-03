'use client';

import Image from "next/image";

export default function ItemSetSection() {
    return (
        <section
            className="relative w-full min-h-screen flex items-center justify-center text-white bg-cover bg-center overflow-x-hidden"
            style={{ backgroundImage: "url('/Map3.png')" }}  // зелёная карта
        >
            {/* Светлячки */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="firefly"></div>
                <div className="firefly"></div>
                <div className="firefly"></div>
                <div className="firefly"></div>
                <div className="firefly"></div>
            </div>

            {/* Контент */}
            <div className="relative z-10 w-full px-4 sm:px-6 md:px-10">
                <div className="max-w-6xl mx-auto bg-black/50 backdrop-blur-sm px-6 sm:px-10 py-10 rounded-3xl shadow-2xl">
                    <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

                        {/* Текст слева на десктопе / сверху на мобиле */}
                        <div className="w-full lg:w-1/2 text-center lg:text-left">
                            <h2 className="font-lilita text-4xl sm:text-5xl text-[#FFD43A] drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] mb-4 leading-tight">
                                Design Your Item Set
                            </h2>
                            <p className="text-lg sm:text-xl text-gray-200 leading-relaxed">
                                30 Items Unlocked From the Start! Create a personalized set of four items which will
                                remain at your disposal throughout a match. Experiment with item combinations that
                                will complement your preferred play style, hero selection, and spell upgrade strategy
                                in the best possible way!
                            </p>
                        </div>

                        {/* Картинка справа на десктопе / снизу на мобиле */}
                        <div className="w-full lg:w-1/2 flex justify-center">
                            <div className="relative w-full max-w-md sm:max-w-xl">
                                <Image
                                    src="/spelltroum-items.png"
                                    alt="Spelltroum items"
                                    width={900}
                                    height={600}
                                    className="w-full h-auto rounded-3xl shadow-xl"
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}