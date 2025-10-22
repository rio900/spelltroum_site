'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { poolTypes } from '@/data/poolTypes';
import CustomButton from '@/components/custom/CustomButton';
import RewardBundle from '@/components/custom/RewardBundle';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import DepositButton from '@/components/custom/DepositButton';
import toast from "react-hot-toast";

export default function PoolDetailsPage() {
    const params = useParams() as { id?: string };
    const idx = Number(params?.id);
    const pool = Number.isFinite(idx) ? poolTypes[idx] : undefined;


    function showDepositSuccessToast(
        signature: string,
        opts?: { cluster?: "devnet" | "mainnet-beta" | "testnet" }
    ) {
        const cluster = opts?.cluster ?? (process.env.NEXT_PUBLIC_SOLANA_CLUSTER as any) ?? "devnet";
        const href = `https://explorer.solana.com/tx/${signature}?cluster=${cluster}`;

        toast.success(
            <div className="flex items-start gap-3">
                <div className="min-w-0"> {/* чтобы truncate работал */}
                    <div className="font-semibold">Deposit Success</div>

                    {/* сигнатура в моноширинном боксе, обрезаем по ширине тоста */}
                    <div className="mt-1 flex items-center gap-2">
                        <code className="px-2 py-0.5 rounded bg-white/10 text-white/90 text-sm font-mono
                           max-w-[240px] overflow-hidden text-ellipsis whitespace-nowrap">
                            {signature}
                        </code>

                        {/* copy */}
                        <button
                            onClick={() => navigator.clipboard.writeText(signature)}
                            className="text-xs px-2 py-1 rounded bg-white/10 hover:bg-white/20 transition
                       whitespace-nowrap"
                            title="Copy signature"
                        >
                            Copy
                        </button>
                    </div>

                    {/* ссылка на Explorer */}
                    <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 inline-block text-xs underline underline-offset-2 opacity-90 hover:opacity-100"
                    >
                        View on Solana Explorer
                    </a>
                </div>
            </div>,
            { id: "tx-success" }
        );
    }

    function showErrorToast(error: unknown, fallback = "Transaction failed") {
        const message =
            typeof error === "string" ? error : (error as any)?.message || fallback;

        toast.error(
            <div className="flex items-center gap-2">
                <span className="min-w-0 truncate">{message}</span>
                alert(`❌ Error: ${message}`)
            </div>,
            { id: "tx-error" }
        );
    }


    if (!pool) {
        return (
            <section className="min-h-screen flex items-center justify-center text-white">
                <p className="opacity-80">Pool not found</p>
            </section>
        );
    }

    return (
        <section
            className="relative w-full min-h-screen flex flex-col items-center justify-start text-white bg-cover bg-center p-6"
            style={{ backgroundImage: "url('/Map0.png')" }}
        >
            <motion.div
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="mt-10 flex items-center gap-5 bg-black/40 backdrop-blur-sm px-6 py-4 rounded-2xl max-w-xl w-full"
            >
                <Image
                    src={pool.icon}
                    alt={`${pool.type_name} Logo`}
                    width={56}
                    height={56}
                    className="w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0"
                />
                <p className="text-left leading-relaxed">
                    <strong className="font-lilita text-[#FFD43A] ">{pool.type_name} Prize Pool!</strong><br />
                    You’ve got 2 tries to win up to 5 matches.
                    Each victory grows your reward bundle.<br />
                </p>
            </motion.div>

            <div className="mt-16 flex flex-col items-center justify-center">
                <div className="mt-4 mb-4">
                    <WalletMultiButton />
                </div>

                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                >
                    <DepositButton
                        rawAmount={10000}
                        onSuccess={showDepositSuccessToast}
                        onError={showErrorToast}
                    />
                </motion.div>
            </div>

            <h2 className="font-lilita text-2xl sm:text-3xl text-[#FFD43A] drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] mb-4 mt-16">
                Reward Bundles:
            </h2>

            <div className={`flex flex-col mt-4 sm:flex-row items-center justify-center gap-6 sm:gap-8`}>
                {/* <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.2 }}>
                    <RewardBundle
                        key={1}
                        href="/pool-detail/0"
                        src="/Box0.png"
                        alt="Solana Logo"
                        label="Solana Pool"
                        victoryCount="0 Wins"
                    />
                </motion.div> */}

                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.3 }}>
                    <RewardBundle
                        key={2}
                        href="/pool-detail/1"
                        src="/Box0.png"

                        alt="Bonk Logo"
                        victoryCount="1 Wins"
                        rewardAmount="0.05 SOL"
                        label="x1 Box Level 1"
                    />
                </motion.div>

                <Image
                    src="/right-arrow.png"
                    alt="Solana Logo"
                    width={50}
                    height={50}
                    className="w-[40px] sm:w-[50px] h-auto flex-shrink-0 mb-11"
                />

                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.4 }}>
                    <RewardBundle
                        key={3}
                        href=""
                        src="/Box1.png"
                        alt="Plus Logo"
                        victoryCount="2 Wins"
                        rewardAmount="0.13 SOL"
                        label="x1 Box Level 2"
                    />
                </motion.div>
                <Image
                    src="/right-arrow.png"
                    alt="Solana Logo"
                    width={50}
                    height={50}
                    className="w-[40px] sm:w-[50px] h-auto flex-shrink-0 mb-11"
                />
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.4 }}>
                    <RewardBundle
                        key={4}
                        href=""
                        src="/Box1.png"
                        alt="Plus Logo"
                        victoryCount="3 Wins"
                        rewardAmount="0.25 SOL"
                        label="x1 Box Level 2"
                    />
                </motion.div>
                <Image
                    src="/right-arrow.png"
                    alt="Solana Logo"
                    width={50}
                    height={50}
                    className="w-[40px] sm:w-[50px] h-auto flex-shrink-0 mb-11"
                />
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.4 }}>
                    <RewardBundle
                        key={5}
                        href=""
                        src="/Box3.png"
                        alt="Plus Logo"
                        victoryCount="4 Wins"
                        rewardAmount="0.43 SOL"
                        label="x1 Box Level 3"
                    />
                </motion.div>
                <Image
                    src="/right-arrow.png"
                    alt="Solana Logo"
                    width={50}
                    height={50}
                    className="w-[40px] sm:w-[50px] h-auto flex-shrink-0 mb-11"
                />
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.4 }}>
                    <RewardBundle
                        key={6}
                        href=""
                        src="/Box4.png"
                        alt="Plus Logo"
                        victoryCount="5 Wins"
                        rewardAmount="0.64 SOL"
                        label="x1 Box Level 4"
                        variant='primary'
                    />
                </motion.div>

            </div>
        </section>
    );
}