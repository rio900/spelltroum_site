'use client';

import TokenButton from "@/components/custom/TokenButton";
import CustomButton from "../../custom/CustomButton";
import Image from "next/image";
import { motion } from 'framer-motion'

export default function SelectPoolPage() {
    return (
        <section
            className="relative w-full min-h-screen flex flex-col items-center justify-start text-white bg-cover bg-center"
            style={{ backgroundImage: "url('/Map3.png')" }}
        >

            <div className="flex flex-col items-center text-center mx-5 mb-20 mt-20 space-y-6 bg-black/40 backdrop-blur-sm px-6 py-4 rounded-2xl">
                <div className="max-w-2xl">
                    <h2 className="font-lilita text-4xl sm:text-5xl text-[#FFD43A] drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] mb-4">
                        Choose Your Battle Pool
                    </h2>
                    <p className="text-lg sm:text-xl text-gray-200 leading-relaxed">
                        Pick the pool. Each one has its own entry fee and reward ladder.
                    </p>
                </div>
            </div>

            <div className={`flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8`}>
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.2 }}>
                    <TokenButton
                        key={1}
                        href="/pool-detail/0"
                        src="/sol-logo.png"
                        alt="Solana Logo"
                        variant="primary"
                        label="Solana Pool"
                        value="0.01 SOL"
                    />
                </motion.div>

                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.3 }}>
                    <TokenButton
                        key={2}
                        href="/pool-detail/0"
                        src="/sol-logo-gray.png"
                        alt="Solana Logo"
                        variant="primary"
                        label="Solana Pool"
                        locked={true}
                        value="0.15 SOL"
                    />
                </motion.div>

                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.3 }}>
                    <TokenButton
                        key={3}
                        href="/pool-detail/1"
                        src="/bonk-logo.png"
                        alt="Bonk Logo"
                        variant="primary"
                        label="Bonk Pool"
                        value="10k BONK"
                    />
                </motion.div>

                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.3 }}>
                    <TokenButton
                        key={3}
                        href="/pool-detail/1"
                        src="/Dogwifhat.png"
                        alt="Dogwifhat Logo"
                        variant="primary"
                        label="Dogwifhat Pool"
                        value="2 WIF"
                    />
                </motion.div>

                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.3 }}>
                    <TokenButton
                        key={3}
                        href="/pool-detail/1"
                        src="/chonky.png"
                        alt="Chonky Logo"
                        variant="primary"
                        label="Chonky Pool"
                        value="490k CHONKY"
                    />
                </motion.div>



                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.4 }}>

                    <TokenButton
                        key={3}
                        href=""
                        src="/plus.png"
                        alt="Plus Logo"
                        variant="primary"
                        label="Custom Pool"
                        value="Add"
                    />
                </motion.div>


            </div>
        </section>
    );
}