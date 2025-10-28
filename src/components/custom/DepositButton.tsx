"use client";

import Image from 'next/image';
import { useState, useCallback } from "react";
import { useAnchorProgram, playerBalancePda } from "@/lib/anchor";
import { SystemProgram, Transaction } from "@solana/web3.js";
import { BN } from "@coral-xyz/anchor";
import { useConnection } from "@solana/wallet-adapter-react";
import CustomButton from "./CustomButton";

export default function DepositButton({
    rawAmount,
    onSuccess,
    onError,
}: {
    rawAmount: number;
    onSuccess?: (sig: string) => void;
    onError?: (e: unknown) => void;
}) {
    const { program, provider, wallet } = useAnchorProgram();
    const { connection } = useConnection();
    const [loading, setLoading] = useState(false);

    const onClick = useCallback(async () => {
        if (loading) return;
        if (!wallet?.publicKey) return onError?.(new Error("Connect wallet first"));
        if (!program || !provider) return onError?.(new Error("Program not ready"));

        try {
            setLoading(true);

            const amount = new BN(rawAmount);
            const pda = playerBalancePda(wallet.publicKey);

            // 1) Собираем транзакцию без отправки
            const tx = await program.methods
                .deposit(amount)
                .accounts({
                    owner: wallet.publicKey,
                    playerBalance: pda,
                    systemProgram: SystemProgram.programId,
                })
                .transaction();

            // 2) Ставим fee payer и свежий blockhash
            tx.feePayer = wallet.publicKey;
            const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash("confirmed");
            tx.recentBlockhash = blockhash;

            // 3) Подписываем и отправляем БЕЗ префлайта
            //    provider в anchor 0.32 = AnchorProvider с sendAndConfirm
            const sig = await provider.sendAndConfirm(tx, [], { skipPreflight: true });

            // 4) Доп. подтверждение тем же blockhash (защита от рассинхрона)
            const res = await connection.confirmTransaction(
                { signature: sig, blockhash, lastValidBlockHeight },
                "confirmed"
            );
            if (res.value.err) throw new Error(JSON.stringify(res.value.err));

            onSuccess?.(sig);
        } catch (e: any) {
            // Если это SendTransactionError, попробуем вытащить логи
            if (typeof e?.getLogs === "function") {
                try {
                    const logs = await e.getLogs();
                    // eslint-disable-next-line no-console
                    console.error("tx logs:", logs);
                } catch { }
            }

            // Частный кейс: preflight сообщил "already been processed"
            const msg = String(e?.message || e);
            if (msg.includes("already been processed")) {
                // Обычно это значит — транза уже прошла. Можно вернуть успех
                // или попробовать найти статус сигнатуры, если она есть у кошелька.
                // Тут аккуратно сигналим как успех без сигнатуры
                onSuccess?.("already-processed");
                return;
            }

            onError?.(e);
        } finally {
            setLoading(false);
        }
    }, [loading, wallet?.publicKey, program, provider, rawAmount, connection, onSuccess, onError]);

    return (
        <CustomButton
            onClick={onClick}
            disabled={!wallet?.publicKey || !program || loading}
            className="px-4 py-2 rounded disabled:opacity-50"
            variant="secondary"
        >

            {loading ? (
                <p className="font-lilita text-3xl btn-secondary-text">
                    Depositing... <span className="text-white text-stroke-1 text-stroke-black">0.01 SOL</span>
                </p>
            ) : (
                <p className="font-lilita text-3xl btn-secondary-text">
                    Entry fee: <span className="text-white text-stroke-1 text-stroke-black">0.01 SOL</span>
                </p>
            )}
        </CustomButton>
    );
}