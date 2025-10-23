'use client';

import CustomButton from "../../custom/CustomButton";
import Image from "next/image";
import { motion } from 'framer-motion'
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import DepositButton from "@/components/custom/DepositButton";

export default function MainBlockSection() {
    return (
        <section
            className="relative w-full min-h-screen flex flex-col items-center justify-start text-white bg-cover bg-center"
            style={{ backgroundImage: "url('/Map2.png')" }}
        >


            {/* Светлячки */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="firefly"></div>
                <div className="firefly"></div>
                <div className="firefly"></div>
                <div className="firefly"></div>
                <div className="firefly"></div>
            </div>

            {/* Логотип */}
            <div className="flex flex-col items-center text-center mb-20 mt-20 mx-5 space-y-6">
                {/* Логотип */}
                <Image
                    src="/spelltroum-main.png"
                    alt="Spelltroum Logo"
                    width={1000}
                    height={600}
                    className="w-auto h-auto max-w-[80%] sm:max-w-[1000px]"
                />

                {/* Тексты под логотипом */}
                <div className="max-w-2xl">
                    <h2 className="font-lilita text-4xl sm:text-5xl text-[#FFD43A] drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] mb-4">
                        Epic Multiplayer Battles
                    </h2>
                    <p className="text-lg sm:text-xl text-gray-200 leading-relaxed">
                        Quick matches on a gridded arena where you can team up with your friends,
                        pull off the perfect combo, and get really competitive.
                    </p>
                </div>
            </div>

            <div className="flex flex-col items-center space-y-20 mx-5">

                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.2 }}>

                    <CustomButton
                        href="/dashboard"
                        variant="primary"
                        className="text-lg px-10 py-4"
                    >
                        <p className="font-lilita text-3xl btn-primary-text">START</p>
                    </CustomButton>
                </motion.div>

                {/* Блок Prize Pool */}
                <div
                    id="pool"
                    className="flex items-center gap-5   bg-black/40 backdrop-blur-sm px-6 py-4 rounded-2xl max-w-lg text-sm sm:text-base leading-relaxed"
                >
                    <Image
                        src="/sol-logo.png"
                        alt="Solana Logo"
                        width={50}
                        height={50}
                        className="w-[40px] sm:w-[50px] h-auto flex-shrink-0"
                    />
                    <p className="text-left">
                        <strong>Join the Prize Pool!</strong><br />
                        The more matches you win, the bigger your share of the pool!<br />
                        Skill-based rewards only.
                    </p>
                </div>
            </div>
        </section>
    );
}