'use client';

import CustomButton from "../../custom/CustomButton";
import Image from "next/image";
import { motion } from 'framer-motion';
import YoutubePlayer from "@/components/custom/YoutubePlayer";

export default function MainPageSection() {
    return (
        <section
            className="relative w-full min-h-screen flex items-center justify-center text-white bg-cover bg-center overflow-x-hidden"
            style={{ backgroundImage: "url('/Map2.png')" }}
        >
            {/* Светлячки */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none ">
                <div className="firefly"></div>
                <div className="firefly"></div>
                <div className="firefly"></div>
                <div className="firefly"></div>
                <div className="firefly"></div>
            </div>

            {/* Контент */}
            <div className=" mt-20 relative z-10 w-full px-4 sm:px-6 md:px-10">
                <div className="max-w-4xl mx-auto text-center flex flex-col items-center space-y-16">

                    {/* Логотип и заголовок */}
                    <div className="space-y-6">
                        <Image
                            src="/spelltroum-main.png"
                            alt="Spelltroum Logo"
                            width={1000}
                            height={600}
                            className="w-auto h-auto max-w-[80%] sm:max-w-[1000px] mx-auto"
                        />

                        <h2 className="font-lilita text-4xl sm:text-5xl text-[#FFD43A] drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
                            Epic Multiplayer Battles
                        </h2>

                        <p className="text-lg sm:text-xl text-gray-200 leading-relaxed max-w-2xl mx-auto">
                            Quick matches on a gridded arena where you can team up with your friends,
                            pull off the perfect combo, and get really competitive.
                        </p>
                    </div>

                    {/* Кнопка START */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.2 }}
                    >
                        <CustomButton
                            href="https://orvjl.app.link/reddit"
                            variant="primary"
                            className="text-lg px-10 py-4"
                        >
                            <p className="font-lilita text-3xl btn-primary-text">START</p>
                        </CustomButton>
                    </motion.div>

                    {/* Youtube блок */}
                    <div className="mb-20 w-full bg-black/40 backdrop-blur-sm px-4 py-4 rounded-2xl shadow-xl">
                        <YoutubePlayer />
                    </div>
                </div>
            </div>
        </section>
    );
}