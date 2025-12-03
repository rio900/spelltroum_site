'use client';

import Image from "next/image";

export default function TeamUpSection() {
    return (
        <section
            className="relative w-full min-h-screen flex items-center justify-center text-white bg-cover bg-center overflow-x-hidden" style={{ backgroundImage: "url('/Map0.png')" }}
        >
            {/* Светлячки */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="firefly"></div>
                <div className="firefly"></div>
                <div className="firefly"></div>
                <div className="firefly"></div>
                <div className="firefly"></div>
            </div>

            {/* Контентная обёртка */}
            <div className="w-full px-4 sm:px-6 md:px-10 py-20">
                <div className="max-w-6xl mx-auto bg-black/50 backdrop-blur-sm px-6 sm:px-10 py-10 rounded-3xl shadow-2xl">

                    {/* FLEX-контейнер */}
                    <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

                        {/* Картинка */}
                        <div className="w-full lg:w-1/2 flex justify-center">
                            <div className="relative w-full max-w-md">
                                <Image
                                    src="/teamup-phone.jpeg"
                                    alt="Spelltroum gameplay"
                                    width={900}
                                    height={600}
                                    className="w-full h-auto rounded-3xl shadow-xl"
                                />
                            </div>
                        </div>

                        {/* Текст */}
                        <div className="w-full lg:w-1/2 text-center lg:text-left">
                            <h2 className="font-lilita text-4xl sm:text-5xl text-[#FFD43A] drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] mb-4 leading-tight">
                                Team Up Wisely
                            </h2>
                            <p className="text-lg sm:text-xl text-gray-200 leading-relaxed">
                                Explore various hero combinations that buff and complement each other
                                in dozens of ways! Choose your hero from a diverse range of mages,
                                archers, demons, melee warriors, shamans and more!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}