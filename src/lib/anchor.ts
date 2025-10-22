"use client";

import { AnchorProvider, Program, Idl } from "@coral-xyz/anchor";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useMemo } from "react";
import idlJson from "@/idl/spelltroum_tournament.json";

export function useAnchorProgram<T extends Idl = Idl>() {
    const { connection } = useConnection();
    const wallet = useWallet();

    const provider = useMemo(() => {
        if (!wallet?.publicKey) return null;
        return new AnchorProvider(connection, wallet as any, {
            preflightCommitment: "processed",
            commitment: "confirmed",
        });
    }, [connection, wallet]);

    const program = useMemo(() => {
        if (!provider) return null;
        return new Program<T>(idlJson as T, provider);
    }, [provider]);

    return { program, provider, wallet };
}

export function playerBalancePda(owner: PublicKey) {
    const programId = new PublicKey(
        (idlJson as any).address as string
    );
    return PublicKey.findProgramAddressSync(
        [Buffer.from("player"), owner.toBuffer()],
        programId
    )[0];
}