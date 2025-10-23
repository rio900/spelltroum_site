export interface PoolType {
    type_id: number
    entry_fee: string
    type_name: string
    icon: string
}

export const poolTypes: PoolType[] = [
    { type_id: 0, type_name: "Solana Pool", icon: "/sol-logo.png", entry_fee: "0.01 SOL" },
    { type_id: 1, type_name: "Solana Pool", icon: "/sol-logo-gray.png", entry_fee: "0.25 SOL" },
    { type_id: 2, type_name: "Bonk Pool", icon: "/bonk-logo.png", entry_fee: "10 BONK" },
    { type_id: 3, type_name: "Dogwifhat Pool", icon: "/Dogwifhat.png", entry_fee: "5 WIF" },
    { type_id: 4, type_name: "Chonky Pool", icon: "/chonky.png", entry_fee: "15 CHONKY" },
]
